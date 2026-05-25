//=============================================================================
// VisuStella MZ - Events & Movement Core
// VisuMZ_1_EventsMoveCore.js
//=============================================================================

var Imported = Imported || {};
Imported.VisuMZ_1_EventsMoveCore = true;

var VisuMZ = VisuMZ || {};
VisuMZ.EventsMoveCore = VisuMZ.EventsMoveCore || {};
VisuMZ.EventsMoveCore.version = 1.61;

//=============================================================================
 /*:
 * @target MZ
 * @plugindesc [RPG Maker MZ] [Tier 1] [Version 1.61] [EventsMoveCore]
 * @author VisuStella
 * @url http://www.yanfly.moe/wiki/Events_and_Movement_Core_VisuStella_MZ
 * @orderAfter VisuMZ_0_CoreEngine
 *
 * @help
 * ============================================================================
 * Introduction
 * ============================================================================
 *
 * The Events & Movement Core plugin adds a lot of new functionality in terms
 * of event flexibility and movement options to RPG Maker MZ. These range from
 * adding in old capabilities from previous iterations of RPG Maker to more
 * mainstream techniques found in other game engines. Movement options are also
 * expanded to support 8-directional movement as well as sprite sheets provided
 * that the VisuStella 8 format is used.
 *
 * Features include all (but not limited to) the following:
 * 
 * * Event commands expanded upon to include old and new functions.
 * * Event templates for Copying Events, Morphing Events, and Spawning Events.
 * * 8-directional movement option available and sprite sheet support.
 * * Aesthetics for tilting the sprite when dashing and having shadows below.
 * * Pathfinding support for event movement through custom Move Route commands.
 * * Advanced switches and variable support to run code automatically.
 * * Turn regular Switches and Variables into Self Switches and Self Variables.
 * * Put labels and icons over events.
 * * Allow numerous ways to trigger events, through clicking, proximity, or by
 *   usage of Regions.
 * * Change the hitbox sizes of events to larger in any direction.
 * * Synchronize event movement options to move when player/other events move.
 * * The ability for the player to turn in place.
 *
 * ============================================================================
 * Requirements
 * ============================================================================
 *
 * This plugin is made for RPG Maker MZ. This will not work in other iterations
 * of RPG Maker.
 *
 * ------ Tier 1 ------
 *
 * This plugin is a Tier 1 plugin. Place it under other plugins of lower tier
 * value on your Plugin Manager list (ie: 0, 1, 2, 3, 4, 5). This is to ensure
 * that your plugins will have the best compatibility with the rest of the
 * VisuStella MZ library.
 *
 * ============================================================================
 * Features: Advanced Switches and Variables
 * ============================================================================
 *
 * Switches and variables can now run JavaScript code and return values
 * instantly. While at first glance, this may seem no different from using
 * the Control Variables event command's Script option, this can be used to
 * instantly set up Switch and/or Variable conditions for Parallel Common
 * Events, Event Page Conditions, Enemy Skill Conditions, and Troop Page
 * Conditions instantly without needing to make an event command to do so.
 *
 * ---
 *
 * <JS> code </JS>
 * - Used for: Switch and Variable names
 * - Replace 'code' with JavaScript code on what value to return.
 *
 * ---
 *
 * NOTE: Tagged Switches/Variables are mutually exclusive from one another.
 * You cannot tag them with <JS>, <Self>, <Map>, or <Global> simultaneously.
 *
 * ============================================================================
 * Features: Self Switches and Variables
 * ============================================================================
 *
 * RPG Maker MZ by default has 4 Self Switches: A, B, C, D. For some types of
 * games, this isn't enough. This plugin gives you the ability convert regular
 * Switches into Self Switches so you could have more.
 *
 * Self Variables also do not exist in RPG Maker MZ by default. Just like with
 * Switches, you can turn regular Variables into Self Variables.
 *
 * ---
 *
 * <Self>
 * - Used for: Switch and Variable names
 * - Converts the Switch/Variable into a Self Switch/Variable.
 *
 * ---
 *
 * After, just use them like you would for normal Switches and Variables in an
 * event's page conditions. If the <Self> tag is present inside the Switch or
 * Variable's name, then it will use data unique to only that event.
 *
 * NOTE: Tagged Switches/Variables are mutually exclusive from one another.
 * You cannot tag them with <JS>, <Self>, <Map>, or <Global> simultaneously.
 * 
 * ---
 * 
 * If you need to use a script call to get a Self Switch or Self Variable's
 * value, you can use the following script calls.
 * 
 *   ---
 * 
 *   Get Self Switch Values:
 * 
 *   getSelfSwitchValue(mapID, eventID, switchID)
 *   - Replace 'mapID' with the map ID the target event is located on.
 *   - Replace 'eventID' with the ID of the target event.
 *   - Replace 'switchID' with the ID number if it is a Self Switch made with
 *     <Self> or a capital letter surrounded by quotes if it's A, B, C, or D.
 *   - This will return the true/false value of the Self Switch.
 *   - Example: getSelfSwitchValue(12, 34, 56)
 *   - Example: getSelfSwitchValue(12, 34, 'B')
 * 
 *   ---
 * 
 *   Get Self Variable Values:
 * 
 *   getSelfVariableValue(mapID, eventID, variableID)
 *   - Replace 'mapID' with the map ID the target event is located on.
 *   - Replace 'eventID' with the ID of the target event.
 *   - Replace 'variableID' with the ID number of the Self Variable.
 *   - This will return whatever stored value is found in the Self Variable.
 *   - Example: getSelfVariableValue(12, 34, 56)
 * 
 *   ---
 * 
 *   Set Self Switch Values:
 * 
 *   setSelfSwitchValue(mapID, eventID, switchID, value)
 *   - Replace 'mapID' with the map ID the target event is located on.
 *   - Replace 'eventID' with the ID of the target event.
 *   - Replace 'switchID' with the ID number if it is a Self Switch made with
 *     <Self> or a capital letter surrounded by quotes if it's A, B, C, or D.
 *   - Replace 'value' with either 'true' or 'false' for ON/OFF respectively.
 *     Do not use quotes.
 *   - This will change the Self Switch's value to true/false.
 *     - Example: setSelfSwitchValue(12, 34, 56, false)
 *     - Example: setSelfSwitchValue(12, 34, 'B', true)
 * 
 *   ---
 * 
 *   Set Self Variable Values:
 * 
 *   setSelfVariableValue(mapID, eventID, variableID, value)
 *   - Replace 'mapID' with the map ID the target event is located on.
 *   - Replace 'eventID' with the ID of the target event.
 *   - Replace 'variableID' with the ID number of the Self Variable.
 *   - Replace 'value' with the value you want to set the Self Variable to.
 *   - Example: setSelfVariableValue(12, 34, 56, 88888)
 * 
 *   ---
 * 
 * ---
 *
 * ============================================================================
 * Features: Map Switches and Variables
 * ============================================================================
 * 
 * Similar to Self Switches and Self Variables, Map Switches and Map Variables
 * are switches and variables that retain data based on the map the player is
 * currently located in. In other words, they're self switches and variables
 * but for maps instead!
 * 
 * These features do not exist in RPG Maker MZ by default. Just like with the
 * Self Switches and Self Variables, you can turn regular Switches or Variables
 * into Map Switches and Map Variables using the following name tag:
 * 
 * ---
 * 
 * <Map>
 * - Used for: Switch and Variable names
 * - Converts the Switch/Variable into a Map Switch/Variable.
 * 
 * ---
 *
 * After, just use them like you would for normal Switches and Variables in an
 * event's page conditions. If the <Map> tag is present inside the Switch or
 * Variable's name, then it will use data unique to only that map.
 *
 * NOTE: Tagged Switches/Variables are mutually exclusive from one another.
 * You cannot tag them with <JS>, <Self>, <Map>, or <Global> simultaneously.
 * 
 * ---
 * 
 * If you need to use a script call to get a Map Switch or Map Variable's
 * value, you can use the following script calls:
 * 
 *   ---
 * 
 *   Get Map Switch Values:
 * 
 *   getMapSwitchValue(mapID, switchID)
 *   - Replace 'mapID' with the map ID the switch is located on.
 *   - Replace 'switchID' with the ID number of the switch to get data.
 *   - Example: getMapSwitchValue(4, 20)
 * 
 *   ---
 * 
 *   Get Variable Switch Values:
 * 
 *   getMapVariableValue(mapID, variableID)
 *   - Replace 'mapID' with the map ID the switch is located on.
 *   - Replace 'variableID' with the ID number of the variable to get data.
 *   - Example: getMapVariableValue(6, 9)
 * 
 *   ---
 * 
 *   Set Map Switch Values:
 * 
 *   setMapSwitchValue(mapID, switchID, value)
 *   - Replace 'mapID' with the map ID the switch is located on.
 *   - Replace 'switchID' with the ID number of the switch to get data.
 *   - Replace 'value' with either 'true' or 'false' for ON/OFF respectively.
 *     Do not use quotes.
 *   - Example: setMapSwitchValue(4, 20, true)
 *   - Example: setMapSwitchValue(6, 9, false)
 * 
 *   ---
 * 
 *   Set Map Variable Values:
 * 
 *   setMapVariableValue(mapID, variableID, value)
 *   - Replace 'mapID' with the map ID the switch is located on.
 *   - Replace 'variableID' with the ID number of the variable to get data.
 *   - Replace 'value' with the value you want to set the Map Variable to.
 *   - Example: setMapVariableValue(6, 9, 420)
 * 
 *   ---
 * 
 * ---
 *
 * ============================================================================
 * Features: Character Sprite Filename Tags
 * ============================================================================
 * 
 * For the files located inside of your project's /img/characters/ folder, if
 * the filenames themselves have specific "tags" in them, special properties
 * will be applied to them. These tags can be combined together with a few
 * exceptions.
 * 
 * Some of these are new to VisuStella MZ, while others are default to MZ.
 * 
 * ---
 * 
 *   !filename.png
 *   - Tag: !
 *   - Causes this character's sprite to align with the tile grid instead of
 *     being lifted a few pixels higher.
 *   - This is primarily used for things like doors, chests, and floor plates.
 *   - Default to RPG Maker MZ.
 * 
 * ---
 * 
 *   $filename.png
 *   - Tag: $
 *   - Causes this character's sprite to use the "big character" format.
 *   - Primarily used for sprites like the big monsters and such which only
 *     have 3x4 cells as opposed to 12x8 cells that regular sprite sheets have.
 *   - Cannot be combined with the [VS8] tag.
 *   - Default to RPG Maker MZ.
 * 
 * ---
 * 
 *   filename[Invisible].png
 *   - Tag: [Invisible] or [Inv]
 *   - This character's sprite will become invisible on the map screen in-game
 *     while almost everything else about it is visible.
 *   - This is used for those who wish to use sprite labels for things such as
 *     autorun and parallel events.
 * 
 * ---
 * 
 *   filename[VS8].png
 *   - Tag: [VS8]
 *   - Converts this sprite into a VisuStella-Style 8-Direction Sprite Sheet.
 *   - Refer to the section below.
 *   - Cannot be combined with the $ tag.
 * 
 * ---
 *
 * ============================================================================
 * Features: VisuStella-Style 8-Directional Sprite Sheets
 * ============================================================================
 *
 * This plugin provides support for the VisuStella-Style 8-Directional Sprite
 * Sheets, also know as VS8. VS8 sprite sheets offer support for walking
 * frames, dashing frames, carrying frames, and emotes.
 *
 * ---
 *
 * To designate a sprite sheet as VS8, simply add [VS8] to the filename.
 * Something like Actor1.png would become Actor1_[VS8].png.
 *
 * ---
 *
 * VS8 sprites are formatted as such. Each block below is a set of 3 frames.
 *
 * Walk Down    Walk DL     Dash Down   Dash DL
 * Walk Left    Walk DR     Dash Left   Dash DR
 * Walk Right   Walk UL     Dash Right  Dash UL
 * Walk Up      Walk UR     Dash Up     Dash UR
 *
 * Carry Down   Carry DL    Ladder      Emotes 3
 * Carry Left   Carry DR    Rope        Emotes 4
 * Carry Right  Carry UL    Emotes 1    Emotes 5
 * Carry Up     Carry UR    Emotes 2    Emotes 6
 *
 * ---
 *
 * Here are how each of the emote sets are grouped from left to right.
 *
 * Emotes 1: Item, Hmph, Victory
 * Emotes 2: Hurt, Kneel, Collapse
 * Emotes 3: !, ?, Music Note
 * Emotes 4: Heart, Anger, Sweat
 * Emotes 5: Cobweb, ..., Light Bulb
 * Emotes 6: Sleep0, Sleep1, Sleep2
 *
 * ---
 *
 * ============================================================================
 * Features: Weighted Random Movement
 * ============================================================================
 * 
 * When creating events to place on the map, you can determine what type of
 * autonomous movement the event will have. When selecting "Random", the event
 * will move randomly across the map.
 * 
 * However, with the way "Random" movement works with the RPG Maker MZ default
 * code, the event is more likely to hit a wall and then hug the said wall as
 * it maps laps around the map's outer borders making it feel very unnatural
 * for any player who's been on the map long enough.
 * 
 * This is where "Weighted Random Movement" comes in. It changes up the random
 * movement behavior to function where the farther the event is, the more
 * likely the event is to step back towards its "home" position (aka where it
 * spawned upon loading the map). This is so that a housewife NPC doesn't
 * suddenly wander off into the middle of an army's training grounds on the
 * same town map.
 * 
 * The event will stay closer to its home value depending on how high the
 * weight's value is. There are a number of ways to adjust the weighted value.
 * 
 * ---
 * 
 * Plugin Parameters > Movement > Event Movement > Random Move Weight
 * 
 * This Plugin Parameter setting allows you to set the default weight for all
 * events with "Random" autonomous movement. It is set at a default value of
 * 0.10 to give the event an understandable degree of freedom.
 * 
 * Lower numbers give events more freedom to move. Larger numbers will make the
 * events stick closer to home.
 * 
 * Change this value to 0 to disable it.
 * 
 * ---
 * 
 * You can customize this individually per event by using Notetags and/or
 * Comment Tags for the events.
 * 
 * <Random Move Weight: x>
 * 
 * - Used for: Event Notetags and Event Page Comment Tags
 * - If this tag is used on an event with random-type autonomous movement, then
 *   the event will stick closer to their home location (where they are located
 *   upon spawning on the map). How close they stick to their home location
 *   will depend on the weighted 'x' value.
 * - Replace 'x' with a number between 0 and 1. Numbers closer to 0 give the
 *   event more freedom when moving randomly while numbers closer to 1 cause
 *   the event to stick closer to their home position.
 * 
 * <True Random Move>
 * 
 * - Used for: Event Notetags and Event Page Comment Tags
 * - If this tag is used on an event with random-type autonomous movement, then
 *   that event will ignore the effects of weighted randomized movement.
 * 
 * ---
 *
 * ============================================================================
 * Notetags and Comment Tags
 * ============================================================================
 *
 * The following are notetags that have been added through this plugin. These
 * notetags will not work with your game if this plugin is OFF or not present.
 *
 * Some of these are comment tags. Comment tags are used for events to mark and
 * affect individual event pages rather than the whole event.
 *
 * === Map Notetags ===
 *
 * The following notetags are used for maps only. While some of these options
 * are also available in the Plugin Parameters, some of these notetags extend
 * usage to specific maps marked by these notetags as well.
 *
 * ---
 *
 * <Diagonal Movement: On>
 * <Diagonal Movement: Off>
 *
 * - Used for: Map Notetags
 * - Turns on/off diagonal movement for those maps.
 * - If notetag isn't present, use Plugin Parameter setting.
 *
 * ---
 *
 * <type Allow Region: x>
 * <type Allow Region: x, x, x>
 *
 * <type Forbid Region: x>
 * <type Forbid Region: x, x, x>
 *
 * <type Dock Region: x>
 * <type Dock Region: x, x, x>
 *
 * - Used for: Map Notetags
 * - Replace 'type' with 'All', 'Walk', 'Player', 'Event', 'Vehicle', 'Boat',
 *   'Ship', or 'Airship'.
 * - 'Allow' notetag variants allow that type to pass through them no matter
 *   what other passability settings are in place.
 * - 'Forbid' notetag variants forbid that type from passing through at all.
 * - 'Dock' notetag variants allow vehicles to dock there. Boats and ships must
 *   face the region direction while airships must land directly on top.
 *
 * ---
 * 
 * <Map Load Common Event: x>
 * <Map Load Common Events: x, x, x>
 * 
 * - Used for: Map Notetags
 * - When this map is loaded, run the specified Common Events once available.
 *   - Does NOT trigger if you transfer to a different part of the same map.
 * - Replace 'x' with a number representing the ID of the Common Event you wish
 *   to reserve and run once ready.
 * 
 * ---
 *
 * <Save Event Locations>
 *
 * - Used for: Maps Notetags
 * - Saves the locations of all events on the map so that when you return to
 *   that map at a later point, the events will be in the position they were
 *   last in.
 *
 * ---
 * 
 * <Hide Player>
 * <Show Player>
 * 
 * - Used for: Map Notetags
 * - Forcefully hides or shows the player sprite. This is so you don't need to
 *   manually turn the setting on/off each time you enter a specific map.
 * - These settings will take priority over the event commands.
 * - If the player sprite is hidden, so are the player's followers.
 * - If the player sprite is visible, the player's followers will still depend
 *   on their settings.
 * - These notetags are mutually exclusive from each other.
 * 
 * ---
 * 
 * <Hide Followers>
 * <Show Followers>
 * 
 * - Used for: Map Notetags
 * - Forcefully hides or shows the player's followers. This is so you don't
 *   need to manually turn them on/off each time you enter a specific map.
 * - These settings will take priority over the event commands.
 * - These notetags are mutually exclusive from each other.
 * 
 * ---
 * 
 * === Page Comment Tags ===
 * 
 * The following comment tags are to be put inside of the pages of events,
 * troops, and common events for them to work!
 * 
 * ---
 * 
 * <Page Conditions>
 *   conditions
 *   conditions
 *   conditions
 * </Page Conditions>
 * 
 * - Used for: Map Event Page, Troop Page, and Common Event Page Comment Tags
 * - This allows you to create custom page conditions that utilize the
 *   Conditional Branch event command to see if the additional page conditions
 *   are met.
 * 
 * ---
 * 
 * <Conditions Met>
 * - Used for: Map Event Page, Troop Page, and Common Event Page Comment Tags
 * - If used between the <Page Conditions> and </Page Conditions> comment tag,
 *   upon reaching this part of event command list, the custom page conditions
 *   will be considered met.
 * 
 * ---
 * 
 * Example:
 * 
 * ◆Comment：<Page Conditions>
 * ◆If：Reid has equipped Potion Sword
 *   ◆Comment：If Reid has equipped the Potion Sword
 * ：       ：<Condition Met>
 *   ◆
 * ：End
 * ◆Comment：</Page Conditions>
 * 
 * If Reid has the "Potion Sword" weapon equipped, then the additional custom
 * page conditions are met and the event page will be present/active.
 * 
 * If this is a troop condition, the troop page event will activate.
 * 
 * If this is a common event, there will be a parallel common event active.
 * 
 * ---
 *
 * === Event and Event Page Notetags ===
 *
 * The following notetags have comment tag variants (with a few exceptions).
 * If a notetag is used for an event, it will affect the event constantly.
 * If a comment tag is used, it will only affect the page the comment tag is
 * on and only that page.
 *
 * ---
 *
 * <Activation Region: x>
 * <Activation Regions: x,x,x>
 *
 * - Used for: Event Notetags and Event Page Comment Tags
 * - Allows this event to be remotely activated as long as the player is
 *   standing within a tile marked by a designated region.
 * - Replace 'x' with the regions you wish to remotely activate this event in.
 *   - Action Button: Player must press OK while being in the region.
 *   - Player/Event Touch: Player must step onto the region.
 *   - Autorun/Parallel: Player be in the region.
 * - If this is placed in a notetag, the effect will be present across
 *   all event pages used.
 * - If this is placed inside a page's comment, the effect will only occur
 *   if that event page is currently active.
 * - NOTE: This cannot be used with any other activation tags.
 *
 * ---
 *
 * <Activation Square: x>
 * <Activation Circle: x>
 * <Activation Delta: x>
 * <Activation Row: x>
 * <Activation Column: x>
 *
 * - Used for: Event Notetags and Event Page Comment Tags
 * - Allows this event to be remotely activated as long as the player is
 *   within range of its activation type.
 * - Replace 'x' with a number stating the range in tiles.
 *   - Square: A square-shaped range with the event at the center.
 *   - Circle: A circle-shaped range with the event at the center.
 *   - Delta: A diamond-shaped range with the event at the center.
 *   - Row: Spans horizontally across the map. 'x' expands up and down.
 *   - Column: Spans vertically across the map. 'x' expands left and right.
 * - If this is placed in a notetag, the effect will be present across
 *   all event pages used.
 * - If this is placed inside a page's comment, the effect will only occur
 *   if that event page is currently active.
 * - NOTE: This cannot be used with any other activation tags.
 *
 * ---
 *
 * <Always Update Movement>
 *
 * - Used for: Event Notetags and Event Page Comment Tags
 * - Events normally have to be within screen range for them to update their
 *   self movement. If this tag is present, the event is always updating.
 * - If this is placed in a notetag, the effect will be present across
 *   all event pages used.
 * - If this is placed inside a page's comment, the effect will only occur
 *   if that event page is currently active.
 *
 * ---
 *
 * <Click Trigger>
 *
 * - Used for: Event Notetags and Event Page Comment Tags
 * - Allows this event to activate upon being clicked on with the mouse.
 * - If this is placed in a notetag, the effect will be present across
 *   all event pages used.
 * - If this is placed inside a page's comment, the effect will only occur
 *   if that event page is currently active.
 *
 * ---
 *
 * <Copy Event: Map x, Event y>
 * <Copy Event: x, y>
 *
 * <Copy Event: template>
 *
 * - Used for: Event Notetags ONLY
 * - Makes this event copy all of the event settings from a different event
 *   that can be found on a different map (as long as that map is registered
 *   inside of Plugin Parameters => Event Template Settings => Preloaded Maps).
 * - Replace 'x' with a number representing the copied event's Map ID.
 *   - If '0' is used for the Map ID, reference the current map.
 * - Replace 'y' with a number representing the copied event's Event ID.
 * - For the 'template' variant, replace 'template' with the name of the
 *   template made in Plugin Parameters => Event Template Settings =>
 *   Event Template List.
 * - If this is placed in a notetag, the effect will be present across
 *   all event pages used.
 *
 * ---
 * 
 * <Custom Z: x>
 * 
 * - Used for: Event Notetags and Event Page Comment Tags
 * - Replace 'x' with a number value to determine the event sprite's Z value
 *   relative to the tilemap.
 * - For reference from rmmz_core.js:
 *   - 0 : Lower tiles
 *   - 1 : Lower characters
 *   - 3 : Normal characters
 *   - 4 : Upper tiles
 *   - 5 : Upper characters
 *   - 6 : Airship shadow
 *   - 7 : Balloon
 *   - 8 : Animation
 *   - 9 : Destination
 * - You can use numbers below 0 and above 9.
 *   - Values under 0 go below the tilemap.
 *   - Values above 9 go above everything else on the tilemap.
 *   - These values do NOT go below or above other screen objects that are
 *     NOT attached to the tilemap layer such as parallaxes or weather or
 *     windows because that's simply not how z-axis work with sprite layers.
 * 
 * ---
 * 
 * <Encounter Half Square: x>
 * <Encounter Half Circle: x>
 * <Encounter Half Delta: x>
 * <Encounter Half Row: x>
 * <Encounter Half Column: x>
 * 
 * - Used for: Event Notetags and Event Page Comment Tags
 * - If the player is within the 'x' area effect of this event, the random
 *   encounter rate will be halved.
 * - Replace 'x' with a number stating the range in tiles.
 *   - Square: A square-shaped range with the event at the center.
 *   - Circle: A circle-shaped range with the event at the center.
 *   - Delta: A diamond-shaped range with the event at the center.
 *   - Row: Spans horizontally across the map. 'x' expands up and down.
 *   - Column: Spans vertically across the map. 'x' expands left and right.
 * - If this is placed in a notetag, the effect will be present across
 *   all event pages used.
 * - If this is placed inside a page's comment, the effect will only occur
 *   if that event page is currently active.
 * 
 * Script Call Check:
 * 
 *   $isTileEncounterHalf(x, y)
 * 
 * - This can be used to check if a certain map tile (x, y) has an encounter
 *   rate halving effect on it.
 * - Returns a boolean (true or false) when used.
 * 
 * ---
 * 
 * <Encounter None Square: x>
 * <Encounter None Circle: x>
 * <Encounter None Delta: x>
 * <Encounter None Row: x>
 * <Encounter None Column: x>
 * 
 * - Used for: Event Notetags and Event Page Comment Tags
 * - If the player is within the 'x' area effect of this event, the random
 *   encounter rate will be suppressed completely.
 * - Replace 'x' with a number stating the range in tiles.
 *   - Square: A square-shaped range with the event at the center.
 *   - Circle: A circle-shaped range with the event at the center.
 *   - Delta: A diamond-shaped range with the event at the center.
 *   - Row: Spans horizontally across the map. 'x' expands up and down.
 *   - Column: Spans vertically across the map. 'x' expands left and right.
 * - If this is placed in a notetag, the effect will be present across
 *   all event pages used.
 * - If this is placed inside a page's comment, the effect will only occur
 *   if that event page is currently active.
 * 
 * Script Call Check:
 * 
 *   $isTileEncounterNone(x, y)
 * 
 * - This can be used to check if a certain map tile (x, y) has an encounter
 *   rate suppression effect on it.
 * - Returns a boolean (true or false) when used.
 * 
 * ---
 * 
 * <Erase if Encounter Half>
 * <Erase if Encounter None>
 * 
 * - Used for: Event Notetags ONLY
 * - Automatically erase this event if the player's party has an encounter half
 *   or encounter none effect, or if the event has spawned in an encounter half
 *   or encounter none area.
 * - This check only occurs in two situations: when the map is first loaded
 *   after being teleported into or when the player leaves a menu and returns
 *   back to the map.
 * - Events that have been erased due to this effect will NOT return even if
 *   the encounter half/none effect is removed while the player is still on the
 *   map. The event will return if the player exits the map and comes back.
 * 
 * ---
 * 
 * <Exit Reset Self Data>
 * 
 * - Used for: Event Notetags ONLY
 * - When the player leaves the current map, all Self Switches and Self
 *   Variables related to this event will be reset.
 * 
 * ---
 *
 * <Hitbox Left: x>
 * <Hitbox Right: x>
 * <Hitbox Up: x>
 * <Hitbox Down: x>
 *
 * - Used for: Event Notetags and Event Page Comment Tags
 * - Replace 'x' with a number to extend the hitbox of the event by that many
 *   tiles towards the listed direction.
 * - Use multiples of this notetag to extend them to different directions.
 * - If this is placed in a notetag, the effect will be present across
 *   all event pages used.
 * - If this is placed inside a page's comment, the effect will only occur
 *   if that event page is currently active.
 *
 * ---
 *
 * <Icon: x>
 *
 * - Used for: Event Notetags and Event Page Comment Tags
 * - Replace 'x' with the Icon ID you wish to put above this event.
 * - This will not override any Icons designated to the ID through a
 *   Plugin Command.
 * - If this is placed in a notetag, the effect will be present across
 *   all event pages used.
 * - If this is placed inside a page's comment, the effect will only occur
 *   if that event page is currently active.
 *
 * ---
 *
 * <Icon Buffer X: +x>
 * <Icon Buffer X: -x>
 *
 * <Icon Buffer Y: +x>
 * <Icon Buffer Y: -x>
 *
 * <Icon Buffer: +x, +y>
 * <Icon Buffer: -x, -y>
 *
 * - Used for: Event Notetags and Event Page Comment Tags
 * - Allows you to adjust the positions of the icon on the envent by buffers.
 * - Replace 'x' and 'y' with the values to adjust the position buffers by.
 * - If this is placed in a notetag, the effect will be present across
 *   all event pages used.
 * - If this is placed inside a page's comment, the effect will only occur
 *   if that event page is currently active.
 *
 * ---
 *
 * <Label: text>
 *
 * - Used for: Event Notetags and Event Page Comment Tags
 * - Puts a label over the event's head displaying 'text'.
 * - Text codes can be used.
 *   - If text codes are used, avoid text codes that use < and > wrappers.
 * - If this is placed in a notetag, the effect will be present across
 *   all event pages used.
 * - If this is placed inside a page's comment, the effect will only occur
 *   if that event page is currently active.
 *
 * ---
 *
 * <Label>
 * text
 * text
 * </Label>
 *
 * - Used for: Event Notetags and Event Page Comment Tags
 * - Puts a label over the event's head displaying 'text'.
 * - This can display multiple lines.
 * - Text codes can be used.
 *   - You can use text codes with < and > wrappers.
 * - If this is placed in a notetag, the effect will be present across
 *   all event pages used.
 * - If this is placed inside a page's comment, the effect will only occur
 *   if that event page is currently active.
 *
 * ---
 *
 * <Label Range: x>
 *
 * - Used for: Event Notetags and Event Page Comment Tags
 * - Sets a range requirement for the player to be in order for the event's
 *   label to appear.
 * - Replace 'x' with a number value depicting the range in tiles.
 * - If this is placed in a notetag, the effect will be present across
 *   all event pages used.
 * - If this is placed inside a page's comment, the effect will only occur
 *   if that event page is currently active.
 * - If this tag is not used, refer to the default plugin parameter settings.
 *
 * ---
 * 
 * <Label Range Type: Square>
 * <Label Range Type: Circle>
 * <Label Range Type: Diamond>
 * 
 * - Used for: Event Notetags and Event Page Comment Tags
 * - Sets a range type for the label to appear visible for.
 *   - Square: A square-shaped range with the event at the center.
 *   - Circle: A circle-shaped range with the event at the center.
 *   - Diamond: A diamond-shaped range with the event at the center.
 * - If this is placed in a notetag, the effect will be present across
 *   all event pages used.
 * - If this is placed inside a page's comment, the effect will only occur
 *   if that event page is currently active.
 * - If this tag is not used, refer to the default plugin parameter settings.
 * 
 * ---
 *
 * <Label Offset X: +x>
 * <Label Offset X: -x>
 *
 * <Label Offset Y: +x>
 * <Label Offset Y: -x>
 *
 * <Label Offset: +x, +y>
 * <Label Offset: -x, -y>
 *
 * - Used for: Event Notetags and Event Page Comment Tags
 * - Allows you to adjust the positions of the label on the envent by offsets.
 * - Replace 'x' and 'y' with the values to adjust the position offsets by.
 * - If this is placed in a notetag, the effect will be present across
 *   all event pages used.
 * - If this is placed inside a page's comment, the effect will only occur
 *   if that event page is currently active.
 *
 * ---
 * 
 * <Label Hue Shift: +x>
 * <Label Hue Shift: -x>
 * 
 * - Used for: Event Notetags and Event Page Comment Tags
 * - Changes the hue of the event label by +x or -x every frame.
 *   - Keep in mind that since this is changing hue, this will appear to have
 *     no effect if you are using black and white labels.
 *   - Use labels with text codes that add color to them like '\C[4]text'
 * - This only works with the sprite version of event labels and does not work
 *   with the legacy version.
 * 
 * ---
 * 
 * <Location X: +x>
 * <Location X: -x>
 * 
 * <Location Y: +x>
 * <Location Y: -x>
 * 
 * <Location: +x, +y>
 * <Location: +x, -y>
 * <Location: -x, +y>
 * <Location: -x, -y>
 * 
 * - Used for: Event Notetags and Event Page Comment Tags
 * - Adjusts the initial location of this event by +x and +y (or -x and -y).
 * - This allows you to stack events on top of each other or even move them to
 *   various places of the map.
 * - Replace 'x' with a number that represents the horizontal tiles to adjust
 *   the initial starting location by.
 * - Replace 'y' with a number that represents the vertical tiles to adjust
 *   the initial starting location by.
 * 
 * ---
 * 
 * <Mirror Sprite>
 * 
 * - Used for: Event Notetags and Event Page Comment Tags
 * - The event sprite's visual appearance is mirrored.
 * 
 * ---
 * 
 * <Move Only Region: x>
 * <Move Only Regions: x,x,x>
 * 
 * - Used for: Event Notetags and Event Page Comment Tags
 * - Sets the move range of this event to only the region(s) marked by the
 *   notetag(s) or comment tag(s).
 * - This will bypass terrain passability.
 * - This will not bypass event collision.
 * - If this is placed in a notetag, the effect will be present across
 *   all event pages used.
 * - If this is placed inside a page's comment, the effect will only occur
 *   if that event page is currently active.
 * 
 * ---
 *
 * <Move Synch Target: Player>
 *
 * <Move Synch Target: Event x>
 *
 * - Used for: Event Notetags and Event Page Comment Tags
 * - Synchronizes the movement of this event with a target (either the player
 *   or another event). This event will only move whenever the synchronized
 *   target moves.
 * - For 'Event x' variant, replace 'x' with the ID of the event to synch to.
 * - If this is placed in a notetag, the effect will be present across
 *   all event pages used.
 * - If this is placed inside a page's comment, the effect will only occur
 *   if that event page is currently active.
 *
 * ---
 *
 * <Move Synch Type: Random>
 * <Move Synch Type: Approach>
 * <Move Synch Type: Away>
 * <Move Synch Type: Custom>
 *
 * <Move Synch Type: Mimic>
 * <Move Synch Type: Reverse Mimic>
 *
 * <Move Synch Type: Mirror Horizontal>
 * <Move Synch Type: Mirror Vertical>
 *
 * - Used for: Event Notetags and Event Page Comment Tags
 * - Choose the type of movement the event will have if it is synchronized to
 *   a target.
 *   - Random: Move to a random position.
 *   - Approach: Approaches target.
 *   - Away: Flees from target.
 *   - Custom: Follows a custom move route.
 *   - Mimic: Imitates the target's movement style.
 *   - Reverse Mimic: Does the opposite of the target's movement.
 *   - Mirror Horizontal: Moves as if a mirror is placed horizontally.
 *   - Mirror Vertical: Moves as if a mirror is placed vertically.
 * - If this is placed in a notetag, the effect will be present across
 *   all event pages used.
 * - If this is placed inside a page's comment, the effect will only occur
 *   if that event page is currently active.
 *
 * ---
 *
 * <Move Synch Delay: x>
 *
 * - Used for: Event Notetags and Event Page Comment Tags
 * - If this tag is present, the event will wait a bit after each move before
 *   moving again.
 * - Replace 'x' with the number of movement instances in between.
 * - If this is placed in a notetag, the effect will be present across
 *   all event pages used.
 * - If this is placed inside a page's comment, the effect will only occur
 *   if that event page is currently active.
 *
 * ---
 * 
 * <Move Synch Distance Opacity: x>
 * 
 * - Used for: Event Notetags and Event Page Comment Tags
 * - Changes the opacity of the event based on the distance between it and its
 *   move synched target. Closer means more opaque. Further away means more
 *   transparent.
 * - Replace 'x' with a number representing the opacity change per pixel
 *   distance away. 'x' can use decimal values like 1.05 and 1.5.
 * 
 * ---
 * 
 * <Picture Filename: filename>
 * 
 * - Used for: Event Notetags and Event Page Comment Tags
 * - Applies a picture graphic from the /img/pictures/ folder of your project.
 * - This graphic will be on top of the character sprite but below the event
 *   icon sprite.
 *   - The picture priority will be the same as the event's priority.
 *   - If it is "below characters", the player can walk on top of it.
 *   - If it is "above characters", the player will behind it.
 *   - If it is "same as characters", the priority will be based on the
 *     current relative Y position. This also means, if the picture is big
 *     enough, it can clip into the top of tree tiles and such.
 * - Replace 'filename' with a filename from the game project's /img/pictures/
 *   folder. This is case sensitive. Do NOT include the file extension.
 * - If this is placed in a notetag, the effect will be present across
 *   all event pages used.
 * - If this is placed inside a page's comment, the effect will only occur
 *   if that event page is currently active.
 * 
 * ---
 * 
 * <Picture Type: Enemy>
 * <Picture Type: SV Enemy>
 * 
 * - Used for: Event Notetags and Event Page Comment Tags
 * - Used with <Picture Filename: filename> notetag.
 * - Will use /img/enemies/ or /img/sv_enemies/ instead of /img/pictures/ to
 *   grab a picture graphic from.
 * - Other picture graphic sprite related notetags will apply as normal.
 * 
 * ---
 * 
 * <Picture Max Size: x>
 * <Picture Scale: y%>
 * 
 * - Used for: Event Notetags and Event Page Comment Tags
 * - Used with <Picture Filename: filename> notetag.
 * - If the "Max Size" or "Scale" supplementary notetags are used, the picture
 *   graphic will be scaled proportionally to fit either the exact pixel size
 *   for "Max Size" or the "Scale" ratio.
 *   - Both the "Max Size" and "Scale" notetags require the "Filename" notetag.
 * - Replace 'x' with a number value representing the exact pixel size for the
 *   "Max Size" notetag.
 * - Replace 'y' with a number value representing the scale on which to shrink
 *   or enlarge the picture. 100% is normal size. 50% is half size. 200% is
 *   double size.
 * - If this is placed in a notetag, the effect will be present across
 *   all event pages used.
 * - If this is placed inside a page's comment, the effect will only occur
 *   if that event page is currently active.
 * 
 * ---
 *
 * <Picture Offset X: +x>
 * <Picture Offset X: -x>
 *
 * <Picture Offset Y: +x>
 * <Picture Offset Y: -x>
 *
 * <Picture Offset: +x, +y>
 * <Picture Offset: -x, -y>
 * 
 * - Used for: Event Notetags and Event Page Comment Tags
 * - Used with <Picture Filename: filename> notetag.
 * - Offsets the X and Y position of the event picture relative to the event
 *   sprite's own position.
 * - Replace 'x' and 'y' with numbers indicating the offset in pixels.
 * - If this is placed in a notetag, the effect will be present across
 *   all event pages used.
 * - If this is placed inside a page's comment, the effect will only occur
 *   if that event page is currently active.
 * 
 * ---
 * 
 * <Picture Wait Frames: x>
 * 
 * - Used for: Event Notetags and Event Page Comment Tags
 * - Used with <Picture Filename: filename> notetag.
 * - Requires VisuMZ_4_AnimatedPictures!
 * - "Wait Frames" is used with VisuMZ's Animated Pictures plugin. This
 *   determines the delay inbetween frame changes.
 * - Replace 'x' with a number representing the amount of frames to wait
 *   inbetween frame changes.
 * - If this is placed in a notetag, the effect will be present across
 *   all event pages used.
 * - If this is placed inside a page's comment, the effect will only occur
 *   if that event page is currently active.
 * 
 * ---
 * 
 * <Playtest>
 * 
 * - Used for: Event Notetags.
 * - This does NOT work when it's in the Event Page Comment Tags.
 * - If this notetag is found in the event's notebox (NOT comments), then the
 *   event will only appear during a playtest session. It will not appear in a
 *   deployed game where the playtest flag is not on.
 * 
 * ---
 * 
 * <Random Move Weight: x>
 * 
 * - Used for: Event Notetags and Event Page Comment Tags
 * - If this tag is used on an event with random-type autonomous movement, then
 *   the event will stick closer to their home location (where they are located
 *   upon spawning on the map). How close they stick to their home location
 *   will depend on the weighted 'x' value.
 * - Replace 'x' with a number between 0 and 1. Numbers closer to 0 give the
 *   event more freedom when moving randomly while numbers closer to 1 cause
 *   the event to stick closer to their home position.
 * 
 * ---
 * 
 * <True Random Move>
 * 
 * - Used for: Event Notetags and Event Page Comment Tags
 * - If this tag is used on an event with random-type autonomous movement, then
 *   that event will ignore the effects of weighted randomized movement.
 * 
 * ---
 *
 * <Save Event Location>
 *
 * - Used for: Event Notetags ONLY
 * - Saves the locations of the event on the map so that when you return to
 *   that map at a later point, the event will be in the position it was
 *   last in.
 *
 * ---
 *
 * <Hide Shadow>
 * - Used for: Event Notetags and Event Page Comment Tags
 * - Hides the shadow for the event.
 * - If this is placed in a notetag, the effect will be present across
 *   all event pages used.
 * - If this is placed inside a page's comment, the effect will only occur
 *   if that event page is currently active.
 *
 * ---
 * 
 * <Scale: x%>
 * 
 * <Scale X: x%>
 * <Scale Y: y%>
 * 
 * - Used for: Event Notetags and Event Page Comment Tags
 * - Changes the scale of the sprite to the designated size.
 * - For <Scale: x%> variant: replace 'x' with a number representing the
 *   scaling overall percentage to be used.
 * - For <Scale X: x%> variant, replace 'x' with a number representing the x
 *   factor for the horizontal scaling percentage to be used.
 * - For <Scale Y: y%> variant, replace 'y' with a number representing the y
 *   factor for the vertical scaling percentage to be used.
 * - If this is placed in a notetag, the effect will be present across
 *   all event pages used.
 * - If this is placed inside a page's comment, the effect will only occur
 *   if that event page is currently active.
 * 
 * ---
 *
 * <Shadow Filename: filename>
 *
 * - Used for: Event Notetags and Event Page Comment Tags
 * - Replaces the shadow graphic used with 'filename' found in the
 *   img/system/ project folder.
 * - If this is placed in a notetag, the effect will be present across
 *   all event pages used.
 * - If this is placed inside a page's comment, the effect will only occur
 *   if that event page is currently active.
 *
 * ---
 *
 * <Sprite Offset X: +x>
 * <Sprite Offset X: -x>
 *
 * <Sprite Offset Y: +x>
 * <Sprite Offset Y: -x>
 *
 * <Sprite Offset: +x, +y>
 * <Sprite Offset: -x, -y>
 *
 * - Used for: Event Notetags and Event Page Comment Tags
 * - Changes how much the event's sprite is visibly offset by.
 * - Replace 'x' and 'y' with numbers indicating the offset in pixels.
 * - If this is placed in a notetag, the effect will be present across
 *   all event pages used.
 * - If this is placed inside a page's comment, the effect will only occur
 *   if that event page is currently active.
 *
 * ---
 *
 * <Step Pattern: Left to Right>
 * <Step Pattern: Right to Left>
 *
 * <Step Pattern: Spin Clockwise>
 * <Step Pattern: Spin CW>
 *
 * <Step Pattern: Spin CounterClockwise>
 * <Step Pattern: Spin CCW>
 * <Step Pattern: Spin AntiClockwise>
 * <Step Pattern: Spin ACW>
 *
 * - Used for: Event Notetags and Event Page Comment Tags
 * - Changes the way the event animates if a tag is present.
 *   - Left to Right: Makes the event sprite's step behavior go from frame 0 to
 *     1 to 2, then back to 0 instead of looping backward.
 *   - Right to Left: Makes the event sprite's step behavior go from frame 2 to
 *     1 to 0, then back to 2 instead of looping forward.
 *   - Spin Clockwise: Makes the event sprite's step behavior spin CW.
 *   - Spin CounterClockwise: Makes the event sprite's step behavior spin CCW.
 * - If this is placed in a notetag, the effect will be present across
 *   all event pages used.
 * - If this is placed inside a page's comment, the effect will only occur
 *   if that event page is currently active.
 *
 * ---
 * 
 * <Tile Expand Up: x>
 * <Tile Expand Down: x>
 * <Tile Expand Left: x>
 * <Tile Expand Right: x>
 * 
 * - Used for: Event Notetags and Event Page Comment Tags
 * - Used for events with tile graphics. Expands the graphic up, down, left, or
 *   right from the spritesheet.
 *   - This does NOT expand the hitbox.
 * - The graphic will be anchored to the tile it's expanded from. This means
 *   even if you expanded downward, the actual event's position will still be
 *   the current event's X/Y coordinates. It's just grown more vertically and
 *   is still centered horizontally.
 * - This is primarily used to save on having to use too many events for tiles
 *   that expanded past 1x1 tile sizes.
 * 
 * ---
 *
 * ============================================================================
 * Plugin Commands
 * ============================================================================
 *
 * The following are Plugin Commands that come with this plugin. They can be
 * accessed through the Plugin Command event command.
 *
 * ---
 * 
 * === Auto Movement Plugin Commands ===
 * 
 * ---
 *
 * Auto Movement: Events
 * - Allow/stop events from auto movement.
 *
 *   Value:
 *   - Allow events to move automatically?
 *
 * ---
 * 
 * === Call Event Plugin Commands ===
 * 
 * ---
 *
 * Call Event: Remote Read
 * - Runs the page of a different event remotely.
 * - This will run the page of the target event on the CURRENT event.
 * - This means that any "This Event" commands will be applied to the event
 *   using this Plugin Command and NOT the target event that page data is being
 *   retrieved from.
 * - Think of it as the current event using the target called event as a
 *   Common Event ala how RPG Maker 2003 works (for those familiar with it).
 *
 *   Map ID:
 *   - Target event's map. Use 0 for current map.
 *   - You may use JavaScript code.
 *
 *   Event ID:
 *   - The ID of the event to remotely run.
 *   - Use 0 for current event.
 *   - You may use JavaScript code.
 *
 *   Page ID:
 *   - The page of the remote event to run.
 *   - You may use JavaScript code.
 *
 * ---
 * 
 * === Dash Plugin Commands ===
 * 
 * ---
 *
 * Dash Enable: Toggle
 * - Enable/Disable Dashing on maps.
 *
 *   Value:
 *   - What do you wish to change dashing to?
 *
 * ---
 * 
 * === Event Icon Plugin Commands ===
 * 
 * ---
 *
 * Event Icon: Change (Temporary)
 * - Change the icon that appears on an event.
 * - This change is temporary and resets upon new events.
 *
 *   Map ID:
 *   - The map the target map. Use 0 for current map.
 *   - You may use JavaScript code.
 *
 *   Event ID:
 *   - The ID of the target event.
 *   - Use 0 for current event.
 *   - You may use JavaScript code.
 *
 *   Icon Index:
 *   - Icon index used for the icon.
 *   - You may use JavaScript code.
 *
 *   Buffer X:
 *   - How much to shift the X position by?
 *   - You may use JavaScript code.
 *
 *   Buffer Y:
 *   - How much to shift the Y position by?
 *   - You may use JavaScript code.
 *
 *   Blend Mode:
 *   - What kind of blend mode do you wish to apply to the icon sprite?
 *
 * ---
 *
 * Event Icon: Change (Forced)
 * - Change the icon that appears on an event.
 * - This change is forced and needs to be restored.
 *
 *   Map ID:
 *   - The map the target map. Use 0 for current map.
 *   - You may use JavaScript code.
 *
 *   Event ID:
 *   - The ID of the target event.
 *   - Use 0 for current event.
 *   - You may use JavaScript code.
 *
 *   Icon Index:
 *   - Icon index used for the icon.
 *   - You may use JavaScript code.
 *
 *   Buffer X:
 *   - How much to shift the X position by?
 *   - You may use JavaScript code.
 *
 *   Buffer Y:
 *   - How much to shift the Y position by?
 *   - You may use JavaScript code.
 *
 *   Blend Mode:
 *   - What kind of blend mode do you wish to apply to the icon sprite?
 *
 * ---
 *
 * Event Icon: Delete
 * - Delete the icon that appears on an event.
 * - This will remain deleted and invisible for events.
 *
 *   Map ID:
 *   - The map the target map. Use 0 for current map.
 *   - You may use JavaScript code.
 *
 *   Event ID:
 *   - The ID of the target event.
 *   - Use 0 for current event.
 *   - You may use JavaScript code.
 *
 * ---
 * 
 * Event Icon: Restore
 * - Restores a deleted or forced icon that appears on an event.
 * 
 *   Map ID: 
 *   - The map the target map. Use 0 for current map.
 *   - You may use JavaScript code.
 *
 *   Event ID:
 *   - The ID of the target event.
 *   - Use 0 for current event.
 *   - You may use JavaScript code.
 * 
 * ---
 * 
 * === Event Label Plugin Commands ===
 * 
 * ---
 *
 * Event Label: Refresh
 * - Refresh all Event Labels on screen.
 * - This is used to refresh page conditions for map changes that don't
 *   force a refresh.
 *
 * ---
 *
 * Event Label: Visible
 * - Change the visibility of Event Labels.
 *
 *   Visibility:
 *   - What do you wish to change visibility to?
 *
 * ---
 * 
 * === Event Location Plugin Commands ===
 * 
 * ---
 *
 * Event Location: Save
 * - Memorize an event's map location so it reappears there the next time the
 *   map is loaded.
 *
 *   Event ID:
 *   - The ID of the target event.
 *   - Use 0 for current event.
 *   - You may use JavaScript code.
 *
 * ---
 *
 * Event Location: Delete
 * - Deletes an event's saved map location.
 * - The event will reappear at its default location.
 *
 *   Map ID:
 *   - The map the target map. Use 0 for current map.
 *   - You may use JavaScript code.
 *   
 *   Event ID:
 *   - The ID of the target event.
 *   - Use 0 for current event.
 *   - You may use JavaScript code.
 *
 * ---
 *
 * Event Location: Create
 * - Creates a custom spawn location for a specific map's event so it appears
 *   there the next time the map is loaded.
 *
 *   Map ID:
 *   - The map the target map. Use 0 for current map.
 *   - You may use JavaScript code.
 *
 *   Event ID:
 *   - The ID of the target event.
 *   - Use 0 for current event.
 *   - You may use JavaScript code.
 *
 *   X Coordinate:
 *   - The X coordinate of the event.
 *   - You may use JavaScript code.
 *
 *   Y Coordinate:
 *   - The Y coordinate of the event.
 *   - You may use JavaScript code.
 *
 *   Direction:
 *   - The direction the event will be facing.
 *
 *   Optional:
 *
 *     Page ID:
 *     - The page of the event to set the move route to.
 *     - You may use JavaScript code.
 *
 *     Move Route Index:
 *     - The point in the move route for this event to be at if the page ID
 *       matches the rest of the page conditions.
 *
 * ---
 * 
 * === Event Popup Plugin Commands ===
 * 
 * ---
 * 
 * Event Popup: Player
 * - Makes a centered event popup on the player sprite.
 * - Requires VisuMZ_1_MessageCore!
 * - Cannot be used in battle!
 * 
 *   Message Text:
 *   - Insert the text to be displayed.
 *   - Text codes can be used.
 * 
 *   Message Duration:
 *   - What is the frame duration of the event popup?
 *   - 60 frames = 1 second. You may use code.
 * 
 *   Popup Settings:
 *   - These settings let you adjust how the popup animates.
 *   - See "Popup Settings" section below.
 * 
 * ---
 * 
 * Event Popup: Follower
 * - Makes a centered event popup on target follower sprite.
 * - Requires VisuMZ_1_MessageCore!
 * - Cannot be used in battle!
 * 
 *   Follower Index:
 *   - Which follower index to play popup?
 *   - Index starts at 0.
 *   - You may use JavaScript code.
 * 
 *   Message Text:
 *   - Insert the text to be displayed.
 *   - Text codes can be used.
 * 
 *   Message Duration:
 *   - What is the frame duration of the event popup?
 *   - 60 frames = 1 second.
 *   - You may use code.
 * 
 *   Popup Settings:
 *   - These settings let you adjust how the popup animates.
 *   - See "Popup Settings" section below.
 * 
 * ---
 * 
 * Event Popup: Event
 * - Makes a centered event popup on target event sprite.
 * - Requires VisuMZ_1_MessageCore!
 * - Cannot be used in battle!
 * 
 *   Event ID:
 *   - The ID of the event to play popup on.
 *   - Use 0 for current event.
 *   - You may use JavaScript code.
 * 
 *   Message Text:
 *   - Insert the text to be displayed.
 *   - Text codes can be used.
 * 
 *   Message Duration:
 *   - What is the frame duration of the event popup?
 *   - 60 frames = 1 second. You may use code.
 * 
 *   Popup Settings:
 *   - These settings let you adjust how the popup animates.
 *   - See "Popup Settings" section below.
 * 
 * ---
 * 
 * Event Popup: Target Tile
 * - Makes a centered event popup on target tile.
 * - Requires VisuMZ_1_MessageCore!
 * - Cannot be used in battle!
 * 
 *   Map Tile X:
 *   Map Tile Y:
 *   - The x/y coordinate of the map tile.
 *   - You may use JavaScript code.
 * 
 *   Message Text:
 *   - Insert the text to be displayed.
 *   - Text codes can be used.
 * 
 *   Message Duration:
 *   - What is the frame duration of the event popup?
 *   - 60 frames = 1 second. You may use code.
 * 
 *   Popup Settings:
 *   - These settings let you adjust how the popup animates.
 *   - See "Popup Settings" section below.
 * 
 * ---
 * 
 * Popup Settings
 * 
 *   Fade Settings:
 * 
 *     Fade In Duration:
 *     - How many frames does it take to fade in?
 *     - 60 frames = 1 second.
 * 
 *     Fade Out Duration:
 *     - How many frames does it take to fade out?
 *     - 60 frames = 1 second.
 * 
 *   Offset Settings:
 * 
 *     Starting Offset X:
 *     - Offsets the starting x position.
 *     - Negative: left. Positive: right.
 *     - You may use code.
 * 
 *     Starting Offset Y:
 *     - Offsets the starting y position. 
 *     - Negative: up. Positive: down.
 *     - You may use code.
 * 
 *     Ending Offset X:
 *     - Offsets the ending x position. 
 *     - Negative: left. Positive: right.
 *     - You may use code.
 * 
 *     Ending Offset Y:
 *     - Offsets the ending y position. 
 *     - Negative: up. Positive: down.
 *     - You may use code.
 * 
 *   Scaling Settings:
 * 
 *     Starting Scale X:
 *     - What is the starting scale x?
 *     - 0.0 = 0%, 0.5 = 50%, 1.0 = 100%
 *     - You may use code.
 * 
 *     Starting Scale Y:
 *     - What is the starting scale y?
 *     - 0.0 = 0%, 0.5 = 50%, 1.0 = 100%
 *     - You may use code.
 * 
 *     Ending Scale X:
 *     - What is the ending scale x?
 *     - 0.0 = 0%, 0.5 = 50%, 1.0 = 100%
 *     - You may use code.
 * 
 *     Ending Scale Y:
 *     - What is the ending scale y?
 *     - 0.0 = 0%, 0.5 = 50%, 1.0 = 100%
 *     - You may use code.
 * 
 *   Angle Settings:
 * 
 *     Starting Offset Angle:
 *     - What is the starting angle offset?
 *     - Use numbers between 0 and 360.
 *     - You may use code.
 * 
 *     Ending Offset Angle:
 *     - What is the ending angle offset?
 *     - Use numbers between 0 and 360.
 *     - You may use code.
 * 
 *   Misc Settings:
 * 
 *     Arc Peak:
 *     - This is the height of the popup's trajectory arc in pixels.
 *     - Positive: up. Negative: down.
 *     - You may use code.
 * 
 * ---
 * 
 * === Event Timer Plugin Commands ===
 * 
 * ---
 *
 * Event Timer: Change Speed
 * - Changes the timer frame decrease (or increase) speed.
 *
 *   Speed:
 *   - How many 1/60ths of a second does each frame increase or decrease by?
 *   - Negative decreases.
 *   - Positive increases.
 *   - JavaScript allowed.
 *
 * ---
 *
 * Event Timer: Expire Event Assign
 * - Sets a Common Event to run upon expiration.
 * - Bypasses the default code if one is set.
 *
 *   Common Event ID:
 *   - Select the Common Event to run upon the timer's expiration.
 *
 * ---
 *
 * Event Timer: Expire Event Clear
 * - Clears any set to expire Common Event and instead, run the default
 *   Game_Timer expiration code.
 *
 * ---
 *
 * Event Timer: Frames Gain
 * - Chooses how many frames, seconds, minutes, or hours are gained or lost for
 *   the event timer.
 *
 *   Frames:
 *   - How many 1/60ths of a second are gained/lost?
 *   - Positive for gain.
 *   - Negative for lost.
 *   - JavaScript allowed.
 *
 *   Seconds:
 *   - How many seconds are gained/lost?
 *   - Positive for gain.
 *   - Negative for lost.
 *   - JavaScript allowed.
 *
 *   Minutes:
 *   - How many minutes are gained/lost?
 *   - Positive for gain.
 *   - Negative for lost.
 *   - JavaScript allowed.
 *
 *   Hours:
 *   - How many hours are gained/lost?
 *   - Positive for gain.
 *   - Negative for lost.
 *   - JavaScript allowed.
 *
 * ---
 *
 * Event Timer: Frames Set
 * - Chooses how many frames, seconds, minutes, or hours are set for the event
 *   timer.
 *
 *   Frames:
 *   - Set frame count to this value.
 *   - Each frame is 1/60th of a second.
 *   - JavaScript allowed.
 *
 *   Seconds:
 *   - Set seconds to this value.
 *   - JavaScript allowed.
 *
 *   Minutes:
 *   - Set minutes to this value.
 *   - Each minute is 60 seconds.
 *   - JavaScript allowed.
 *
 *   Hours:
 *   - Set hours to this value.
 *   - Each hour is 60 minutes.
 *   - JavaScript allowed.
 *
 * ---
 *
 * Event Timer: Pause
 * - Pauses the current event timer, but does not stop it.
 *
 * ---
 *
 * Event Timer: Resume
 * - Resumes the current event timer from the paused state.
 *
 * ---
 * 
 * === Follower Control Plugin Commands ===
 * 
 * ---
 *
 * Follower: Set Global Chase
 * - Disables all followers from chasing the player or reenables it.
 *
 *   Chase:
 *   - Sets all followers to chase the player or not.
 *
 * ---
 *
 * Follower: Set Target Chase
 * - Disables target follower from chasing the player or reenables it.
 *
 *   Follower ID:
 *   - Select which follower ID to disable/reenable chasing for.
 *
 *   Chase:
 *   - Sets target follower to chase its target or not.
 *
 * ---
 *
 * Follower: Set Control
 * - Sets the event commands to target a follower when "Player" is selected as
 *   the target.
 *
 *   Follower ID:
 *   - Select which follower ID to control.
 *   - 0 is the player.
 *
 * ---
 *
 * Follower: Reset
 * - Resets all follower controls. Event Commands that target the "Player"
 *   return to normal and followers chase again.
 *
 * ---
 * 
 * === Global Switch Plugin Commands ===
 * 
 * ---
 * 
 * Global Switch: Get Self Switch A B C D
 * - Gets the current ON/OFF value from a Self Switch and stores it onto a
 *   Global Switch.
 * 
 *   Map ID:
 *   - The map the source map. Use 0 for current map.
 *   - You may use JavaScript code.
 * 
 *   Event ID:
 *   - The ID of the source event.
 *   - Use 0 for current event.
 *   - You may use JavaScript code.
 * 
 *   Letter:
 *   - Letter of the target event's Self Switch to obtain data from.
 * 
 *   -
 * 
 *   Target Switch ID:
 *   - The ID of the target switch.
 * 
 * ---
 * 
 * Global Switch: Get Self Switch ID
 * - Gets the current ON/OFF value from a Self Switch and stores it onto a
 *   Global Switch.
 * 
 *   Map ID:
 *   - The map the source map. Use 0 for current map.
 *   - You may use JavaScript code.
 * 
 *   Event ID:
 *   - The ID of the source event.
 *   - Use 0 for current event.
 *   - You may use JavaScript code.
 * 
 *   Switch ID:
 *   - The ID of the source switch.
 * 
 *   -
 * 
 *   Target Switch ID:
 *   - The ID of the target switch.
 * 
 * ---
 * 
 * === Global Variable Plugin Commands ===
 * 
 * ---
 * 
 * Global Variable: Get Self Variable ID
 * - Gets the current stored value from a Self Variable and stores it onto a
 *   Global Variable.
 * 
 *   Map ID:
 *   - The map the source map. Use 0 for current map.
 *   - You may use JavaScript code.
 * 
 *   Event ID:
 *   - The ID of the source event.
 *   - Use 0 for current event.
 *   - You may use JavaScript code.
 * 
 *   Variable ID:
 *   - The ID of the source variable.
 * 
 *   -
 * 
 *   Target Variable ID:
 *   - The ID of the target variable.
 * 
 * ---
 * 
 * === Morph Event Plugin Commands ===
 * 
 * ---
 *
 * Morph Event: Change
 * - Runs the page of a different event remotely.
 *
 *   Step 1:
 *
 *     Map ID:
 *     - Target event's map. Use 0 for current map.
 *     - You may use JavaScript code.
 *
 *     Event ID:
 *     - The ID of the target event.
 *     - Use 0 for current event.
 *     - You may use JavaScript code.
 *
 *   Step 2:
 *
 *     Template Name:
 *     - Name of the target event template to morph into.
 *     - Ignored if this is called "Untitled".
 *
 *     Map ID:
 *     - Target event's map. Use 0 for current map.
 *     - You may use JavaScript code.
 *
 *     Event ID:
 *     - The ID of the target event.
 *     - Use 0 for current event.
 *     - You may use JavaScript code.
 *
 *     Preserve Morph:
 *     - Is the morph effect preserved?
 *     - Or does it expire upon leaving the map?
 *
 * ---
 *
 * Morph Event: Remove
 * - Remove the morph status of an event.
 *
 *   Map ID:
 *   - Target event's map. Use 0 for current map.
 *   - You may use JavaScript code.
 *
 *   Event ID:
 *   - The ID of the event to remotely run.
 *   - Use 0 for current event.
 *   - You may use JavaScript code.
 *
 *   Remove Preservation:
 *   - Also remove the preservation effect?
 *
 * ---
 * 
 * === Player Icon Plugin Commands ===
 * 
 * ---
 *
 * Player Icon: Change
 * - Change the icon that appears on on the player.
 *
 *   Icon Index:
 *   - Icon index used for the icon.
 *   - You may use JavaScript code.
 *
 *   Buffer X:
 *   - How much to shift the X position by?
 *   - You may use JavaScript code.
 *
 *   Buffer Y:
 *   - How much to shift the Y position by?
 *   - You may use JavaScript code.
 *
 *   Blend Mode:
 *   - What kind of blend mode do you wish to apply to the icon sprite?
 *
 * ---
 *
 * Player Icon: Delete
 * - Delete the icon that appears on the player.
 *
 * ---
 * 
 * === Player Movement Plugin Commands ===
 * 
 * ---
 * 
 * Player Movement: Control
 * - Enable or disable player control over the player character's movement.
 * 
 *   Enable?:
 *   - Let the player control where the player character moves?
 * 
 * ---
 * 
 * Player Movement: Diagonal
 * - Override settings to for player diagonal movement.
 * 
 *   Setting:
 *   - How do you want to change diagonal movement?
 *   - Default: Whatever the Map Uses
 *   - Forcefully Disable Diagonal Movement
 *   - Forcefully Enable Diagonal Movement
 * 
 * ---
 * 
 * === Self Data Plugin Commands ===
 * 
 * ---
 * 
 * Self Data: Reset All
 * - Reset the Self Switch and Self Variable data of all events within the
 *   specified map.
 * 
 *   Map ID:
 *   - The map the target map. Use 0 for current map.
 *   - You may use JavaScript code.
 * 
 * ---
 * 
 * === Self Switch Plugin Commands ===
 * 
 * ---
 *
 * Self Switch: A B C D
 * - Change the Self Switch of a different event.
 *
 *   Map ID:
 *   - The map the target map. Use 0 for current map.
 *   - You may use JavaScript code.
 *
 *   Event ID:
 *   - The ID of the target event.
 *   - Use 0 for current event.
 *   - You may use JavaScript code.
 *
 *   Letter:
 *   - Letter of the target event's Self Switch to change.
 *
 *   Value:
 *   - What value do you want to set the Self Switch to?
 *
 * ---
 *
 * Self Switch: Switch ID
 * - Change the Self Switch of a different event.
 *
 *   Map ID:
 *   - The map the target map. Use 0 for current map.
 *   - You may use JavaScript code.
 *
 *   Event ID:
 *   - The ID of the target event.
 *   - Use 0 for current event.
 *   - You may use JavaScript code.
 *
 *   Switch ID:
 *   - The ID of the target switch.
 *
 *   Value:
 *   - What value do you want to set the Self Switch to?
 *
 * ---
 * 
 * === Self Variable Plugin Commands ===
 * 
 * ---
 *
 * Self Variable: Variable ID
 * - Change the Self Variable of a different event.
 *
 *   Map ID:
 *   - The map the target map. Use 0 for current map.
 *   - You may use JavaScript code.
 *
 *   Event ID:
 *   - The ID of the target event.
 *   - Use 0 for current event.
 *   - You may use JavaScript code.
 *
 *   Variable ID:
 *   - The ID of the target variable.
 *
 *   Value:
 *   - What value do you want to set the Self Switch to?
 *
 * ---
 * 
 * === Spawn Event Plugin Commands ===
 * 
 * ---
 *
 * Spawn Event: Spawn At X, Y
 * - Spawns desired event at X, Y location on the current map.
 *
 *   Step 1:
 *
 *     Template Name:
 *     - Name of the target event template to spawn as.
 *     - Ignored if this is called "Untitled".
 *
 *     Map ID:
 *     - Target event's map to be used as reference.
 *     - You may use JavaScript code.
 *
 *     Event ID:
 *     - The ID of the target event to be used as reference.
 *     - You may use JavaScript code.
 *
 *   Step 2:
 *
 *     X Coordinate:
 *     - Target Location to spawn at.
 *     - You may use JavaScript code.
 *
 *     Y Coordinate:
 *     - Target Location to spawn at.
 *     - You may use JavaScript code.
 *
 *     Check Event Collision:
 *     - Check collision with any other events and player?
 *
 *     Check Passability:
 *     - Check passability of the target location.
 *
 *     Preserve Spawn:
 *     - Is the spawned event preserved?
 *     - Or does it expire upon leaving the map?
 *
 *   Step 3:
 *
 *     Success Switch ID:
 *     - Target switch ID to record spawning success.
 *     - Ignore if ID is 0. OFF means failed. ON means success.
 *
 * ---
 *
 * Spawn Event: Spawn At Region
 * - Spawns desired event at a random region-marked location on the
 *   current map.
 *
 *   Step 1:
 *
 *     Template Name:
 *     - Name of the target event template to spawn as.
 *     - Ignored if this is called "Untitled".
 *
 *     Map ID:
 *     - Target event's map to be used as reference.
 *     - You may use JavaScript code.
 *
 *     Event ID:
 *     - The ID of the target event to be used as reference.
 *     - You may use JavaScript code.
 *
 *   Step 2:
 *
 *     Region ID(s):
 *     - Pick region(s) to spawn this event at.
 *
 *     Check Event Collision:
 *     - Check collision with any other events and player?
 *
 *     Check Passability:
 *     - Check passability of the target location.
 *
 *     Preserve Spawn:
 *     - Is the spawned event preserved?
 *     - Or does it expire upon leaving the map?
 *
 *   Step 3:
 *
 *     Success Switch ID:
 *     - Target switch ID to record spawning success.
 *     - Ignore if ID is 0. OFF means failed. ON means success.
 *
 * ---
 *
 * Spawn Event: Spawn At Terrain Tag
 * - Spawns desired event at a random terrain tag-marked location on the
 *   current map.
 *
 *   Step 1:
 *
 *     Template Name:
 *     - Name of the target event template to spawn as.
 *     - Ignored if this is called "Untitled".
 *
 *     Map ID:
 *     - Target event's map to be used as reference.
 *     - You may use JavaScript code.
 *
 *     Event ID:
 *     - The ID of the target event to be used as reference.
 *     - You may use JavaScript code.
 *
 *   Step 2:
 *
 *     Terrain Tag(s):
 *     - Pick terrain tag(s) to spawn this event at.
 *     - Insert numbers between 0 and 7.
 *
 *     Check Event Collision:
 *     - Check collision with any other events and player?
 *
 *     Check Passability:
 *     - Check passability of the target location.
 *
 *     Preserve Spawn:
 *     - Is the spawned event preserved?
 *     - Or does it expire upon leaving the map?
 *
 *   Step 3:
 *
 *     Success Switch ID:
 *     - Target switch ID to record spawning success.
 *     - Ignore if ID is 0. OFF means failed. ON means success.
 *
 * ---
 *
 * Spawn Event: Despawn Event ID
 * - Despawns the selected Event ID on the current map.
 *
 *   Event ID
 *   - The ID of the target event.
 *   - You may use JavaScript code.
 *
 * ---
 *
 * Spawn Event: Despawn At X, Y
 * - Despawns any spawned event(s) at X, Y location on the current map.
 *
 *   X Coordinate:
 *   - Target Location to despawn at.
 *   - You may use JavaScript code.
 *
 *   Y Coordinate:
 *   - Target Location to despawn at.
 *   - You may use JavaScript code.
 *
 * ---
 *
 * Spawn Event: Despawn Region(s)
 * - Despawns the selected Region(s) on the current map.
 *
 *   Region ID(s):
 *   - Pick region(s) and despawn everything inside it.
 *
 * ---
 *
 * Spawn Event: Despawn Terrain Tag(s)
 * - Despawns the selected Terrain Tags(s) on the current map.
 *
 *   Terrain Tag(s):
 *   - Pick terrain tag(s) and despawn everything inside it.
 *   - Insert numbers between 0 and 7.
 *
 * ---
 *
 * Spawn Event: Despawn Everything
 * - Despawns all spawned events on the current map.
 *
 * ---
 *
 * ============================================================================
 * Move Route Custom Commands
 * ============================================================================
 *
 * Some custom commands have been added to the "Set Movement Route" event
 * command. These can be accessed by pressing the "Script..." command and
 * typing in the following, which don't need to be in code form.
 *
 * Keep in mind that since these are custom additions and RPG Maker MZ does not
 * allow plugins to modify the editor, the "Preview" button will not factor in
 * the effects of these commands.
 * 
 * If you wish to use a value from a variable, insert $gameVariables.value(x)
 * or \V[x] in place of the x in any of the below.
 * 
 * If you wish to use a value from a self variable, insert \SelfVar[x] in place
 * of the x in any of the below. This will only draw from the current event. If
 * you wish to draw data from outside event self variables, we recommend you
 * use the \V[x] variant after using the Plugin Commands to draw data from them
 * for the best accuracy.
 *
 * ---
 * 
 * Animation: x
 * - Replace 'x' with the ID of the animation to play on moving unit.
 *
 * ---
 * 
 * Balloon: name
 * - Replace 'name' with any of the following to play a balloon on that the
 *   target moving unit.
 * - '!', '?', 'Music Note', 'Heart', 'Anger', 'Sweat', 'Cobweb', 'Silence',
 *   'Light Bulb', 'Sleep', 'User-Defined 1', 'User-Defined 2',
 *   'User-Defined 3', 'User-Defined 4', 'User-Defined 5'
 *    - Do NOT insert quotes.
 * - Examples:
 *   - Balloon: !
 *   - Balloon: Sleep
 *   - Balloon: Heart
 *
 * ---
 * 
 * Fade In: x
 * Fade Out: x
 * - Fades in/out the sprite's opacity.
 * - Fade In will continuously raise the opacity level until it reaches 255.
 * - Fade Out will continuously lower the opacity level until it reaches 0.
 * - Replace 'x' with the speed to fade in/out the sprite.
 * 
 * ---
 * 
 * Force Carry: On
 * Force Carry: Off
 * - For usage with the VS8 sprite sheet.
 * - Use ON to turn force carrying on.
 * - Use OFF to turn force carrying off.
 * - Sprites using the VS8 sprite sheet will also show the VS8 Carry frames.
 * 
 * ---
 * 
 * Force Dash: On
 * Force Dash: Off
 * - Use ON to turn force dashing on.
 * - Use OFF to turn force dashing off.
 * - Forces dashing will prompt the player or event to be in the dashing state.
 * - Sprites using the VS8 sprite sheet will also show the VS8 Dashing frames.
 * 
 * ---
 * 
 * Hug: Left
 * Hug: Right
 * - Causes the moving unit to hug the left/right side of the wall.
 *
 * ---
 * 
 * Index: x
 * - Replace 'x' with a number depicting the character index to change the
 *   moving unit's sprite to.
 *
 * ---
 * 
 * Index: +x
 * Index: -x
 * - Replace 'x' with the value to change the character index of the moving
 *   unit's sprite by.
 *
 * ---
 * 
 * Jump Forward: x
 * - Replace 'x' with the number of tiles for the unit to jump forward by.
 *
 * ---
 * 
 * Jump To: x, y
 * - Replace 'x' and 'y' with the coordinates for the unit to jump to.
 *
 * ---
 * 
 * Jump to Event: x
 * - Replace 'x' with the ID of the event for the unit to jump to.
 *
 * ---
 * 
 * Jump to Player
 * - Causes the moving unit to jump to the player.
 *
 * ---
 * 
 * Jump To Home
 * - Causes the event to jump to its home position.
 * - This only works on events, not player characters or followers.
 * 
 * ---
 * 
 * Move Lower Left Until Stop
 * Move Down Until Stop
 * Move Lower Right Until Stop
 * Move Left Until Stop
 * Move Right Until Stop
 * Move Upper Left Until Stop
 * Move Up Until Stop
 * Move Upper Right Until Stop
 * - Causes the moving unit to move that direction until it hits a stop.
 * - Events will stop moving before they make contact with the player.
 *
 * ---
 * 
 * Crash Move Lower Left Until Stop
 * Crash Move Down Until Stop
 * Crash Move Lower Right Until Stop
 * Crash Move Left Until Stop
 * Crash Move Right Until Stop
 * Crash Move Upper Left Until Stop
 * Crash Move Up Until Stop
 * Crash Move Upper Right Until Stop
 * - Causes the moving unit to move that direction until it hits a stop.
 * - Events can crash into the player and trigger an event.
 *
 * ---
 * 
 * Move To: x, y
 * - Replace 'x' and 'y' with the map coordinates to move the unit to through
 *   pathfinding.
 * - This uses RPG Maker MZ's pathfinding algorithm. It is not perfect so do
 *   not expect the most optimal results.
 * - Events will go around the player.
 *
 * ---
 * 
 * Crash Move To: x, y
 * - Replace 'x' and 'y' with the map coordinates to move the unit to through
 *   pathfinding.
 * - This uses RPG Maker MZ's pathfinding algorithm. It is not perfect so do
 *   not expect the most optimal results.
 * - Events can crash into the player and trigger an event.
 *
 * ---
 * 
 * Move to Event: x
 * - Replace 'x' with the ID of the event to move the unit to.
 * - This uses RPG Maker MZ's pathfinding algorithm. It is not perfect so do
 *   not expect the most optimal results.
 * - Events will go around the player.
 *
 * ---
 * 
 * Crash Move to Event: x
 * - Replace 'x' with the ID of the event to move the unit to.
 * - This uses RPG Maker MZ's pathfinding algorithm. It is not perfect so do
 *   not expect the most optimal results.
 * - Events can crash into the player and trigger an event.
 *
 * ---
 * 
 * Move to Player
 * - Moves the unit to the player.
 * - This uses RPG Maker MZ's pathfinding algorithm. It is not perfect so do
 *   not expect the most optimal results.
 *
 * ---
 * 
 * Move to Home
 * - Moves the unit towards their home position on the map.
 * - This only works on events, not player characters or followers.
 * - This uses RPG Maker MZ's pathfinding algorithm. It is not perfect so do
 *   not expect the most optimal results.
 * 
 * ---
 * 
 * Crash Move to Home
 * - Moves the unit towards their home position on the map.
 * - This only works on events, not player characters or followers.
 * - This uses RPG Maker MZ's pathfinding algorithm. It is not perfect so do
 *   not expect the most optimal results.
 * - Events can crash into the player and trigger an event.
 * 
 * ---
 * 
 * Move Lower Left: x
 * Move Down: x
 * Move Lower Right: x
 * Move Left: x
 * Move Right: x
 * Move Upper Left: x
 * Move Up: x
 * Move Upper Right: x
 * - Replace 'x' with the number of times to move the unit by in the designated
 *   direction on the map.
 * - Events can crash into the player and trigger an event.
 *
 * ---
 * 
 * Opacity: x%
 * - Replace 'x' with the percentage to change the unit's sprite opacity to.
 *
 * ---
 * 
 * Opacity: +x
 * Opacity: -x
 * - Replace 'x' with the increment to change the unit's sprite opacity by.
 *
 * ---
 *
 * Pattern Lock: x
 * - Replace 'x' with the step pattern to lock the unit's sprite to.
 *
 * ---
 *
 * Pattern Unlock
 * - Removes pattern lock effect.
 *
 * ---
 * 
 * Pose: name
 * - If using a VS8 sprite, this will cause the unit to strike a pose.
 * - Replace 'name' with any the following:
 * - 'Item', 'Hmph', 'Victory', 'Hurt', 'Kneel', 'Collapse',
 *   '!', '?', 'Music Note', 'Heart', 'Anger', 'Sweat', 'Cobweb', 'Silence',
 *   'Light Bulb', 'Sleep'
 *    - Do NOT insert quotes.
 * - Examples:
 *   - Balloon: Item
 *   - Balloon: Victory
 *   - Balloon: ?
 *
 * ---
 * 
 * Step Toward: x, y
 * - Replace 'x' and 'y' for the desired coordinates for the unit to take one
 *   step towards.
 * - This uses RPG Maker MZ's pathfinding algorithm. It is not perfect so do
 *   not expect the most optimal results.
 *
 * ---
 * 
 * Step Toward Event: x
 * - Replace 'x' with the ID of the event for the unit to take one step to.
 * - This uses RPG Maker MZ's pathfinding algorithm. It is not perfect so do
 *   not expect the most optimal results.
 *
 * ---
 * 
 * Step Toward Player
 * - Causes event to take one step towards the player.
 * - This uses RPG Maker MZ's pathfinding algorithm. It is not perfect so do
 *   not expect the most optimal results.
 *
 * ---
 * 
 * Step Toward Home
 * - Causes the event to take one step towards its home position.
 * - This only works on events, not player characters or followers.
 * - This uses RPG Maker MZ's pathfinding algorithm. It is not perfect so do
 *   not expect the most optimal results.
 * 
 * ---
 * 
 * Step Away From: x, y
 * - Replace 'x' and 'y' for the desired coordinates for the unit to take one
 *   step away from.
 * - This uses RPG Maker MZ's pathfinding algorithm. It is not perfect so do
 *   not expect the most optimal results.
 *
 * ---
 * 
 * Step Away From Event: x
 * - Replace 'x' with the ID of the event for the unit to take one step from.
 * - This uses RPG Maker MZ's pathfinding algorithm. It is not perfect so do
 *   not expect the most optimal results.
 *
 * ---
 * 
 * Step Away From Player
 * - Causes event to take one step away from the player.
 * - This uses RPG Maker MZ's pathfinding algorithm. It is not perfect so do
 *   not expect the most optimal results.
 *
 * ---
 * 
 * Step Away From Home
 * - Causes the event to take one step away from its home position.
 * - This only works on events, not player characters or followers.
 * - This uses RPG Maker MZ's pathfinding algorithm. It is not perfect so do
 *   not expect the most optimal results.
 * 
 * ---
 * 
 * Turn To: x, y
 * - Replace 'x' and 'y' for the coordinates to make the unit face towards.
 * - This supports 8 directional turning.
 *
 * ---
 * 
 * Turn to Event: x
 * - Replace 'x' with the ID of the event to turn the unit towards.
 * - This supports 8 directional turning.
 *
 * ---
 * 
 * Turn to Player
 * - Causes the unit to turn towards the player.
 * - This supports 8 directional turning.
 *
 * ---
 * 
 * Turn to Home
 * - Causes the event to turn towards its home position.
 * - This refers to the original position's X/Y on the map.
 * - The event will turn and face the tile that is its original X/Y location.
 * - This only works on events, not player characters or followers.
 * 
 * ---
 * 
 * Turn Away From: x, y
 * - Replace 'x' and 'y' for the coordinates to make the unit face away from.
 * - This supports 8 directional turning.
 *
 * ---
 * 
 * Turn Away From Event: x
 * - Replace 'x' with the ID of the event to turn the unit away from.
 * - This supports 8 directional turning.
 *
 * ---
 * 
 * Turn Away From Player
 * - Causes the unit to turn away from the player.
 * - This supports 8 directional turning.
 *
 * ---
 * 
 * Turn Away From Home
 * - Causes the event to turn away from its home position.
 * - This only works on events, not player characters or followers.
 * 
 * ---
 * 
 * Turn Lower Left
 * Turn Lower Right
 * Turn Upper Left
 * Turn Upper Right
 * - Causes the unit to turn to one of the diagonal directions.
 *
 * ---
 * 
 * Self Switch x: On
 * Self Switch x: Off
 * Self Switch x: Toggle
 * - Replace 'x' with 'A', 'B', 'C', 'D', or a <Self> Switch ID to adjust the
 *   unit's Self Switch.
 *
 * ---
 * 
 * Self Variable x: y
 * - Replace 'x' with a <Self> Variable ID to adjust the unit's Self Variable.
 * - Replace 'y' with a number value to set the Self Variable to.
 *
 * ---
 * 
 * Teleport To: x, y
 * - Replace 'x' and 'y' with the coordinates to instantly move the unit to.
 *
 * ---
 * 
 * Teleport to Event: x
 * - Replace 'x' with the ID of the event to instantly move the unit to.
 *
 * ---
 * 
 * Teleport to Player
 * - Instantly moves the unit to the player's location.
 *
 * ---
 * 
 * Teleport to Home
 * - Instantly teleports an event to its home position on the map.
 * - This only works on events, not player characters or followers.
 * 
 * ---
 * 
 * If none of the commands are detected above, then a script call will be ran.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Event Label Settings
 * ============================================================================
 *
 * Event Labels are small windows created to display text over an event's head.
 * They're set up using the <Label> notetags and/or comment tags. Event Labels
 * are a great way to instantly relay information about the event's role to
 * the player.
 *
 * ---
 *
 * Event Labels
 * 
 *   Sprite Based?:
 *   - Use sprite-based labels instead of legacy-window version.
 *   - Legacy-window version will not be supported in future.
 *   - Sprite-based labels are more memory efficient and work better
 *     compatibility-wise.
 * 
 *   Mobile-Enabled?:
 *   - Enable event labels for mobile devices?
 * 
 *   Font Size:
 *   - The font size used for the Event Labels.
 * 
 *   Icon Size:
 *   - The size of the icons used in the Event Labels.
 * 
 *   Line Height:
 *   - The line height used for the Event Labels.
 * 
 *   Offset X:
 *   - Globally offset all labels horizontally by this amount.
 * 
 *   Offset Y:
 *   - Globally offset all labels vertically by this amount.
 * 
 *   Fade Speed:
 *   - Fade speed for labels.
 * 
 *   Visible Range:
 *   - Range the player has to be within the event to make its label visible.
 * 
 *     Range Type:
 *     - What do you want the default label visible range type?
 *       - Square
 *       - Diamond
 *       - Circle
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Event Icon Settings
 * ============================================================================
 *
 * Icons can be displayed over an event's head through the <Icon> notetags
 * and/or comment tags. These can be used for a variety of things such as
 * making them look like they're carrying an item or to indicate they have a
 * specific role.
 *
 * ---
 *
 * Event Icon
 * 
 *   Buffer X:
 *   - Default X position buffer for event icons.
 * 
 *   Buffer Y:
 *   - Default Y position buffer for event icons.
 * 
 *   Blend Mode:
 *   - Default blend mode for even icons.
 *     - 0 - Normal
 *     - 1 - Additive
 *     - 2 - Multiply
 *     - 3 - Screen
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Event Template Settings
 * ============================================================================
 *
 * Event Templates allow you to store specific maps and/or event data to bring
 * out on need while having a premade set base. They're similar to prefabs but
 * aren't things that can be altered individually as one setting for an event
 * template will serve as a blueprint for all of them that use them.
 *
 * Event Templates are used for the <Copy Event> notetags, the Morph Event and
 * Spawn Event Plugin Commands.
 *
 * ---
 *
 * Settings
 * 
 *   Preloaded Maps:
 *   - A list of all the ID's of the maps that will be preloaded to serve as
 *     template maps for this plugin.
 *
 * ---
 *
 * Templates
 * - A list of all the Event Templates used by this project. Used for notetags
 *   and Plugin Commands.
 * 
 *     Name:
 *     - Name of the template. It'll be used as anchor points for notetags and
 *       Plugin Commands.
 * 
 *     Map ID:
 *     - ID of the map the template event is stored on.
 *     - This will automatically add this ID to preloaded list.
 * 
 *     Event ID:
 *     - ID of the event the template event is based on.
 * 
 *     JavaScript:
 *       JS: Pre-Copy:
 *       JS: Post-Copy:
 *       JS: Pre-Morph:
 *       JS: Post-Morph:
 *       JS: Pre-Spawn:
 *       JS: Post-Spawn:
 *       - Code that's ran during certain circumstances.
 *       - The code will occur at the same time as the ones listed in the main
 *         Event Template Settings Plugin Parameters. However, the ones listed
 *         in these individual entries will only occur for these specific
 *         templates and only if the templates are used.
 *
 * ---
 *
 * JavaScript
 * 
 *   JS: Pre-Copy:
 *   JS: Post-Copy:
 *   JS: Pre-Morph:
 *   JS: Post-Morph:
 *   JS: Pre-Spawn:
 *   JS: Post-Spawn:
 *   - Code that's ran during certain circumstances.
 *   - These are global and are ran for all copies, morphs, and/or spawns.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Movement Settings
 * ============================================================================
 *
 * These plugin parameters allow you to control how movement works in your
 * game, toggling it from 4-directional to 8-directional, setting up rules to
 * stop self-movement from events while an event or message is present, and
 * other aesthetics such as tilting the sprite while dashing, setting shadows
 * beneath the sprites, and allow for turning in place.
 * 
 * Shadows do NOT appear for sprites using a "!" as their leading filename
 * marker. These sprites are environmental and are considered "object"
 * characters by the RPG Maker MZ core scripts. They do not utilize character
 * shadows due.
 *
 * ---
 *
 * 8 Directional Movement
 * 
 *   Enable:
 *   - Allow 8-directional movement by default? Players can move diagonally.
 * 
 *   Strict Collision:
 *   - Enforce strict collission rules where the player must be able to pass
 *     both cardinal directions?
 * 
 *   Favor Horizontal:
 *   - Favor horizontal if cannot pass diagonally but can pass both
 *     horizontally and vertically?
 * 
 *   Slower Diagonals?
 *   - Enforce a slower movement speed when moving diagonally?
 * 
 *     Speed Multiplier
 *     - What's the multiplier to adjust movement speed when moving diagonally?
 *
 * ---
 *
 * Automatic Movement
 * 
 *   Stop During Events:
 *   - Stop automatic event movement while events are running.
 * 
 *   Stop During Messages:
 *   - Stop automatic event movement while a message is running.
 *
 * ---
 * 
 * Bitmap
 * 
 *   Smoothing:
 *   - Do you want to smooth or pixelate the map sprites?
 *   - Pixelating them is better for zooming and tilting.
 * 
 * ---
 *
 * Dash
 * 
 *   Dash Modifier:
 *   - Alters the dash speed modifier.
 * 
 *   Dash on Ladder?
 *   - Allow dashing while on a ladder or rope?
 * 
 *   Enable Dash Tilt?:
 *   - Tilt any sprites that are currently dashing?
 * 
 *     Tilt Left Amount:
 *     - Amount in radians when moving left (upper left, left, lower left).
 * 
 *     Tilt Right Amount:
 *     - Amount in radians when moving right (upper right, right, lower right).
 * 
 *     Tilt Vertical Amount:
 *     - Amount in radians when moving vertical (up, down).
 *
 * ---
 * 
 * Event Movement
 * 
 *   Random Move Weight:
 *   - Use numbers between 0 and 1.
 *   - Numbers closer to 1 stay closer to their home position.
 *   - 0 to disable it.
 * 
 *   Shift Y:
 *   - How many pixels should non-tile characters be shifted by?
 *   - Negative: up. Positive: down.
 * 
 * ---
 * 
 * Path Finding
 * 
 *   Mobile-Enabled?:
 *   - Enable diagonal pathfinding for mobile devices?
 * 
 * ---
 *
 * Shadows
 * 
 *   Show:
 *   - Show shadows on all events and player-related sprites.
 * 
 *   Default Filename:
 *   - Default filename used for shadows found in img/system/ folder.
 * 
 *   Shadow Z Layer:
 *   - What is the sprite Z layer used for the shadow sprites?
 *     - In-game layers are as follows:
 *     - 0 : Lower tiles
 *     - 1 : Lower characters
 *     - 3 : Normal characters
 *     - 4 : Upper tiles
 *     - 5 : Upper characters
 *     - 6 : Airship shadow
 *     - 7 : Balloon
 *     - 8 : Animation
 *     - 9 : Destination
 *
 * ---
 *
 * Turn in Place
 * 
 *   Enable:
 *   - When not dashing, player will turn in place before moving.
 *   - This only applies with keyboard inputs.
 * 
 *   Delay in Frames:
 *   - The number of frames to wait before moving.
 *
 * ---
 * 
 * Vehicle Speeds
 * 
 *   Boat Speed:
 *   - Allows you to adjust the base speed of the boat vehicle.
 * 
 *   Ship Speed:
 *   - Allows you to adjust the base speed of the ship vehicle.
 * 
 *   Airship Speed:
 *   - Allows you to adjust the base speed of the airship vehicle.
 * 
 * ---
 * 
 * Wall Bump
 * 
 *   Enable?:
 *   - Enable the sound effect to be played when bumping into a wall?
 * 
 * ---
 *
 * ============================================================================
 * Plugin Parameters: VisuStella 8-Dir Settings
 * ============================================================================
 *
 * These are settings for sprite sheets using the VS8 format.
 * For more information on the VS8 format, look in the help section above.
 *
 * ---
 *
 * Balloon Icon Settings
 * 
 *   Auto-Balloon Poses:
 *   - Automatically pose VS8 sprites when using balloon icons.
 * 
 *   Balloon Offset X:
 *   - Offset balloon icons on VS8 sprites by x pixels.
 * 
 *   Balloon Offset Y:
 *   - Offset balloon icons on VS8 sprites by y pixels.
 *
 * ---
 *
 * Icons
 * 
 *   Auto Buffer:
 *   - Automatically buffer the X and Y coordinates of VS8 sprites?
 * 
 *   Use Carry Pose:
 *   - Use the carry pose when moving with an icon overhead.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Region Rulings
 * ============================================================================
 *
 * These settings allow you to decide the passability of the player, events,
 * and various vehicles through the usage of Regions.
 *
 * ---
 *
 * Allow Regions
 * 
 *   All Allow:
 *   Walk Allow:
 *   Player Allow:
 *   Event Allow:
 *   Vehicle Allow:
 *   Boat Allow:
 *   Ship Allow:
 *   Airship Allow:
 *   - Insert Region ID's where the affected unit type can enter.
 *   - Region ID's range from 0 to 255.
 *
 * ---
 *
 * Forbid Regions
 * 
 *   All Forbid:
 *   Walk Forbid:
 *   Player Forbid:
 *   Event Forbid:
 *   Vehicle Forbid:
 *   Boat Forbid:
 *   Ship Forbid:
 *   Airship Forbid:
 *   - Insert Region ID's where the affected unit type cannot enter.
 *   - Region ID's range from 0 to 255.
 *
 * ---
 *
 * Dock Regions
 * 
 *   Vehicle Dock:
 *   Boat Dock:
 *   Ship Dock:
 *   Airship Dock:
 *   - Insert Region ID's where the affected vehicle can dock
 *   - Region ID's range from 0 to 255.
 * 
 *   Only Region Dockable:
 *   - Vehicles are only able to dock at designated regions.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Common Event on OK Button
 * ============================================================================
 *
 * These Plugin Parameters allow you to setup Common Events that activate using
 * Regions when pressing the OK button while standing on top of them or in
 * front of them. These let you create near universally interactable objects
 * using Regions, such as rivers to start up fishing events or locations to
 * places items on.
 *
 * ---
 *
 * Regions
 * 
 *   Regions 1 - 255:
 *   - Which Common Event does this region activate?
 *   - Use 0 to not activate any Common Events.
 *
 * ---
 *
 * Target Tile
 * 
 *   Target Tile:
 *   - Which tile should be checked for Common Event on OK Button?
 *     - Tile in front of player.
 *     - Tile player is standing on top of.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Common Event on Touch
 * ============================================================================
 *
 * These Plugin Parameters allow you to setup Common Events that trigger when
 * stepping onto Region-marked tiles. These let you create custom effects that
 * will occur such as customized damage floors, traps, and/or events.
 * 
 * Areas marked with these regions will not allow random encounters to occur.
 * This is how RPG Maker works. Assuming you are not using plugins at all, by
 * putting on touch events all over the map, tiles with those on touch events
 * will not let random encounters trigger.
 *
 * ---
 *
 * Regions
 * 
 *   Regions 1 - 255:
 *   - Which Common Event does this region activate?
 *   - Use 0 to not activate any Common Events.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Terrain Tag Settings
 * ============================================================================
 *
 * Terrain Tags are used in Database => Tilesets to mark certain tiles and
 * give them unique properties through terrain tags.
 *
 * ---
 *
 * Terrain Tag ID's
 * 
 *   Rope:
 *   - Which terrain tag number to use for ropes?
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
 * Version 1.61: December 15, 2025
 * * Bug Fixes!
 * ** Fixed a bug where shadows would appear under lower-priority event sprites
 *    making usage of certain tiles awkward looking. This is corrected by the
 *    new Plugin Parameter. Fix made by Arisu.
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Feature!
 * ** New Plugin Parameter added by Arisu:
 * *** Parameters > Movement Settings > Shadows > Shadow Z Layer
 * **** What is the sprite Z layer used for the shadow sprites?
 * **** By default, this layer will now be 0.5 instead of 0.
 * * Feature Update!
 * ** If a event is made whose priority is "Below characters" and is a tile
 *    object (ie taking a sprite from the map tileset or a character sprite
 *    with "!" in front of the name), it will be automatically regulated to
 *    a custom Z layer of 0.
 * 
 * Version 1.60: August 29, 2024
 * * Bug Fixes!
 * ** Fixed a bug where events with large hitboxes do not work with crash move.
 *    Fix made by Arisu.
 * ** Fixed a bug where single-mode save games by Save Core would freeze after
 *    executed event movements. Fix made by Arisu.
 * * Documentation Update!
 * ** Help file updated for new features.
 * * Feature Update!
 * ** Event Labels will adjust their vertical position to the picture of any
 *    attached event picture if one is present. Update by Arisu.
 * * New Features!
 * ** New Notetags added by Arisu:
 * *** <Picture Type: Enemy>
 * *** <Picture Type: SV Enemy>
 * **** Will use /img/enemies/ or /img/sv_enemies/ instead of /img/pictures/ to
 *      grab a picture graphic from.
 * **** Other picture graphic sprite related notetags will apply as normal.
 * *** <Label Range Type: Square>
 * *** <Label Range Type: Circle>
 * *** <Label Range Type: Diamond>
 * **** Sets a range type for the label to appear visible for.
 * ** New Plugin Parameters added by Arisu:
 * *** Parameters > Event Label Settings > Visible Range > Range Type:
 * **** What do you want the default label visible range type?
 * 
 * Version 1.59: June 13, 2024
 * * Bug Fixes!
 * ** Added a cache check for character sprite tag names to reduce frame drops.
 *    Fix made by Arisu.
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New notetags added by Arisu:
 * *** <Location X: +x>, <Location X: -x>
 * *** <Location Y: +y>, <Location Y: -y>
 * *** <Location: +x, +y>, <Location: +x, -y>
 * *** <Location: -x, +y>, <Location: -x, -y>
 * **** Adjusts the initial location of this event by +x and +y (or -x and -y).
 * **** This allows you to stack events on top of each other or even move them
 *      to various places of the map.
 * *** <Tile Expand Up: x>
 * *** <Tile Expand Down: x>
 * *** <Tile Expand Left: x>
 * *** <Tile Expand Right: x>
 * **** Used for events with tile graphics. Expands the graphic up, down, left,
 *      or right from the spritesheet.
 * **** This does NOT expand the hitbox.
 * **** The graphic will be anchored to the tile it's expanded from. This means
 *      even if you expanded downward, the actual event's position will still
 *      be the current event's X/Y coordinates. It's just grown more vertically
 *      and is still centered horizontally.
 * **** This is primarily used to save on having to use too many events for
 *      tiles that expanded past 1x1 tile sizes.
 * 
 * Version 1.58: May 16, 2024
 * * Documentation Update!
 * ** Added "Features: Character Sprite Filename Tags" section.
 * * New Features!
 * ** [Invisible] tag added to character sprite filenames.
 * *** If a character sprite's filename has [invisible] in it, it will become
 *     invisible on the map screen in-game while almost everything else about
 *     it is visible. This is used for those who wish to use sprite labels for
 *     things such as autorun and parallel events.
 * 
 * Version 1.57: March 14, 2024
 * * Documentation Update!
 * ** Help file updated for new features.
 * * Feature Update!
 * ** Plugin Command: "Event Icon: Delete" will now keep an event icon cleared
 *    until the newly added Plugin Command: "Event Icon: Restore" is used.
 *    Update made by Arisu.
 * ** Plugin Command: "Event Icon: Change" is now renamed to have "(Temporary)"
 *    after its name in order to clarify the temporary changes made to it.
 * * New Features!
 * ** New Plugin Command added by Arisu:
 * *** Event Icon: Event Icon: Change (Forced)
 * **** Change the icon that appears on an event.
 * **** This change is forced and needs to be restored.
 * *** Event Icon: Restore
 * **** Restores a deleted or forced icon that appears on an event.
 * 
 * Version 1.56: February 15, 2024
 * * Documentation Update!
 * ** Help file updated for new features.
 * * Feature Update!
 * ** Added fail safes for activation proximity notetags when loaded from past
 *    save files without Events and Movement Core installed. Added by Arisu.
 * * New Features!
 * ** New notetags added by Arisu:
 * *** <Encounter Half Square: x>
 * *** <Encounter Half Circle: x>
 * *** <Encounter Half Delta: x>
 * *** <Encounter Half Row: x>
 * *** <Encounter Half Column: x>
 * *** <Encounter None Square: x>
 * *** <Encounter None Circle: x>
 * *** <Encounter None Delta: x>
 * *** <Encounter None Row: x>
 * *** <Encounter None Column: x>
 * **** If the player is within the 'x' area effect of this event, the random
 *      encounter rate will be halved or suppressed completely depending on the
 *      notetag used.
 * **** These include script call checks.
 * *** <Erase if Encounter Half>
 * *** <Erase if Encounter None>
 * **** Automatically erase this event if the player's party has an encounter
 *      half or encounter none effect, or if the event has spawned in an
 *      encounter half or encounter none area.
 * **** This check only occurs in two situations: when the map is first loaded
 *      after being teleported into or when the player leaves a menu and
 *      returns back to the map.
 * **** Events that have been erased due to this effect will NOT return even if
 *      the encounter half/none effect is removed while the player is still on
 *      the map. The event will return if the player exits the map and comes
 *      back.
 * 
 * Version 1.55: December 14, 2023
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Plugin Commands added by Arisu:
 * *** Event Popup: Player
 * *** Event Popup: Follower
 * *** Event Popup: Event
 * *** Event Popup: Target Tile
 * **** Makes a centered event popup on the player sprite, target follower
 *      sprite, target event sprite, or target tile.
 * **** All of these new Plugin Commands require VisuMZ_1_MessageCore and
 *      cannot be used in battle.
 * 
 * Version 1.54: October 12, 2023
 * * Documentation Update!
 * ** Help file updated for new features.
 * ** Help file updated to reduce confusion:
 * *** Call Event: Remote Read
 * **** This will run the page of the target event on the current event.
 * **** This means that any "This Event" commands will be applied to the event
 *      using this Plugin Command and NOT the target event that page data is
 *      being retrieved from.
 * **** Think of it as the current event using the target called event as a
 *      Common Event ala how RPG Maker 2003 works (for those familiar with it).
 * * Feature Update!
 * ** Renamed "Call Event: Remote Activation" to "Call Event: Remote Read" to
 *    reduce confusion.
 * * Feature Update!
 * ** <Activation Radius: x> notetag is now defined as <Activation Delta: x>
 * *** 'Radius' variant will still work and function as 'Delta' but will no
 *     longer be listed in the help file as 'Radius'
 * *** This is changed to avoid confusion with the new notetag.
 * * New Features!
 * ** New notetag added by Arisu and sponsored by AndyL:
 * *** <Activation Circle: x>
 * **** A circle-shaped range with the event at the center.
 * **** 'x' represents the distance from the center.
 * 
 * Version 1.53: August 17, 2023
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** <Map Load Common Event: x>
 * ** <Map Load Common Events: x, x, x>
 * *** When this map is loaded, run the specified Common Events once available.
 * **** Does NOT trigger if you transfer to a different part of the same map.
 * 
 * Version 1.52: July 13, 2023
 * * Documentation Update!
 * ** Help file updated for new features.
 * ** Updated help file for <Label: text> notetags:
 * *** If text codes are used, avoid text codes that use < and > wrappers.
 * ** Updated help file for <Label> sandwich notetags:
 * *** You can use text codes with < and > wrappers.
 * * Feature Update!
 * ** Event labels now work properly with scaling sprites.
 * * New Features!
 * ** New notetag added by Arisu and sponsored by Anon:
 * *** <Label Hue Shift: +x>
 * *** <Label Hue Shift: -x>
 * **** Changes the hue of the event label by +x or -x every frame.
 * **** Keep in mind that since this is changing hue, this will appear to have
 *      no effect if you are using black and white labels.
 * **** Use labels with text codes that add color to them like '\C[4]text'
 * **** This only works with the sprite version of event labels and does not
 *      work with the legacy version.
 * 
 * Version 1.51: June 15, 2023
 * * Bug Fixes!
 * ** Provided a fail safe for plugins using the scaling options from this
 *    plugin but do not have scaling parameters identified. The scaling ratio
 *    should now default to 1.0. Fix made by Olivia.
 * * Feature Update!
 * ** Diagonal pathfinding is now improved as to not get stuck on tight corners
 *    on the map. Feature update made by Arisu.
 * 
 * Version 1.50: April 13, 2023
 * * Bug Fixes!
 * ** <Icon: x> should now update correctly when changing pages through self
 *    switches or other event conditions. Fix made by Arisu.
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Plugin Parameters added by Arisu:
 * *** Plugin Parameters > Event Labels > Mobile-Enabled?
 * *** Plugin Parameters > Movement > Pathfinding > Mobile-Enabled?
 * **** These settings allow you to enable or disable certain features when
 *      played on mobile devices for better performance.
 * 
 * Version 1.49: March 16, 2023
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Event Notetag and Comment Tags added by Arisu:
 * *** <Scale: x%>
 * *** <Scale X: x%>
 * *** <Scale Y: y%>
 * **** Changes the scale of the sprite to the designated size.
 * 
 * Version 1.48: January 20, 2023
 * * Feature Update!
 * ** <Move Synch> for certain types will also copy facing directions even if
 *    there are no tile movements (ie changing directions when pressed up
 *    against and obstacle). Update made by Arisu.
 * 
 * Version 1.47: November 10, 2022
 * * Feature Update!
 * ** If "Follower: Set Global Chase" is set to false, followers will no longer
 *    jump towards the player location when the player jumps. This does NOT
 *    apply to gather or location changing players. Followers will still have
 *    to synchronize their positions there regardless in order to maintain
 *    consistency. Update made by Olivia.
 * 
 * Version 1.46: September 29, 2022
 * * Bug Fixes!
 * ** Altered the self switch auto-reset timing to reduce errors. Fix by Arisu.
 * * Feature Update!
 * ** Added self-movement prevention whenever scenes are deactivated. Update
 *    made by Arisu.
 * 
 * Version 1.45: August 18, 2022
 * * Bug Fixes!
 * ** Fixed a bug that caused event labels with variables from refreshing
 *    properly. Fix made by Arisu.
 * 
 * Version 1.44: July 21, 2022
 * * Bug Fixes!
 * ** Fixed a problem that caused <Exit Reset Self Data> notetag to not work.
 *    Fix made by Arisu.
 * * Feature Update!
 * ** Diagonal pathfinding is now disabled when there are too many events on a
 *    map, causing extra collission checks. This value is set to 100 for the
 *    time being until we can figure out a better way to calculate diagonal
 *    pathfinding. Update made by Irina.
 * 
 * Version 1.43: July 14, 2022
 * * Bug Fixes!
 * ** Move to Player for events should no longer cause hang ups. Fix by Olivia.
 * * Documentation Update!
 * ** Help file updated for new features.
 * * Feature Update!
 * ** Added caching function for pathfinding when using touch movement for a
 *    smoother experience. When touch movement is held down, pathfinding will
 *    utilize the non-diagonal function for less resource consumption to
 *    prevent FPS frame drops. Update made by Arisu.
 * * New Features!
 * ** New notetag added by Arisu:
 * *** <Playtest>
 * **** If this notetag is found in the event's notebox (NOT comments), then
 *      the event will only appear during a playtest session. It will not
 *      appear in a deployed game where the playtest flag is not on.
 * 
 * Version 1.42: June 23, 2022
 * * Documentation Update!
 * ** Help file updated for new features.
 * ** Added to <Copy Event: x, y> notetag help:
 * *** - If '0' is used for the Map ID, reference the current map.
 * * Feature Update!
 * ** Default MZ behavior would have "below characters" trigger events with
 *    only comments lock out facing "same as characters" trigger events. This
 *    is now bypassed. Update made by Arisu.
 * ** The <Copy Event: mapID, eventID> notetags now allow usage of '0' for the
 *    mapID to reference the current map. Update made by Arisu.
 * ** <Save Event Location> should now work more efficiently. Update by Arisu.
 * ** Dashing animations for followers will no longer look weird after having
 *    gathered up and then proceeding to dash. Update made by Irina.
 * * New Features!
 * ** New event notetag added by Arisu:
 * *** <Exit Reset Self Data>
 * **** When the player leaves the current map, all Self Switches and Self
 *      Variables related to this event will be reset.
 * ** New Plugin Command added by Arisu and sponsored by Anon:
 * *** Self Data: Reset All
 * **** Reset the Self Switch and Self Variable data of all events within the
 *      specified map.
 * ** New Plugin Parameter added by Arisu and sponsored by Anon:
 * *** Plugin Params > Movement Settings > Dash > Dash on Ladder?
 * **** Allow dashing while on a ladder or rope?
 * 
 * Version 1.41: June 1, 2022
 * * Bug Fixes!
 * ** Parallel Process Common Events above 1000 should no longer crash the
 *    game. Bug fixed by Irina.
 * 
 * Version 1.40: May 19, 2022
 * * Bug Fixes!
 * ** Sprite Event Labels with distance properties will now work properly
 *    when changing from a non-met page condition to a met page condition.
 *    Fix made by Arisu.
 * 
 * Version 1.39: May 5, 2022
 * * Bug Fixes!
 * ** Save event location should now work properly with Set Event Location
 *    command. Fix made by Arisu.
 * ** Sprite Event Labels with distance properties will no longer be visible
 *    when constantly entering/exiting the Main Menu. Fix made by Arisu.
 * 
 * Version 1.38: April 28, 2022
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Plugin Parameter added by Arisu and sponsored by Archeia:
 * *** Plugin Parameters > Movement Settings > Event Movement > Shift Y
 * **** How many pixels should non-tile characters be shifted by?
 * ** New Notetags added by Arisu and sponsored by Archeia:
 * *** <Picture Filename: filename>
 * **** applies a picture graphic from the /img/pictures/ folder of your
 *      game project.
 * **** This graphic will be on top of the character sprite but below the event
 *      icon sprite.
 * **** The picture priority will be the same as the event's priority. If it is
 *      "below characters", the player can walk on top of it. If it is "above
 *      characters", the player will behind it. If it is "same as characters",
 *      the priority will be based on the current relative Y position.
 * *** <Picture Max Size: x>
 * *** <Picture Scale: y%>
 * **** If the "Max Size" or "Scale" supplementary notetags are used, the
 *      picture graphic will be scaled proportionally to fit either the exact
 *      pixel size for "Max Size" or the "Scale" ratio.
 * *** <Picture Offset: +x, +y>
 * *** <Picture Offset: -x, -y>
 * **** Offsets the X and Y position of the event picture relative to the event
 *      sprite's own position.
 * *** <Picture Wait Frames: x>
 * **** Requires VisuMZ_4_AnimatedPictures! "Wait Frames" is used with VisuMZ's
 *      Animated Pictures plugin. This determines the delay inbetween
 *      frame changes.
 * 
 * Version 1.37: March 24, 2022
 * * Documentation Update!
 * ** Added extra clarity to "Turn to Home" Movement Command.
 * *** This refers to the original position's X/Y on the map.
 * *** The event will turn and face the tile that is its original X/Y location.
 * 
 * Version 1.36: March 17, 2022
 * * Bug Fixes!
 * ** "Turn To Home" movement command now properly faces the home position.
 *    Fix made by Irina.
 * * Feature Update!
 * ** Plugin Commands now have separators for easier selection.
 * 
 * Version 1.35: March 3, 2022
 * * IMPORTANT! Compatibility Update!
 * ** Compatibility Update with RPG Maker MZ 1.4.4.
 * *** For some reason this update broke any saves made before 1.4.4 was
 *     updated and they cannot be loaded. The only way saves would load is if
 *     you made a safe after 1.4.4 was done. This should be fixed and saves
 *     made with 1.4.3 and before should now be working. Update made by Irina.
 * 
 * Version 1.34: February 17, 2022
 * * Documentation Update!
 * ** Help file updated for new features.
 * * Optimization Update!
 * ** Plugin should run more optimized.
 * * New Features!
 * ** Arisu has created new event notetag/comment tags:
 * *** <Custom Z: x>
 * **** Replace 'x' with a number value to determine the event sprite's Z value
 *      relative to the tilemap.
 * **** View the helpfile for more information.
 * *** <Mirror Sprite>
 * **** The event sprite's visual appearance is mirrored.
 * *** <Move Synch Distance Opacity: x>
 * **** Changes the opacity of the event based on the distance between it and
 *      its move synched target. Closer means more opaque. Further away means
 *      more transparent.
 * ** Irina has created a more memory efficient version of Event Labels.
 * *** Plugin Parameters > Event Label Settings > Sprite Based?
 * **** Use sprite-based labels instead of legacy-window version.
 * **** Legacy-window version will not be supported in future.
 * 
 * Version 1.33: February 3, 2022
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Notetags added by Arisu!
 * *** <Hide Player>
 * *** <Show Player>
 * **** Map Notetag. Forcefully hides or shows the player sprite. This is so
 *      you don't need to manually turn the setting on/off each time you enter
 *      a specific map.
 * *** <Hide Followers>
 * *** <Show Followers>
 * **** Map Notetag. Forcefully hides or shows the player's followers. This is
 *      so you don't need to manually turn them on/off each time you enter a
 *      specific map.
 * 
 * Version 1.32: January 20, 2022
 * * Bug Fixes!
 * ** Self Variable changes from custom move routes should no longer cause
 *    crashes. Fix made by Arisu.
 * ** Self Switch custom move route toggles should now work properly. Fix made
 *    by Arisu.
 * * Feature Update!
 * ** Better shadow tracking algorithm to remove any shadow twitching.
 *    Update made by Yanfly.
 * 
 * Version 1.31: January 6, 2022
 * * Optimization Update!
 * ** Plugin should run more optimized.
 * 
 * Version 1.30: November 25, 2021
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** Map Switches and Map Variables added by Arisu:
 * *** Map Switches are self-switches for maps. Instead of using <Self>, use
 *     <Map> in the Switch name to designate it as a Map Switch. The ON/OFF
 *     data for that Switch will vary depending on the map the player is
 *     currently on.
 * *** Map Variables are self-variables for maps. Instead of using <Self>, use
 *     <Map> in the Variable name to designate it as a Map Switch. The number
 *     data for that Variable will vary depending on the map the player is
 *     currently on.
 * *** Script Calls have been added for these features as well.
 * **** See help file for them.
 * 
 * Version 1.29: October 7, 2021
 * * Bug Fixes!
 * ** Same map event spawning should now work properly without the need to add
 *    the current map ID to the preloaded map array. Update made by Arisu.
 * 
 * Version 1.28: September 30, 2021
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New move route commands added by Arisu:
 * *** Jump to Home
 * *** Move to Home
 * *** Crash Move to Home
 * *** Step Toward Home
 * *** Step Away From Home
 * *** Turn to Home
 * *** Turn Away From Home
 * *** Teleport to Home
 * **** These only work on events. Their actions should be reflective of what
 *      their command names suggest.
 * 
 * Version 1.27: September 17, 2021
 * * Bug Fixes!
 * ** Fixed event spawn templates so that they can work properly with Common
 *    Events. Fix made by Arisu.
 * 
 * Version 1.26: September 3, 2021
 * * Bug Fixes!
 * ** "Step Towards Player" custom command should now work properly. Fix made
 *    by Arisu.
 * ** Having multiple region restriction notetags for a map will no longer
 *    cause others to lock out. Fix made by Arisu.
 * 
 * Version 1.25: July 30, 2021
 * * Bug Fixes!
 * ** Fixed a problem that caused the 'setSelfSwitchValue' and
 *    'setSelfVariableValue' functions to not work properly. Fix made by Irina.
 * 
 * Version 1.24: June 4, 2021
 * * Documentation Update!
 * ** Help file updated for new features.
 * ** Added extra clarification on which commands will go around the player
 *    character and which ones won't.
 * * New Move Route Custom Commands added by Arisu:
 * ** Crash Move (direction) Until Stop
 * ** Crash Move To: x, y
 * ** Crash Move To Event: x
 * *** These allow events to collide with the player character and trigger
 *     Event Touch events.
 * 
 * Version 1.23: May 21, 2021
 * * Bug Fixes!
 * ** Morphing by templates should no longer cause a crash. Fix made by Arisu.
 * 
 * Version 1.22: May 7, 2021
 * * Bug Fixes!
 * ** Plugin Commands for Event Label Visibility should now update without
 *    needing to take steps as per distance detection. Fix made by Arisu.
 * * Documentation Update!
 * ** Added clarity to "Common Event on Touch" Plugin Parameters.
 * *** Areas marked with these regions will not allow random encounters to
 *     occur. This is how RPG Maker works. Assuming you are not using plugins
 *     at all, by putting on touch events all over the map, tiles with those on
 *     touch events will not let random encounters trigger.
 * 
 * Version 1.21: March 12, 2021
 * * Bug Fixes!
 * ** Move until stop custom move routes should no longer cause crashes.
 *    Fix made by Arisu.
 * 
 * Version 1.20: February 26, 2021
 * * Bug Fixes!
 * ** Region Restrictions regarding Player Allow will no longer affect vehicle
 *    passability. Update made by Arisu.
 * 
 * Version 1.19: February 12, 2021
 * * Bug Fixes!
 * ** "Self Variable: Variable ID" plugin command's Map ID should now be able
 *    to use "0" to self reference the current map. Fix made by Olivia.
 * 
 * Version 1.18: February 5, 2021
 * * Bug Fixes!
 * ** Event icon plugin commands should now work properly. Fix made by Arisu.
 * * Documentation Update!
 * ** Added new "Features: Weighted Random Movement" section.
 * ** Help file updated for new features.
 * * New Features!
 * ** New Notetags added by Arisu:
 * *** <Random Move Weight: x>
 * **** If this tag is used on an event with random-type autonomous movement,
 *      then the event will stick closer to their home location (where they are
 *      located upon spawning on the map). How close they stick to their home
 *      location will depend on the weighted 'x' value.
 * *** <True Random Move>
 * **** If this tag is used on an event with random-type autonomous movement,
 *      then that event will ignore the effects of weighted randomized
 *      movement.
 * ** New Plugin Commands added by Arisu and sponsored by AndyL:
 * *** Event Timer: Change Speed
 * *** Event Timer: Expire Event Assign
 * *** Event Timer: Expire Event Clear
 * *** Event Timer: Frames Gain
 * *** Event Timer: Frames Set
 * *** Event Timer: Pause
 * *** Event Timer: Resume
 * **** The above Plugin Commands allow you to control the game timer better.
 * ** New Plugin Parameters added by Arisu:
 * *** Plugin Parameters > Movement > Event Movement > Random Move Weight
 * **** Use numbers between 0 and 1. Numbers closer to 1 stay closer to their
 *      home position.
 * 
 * Version 1.17: January 29, 2021
 * * Documentation Update!
 * ** Added "Do NOT insert quotes" to "Balloon: name" and "Pose: name".
 * ** Added Examples for extra clarification.
 * * Optimization Update!
 * ** When touch clicking an event on a map with multiple events, pathfinding
 *    will utilize the non-diagonal function for less resource consumption to
 *    prevent FPS frame drops. Fix made by Arisu.
 * 
 * Version 1.16: January 22, 2021
 * * Optimization Update!
 * ** When touch clicking multiple times on an impassable tile, pathfinding
 *    will utilize the non-diagonal function for less resource consumption to
 *    prevent FPS frame drops. Fix made by Arisu.
 * 
 * Version 1.15: January 1, 2021
 * * Bug Fixes!
 * ** Spawned events should now resume their automated self movement after
 *    being interacted with. Fix made by Yanfly.
 * * Documentation Update!
 * ** Help file updated for new features.
 * ** Help file updated for updated features.
 * * Feature Updates!
 * ** Collission checks for the Spawn Event Plugin Commands now account for
 *    the spawning event's Hitbox, too. Update made by Yanfly.
 * ** Spawn Event Plugin Commands adds a new parameter "Success Switch ID" to
 *    check if the spawning has been successful or not.
 * * New Features!
 * ** New Plugin Commands added by Yanfly!
 * *** Spawn Event: Spawn At Terrain Tag
 * *** Spawn Event: Despawn Terrain Tag(s)
 * **** These function similar to their region counterparts except they target
 *      terrain tags instead.
 * 
 * Version 1.14: December 18, 2020
 * * Bug Fixes!
 * ** Caching for event label positions now account for page index.
 *    Fix made by Yanfly.
 * * Documentation Update!
 * ** Added documentation for the new features!
 * * New Features!
 * ** New Plugin Commands added by Irina.
 * *** Follower: Set Global Chase
 * *** Follower: Set Target Chase
 * *** Follower: Set Control
 * *** Follower: Reset
 * **** These plugin commands allow you to change whether or not the followers
 *      will chase their intended targets and/or shift control over their
 *      movement route from the "Player" to the target follower.
 * 
 * Version 1.13: December 4, 2020
 * * Bug Fixes!
 * ** Caching for event label positions now account for one-screen maps.
 *    Fix made by Arisu.
 * 
 * Version 1.12: November 29, 2020
 * * Bug Fixes!
 * ** Click Triggers no longer work on erased events. Fix made by Arisu.
 * ** Erased events no longer have icons appear above their heads.
 *    Fix made by Arisu.
 * * Feature Update!
 * ** Initialization of the plugin's effects no only occur if the event's
 *    current page settings have been altered. Change made by Arisu.
 * * Optimization Update!
 * ** Plugin should run more optimized.
 * 
 * Version 1.11: November 15, 2020
 * * Bug Fixes!
 * ** Morph plugin command should no longer cause crashes. Fix made by Yanfly.
 * * Documentation Update!
 * ** Added documentation for the updated features!
 * * Feature Updates!
 * ** Updates to these Plugin Commands made by Yanfly:
 * *** Call Event: Remote Activation
 * *** Event Icon: Change
 * *** Event Icon: Delete
 * *** Event Location: Create
 * *** Event Location: Delete
 * *** Global Switch: Get Self Switch A B C D
 * *** Global Switch: Get Self Switch ID
 * *** Global Variable: Get Self Variable ID
 * *** Morph Event: Change
 * *** Morph Event: Remove
 * *** Self Switch: A B C D
 * *** Self Switch: Switch ID
 * *** Self Variable: Variable ID
 * **** All of the above Plugin Commands can now use 0 for their Event ID's in
 *      order to refer to the running event's ID value.
 * 
 * Version 1.10: November 1, 2020
 * * Bug Fixes!
 * ** Spawned Event preserve function now works properly. Fix made by Arisu.
 * 
 * Version 1.09: October 25, 2020
 * * Documentation Update
 * ** Added clarity on the notetags and comment tags on when their effects
 *    are present.
 * * Feature Update!
 * ** Event icons now have an unsmoothing property to them to make them
 *    look better. Update made by Irina.
 * 
 * Version 1.08: October 11, 2020
 * * Compatibility Update
 * ** Added failsafes for better compatibility.
 * 
 * Version 1.07: October 4, 2020
 * * Documentation Update!
 * ** Updated for the new features!
 * * Feature Update!
 * ** Data from deleted events will now be cleared and removed from maps if the
 *    events do not exist to prevent conflict with plugins from the VisuStella
 *    MZ library and other plugins. Feature added by Irina.
 * ** Move Route Custom Commands now support self variable values! If you wish
 *    to use a value from a self variable, insert \SelfVar[x] in place of the x
 *    in any of the below. This will only draw from the current event. If you 
 *    wish to draw data from outside event self variables, we recommend you
 *    use the \V[x] variant after using the Plugin Commands to draw data from
 *    them for the best accuracy.
 * * New Features!
 * ** New Plugin Parameter added by Yanfly!
 * *** Movement > Bitmap > Smoothing
 * **** Do you want to smooth or pixelate the map sprites? Pixelating them is
 *      better for zooming and tilting.
 * 
 * Version 1.06: September 27, 2020
 * * Bug Fixes!
 * ** Events & Movement Core no longer disables the Core Engine's Smart Event
 *    Collision plugin parameter. Fix made by Yanfly.
 * * Documentation Update!
 * ** Move Route Custom Commands updated with the new feature for inserting
 *    variable values.
 * * Feature Update!
 * ** Move Route Custom Commands now support $gameVariable.value(x) values.
 *    You can also just use \V[x] for variable values, too. Added by Irina.
 * 
 * Version 1.05: September 20, 2020
 * * Bug Fixes!
 * ** If player movement is disabled, mouse movement is disabled, too.
 *    Fix made by Arisu.
 * ** The region restriction notetags should be fixed and work again.
 *    Fix made by Arisu.
 * 
 * Version 1.04: September 13, 2020
 * * Feature Update!
 * * Some Move Route Custom Commands are updated to ignore spaces:
 * ** Jump To: x, y
 * ** Move To: x, y
 * ** Step Toward: x, y
 * ** Step Away From: x, y
 * ** Turn To: x, y
 * ** Turn Away From: x, y
 * ** Teleport To: x, y
 * *** These can now be written as x,y. There still needs to be a space between
 *     the : and x for parsing clarity, however.
 * *** Feature updated by Arisu with help from BlueMoon and Zeriab.
 * * New Features!
 * ** New 'Move Route Custom Commands' added by Arisu.
 * *** Fade In: x
 * *** Fade Out: x
 * *** Force Carry: On
 * *** Force Carry: Off
 * *** Force Dash: On
 * *** Force Dash: Off
 * ** New Plugin Commands added by Arisu.
 * *** Player Movement: Control
 * **** Enable or disable player control over the player character's movement.
 * *** Player Movement: Diagonal
 * **** Override settings to for player diagonal movement.
 * 
 * Version 1.03: September 6, 2020
 * * Bug Fixes!
 * ** Sleeping pose is now fixed and working! Fix made by Yanfly.
 * * Documentation Update!
 * ** Extended "Features: Self Switches and Variables" to explain how to use
 *    script calls to grab self switch information.
 * * New Features!
 * ** New Plugin Commands added by Yanfly:
 * *** Global Switch: Get Self Switch A B C D
 * *** Global Switch: Get Self Switch ID
 * *** Global Variable: Get Self Variable ID
 * **** These plugin commands allow you to transfer data stored in a self
 *      switch or Self Variable into a global switch or global variable.
 * 
 * Version 1.02: August 30, 2020
 * * Bug Fixes!
 * ** <Diagonal Movement: Off> notetag now works properly. Fix made by Yanfly.
 * ** Plugin Command "Event Label: Visible" now works properly. Fix made by
 *    Shaz.
 * ** Custom Move Route commands should now be working properly. Fix made by
 *    Shaz.
 * 
 * Version 1.01: August 23, 2020
 * * Bug Fixes!
 * ** Event Cache issues fixed upon loading a saved game. Fix made by Yanfly.
 *
 * Version 1.00: August 20, 2020
 * * Finished Plugin!
 *
 * ============================================================================
 * End of Helpfile
 * ============================================================================
 *
 * @ --------------------------------------------------------------------------
 *
 * @command Separator_AutoMove
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command AutoMoveEvents
 * @text Auto Movement: Events
 * @desc Allow/stop events from auto movement.
 *
 * @arg Value:str
 * @text Value
 * @type select
 * @option Allow
 * @value Allow
 * @option Stop
 * @value Stop
 * @option Toggle
 * @value Toggle
 * @desc Allow events to move automatically?
 * @default Allow
 *
 * @ --------------------------------------------------------------------------
 *
 * @command Separator_CallEvent
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command CallEvent
 * @text Call Event: Remote Read
 * @desc Runs the page of a different event remotely. This will run
 * the page of the target event on the CURRENT event.
 *
 * @arg MapId:eval
 * @text Map ID
 * @desc Target event's map. Use 0 for current map.
 * You may use JavaScript code.
 * @default 0
 *
 * @arg EventId:eval
 * @text Event ID
 * @desc The ID of the event to remotely run. Use 0 for current event. You may use JavaScript code.
 * @default 0
 *
 * @arg PageId:eval
 * @text Page ID
 * @desc The page of the remote event to run.
 * You may use JavaScript code.
 * @default 1
 *
 * @ --------------------------------------------------------------------------
 *
 * @command Separator_DashEnable
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command DashEnableToggle
 * @text Dash Enable: Toggle
 * @desc Enable/Disable Dashing on maps.
 *
 * @arg Value:str
 * @text Value
 * @type select
 * @option Enable
 * @value Enable
 * @option Disable
 * @value Disable
 * @option Toggle
 * @value Toggle
 * @desc What do you wish to change dashing to?
 * @default Enable
 *
 * @ --------------------------------------------------------------------------
 *
 * @command Separator_EventIcon
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command EventIconChange
 * @text Event Icon: Change (Temporary)
 * @desc Change the icon that appears on an event.
 * This change is temporary and resets upon new events.
 *
 * @arg MapId:eval
 * @text Map ID
 * @desc The map the target map. Use 0 for current map.
 * You may use JavaScript code.
 * @default 0
 *
 * @arg EventId:eval
 * @text Event ID
 * @parent MapId:eval
 * @desc The ID of the target event.  Use 0 for current event.
 * You may use JavaScript code.
 * @default 0
 *
 * @arg IconIndex:eval
 * @text Icon Index
 * @desc Icon index used for the icon.
 * You may use JavaScript code.
 * @default 1
 *
 * @arg IconBufferX:eval
 * @text Buffer X
 * @parent IconIndex:eval
 * @desc How much to shift the X position by?
 * You may use JavaScript code.
 * @default 0
 *
 * @arg IconBufferY:eval
 * @text Buffer Y
 * @parent IconIndex:eval
 * @desc How much to shift the Y position by?
 * You may use JavaScript code.
 * @default 12
 *
 * @arg IconBlendMode:num
 * @text Blend Mode
 * @parent IconIndex:eval
 * @type select
 * @option 0 - Normal
 * @value 0
 * @option 1 - Additive
 * @value 1
 * @option 2 - Multiply
 * @value 2
 * @option 3 - Screen
 * @value 3
 * @desc What kind of blend mode do you wish to apply to the icon sprite?
 * @default 0
 *
 * @ --------------------------------------------------------------------------
 *
 * @command EventIconChangeForced
 * @text Event Icon: Change (Forced)
 * @desc Change the icon that appears on an event.
 * This change is forced and needs to be restored.
 *
 * @arg MapId:eval
 * @text Map ID
 * @desc The map the target map. Use 0 for current map.
 * You may use JavaScript code.
 * @default 0
 *
 * @arg EventId:eval
 * @text Event ID
 * @parent MapId:eval
 * @desc The ID of the target event.  Use 0 for current event.
 * You may use JavaScript code.
 * @default 0
 *
 * @arg IconIndex:eval
 * @text Icon Index
 * @desc Icon index used for the icon.
 * You may use JavaScript code.
 * @default 1
 *
 * @arg IconBufferX:eval
 * @text Buffer X
 * @parent IconIndex:eval
 * @desc How much to shift the X position by?
 * You may use JavaScript code.
 * @default 0
 *
 * @arg IconBufferY:eval
 * @text Buffer Y
 * @parent IconIndex:eval
 * @desc How much to shift the Y position by?
 * You may use JavaScript code.
 * @default 12
 *
 * @arg IconBlendMode:num
 * @text Blend Mode
 * @parent IconIndex:eval
 * @type select
 * @option 0 - Normal
 * @value 0
 * @option 1 - Additive
 * @value 1
 * @option 2 - Multiply
 * @value 2
 * @option 3 - Screen
 * @value 3
 * @desc What kind of blend mode do you wish to apply to the icon sprite?
 * @default 0
 *
 * @ --------------------------------------------------------------------------
 *
 * @command EventIconDelete
 * @text Event Icon: Delete
 * @desc Delete the icon that appears on an event.
 * This will remain deleted and invisible for events.
 *
 * @arg MapId:eval
 * @text Map ID
 * @desc The map the target map. Use 0 for current map.
 * You may use JavaScript code.
 * @default 0
 *
 * @arg EventId:eval
 * @text Event ID
 * @parent MapId:eval
 * @desc The ID of the target event. Use 0 for current event.
 * You may use JavaScript code.
 * @default 0
 *
 * @ --------------------------------------------------------------------------
 *
 * @command EventIconRestore
 * @text Event Icon: Restore
 * @desc Restores a deleted or forced icon that appears on an event.
 *
 * @arg MapId:eval
 * @text Map ID
 * @desc The map the target map. Use 0 for current map.
 * You may use JavaScript code.
 * @default 0
 *
 * @arg EventId:eval
 * @text Event ID
 * @parent MapId:eval
 * @desc The ID of the target event. Use 0 for current event.
 * You may use JavaScript code.
 * @default 0
 *
 * @ --------------------------------------------------------------------------
 *
 * @command Separator_EventLabel
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command EventLabelRefresh
 * @text Event Label: Refresh
 * @desc Refresh all Event Labels on screen.
 *
 * @ --------------------------------------------------------------------------
 *
 * @command EventLabelVisible
 * @text Event Label: Visible
 * @desc Change the visibility of Event Labels.
 *
 * @arg Visibility:str
 * @text Visibility
 * @type select
 * @option Visible
 * @value Visible
 * @option Hidden
 * @value Hidden
 * @option Toggle
 * @value Toggle
 * @desc What do you wish to change visibility to?
 * @default Visible
 *
 * @ --------------------------------------------------------------------------
 *
 * @command Separator_EventLocation
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command EventLocationSave
 * @text Event Location: Save
 * @desc Memorize an event's map location so it reappears there
 * the next time the map is loaded.
 *
 * @arg EventId:eval
 * @text Event ID
 * @desc The ID of the target event.
 * You may use JavaScript code.
 * @default 1
 *
 * @ --------------------------------------------------------------------------
 *
 * @command EventLocationCreate
 * @text Event Location: Create
 * @desc Creates a custom spawn location for a specific map's event
 * so it appears there the next time the map is loaded.
 *
 * @arg MapId:eval
 * @text Map ID
 * @desc The map the target map. Use 0 for current map.
 * You may use JavaScript code.
 * @default 0
 *
 * @arg EventId:eval
 * @text Event ID
 * @parent MapId:eval
 * @desc The ID of the target event. Use 0 for current event.
 * You may use JavaScript code.
 * @default 0
 *
 * @arg PosX:eval
 * @text X Coordinate
 * @parent MapId:eval
 * @desc The X coordinate of the event.
 * You may use JavaScript code.
 * @default 0
 *
 * @arg PosY:eval
 * @text Y Coordinate
 * @parent MapId:eval
 * @desc The Y coordinate of the event.
 * You may use JavaScript code.
 * @default 0
 *
 * @arg Direction:num
 * @text Direction
 * @parent MapId:eval
 * @type select
 * @option 1 - Lower Left
 * @value 1
 * @option 2 - Down
 * @value 2
 * @option 3 - Lower Right
 * @value 3
 * @option 4 - Left
 * @value 4
 * @option 6 - Right
 * @value 6
 * @option 7 - Upper Left
 * @value 7
 * @option 8 - Up
 * @value 8
 * @option 9 - Upper Right
 * @value 9
 * @desc The direction the event will be facing.
 * @default 2
 *
 * @arg Optional
 *
 * @arg PageId:eval
 * @text Page ID
 * @parent Optional
 * @desc The page of the event to set the move route to.
 * You may use JavaScript code.
 * @default 1
 *
 * @arg MoveRouteIndex:eval
 * @text Move Route Index
 * @parent Optional
 * @desc The point in the move route for this event to be at
 * if the page ID matches the rest of the page conditions.
 * @default 0
 *
 * @ --------------------------------------------------------------------------
 *
 * @command EventLocationDelete
 * @text Event Location: Delete
 * @desc Deletes an event's saved map location.
 * The event will reappear at its default location.
 *
 * @arg MapId:eval
 * @text Map ID
 * @desc The map the target map. Use 0 for current map.
 * You may use JavaScript code.
 * @default 0
 *
 * @arg EventId:eval
 * @text Event ID
 * @desc The ID of the target event. Use 0 for current event.
 * You may use JavaScript code.
 * @default 0
 *
 * @ --------------------------------------------------------------------------
 *
 * @command Separator_EventPopup
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command MsgPopupPlayer
 * @text Event Popup: Player
 * @desc Makes a centered event popup on the player sprite.
 * Requires VisuMZ_1_MessageCore! Cannot be used in battle!
 *
 * @arg MessageText:json
 * @text Message Text
 * @type note
 * @desc Insert the text to be displayed.
 * Text codes can be used.
 * @default "+\\LastGainObjQuantity\\LastGainObj"
 * 
 * @arg MsgDuration:eval
 * @text Message Duration
 * @parent MessageText:json
 * @desc What is the frame duration of the event popup?
 * 60 frames = 1 second. You may use code.
 * @default 60
 *
 * @arg PopupExtra:struct
 * @text Popup Settings
 * @type struct<PopupExtra>
 * @desc These settings let you adjust how the popup animates.
 * @default {"Fade":"","fadeInDuration:eval":"8","fadeOutDuration:eval":"8","Offset":"","startOffsetX:eval":"+0","startOffsetY:eval":"-48","endOffsetX:eval":"+0","endOffsetY:eval":"-96","Scale":"","startScaleX:eval":"0.8","startScaleY:eval":"0.8","endScaleX:eval":"0.8","endScaleY:eval":"0.8","Angle":"","startAngle:eval":"+0","endAngle:eval":"+0","Misc":"","Arc:eval":"+0"}
 *
 * @ --------------------------------------------------------------------------
 *
 * @command MsgPopupFollower
 * @text Event Popup: Follower
 * @desc Makes a centered event popup on target follower sprite.
 * Requires VisuMZ_1_MessageCore! Cannot be used in battle!
 *
 * @arg FollowerIndex:eval
 * @text Follower Index
 * @desc Which follower index to play popup?
 * Index starts at 0. You may use JavaScript code.
 * @default 0
 *
 * @arg MessageText:json
 * @text Message Text
 * @type note
 * @desc Insert the text to be displayed.
 * Text codes can be used.
 * @default "\\I[23]"
 * 
 * @arg MsgDuration:eval
 * @text Message Duration
 * @parent MessageText:json
 * @desc What is the frame duration of the event popup?
 * 60 frames = 1 second. You may use code.
 * @default 60
 *
 * @arg PopupExtra:struct
 * @text Popup Settings
 * @type struct<PopupExtra>
 * @desc These settings let you adjust how the popup animates.
 * @default {"Fade":"","fadeInDuration:eval":"8","fadeOutDuration:eval":"8","Offset":"","startOffsetX:eval":"+0","startOffsetY:eval":"-48","endOffsetX:eval":"+0","endOffsetY:eval":"-96","Scale":"","startScaleX:eval":"0.8","startScaleY:eval":"0.8","endScaleX:eval":"0.8","endScaleY:eval":"0.8","Angle":"","startAngle:eval":"+0","endAngle:eval":"+0","Misc":"","Arc:eval":"+0"}
 *
 * @ --------------------------------------------------------------------------
 *
 * @command MsgPopupEvent
 * @text Event Popup: Event
 * @desc Makes a centered event popup on target event sprite.
 * Requires VisuMZ_1_MessageCore! Cannot be used in battle!
 *
 * @arg EventId:eval
 * @text Event ID
 * @desc The ID of the event to play popup on.
 * Use 0 for current event. You may use JavaScript code.
 * @default 0
 *
 * @arg MessageText:json
 * @text Message Text
 * @type note
 * @desc Insert the text to be displayed.
 * Text codes can be used.
 * @default "Line1\nLine2"
 * 
 * @arg MsgDuration:eval
 * @text Message Duration
 * @parent MessageText:json
 * @desc What is the frame duration of the event popup?
 * 60 frames = 1 second. You may use code.
 * @default 60
 *
 * @arg PopupExtra:struct
 * @text Popup Settings
 * @type struct<PopupExtra>
 * @desc These settings let you adjust how the popup animates.
 * @default {"Fade":"","fadeInDuration:eval":"8","fadeOutDuration:eval":"8","Offset":"","startOffsetX:eval":"+0","startOffsetY:eval":"-48","endOffsetX:eval":"+0","endOffsetY:eval":"-96","Scale":"","startScaleX:eval":"0.8","startScaleY:eval":"0.8","endScaleX:eval":"0.8","endScaleY:eval":"0.8","Angle":"","startAngle:eval":"+0","endAngle:eval":"+0","Misc":"","Arc:eval":"+0"}
 *
 * @ --------------------------------------------------------------------------
 *
 * @command MsgPopupTargetTile
 * @text Event Popup: Target Tile
 * @desc Makes a centered event popup on target tile.
 * Requires VisuMZ_1_MessageCore! Cannot be used in battle!
 *
 * @arg TileX:eval
 * @text Map Tile X
 * @desc The x coordinate of the map tile.
 * You may use JavaScript code.
 * @default $gameMap.width() / 2
 *
 * @arg TileY:eval
 * @text Map Tile Y
 * @desc The y coordinate of the map tile.
 * You may use JavaScript code.
 * @default $gameMap.height() / 2
 *
 * @arg MessageText:json
 * @text Message Text
 * @type note
 * @desc Insert the text to be displayed.
 * Text codes can be used.
 * @default "\\I[87]"
 * 
 * @arg MsgDuration:eval
 * @text Message Duration
 * @parent MessageText:json
 * @desc What is the frame duration of the event popup?
 * 60 frames = 1 second. You may use code.
 * @default 60
 *
 * @arg PopupExtra:struct
 * @text Popup Settings
 * @type struct<PopupExtra>
 * @desc These settings let you adjust how the popup animates.
 * @default {"Fade":"","fadeInDuration:eval":"8","fadeOutDuration:eval":"8","Offset":"","startOffsetX:eval":"+0","startOffsetY:eval":"-24","endOffsetX:eval":"+0","endOffsetY:eval":"-24","Scale":"","startScaleX:eval":"0.8","startScaleY:eval":"0.8","endScaleX:eval":"0.8","endScaleY:eval":"0.8","Angle":"","startAngle:eval":"+0","endAngle:eval":"+0","Misc":"","Arc:eval":"+0"}
 *
 * @ --------------------------------------------------------------------------
 *
 * @command Separator_EventTimer
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command EventTimerExpireEvent
 * @text Event Timer: Expire Event Assign
 * @desc Sets a Common Event to run upon expiration.
 * Bypasses the default code if one is set.
 *
 * @arg CommonEventID:num
 * @text Common Event ID
 * @type common_event
 * @desc Select the Common Event to run upon the timer's expiration.
 * @default 1
 *
 * @ --------------------------------------------------------------------------
 *
 * @command EventTimerSpeed
 * @text Event Timer: Change Speed
 * @desc Changes the timer frame decrease (or increase) speed.
 *
 * @arg Speed:eval
 * @text Speed
 * @desc How many 1/60ths of a second does each frame increase or
 * decrease by? Negative decreases. Positive increases.
 * @default -1
 *
 * @ --------------------------------------------------------------------------
 *
 * @command EventTimerExpireClear
 * @text Event Timer: Expire Event Clear
 * @desc Clears any set to expire Common Event and instead,
 * run the default Game_Timer expiration code.
 *
 * @ --------------------------------------------------------------------------
 *
 * @command EventTimerFramesGain
 * @text Event Timer: Frames Gain
 * @desc Chooses how many frames, seconds, minutes, or hours
 * are gained or lost for the event timer.
 *
 * @arg Frames:eval
 * @text Frames
 * @desc How many 1/60ths of a second are gained/lost?
 * Positive for gain. Negative for lost. JavaScript allowed.
 * @default +0
 *
 * @arg Seconds:eval
 * @text Seconds
 * @desc How many seconds are gained/lost?
 * Positive for gain. Negative for lost. JavaScript allowed.
 * @default +0
 *
 * @arg Minutes:eval
 * @text Minutes
 * @desc How many minutes are gained/lost?
 * Positive for gain. Negative for lost. JavaScript allowed.
 * @default +0
 *
 * @arg Hours:eval
 * @text Hours
 * @desc How many hours are gained/lost?
 * Positive for gain. Negative for lost. JavaScript allowed.
 * @default +0
 *
 * @ --------------------------------------------------------------------------
 *
 * @command EventTimerFramesSet
 * @text Event Timer: Frames Set
 * @desc Chooses how many frames, seconds, minutes, or hours
 * are set for the event timer.
 *
 * @arg Frames:eval
 * @text Frames
 * @desc Set frame count to this value.
 * Each frame is 1/60th of a second. JavaScript allowed.
 * @default 0
 *
 * @arg Seconds:eval
 * @text Seconds
 * @desc Set seconds to this value.
 * JavaScript allowed.
 * @default 0
 *
 * @arg Minutes:eval
 * @text Minutes
 * @desc Set minutes to this value.
 * Each minute is 60 seconds. JavaScript allowed.
 * @default 0
 *
 * @arg Hours:eval
 * @text Hours
 * @desc Set hours to this value.
 * Each hour is 60 minutes. JavaScript allowed.
 * @default 0
 *
 * @ --------------------------------------------------------------------------
 *
 * @command EventTimerPause
 * @text Event Timer: Pause
 * @desc Pauses the current event timer, but does not stop it.
 *
 * @ --------------------------------------------------------------------------
 *
 * @command EventTimerResume
 * @text Event Timer: Resume
 * @desc Resumes the current event timer from the paused state.
 *
 * @ --------------------------------------------------------------------------
 *
 * @command Separator_Follower
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command FollowerSetGlobalChase
 * @text Follower: Set Global Chase
 * @desc Disables all followers from chasing the player
 * or reenables it.
 *
 * @arg Chase:eval
 * @text Chase
 * @type boolean
 * @on Chase
 * @off Don't Chase
 * @desc Sets all followers to chase the player or not.
 * @default false
 *
 * @ --------------------------------------------------------------------------
 *
 * @command FollowerSetTargetChase
 * @text Follower: Set Target Chase
 * @desc Disables target follower from chasing the player
 * or reenables it.
 *
 * @arg FollowerID:eval
 * @text Follower ID
 * @desc Select which follower ID to disable/reenable chasing for.
 * @default 1
 *
 * @arg Chase:eval
 * @text Chase
 * @type boolean
 * @on Chase
 * @off Don't Chase
 * @desc Sets target follower to chase its target or not.
 * @default false
 *
 * @ --------------------------------------------------------------------------
 *
 * @command FollowerSetControl
 * @text Follower: Set Control
 * @desc Sets the event commands to target a follower when "Player"
 * is selected as the target.
 *
 * @arg FollowerID:eval
 * @text Follower ID
 * @desc Select which follower ID to control.
 * 0 is the player.
 * @default 1
 *
 * @ --------------------------------------------------------------------------
 *
 * @command FollowerReset
 * @text Follower: Reset
 * @desc Resets all follower controls. Event Commands that target
 * the "Player" return to normal and followers chase again.
 *
 * @ --------------------------------------------------------------------------
 *
 * @command Separator_GlobalSwitch
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SwitchGetSelfSwitchABCD
 * @text Global Switch: Get Self Switch A B C D
 * @desc Gets the current ON/OFF value from a Self Switch and
 * stores it onto a Global Switch.
 *
 * @arg MapId:eval
 * @text Map ID
 * @desc The map the source map. Use 0 for current map.
 * You may use JavaScript code.
 * @default 0
 *
 * @arg EventId:eval
 * @text Event ID
 * @desc The ID of the source event. Use 0 for current event.
 * You may use JavaScript code.
 * @default 0
 *
 * @arg Letter:str
 * @text Letter
 * @type select
 * @option A
 * @value A
 * @option B
 * @value B
 * @option C
 * @value C
 * @option D
 * @value D
 * @desc Letter of the target event's Self Switch to obtain data from.
 * @default A
 *
 * @arg Break
 * @text -
 *
 * @arg TargetSwitchId:num
 * @text Target Switch ID
 * @type switch
 * @desc The ID of the target switch.
 * @default 1
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SwitchGetSelfSwitchID
 * @text Global Switch: Get Self Switch ID
 * @desc Gets the current ON/OFF value from a Self Switch and
 * stores it onto a Global Switch.
 *
 * @arg MapId:eval
 * @text Map ID
 * @desc The map the source map. Use 0 for current map.
 * You may use JavaScript code.
 * @default 0
 *
 * @arg EventId:eval
 * @text Event ID
 * @desc The ID of the source event. Use 0 for current event.
 * You may use JavaScript code.
 * @default 0
 *
 * @arg SwitchId:num
 * @text Switch ID
 * @type switch
 * @desc The ID of the source switch.
 * @default 1
 *
 * @arg Break
 * @text -
 *
 * @arg TargetSwitchId:num
 * @text Target Switch ID
 * @type switch
 * @desc The ID of the target switch.
 * @default 1
 *
 * @ --------------------------------------------------------------------------
 *
 * @command Separator_GlobalVar
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command VariableGetSelfVariableID
 * @text Global Variable: Get Self Variable ID
 * @desc Gets the current stored value from a Self Variable and
 * stores it onto a Global Variable.
 *
 * @arg MapId:eval
 * @text Map ID
 * @desc The map the source map. Use 0 for current map.
 * You may use JavaScript code.
 * @default 0
 *
 * @arg EventId:eval
 * @text Event ID
 * @desc The ID of the source event. Use 0 for current event.
 * You may use JavaScript code.
 * @default 0
 *
 * @arg VariableId:num
 * @text Variable ID
 * @type variable
 * @desc The ID of the source variable.
 * @default 1
 *
 * @arg Break
 * @text -
 *
 * @arg TargetVariableId:num
 * @text Target Variable ID
 * @type variable
 * @desc The ID of the target variable.
 * @default 1
 *
 * @ --------------------------------------------------------------------------
 *
 * @command Separator_MorphEvent
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command MorphEventTo
 * @text Morph Event: Change
 * @desc Runs the page of a different event remotely.
 *
 * @arg Step1
 * @text Step 1: To Be Changed
 *
 * @arg Step1MapId:eval
 * @text Map ID
 * @parent Step1
 * @desc Target event's map. Use 0 for current map.
 * You may use JavaScript code.
 * @default 0
 *
 * @arg Step1EventId:eval
 * @text Event ID
 * @parent Step1
 * @desc The ID of the target event. Use 0 for current event.
 * You may use JavaScript code.
 * @default 0
 *
 * @arg Step2
 * @text Step 2: Change Into
 *
 * @arg TemplateName:str
 * @text Template Name
 * @parent Step2
 * @desc Name of the target event template to morph into.
 * Ignored if this is called "Untitled".
 * @default Untitled
 *
 * @arg Step2MapId:eval
 * @text Map ID
 * @parent Step2
 * @desc Target event's map. Use 0 for current map.
 * You may use JavaScript code.
 * @default 1
 *
 * @arg Step2EventId:eval
 * @text Event ID
 * @parent Step2
 * @desc The ID of the target event. Use 0 for current event.
 * You may use JavaScript code.
 * @default 0
 *
 * @arg Step2Preserve:eval
 * @text Preserve Morph
 * @parent Step2
 * @type boolean
 * @on Preserve
 * @off Expires
 * @desc Is the morph effect preserved?
 * Or does it expire upon leaving the map?
 * @default true
 *
 * @ --------------------------------------------------------------------------
 *
 * @command MorphEventRemove
 * @text Morph Event: Remove
 * @desc Remove the morph status of an event.
 *
 * @arg MapId:eval
 * @text Map ID
 * @parent Step1
 * @desc Target event's map. Use 0 for current map.
 * You may use JavaScript code.
 * @default 0
 *
 * @arg EventId:eval
 * @text Event ID
 * @parent Step1
 * @desc The ID of the event to remove morph from. Use 0 for current event. You may use JavaScript code.
 * @default 0
 *
 * @arg RemovePreserve:eval
 * @text Remove Preservation
 * @parent Step2
 * @type boolean
 * @on Remove
 * @off Contain
 * @desc Also remove the preservation effect?
 * @default true
 *
 * @ --------------------------------------------------------------------------
 *
 * @command Separator_PlayerIcon
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command PlayerIconChange
 * @text Player Icon: Change
 * @desc Change the icon that appears on on the player.
 *
 * @arg IconIndex:eval
 * @text Icon Index
 * @desc Icon index used for the icon.
 * You may use JavaScript code.
 * @default 1
 *
 * @arg IconBufferX:eval
 * @text Buffer X
 * @parent IconIndex:eval
 * @desc How much to shift the X position by?
 * You may use JavaScript code.
 * @default 0
 *
 * @arg IconBufferY:eval
 * @text Buffer Y
 * @parent IconIndex:eval
 * @desc How much to shift the Y position by?
 * You may use JavaScript code.
 * @default 12
 *
 * @arg IconBlendMode:num
 * @text Blend Mode
 * @parent IconIndex:eval
 * @type select
 * @option 0 - Normal
 * @value 0
 * @option 1 - Additive
 * @value 1
 * @option 2 - Multiply
 * @value 2
 * @option 3 - Screen
 * @value 3
 * @desc What kind of blend mode do you wish to apply to the icon sprite?
 * @default 0
 *
 * @ --------------------------------------------------------------------------
 *
 * @command PlayerIconDelete
 * @text Player Icon: Delete
 * @desc Delete the icon that appears on the player.
 *
 * @ --------------------------------------------------------------------------
 *
 * @command Separator_PlayerMovement
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command PlayerMovementChange
 * @text Player Movement: Control
 * @desc Enable or disable player control over the player character's movement.
 *
 * @arg Enable:eval
 * @text Enable?
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc Let the player control where the player character moves?
 * @default true
 *
 * @ --------------------------------------------------------------------------
 *
 * @command PlayerMovementDiagonal
 * @text Player Movement: Diagonal
 * @desc Override settings to for player diagonal movement.
 *
 * @arg Setting:str
 * @text Setting
 * @type select
 * @option Default: Whatever the Map Uses
 * @value default
 * @option Forcefully Disable Diagonal Movement
 * @value disable
 * @option Forcefully Enable Diagonal Movement
 * @value enable
 * @desc How do you want to change diagonal movement?
 * @default default
 *
 * @ --------------------------------------------------------------------------
 *
 * @command Separator_SelfData
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SelfDataResetAll
 * @text Self Data: Reset All
 * @desc Reset the Self Switch and Self Variable data of all events
 * within the specified map.
 *
 * @arg MapId:eval
 * @text Map ID
 * @desc The map the target map. Use 0 for current map.
 * You may use JavaScript code.
 * @default 0
 *
 * @ --------------------------------------------------------------------------
 *
 * @command Separator_SelfSwitch
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SelfSwitchABCD
 * @text Self Switch: A B C D
 * @desc Change the Self Switch of a different event.
 *
 * @arg MapId:eval
 * @text Map ID
 * @desc The map the target map. Use 0 for current map.
 * You may use JavaScript code.
 * @default 0
 *
 * @arg EventId:eval
 * @text Event ID
 * @desc The ID of the target event. Use 0 for current event.
 * You may use JavaScript code.
 * @default 0
 *
 * @arg Letter:str
 * @text Letter
 * @type select
 * @option A
 * @value A
 * @option B
 * @value B
 * @option C
 * @value C
 * @option D
 * @value D
 * @desc Letter of the target event's Self Switch to change.
 * @default A
 *
 * @arg Break
 * @text -
 *
 * @arg Value:str
 * @text Value
 * @type select
 * @option ON
 * @value ON
 * @option OFF
 * @value OFF
 * @option Toggle
 * @value Toggle
 * @desc What value do you want to set the Self Switch to?
 * @default ON
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SelfSwitchID
 * @text Self Switch: Switch ID
 * @desc Change the Self Switch of a different event.
 *
 * @arg MapId:eval
 * @text Map ID
 * @desc The map the target map. Use 0 for current map.
 * You may use JavaScript code.
 * @default 0
 *
 * @arg EventId:eval
 * @text Event ID
 * @desc The ID of the target event. Use 0 for current event.
 * You may use JavaScript code.
 * @default 0
 *
 * @arg SwitchId:num
 * @text Switch ID
 * @type switch
 * @desc The ID of the target switch.
 * @default 1
 *
 * @arg Break
 * @text -
 *
 * @arg Value:str
 * @text Value
 * @type select
 * @option ON
 * @value ON
 * @option OFF
 * @value OFF
 * @option Toggle
 * @value Toggle
 * @desc What value do you want to set the Self Switch to?
 * @default ON
 *
 * @ --------------------------------------------------------------------------
 *
 * @command Separator_SelfVar
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SelfVariableID
 * @text Self Variable: Variable ID
 * @desc Change the Self Variable of a different event.
 *
 * @arg MapId:eval
 * @text Map ID
 * @desc The map the target map. Use 0 for current map.
 * You may use JavaScript code.
 * @default 0
 *
 * @arg EventId:eval
 * @text Event ID
 * @desc The ID of the target event. Use 0 for current event.
 * You may use JavaScript code.
 * @default 0
 *
 * @arg VariableId:num
 * @text Variable ID
 * @type variable
 * @desc The ID of the target variable.
 * @default 1
 *
 * @arg Break
 * @text -
 *
 * @arg Operation:str
 * @text Operation
 * @type select
 * @option = Set
 * @value =
 * @option + Add
 * @value +
 * @option - Subtract
 * @value -
 * @option * Multiply
 * @value *
 * @option / Divide
 * @value /
 * @option % Modulus
 * @value %
 * @desc Set the operation used.
 * @default =
 *
 * @arg Break2
 * @text -
 *
 * @arg Value:eval
 * @text Value
 * @desc Insert the value to modify the Self Variable by.
 * You may use JavaScript code.
 * @default 0
 *
 * @ --------------------------------------------------------------------------
 *
 * @command Separator_SpawnEvent
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SpawnEventAtXY
 * @text Spawn Event: Spawn At X, Y
 * @desc Spawns desired event at X, Y location on the current map.
 *
 * @arg Step1
 * @text Step 1: Spawned Event
 *
 * @arg TemplateName:str
 * @text Template Name
 * @parent Step1
 * @desc Name of the target event template to spawn as.
 * Ignored if this is called "Untitled".
 * @default Untitled
 *
 * @arg MapId:eval
 * @text Map ID
 * @parent Step1
 * @desc Target event's map to be used as reference.
 * You may use JavaScript code.
 * @default 1
 *
 * @arg EventId:eval
 * @text Event ID
 * @parent Step1
 * @desc The ID of the target event to be used as reference.
 * You may use JavaScript code.
 * @default 1
 *
 * @arg Step2
 * @text Step 2: Location
 *
 * @arg PosX:eval
 * @text X Coordinate
 * @parent Step2
 * @type combo
 * @option $gamePlayer.frontX()
 * @option $gamePlayer.backX()
 * @option Math.randomInt($gameMap.width())
 * @option 0
 * @desc Target Location to spawn at.
 * You may use JavaScript code.
 * @default $gamePlayer.frontX()
 *
 * @arg PosY:eval
 * @text Y Coordinate
 * @parent Step2
 * @type combo
 * @option $gamePlayer.frontY()
 * @option $gamePlayer.backY()
 * @option Math.randomInt($gameMap.height())
 * @option 0
 * @desc Target Location to spawn at.
 * You may use JavaScript code.
 * @default $gamePlayer.frontY()
 *
 * @arg Collision:eval
 * @text Check Event Collision
 * @parent Step2
 * @type boolean
 * @on Check
 * @off Ignore
 * @desc Check collision with any other events and player?
 * @default true
 *
 * @arg Passability:eval
 * @text Check Passability
 * @parent Step2
 * @type boolean
 * @on Check
 * @off Ignore
 * @desc Check passability of the target location.
 * @default true
 *
 * @arg Preserve:eval
 * @text Preserve Spawn
 * @parent Step2
 * @type boolean
 * @on Preserve
 * @off Expires
 * @desc Is the spawned event preserved?
 * Or does it expire upon leaving the map?
 * @default true
 *
 * @arg Step3
 * @text Step 3: Success Check
 *
 * @arg SuccessSwitchId:num
 * @text Success Switch ID
 * @parent Step3
 * @type switch
 * @desc Target switch ID to record spawning success.
 * Ignore if ID is 0. OFF means failed. ON means success.
 * @default 0
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SpawnEventAtRegion
 * @text Spawn Event: Spawn At Region
 * @desc Spawns desired event at a random region-marked location on the current map.
 *
 * @arg Step1
 * @text Step 1: Spawned Event
 *
 * @arg TemplateName:str
 * @text Template Name
 * @parent Step1
 * @desc Name of the target event template to spawn as.
 * Ignored if this is called "Untitled".
 * @default Untitled
 *
 * @arg MapId:eval
 * @text Map ID
 * @parent Step1
 * @desc Target event's map.
 * You may use JavaScript code.
 * @default 1
 *
 * @arg EventId:eval
 * @text Event ID
 * @parent Step1
 * @desc The ID of the target event.
 * You may use JavaScript code.
 * @default 1
 *
 * @arg Step2
 * @text Step 2: Location
 *
 * @arg Region:arraynum
 * @text Region ID(s)
 * @parent Step2
 * @type number[]
 * @min 0
 * @max 255
 * @desc Pick region(s) to spawn this event at.
 * @default ["1"]
 *
 * @arg Collision:eval
 * @text Check Event Collision
 * @parent Step2
 * @type boolean
 * @on Check
 * @off Ignore
 * @desc Check collision with any other events and player?
 * @default true
 *
 * @arg Passability:eval
 * @text Check Passability
 * @parent Step2
 * @type boolean
 * @on Check
 * @off Ignore
 * @desc Check passability of the target location.
 * @default true
 *
 * @arg Preserve:eval
 * @text Preserve Spawn
 * @parent Step2
 * @type boolean
 * @on Preserve
 * @off Expires
 * @desc Is the spawned event preserved?
 * Or does it expire upon leaving the map?
 * @default true
 *
 * @arg Step3
 * @text Step 3: Success Check
 *
 * @arg SuccessSwitchId:num
 * @text Success Switch ID
 * @parent Step3
 * @type switch
 * @desc Target switch ID to record spawning success.
 * Ignore if ID is 0. OFF means failed. ON means success.
 * @default 0
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SpawnEventAtTerrainTag
 * @text Spawn Event: Spawn At Terrain Tag
 * @desc Spawns desired event at a random terrain tag-marked location on the current map.
 *
 * @arg Step1
 * @text Step 1: Spawned Event
 *
 * @arg TemplateName:str
 * @text Template Name
 * @parent Step1
 * @desc Name of the target event template to spawn as.
 * Ignored if this is called "Untitled".
 * @default Untitled
 *
 * @arg MapId:eval
 * @text Map ID
 * @parent Step1
 * @desc Target event's map.
 * You may use JavaScript code.
 * @default 1
 *
 * @arg EventId:eval
 * @text Event ID
 * @parent Step1
 * @desc The ID of the target event.
 * You may use JavaScript code.
 * @default 1
 *
 * @arg Step2
 * @text Step 2: Location
 *
 * @arg TerrainTags:arraynum
 * @text Terrain Tag(s)
 * @parent Step2
 * @type number[]
 * @min 0
 * @max 7
 * @desc Pick terrain tag(s) to spawn this event at.
 * Insert numbers between 0 and 7.
 * @default ["1"]
 *
 * @arg Collision:eval
 * @text Check Event Collision
 * @parent Step2
 * @type boolean
 * @on Check
 * @off Ignore
 * @desc Check collision with any other events and player?
 * @default true
 *
 * @arg Passability:eval
 * @text Check Passability
 * @parent Step2
 * @type boolean
 * @on Check
 * @off Ignore
 * @desc Check passability of the target location.
 * @default true
 *
 * @arg Preserve:eval
 * @text Preserve Spawn
 * @parent Step2
 * @type boolean
 * @on Preserve
 * @off Expires
 * @desc Is the spawned event preserved?
 * Or does it expire upon leaving the map?
 * @default true
 *
 * @arg Step3
 * @text Step 3: Success Check
 *
 * @arg SuccessSwitchId:num
 * @text Success Switch ID
 * @parent Step3
 * @type switch
 * @desc Target switch ID to record spawning success.
 * Ignore if ID is 0. OFF means failed. ON means success.
 * @default 0
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SpawnEventDespawnEventID
 * @text Spawn Event: Despawn Event ID
 * @desc Despawns the selected Event ID on the current map.
 *
 * @arg EventID:eval
 * @text Event ID
 * @type combo
 * @option $gameMap.firstSpawnedEventID()
 * @option $gameMap.lastSpawnedEventID()
 * @option 1001
 * @desc The ID of the target event.
 * You may use JavaScript code.
 * @default $gameMap.lastSpawnedEventID()
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SpawnEventDespawnAtXY
 * @text Spawn Event: Despawn At X, Y
 * @desc Despawns any spawned event(s) at X, Y location on the current map.
 *
 * @arg PosX:eval
 * @text X Coordinate
 * @parent Step2
 * @type combo
 * @option $gamePlayer.frontX()
 * @option $gamePlayer.backX()
 * @option Math.randomInt($gameMap.width())
 * @option 0
 * @desc Target Location to despawn at.
 * You may use JavaScript code.
 * @default $gamePlayer.frontX()
 *
 * @arg PosY:eval
 * @text Y Coordinate
 * @parent Step2
 * @type combo
 * @option $gamePlayer.frontY()
 * @option $gamePlayer.backY()
 * @option Math.randomInt($gameMap.height())
 * @option 0
 * @desc Target Location to despawn at.
 * You may use JavaScript code.
 * @default $gamePlayer.frontY()
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SpawnEventDespawnRegions
 * @text Spawn Event: Despawn Region(s)
 * @desc Despawns the selected Region(s) on the current map.
 *
 * @arg Region:arraynum
 * @text Region ID(s)
 * @parent Step2
 * @type number[]
 * @min 0
 * @max 255
 * @desc Pick region(s) and despawn everything inside it.
 * @default ["1"]
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SpawnEventDespawnTerrainTags
 * @text Spawn Event: Despawn Terrain Tag(s)
 * @desc Despawns the selected Terrain Tags(s) on the current map.
 *
 * @arg TerrainTags:arraynum
 * @text Terrain Tag(s)
 * @parent Step2
 * @type number[]
 * @min 0
 * @max 7
 * @desc Pick terrain tag(s) and despawn everything inside it.
 * Insert numbers between 0 and 7.
 * @default ["1"]
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SpawnEventDespawnEverything
 * @text Spawn Event: Despawn Everything
 * @desc Despawns all spawned events on the current map.
 *
 * @ --------------------------------------------------------------------------
 *
 * @command Separator_End
 * @text -
 * @desc -
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
 * @param EventsMoveCore
 * @default Plugin Parameters
 *
 * @param ATTENTION
 * @default READ THE HELP FILE
 *
 * @param BreakSettings
 * @text --------------------------
 * @default ----------------------------------
 *
 * @param Label:struct
 * @text Event Label Settings
 * @type struct<Label>
 * @desc Choose settings regarding the Event Labels.
 * @default {"FontSize:num":"22","IconSize:num":"26","LineHeight:num":"30","OffsetX:num":"0","OffsetY:num":"12","OpacitySpeed:num":"16","VisibleRange:num":"30"}
 *
 * @param Icon:struct
 * @text Event Icon Settings
 * @type struct<Icon>
 * @desc Choose settings regarding the Event Icons.
 * @default {"BufferX:num":"0","BufferY:num":"12","BlendMode:num":"0"}
 *
 * @param Template:struct
 * @text Event Template Settings
 * @type struct<Template>
 * @desc Choose settings regarding Event Templates.
 * @default {"Settings":"","PreloadMaps:arraynum":"[\"1\"]","Prefabs":"","List:arraystruct":"[]","JavaScript":"","PreCopyJS:func":"\"// Declare Constants\\nconst mapId = arguments[1];\\nconst eventId = arguments[2];\\nconst target = arguments[3];\\nconst player = $gamePlayer;\\n\\n// Perform Actions\\n\"","PostCopyJS:func":"\"// Declare Constants\\nconst mapId = arguments[1];\\nconst eventId = arguments[2];\\nconst target = arguments[3];\\nconst player = $gamePlayer;\\n\\n// Perform Actions\\n\"","PreMorphJS:func":"\"// Declare Constants\\nconst mapId = arguments[1];\\nconst eventId = arguments[2];\\nconst target = arguments[3];\\nconst player = $gamePlayer;\\n\\n// Perform Actions\\n\"","PostMorphJS:func":"\"// Declare Constants\\nconst mapId = arguments[1];\\nconst eventId = arguments[2];\\nconst target = arguments[3];\\nconst player = $gamePlayer;\\n\\n// Perform Actions\\n\"","PreSpawnJS:func":"\"// Declare Constants\\nconst mapId = arguments[1];\\nconst eventId = arguments[2];\\nconst target = arguments[3];\\nconst player = $gamePlayer;\\n\\n// Perform Actions\\n\"","PostSpawnJS:func":"\"// Declare Constants\\nconst mapId = arguments[1];\\nconst eventId = arguments[2];\\nconst target = arguments[3];\\nconst player = $gamePlayer;\\n\\n// Perform Actions\\n\""}
 *
 * @param EventBreak
 * @text --------------------------
 * @default ----------------------------------
 *
 * @param Movement:struct
 * @text Movement Settings
 * @type struct<Movement>
 * @desc Change the rules regarding movement in the game.
 * @default {"Dir8":"","EnableDir8:eval":"true","StrictCollision:eval":"true","FavorHorz:eval":"true","SlowerSpeed:eval":"false","DiagonalSpeedMultiplier:num":"0.85","AutoMove":"","StopAutoMoveEvents:eval":"true","StopAutoMoveMessages:eval":"true","Bitmap":"","BitmapSmoothing:eval":"false","Dash":"","DashModifier:num":"+1.0","EnableDashTilt:eval":"true","TiltLeft:num":"-0.15","TiltRight:num":"0.15","TiltVert:num":"0.05","EventMove":"","RandomMoveWeight:num":"0.10","Shadows":"","ShowShadows:eval":"true","DefaultShadow:str":"Shadow1","TurnInPlace":"","EnableTurnInPlace:eval":"false","TurnInPlaceDelay:num":"10","Vehicle":"","BoatSpeed:num":"4.0","ShipSpeed:num":"5.0","AirshipSpeed:num":"6.0"}
 *
 * @param VS8:struct
 * @text VisuStella 8-Dir Settings
 * @type struct<VS8>
 * @desc Choose settings regarding VisuStella 8-Directional Sprites.
 * @default {"Balloons":"","AutoBalloon:eval":"true","BalloonOffsetX:num":"0","BalloonOffsetY:num":"12","Icons":"","AutoBuffer:eval":"true","CarryPose:eval":"true"}
 *
 * @param MovementBreak
 * @text --------------------------
 * @default ----------------------------------
 *
 * @param Region:struct
 * @text Region Rulings
 * @type struct<Region>
 * @desc Choose settings regarding regions.
 * @default {"Allow":"","AllAllow:arraynum":"[]","WalkAllow:arraynum":"[]","PlayerAllow:arraynum":"[]","EventAllow:arraynum":"[]","VehicleAllow:arraynum":"[]","BoatAllow:arraynum":"[]","ShipAllow:arraynum":"[]","AirshipAllow:arraynum":"[]","Forbid":"","AllForbid:arraynum":"[]","WalkForbid:arraynum":"[]","PlayerForbid:arraynum":"[]","EventForbid:arraynum":"[]","VehicleForbid:arraynum":"[]","BoatForbid:arraynum":"[]","ShipForbid:arraynum":"[]","AirshipForbid:arraynum":"[]","Dock":"","VehicleDock:arraynum":"[]","BoatDock:arraynum":"[]","BoatDockRegionOnly:eval":"false","ShipDock:arraynum":"[]","ShipDockRegionOnly:eval":"false","AirshipDock:arraynum":"[]","AirshipDockRegionOnly:eval":"false"}
 *
 * @param RegionOk:struct
 * @text Common Event on OK Button
 * @parent Region:struct
 * @type struct<RegionCommonEvent>
 * @desc Set Common Events that activate upon pressing the
 * OK button while standing on top of designated regions.
 * @default {"Region1:num":"0","Region2:num":"0","Region3:num":"0","Region4:num":"0","Region5:num":"0","Region6:num":"0","Region7:num":"0","Region8:num":"0","Region9:num":"0","Region10:num":"0","Region11:num":"0","Region12:num":"0","Region13:num":"0","Region14:num":"0","Region15:num":"0","Region16:num":"0","Region17:num":"0","Region18:num":"0","Region19:num":"0","Region20:num":"0","Region21:num":"0","Region22:num":"0","Region23:num":"0","Region24:num":"0","Region25:num":"0","Region26:num":"0","Region27:num":"0","Region28:num":"0","Region29:num":"0","Region30:num":"0","Region31:num":"0","Region32:num":"0","Region33:num":"0","Region34:num":"0","Region35:num":"0","Region36:num":"0","Region37:num":"0","Region38:num":"0","Region39:num":"0","Region40:num":"0","Region41:num":"0","Region42:num":"0","Region43:num":"0","Region44:num":"0","Region45:num":"0","Region46:num":"0","Region47:num":"0","Region48:num":"0","Region49:num":"0","Region50:num":"0","Region51:num":"0","Region52:num":"0","Region53:num":"0","Region54:num":"0","Region55:num":"0","Region56:num":"0","Region57:num":"0","Region58:num":"0","Region59:num":"0","Region60:num":"0","Region61:num":"0","Region62:num":"0","Region63:num":"0","Region64:num":"0","Region65:num":"0","Region66:num":"0","Region67:num":"0","Region68:num":"0","Region69:num":"0","Region70:num":"0","Region71:num":"0","Region72:num":"0","Region73:num":"0","Region74:num":"0","Region75:num":"0","Region76:num":"0","Region77:num":"0","Region78:num":"0","Region79:num":"0","Region80:num":"0","Region81:num":"0","Region82:num":"0","Region83:num":"0","Region84:num":"0","Region85:num":"0","Region86:num":"0","Region87:num":"0","Region88:num":"0","Region89:num":"0","Region90:num":"0","Region91:num":"0","Region92:num":"0","Region93:num":"0","Region94:num":"0","Region95:num":"0","Region96:num":"0","Region97:num":"0","Region98:num":"0","Region99:num":"0","Region100:num":"0","Region101:num":"0","Region102:num":"0","Region103:num":"0","Region104:num":"0","Region105:num":"0","Region106:num":"0","Region107:num":"0","Region108:num":"0","Region109:num":"0","Region110:num":"0","Region111:num":"0","Region112:num":"0","Region113:num":"0","Region114:num":"0","Region115:num":"0","Region116:num":"0","Region117:num":"0","Region118:num":"0","Region119:num":"0","Region120:num":"0","Region121:num":"0","Region122:num":"0","Region123:num":"0","Region124:num":"0","Region125:num":"0","Region126:num":"0","Region127:num":"0","Region128:num":"0","Region129:num":"0","Region130:num":"0","Region131:num":"0","Region132:num":"0","Region133:num":"0","Region134:num":"0","Region135:num":"0","Region136:num":"0","Region137:num":"0","Region138:num":"0","Region139:num":"0","Region140:num":"0","Region141:num":"0","Region142:num":"0","Region143:num":"0","Region144:num":"0","Region145:num":"0","Region146:num":"0","Region147:num":"0","Region148:num":"0","Region149:num":"0","Region150:num":"0","Region151:num":"0","Region152:num":"0","Region153:num":"0","Region154:num":"0","Region155:num":"0","Region156:num":"0","Region157:num":"0","Region158:num":"0","Region159:num":"0","Region160:num":"0","Region161:num":"0","Region162:num":"0","Region163:num":"0","Region164:num":"0","Region165:num":"0","Region166:num":"0","Region167:num":"0","Region168:num":"0","Region169:num":"0","Region170:num":"0","Region171:num":"0","Region172:num":"0","Region173:num":"0","Region174:num":"0","Region175:num":"0","Region176:num":"0","Region177:num":"0","Region178:num":"0","Region179:num":"0","Region180:num":"0","Region181:num":"0","Region182:num":"0","Region183:num":"0","Region184:num":"0","Region185:num":"0","Region186:num":"0","Region187:num":"0","Region188:num":"0","Region189:num":"0","Region190:num":"0","Region191:num":"0","Region192:num":"0","Region193:num":"0","Region194:num":"0","Region195:num":"0","Region196:num":"0","Region197:num":"0","Region198:num":"0","Region199:num":"0","Region200:num":"0","Region201:num":"0","Region202:num":"0","Region203:num":"0","Region204:num":"0","Region205:num":"0","Region206:num":"0","Region207:num":"0","Region208:num":"0","Region209:num":"0","Region210:num":"0","Region211:num":"0","Region212:num":"0","Region213:num":"0","Region214:num":"0","Region215:num":"0","Region216:num":"0","Region217:num":"0","Region218:num":"0","Region219:num":"0","Region220:num":"0","Region221:num":"0","Region222:num":"0","Region223:num":"0","Region224:num":"0","Region225:num":"0","Region226:num":"0","Region227:num":"0","Region228:num":"0","Region229:num":"0","Region230:num":"0","Region231:num":"0","Region232:num":"0","Region233:num":"0","Region234:num":"0","Region235:num":"0","Region236:num":"0","Region237:num":"0","Region238:num":"0","Region239:num":"0","Region240:num":"0","Region241:num":"0","Region242:num":"0","Region243:num":"0","Region244:num":"0","Region245:num":"0","Region246:num":"0","Region247:num":"0","Region248:num":"0","Region249:num":"0","Region250:num":"0","Region251:num":"0","Region252:num":"0","Region253:num":"0","Region254:num":"0","Region255:num":"0"}
 *
 * @param RegionOkTarget:str
 * @text Target Tile
 * @parent RegionOk:struct
 * @type select
 * @option Tile in front of player.
 * @value front
 * @option Tile player is standing on top of.
 * @value standing
 * @desc Which tile should be checked for
 * Common Event on OK Button?
 * @default front
 *
 * @param RegionTouch:struct
 * @text Common Event on Touch
 * @parent Region:struct
 * @type struct<RegionCommonEvent>
 * @desc Set Common Events that activate upon stepping the tiles
 * marked by the designated regions.
 * @default {"Region1:num":"0","Region2:num":"0","Region3:num":"0","Region4:num":"0","Region5:num":"0","Region6:num":"0","Region7:num":"0","Region8:num":"0","Region9:num":"0","Region10:num":"0","Region11:num":"0","Region12:num":"0","Region13:num":"0","Region14:num":"0","Region15:num":"0","Region16:num":"0","Region17:num":"0","Region18:num":"0","Region19:num":"0","Region20:num":"0","Region21:num":"0","Region22:num":"0","Region23:num":"0","Region24:num":"0","Region25:num":"0","Region26:num":"0","Region27:num":"0","Region28:num":"0","Region29:num":"0","Region30:num":"0","Region31:num":"0","Region32:num":"0","Region33:num":"0","Region34:num":"0","Region35:num":"0","Region36:num":"0","Region37:num":"0","Region38:num":"0","Region39:num":"0","Region40:num":"0","Region41:num":"0","Region42:num":"0","Region43:num":"0","Region44:num":"0","Region45:num":"0","Region46:num":"0","Region47:num":"0","Region48:num":"0","Region49:num":"0","Region50:num":"0","Region51:num":"0","Region52:num":"0","Region53:num":"0","Region54:num":"0","Region55:num":"0","Region56:num":"0","Region57:num":"0","Region58:num":"0","Region59:num":"0","Region60:num":"0","Region61:num":"0","Region62:num":"0","Region63:num":"0","Region64:num":"0","Region65:num":"0","Region66:num":"0","Region67:num":"0","Region68:num":"0","Region69:num":"0","Region70:num":"0","Region71:num":"0","Region72:num":"0","Region73:num":"0","Region74:num":"0","Region75:num":"0","Region76:num":"0","Region77:num":"0","Region78:num":"0","Region79:num":"0","Region80:num":"0","Region81:num":"0","Region82:num":"0","Region83:num":"0","Region84:num":"0","Region85:num":"0","Region86:num":"0","Region87:num":"0","Region88:num":"0","Region89:num":"0","Region90:num":"0","Region91:num":"0","Region92:num":"0","Region93:num":"0","Region94:num":"0","Region95:num":"0","Region96:num":"0","Region97:num":"0","Region98:num":"0","Region99:num":"0","Region100:num":"0","Region101:num":"0","Region102:num":"0","Region103:num":"0","Region104:num":"0","Region105:num":"0","Region106:num":"0","Region107:num":"0","Region108:num":"0","Region109:num":"0","Region110:num":"0","Region111:num":"0","Region112:num":"0","Region113:num":"0","Region114:num":"0","Region115:num":"0","Region116:num":"0","Region117:num":"0","Region118:num":"0","Region119:num":"0","Region120:num":"0","Region121:num":"0","Region122:num":"0","Region123:num":"0","Region124:num":"0","Region125:num":"0","Region126:num":"0","Region127:num":"0","Region128:num":"0","Region129:num":"0","Region130:num":"0","Region131:num":"0","Region132:num":"0","Region133:num":"0","Region134:num":"0","Region135:num":"0","Region136:num":"0","Region137:num":"0","Region138:num":"0","Region139:num":"0","Region140:num":"0","Region141:num":"0","Region142:num":"0","Region143:num":"0","Region144:num":"0","Region145:num":"0","Region146:num":"0","Region147:num":"0","Region148:num":"0","Region149:num":"0","Region150:num":"0","Region151:num":"0","Region152:num":"0","Region153:num":"0","Region154:num":"0","Region155:num":"0","Region156:num":"0","Region157:num":"0","Region158:num":"0","Region159:num":"0","Region160:num":"0","Region161:num":"0","Region162:num":"0","Region163:num":"0","Region164:num":"0","Region165:num":"0","Region166:num":"0","Region167:num":"0","Region168:num":"0","Region169:num":"0","Region170:num":"0","Region171:num":"0","Region172:num":"0","Region173:num":"0","Region174:num":"0","Region175:num":"0","Region176:num":"0","Region177:num":"0","Region178:num":"0","Region179:num":"0","Region180:num":"0","Region181:num":"0","Region182:num":"0","Region183:num":"0","Region184:num":"0","Region185:num":"0","Region186:num":"0","Region187:num":"0","Region188:num":"0","Region189:num":"0","Region190:num":"0","Region191:num":"0","Region192:num":"0","Region193:num":"0","Region194:num":"0","Region195:num":"0","Region196:num":"0","Region197:num":"0","Region198:num":"0","Region199:num":"0","Region200:num":"0","Region201:num":"0","Region202:num":"0","Region203:num":"0","Region204:num":"0","Region205:num":"0","Region206:num":"0","Region207:num":"0","Region208:num":"0","Region209:num":"0","Region210:num":"0","Region211:num":"0","Region212:num":"0","Region213:num":"0","Region214:num":"0","Region215:num":"0","Region216:num":"0","Region217:num":"0","Region218:num":"0","Region219:num":"0","Region220:num":"0","Region221:num":"0","Region222:num":"0","Region223:num":"0","Region224:num":"0","Region225:num":"0","Region226:num":"0","Region227:num":"0","Region228:num":"0","Region229:num":"0","Region230:num":"0","Region231:num":"0","Region232:num":"0","Region233:num":"0","Region234:num":"0","Region235:num":"0","Region236:num":"0","Region237:num":"0","Region238:num":"0","Region239:num":"0","Region240:num":"0","Region241:num":"0","Region242:num":"0","Region243:num":"0","Region244:num":"0","Region245:num":"0","Region246:num":"0","Region247:num":"0","Region248:num":"0","Region249:num":"0","Region250:num":"0","Region251:num":"0","Region252:num":"0","Region253:num":"0","Region254:num":"0","Region255:num":"0"}
 *
 * @param TerrainTag:struct
 * @text Terrain Tag Settings
 * @type struct<TerrainTag>
 * @desc Choose settings regarding terrain tags.
 * @default {"TerrainTag":"","Rope:num":"1"}
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
 * Label Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Label:
 *
 * @param SpriteBased:eval
 * @text Sprite Based?
 * @type boolean
 * @on Sprite-Based
 * @off Legacy-Window
 * @desc Use sprite-based labels instead of legacy-window version.
 * Legacy-window version will not be supported in future.
 * @default true
 *
 * @param MobileEnabled:eval
 * @text Mobile-Enabled?
 * @type boolean
 * @on Enabled
 * @off Disabled
 * @desc Enable event labels for mobile devices?
 * @default true
 *
 * @param FontSize:num
 * @text Font Size
 * @type number
 * @min 1
 * @desc The font size used for the Event Labels.
 * @default 22
 *
 * @param IconSize:num
 * @text Icon Size
 * @type number
 * @min 1
 * @desc The size of the icons used in the Event Labels.
 * @default 26
 *
 * @param LineHeight:num
 * @text Line Height
 * @type number
 * @min 1
 * @desc The line height used for the Event Labels.
 * @default 26
 *
 * @param OffsetX:num
 * @text Offset X
 * @type number
 * @min 0
 * @desc Globally offset all labels horizontally by this amount.
 * @default 0
 *
 * @param OffsetY:num
 * @text Offset Y
 * @type number
 * @min 0
 * @desc Globally offset all labels vertically by this amount.
 * @default 12
 *
 * @param OpacitySpeed:num
 * @text Fade Speed
 * @type number
 * @min 1
 * @desc Fade speed for labels.
 * @default 16
 *
 * @param VisibleRange:num
 * @text Visible Range
 * @type number
 * @min 1
 * @desc Range the player has to be within the event to make its label visible.
 * @default 30
 *
 * @param RangeType:str
 * @text Range Type
 * @parent VisibleRange:num
 * @type select
 * @option square
 * @option circle
 * @option diamond
 * @desc What do you want the default label visible range type?
 * @default square
 *
 */
/* ----------------------------------------------------------------------------
 * Icon Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Icon:
 *
 * @param BufferX:num
 * @text Buffer X
 * @desc Default X position buffer for event icons.
 * @default 0
 *
 * @param BufferY:num
 * @text Buffer Y
 * @desc Default Y position buffer for event icons.
 * @default 12
 *
 * @param BlendMode:num
 * @text Blend Mode
 * @type select
 * @option 0 - Normal
 * @value 0
 * @option 1 - Additive
 * @value 1
 * @option 2 - Multiply
 * @value 2
 * @option 3 - Screen
 * @value 3
 * @desc Default blend mode for even icons.
 * @default 0
 *
 */
/* ----------------------------------------------------------------------------
 * Template Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Template:
 *
 * @param Settings
 *
 * @param PreloadMaps:arraynum
 * @text Preloaded Maps
 * @parent Settings
 * @type number[]
 * @desc A list of all the ID's of the maps that will be preloaded
 * to serve as template maps for this plugin.
 * @default ["1"]
 *
 * @param Templates
 *
 * @param List:arraystruct
 * @text Event Template List
 * @parent Templates
 * @type struct<EventTemplate>[]
 * @desc A list of all the Event Templates used by this project.
 * Used for notetags and Plugin Commands.
 * @default []
 *
 * @param JavaScript
 *
 * @param PreCopyJS:func
 * @text JS: Pre-Copy
 * @parent JavaScript
 * @type note
 * @desc Code that's ran before an event is copied.
 * This is global and is ran for all copied events.
 * @default "// Declare Constants\nconst mapId = arguments[1];\nconst eventId = arguments[2];\nconst target = arguments[3];\nconst player = $gamePlayer;\n\n// Perform Actions\n"
 *
 * @param PostCopyJS:func
 * @text JS: Post-Copy
 * @parent JavaScript
 * @type note
 * @desc Code that's ran after an event is copied.
 * This is global and is ran for all copied events.
 * @default "// Declare Constants\nconst mapId = arguments[1];\nconst eventId = arguments[2];\nconst target = arguments[3];\nconst player = $gamePlayer;\n\n// Perform Actions\n"
 *
 * @param PreMorphJS:func
 * @text JS: Pre-Morph
 * @parent JavaScript
 * @type note
 * @desc Code that's ran before an event is morphed.
 * This is global and is ran for all morphed events.
 * @default "// Declare Constants\nconst mapId = arguments[1];\nconst eventId = arguments[2];\nconst target = arguments[3];\nconst player = $gamePlayer;\n\n// Perform Actions\n"
 *
 * @param PostMorphJS:func
 * @text JS: Post-Morph
 * @parent JavaScript
 * @type note
 * @desc Code that's ran after an event is morphed.
 * This is global and is ran for all morphed events.
 * @default "// Declare Constants\nconst mapId = arguments[1];\nconst eventId = arguments[2];\nconst target = arguments[3];\nconst player = $gamePlayer;\n\n// Perform Actions\n"
 *
 * @param PreSpawnJS:func
 * @text JS: Pre-Spawn
 * @parent JavaScript
 * @type note
 * @desc Code that's ran before an event is spawned.
 * This is global and is ran for all spawned events.
 * @default "// Declare Constants\nconst mapId = arguments[1];\nconst eventId = arguments[2];\nconst target = arguments[3];\nconst player = $gamePlayer;\n\n// Perform Actions\n"
 *
 * @param PostSpawnJS:func
 * @text JS: Post-Spawn
 * @parent JavaScript
 * @type note
 * @desc Code that's ran after an event is spawned.
 * This is global and is ran for all spawned events.
 * @default "// Declare Constants\nconst mapId = arguments[1];\nconst eventId = arguments[2];\nconst target = arguments[3];\nconst player = $gamePlayer;\n\n// Perform Actions\n"
 *
 */
/* ----------------------------------------------------------------------------
 * Event Template
 * ----------------------------------------------------------------------------
 */
/*~struct~EventTemplate:
 *
 * @param Name:str
 * @text Name
 * @desc Name of the template. It'll be used as anchor points for
 * notetags and Plugin Commands.
 * @default Untitled
 *
 * @param MapID:num
 * @text Map ID
 * @parent Name:str
 * @type number
 * @min 1
 * @max 999
 * @desc ID of the map the template event is stored on.
 * This will automatically add this ID to preloaded list.
 * @default 1
 *
 * @param EventID:num
 * @text Event ID
 * @parent Name:str
 * @type number
 * @min 1
 * @max 999
 * @desc ID of the event the template event is based on.
 * @default 1
 *
 * @param JavaScript
 *
 * @param PreCopyJS:func
 * @text JS: Pre-Copy
 * @parent JavaScript
 * @type note
 * @desc Code that's ran before an event is copied.
 * This is local only for this template.
 * @default "// Declare Constants\nconst mapId = arguments[1];\nconst eventId = arguments[2];\nconst target = arguments[3];\nconst player = $gamePlayer;\n\n// Perform Actions\n"
 *
 * @param PostCopyJS:func
 * @text JS: Post-Copy
 * @parent JavaScript
 * @type note
 * @desc Code that's ran after an event is copied.
 * This is local only for this template.
 * @default "// Declare Constants\nconst mapId = arguments[1];\nconst eventId = arguments[2];\nconst target = arguments[3];\nconst player = $gamePlayer;\n\n// Perform Actions\n"
 *
 * @param PreMorphJS:func
 * @text JS: Pre-Morph
 * @parent JavaScript
 * @type note
 * @desc Code that's ran before an event is morphed.
 * This is local only for this template.
 * @default "// Declare Constants\nconst mapId = arguments[1];\nconst eventId = arguments[2];\nconst target = arguments[3];\nconst player = $gamePlayer;\n\n// Perform Actions\n"
 *
 * @param PostMorphJS:func
 * @text JS: Post-Morph
 * @parent JavaScript
 * @type note
 * @desc Code that's ran after an event is morphed.
 * This is local only for this template.
 * @default "// Declare Constants\nconst mapId = arguments[1];\nconst eventId = arguments[2];\nconst target = arguments[3];\nconst player = $gamePlayer;\n\n// Perform Actions\n"
 *
 * @param PreSpawnJS:func
 * @text JS: Pre-Spawn
 * @parent JavaScript
 * @type note
 * @desc Code that's ran before an event is spawned.
 * This is global and is ran for all spawned events.
 * @default "// Declare Constants\nconst mapId = arguments[1];\nconst eventId = arguments[2];\nconst target = arguments[3];\nconst player = $gamePlayer;\n\n// Perform Actions\n"
 *
 * @param PostSpawnJS:func
 * @text JS: Post-Spawn
 * @parent JavaScript
 * @type note
 * @desc Code that's ran after an event is spawned.
 * This is global and is ran for all spawned events.
 * @default "// Declare Constants\nconst mapId = arguments[1];\nconst eventId = arguments[2];\nconst target = arguments[3];\nconst player = $gamePlayer;\n\n// Perform Actions\n"
 *
 */
/* ----------------------------------------------------------------------------
 * Movement Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Movement:
 *
 * @param Dir8
 * @text 8 Directional Movement
 *
 * @param EnableDir8:eval
 * @text Enable
 * @parent Dir8
 * @type boolean
 * @on Enable
 * @off Disabled
 * @desc Allow 8-directional movement by default? Players can move diagonally.
 * @default true
 *
 * @param StrictCollision:eval
 * @text Strict Collision
 * @parent Dir8
 * @type boolean
 * @on Strict
 * @off Flexible
 * @desc Enforce strict collission rules where the player must be able to pass both cardinal directions?
 * @default true
 *
 * @param FavorHorz:eval
 * @text Favor Horizontal
 * @parent StrictCollision:eval
 * @type boolean
 * @on Horizontal
 * @off Vertical
 * @desc Favor horizontal if cannot pass diagonally but can pass both horizontally and vertically?
 * @default true
 *
 * @param SlowerSpeed:eval
 * @text Slower Diagonals?
 * @parent Dir8
 * @type boolean
 * @on Slower
 * @off Normal
 * @desc Enforce a slower movement speed when moving diagonally?
 * @default false
 *
 * @param DiagonalSpeedMultiplier:num
 * @text Speed Multiplier
 * @parent SlowerSpeed:eval
 * @desc What's the multiplier to adjust movement speed when moving diagonally?
 * @default 0.85
 *
 * @param AutoMove
 * @text Automatic Movement
 *
 * @param StopAutoMoveEvents:eval
 * @text Stop During Events
 * @parent AutoMove
 * @type boolean
 * @on Stop
 * @off Wander
 * @desc Stop automatic event movement while events are running.
 * @default true
 *
 * @param StopAutoMoveMessages:eval
 * @text Stop During Messages
 * @parent AutoMove
 * @type boolean
 * @on Stop
 * @off Wander
 * @desc Stop automatic event movement while a message is running.
 * @default true
 *
 * @param Bitmap
 *
 * @param BitmapSmoothing:eval
 * @text Smoothing
 * @parent Bitmap
 * @type boolean
 * @on Smooth
 * @off Pixelated
 * @desc Do you want to smooth or pixelate the map sprites?
 * Pixelating them is better for zooming and tilting.
 * @default false
 *
 * @param Dash
 * @text Dash
 *
 * @param DashModifier:num
 * @text Dash Modifier
 * @parent Dash
 * @desc Alters the dash speed modifier.
 * @default +1.0
 *
 * @param DashOnLadder:eval
 * @text Dash On Ladder?
 * @parent Dash
 * @type boolean
 * @on Allow
 * @off Disallow
 * @desc Allow dashing while on a ladder or rope?
 * @default false
 *
 * @param EnableDashTilt:eval
 * @text Enable Dash Tilt?
 * @parent Dash
 * @type boolean
 * @on Enable
 * @off Disabled
 * @desc Tilt any sprites that are currently dashing?
 * @default true
 *
 * @param TiltLeft:num
 * @text Tilt Left Amount
 * @parent EnableDashTilt:eval
 * @desc Amount in radians when moving left (upper left, left, lower left).
 * @default -0.15
 *
 * @param TiltRight:num
 * @text Tilt Right Amount
 * @parent EnableDashTilt:eval
 * @desc Amount in radians when moving right (upper right, right, lower right).
 * @default 0.15
 *
 * @param TiltVert:num
 * @text Tilt Vertical Amount
 * @parent EnableDashTilt:eval
 * @desc Amount in radians when moving vertical (up, down).
 * @default 0.05
 * 
 * @param EventMove
 * @text Event Movement
 *
 * @param RandomMoveWeight:num
 * @text Random Move Weight
 * @parent EventMove
 * @desc Use numbers between 0 and 1. Numbers closer to 1 stay
 * closer to their home position. 0 to disable it.
 * @default 0.10
 *
 * @param ShiftY:num
 * @text Shift Y
 * @parent EventMove
 * @desc How many pixels should non-tile characters be shifted by?
 * Negative: up. Positive: down.
 * @default -6
 *
 * @param PathFind
 * @text Path Finding
 *
 * @param PathfindMobileEnabled:eval
 * @text Mobile-Enabled?
 * @parent PathFind
 * @type boolean
 * @on Enabled
 * @off Disabled
 * @desc Enable diagonal pathfinding for mobile devices?
 * @default false
 *
 * @param Shadows
 *
 * @param ShowShadows:eval
 * @text Show
 * @parent Shadows
 * @type boolean
 * @on Show
 * @off Don't Show
 * @desc Show shadows on all events and player-related sprites.
 * @default true
 *
 * @param DefaultShadow:str
 * @text Default Filename
 * @parent Shadows
 * @type file
 * @dir img/system/
 * @desc Default filename used for shadows found in img/system/ folder.
 * @default Shadow1
 *
 * @param ShadowLayer:num
 * @text Shadow Z Layer
 * @parent Shadows
 * @desc What is the sprite Z layer used for the shadow sprites?
 * @default 0.5
 *
 * @param TurnInPlace
 * @text Turn in Place
 *
 * @param EnableTurnInPlace:eval
 * @text Enable
 * @parent TurnInPlace
 * @type boolean
 * @on Turn in Place
 * @off Skip
 * @desc When not dashing, player will turn in place before moving.
 * This only applies with keyboard inputs.
 * @default false
 *
 * @param TurnInPlaceDelay:num
 * @text Delay in Frames
 * @parent TurnInPlace
 * @type number
 * @min 0
 * @desc The number of frames to wait before moving.
 * @default 10
 *
 * @param Vehicle
 * @text Vehicle Speeds
 *
 * @param BoatSpeed:num
 * @text Boat Speed
 * @parent Vehicle
 * @desc Allows you to adjust the base speed of the boat vehicle.
 * @default 4.0
 *
 * @param ShipSpeed:num
 * @text Ship Speed
 * @parent Vehicle
 * @desc Allows you to adjust the base speed of the ship vehicle.
 * @default 5.0
 *
 * @param AirshipSpeed:num
 * @text Airship Speed
 * @parent Vehicle
 * @desc Allows you to adjust the base speed of the airship vehicle.
 * @default 6.0
 *
 */
/* ----------------------------------------------------------------------------
 * Region Rulings
 * ----------------------------------------------------------------------------
 */
/*~struct~Region:
 *
 * @param Allow
 * @text Allow Regions
 *
 * @param AllAllow:arraynum
 * @text All Allow
 * @parent Allow
 * @type number[]
 * @min 0
 * @max 255
 * @desc Insert Region ID's where the player can enter.
 * Region ID's range from 0 to 255.
 * @default []
 *
 * @param WalkAllow:arraynum
 * @text Walk Allow
 * @parent Allow
 * @type number[]
 * @min 0
 * @max 255
 * @desc Insert Region ID's where walking units can enter.
 * Region ID's range from 0 to 255.
 * @default []
 *
 * @param PlayerAllow:arraynum
 * @text Player Allow
 * @parent WalkAllow:arraynum
 * @type number[]
 * @min 0
 * @max 255
 * @desc Insert Region ID's where the player can enter.
 * Region ID's range from 0 to 255.
 * @default []
 *
 * @param EventAllow:arraynum
 * @text Event Allow
 * @parent WalkAllow:arraynum
 * @type number[]
 * @min 0
 * @max 255
 * @desc Insert Region ID's where events can enter.
 * Region ID's range from 0 to 255.
 * @default []
 *
 * @param VehicleAllow:arraynum
 * @text Vehicle Allow
 * @parent Allow
 * @type number[]
 * @min 0
 * @max 255
 * @desc Insert Region ID's where any vehicle can enter.
 * Region ID's range from 0 to 255.
 * @default []
 *
 * @param BoatAllow:arraynum
 * @text Boat Allow
 * @parent VehicleAllow:arraynum
 * @type number[]
 * @min 0
 * @max 255
 * @desc Insert Region ID's where boats can enter.
 * Region ID's range from 0 to 255.
 * @default []
 *
 * @param ShipAllow:arraynum
 * @text Ship Allow
 * @parent VehicleAllow:arraynum
 * @type number[]
 * @min 0
 * @max 255
 * @desc Insert Region ID's where ships can enter.
 * Region ID's range from 0 to 255.
 * @default []
 *
 * @param AirshipAllow:arraynum
 * @text Airship Allow
 * @parent VehicleAllow:arraynum
 * @type number[]
 * @min 0
 * @max 255
 * @desc Insert Region ID's where airships can enter.
 * Region ID's range from 0 to 255.
 * @default []
 *
 * @param Forbid
 * @text Forbid Regions
 *
 * @param AllForbid:arraynum
 * @text All Forbid
 * @parent Forbid
 * @type number[]
 * @min 0
 * @max 255
 * @desc Insert Region ID's where the player cannot enter.
 * Region ID's range from 0 to 255.
 * @default []
 *
 * @param WalkForbid:arraynum
 * @text Walk Forbid
 * @parent Forbid
 * @type number[]
 * @min 0
 * @max 255
 * @desc Insert Region ID's where walking units cannot enter.
 * Region ID's range from 0 to 255.
 * @default []
 *
 * @param PlayerForbid:arraynum
 * @text Player Forbid
 * @parent WalkForbid:arraynum
 * @type number[]
 * @min 0
 * @max 255
 * @desc Insert Region ID's where the player cannot enter.
 * Region ID's range from 0 to 255.
 * @default []
 *
 * @param EventForbid:arraynum
 * @text Event Forbid
 * @parent WalkForbid:arraynum
 * @type number[]
 * @min 0
 * @max 255
 * @desc Insert Region ID's where events cannot enter.
 * Region ID's range from 0 to 255.
 * @default []
 *
 * @param VehicleForbid:arraynum
 * @text Vehicle Forbid
 * @parent Forbid
 * @type number[]
 * @min 0
 * @max 255
 * @desc Insert Region ID's where vehicles cannot enter.
 * Region ID's range from 0 to 255.
 * @default []
 *
 * @param BoatForbid:arraynum
 * @text Boat Forbid
 * @parent VehicleForbid:arraynum
 * @type number[]
 * @min 0
 * @max 255
 * @desc Insert Region ID's where ships cannot enter.
 * Region ID's range from 0 to 255.
 * @default []
 *
 * @param ShipForbid:arraynum
 * @text Ship Forbid
 * @parent VehicleForbid:arraynum
 * @type number[]
 * @min 0
 * @max 255
 * @desc Insert Region ID's where ships cannot enter.
 * Region ID's range from 0 to 255.
 * @default []
 *
 * @param AirshipForbid:arraynum
 * @text Airship Forbid
 * @parent VehicleForbid:arraynum
 * @type number[]
 * @min 0
 * @max 255
 * @desc Insert Region ID's where airships cannot enter.
 * Region ID's range from 0 to 255.
 * @default []
 *
 * @param Dock
 * @text Dock Regions
 *
 * @param VehicleDock:arraynum
 * @text Vehicle Dock
 * @parent Dock
 * @type number[]
 * @min 0
 * @max 255
 * @desc Insert Region ID's where any vehicle can dock.
 * Region ID's range from 0 to 255.
 * @default []
 *
 * @param BoatDock:arraynum
 * @text Boat Dock
 * @parent Dock
 * @type number[]
 * @min 0
 * @max 255
 * @desc Insert Region ID's where boats can dock.
 * Region ID's range from 0 to 255.
 * @default []
 *
 * @param BoatDockRegionOnly:eval
 * @text Only Region Dockable
 * @parent BoatDock:arraynum
 * @type boolean
 * @on At Regions Only
 * @off Default
 * @desc Boats can only dock at designated regions.
 * @default false
 *
 * @param ShipDock:arraynum
 * @text Ship Dock
 * @parent Dock
 * @type number[]
 * @min 0
 * @max 255
 * @desc Insert Region ID's where ships can dock.
 * Region ID's range from 0 to 255.
 * @default []
 *
 * @param ShipDockRegionOnly:eval
 * @text Only Region Dockable
 * @parent ShipDock:arraynum
 * @type boolean
 * @on At Regions Only
 * @off Default
 * @desc Ships can only dock at designated regions.
 * @default false
 *
 * @param AirshipDock:arraynum
 * @text Airship Dock
 * @parent Dock
 * @type number[]
 * @min 0
 * @max 255
 * @desc Insert Region ID's where airships can dock.
 * Region ID's range from 0 to 255.
 * @default []
 *
 * @param AirshipDockRegionOnly:eval
 * @text Only Region Dockable
 * @parent AirshipDock:arraynum
 * @type boolean
 * @on At Regions Only
 * @off Default
 * @desc Airships can only dock at designated regions.
 * @default false
 *
 */
/* ----------------------------------------------------------------------------
 * Region Common Events
 * ----------------------------------------------------------------------------
 */
/*~struct~RegionCommonEvent:
 *
 * @param Region1:num
 * @text Region 1
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region2:num
 * @text Region 2
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region3:num
 * @text Region 3
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region4:num
 * @text Region 4
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region5:num
 * @text Region 5
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region6:num
 * @text Region 6
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region7:num
 * @text Region 7
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region8:num
 * @text Region 8
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region9:num
 * @text Region 9
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region10:num
 * @text Region 10
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region11:num
 * @text Region 11
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region12:num
 * @text Region 12
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region13:num
 * @text Region 13
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region14:num
 * @text Region 14
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region15:num
 * @text Region 15
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region16:num
 * @text Region 16
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region17:num
 * @text Region 17
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region18:num
 * @text Region 18
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region19:num
 * @text Region 19
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region20:num
 * @text Region 20
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region21:num
 * @text Region 21
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region22:num
 * @text Region 22
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region23:num
 * @text Region 23
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region24:num
 * @text Region 24
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region25:num
 * @text Region 25
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region26:num
 * @text Region 26
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region27:num
 * @text Region 27
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region28:num
 * @text Region 28
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region29:num
 * @text Region 29
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region30:num
 * @text Region 30
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region31:num
 * @text Region 31
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region32:num
 * @text Region 32
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region33:num
 * @text Region 33
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region34:num
 * @text Region 34
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region35:num
 * @text Region 35
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region36:num
 * @text Region 36
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region37:num
 * @text Region 37
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region38:num
 * @text Region 38
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region39:num
 * @text Region 39
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region40:num
 * @text Region 40
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region41:num
 * @text Region 41
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region42:num
 * @text Region 42
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region43:num
 * @text Region 43
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region44:num
 * @text Region 44
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region45:num
 * @text Region 45
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region46:num
 * @text Region 46
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region47:num
 * @text Region 47
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region48:num
 * @text Region 48
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region49:num
 * @text Region 49
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region50:num
 * @text Region 50
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region51:num
 * @text Region 51
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region52:num
 * @text Region 52
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region53:num
 * @text Region 53
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region54:num
 * @text Region 54
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region55:num
 * @text Region 55
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region56:num
 * @text Region 56
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region57:num
 * @text Region 57
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region58:num
 * @text Region 58
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region59:num
 * @text Region 59
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region60:num
 * @text Region 60
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region61:num
 * @text Region 61
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region62:num
 * @text Region 62
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region63:num
 * @text Region 63
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region64:num
 * @text Region 64
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region65:num
 * @text Region 65
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region66:num
 * @text Region 66
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region67:num
 * @text Region 67
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region68:num
 * @text Region 68
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region69:num
 * @text Region 69
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region70:num
 * @text Region 70
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region71:num
 * @text Region 71
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region72:num
 * @text Region 72
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region73:num
 * @text Region 73
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region74:num
 * @text Region 74
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region75:num
 * @text Region 75
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region76:num
 * @text Region 76
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region77:num
 * @text Region 77
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region78:num
 * @text Region 78
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region79:num
 * @text Region 79
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region80:num
 * @text Region 70
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region81:num
 * @text Region 71
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region82:num
 * @text Region 72
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region83:num
 * @text Region 73
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region84:num
 * @text Region 74
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region85:num
 * @text Region 75
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region86:num
 * @text Region 76
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region87:num
 * @text Region 77
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region88:num
 * @text Region 78
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region89:num
 * @text Region 79
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region80:num
 * @text Region 80
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region81:num
 * @text Region 81
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region82:num
 * @text Region 82
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region83:num
 * @text Region 83
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region84:num
 * @text Region 84
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region85:num
 * @text Region 85
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region86:num
 * @text Region 86
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region87:num
 * @text Region 87
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region88:num
 * @text Region 88
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region89:num
 * @text Region 89
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region90:num
 * @text Region 80
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region91:num
 * @text Region 81
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region92:num
 * @text Region 82
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region93:num
 * @text Region 83
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region94:num
 * @text Region 84
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region95:num
 * @text Region 85
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region96:num
 * @text Region 86
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region97:num
 * @text Region 87
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region98:num
 * @text Region 88
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region99:num
 * @text Region 89
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region90:num
 * @text Region 90
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region91:num
 * @text Region 91
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region92:num
 * @text Region 92
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region93:num
 * @text Region 93
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region94:num
 * @text Region 94
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region95:num
 * @text Region 95
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region96:num
 * @text Region 96
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region97:num
 * @text Region 97
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region98:num
 * @text Region 98
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region99:num
 * @text Region 99
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region100:num
 * @text Region 100
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region101:num
 * @text Region 101
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region102:num
 * @text Region 102
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region103:num
 * @text Region 103
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region104:num
 * @text Region 104
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region105:num
 * @text Region 105
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region106:num
 * @text Region 106
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region107:num
 * @text Region 107
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region108:num
 * @text Region 108
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region109:num
 * @text Region 109
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region110:num
 * @text Region 110
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region111:num
 * @text Region 111
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region112:num
 * @text Region 112
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region113:num
 * @text Region 113
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region114:num
 * @text Region 114
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region115:num
 * @text Region 115
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region116:num
 * @text Region 116
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region117:num
 * @text Region 117
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region118:num
 * @text Region 118
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region119:num
 * @text Region 119
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region120:num
 * @text Region 120
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region121:num
 * @text Region 121
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region122:num
 * @text Region 122
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region123:num
 * @text Region 123
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region124:num
 * @text Region 124
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region125:num
 * @text Region 125
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region126:num
 * @text Region 126
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region127:num
 * @text Region 127
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region128:num
 * @text Region 128
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region129:num
 * @text Region 129
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region130:num
 * @text Region 130
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region131:num
 * @text Region 131
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region132:num
 * @text Region 132
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region133:num
 * @text Region 133
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region134:num
 * @text Region 134
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region135:num
 * @text Region 135
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region136:num
 * @text Region 136
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region137:num
 * @text Region 137
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region138:num
 * @text Region 138
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region139:num
 * @text Region 139
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region140:num
 * @text Region 140
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region141:num
 * @text Region 141
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region142:num
 * @text Region 142
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region143:num
 * @text Region 143
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region144:num
 * @text Region 144
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region145:num
 * @text Region 145
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region146:num
 * @text Region 146
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region147:num
 * @text Region 147
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region148:num
 * @text Region 148
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region149:num
 * @text Region 149
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region150:num
 * @text Region 150
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region151:num
 * @text Region 151
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region152:num
 * @text Region 152
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region153:num
 * @text Region 153
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region154:num
 * @text Region 154
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region155:num
 * @text Region 155
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region156:num
 * @text Region 156
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region157:num
 * @text Region 157
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region158:num
 * @text Region 158
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region159:num
 * @text Region 159
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region160:num
 * @text Region 160
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region161:num
 * @text Region 161
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region162:num
 * @text Region 162
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region163:num
 * @text Region 163
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region164:num
 * @text Region 164
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region165:num
 * @text Region 165
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region166:num
 * @text Region 166
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region167:num
 * @text Region 167
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region168:num
 * @text Region 168
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region169:num
 * @text Region 169
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region170:num
 * @text Region 170
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region171:num
 * @text Region 171
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region172:num
 * @text Region 172
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region173:num
 * @text Region 173
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region174:num
 * @text Region 174
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region175:num
 * @text Region 175
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region176:num
 * @text Region 176
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region177:num
 * @text Region 177
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region178:num
 * @text Region 178
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region179:num
 * @text Region 179
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region180:num
 * @text Region 170
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region181:num
 * @text Region 171
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region182:num
 * @text Region 172
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region183:num
 * @text Region 173
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region184:num
 * @text Region 174
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region185:num
 * @text Region 175
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region186:num
 * @text Region 176
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region187:num
 * @text Region 177
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region188:num
 * @text Region 178
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region189:num
 * @text Region 179
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region180:num
 * @text Region 180
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region181:num
 * @text Region 181
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region182:num
 * @text Region 182
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region183:num
 * @text Region 183
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region184:num
 * @text Region 184
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region185:num
 * @text Region 185
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region186:num
 * @text Region 186
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region187:num
 * @text Region 187
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region188:num
 * @text Region 188
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region189:num
 * @text Region 189
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region190:num
 * @text Region 180
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region191:num
 * @text Region 181
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region192:num
 * @text Region 182
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region193:num
 * @text Region 183
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region194:num
 * @text Region 184
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region195:num
 * @text Region 185
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region196:num
 * @text Region 186
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region197:num
 * @text Region 187
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region198:num
 * @text Region 188
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region199:num
 * @text Region 189
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region190:num
 * @text Region 190
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region191:num
 * @text Region 191
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region192:num
 * @text Region 192
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region193:num
 * @text Region 193
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region194:num
 * @text Region 194
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region195:num
 * @text Region 195
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region196:num
 * @text Region 196
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region197:num
 * @text Region 197
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region198:num
 * @text Region 198
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region199:num
 * @text Region 199
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region200:num
 * @text Region 200
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region201:num
 * @text Region 201
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region202:num
 * @text Region 202
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region203:num
 * @text Region 203
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region204:num
 * @text Region 204
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region205:num
 * @text Region 205
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region206:num
 * @text Region 206
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region207:num
 * @text Region 207
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region208:num
 * @text Region 208
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region209:num
 * @text Region 209
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region210:num
 * @text Region 210
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region211:num
 * @text Region 211
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region212:num
 * @text Region 212
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region213:num
 * @text Region 213
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region214:num
 * @text Region 214
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region215:num
 * @text Region 215
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region216:num
 * @text Region 216
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region217:num
 * @text Region 217
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region218:num
 * @text Region 218
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region219:num
 * @text Region 219
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region220:num
 * @text Region 220
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region221:num
 * @text Region 221
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region222:num
 * @text Region 222
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region223:num
 * @text Region 223
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region224:num
 * @text Region 224
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region225:num
 * @text Region 225
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region226:num
 * @text Region 226
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region227:num
 * @text Region 227
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region228:num
 * @text Region 228
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region229:num
 * @text Region 229
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region230:num
 * @text Region 230
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region231:num
 * @text Region 231
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region232:num
 * @text Region 232
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region233:num
 * @text Region 233
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region234:num
 * @text Region 234
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region235:num
 * @text Region 235
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region236:num
 * @text Region 236
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region237:num
 * @text Region 237
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region238:num
 * @text Region 238
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region239:num
 * @text Region 239
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region240:num
 * @text Region 240
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region241:num
 * @text Region 241
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region242:num
 * @text Region 242
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region243:num
 * @text Region 243
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region244:num
 * @text Region 244
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region245:num
 * @text Region 245
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region246:num
 * @text Region 246
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region247:num
 * @text Region 247
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region248:num
 * @text Region 248
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region249:num
 * @text Region 249
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region250:num
 * @text Region 250
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region251:num
 * @text Region 251
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region252:num
 * @text Region 252
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region253:num
 * @text Region 253
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region254:num
 * @text Region 254
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region255:num
 * @text Region 255
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 */
/* ----------------------------------------------------------------------------
 * Terrain Tag Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~TerrainTag:
 *
 * @param TerrainTag
 * @text Terrain Tag ID's
 *
 * @param Rope:num
 * @text Rope
 * @parent TerrainTag
 * @type number
 * @min 0
 * @max 7
 * @desc Which terrain tag number to use for ropes?
 * @default 1
 *
 */
/* ----------------------------------------------------------------------------
 * VisuStella 8-Dir Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~VS8:
 *
 * @param Balloons
 * @text Balloon Icon Settings
 *
 * @param AutoBalloon:eval
 * @text Auto-Balloon Poses
 * @parent Balloons
 * @type boolean
 * @on Auto
 * @off Manual
 * @desc Automatically pose VS8 sprites when using balloon icons.
 * @default true
 *
 * @param BalloonOffsetX:num
 * @text Balloon Offset X
 * @parent Balloons
 * @desc Offset balloon icons on VS8 sprites by x pixels.
 * @default 0
 *
 * @param BalloonOffsetY:num
 * @text Balloon Offset Y
 * @parent Balloons
 * @desc Offset balloon icons on VS8 sprites by y pixels.
 * @default 10
 *
 * @param Icons
 * 
 * @param AutoBuffer:eval
 * @text Auto Buffer
 * @parent Icons
 * @type boolean
 * @on Auto
 * @off Manual
 * @desc Automatically buffer the X and Y coordinates of
 * VS8 sprites?
 * @default true
 * 
 * @param CarryPose:eval
 * @text Use Carry Pose
 * @parent Icons
 * @type boolean
 * @on Carry Pose
 * @off Normal
 * @desc Use the carry pose when moving with an icon overhead.
 * @default true
 *
 */
/* ----------------------------------------------------------------------------
 * Popup Extra Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~PopupExtra:
 *
 * @param Fade
 * @text Fade Settings
 *
 * @param fadeInDuration:eval
 * @text Fade In Duration
 * @parent Fade
 * @desc How many frames does it take to fade in?
 * 60 frames = 1 second.
 * @default 8
 *
 * @param fadeOutDuration:eval
 * @text Fade Out Duration
 * @parent Fade
 * @desc How many frames does it take to fade out?
 * 60 frames = 1 second.
 * @default 8
 *
 * @param Offset
 * @text Offset Settings
 *
 * @param startOffsetX:eval
 * @text Starting Offset X
 * @parent Offset
 * @desc Offsets the starting x position. You may use code.
 * Negative: left. Positive: right.
 * @default +0
 *
 * @param startOffsetY:eval
 * @text Starting Offset Y
 * @parent Offset
 * @desc Offsets the starting y position. You may use code.
 * Negative: up. Positive: down.
 * @default -48
 *
 * @param endOffsetX:eval
 * @text Ending Offset X
 * @parent Offset
 * @desc Offsets the ending x position. You may use code.
 * Negative: left. Positive: right.
 * @default +0
 *
 * @param endOffsetY:eval
 * @text Ending Offset Y
 * @parent Offset
 * @desc Offsets the ending y position. You may use code.
 * Negative: up. Positive: down.
 * @default -96
 *
 * @param Scale
 * @text Scaling Settings
 *
 * @param startScaleX:eval
 * @text Starting Scale X
 * @parent Scale
 * @desc What is the starting scale x? You may use code.
 * 0.0 = 0%, 0.5 = 50%, 1.0 = 100%
 * @default 0.8
 *
 * @param startScaleY:eval
 * @text Starting Scale Y
 * @parent Scale
 * @desc What is the starting scale y? You may use code.
 * 0.0 = 0%, 0.5 = 50%, 1.0 = 100%
 * @default 0.8
 *
 * @param endScaleX:eval
 * @text Ending Scale X
 * @parent Scale
 * @desc What is the ending scale x? You may use code.
 * 0.0 = 0%, 0.5 = 50%, 1.0 = 100%
 * @default 0.8
 *
 * @param endScaleY:eval
 * @text Ending Scale Y
 * @parent Scale
 * @desc What is the ending scale y? You may use code.
 * 0.0 = 0%, 0.5 = 50%, 1.0 = 100%
 * @default 0.8
 *
 * @param Angle
 * @text Angle Settings
 *
 * @param startAngle:eval
 * @text Starting Offset Angle
 * @parent Angle
 * @desc What is the starting angle offset?
 * Use numbers between 0 and 360. You may use code.
 * @default +0
 *
 * @param endAngle:eval
 * @text Ending Offset Angle
 * @parent Angle
 * @desc What is the ending angle offset?
 * Use numbers between 0 and 360. You may use code.
 * @default +0
 * 
 * @param Misc
 * @text Misc Settings
 * 
 * @param Arc:eval
 * @text Arc Peak
 * @parent Misc
 * @desc This is the height of the popup's trajectory arc
 * in pixels. Positive: up. Negative: down. Code allowed.
 * @default +0
 *
 */
//=============================================================================

const _0xe5069=_0x4f29;(function(_0x3e36f8,_0x63a911){const _0x3ead54=_0x4f29,_0x59e8de=_0x3e36f8();while(!![]){try{const _0x43f9c6=parseInt(_0x3ead54(0x2e5))/0x1+parseInt(_0x3ead54(0x214))/0x2+-parseInt(_0x3ead54(0x611))/0x3+-parseInt(_0x3ead54(0x352))/0x4*(parseInt(_0x3ead54(0x633))/0x5)+parseInt(_0x3ead54(0x5e5))/0x6+parseInt(_0x3ead54(0x32c))/0x7+-parseInt(_0x3ead54(0x569))/0x8;if(_0x43f9c6===_0x63a911)break;else _0x59e8de['push'](_0x59e8de['shift']());}catch(_0x208d71){_0x59e8de['push'](_0x59e8de['shift']());}}}(_0x2169,0x297f3));function _0x2169(){const _0x3d254d=['_moveRouteIndex','PostCopyJS','Game_CharacterBase_pattern','move','LOWER\x20RIGHT','toUpperCase','Rope','processMoveSynchDirection','_currentArc','Game_Timer_initialize','_pageIndex','isShadowVisible','clamp','outlineColor','Game_Variables_setValue','_wholeDuration','startOffset','Toggle','terrainTag','match','updateAttachPictureSprite','setupRegionRestrictions','RemovePreserve','_text','TurnInPlaceDelay','vertical\x20mirror','_events','isLongPressed','_targetX','TiltRight','clearSelfTarget','Player','erase','_moveSpeed','VisuMZ_Setup_Preload_Map','region','filename','updateSelfMovement','refreshIfNeeded','Game_CharacterBase_screenY','_tileId','_addedHitbox','PlayerMovementDiagonal','updateBitmapSmoothing','Game_Interpreter_executeCommand','_textSprite','FontSize','_MapSpawnedEventData','regionList','%1\x20is\x20incorrectly\x20placed\x20on\x20the\x20plugin\x20list.\x0aIt\x20is\x20a\x20Tier\x20%2\x20plugin\x20placed\x20over\x20other\x20Tier\x20%3\x20plugins.\x0aPlease\x20reorder\x20the\x20plugin\x20list\x20from\x20smallest\x20to\x20largest\x20tier\x20numbers.','arc','getTileExpandData','_lastAttachPictureScale','isPassableByAnyDirection','switches','DiagonalSpeedMultiplier','startMapCommonEventOnTouch','format','CPC','_lastAttachPictureFilename','areFollowersForceHidden','updateFadeOut','processMoveSynchReverseMimic','EnableDir8','createLowerLayer','PosX','_selfEvent','string','SelfSwitchID','MessageText','createShadow','getDiagonalDestination','Game_CommonEvent_isActive','_needsRefresh','timerText','_characterSprites','EnableTurnInPlace','setValue','Sprite_Character_characterPatternY','BalloonOffsetY','_target','QUESTION','distance','Direction','DEFAULT_SHIFT_Y','destinationY','tileCoordinates','createEventsMoveCoreMessagePopup','event','despawnEverything','moveBackToRandomHome','attachPictureType','_moveOnlyRegions','pow','_needsPeriodicRefresh','vert\x20mirror','Settings','_labelWindows','PreloadMaps','switch1Valid','setPattern','_lastPluginCommandInterpreter','_encounterNoneProximity','processMoveRouteJumpForward','isPlayerWithinEncounterHalfEvents','SwitchId','StopAutoMoveMessages','SelfSwitches','EventTimerFramesGain','Scene_Map_onMapLoadedEncErase','eraseEvent','Game_Player_increaseSteps','createProxyWindow','removeMorph','Window_NumberInput_start','isBusy','setPose','loadCPC','1208504QMYdQE','isOnScreen','_advancedSwitchVariable','Game_CharacterBase_screenX','Hidden','Step2MapId','TerrainTags','Passability','DIAGONAL_PATHFINDING_EVENT_LIMIT','isStopFollowerChasing','Game_Party_hasEncounterNone','_screenZoomScale','anchor','hasCPCs','_forceHideFollower','deleteIconsOnEventsDataKey','needsAttachPictureUpdate','opacityDelta','pos','FastForwardKey','_checkEncounterRaw','setMoveSpeed','ALLOW_LADDER_DASH','setPosition','CarryPose','_startScaleX','ARRAYFUNC','_actuallyMoving','_forceShowPlayer','checkExistingEntitiesAt','turnLeft90','checkEventTriggerAuto','Sprite_Balloon_setup','resetIconsOnEventsData','EventIconRestore','EventIconChange','scale','isDashDisabled','SpriteBased','updateScale','LIGHTBULB','_SavedEventLocations','ITEM','EventTimerResume','Movement','delta','Window_EventItem_onOk','switch1Id','isMoving','padZero','_cacheSystemVisible','updateEventsAndMovementCore','createDisplayObjects','update','_cacheVisibility','drawIcon','parameters','updateTextScale','resume','Game_CharacterBase_moveStraight','lastSpawnedEvent','mapId','requestAnimation','FRUSTRATION','activationProximityDistance','saveEventLocation','page','bitmap','value','initMembersEventsMoveCore','Game_Event_locate','Game_Event_start','encounterProximityType','AirshipSpeed','processMoveSynchApproach','deleteIconsOnEventsData','jump','Game_SelfSwitches_setValue','DOWN','_event','PopupExtra','VehicleForbid','Game_Character_forceMoveRoute','resetFontSettings','ADDITIVE','PreCopyJS','Window_NumberInput_processOk','_randomHomeX','setDiagonalDirection','shadowX','registerCommand','canPassDiagonally','savePreservedMorphEventDataKey','updateTextPosition','NORMAL','updateEventsMoveCoreTagChanges','hasEventIcon','adjustDir8MovementSpeed','isRegionForbidPass','gainFrames','startEncounterEffect','SelfSwitchABCD','labelWindowRangeType','hideShadows','BitmapSmoothing','%1\x27s\x20version\x20does\x20not\x20match\x20plugin\x27s.\x20Please\x20update\x20it\x20in\x20the\x20Plugin\x20Manager.','spawnPreserved','_attachPicture','despawnEventId','loadSystem','opacity','isSpriteVS8dir','windowPadding','isEventTest','MorphEventRemove','visibleRange','ConvertParams','getPose','Game_Troop_meetsConditions','CommonEventID','_EventsMoveCoreSettings','processDrawIcon','_duration','ApplyPopupExtraSettings','636324XLNoIO','abs','clearCarrying','rotation','EventLocationDelete','_spawnedEvents','_followerChaseOff','_visibleEventX','_hidden','FaceSynchAllSynchTargets','restoreSavedEventPosition','isOnRope','isInVehicle','checkEventTriggerThere','setupEvents','EventsMoveCore','VariableId','findDirectionTo','isMoveOnlyRegionPassable','eventsXy','updateMoveSynchDirection','_patternLocked','_screenParallel','Game_CharacterBase_realMoveSpeed','_shadowSprite','variableId','_commonEventId','Game_Vehicle_isMapPassable','_saveEventLocations','itemPadding','isRegionDockable','onClickTrigger','isPreventSelfMovement','Game_Vehicle_isLandOk','log','Game_Event_canPass','LEFT\x20TO\x20RIGHT','_labelWindow','%1,','timer','Scene_Load_onLoadSuccess','createLabelWindowForTarget','_alwaysUpdateMove','player','200748vSiwNI','setSelfValue','processMoveRouteStepToCharacter','TerrainTag','updateRoutineMove','autosaveEventLocation','filter','findTargetSprite','Scene_Map_createDisplayObjects','registerSelfEvent','isTriggerIn','_tilemap','firstSpawnedEventID','isAdvancedVariable','DashingEnable','PreloadedMaps','setAllowEventAutoMovement','_targetScaleY','processMoveCommand','morphIntoTemplate','getPreservedMorphEventData','SelfDataResetAll','characterPatternYVS8','checkEventTriggerEventsMoveCore','isEventOverloaded','processEraseEncounterSpawn','clear','STR','MsgDuration','VariableGetSelfVariableID','_startX','add','isPosing','contents','5DYblxs','follower','isBigCharacter','isSceneMap','RangeType','processMoveRouteMoveRepeat','getLastPluginCommandInterpreter','roundXWithDirection','updateShadowChanges','createBitmap','updateTileFrame','updateSaveEventLocation','createSaveEventLocationData','sqrt','clearEventCache','getEventIconData','unlock','LIGHT\x20BULB','_callEventData','IconBlendMode','isDestinationValid','_settings','processOk','_screenActivation','getControlledFollowerID','FollowerSetGlobalChase','Game_Event_initialize','Game_CharacterBase_isTransparent','mirror\x20vertical','moveForward','moveSynchTarget','TargetSwitchId','Game_Event_meetsConditionsCPC','Game_Map_setup','createDummyWindow','adjustMoveSynchOpacityDelta','_eventMorphData','attachPictureOffsetY','updateVisibility','EventLocationSave','reserveCommonEvent','isShadowShrink','%1Forbid','drawTextEx','front','MUSIC-NOTE','Game_Character_setMoveRoute','findDiagonalDirectionTo','_stepPattern','setDestination','Game_Followers_jumpAll','turnTowardCharacter','isAllowCharacterTilt','SpawnEventDespawnTerrainTags','createEventsMoveCoreTileMessagePopup','processMoveRoutePatternLock','findProperPageIndex','determineEventOverload','setCharacterBitmap','directionOnLadderSpriteVS8dir','IconIndex','Step1MapId','frameCount','EventTimerExpireClear','fontFace','needsUpdate','_checkRelocateNotetag','clearDestination','iconSize','prototype','checkCollisionKeywords','padding','isSpawnHitboxCollisionOk','Game_Map_refresh','Game_Event_meetsConditions','right','_screenParallelOnce','updateScaleBase','$preloadedMap_%1','USER-DEFINED\x201','despawnRegions','SILENCE','_PreservedEventMorphData','roundYWithDirection','_saveEventLocation','cwY','_forceDashing','hasAdvancedSwitchVariable','_inputTime','EventAutoMovement','Game_CharacterBase_characterIndex','Seconds','_realX','isMapPassable','_displayX','Game_Event_event','_tileExpand','bushDepth','BalloonOffsetX','deltaXFrom','onLoadAttachPicture','_selfTarget','_startScaleY','_trigger','_targetY','none','_counter','clearDashing','EventIconChangeForced','FollowerSetTargetChase','TOGGLE','VisuMZ_1_MessageCore\x20is\x20required\x20to\x20run\x20','Game_CharacterBase_update','charAt','canUpdate','createAttachPictureSprite','updatePatternEventsMoveCore','isTile','_dragonbones','NUM','setEventIconDataKey','setEventLabelsVisible','CallEvent','FollowerReset','isCollidedWithEvents','JSON','processMoveSynchAway','hasDragonbones','_selfTargetItemChoice','updateVS8BalloonOffsets','moveTowardPoint','SpawnEventDespawnAtXY','fadeInDuration','updatePeriodicRefresh','Label','setCommonEvent','Operation','Game_Variables_value','_poseDuration','Game_System_onAfterLoad','isPlayerWithinEncounterNoneEvents','_speed','checkActivationProximity','isJumping','_dummyWindow','_encounterHalfProximity','Arc','RIGHT\x20TO\x20LEFT','moveSynchType','hasEncounterHalf','isPassable','end','patternHeight','OffsetY','attachPictureBlendMode','meetActivationRegionConditions','toLowerCase','startCallEvent','replace','frontX','restoreIconsOnEventsDataKey','%1Dock','_moveAllowPlayerCollision','deleteSavedEventLocationKey','setupEventsMoveCoreEffects','custom','morphInto','executeMove','setupDiagonalSupport','reverse\x20mimic','deltaYFrom','_reflection','activationRegionList','labelWindowText','pause','radius','_eventErased','Game_Event_checkEventTriggerAuto','isTransparent','_seconds','requestMapLoadCommonEvents','createSpawnedEvent','labelWindowRange','_lastSesetExitSelfSwitchesMapId','setupEventsMoveCoreNotetags','setEventIconData','screenX','removeChild','endScale','hueShift','height','changeSpeed','adjustX','processMoveRouteStepFrom','startOffsetX','getInputDir8','updateFadeIn','originalText','isPlayerForceShown','setLastPluginCommandInterpreter','EventLabelRefresh','isDashingEnabled','_startAngle','CPCsMet','640994URRnJk','setupMorphEvent','_erased','_filename','EventLabelVisible','Visibility','_eventLabelOffsetX','getAttachPictureBitmapWidth','processMoveRouteJumpTo','EventForbid','eventId','Game_Timer_start','onChange','Window_ScrollText_startMessage','bufferX','deleteSavedEventLocation','characterName','setupSaveEventLocations','checkEventProximity','turnAwayFromPoint','variables','PlayerIconDelete','includes','%1DockRegionOnly','createContents','updateOpacity','isSelfVariable','processMoveSynchCustom','Game_Event_checkEventTriggerTouch','execute','DashModifier','iconIndex','left','parallelCommonEvents','MUSIC','_pattern','clearPageSettings','processMoveRouteAnimation','_expireCommonEvent','updateTextAngle','Game_CharacterBase_initMembers','isMapSwitch','isObjectCharacter','startAngle','USER-DEFINED\x202','ship','HURT','length','setupPageSettings','_eventSpawnData','start','description','isOnLadder','_interpreter','ShadowLayer','reverse\x20copy','isTurnInPlace','_visiblePlayerX','executeCommand','setBackgroundType','_mapId','_offsetX','SPIN\x20CW','lock','endOffsetX','bufferY','_visiblePlayerY','Game_Party_hasEncounterHalf','mirror\x20vert','processMoveSynchMirrorHorz','UNTITLED','SelfVariables','forceMoveRoute','Game_CharacterBase_hasStepAnime','chaseCharacter','_offsetY','Collision','ccwY','isPlayerForceHidden','SPIN\x20COUNTERCLOCKWISE','_cpc','_mirrorSprite','VisuMZ_2_DragonbonesUnion','isNearTheScreen','mainFontSize','getAttachPictureBitmapHeight','loadPicture','Window_EventItem_onCancel','LEFT','getDirectionFromPoint','concat','setPlayerDiagonalSetting','getSelfTarget','processMoveSynchMimic','convertSelfVariableValuesInScriptCall','startMapCommonEventOnOK','PosY','prepareSpawnedEventAtRegion','executeMoveDir8','You\x20do\x20not\x20have\x20Map\x20%1\x20added\x20to\x20the\x20list\x0a','getMapSpawnedEventData','hasMoveOnlyRegions','IconBufferX','meetsSwitchCondition','Set\x20this\x20up\x20in\x20Events\x20&\x20Movement\x20Core\x27s\x0a','createIconSprite','$callEventMap','isInvisibleCharacter','horz\x20mirror','drawText','Region%1','random','circle','_eventIcon','contentsOpacity','onCancel','defaultFontSize','Game_CharacterBase_canPass','TileY','AllAllow','Game_CharacterBase_bushDepth','Self\x20Variable\x20%1','StopAutoMoveEvents','Game_Event_moveTypeRandom','Icon','advancedFunc','setControlledFollowerID','makeDeepCopy','Map%1-Event%2','PreMorphJS','VS8','isTargetEventValidForLabelWindow','_opacity','boat','updateParallel','VisuMZ_1_MessageCore','_active','SuccessSwitchId','moveAwayFromPoint','requestBalloon','SpawnEventDespawnEventID','processMoveRouteBalloon','_spawnPreserved','resizeWindow','FollowerSetControl','updateDuration','Boat','_spriteOffsetY','convertVariableValuesInScriptCall','followers','Game_Followers_isVisible','boxWidth','moveAwayFromCharacter','width','Game_Interpreter_character','isAllowEventAutoMovement','setPlayerControlDisable','mirror\x20horizontal','Game_Switches_setValue','Name','refreshEventLabels','Game_Character_processMoveCommand','startMessage','Game_CharacterBase_moveDiagonally','_scaleY','ccwX','_scaleX','HMPH','isAnyEventStarting','OFF','createLabelWindows','setStopFollowerChasing','Game_Follower_initialize','fittingHeight','_shadowGraphic','startOffsetY','Chase','EventId','reverseDir','Sprite_Character_setTileBitmap','clearStepPattern','processEraseEncounterEvents','fadeOut','moveByInput','loadEnemy','isInsideLabelRange','return\x200','attachPictureOffsetX','processMoveRouteMoveToCharacter','characterIndexVS8','eventsXyNt','isAirshipPassable','processMoveRouteTeleportTo','_type','Game_Player_checkEventTriggerHere','Button','moveDiagonally','checkValidEventerMap','firstSpawnedEvent','_PlayerDiagonalSetting','startScale','ANGER','OffsetX','iconHeight','_frames','offsetX','command108','_commonEvents','HEART','4148VirApO','_isCharacterSpriteSheetInvisible','horizontal\x20mirror','UPPER\x20LEFT','canPass','drawing','isEmptyCharacter','_forceCarrying','updatePosition','setupPlayerVisibilityOverrides','shiftY','updateTilt','isLabelVisible','_forceShowFollower','Sprite_Character_setCharacterBitmap','isInstanceOfSceneMap','sv\x20enemy','Game_Player_getInputDirection','screenY','attachPictureMaxSize','Game_System_initialize','deltaY','Game_SelfSwitches_value','ShowShadows','IconBufferY','_randomMoveWeight','fadeIn','opacitySpeed','Game_Vehicle_initMoveSpeed','attachPictureFilename','Region','isNormalPriority','tileWidth','clearAttachPictureSettings','deleteEventLocation','_paused','ShiftY','Game_Event_updateParallel','MOBILE_DIAGONAL_PATHFINDING','turnAwayFromCharacter','_lastAttachPictureType','_selfTargetNumberInput','isAutoBufferIcon','roundY','createTextSprite','isSelfSwitch','setupEventsMoveCoreCommentTags','max','isMapVariable','initMembers','getEventIconIndex','SPIN\x20CLOCKWISE','setupSpawnTest','advancedValue','SCREEN','useCarryPoseForIcons','createSpawnedEventWithData','_isObjectCharacter','mimic','_eventCopyData','character','moveRouteIndex','BufferY','endScaleX','setDashingEnabled','RIGHT','Setting','attachPictureScale','zoomScale','registerSelfTarget','createShadows','1651566HAIdxb','initFollowerController','OpacitySpeed','checkAdvancedSwitchVariablePresent','IconSet','Dock','StrictCollision','iconWidth','isPlayerControlDisabled','_stopCount','_activationProximityAutoTriggerBypass','Vehicle','characterPatternYBasic','setup','_scaleBaseX','getPosingCharacterPattern','Game_CharacterBase_increaseSteps','resetSelfSwitchesForEvent','RandomMoveWeight','initialize','_proxyWindow','_vehicleType','Game_Temp_setDestination','_activationProximity','selfValue','Template','min','onExpire','status','_attachPictureSprite','processSaveEventLocation','apply','STRUCT','isWorking','_chaseOff','_eventIconSprite','processMoveSynch','onOk','1114748rdsAhd','blendMode','ANNOYED','version','TemplateName','ARRAYEVAL','dir8','Preloaded\x20Maps\x20and\x20add\x20in\x20Map\x20%1','Game_Timer_stop','_eventOverload','MapSwitches','WalkForbid','processMoveSynchRandom','jumpAll','onDatabaseLoaded','parent','Game_Event_update','characterPatternY','randomInt','Game_CharacterBase_direction','checkRegionEventTrigger','USER-DEFINED\x204','isLandOk','MapVariables','Game_Follower_chaseCharacter','Game_Event_updateSelfMovement','isRegionAllowPass','loadDataFile','name','clearPose','updateEventCustomZ','isEventRunning','VisibleRange','General','_eventId','setMapValue','unlockEvent','exit','locate','_moveRoute','isAirship','setChaseOff','GetMoveSynchTarget','MULTIPLY','Game_Event_isCollidedWithPlayerCharacters','_diagonalSupport','lastMovedDirection','updateText','Game_Map_events','_visibleEventY','initMoveSpeed','checkEventsMoveCoreStringTags','_character','updateSpritePosition','setupFollowerVisibilityOverrides','isEventClickTriggered','spawnEventId','EventLocationCreate','isRunning','_requestSaveEventLocation','smooth','isPlaytest','startMapCommonEventOnOKTarget','setCharacterSpriteSheetInvisible','moveStraight','SpawnEventAtXY','meetsCPC','split','COBWEB','isCollidedWithPlayerCharacters','getPosingCharacterDirection','MoveAllSynchTargets','PostMorphJS','_realY','_clickTrigger','EXCLAMATION','USER-DEFINED\x203','isEventsMoveCoreInvisible','PostSpawnJS','MobileEnabled','ShipSpeed','processMoveRouteFadeOut','encounterProximityDistance','push','processMoveRouteSelfVariable','angle','processMoveRouteMoveTo','canMove','%1Allow','_scaleBaseY','textSizeEx','VehicleDock','call','_startY','shift','Game_Event_findProperPageIndex','determineCommonEventsWithCPC','process_VisuMZ_EventsMoveCore_LoadTemplateMaps','note','down','away','despawnAtXY','Visible','LOWER\x20LEFT','MOBILE_EVENT_LABELS','updateEventLabelText','Hours','AdvancedVariables','loadSvEnemy','updateStop','forceDashing','Speed','isSpawnedEvent','_spawnData','removeTemporaryMapSpawnedEvents','Self\x20Switch\x20%1','realMoveSpeed','increaseSteps','of\x20Preloaded\x20Maps.\x0a\x0a','attachPictureSettings','Game_Timer_onExpire','Airship','forceCarrying','clearSpriteOffsets','visible','USER-DEFINED\x205','updateHueShift','processMoveRouteFadeIn','reverse','Game_Map_setupEvents','_customZ','setDirection','MoveRouteIndex','roundX','updateEventIconSprite','trim','checkEventTriggerTouch','_eventScreenY','ROUTE_SCRIPT','EventTimerFramesSet','BoatSpeed','_scene','Step1EventId','despawnTerrainTags','frontY','slice','type','PathfindMobileEnabled','SpawnEventAtRegion','isVisible','initEventsMoveCoreEffects','isDashingAndMoving','FUNC','backX','setOpacity','getDirectionToPoint','switchId','template','isDashing','correctFacingDirection','updatePose','isAdvancedSwitch','lineHeight','target','FollowerID','updatePattern','copy','Game_Map_event','updateEventMirrorSprite','resetPattern','%1:%2','isDiagonalDirection','duration','TiltVert','hasClickTrigger','Spriteset_Map_createShadow','Enable','setupSpawnedEvents','isSaveEventLocation','misc','blt','processMoveRouteSelfSwitch','Frames','stop','_working','SelfVariableID','_arcPeak','_eventCache','prepareSpawnedEventAtXY','MessageCore','Game_Player_checkEventTriggerThere','isPressed','Step2EventId','pluginCommandCallEvent','Game_CharacterBase_setDirection','SPIN\x20CCW','updateAttachPictureBitmap','activationProximityType','executeCommandCommonEvent','setupCopyEvent','list','forced','processMoveRouteMoveUntilStop','isBattleTest','_fadeInDuration','deletePreservedMorphEventDataKey','...','TiltLeft','refresh','Preserve','resetSelfSwitchesForMap','_pose','patternWidth','SwitchGetSelfSwitchABCD','referEvent','Game_Event_clearPageSettings','moveTypeRandom','_direction','_followerControlID','PageId','pattern','_forceHidePlayer','ARRAYNUM','_shadowOpacity','MapId','getPlayerDiagonalSetting','_starting','Game_Message_add','Map\x20%1\x20Switch\x20%2','_characterName','hasEncounterNone','Game_Map_parallelCommonEvents','metCPC','SPIN\x20ACW','isSupportDiagonalMovement','bind','_encounterEffectDuration','Minutes','splice','requestRefresh','setItemChoice','ceil','_hue','setFrames','_data','mapValue','meetActivationProximityConditions','events','createCharacterShadow','_callEventMap','_DisablePlayerControl','checkSmartEventCollision','setupAttachPictureBitmap','processMoveCommandEventsMoveCore','AdvancedSwitches','FollowerIndex','Game_Map_isDashDisabled','setMoveRoute','processMoveRouteSetIndex','switch2Id','trigger','hasStepAnime','Game_Player_executeMove','Game_Event_setupPageSettings','ERROR:\x20Map\x20%1\x20has\x20not\x20been\x20preloaded\x20for\x20remove\x20usage.','diamond','Game_CharacterBase_opacity','map','PlayerIconChange','MapID','PlayerAllow','WalkAllow','prepareSpawnedEventAtTerrainTag','_eventScreenX','Game_Map_unlockEvent','SwitchGetSelfSwitchID','CustomPageConditions','RegionOk','getPosingCharacterIndex','executeCommonEvent','Letter','command357','setTileBitmap','\x22Event\x20Popup:\x20Player\x22\x20plugin\x20command!','_periodicRefreshTimer','endOffset','tileHeight','round','Window_Message_startMessage','startsWith','isShip','some','screenTileX','_spriteset','SWEAT','square','Scene_Boot_onDatabaseLoaded','airship','Map\x20%1\x20Variable\x20%2','getInputDirection','TRUE','autoEventIconBuffer','inBattle','MsgPopupTargetTile','Scene_Map_startEncounterEffect','setImage','onAfterLoad','floor','create','maxSize','resetIconsOnEventsDataKey','_spriteOffsetX','shadowFilename','processMoveRouteStepTo','_moveSynch','eventLabelsVisible','_EventIcons','OperateValues','Game_Player_isMapPassable','LOVE','regionId','_lastAttachPictureMaxSize','addLoadListener','initEventsMoveCoreSettings','switch2Valid','indexOf','processMoveRouteJumpToCharacter','_fadeOutStart','pageIndex','startScaleY','meetsConditions','MUSICNOTE','BufferX','_regionRules','%1%2','return\x20%1','_CPCs','addChild','_screenActivated','VisuMZ_0_CoreEngine','offsetY','Game_Map_update','pages','column','EventTimerSpeed','VisibleEventLabels','onMapLoaded','isMovementSucceeded','_fadeOutDuration','isMobileDevice','vehicle','Game_CharacterBase_updatePattern','Plugin\x20Parameters\x20>\x20Event\x20Template\x20Settings\x20>\x0a','updateMoveSynch','PreSpawnJS','fontSize','resetExitSelfSwitches','Game_Message_setNumberInput','Value','moveTowardCharacter','ZZZ','Map%1.json','isActive','checkNeedForPeriodicRefresh','Sprite_Character_update','processMoveSynchMirrorVert','_randomHomeY','canStartLocalEvents','rangeType','spriteId','turnRight90','_eventLabelOffsetY','processMoveRouteTeleportToCharacter','remove','shadowY','Sprite_Character_initMembers','deltaX','turnTowardPoint','_lastMovedDirection','adjustY','Game_CharacterBase_isDashing','setMovementSuccess','DefaultShadow','MUSIC\x20NOTE','MsgPopupFollower','initEventsMoveCore','posNt','Sprite_Balloon_updatePosition','AutoBuffer','UPPER\x20RIGHT','isValid','text','refreshBushDepth','Spriteset_Map_createLowerLayer','EventTemplates','isSaveEventLocations','enemy','areFollowersForceShown','Game_Interpreter_updateWaitMode','EventID','Game_Interpreter_PluginCommand','processMoveRouteHugWall','COLLAPSE','VICTORY','Game_Enemy_meetsSwitchCondition','_eventOverloadThreshold','parse','_eventPageIndex','Event','constructor','_targetScaleX','direction','picture','setHue','code','EventTimerExpireEvent','Game_Troop_meetsConditionsCPC'];_0x2169=function(){return _0x3d254d;};return _0x2169();}var label='EventsMoveCore',tier=tier||0x0,dependencies=[],pluginData=$plugins[_0xe5069(0x617)](function(_0x12bf38){const _0x572021=_0xe5069;return _0x12bf38[_0x572021(0x348)]&&_0x12bf38[_0x572021(0x247)][_0x572021(0x22a)]('['+label+']');})[0x0];VisuMZ[label]['Settings']=VisuMZ[label]['Settings']||{},VisuMZ['ConvertParams']=function(_0x4b3f86,_0x30d8a9){const _0x257967=_0xe5069;for(const _0x4a7472 in _0x30d8a9){if(_0x4a7472[_0x257967(0x506)](/(.*):(.*)/i)){const _0x1e3a4d=String(RegExp['$1']),_0x585dbc=String(RegExp['$2'])['toUpperCase']()[_0x257967(0x3d9)]();let _0x5a5b47,_0x159de1,_0x42be95;switch(_0x585dbc){case _0x257967(0x1bf):_0x5a5b47=_0x30d8a9[_0x4a7472]!==''?Number(_0x30d8a9[_0x4a7472]):0x0;break;case _0x257967(0x430):_0x159de1=_0x30d8a9[_0x4a7472]!==''?JSON['parse'](_0x30d8a9[_0x4a7472]):[],_0x5a5b47=_0x159de1[_0x257967(0x45d)](_0x1b1900=>Number(_0x1b1900));break;case'EVAL':_0x5a5b47=_0x30d8a9[_0x4a7472]!==''?eval(_0x30d8a9[_0x4a7472]):null;break;case _0x257967(0x357):_0x159de1=_0x30d8a9[_0x4a7472]!==''?JSON[_0x257967(0x4e8)](_0x30d8a9[_0x4a7472]):[],_0x5a5b47=_0x159de1['map'](_0x4d97fa=>eval(_0x4d97fa));break;case _0x257967(0x1c5):_0x5a5b47=_0x30d8a9[_0x4a7472]!==''?JSON['parse'](_0x30d8a9[_0x4a7472]):'';break;case'ARRAYJSON':_0x159de1=_0x30d8a9[_0x4a7472]!==''?JSON[_0x257967(0x4e8)](_0x30d8a9[_0x4a7472]):[],_0x5a5b47=_0x159de1['map'](_0x15dc8c=>JSON['parse'](_0x15dc8c));break;case _0x257967(0x3ea):_0x5a5b47=_0x30d8a9[_0x4a7472]!==''?new Function(JSON[_0x257967(0x4e8)](_0x30d8a9[_0x4a7472])):new Function(_0x257967(0x2ce));break;case _0x257967(0x583):_0x159de1=_0x30d8a9[_0x4a7472]!==''?JSON[_0x257967(0x4e8)](_0x30d8a9[_0x4a7472]):[],_0x5a5b47=_0x159de1[_0x257967(0x45d)](_0x500451=>new Function(JSON['parse'](_0x500451)));break;case _0x257967(0x62c):_0x5a5b47=_0x30d8a9[_0x4a7472]!==''?String(_0x30d8a9[_0x4a7472]):'';break;case'ARRAYSTR':_0x159de1=_0x30d8a9[_0x4a7472]!==''?JSON['parse'](_0x30d8a9[_0x4a7472]):[],_0x5a5b47=_0x159de1[_0x257967(0x45d)](_0x1322da=>String(_0x1322da));break;case _0x257967(0x34c):_0x42be95=_0x30d8a9[_0x4a7472]!==''?JSON['parse'](_0x30d8a9[_0x4a7472]):{},_0x4b3f86[_0x1e3a4d]={},VisuMZ[_0x257967(0x5dd)](_0x4b3f86[_0x1e3a4d],_0x42be95);continue;case'ARRAYSTRUCT':_0x159de1=_0x30d8a9[_0x4a7472]!==''?JSON['parse'](_0x30d8a9[_0x4a7472]):[],_0x5a5b47=_0x159de1[_0x257967(0x45d)](_0x2fc886=>VisuMZ[_0x257967(0x5dd)]({},JSON['parse'](_0x2fc886)));break;default:continue;}_0x4b3f86[_0x1e3a4d]=_0x5a5b47;}}return _0x4b3f86;},(_0x56e155=>{const _0x53a60d=_0xe5069,_0x1883cb=_0x56e155[_0x53a60d(0x36e)];for(const _0x2d87e9 of dependencies){if(!Imported[_0x2d87e9]){alert('%1\x20is\x20missing\x20a\x20required\x20plugin.\x0aPlease\x20install\x20%2\x20into\x20the\x20Plugin\x20Manager.'['format'](_0x1883cb,_0x2d87e9)),SceneManager[_0x53a60d(0x377)]();break;}}const _0x54fff8=_0x56e155[_0x53a60d(0x247)];if(_0x54fff8['match'](/\[Version[ ](.*?)\]/i)){const _0x32fe69=Number(RegExp['$1']);_0x32fe69!==VisuMZ[label][_0x53a60d(0x355)]&&(alert(_0x53a60d(0x5d2)['format'](_0x1883cb,_0x32fe69)),SceneManager[_0x53a60d(0x377)]());}if(_0x54fff8[_0x53a60d(0x506)](/\[Tier[ ](\d+)\]/i)){const _0x1ce146=Number(RegExp['$1']);_0x1ce146<tier?(alert(_0x53a60d(0x524)[_0x53a60d(0x52c)](_0x1883cb,_0x1ce146,tier)),SceneManager[_0x53a60d(0x377)]()):tier=Math[_0x53a60d(0x314)](_0x1ce146,tier);}VisuMZ[_0x53a60d(0x5dd)](VisuMZ[label][_0x53a60d(0x553)],_0x56e155[_0x53a60d(0x5a1)]);})(pluginData),VisuMZ['OperateValues']=function(_0x9bca59,_0x412d79,_0x215b99){switch(_0x215b99){case'=':return _0x412d79;break;case'+':return _0x9bca59+_0x412d79;break;case'-':return _0x9bca59-_0x412d79;break;case'*':return _0x9bca59*_0x412d79;break;case'/':return _0x9bca59/_0x412d79;break;case'%':return _0x9bca59%_0x412d79;break;}return _0x9bca59;},PluginManager[_0xe5069(0x5c3)](pluginData[_0xe5069(0x36e)],'AutoMoveEvents',_0x162080=>{const _0x31725d=_0xe5069;VisuMZ['ConvertParams'](_0x162080,_0x162080);switch(_0x162080[_0x31725d(0x4b8)]){case'Allow':$gameSystem[_0x31725d(0x621)](!![]);break;case'Stop':$gameSystem[_0x31725d(0x621)](![]);break;case _0x31725d(0x504):$gameSystem[_0x31725d(0x621)](!$gameSystem[_0x31725d(0x2af)]());break;}}),PluginManager['registerCommand'](pluginData[_0xe5069(0x36e)],'CallEvent',_0x16c3ee=>{const _0x5806fb=_0xe5069;VisuMZ[_0x5806fb(0x5dd)](_0x16c3ee,_0x16c3ee);const _0x5cbbd4=$gameTemp[_0x5806fb(0x639)](),_0x582c8f={'mapId':_0x16c3ee[_0x5806fb(0x432)],'eventId':_0x16c3ee[_0x5806fb(0x2c5)]||_0x5cbbd4[_0x5806fb(0x21e)](),'pageId':_0x16c3ee[_0x5806fb(0x42d)]};if(_0x582c8f['mapId']<=0x0)_0x582c8f['mapId']=$gameMap?$gameMap[_0x5806fb(0x5a6)]():0x1;$gameTemp[_0x5806fb(0x639)]()[_0x5806fb(0x413)](_0x582c8f);}),PluginManager[_0xe5069(0x5c3)](pluginData[_0xe5069(0x36e)],'DashEnableToggle',_0xb4c89c=>{const _0x18350e=_0xe5069;VisuMZ['ConvertParams'](_0xb4c89c,_0xb4c89c);switch(_0xb4c89c[_0x18350e(0x4b8)]){case _0x18350e(0x402):$gameSystem['setDashingEnabled'](!![]);break;case'Disable':$gameSystem[_0x18350e(0x325)](![]);break;case _0x18350e(0x504):$gameSystem[_0x18350e(0x325)](!$gameSystem[_0x18350e(0x211)]());break;}}),PluginManager[_0xe5069(0x5c3)](pluginData[_0xe5069(0x36e)],_0xe5069(0x58c),_0x94204a=>{const _0x51f3c9=_0xe5069;VisuMZ[_0x51f3c9(0x5dd)](_0x94204a,_0x94204a);const _0x1d4ba0=$gameTemp[_0x51f3c9(0x639)]();_0x94204a[_0x51f3c9(0x432)]=_0x94204a[_0x51f3c9(0x432)]||$gameMap[_0x51f3c9(0x5a6)](),$gameSystem[_0x51f3c9(0x1c0)](_0x94204a[_0x51f3c9(0x432)],_0x94204a[_0x51f3c9(0x2c5)]||_0x1d4ba0['eventId'](),_0x94204a[_0x51f3c9(0x66f)],_0x94204a[_0x51f3c9(0x27a)],_0x94204a[_0x51f3c9(0x2fd)],_0x94204a[_0x51f3c9(0x646)],![]);}),PluginManager[_0xe5069(0x5c3)](pluginData[_0xe5069(0x36e)],_0xe5069(0x1b4),_0x2f8a2c=>{const _0x245090=_0xe5069;VisuMZ[_0x245090(0x5dd)](_0x2f8a2c,_0x2f8a2c);const _0x4c4835=$gameTemp[_0x245090(0x639)]();_0x2f8a2c['MapId']=_0x2f8a2c[_0x245090(0x432)]||$gameMap[_0x245090(0x5a6)](),$gameSystem[_0x245090(0x1c0)](_0x2f8a2c[_0x245090(0x432)],_0x2f8a2c[_0x245090(0x2c5)]||_0x4c4835[_0x245090(0x21e)](),_0x2f8a2c[_0x245090(0x66f)],_0x2f8a2c['IconBufferX'],_0x2f8a2c[_0x245090(0x2fd)],_0x2f8a2c[_0x245090(0x646)],!![]);}),PluginManager[_0xe5069(0x5c3)](pluginData[_0xe5069(0x36e)],'EventIconDelete',_0x2ecba9=>{const _0x547b8f=_0xe5069;VisuMZ['ConvertParams'](_0x2ecba9,_0x2ecba9);const _0x4cf473=$gameTemp['getLastPluginCommandInterpreter']();_0x2ecba9['MapId']=_0x2ecba9[_0x547b8f(0x432)]||$gameMap[_0x547b8f(0x5a6)](),$gameSystem[_0x547b8f(0x578)](_0x2ecba9[_0x547b8f(0x432)],_0x2ecba9[_0x547b8f(0x2c5)]||_0x4cf473[_0x547b8f(0x21e)]());}),PluginManager[_0xe5069(0x5c3)](pluginData[_0xe5069(0x36e)],_0xe5069(0x58b),_0x1c0fcb=>{const _0x3b3031=_0xe5069;VisuMZ[_0x3b3031(0x5dd)](_0x1c0fcb,_0x1c0fcb);const _0x205fbd=$gameTemp[_0x3b3031(0x639)]();_0x1c0fcb[_0x3b3031(0x432)]=_0x1c0fcb[_0x3b3031(0x432)]||$gameMap[_0x3b3031(0x5a6)](),$gameSystem[_0x3b3031(0x1e8)](_0x1c0fcb[_0x3b3031(0x432)],_0x1c0fcb[_0x3b3031(0x2c5)]||_0x205fbd[_0x3b3031(0x21e)]());}),PluginManager['registerCommand'](pluginData[_0xe5069(0x36e)],_0xe5069(0x210),_0x5722a8=>{const _0x230d3a=_0xe5069;if($gameMap)for(const _0x23c4ae of $gameMap[_0x230d3a(0x449)]()){_0x23c4ae[_0x230d3a(0x422)](),_0x23c4ae[_0x230d3a(0x3bb)]();}if(SceneManager[_0x230d3a(0x636)]()){const _0x493738=SceneManager[_0x230d3a(0x3df)]['_spriteset'];if(_0x493738)_0x493738[_0x230d3a(0x2b4)]();}}),PluginManager[_0xe5069(0x5c3)](pluginData[_0xe5069(0x36e)],_0xe5069(0x218),_0x2cc9fb=>{const _0x23f259=_0xe5069;VisuMZ['ConvertParams'](_0x2cc9fb,_0x2cc9fb);switch(_0x2cc9fb[_0x23f259(0x219)]){case _0x23f259(0x3b8):$gameSystem['setEventLabelsVisible'](!![]);break;case _0x23f259(0x56d):$gameSystem[_0x23f259(0x1c1)](![]);break;case _0x23f259(0x504):$gameSystem[_0x23f259(0x1c1)](!$gameSystem[_0x23f259(0x48d)]());break;}}),PluginManager['registerCommand'](pluginData[_0xe5069(0x36e)],_0xe5069(0x65a),_0x820c41=>{const _0xfc3603=_0xe5069;VisuMZ['ConvertParams'](_0x820c41,_0x820c41);const _0x51fdbd=$gameTemp['getLastPluginCommandInterpreter']();if(!$gameMap)return;const _0x135bf2=$gameMap[_0xfc3603(0x54b)](_0x820c41[_0xfc3603(0x2c5)]||_0x51fdbd[_0xfc3603(0x21e)]());if(_0x135bf2)_0x135bf2[_0xfc3603(0x5aa)]();}),PluginManager[_0xe5069(0x5c3)](pluginData[_0xe5069(0x36e)],_0xe5069(0x38b),_0x38fb8c=>{const _0x14155a=_0xe5069;VisuMZ[_0x14155a(0x5dd)](_0x38fb8c,_0x38fb8c);const _0x430e86=$gameTemp['getLastPluginCommandInterpreter'](),_0x1fd7ed=_0x38fb8c['MapId']||$gameMap['mapId'](),_0x5e5461=_0x38fb8c[_0x14155a(0x2c5)]||_0x430e86[_0x14155a(0x21e)](),_0xfd4653=_0x38fb8c[_0x14155a(0x534)]||0x0,_0x5f3c2e=_0x38fb8c[_0x14155a(0x274)]||0x0,_0x16f4ac=_0x38fb8c[_0x14155a(0x546)]||0x2,_0x1f7a99=((_0x38fb8c[_0x14155a(0x42d)]||0x1)-0x1)[_0x14155a(0x4ff)](0x0,0x13),_0x1094c7=_0x38fb8c[_0x14155a(0x3d6)]||0x0;$gameSystem[_0x14155a(0x63f)](_0x1fd7ed,_0x5e5461,_0xfd4653,_0x5f3c2e,_0x16f4ac,_0x1f7a99,_0x1094c7);}),PluginManager['registerCommand'](pluginData[_0xe5069(0x36e)],_0xe5069(0x5e9),_0x25441b=>{const _0x835dcb=_0xe5069;VisuMZ[_0x835dcb(0x5dd)](_0x25441b,_0x25441b);const _0x4fce52=$gameTemp['getLastPluginCommandInterpreter'](),_0x2deaf4=_0x25441b[_0x835dcb(0x432)]||$gameMap['mapId'](),_0x206c32=_0x25441b[_0x835dcb(0x2c5)]||_0x4fce52[_0x835dcb(0x21e)]();$gameSystem['deleteSavedEventLocationKey'](_0x2deaf4,_0x206c32);}),VisuMZ['EventsMoveCore'][_0xe5069(0x5e4)]=function(_0x7008f,_0x4561e9){const _0x5e6a7e=_0xe5069;_0x4561e9=_0x4561e9||{},_0x7008f['fadeDuration']={'fadeIn':_0x4561e9[_0x5e6a7e(0x1cc)]||0x0,'fadeOut':_0x4561e9['fadeOutDuration']||0x0},_0x7008f[_0x5e6a7e(0x503)]={'x':_0x4561e9[_0x5e6a7e(0x20a)]||0x0,'y':_0x4561e9[_0x5e6a7e(0x2c3)]||0x0},_0x7008f[_0x5e6a7e(0x46f)]={'x':_0x4561e9[_0x5e6a7e(0x254)]||0x0,'y':_0x4561e9['endOffsetY']||0x0},_0x7008f[_0x5e6a7e(0x204)]={'x':_0x4561e9[_0x5e6a7e(0x324)]||0x0,'y':_0x4561e9['endScaleY']||0x0},_0x7008f[_0x5e6a7e(0x2dc)]={'x':_0x4561e9['startScaleX']||0x0,'y':_0x4561e9[_0x5e6a7e(0x49b)]||0x0},_0x7008f[_0x5e6a7e(0x3a7)]={'start':_0x4561e9[_0x5e6a7e(0x23f)]||0x0,'end':_0x4561e9['endAngle']||0x0},_0x7008f['misc']={'arc':_0x4561e9[_0x5e6a7e(0x1da)]||0x0};},PluginManager[_0xe5069(0x5c3)](pluginData[_0xe5069(0x36e)],'MsgPopupPlayer',_0x43ec87=>{const _0x266cf1=_0xe5069;if(!SceneManager['isInstanceOfSceneMap']())return;if(!Imported[_0x266cf1(0x29b)]){$gameTemp['isPlaytest']()&&alert(_0x266cf1(0x1b7)+_0x266cf1(0x46d));return;}VisuMZ[_0x266cf1(0x5dd)](_0x43ec87,_0x43ec87);const _0x2b3cf5={'text':_0x43ec87[_0x266cf1(0x538)]||'','duration':Math[_0x266cf1(0x314)](_0x43ec87[_0x266cf1(0x62d)]||0x3c,0xc)},_0x476205=_0x43ec87[_0x266cf1(0x5b9)]||{};VisuMZ[_0x266cf1(0x5f4)]['ApplyPopupExtraSettings'](_0x2b3cf5,_0x476205);const _0x18de8f=SceneManager['_scene'][_0x266cf1(0x477)];if(_0x18de8f){const _0x347e37=$gamePlayer;_0x18de8f['createEventsMoveCoreMessagePopup'](_0x347e37,_0x2b3cf5);}}),PluginManager['registerCommand'](pluginData['name'],_0xe5069(0x4d2),_0x4d4da2=>{const _0x38332d=_0xe5069;if(!SceneManager[_0x38332d(0x2f4)]())return;if(!Imported[_0x38332d(0x29b)]){$gameTemp[_0x38332d(0x38f)]()&&alert('VisuMZ_1_MessageCore\x20is\x20required\x20to\x20run\x20'+_0x38332d(0x46d));return;}VisuMZ['ConvertParams'](_0x4d4da2,_0x4d4da2);const _0x3d8805=_0x4d4da2[_0x38332d(0x451)]||0x0,_0x22259f={'text':_0x4d4da2['MessageText']||'','duration':Math[_0x38332d(0x314)](_0x4d4da2['MsgDuration']||0x3c,0xc)},_0x249bb7=_0x4d4da2['PopupExtra']||{};VisuMZ[_0x38332d(0x5f4)][_0x38332d(0x5e4)](_0x22259f,_0x249bb7);const _0xc9bd34=SceneManager[_0x38332d(0x3df)][_0x38332d(0x477)];if(_0xc9bd34){const _0x585ea8=$gamePlayer[_0x38332d(0x2a9)]()[_0x38332d(0x634)](_0x3d8805);_0xc9bd34[_0x38332d(0x54a)](_0x585ea8,_0x22259f);}}),PluginManager[_0xe5069(0x5c3)](pluginData['name'],'MsgPopupEvent',_0x373ae7=>{const _0x14d303=_0xe5069;if(!SceneManager[_0x14d303(0x2f4)]())return;if(!Imported[_0x14d303(0x29b)]){$gameTemp[_0x14d303(0x38f)]()&&alert(_0x14d303(0x1b7)+_0x14d303(0x46d));return;}VisuMZ[_0x14d303(0x5dd)](_0x373ae7,_0x373ae7);const _0x56b24d=$gameTemp['getLastPluginCommandInterpreter'](),_0x204e12=_0x373ae7[_0x14d303(0x2c5)]||(_0x56b24d?_0x56b24d['eventId']():0x1),_0x376e6b={'text':_0x373ae7['MessageText']||'','duration':Math[_0x14d303(0x314)](_0x373ae7['MsgDuration']||0x3c,0xc)},_0x1f0736=_0x373ae7['PopupExtra']||{};VisuMZ[_0x14d303(0x5f4)][_0x14d303(0x5e4)](_0x376e6b,_0x1f0736);const _0x553f17=SceneManager[_0x14d303(0x3df)][_0x14d303(0x477)];if(_0x553f17){const _0x1d3b43=$gameMap[_0x14d303(0x54b)](_0x204e12);_0x553f17['createEventsMoveCoreMessagePopup'](_0x1d3b43,_0x376e6b);}}),PluginManager[_0xe5069(0x5c3)](pluginData[_0xe5069(0x36e)],_0xe5069(0x481),_0x4f7ca5=>{const _0x5bb6de=_0xe5069;if(!SceneManager[_0x5bb6de(0x2f4)]())return;if(!Imported[_0x5bb6de(0x29b)]){$gameTemp['isPlaytest']()&&alert('VisuMZ_1_MessageCore\x20is\x20required\x20to\x20run\x20'+_0x5bb6de(0x46d));return;}VisuMZ[_0x5bb6de(0x5dd)](_0x4f7ca5,_0x4f7ca5);const _0x47e179={'text':_0x4f7ca5[_0x5bb6de(0x538)]||'','duration':Math[_0x5bb6de(0x314)](_0x4f7ca5[_0x5bb6de(0x62d)]||0x3c,0xc),'tileCoordinates':{'x':Math[_0x5bb6de(0x471)](_0x4f7ca5['TileX']||0x0),'y':Math[_0x5bb6de(0x471)](_0x4f7ca5[_0x5bb6de(0x28a)]||0x0)}},_0x3ada33=_0x4f7ca5[_0x5bb6de(0x5b9)]||{};VisuMZ[_0x5bb6de(0x5f4)][_0x5bb6de(0x5e4)](_0x47e179,_0x3ada33);const _0x3d9ed5=SceneManager[_0x5bb6de(0x3df)][_0x5bb6de(0x477)];_0x3d9ed5&&_0x3d9ed5[_0x5bb6de(0x669)](_0x47e179);}),PluginManager[_0xe5069(0x5c3)](pluginData[_0xe5069(0x36e)],_0xe5069(0x4f1),_0xf5d1f8=>{const _0x173672=_0xe5069;VisuMZ[_0x173672(0x5dd)](_0xf5d1f8,_0xf5d1f8);const _0x4ef76f=_0xf5d1f8[_0x173672(0x5e0)];$gameTimer[_0x173672(0x1cf)](_0x4ef76f);}),PluginManager[_0xe5069(0x5c3)](pluginData['name'],_0xe5069(0x672),_0x3c38d6=>{const _0x40bbc5=_0xe5069;$gameTimer[_0x40bbc5(0x1cf)](0x0);}),PluginManager[_0xe5069(0x5c3)](pluginData['name'],_0xe5069(0x55f),_0x4ce878=>{const _0x4cde05=_0xe5069;if(!$gameTimer[_0x4cde05(0x34d)]())return;VisuMZ[_0x4cde05(0x5dd)](_0x4ce878,_0x4ce878);let _0x50d006=0x0;_0x50d006+=_0x4ce878[_0x4cde05(0x408)],_0x50d006+=_0x4ce878[_0x4cde05(0x1a3)]*0x3c,_0x50d006+=_0x4ce878[_0x4cde05(0x43f)]*0x3c*0x3c,_0x50d006+=_0x4ce878[_0x4cde05(0x3bc)]*0x3c*0x3c*0x3c,$gameTimer['gainFrames'](_0x50d006);}),PluginManager[_0xe5069(0x5c3)](pluginData[_0xe5069(0x36e)],_0xe5069(0x3dd),_0x201712=>{const _0x1d86e9=_0xe5069;if(!$gameTimer[_0x1d86e9(0x34d)]())return;VisuMZ[_0x1d86e9(0x5dd)](_0x201712,_0x201712);let _0x6dd3b=0x0;_0x6dd3b+=_0x201712[_0x1d86e9(0x408)],_0x6dd3b+=_0x201712[_0x1d86e9(0x1a3)]*0x3c,_0x6dd3b+=_0x201712[_0x1d86e9(0x43f)]*0x3c*0x3c,_0x6dd3b+=_0x201712['Hours']*0x3c*0x3c*0x3c,$gameTimer[_0x1d86e9(0x445)](_0x6dd3b);}),PluginManager['registerCommand'](pluginData[_0xe5069(0x36e)],'EventTimerPause',_0x297ed7=>{const _0x4d336a=_0xe5069;if(!$gameTimer[_0x4d336a(0x34d)]())return;$gameTimer[_0x4d336a(0x1f6)]();}),PluginManager[_0xe5069(0x5c3)](pluginData[_0xe5069(0x36e)],_0xe5069(0x594),_0x3402ad=>{const _0x1172b2=_0xe5069;if(!$gameTimer[_0x1172b2(0x34d)]())return;$gameTimer[_0x1172b2(0x5a3)]();}),PluginManager[_0xe5069(0x5c3)](pluginData['name'],_0xe5069(0x4aa),_0x1179de=>{const _0x59a9b4=_0xe5069;VisuMZ[_0x59a9b4(0x5dd)](_0x1179de,_0x1179de);const _0x302b3e=_0x1179de[_0x59a9b4(0x3c1)]||0x0;$gameTimer[_0x59a9b4(0x207)](_0x302b3e);}),PluginManager[_0xe5069(0x5c3)](pluginData[_0xe5069(0x36e)],_0xe5069(0x64c),_0x393391=>{const _0x30fd28=_0xe5069;VisuMZ[_0x30fd28(0x5dd)](_0x393391,_0x393391);const _0x5337fa=!_0x393391[_0x30fd28(0x2c4)];$gameSystem['setStopFollowerChasing'](_0x5337fa);}),PluginManager['registerCommand'](pluginData[_0xe5069(0x36e)],_0xe5069(0x1b5),_0x26b422=>{const _0x26a153=_0xe5069;VisuMZ['ConvertParams'](_0x26b422,_0x26b422);const _0x5b027b=(_0x26b422[_0x26a153(0x3f6)]||0x0)-0x1,_0x5d6f6a=!_0x26b422[_0x26a153(0x2c4)],_0x463445=$gamePlayer['followers']()['follower'](_0x5b027b);if(_0x463445)_0x463445['setChaseOff'](_0x5d6f6a);}),PluginManager[_0xe5069(0x5c3)](pluginData['name'],_0xe5069(0x2a4),_0x1781cf=>{const _0x10f415=_0xe5069;VisuMZ[_0x10f415(0x5dd)](_0x1781cf,_0x1781cf);const _0x25574a=_0x1781cf[_0x10f415(0x3f6)];$gameSystem['setControlledFollowerID'](_0x25574a);}),PluginManager[_0xe5069(0x5c3)](pluginData[_0xe5069(0x36e)],_0xe5069(0x1c3),_0x42f76d=>{const _0x2e4376=_0xe5069;VisuMZ[_0x2e4376(0x5dd)](_0x42f76d,_0x42f76d),$gameSystem[_0x2e4376(0x292)](0x0),$gameSystem[_0x2e4376(0x2bf)](![]);for(const _0x152f01 of $gamePlayer[_0x2e4376(0x2a9)]()['_data']){if(_0x152f01)_0x152f01[_0x2e4376(0x37b)](![]);}}),PluginManager[_0xe5069(0x5c3)](pluginData['name'],_0xe5069(0x427),_0x3fb616=>{const _0x452d17=_0xe5069;VisuMZ[_0x452d17(0x5dd)](_0x3fb616,_0x3fb616);const _0x3a46f3=$gameTemp[_0x452d17(0x639)]();_0x3fb616['MapId']=_0x3fb616['MapId']||$gameMap['mapId']();const _0x578828=[_0x3fb616[_0x452d17(0x432)],_0x3fb616[_0x452d17(0x2c5)]||_0x3a46f3[_0x452d17(0x21e)](),_0x3fb616[_0x452d17(0x46a)]],_0x5e79ce=_0x3fb616[_0x452d17(0x652)],_0xda9789=$gameSelfSwitches[_0x452d17(0x5ad)](_0x578828)||![];$gameSwitches['setValue'](_0x5e79ce,_0xda9789);}),PluginManager['registerCommand'](pluginData[_0xe5069(0x36e)],_0xe5069(0x465),_0x3e2b50=>{const _0x1ab430=_0xe5069;VisuMZ[_0x1ab430(0x5dd)](_0x3e2b50,_0x3e2b50);const _0x404c02=$gameTemp[_0x1ab430(0x639)]();_0x3e2b50[_0x1ab430(0x432)]=_0x3e2b50['MapId']||$gameMap[_0x1ab430(0x5a6)]();const _0x37fb45=[_0x3e2b50[_0x1ab430(0x432)],_0x3e2b50[_0x1ab430(0x2c5)]||_0x404c02[_0x1ab430(0x21e)](),_0x1ab430(0x3c5)[_0x1ab430(0x52c)](_0x3e2b50[_0x1ab430(0x55c)])],_0x3080c3=_0x3e2b50[_0x1ab430(0x652)],_0x262833=$gameSelfSwitches[_0x1ab430(0x5ad)](_0x37fb45)||![];$gameSwitches['setValue'](_0x3080c3,_0x262833);}),PluginManager[_0xe5069(0x5c3)](pluginData[_0xe5069(0x36e)],_0xe5069(0x62e),_0x4d89c9=>{const _0x2d4f1c=_0xe5069;VisuMZ[_0x2d4f1c(0x5dd)](_0x4d89c9,_0x4d89c9);const _0x41c413=$gameTemp[_0x2d4f1c(0x639)]();_0x4d89c9[_0x2d4f1c(0x432)]=_0x4d89c9['MapId']||$gameMap[_0x2d4f1c(0x5a6)]();const _0x39ced1=[_0x4d89c9[_0x2d4f1c(0x432)],_0x4d89c9[_0x2d4f1c(0x2c5)]||_0x41c413[_0x2d4f1c(0x21e)](),_0x2d4f1c(0x28d)[_0x2d4f1c(0x52c)](_0x4d89c9[_0x2d4f1c(0x5f5)])],_0x14a184=_0x4d89c9['TargetVariableId'],_0x305be2=$gameSelfSwitches[_0x2d4f1c(0x5ad)](_0x39ced1)||![];$gameVariables['setValue'](_0x14a184,_0x305be2);}),PluginManager[_0xe5069(0x5c3)](pluginData[_0xe5069(0x36e)],'MorphEventTo',_0x431fb2=>{const _0x4e8427=_0xe5069;VisuMZ[_0x4e8427(0x5dd)](_0x431fb2,_0x431fb2);if(!$gameMap)return;const _0x38ab93=$gameTemp[_0x4e8427(0x639)](),_0x34d12f=_0x431fb2['Step2Preserve'];_0x431fb2['Step1MapId']=_0x431fb2[_0x4e8427(0x670)]||$gameMap[_0x4e8427(0x5a6)](),_0x431fb2[_0x4e8427(0x56e)]=_0x431fb2[_0x4e8427(0x56e)]||$gameMap[_0x4e8427(0x5a6)](),_0x431fb2[_0x4e8427(0x356)]=_0x431fb2['TemplateName']['toUpperCase']()[_0x4e8427(0x3d9)]();if(!_0x34d12f&&_0x431fb2[_0x4e8427(0x670)]!==$gameMap[_0x4e8427(0x5a6)]())return;if($gameMap[_0x4e8427(0x5a6)]()===_0x431fb2[_0x4e8427(0x670)]){const _0x27f154=$gameMap[_0x4e8427(0x54b)](_0x431fb2['Step1EventId']||_0x38ab93[_0x4e8427(0x21e)]());if(!_0x27f154)return;_0x431fb2[_0x4e8427(0x356)]!=='UNTITLED'?_0x27f154[_0x4e8427(0x624)](_0x431fb2[_0x4e8427(0x356)]):_0x27f154[_0x4e8427(0x1ee)](_0x431fb2[_0x4e8427(0x56e)],_0x431fb2[_0x4e8427(0x412)]||_0x38ab93[_0x4e8427(0x21e)]());}_0x34d12f&&$gameSystem[_0x4e8427(0x5c5)](_0x431fb2[_0x4e8427(0x670)],_0x431fb2[_0x4e8427(0x3e0)],_0x431fb2[_0x4e8427(0x356)],_0x431fb2[_0x4e8427(0x56e)],_0x431fb2[_0x4e8427(0x412)]);}),PluginManager[_0xe5069(0x5c3)](pluginData[_0xe5069(0x36e)],_0xe5069(0x5db),_0x470e8d=>{const _0x161e1f=_0xe5069;VisuMZ[_0x161e1f(0x5dd)](_0x470e8d,_0x470e8d);if(!$gameMap)return;const _0x14f421=$gameTemp[_0x161e1f(0x639)]();_0x470e8d['MapId']=_0x470e8d['MapId']||$gameMap[_0x161e1f(0x5a6)]();if($gameMap[_0x161e1f(0x5a6)]()===_0x470e8d['MapId']){const _0x5a0b5c=$gameMap[_0x161e1f(0x54b)](_0x470e8d[_0x161e1f(0x2c5)]||_0x14f421['eventId']());_0x5a0b5c[_0x161e1f(0x564)]();}_0x470e8d[_0x161e1f(0x509)]&&$gameSystem[_0x161e1f(0x41f)](_0x470e8d['MapId'],_0x470e8d['EventId']||_0x14f421[_0x161e1f(0x21e)]());}),PluginManager['registerCommand'](pluginData[_0xe5069(0x36e)],_0xe5069(0x45e),_0x4e7220=>{const _0x5bdc47=_0xe5069;VisuMZ[_0x5bdc47(0x5dd)](_0x4e7220,_0x4e7220),$gameSystem[_0x5bdc47(0x201)]($gamePlayer,_0x4e7220[_0x5bdc47(0x66f)],_0x4e7220[_0x5bdc47(0x27a)],_0x4e7220[_0x5bdc47(0x2fd)],_0x4e7220[_0x5bdc47(0x646)]);}),PluginManager['registerCommand'](pluginData[_0xe5069(0x36e)],_0xe5069(0x229),_0x9e921e=>{const _0x4acd0f=_0xe5069;VisuMZ['ConvertParams'](_0x9e921e,_0x9e921e),$gameSystem[_0x4acd0f(0x5b4)]($gamePlayer);}),PluginManager[_0xe5069(0x5c3)](pluginData[_0xe5069(0x36e)],'PlayerMovementChange',_0x330fc=>{const _0xecad40=_0xe5069;VisuMZ['ConvertParams'](_0x330fc,_0x330fc),$gameSystem[_0xecad40(0x2b0)](!_0x330fc[_0xecad40(0x402)]);}),PluginManager[_0xe5069(0x5c3)](pluginData['name'],_0xe5069(0x51d),_0x190b4e=>{const _0x4b7a83=_0xe5069;VisuMZ[_0x4b7a83(0x5dd)](_0x190b4e,_0x190b4e),$gameSystem['setPlayerDiagonalSetting'](_0x190b4e[_0x4b7a83(0x327)]);}),PluginManager[_0xe5069(0x5c3)](pluginData[_0xe5069(0x36e)],_0xe5069(0x626),_0x36cc47=>{const _0x20670f=_0xe5069;VisuMZ['ConvertParams'](_0x36cc47,_0x36cc47);const _0x42f69c=_0x36cc47['MapId']||$gameMap[_0x20670f(0x5a6)]();$gameSelfSwitches[_0x20670f(0x424)](_0x42f69c);}),PluginManager[_0xe5069(0x5c3)](pluginData['name'],_0xe5069(0x5ce),_0xccdd56=>{const _0x51e8b3=_0xe5069;VisuMZ[_0x51e8b3(0x5dd)](_0xccdd56,_0xccdd56);const _0x2ebcd3=$gameTemp['getLastPluginCommandInterpreter']();_0xccdd56[_0x51e8b3(0x432)]=_0xccdd56['MapId']||$gameMap[_0x51e8b3(0x5a6)]();const _0x319a01=[_0xccdd56[_0x51e8b3(0x432)],_0xccdd56[_0x51e8b3(0x2c5)]||_0x2ebcd3[_0x51e8b3(0x21e)](),_0xccdd56[_0x51e8b3(0x46a)]];switch(_0xccdd56[_0x51e8b3(0x4b8)]){case'ON':$gameSelfSwitches['setValue'](_0x319a01,!![]);break;case _0x51e8b3(0x2bd):$gameSelfSwitches[_0x51e8b3(0x540)](_0x319a01,![]);break;case _0x51e8b3(0x504):$gameSelfSwitches[_0x51e8b3(0x540)](_0x319a01,!$gameSelfSwitches[_0x51e8b3(0x5ad)](_0x319a01));break;}}),PluginManager[_0xe5069(0x5c3)](pluginData[_0xe5069(0x36e)],_0xe5069(0x537),_0x2e012f=>{const _0xe8a138=_0xe5069;VisuMZ[_0xe8a138(0x5dd)](_0x2e012f,_0x2e012f);const _0x28d7e9=$gameTemp['getLastPluginCommandInterpreter']();_0x2e012f[_0xe8a138(0x432)]=_0x2e012f[_0xe8a138(0x432)]||$gameMap['mapId']();const _0x1fb17e=[_0x2e012f[_0xe8a138(0x432)],_0x2e012f[_0xe8a138(0x2c5)]||_0x28d7e9[_0xe8a138(0x21e)](),_0xe8a138(0x3c5)[_0xe8a138(0x52c)](_0x2e012f[_0xe8a138(0x55c)])];switch(_0x2e012f[_0xe8a138(0x4b8)]){case'ON':$gameSelfSwitches[_0xe8a138(0x540)](_0x1fb17e,!![]);break;case _0xe8a138(0x2bd):$gameSelfSwitches[_0xe8a138(0x540)](_0x1fb17e,![]);break;case _0xe8a138(0x504):$gameSelfSwitches['setValue'](_0x1fb17e,!$gameSelfSwitches[_0xe8a138(0x5ad)](_0x1fb17e));break;}}),PluginManager[_0xe5069(0x5c3)](pluginData[_0xe5069(0x36e)],_0xe5069(0x40b),_0x1eed33=>{const _0x669d37=_0xe5069;VisuMZ[_0x669d37(0x5dd)](_0x1eed33,_0x1eed33);const _0x42e316=$gameTemp[_0x669d37(0x639)]();_0x1eed33['MapId']=_0x1eed33[_0x669d37(0x432)]||$gameMap[_0x669d37(0x5a6)]();const _0xd71bf1=[_0x1eed33[_0x669d37(0x432)],_0x1eed33[_0x669d37(0x2c5)]||_0x42e316[_0x669d37(0x21e)](),'Self\x20Variable\x20%1'['format'](_0x1eed33[_0x669d37(0x5f5)])],_0xbc4783=VisuMZ[_0x669d37(0x48f)]($gameSelfSwitches[_0x669d37(0x5ad)](_0xd71bf1),_0x1eed33[_0x669d37(0x4b8)],_0x1eed33[_0x669d37(0x1d0)]);$gameSelfSwitches['setValue'](_0xd71bf1,_0xbc4783);}),PluginManager[_0xe5069(0x5c3)](pluginData[_0xe5069(0x36e)],_0xe5069(0x393),_0x2c0643=>{const _0x4dfe0a=_0xe5069;VisuMZ['ConvertParams'](_0x2c0643,_0x2c0643);const _0x34b961=$gameTemp[_0x4dfe0a(0x639)](),_0x133c23={'template':_0x2c0643['TemplateName'],'mapId':_0x2c0643['MapId']||$gameMap['mapId'](),'eventId':_0x2c0643[_0x4dfe0a(0x2c5)]||_0x34b961[_0x4dfe0a(0x21e)](),'x':_0x2c0643[_0x4dfe0a(0x534)],'y':_0x2c0643[_0x4dfe0a(0x274)],'spawnPreserved':_0x2c0643[_0x4dfe0a(0x423)],'spawnEventId':$gameMap['_spawnedEvents']['length']+0x3e8},_0x54ee15=_0x2c0643['SuccessSwitchId']||0x0;if(!VisuMZ[_0x4dfe0a(0x620)][_0x133c23['mapId']]&&_0x133c23['mapId']!==$gameMap['mapId']()){let _0x5c17f9=_0x4dfe0a(0x277)['format'](_0x133c23[_0x4dfe0a(0x5a6)]);_0x5c17f9+=_0x4dfe0a(0x3c8),_0x5c17f9+=_0x4dfe0a(0x27c),_0x5c17f9+='Plugin\x20Parameters\x20>\x20Event\x20Template\x20Settings\x20>\x0a',_0x5c17f9+='Preloaded\x20Maps\x20and\x20add\x20in\x20Map\x20%1'[_0x4dfe0a(0x52c)](_0x133c23[_0x4dfe0a(0x5a6)]),alert(_0x5c17f9);return;}const _0x49a0f1=$gameMap[_0x4dfe0a(0x40e)](_0x133c23,_0x2c0643[_0x4dfe0a(0x260)],_0x2c0643[_0x4dfe0a(0x570)]);_0x54ee15&&$gameSwitches[_0x4dfe0a(0x540)](_0x54ee15,!!_0x49a0f1);}),PluginManager[_0xe5069(0x5c3)](pluginData[_0xe5069(0x36e)],_0xe5069(0x3e6),_0xb1c044=>{const _0x2c0b74=_0xe5069;VisuMZ[_0x2c0b74(0x5dd)](_0xb1c044,_0xb1c044);const _0x37489c=$gameTemp[_0x2c0b74(0x639)](),_0x43716d={'template':_0xb1c044[_0x2c0b74(0x356)],'mapId':_0xb1c044[_0x2c0b74(0x432)]||$gameMap[_0x2c0b74(0x5a6)](),'eventId':_0xb1c044['EventId']||_0x37489c[_0x2c0b74(0x21e)](),'x':-0x1,'y':-0x1,'spawnPreserved':_0xb1c044['Preserve'],'spawnEventId':$gameMap[_0x2c0b74(0x5ea)][_0x2c0b74(0x243)]+0x3e8},_0x3cb2fc=_0xb1c044[_0x2c0b74(0x29d)]||0x0;if(!VisuMZ[_0x2c0b74(0x620)][_0x43716d[_0x2c0b74(0x5a6)]]&&_0x43716d[_0x2c0b74(0x5a6)]!==$gameMap[_0x2c0b74(0x5a6)]()){let _0x53caee='You\x20do\x20not\x20have\x20Map\x20%1\x20added\x20to\x20the\x20list\x0a'[_0x2c0b74(0x52c)](_0x43716d['mapId']);_0x53caee+='of\x20Preloaded\x20Maps.\x0a\x0a',_0x53caee+=_0x2c0b74(0x27c),_0x53caee+=_0x2c0b74(0x4b2),_0x53caee+=_0x2c0b74(0x359)[_0x2c0b74(0x52c)](_0x43716d[_0x2c0b74(0x5a6)]),alert(_0x53caee);return;}const _0xfb487a=$gameMap[_0x2c0b74(0x275)](_0x43716d,_0xb1c044[_0x2c0b74(0x303)],_0xb1c044[_0x2c0b74(0x260)],_0xb1c044[_0x2c0b74(0x570)]);_0x3cb2fc&&$gameSwitches['setValue'](_0x3cb2fc,!!_0xfb487a);}),PluginManager['registerCommand'](pluginData['name'],'SpawnEventAtTerrainTag',_0x45b9e1=>{const _0x8e0271=_0xe5069;VisuMZ[_0x8e0271(0x5dd)](_0x45b9e1,_0x45b9e1);const _0x11766e=$gameTemp[_0x8e0271(0x639)](),_0x2dc49c={'template':_0x45b9e1[_0x8e0271(0x356)],'mapId':_0x45b9e1['MapId']||$gameMap[_0x8e0271(0x5a6)](),'eventId':_0x45b9e1[_0x8e0271(0x2c5)]||_0x11766e[_0x8e0271(0x21e)](),'x':-0x1,'y':-0x1,'spawnPreserved':_0x45b9e1[_0x8e0271(0x423)],'spawnEventId':$gameMap[_0x8e0271(0x5ea)]['length']+0x3e8},_0x3adaf3=_0x45b9e1[_0x8e0271(0x29d)]||0x0;if(!VisuMZ[_0x8e0271(0x620)][_0x2dc49c[_0x8e0271(0x5a6)]]&&_0x2dc49c['mapId']!==$gameMap[_0x8e0271(0x5a6)]()){let _0x4f1ad8=_0x8e0271(0x277)[_0x8e0271(0x52c)](_0x2dc49c[_0x8e0271(0x5a6)]);_0x4f1ad8+=_0x8e0271(0x3c8),_0x4f1ad8+=_0x8e0271(0x27c),_0x4f1ad8+=_0x8e0271(0x4b2),_0x4f1ad8+=_0x8e0271(0x359)['format'](_0x2dc49c['mapId']),alert(_0x4f1ad8);return;}const _0x3b68c9=$gameMap[_0x8e0271(0x462)](_0x2dc49c,_0x45b9e1[_0x8e0271(0x56f)],_0x45b9e1[_0x8e0271(0x260)],_0x45b9e1[_0x8e0271(0x570)]);_0x3adaf3&&$gameSwitches[_0x8e0271(0x540)](_0x3adaf3,!!_0x3b68c9);}),PluginManager[_0xe5069(0x5c3)](pluginData[_0xe5069(0x36e)],_0xe5069(0x2a0),_0x4fec42=>{const _0xe7ea15=_0xe5069;VisuMZ[_0xe7ea15(0x5dd)](_0x4fec42,_0x4fec42);const _0xe25033=$gameTemp[_0xe7ea15(0x639)]();$gameMap[_0xe7ea15(0x5d5)](_0x4fec42[_0xe7ea15(0x4e1)]||_0xe25033[_0xe7ea15(0x21e)]());}),PluginManager[_0xe5069(0x5c3)](pluginData[_0xe5069(0x36e)],_0xe5069(0x1cb),_0x30e6df=>{const _0x4311f9=_0xe5069;VisuMZ[_0x4311f9(0x5dd)](_0x30e6df,_0x30e6df);const _0x112ade=_0x30e6df[_0x4311f9(0x534)],_0x3a6623=_0x30e6df[_0x4311f9(0x274)];$gameMap[_0x4311f9(0x3b7)](_0x112ade,_0x3a6623);}),PluginManager[_0xe5069(0x5c3)](pluginData[_0xe5069(0x36e)],'SpawnEventDespawnRegions',_0x1bbc9c=>{const _0x215ff0=_0xe5069;VisuMZ[_0x215ff0(0x5dd)](_0x1bbc9c,_0x1bbc9c),$gameMap['despawnRegions'](_0x1bbc9c[_0x215ff0(0x303)]);}),PluginManager[_0xe5069(0x5c3)](pluginData[_0xe5069(0x36e)],_0xe5069(0x668),_0x15941d=>{const _0x35aae1=_0xe5069;VisuMZ[_0x35aae1(0x5dd)](_0x15941d,_0x15941d),$gameMap[_0x35aae1(0x3e1)](_0x15941d[_0x35aae1(0x56f)]);}),PluginManager['registerCommand'](pluginData['name'],'SpawnEventDespawnEverything',_0x393d51=>{const _0x132021=_0xe5069;VisuMZ[_0x132021(0x5dd)](_0x393d51,_0x393d51),$gameMap[_0x132021(0x54c)]();}),VisuMZ['EventsMoveCore'][_0xe5069(0x47a)]=Scene_Boot[_0xe5069(0x678)][_0xe5069(0x360)],Scene_Boot[_0xe5069(0x678)]['onDatabaseLoaded']=function(){const _0x23d166=_0xe5069;VisuMZ[_0x23d166(0x5f4)][_0x23d166(0x47a)][_0x23d166(0x3ae)](this),this[_0x23d166(0x3b3)](),this['process_VisuMZ_EventsMoveCore_Switches_Variables']();if(VisuMZ[_0x23d166(0x5f4)][_0x23d166(0x466)])VisuMZ[_0x23d166(0x5f4)][_0x23d166(0x466)][_0x23d166(0x33f)]();},VisuMZ[_0xe5069(0x620)]=[],VisuMZ[_0xe5069(0x4dc)]={},Scene_Boot[_0xe5069(0x678)][_0xe5069(0x3b3)]=function(){const _0x2c57e1=_0xe5069;if(DataManager[_0x2c57e1(0x41d)]()||DataManager[_0x2c57e1(0x5da)]())return;const _0x4ec044=VisuMZ['EventsMoveCore'][_0x2c57e1(0x553)][_0x2c57e1(0x345)],_0x5c99a6=_0x4ec044[_0x2c57e1(0x555)][_0x2c57e1(0x3e3)](0x0);for(const _0x317c48 of _0x4ec044['List']){_0x317c48[_0x2c57e1(0x2b3)]=_0x317c48['Name'][_0x2c57e1(0x4f8)]()[_0x2c57e1(0x3d9)](),VisuMZ[_0x2c57e1(0x4dc)][_0x317c48[_0x2c57e1(0x2b3)]]=_0x317c48;if(!_0x5c99a6[_0x2c57e1(0x22a)](_0x317c48['MapID']))_0x5c99a6[_0x2c57e1(0x3a5)](_0x317c48[_0x2c57e1(0x45f)]);}for(const _0x4db744 of _0x5c99a6){if(VisuMZ[_0x2c57e1(0x620)][_0x4db744])continue;const _0x1ce4b5='Map%1.json'['format'](_0x4db744['padZero'](0x3)),_0x567749=_0x2c57e1(0x681)[_0x2c57e1(0x52c)](_0x4db744);DataManager[_0x2c57e1(0x36d)](_0x567749,_0x1ce4b5),setTimeout(this['VisuMZ_Setup_Preload_Map'][_0x2c57e1(0x43d)](this,_0x4db744,_0x567749),0x64);}},Scene_Boot[_0xe5069(0x678)][_0xe5069(0x515)]=function(_0x1145b4,_0x393f82){const _0x50b1d0=_0xe5069;window[_0x393f82]?(VisuMZ[_0x50b1d0(0x620)][_0x1145b4]=window[_0x393f82],window[_0x393f82]=undefined):setTimeout(this[_0x50b1d0(0x515)][_0x50b1d0(0x43d)](this,_0x1145b4,_0x393f82),0x64);},VisuMZ[_0xe5069(0x450)]=[],VisuMZ[_0xe5069(0x55e)]=[],VisuMZ[_0xe5069(0x35c)]=[],VisuMZ[_0xe5069(0x3bd)]=[],VisuMZ['SelfVariables']=[],VisuMZ['MapVariables']=[],Scene_Boot[_0xe5069(0x678)]['process_VisuMZ_EventsMoveCore_Switches_Variables']=function(){const _0x36338c=_0xe5069;for(let _0x1a4974=0x1;_0x1a4974<$dataSystem[_0x36338c(0x529)][_0x36338c(0x243)];_0x1a4974++){if($dataSystem[_0x36338c(0x529)][_0x1a4974]['match'](/<JS>\s*([\s\S]*)\s*<\/JS>/i))VisuMZ[_0x36338c(0x450)][_0x36338c(0x3a5)](_0x1a4974);if($dataSystem[_0x36338c(0x529)][_0x1a4974][_0x36338c(0x506)](/<SELF>/i))VisuMZ[_0x36338c(0x55e)][_0x36338c(0x3a5)](_0x1a4974);if($dataSystem[_0x36338c(0x529)][_0x1a4974][_0x36338c(0x506)](/<MAP>/i))VisuMZ[_0x36338c(0x35c)]['push'](_0x1a4974);}for(let _0x93bf20=0x1;_0x93bf20<$dataSystem[_0x36338c(0x228)][_0x36338c(0x243)];_0x93bf20++){if($dataSystem[_0x36338c(0x228)][_0x93bf20]['match'](/<JS>\s*([\s\S]*)\s*<\/JS>/i))VisuMZ[_0x36338c(0x3bd)]['push'](_0x93bf20);if($dataSystem['variables'][_0x93bf20][_0x36338c(0x506)](/<SELF>/i))VisuMZ[_0x36338c(0x25b)]['push'](_0x93bf20);if($dataSystem['variables'][_0x93bf20][_0x36338c(0x506)](/<MAP>/i))VisuMZ[_0x36338c(0x369)][_0x36338c(0x3a5)](_0x93bf20);}},VisuMZ[_0xe5069(0x5f4)][_0xe5069(0x466)]={},VisuMZ[_0xe5069(0x5f4)][_0xe5069(0x466)][_0xe5069(0x33f)]=function(){const _0x1a55cc=_0xe5069;this[_0x1a55cc(0x249)]=new Game_CPCInterpreter(),this[_0x1a55cc(0x3b2)]();},VisuMZ[_0xe5069(0x5f4)][_0xe5069(0x466)][_0xe5069(0x3b2)]=function(){const _0x23b872=_0xe5069;this[_0x23b872(0x2e3)]=[];for(const _0x1f1fdc of $dataCommonEvents){if(!_0x1f1fdc)continue;VisuMZ[_0x23b872(0x5f4)][_0x23b872(0x466)][_0x23b872(0x568)](_0x1f1fdc);if(_0x1f1fdc[_0x23b872(0x52d)][_0x23b872(0x243)]>0x0)this['_commonEvents'][_0x23b872(0x3a5)](_0x1f1fdc['id']);}},VisuMZ[_0xe5069(0x5f4)]['CustomPageConditions'][_0xe5069(0x43a)]=function(_0x3285c3,_0x58dced,_0x3df3b3){const _0x5c3b5f=_0xe5069;return this['_interpreter'][_0x5c3b5f(0x339)](_0x3285c3,_0x58dced),_0x3df3b3?this[_0x5c3b5f(0x249)][_0x5c3b5f(0x469)](_0x3df3b3):this[_0x5c3b5f(0x249)][_0x5c3b5f(0x231)](),this[_0x5c3b5f(0x249)][_0x5c3b5f(0x264)];},VisuMZ[_0xe5069(0x5f4)][_0xe5069(0x466)][_0xe5069(0x568)]=function(_0x4c523f){const _0x57fd6d=_0xe5069;let _0x4b67e0=![];_0x4c523f[_0x57fd6d(0x52d)]=[];for(const _0x4b4a9f of _0x4c523f[_0x57fd6d(0x41a)]){if([0x6c,0x198][_0x57fd6d(0x22a)](_0x4b4a9f[_0x57fd6d(0x4f0)])){const _0x2e1ed3=_0x4b4a9f[_0x57fd6d(0x5a1)][0x0];if(_0x2e1ed3[_0x57fd6d(0x506)](/<PAGE (?:CONDITION|CONDITIONS)>/i))_0x4b67e0=!![];else _0x2e1ed3[_0x57fd6d(0x506)](/<\/PAGE (?:CONDITION|CONDITIONS)>/i)&&(_0x4b67e0=![]);}_0x4b67e0&&_0x4c523f[_0x57fd6d(0x52d)][_0x57fd6d(0x3a5)](_0x4b4a9f);}},getSelfSwitchValue=function(_0x3c6370,_0x297b7e,_0x5567c7){const _0x4355a3=_0xe5069;let _0x4033cb=[_0x3c6370,_0x297b7e,_0x4355a3(0x3c5)['format'](_0x5567c7)];return typeof _0x5567c7===_0x4355a3(0x536)&&(_0x4033cb=[_0x3c6370,_0x297b7e,_0x5567c7[_0x4355a3(0x4f8)]()[_0x4355a3(0x3d9)]()]),$gameSelfSwitches[_0x4355a3(0x5ad)](_0x4033cb);},getMapSwitchValue=function(_0xffe348,_0x481596){const _0x73d100=_0xe5069;let _0x39e42e=[0x0,0x0,_0x73d100(0x436)['format'](_0xffe348,_0x481596)];return $gameSelfSwitches[_0x73d100(0x5ad)](_0x39e42e);},getMapVariableValue=function(_0x5d642b,_0x545c48){const _0x2a2da9=_0xe5069;let _0x4d96d0=[0x0,0x0,'Map\x20%1\x20Variable\x20%2'['format'](_0x5d642b,_0x545c48)];return $gameSelfSwitches[_0x2a2da9(0x5ad)](_0x4d96d0);},getSelfVariableValue=function(_0x412965,_0x399fbe,_0x458072){const _0x3d9451=_0xe5069,_0x1c7b9b=[_0x412965,_0x399fbe,_0x3d9451(0x28d)[_0x3d9451(0x52c)](_0x458072)];return $gameSelfSwitches[_0x3d9451(0x5ad)](_0x1c7b9b);},setSelfSwitchValue=function(_0x5bff6f,_0x4bc2ea,_0x2c4d23,_0x4b50c7){const _0x2b3659=_0xe5069;let _0x36f838=[_0x5bff6f,_0x4bc2ea,_0x2b3659(0x3c5)[_0x2b3659(0x52c)](_0x2c4d23)];typeof _0x2c4d23===_0x2b3659(0x536)&&(_0x36f838=[_0x5bff6f,_0x4bc2ea,_0x2c4d23[_0x2b3659(0x4f8)]()[_0x2b3659(0x3d9)]()]),$gameSelfSwitches['setValue'](_0x36f838,_0x4b50c7);},setSelfVariableValue=function(_0x3f68a3,_0x23b674,_0x48a690,_0x6a76db){const _0x2db1c0=_0xe5069,_0x4e71b3=[_0x3f68a3,_0x23b674,_0x2db1c0(0x28d)[_0x2db1c0(0x52c)](_0x48a690)];$gameSelfSwitches[_0x2db1c0(0x540)](_0x4e71b3,_0x6a76db);},setMapSwitchValue=function(_0x105ccf,_0x4f6af0,_0x5bb149){const _0x1dc35f=_0xe5069;let _0x4f3298=[0x0,0x0,_0x1dc35f(0x436)[_0x1dc35f(0x52c)](_0x105ccf,_0x4f6af0)];$gameSelfSwitches[_0x1dc35f(0x540)](_0x4f3298,_0x5bb149);},setMapVariableValue=function(_0x4e8d90,_0x15b006,_0x5c0ade){const _0x307c67=_0xe5069;let _0x3ad53c=[0x0,0x0,_0x307c67(0x47c)[_0x307c67(0x52c)](_0x4e8d90,_0x15b006)];$gameSelfSwitches[_0x307c67(0x540)](_0x3ad53c,_0x5c0ade);},DataManager[_0xe5069(0x3f3)]=function(_0x428ece){const _0x494554=_0xe5069;if(SceneManager['_scene'][_0x494554(0x4eb)]===Scene_Debug)return![];return VisuMZ[_0x494554(0x450)][_0x494554(0x22a)](_0x428ece);},DataManager[_0xe5069(0x61e)]=function(_0x640570){const _0x154997=_0xe5069;if(SceneManager[_0x154997(0x3df)][_0x154997(0x4eb)]===Scene_Debug)return![];return VisuMZ[_0x154997(0x3bd)][_0x154997(0x22a)](_0x640570);},DataManager['isSelfSwitch']=function(_0x258749){const _0xb06b8c=_0xe5069;if(SceneManager[_0xb06b8c(0x3df)][_0xb06b8c(0x4eb)]===Scene_Debug)return![];return VisuMZ[_0xb06b8c(0x55e)][_0xb06b8c(0x22a)](_0x258749);},DataManager[_0xe5069(0x22e)]=function(_0x30a00){const _0x49ad15=_0xe5069;if(SceneManager['_scene'][_0x49ad15(0x4eb)]===Scene_Debug)return![];return VisuMZ[_0x49ad15(0x25b)]['includes'](_0x30a00);},DataManager[_0xe5069(0x23d)]=function(_0x1821f3){const _0x5a0b51=_0xe5069;if(BattleManager[_0x5a0b51(0x41d)]())return![];return VisuMZ[_0x5a0b51(0x35c)][_0x5a0b51(0x22a)](_0x1821f3);},DataManager[_0xe5069(0x315)]=function(_0x5a87f1){const _0x44ddd7=_0xe5069;if(BattleManager[_0x44ddd7(0x41d)]())return![];return VisuMZ[_0x44ddd7(0x369)]['includes'](_0x5a87f1);},ImageManager[_0xe5069(0x27f)]=function(_0x4ccd96){const _0x334b23=_0xe5069;return _0x4ccd96[_0x334b23(0x506)](/\[INV(?:|ISIBLE)\]/i);},SceneManager['isSceneMap']=function(){const _0x2fe9ca=_0xe5069;return this['_scene']&&this['_scene'][_0x2fe9ca(0x4eb)]===Scene_Map;},SceneManager[_0xe5069(0x2f4)]=function(){const _0x1af49b=_0xe5069;return this['_scene']&&this[_0x1af49b(0x3df)]instanceof Scene_Map;},VisuMZ[_0xe5069(0x5f4)]['Game_Temp_setDestination']=Game_Temp['prototype'][_0xe5069(0x664)],Game_Temp['prototype'][_0xe5069(0x664)]=function(_0x21ada3,_0x1d23a7){const _0xd25ba0=_0xe5069;if(this[_0xd25ba0(0x389)](_0x21ada3,_0x1d23a7))return;VisuMZ['EventsMoveCore'][_0xd25ba0(0x342)][_0xd25ba0(0x3ae)](this,_0x21ada3,_0x1d23a7);},Game_Temp['prototype']['isEventClickTriggered']=function(_0x2a58ec,_0x3e529d){const _0xa874c7=_0xe5069,_0x43d53a=$gameMap[_0xa874c7(0x5f8)](_0x2a58ec,_0x3e529d);for(const _0x430624 of _0x43d53a){if(_0x430624&&_0x430624[_0xa874c7(0x400)]())return _0x430624[_0xa874c7(0x604)](),!![];}return TouchInput[_0xa874c7(0x50e)]()&&_0x43d53a['length']>0x0&&TouchInput[_0xa874c7(0x62b)](),![];},Game_Temp[_0xe5069(0x678)][_0xe5069(0x20f)]=function(_0x2471e5){const _0x740b33=_0xe5069;this[_0x740b33(0x558)]=_0x2471e5;},Game_Temp[_0xe5069(0x678)][_0xe5069(0x639)]=function(){const _0x2133b3=_0xe5069;return this[_0x2133b3(0x558)];},Game_Temp['prototype']['registerSelfTarget']=function(_0x370730){const _0x5958eb=_0xe5069;this[_0x5958eb(0x1ad)]=_0x370730;},Game_Temp[_0xe5069(0x678)][_0xe5069(0x511)]=function(){const _0x381975=_0xe5069;this[_0x381975(0x1ad)]=undefined;},Game_Temp[_0xe5069(0x678)]['getSelfTarget']=function(){const _0x2e8a22=_0xe5069;return this[_0x2e8a22(0x1ad)];},VisuMZ[_0xe5069(0x5f4)][_0xe5069(0x2f9)]=Game_System[_0xe5069(0x678)][_0xe5069(0x33f)],Game_System[_0xe5069(0x678)][_0xe5069(0x33f)]=function(){const _0x313ffa=_0xe5069;VisuMZ[_0x313ffa(0x5f4)][_0x313ffa(0x2f9)][_0x313ffa(0x3ae)](this),this[_0x313ffa(0x4d3)](),this['initFollowerController']();},Game_System[_0xe5069(0x678)][_0xe5069(0x4d3)]=function(){const _0x108f8d=_0xe5069;this[_0x108f8d(0x5e1)]={'DashingEnable':!![],'EventAutoMovement':!![],'VisibleEventLabels':!![]},this[_0x108f8d(0x48e)]={},this['_MapSpawnedEventData']=[],this['_PreservedEventMorphData']={},this[_0x108f8d(0x592)]={},this['_DisablePlayerControl']=![],this[_0x108f8d(0x2db)]='default';},Game_System['prototype'][_0xe5069(0x211)]=function(){const _0x562e06=_0xe5069;if(this[_0x562e06(0x5e1)]===undefined)this[_0x562e06(0x4d3)]();if(this[_0x562e06(0x5e1)]['DashingEnable']===undefined)this[_0x562e06(0x4d3)]();return this[_0x562e06(0x5e1)][_0x562e06(0x61f)];},Game_System[_0xe5069(0x678)][_0xe5069(0x325)]=function(_0x4ae484){const _0x4cfdb2=_0xe5069;if(this[_0x4cfdb2(0x5e1)]===undefined)this[_0x4cfdb2(0x4d3)]();if(this[_0x4cfdb2(0x5e1)][_0x4cfdb2(0x61f)]===undefined)this[_0x4cfdb2(0x4d3)]();this[_0x4cfdb2(0x5e1)][_0x4cfdb2(0x61f)]=_0x4ae484;},Game_System[_0xe5069(0x678)][_0xe5069(0x2af)]=function(){const _0x2e7e7f=_0xe5069;if(this[_0x2e7e7f(0x5e1)]===undefined)this[_0x2e7e7f(0x4d3)]();if(this['_EventsMoveCoreSettings'][_0x2e7e7f(0x1a1)]===undefined)this[_0x2e7e7f(0x4d3)]();return this['_EventsMoveCoreSettings'][_0x2e7e7f(0x1a1)];},Game_System[_0xe5069(0x678)][_0xe5069(0x621)]=function(_0x28ae1e){const _0x104062=_0xe5069;if(this[_0x104062(0x5e1)]===undefined)this[_0x104062(0x4d3)]();if(this[_0x104062(0x5e1)][_0x104062(0x1a1)]===undefined)this[_0x104062(0x4d3)]();this[_0x104062(0x5e1)][_0x104062(0x1a1)]=_0x28ae1e;},Game_System['prototype']['eventLabelsVisible']=function(){const _0x4e112d=_0xe5069;if(this['_EventsMoveCoreSettings']===undefined)this[_0x4e112d(0x4d3)]();if(this[_0x4e112d(0x5e1)]['VisibleEventLabels']===undefined)this['initEventsMoveCore']();return this[_0x4e112d(0x5e1)][_0x4e112d(0x4ab)];},Game_System['prototype'][_0xe5069(0x1c1)]=function(_0x164135){const _0x43ccf0=_0xe5069;if(this['_EventsMoveCoreSettings']===undefined)this['initEventsMoveCore']();if(this['_EventsMoveCoreSettings']['VisibleEventLabels']===undefined)this[_0x43ccf0(0x4d3)]();this['_EventsMoveCoreSettings'][_0x43ccf0(0x4ab)]=_0x164135;},Game_System[_0xe5069(0x678)][_0xe5069(0x334)]=function(){const _0x525472=_0xe5069;return this[_0x525472(0x44c)]===undefined&&(this[_0x525472(0x44c)]=![]),this['_DisablePlayerControl'];},Game_System[_0xe5069(0x678)][_0xe5069(0x2b0)]=function(_0x2353db){const _0x48c579=_0xe5069;this[_0x48c579(0x44c)]=_0x2353db;},Game_System[_0xe5069(0x678)][_0xe5069(0x433)]=function(){const _0x354b04=_0xe5069;return this[_0x354b04(0x2db)];},Game_System[_0xe5069(0x678)][_0xe5069(0x26f)]=function(_0x58647a){const _0x313cc1=_0xe5069;this[_0x313cc1(0x2db)]=String(_0x58647a)[_0x313cc1(0x1e4)]()[_0x313cc1(0x3d9)]();},Game_System[_0xe5069(0x678)][_0xe5069(0x642)]=function(_0x4c4fad){const _0x3162db=_0xe5069;if(this[_0x3162db(0x48e)]===undefined)this[_0x3162db(0x4d3)]();if(!_0x4c4fad)return null;if(_0x4c4fad===$gamePlayer)return this[_0x3162db(0x48e)][_0x3162db(0x512)];else{const _0x51f117=VisuMZ[_0x3162db(0x5f4)][_0x3162db(0x553)],_0x1b0f58=_0x3162db(0x294)[_0x3162db(0x52c)](_0x4c4fad[_0x3162db(0x250)],_0x4c4fad[_0x3162db(0x374)]);return this['_EventIcons'][_0x1b0f58]=this['_EventIcons'][_0x1b0f58]||{'iconIndex':0x0,'bufferX':_0x51f117[_0x3162db(0x290)][_0x3162db(0x49e)],'bufferY':_0x51f117['Icon'][_0x3162db(0x323)],'blendMode':_0x51f117['Icon']['BlendMode']},this[_0x3162db(0x48e)][_0x1b0f58];}},Game_System[_0xe5069(0x678)][_0xe5069(0x201)]=function(_0x1665b3,_0x9d06a2,_0x3a6ff6,_0x130d21,_0x6b0ca6){const _0x44e997=_0xe5069;if(this[_0x44e997(0x48e)]===undefined)this['initEventsMoveCore']();const _0x1029e8=_0x1665b3===$gamePlayer?'Player':_0x44e997(0x294)[_0x44e997(0x52c)](_0x1665b3['_mapId'],_0x1665b3['_eventId']);this[_0x44e997(0x48e)][_0x1029e8]={'iconIndex':_0x9d06a2,'bufferX':_0x3a6ff6,'bufferY':_0x130d21,'blendMode':_0x6b0ca6};},Game_System[_0xe5069(0x678)][_0xe5069(0x1c0)]=function(_0x5df6cc,_0x5b9668,_0x56bdf7,_0x426b84,_0x1e1af6,_0xb61e80,_0x18914d){const _0x1a2fd6=_0xe5069;if(this['_EventIcons']===undefined)this[_0x1a2fd6(0x4d3)]();const _0x147c7d='Map%1-Event%2'[_0x1a2fd6(0x52c)](_0x5df6cc,_0x5b9668);this[_0x1a2fd6(0x48e)][_0x147c7d]={'iconIndex':_0x56bdf7,'forced':_0x18914d,'bufferX':_0x426b84,'bufferY':_0x1e1af6,'blendMode':_0xb61e80};},Game_System[_0xe5069(0x678)][_0xe5069(0x5b4)]=function(_0x5a266f){const _0x3b548e=_0xe5069;if(this[_0x3b548e(0x48e)]===undefined)this[_0x3b548e(0x4d3)]();if(!_0x5a266f)return null;_0x5a266f===$gamePlayer?delete this[_0x3b548e(0x48e)][_0x3b548e(0x512)]:this[_0x3b548e(0x578)](_0x5a266f['_mapId'],_0x5a266f[_0x3b548e(0x374)]);},Game_System[_0xe5069(0x678)][_0xe5069(0x578)]=function(_0x4119f2,_0x4a35ee){const _0x2286c1=_0xe5069;if(this[_0x2286c1(0x48e)]===undefined)this[_0x2286c1(0x4d3)]();this[_0x2286c1(0x1c0)](_0x4119f2,_0x4a35ee,-0x1,0x0,0x0,0x0,![]);},Game_System['prototype'][_0xe5069(0x58a)]=function(_0x36e285){const _0x27522e=_0xe5069;if(this['_EventIcons']===undefined)this[_0x27522e(0x4d3)]();if(!_0x36e285)return null;_0x36e285===$gamePlayer?delete this['_EventIcons'][_0x27522e(0x512)]:this[_0x27522e(0x488)](_0x36e285[_0x27522e(0x250)],_0x36e285[_0x27522e(0x374)]);},Game_System['prototype']['resetIconsOnEventsDataKey']=function(_0x5b72fb,_0x59d54a){const _0x2fa808=_0xe5069;if(this['_EventIcons']===undefined)this[_0x2fa808(0x4d3)]();const _0x2512b2=_0x2fa808(0x294)[_0x2fa808(0x52c)](_0x5b72fb,_0x59d54a);if(this[_0x2fa808(0x48e)][_0x2512b2]){if(this[_0x2fa808(0x48e)][_0x2512b2]['iconIndex']<0x0)return;if(this['_EventIcons'][_0x2512b2][_0x2fa808(0x41b)])return;}delete this[_0x2fa808(0x48e)][_0x2512b2];},Game_System[_0xe5069(0x678)][_0xe5069(0x1e8)]=function(_0x4f3f9d,_0x3095bc){const _0x32acf0=_0xe5069;if(this[_0x32acf0(0x48e)]===undefined)this[_0x32acf0(0x4d3)]();const _0x41fdd3='Map%1-Event%2'[_0x32acf0(0x52c)](_0x4f3f9d,_0x3095bc);delete this['_EventIcons'][_0x41fdd3];if(_0x4f3f9d!==$gameMap[_0x32acf0(0x5a6)]())return;const _0x551024=$gameMap['event'](_0x3095bc);if(!_0x551024)return;_0x551024[_0x32acf0(0x244)]();},Game_System[_0xe5069(0x678)]['getSavedEventLocation']=function(_0x4345f7){const _0x1ef2cf=_0xe5069;if(this[_0x1ef2cf(0x592)]===undefined)this[_0x1ef2cf(0x4d3)]();if(!_0x4345f7)return null;const _0x262eda=_0x1ef2cf(0x294)['format'](_0x4345f7[_0x1ef2cf(0x250)],_0x4345f7[_0x1ef2cf(0x374)]);return this[_0x1ef2cf(0x592)][_0x262eda];},Game_System[_0xe5069(0x678)][_0xe5069(0x5aa)]=function(_0x5a92e0){const _0x425966=_0xe5069;if(this[_0x425966(0x592)]===undefined)this[_0x425966(0x4d3)]();if(!_0x5a92e0)return;const _0x5a13b4=_0x425966(0x294)[_0x425966(0x52c)](_0x5a92e0[_0x425966(0x250)],_0x5a92e0[_0x425966(0x374)]);this[_0x425966(0x592)][_0x5a13b4]={'direction':_0x5a92e0[_0x425966(0x4ed)](),'x':Math[_0x425966(0x471)](_0x5a92e0['x']),'y':Math['round'](_0x5a92e0['y']),'pageIndex':_0x5a92e0[_0x425966(0x4fd)],'moveRouteIndex':_0x5a92e0[_0x425966(0x4f3)]};},Game_System[_0xe5069(0x678)]['deleteSavedEventLocation']=function(_0x14b58e){const _0x4a5782=_0xe5069;if(this[_0x4a5782(0x592)]===undefined)this[_0x4a5782(0x4d3)]();if(!_0x14b58e)return;this['deleteSavedEventLocationKey'](_0x14b58e[_0x4a5782(0x250)],_0x14b58e[_0x4a5782(0x374)]);},Game_System[_0xe5069(0x678)][_0xe5069(0x1eb)]=function(_0x4fd3d2,_0x341f5d){const _0x3ab290=_0xe5069;if(this[_0x3ab290(0x592)]===undefined)this[_0x3ab290(0x4d3)]();const _0x168bbf=_0x3ab290(0x294)['format'](_0x4fd3d2,_0x341f5d);delete this[_0x3ab290(0x592)][_0x168bbf];},Game_System[_0xe5069(0x678)][_0xe5069(0x63f)]=function(_0x24f736,_0x2207b6,_0x4f8863,_0x3ebd08,_0x5b2a96,_0x1a5e58,_0x4b86ef){const _0x43bc96=_0xe5069;if(this[_0x43bc96(0x592)]===undefined)this['initEventsMoveCore']();const _0x5112de=_0x43bc96(0x294)[_0x43bc96(0x52c)](_0x24f736,_0x2207b6);this[_0x43bc96(0x592)][_0x5112de]={'direction':_0x5b2a96,'x':Math[_0x43bc96(0x471)](_0x4f8863),'y':Math[_0x43bc96(0x471)](_0x3ebd08),'pageIndex':_0x1a5e58,'moveRouteIndex':_0x4b86ef};},Game_System[_0xe5069(0x678)][_0xe5069(0x625)]=function(_0x271106){const _0x3b8c27=_0xe5069;if(this['_PreservedEventMorphData']===undefined)this[_0x3b8c27(0x4d3)]();if(!_0x271106)return;const _0x13e39e='Map%1-Event%2'[_0x3b8c27(0x52c)](_0x271106[_0x3b8c27(0x250)],_0x271106['_eventId']);return this[_0x3b8c27(0x19a)][_0x13e39e];},Game_System[_0xe5069(0x678)][_0xe5069(0x5c5)]=function(_0x322d1c,_0x731f7f,_0x209aba,_0x517c6d,_0x17e7f3){const _0x3cec6f=_0xe5069;if(this['_PreservedEventMorphData']===undefined)this[_0x3cec6f(0x4d3)]();const _0x52ca70=_0x3cec6f(0x294)[_0x3cec6f(0x52c)](_0x322d1c,_0x731f7f);this[_0x3cec6f(0x19a)][_0x52ca70]={'template':_0x209aba,'mapId':_0x517c6d,'eventId':_0x17e7f3};},Game_System[_0xe5069(0x678)]['deletePreservedMorphEventDataKey']=function(_0x498ac3,_0x212568){const _0x1fc320=_0xe5069;if(this[_0x1fc320(0x19a)]===undefined)this[_0x1fc320(0x4d3)]();const _0xab66e9=_0x1fc320(0x294)[_0x1fc320(0x52c)](_0x498ac3,_0x212568);delete this['_PreservedEventMorphData'][_0xab66e9];},Game_System[_0xe5069(0x678)][_0xe5069(0x278)]=function(_0x2eed98){const _0x1b1af0=_0xe5069;if(this['_MapSpawnedEventData']===undefined)this[_0x1b1af0(0x4d3)]();return this['_MapSpawnedEventData'][_0x2eed98]=this[_0x1b1af0(0x522)][_0x2eed98]||[],this[_0x1b1af0(0x522)][_0x2eed98];},Game_System[_0xe5069(0x678)][_0xe5069(0x3c4)]=function(_0x20dd8d){const _0x4a42ed=_0xe5069,_0x24f94f=this[_0x4a42ed(0x278)](_0x20dd8d);for(const _0x3b59f3 of _0x24f94f){if(!_0x3b59f3)continue;if(_0x3b59f3[_0x4a42ed(0x2a2)])continue;const _0x3ce2e5=_0x24f94f['indexOf'](_0x3b59f3);_0x24f94f[_0x3ce2e5]=null;}},Game_System[_0xe5069(0x678)][_0xe5069(0x32d)]=function(){const _0x39e1a9=_0xe5069;this[_0x39e1a9(0x42c)]=0x0,this[_0x39e1a9(0x5eb)]=![];},Game_System['prototype'][_0xe5069(0x64b)]=function(){const _0x26a9fb=_0xe5069;if(this[_0x26a9fb(0x42c)]===undefined)this['initFollowerController']();return this[_0x26a9fb(0x42c)];},Game_System[_0xe5069(0x678)]['setControlledFollowerID']=function(_0x20686b){const _0x17ae2f=_0xe5069;if(this[_0x17ae2f(0x42c)]===undefined)this[_0x17ae2f(0x32d)]();this[_0x17ae2f(0x42c)]=_0x20686b;;},VisuMZ['EventsMoveCore'][_0xe5069(0x2ae)]=Game_Interpreter[_0xe5069(0x678)][_0xe5069(0x321)],Game_Interpreter[_0xe5069(0x678)][_0xe5069(0x321)]=function(_0x169c91){const _0x4bddca=_0xe5069;if(!$gameParty[_0x4bddca(0x480)]()&&_0x169c91<0x0){let _0x29518a=$gameSystem[_0x4bddca(0x64b)]();if(_0x29518a>0x0)return $gamePlayer[_0x4bddca(0x2a9)]()[_0x4bddca(0x634)](_0x29518a-0x1);}return VisuMZ[_0x4bddca(0x5f4)][_0x4bddca(0x2ae)][_0x4bddca(0x3ae)](this,_0x169c91);},Game_System[_0xe5069(0x678)][_0xe5069(0x572)]=function(){const _0x3869b2=_0xe5069;if(this[_0x3869b2(0x5eb)]===undefined)this[_0x3869b2(0x32d)]();return this[_0x3869b2(0x5eb)];},Game_System[_0xe5069(0x678)][_0xe5069(0x2bf)]=function(_0x3e572b){const _0xd621fd=_0xe5069;if(this[_0xd621fd(0x5eb)]===undefined)this[_0xd621fd(0x32d)]();this[_0xd621fd(0x5eb)]=_0x3e572b;;},VisuMZ[_0xe5069(0x5f4)][_0xe5069(0x665)]=Game_Followers['prototype'][_0xe5069(0x35f)],Game_Followers[_0xe5069(0x678)]['jumpAll']=function(){const _0x1b6fc0=_0xe5069;if($gameSystem[_0x1b6fc0(0x572)]())return;VisuMZ[_0x1b6fc0(0x5f4)]['Game_Followers_jumpAll'][_0x1b6fc0(0x3ae)](this);},VisuMZ[_0xe5069(0x5f4)][_0xe5069(0x4fc)]=Game_Timer[_0xe5069(0x678)]['initialize'],Game_Timer[_0xe5069(0x678)][_0xe5069(0x33f)]=function(){const _0x3793a0=_0xe5069;VisuMZ[_0x3793a0(0x5f4)][_0x3793a0(0x4fc)][_0x3793a0(0x3ae)](this),this[_0x3793a0(0x4d3)]();},Game_Timer[_0xe5069(0x678)][_0xe5069(0x4d3)]=function(){const _0x31023e=_0xe5069;this[_0x31023e(0x308)]=![],this['_speed']=-0x1,this[_0x31023e(0x23a)]=0x0;},Game_Timer[_0xe5069(0x678)]['update']=function(_0x9f2b5a){const _0x36eabf=_0xe5069;if(!_0x9f2b5a)return;if(!this['_working'])return;if(this[_0x36eabf(0x308)])return;if(this['_frames']<=0x0)return;if(this[_0x36eabf(0x1d5)]===undefined)this[_0x36eabf(0x4d3)]();this[_0x36eabf(0x2e0)]+=this[_0x36eabf(0x1d5)],this[_0x36eabf(0x2e0)]<=0x0&&this[_0x36eabf(0x347)]();},VisuMZ[_0xe5069(0x5f4)][_0xe5069(0x21f)]=Game_Timer[_0xe5069(0x678)][_0xe5069(0x246)],Game_Timer[_0xe5069(0x678)][_0xe5069(0x246)]=function(_0x1dfd60){const _0x2c4bb5=_0xe5069;VisuMZ[_0x2c4bb5(0x5f4)]['Game_Timer_start']['call'](this,_0x1dfd60);if(this[_0x2c4bb5(0x308)]===undefined)this[_0x2c4bb5(0x4d3)]();this[_0x2c4bb5(0x308)]=![];},VisuMZ['EventsMoveCore'][_0xe5069(0x35a)]=Game_Timer[_0xe5069(0x678)][_0xe5069(0x409)],Game_Timer[_0xe5069(0x678)][_0xe5069(0x409)]=function(){const _0x2283c2=_0xe5069;VisuMZ['EventsMoveCore'][_0x2283c2(0x35a)][_0x2283c2(0x3ae)](this);if(this['_paused']===undefined)this[_0x2283c2(0x4d3)]();this[_0x2283c2(0x308)]=![];},Game_Timer[_0xe5069(0x678)]['pause']=function(){const _0x9d3853=_0xe5069;if(this[_0x9d3853(0x2e0)]<=0x0)return;this[_0x9d3853(0x308)]=!![],this[_0x9d3853(0x40a)]=!![];},Game_Timer[_0xe5069(0x678)][_0xe5069(0x5a3)]=function(){const _0x129404=_0xe5069;if(this[_0x129404(0x2e0)]<=0x0)return;this['_paused']=![],this[_0x129404(0x40a)]=!![];},Game_Timer[_0xe5069(0x678)][_0xe5069(0x5cc)]=function(_0x12a6a7){const _0x1cb1b0=_0xe5069;this[_0x1cb1b0(0x2e0)]=this[_0x1cb1b0(0x2e0)]||0x0,this[_0x1cb1b0(0x2e0)]+=_0x12a6a7,this[_0x1cb1b0(0x40a)]=!![],this[_0x1cb1b0(0x2e0)]=Math['max'](0x1,this[_0x1cb1b0(0x2e0)]);},Game_Timer[_0xe5069(0x678)][_0xe5069(0x445)]=function(_0x3d8847){const _0x40e0c7=_0xe5069;this[_0x40e0c7(0x2e0)]=this['_frames']||0x0,this[_0x40e0c7(0x2e0)]=_0x3d8847,this[_0x40e0c7(0x40a)]=!![],this[_0x40e0c7(0x2e0)]=Math['max'](0x1,this[_0x40e0c7(0x2e0)]);},Game_Timer[_0xe5069(0x678)][_0xe5069(0x207)]=function(_0x5ecffd){const _0x3d130b=_0xe5069;this[_0x3d130b(0x1d5)]=_0x5ecffd,this[_0x3d130b(0x40a)]=!![],_0x5ecffd>0x0&&(this[_0x3d130b(0x2e0)]=Math[_0x3d130b(0x314)](this[_0x3d130b(0x2e0)],0x1));},Game_Timer[_0xe5069(0x678)][_0xe5069(0x1cf)]=function(_0x2e9066){const _0x50912f=_0xe5069;if(this[_0x50912f(0x23a)]===undefined)this[_0x50912f(0x4d3)]();this[_0x50912f(0x23a)]=_0x2e9066;},VisuMZ[_0xe5069(0x5f4)][_0xe5069(0x3ca)]=Game_Timer['prototype'][_0xe5069(0x347)],Game_Timer[_0xe5069(0x678)]['onExpire']=function(){const _0x40ac42=_0xe5069;if(this['_expireCommonEvent']===undefined)this[_0x40ac42(0x4d3)]();this[_0x40ac42(0x23a)]?$gameTemp[_0x40ac42(0x65b)](this[_0x40ac42(0x23a)]):VisuMZ[_0x40ac42(0x5f4)][_0x40ac42(0x3ca)]['call'](this);},VisuMZ[_0xe5069(0x5f4)][_0xe5069(0x435)]=Game_Message[_0xe5069(0x678)][_0xe5069(0x630)],Game_Message[_0xe5069(0x678)]['add']=function(_0x20ee15){const _0x548b1b=_0xe5069;VisuMZ[_0x548b1b(0x5f4)][_0x548b1b(0x435)][_0x548b1b(0x3ae)](this,_0x20ee15),this[_0x548b1b(0x535)]=$gameTemp[_0x548b1b(0x270)]();},Game_Message[_0xe5069(0x678)][_0xe5069(0x61a)]=function(){const _0x1a08f9=_0xe5069;$gameTemp[_0x1a08f9(0x32a)](this[_0x1a08f9(0x535)]);},VisuMZ[_0xe5069(0x5f4)]['Game_Switches_value']=Game_Switches[_0xe5069(0x678)][_0xe5069(0x5ad)],Game_Switches[_0xe5069(0x678)]['value']=function(_0x52e3a6){const _0x40384d=_0xe5069;if(DataManager[_0x40384d(0x3f3)](_0x52e3a6))return!!this['advancedValue'](_0x52e3a6);else{if(DataManager[_0x40384d(0x312)](_0x52e3a6))return!!this['selfValue'](_0x52e3a6);else return DataManager['isMapSwitch'](_0x52e3a6)?!!this[_0x40384d(0x447)](_0x52e3a6):VisuMZ[_0x40384d(0x5f4)]['Game_Switches_value'][_0x40384d(0x3ae)](this,_0x52e3a6);}},Game_Switches['advancedFunc']={},Game_Switches[_0xe5069(0x678)][_0xe5069(0x31a)]=function(_0x4df6ae){const _0x24c4e1=_0xe5069;if(!Game_Switches[_0x24c4e1(0x291)][_0x4df6ae]){$dataSystem[_0x24c4e1(0x529)][_0x4df6ae][_0x24c4e1(0x506)](/<JS>\s*([\s\S]*)\s*<\/JS>/i);const _0x312ee2=_0x24c4e1(0x4a1)['format'](String(RegExp['$1']));Game_Switches[_0x24c4e1(0x291)][_0x4df6ae]=new Function(_0x24c4e1(0x3ee),_0x312ee2);}const _0x3042f5=$gameTemp[_0x24c4e1(0x270)]()||this;return Game_Switches[_0x24c4e1(0x291)][_0x4df6ae][_0x24c4e1(0x3ae)](_0x3042f5,_0x4df6ae);},Game_Switches[_0xe5069(0x678)][_0xe5069(0x344)]=function(_0x4f8a9b){const _0x9cdebd=_0xe5069,_0x2330f6=$gameTemp['getSelfTarget']()||this;if(_0x2330f6[_0x9cdebd(0x4eb)]!==Game_Event)return VisuMZ[_0x9cdebd(0x5f4)]['Game_Switches_value']['call'](this,_0x4f8a9b);else{const _0x4ffd2e=[_0x2330f6[_0x9cdebd(0x250)],_0x2330f6[_0x9cdebd(0x374)],_0x9cdebd(0x3c5)[_0x9cdebd(0x52c)](_0x4f8a9b)];return $gameSelfSwitches['value'](_0x4ffd2e);}},Game_Switches[_0xe5069(0x678)][_0xe5069(0x447)]=function(_0x19afab){const _0x54d8b9=_0xe5069,_0x393a5f=$gameMap?$gameMap[_0x54d8b9(0x5a6)]():0x0,_0x877c41=[0x0,0x0,_0x54d8b9(0x436)[_0x54d8b9(0x52c)](_0x393a5f,_0x19afab)];return $gameSelfSwitches[_0x54d8b9(0x5ad)](_0x877c41);},VisuMZ[_0xe5069(0x5f4)]['Game_Switches_setValue']=Game_Switches[_0xe5069(0x678)][_0xe5069(0x540)],Game_Switches[_0xe5069(0x678)][_0xe5069(0x540)]=function(_0x244ea6,_0x37cb8f){const _0x3ff23a=_0xe5069;if(DataManager[_0x3ff23a(0x312)](_0x244ea6))this[_0x3ff23a(0x612)](_0x244ea6,_0x37cb8f);else DataManager['isMapSwitch'](_0x244ea6)?this['setMapValue'](_0x244ea6,_0x37cb8f):VisuMZ[_0x3ff23a(0x5f4)][_0x3ff23a(0x2b2)]['call'](this,_0x244ea6,_0x37cb8f);},Game_Switches[_0xe5069(0x678)]['setSelfValue']=function(_0x295b2e,_0x21df71){const _0x964798=_0xe5069,_0x5474a6=$gameTemp[_0x964798(0x270)]()||this;if(_0x5474a6[_0x964798(0x4eb)]!==Game_Event)VisuMZ[_0x964798(0x5f4)]['Game_Switches_setValue'][_0x964798(0x3ae)](this,_0x295b2e,_0x21df71);else{const _0x5cf2e6=[_0x5474a6[_0x964798(0x250)],_0x5474a6[_0x964798(0x374)],_0x964798(0x3c5)['format'](_0x295b2e)];$gameSelfSwitches[_0x964798(0x540)](_0x5cf2e6,_0x21df71);}},Game_Switches[_0xe5069(0x678)]['setMapValue']=function(_0xf5217c,_0x3e870c){const _0x194d91=_0xe5069,_0x43f78c=$gameMap?$gameMap['mapId']():0x0,_0x43abcf=[0x0,0x0,_0x194d91(0x436)[_0x194d91(0x52c)](_0x43f78c,_0xf5217c)];return $gameSelfSwitches[_0x194d91(0x540)](_0x43abcf,_0x3e870c);},VisuMZ[_0xe5069(0x5f4)][_0xe5069(0x1d1)]=Game_Variables['prototype']['value'],Game_Variables[_0xe5069(0x678)][_0xe5069(0x5ad)]=function(_0xc964b9){const _0x4ba9cb=_0xe5069;if(DataManager[_0x4ba9cb(0x61e)](_0xc964b9))return this[_0x4ba9cb(0x31a)](_0xc964b9);else{if(DataManager[_0x4ba9cb(0x22e)](_0xc964b9))return this[_0x4ba9cb(0x344)](_0xc964b9);else return DataManager[_0x4ba9cb(0x315)](_0xc964b9)?this[_0x4ba9cb(0x447)](_0xc964b9):VisuMZ[_0x4ba9cb(0x5f4)][_0x4ba9cb(0x1d1)]['call'](this,_0xc964b9);}},Game_Variables[_0xe5069(0x291)]={},Game_Variables[_0xe5069(0x678)]['advancedValue']=function(_0x44a911){const _0x5875b9=_0xe5069;if(!Game_Variables[_0x5875b9(0x291)][_0x44a911]){$dataSystem[_0x5875b9(0x228)][_0x44a911]['match'](/<JS>\s*([\s\S]*)\s*<\/JS>/i);const _0x5da10a=_0x5875b9(0x4a1)['format'](String(RegExp['$1']));Game_Variables['advancedFunc'][_0x44a911]=new Function(_0x5875b9(0x5fe),_0x5da10a);}const _0x8583a=$gameTemp[_0x5875b9(0x270)]()||this;return Game_Variables['advancedFunc'][_0x44a911][_0x5875b9(0x3ae)](_0x8583a,_0x44a911);},Game_Variables['prototype'][_0xe5069(0x344)]=function(_0x295b4){const _0x36a53e=_0xe5069,_0x12166c=$gameTemp[_0x36a53e(0x270)]()||this;if(_0x12166c[_0x36a53e(0x4eb)]!==Game_Event)return VisuMZ['EventsMoveCore'][_0x36a53e(0x1d1)]['call'](this,_0x295b4);else{const _0x50825e=[_0x12166c[_0x36a53e(0x250)],_0x12166c['_eventId'],_0x36a53e(0x28d)[_0x36a53e(0x52c)](_0x295b4)];return $gameSelfSwitches[_0x36a53e(0x5ad)](_0x50825e);}},Game_Variables['prototype'][_0xe5069(0x447)]=function(_0xc2c910){const _0x29c1c7=_0xe5069,_0x6d4b2e=$gameMap?$gameMap[_0x29c1c7(0x5a6)]():0x0,_0xb4e673=[0x0,0x0,_0x29c1c7(0x47c)[_0x29c1c7(0x52c)](_0x6d4b2e,_0xc2c910)];return $gameSelfSwitches[_0x29c1c7(0x5ad)](_0xb4e673)||0x0;},VisuMZ[_0xe5069(0x5f4)]['Game_Variables_setValue']=Game_Variables[_0xe5069(0x678)][_0xe5069(0x540)],Game_Variables['prototype']['setValue']=function(_0x373ee5,_0x5ea39d){const _0x446547=_0xe5069;if(DataManager[_0x446547(0x22e)](_0x373ee5))this[_0x446547(0x612)](_0x373ee5,_0x5ea39d);else DataManager['isMapVariable'](_0x373ee5)?this[_0x446547(0x375)](_0x373ee5,_0x5ea39d):VisuMZ['EventsMoveCore'][_0x446547(0x501)][_0x446547(0x3ae)](this,_0x373ee5,_0x5ea39d);},Game_Variables[_0xe5069(0x678)]['setSelfValue']=function(_0x287384,_0x543949){const _0x54a361=_0xe5069,_0x1dfd1f=$gameTemp[_0x54a361(0x270)]()||this;if(_0x1dfd1f[_0x54a361(0x4eb)]!==Game_Event)VisuMZ[_0x54a361(0x5f4)][_0x54a361(0x501)][_0x54a361(0x3ae)](this,_0x287384,_0x543949);else{const _0x449e3d=[_0x1dfd1f[_0x54a361(0x250)],_0x1dfd1f[_0x54a361(0x374)],_0x54a361(0x28d)[_0x54a361(0x52c)](_0x287384)];$gameSelfSwitches[_0x54a361(0x540)](_0x449e3d,_0x543949);}},Game_Variables['prototype']['setMapValue']=function(_0x2cc3d4,_0x1d7d78){const _0x40cf75=_0xe5069,_0x4e3723=$gameMap?$gameMap[_0x40cf75(0x5a6)]():0x0,_0x143478=[0x0,0x0,'Map\x20%1\x20Variable\x20%2'[_0x40cf75(0x52c)](_0x4e3723,_0x2cc3d4)];$gameSelfSwitches[_0x40cf75(0x540)](_0x143478,_0x1d7d78);},VisuMZ['EventsMoveCore'][_0xe5069(0x2fb)]=Game_SelfSwitches[_0xe5069(0x678)]['value'],Game_SelfSwitches[_0xe5069(0x678)]['value']=function(_0x1fa2c7){const _0x32d2a8=_0xe5069;if(_0x1fa2c7[0x2][_0x32d2a8(0x506)](/(?:SELF|MAP)/i))return this['selfValue'](_0x1fa2c7);else{return VisuMZ['EventsMoveCore'][_0x32d2a8(0x2fb)][_0x32d2a8(0x3ae)](this,_0x1fa2c7);;}},Game_SelfSwitches[_0xe5069(0x678)][_0xe5069(0x344)]=function(_0x450e89){const _0x4b746f=_0xe5069;return _0x450e89[0x2]['match'](/VAR/i)?this['_data'][_0x450e89]||0x0:!!this[_0x4b746f(0x446)][_0x450e89];},VisuMZ['EventsMoveCore'][_0xe5069(0x5b6)]=Game_SelfSwitches['prototype'][_0xe5069(0x540)],Game_SelfSwitches[_0xe5069(0x678)][_0xe5069(0x540)]=function(_0x4bfddd,_0xe5fcf1){const _0xbbb60e=_0xe5069;_0x4bfddd[0x2][_0xbbb60e(0x506)](/(?:SELF|MAP)/i)?this[_0xbbb60e(0x612)](_0x4bfddd,_0xe5fcf1):VisuMZ[_0xbbb60e(0x5f4)][_0xbbb60e(0x5b6)][_0xbbb60e(0x3ae)](this,_0x4bfddd,_0xe5fcf1);},Game_SelfSwitches[_0xe5069(0x678)][_0xe5069(0x612)]=function(_0x1c4482,_0x4c7cbe){const _0x18ea99=_0xe5069;this[_0x18ea99(0x446)][_0x1c4482]=_0x1c4482[0x2][_0x18ea99(0x506)](/VAR/i)?_0x4c7cbe:!!_0x4c7cbe,this[_0x18ea99(0x220)]();},VisuMZ[_0xe5069(0x5f4)][_0xe5069(0x619)]=Scene_Map[_0xe5069(0x678)][_0xe5069(0x59d)],Scene_Map[_0xe5069(0x678)]['createDisplayObjects']=function(){const _0x5ea042=_0xe5069;$gameMap[_0x5ea042(0x4b6)](),VisuMZ[_0x5ea042(0x5f4)][_0x5ea042(0x619)][_0x5ea042(0x3ae)](this);},Game_Map[_0xe5069(0x678)][_0xe5069(0x4b6)]=function(){const _0x34cf43=_0xe5069;if(this[_0x34cf43(0x1ff)]===this[_0x34cf43(0x5a6)]())return;this['_lastSesetExitSelfSwitchesMapId']=this['mapId'](),this[_0x34cf43(0x40d)]=undefined;const _0x2c5a6e=this[_0x34cf43(0x449)]();for(const _0x237b59 of _0x2c5a6e){if(_0x237b59)$gameSelfSwitches[_0x34cf43(0x33d)](_0x237b59);}},Game_SelfSwitches[_0xe5069(0x678)]['resetSelfSwitchesForEvent']=function(_0x405ddc){const _0x27ee90=_0xe5069;if(!_0x405ddc)return;if(!_0x405ddc[_0x27ee90(0x54b)]())return;const _0x3d7f30=_0x405ddc[_0x27ee90(0x54b)]()[_0x27ee90(0x3b4)]||'';if(_0x3d7f30[_0x27ee90(0x506)](/<(?:EXIT RESET|EXIT|TEMP|TEMPORARY) (?:SELF|SELF SWITCH|SELF SWITCHES|SELF DATA)>/i)){const _0x233452='%1,%2,'[_0x27ee90(0x52c)]($gameMap[_0x27ee90(0x250)],_0x405ddc[_0x27ee90(0x374)]),_0x804e66=Object['keys'](this[_0x27ee90(0x446)])[_0x27ee90(0x617)](_0x4b989b=>_0x4b989b[_0x27ee90(0x473)](_0x233452));while(_0x804e66[_0x27ee90(0x243)]>0x0){const _0x2e8d8e=_0x804e66[_0x27ee90(0x3b0)]();delete this['_data'][_0x2e8d8e];}}},Game_SelfSwitches[_0xe5069(0x678)][_0xe5069(0x424)]=function(_0x265923){const _0x3a8f76=_0xe5069,_0x348b57=_0x3a8f76(0x60b)[_0x3a8f76(0x52c)]($gameMap[_0x3a8f76(0x250)]),_0x5f38c1=Object['keys'](this['_data'])[_0x3a8f76(0x617)](_0x39d24f=>_0x39d24f[_0x3a8f76(0x473)](_0x348b57));while(_0x5f38c1['length']>0x0){const _0x286c70=_0x5f38c1[_0x3a8f76(0x3b0)]();delete this[_0x3a8f76(0x446)][_0x286c70];}_0x265923===$gameMap['mapId']()&&$gameMap[_0x3a8f76(0x441)]();},VisuMZ[_0xe5069(0x5f4)][_0xe5069(0x4e6)]=Game_Enemy[_0xe5069(0x678)]['meetsSwitchCondition'],Game_Enemy['prototype'][_0xe5069(0x27b)]=function(_0x37a563){const _0x399cdc=_0xe5069;$gameTemp[_0x399cdc(0x32a)](this);const _0x40d893=VisuMZ[_0x399cdc(0x5f4)][_0x399cdc(0x4e6)][_0x399cdc(0x3ae)](this,_0x37a563);return $gameTemp[_0x399cdc(0x511)](),_0x40d893;},VisuMZ[_0xe5069(0x5f4)]['Game_Party_hasEncounterHalf']=Game_Party[_0xe5069(0x678)]['hasEncounterHalf'],Game_Party[_0xe5069(0x678)][_0xe5069(0x1dd)]=function(){const _0x2cc11e=_0xe5069;if(this[_0x2cc11e(0x55b)]())return!![];return VisuMZ['EventsMoveCore'][_0x2cc11e(0x257)][_0x2cc11e(0x3ae)](this);},Game_Party[_0xe5069(0x678)]['isPlayerWithinEncounterHalfEvents']=function(){const _0x50baff=_0xe5069;if(this[_0x50baff(0x57d)])return![];return $isTileEncounterHalf($gamePlayer['x'],$gamePlayer['y']);},VisuMZ[_0xe5069(0x5f4)][_0xe5069(0x573)]=Game_Party[_0xe5069(0x678)][_0xe5069(0x438)],Game_Party[_0xe5069(0x678)][_0xe5069(0x438)]=function(){const _0x5ef8fd=_0xe5069;if(this['isPlayerWithinEncounterNoneEvents']())return!![];return VisuMZ[_0x5ef8fd(0x5f4)]['Game_Party_hasEncounterNone'][_0x5ef8fd(0x3ae)](this);},Game_Party[_0xe5069(0x678)][_0xe5069(0x1d4)]=function(){const _0x5665a4=_0xe5069;if(this[_0x5665a4(0x57d)])return![];return $isTileEncounterNone($gamePlayer['x'],$gamePlayer['y']);};function _0x4f29(_0x24130e,_0x2d27c9){const _0x21694f=_0x2169();return _0x4f29=function(_0x4f2948,_0x1ad9d5){_0x4f2948=_0x4f2948-0x199;let _0x386398=_0x21694f[_0x4f2948];return _0x386398;},_0x4f29(_0x24130e,_0x2d27c9);}var $isTileEncounterHalf=function(_0x12cb87,_0x56c7b9){const _0x53976f=_0xe5069;if(!$gameMap)return![];_0x12cb87=Math['round'](_0x12cb87||0x0),_0x56c7b9=Math['round'](_0x56c7b9||0x0);const _0x2783b7=$gameMap['events']();for(const _0xea1600 of _0x2783b7){if(!_0xea1600)continue;if(_0xea1600[_0x53976f(0x216)])continue;const _0x501084=_0xea1600[_0x53976f(0x5b1)](!![]),_0x8ea0e1=_0xea1600[_0x53976f(0x3a4)](!![]);if($gameMap[_0x53976f(0x226)](_0x12cb87,_0x56c7b9,_0xea1600,_0x501084,_0x8ea0e1))return!![];}return![];},$isTileEncounterNone=function(_0x4b4b6f,_0x54b457){const _0x13affb=_0xe5069;if(!$gameMap)return![];_0x4b4b6f=Math[_0x13affb(0x471)](_0x4b4b6f||0x0),_0x54b457=Math[_0x13affb(0x471)](_0x54b457||0x0);const _0x85493b=$gameMap[_0x13affb(0x449)]();for(const _0x40f1c3 of _0x85493b){if(!_0x40f1c3)continue;if(_0x40f1c3['_erased'])continue;const _0x21cc63=_0x40f1c3['encounterProximityType'](![]),_0x24ba6a=_0x40f1c3[_0x13affb(0x3a4)](![]);if($gameMap[_0x13affb(0x226)](_0x4b4b6f,_0x54b457,_0x40f1c3,_0x21cc63,_0x24ba6a))return!![];}return![];};VisuMZ[_0xe5069(0x5f4)][_0xe5069(0x5df)]=Game_Troop[_0xe5069(0x678)][_0xe5069(0x49c)],Game_Troop[_0xe5069(0x678)][_0xe5069(0x49c)]=function(_0x47b2a0){const _0x39540d=_0xe5069;$gameTemp[_0x39540d(0x32a)](this);const _0x5bdef8=VisuMZ[_0x39540d(0x5f4)][_0x39540d(0x5df)][_0x39540d(0x3ae)](this,_0x47b2a0);return $gameTemp[_0x39540d(0x511)](),_0x5bdef8;},VisuMZ['EventsMoveCore'][_0xe5069(0x654)]=Game_Map[_0xe5069(0x678)][_0xe5069(0x339)],Game_Map[_0xe5069(0x678)][_0xe5069(0x339)]=function(_0x16c58f){const _0x5c580b=_0xe5069;this[_0x5c580b(0x3c4)](_0x16c58f),this[_0x5c580b(0x641)](),VisuMZ[_0x5c580b(0x5f4)][_0x5c580b(0x654)][_0x5c580b(0x3ae)](this,_0x16c58f),this['clearEventCache'](),this[_0x5c580b(0x1f0)](),this[_0x5c580b(0x508)](),this[_0x5c580b(0x225)](),this[_0x5c580b(0x403)](),this[_0x5c580b(0x2ee)](),this[_0x5c580b(0x388)](),this[_0x5c580b(0x2c9)](),this[_0x5c580b(0x1fc)](),this['clearEventCache']();},VisuMZ[_0xe5069(0x5f4)][_0xe5069(0x3d3)]=Game_Map[_0xe5069(0x678)][_0xe5069(0x5f3)],Game_Map[_0xe5069(0x678)][_0xe5069(0x5f3)]=function(){const _0x1d6a78=_0xe5069;VisuMZ[_0x1d6a78(0x5f4)][_0x1d6a78(0x3d3)]['call'](this),this[_0x1d6a78(0x519)]();},Game_Map['_eventOverloadThreshold']=0xc8,Game_Map[_0xe5069(0x678)][_0xe5069(0x66c)]=function(){const _0x23dd7c=_0xe5069,_0x4fed91=Game_Map[_0x23dd7c(0x4e7)];this[_0x23dd7c(0x35b)]=this[_0x23dd7c(0x449)]()[_0x23dd7c(0x243)]>_0x4fed91;if(this[_0x23dd7c(0x35b)]&&$gameTemp[_0x23dd7c(0x38f)]()){}},Game_Map[_0xe5069(0x678)][_0xe5069(0x629)]=function(){return this['_eventOverload'];},Game_Map[_0xe5069(0x678)][_0xe5069(0x641)]=function(){const _0x462e48=_0xe5069;this[_0x462e48(0x40d)]=undefined;},Game_Map[_0xe5069(0x678)][_0xe5069(0x1f0)]=function(){const _0x51734e=_0xe5069;this[_0x51734e(0x37f)]=VisuMZ['EventsMoveCore'][_0x51734e(0x553)][_0x51734e(0x595)][_0x51734e(0x532)];const _0x3a384e=$dataMap['note']||'';if(_0x3a384e[_0x51734e(0x506)](/<DIAGONAL MOVEMENT: ON>/i))this['_diagonalSupport']=!![];else _0x3a384e[_0x51734e(0x506)](/<DIAGONAL MOVEMENT: OFF>/i)&&(this[_0x51734e(0x37f)]=![]);},Game_Map['MOBILE_DIAGONAL_PATHFINDING']=VisuMZ[_0xe5069(0x5f4)][_0xe5069(0x553)][_0xe5069(0x595)][_0xe5069(0x3e5)]??![],Game_Map[_0xe5069(0x678)]['isSupportDiagonalMovement']=function(){const _0x74328e=_0xe5069;if(Utils['isMobileDevice']()){if(!Game_Map[_0x74328e(0x30b)])return![];}const _0x8e1ce7=$gameSystem[_0x74328e(0x433)]();if(_0x8e1ce7==='enable')return!![];if(_0x8e1ce7==='disable')return![];if(this[_0x74328e(0x37f)]===undefined)this[_0x74328e(0x1f0)]();return this[_0x74328e(0x37f)];},Game_Map[_0xe5069(0x678)][_0xe5069(0x63a)]=function(_0x32e233,_0x18851b){const _0x5640fc=_0xe5069;if([0x1,0x4,0x7]['includes'](_0x18851b))_0x32e233-=0x1;if([0x3,0x6,0x9][_0x5640fc(0x22a)](_0x18851b))_0x32e233+=0x1;return this[_0x5640fc(0x3d7)](_0x32e233);},Game_Map[_0xe5069(0x678)]['roundYWithDirection']=function(_0x188118,_0x148686){const _0x365859=_0xe5069;if([0x1,0x2,0x3][_0x365859(0x22a)](_0x148686))_0x188118+=0x1;if([0x7,0x8,0x9][_0x365859(0x22a)](_0x148686))_0x188118-=0x1;return this[_0x365859(0x310)](_0x188118);},Game_Map[_0xe5069(0x678)]['absDistance']=function(_0x3112dc,_0x2c992b,_0x269e8b,_0x367d5){const _0x10e5d4=_0xe5069;return Math[_0x10e5d4(0x314)](Math['abs'](this[_0x10e5d4(0x4ca)](_0x3112dc,_0x269e8b)),Math[_0x10e5d4(0x5e6)](this[_0x10e5d4(0x2fa)](_0x2c992b,_0x367d5)));},Game_Map['prototype']['setupRegionRestrictions']=function(){const _0x3cd341=_0xe5069,_0x18dd41=VisuMZ[_0x3cd341(0x5f4)][_0x3cd341(0x553)]['Region'],_0x4d8226={},_0x41a35f=['Allow','Forbid',_0x3cd341(0x331)],_0x232976=['All','Walk',_0x3cd341(0x512),_0x3cd341(0x4ea),_0x3cd341(0x337),_0x3cd341(0x2a6),'Ship',_0x3cd341(0x3cb)];for(const _0x806a4b of _0x41a35f){for(const _0x219145 of _0x232976){const _0x318ea1=_0x3cd341(0x4a0)['format'](_0x219145,_0x806a4b);_0x18dd41[_0x318ea1]&&(_0x4d8226[_0x318ea1]=_0x18dd41[_0x318ea1][_0x3cd341(0x3e3)](0x0));}}const _0x52a585=$dataMap[_0x3cd341(0x3b4)]||'',_0x57ab73=_0x52a585[_0x3cd341(0x506)](/<(.*) (.*) REGION:[ ]*(\d+(?:\s*,\s*\d+)*)>/gi);if(_0x57ab73)for(const _0x3ab103 of _0x57ab73){_0x3ab103[_0x3cd341(0x506)](/<(.*) (.*) REGION:[ ]*(\d+(?:\s*,\s*\d+)*)>/i);let _0x2e8ccf=String(RegExp['$1'])['toLowerCase']()[_0x3cd341(0x3d9)](),_0x56f83b=String(RegExp['$2'])['toLowerCase']()[_0x3cd341(0x3d9)]();const _0x11ad23=JSON[_0x3cd341(0x4e8)]('['+RegExp['$3'][_0x3cd341(0x506)](/\d+/g)+']');_0x2e8ccf=_0x2e8ccf[_0x3cd341(0x1b9)](0x0)[_0x3cd341(0x4f8)]()+_0x2e8ccf[_0x3cd341(0x3e3)](0x1),_0x56f83b=_0x56f83b[_0x3cd341(0x1b9)](0x0)[_0x3cd341(0x4f8)]()+_0x56f83b[_0x3cd341(0x3e3)](0x1);const _0x27db33='%1%2'['format'](_0x2e8ccf,_0x56f83b);if(_0x4d8226[_0x27db33])_0x4d8226[_0x27db33]=_0x4d8226[_0x27db33][_0x3cd341(0x26e)](_0x11ad23);}this[_0x3cd341(0x49f)]=_0x4d8226;},Game_Map[_0xe5069(0x678)][_0xe5069(0x36c)]=function(_0xf4290d,_0x2a676d,_0x2fcc9b,_0x55961f){const _0x5ee2d0=_0xe5069,_0x4c8488=this['roundXWithDirection'](_0xf4290d,_0x2fcc9b),_0x4b41b6=this[_0x5ee2d0(0x19b)](_0x2a676d,_0x2fcc9b),_0x43472a=this[_0x5ee2d0(0x492)](_0x4c8488,_0x4b41b6),_0x4a38ce=this[_0x5ee2d0(0x49f)];if(_0x4a38ce[_0x5ee2d0(0x28b)][_0x5ee2d0(0x22a)](_0x43472a))return!![];else{if(_0x55961f===_0x5ee2d0(0x610))return _0x4a38ce[_0x5ee2d0(0x460)][_0x5ee2d0(0x22a)](_0x43472a)||_0x4a38ce['WalkAllow'][_0x5ee2d0(0x22a)](_0x43472a);else{if(_0x55961f===_0x5ee2d0(0x54b))return _0x4a38ce['EventAllow'][_0x5ee2d0(0x22a)](_0x43472a)||_0x4a38ce[_0x5ee2d0(0x461)][_0x5ee2d0(0x22a)](_0x43472a);else{if(_0x4a38ce['VehicleAllow'][_0x5ee2d0(0x22a)](_0x43472a))return!![];else{const _0x3ca5c6=_0x5ee2d0(0x3aa)[_0x5ee2d0(0x52c)](_0x55961f['charAt'](0x0)[_0x5ee2d0(0x4f8)]()+_0x55961f[_0x5ee2d0(0x3e3)](0x1));if(_0x4a38ce[_0x3ca5c6])return _0x4a38ce[_0x3ca5c6][_0x5ee2d0(0x22a)](_0x43472a);}}}}return![];},Game_Map['prototype']['isRegionForbidPass']=function(_0xd732b1,_0x428dea,_0xb2f175,_0x3f1e83){const _0x4334f4=_0xe5069,_0x5301eb=this[_0x4334f4(0x63a)](_0xd732b1,_0xb2f175),_0x24b99b=this[_0x4334f4(0x19b)](_0x428dea,_0xb2f175),_0x185be0=this['regionId'](_0x5301eb,_0x24b99b),_0x2871fc=this[_0x4334f4(0x49f)];if(_0x2871fc['AllForbid'][_0x4334f4(0x22a)](_0x185be0))return!![];else{if(_0x3f1e83===_0x4334f4(0x610))return _0x2871fc['PlayerForbid']['includes'](_0x185be0)||_0x2871fc['WalkForbid'][_0x4334f4(0x22a)](_0x185be0);else{if(_0x3f1e83==='event')return _0x2871fc[_0x4334f4(0x21d)][_0x4334f4(0x22a)](_0x185be0)||_0x2871fc[_0x4334f4(0x35d)]['includes'](_0x185be0);else{if(_0x2871fc[_0x4334f4(0x5ba)][_0x4334f4(0x22a)](_0x185be0))return!![];else{const _0x398a04=_0x4334f4(0x65d)[_0x4334f4(0x52c)](_0x3f1e83['charAt'](0x0)[_0x4334f4(0x4f8)]()+_0x3f1e83[_0x4334f4(0x3e3)](0x1));if(_0x2871fc[_0x398a04])return _0x2871fc[_0x398a04]['includes'](_0x185be0);}}}}return![];},Game_Map['prototype'][_0xe5069(0x603)]=function(_0x3691b5,_0x2b0c24,_0x16b87f,_0x5633b1){const _0x5d352b=_0xe5069;_0x16b87f=_0x5633b1==='airship'?0x5:_0x16b87f;const _0x3131f4=this[_0x5d352b(0x63a)](_0x3691b5,_0x16b87f),_0x499dfe=this['roundYWithDirection'](_0x2b0c24,_0x16b87f),_0x152cc5=this['regionId'](_0x3131f4,_0x499dfe),_0x1becde=this[_0x5d352b(0x49f)];if(_0x1becde[_0x5d352b(0x3ad)][_0x5d352b(0x22a)](_0x152cc5))return!![];else{const _0x287977=_0x5d352b(0x1e9)[_0x5d352b(0x52c)](_0x5633b1[_0x5d352b(0x1b9)](0x0)[_0x5d352b(0x4f8)]()+_0x5633b1[_0x5d352b(0x3e3)](0x1));if(_0x1becde[_0x287977])return _0x1becde[_0x287977]['includes'](_0x152cc5);}return![];},VisuMZ[_0xe5069(0x5f4)][_0xe5069(0x67c)]=Game_Map[_0xe5069(0x678)][_0xe5069(0x422)],Game_Map[_0xe5069(0x678)][_0xe5069(0x422)]=function(){const _0x5d9eb9=_0xe5069;VisuMZ[_0x5d9eb9(0x5f4)][_0x5d9eb9(0x67c)]['call'](this),this['checkNeedForPeriodicRefresh']();},Game_Map[_0xe5069(0x678)][_0xe5069(0x4bd)]=function(){const _0x224988=_0xe5069;this[_0x224988(0x551)]=![];if(this[_0x224988(0x449)]()[_0x224988(0x475)](_0x4245f5=>_0x4245f5[_0x224988(0x19f)]())){this[_0x224988(0x551)]=!![];return;}if(this[_0x224988(0x449)]()[_0x224988(0x475)](_0x14c744=>_0x14c744[_0x224988(0x576)]())){this[_0x224988(0x551)]=!![];return;}if(this[_0x224988(0x2e3)][_0x224988(0x475)](_0x156959=>_0x156959[_0x224988(0x19f)]())){this[_0x224988(0x551)]=!![];return;}if(this['_commonEvents'][_0x224988(0x475)](_0x43702f=>_0x43702f[_0x224988(0x576)]())){this[_0x224988(0x551)]=!![];return;}},VisuMZ[_0xe5069(0x5f4)][_0xe5069(0x4a7)]=Game_Map[_0xe5069(0x678)][_0xe5069(0x59e)],Game_Map[_0xe5069(0x678)]['update']=function(_0x5387d4){const _0x12cf54=_0xe5069;this[_0x12cf54(0x1cd)](),VisuMZ[_0x12cf54(0x5f4)][_0x12cf54(0x4a7)]['call'](this,_0x5387d4);},Game_Map[_0xe5069(0x678)]['updatePeriodicRefresh']=function(){const _0x8838a2=_0xe5069;if(!this['_needsPeriodicRefresh'])return;this[_0x8838a2(0x46e)]=this[_0x8838a2(0x46e)]||0x3c,this[_0x8838a2(0x46e)]--,this[_0x8838a2(0x46e)]<=0x0&&(this['requestRefresh'](),this[_0x8838a2(0x46e)]=0x3c);},VisuMZ[_0xe5069(0x5f4)]['Game_Map_isDashDisabled']=Game_Map[_0xe5069(0x678)][_0xe5069(0x58e)],Game_Map[_0xe5069(0x678)][_0xe5069(0x58e)]=function(){const _0x3b4b6c=_0xe5069;if(!$gameSystem['isDashingEnabled']())return!![];return VisuMZ['EventsMoveCore'][_0x3b4b6c(0x452)]['call'](this);},Game_Map[_0xe5069(0x678)][_0xe5069(0x225)]=function(){const _0x38f865=_0xe5069;this[_0x38f865(0x601)]=![];const _0x4b2a2e=$dataMap[_0x38f865(0x3b4)]||'';_0x4b2a2e[_0x38f865(0x506)](/<SAVE EVENT (?:LOCATION|LOCATIONS)>/i)&&(this[_0x38f865(0x601)]=!![]);},Game_Map[_0xe5069(0x678)][_0xe5069(0x4dd)]=function(){const _0x358fb9=_0xe5069;if(this['_saveEventLocations']===undefined)this['setupSaveEventLocations']();return this[_0x358fb9(0x601)];},Game_Map[_0xe5069(0x678)][_0xe5069(0x3c4)]=function(_0x4b6b30){const _0x15bba3=_0xe5069;_0x4b6b30!==this[_0x15bba3(0x5a6)]()&&$gamePlayer&&$gameSystem[_0x15bba3(0x3c4)](this[_0x15bba3(0x5a6)]());},Game_Map[_0xe5069(0x678)]['setupSpawnedEvents']=function(){const _0xca485=_0xe5069;this[_0xca485(0x5ea)]=$gameSystem[_0xca485(0x278)](this[_0xca485(0x5a6)]()),this[_0xca485(0x53c)]=!![];},VisuMZ[_0xe5069(0x5f4)][_0xe5069(0x382)]=Game_Map[_0xe5069(0x678)][_0xe5069(0x449)],Game_Map[_0xe5069(0x678)][_0xe5069(0x449)]=function(){const _0x56db46=_0xe5069;if(this[_0x56db46(0x40d)])return this[_0x56db46(0x40d)];const _0x13bbd2=VisuMZ['EventsMoveCore'][_0x56db46(0x382)]['call'](this),_0x24c4f0=_0x13bbd2[_0x56db46(0x26e)](this[_0x56db46(0x5ea)]||[]);return this[_0x56db46(0x40d)]=_0x24c4f0[_0x56db46(0x617)](_0x5f2f2e=>!!_0x5f2f2e),this['_eventCache'];},VisuMZ[_0xe5069(0x5f4)][_0xe5069(0x3f9)]=Game_Map[_0xe5069(0x678)][_0xe5069(0x54b)],Game_Map[_0xe5069(0x678)]['event']=function(_0x57655){const _0x4839b4=_0xe5069;return _0x57655>=0x3e8?(_0x57655-=0x3e8,this[_0x4839b4(0x5ea)][_0x57655]):VisuMZ[_0x4839b4(0x5f4)]['Game_Map_event']['call'](this,_0x57655);},Game_Map['prototype'][_0xe5069(0x561)]=function(_0x1920e9){const _0x114f6c=_0xe5069,_0xcd47da=this[_0x114f6c(0x54b)](_0x1920e9);if(_0xcd47da)_0xcd47da['erase']();},Game_Map[_0xe5069(0x678)][_0xe5069(0x319)]=function(){const _0x53d34c=_0xe5069,_0x3d66af={'template':_0x53d34c(0x2d7),'mapId':0x1,'eventId':0xc,'x':$gamePlayer['x']+0x1,'y':$gamePlayer['y']+0x1,'spawnPreserved':!![],'spawnEventId':this[_0x53d34c(0x5ea)]['length']+0x3e8};this[_0x53d34c(0x31d)](_0x3d66af);},Game_Map['prototype'][_0xe5069(0x586)]=function(_0x4fccd3,_0x49a929){const _0x236db6=_0xe5069;if(this[_0x236db6(0x5f8)](_0x4fccd3,_0x49a929)[_0x236db6(0x243)]>0x0)return!![];if($gamePlayer['x']===_0x4fccd3&&$gamePlayer['y']===_0x49a929)return!![];if(this[_0x236db6(0x299)]()[_0x236db6(0x4d4)](_0x4fccd3,_0x49a929))return!![];if(this[_0x236db6(0x241)]()[_0x236db6(0x4d4)](_0x4fccd3,_0x49a929))return!![];return![];},Game_Map[_0xe5069(0x678)][_0xe5069(0x67b)]=function(_0x222150,_0x359fcc,_0x1723bf){const _0x15b404=_0xe5069;$gameTemp[_0x15b404(0x3c3)]=_0x222150;const _0x217d04=new Game_Event(_0x222150['mapId'],_0x222150[_0x15b404(0x21e)]);$gameTemp[_0x15b404(0x3c3)]=undefined,_0x217d04[_0x15b404(0x422)]();let _0x342f4d=_0x359fcc-_0x217d04['_addedHitbox'][_0x15b404(0x234)],_0x9ce7de=_0x359fcc+_0x217d04[_0x15b404(0x51c)][_0x15b404(0x67e)],_0x141511=_0x1723bf-_0x217d04[_0x15b404(0x51c)]['up'],_0x3a038f=_0x1723bf+_0x217d04[_0x15b404(0x51c)]['down'];for(let _0x41ee7a=_0x342f4d;_0x41ee7a<=_0x9ce7de;_0x41ee7a++){for(let _0x5e1039=_0x141511;_0x5e1039<=_0x3a038f;_0x5e1039++){if(this[_0x15b404(0x586)](_0x41ee7a,_0x5e1039))return![];}}return!![];},Game_Map[_0xe5069(0x678)][_0xe5069(0x31d)]=function(_0x1a4626){const _0x53a7c1=_0xe5069;$gameTemp[_0x53a7c1(0x3c3)]=_0x1a4626;const _0x4d0a5c=new Game_Event(_0x1a4626[_0x53a7c1(0x5a6)],_0x1a4626['eventId']);$gameTemp[_0x53a7c1(0x3c3)]=undefined,this['_spawnedEvents'][_0x53a7c1(0x3a5)](_0x4d0a5c),_0x4d0a5c['setupSpawn'](_0x1a4626),this[_0x53a7c1(0x641)]();},Game_Map['prototype'][_0xe5069(0x40e)]=function(_0x472137,_0x35ab75,_0x58abdf){const _0x3a1b52=_0xe5069,_0x35e62c=_0x472137[_0x3a1b52(0x3ef)][_0x3a1b52(0x4f8)]()[_0x3a1b52(0x3d9)]();if(_0x35e62c!==_0x3a1b52(0x25a)){const _0x38acd6=VisuMZ[_0x3a1b52(0x4dc)][_0x35e62c];_0x38acd6&&(_0x472137[_0x3a1b52(0x5a6)]=_0x38acd6[_0x3a1b52(0x45f)],_0x472137[_0x3a1b52(0x21e)]=_0x38acd6[_0x3a1b52(0x4e1)]);}const _0x5f088c=_0x472137['x'],_0x480317=_0x472137['y'];if(!this['isValid'](_0x5f088c,_0x480317))return![];if(_0x35ab75){if(this[_0x3a1b52(0x586)](_0x5f088c,_0x480317))return![];if(!this[_0x3a1b52(0x67b)](_0x472137,_0x5f088c,_0x480317))return![];}if(_0x58abdf){if(!this['isPassableByAnyDirection'](_0x5f088c,_0x480317))return![];}return this[_0x3a1b52(0x31d)](_0x472137),!![];},Game_Map[_0xe5069(0x678)][_0xe5069(0x275)]=function(_0x57f626,_0x3efd0b,_0x57ea84,_0x5d639f){const _0x5c81e0=_0xe5069,_0x21eeb5=_0x57f626[_0x5c81e0(0x3ef)][_0x5c81e0(0x4f8)]()[_0x5c81e0(0x3d9)]();if(_0x21eeb5!=='UNTITLED'){const _0x1c39c9=VisuMZ[_0x5c81e0(0x4dc)][_0x21eeb5];_0x1c39c9&&(_0x57f626[_0x5c81e0(0x5a6)]=_0x1c39c9[_0x5c81e0(0x45f)],_0x57f626[_0x5c81e0(0x21e)]=_0x1c39c9['EventID']);}const _0x3e98ea=[],_0x21a9cc=this[_0x5c81e0(0x2ad)](),_0x200468=this['height']();for(let _0x2b181f=0x0;_0x2b181f<_0x21a9cc;_0x2b181f++){for(let _0x36bec9=0x0;_0x36bec9<_0x200468;_0x36bec9++){if(!_0x3efd0b['includes'](this[_0x5c81e0(0x492)](_0x2b181f,_0x36bec9)))continue;if(!this[_0x5c81e0(0x4d8)](_0x2b181f,_0x36bec9))continue;if(_0x57ea84){if(this[_0x5c81e0(0x586)](_0x2b181f,_0x36bec9))continue;if(!this[_0x5c81e0(0x67b)](_0x57f626,_0x2b181f,_0x36bec9))continue;}if(_0x5d639f){if(!this[_0x5c81e0(0x528)](_0x2b181f,_0x36bec9))continue;}_0x3e98ea['push']([_0x2b181f,_0x36bec9]);}}if(_0x3e98ea[_0x5c81e0(0x243)]>0x0){const _0x2c100b=_0x3e98ea[Math[_0x5c81e0(0x364)](_0x3e98ea[_0x5c81e0(0x243)])];return _0x57f626['x']=_0x2c100b[0x0],_0x57f626['y']=_0x2c100b[0x1],this['createSpawnedEventWithData'](_0x57f626),!![];}return![];},Game_Map[_0xe5069(0x678)][_0xe5069(0x462)]=function(_0x2168b5,_0x36cc19,_0x269a16,_0x18f72d){const _0xbdfd=_0xe5069,_0x5ac034=_0x2168b5['template'][_0xbdfd(0x4f8)]()[_0xbdfd(0x3d9)]();if(_0x5ac034!==_0xbdfd(0x25a)){const _0x22f4a3=VisuMZ[_0xbdfd(0x4dc)][_0x5ac034];_0x22f4a3&&(_0x2168b5[_0xbdfd(0x5a6)]=_0x22f4a3[_0xbdfd(0x45f)],_0x2168b5['eventId']=_0x22f4a3[_0xbdfd(0x4e1)]);}const _0x3f6e87=[],_0x31d162=this[_0xbdfd(0x2ad)](),_0x4917a6=this[_0xbdfd(0x206)]();for(let _0x14090f=0x0;_0x14090f<_0x31d162;_0x14090f++){for(let _0x5b6bca=0x0;_0x5b6bca<_0x4917a6;_0x5b6bca++){if(!_0x36cc19[_0xbdfd(0x22a)](this['terrainTag'](_0x14090f,_0x5b6bca)))continue;if(!this[_0xbdfd(0x4d8)](_0x14090f,_0x5b6bca))continue;if(_0x269a16){if(this[_0xbdfd(0x586)](_0x14090f,_0x5b6bca))continue;if(!this['isSpawnHitboxCollisionOk'](_0x2168b5,_0x14090f,_0x5b6bca))continue;}if(_0x18f72d){if(!this[_0xbdfd(0x528)](_0x14090f,_0x5b6bca))continue;}_0x3f6e87[_0xbdfd(0x3a5)]([_0x14090f,_0x5b6bca]);}}if(_0x3f6e87[_0xbdfd(0x243)]>0x0){const _0x1939d3=_0x3f6e87[Math['randomInt'](_0x3f6e87['length'])];return _0x2168b5['x']=_0x1939d3[0x0],_0x2168b5['y']=_0x1939d3[0x1],this[_0xbdfd(0x31d)](_0x2168b5),!![];}return![];},Game_Map[_0xe5069(0x678)][_0xe5069(0x528)]=function(_0x5b8006,_0xdd7a39){const _0x383422=_0xe5069;if(this[_0x383422(0x1de)](_0x5b8006,_0xdd7a39,0x2))return!![];if(this[_0x383422(0x1de)](_0x5b8006,_0xdd7a39,0x4))return!![];if(this[_0x383422(0x1de)](_0x5b8006,_0xdd7a39,0x6))return!![];if(this[_0x383422(0x1de)](_0x5b8006,_0xdd7a39,0x8))return!![];return![];},Game_Map[_0xe5069(0x678)][_0xe5069(0x5d5)]=function(_0x5a9389){const _0x5932cf=_0xe5069;if(_0x5a9389<0x3e8)return;if(!this[_0x5932cf(0x5ea)])return;const _0x294713=this[_0x5932cf(0x54b)](_0x5a9389);_0x294713[_0x5932cf(0x378)](-0x1,-0x1),_0x294713[_0x5932cf(0x513)](),this[_0x5932cf(0x5ea)][_0x5a9389-0x3e8]=null,this[_0x5932cf(0x641)]();},Game_Map['prototype'][_0xe5069(0x2da)]=function(){const _0x28d867=_0xe5069;for(const _0x155ecd of this[_0x28d867(0x5ea)]){if(_0x155ecd)return _0x155ecd;}return null;},Game_Map[_0xe5069(0x678)][_0xe5069(0x61d)]=function(){const _0x3b5882=_0xe5069,_0x43f228=this['firstSpawnedEvent']();return _0x43f228?_0x43f228[_0x3b5882(0x374)]:0x0;},Game_Map['prototype']['lastSpawnedEvent']=function(){const _0x373147=_0xe5069,_0x5b91e0=this[_0x373147(0x5ea)][_0x373147(0x3e3)](0x0)[_0x373147(0x3d2)]();for(const _0x4c4292 of _0x5b91e0){if(_0x4c4292)return _0x4c4292;}return null;},Game_Map['prototype']['lastSpawnedEventID']=function(){const _0x5eadd6=_0xe5069,_0x85f245=this[_0x5eadd6(0x5a5)]();return _0x85f245?_0x85f245['_eventId']:0x0;},Game_Map[_0xe5069(0x678)][_0xe5069(0x3b7)]=function(_0x486eed,_0x526127){const _0x5f3c21=_0xe5069,_0x15358b=this['eventsXy'](_0x486eed,_0x526127);for(const _0x5de17b of _0x15358b){if(!_0x5de17b)continue;if(_0x5de17b['isSpawnedEvent']())this[_0x5f3c21(0x5d5)](_0x5de17b[_0x5f3c21(0x374)]);}},Game_Map[_0xe5069(0x678)][_0xe5069(0x683)]=function(_0x1ac3f5){const _0x1515de=_0xe5069;for(const _0x5d1f05 of this[_0x1515de(0x5ea)]){if(!_0x5d1f05)continue;_0x1ac3f5[_0x1515de(0x22a)](_0x5d1f05[_0x1515de(0x492)]())&&this[_0x1515de(0x5d5)](_0x5d1f05['_eventId']);}},Game_Map[_0xe5069(0x678)][_0xe5069(0x3e1)]=function(_0x459b6b){const _0x50ef64=_0xe5069;for(const _0x261895 of this['_spawnedEvents']){if(!_0x261895)continue;_0x459b6b['includes'](_0x261895[_0x50ef64(0x505)]())&&this[_0x50ef64(0x5d5)](_0x261895[_0x50ef64(0x374)]);}},Game_Map[_0xe5069(0x678)]['despawnEverything']=function(){const _0x3b8665=_0xe5069;for(const _0x55cc5d of this[_0x3b8665(0x5ea)]){if(!_0x55cc5d)continue;this[_0x3b8665(0x5d5)](_0x55cc5d[_0x3b8665(0x374)]);}},VisuMZ[_0xe5069(0x5f4)][_0xe5069(0x464)]=Game_Map[_0xe5069(0x678)][_0xe5069(0x376)],Game_Map['prototype'][_0xe5069(0x376)]=function(_0x5da228){const _0x1dca27=_0xe5069;VisuMZ[_0x1dca27(0x5f4)][_0x1dca27(0x464)][_0x1dca27(0x3ae)](this,_0x5da228);if(_0x5da228>=0x3e8){const _0x5dfa10=this[_0x1dca27(0x54b)](_0x5da228);if(_0x5dfa10)_0x5dfa10[_0x1dca27(0x643)]();}},Game_Map['prototype'][_0xe5069(0x2ee)]=function(){const _0x33deb4=_0xe5069;this[_0x33deb4(0x585)]=![],this['_forceHidePlayer']=![];if(!$dataMap)return;const _0x393f68=$dataMap['note']||'';if(_0x393f68[_0x33deb4(0x506)](/<HIDE PLAYER>/i))this['_forceShowPlayer']=![],this[_0x33deb4(0x42f)]=!![];else _0x393f68[_0x33deb4(0x506)](/<SHOW PLAYER>/i)&&(this['_forceShowPlayer']=!![],this[_0x33deb4(0x42f)]=![]);},Game_Map[_0xe5069(0x678)][_0xe5069(0x20e)]=function(){const _0x28fd8d=_0xe5069;return this[_0x28fd8d(0x585)]===undefined&&this[_0x28fd8d(0x2ee)](),this[_0x28fd8d(0x585)];},Game_Map[_0xe5069(0x678)]['isPlayerForceHidden']=function(){const _0x148c76=_0xe5069;return this[_0x148c76(0x42f)]===undefined&&this[_0x148c76(0x2ee)](),this['_forceHidePlayer'];},VisuMZ[_0xe5069(0x5f4)][_0xe5069(0x64e)]=Game_CharacterBase['prototype'][_0xe5069(0x1fa)],Game_CharacterBase[_0xe5069(0x678)]['isTransparent']=function(){const _0x26738d=_0xe5069;if(this===$gamePlayer){if($gameMap[_0x26738d(0x20e)]())return![];if($gameMap[_0x26738d(0x262)]())return!![];}return VisuMZ[_0x26738d(0x5f4)]['Game_CharacterBase_isTransparent']['call'](this);},Game_Map[_0xe5069(0x678)][_0xe5069(0x388)]=function(){const _0x3e13ce=_0xe5069;this[_0x3e13ce(0x2f2)]=![],this[_0x3e13ce(0x577)]=![];if(!$dataMap)return;const _0x50be23=$dataMap[_0x3e13ce(0x3b4)]||'';if(_0x50be23[_0x3e13ce(0x506)](/<HIDE FOLLOWERS>/i))this[_0x3e13ce(0x2f2)]=![],this[_0x3e13ce(0x577)]=!![];else _0x50be23[_0x3e13ce(0x506)](/<SHOW FOLLOWERS>/i)&&(this[_0x3e13ce(0x2f2)]=!![],this[_0x3e13ce(0x577)]=![]);},Game_Map['prototype'][_0xe5069(0x4df)]=function(){const _0x159f31=_0xe5069;return this[_0x159f31(0x2f2)]===undefined&&this[_0x159f31(0x388)](),this['_forceShowFollower'];},Game_Map['prototype'][_0xe5069(0x52f)]=function(){const _0x15415c=_0xe5069;return this[_0x15415c(0x577)]===undefined&&this['setupFollowerVisibilityOverrides'](),this[_0x15415c(0x577)];},VisuMZ['EventsMoveCore']['Game_Followers_isVisible']=Game_Followers[_0xe5069(0x678)][_0xe5069(0x3e7)],Game_Followers['prototype']['isVisible']=function(){const _0x1690cd=_0xe5069;if($gameMap[_0x1690cd(0x4df)]())return!![];if($gameMap[_0x1690cd(0x52f)]())return![];return VisuMZ[_0x1690cd(0x5f4)][_0x1690cd(0x2aa)][_0x1690cd(0x3ae)](this);},Game_Map[_0xe5069(0x678)][_0xe5069(0x2c9)]=function(){const _0x11ef17=_0xe5069,_0x41162e=this[_0x11ef17(0x449)](),_0x3d2008=[];$gameParty[_0x11ef17(0x57d)]=!![];for(const _0x57bc60 of _0x41162e){if(!_0x57bc60)continue;if(_0x57bc60[_0x11ef17(0x216)])continue;_0x57bc60['processEraseEncounterSpawn']()&&_0x3d2008['push'](_0x57bc60);}$gameParty['_checkEncounterRaw']=undefined;for(const _0x1a6f1b of _0x3d2008){if(!_0x1a6f1b)continue;if(_0x1a6f1b['_erased'])continue;this[_0x11ef17(0x561)](_0x1a6f1b[_0x11ef17(0x21e)]());}},Game_Event[_0xe5069(0x678)][_0xe5069(0x62a)]=function(){const _0x5ce1e9=_0xe5069,_0x8e828=this['event']()[_0x5ce1e9(0x3b4)]||'';if(_0x8e828[_0x5ce1e9(0x506)](/<ERASE IF ENC(?:|OUNTER) HALF>/i)){if($gameParty['hasEncounterHalf']())return!![];if($isTileEncounterHalf(this['x'],this['y']))return!![];}if(_0x8e828[_0x5ce1e9(0x506)](/<ERASE IF ENC(?:|OUNTER) NONE>/i)){if($gameParty[_0x5ce1e9(0x438)]())return!![];if($isTileEncounterNone(this['x'],this['y']))return!![];}return![];},VisuMZ[_0xe5069(0x5f4)][_0xe5069(0x560)]=Scene_Map[_0xe5069(0x678)][_0xe5069(0x4ac)],Scene_Map['prototype'][_0xe5069(0x4ac)]=function(){const _0x41a9a4=_0xe5069;VisuMZ[_0x41a9a4(0x5f4)][_0x41a9a4(0x560)][_0x41a9a4(0x3ae)](this),$gameMap[_0x41a9a4(0x2c9)]();},Game_Map[_0xe5069(0x678)][_0xe5069(0x1fc)]=function(){const _0x84897=_0xe5069;if(!$dataMap)return;if(!$dataMap['note'])return;const _0x28d7a5=$dataMap[_0x84897(0x3b4)];if(_0x28d7a5[_0x84897(0x506)](/<MAP LOAD COMMON EVENT(?:|S):[ ](.*)>/i)){const _0x27a23f=String(RegExp['$1'])[_0x84897(0x395)](',')[_0x84897(0x45d)](_0x295ff0=>Number(_0x295ff0));for(const _0x48a88d of _0x27a23f){$gameTemp[_0x84897(0x65b)](_0x48a88d);}}},Game_CommonEvent[_0xe5069(0x678)][_0xe5069(0x19f)]=function(){const _0x514f5c=_0xe5069,_0x903b62=this['event']();return this[_0x514f5c(0x4bc)]()&&_0x903b62[_0x514f5c(0x456)]>=0x1&&DataManager['isAdvancedSwitch'](_0x903b62[_0x514f5c(0x3ee)]);},Game_CommonEvent[_0xe5069(0x678)]['hasCPCs']=function(){const _0x5ba0c4=_0xe5069;return VisuMZ[_0x5ba0c4(0x5f4)][_0x5ba0c4(0x466)][_0x5ba0c4(0x2e3)][_0x5ba0c4(0x22a)](this[_0x5ba0c4(0x5ff)]);},VisuMZ[_0xe5069(0x5f4)][_0xe5069(0x53b)]=Game_CommonEvent['prototype']['isActive'],Game_CommonEvent[_0xe5069(0x678)][_0xe5069(0x4bc)]=function(){const _0x39a865=_0xe5069;if(VisuMZ['EventsMoveCore'][_0x39a865(0x53b)]['call'](this))return!![];else{const _0x2de1a5=this[_0x39a865(0x54b)]();return VisuMZ[_0x39a865(0x5f4)][_0x39a865(0x466)][_0x39a865(0x43a)](this[_0x39a865(0x54b)]()[_0x39a865(0x52d)],this['_commonEventId'],_0x2de1a5);}},VisuMZ[_0xe5069(0x5f4)][_0xe5069(0x439)]=Game_Map[_0xe5069(0x678)][_0xe5069(0x235)],Game_Map['prototype'][_0xe5069(0x235)]=function(){const _0x3af5be=_0xe5069,_0x334e1d=VisuMZ[_0x3af5be(0x5f4)][_0x3af5be(0x439)][_0x3af5be(0x3ae)](this),_0xb7d589=VisuMZ[_0x3af5be(0x5f4)][_0x3af5be(0x466)][_0x3af5be(0x2e3)][_0x3af5be(0x45d)](_0x2233cf=>$dataCommonEvents[_0x2233cf]);return _0x334e1d[_0x3af5be(0x26e)](_0xb7d589)[_0x3af5be(0x617)]((_0x25a5d0,_0x2cb91e,_0x5f34e2)=>_0x5f34e2[_0x3af5be(0x497)](_0x25a5d0)===_0x2cb91e);},Game_CharacterBase[_0xe5069(0x57f)]=VisuMZ[_0xe5069(0x5f4)][_0xe5069(0x553)][_0xe5069(0x595)]['DashOnLadder']??![],VisuMZ[_0xe5069(0x5f4)][_0xe5069(0x23c)]=Game_CharacterBase[_0xe5069(0x678)]['initMembers'],Game_CharacterBase[_0xe5069(0x678)][_0xe5069(0x316)]=function(){const _0x1efe82=_0xe5069;VisuMZ[_0x1efe82(0x5f4)][_0x1efe82(0x23c)][_0x1efe82(0x3ae)](this),this[_0x1efe82(0x495)]();},Game_CharacterBase[_0xe5069(0x678)][_0xe5069(0x495)]=function(){const _0x503b2d=_0xe5069;this['_scaleBaseX']=0x1,this[_0x503b2d(0x3ab)]=0x1,this[_0x503b2d(0x5fa)]=![],this[_0x503b2d(0x36f)](),this[_0x503b2d(0x1b3)](),this[_0x503b2d(0x3cd)](),this[_0x503b2d(0x2c8)]();},VisuMZ[_0xe5069(0x5f4)][_0xe5069(0x45c)]=Game_CharacterBase[_0xe5069(0x678)]['opacity'],Game_CharacterBase[_0xe5069(0x678)][_0xe5069(0x5d7)]=function(){const _0x4196b1=_0xe5069;let _0x1c02ad=VisuMZ[_0x4196b1(0x5f4)][_0x4196b1(0x45c)]['call'](this);return _0x1c02ad=this[_0x4196b1(0x656)](_0x1c02ad),_0x1c02ad;},Game_CharacterBase[_0xe5069(0x678)][_0xe5069(0x656)]=function(_0x29ca62){return _0x29ca62;},Game_CharacterBase[_0xe5069(0x678)]['isSpriteVS8dir']=function(){const _0x18fc28=_0xe5069;if(this[_0x18fc28(0x4eb)]===Game_Player&&this[_0x18fc28(0x5f1)]())return this[_0x18fc28(0x4b0)]()[_0x18fc28(0x224)]()['match'](/\[VS8\]/i);else return Imported[_0x18fc28(0x266)]&&this[_0x18fc28(0x1c7)]()?!![]:this[_0x18fc28(0x224)]()['match'](/\[VS8\]/i);},VisuMZ[_0xe5069(0x5f4)][_0xe5069(0x365)]=Game_CharacterBase[_0xe5069(0x678)][_0xe5069(0x4ed)],Game_CharacterBase[_0xe5069(0x678)]['direction']=function(){const _0x538aa3=_0xe5069;if(!$dataMap)return this[_0x538aa3(0x42b)]||0x2;if(this['isOnLadder']()&&!this[_0x538aa3(0x1d7)]()&&this[_0x538aa3(0x5d8)]())return this[_0x538aa3(0x66e)]();else{if(this[_0x538aa3(0x248)]()&&!this[_0x538aa3(0x1d7)]())return 0x8;else return this[_0x538aa3(0x631)]()&&this[_0x538aa3(0x5d8)]()?this[_0x538aa3(0x398)]():VisuMZ[_0x538aa3(0x5f4)]['Game_CharacterBase_direction']['call'](this);}},VisuMZ[_0xe5069(0x5f4)]['Game_CharacterBase_setDirection']=Game_CharacterBase[_0xe5069(0x678)][_0xe5069(0x3d5)],Game_CharacterBase[_0xe5069(0x678)][_0xe5069(0x3d5)]=function(_0x2a834a){const _0x1df56d=_0xe5069;if(!this[_0x1df56d(0x5d8)]())_0x2a834a=this[_0x1df56d(0x3f1)](_0x2a834a);VisuMZ[_0x1df56d(0x5f4)][_0x1df56d(0x414)][_0x1df56d(0x3ae)](this,_0x2a834a),this[_0x1df56d(0x5f9)]();},Game_CharacterBase[_0xe5069(0x678)]['correctFacingDirection']=function(_0x41030e){const _0x228802=_0xe5069;if(_0x41030e===0x1)return this[_0x228802(0x2e9)](this['_x'],this['_y'],0x4)?0x4:0x2;if(_0x41030e===0x3)return this[_0x228802(0x2e9)](this['_x'],this['_y'],0x6)?0x6:0x2;if(_0x41030e===0x7)return this[_0x228802(0x2e9)](this['_x'],this['_y'],0x4)?0x4:0x8;if(_0x41030e===0x9)return this['canPass'](this['_x'],this['_y'],0x6)?0x6:0x8;return _0x41030e;},Game_CharacterBase[_0xe5069(0x678)]['isDiagonalDirection']=function(_0x2cfb89){const _0x180c77=_0xe5069;return[0x1,0x3,0x5,0x7,0x9][_0x180c77(0x22a)](_0x2cfb89);},Game_CharacterBase[_0xe5069(0x678)]['lastMovedDirection']=function(){const _0x3ff2f4=_0xe5069;return this[_0x3ff2f4(0x4cc)]||0x0;},VisuMZ[_0xe5069(0x5f4)][_0xe5069(0x5a4)]=Game_CharacterBase['prototype'][_0xe5069(0x392)],Game_CharacterBase['prototype'][_0xe5069(0x392)]=function(_0x4aced9){const _0x2e6650=_0xe5069;this[_0x2e6650(0x4cc)]=_0x4aced9,VisuMZ[_0x2e6650(0x5f4)]['Game_CharacterBase_moveStraight']['call'](this,_0x4aced9);},Game_CharacterBase[_0xe5069(0x678)]['executeMoveDir8']=function(_0x2674e0){const _0x27b894=_0xe5069;if(!this[_0x27b894(0x3fd)](_0x2674e0))return this[_0x27b894(0x392)](_0x2674e0);let _0x580358=0x0,_0x1a4966=0x0;switch(_0x2674e0){case 0x1:_0x580358=0x4,_0x1a4966=0x2;break;case 0x3:_0x580358=0x6,_0x1a4966=0x2;break;case 0x7:_0x580358=0x4,_0x1a4966=0x8;break;case 0x9:_0x580358=0x6,_0x1a4966=0x8;break;}if(VisuMZ[_0x27b894(0x5f4)][_0x27b894(0x553)]['Movement'][_0x27b894(0x332)]){if(!this[_0x27b894(0x2e9)](this['_x'],this['_y'],_0x580358))return this[_0x27b894(0x392)](_0x1a4966);if(!this['canPass'](this['_x'],this['_y'],_0x1a4966))return this[_0x27b894(0x392)](_0x580358);if(!this[_0x27b894(0x5c4)](this['_x'],this['_y'],_0x580358,_0x1a4966)){let _0x5251d5=VisuMZ['EventsMoveCore'][_0x27b894(0x553)][_0x27b894(0x595)]['FavorHorz']?_0x580358:_0x1a4966;return this[_0x27b894(0x392)](_0x5251d5);}}this[_0x27b894(0x4cc)]=_0x2674e0,this['moveDiagonally'](_0x580358,_0x1a4966);},VisuMZ[_0xe5069(0x5f4)][_0xe5069(0x5fc)]=Game_CharacterBase[_0xe5069(0x678)]['realMoveSpeed'],Game_CharacterBase[_0xe5069(0x678)][_0xe5069(0x3c6)]=function(){const _0xf81d51=_0xe5069;let _0x2d6e3d=this[_0xf81d51(0x514)];return this[_0xf81d51(0x3f0)]()&&(_0x2d6e3d+=this['dashSpeedModifier']()),this[_0xf81d51(0x5ca)](_0x2d6e3d);},Game_CharacterBase[_0xe5069(0x678)]['dashSpeedModifier']=function(){const _0x3759b0=_0xe5069,_0x8a06b7=VisuMZ[_0x3759b0(0x5f4)][_0x3759b0(0x553)][_0x3759b0(0x595)];return _0x8a06b7[_0x3759b0(0x232)]!==undefined?_0x8a06b7[_0x3759b0(0x232)]:VisuMZ[_0x3759b0(0x5f4)][_0x3759b0(0x5fc)]['call'](this)-this['_moveSpeed'];},Game_CharacterBase[_0xe5069(0x678)]['adjustDir8MovementSpeed']=function(_0x17eff2){const _0x4e87f0=_0xe5069,_0x54803b=VisuMZ[_0x4e87f0(0x5f4)][_0x4e87f0(0x553)]['Movement'];if(!_0x54803b['SlowerSpeed'])return _0x17eff2;return[0x1,0x3,0x7,0x9][_0x4e87f0(0x22a)](this[_0x4e87f0(0x4cc)])&&(_0x17eff2*=_0x54803b[_0x4e87f0(0x52a)]||0.01),_0x17eff2;},VisuMZ[_0xe5069(0x5f4)]['Game_CharacterBase_isDashing']=Game_CharacterBase[_0xe5069(0x678)]['isDashing'],Game_CharacterBase[_0xe5069(0x678)][_0xe5069(0x3f0)]=function(){const _0x3fa307=_0xe5069;if(!Game_CharacterBase[_0x3fa307(0x57f)]&&this[_0x3fa307(0x248)]())return![];if(this[_0x3fa307(0x19e)])return!![];return VisuMZ['EventsMoveCore'][_0x3fa307(0x4ce)][_0x3fa307(0x3ae)](this);},Game_CharacterBase[_0xe5069(0x678)][_0xe5069(0x3e9)]=function(){const _0x330771=_0xe5069;return this[_0x330771(0x3f0)]()&&this[_0x330771(0x335)]===0x0;},VisuMZ['EventsMoveCore'][_0xe5069(0x4f5)]=Game_CharacterBase[_0xe5069(0x678)]['pattern'],Game_CharacterBase[_0xe5069(0x678)]['pattern']=function(){const _0x3c3f3e=_0xe5069;return this[_0x3c3f3e(0x631)]()?this['getPosingCharacterPattern']():VisuMZ[_0x3c3f3e(0x5f4)][_0x3c3f3e(0x4f5)][_0x3c3f3e(0x3ae)](this);},VisuMZ[_0xe5069(0x5f4)][_0xe5069(0x33c)]=Game_CharacterBase['prototype'][_0xe5069(0x3c7)],Game_CharacterBase['prototype'][_0xe5069(0x3c7)]=function(){const _0x31d328=_0xe5069;VisuMZ[_0x31d328(0x5f4)][_0x31d328(0x33c)][_0x31d328(0x3ae)](this),this[_0x31d328(0x36f)]();},VisuMZ['EventsMoveCore'][_0xe5069(0x1a2)]=Game_CharacterBase[_0xe5069(0x678)]['characterIndex'],Game_CharacterBase[_0xe5069(0x678)]['characterIndex']=function(){const _0x1a849e=_0xe5069;if(this['isSpriteVS8dir']())return this[_0x1a849e(0x2d1)]();return VisuMZ['EventsMoveCore']['Game_CharacterBase_characterIndex'][_0x1a849e(0x3ae)](this);},Game_CharacterBase['prototype'][_0xe5069(0x2d1)]=function(){const _0x392177=_0xe5069,_0x42e0f9=this['direction']();if(this[_0x392177(0x1d7)]()){if([0x2,0x4,0x6,0x8]['includes'](_0x42e0f9))return 0x4;if([0x1,0x3,0x7,0x9]['includes'](_0x42e0f9))return 0x5;}else{if(this[_0x392177(0x248)]())return 0x6;else{if(this[_0x392177(0x631)]())return this[_0x392177(0x468)]();else{if(this['_forceCarrying']){if([0x2,0x4,0x6,0x8]['includes'](_0x42e0f9))return 0x4;if([0x1,0x3,0x7,0x9]['includes'](_0x42e0f9))return 0x5;}else{if(this[_0x392177(0x5c9)]()&&this[_0x392177(0x31c)]()){if([0x2,0x4,0x6,0x8][_0x392177(0x22a)](_0x42e0f9))return 0x4;if([0x1,0x3,0x7,0x9]['includes'](_0x42e0f9))return 0x5;}else{if(this[_0x392177(0x3e9)]()){if([0x2,0x4,0x6,0x8][_0x392177(0x22a)](_0x42e0f9))return 0x2;if([0x1,0x3,0x7,0x9][_0x392177(0x22a)](_0x42e0f9))return 0x3;}else{if([0x2,0x4,0x6,0x8][_0x392177(0x22a)](_0x42e0f9))return 0x0;if([0x1,0x3,0x7,0x9][_0x392177(0x22a)](_0x42e0f9))return 0x1;}}}}}}},Game_CharacterBase['prototype']['useCarryPoseForIcons']=function(){const _0x35b797=_0xe5069;return VisuMZ[_0x35b797(0x5f4)]['Settings']['VS8'][_0x35b797(0x581)];},Game_CharacterBase[_0xe5069(0x678)][_0xe5069(0x5f0)]=function(){const _0x260953=_0xe5069;return this[_0x260953(0x248)]()&&this[_0x260953(0x505)]()===VisuMZ[_0x260953(0x5f4)][_0x260953(0x553)][_0x260953(0x614)][_0x260953(0x4f9)];},Game_CharacterBase[_0xe5069(0x678)][_0xe5069(0x66e)]=function(){return this['isOnRope']()?0x4:0x2;},VisuMZ['EventsMoveCore'][_0xe5069(0x1b8)]=Game_CharacterBase[_0xe5069(0x678)][_0xe5069(0x59e)],Game_CharacterBase[_0xe5069(0x678)][_0xe5069(0x59e)]=function(){const _0x55c689=_0xe5069;this[_0x55c689(0x680)](),VisuMZ['EventsMoveCore'][_0x55c689(0x1b8)][_0x55c689(0x3ae)](this),this['updatePose']();},Game_CharacterBase['prototype'][_0xe5069(0x680)]=function(){const _0x1c22dc=_0xe5069;this[_0x1c22dc(0x2ba)]=this['_scaleBaseX']??0x1,this[_0x1c22dc(0x2b8)]=this[_0x1c22dc(0x3ab)]??0x1;},VisuMZ[_0xe5069(0x5f4)][_0xe5069(0x28c)]=Game_CharacterBase['prototype'][_0xe5069(0x1a9)],Game_CharacterBase[_0xe5069(0x678)][_0xe5069(0x1a9)]=function(){const _0x1c32cf=_0xe5069;let _0x2ccaf1=VisuMZ['EventsMoveCore'][_0x1c32cf(0x28c)][_0x1c32cf(0x3ae)](this);return this[_0x1c32cf(0x2b8)]!==undefined&&(_0x2ccaf1/=Math[_0x1c32cf(0x314)](this[_0x1c32cf(0x2b8)],0.00001)),Math[_0x1c32cf(0x485)](_0x2ccaf1);},Game_CharacterBase[_0xe5069(0x678)][_0xe5069(0x3f2)]=function(){const _0xbe85fb=_0xe5069;this[_0xbe85fb(0x1d2)]=this[_0xbe85fb(0x1d2)]||0x0;if(this[_0xbe85fb(0x1d2)]>0x0){this[_0xbe85fb(0x1d2)]--;if(this['_poseDuration']<=0x0&&this['_pose']!==_0xbe85fb(0x4ba))this[_0xbe85fb(0x36f)]();}},VisuMZ[_0xe5069(0x5f4)][_0xe5069(0x2b7)]=Game_CharacterBase[_0xe5069(0x678)][_0xe5069(0x2d8)],Game_CharacterBase[_0xe5069(0x678)]['moveDiagonally']=function(_0x8f7d4a,_0x309a8a){const _0x27713e=_0xe5069;VisuMZ['EventsMoveCore'][_0x27713e(0x2b7)][_0x27713e(0x3ae)](this,_0x8f7d4a,_0x309a8a);if(this[_0x27713e(0x5d8)]())this['setDiagonalDirection'](_0x8f7d4a,_0x309a8a);},Game_CharacterBase[_0xe5069(0x678)][_0xe5069(0x5c1)]=function(_0x16e962,_0xbbde97){const _0x51e9b0=_0xe5069;if(_0x16e962===0x4&&_0xbbde97===0x2)this['setDirection'](0x1);if(_0x16e962===0x6&&_0xbbde97===0x2)this[_0x51e9b0(0x3d5)](0x3);if(_0x16e962===0x4&&_0xbbde97===0x8)this[_0x51e9b0(0x3d5)](0x7);if(_0x16e962===0x6&&_0xbbde97===0x8)this['setDirection'](0x9);},VisuMZ[_0xe5069(0x5f4)]['Game_CharacterBase_hasStepAnime']=Game_CharacterBase['prototype'][_0xe5069(0x457)],Game_CharacterBase[_0xe5069(0x678)][_0xe5069(0x457)]=function(){const _0x35ef03=_0xe5069;if(this['isPosing']()&&this['getPose']()===_0x35ef03(0x4ba))return!![];return VisuMZ['EventsMoveCore'][_0x35ef03(0x25d)][_0x35ef03(0x3ae)](this);},Game_CharacterBase[_0xe5069(0x678)][_0xe5069(0x567)]=function(_0x1e7d01,_0x1ed858){const _0x2d0a3c=_0xe5069;if(_0x1e7d01[_0x2d0a3c(0x506)](/Z/i))_0x1e7d01=_0x2d0a3c(0x4ba);if(_0x1e7d01[_0x2d0a3c(0x506)](/SLEEP/i))_0x1e7d01=_0x2d0a3c(0x4ba);this['isSpriteVS8dir']()&&(this[_0x2d0a3c(0x425)]=_0x1e7d01['toUpperCase']()['trim'](),this['_poseDuration']=_0x1ed858||Infinity);},Game_CharacterBase['prototype'][_0xe5069(0x5de)]=function(){const _0x46b3f3=_0xe5069;return this[_0x46b3f3(0x5d8)]()?(this[_0x46b3f3(0x425)]||'')['toUpperCase']()['trim']():''[_0x46b3f3(0x4f8)]()[_0x46b3f3(0x3d9)]();},Game_CharacterBase[_0xe5069(0x678)]['setBalloonPose']=function(_0x16a4ab,_0x58f2ff){const _0xfa87a3=_0xe5069;if(this['isSpriteVS8dir']()){const _0x3cc873=['',_0xfa87a3(0x39d),_0xfa87a3(0x544),_0xfa87a3(0x4d1),'HEART',_0xfa87a3(0x2dd),_0xfa87a3(0x478),_0xfa87a3(0x396),_0xfa87a3(0x199),'LIGHT\x20BULB',_0xfa87a3(0x4ba),'','','','',''][_0x16a4ab];this[_0xfa87a3(0x567)](_0x3cc873,_0x58f2ff);}},Game_CharacterBase[_0xe5069(0x678)][_0xe5069(0x36f)]=function(){const _0x3a89f0=_0xe5069;this[_0x3a89f0(0x425)]='',this['_poseDuration']=0x0;},Game_CharacterBase[_0xe5069(0x678)][_0xe5069(0x631)]=function(){const _0xa27b1f=_0xe5069;return this[_0xa27b1f(0x5d8)]()&&!!this[_0xa27b1f(0x425)];},Game_CharacterBase[_0xe5069(0x678)][_0xe5069(0x468)]=function(){const _0x332cde=_0xe5069,_0x323be0=this[_0x332cde(0x425)][_0x332cde(0x4f8)]();switch(this[_0x332cde(0x425)][_0x332cde(0x4f8)]()[_0x332cde(0x3d9)]()){case _0x332cde(0x593):case'HMPH':case _0x332cde(0x4e5):case _0x332cde(0x242):case'KNEEL':case'COLLAPSE':return 0x6;break;default:return 0x7;break;}},Game_CharacterBase[_0xe5069(0x678)][_0xe5069(0x398)]=function(){const _0x518119=_0xe5069;switch(this[_0x518119(0x425)]['toUpperCase']()){case _0x518119(0x39d):case _0x518119(0x544):case _0x518119(0x4d1):case'!':case'?':return 0x2;break;case _0x518119(0x2e4):case _0x518119(0x2dd):case _0x518119(0x478):return 0x4;break;case'ITEM':case _0x518119(0x2bb):case _0x518119(0x4e5):case _0x518119(0x396):case _0x518119(0x199):case'LIGHT\x20BULB':return 0x6;break;case _0x518119(0x242):case'KNEEL':case _0x518119(0x4e4):case'ZZZ':case'SLEEP':return 0x8;break;default:return VisuMZ[_0x518119(0x5f4)][_0x518119(0x414)][_0x518119(0x3ae)](this);break;}},Game_CharacterBase['prototype'][_0xe5069(0x33b)]=function(){const _0x29e049=_0xe5069;switch(this[_0x29e049(0x425)][_0x29e049(0x4f8)]()){case _0x29e049(0x593):case _0x29e049(0x242):case'EXCLAMATION':case'!':case _0x29e049(0x2e4):case _0x29e049(0x396):return 0x0;break;case'HMPH':case'KNEEL':case _0x29e049(0x544):case'?':case _0x29e049(0x2dd):case _0x29e049(0x199):return 0x1;break;case _0x29e049(0x4e5):case _0x29e049(0x4e4):case'MUSIC\x20NOTE':case _0x29e049(0x478):case'LIGHT\x20BULB':return 0x2;break;default:return VisuMZ['EventsMoveCore']['Game_CharacterBase_pattern'][_0x29e049(0x3ae)](this);break;}},Game_CharacterBase[_0xe5069(0x678)]['forceCarrying']=function(){const _0x34078e=_0xe5069;this[_0x34078e(0x2ec)]=!![];},Game_CharacterBase[_0xe5069(0x678)]['clearCarrying']=function(){const _0x25c4d0=_0xe5069;this[_0x25c4d0(0x2ec)]=![];},Game_CharacterBase['prototype'][_0xe5069(0x3c0)]=function(){const _0x39a05b=_0xe5069;this[_0x39a05b(0x19e)]=!![];},Game_CharacterBase[_0xe5069(0x678)]['clearDashing']=function(){const _0x301e73=_0xe5069;this[_0x301e73(0x19e)]=![];},Game_CharacterBase[_0xe5069(0x678)][_0xe5069(0x4fe)]=function(){const _0x37034d=_0xe5069;if(this['isTile']())return![];if(this[_0x37034d(0x31e)])return![];if(this['_characterName']==='')return![];if(this[_0x37034d(0x4eb)]===Game_Vehicle)return![];if(this[_0x37034d(0x1fa)]())return![];return!![];},Game_CharacterBase[_0xe5069(0x678)]['isShadowShrink']=function(){const _0x484f14=_0xe5069;if(this[_0x484f14(0x248)]())return!![];if(this['constructor']===Game_Player&&this['isInVehicle']())return!![];return![];},Game_CharacterBase[_0xe5069(0x678)][_0xe5069(0x48a)]=function(){const _0x11823a=_0xe5069;return VisuMZ[_0x11823a(0x5f4)]['Settings'][_0x11823a(0x595)][_0x11823a(0x4d0)];},Game_CharacterBase[_0xe5069(0x678)][_0xe5069(0x5c2)]=function(){const _0x34dccc=_0xe5069;return this[_0x34dccc(0x202)]();},Game_CharacterBase['prototype']['shadowY']=function(){const _0x70f05=_0xe5069,_0x493a60=$gameMap[_0x70f05(0x470)]();return Math[_0x70f05(0x485)](this['scrolledY']()*_0x493a60+_0x493a60);},Game_CharacterBase['DIAGONAL_PATHFINDING_EVENT_LIMIT']=0x64,Game_CharacterBase[_0xe5069(0x678)]['getDiagonalDestination']=function(_0x424c93,_0x37f937){const _0x43412f=_0xe5069;if(TouchInput[_0x43412f(0x411)]())return![];if(!$gameMap[_0x43412f(0x43c)]())return![];if($gameMap[_0x43412f(0x2d2)](_0x424c93,_0x37f937)['length']>0x0)return![];if(!$gameMap['isPassableByAnyDirection'](_0x424c93,_0x37f937))return![];const _0x318629=$gameMap[_0x43412f(0x50d)][_0x43412f(0x243)];if(_0x318629>=Game_CharacterBase[_0x43412f(0x571)])return![];return!![];},Game_Character['prototype'][_0xe5069(0x662)]=function(_0x969361,_0x58bb19){const _0x40de86=_0xe5069;let _0x5bae7c=this[_0x40de86(0x5f6)](_0x969361,_0x58bb19);if(!this['getDiagonalDestination'](_0x969361,_0x58bb19))return _0x5bae7c;if(this[_0x40de86(0x1c4)](_0x969361,_0x58bb19))return _0x5bae7c;const _0x52ae56=_0x5bae7c;if(_0x5bae7c===0x2){if(_0x969361>this['x']&&this[_0x40de86(0x2e9)](this['x'],this['y'],0x6))_0x5bae7c=0x3;if(_0x969361<this['x']&&this[_0x40de86(0x2e9)](this['x'],this['y'],0x4))_0x5bae7c=0x1;}else{if(_0x5bae7c===0x4){if(_0x58bb19>this['y']&&this[_0x40de86(0x2e9)](this['x'],this['y'],0x4))_0x5bae7c=0x1;if(_0x58bb19<this['y']&&this[_0x40de86(0x2e9)](this['x'],this['y'],0x6))_0x5bae7c=0x7;}else{if(_0x5bae7c===0x6){if(_0x58bb19>this['y']&&this[_0x40de86(0x2e9)](this['x'],this['y'],0x4))_0x5bae7c=0x3;if(_0x58bb19<this['y']&&this[_0x40de86(0x2e9)](this['x'],this['y'],0x6))_0x5bae7c=0x9;}else{if(_0x5bae7c===0x8){if(_0x969361>this['x']&&this[_0x40de86(0x2e9)](this['x'],this['y'],0x6))_0x5bae7c=0x9;if(_0x969361<this['x']&&this[_0x40de86(0x2e9)](this['x'],this['y'],0x4))_0x5bae7c=0x7;}}}}if(!this[_0x40de86(0x2e9)](this['x'],this['y'],_0x5bae7c))return _0x52ae56;const _0x183803=$gameMap[_0x40de86(0x63a)](this['x'],_0x5bae7c),_0x39f196=$gameMap[_0x40de86(0x19b)](this['y'],_0x5bae7c);if(this['isCollidedWithEvents'](_0x183803,_0x39f196))_0x5bae7c=_0x52ae56;return _0x5bae7c;},VisuMZ[_0xe5069(0x5f4)]['Game_CharacterBase_canPass']=Game_CharacterBase['prototype'][_0xe5069(0x2e9)],Game_CharacterBase[_0xe5069(0x678)]['canPass']=function(_0x1e31ca,_0x3a2042,_0x223f85){const _0x2f93e5=_0xe5069;return this[_0x2f93e5(0x341)]===_0x2f93e5(0x47b)?this['vehicle']()[_0x2f93e5(0x2d3)](_0x1e31ca,_0x3a2042,_0x223f85):VisuMZ[_0x2f93e5(0x5f4)][_0x2f93e5(0x289)][_0x2f93e5(0x3ae)](this,_0x1e31ca,_0x3a2042,_0x223f85);},Game_CharacterBase[_0xe5069(0x678)][_0xe5069(0x3cd)]=function(){const _0x216045=_0xe5069;this['_spriteOffsetX']=0x0,this[_0x216045(0x2a7)]=0x0;},VisuMZ['EventsMoveCore'][_0xe5069(0x56c)]=Game_CharacterBase['prototype']['screenX'],Game_CharacterBase[_0xe5069(0x678)]['screenX']=function(){const _0x18ec21=_0xe5069;return VisuMZ['EventsMoveCore'][_0x18ec21(0x56c)][_0x18ec21(0x3ae)](this)+(this[_0x18ec21(0x489)]||0x0);},VisuMZ[_0xe5069(0x5f4)][_0xe5069(0x51a)]=Game_CharacterBase['prototype'][_0xe5069(0x2f7)],Game_CharacterBase['prototype'][_0xe5069(0x2f7)]=function(){const _0x48bd77=_0xe5069;return VisuMZ[_0x48bd77(0x5f4)][_0x48bd77(0x51a)][_0x48bd77(0x3ae)](this)+(this[_0x48bd77(0x2a7)]||0x0);},Game_CharacterBase['DEFAULT_SHIFT_Y']=VisuMZ['EventsMoveCore']['Settings']['Movement'][_0xe5069(0x309)]??-0x6,Game_CharacterBase['prototype'][_0xe5069(0x2ef)]=function(){const _0x5429fd=_0xe5069;let _0x5e7037=this[_0x5429fd(0x23e)]()?0x0:-Game_CharacterBase[_0x5429fd(0x547)];return this['_scaleY']&&(_0x5e7037*=this[_0x5429fd(0x2b8)]),Math[_0x5429fd(0x471)](_0x5e7037);},Game_CharacterBase['prototype']['clearStepPattern']=function(){const _0x4415d9=_0xe5069;this[_0x4415d9(0x663)]='';},VisuMZ[_0xe5069(0x5f4)][_0xe5069(0x4b1)]=Game_CharacterBase[_0xe5069(0x678)][_0xe5069(0x3f7)],Game_CharacterBase[_0xe5069(0x678)][_0xe5069(0x3f7)]=function(){const _0x2cb62c=_0xe5069;if(this[_0x2cb62c(0x5fa)])return;if(this[_0x2cb62c(0x1bc)]())return;VisuMZ[_0x2cb62c(0x5f4)][_0x2cb62c(0x4b1)][_0x2cb62c(0x3ae)](this);},Game_CharacterBase['prototype'][_0xe5069(0x1bc)]=function(){const _0x13945f=_0xe5069;if(!this['hasStepAnime']()&&this[_0x13945f(0x335)]>0x0)return![];switch(String(this[_0x13945f(0x663)])[_0x13945f(0x4f8)]()[_0x13945f(0x3d9)]()){case _0x13945f(0x609):this['_pattern']+=0x1;if(this[_0x13945f(0x237)]>0x2)this[_0x13945f(0x557)](0x0);break;case _0x13945f(0x1db):this['_pattern']-=0x1;if(this[_0x13945f(0x237)]<0x0)this[_0x13945f(0x557)](0x2);break;case _0x13945f(0x318):case _0x13945f(0x252):this[_0x13945f(0x4c4)]();break;case _0x13945f(0x263):case _0x13945f(0x415):case'SPIN\x20ANTICLOCKWISE':case _0x13945f(0x43b):this[_0x13945f(0x587)]();break;default:return![];}return!![];},Game_CharacterBase['prototype'][_0xe5069(0x642)]=function(){return $gameSystem['getEventIconData'](this);},Game_CharacterBase[_0xe5069(0x678)]['hasEventIcon']=function(){const _0xbb1765=_0xe5069,_0x3b4835=this[_0xbb1765(0x642)]();if(!_0x3b4835)return![];return _0x3b4835[_0xbb1765(0x233)]>0x0;},Game_CharacterBase['prototype'][_0xe5069(0x1e7)]=function(){const _0x2856f9=_0xe5069,_0x1fc39=this['direction']();return $gameMap[_0x2856f9(0x63a)](this['x'],_0x1fc39);},Game_CharacterBase[_0xe5069(0x678)][_0xe5069(0x3e2)]=function(){const _0x41abe1=_0xe5069,_0x2a40da=this[_0x41abe1(0x4ed)]();return $gameMap['roundYWithDirection'](this['y'],_0x2a40da);},Game_CharacterBase['prototype'][_0xe5069(0x3eb)]=function(){const _0x51588c=_0xe5069,_0x54e50e=this[_0x51588c(0x2c6)](this[_0x51588c(0x4ed)]());return $gameMap['roundXWithDirection'](this['x'],_0x54e50e);},Game_CharacterBase[_0xe5069(0x678)]['backY']=function(){const _0x520053=_0xe5069,_0x45cc4d=this[_0x520053(0x2c6)](this[_0x520053(0x4ed)]());return $gameMap[_0x520053(0x19b)](this['y'],_0x45cc4d);},Game_CharacterBase[_0xe5069(0x678)][_0xe5069(0x2b9)]=function(){const _0x144ded=_0xe5069,_0x548cbb=[0x0,0x3,0x6,0x9,0x2,0x5,0x8,0x1,0x4,0x7][this[_0x144ded(0x4ed)]()];return $gameMap[_0x144ded(0x63a)](this['x'],_0x548cbb);},Game_CharacterBase[_0xe5069(0x678)][_0xe5069(0x261)]=function(){const _0x114041=_0xe5069,_0x4d2edd=[0x0,0x3,0x6,0x9,0x2,0x5,0x8,0x1,0x4,0x7][this[_0x114041(0x4ed)]()];return $gameMap[_0x114041(0x19b)](this['y'],_0x4d2edd);},Game_CharacterBase[_0xe5069(0x678)]['cwX']=function(){const _0x3924f8=_0xe5069,_0x1f6b4f=[0x0,0x7,0x4,0x1,0x8,0x5,0x2,0x9,0x6,0x3][this[_0x3924f8(0x4ed)]()];return $gameMap[_0x3924f8(0x63a)](this['x'],_0x1f6b4f);},Game_CharacterBase[_0xe5069(0x678)][_0xe5069(0x19d)]=function(){const _0x199d16=_0xe5069,_0x10ba25=[0x0,0x7,0x4,0x1,0x8,0x5,0x2,0x9,0x6,0x3][this[_0x199d16(0x4ed)]()];return $gameMap[_0x199d16(0x19b)](this['y'],_0x10ba25);},VisuMZ[_0xe5069(0x5f4)][_0xe5069(0x661)]=Game_Character[_0xe5069(0x678)][_0xe5069(0x453)],Game_Character[_0xe5069(0x678)]['setMoveRoute']=function(_0x36fd98){const _0x842038=_0xe5069;route=JsonEx[_0x842038(0x293)](_0x36fd98),VisuMZ[_0x842038(0x5f4)]['Game_Character_setMoveRoute'][_0x842038(0x3ae)](this,route);},VisuMZ[_0xe5069(0x5f4)][_0xe5069(0x5bb)]=Game_Character[_0xe5069(0x678)]['forceMoveRoute'],Game_Character[_0xe5069(0x678)][_0xe5069(0x25c)]=function(_0xc4d7){const _0x3a23c0=_0xe5069;route=JsonEx[_0x3a23c0(0x293)](_0xc4d7),VisuMZ[_0x3a23c0(0x5f4)]['Game_Character_forceMoveRoute'][_0x3a23c0(0x3ae)](this,route);},VisuMZ[_0xe5069(0x5f4)][_0xe5069(0x2b5)]=Game_Character['prototype'][_0xe5069(0x623)],Game_Character[_0xe5069(0x678)][_0xe5069(0x623)]=function(_0x4b8301){const _0x32304d=_0xe5069,_0x39e326=Game_Character,_0x453b37=_0x4b8301['parameters'];if(_0x4b8301[_0x32304d(0x4f0)]===_0x39e326[_0x32304d(0x3dc)]){let _0x470466=_0x4b8301['parameters'][0x0];_0x470466=this['convertVariableValuesInScriptCall'](_0x470466),_0x470466=this[_0x32304d(0x272)](_0x470466),this[_0x32304d(0x44f)](_0x4b8301,_0x470466);}else VisuMZ[_0x32304d(0x5f4)]['Game_Character_processMoveCommand'][_0x32304d(0x3ae)](this,_0x4b8301);},Game_Character[_0xe5069(0x678)][_0xe5069(0x2a8)]=function(_0x5aac62){const _0x28028c=_0xe5069,_0x5214fb=/\$gameVariables\.value\((\d+)\)/gi,_0x6fdb93=/\\V\[(\d+)\]/gi;while(_0x5aac62[_0x28028c(0x506)](_0x5214fb)){_0x5aac62=_0x5aac62[_0x28028c(0x1e6)](_0x5214fb,(_0x321d64,_0x2bd7d2)=>$gameVariables[_0x28028c(0x5ad)](parseInt(_0x2bd7d2)));}while(_0x5aac62[_0x28028c(0x506)](_0x6fdb93)){_0x5aac62=_0x5aac62['replace'](_0x6fdb93,(_0x1866b9,_0x1a97d3)=>$gameVariables[_0x28028c(0x5ad)](parseInt(_0x1a97d3)));}return _0x5aac62;},Game_Character[_0xe5069(0x678)][_0xe5069(0x272)]=function(_0x3a1769){const _0x2cab7f=_0xe5069,_0x40b87a=/\\SELFVAR\[(\d+)\]/gi;while(_0x3a1769[_0x2cab7f(0x506)](_0x40b87a)){_0x3a1769=_0x3a1769[_0x2cab7f(0x1e6)](_0x40b87a,(_0x262225,_0x581cb1)=>getSelfVariableValue(this[_0x2cab7f(0x250)],this['_eventId'],parseInt(_0x581cb1)));}return _0x3a1769;},Game_Character[_0xe5069(0x678)][_0xe5069(0x44f)]=function(_0x31d7d4,_0x5e0908){const _0x36a806=_0xe5069;if(_0x5e0908[_0x36a806(0x506)](/ANIMATION:[ ](\d+)/i))return this[_0x36a806(0x239)](Number(RegExp['$1']));if(_0x5e0908['match'](/BALLOON:[ ](.*)/i))return this['processMoveRouteBalloon'](String(RegExp['$1']));if(_0x5e0908[_0x36a806(0x506)](/FADE IN:[ ](\d+)/i))return this[_0x36a806(0x3d1)](Number(RegExp['$1']));if(_0x5e0908[_0x36a806(0x506)](/FADE OUT:[ ](\d+)/i))return this[_0x36a806(0x3a3)](Number(RegExp['$1']));if(_0x5e0908[_0x36a806(0x506)](/FORCE (?:CARRY|CARRYING|HOLD|HOLDING):[ ](?:TRUE|ON)/i))return this[_0x36a806(0x3cc)]();if(_0x5e0908[_0x36a806(0x506)](/FORCE (?:CARRY|CARRYING|HOLD|HOLDING):[ ](?:FALSE|OFF)/i))return this[_0x36a806(0x5e7)]();if(_0x5e0908[_0x36a806(0x506)](/FORCE (?:DASH|DASHING|RUN|RUNNING):[ ](?:TRUE|ON)/i))return this[_0x36a806(0x3c0)]();if(_0x5e0908[_0x36a806(0x506)](/FORCE (?:DASH|DASHING|RUN|RUNNING):[ ](?:FALSE|OFF)/i))return this['clearDashing']();if(_0x5e0908['match'](/HUG:[ ]LEFT/i))return this[_0x36a806(0x4e3)](_0x36a806(0x234));if(_0x5e0908[_0x36a806(0x506)](/HUG:[ ]RIGHT/i))return this['processMoveRouteHugWall'](_0x36a806(0x67e));if(_0x5e0908['match'](/INDEX:[ ](\d+)/i))return this[_0x36a806(0x454)](Number(RegExp['$1']));if(_0x5e0908[_0x36a806(0x506)](/INDEX:[ ]([\+\-]\d+)/i)){const _0x19e611=this['_characterIndex']+Number(RegExp['$1']);return this[_0x36a806(0x454)](_0x19e611);}if(_0x5e0908[_0x36a806(0x506)](/JUMP FORWARD:[ ](\d+)/i))return this[_0x36a806(0x55a)](Number(RegExp['$1']));if(_0x5e0908[_0x36a806(0x506)](/JUMP TO:\s*(\d+)\s*[, ]\s*(\d+)/i))return this['processMoveRouteJumpTo'](Number(RegExp['$1']),Number(RegExp['$2']));if(_0x5e0908['match'](/JUMP TO EVENT:[ ](\d+)/i)){const _0x216f46=$gameMap['event'](Number(RegExp['$1']));return this[_0x36a806(0x498)](_0x216f46);}if(_0x5e0908[_0x36a806(0x506)](/JUMP TO PLAYER/i))return this[_0x36a806(0x498)]($gamePlayer);if(_0x5e0908['match'](/JUMP TO HOME/i)&&this['eventId']){const _0x5d1bc9=this[_0x36a806(0x5c0)],_0x4c1f8e=this[_0x36a806(0x4c0)];return this[_0x36a806(0x21c)](_0x5d1bc9,_0x4c1f8e);}if(_0x5e0908[_0x36a806(0x506)](/MOVE[ ](.*)[ ]UNTIL STOP/i)){const _0x5f26ba=String(RegExp['$1']),_0x2aac15=this[_0x36a806(0x679)](_0x5e0908);return this[_0x36a806(0x41c)](_0x5f26ba,_0x2aac15);}if(_0x5e0908[_0x36a806(0x506)](/MOVE TO:\s*(\d+)\s*[, ]\s*(\d+)/i)){const _0x25faad=Number(RegExp['$1']),_0x22ed92=Number(RegExp['$2']),_0x221862=this[_0x36a806(0x679)](_0x5e0908);return this[_0x36a806(0x3a8)](_0x25faad,_0x22ed92,_0x221862);}if(_0x5e0908[_0x36a806(0x506)](/MOVE TO EVENT:[ ](\d+)/i)){const _0x4ddeb7=$gameMap[_0x36a806(0x54b)](Number(RegExp['$1'])),_0x58a98d=this[_0x36a806(0x679)](_0x5e0908);return this[_0x36a806(0x2d0)](_0x4ddeb7,_0x58a98d);}if(_0x5e0908['match'](/MOVE TO PLAYER/i)){const _0xf5cf0c=this['checkCollisionKeywords'](_0x5e0908);return this[_0x36a806(0x2d0)]($gamePlayer,_0xf5cf0c);}if(_0x5e0908[_0x36a806(0x506)](/MOVE TO HOME/i)&&this[_0x36a806(0x21e)]){const _0x6180fe=this[_0x36a806(0x5c0)],_0x1d529b=this[_0x36a806(0x4c0)],_0x425862=this[_0x36a806(0x679)](_0x5e0908);return this[_0x36a806(0x3a8)](_0x6180fe,_0x1d529b,_0x425862);}if(_0x5e0908['match'](/MOVE LOWER LEFT:[ ](\d+)/i))return this[_0x36a806(0x638)](0x1,Number(RegExp['$1']));if(_0x5e0908[_0x36a806(0x506)](/MOVE DOWN:[ ](\d+)/i))return this[_0x36a806(0x638)](0x2,Number(RegExp['$1']));if(_0x5e0908[_0x36a806(0x506)](/MOVE LOWER RIGHT:[ ](\d+)/i))return this[_0x36a806(0x638)](0x3,Number(RegExp['$1']));if(_0x5e0908['match'](/MOVE LEFT:[ ](\d+)/i))return this[_0x36a806(0x638)](0x4,Number(RegExp['$1']));if(_0x5e0908['match'](/MOVE RIGHT:[ ](\d+)/i))return this[_0x36a806(0x638)](0x6,Number(RegExp['$1']));if(_0x5e0908[_0x36a806(0x506)](/MOVE UPPER LEFT:[ ](\d+)/i))return this[_0x36a806(0x638)](0x7,Number(RegExp['$1']));if(_0x5e0908['match'](/MOVE UP:[ ](\d+)/i))return this[_0x36a806(0x638)](0x8,Number(RegExp['$1']));if(_0x5e0908[_0x36a806(0x506)](/MOVE UPPER RIGHT:[ ](\d+)/i))return this[_0x36a806(0x638)](0x9,Number(RegExp['$1']));if(_0x5e0908['match'](/OPACITY:[ ](\d+)([%％])/i)){const _0x516c64=Math[_0x36a806(0x471)](Number(RegExp['$1'])/0x64*0xff);return this[_0x36a806(0x3ec)](_0x516c64[_0x36a806(0x4ff)](0x0,0xff));}if(_0x5e0908['match'](/OPACITY:[ ]([\+\-]\d+)([%％])/i)){const _0xe5bb4=this[_0x36a806(0x298)]+Math['round'](Number(RegExp['$1'])/0x64*0xff);return this[_0x36a806(0x3ec)](_0xe5bb4[_0x36a806(0x4ff)](0x0,0xff));}if(_0x5e0908['match'](/OPACITY:[ ]([\+\-]\d+)/i)){const _0x55442e=this['_opacity']+Number(RegExp['$1']);return this['setOpacity'](_0x55442e['clamp'](0x0,0xff));}if(_0x5e0908[_0x36a806(0x506)](/PATTERN LOCK:[ ](\d+)/i))return this[_0x36a806(0x66a)](Number(RegExp['$1']));if(_0x5e0908[_0x36a806(0x506)](/PATTERN UNLOCK/i))return this[_0x36a806(0x5fa)]=![];if(_0x5e0908[_0x36a806(0x506)](/POSE:[ ](.*)/i)){const _0x342c51=String(RegExp['$1'])[_0x36a806(0x4f8)]()[_0x36a806(0x3d9)]();return this['setPose'](_0x342c51);}if(_0x5e0908[_0x36a806(0x506)](/STEP TOWARD:\s*(\d+)\s*[, ]\s*(\d+)/i)){const _0x4526c8=Number(RegExp['$1']),_0x11001b=Number(RegExp['$2']);return this[_0x36a806(0x48b)](_0x4526c8,_0x11001b);}if(_0x5e0908[_0x36a806(0x506)](/STEP TOWARD EVENT:[ ](\d+)/i)){const _0x3fcc21=$gameMap[_0x36a806(0x54b)](Number(RegExp['$1']));return this['processMoveRouteStepToCharacter'](_0x3fcc21);}if(_0x5e0908[_0x36a806(0x506)](/STEP TOWARD PLAYER/i))return this[_0x36a806(0x613)]($gamePlayer);if(_0x5e0908[_0x36a806(0x506)](/STEP TOWARD HOME/i)&&this[_0x36a806(0x21e)]){const _0x2aa16e=this[_0x36a806(0x5c0)],_0x4340a1=this[_0x36a806(0x4c0)];return this['processMoveRouteStepTo'](_0x2aa16e,_0x4340a1);}if(_0x5e0908['match'](/STEP AWAY FROM:\s*(\d+)\s*[, ]\s*(\d+)/i))return this[_0x36a806(0x29e)](Number(RegExp['$1']),Number(RegExp['$2']));if(_0x5e0908[_0x36a806(0x506)](/STEP AWAY FROM EVENT:[ ](\d+)/i)){const _0x31e3a8=$gameMap['event'](Number(RegExp['$1']));return this[_0x36a806(0x2ac)](_0x31e3a8);}if(_0x5e0908[_0x36a806(0x506)](/STEP AWAY FROM PLAYER/i))return this[_0x36a806(0x2ac)]($gamePlayer);if(_0x5e0908['match'](/STEP AWAY FROM HOME/i)&&this[_0x36a806(0x21e)]){const _0x45c23b=this[_0x36a806(0x5c0)],_0x34e825=this[_0x36a806(0x4c0)];return this[_0x36a806(0x29e)](_0x45c23b,_0x34e825);}if(_0x5e0908[_0x36a806(0x506)](/TURN TO:\s*(\d+)\s*[, ]\s*(\d+)/i))return this[_0x36a806(0x1ca)](Number(RegExp['$1']),Number(RegExp['$2']));if(_0x5e0908[_0x36a806(0x506)](/TURN TO EVENT:[ ](\d+)/i)){const _0x2aff90=$gameMap[_0x36a806(0x54b)](Number(RegExp['$1']));return this[_0x36a806(0x666)](_0x2aff90);}if(_0x5e0908[_0x36a806(0x506)](/TURN TO PLAYER/i))return this[_0x36a806(0x666)]($gamePlayer);if(_0x5e0908[_0x36a806(0x506)](/TURN TO HOME/i)&&this[_0x36a806(0x21e)]){const _0x31b8b2=this['_randomHomeX'],_0x33f1fc=this[_0x36a806(0x4c0)];return this[_0x36a806(0x4cb)](_0x31b8b2,_0x33f1fc);}if(_0x5e0908['match'](/TURN AWAY FROM:\s*(\d+)\s*[, ]\s*(\d+)/i))return this[_0x36a806(0x227)](Number(RegExp['$1']),Number(RegExp['$2']));if(_0x5e0908[_0x36a806(0x506)](/TURN AWAY FROM EVENT:[ ](\d+)/i)){const _0x599245=$gameMap[_0x36a806(0x54b)](Number(RegExp['$1']));return this[_0x36a806(0x30c)](_0x599245);}if(_0x5e0908[_0x36a806(0x506)](/TURN AWAY FROM PLAYER/i))return this[_0x36a806(0x30c)]($gamePlayer);if(_0x5e0908[_0x36a806(0x506)](/TURN AWAY FROM HOME/i)&&this[_0x36a806(0x21e)]){const _0x54af26=this[_0x36a806(0x5c0)],_0x41ba9e=this['_randomHomeY'];return this['turnAwayFromPoint'](_0x54af26,_0x41ba9e);}if(_0x5e0908[_0x36a806(0x506)](/TURN LOWER LEFT/i))return this[_0x36a806(0x3d5)](0x1);if(_0x5e0908[_0x36a806(0x506)](/TURN LOWER RIGHT/i))return this[_0x36a806(0x3d5)](0x3);if(_0x5e0908['match'](/TURN UPPER LEFT/i))return this[_0x36a806(0x3d5)](0x7);if(_0x5e0908[_0x36a806(0x506)](/TURN UPPER RIGHT/i))return this[_0x36a806(0x3d5)](0x9);if(_0x5e0908[_0x36a806(0x506)](/Self Switch[ ](.*):[ ](.*)/i))return this[_0x36a806(0x407)](RegExp['$1'],RegExp['$2']);if(_0x5e0908[_0x36a806(0x506)](/Self Variable[ ](.*):[ ](.*)/i))return this[_0x36a806(0x3a6)](RegExp['$1'],RegExp['$2']);if(_0x5e0908[_0x36a806(0x506)](/TELEPORT TO:\s*(\d+)\s*[, ]\s*(\d+)/i))return this[_0x36a806(0x2d4)](Number(RegExp['$1']),Number(RegExp['$2']));if(_0x5e0908['match'](/TELEPORT TO EVENT:[ ](\d+)/i)){const _0x510631=$gameMap[_0x36a806(0x54b)](Number(RegExp['$1']));return this[_0x36a806(0x4c6)](_0x510631);}if(_0x5e0908[_0x36a806(0x506)](/TELEPORT TO PLAYER/i))return this[_0x36a806(0x4c6)]($gamePlayer);if(_0x5e0908[_0x36a806(0x506)](/TELEPORT TO HOME/i)&&this[_0x36a806(0x21e)]){const _0x1ff220=this[_0x36a806(0x5c0)],_0xfcb22e=this[_0x36a806(0x4c0)];return this[_0x36a806(0x2d4)](_0x1ff220,_0xfcb22e);}try{VisuMZ['EventsMoveCore'][_0x36a806(0x2b5)][_0x36a806(0x3ae)](this,_0x31d7d4);}catch(_0x105ad1){if($gameTemp[_0x36a806(0x38f)]())console[_0x36a806(0x607)](_0x105ad1);}},Game_Character[_0xe5069(0x678)][_0xe5069(0x239)]=function(_0x1015f4){const _0x15a0ba=_0xe5069;$gameTemp[_0x15a0ba(0x5a7)]([this],_0x1015f4);},Game_Character[_0xe5069(0x678)][_0xe5069(0x2a1)]=function(_0x57c46b){const _0x114474=_0xe5069;let _0x31347a=0x0;switch(_0x57c46b[_0x114474(0x4f8)]()['trim']()){case'!':case _0x114474(0x39d):_0x31347a=0x1;break;case'?':case _0x114474(0x544):_0x31347a=0x2;break;case _0x114474(0x236):case'NOTE':case'MUSIC\x20NOTE':case _0x114474(0x660):case _0x114474(0x49d):_0x31347a=0x3;break;case _0x114474(0x2e4):case _0x114474(0x491):_0x31347a=0x4;break;case _0x114474(0x2dd):_0x31347a=0x5;break;case _0x114474(0x478):_0x31347a=0x6;break;case _0x114474(0x396):case _0x114474(0x354):case _0x114474(0x5a8):_0x31347a=0x7;break;case _0x114474(0x199):case _0x114474(0x420):_0x31347a=0x8;break;case'LIGHT':case'BULB':case _0x114474(0x644):case'LIGHT-BULB':case _0x114474(0x591):_0x31347a=0x9;break;case'Z':case'ZZ':case _0x114474(0x4ba):case'SLEEP':_0x31347a=0xa;break;case _0x114474(0x682):_0x31347a=0xb;break;case _0x114474(0x240):_0x31347a=0xc;break;case _0x114474(0x39e):_0x31347a=0xd;break;case _0x114474(0x367):_0x31347a=0xe;break;case _0x114474(0x3cf):_0x31347a=0xf;break;}$gameTemp[_0x114474(0x29f)](this,_0x31347a);},Game_Character['prototype'][_0xe5069(0x3d1)]=function(_0x3b782f){const _0x252300=_0xe5069;_0x3b782f+=this[_0x252300(0x298)],this['setOpacity'](_0x3b782f[_0x252300(0x4ff)](0x0,0xff));if(this[_0x252300(0x298)]<0xff)this['_moveRouteIndex']--;},Game_Character['prototype'][_0xe5069(0x3a3)]=function(_0x1bc9df){const _0x1cefc3=_0xe5069;_0x1bc9df=this[_0x1cefc3(0x298)]-_0x1bc9df,this[_0x1cefc3(0x3ec)](_0x1bc9df[_0x1cefc3(0x4ff)](0x0,0xff));if(this['_opacity']>0x0)this[_0x1cefc3(0x4f3)]--;},Game_Character['prototype'][_0xe5069(0x4e3)]=function(_0x4bb3b5){const _0x354c10=_0xe5069,_0x33ef7a=[0x0,0x3,0x6,0x9,0x2,0x0,0x8,0x1,0x4,0x7],_0x4594f8=[0x0,0x7,0x4,0x1,0x8,0x0,0x2,0x9,0x6,0x3],_0x10b379=this[_0x354c10(0x4ed)](),_0x19f7e1=(_0x4bb3b5===_0x354c10(0x234)?_0x33ef7a:_0x4594f8)[_0x10b379],_0x34b39f=(_0x4bb3b5===_0x354c10(0x234)?_0x4594f8:_0x33ef7a)[_0x10b379];if(this[_0x354c10(0x2e9)](this['x'],this['y'],_0x19f7e1))_0x4bb3b5===_0x354c10(0x234)?this['turnLeft90']():this['turnRight90']();else!this[_0x354c10(0x2e9)](this['x'],this['y'],this[_0x354c10(0x4ed)]())&&(this[_0x354c10(0x2e9)](this['x'],this['y'],_0x34b39f)?_0x4bb3b5==='left'?this['turnRight90']():this[_0x354c10(0x587)]():this['turn180']());this['canPass'](this['x'],this['y'],this['direction']())&&this[_0x354c10(0x650)]();},Game_Character[_0xe5069(0x678)][_0xe5069(0x454)]=function(_0xc6d5b3){const _0x2d31ee=_0xe5069;if(ImageManager[_0x2d31ee(0x635)](this[_0x2d31ee(0x437)]))return;_0xc6d5b3=_0xc6d5b3['clamp'](0x0,0x7),this[_0x2d31ee(0x483)](this[_0x2d31ee(0x437)],_0xc6d5b3);},Game_Character[_0xe5069(0x678)][_0xe5069(0x55a)]=function(_0x3fb409){const _0x157e0c=_0xe5069;switch(this[_0x157e0c(0x4ed)]()){case 0x1:this[_0x157e0c(0x5b5)](-_0x3fb409,_0x3fb409);break;case 0x2:this['jump'](0x0,_0x3fb409);break;case 0x3:this[_0x157e0c(0x5b5)](_0x3fb409,_0x3fb409);break;case 0x4:this[_0x157e0c(0x5b5)](-_0x3fb409,0x0);break;case 0x6:this['jump'](_0x3fb409,0x0);break;case 0x7:this['jump'](-_0x3fb409,-_0x3fb409);break;case 0x8:this[_0x157e0c(0x5b5)](0x0,-_0x3fb409);break;case 0x9:this[_0x157e0c(0x5b5)](_0x3fb409,-_0x3fb409);break;}},Game_Character[_0xe5069(0x678)][_0xe5069(0x21c)]=function(_0x3ef670,_0x536670){const _0x14ce10=_0xe5069,_0x5a618d=Math[_0x14ce10(0x471)](_0x3ef670-this['x']),_0xde6320=Math[_0x14ce10(0x471)](_0x536670-this['y']);this[_0x14ce10(0x5b5)](_0x5a618d,_0xde6320);},Game_Character[_0xe5069(0x678)][_0xe5069(0x498)]=function(_0x35549f){if(_0x35549f)this['processMoveRouteJumpTo'](_0x35549f['x'],_0x35549f['y']);},Game_Character[_0xe5069(0x678)]['processMoveRouteStepTo']=function(_0x53a42d,_0x351dc9,_0x550d69){const _0x3f5b7f=_0xe5069;let _0xef7b6b=0x0;if(_0x550d69)$gameTemp[_0x3f5b7f(0x1ea)]=!![];$gameMap['isSupportDiagonalMovement']()?_0xef7b6b=this['findDiagonalDirectionTo'](_0x53a42d,_0x351dc9):_0xef7b6b=this[_0x3f5b7f(0x5f6)](_0x53a42d,_0x351dc9);if(_0x550d69)$gameTemp['_moveAllowPlayerCollision']=![];this[_0x3f5b7f(0x276)](_0xef7b6b),this[_0x3f5b7f(0x4cf)](!![]);},Game_Character[_0xe5069(0x678)]['processMoveRouteStepToCharacter']=function(_0xdacb05){if(_0xdacb05)this['processMoveRouteStepTo'](_0xdacb05['x'],_0xdacb05['y']);},Game_Character['prototype'][_0xe5069(0x209)]=function(_0x56e1b4,_0x392e91){const _0x18a583=_0xe5069,_0x31e182=this[_0x18a583(0x1ab)](_0x56e1b4),_0x258ab7=this[_0x18a583(0x1f2)](_0x392e91);},Game_Character[_0xe5069(0x678)][_0xe5069(0x679)]=function(_0x29ee7f){const _0x541853=_0xe5069;if(_0x29ee7f[_0x541853(0x506)](/(?:CRASH|COLLIDE|COLLISION|ENCOUNTER|TOUCH)/i))return!![];else return _0x29ee7f[_0x541853(0x506)](/(?:AVOID|EVADE|DODGE)/i)?![]:![];},VisuMZ[_0xe5069(0x5f4)]['Game_Event_isCollidedWithPlayerCharacters']=Game_Event['prototype']['isCollidedWithPlayerCharacters'],Game_Event[_0xe5069(0x678)][_0xe5069(0x397)]=function(_0x317a71,_0x37d93e){const _0x15865f=_0xe5069;if($gameTemp[_0x15865f(0x1ea)])return![];return VisuMZ[_0x15865f(0x5f4)][_0x15865f(0x37e)][_0x15865f(0x3ae)](this,_0x317a71,_0x37d93e);},Game_Character[_0xe5069(0x678)][_0xe5069(0x41c)]=function(_0x38590f,_0x1f3e89){const _0xd20cf=_0xe5069,_0x5d3496=['',_0xd20cf(0x3b9),_0xd20cf(0x5b7),_0xd20cf(0x4f7),_0xd20cf(0x26c),'',_0xd20cf(0x326),_0xd20cf(0x2e8),'UP',_0xd20cf(0x4d7)],_0x55cbcd=_0x5d3496['indexOf'](_0x38590f[_0xd20cf(0x4f8)]()[_0xd20cf(0x3d9)]());if(_0x55cbcd<=0x0)return;_0x1f3e89&&($gameTemp[_0xd20cf(0x1ea)]=!![]),this[_0xd20cf(0x2e9)](this['x'],this['y'],_0x55cbcd)&&(_0x1f3e89&&($gameTemp['_moveAllowPlayerCollision']=![]),this[_0xd20cf(0x276)](_0x55cbcd),this[_0xd20cf(0x4f3)]-=0x1),_0x1f3e89&&($gameTemp['_moveAllowPlayerCollision']=![]);},VisuMZ['EventsMoveCore'][_0xe5069(0x230)]=Game_Event[_0xe5069(0x678)][_0xe5069(0x3da)],Game_Event['prototype'][_0xe5069(0x3da)]=function(_0x4f182c,_0x4a4543){const _0x15893b=_0xe5069;if(VisuMZ[_0x15893b(0x5f4)]['Game_Event_checkEventTriggerTouch'][_0x15893b(0x3ae)](this,_0x4f182c,_0x4a4543))return!![];if($gameMap[_0x15893b(0x371)]())return![];for(let _0x328736=-this[_0x15893b(0x51c)][_0x15893b(0x234)];_0x328736<=this[_0x15893b(0x51c)][_0x15893b(0x67e)];_0x328736++){for(let _0x28b819=-this[_0x15893b(0x51c)]['up'];_0x28b819<=this['_addedHitbox'][_0x15893b(0x3b5)];_0x28b819++){if(VisuMZ['EventsMoveCore'][_0x15893b(0x230)]['call'](this,_0x4f182c+_0x328736,_0x4a4543+_0x28b819))return!![];}}return![];},Game_Character['prototype'][_0xe5069(0x3a8)]=function(_0x146168,_0x1f9abf,_0x3e7117){const _0x394e05=_0xe5069;this[_0x394e05(0x48b)](_0x146168,_0x1f9abf,_0x3e7117);if(this['x']!==_0x146168||this['y']!==_0x1f9abf)this[_0x394e05(0x4f3)]--;},Game_Character[_0xe5069(0x678)]['processMoveRouteMoveToCharacter']=function(_0x2ea495,_0x32d122){const _0x1eebc5=_0xe5069;if(_0x2ea495&&!_0x2ea495[_0x1eebc5(0x216)]){this[_0x1eebc5(0x3a8)](_0x2ea495['x'],_0x2ea495['y'],_0x32d122);if(_0x2ea495[_0x1eebc5(0x304)]()&&this['isNormalPriority']()){const _0x5576c3=$gameMap[_0x1eebc5(0x545)](this['x'],this['y'],_0x2ea495['x'],_0x2ea495['y']);if(_0x5576c3<=0x1)this[_0x1eebc5(0x4f3)]++;}}},Game_Character[_0xe5069(0x678)]['processMoveRouteMoveRepeat']=function(_0x3869c5,_0x384cfe){const _0xd5401d=_0xe5069;_0x384cfe=_0x384cfe||0x0;const _0x2882b3={'code':0x1,'indent':null,'parameters':[]};_0x2882b3[_0xd5401d(0x4f0)]=[0x0,0x5,0x1,0x6,0x2,0x0,0x3,0x7,0x4,0x8][_0x3869c5],this[_0xd5401d(0x379)][_0xd5401d(0x41a)][this[_0xd5401d(0x4f3)]][_0xd5401d(0x5a1)][0x0]='';while(_0x384cfe--){this['_moveRoute'][_0xd5401d(0x41a)][_0xd5401d(0x440)](this[_0xd5401d(0x4f3)]+0x1,0x0,_0x2882b3);}},Game_Character['prototype']['processMoveRoutePatternLock']=function(_0x24f65f){const _0xbd3c0b=_0xe5069;this['_patternLocked']=!![],this[_0xbd3c0b(0x557)](_0x24f65f);},Game_Character['prototype']['processMoveRouteSelfSwitch']=function(_0x443551,_0x5b246c){const _0x10115c=_0xe5069;if(this===$gamePlayer)return;const _0x52839d=[this[_0x10115c(0x250)],this[_0x10115c(0x374)],'A'];_0x443551[_0x10115c(0x506)](/\b[ABCD]\b/i)?_0x52839d[0x2]=String(_0x443551)[_0x10115c(0x1b9)](0x0)['toUpperCase']()[_0x10115c(0x3d9)]():_0x52839d[0x2]=_0x10115c(0x3c5)[_0x10115c(0x52c)](_0x443551);switch(_0x5b246c['toUpperCase']()[_0x10115c(0x3d9)]()){case'ON':case _0x10115c(0x47e):$gameSelfSwitches[_0x10115c(0x540)](_0x52839d,!![]);break;case'OFF':case'FALSE':$gameSelfSwitches[_0x10115c(0x540)](_0x52839d,![]);break;case _0x10115c(0x1b6):$gameSelfSwitches[_0x10115c(0x540)](_0x52839d,!$gameSelfSwitches['value'](_0x52839d));break;}},Game_Character[_0xe5069(0x678)]['processMoveRouteSelfVariable']=function(_0x2d6cec,_0x26b7a6){const _0x483e72=_0xe5069;if(this===$gamePlayer)return;const _0x803df0=[this[_0x483e72(0x250)],this[_0x483e72(0x374)],_0x483e72(0x28d)[_0x483e72(0x52c)](_0x2d6cec)];$gameSelfSwitches['setValue'](_0x803df0,Number(_0x26b7a6));},Game_Character[_0xe5069(0x678)]['processMoveRouteTeleportTo']=function(_0x10595c,_0x421b75){const _0x12c995=_0xe5069;this[_0x12c995(0x378)](_0x10595c,_0x421b75);},Game_Character[_0xe5069(0x678)][_0xe5069(0x4c6)]=function(_0x417400){const _0x498311=_0xe5069;if(_0x417400)this[_0x498311(0x2d4)](_0x417400['x'],_0x417400['y']);},Game_Character[_0xe5069(0x678)][_0xe5069(0x4c4)]=function(){const _0x1663b8=_0xe5069;switch(this[_0x1663b8(0x4ed)]()){case 0x1:this[_0x1663b8(0x3d5)](0x7);break;case 0x2:this['setDirection'](0x4);break;case 0x3:this[_0x1663b8(0x3d5)](0x1);break;case 0x4:this[_0x1663b8(0x3d5)](0x8);break;case 0x6:this[_0x1663b8(0x3d5)](0x2);break;case 0x7:this['setDirection'](0x9);break;case 0x8:this[_0x1663b8(0x3d5)](0x6);break;case 0x9:this['setDirection'](0x3);break;}},Game_Character[_0xe5069(0x678)][_0xe5069(0x587)]=function(){const _0x3550ed=_0xe5069;switch(this[_0x3550ed(0x4ed)]()){case 0x1:this['setDirection'](0x3);break;case 0x2:this['setDirection'](0x6);break;case 0x3:this[_0x3550ed(0x3d5)](0x9);break;case 0x4:this[_0x3550ed(0x3d5)](0x2);break;case 0x6:this[_0x3550ed(0x3d5)](0x8);break;case 0x7:this['setDirection'](0x1);break;case 0x8:this['setDirection'](0x4);break;case 0x9:this[_0x3550ed(0x3d5)](0x7);break;}},Game_Character['prototype'][_0xe5069(0x3ed)]=function(_0x350557,_0x2a851f,_0x1cbd63){const _0x177d99=_0xe5069,_0x55fab2=this[_0x177d99(0x1ab)](_0x350557),_0x3218da=this['deltaYFrom'](_0x2a851f);if($gameMap['isSupportDiagonalMovement']()){if(_0x1cbd63||this[_0x177d99(0x5d8)]()){if(_0x55fab2>0x0&&_0x3218da<0x0)return 0x1;if(_0x55fab2<0x0&&_0x3218da<0x0)return 0x3;if(_0x55fab2>0x0&&_0x3218da>0x0)return 0x7;if(_0x55fab2<0x0&&_0x3218da>0x0)return 0x9;}}if(Math['abs'](_0x55fab2)>Math[_0x177d99(0x5e6)](_0x3218da))return _0x55fab2>0x0?0x4:0x6;else{if(_0x3218da!==0x0)return _0x3218da>0x0?0x8:0x2;}return 0x0;},Game_Character['prototype'][_0xe5069(0x26d)]=function(_0x4598f8,_0x13dd94,_0xa01c7){const _0x1d3ee3=_0xe5069,_0x1a774f=this[_0x1d3ee3(0x1ab)](_0x4598f8),_0x28e296=this[_0x1d3ee3(0x1f2)](_0x13dd94);if($gameMap[_0x1d3ee3(0x43c)]()){if(_0xa01c7||this[_0x1d3ee3(0x5d8)]()){if(_0x1a774f>0x0&&_0x28e296<0x0)return 0x9;if(_0x1a774f<0x0&&_0x28e296<0x0)return 0x7;if(_0x1a774f>0x0&&_0x28e296>0x0)return 0x3;if(_0x1a774f<0x0&&_0x28e296>0x0)return 0x1;}}if(Math['abs'](_0x1a774f)>Math[_0x1d3ee3(0x5e6)](_0x28e296))return _0x1a774f>0x0?0x6:0x4;else{if(_0x28e296!==0x0)return _0x28e296>0x0?0x2:0x8;}return 0x0;},Game_Character['prototype'][_0xe5069(0x1ca)]=function(_0x1247df,_0x250f4c){const _0x2394aa=_0xe5069,_0x1a9895=this[_0x2394aa(0x3ed)](_0x1247df,_0x250f4c,!![]);if(_0x1a9895)this[_0x2394aa(0x276)](_0x1a9895);},Game_Character[_0xe5069(0x678)][_0xe5069(0x29e)]=function(_0x1a8562,_0x11cb37){const _0x5bbfd4=this['getDirectionFromPoint'](_0x1a8562,_0x11cb37,!![]);if(_0x5bbfd4)this['executeMoveDir8'](_0x5bbfd4);},Game_Character['prototype'][_0xe5069(0x4cb)]=function(_0x9634aa,_0x3b5904){const _0x2dfdd5=_0xe5069,_0x3fe0d7=this[_0x2dfdd5(0x3ed)](_0x9634aa,_0x3b5904,![]);if(_0x3fe0d7)this['setDirection'](_0x3fe0d7);},Game_Character[_0xe5069(0x678)][_0xe5069(0x227)]=function(_0x17af5d,_0x2d1452){const _0x540334=_0xe5069,_0xd84c27=this[_0x540334(0x26d)](_0x17af5d,_0x2d1452,![]);if(_0xd84c27)this['setDirection'](_0xd84c27);},Game_Character[_0xe5069(0x678)]['moveTowardCharacter']=function(_0x36dabc){const _0x5a39df=_0xe5069;if(_0x36dabc)this[_0x5a39df(0x1ca)](_0x36dabc['x'],_0x36dabc['y']);},Game_Character[_0xe5069(0x678)]['moveAwayFromCharacter']=function(_0xac538a){if(_0xac538a)this['moveAwayFromPoint'](_0xac538a['x'],_0xac538a['y']);},Game_Character[_0xe5069(0x678)][_0xe5069(0x666)]=function(_0x4d9bca){const _0x49b3e1=_0xe5069;if(_0x4d9bca)this[_0x49b3e1(0x4cb)](_0x4d9bca['x'],_0x4d9bca['y']);},Game_Character[_0xe5069(0x678)]['turnAwayFromCharacter']=function(_0x1cd010){const _0x3bfd7b=_0xe5069;if(_0x1cd010)this[_0x3bfd7b(0x227)](_0x1cd010['x'],_0x1cd010['y']);},VisuMZ[_0xe5069(0x5f4)]['Game_Player_isDashing']=Game_Player[_0xe5069(0x678)][_0xe5069(0x3f0)],Game_Player[_0xe5069(0x678)][_0xe5069(0x3f0)]=function(){const _0x55f2ac=_0xe5069;if(!Game_CharacterBase[_0x55f2ac(0x57f)]&&this[_0x55f2ac(0x248)]())return![];if(this[_0x55f2ac(0x19e)])return!![];return VisuMZ[_0x55f2ac(0x5f4)]['Game_Player_isDashing'][_0x55f2ac(0x3ae)](this);},VisuMZ['EventsMoveCore'][_0xe5069(0x2f6)]=Game_Player['prototype'][_0xe5069(0x47d)],Game_Player[_0xe5069(0x678)][_0xe5069(0x47d)]=function(){const _0x179f28=_0xe5069;return $gameMap[_0x179f28(0x43c)]()?this['getInputDir8']():VisuMZ[_0x179f28(0x5f4)][_0x179f28(0x2f6)]['call'](this);},Game_Player[_0xe5069(0x678)][_0xe5069(0x20b)]=function(){const _0x417adb=_0xe5069;return Input[_0x417adb(0x358)];},Game_Player[_0xe5069(0x678)][_0xe5069(0x2cb)]=function(){const _0x1193f0=_0xe5069;if($gameSystem[_0x1193f0(0x334)]())return 0x0;if(!this[_0x1193f0(0x599)]()&&this[_0x1193f0(0x3a9)]()){let _0x3fce7e=this[_0x1193f0(0x47d)]();if(_0x3fce7e>0x0)$gameTemp[_0x1193f0(0x676)]();else{if($gameTemp[_0x1193f0(0x647)]()){const _0x1ca3a7=$gameTemp['destinationX'](),_0x5c285c=$gameTemp[_0x1193f0(0x548)]();this[_0x1193f0(0x53a)](_0x1ca3a7,_0x5c285c)?_0x3fce7e=this[_0x1193f0(0x662)](_0x1ca3a7,_0x5c285c):_0x3fce7e=this[_0x1193f0(0x5f6)](_0x1ca3a7,_0x5c285c);}}_0x3fce7e>0x0?(this['_inputTime']=this['_inputTime']||0x0,this[_0x1193f0(0x24c)]()?this[_0x1193f0(0x3d5)](_0x3fce7e):this[_0x1193f0(0x1ef)](_0x3fce7e),this[_0x1193f0(0x1a0)]++):this[_0x1193f0(0x1a0)]=0x0;}},Game_Player[_0xe5069(0x678)][_0xe5069(0x24c)]=function(){const _0x384c12=_0xe5069,_0x118392=VisuMZ[_0x384c12(0x5f4)][_0x384c12(0x553)][_0x384c12(0x595)];if(!_0x118392[_0x384c12(0x53f)])return![];if($gameTemp[_0x384c12(0x647)]())return![];if(this['isDashing']()||this[_0x384c12(0x599)]()||this[_0x384c12(0x248)]())return![];return this[_0x384c12(0x1a0)]<_0x118392[_0x384c12(0x50b)];},VisuMZ[_0xe5069(0x5f4)][_0xe5069(0x458)]=Game_Player[_0xe5069(0x678)][_0xe5069(0x1ef)],Game_Player[_0xe5069(0x678)]['executeMove']=function(_0xf07f32){const _0x3f4a4b=_0xe5069;$gameMap[_0x3f4a4b(0x43c)]()?this[_0x3f4a4b(0x276)](_0xf07f32):VisuMZ['EventsMoveCore'][_0x3f4a4b(0x458)][_0x3f4a4b(0x3ae)](this,_0xf07f32);},VisuMZ['EventsMoveCore']['Game_Player_isMapPassable']=Game_Player[_0xe5069(0x678)][_0xe5069(0x1a5)],Game_Player[_0xe5069(0x678)][_0xe5069(0x1a5)]=function(_0xcec533,_0x32ac03,_0x51f463){const _0x1aa45f=_0xe5069;if($gameMap[_0x1aa45f(0x36c)](_0xcec533,_0x32ac03,_0x51f463,_0x1aa45f(0x610)))return this[_0x1aa45f(0x5f1)]()&&this[_0x1aa45f(0x4b0)]()?this[_0x1aa45f(0x4b0)]()[_0x1aa45f(0x1a5)](_0xcec533,_0x32ac03,_0x51f463):!![];if($gameMap[_0x1aa45f(0x5cb)](_0xcec533,_0x32ac03,_0x51f463,_0x1aa45f(0x610)))return![];return VisuMZ[_0x1aa45f(0x5f4)][_0x1aa45f(0x490)][_0x1aa45f(0x3ae)](this,_0xcec533,_0x32ac03,_0x51f463);},VisuMZ['EventsMoveCore'][_0xe5069(0x2d6)]=Game_Player[_0xe5069(0x678)]['checkEventTriggerHere'],Game_Player[_0xe5069(0x678)]['checkEventTriggerHere']=function(_0x3bc652){const _0x224c26=_0xe5069;VisuMZ['EventsMoveCore'][_0x224c26(0x2d6)][_0x224c26(0x3ae)](this,_0x3bc652);if(this[_0x224c26(0x4c1)]()){this[_0x224c26(0x628)](_0x3bc652);if(_0x3bc652[_0x224c26(0x22a)](0x0)&&this[_0x224c26(0x390)]()==='standing')this[_0x224c26(0x273)](this['x'],this['y']);else(_0x3bc652[_0x224c26(0x22a)](0x1)||_0x3bc652['includes'](0x2))&&this[_0x224c26(0x52b)]();}},VisuMZ[_0xe5069(0x5f4)][_0xe5069(0x410)]=Game_Player[_0xe5069(0x678)][_0xe5069(0x5f2)],Game_Player[_0xe5069(0x678)][_0xe5069(0x5f2)]=function(_0x3e9b20){const _0x3a517f=_0xe5069;VisuMZ[_0x3a517f(0x5f4)][_0x3a517f(0x410)][_0x3a517f(0x3ae)](this,_0x3e9b20);if(this[_0x3a517f(0x4c1)]()&&_0x3e9b20[_0x3a517f(0x22a)](0x0)&&this[_0x3a517f(0x390)]()===_0x3a517f(0x65f)){const _0x3ee980=this['direction'](),_0xd5ed07=$gameMap[_0x3a517f(0x63a)](this['x'],_0x3ee980),_0xec77a=$gameMap[_0x3a517f(0x19b)](this['y'],_0x3ee980);this[_0x3a517f(0x273)](_0xd5ed07,_0xec77a);}},Game_Player[_0xe5069(0x678)][_0xe5069(0x628)]=function(_0x63f901){const _0x50b0bf=_0xe5069;if($gameMap[_0x50b0bf(0x371)]())return;if($gameMap[_0x50b0bf(0x2bc)]())return;const _0x55bb20=$gameMap[_0x50b0bf(0x449)]();for(const _0x4d1cc4 of _0x55bb20){if(!_0x4d1cc4)continue;if(!_0x4d1cc4[_0x50b0bf(0x61b)](_0x63f901))continue;if(this['meetActivationRegionConditions'](_0x4d1cc4))return _0x4d1cc4['start']();if(this[_0x50b0bf(0x448)](_0x4d1cc4))return _0x4d1cc4['start']();}},Game_Player[_0xe5069(0x678)][_0xe5069(0x1e3)]=function(_0x3636dd){const _0x403b45=_0xe5069;if($gameMap[_0x403b45(0x371)]())return![];if($gameMap[_0x403b45(0x2bc)]())return![];return _0x3636dd[_0x403b45(0x1f4)]()[_0x403b45(0x22a)](this[_0x403b45(0x492)]());},Game_Player[_0xe5069(0x678)][_0xe5069(0x448)]=function(_0x16f30b){const _0x1a9e48=_0xe5069;if($gameMap[_0x1a9e48(0x371)]())return![];if($gameMap[_0x1a9e48(0x2bc)]())return![];if([_0x1a9e48(0x1b1),'region'][_0x1a9e48(0x22a)](_0x16f30b[_0x1a9e48(0x417)]()))return![];const _0x1a203e=_0x16f30b[_0x1a9e48(0x417)](),_0x41ba66=_0x16f30b[_0x1a9e48(0x5a9)]();return this[_0x1a9e48(0x226)](_0x16f30b,_0x1a203e,_0x41ba66);},Game_Map['prototype']['checkEventProximity']=function(_0x5647ab,_0x11ed3d,_0x33fab7,_0x488fc4,_0x271052){const _0x3c5abc=_0xe5069;switch(_0x488fc4){case _0x3c5abc(0x479):return _0x271052>=Math[_0x3c5abc(0x5e6)](_0x33fab7[_0x3c5abc(0x1ab)](_0x5647ab))&&_0x271052>=Math[_0x3c5abc(0x5e6)](_0x33fab7[_0x3c5abc(0x1f2)](_0x11ed3d));break;case'circle':const _0x54411f=Math['pow'](_0x33fab7['x']-_0x5647ab,0x2),_0x5f937c=Math[_0x3c5abc(0x550)](_0x33fab7['y']-_0x11ed3d,0x2);return _0x271052>=Math['round'](Math[_0x3c5abc(0x640)](_0x54411f+_0x5f937c));break;case _0x3c5abc(0x1f7):case _0x3c5abc(0x596):case _0x3c5abc(0x45b):const _0x118188=$gameMap[_0x3c5abc(0x545)](_0x5647ab,_0x11ed3d,_0x33fab7['x'],_0x33fab7['y']);return _0x271052>=_0x118188;break;case'row':return _0x271052>=Math[_0x3c5abc(0x5e6)](_0x33fab7[_0x3c5abc(0x1f2)](_0x11ed3d));break;case _0x3c5abc(0x4a9):return _0x271052>=Math[_0x3c5abc(0x5e6)](_0x33fab7['deltaXFrom'](_0x5647ab));break;}return![];},Game_Player[_0xe5069(0x678)]['checkEventProximity']=function(_0x446a13,_0x47e650,_0x596146){const _0xeed838=_0xe5069,_0x5c6c7c=this['x'],_0x28119a=this['y'];return $gameMap[_0xeed838(0x226)](_0x5c6c7c,_0x28119a,_0x446a13,_0x47e650,_0x596146);},Game_Player['prototype']['startMapCommonEventOnOK']=function(_0x119cdd,_0x2d49ef){const _0x269527=_0xe5069;if($gameMap[_0x269527(0x371)]())return;if($gameMap['isAnyEventStarting']())return;let _0x134226=VisuMZ['EventsMoveCore'][_0x269527(0x553)][_0x269527(0x467)],_0x137464=$gameMap[_0x269527(0x492)](_0x119cdd,_0x2d49ef);const _0x4f0316=_0x269527(0x282)[_0x269527(0x52c)](_0x137464);_0x134226[_0x4f0316]&&$gameTemp[_0x269527(0x65b)](_0x134226[_0x4f0316]);},Game_Player[_0xe5069(0x678)][_0xe5069(0x390)]=function(){const _0xff0645=_0xe5069;return VisuMZ[_0xff0645(0x5f4)][_0xff0645(0x553)]['RegionOkTarget'];},Game_Player[_0xe5069(0x678)]['startMapCommonEventOnTouch']=function(){const _0x1c53e0=_0xe5069;if($gameMap[_0x1c53e0(0x371)]())return;if($gameMap[_0x1c53e0(0x2bc)]())return;let _0x2d8072=VisuMZ[_0x1c53e0(0x5f4)][_0x1c53e0(0x553)]['RegionTouch'];const _0x4f1b19=_0x1c53e0(0x282)['format'](this[_0x1c53e0(0x492)]());_0x2d8072[_0x4f1b19]&&$gameTemp[_0x1c53e0(0x65b)](_0x2d8072[_0x4f1b19]);},VisuMZ['EventsMoveCore'][_0xe5069(0x562)]=Game_Player[_0xe5069(0x678)]['increaseSteps'],Game_Player[_0xe5069(0x678)][_0xe5069(0x3c7)]=function(){const _0x3d449e=_0xe5069;VisuMZ[_0x3d449e(0x5f4)][_0x3d449e(0x562)]['call'](this),VisuMZ['MoveAllSynchTargets'](0x0);},Game_Player[_0xe5069(0x678)][_0xe5069(0x5f9)]=function(){const _0x275607=_0xe5069;VisuMZ[_0x275607(0x5ee)](0x0);},VisuMZ[_0xe5069(0x5f4)][_0xe5069(0x2c0)]=Game_Follower[_0xe5069(0x678)][_0xe5069(0x33f)],Game_Follower[_0xe5069(0x678)][_0xe5069(0x33f)]=function(_0x3783a7){const _0x579fdf=_0xe5069;VisuMZ['EventsMoveCore'][_0x579fdf(0x2c0)][_0x579fdf(0x3ae)](this,_0x3783a7),this['_chaseOff']=![];},Game_Follower['prototype'][_0xe5069(0x3f0)]=function(){const _0x4bbed4=_0xe5069;if(this[_0x4bbed4(0x34e)])return Game_Character[_0x4bbed4(0x678)][_0x4bbed4(0x3f0)][_0x4bbed4(0x3ae)](this);return $gamePlayer['isDashing']();},Game_Follower[_0xe5069(0x678)][_0xe5069(0x3e9)]=function(){const _0xf451ad=_0xe5069;if(this['_chaseOff'])return Game_Character[_0xf451ad(0x678)]['isDashingAndMoving'][_0xf451ad(0x3ae)](this);return $gamePlayer['isDashingAndMoving']()&&this[_0xf451ad(0x584)];},Game_Follower[_0xe5069(0x678)][_0xe5069(0x3c6)]=function(){return $gamePlayer['realMoveSpeed']();},Game_Follower[_0xe5069(0x678)][_0xe5069(0x3bf)]=function(){const _0x15907d=_0xe5069;Game_Character[_0x15907d(0x678)][_0x15907d(0x3bf)][_0x15907d(0x3ae)](this),this[_0x15907d(0x335)]>0x0&&(this[_0x15907d(0x584)]=![]);},Game_Follower[_0xe5069(0x678)][_0xe5069(0x37b)]=function(_0x2da194){const _0x5bb686=_0xe5069;this[_0x5bb686(0x34e)]=_0x2da194;},VisuMZ[_0xe5069(0x5f4)][_0xe5069(0x36a)]=Game_Follower[_0xe5069(0x678)][_0xe5069(0x25e)],Game_Follower[_0xe5069(0x678)]['chaseCharacter']=function(_0x1ec1f9){const _0xe49b7f=_0xe5069;if(this['_chaseOff'])return;if($gameSystem['isStopFollowerChasing']())return;VisuMZ[_0xe49b7f(0x5f4)][_0xe49b7f(0x36a)][_0xe49b7f(0x3ae)](this,_0x1ec1f9),this['_actuallyMoving']=!![];},VisuMZ[_0xe5069(0x5f4)]['Game_Vehicle_isMapPassable']=Game_Vehicle[_0xe5069(0x678)]['isMapPassable'],Game_Vehicle[_0xe5069(0x678)]['isMapPassable']=function(_0x570c0b,_0x7568ab,_0x4c748e){const _0x44234f=_0xe5069;if($gameMap[_0x44234f(0x36c)](_0x570c0b,_0x7568ab,_0x4c748e,this[_0x44234f(0x2d5)]))return!![];if($gameMap['isRegionForbidPass'](_0x570c0b,_0x7568ab,_0x4c748e,this['_type']))return![];return VisuMZ['EventsMoveCore'][_0x44234f(0x600)][_0x44234f(0x3ae)](this,_0x570c0b,_0x7568ab,_0x4c748e);},Game_Vehicle[_0xe5069(0x678)][_0xe5069(0x2d3)]=function(_0x336bd8,_0x1458e6,_0x1380e7){const _0x5d8a9c=_0xe5069;if($gameMap[_0x5d8a9c(0x36c)](_0x336bd8,_0x1458e6,_0x1380e7,this[_0x5d8a9c(0x2d5)]))return!![];if($gameMap[_0x5d8a9c(0x5cb)](_0x336bd8,_0x1458e6,_0x1380e7,this[_0x5d8a9c(0x2d5)]))return![];return VisuMZ[_0x5d8a9c(0x5f4)][_0x5d8a9c(0x289)]['call']($gamePlayer,_0x336bd8,_0x1458e6,_0x1380e7);},VisuMZ[_0xe5069(0x5f4)][_0xe5069(0x606)]=Game_Vehicle[_0xe5069(0x678)]['isLandOk'],Game_Vehicle[_0xe5069(0x678)][_0xe5069(0x368)]=function(_0xea9b64,_0x5ac79e,_0x17a0f8){const _0x492504=_0xe5069;if($gameMap[_0x492504(0x603)](_0xea9b64,_0x5ac79e,_0x17a0f8,this[_0x492504(0x2d5)]))return!![];const _0x37fb18=this[_0x492504(0x2d5)][_0x492504(0x1b9)](0x0)[_0x492504(0x4f8)]()+this[_0x492504(0x2d5)][_0x492504(0x3e3)](0x1),_0x20532f=_0x492504(0x22b)[_0x492504(0x52c)](_0x37fb18);return VisuMZ[_0x492504(0x5f4)][_0x492504(0x553)][_0x492504(0x303)][_0x20532f]?![]:VisuMZ[_0x492504(0x5f4)]['Game_Vehicle_isLandOk'][_0x492504(0x3ae)](this,_0xea9b64,_0x5ac79e,_0x17a0f8);},VisuMZ[_0xe5069(0x5f4)][_0xe5069(0x301)]=Game_Vehicle['prototype'][_0xe5069(0x384)],Game_Vehicle['prototype'][_0xe5069(0x384)]=function(){const _0x222678=_0xe5069;VisuMZ['EventsMoveCore'][_0x222678(0x301)][_0x222678(0x3ae)](this);const _0x660c10=VisuMZ[_0x222678(0x5f4)][_0x222678(0x553)]['Movement'];if(this['isBoat']()){if(_0x660c10[_0x222678(0x3de)])this[_0x222678(0x57e)](_0x660c10[_0x222678(0x3de)]);}else{if(this[_0x222678(0x474)]()){if(_0x660c10[_0x222678(0x3a2)])this[_0x222678(0x57e)](_0x660c10[_0x222678(0x3a2)]);}else{if(this[_0x222678(0x37a)]()){if(_0x660c10['AirshipSpeed'])this[_0x222678(0x57e)](_0x660c10[_0x222678(0x5b2)]);}}}},VisuMZ[_0xe5069(0x5f4)][_0xe5069(0x64d)]=Game_Event[_0xe5069(0x678)]['initialize'],Game_Event[_0xe5069(0x678)][_0xe5069(0x33f)]=function(_0x41ad8b,_0x1ad1ad){const _0x38991e=_0xe5069;this[_0x38991e(0x675)]=!![],VisuMZ[_0x38991e(0x5f4)][_0x38991e(0x64d)][_0x38991e(0x3ae)](this,_0x41ad8b,_0x1ad1ad),this['_checkRelocateNotetag']=undefined,this[_0x38991e(0x419)](),this[_0x38991e(0x215)](),this[_0x38991e(0x5ef)]();},Game_Map[_0xe5069(0x678)][_0xe5069(0x428)]=function(_0xfe1fd3,_0x14861e){const _0x32c55b=_0xe5069;return _0xfe1fd3===$gameMap['mapId']()?$dataMap[_0x32c55b(0x449)][_0x14861e]:VisuMZ[_0x32c55b(0x620)][_0xfe1fd3][_0x32c55b(0x449)][_0x14861e];},VisuMZ[_0xe5069(0x5f4)][_0xe5069(0x1a7)]=Game_Event[_0xe5069(0x678)][_0xe5069(0x54b)],Game_Event[_0xe5069(0x678)][_0xe5069(0x54b)]=function(){const _0x50342e=_0xe5069;if(this['_eventMorphData']!==undefined){const _0x421653=this[_0x50342e(0x657)]['mapId'],_0xeb5a7e=this[_0x50342e(0x657)][_0x50342e(0x21e)];return $gameMap['referEvent'](_0x421653,_0xeb5a7e);}if(this['_eventCopyData']!==undefined){const _0x43a521=this[_0x50342e(0x320)][_0x50342e(0x5a6)],_0x29bd03=this[_0x50342e(0x320)][_0x50342e(0x21e)];return $gameMap[_0x50342e(0x428)](_0x43a521,_0x29bd03);}if(this[_0x50342e(0x245)]!==undefined){const _0x3660e1=this['_eventSpawnData'][_0x50342e(0x5a6)],_0x20faa3=this['_eventSpawnData'][_0x50342e(0x21e)];return $gameMap['referEvent'](_0x3660e1,_0x20faa3);}if($gameTemp[_0x50342e(0x3c3)]!==undefined){const _0x3a91ac=$gameTemp['_spawnData'][_0x50342e(0x5a6)],_0x42a9c6=$gameTemp['_spawnData'][_0x50342e(0x21e)];return $gameMap[_0x50342e(0x428)](_0x3a91ac,_0x42a9c6);}return VisuMZ['EventsMoveCore'][_0x50342e(0x1a7)][_0x50342e(0x3ae)](this);},Game_Event[_0xe5069(0x678)]['checkValidEventerMap']=function(_0x26f3a2,_0x531192){const _0x3e71b0=_0xe5069;if(_0x26f3a2===0x0||_0x531192===0x0)return![];if(_0x26f3a2===$gameMap[_0x3e71b0(0x5a6)]())return!![];if(!VisuMZ['PreloadedMaps'][_0x26f3a2]&&_0x26f3a2!==$gameMap['mapId']())return $gameTemp['isPlaytest']()&&console[_0x3e71b0(0x607)](_0x3e71b0(0x45a)['format'](_0x26f3a2)),![];return!![];},VisuMZ[_0xe5069(0x5f4)][_0xe5069(0x5b0)]=Game_Event[_0xe5069(0x678)][_0xe5069(0x246)],Game_Event[_0xe5069(0x678)][_0xe5069(0x246)]=function(){const _0x4de011=_0xe5069;VisuMZ[_0x4de011(0x5f4)]['Game_Event_start'][_0x4de011(0x3ae)](this),Imported[_0x4de011(0x29b)]&&Input[_0x4de011(0x411)](VisuMZ[_0x4de011(0x40f)][_0x4de011(0x553)][_0x4de011(0x373)][_0x4de011(0x57c)])&&Input[_0x4de011(0x62b)]();},Game_Event['prototype'][_0xe5069(0x419)]=function(){const _0x2fd804=_0xe5069,_0x4e516b=this[_0x2fd804(0x54b)]()[_0x2fd804(0x3b4)];if(_0x4e516b==='')return;if(DataManager[_0x2fd804(0x41d)]()||DataManager[_0x2fd804(0x5da)]())return;const _0x259ce9=VisuMZ[_0x2fd804(0x5f4)][_0x2fd804(0x553)]['Template'];let _0x24fd9a=null,_0x382468=0x0,_0x32bb48=0x0;if(_0x4e516b[_0x2fd804(0x506)](/<COPY EVENT:[ ]MAP[ ](\d+),[ ]EVENT[ ](\d+)>/i)){_0x382468=Number(RegExp['$1']),_0x32bb48=Number(RegExp['$2']);if(_0x382468===0x0)_0x382468=$gameMap['mapId']();}else{if(_0x4e516b[_0x2fd804(0x506)](/<COPY EVENT:[ ](\d+),[ ](\d+)>/i)){_0x382468=Number(RegExp['$1']),_0x32bb48=Number(RegExp['$2']);if(_0x382468===0x0)_0x382468=$gameMap['mapId']();}else{if(_0x4e516b['match'](/<COPY EVENT:[ ](.*?)>/i)){const _0x1a64da=String(RegExp['$1'])[_0x2fd804(0x4f8)]()['trim']();_0x24fd9a=VisuMZ[_0x2fd804(0x4dc)][_0x1a64da];if(!_0x24fd9a)return;_0x382468=_0x24fd9a[_0x2fd804(0x45f)],_0x32bb48=_0x24fd9a[_0x2fd804(0x4e1)];}}}if(!this[_0x2fd804(0x2d9)](_0x382468,_0x32bb48))return;_0x259ce9[_0x2fd804(0x5be)][_0x2fd804(0x3ae)](this,_0x382468,_0x32bb48,this);if(_0x24fd9a)_0x24fd9a[_0x2fd804(0x5be)][_0x2fd804(0x3ae)](this,_0x382468,_0x32bb48,this);this[_0x2fd804(0x320)]={'mapId':_0x382468,'eventId':_0x32bb48},this[_0x2fd804(0x4fd)]=-0x2,this[_0x2fd804(0x422)](),_0x259ce9['PostCopyJS'][_0x2fd804(0x3ae)](this,_0x382468,_0x32bb48,this);if(_0x24fd9a)_0x24fd9a[_0x2fd804(0x4f4)][_0x2fd804(0x3ae)](this,_0x382468,_0x32bb48,this);$gameMap[_0x2fd804(0x641)]();},Game_Event[_0xe5069(0x678)][_0xe5069(0x215)]=function(){const _0x5417b3=_0xe5069,_0x11f591=$gameSystem[_0x5417b3(0x625)](this);if(!_0x11f591)return;const _0x1c3c46=_0x11f591[_0x5417b3(0x3ef)][_0x5417b3(0x4f8)]()[_0x5417b3(0x3d9)]();_0x1c3c46!==_0x5417b3(0x25a)?this[_0x5417b3(0x624)](_0x1c3c46,!![]):this[_0x5417b3(0x1ee)](_0x11f591['mapId'],_0x11f591[_0x5417b3(0x21e)],!![]);},Game_Event[_0xe5069(0x678)][_0xe5069(0x1ee)]=function(_0x187f0f,_0x45e9e8,_0xc42caa){const _0xe068fc=_0xe5069;if(!this[_0xe068fc(0x2d9)](_0x187f0f,_0x45e9e8))return;const _0xa45742=VisuMZ['EventsMoveCore'][_0xe068fc(0x553)]['Template'];if(!_0xc42caa)_0xa45742[_0xe068fc(0x295)][_0xe068fc(0x3ae)](this,_0x187f0f,_0x45e9e8,this);this[_0xe068fc(0x657)]={'mapId':_0x187f0f,'eventId':_0x45e9e8},this[_0xe068fc(0x4fd)]=-0x2,this[_0xe068fc(0x422)]();if(!_0xc42caa)_0xa45742[_0xe068fc(0x39a)][_0xe068fc(0x3ae)](this,_0x187f0f,_0x45e9e8,this);$gameMap[_0xe068fc(0x641)]();},Game_Event[_0xe5069(0x678)][_0xe5069(0x624)]=function(_0x427d60,_0x3cbd73){const _0x1ecde2=_0xe5069;_0x427d60=_0x427d60[_0x1ecde2(0x4f8)]()[_0x1ecde2(0x3d9)]();const _0x1a2854=VisuMZ['EventTemplates'][_0x427d60];if(!_0x1a2854)return;const _0x28b88f=_0x1a2854[_0x1ecde2(0x45f)],_0x31a3bf=_0x1a2854[_0x1ecde2(0x4e1)];if(!this['checkValidEventerMap'](_0x28b88f,_0x31a3bf))return;if(!_0x3cbd73)_0x1a2854[_0x1ecde2(0x295)][_0x1ecde2(0x3ae)](this,_0x28b88f,_0x31a3bf,this);this[_0x1ecde2(0x1ee)](_0x28b88f,_0x31a3bf,_0x3cbd73);if(!_0x3cbd73)_0x1a2854[_0x1ecde2(0x39a)]['call'](this,_0x28b88f,_0x31a3bf,this);if($gameMap)$gameMap[_0x1ecde2(0x641)]();},Game_Event[_0xe5069(0x678)]['removeMorph']=function(){const _0x793822=_0xe5069;this[_0x793822(0x657)]=undefined,this['_pageIndex']=-0x2,this[_0x793822(0x422)]();},Game_Event[_0xe5069(0x678)]['setupSpawn']=function(_0x5e1302){const _0x1f2911=_0xe5069,_0x56d97d=VisuMZ['EventsMoveCore'][_0x1f2911(0x553)][_0x1f2911(0x345)],_0x3a1eda=_0x5e1302[_0x1f2911(0x3ef)]['toUpperCase']()[_0x1f2911(0x3d9)](),_0x516259=!['',_0x1f2911(0x25a)][_0x1f2911(0x22a)](_0x3a1eda);let _0x4bb3e4=0x0,_0x2a33b1=0x0;if(_0x516259){const _0x3a8de4=VisuMZ['EventTemplates'][_0x3a1eda];if(!_0x3a8de4)return;_0x4bb3e4=_0x3a8de4[_0x1f2911(0x45f)],_0x2a33b1=_0x3a8de4[_0x1f2911(0x4e1)];}else _0x4bb3e4=_0x5e1302[_0x1f2911(0x5a6)],_0x2a33b1=_0x5e1302[_0x1f2911(0x21e)];if(!this[_0x1f2911(0x2d9)](_0x4bb3e4,_0x2a33b1))return;if(_0x516259){const _0x1e59d2=VisuMZ['EventTemplates'][_0x3a1eda];_0x1e59d2[_0x1f2911(0x4b4)]['call'](this,_0x4bb3e4,_0x2a33b1,this);}_0x56d97d[_0x1f2911(0x4b4)]['call'](this,_0x4bb3e4,_0x2a33b1,this),this[_0x1f2911(0x245)]=_0x5e1302,this[_0x1f2911(0x4fd)]=-0x2,this[_0x1f2911(0x250)]=$gameMap[_0x1f2911(0x5a6)](),this[_0x1f2911(0x374)]=_0x5e1302[_0x1f2911(0x38a)],this[_0x1f2911(0x2a2)]=_0x5e1302[_0x1f2911(0x5d3)],this['locate'](_0x5e1302['x'],_0x5e1302['y']),this[_0x1f2911(0x3d5)](_0x5e1302[_0x1f2911(0x4ed)]),this['refresh']();if(_0x516259){const _0x44dd89=VisuMZ[_0x1f2911(0x4dc)][_0x3a1eda];if(!_0x44dd89)return;_0x44dd89[_0x1f2911(0x3a0)]['call'](this,_0x4bb3e4,_0x2a33b1,this);}_0x56d97d[_0x1f2911(0x3a0)]['call'](this,_0x4bb3e4,_0x2a33b1,this);const _0xc1e599=SceneManager[_0x1f2911(0x3df)];if(_0xc1e599&&_0xc1e599[_0x1f2911(0x477)])_0xc1e599[_0x1f2911(0x477)][_0x1f2911(0x1fd)](this);},Game_Event['prototype'][_0xe5069(0x3c2)]=function(){const _0xf1d0c0=_0xe5069;return!!this[_0xf1d0c0(0x245)];},Game_Event[_0xe5069(0x678)]['start']=function(){const _0x54566a=_0xe5069;if(!this[_0x54566a(0x41a)]())return;const _0x197b98=this['list']()[_0x54566a(0x617)](_0x4f4274=>_0x4f4274[_0x54566a(0x4f0)]!==0x6c&&_0x4f4274['code']!==0x198);_0x197b98[_0x54566a(0x243)]>0x1&&(this[_0x54566a(0x434)]=!![],this[_0x54566a(0x61b)]([0x0,0x1,0x2])&&this[_0x54566a(0x253)]());},VisuMZ[_0xe5069(0x5f4)][_0xe5069(0x429)]=Game_Event['prototype'][_0xe5069(0x238)],Game_Event[_0xe5069(0x678)][_0xe5069(0x238)]=function(){const _0x4b5503=_0xe5069;VisuMZ['EventsMoveCore'][_0x4b5503(0x429)][_0x4b5503(0x3ae)](this),this[_0x4b5503(0x3e8)](),this[_0x4b5503(0x616)]();},VisuMZ[_0xe5069(0x5f4)][_0xe5069(0x459)]=Game_Event[_0xe5069(0x678)][_0xe5069(0x244)],Game_Event[_0xe5069(0x678)][_0xe5069(0x244)]=function(){const _0x248265=_0xe5069;this[_0x248265(0x336)]=!![],VisuMZ[_0x248265(0x5f4)]['Game_Event_setupPageSettings']['call'](this),this[_0x248265(0x1ec)](),this[_0x248265(0x616)](),this['_activationProximityAutoTriggerBypass']=![];},Game_Event[_0xe5069(0x678)][_0xe5069(0x1ec)]=function(){const _0x18fcb1=_0xe5069;if(!this[_0x18fcb1(0x54b)]())return;this[_0x18fcb1(0x3e8)](),this[_0x18fcb1(0x200)](),this[_0x18fcb1(0x313)](),this['updateEventsMoveCoreTagChanges']();},Game_Event[_0xe5069(0x678)][_0xe5069(0x200)]=function(){const _0x551e37=_0xe5069,_0x160d36=this['event']()['note'];if(_0x160d36==='')return;this[_0x551e37(0x385)](_0x160d36);},Game_Event[_0xe5069(0x678)]['setupEventsMoveCoreCommentTags']=function(){const _0x2ed972=_0xe5069;if(!this[_0x2ed972(0x5ab)]())return;const _0x3b4402=this['list']();let _0x50820f='';for(const _0x1c4434 of _0x3b4402){if([0x6c,0x198]['includes'](_0x1c4434['code'])){if(_0x50820f!=='')_0x50820f+='\x0a';_0x50820f+=_0x1c4434[_0x2ed972(0x5a1)][0x0];}}this[_0x2ed972(0x385)](_0x50820f);},Game_Event[_0xe5069(0x678)][_0xe5069(0x3e8)]=function(){const _0x2546fd=_0xe5069,_0x59ccad=VisuMZ[_0x2546fd(0x5f4)][_0x2546fd(0x553)];this[_0x2546fd(0x343)]={'type':_0x2546fd(0x1b1),'distance':0x0,'regionList':[]},this[_0x2546fd(0x60f)]=![],this[_0x2546fd(0x306)](),this[_0x2546fd(0x39c)]=![],this[_0x2546fd(0x3d4)]=![],(this[_0x2546fd(0x1bd)]()||this[_0x2546fd(0x23e)]())&&this['_priorityType']===0x0&&(this[_0x2546fd(0x3d4)]=0x0),this[_0x2546fd(0x51c)]={'up':0x0,'down':0x0,'left':0x0,'right':0x0},this[_0x2546fd(0x1d9)]={'type':_0x2546fd(0x1b1),'distance':0x0},this['_encounterNoneProximity']={'type':_0x2546fd(0x1b1),'distance':0x0},$gameSystem[_0x2546fd(0x58a)](this),this['_eventIcon']=$gameSystem[_0x2546fd(0x642)](this),this[_0x2546fd(0x60a)]={'originalText':'','text':'','visibleRange':_0x59ccad['Label']['VisibleRange'],'rangeType':_0x59ccad['Label'][_0x2546fd(0x637)],'offsetX':_0x59ccad[_0x2546fd(0x1ce)][_0x2546fd(0x2de)],'offsetY':_0x59ccad[_0x2546fd(0x1ce)][_0x2546fd(0x1e1)],'hueShift':0x0},this[_0x2546fd(0x265)]=![],this['_moveOnlyRegions']=[],this[_0x2546fd(0x48c)]={'target':-0x1,'type':_0x2546fd(0x283),'delay':0x1,'opacityDelta':0x0},this[_0x2546fd(0x2fe)]=_0x59ccad[_0x2546fd(0x595)][_0x2546fd(0x33e)]??0x0,this['_saveEventLocation']=![],this[_0x2546fd(0x33a)]=0x1,this[_0x2546fd(0x3ab)]=0x1,this[_0x2546fd(0x64a)]=![],this['_screenParallel']=![],this[_0x2546fd(0x67f)]=![],this['_shadowGraphic']={'visible':!![],'filename':_0x59ccad[_0x2546fd(0x595)][_0x2546fd(0x4d0)]},this['_tileExpand']={'up':0x0,'down':0x0,'left':0x0,'right':0x0},this[_0x2546fd(0x3cd)](),this[_0x2546fd(0x2c8)]();},Game_Event[_0xe5069(0x678)][_0xe5069(0x385)]=function(_0x5edf5d){const _0x1a9763=_0xe5069;if(_0x5edf5d['match'](/<ACTIVATION[ ](?:REGION|REGIONS):[ ]*(\d+(?:\s*,\s*\d+)*)>/i))this[_0x1a9763(0x343)][_0x1a9763(0x523)]=JSON[_0x1a9763(0x4e8)]('['+RegExp['$1'][_0x1a9763(0x506)](/\d+/g)+']'),this[_0x1a9763(0x343)][_0x1a9763(0x3e4)]=_0x1a9763(0x516);else _0x5edf5d['match'](/<ACTIVATION[ ](.*?):[ ](\d+)>/i)&&(type=String(RegExp['$1'])[_0x1a9763(0x1e4)]()[_0x1a9763(0x3d9)](),this[_0x1a9763(0x343)][_0x1a9763(0x3e4)]=type,this['_activationProximity']['distance']=Number(RegExp['$2']));_0x5edf5d[_0x1a9763(0x506)](/<(?:ATTACH |)PICTURE FILENAME:[ ](.*?)>/i)&&(this[_0x1a9763(0x5d4)][_0x1a9763(0x517)]=String(RegExp['$1']),this[_0x1a9763(0x5d4)][_0x1a9763(0x3e4)]=_0x1a9763(0x4ee));if(_0x5edf5d[_0x1a9763(0x506)](/<(?:ATTACH |)(?:PICTURE|ENEMY|SV ENEMY) BLEND MODE:[ ](.*?)>/i)){const _0x5b046f=String(RegExp['$1'])[_0x1a9763(0x4f8)]()[_0x1a9763(0x3d9)](),_0x387b80=[_0x1a9763(0x5c7),_0x1a9763(0x5bd),'MULTIPLY',_0x1a9763(0x31b)];this[_0x1a9763(0x5d4)][_0x1a9763(0x353)]=_0x387b80['indexOf'](_0x5b046f)['clamp'](0x0,0x3);}_0x5edf5d[_0x1a9763(0x506)](/<(?:ATTACH |)(?:PICTURE|ENEMY|SV ENEMY) (?:SIZE|MAX SIZE|MAX):[ ](\d+)>/i)&&(this[_0x1a9763(0x5d4)][_0x1a9763(0x487)]=Number(RegExp['$1']));_0x5edf5d[_0x1a9763(0x506)](/<(?:ATTACH |)(?:PICTURE|ENEMY|SV ENEMY) OFFSET X:[ ]([\+\-]\d+)>/i)&&(this[_0x1a9763(0x5d4)][_0x1a9763(0x2e1)]=Number(RegExp['$1']));_0x5edf5d[_0x1a9763(0x506)](/<(?:ATTACH |)(?:PICTURE|ENEMY|SV ENEMY) OFFSET Y:[ ]([\+\-]\d+)>/i)&&(this[_0x1a9763(0x5d4)][_0x1a9763(0x4a6)]=Number(RegExp['$1']));_0x5edf5d['match'](/<(?:ATTACH |)(?:PICTURE|ENEMY|SV ENEMY) OFFSET:[ ]([\+\-]\d+),[ ]([\+\-]\d+)>/i)&&(this[_0x1a9763(0x5d4)]['offsetX']=Number(RegExp['$1']),this[_0x1a9763(0x5d4)][_0x1a9763(0x4a6)]=Number(RegExp['$2']));_0x5edf5d['match'](/<(?:ATTACH |)(?:PICTURE|ENEMY|SV ENEMY) SCALE:[ ](\d+)([%％])>/i)&&(this[_0x1a9763(0x5d4)][_0x1a9763(0x58d)]=Number(RegExp['$1'])*0.01);_0x5edf5d[_0x1a9763(0x506)](/<(?:ATTACH |)PICTURE TYPE:[ ](.*?)>/i)&&(this[_0x1a9763(0x5d4)][_0x1a9763(0x3e4)]=String(RegExp['$1'])[_0x1a9763(0x1e4)]()[_0x1a9763(0x3d9)]());_0x5edf5d[_0x1a9763(0x506)](/<(?:ATTACH |)ENEMY FILENAME:[ ](.*?)>/i)&&(this['_attachPicture']['filename']=String(RegExp['$1']),this[_0x1a9763(0x5d4)]['type']=_0x1a9763(0x4de));_0x5edf5d[_0x1a9763(0x506)](/<(?:ATTACH |)SV ENEMY FILENAME:[ ](.*?)>/i)&&(this[_0x1a9763(0x5d4)]['filename']=String(RegExp['$1']),this['_attachPicture']['type']='sv\x20enemy');_0x5edf5d[_0x1a9763(0x506)](/<ALWAYS UPDATE MOVEMENT>/i)&&(this[_0x1a9763(0x60f)]=!![]);_0x5edf5d[_0x1a9763(0x506)](/<CLICK TRIGGER>/i)&&(this['_clickTrigger']=!![]);_0x5edf5d[_0x1a9763(0x506)](/<CUSTOM Z:[ ](.*?)>/i)&&(this[_0x1a9763(0x3d4)]=Number(RegExp['$1'])||0x0);_0x5edf5d[_0x1a9763(0x506)](/<ENC(?:|OUNTER) HALF[ ](.*?):[ ](\d+)>/i)&&(type=String(RegExp['$1'])[_0x1a9763(0x1e4)]()[_0x1a9763(0x3d9)](),this['_encounterHalfProximity'][_0x1a9763(0x3e4)]=type,this[_0x1a9763(0x1d9)][_0x1a9763(0x545)]=Number(RegExp['$2']));_0x5edf5d[_0x1a9763(0x506)](/<ENC(?:|OUNTER) NONE[ ](.*?):[ ](\d+)>/i)&&(type=String(RegExp['$1'])['toLowerCase']()[_0x1a9763(0x3d9)](),this[_0x1a9763(0x559)]['type']=type,this[_0x1a9763(0x559)]['distance']=Number(RegExp['$2']));const _0x1e4400=_0x5edf5d[_0x1a9763(0x506)](/<HITBOX[ ](.*?):[ ](\d+)>/gi);if(_0x1e4400)for(const _0x5508f5 of _0x1e4400){if(_0x5508f5[_0x1a9763(0x506)](/<HITBOX[ ](.*?):[ ](\d+)>/i)){const _0x3e420=String(RegExp['$1'])[_0x1a9763(0x1e4)]()[_0x1a9763(0x3d9)](),_0x31bab6=Number(RegExp['$2']);this[_0x1a9763(0x51c)][_0x3e420]=_0x31bab6;}}if(this[_0x1a9763(0x285)][_0x1a9763(0x233)]>=0x0&&!this[_0x1a9763(0x285)][_0x1a9763(0x41b)]){_0x5edf5d[_0x1a9763(0x506)](/<ICON:[ ](\d+)>/i)&&(this[_0x1a9763(0x285)][_0x1a9763(0x233)]=Number(RegExp['$1']));_0x5edf5d[_0x1a9763(0x506)](/<ICON (?:BUFFER|OFFSET) X:[ ]([\+\-]\d+)>/i)&&(this[_0x1a9763(0x285)][_0x1a9763(0x222)]=Number(RegExp['$1']));_0x5edf5d[_0x1a9763(0x506)](/<ICON (?:BUFFER|OFFSET) Y:[ ]([\+\-]\d+)>/i)&&(this[_0x1a9763(0x285)][_0x1a9763(0x255)]=Number(RegExp['$1']));_0x5edf5d[_0x1a9763(0x506)](/<ICON (?:BUFFER|OFFSET):[ ]([\+\-]\d+),[ ]([\+\-]\d+)>/i)&&(this['_eventIcon']['bufferX']=Number(RegExp['$1']),this[_0x1a9763(0x285)]['bufferY']=Number(RegExp['$2']));if(_0x5edf5d[_0x1a9763(0x506)](/<ICON BLEND MODE:[ ](.*?)>/i)){const _0x41ee72=String(RegExp['$1'])[_0x1a9763(0x4f8)]()['trim'](),_0x56bb25=[_0x1a9763(0x5c7),'ADDITIVE',_0x1a9763(0x37d),_0x1a9763(0x31b)];this[_0x1a9763(0x285)]['blendMode']=_0x56bb25[_0x1a9763(0x497)](_0x41ee72)[_0x1a9763(0x4ff)](0x0,0x3);}$gameSystem[_0x1a9763(0x201)](this,this[_0x1a9763(0x285)][_0x1a9763(0x233)],this[_0x1a9763(0x285)][_0x1a9763(0x222)],this[_0x1a9763(0x285)]['bufferY'],this[_0x1a9763(0x285)]['blendMode']);}if(_0x5edf5d[_0x1a9763(0x506)](/<LABEL:[ ](.*?)>/i)){let _0x298f33=String(RegExp['$1'])['trim']();this[_0x1a9763(0x60a)]['text']=_0x298f33,this[_0x1a9763(0x60a)]['originalText']=_0x298f33;}if(_0x5edf5d['match'](/<LABEL>\s*([\s\S]*)\s*<\/LABEL>/i)){let _0x369375=String(RegExp['$1'])[_0x1a9763(0x3d9)]();this['_labelWindow'][_0x1a9763(0x4d9)]=_0x369375,this[_0x1a9763(0x60a)][_0x1a9763(0x20d)]=_0x369375;}_0x5edf5d[_0x1a9763(0x506)](/<LABEL (?:BUFFER|OFFSET) X:[ ]([\+\-]\d+)>/i)&&(this[_0x1a9763(0x60a)]['offsetX']=Number(RegExp['$1']));_0x5edf5d[_0x1a9763(0x506)](/<LABEL (?:BUFFER|OFFSET) Y:[ ]([\+\-]\d+)>/i)&&(this[_0x1a9763(0x60a)][_0x1a9763(0x4a6)]=Number(RegExp['$1']));_0x5edf5d[_0x1a9763(0x506)](/<LABEL (?:BUFFER|OFFSET):[ ]([\+\-]\d+),[ ]([\+\-]\d+)>/i)&&(this[_0x1a9763(0x60a)][_0x1a9763(0x2e1)]=Number(RegExp['$1']),this[_0x1a9763(0x60a)][_0x1a9763(0x4a6)]=Number(RegExp['$2']));_0x5edf5d[_0x1a9763(0x506)](/<LABEL HUE SHIFT:[ ](.*?)>/i)&&(this[_0x1a9763(0x60a)][_0x1a9763(0x205)]=Number(RegExp['$1']));_0x5edf5d[_0x1a9763(0x506)](/<LABEL RANGE:[ ](\d+)>/i)&&(this['_labelWindow'][_0x1a9763(0x5dc)]=Number(RegExp['$1']));_0x5edf5d[_0x1a9763(0x506)](/<LABEL RANGE TYPE: SQUARE>/i)&&(this[_0x1a9763(0x60a)][_0x1a9763(0x4c2)]=_0x1a9763(0x479));_0x5edf5d['match'](/<LABEL RANGE TYPE: (?:RADIUS|DELTA|DIAMOND)>/i)&&(this[_0x1a9763(0x60a)][_0x1a9763(0x4c2)]=_0x1a9763(0x596));_0x5edf5d[_0x1a9763(0x506)](/<LABEL RANGE TYPE: CIRCLE>/i)&&(this[_0x1a9763(0x60a)][_0x1a9763(0x4c2)]=_0x1a9763(0x284));this['updateEventLabelText']();_0x5edf5d[_0x1a9763(0x506)](/<MIRROR SPRITE>/i)&&(this[_0x1a9763(0x265)]=!![]);if(_0x5edf5d['match'](/<MOVE ONLY (?:REGION|REGIONS):[ ](\d+(?:\s*,\s*\d+)*)>/i)){const _0x5b4bb9=JSON[_0x1a9763(0x4e8)]('['+RegExp['$1'][_0x1a9763(0x506)](/\d+/g)+']');this[_0x1a9763(0x54f)]=this['_moveOnlyRegions'][_0x1a9763(0x26e)](_0x5b4bb9),this[_0x1a9763(0x54f)][_0x1a9763(0x4c7)](0x0);}if(_0x5edf5d['match'](/<MOVE SYNCH TARGET:[ ](.*?)>/i)){const _0xf975b=String(RegExp['$1']);if(_0xf975b[_0x1a9763(0x506)](/PLAYER/i))this[_0x1a9763(0x48c)][_0x1a9763(0x3f5)]=0x0;else _0xf975b['match'](/EVENT[ ](\d+)/i)&&(this[_0x1a9763(0x48c)][_0x1a9763(0x3f5)]=Number(RegExp['$1']));}_0x5edf5d[_0x1a9763(0x506)](/<MOVE SYNCH TYPE:[ ](.*?)>/i)&&(this[_0x1a9763(0x48c)][_0x1a9763(0x3e4)]=String(RegExp['$1'])[_0x1a9763(0x1e4)]()[_0x1a9763(0x3d9)]());_0x5edf5d[_0x1a9763(0x506)](/<MOVE SYNCH DELAY:[ ](\d+)>/i)&&(this[_0x1a9763(0x48c)]['delay']=Number(RegExp['$1']));_0x5edf5d[_0x1a9763(0x506)](/<MOVE SYNCH DISTANCE OPACITY:[ ](.*?)>/i)&&(this[_0x1a9763(0x48c)][_0x1a9763(0x57a)]=Number(RegExp['$1']));if(_0x5edf5d[_0x1a9763(0x506)](/<TRUE RANDOM MOVE>/i))this['_randomMoveWeight']=0x0;else _0x5edf5d[_0x1a9763(0x506)](/<RANDOM MOVE WEIGHT:[ ](.*?)>/i)&&(this['_randomMoveWeight']=Number(RegExp['$1'])||0x0);_0x5edf5d['match'](/<SAVE EVENT (?:LOCATION|LOCATIONS)>/i)&&(this[_0x1a9763(0x19c)]=!![]);_0x5edf5d[_0x1a9763(0x506)](/<SCALE X:[ ](\d+)([%％])>/i)&&(this[_0x1a9763(0x33a)]=Number(RegExp['$1'])*0.01);_0x5edf5d[_0x1a9763(0x506)](/<SCALE Y:[ ](\d+)([%％])>/i)&&(this['_scaleBaseY']=Number(RegExp['$1'])*0.01);if(_0x5edf5d[_0x1a9763(0x506)](/<SCALE:[ ](\d+)([%％])>/i)){const _0x6e4927=Number(RegExp['$1'])*0.01;this[_0x1a9763(0x33a)]=_0x6e4927,this['_scaleBaseY']=_0x6e4927;}_0x5edf5d['match'](/<SCREEN ACTIVATION>/i)&&(this[_0x1a9763(0x64a)]=!![],this[_0x1a9763(0x5fb)]=![],this[_0x1a9763(0x67f)]=![]);if(_0x5edf5d[_0x1a9763(0x506)](/<SCREEN PARALLEL>/i))this[_0x1a9763(0x64a)]=![],this['_screenParallel']=!![],this[_0x1a9763(0x67f)]=![];else _0x5edf5d[_0x1a9763(0x506)](/<SCREEN PARALLEL ONCE>/i)&&(this[_0x1a9763(0x64a)]=![],this[_0x1a9763(0x5fb)]=!![],this['_screenParallelOnce']=!![]);_0x5edf5d[_0x1a9763(0x506)](/<HIDE SHADOW>/i)&&(this[_0x1a9763(0x2c2)][_0x1a9763(0x3ce)]=![]),_0x5edf5d[_0x1a9763(0x506)](/<SHADOW FILENAME:[ ](.*?)>/i)&&(this[_0x1a9763(0x2c2)][_0x1a9763(0x517)]=String(RegExp['$1'])),_0x5edf5d['match'](/<SPRITE OFFSET X:[ ]([\+\-]\d+)>/i)&&(this[_0x1a9763(0x489)]=Number(RegExp['$1'])),_0x5edf5d['match'](/<SPRITE OFFSET Y:[ ]([\+\-]\d+)>/i)&&(this[_0x1a9763(0x2a7)]=Number(RegExp['$1'])),_0x5edf5d[_0x1a9763(0x506)](/<SPRITE OFFSET:[ ]([\+\-]\d+),[ ]([\+\-]\d+)>/i)&&(this[_0x1a9763(0x489)]=Number(RegExp['$1']),this['_spriteOffsetY']=Number(RegExp['$2'])),_0x5edf5d[_0x1a9763(0x506)](/<STEP PATTERN:[ ](.*)>/i)&&(this[_0x1a9763(0x663)]=String(RegExp['$1'])['toUpperCase']()[_0x1a9763(0x3d9)]()),_0x5edf5d[_0x1a9763(0x506)](/<(?:TILE EXPAND|EXPAND TILE) UP:[ ](\d+)>/i)&&(this[_0x1a9763(0x1a8)]=this[_0x1a9763(0x1a8)]||{},this[_0x1a9763(0x1a8)]['up']=Number(RegExp['$1'])),_0x5edf5d[_0x1a9763(0x506)](/<(?:TILE EXPAND|EXPAND TILE) DOWN:[ ](\d+)>/i)&&(this['_tileExpand']=this['_tileExpand']||{},this['_tileExpand']['down']=Number(RegExp['$1'])),_0x5edf5d[_0x1a9763(0x506)](/<(?:TILE EXPAND|EXPAND TILE) LEFT:[ ](\d+)>/i)&&(this[_0x1a9763(0x1a8)]=this[_0x1a9763(0x1a8)]||{},this[_0x1a9763(0x1a8)][_0x1a9763(0x234)]=Number(RegExp['$1'])),_0x5edf5d[_0x1a9763(0x506)](/<(?:TILE EXPAND|EXPAND TILE) RIGHT:[ ](\d+)>/i)&&(this[_0x1a9763(0x1a8)]=this[_0x1a9763(0x1a8)]||{},this[_0x1a9763(0x1a8)][_0x1a9763(0x67e)]=Number(RegExp['$1']));},Game_Event[_0xe5069(0x678)][_0xe5069(0x3bb)]=function(){const _0x1fb377=_0xe5069;$gameTemp['registerSelfTarget'](this),this[_0x1fb377(0x60a)][_0x1fb377(0x4d9)]=this[_0x1fb377(0x60a)]['originalText'];for(;;){if(this[_0x1fb377(0x60a)]['text'][_0x1fb377(0x506)](/\\V\[(\d+)\]/gi))this['_labelWindow'][_0x1fb377(0x4d9)]=this['_labelWindow'][_0x1fb377(0x20d)]['replace'](/\\V\[(\d+)\]/gi,(_0x5bb9a9,_0x1a6ad6)=>$gameVariables[_0x1fb377(0x5ad)](parseInt(_0x1a6ad6)));else break;}$gameTemp[_0x1fb377(0x511)]();},Game_Event[_0xe5069(0x678)][_0xe5069(0x5c8)]=function(){const _0x48b36d=_0xe5069;this[_0x48b36d(0x63b)]();},Game_Event[_0xe5069(0x678)][_0xe5069(0x267)]=function(){const _0x20a057=_0xe5069;if(this[_0x20a057(0x60f)])return!![];return Game_Character['prototype']['isNearTheScreen'][_0x20a057(0x3ae)](this);},VisuMZ[_0xe5069(0x5f4)][_0xe5069(0x36b)]=Game_Event[_0xe5069(0x678)][_0xe5069(0x518)],Game_Event[_0xe5069(0x678)][_0xe5069(0x518)]=function(){const _0x34cbb9=_0xe5069;if(this[_0x34cbb9(0x605)]())return;VisuMZ[_0x34cbb9(0x5f4)]['Game_Event_updateSelfMovement'][_0x34cbb9(0x3ae)](this),this['isMoving']()&&VisuMZ[_0x34cbb9(0x399)](this[_0x34cbb9(0x374)]);},Game_Event[_0xe5069(0x678)]['isPreventSelfMovement']=function(){const _0x189284=_0xe5069,_0x335962=VisuMZ[_0x189284(0x5f4)][_0x189284(0x553)][_0x189284(0x595)];if($gameMap[_0x189284(0x371)]()&&_0x335962[_0x189284(0x28e)])return!![];if($gameMessage[_0x189284(0x566)]()&&_0x335962[_0x189284(0x55d)])return!![];if(!$gameSystem[_0x189284(0x2af)]())return!![];if(this[_0x189284(0x651)]()>=0x0)return!![];if(!SceneManager[_0x189284(0x3df)][_0x189284(0x29c)])return!![];return![];},Game_Event[_0xe5069(0x678)][_0xe5069(0x63b)]=function(){const _0x5870d9=_0xe5069,_0x3ab179=SceneManager['_scene']['_spriteset'];if(_0x3ab179){const _0x1adf77=_0x3ab179[_0x5870d9(0x618)](this);_0x1adf77&&_0x1adf77['_shadowSprite']&&_0x1adf77[_0x5870d9(0x5fd)][_0x5870d9(0x217)]!==this[_0x5870d9(0x48a)]()&&(_0x1adf77[_0x5870d9(0x5fd)][_0x5870d9(0x217)]=this[_0x5870d9(0x48a)](),_0x1adf77[_0x5870d9(0x5fd)]['bitmap']=ImageManager[_0x5870d9(0x5d6)](_0x1adf77[_0x5870d9(0x5fd)][_0x5870d9(0x217)]));}},Game_Event[_0xe5069(0x678)][_0xe5069(0x48a)]=function(){const _0x2a3c43=_0xe5069;return this['_shadowGraphic'][_0x2a3c43(0x517)];},Game_Event[_0xe5069(0x678)]['isShadowVisible']=function(){const _0x2f74a8=_0xe5069;if(!this[_0x2f74a8(0x2c2)][_0x2f74a8(0x3ce)])return![];return Game_CharacterBase['prototype'][_0x2f74a8(0x4fe)][_0x2f74a8(0x3ae)](this);},Game_Event[_0xe5069(0x678)][_0xe5069(0x1f5)]=function(){const _0x44b878=_0xe5069;return this['_labelWindow'][_0x44b878(0x4d9)];},Game_Event[_0xe5069(0x678)]['labelWindowRange']=function(){const _0x2eba35=_0xe5069;return this[_0x2eba35(0x60a)][_0x2eba35(0x5dc)]??VisuMZ[_0x2eba35(0x5f4)]['Settings'][_0x2eba35(0x1ce)][_0x2eba35(0x372)];},Game_Event[_0xe5069(0x678)][_0xe5069(0x5cf)]=function(){const _0xdee39f=_0xe5069;return this[_0xdee39f(0x60a)]['rangeType']??VisuMZ[_0xdee39f(0x5f4)][_0xdee39f(0x553)]['Label'][_0xdee39f(0x637)]??_0xdee39f(0x479);},VisuMZ[_0xe5069(0x5f4)][_0xe5069(0x2cd)]=function(_0x110f01){const _0x5dadcb=_0xe5069,_0xd310b7=_0x110f01[_0x5dadcb(0x5cf)](),_0x10f6c3=_0x110f01[_0x5dadcb(0x1fe)]();return $gameMap['checkEventProximity']($gamePlayer['x'],$gamePlayer['y'],_0x110f01,_0xd310b7,_0x10f6c3);},Game_Event[_0xe5069(0x678)][_0xe5069(0x1a5)]=function(_0x36151e,_0x231e68,_0x46a595){const _0x2e54d3=_0xe5069;if(this[_0x2e54d3(0x279)]())return this[_0x2e54d3(0x5f7)](_0x36151e,_0x231e68,_0x46a595);if($gameMap[_0x2e54d3(0x36c)](_0x36151e,_0x231e68,_0x46a595,'event'))return!![];if($gameMap[_0x2e54d3(0x5cb)](_0x36151e,_0x231e68,_0x46a595,_0x2e54d3(0x54b)))return![];return Game_Character['prototype'][_0x2e54d3(0x1a5)][_0x2e54d3(0x3ae)](this,_0x36151e,_0x231e68,_0x46a595);},Game_Event[_0xe5069(0x678)]['hasMoveOnlyRegions']=function(){const _0x73ca08=_0xe5069;if(this[_0x73ca08(0x54f)]===undefined)this[_0x73ca08(0x3e8)]();return this[_0x73ca08(0x54f)][_0x73ca08(0x243)]>0x0;},Game_Event[_0xe5069(0x678)][_0xe5069(0x5f7)]=function(_0x2b106d,_0x1fbcfa,_0x210edd){const _0xadce34=_0xe5069,_0x21c91d=$gameMap[_0xadce34(0x63a)](_0x2b106d,_0x210edd),_0x26d8e4=$gameMap[_0xadce34(0x19b)](_0x1fbcfa,_0x210edd),_0x1d6c86=$gameMap[_0xadce34(0x492)](_0x21c91d,_0x26d8e4);return this[_0xadce34(0x54f)][_0xadce34(0x22a)](_0x1d6c86);},VisuMZ[_0xe5069(0x5f4)][_0xe5069(0x3b1)]=Game_Event[_0xe5069(0x678)][_0xe5069(0x66b)],Game_Event[_0xe5069(0x678)][_0xe5069(0x66b)]=function(){const _0x49118a=_0xe5069;if(this[_0x49118a(0x54b)]()&&!$gameTemp['isPlaytest']()){if(this['event']()[_0x49118a(0x3b4)][_0x49118a(0x506)](/<(?:PLAYTEST|PLAY TEST)>/i))return-0x1;}return this[_0x49118a(0x56b)]=![],this[_0x49118a(0x4a2)]=![],this[_0x49118a(0x54b)]()?VisuMZ[_0x49118a(0x5f4)][_0x49118a(0x3b1)][_0x49118a(0x3ae)](this):-0x1;},VisuMZ[_0xe5069(0x5f4)][_0xe5069(0x67d)]=Game_Event[_0xe5069(0x678)][_0xe5069(0x49c)],Game_Event[_0xe5069(0x678)][_0xe5069(0x49c)]=function(_0x23fc63){const _0x1fa359=_0xe5069;this[_0x1fa359(0x32f)](_0x23fc63),$gameTemp['registerSelfTarget'](this);const _0x51ad29=VisuMZ[_0x1fa359(0x5f4)][_0x1fa359(0x67d)][_0x1fa359(0x3ae)](this,_0x23fc63);return $gameTemp[_0x1fa359(0x511)](),_0x51ad29;},Game_Event[_0xe5069(0x678)][_0xe5069(0x19f)]=function(){const _0x270943=_0xe5069;return this[_0x270943(0x56b)];},Game_Event['prototype'][_0xe5069(0x32f)]=function(_0x2006d4){const _0x12be5c=_0xe5069,_0x5eae94=_0x2006d4['conditions'];if(_0x5eae94[_0x12be5c(0x556)]&&DataManager[_0x12be5c(0x3f3)](_0x5eae94[_0x12be5c(0x598)]))this[_0x12be5c(0x56b)]=!![];else{if(_0x5eae94[_0x12be5c(0x496)]&&DataManager['isAdvancedSwitch'](_0x5eae94[_0x12be5c(0x455)]))this['_advancedSwitchVariable']=!![];else _0x5eae94['variableValid']&&DataManager[_0x12be5c(0x61e)](_0x5eae94[_0x12be5c(0x5fe)])&&(this['_advancedSwitchVariable']=!![]);}},Game_Event[_0xe5069(0x678)][_0xe5069(0x400)]=function(){if(this['_erased'])return![];return this['_clickTrigger'];},Game_Event[_0xe5069(0x678)][_0xe5069(0x604)]=function(){const _0x18c7bd=_0xe5069;$gameTemp[_0x18c7bd(0x676)](),this[_0x18c7bd(0x246)]();},Game_Event[_0xe5069(0x678)][_0xe5069(0x57b)]=function(_0x21d523,_0x28cdb8){const _0xc1eb1c=_0xe5069;return this[_0xc1eb1c(0x51c)]?this['posEventsMoveCore'](_0x21d523,_0x28cdb8):Game_Character[_0xc1eb1c(0x678)][_0xc1eb1c(0x57b)][_0xc1eb1c(0x3ae)](this,_0x21d523,_0x28cdb8);},Game_Event[_0xe5069(0x678)]['posEventsMoveCore']=function(_0x59cd2b,_0x31e6dc){const _0x191965=_0xe5069;var _0x1e5b3b=this['x']-this[_0x191965(0x51c)][_0x191965(0x234)],_0x2163dc=this['x']+this[_0x191965(0x51c)][_0x191965(0x67e)],_0xb5032e=this['y']-this[_0x191965(0x51c)]['up'],_0xd6b1f6=this['y']+this[_0x191965(0x51c)][_0x191965(0x3b5)];return _0x1e5b3b<=_0x59cd2b&&_0x59cd2b<=_0x2163dc&&_0xb5032e<=_0x31e6dc&&_0x31e6dc<=_0xd6b1f6;},VisuMZ[_0xe5069(0x5f4)][_0xe5069(0x608)]=Game_Event[_0xe5069(0x678)][_0xe5069(0x2e9)],Game_Event[_0xe5069(0x678)][_0xe5069(0x2e9)]=function(_0x34716e,_0x1d079a,_0x54d6f6){const _0x394a99=_0xe5069;for(let _0x574439=-this['_addedHitbox'][_0x394a99(0x234)];_0x574439<=this[_0x394a99(0x51c)]['right'];_0x574439++){for(let _0x5d9e54=-this[_0x394a99(0x51c)]['up'];_0x5d9e54<=this['_addedHitbox'][_0x394a99(0x3b5)];_0x5d9e54++){if(!Game_Character[_0x394a99(0x678)]['canPass']['call'](this,_0x34716e+_0x574439,_0x1d079a+_0x5d9e54,_0x54d6f6))return![];}}return!![];},Game_Event[_0xe5069(0x678)][_0xe5069(0x1c4)]=function(_0x4573a7,_0x26f56e){const _0x389a87=_0xe5069;if(Imported[_0x389a87(0x4a5)]&&this['isSmartEventCollisionOn']())return this[_0x389a87(0x44d)](_0x4573a7,_0x26f56e);else{const _0x4c2992=$gameMap[_0x389a87(0x2d2)](_0x4573a7,_0x26f56e)['filter'](_0x17c2eb=>_0x17c2eb!==this);return _0x4c2992['length']>0x0;}},Game_Event[_0xe5069(0x678)][_0xe5069(0x44d)]=function(_0x5c2ab5,_0x7e75a7){const _0x3b4ede=_0xe5069;if(!this[_0x3b4ede(0x304)]())return![];else{const _0x40834d=$gameMap['eventsXyNt'](_0x5c2ab5,_0x7e75a7)[_0x3b4ede(0x617)](_0x273011=>_0x273011!==this&&_0x273011[_0x3b4ede(0x304)]());return _0x40834d['length']>0x0;}},Game_Event[_0xe5069(0x678)][_0xe5069(0x417)]=function(){const _0x529a75=_0xe5069;if(!this[_0x529a75(0x343)])return _0x529a75(0x1b1);return this[_0x529a75(0x343)]['type']||'none';},Game_Event[_0xe5069(0x678)]['activationProximityDistance']=function(){const _0xf1b66b=_0xe5069;if(!this[_0xf1b66b(0x343)])return 0x0;return this[_0xf1b66b(0x343)][_0xf1b66b(0x545)]||0x0;},Game_Event[_0xe5069(0x678)][_0xe5069(0x1f4)]=function(){const _0x4e6d02=_0xe5069;if(!this[_0x4e6d02(0x343)])return[];return this[_0x4e6d02(0x343)][_0x4e6d02(0x523)]||[];},Game_Event[_0xe5069(0x678)][_0xe5069(0x3c7)]=function(){const _0x19efb=_0xe5069;Game_Character['prototype'][_0x19efb(0x3c7)]['call'](this);if([_0x19efb(0x1b1),'region'][_0x19efb(0x22a)](this[_0x19efb(0x417)]()))return;$gamePlayer[_0x19efb(0x628)]([0x2]);},Game_Event['prototype'][_0xe5069(0x56a)]=function(){const _0x50d9b0=_0xe5069,_0x3b04a4=Math[_0x50d9b0(0x471)]($gameMap[_0x50d9b0(0x1a6)]),_0x5f02f2=_0x3b04a4+Math[_0x50d9b0(0x443)]($gameMap[_0x50d9b0(0x476)]())-0x1,_0x2cff61=Math[_0x50d9b0(0x471)]($gameMap['_displayY']),_0x3b52e7=_0x2cff61+Math[_0x50d9b0(0x443)]($gameMap['screenTileY']())-0x1;return this['x']>=_0x3b04a4&&this['x']<=_0x5f02f2&&this['y']>=_0x2cff61&&this['y']<=_0x3b52e7;},VisuMZ[_0xe5069(0x5f4)][_0xe5069(0x1f9)]=Game_Event[_0xe5069(0x678)]['checkEventTriggerAuto'],Game_Event[_0xe5069(0x678)][_0xe5069(0x588)]=function(){const _0x23e78f=_0xe5069;if(this[_0x23e78f(0x64a)]||this['_screenParallel']){if(this[_0x23e78f(0x56a)]()){if(!this[_0x23e78f(0x4a4)]){this[_0x23e78f(0x4a4)]=!![];if(this[_0x23e78f(0x64a)])this[_0x23e78f(0x246)]();else this[_0x23e78f(0x5fb)]&&(!this[_0x23e78f(0x249)]&&(this[_0x23e78f(0x249)]=new Game_Interpreter()),this[_0x23e78f(0x249)][_0x23e78f(0x339)](this[_0x23e78f(0x41a)](),this[_0x23e78f(0x374)]));}return;}else{this[_0x23e78f(0x4a4)]=![];return;}}if(this[_0x23e78f(0x1af)]!==0x3)return;if(this[_0x23e78f(0x336)])return;if(!this[_0x23e78f(0x366)](![]))return;if(!this[_0x23e78f(0x1d6)](![]))return;VisuMZ['EventsMoveCore']['Game_Event_checkEventTriggerAuto'][_0x23e78f(0x3ae)](this);},VisuMZ[_0xe5069(0x5f4)][_0xe5069(0x30a)]=Game_Event[_0xe5069(0x678)][_0xe5069(0x29a)],Game_Event[_0xe5069(0x678)][_0xe5069(0x29a)]=function(){const _0x478e94=_0xe5069;if(!this[_0x478e94(0x249)])return;if(!this[_0x478e94(0x366)](!![]))return;if(!this[_0x478e94(0x1d6)](!![]))return;if(this[_0x478e94(0x249)]&&!this[_0x478e94(0x249)][_0x478e94(0x38c)]()&&this[_0x478e94(0x5fb)]){!this[_0x478e94(0x67f)]&&(this[_0x478e94(0x4a4)]=![]);return;}VisuMZ['EventsMoveCore']['Game_Event_updateParallel'][_0x478e94(0x3ae)](this);},Game_Event[_0xe5069(0x678)]['checkRegionEventTrigger']=function(_0x51db98){const _0x1924d8=_0xe5069;if(!_0x51db98&&$gameMap[_0x1924d8(0x371)]())return![];if(!_0x51db98&&$gameMap[_0x1924d8(0x2bc)]())return![];if(this[_0x1924d8(0x1f4)]()<=0x0)return!![];return $gamePlayer[_0x1924d8(0x1e3)](this);},Game_Event[_0xe5069(0x678)]['checkActivationProximity']=function(_0x7b6abd){const _0xd9b096=_0xe5069;if(!_0x7b6abd&&$gameMap[_0xd9b096(0x371)]())return![];if(!_0x7b6abd&&$gameMap[_0xd9b096(0x2bc)]())return![];if([_0xd9b096(0x1b1),_0xd9b096(0x516)]['includes'](this['activationProximityType']()))return!![];return $gamePlayer[_0xd9b096(0x448)](this);},Game_Event[_0xe5069(0x678)]['encounterProximityType']=function(_0x39a4e6){const _0x91a7e=_0xe5069,_0x4cbb4a=_0x39a4e6?this[_0x91a7e(0x1d9)]:this[_0x91a7e(0x559)];return _0x4cbb4a?_0x4cbb4a['type']:_0x91a7e(0x1b1);},Game_Event[_0xe5069(0x678)][_0xe5069(0x3a4)]=function(_0x3b7e29){const _0x37df84=_0xe5069,_0x463683=_0x3b7e29?this[_0x37df84(0x1d9)]:this['_encounterNoneProximity'];return _0x463683?_0x463683[_0x37df84(0x545)]:0x0;},VisuMZ[_0xe5069(0x399)]=function(_0x52e704){const _0x45248d=_0xe5069;for(const _0x1abb39 of $gameMap[_0x45248d(0x449)]()){if(!_0x1abb39)continue;_0x1abb39[_0x45248d(0x651)]()===_0x52e704&&_0x1abb39[_0x45248d(0x4b3)]();}},VisuMZ[_0xe5069(0x37c)]=function(_0x17bcd4){const _0x370597=_0xe5069;if(_0x17bcd4===0x0)return $gamePlayer;return $gameMap[_0x370597(0x54b)](_0x17bcd4);},Game_CharacterBase[_0xe5069(0x678)]['updateMoveSynchDirection']=function(){},Game_Event['prototype'][_0xe5069(0x5f9)]=function(){const _0x401342=_0xe5069;VisuMZ[_0x401342(0x5ee)](this[_0x401342(0x374)]);},VisuMZ[_0xe5069(0x5ee)]=function(_0x15c1ad){const _0x52763a=_0xe5069;for(const _0x3f0940 of $gameMap['events']()){if(!_0x3f0940)continue;_0x3f0940[_0x52763a(0x651)]()===_0x15c1ad&&_0x3f0940[_0x52763a(0x4fa)]();}},Game_Event[_0xe5069(0x678)][_0xe5069(0x651)]=function(){const _0x3d6b73=_0xe5069;return this[_0x3d6b73(0x48c)][_0x3d6b73(0x3f5)];},Game_Event[_0xe5069(0x678)][_0xe5069(0x1dc)]=function(){const _0x7fb356=_0xe5069;return this['_moveSynch'][_0x7fb356(0x3e4)];},Game_Event['prototype']['realMoveSpeed']=function(){const _0x1f34d0=_0xe5069;if(this[_0x1f34d0(0x651)]()>=0x0){const _0x578b8f=VisuMZ[_0x1f34d0(0x37c)](this['moveSynchTarget']());if(_0x578b8f)return _0x578b8f['realMoveSpeed']();}return Game_Character[_0x1f34d0(0x678)]['realMoveSpeed'][_0x1f34d0(0x3ae)](this);},Game_Event[_0xe5069(0x678)]['updateMoveSynch']=function(){const _0x356810=_0xe5069;this[_0x356810(0x48c)][_0x356810(0x60c)]=this[_0x356810(0x48c)][_0x356810(0x60c)]||0x0,this[_0x356810(0x48c)]['timer']--;if(this['_moveSynch'][_0x356810(0x60c)]>0x0)return;this[_0x356810(0x48c)][_0x356810(0x60c)]=this[_0x356810(0x48c)]['delay'],this[_0x356810(0x350)]();},Game_Event['prototype'][_0xe5069(0x656)]=function(_0x14da3f){const _0x551bee=_0xe5069;if(this[_0x551bee(0x651)]()>=0x0){const _0x39d5b4=VisuMZ[_0x551bee(0x37c)](this[_0x551bee(0x651)]());if(_0x39d5b4){const _0x27c78b=$gameMap[_0x551bee(0x545)](this[_0x551bee(0x1a4)],this[_0x551bee(0x39b)],_0x39d5b4['_realX'],_0x39d5b4['_realY'])-0x1,_0x433fd3=Math[_0x551bee(0x346)]($gameMap[_0x551bee(0x305)](),$gameMap[_0x551bee(0x470)]()),_0x67530=this[_0x551bee(0x48c)][_0x551bee(0x57a)]||0x0;_0x14da3f-=Math[_0x551bee(0x314)](0x0,_0x27c78b)*_0x433fd3*_0x67530;}}return _0x14da3f;},Game_Event[_0xe5069(0x678)][_0xe5069(0x350)]=function(){const _0x55784d=_0xe5069;switch(this['moveSynchType']()){case _0x55784d(0x283):this['processMoveSynchRandom']();break;case'approach':this['processMoveSynchApproach']();break;case _0x55784d(0x3b6):this[_0x55784d(0x1c6)]();break;case _0x55784d(0x1ed):this[_0x55784d(0x22f)]();break;case _0x55784d(0x31f):case _0x55784d(0x3f8):this['processMoveSynchMimic']();break;case _0x55784d(0x1f1):case'reverse\x20copy':this['processMoveSynchReverseMimic']();break;case _0x55784d(0x2b1):case _0x55784d(0x2e7):case'mirror\x20horz':case'horz\x20mirror':this[_0x55784d(0x259)]();break;case _0x55784d(0x64f):case _0x55784d(0x50c):case _0x55784d(0x258):case _0x55784d(0x552):this[_0x55784d(0x4bf)]();break;default:this[_0x55784d(0x35e)]();break;}this[_0x55784d(0x59e)]();},Game_Event['prototype'][_0xe5069(0x35e)]=function(){const _0xc8c95a=_0xe5069,_0x20eebf=[0x2,0x4,0x6,0x8];$gameMap[_0xc8c95a(0x43c)]()&&_0x20eebf['push'](0x1,0x3,0x7,0x9);const _0x55cb63=[];for(const _0x285e68 of _0x20eebf){if(this[_0xc8c95a(0x2e9)](this['x'],this['y'],_0x285e68))_0x55cb63['push'](_0x285e68);}if(_0x55cb63[_0xc8c95a(0x243)]>0x0){const _0x68173=_0x55cb63[Math[_0xc8c95a(0x364)](_0x55cb63[_0xc8c95a(0x243)])];this[_0xc8c95a(0x276)](_0x68173);}},Game_Event[_0xe5069(0x678)][_0xe5069(0x5b3)]=function(){const _0x159c92=_0xe5069,_0x467c1f=VisuMZ['GetMoveSynchTarget'](this[_0x159c92(0x651)]());this[_0x159c92(0x4b9)](_0x467c1f);},Game_Event[_0xe5069(0x678)]['processMoveSynchAway']=function(){const _0x27fce3=_0xe5069,_0x53a5f1=VisuMZ[_0x27fce3(0x37c)](this[_0x27fce3(0x651)]());this[_0x27fce3(0x2ac)](_0x53a5f1);},Game_Event[_0xe5069(0x678)][_0xe5069(0x22f)]=function(){const _0x12efd0=_0xe5069;this[_0x12efd0(0x615)]();},Game_Event['prototype'][_0xe5069(0x271)]=function(){const _0x4f2d30=_0xe5069,_0x17607a=VisuMZ[_0x4f2d30(0x37c)](this[_0x4f2d30(0x651)]());this[_0x4f2d30(0x276)](_0x17607a[_0x4f2d30(0x380)]());},Game_Event['prototype'][_0xe5069(0x531)]=function(){const _0x2e9f5d=_0xe5069,_0x49dca0=VisuMZ[_0x2e9f5d(0x37c)](this[_0x2e9f5d(0x651)]());this[_0x2e9f5d(0x276)](this[_0x2e9f5d(0x2c6)](_0x49dca0[_0x2e9f5d(0x380)]()));},Game_Event[_0xe5069(0x678)][_0xe5069(0x259)]=function(){const _0x6bdab=_0xe5069,_0x2f143a=VisuMZ[_0x6bdab(0x37c)](this[_0x6bdab(0x651)]()),_0x43f4f6=[0x0,0x7,0x8,0x9,0x4,0x0,0x6,0x1,0x2,0x3][_0x2f143a['lastMovedDirection']()];this[_0x6bdab(0x276)](_0x43f4f6);},Game_Event[_0xe5069(0x678)][_0xe5069(0x4bf)]=function(){const _0x5e87dd=_0xe5069,_0x31071c=VisuMZ[_0x5e87dd(0x37c)](this[_0x5e87dd(0x651)]()),_0x5e6c0c=[0x0,0x3,0x2,0x1,0x6,0x0,0x4,0x9,0x8,0x7][_0x31071c[_0x5e87dd(0x380)]()];this[_0x5e87dd(0x276)](_0x5e6c0c);},Game_Event[_0xe5069(0x678)][_0xe5069(0x4fa)]=function(){const _0x137a79=_0xe5069,_0x15ebe4=VisuMZ[_0x137a79(0x37c)](this[_0x137a79(0x651)]()),_0x5305df=_0x15ebe4[_0x137a79(0x4ed)]();switch(this[_0x137a79(0x1dc)]()){case _0x137a79(0x31f):case _0x137a79(0x3f8):this[_0x137a79(0x3d5)](_0x5305df);break;case'reverse\x20mimic':case _0x137a79(0x24b):this[_0x137a79(0x3d5)](this[_0x137a79(0x2c6)](_0x5305df));break;case _0x137a79(0x2b1):case _0x137a79(0x2e7):case'mirror\x20horz':case _0x137a79(0x280):this['setDirection']([0x0,0x7,0x8,0x9,0x4,0x0,0x6,0x1,0x2,0x3][_0x5305df]);break;case _0x137a79(0x64f):case _0x137a79(0x50c):case _0x137a79(0x258):case _0x137a79(0x552):this[_0x137a79(0x3d5)]([0x0,0x3,0x2,0x1,0x6,0x0,0x4,0x9,0x8,0x7][_0x5305df]);break;default:return;}this[_0x137a79(0x59e)]();},Game_Event['prototype'][_0xe5069(0x5ef)]=function(){const _0x3c061d=_0xe5069,_0x563bf3=$gameSystem['getSavedEventLocation'](this);if(!_0x563bf3)return;this[_0x3c061d(0x580)](_0x563bf3['x'],_0x563bf3['y']),this[_0x3c061d(0x4da)](),this['setDirection'](_0x563bf3[_0x3c061d(0x4ed)]),this[_0x3c061d(0x4fd)]===_0x563bf3[_0x3c061d(0x49a)]&&(this[_0x3c061d(0x4f3)]=_0x563bf3[_0x3c061d(0x322)]);},VisuMZ[_0xe5069(0x5f4)]['Game_Event_update']=Game_Event[_0xe5069(0x678)][_0xe5069(0x59e)],Game_Event['prototype'][_0xe5069(0x59e)]=function(){const _0x1ab194=_0xe5069;VisuMZ[_0x1ab194(0x5f4)][_0x1ab194(0x362)][_0x1ab194(0x3ae)](this),!Utils['isMobileDevice']()&&this[_0x1ab194(0x63e)]();},Game_Event['prototype']['updateMove']=function(){const _0x80b933=_0xe5069;Game_Character['prototype']['updateMove'][_0x80b933(0x3ae)](this),this['autosaveEventLocation']();},Game_Event[_0xe5069(0x678)][_0xe5069(0x404)]=function(){const _0x141c3f=_0xe5069;if($gameMap[_0x141c3f(0x4dd)]())return!![];return this[_0x141c3f(0x19c)];},Game_Event['prototype'][_0xe5069(0x616)]=function(){const _0x53c255=_0xe5069;if(!this[_0x53c255(0x404)]())return;this[_0x53c255(0x5aa)]();},Game_Event[_0xe5069(0x678)][_0xe5069(0x5aa)]=function(){const _0x315a0f=_0xe5069;this[_0x315a0f(0x38d)]=!![];},Game_Event[_0xe5069(0x678)][_0xe5069(0x63e)]=function(){const _0x5acf17=_0xe5069;this[_0x5acf17(0x38d)]&&this[_0x5acf17(0x34a)]();},Game_Event[_0xe5069(0x678)][_0xe5069(0x34a)]=function(){const _0x107c64=_0xe5069;this[_0x107c64(0x38d)]=![],$gameSystem[_0x107c64(0x5aa)](this);},Game_Event[_0xe5069(0x678)][_0xe5069(0x307)]=function(){const _0x2360b2=_0xe5069;$gameSystem[_0x2360b2(0x223)](this);},Game_Event[_0xe5069(0x678)]['getEventIconData']=function(){const _0x2728d0=_0xe5069;return $gameSystem[_0x2728d0(0x642)](this)?Game_Character[_0x2728d0(0x678)]['getEventIconData'][_0x2728d0(0x3ae)](this):{'iconIndex':0x0,'bufferX':settings[_0x2728d0(0x290)][_0x2728d0(0x49e)],'bufferY':settings[_0x2728d0(0x290)]['BufferY'],'blendMode':settings['Icon']['BlendMode']};},Game_Event[_0xe5069(0x678)][_0xe5069(0x576)]=function(){const _0x1ffc59=_0xe5069;return this[_0x1ffc59(0x4a2)];},VisuMZ[_0xe5069(0x5f4)][_0xe5069(0x653)]=Game_Event['prototype'][_0xe5069(0x49c)],Game_Event[_0xe5069(0x678)]['meetsConditions']=function(_0xb74173){const _0xac29e6=_0xe5069,_0x4c8d69=VisuMZ[_0xac29e6(0x5f4)]['Game_Event_meetsConditionsCPC'][_0xac29e6(0x3ae)](this,_0xb74173);if(!_0x4c8d69)return![];return this[_0xac29e6(0x394)](_0xb74173);},Game_Event['prototype'][_0xe5069(0x394)]=function(_0x1ec5d1){const _0x534af3=_0xe5069;VisuMZ[_0x534af3(0x5f4)][_0x534af3(0x466)][_0x534af3(0x568)](_0x1ec5d1),this[_0x534af3(0x4a2)]=_0x1ec5d1['CPC'][_0x534af3(0x243)]>0x0;_0x1ec5d1['CPC']===undefined&&VisuMZ[_0x534af3(0x5f4)][_0x534af3(0x466)][_0x534af3(0x568)](_0x1ec5d1);if(_0x1ec5d1['CPC']['length']>0x0)return $gameMap['event'](this[_0x534af3(0x374)])&&VisuMZ[_0x534af3(0x5f4)]['CustomPageConditions']['metCPC'](_0x1ec5d1[_0x534af3(0x52d)],this['_eventId']);return!![];},VisuMZ[_0xe5069(0x5f4)][_0xe5069(0x4f2)]=Game_Troop[_0xe5069(0x678)][_0xe5069(0x49c)],Game_Troop[_0xe5069(0x678)]['meetsConditions']=function(_0x336804){const _0x3ebf5b=_0xe5069;var _0x2fd23b=VisuMZ[_0x3ebf5b(0x5f4)]['Game_Troop_meetsConditionsCPC'][_0x3ebf5b(0x3ae)](this,_0x336804);return _0x2fd23b&&this[_0x3ebf5b(0x213)](_0x336804);},Game_Troop[_0xe5069(0x678)][_0xe5069(0x213)]=function(_0xdb25b){const _0x116e33=_0xe5069;_0xdb25b[_0x116e33(0x52d)]===undefined&&VisuMZ['EventsMoveCore'][_0x116e33(0x466)][_0x116e33(0x568)](_0xdb25b);if(_0xdb25b[_0x116e33(0x52d)]['length']>0x0)return VisuMZ[_0x116e33(0x5f4)]['CustomPageConditions']['metCPC'](_0xdb25b[_0x116e33(0x52d)],0x0);return!![];},VisuMZ[_0xe5069(0x5f4)][_0xe5069(0x5af)]=Game_Event[_0xe5069(0x678)][_0xe5069(0x378)],Game_Event[_0xe5069(0x678)][_0xe5069(0x378)]=function(_0x18a013,_0xdb915a){const _0x3747c1=_0xe5069;if(this[_0x3747c1(0x675)]){const _0x4c3f08=this[_0x3747c1(0x54b)]()[_0x3747c1(0x3b4)]||'';if(_0x4c3f08[_0x3747c1(0x506)](/<(?:LOCATION|START|START LOCATION):[ ](.*?)>/i)){const _0x2f757d=String(RegExp['$1'])[_0x3747c1(0x395)](',')[_0x3747c1(0x45d)](_0x155a36=>Number(_0x155a36));_0x18a013+=Number(_0x2f757d[0x0]||0x0)||0x0,_0xdb915a+=Number(_0x2f757d[0x1]||0x0)||0x0;}_0x4c3f08['match'](/<(?:LOCATION|START|START LOCATION) X:[ ](.*?)>/i)&&(_0x18a013+=Number(RegExp['$1'])),_0x4c3f08[_0x3747c1(0x506)](/<(?:LOCATION|START|START LOCATION) Y:[ ](.*?)>/i)&&(_0xdb915a+=Number(RegExp['$1']));}VisuMZ[_0x3747c1(0x5f4)][_0x3747c1(0x5af)][_0x3747c1(0x3ae)](this,_0x18a013,_0xdb915a),this['_randomHomeX']=_0x18a013,this['_randomHomeY']=_0xdb915a,this[_0x3747c1(0x616)]();},VisuMZ['EventsMoveCore'][_0xe5069(0x28f)]=Game_Event[_0xe5069(0x678)]['moveTypeRandom'],Game_Event['prototype'][_0xe5069(0x42a)]=function(){const _0x5ba93c=_0xe5069,_0x4af294=$gameMap[_0x5ba93c(0x545)](this['x'],this['y'],this['_randomHomeX'],this[_0x5ba93c(0x4c0)]),_0x4fbdaf=_0x4af294*(this[_0x5ba93c(0x2fe)]||0x0);Math[_0x5ba93c(0x283)]()>=_0x4fbdaf?VisuMZ[_0x5ba93c(0x5f4)]['Game_Event_moveTypeRandom'][_0x5ba93c(0x3ae)](this):this[_0x5ba93c(0x54d)]();},Game_Event['prototype'][_0xe5069(0x54d)]=function(){const _0x24b724=_0xe5069,_0x47f1b5=this[_0x24b724(0x1ab)](this[_0x24b724(0x5c0)]),_0x4f6b27=this[_0x24b724(0x1f2)](this[_0x24b724(0x4c0)]);if(Math[_0x24b724(0x5e6)](_0x47f1b5)>Math[_0x24b724(0x5e6)](_0x4f6b27))this[_0x24b724(0x392)](_0x47f1b5>0x0?0x4:0x6),!this['isMovementSucceeded']()&&_0x4f6b27!==0x0&&this[_0x24b724(0x392)](_0x4f6b27>0x0?0x8:0x2);else _0x4f6b27!==0x0&&(this[_0x24b724(0x392)](_0x4f6b27>0x0?0x8:0x2),!this[_0x24b724(0x4ad)]()&&_0x47f1b5!==0x0&&this[_0x24b724(0x392)](_0x47f1b5>0x0?0x4:0x6));},Game_CharacterBase[_0xe5069(0x678)][_0xe5069(0x306)]=function(){const _0x319f85=_0xe5069;this[_0x319f85(0x5d4)]={'filename':'','type':'picture','blendMode':0x0,'maxSize':0x0,'offsetX':0x0,'offsetY':0x0,'scale':0x1};},Game_CharacterBase[_0xe5069(0x678)][_0xe5069(0x3c9)]=function(){const _0x417abd=_0xe5069;if(this[_0x417abd(0x5d4)]===undefined)this['clearAttachPictureSettings']();return this[_0x417abd(0x5d4)];},Game_CharacterBase['prototype'][_0xe5069(0x302)]=function(){const _0xf594cc=_0xe5069;return this[_0xf594cc(0x3c9)]()['filename']??'';},Game_CharacterBase[_0xe5069(0x678)][_0xe5069(0x54e)]=function(){const _0x2129a5=_0xe5069;return this['attachPictureSettings']()[_0x2129a5(0x4ee)]??'picture';},Game_CharacterBase[_0xe5069(0x678)][_0xe5069(0x1e2)]=function(){const _0x55cdf0=_0xe5069;return this[_0x55cdf0(0x3c9)]()[_0x55cdf0(0x353)]??0x0;},Game_CharacterBase[_0xe5069(0x678)][_0xe5069(0x2f8)]=function(){const _0x2b10dc=_0xe5069;return this[_0x2b10dc(0x3c9)]()[_0x2b10dc(0x487)]??0x0;},Game_CharacterBase['prototype'][_0xe5069(0x2cf)]=function(){const _0x57174a=_0xe5069;return this[_0x57174a(0x3c9)]()[_0x57174a(0x2e1)]??0x0;},Game_CharacterBase[_0xe5069(0x678)][_0xe5069(0x658)]=function(){const _0x4b70f9=_0xe5069;return this[_0x4b70f9(0x3c9)]()[_0x4b70f9(0x4a6)]??0x0;},Game_CharacterBase[_0xe5069(0x678)][_0xe5069(0x328)]=function(){const _0x50da81=_0xe5069;return this['attachPictureSettings']()[_0x50da81(0x58d)]??0x1;},VisuMZ[_0xe5069(0x5f4)][_0xe5069(0x4e0)]=Game_Interpreter['prototype']['updateWaitMode'],Game_Interpreter[_0xe5069(0x678)]['updateWaitMode']=function(){const _0x5e17f1=_0xe5069;if(this['_waitMode']==='CallEvent'){if(window[this[_0x5e17f1(0x44b)]])this['_waitMode']='',this['startCallEvent']();else return!![];}else return VisuMZ['EventsMoveCore'][_0x5e17f1(0x4e0)][_0x5e17f1(0x3ae)](this);},VisuMZ[_0xe5069(0x5f4)][_0xe5069(0x51f)]=Game_Interpreter[_0xe5069(0x678)][_0xe5069(0x24e)],Game_Interpreter[_0xe5069(0x678)][_0xe5069(0x24e)]=function(){const _0x3ee9db=_0xe5069,_0x590a16=$gameMap&&this['_eventId']?$gameMap['event'](this[_0x3ee9db(0x374)]):null;$gameTemp[_0x3ee9db(0x32a)](_0x590a16);const _0x5ca3a6=VisuMZ[_0x3ee9db(0x5f4)][_0x3ee9db(0x51f)][_0x3ee9db(0x3ae)](this);return $gameTemp[_0x3ee9db(0x511)](),_0x5ca3a6;},VisuMZ[_0xe5069(0x5f4)]['Game_Interpreter_PluginCommand']=Game_Interpreter[_0xe5069(0x678)]['command357'],Game_Interpreter['prototype'][_0xe5069(0x46b)]=function(_0x3ef9cf){const _0x2a0a17=_0xe5069;return $gameTemp[_0x2a0a17(0x20f)](this),VisuMZ[_0x2a0a17(0x5f4)][_0x2a0a17(0x4e2)][_0x2a0a17(0x3ae)](this,_0x3ef9cf);},Game_Interpreter[_0xe5069(0x678)][_0xe5069(0x413)]=function(_0x2a007e){const _0x5a5698=_0xe5069;this[_0x5a5698(0x645)]=_0x2a007e;const _0x24969b=_0x5a5698(0x4bb)[_0x5a5698(0x52c)](_0x2a007e[_0x5a5698(0x5a6)][_0x5a5698(0x59a)](0x3));this[_0x5a5698(0x44b)]=_0x5a5698(0x27e)+Graphics[_0x5a5698(0x671)]+'_'+this[_0x5a5698(0x21e)](),DataManager[_0x5a5698(0x36d)](this[_0x5a5698(0x44b)],_0x24969b),window[this[_0x5a5698(0x44b)]]?this[_0x5a5698(0x1e5)]():this['setWaitMode'](_0x5a5698(0x1c2));},Game_Interpreter['prototype'][_0xe5069(0x1e5)]=function(){const _0x33988a=_0xe5069,_0x15a51f=this[_0x33988a(0x645)],_0x2f8d68=window[this['_callEventMap']],_0x26d466=_0x2f8d68[_0x33988a(0x449)][_0x15a51f[_0x33988a(0x21e)]];if(_0x26d466&&_0x26d466[_0x33988a(0x4a8)][_0x15a51f['pageId']-0x1]){const _0x274c80=_0x26d466[_0x33988a(0x4a8)][_0x15a51f['pageId']-0x1]['list'];this['setupChild'](_0x274c80,this[_0x33988a(0x21e)]());}window[this[_0x33988a(0x44b)]]=undefined,this[_0x33988a(0x44b)]=undefined,this[_0x33988a(0x645)]=undefined;};function Game_CPCInterpreter(){const _0xc0474=_0xe5069;this[_0xc0474(0x33f)][_0xc0474(0x34b)](this,arguments);};Game_CPCInterpreter[_0xe5069(0x678)]=Object[_0xe5069(0x486)](Game_Interpreter[_0xe5069(0x678)]),Game_CPCInterpreter[_0xe5069(0x678)]['constructor']=Game_CPCInterpreter,Game_CPCInterpreter[_0xe5069(0x678)]['clear']=function(){const _0x483779=_0xe5069;Game_Interpreter[_0x483779(0x678)]['clear'][_0x483779(0x3ae)](this),this[_0x483779(0x264)]=![];},Game_CPCInterpreter[_0xe5069(0x678)]['execute']=function(){const _0x4950e5=_0xe5069;while(this[_0x4950e5(0x38c)]()){this[_0x4950e5(0x24e)]();}},Game_CPCInterpreter['prototype']['executeCommonEvent']=function(_0x30ae53){const _0x58bee2=_0xe5069;while(this['isRunning']()){this[_0x58bee2(0x418)](_0x30ae53);}},Game_CPCInterpreter[_0xe5069(0x678)][_0xe5069(0x418)]=function(_0x4e5d92){const _0x404bb6=_0xe5069,_0x49b481=_0x4e5d92;$gameTemp[_0x404bb6(0x32a)](_0x49b481);const _0x25a5d7=VisuMZ[_0x404bb6(0x5f4)][_0x404bb6(0x51f)]['call'](this);return $gameTemp[_0x404bb6(0x511)](),_0x25a5d7;},Game_CPCInterpreter[_0xe5069(0x678)][_0xe5069(0x2e2)]=function(_0x3404ed){const _0x6d8411=_0xe5069;return Game_Interpreter['prototype'][_0x6d8411(0x2e2)][_0x6d8411(0x3ae)](this,_0x3404ed),this['_comments'][_0x6d8411(0x475)](_0xd8114c=>_0xd8114c[_0x6d8411(0x506)](/<(?:CONDITION|CONDITIONS) MET>/i))&&(this[_0x6d8411(0x264)]=!![]),!![];},VisuMZ[_0xe5069(0x5f4)]['Scene_Map_startEncounterEffect']=Scene_Map[_0xe5069(0x678)][_0xe5069(0x5cd)],Scene_Map[_0xe5069(0x678)][_0xe5069(0x5cd)]=function(){const _0x5aba72=_0xe5069;VisuMZ[_0x5aba72(0x5f4)][_0x5aba72(0x482)][_0x5aba72(0x3ae)](this),this[_0x5aba72(0x477)]['hideShadows']();},VisuMZ[_0xe5069(0x5f4)][_0xe5069(0x60d)]=Scene_Load[_0xe5069(0x678)]['onLoadSuccess'],Scene_Load[_0xe5069(0x678)]['onLoadSuccess']=function(){const _0xe1463b=_0xe5069;if($gameMap)$gameMap['clearEventCache']();VisuMZ[_0xe1463b(0x5f4)][_0xe1463b(0x60d)][_0xe1463b(0x3ae)](this);},VisuMZ['EventsMoveCore'][_0xe5069(0x1d3)]=Game_System['prototype'][_0xe5069(0x484)],Game_System[_0xe5069(0x678)][_0xe5069(0x484)]=function(){const _0x4166e2=_0xe5069;VisuMZ[_0x4166e2(0x5f4)][_0x4166e2(0x1d3)][_0x4166e2(0x3ae)](this);if($gameMap)$gameMap[_0x4166e2(0x641)]();},VisuMZ['EventsMoveCore'][_0xe5069(0x4c9)]=Sprite_Character[_0xe5069(0x678)][_0xe5069(0x316)],Sprite_Character[_0xe5069(0x678)][_0xe5069(0x316)]=function(){const _0x3ce47a=_0xe5069;VisuMZ[_0x3ce47a(0x5f4)][_0x3ce47a(0x4c9)][_0x3ce47a(0x3ae)](this),this[_0x3ce47a(0x5ae)](),this[_0x3ce47a(0x1bb)](),this[_0x3ce47a(0x27d)]();},Sprite_Character[_0xe5069(0x678)]['initMembersEventsMoveCore']=function(){const _0x1a0c7f=_0xe5069;this[_0x1a0c7f(0x431)]=0xff,this[_0x1a0c7f(0x2e6)]=![];},Sprite_Character[_0xe5069(0x678)]['isSpriteVS8dir']=function(){const _0x2073d7=_0xe5069;return this[_0x2073d7(0x437)]&&this[_0x2073d7(0x437)][_0x2073d7(0x506)](/\[VS8\]/i);},Sprite_Character['prototype'][_0xe5069(0x30f)]=function(){const _0x544997=_0xe5069;return this['isSpriteVS8dir']()&&VisuMZ[_0x544997(0x5f4)][_0x544997(0x553)]['VS8'][_0x544997(0x4d6)];},Sprite_Character[_0xe5069(0x678)][_0xe5069(0x1bb)]=function(){const _0x393476=_0xe5069;this[_0x393476(0x349)]=new Sprite(),this[_0x393476(0x349)][_0x393476(0x575)]['x']=0.5,this[_0x393476(0x349)][_0x393476(0x575)]['y']=0x1,this['addChild'](this[_0x393476(0x349)]),this[_0x393476(0x507)]();},Sprite_Character['prototype'][_0xe5069(0x27d)]=function(){const _0x1701a8=_0xe5069;this['_eventIconSprite']=new Sprite(),this[_0x1701a8(0x34f)][_0x1701a8(0x5ac)]=ImageManager[_0x1701a8(0x5d6)]('IconSet'),this['_eventIconSprite']['bitmap'][_0x1701a8(0x38e)]=![],this[_0x1701a8(0x34f)]['setFrame'](0x0,0x0,0x0,0x0),this['_eventIconSprite'][_0x1701a8(0x575)]['x']=0.5,this['_eventIconSprite'][_0x1701a8(0x575)]['y']=0x1,this['addChild'](this[_0x1701a8(0x34f)]);},VisuMZ['EventsMoveCore'][_0xe5069(0x4be)]=Sprite_Character[_0xe5069(0x678)][_0xe5069(0x59e)],Sprite_Character[_0xe5069(0x678)][_0xe5069(0x59e)]=function(){const _0xaa86a4=_0xe5069;VisuMZ[_0xaa86a4(0x5f4)][_0xaa86a4(0x4be)][_0xaa86a4(0x3ae)](this),this[_0xaa86a4(0x59c)]();},Sprite_Character['prototype'][_0xe5069(0x659)]=function(){const _0x5aa97c=_0xe5069;Sprite[_0x5aa97c(0x678)][_0x5aa97c(0x659)][_0x5aa97c(0x3ae)](this),this[_0x5aa97c(0x39f)]()&&(this['visible']=![]);},Sprite_Character[_0xe5069(0x678)][_0xe5069(0x39f)]=function(){const _0x4ffbbc=_0xe5069;if(this[_0x4ffbbc(0x317)]()>0x0)return![];if(this[_0x4ffbbc(0x386)]){if(this[_0x4ffbbc(0x386)][_0x4ffbbc(0x302)]()!=='')return![];}return this[_0x4ffbbc(0x2eb)]()||this[_0x4ffbbc(0x386)]&&this[_0x4ffbbc(0x386)][_0x4ffbbc(0x1fa)]();},Sprite_Character['prototype'][_0xe5069(0x51e)]=function(){const _0x5c6f2e=_0xe5069;if(!this['bitmap'])return;this[_0x5c6f2e(0x5ac)][_0x5c6f2e(0x38e)]=!!VisuMZ[_0x5c6f2e(0x5f4)][_0x5c6f2e(0x553)][_0x5c6f2e(0x595)][_0x5c6f2e(0x5d1)];},Sprite_Character[_0xe5069(0x678)][_0xe5069(0x59c)]=function(){const _0x47f1f5=_0xe5069;this['updateScaleBase'](),this[_0x47f1f5(0x2f0)](),this['updateShadow'](),this['updateEventIconSprite'](),this[_0x47f1f5(0x370)](),this[_0x47f1f5(0x3fa)](),this[_0x47f1f5(0x507)]();},VisuMZ[_0xe5069(0x5f4)][_0xe5069(0x2c7)]=Sprite_Character['prototype'][_0xe5069(0x46c)],Sprite_Character[_0xe5069(0x678)][_0xe5069(0x46c)]=function(){const _0x4dd8b6=_0xe5069;VisuMZ['EventsMoveCore'][_0x4dd8b6(0x2c7)][_0x4dd8b6(0x3ae)](this),this[_0x4dd8b6(0x5ac)][_0x4dd8b6(0x494)](this[_0x4dd8b6(0x51e)]['bind'](this));},Sprite_Character[_0xe5069(0x678)][_0xe5069(0x63d)]=function(){const _0x3edb4b=_0xe5069,_0x1d4dd6=this[_0x3edb4b(0x51b)],_0x2f60ee=this[_0x3edb4b(0x426)](),_0x2605dd=this[_0x3edb4b(0x1e0)](),_0x4b610c=(Math[_0x3edb4b(0x485)](_0x1d4dd6/0x80)%0x2*0x8+_0x1d4dd6%0x8)*_0x2f60ee,_0x19d6df=Math['floor'](_0x1d4dd6%0x100/0x8)%0x10*_0x2605dd,_0x4efb8f=this['getTileExpandData']();let _0x526967=_0x4b610c,_0x4eef25=_0x19d6df,_0x3cc8b7=_0x2f60ee,_0x1924a8=_0x2605dd;_0x4efb8f['up']&&_0x4efb8f['up']>0x0&&(_0x4eef25-=_0x2605dd*_0x4efb8f['up'],_0x1924a8+=_0x2605dd*_0x4efb8f['up']),_0x4efb8f[_0x3edb4b(0x3b5)]&&_0x4efb8f[_0x3edb4b(0x3b5)]>0x0&&(_0x1924a8+=_0x2605dd*_0x4efb8f[_0x3edb4b(0x3b5)]),_0x4efb8f[_0x3edb4b(0x234)]&&_0x4efb8f['left']>0x0&&(_0x526967-=_0x2f60ee*_0x4efb8f[_0x3edb4b(0x234)],_0x3cc8b7+=_0x2f60ee*_0x4efb8f[_0x3edb4b(0x234)]),_0x4efb8f[_0x3edb4b(0x67e)]&&_0x4efb8f[_0x3edb4b(0x67e)]>0x0&&(_0x3cc8b7+=_0x2f60ee*_0x4efb8f[_0x3edb4b(0x67e)]),this['setFrame'](_0x526967,_0x4eef25,_0x3cc8b7,_0x1924a8);},Sprite_Character['prototype'][_0xe5069(0x526)]=function(){const _0x478f9b=_0xe5069;return this['_character']?this['_character'][_0x478f9b(0x1a8)]||{}:{};},VisuMZ[_0xe5069(0x5f4)][_0xe5069(0x2f3)]=Sprite_Character[_0xe5069(0x678)][_0xe5069(0x66d)],Sprite_Character['prototype']['setCharacterBitmap']=function(){const _0x1aa7f4=_0xe5069;VisuMZ[_0x1aa7f4(0x5f4)][_0x1aa7f4(0x2f3)][_0x1aa7f4(0x3ae)](this),this[_0x1aa7f4(0x5ac)][_0x1aa7f4(0x494)](this[_0x1aa7f4(0x51e)][_0x1aa7f4(0x43d)](this)),this[_0x1aa7f4(0x2e6)]=ImageManager[_0x1aa7f4(0x27f)](this[_0x1aa7f4(0x437)]),this['_isCharacterSpriteSheetInvisible']&&this[_0x1aa7f4(0x5ac)][_0x1aa7f4(0x494)](this['setCharacterSpriteSheetInvisible'][_0x1aa7f4(0x43d)](this));},Sprite_Character[_0xe5069(0x678)][_0xe5069(0x391)]=function(){const _0x32d326=_0xe5069;this[_0x32d326(0x5ac)]=new Bitmap(this[_0x32d326(0x5ac)][_0x32d326(0x2ad)],this[_0x32d326(0x5ac)][_0x32d326(0x206)]);},VisuMZ['EventsMoveCore'][_0xe5069(0x541)]=Sprite_Character[_0xe5069(0x678)][_0xe5069(0x363)],Sprite_Character[_0xe5069(0x678)][_0xe5069(0x363)]=function(){const _0x6cffb3=_0xe5069;return this[_0x6cffb3(0x5d8)]()?this['characterPatternYVS8']():this[_0x6cffb3(0x338)]();},Sprite_Character[_0xe5069(0x678)][_0xe5069(0x627)]=function(){const _0x48b621=_0xe5069,_0x29faf6=this[_0x48b621(0x386)][_0x48b621(0x4ed)]();let _0x5557af=[0x2,0x2,0x2,0x4,0x4,0x2,0x6,0x6,0x8,0x8];return this['_character']['_mirrorSprite']&&(_0x5557af=[0x2,0x4,0x2,0x2,0x6,0x2,0x4,0x8,0x8,0x6]),(_0x5557af[_0x29faf6]-0x2)/0x2;},Sprite_Character[_0xe5069(0x678)][_0xe5069(0x338)]=function(){const _0x6507ea=_0xe5069;let _0xf7774=this[_0x6507ea(0x386)][_0x6507ea(0x4ed)]();if(this[_0x6507ea(0x386)][_0x6507ea(0x265)]){if(_0xf7774===0x4)_0xf7774=0x6;else _0xf7774===0x6&&(_0xf7774=0x4);}return(_0xf7774-0x2)/0x2;},Sprite_Character[_0xe5069(0x678)]['updateScaleBase']=function(){const _0x440693=_0xe5069;this['scale']['x']=this[_0x440693(0x386)]['_scaleX']??0x1,this[_0x440693(0x58d)]['y']=this['_character']['_scaleY']??0x1;},Sprite_Character[_0xe5069(0x678)][_0xe5069(0x2f0)]=function(){const _0x12c8f0=_0xe5069;if(!VisuMZ['EventsMoveCore'][_0x12c8f0(0x553)]['Movement']['EnableDashTilt'])return;this[_0x12c8f0(0x5e8)]=0x0;if(this[_0x12c8f0(0x667)]()){const _0x56d59e=VisuMZ[_0x12c8f0(0x5f4)][_0x12c8f0(0x553)][_0x12c8f0(0x595)],_0x4366f3=this[_0x12c8f0(0x386)][_0x12c8f0(0x4ed)]();let _0x41e1c9=0x0;if([0x1,0x4,0x7][_0x12c8f0(0x22a)](_0x4366f3))_0x41e1c9=_0x56d59e[_0x12c8f0(0x421)];if([0x3,0x6,0x9][_0x12c8f0(0x22a)](_0x4366f3))_0x41e1c9=_0x56d59e[_0x12c8f0(0x510)];[0x2,0x8][_0x12c8f0(0x22a)](_0x4366f3)&&(_0x41e1c9=[-_0x56d59e[_0x12c8f0(0x3ff)],0x0,_0x56d59e[_0x12c8f0(0x3ff)]][this[_0x12c8f0(0x386)][_0x12c8f0(0x42e)]()]);if(this[_0x12c8f0(0x1f3)])_0x41e1c9*=-0x1;this[_0x12c8f0(0x5e8)]=_0x41e1c9;}},Sprite_Character[_0xe5069(0x678)][_0xe5069(0x667)]=function(){const _0x3b52cc=_0xe5069;if(this[_0x3b52cc(0x1be)])return![];return this[_0x3b52cc(0x386)][_0x3b52cc(0x3e9)]()&&!this[_0x3b52cc(0x386)][_0x3b52cc(0x248)]()&&!this[_0x3b52cc(0x386)][_0x3b52cc(0x631)]()&&this[_0x3b52cc(0x317)]()===0x0;},Sprite_Character[_0xe5069(0x678)]['updateShadow']=function(){const _0x3e1ba7=_0xe5069;if(!this[_0x3e1ba7(0x5fd)])return;this[_0x3e1ba7(0x5fd)]['x']=this[_0x3e1ba7(0x386)][_0x3e1ba7(0x5c2)](),this[_0x3e1ba7(0x5fd)]['y']=this[_0x3e1ba7(0x386)][_0x3e1ba7(0x4c8)](),this[_0x3e1ba7(0x5fd)][_0x3e1ba7(0x5d7)]=this['opacity'],this[_0x3e1ba7(0x5fd)][_0x3e1ba7(0x3ce)]=this[_0x3e1ba7(0x386)][_0x3e1ba7(0x4fe)](),this[_0x3e1ba7(0x5fd)][_0x3e1ba7(0x5ed)]=this['_hidden'];if(this['_character'][_0x3e1ba7(0x65c)]())this[_0x3e1ba7(0x5fd)]['scale']['x']=Math[_0x3e1ba7(0x314)](0x0,this[_0x3e1ba7(0x5fd)][_0x3e1ba7(0x58d)]['x']-0.1),this[_0x3e1ba7(0x5fd)][_0x3e1ba7(0x58d)]['y']=Math[_0x3e1ba7(0x314)](0x0,this[_0x3e1ba7(0x5fd)][_0x3e1ba7(0x58d)]['y']-0.1);else{if(this[_0x3e1ba7(0x5fd)][_0x3e1ba7(0x58d)]['x']!==this[_0x3e1ba7(0x58d)]['x']){if(this[_0x3e1ba7(0x5fd)]['scale']['x']>this[_0x3e1ba7(0x58d)]['x'])this[_0x3e1ba7(0x5fd)][_0x3e1ba7(0x58d)]['x']=Math[_0x3e1ba7(0x346)](this[_0x3e1ba7(0x5fd)]['scale']['x']+0.1,this['scale']['x']);if(this['_shadowSprite']['scale']['x']<this[_0x3e1ba7(0x58d)]['x'])this[_0x3e1ba7(0x5fd)]['scale']['x']=Math['max'](this['_shadowSprite'][_0x3e1ba7(0x58d)]['x']-0.1,this[_0x3e1ba7(0x58d)]['x']);}if(this['_shadowSprite'][_0x3e1ba7(0x58d)]['y']!==this[_0x3e1ba7(0x58d)]['y']){if(this[_0x3e1ba7(0x5fd)][_0x3e1ba7(0x58d)]['y']>this[_0x3e1ba7(0x58d)]['y'])this['_shadowSprite'][_0x3e1ba7(0x58d)]['y']=Math[_0x3e1ba7(0x346)](this['_shadowSprite'][_0x3e1ba7(0x58d)]['y']+0.1,this[_0x3e1ba7(0x58d)]['y']);if(this[_0x3e1ba7(0x5fd)][_0x3e1ba7(0x58d)]['y']<this[_0x3e1ba7(0x58d)]['y'])this['_shadowSprite'][_0x3e1ba7(0x58d)]['y']=Math[_0x3e1ba7(0x314)](this[_0x3e1ba7(0x5fd)]['scale']['y']-0.1,this['scale']['y']);}}},Sprite_Character[_0xe5069(0x678)][_0xe5069(0x3d8)]=function(){const _0x551859=_0xe5069;if(!this[_0x551859(0x34f)])return;const _0x3da8b2=this['_eventIconSprite'],_0x2c0460=this[_0x551859(0x317)]();if(_0x2c0460<=0x0)return _0x3da8b2['setFrame'](0x0,0x0,0x0,0x0);else{const _0x3f33e3=ImageManager['iconWidth'],_0x533b3a=ImageManager[_0x551859(0x2df)],_0x5e25e9=_0x2c0460%0x10*_0x3f33e3,_0x3cb926=Math['floor'](_0x2c0460/0x10)*_0x533b3a;_0x3da8b2['setFrame'](_0x5e25e9,_0x3cb926,_0x3f33e3,_0x533b3a),this['visible']=!![];}const _0xb9d739=this[_0x551859(0x386)][_0x551859(0x642)]();this[_0x551859(0x30f)]()?this[_0x551859(0x47f)](_0x3da8b2):(_0x3da8b2['x']=_0xb9d739?_0xb9d739[_0x551859(0x222)]:0x0,_0x3da8b2['y']=_0xb9d739?-this[_0x551859(0x206)]+_0xb9d739[_0x551859(0x255)]:0x0),_0x3da8b2['blendMode']=_0xb9d739?_0xb9d739[_0x551859(0x353)]:0x0,this[_0x551859(0x203)](_0x3da8b2),this['addChild'](_0x3da8b2),_0x3da8b2[_0x551859(0x5e8)]=-this[_0x551859(0x5e8)];},Sprite_Character[_0xe5069(0x678)][_0xe5069(0x47f)]=function(_0x2d02ee){const _0x5ad1b3=_0xe5069;_0x2d02ee['x']=0x0,_0x2d02ee['y']=-this['height']+this['height']*0x2/0x5,this[_0x5ad1b3(0x386)][_0x5ad1b3(0x42e)]()!==0x1&&(_0x2d02ee['y']+=0x1);},Sprite_Character[_0xe5069(0x678)][_0xe5069(0x317)]=function(){const _0x168a1e=_0xe5069;if(!this['_character'])return 0x0;if(this[_0x168a1e(0x386)][_0x168a1e(0x216)])return 0x0;const _0x29da34=this['_character'][_0x168a1e(0x642)]();return _0x29da34?_0x29da34[_0x168a1e(0x233)]||0x0:0x0;},Sprite_Character[_0xe5069(0x678)][_0xe5069(0x370)]=function(){const _0x494cd2=_0xe5069;if(!this[_0x494cd2(0x386)])return;if(this[_0x494cd2(0x386)][_0x494cd2(0x3d4)]===undefined)return;if(this['_character'][_0x494cd2(0x3d4)]===![])return;this['z']=this[_0x494cd2(0x386)][_0x494cd2(0x3d4)],this['_shadowSprite']&&(this['z']<0x0?this[_0x494cd2(0x5fd)]['z']=this['z']-0x1:this[_0x494cd2(0x5fd)]['z']=0x0);},Sprite_Character[_0xe5069(0x678)][_0xe5069(0x3fa)]=function(){const _0x4b8bcd=_0xe5069;if(!this['_character'])return;let _0x3b611f=!!this[_0x4b8bcd(0x386)][_0x4b8bcd(0x265)];this[_0x4b8bcd(0x58d)]['x']=Math[_0x4b8bcd(0x5e6)](this['scale']['x'])*(_0x3b611f?-0x1:0x1);},Sprite_Character['prototype'][_0xe5069(0x507)]=function(){const _0x4d0437=_0xe5069;if(!this[_0x4d0437(0x349)])return;if(!this[_0x4d0437(0x386)])return;this[_0x4d0437(0x44e)](),this[_0x4d0437(0x416)]();},Sprite_Character[_0xe5069(0x678)][_0xe5069(0x44e)]=function(){const _0x52d70e=_0xe5069;if(!this[_0x52d70e(0x579)]())return;const _0x181b63=this[_0x52d70e(0x386)][_0x52d70e(0x3c9)]();this['_lastAttachPictureFilename']=_0x181b63[_0x52d70e(0x517)],this[_0x52d70e(0x30d)]=_0x181b63[_0x52d70e(0x3e4)],this[_0x52d70e(0x493)]=_0x181b63[_0x52d70e(0x487)],this['_lastAttachPictureScale']=_0x181b63[_0x52d70e(0x58d)];if(_0x181b63[_0x52d70e(0x517)]!==''){if(_0x181b63[_0x52d70e(0x3e4)]===_0x52d70e(0x4de)){const _0x38c143=ImageManager[_0x52d70e(0x2cc)](_0x181b63[_0x52d70e(0x517)]);_0x38c143[_0x52d70e(0x494)](this['onLoadAttachPicture'][_0x52d70e(0x43d)](this,_0x38c143));}else{if(_0x181b63[_0x52d70e(0x3e4)]===_0x52d70e(0x2f5)){const _0x42b2e2=ImageManager[_0x52d70e(0x3be)](_0x181b63[_0x52d70e(0x517)]);_0x42b2e2['addLoadListener'](this[_0x52d70e(0x1ac)][_0x52d70e(0x43d)](this,_0x42b2e2));}else{const _0x661ba=ImageManager[_0x52d70e(0x26a)](_0x181b63[_0x52d70e(0x517)]);_0x661ba['addLoadListener'](this[_0x52d70e(0x1ac)][_0x52d70e(0x43d)](this,_0x661ba));}}}else this[_0x52d70e(0x349)][_0x52d70e(0x5ac)]=new Bitmap(0x1,0x1);},Sprite_Character[_0xe5069(0x678)][_0xe5069(0x416)]=function(){const _0x5a8192=_0xe5069,_0xe80faf=this[_0x5a8192(0x349)];_0xe80faf['x']=this[_0x5a8192(0x386)][_0x5a8192(0x2cf)](),_0xe80faf['y']=this[_0x5a8192(0x386)][_0x5a8192(0x658)](),_0xe80faf[_0x5a8192(0x353)]=this['_character'][_0x5a8192(0x1e2)]();},Sprite_Character['prototype']['needsAttachPictureUpdate']=function(){const _0xf22180=_0xe5069,_0x2ea800=this[_0xf22180(0x386)][_0xf22180(0x3c9)]();if(_0x2ea800){if(this['_lastAttachPictureFilename']!==_0x2ea800['filename'])return!![];if(this[_0xf22180(0x30d)]!==_0x2ea800[_0xf22180(0x3e4)])return!![];if(this['_lastAttachPictureMaxSize']!==_0x2ea800['maxSize'])return!![];if(this[_0xf22180(0x527)]!==_0x2ea800[_0xf22180(0x58d)])return!![];}return![];},Sprite_Character[_0xe5069(0x678)][_0xe5069(0x1ac)]=function(_0x2367d6){const _0xbd04a8=_0xe5069,_0x55d504=this[_0xbd04a8(0x349)];_0x55d504['bitmap']=_0x2367d6;const _0x1fffb4=this['_character'][_0xbd04a8(0x3c9)](),_0x28367e=_0x1fffb4[_0xbd04a8(0x487)],_0x509b2f=_0x1fffb4[_0xbd04a8(0x58d)];let _0x5345b7=0x1;if(_0x28367e>0x0){let _0xda29c8=this[_0xbd04a8(0x21b)]()||0x1,_0x1f80a9=this[_0xbd04a8(0x269)]()||0x1;const _0x1ab4a5=Math[_0xbd04a8(0x314)](0x1,_0xda29c8,_0x1f80a9);_0x5345b7=_0x28367e/_0x1ab4a5;}_0x5345b7*=_0x509b2f,_0x5345b7!==0x1&&(this[_0xbd04a8(0x349)]['bitmap'][_0xbd04a8(0x38e)]=!![]),_0x55d504[_0xbd04a8(0x58d)]['x']=_0x5345b7,_0x55d504[_0xbd04a8(0x58d)]['y']=_0x5345b7,this[_0xbd04a8(0x3ce)]=!![],this[_0xbd04a8(0x416)]();},Sprite_Character[_0xe5069(0x678)][_0xe5069(0x21b)]=function(){const _0x451a80=_0xe5069,_0x4dad57=this['_attachPictureSprite'];if(!_0x4dad57)return 0x0;return _0x4dad57['bitmap'][_0x451a80(0x2ad)];},Sprite_Character[_0xe5069(0x678)][_0xe5069(0x269)]=function(){const _0x5de22a=_0xe5069,_0x11eec3=this[_0x5de22a(0x349)];if(!_0x11eec3)return 0x0;return _0x11eec3[_0x5de22a(0x5ac)][_0x5de22a(0x206)];},VisuMZ['EventsMoveCore'][_0xe5069(0x589)]=Sprite_Balloon[_0xe5069(0x678)][_0xe5069(0x339)],Sprite_Balloon[_0xe5069(0x678)][_0xe5069(0x339)]=function(_0x23c0b8,_0x9b4a9a){const _0x54f00a=_0xe5069;VisuMZ[_0x54f00a(0x5f4)][_0x54f00a(0x589)]['call'](this,_0x23c0b8,_0x9b4a9a),VisuMZ[_0x54f00a(0x5f4)][_0x54f00a(0x553)]['VS8']['AutoBalloon']&&this[_0x54f00a(0x543)]['_character']['setBalloonPose'](_0x9b4a9a,this[_0x54f00a(0x5e3)]);},VisuMZ[_0xe5069(0x5f4)][_0xe5069(0x4d5)]=Sprite_Balloon[_0xe5069(0x678)]['updatePosition'],Sprite_Balloon[_0xe5069(0x678)][_0xe5069(0x2ed)]=function(){const _0x28ac26=_0xe5069;VisuMZ[_0x28ac26(0x5f4)][_0x28ac26(0x4d5)]['call'](this),this[_0x28ac26(0x1c9)]();},Sprite_Balloon[_0xe5069(0x678)][_0xe5069(0x1c9)]=function(){const _0x240fb4=_0xe5069;this['_target'][_0x240fb4(0x386)][_0x240fb4(0x5d8)]()&&(this['x']+=VisuMZ[_0x240fb4(0x5f4)][_0x240fb4(0x553)][_0x240fb4(0x296)][_0x240fb4(0x1aa)],this['y']+=VisuMZ[_0x240fb4(0x5f4)][_0x240fb4(0x553)][_0x240fb4(0x296)][_0x240fb4(0x542)]);},Sprite_Timer[_0xe5069(0x678)][_0xe5069(0x63c)]=function(){const _0x5aafb4=_0xe5069;this[_0x5aafb4(0x5ac)]=new Bitmap(Math['round'](Graphics['boxWidth']/0x2),0x30),this[_0x5aafb4(0x5ac)][_0x5aafb4(0x673)]=this[_0x5aafb4(0x673)](),this[_0x5aafb4(0x5ac)]['fontSize']=this[_0x5aafb4(0x4b5)](),this[_0x5aafb4(0x5ac)]['outlineColor']=ColorManager[_0x5aafb4(0x500)]();},Sprite_Timer[_0xe5069(0x678)][_0xe5069(0x53d)]=function(){const _0x2a12f9=_0xe5069,_0x37e853=Math['floor'](this[_0x2a12f9(0x1fb)]/0x3c/0x3c),_0x5f51cd=Math['floor'](this[_0x2a12f9(0x1fb)]/0x3c)%0x3c,_0xa9c507=this[_0x2a12f9(0x1fb)]%0x3c;let _0x4025b2=_0x5f51cd[_0x2a12f9(0x59a)](0x2)+':'+_0xa9c507['padZero'](0x2);if(_0x37e853>0x0)_0x4025b2=_0x2a12f9(0x3fc)[_0x2a12f9(0x52c)](_0x37e853,_0x4025b2);return _0x4025b2;};function Sprite_EventLabel(){this['initialize'](...arguments);}Sprite_EventLabel[_0xe5069(0x678)]=Object['create'](Sprite[_0xe5069(0x678)]),Sprite_EventLabel[_0xe5069(0x678)][_0xe5069(0x4eb)]=Sprite_EventLabel,Sprite_EventLabel[_0xe5069(0x678)][_0xe5069(0x33f)]=function(_0x577d58){const _0x1214de=_0xe5069;this[_0x1214de(0x5b8)]=_0x577d58,Sprite[_0x1214de(0x678)][_0x1214de(0x33f)][_0x1214de(0x3ae)](this),this['initMembers'](),this[_0x1214de(0x563)]();},Sprite_EventLabel['prototype'][_0xe5069(0x316)]=function(){const _0x3fb343=_0xe5069;this[_0x3fb343(0x575)]['x']=0.5,this[_0x3fb343(0x575)]['y']=0x1;},Sprite_EventLabel[_0xe5069(0x678)][_0xe5069(0x563)]=function(){const _0xbedfe9=_0xe5069,_0x1ee5f2=new Rectangle(0x0,0x0,0x1,0x1);this[_0xbedfe9(0x340)]=new Window_Base(_0x1ee5f2),this[_0xbedfe9(0x340)][_0xbedfe9(0x67a)]=0x0,this[_0xbedfe9(0x5d7)]=this[_0xbedfe9(0x2f1)]()?0xff:0x0;},Sprite_EventLabel[_0xe5069(0x678)]['update']=function(){const _0x5b58ae=_0xe5069;Sprite[_0x5b58ae(0x678)]['update'][_0x5b58ae(0x3ae)](this),this[_0x5b58ae(0x381)](),this['updateScale'](),this[_0x5b58ae(0x2ed)](),this[_0x5b58ae(0x22d)](),this[_0x5b58ae(0x3d0)]();},Sprite_EventLabel[_0xe5069(0x678)][_0xe5069(0x381)]=function(){const _0x435c66=_0xe5069;this['_event'][_0x435c66(0x1f5)]()!==this[_0x435c66(0x50a)]&&(this['_text']=this['_event']['labelWindowText'](),this[_0x435c66(0x422)]());},Sprite_EventLabel[_0xe5069(0x678)]['refresh']=function(){const _0xffea8a=_0xe5069;if(!this[_0xffea8a(0x340)])return;this[_0xffea8a(0x2a3)](),this[_0xffea8a(0x281)]();},Sprite_EventLabel[_0xe5069(0x678)]['resizeWindow']=function(){const _0x26cb82=_0xe5069,_0x4eb857=this[_0x26cb82(0x340)][_0x26cb82(0x3ac)](this[_0x26cb82(0x50a)]),_0xa94058=this[_0x26cb82(0x340)][_0x26cb82(0x602)](),_0x261b82=_0x4eb857[_0x26cb82(0x2ad)]+_0xa94058*0x2,_0x4015ab=_0x4eb857[_0x26cb82(0x206)];this[_0x26cb82(0x340)][_0x26cb82(0x4f6)](0x0,0x0,_0x261b82,_0x4015ab),this[_0x26cb82(0x340)][_0x26cb82(0x22c)](),this[_0x26cb82(0x5ac)]=this[_0x26cb82(0x340)][_0x26cb82(0x632)];},Sprite_EventLabel[_0xe5069(0x678)][_0xe5069(0x281)]=function(){const _0x46b329=_0xe5069,_0x2735d0=this[_0x46b329(0x340)][_0x46b329(0x602)]();this[_0x46b329(0x340)][_0x46b329(0x65e)](this[_0x46b329(0x50a)],_0x2735d0,0x0);},Sprite_EventLabel[_0xe5069(0x678)][_0xe5069(0x590)]=function(){const _0x1ffd89=_0xe5069,_0x374db0=VisuMZ['EventsMoveCore']['Settings'][_0x1ffd89(0x1ce)][_0x1ffd89(0x521)],_0x2eb799=$gameSystem[_0x1ffd89(0x268)]()||0x1;this[_0x1ffd89(0x58d)]['x']=this[_0x1ffd89(0x58d)]['y']=_0x374db0/_0x2eb799;},Sprite_EventLabel[_0xe5069(0x678)]['updatePosition']=function(){const _0x3b4885=_0xe5069;if(!SceneManager[_0x3b4885(0x3df)])return;if(!SceneManager[_0x3b4885(0x3df)][_0x3b4885(0x477)])return;const _0x1b1ccd=SceneManager[_0x3b4885(0x3df)][_0x3b4885(0x477)]['findTargetSprite'](this[_0x3b4885(0x5b8)]);if(!_0x1b1ccd)return;this['x']=this[_0x3b4885(0x5b8)][_0x3b4885(0x202)](),this['x']+=this[_0x3b4885(0x5b8)][_0x3b4885(0x60a)][_0x3b4885(0x2e1)];if(_0x1b1ccd[_0x3b4885(0x52e)]){const _0x514c73=_0x1b1ccd[_0x3b4885(0x349)];this['y']=this[_0x3b4885(0x5b8)][_0x3b4885(0x2f7)]()-_0x514c73[_0x3b4885(0x206)]*_0x514c73[_0x3b4885(0x58d)]['y'];}else this['y']=this['_event']['screenY']()-_0x1b1ccd[_0x3b4885(0x206)]*_0x1b1ccd[_0x3b4885(0x58d)]['y'];this['y']+=$gameSystem[_0x3b4885(0x5d9)]()*-0.5,this['y']+=this[_0x3b4885(0x5b8)]['_labelWindow']['offsetY'];},Sprite_EventLabel[_0xe5069(0x678)][_0xe5069(0x22d)]=function(){const _0x55c7b1=_0xe5069;if(this[_0x55c7b1(0x2f1)]())this['opacity']+=this[_0x55c7b1(0x300)]();else SceneManager[_0x55c7b1(0x3df)][_0x55c7b1(0x43e)]>0x0?this[_0x55c7b1(0x5d7)]=0x0:this[_0x55c7b1(0x5d7)]-=this[_0x55c7b1(0x300)]();},Sprite_EventLabel[_0xe5069(0x678)][_0xe5069(0x3d0)]=function(){const _0x564fe4=_0xe5069;if(this[_0x564fe4(0x2f1)]()&&this['_event']&&this[_0x564fe4(0x5b8)][_0x564fe4(0x60a)]['hueShift']){const _0x82c11a=this[_0x564fe4(0x444)]+(this['_event'][_0x564fe4(0x60a)][_0x564fe4(0x205)]||0x0);this[_0x564fe4(0x4ef)](_0x82c11a);}},Sprite_EventLabel[_0xe5069(0x678)][_0xe5069(0x2f1)]=function(){const _0x5fcb88=_0xe5069;if(!$gameSystem[_0x5fcb88(0x48d)]())return![];if(this['_event']?.[_0x5fcb88(0x216)])return![];if(this[_0x5fcb88(0x5b8)]&&this['_event']['_pageIndex']<0x0)return![];if(SceneManager['_scene']['_encounterEffectDuration']>0x0)return![];const _0x2f7d51=$gamePlayer['x'],_0x50b19f=$gamePlayer['y'],_0x41e54d=this[_0x5fcb88(0x5b8)]['x'],_0x1448ad=this[_0x5fcb88(0x5b8)]['y'];if(this[_0x5fcb88(0x24d)]===_0x2f7d51&&this[_0x5fcb88(0x256)]===_0x50b19f&&this['_visibleEventX']===_0x41e54d&&this['_visibleEventY']===_0x1448ad)return this[_0x5fcb88(0x59f)];this[_0x5fcb88(0x24d)]=$gamePlayer['x'],this[_0x5fcb88(0x256)]=$gamePlayer['y'],this[_0x5fcb88(0x5ec)]=this[_0x5fcb88(0x5b8)]['x'],this[_0x5fcb88(0x383)]=this['_event']['y'];if(!VisuMZ['EventsMoveCore'][_0x5fcb88(0x2cd)](this['_event']))return this['_cacheVisibility']=![],![];return this[_0x5fcb88(0x59f)]=!![],!![];},Sprite_EventLabel[_0xe5069(0x678)]['opacitySpeed']=function(){const _0x45db29=_0xe5069;return VisuMZ[_0x45db29(0x5f4)][_0x45db29(0x553)][_0x45db29(0x1ce)][_0x45db29(0x32e)];};function Sprite_VisuMz_MessagePopup(){this['initialize'](...arguments);}Sprite_VisuMz_MessagePopup['prototype']=Object['create'](Sprite[_0xe5069(0x678)]),Sprite_VisuMz_MessagePopup['prototype'][_0xe5069(0x4eb)]=Sprite_VisuMz_MessagePopup,Sprite_VisuMz_MessagePopup[_0xe5069(0x678)][_0xe5069(0x33f)]=function(_0x27b7ef){const _0x7707bc=_0xe5069;this['_settings']=_0x27b7ef,Sprite['prototype']['initialize'][_0x7707bc(0x3ae)](this),this[_0x7707bc(0x316)](),this[_0x7707bc(0x655)](),this[_0x7707bc(0x311)](),this[_0x7707bc(0x59e)]();},Sprite_VisuMz_MessagePopup[_0xe5069(0x678)][_0xe5069(0x316)]=function(){const _0x4ba489=_0xe5069;this[_0x4ba489(0x5e3)]=this[_0x4ba489(0x648)]['duration'],this['_wholeDuration']=this[_0x4ba489(0x648)][_0x4ba489(0x3fe)],this['z']=0x6,this[_0x4ba489(0x41e)]=this[_0x4ba489(0x648)]['fadeDuration'][_0x4ba489(0x2ff)],this['_fadeInDuration']>0x0&&this[_0x4ba489(0x41e)]>=Math['floor'](this[_0x4ba489(0x5e3)]*0.48)&&(this[_0x4ba489(0x41e)]=Math[_0x4ba489(0x485)](this[_0x4ba489(0x5e3)]*0.48)),this[_0x4ba489(0x5d7)]=this[_0x4ba489(0x41e)]>0x0?0x0:0xff,this[_0x4ba489(0x4ae)]=this[_0x4ba489(0x648)]['fadeDuration'][_0x4ba489(0x2ca)],this['_fadeOutDuration']>0x0&&this[_0x4ba489(0x4ae)]>=Math[_0x4ba489(0x485)](this[_0x4ba489(0x5e3)]*0.48)&&(this['_fadeOutDuration']=Math[_0x4ba489(0x485)](this[_0x4ba489(0x5e3)]*0.48)),this[_0x4ba489(0x499)]=this['_fadeOutDuration'],this['_startX']=this[_0x4ba489(0x648)]['startOffset']['x'],this[_0x4ba489(0x3af)]=this['_settings'][_0x4ba489(0x503)]['y'],this[_0x4ba489(0x50f)]=this['_settings'][_0x4ba489(0x46f)]['x'],this[_0x4ba489(0x1b0)]=this[_0x4ba489(0x648)]['endOffset']['y'],this[_0x4ba489(0x251)]=this[_0x4ba489(0x62f)],this[_0x4ba489(0x25f)]=this['_startY'],this[_0x4ba489(0x582)]=this[_0x4ba489(0x648)][_0x4ba489(0x2dc)]['x'],this[_0x4ba489(0x1ae)]=this[_0x4ba489(0x648)][_0x4ba489(0x2dc)]['y'],this[_0x4ba489(0x4ec)]=this['_settings'][_0x4ba489(0x204)]['x'],this['_targetScaleY']=this[_0x4ba489(0x648)]['endScale']['y'],this['_startAngle']=-this['_settings'][_0x4ba489(0x3a7)]['start'],this['_targetAngle']=-this['_settings'][_0x4ba489(0x3a7)][_0x4ba489(0x1df)],this[_0x4ba489(0x40c)]=-this['_settings'][_0x4ba489(0x405)][_0x4ba489(0x525)],this[_0x4ba489(0x4fb)]=0x0;},Sprite_VisuMz_MessagePopup[_0xe5069(0x678)]['createDummyWindow']=function(){const _0x619d58=_0xe5069,_0x364941=this[_0x619d58(0x648)],_0x46f126=new Rectangle(0x0,0x0,Graphics[_0x619d58(0x2ad)],Graphics[_0x619d58(0x206)]);this[_0x619d58(0x1d8)]=new Window_Base(_0x46f126);const _0x54b75f=this[_0x619d58(0x1d8)][_0x619d58(0x3ac)](_0x364941[_0x619d58(0x4d9)]),_0x1d0895=_0x54b75f[_0x619d58(0x2ad)],_0x43c46f=_0x54b75f[_0x619d58(0x206)],_0xd4dddf=_0x1d0895+$gameSystem[_0x619d58(0x5d9)]()*0x2,_0xb94a39=_0x43c46f+$gameSystem[_0x619d58(0x5d9)]()*0x2;this[_0x619d58(0x1d8)][_0x619d58(0x4f6)](0x0,0x0,_0xd4dddf,_0xb94a39),this['_dummyWindow'][_0x619d58(0x22c)](),this[_0x619d58(0x1d8)][_0x619d58(0x65e)](_0x364941[_0x619d58(0x4d9)],0x0,0x0);},Sprite_VisuMz_MessagePopup[_0xe5069(0x678)]['createTextSprite']=function(){const _0x255279=_0xe5069;this[_0x255279(0x520)]=new Sprite(),this[_0x255279(0x520)][_0x255279(0x5ac)]=this[_0x255279(0x1d8)]['contents'],this[_0x255279(0x520)][_0x255279(0x575)]['x']=0.5,this[_0x255279(0x520)][_0x255279(0x575)]['y']=0.5,this[_0x255279(0x520)]['x']=this[_0x255279(0x62f)],this[_0x255279(0x520)]['y']=this[_0x255279(0x3af)],this[_0x255279(0x520)][_0x255279(0x58d)]['x']=this['_startScaleX'],this[_0x255279(0x520)][_0x255279(0x58d)]['y']=this[_0x255279(0x1ae)],this['_textSprite'][_0x255279(0x3a7)]=this[_0x255279(0x212)],this[_0x255279(0x4a3)](this[_0x255279(0x520)]);},Sprite_VisuMz_MessagePopup[_0xe5069(0x678)][_0xe5069(0x59e)]=function(){const _0x3bf506=_0xe5069;Sprite['prototype'][_0x3bf506(0x59e)]['call'](this);if(!this['canUpdate']())return;this[_0x3bf506(0x387)](),this[_0x3bf506(0x5c6)](),this[_0x3bf506(0x5a2)](),this[_0x3bf506(0x23b)](),this['updateOpacity'](),this[_0x3bf506(0x2a5)]();},Sprite_VisuMz_MessagePopup[_0xe5069(0x678)][_0xe5069(0x1ba)]=function(){const _0x62f8c0=_0xe5069;return!!this[_0x62f8c0(0x520)];},Sprite_VisuMz_MessagePopup[_0xe5069(0x678)][_0xe5069(0x387)]=function(){const _0x41d39e=_0xe5069,_0x974230=this['_settings'];{const _0x478bf1=$gameMap[_0x41d39e(0x305)](),_0x56a4e4=_0x974230[_0x41d39e(0x549)]['x'],_0x3310af=$gameMap[_0x41d39e(0x208)](_0x56a4e4);this['x']=Math[_0x41d39e(0x485)](_0x3310af*_0x478bf1+_0x478bf1/0x2);}{const _0x17dcd9=$gameMap[_0x41d39e(0x470)](),_0x3cf662=_0x974230[_0x41d39e(0x549)]['y'],_0x287d3c=$gameMap[_0x41d39e(0x4cd)](_0x3cf662);this['y']=Math['floor'](_0x287d3c*_0x17dcd9+_0x17dcd9);}},Sprite_VisuMz_MessagePopup[_0xe5069(0x678)]['updateTextPosition']=function(){const _0xf92c00=_0xe5069;if(this[_0xf92c00(0x5e3)]<=0x0)return;const _0x2b6700=this['_duration'],_0x5e1ae0=this[_0xf92c00(0x502)];{this[_0xf92c00(0x251)]=(this[_0xf92c00(0x251)]*(_0x2b6700-0x1)+this[_0xf92c00(0x50f)])/_0x2b6700,this['_offsetY']=(this[_0xf92c00(0x25f)]*(_0x2b6700-0x1)+this['_targetY'])/_0x2b6700;}{const _0x16ca20=_0x5e1ae0-_0x2b6700,_0x9f7647=_0x5e1ae0/0x2,_0x35ec5d=this[_0xf92c00(0x40c)],_0x5cf8e7=-_0x35ec5d/Math[_0xf92c00(0x550)](_0x9f7647,0x2);this[_0xf92c00(0x4fb)]=_0x5cf8e7*Math[_0xf92c00(0x550)](_0x16ca20-_0x9f7647,0x2)+_0x35ec5d;}this[_0xf92c00(0x520)]['x']=this['_offsetX'],this[_0xf92c00(0x520)]['y']=this[_0xf92c00(0x25f)]+this[_0xf92c00(0x4fb)];},Sprite_VisuMz_MessagePopup[_0xe5069(0x678)][_0xe5069(0x5a2)]=function(){const _0xf3c3e2=_0xe5069;if(this[_0xf3c3e2(0x5e3)]<=0x0)return;const _0x54f933=this[_0xf3c3e2(0x5e3)];this[_0xf3c3e2(0x520)][_0xf3c3e2(0x58d)]['x']=(this[_0xf3c3e2(0x520)][_0xf3c3e2(0x58d)]['x']*(_0x54f933-0x1)+this[_0xf3c3e2(0x4ec)])/_0x54f933,this[_0xf3c3e2(0x520)][_0xf3c3e2(0x58d)]['y']=(this[_0xf3c3e2(0x520)][_0xf3c3e2(0x58d)]['y']*(_0x54f933-0x1)+this[_0xf3c3e2(0x622)])/_0x54f933;},Sprite_VisuMz_MessagePopup['prototype'][_0xe5069(0x23b)]=function(){const _0xb59da5=_0xe5069;if(this[_0xb59da5(0x5e3)]<=0x0)return;const _0x50db25=this[_0xb59da5(0x5e3)];this[_0xb59da5(0x520)][_0xb59da5(0x3a7)]=(this[_0xb59da5(0x520)][_0xb59da5(0x3a7)]*(_0x50db25-0x1)+this['_targetAngle'])/_0x50db25;},Sprite_VisuMz_MessagePopup[_0xe5069(0x678)]['updateOpacity']=function(){const _0x2cc610=_0xe5069;this[_0x2cc610(0x20c)](),this[_0x2cc610(0x530)]();},Sprite_VisuMz_MessagePopup['prototype'][_0xe5069(0x20c)]=function(){const _0x27faf9=_0xe5069;if(this[_0x27faf9(0x41e)]<=0x0)return;const _0x1ef9a6=this[_0x27faf9(0x41e)];this['opacity']=(this['opacity']*(_0x1ef9a6-0x1)+0xff)/_0x1ef9a6,this[_0x27faf9(0x41e)]--,this[_0x27faf9(0x41e)]<=0x0&&(this[_0x27faf9(0x5d7)]=0xff);},Sprite_VisuMz_MessagePopup[_0xe5069(0x678)][_0xe5069(0x530)]=function(){const _0x29383f=_0xe5069;if(this[_0x29383f(0x4ae)]<=0x0)return;if(this[_0x29383f(0x5e3)]>this['_fadeOutStart'])return;const _0x4d7065=this[_0x29383f(0x4ae)];this[_0x29383f(0x5d7)]=(this[_0x29383f(0x5d7)]*(_0x4d7065-0x1)+0x0)/_0x4d7065,this['_fadeOutDuration']--,this['_fadeOutDuration']<=0x0&&(this[_0x29383f(0x5d7)]=0x0);},Sprite_VisuMz_MessagePopup[_0xe5069(0x678)][_0xe5069(0x2a5)]=function(){const _0x423339=_0xe5069;if(this[_0x423339(0x5e3)]<=0x0)return;this[_0x423339(0x5e3)]--;if(this[_0x423339(0x5e3)]<=0x0){if(this[_0x423339(0x361)])this['parent'][_0x423339(0x203)](this);this['_textSprite'][_0x423339(0x5ac)]&&this[_0x423339(0x520)][_0x423339(0x5ac)]['destroy']();}},VisuMZ[_0xe5069(0x5f4)][_0xe5069(0x4db)]=Spriteset_Map['prototype'][_0xe5069(0x533)],Spriteset_Map['prototype'][_0xe5069(0x533)]=function(){const _0x2999b7=_0xe5069;VisuMZ[_0x2999b7(0x5f4)]['Spriteset_Map_createLowerLayer'][_0x2999b7(0x3ae)](this),this['createLabelWindows']();},VisuMZ['EventsMoveCore'][_0xe5069(0x401)]=Spriteset_Map[_0xe5069(0x678)][_0xe5069(0x539)],Spriteset_Map[_0xe5069(0x678)]['createShadow']=function(){const _0x2a3f2f=_0xe5069;VisuMZ['EventsMoveCore']['Spriteset_Map_createShadow'][_0x2a3f2f(0x3ae)](this),this[_0x2a3f2f(0x32b)]();},Spriteset_Map['prototype'][_0xe5069(0x32b)]=function(){const _0x234779=_0xe5069;if(!VisuMZ['EventsMoveCore'][_0x234779(0x553)][_0x234779(0x595)][_0x234779(0x2fc)])return;for(const _0x420f14 of this[_0x234779(0x53e)]){this['createCharacterShadow'](_0x420f14);}},Spriteset_Map[_0xe5069(0x678)]['createCharacterShadow']=function(_0x435e97){const _0x5c7942=_0xe5069;_0x435e97[_0x5c7942(0x5fd)]=new Sprite(),_0x435e97[_0x5c7942(0x5fd)][_0x5c7942(0x217)]=_0x435e97[_0x5c7942(0x386)]['shadowFilename'](),_0x435e97[_0x5c7942(0x5fd)][_0x5c7942(0x5ac)]=ImageManager[_0x5c7942(0x5d6)](_0x435e97['_shadowSprite'][_0x5c7942(0x217)]),_0x435e97[_0x5c7942(0x5fd)]['anchor']['x']=0.5,_0x435e97['_shadowSprite']['anchor']['y']=0x1;const _0x5d4ed0=VisuMZ[_0x5c7942(0x5f4)][_0x5c7942(0x553)][_0x5c7942(0x595)][_0x5c7942(0x24a)]??0.5;_0x435e97[_0x5c7942(0x5fd)]['z']=_0x5d4ed0,this[_0x5c7942(0x61c)][_0x5c7942(0x4a3)](_0x435e97[_0x5c7942(0x5fd)]);},Spriteset_Map['prototype'][_0xe5069(0x5d0)]=function(){const _0x5730ab=_0xe5069;if(!VisuMZ[_0x5730ab(0x5f4)][_0x5730ab(0x553)]['Movement'][_0x5730ab(0x2fc)])return;for(const _0x1cb264 of this['_characterSprites']){this[_0x5730ab(0x61c)][_0x5730ab(0x203)](_0x1cb264[_0x5730ab(0x5fd)]);}},Spriteset_Map[_0xe5069(0x678)][_0xe5069(0x2be)]=function(){const _0x13d7c3=_0xe5069;this[_0x13d7c3(0x554)]=[];for(const _0x203b90 of $gameMap['events']()){this[_0x13d7c3(0x60e)](_0x203b90);}},Spriteset_Map['MOBILE_EVENT_LABELS']=VisuMZ[_0xe5069(0x5f4)][_0xe5069(0x553)][_0xe5069(0x1ce)][_0xe5069(0x3a1)]??!![],Spriteset_Map[_0xe5069(0x678)][_0xe5069(0x60e)]=function(_0x3afbb4){const _0x1e4664=_0xe5069;if(!this[_0x1e4664(0x297)](_0x3afbb4))return;if(Utils[_0x1e4664(0x4af)]()){if(!Spriteset_Map[_0x1e4664(0x3ba)])return;}let _0x33497c;const _0x4f713b=VisuMZ[_0x1e4664(0x5f4)]['Settings'][_0x1e4664(0x1ce)][_0x1e4664(0x58f)]??!![];_0x33497c=_0x4f713b?new Sprite_EventLabel(_0x3afbb4):new Window_EventLabel(_0x3afbb4),_0x33497c['z']=0x8,_0x33497c[_0x1e4664(0x4c3)]=Sprite[_0x1e4664(0x1b2)]++,this['_tilemap']['addChild'](_0x33497c),this[_0x1e4664(0x554)]['push'](_0x33497c);},Spriteset_Map[_0xe5069(0x678)][_0xe5069(0x297)]=function(_0x34c829){const _0x597113=_0xe5069,_0x55e884=_0x34c829['event']();if(_0x55e884[_0x597113(0x3b4)][_0x597113(0x506)](/<LABEL:[ ](.*?)>/i))return!![];if(_0x55e884[_0x597113(0x3b4)][_0x597113(0x506)](/<LABEL>\s*([\s\S]*)\s*<\/LABEL>/i))return!![];for(const _0x76e4f of _0x55e884[_0x597113(0x4a8)]){let _0x39ec80='';for(const _0x571e4d of _0x76e4f['list']){[0x6c,0x198][_0x597113(0x22a)](_0x571e4d[_0x597113(0x4f0)])&&(_0x39ec80+=_0x571e4d[_0x597113(0x5a1)][0x0]);}if(_0x39ec80[_0x597113(0x506)](/<LABEL:[ ](.*?)>/i))return!![];if(_0x39ec80[_0x597113(0x506)](/<LABEL>\s*([\s\S]*)\s*<\/LABEL>/i))return!![];}return![];},Spriteset_Map[_0xe5069(0x678)][_0xe5069(0x1fd)]=function(_0x52b8cf){const _0x21d4e6=_0xe5069;this['_characterSprites']=this[_0x21d4e6(0x53e)]||[];const _0x13e020=new Sprite_Character(_0x52b8cf);this[_0x21d4e6(0x53e)][_0x21d4e6(0x3a5)](_0x13e020),this['_tilemap'][_0x21d4e6(0x4a3)](_0x13e020),this[_0x21d4e6(0x44a)](_0x13e020),this[_0x21d4e6(0x60e)](_0x52b8cf),_0x13e020['update'](),_0x52b8cf[_0x21d4e6(0x3fb)](),_0x13e020['updateFrame']();},Spriteset_Map[_0xe5069(0x678)][_0xe5069(0x2b4)]=function(){const _0x4a8c63=_0xe5069;if(!this[_0x4a8c63(0x554)])return;for(const _0x28854b of this[_0x4a8c63(0x554)]){_0x28854b&&(_0x28854b[_0x4a8c63(0x24d)]=undefined,_0x28854b[_0x4a8c63(0x422)]());}},Spriteset_Map[_0xe5069(0x678)]['createEventsMoveCoreMessagePopup']=function(_0x264434,_0x2f4781){const _0x17cbb4=_0xe5069;if(!_0x264434)return;_0x2f4781[_0x17cbb4(0x549)]={'x':_0x264434['x'],'y':_0x264434['y']},this[_0x17cbb4(0x669)](_0x2f4781);},Spriteset_Map[_0xe5069(0x678)]['createEventsMoveCoreTileMessagePopup']=function(_0x44bcce){const _0x58cadd=_0xe5069;if(!this[_0x58cadd(0x61c)])return;const _0x4fab79=new Sprite_VisuMz_MessagePopup(_0x44bcce);this['_tilemap']['addChild'](_0x4fab79);},VisuMZ[_0xe5069(0x5f4)][_0xe5069(0x4b7)]=Game_Message['prototype']['setNumberInput'],Game_Message['prototype']['setNumberInput']=function(_0xbe9862,_0xa8f856){const _0x21a5cc=_0xe5069;this[_0x21a5cc(0x30e)]=$gameTemp['getSelfTarget'](),VisuMZ[_0x21a5cc(0x5f4)][_0x21a5cc(0x4b7)][_0x21a5cc(0x3ae)](this,_0xbe9862,_0xa8f856);},VisuMZ[_0xe5069(0x5f4)][_0xe5069(0x565)]=Window_NumberInput[_0xe5069(0x678)]['start'],Window_NumberInput[_0xe5069(0x678)][_0xe5069(0x246)]=function(){const _0x5aaff5=_0xe5069;$gameTemp['registerSelfTarget']($gameMessage[_0x5aaff5(0x30e)]),VisuMZ[_0x5aaff5(0x5f4)][_0x5aaff5(0x565)][_0x5aaff5(0x3ae)](this),$gameTemp['clearSelfTarget']();},VisuMZ[_0xe5069(0x5f4)]['Window_NumberInput_processOk']=Window_NumberInput['prototype'][_0xe5069(0x649)],Window_NumberInput[_0xe5069(0x678)][_0xe5069(0x649)]=function(){const _0x70b80c=_0xe5069;$gameTemp[_0x70b80c(0x32a)]($gameMessage[_0x70b80c(0x30e)]),VisuMZ[_0x70b80c(0x5f4)][_0x70b80c(0x5bf)]['call'](this),$gameTemp[_0x70b80c(0x511)](),$gameMessage[_0x70b80c(0x30e)]=undefined;},VisuMZ[_0xe5069(0x5f4)]['Game_Message_setItemChoice']=Game_Message[_0xe5069(0x678)][_0xe5069(0x442)],Game_Message[_0xe5069(0x678)][_0xe5069(0x442)]=function(_0x2ab425,_0x1387ec){const _0x5d295c=_0xe5069;this[_0x5d295c(0x1c8)]=$gameTemp['getSelfTarget'](),VisuMZ[_0x5d295c(0x5f4)]['Game_Message_setItemChoice'][_0x5d295c(0x3ae)](this,_0x2ab425,_0x1387ec);},VisuMZ[_0xe5069(0x5f4)][_0xe5069(0x597)]=Window_EventItem[_0xe5069(0x678)][_0xe5069(0x351)],Window_EventItem[_0xe5069(0x678)][_0xe5069(0x351)]=function(){const _0x55cfc7=_0xe5069;$gameTemp[_0x55cfc7(0x32a)]($gameMessage['_selfTargetItemChoice']),VisuMZ[_0x55cfc7(0x5f4)][_0x55cfc7(0x597)][_0x55cfc7(0x3ae)](this),$gameTemp[_0x55cfc7(0x511)](),$gameMessage['_selfTargetItemChoice']=undefined;},VisuMZ['EventsMoveCore'][_0xe5069(0x26b)]=Window_EventItem[_0xe5069(0x678)][_0xe5069(0x287)],Window_EventItem[_0xe5069(0x678)][_0xe5069(0x287)]=function(){const _0x84170a=_0xe5069;$gameTemp[_0x84170a(0x32a)]($gameMessage[_0x84170a(0x1c8)]),VisuMZ[_0x84170a(0x5f4)][_0x84170a(0x26b)]['call'](this),$gameTemp[_0x84170a(0x511)](),$gameMessage[_0x84170a(0x1c8)]=undefined;},VisuMZ[_0xe5069(0x5f4)]['Window_Message_startMessage']=Window_Message[_0xe5069(0x678)]['startMessage'],Window_Message['prototype'][_0xe5069(0x2b6)]=function(){const _0x360198=_0xe5069;$gameMessage[_0x360198(0x61a)](),VisuMZ[_0x360198(0x5f4)][_0x360198(0x472)][_0x360198(0x3ae)](this),$gameTemp[_0x360198(0x511)]();},VisuMZ[_0xe5069(0x5f4)][_0xe5069(0x221)]=Window_ScrollText[_0xe5069(0x678)]['startMessage'],Window_ScrollText[_0xe5069(0x678)][_0xe5069(0x2b6)]=function(){const _0x56f44e=_0xe5069;$gameMessage[_0x56f44e(0x61a)](),VisuMZ[_0x56f44e(0x5f4)][_0x56f44e(0x221)][_0x56f44e(0x3ae)](this),$gameTemp[_0x56f44e(0x511)]();};function Window_EventLabel(){const _0x1f2446=_0xe5069;this[_0x1f2446(0x33f)](...arguments);}Window_EventLabel['prototype']=Object['create'](Window_Base['prototype']),Window_EventLabel[_0xe5069(0x678)][_0xe5069(0x4eb)]=Window_EventLabel,Window_EventLabel[_0xe5069(0x678)]['initialize']=function(_0x5b4b69){const _0x167f46=_0xe5069;this['_event']=_0x5b4b69;const _0xa7db3b=new Rectangle(0x0,0x0,Graphics[_0x167f46(0x2ab)]/0x4,this[_0x167f46(0x2c1)](0x1));this[_0x167f46(0x316)](),Window_Base[_0x167f46(0x678)]['initialize'][_0x167f46(0x3ae)](this,_0xa7db3b),this[_0x167f46(0x286)]=0x0,this[_0x167f46(0x24f)](0x2),this[_0x167f46(0x50a)]='';},Window_EventLabel[_0xe5069(0x678)]['initMembers']=function(){const _0x5492fc=_0xe5069;this[_0x5492fc(0x1f8)]=![],this[_0x5492fc(0x574)]=$gameScreen[_0x5492fc(0x329)](),this[_0x5492fc(0x463)]=this[_0x5492fc(0x5b8)][_0x5492fc(0x202)](),this['_eventScreenY']=this[_0x5492fc(0x5b8)][_0x5492fc(0x2f7)](),this[_0x5492fc(0x21a)]=this[_0x5492fc(0x5b8)][_0x5492fc(0x60a)][_0x5492fc(0x2e1)],this[_0x5492fc(0x4c5)]=this[_0x5492fc(0x5b8)][_0x5492fc(0x60a)][_0x5492fc(0x4a6)],this[_0x5492fc(0x4e9)]=this[_0x5492fc(0x5b8)][_0x5492fc(0x4fd)],this[_0x5492fc(0x59f)]=this[_0x5492fc(0x2f1)](),this[_0x5492fc(0x59b)]=$gameSystem['eventLabelsVisible'](),this[_0x5492fc(0x24d)]=$gamePlayer['x'],this[_0x5492fc(0x256)]=$gamePlayer['y'],this[_0x5492fc(0x5ec)]=this[_0x5492fc(0x5b8)]['x'],this[_0x5492fc(0x383)]=this[_0x5492fc(0x5b8)]['y'];},Window_EventLabel[_0xe5069(0x678)][_0xe5069(0x59e)]=function(){const _0x3294d1=_0xe5069;Window_Base[_0x3294d1(0x678)]['update'][_0x3294d1(0x3ae)](this);if(!this[_0x3294d1(0x674)]())return;this[_0x3294d1(0x381)](),this[_0x3294d1(0x590)](),this['updatePosition'](),this[_0x3294d1(0x22d)]();},Window_EventLabel[_0xe5069(0x678)]['needsUpdate']=function(){const _0x1fd4eb=_0xe5069;if(!this['_event'])return![];if(!this[_0x1fd4eb(0x5b8)][_0x1fd4eb(0x60a)])return![];if(this['_eventPageIndex']!==this[_0x1fd4eb(0x5b8)][_0x1fd4eb(0x4fd)])return!![];if(this['_event'][_0x1fd4eb(0x216)]&&!this['_eventErased'])return!![];if(this[_0x1fd4eb(0x5b8)][_0x1fd4eb(0x60a)]['text']==='')return![];if(this[_0x1fd4eb(0x574)]!==$gameScreen[_0x1fd4eb(0x329)]())return!![];if(this[_0x1fd4eb(0x463)]!==this[_0x1fd4eb(0x5b8)][_0x1fd4eb(0x202)]())return!![];if(this[_0x1fd4eb(0x3db)]!==this[_0x1fd4eb(0x5b8)]['screenY']())return!![];if(this[_0x1fd4eb(0x21a)]!==this['_event']['_labelWindow'][_0x1fd4eb(0x2e1)])return!![];if(this[_0x1fd4eb(0x4c5)]!==this['_event'][_0x1fd4eb(0x60a)][_0x1fd4eb(0x4a6)])return!![];if(this['_visiblePlayerX']!==$gamePlayer['x'])return!![];if(this[_0x1fd4eb(0x256)]!==$gamePlayer['y'])return!![];if(this['_visibleEventX']!==this[_0x1fd4eb(0x5b8)]['x'])return!![];if(this[_0x1fd4eb(0x383)]!==this['_event']['y'])return!![];if(this['_cacheSystemVisible']!==$gameSystem['eventLabelsVisible']())return!![];if(this[_0x1fd4eb(0x59f)]&&this[_0x1fd4eb(0x286)]<0xff)return!![];if(!this[_0x1fd4eb(0x59f)]&&this['contentsOpacity']>0x0)return!![];if(SceneManager[_0x1fd4eb(0x3df)][_0x1fd4eb(0x43e)]>0x0)return!![];return![];},Window_EventLabel[_0xe5069(0x678)][_0xe5069(0x381)]=function(){const _0x34906d=_0xe5069;this['_event']['labelWindowText']()!==this[_0x34906d(0x50a)]&&(this[_0x34906d(0x50a)]=this[_0x34906d(0x5b8)][_0x34906d(0x1f5)](),this[_0x34906d(0x422)]());},Window_EventLabel[_0xe5069(0x678)][_0xe5069(0x590)]=function(){const _0x2be942=_0xe5069;this[_0x2be942(0x58d)]['x']=0x1/$gameScreen[_0x2be942(0x329)](),this['scale']['y']=0x1/$gameScreen[_0x2be942(0x329)](),this['_screenZoomScale']=$gameScreen[_0x2be942(0x329)]();},Window_EventLabel[_0xe5069(0x678)][_0xe5069(0x2ed)]=function(){const _0x4f8611=_0xe5069;if(!SceneManager[_0x4f8611(0x3df)])return;if(!SceneManager['_scene']['_spriteset'])return;const _0x5e2828=SceneManager[_0x4f8611(0x3df)][_0x4f8611(0x477)][_0x4f8611(0x618)](this[_0x4f8611(0x5b8)]);if(!_0x5e2828)return;this['x']=Math['round'](this[_0x4f8611(0x5b8)]['screenX']()-Math[_0x4f8611(0x485)](this[_0x4f8611(0x2ad)]*this[_0x4f8611(0x58d)]['x']/0x2)),this['x']+=this[_0x4f8611(0x5b8)][_0x4f8611(0x60a)][_0x4f8611(0x2e1)],this['y']=this[_0x4f8611(0x5b8)]['screenY']()-_0x5e2828[_0x4f8611(0x206)],this['y']+=Math[_0x4f8611(0x471)]($gameSystem['windowPadding']()*0.5),this['y']-=Math['round'](this['height']*this[_0x4f8611(0x58d)]['y']),this['y']+=this[_0x4f8611(0x5b8)][_0x4f8611(0x60a)][_0x4f8611(0x4a6)],this[_0x4f8611(0x1f8)]=this[_0x4f8611(0x5b8)]['_erased'],this['_eventScreenX']=this['_event'][_0x4f8611(0x202)](),this[_0x4f8611(0x3db)]=this[_0x4f8611(0x5b8)][_0x4f8611(0x2f7)](),this[_0x4f8611(0x21a)]=this[_0x4f8611(0x5b8)][_0x4f8611(0x60a)][_0x4f8611(0x2e1)],this[_0x4f8611(0x4c5)]=this['_event'][_0x4f8611(0x60a)][_0x4f8611(0x4a6)],this['_eventPageIndex']=this[_0x4f8611(0x5b8)]['_pageIndex'],this[_0x4f8611(0x1f8)]&&(this[_0x4f8611(0x286)]=0x0);},Window_EventLabel[_0xe5069(0x678)][_0xe5069(0x22d)]=function(){const _0x1dc63b=_0xe5069;if(this[_0x1dc63b(0x2f1)]())this[_0x1dc63b(0x286)]+=this[_0x1dc63b(0x300)]();else SceneManager['_scene'][_0x1dc63b(0x43e)]>0x0?this[_0x1dc63b(0x286)]=0x0:this[_0x1dc63b(0x286)]-=this['opacitySpeed']();},Window_EventLabel['prototype']['isLabelVisible']=function(){const _0x3fb6c2=_0xe5069;if(!$gameSystem[_0x3fb6c2(0x48d)]())return![];if(this[_0x3fb6c2(0x5b8)]?.['_erased'])return![];if(SceneManager[_0x3fb6c2(0x3df)][_0x3fb6c2(0x43e)]>0x0)return![];const _0x53b69f=$gamePlayer['x'],_0x21f637=$gamePlayer['y'],_0x4785ba=this[_0x3fb6c2(0x5b8)]['x'],_0x4c31cb=this['_event']['y'];if(this[_0x3fb6c2(0x24d)]===_0x53b69f&&this['_visiblePlayerY']===_0x21f637&&this[_0x3fb6c2(0x5ec)]===_0x4785ba&&this[_0x3fb6c2(0x383)]===_0x4c31cb)return this[_0x3fb6c2(0x59f)];this[_0x3fb6c2(0x24d)]=$gamePlayer['x'],this[_0x3fb6c2(0x256)]=$gamePlayer['y'],this[_0x3fb6c2(0x5ec)]=this[_0x3fb6c2(0x5b8)]['x'],this['_visibleEventY']=this[_0x3fb6c2(0x5b8)]['y'];if(!VisuMZ[_0x3fb6c2(0x5f4)][_0x3fb6c2(0x2cd)](this['_event']))return this[_0x3fb6c2(0x59f)]=![],![];return this[_0x3fb6c2(0x59f)]=!![],!![];},Window_EventLabel['prototype'][_0xe5069(0x300)]=function(){const _0x1fa643=_0xe5069;return VisuMZ[_0x1fa643(0x5f4)][_0x1fa643(0x553)][_0x1fa643(0x1ce)][_0x1fa643(0x32e)];},Window_EventLabel[_0xe5069(0x678)]['resizeWindow']=function(){const _0x2e0ff4=_0xe5069,_0x57cbf9=this[_0x2e0ff4(0x3ac)](this[_0x2e0ff4(0x50a)]);this[_0x2e0ff4(0x2ad)]=_0x57cbf9[_0x2e0ff4(0x2ad)]+($gameSystem[_0x2e0ff4(0x5d9)]()+this[_0x2e0ff4(0x602)]())*0x2,this[_0x2e0ff4(0x206)]=Math[_0x2e0ff4(0x314)](this[_0x2e0ff4(0x3f4)](),_0x57cbf9[_0x2e0ff4(0x206)])+$gameSystem[_0x2e0ff4(0x5d9)]()*0x2,this[_0x2e0ff4(0x22c)]();},Window_EventLabel[_0xe5069(0x678)][_0xe5069(0x3f4)]=function(){const _0x58a632=_0xe5069;return VisuMZ[_0x58a632(0x5f4)][_0x58a632(0x553)][_0x58a632(0x1ce)]['LineHeight'];},Window_EventLabel[_0xe5069(0x678)][_0xe5069(0x5bc)]=function(){const _0x5b05b1=_0xe5069;Window_Base[_0x5b05b1(0x678)][_0x5b05b1(0x5bc)][_0x5b05b1(0x3ae)](this),this[_0x5b05b1(0x632)][_0x5b05b1(0x4b5)]=this[_0x5b05b1(0x288)]();},Window_EventLabel[_0xe5069(0x678)][_0xe5069(0x288)]=function(){const _0x635a5f=_0xe5069;return VisuMZ[_0x635a5f(0x5f4)]['Settings']['Label'][_0x635a5f(0x521)];},Window_EventLabel[_0xe5069(0x678)][_0xe5069(0x422)]=function(){const _0x4e510b=_0xe5069;this[_0x4e510b(0x2a3)](),this[_0x4e510b(0x632)]['clear']();const _0x5c2d84=this[_0x4e510b(0x50a)][_0x4e510b(0x395)](/[\r\n]+/);let _0x777d40=0x0;for(const _0xab51fb of _0x5c2d84){const _0x5b0b48=this['textSizeEx'](_0xab51fb),_0x856fa4=Math[_0x4e510b(0x485)]((this['innerWidth']-_0x5b0b48['width'])/0x2);this[_0x4e510b(0x65e)](_0xab51fb,_0x856fa4,_0x777d40),_0x777d40+=_0x5b0b48[_0x4e510b(0x206)];}},Window_EventLabel['prototype'][_0xe5069(0x5e2)]=function(_0x34b04e,_0x508c6b){const _0x17cd0a=_0xe5069;_0x508c6b[_0x17cd0a(0x2ea)]&&this[_0x17cd0a(0x5a0)](_0x34b04e,_0x508c6b['x']+0x2,_0x508c6b['y']),_0x508c6b['x']+=Math[_0x17cd0a(0x346)](this[_0x17cd0a(0x677)](),ImageManager[_0x17cd0a(0x333)])+0x4;},Window_EventLabel[_0xe5069(0x678)][_0xe5069(0x5a0)]=function(_0x33ce23,_0x3dd8b3,_0x3f0d15){const _0xc4c4b0=_0xe5069,_0x158fc8=ImageManager[_0xc4c4b0(0x5d6)](_0xc4c4b0(0x330)),_0x7919f6=ImageManager[_0xc4c4b0(0x333)],_0xcad004=ImageManager[_0xc4c4b0(0x2df)],_0x5166b2=_0x33ce23%0x10*_0x7919f6,_0x1b82ac=Math['floor'](_0x33ce23/0x10)*_0xcad004,_0x193d23=Math[_0xc4c4b0(0x346)](this['iconSize']()),_0x1884f8=Math[_0xc4c4b0(0x346)](this[_0xc4c4b0(0x677)]());this[_0xc4c4b0(0x632)][_0xc4c4b0(0x406)](_0x158fc8,_0x5166b2,_0x1b82ac,_0x7919f6,_0xcad004,_0x3dd8b3,_0x3f0d15,_0x193d23,_0x1884f8);},Window_EventLabel['prototype']['iconSize']=function(){const _0x4fb84f=_0xe5069;return VisuMZ[_0x4fb84f(0x5f4)]['Settings'][_0x4fb84f(0x1ce)]['IconSize'];};