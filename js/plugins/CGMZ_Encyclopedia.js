/*:
 * @author Casper Gaming
 * @url https://www.caspergaming.com/plugins/cgmz/encyclopedia/
 * @target MZ
 * @plugindesc Creates an encyclopedia scene for your game
 * @help
 * ============================================================================
 * For terms and conditions using this plugin in your game please visit:
 * https://www.caspergaming.com/terms-of-use/
 * ============================================================================
 * Become a Patron to get access to beta/alpha plugins plus other goodies!
 * https://www.patreon.com/CasperGamingRPGM
 * ============================================================================
 * Version: 1.10.0
 * ----------------------------------------------------------------------------
 * Compatibility: Only tested with my CGMZ plugins.
 * Made for RPG Maker MZ 1.8.0
 * ----------------------------------------------------------------------------
 * Description: This plugin creates a powerful encyclopedia for your game,
 * with default categories including bestiary, items, armors, weapons, skills,
 * and states. It can also handle as many custom categories as desired with
 * their own custom entries.
 * ----------------------------------------------------------------------------
 * Documentation:
 * -----------------------Adding to Main Menu----------------------------------
 * To easily call the encyclopedia from the main menu, use CGMZ Menu Command 
 * Window and use the following script in its parameters:
 * SceneManager.push(CGMZ_Scene_Encyclopedia);
 *
 * If you want to have a specific category selected, you can add the
 * following JS *after* the above JS:
 * SceneManager.prepareNextScene(category);
 * where category will be something like "items" including the quotations
 * -------------------------Plugin Commands------------------------------------
 * • Discover Enemy
 * Discovers the enemy with the ID provided
 * 
 * • Discover Item
 * Discovers the item with the ID provided
 * 
 * • Discover Weapon
 * Discovers the weapon with the ID provided
 * 
 * • Discover Armor
 * Discovers the armor with the ID provided
 * 
 * • Discover Skill
 * Discovers the skill with the ID provided
 * 
 * • Discover State
 * Discovers the state with the ID provided
 * 
 * • Discover Actor
 * Discovers the actor with the ID provided
 * 
 * • Discover Custom
 * Discovers the custom entry with the ID and symbol provided
 * 
 * • Discover Batch
 * Discovers multiple enemies/items/weapons/armors/skills/states/actors
 * 
 * • Discover Custom Batch
 * Discovers multiple custom entries.
 * 
 * • Check Discovered
 * Turns a game switch ON/OFF if a given entry is discovered/undiscovered
 *
 * • Call Scene
 * Calls the encyclopedia scene. Optionally select the category which should
 * begin selected.
 * 
 * • Get Completion
 * Stores completion % of a category (or all) in a game variable. total = all
 * category %
 * 
 * • Reinitialize
 * Reinitializes ALL encyclopedia data as if you had started a new game.
 * ------------------------Custom Categories-----------------------------------
 * Custom categories must be manually tracked. Default categories (bestiary,
 * item, weapon, armor, skill, state) will all be automatically tracked if
 * included except for some uncommon circumstances.
 * --------------------------Subcategories-------------------------------------
 * Subcategories are optional. To set up a subcategory, provide the main
 * category id and then a unique id for the subcategory. There will also be an
 * "all" subcategory, so do not use "all" for the subcategory id. From there,
 * you can choose the entry ids to include in the subcategory.
 *
 * You could use this to split the bestiary up between normal and boss enemies,
 * weapons between axes, maces, and swords, and many more uses.
 *
 * Default main category ids are: bestiary, items, armors, weapons, skills,
 * states, actors.
 * -----------------------Category Backgrounds---------------------------------
 * To show a background image in the Encyclopedia Scene for a specific
 * category, set the symbol to the category symbol and the image to the image
 * file you want to use.
 *
 * The symbols for the default categories are: bestiary, items, armors,
 * weapons, skills, states, actors
 * -----------------------------Notetags---------------------------------------
 * <cgmzdesc:[description]> - Puts a "note" in the encyclopedia display page
 *
 * <cgmzencyclopediahide> - Does not include the item in the encyclopedia
 * ----------------------------Text Codes--------------------------------------
 * In a custom entry description, you can use the encyclopedia text code:
 * \cgmzencdescimg[x]
 * to display the x numbered sketch belonging to the same entry mixed in with
 * the text of the description. Begins at 0 for the first sketch.
 * ----------------------------List Order--------------------------------------
 * You can use the List Order parameters for the default categories to
 * change the display order of those entries in the encyclopedia. Entries not
 * listed in the List Order parameter will display in the default order (how
 * they are in the database).
 * -------------------Large Icon Multiplier Option-----------------------------
 * This option changes the size of the icon displayed by default for items,
 * armors, weapons, states, and skills. It displaces text to the right based
 * on its height. Here are some common multiplier sizes that play nice with
 * text:
 * Lines displaced: 1, use multiplier size: 1.1
 * Lines displaced: 2, use multiplier size: 2.2
 * Lines displaced: 3, use multiplier size: 3.3
 * ---------------------------Date Formats-------------------------------------
 * The following numbers correspond to the following date formats:
 * 0: MM/DD/YYYY     (ex: 1/20/2001)
 * 1: DD/MM/YYYY     (ex: 20/1/2001)
 * 2: YYYY/MM/DD     (ex: 2001/1/20)
 * 3: Month DD, YYYY (ex: January 20, 2001)
 * 4: DD Month YYYY  (ex: 20 January 2001)
 * 5: Mon. DD, YYYY  (ex: Jan 20, 2001)
 * 6: DD Mon. YYYY   (ex: 20 Jan 2001)
 * 7: MM/DD          (ex: 1/20)
 * 8: DD/MM          (ex: 20/1)
 * ---------------------------Saved Games--------------------------------------
 * This plugin has limited compatibility with saved games. New entries of any
 * category will automatically be recognized by saved games. Modified or
 * deleted entries are not supported/recognized. This means if you add a new
 * enemy (for example), this should work in a saved game. However, if you
 * change an enemy or delete an enemy, this would cause problems in saved
 * games.
 * -------------------------Version History------------------------------------
 * 1.0 - Initial release
 *
 * 1.1.0:
 * - Added additional checks during battle to discover enemies
 *
 * 1.1.1:
 * - Fixed totals window being too large in some cases
 * - Fixed list window items having no padding
 * - Fixed bug with the list window not scrolling up after cancel
 *
 * 1.1.2:
 * - This plugin now initiates a check for CGMZ Achievements after discovery
 *
 * 1.1.3:
 * - Fixed a bug with TP Gain effects being drawn over Item descriptions
 * - Whitespace is now trimmed from the currency unit for the heading in
 *   bestiary
 *
 * 1.2.0:
 * - New entries and custom data are now automatically recognized in saved
 *   games
 * - Added ability to use text codes in descriptions, categories, and item
 *   lists
 * - Added option to change label text color
 * - Added option to change text alignment of totals window
 * - Added option to customize category window height and column count
 * - Added plugin command to discover multiple entries at once
 * - Fixed bug with custom image size being incorrect for first draw
 * - Fixed display bug for items with learn skill effects
 * - Fixed display bug with Drop Item Double party effects
 * - Compatibility for VS Core (fix for weird window spacing)
 *
 * 1.2.1:
 * - Fixed bug with columns for other horizontal command windows
 * 
 * 1.2.2:
 * - Fixed bug with Include Categories (when set to OFF only) behaving weirdly.
 *
 * 1.3.0:
 * - Added ability to choose which info to display for every category
 * - Added ability to re-order information shown for every category
 * - Added custom batch discovery plugin command
 * - Added ability to turn off auto-discovery
 * - Increased max height of display window
 * - Fixed bug with custom entries that didn't have descriptions
 * - Fixed bug with uppercase symbols for custom categories
 * - Documentation no longer horizontally scrolls
 * - Documentation update to be easier to read/explain more
 *
 * 1.4.0:
 * - You can now choose which category begins selected when the scene
 *   opens
 * - Added plugin command to store completion % in a variable
 * - Added plugin command to change custom entry description
 *
 * 1.5.0:
 * - Added option to display different name in list and display windows
 *   for custom entries
 * - Custom entries now support multiple images instead of just one
 * - Added plugin command to change custom entry sketch
 * - Fixed issue with adding this plugin into a saved game that did not
 *   previously have the encyclopedia.
 *
 * 1.6.0:
 * - Added option to hide undiscovered entries from the list window
 * - Added option to customize the sort order in the list window
 * - Added text code for displaying sketch images mixed in with
 *   description for custom entries
 * - Updated color parameters to use new text color selector
 *
 * 1.6.1:
 * - Bugfix for missing parameters if using Chinese language
 *
 * 1.7.0:
 * - Added new built in category: Actors
 * - Added option to center large icons
 * - Added option to show list window on right
 * - Added option to disable Touch UI space at top
 * - Added ability to change window padding for each window
 * - Added ability to change windowskin for each window
 * - Added ability to change the list window width
 * - Added Spanish language support
 *
 * 1.7.1:
 * - Bugfix for incorrect states being included in some cases
 * - Bugfix for font not resetting when drawing a new entry
 * - Bugfix for certain cases where touch UI could cause list window
 *   scroll to be incorrect
 * 
 * 1.7.2:
 * - Bugfix for crash when drawing actors with center icons option on
 * 
 * 1.7.3:
 * - Bugfix for actor entries resetting after first save
 * 
 * 1.8.0:
 * - Added ability to play BGMs while viewing enemies in bestiary
 * - Added option to display the date an entry was discovered
 * - Added option to autodiscover skills when they are used
 * - This plugin can now integrate with CGMZ Difficulty to show enemy
 *   stats/gold/exp based on the current difficulty
 * - This plugin now reports JSON parameter errors instead of crashing. If 
 *   something isn't working right, please check dev tool console before
 *   reporting a bug.
 * 
 * 1.9.0:
 * - Added option to display the skills an enemy can use
 * - Added option to have a custom scene background image for each category
 * - Added option to change header line gradient colors
 * - Added option to have windows be transparent
 * - Added plugin command to check if an entry has been discovered
 * - Added option to automatically hide entries that have no name or a user
 *   defined string in their name
 * - Added option to make entries in the encyclopedia opt-in
 * 
 * 1.9.1:
 * - Fixed crash when selecting empty enemy entry (all entries hidden)
 * - Fix bug with empty entry showing last selected non-empty entry info
 * 
 * 1.10.0:
 * - Added subcategories
 * - Custom entries can now display main-category object data
 * - Added custom headers and info lines to custom entries
 * - Added option to change category window alignment
 *
 * @command DiscoverEnemy
 * @text Discover Enemy
 * @desc Discovers an enemy manually in the encyclopedia
 *
 * @arg id
 * @type enemy
 * @desc The id number of the enemy to discover
 * @default 1
 *
 * @command DiscoverItem
 * @text Discover Item
 * @desc Discovers an item manually in the encyclopedia
 *
 * @arg id
 * @type item
 * @desc The id number of the item to discover
 * @default 1
 *
 * @command DiscoverArmor
 * @text Discover Armor
 * @desc Discovers an armor manually in the encyclopedia
 *
 * @arg id
 * @type armor
 * @desc The id number of the armor to discover
 * @default 1
 *
 * @command DiscoverWeapon
 * @text Discover Weapon
 * @desc Discovers a weapon manually in the encyclopedia
 *
 * @arg id
 * @type weapon
 * @desc The id number of the weapon to discover
 * @default 1
 *
 * @command DiscoverSkill
 * @text Discover Skill
 * @desc Discovers a skill manually in the encyclopedia
 *
 * @arg id
 * @type skill
 * @desc The id number of the skill to discover
 * @default 1
 *
 * @command DiscoverState
 * @text Discover State
 * @desc Discovers a state manually in the encyclopedia
 *
 * @arg id
 * @type state
 * @desc The id number of the state to discover
 * @default 1
 *
 * @command Discover Actor
 * @desc Discovers an actor manually in the encyclopedia
 *
 * @arg id
 * @type actor
 * @desc The id number of the actor to discover
 * @default 1
 *
 * @command Discover Batch
 * @desc Discovers multiple entries.
 *
 * @arg enemies
 * @type enemy[]
 * @desc The id number of the enemies to discover
 * @default []
 *
 * @arg items
 * @type item[]
 * @desc The id number of the items to discover
 * @default []
 *
 * @arg weapons
 * @type weapon[]
 * @desc The id number of the weapons to discover
 * @default []
 *
 * @arg armors
 * @type armor[]
 * @desc The id number of the armors to discover
 * @default []
 *
 * @arg skills
 * @type skill[]
 * @desc The id number of the skills to discover
 * @default []
 *
 * @arg states
 * @type state[]
 * @desc The id number of the states to discover
 * @default []
 *
 * @arg actors
 * @type actor[]
 * @desc The id number of the actors to discover
 * @default []
 *
 * @command DiscoverCustom
 * @text Discover Custom
 * @desc Discovers a custom entry in the encyclopedia
 *
 * @arg id
 * @type number
 * @desc The id number of the entry to discover
 * @default 1
 *
 * @arg symbol
 * @desc The Category Symbol of the entry to discover
 * @default 
 *
 * @command Discover Custom Batch
 * @desc Discovers multiple custom entries in the encyclopedia
 *
 * @arg entries
 * @type struct<CustomDiscovery>[]
 * @desc Custom entries to discover
 * @default []
 *
 * @command Call Scene
 * @desc Calls the Encyclopedia Scene
 *
 * @arg category
 * @desc Category symbol to select after opening
 *
 * @command Get Completion
 * @desc Stores completion percentage in a game variable
 *
 * @arg Variable
 * @type variable
 * @desc The variable to store the completion % in
 * @default 1
 *
 * @arg symbol
 * @desc The Category Symbol to check completion percent of (leave blank for overall completion)
 * @default total
 *
 * @command Change Description
 * @desc Change a custom entry description
 *
 * @arg Name
 * @desc The name of the entry to change
 *
 * @arg Symbol
 * @desc The Category Symbol the entry belongs to
 *
 * @arg Description
 * @type note
 * @desc The new description for the entry.
 * @default ""
 *
 * @command Change Sketch
 * @desc Change a custom entry sketch
 *
 * @arg Name
 * @desc The name of the entry to change
 *
 * @arg Symbol
 * @desc The Category Symbol the entry belongs to
 *
 * @arg Sketch
 * @type file[]
 * @dir img/
 * @desc The new sketch for the entry.
 * @default []
 *
 * @command Check Discovered
 * @desc Check if an entry has been discovered
 *
 * @arg Id
 * @type number
 * @desc The id number of the entry to check
 *
 * @arg Symbol
 * @desc The Category Symbol of the entry to check
 *
 * @arg Switch
 * @type switch
 * @default 0
 * @desc The game switch to turn on/off by discover status
 *
 * @command Reinitialize
 * @desc Resets all of the encyclopedia data. Use for saved games to recognize modified data
 *
 * @param Functional Options
 * 
 * @param Autodiscover Bestiary
 * @type boolean
 * @desc Determines if enemies should be automatically discovered
 * @default true
 * @parent Functional Options
 * 
 * @param Autodiscover Items
 * @type boolean
 * @desc Determines if items should be automatically discovered
 * @default true
 * @parent Functional Options
 * 
 * @param Autodiscover Armors
 * @type boolean
 * @desc Determines if armors should be automatically discovered
 * @default true
 * @parent Functional Options
 * 
 * @param Autodiscover Weapons
 * @type boolean
 * @desc Determines if weapons should be automatically discovered
 * @default true
 * @parent Functional Options
 * 
 * @param Autodiscover Skills
 * @type boolean
 * @desc Determines if skills should be automatically discovered when learned
 * @default true
 * @parent Functional Options
 * 
 * @param Autodiscover States
 * @type boolean
 * @desc Determines if states should be automatically discovered
 * @default true
 * @parent Functional Options
 * 
 * @param Autodiscover Actors
 * @type boolean
 * @desc Determines if actors should be automatically discovered
 * @default true
 * @parent Functional Options
 * 
 * @param Autodiscover Skills On Use
 * @type boolean
 * @desc Determines if skills should be automatically discovered when used
 * @default true
 * @parent Functional Options
 * 
 * @param Ignore Blank Entries
 * @type boolean
 * @desc Determines if the encyclopedia should automatically ignore entries with blank names
 * @default true
 * @parent Functional Options
 * 
 * @param Ignore Entries With Name
 * @desc Any entry with the string entered here in its name will be automatically excluded from the encyclopedia
 * @default -----
 * @parent Functional Options
 * 
 * @param Opt In Entries
 * @type boolean
 * @desc If true, only entries with the <cgmzencyclopediahide> notetag will be included in the encyclopedia
 * @default false
 * @parent Functional Options
 *
 * @param Category Options
 * 
 * @param Include Bestiary
 * @type boolean
 * @desc Determines if the scene should include the bestiary part of the encyclopedia
 * @default true
 * @parent Category Options
 * 
 * @param Include Items
 * @type boolean
 * @desc Determines if the scene should include the items part of the encyclopedia
 * @default true
 * @parent Category Options
 * 
 * @param Include Armors
 * @type boolean
 * @desc Determines if the scene should include the armors part of the encyclopedia
 * @default true
 * @parent Category Options
 * 
 * @param Include Weapons
 * @type boolean
 * @desc Determines if the scene should include the weapons part of the encyclopedia
 * @default true
 * @parent Category Options
 * 
 * @param Include Skills
 * @type boolean
 * @desc Determines if the scene should include the skills part of the encyclopedia
 * @default true
 * @parent Category Options
 * 
 * @param Include States
 * @type boolean
 * @desc Determines if the scene should include the states part of the encyclopedia
 * @default true
 * @parent Category Options
 * 
 * @param Include Actors
 * @type boolean
 * @desc Determines if the scene should include the actors part of the encyclopedia
 * @default true
 * @parent Category Options
 *
 * @param Categories
 * @type struct<Category>[]
 * @default ["{\"Category Name\":\"Bestiary\",\"Category Symbol\":\"bestiary\",\"Category Display Requirements\":\"{\\\"Item\\\":\\\"0\\\",\\\"Switch\\\":\\\"0\\\"}\",\"Category Enable Requirements\":\"{\\\"Item\\\":\\\"0\\\",\\\"Switch\\\":\\\"0\\\"}\",\"Command Text\":\"Bestiary\"}","{\"Category Name\":\"Items\",\"Category Symbol\":\"items\",\"Category Display Requirements\":\"{\\\"Item\\\":\\\"0\\\",\\\"Switch\\\":\\\"0\\\"}\",\"Category Enable Requirements\":\"{\\\"Item\\\":\\\"0\\\",\\\"Switch\\\":\\\"0\\\"}\",\"Command Text\":\"Items\"}","{\"Category Name\":\"Armors\",\"Category Symbol\":\"armors\",\"Category Display Requirements\":\"{\\\"Item\\\":\\\"0\\\",\\\"Switch\\\":\\\"0\\\"}\",\"Category Enable Requirements\":\"{\\\"Item\\\":\\\"0\\\",\\\"Switch\\\":\\\"0\\\"}\",\"Command Text\":\"Armors\"}","{\"Category Name\":\"Weapons\",\"Category Symbol\":\"weapons\",\"Category Display Requirements\":\"{\\\"Item\\\":\\\"0\\\",\\\"Switch\\\":\\\"0\\\"}\",\"Category Enable Requirements\":\"{\\\"Item\\\":\\\"0\\\",\\\"Switch\\\":\\\"0\\\"}\",\"Command Text\":\"Weapons\"}","{\"Category Name\":\"Skills\",\"Category Symbol\":\"skills\",\"Category Display Requirements\":\"{\\\"Item\\\":\\\"0\\\",\\\"Switch\\\":\\\"0\\\"}\",\"Category Enable Requirements\":\"{\\\"Item\\\":\\\"0\\\",\\\"Switch\\\":\\\"0\\\"}\",\"Command Text\":\"Skills\"}","{\"Category Name\":\"States\",\"Category Symbol\":\"states\",\"Category Display Requirements\":\"{\\\"Item\\\":\\\"0\\\",\\\"Switch\\\":\\\"0\\\"}\",\"Category Enable Requirements\":\"{\\\"Item\\\":\\\"0\\\",\\\"Switch\\\":\\\"0\\\"}\",\"Command Text\":\"States\"}","{\"Category Name\":\"Actors\",\"Category Symbol\":\"actors\",\"Category Display Requirements\":\"{\\\"Item\\\":\\\"0\\\",\\\"Switch\\\":\\\"0\\\"}\",\"Category Enable Requirements\":\"{\\\"Item\\\":\\\"0\\\",\\\"Switch\\\":\\\"0\\\"}\",\"Command Text\":\"Actors\"}"]
 * @desc Categories for the encyclopedia to select from in the encyclopedia scene.
 * @parent Category Options
 *
 * @param Subcategories
 * @type struct<Subcategory>[]
 * @default []
 * @parent Category Options
 *
 * @param Custom Entry Options
 *
 * @param Custom Entries
 * @parent Custom Entry Options
 * @type struct<Custom>[]
 * @default []
 * @desc Custom entries not already covered in the encyclopedia
 *
 * @param Extra Entry Settings
 *
 * @param Extra Bestiary Settings
 * @parent Extra Entry Settings
 * @type struct<ExtraEnemyInfo>[]
 * @default []
 * @desc Set up extra enemy information here
 *
 * @param Encyclopedia Scene Options
 *
 * @param Unknown Entry
 * @desc Text to put in the list window for an unknown entry
 * @default ? ? ? ? ?
 * @parent Encyclopedia Scene Options
 *
 * @param Unknown Entry Display
 * @desc Text to put in the display window for an unknown entry
 * @default This has not yet been discovered.
 * @parent Encyclopedia Scene Options
 *
 * @param Total Window Text
 * @desc Text to put for the total completion %
 * @default Total:
 * @parent Encyclopedia Scene Options
 *
 * @param Total Window Rounding
 * @desc How many decimals to round to.
 * @type number
 * @min 1
 * @default 2
 * @parent Encyclopedia Scene Options
 *
 * @param Total Window Alignment
 * @parent Encyclopedia Scene Options
 * @type select
 * @option left
 * @option center
 * @option right
 * @desc The alignment of the text in the totals window
 * @default left
 *
 * @param List Window Alignment
 * @parent Encyclopedia Scene Options
 * @type select
 * @option left
 * @option center
 * @option right
 * @desc The alignment of the text in the list window
 * @default left
 *
 * @param Category Window Alignment
 * @parent Encyclopedia Scene Options
 * @type select
 * @option left
 * @option center
 * @option right
 * @desc The alignment of the text in the category window
 * @default center
 *
 * @param Subcategory Window Alignment
 * @parent Encyclopedia Scene Options
 * @type select
 * @option left
 * @option center
 * @option right
 * @desc The alignment of the text in the subcategory window
 * @default center
 *
 * @param Subcategory Columns
 * @desc The maximum amount of columns to display in the category window
 * @type number
 * @min 1
 * @default 4
 * @parent Encyclopedia Scene Options
 *
 * @param Show Subcategory All
 * @parent Encyclopedia Scene Options
 * @type boolean
 * @desc If true, will display an "all" subcategory
 * @default true
 *
 * @param List Window Enable Text Codes
 * @parent Encyclopedia Scene Options
 * @type boolean
 * @desc Allow text codes in the list window? This will no longer automatically shrink text to fit
 * @default false
 *
 * @param Number Entries
 * @type boolean
 * @desc Number each entry in the list window?
 * @default true
 * @parent Encyclopedia Scene Options
 *
 * @param Hide Undiscovered
 * @type boolean
 * @desc If true, undiscovered entries will not display in the list window
 * @default false
 * @parent Encyclopedia Scene Options
 *
 * @param Number Bestiary Skills
 * @type boolean
 * @desc If true, skills will be numbered in the bestiary
 * @default true
 * @parent Encyclopedia Scene Options
 *
 * @param Bestiary Skill Number Separator
 * @desc The text to come after the skill number but before the skill in the bestiary
 * @default . 
 * @parent Encyclopedia Scene Options
 *
 * @param Disable Touch UI Space
 * @parent Encyclopedia Scene Options
 * @type boolean
 * @desc If true, will not leave space for Touch UI buttons if Touch UI is disabled
 * @default false
 *
 * @param List Window On Right
 * @parent Encyclopedia Scene Options
 * @type boolean
 * @desc If true, will display the list window on the right side of the screen
 * @default false
 *
 * @param List Window Width
 * @parent Encyclopedia Scene Options
 * @type number
 * @min 0
 * @max 100
 * @desc % of the screen width the list window takes up
 * @default 33
 *
 * @param Categories Per Line
 * @type number
 * @min 1
 * @desc Amount of categories to display per line
 * @default 4
 * @parent Encyclopedia Scene Options
 *
 * @param Category Lines
 * @type number
 * @min 1
 * @desc Amount of lines to show before scrolling in category window
 * @default 1
 * @parent Encyclopedia Scene Options
 *
 * @param Bestiary List Order
 * @type enemy[]
 * @desc Order enemies should display in list window. Leave blank to use default order.
 * @default []
 * @parent Encyclopedia Scene Options
 *
 * @param Items List Order
 * @type item[]
 * @desc Order items should display in list window. Leave blank to use default order.
 * @default []
 * @parent Encyclopedia Scene Options
 *
 * @param Armors List Order
 * @type armor[]
 * @desc Order armors should display in list window. Leave blank to use default order.
 * @default []
 * @parent Encyclopedia Scene Options
 *
 * @param Weapons List Order
 * @type weapon[]
 * @desc Order weapons should display in list window. Leave blank to use default order.
 * @default []
 * @parent Encyclopedia Scene Options
 *
 * @param Skills List Order
 * @type skill[]
 * @desc Order skills should display in list window. Leave blank to use default order.
 * @default []
 * @parent Encyclopedia Scene Options
 *
 * @param States List Order
 * @type state[]
 * @desc Order states should display in list window. Leave blank to use default order.
 * @default []
 * @parent Encyclopedia Scene Options
 *
 * @param Actors List Order
 * @type actor[]
 * @desc Order actor should display in list window. Leave blank to use default order.
 * @default []
 * @parent Encyclopedia Scene Options
 *
 * @param Transparent Windows
 * @type boolean
 * @default false
 * @desc If the Encyclopedia Windows should have a transparent background
 * @parent Encyclopedia Scene Options
 *
 * @param Category Window Padding
 * @type number
 * @min 0
 * @default 12
 * @desc The window padding for the category window
 * @parent Encyclopedia Scene Options
 *
 * @param Subcategory Window Padding
 * @type number
 * @min 0
 * @default 12
 * @desc The window padding for the subcategory window
 * @parent Encyclopedia Scene Options
 *
 * @param List Window Padding
 * @type number
 * @min 0
 * @default 12
 * @desc The window padding for the list window
 * @parent Encyclopedia Scene Options
 *
 * @param Total Window Padding
 * @type number
 * @min 0
 * @default 12
 * @desc The window padding for the total window
 * @parent Encyclopedia Scene Options
 *
 * @param Display Window Padding
 * @type number
 * @min 0
 * @default 12
 * @desc The window padding for the display window
 * @parent Encyclopedia Scene Options
 *
 * @param List Windowskin
 * @parent Encyclopedia Scene Options 
 * @type file
 * @dir img/
 * @desc The windowskin to use for the list window. Leave blank to use default.
 *
 * @param Display Windowskin
 * @parent Encyclopedia Scene Options
 * @type file
 * @dir img/
 * @desc The windowskin to use for the display window. Leave blank to use default.
 *
 * @param Total Windowskin
 * @parent Encyclopedia Scene Options
 * @type file
 * @dir img/
 * @desc The windowskin to use for the total window. Leave blank to use default.
 *
 * @param Category Windowskin
 * @parent Encyclopedia Scene Options
 * @type file
 * @dir img/
 * @desc The windowskin to use for the Category window. Leave blank to use default.
 *
 * @param Subcategory Windowskin
 * @parent Encyclopedia Scene Options
 * @type file
 * @dir img/
 * @desc The windowskin to use for the Subcategory window. Leave blank to use default.
 *
 * @param Default Enemy Battle BGM
 * @parent Encyclopedia Scene Options
 * @type struct<BGM>
 * @desc Default BGM to play when viewing an enemy in the bestiary. Leave blank for no sound.
 *
 * @param Category Backgrounds
 * @parent Encyclopedia Scene Options
 * @type struct<Background>[]
 * @default []
 * @desc Set up scene backgrounds for the various categories here
 *
 * @param Display Window Options
 *
 * @param Bestiary Display Info
 * @type select[]
 * @option Name
 * @option Stats
 * @option Exp
 * @option Gold
 * @option Drops
 * @option Skills
 * @option Note
 * @option Sketch
 * @option Discover Date
 * @option Info Header
 * @option Stats Header
 * @option Drops Header
 * @option Note Header
 * @option Sketch Header
 * @option Skills Header
 * @option Blank Line
 * @desc The information and order to display when drawing a bestiary entry
 * @default ["Name","Stats","Exp","Gold","Drops","Note","Sketch"]
 * @parent Display Window Options
 *
 * @param Item Display Info
 * @type select[]
 * @option Name
 * @option Icon
 * @option Price
 * @option Key Item
 * @option Possession
 * @option Consumable
 * @option Success Rate
 * @option Effects
 * @option Description
 * @option Note
 * @option Discover Date
 * @option Info Header
 * @option Effect Header
 * @option Note Header
 * @option Description Header
 * @option Blank Line
 * @desc The information and order to display when drawing an item entry
 * @default ["Name","Icon","Price","Key Item","Possession","Consumable","Success Rate","Effects","Description","Note"]
 * @parent Display Window Options
 *
 * @param Armor Display Info
 * @type select[]
 * @option Name
 * @option Icon
 * @option Price
 * @option Equip Type
 * @option Possession
 * @option Armor Type
 * @option Stats
 * @option Traits
 * @option Description
 * @option Note
 * @option Discover Date
 * @option Info Header
 * @option Trait Header
 * @option Note Header
 * @option Description Header
 * @option Stat Header
 * @option Blank Line
 * @desc The information and order to display when drawing an armor entry
 * @default ["Name","Icon","Price","Equip Type","Possession","Armor Type","Stats","Traits","Description","Note"]
 * @parent Display Window Options
 *
 * @param Weapon Display Info
 * @type select[]
 * @option Name
 * @option Icon
 * @option Price
 * @option Equip Type
 * @option Possession
 * @option Weapon Type
 * @option Stats
 * @option Traits
 * @option Description
 * @option Note
 * @option Discover Date
 * @option Info Header
 * @option Trait Header
 * @option Note Header
 * @option Description Header
 * @option Stat Header
 * @option Blank Line
 * @desc The information and order to display when drawing a weapon entry
 * @default ["Name","Icon","Price","Equip Type","Possession","Weapon Type","Stats","Traits","Description","Note"]
 * @parent Display Window Options
 *
 * @param Skill Display Info
 * @type select[]
 * @option Name
 * @option Icon
 * @option Type
 * @option Costs
 * @option Success Rate
 * @option TP Gain
 * @option Effects
 * @option Description
 * @option Note
 * @option Discover Date
 * @option Info Header
 * @option Effect Header
 * @option Note Header
 * @option Description Header
 * @option Blank Line
 * @desc The information and order to display when drawing a skill entry
 * @default ["Name","Icon","Type","Costs","Success Rate","TP Gain","Effects","Description","Note"]
 * @parent Display Window Options
 *
 * @param State Display Info
 * @type select[]
 * @option Name
 * @option Icon
 * @option Duration
 * @option Battle End Removal
 * @option Walking Removal
 * @option Damage Removal
 * @option Traits
 * @option Note
 * @option Discover Date
 * @option Info Header
 * @option Trait Header
 * @option Note Header
 * @option Blank Line
 * @desc The information and order to display when drawing a state entry
 * @default ["Name","Icon","Duration","Battle End Removal","Walking Removal","Damage Removal","Traits","Note"]
 * @parent Display Window Options
 *
 * @param Actor Display Info
 * @type select[]
 * @option Name
 * @option Face
 * @option Nickname
 * @option Class
 * @option Initial Level
 * @option Max Level
 * @option Profile
 * @option Stats
 * @option Traits
 * @option Note
 * @option Discover Date
 * @option Info Header
 * @option Stat Header
 * @option Trait Header
 * @option Note Header
 * @option Blank Line
 * @desc The information and order to display when drawing an actor entry
 * @default ["Name","Face","Nickname","Class","Profile","Stats","Traits","Note"]
 * @parent Display Window Options
 *
 * @param Custom Display Info
 * @type select[]
 * @option Name
 * @option Sketch
 * @option Description
 * @option Discover Date
 * @option Custom Info
 * @option Sketch Header
 * @option Description Header
 * @option Custom Header
 * @option Blank Line
 * @desc The information and order to display when drawing custom entry
 * @default ["Name","Description","Sketch"]
 * @parent Display Window Options
 *
 * @param Stat Display Info
 * @type select[]
 * @option Max HP
 * @option Max MP
 * @option Attack
 * @option Defense
 * @option M Attack
 * @option M Defense
 * @option Agility
 * @option Luck
 * @desc The information and order to display when drawing stats
 * @default ["Max HP","Max MP","Attack","Defense","M Attack","M Defense","Agility","Luck"]
 * @parent Display Window Options
 *
 * @param Effect Display Info
 * @type select[]
 * @option HP Effect
 * @option MP Effect
 * @option TP Effect
 * @option State Add
 * @option State Remove
 * @option Buff
 * @option Debuff
 * @option Removed Buff
 * @option Removed Debuff
 * @option Grow
 * @option Learn
 * @desc The information and order to display when drawing stats
 * @default ["HP Effect","MP Effect","TP Effect","State Add","State Remove","Buff","Debuff","Removed Buff","Removed Debuff","Grow","Learn"]
 * @parent Display Window Options
 *
 * @param Trait Display Info
 * @type select[]
 * @option Attack Speed
 * @option Attack Times
 * @option Attack Element
 * @option Attack States
 * @option Party Ability
 * @option Seal Skill Types
 * @option Add Skill Types
 * @option Add Skills
 * @option Seal Skills
 * @option State Resist
 * @desc The information and order to display when drawing stats
 * @default ["Attack Speed","Attack Times","Attack Element","Attack States","Party Ability","Seal Skill Types","Add Skill Types","Add Skills","Seal Skills","State Resist"]
 * @parent Display Window Options
 *
 * @param Strip Newlines In Description
 * @type boolean
 * @desc Replace newlines with a space in the description of items/etc?
 * @default true
 * @parent Display Window Options
 *
 * @param Center Icons
 * @type boolean
 * @desc If true, icon display will be centered in the encyclopedia
 * @default false
 * @parent Display Window Options
 *
 * @param Scroll Wait
 * @parent Display Window Options
 * @type number
 * @min 0
 * @desc amount of time (in frames) to wait before beginning to scroll
 * @default 300
 *
 * @param Scroll Speed
 * @parent Display Window Options
 * @type number
 * @min 0
 * @desc speed at which the display window scrolls (if needed)
 * @default 1
 *
 * @param Scroll Deceleration
 * @parent Display Window Options
 * @type number
 * @min 0.01
 * @max 0.99
 * @decimals 2
 * @desc Rate of deceleration after letting go of touch
 * @default 0.92
 *
 * @param Auto Scroll
 * @parent Display Window Options
 * @type boolean
 * @desc Determine if the display window should automatically scroll after so long of no user input
 * @default true
 *
 * @param Large Icon Multiplier
 * @desc Determines the factor to increase the icon size by for a large icon
 * @type number
 * @decimals 1
 * @min 0.1
 * @default 3.3
 * @parent Display Window Options
 *
 * @param Text Options
 *
 * @param Label Color
 * @type color
 * @desc The color of the label / header text
 * @default 1
 * @parent Text Options
 *
 * @param Header Color 1
 * @type color
 * @desc The first color of the header line color gradient
 * @default 1
 * @parent Text Options
 *
 * @param Header Color 2
 * @type color
 * @desc The second color of the header line color gradient
 * @default 0
 * @parent Text Options
 *
 * @param Yes Text
 * @desc Word to use for a yes answer
 * @default Yes
 * @parent Text Options
 *
 * @param No Text
 * @desc Word to use for a no answer
 * @default No
 * @parent Text Options
 *
 * @param Price Text
 * @desc Text to show when describing the price
 * @default Price:
 * @parent Text Options
 *
 * @param No Price Text
 * @desc Text to show when describing the price when the item is unsellable
 * @default Not for sale
 * @parent Text Options
 *
 * @param Key Item Text
 * @desc Text to show when describing a key item or not key item
 * @default Key Item:
 * @parent Text Options
 *
 * @param Possession Text
 * @desc Text to show when describing how many of an item the player has
 * @default Possession:
 * @parent Text Options
 *
 * @param Equip Type Text
 * @desc Text to show when describing what slot the equipment goes in (equip type)
 * @default Equip Slot:
 * @parent Text Options
 *
 * @param Armor Type Text
 * @desc Text to show when describing what type of armor it is (armor type)
 * @default Armor Type:
 * @parent Text Options
 *
 * @param No Armor Type Text
 * @desc Text to show when armor has no type in database
 * @default None
 * @parent Text Options
 *
 * @param Weapon Type Text
 * @desc Text to show when describing what type of weapon it is (weapon type)
 * @default Weapon Type:
 * @parent Text Options
 *
 * @param No Weapon Type Text
 * @desc Text to show when weapon has no type in database
 * @default None
 * @parent Text Options
 *
 * @param Skill Type Text
 * @desc Text to show when describing what type of skill it is (skill type)
 * @default Skill Type:
 * @parent Text Options
 *
 * @param No Skill Type Text
 * @desc Text to show when skill has no type in database
 * @default Basic
 * @parent Text Options
 *
 * @param Drops Text
 * @desc Text to show when describing rewards from an enemy
 * @default Drops:
 * @parent Text Options
 *
 * @param Show Drop Chances
 * @desc Determine whether drop chances are shown in the encyclopedia
 * @type boolean
 * @default true
 * @parent Text Options
 *
 * @param Drop Chance Text
 * @desc Text to show when describing drop chance for an item
 * @default Chance:
 * @parent Text Options
 *
 * @param Sketch Text
 * @desc Text to show when describing a sketch for an item
 * @default Sketch:
 * @parent Text Options
 *
 * @param Note Text
 * @desc Text to describe what is found in meta notes
 * @default Note:
 * @parent Text Options
 *
 * @param Nickname Text
 * @desc Text to describe an actor's nickname
 * @default Nickname:
 * @parent Text Options
 *
 * @param Class Text
 * @desc Text to describe an actor's class
 * @default Class:
 * @parent Text Options
 *
 * @param Initial Level Text
 * @desc Text to describe an actor's initial level
 * @default Initial Level:
 * @parent Text Options
 *
 * @param Max Level Text
 * @desc Text to describe an actor's max level
 * @default Max Level:
 * @parent Text Options
 *
 * @param Profile Text
 * @desc Text to describe an actor's profile
 * @default Profile:
 * @parent Text Options
 *
 * @param Success Rate Text
 * @desc Text to describe success rate of an item
 * @default Success Rate:
 * @parent Text Options
 *
 * @param Consumable Text
 * @desc Text to describe whether an item is consumable
 * @default Consumable:
 * @parent Text Options
 *
 * @param HP Effect Text
 * @desc Text to describe when an item has an HP effect
 * @default HP Effect:
 * @parent Text Options
 *
 * @param MP Effect Text
 * @desc Text to describe when an item has an MP effect
 * @default MP Effect:
 * @parent Text Options
 *
 * @param TP Effect Text
 * @desc Text to describe when an item has a TP effect
 * @default TP Effect:
 * @parent Text Options
 *
 * @param Add State Text
 * @desc Text to describe when an item has an add state effect
 * @default Causes:
 * @parent Text Options
 *
 * @param Remove State Text
 * @desc Text to describe when an item has a remove state effect
 * @default Cures:
 * @parent Text Options
 *
 * @param Add Buff Text
 * @desc Text to describe when an item has a buff effect
 * @default Buffs:
 * @parent Text Options
 *
 * @param Add Debuff Text
 * @desc Text to describe when an item has a debuff effect
 * @default Debuffs:
 * @parent Text Options
 *
 * @param Remove Buff Text
 * @desc Text to describe when an item removes a buff effect
 * @default Remove Buffs:
 * @parent Text Options
 *
 * @param Remove Debuff Text
 * @desc Text to describe when an item removes a debuff effect
 * @default Clear Debuffs:
 * @parent Text Options
 *
 * @param Grow Text
 * @desc Text to describe when an item has a grow effect
 * @default Trains:
 * @parent Text Options
 *
 * @param Party Ability Text
 * @desc Text to describe when an armor or weapon has a party ability trait
 * @default Special Effect:
 * @parent Text Options
 *
 * @param Half Encounter Text
 * @desc Text to describe party ability half encounter
 * @default Half Encounter Rate
 * @parent Text Options
 *
 * @param No Encounter Text
 * @desc Text to describe party ability no encounter
 * @default No Encounters
 * @parent Text Options
 *
 * @param Cancel Surprise Text
 * @desc Text to describe party ability cancel surprise
 * @default Cancel Surprise
 * @parent Text Options
 *
 * @param Raise Preemptive Text
 * @desc Text to describe party ability raise preemptive
 * @default Raise Preemptive
 * @parent Text Options
 *
 * @param Gold Double Text
 * @desc Text to describe party ability gold double
 * @default 2x Gold Drops
 * @parent Text Options
 *
 * @param Drop Item Double Text
 * @desc Text to describe party ability drop item double
 * @default 2x Item Drops
 * @parent Text Options
 *
 * @param Description Text
 * @desc Text to describe item description
 * @default Description:
 * @parent Text Options
 *
 * @param Element Text
 * @desc Text to describe attack element trait
 * @default Element:
 * @parent Text Options
 *
 * @param Attack Speed Text
 * @desc Text to describe attack speed trait
 * @default Speed Effect:
 * @parent Text Options
 *
 * @param Attack Times Text
 * @desc Text to describe attack times + trait
 * @default Additional Attacks:
 * @parent Text Options
 *
 * @param Attack State Text
 * @desc Text to describe attack apply state trait
 * @default Applies:
 * @parent Text Options
 *
 * @param MP Cost Text
 * @desc Text to describe MP Cost
 * @default MP Cost:
 * @parent Text Options
 *
 * @param TP Cost Text
 * @desc Text to describe TP Cost
 * @default TP Cost:
 * @parent Text Options
 *
 * @param User TP Gain Text
 * @desc Text to describe user TP Gain
 * @default User TP Gain:
 * @parent Text Options
 *
 * @param Battle Removal Text
 * @desc Text to describe state removal after battle property
 * @default Removed after battle:
 * @parent Text Options
 *
 * @param Walking Removal Text
 * @desc Text to describe state removal after walking property
 * @default Removed after walking:
 * @parent Text Options
 *
 * @param Damage Removal Text
 * @desc Text to describe state removal after damage property
 * @default Removed after damage:
 * @parent Text Options
 *
 * @param Duration Text
 * @desc Text to describe state auto-removal duration
 * @default Duration:
 * @parent Text Options
 *
 * @param Infinite Text
 * @desc Text to describe when state not automatically removed after some number of turns
 * @default Infinite
 * @parent Text Options
 *
 * @param Turns Text
 * @desc Text to describe turns in battle
 * @default Turns
 * @parent Text Options
 *
 * @param Seal Skill Types Text
 * @desc Text to describe trait that seals skill types
 * @default Locks:
 * @parent Text Options
 *
 * @param Add Skill Types Text
 * @desc Text to describe trait that adds skill types
 * @default Unlocks:
 * @parent Text Options
 *
 * @param Seal Skill Text
 * @desc Text to describe trait that seals skills
 * @default Locks:
 * @parent Text Options
 *
 * @param Add Skill Text
 * @desc Text to describe trait that adds skills
 * @default Grants:
 * @parent Text Options
 *
 * @param State Resist Text
 * @desc Text to describe trait that resists states
 * @default Resists:
 * @parent Text Options
 *
 * @param Learn Skill Text
 * @desc Text to describe effect that learns a skill
 * @default Learns:
 * @parent Text Options
 *
 * @param Discover Date Text
 * @desc Text to describe the date an entry was discovered
 * @default Discovered:
 * @parent Text Options
 *
 * @param Unknown Date Text
 * @desc Text to describe an unknown date
 * @default Unknown
 * @parent Text Options
 *
 * @param Subcategory All Text
 * @desc Text to describe the all subcategory
 * @default All
 * @parent Text Options
 *
 * @param Custom Sketch Header Text
 * @desc Text to show in custom sketch header
 * @default Sketch
 * @parent Text Options
 *
 * @param Custom Description Header Text
 * @desc Text to show in custom description header
 * @default Description
 * @parent Text Options
 *
 * @param Actor Info Header Text
 * @desc Text to show in actor's info header
 * @default Info
 * @parent Text Options
 *
 * @param Actor Stat Header Text
 * @desc Text to show in actor's info header
 * @default Stats
 * @parent Text Options
 *
 * @param Actor Trait Header Text
 * @desc Text to show in actor's trait header
 * @default Effects
 * @parent Text Options
 *
 * @param Actor Note Header Text
 * @desc Text to show in actor's note header
 * @default Notes
 * @parent Text Options
 *
 * @param State Info Header Text
 * @desc Text to show in state's info header
 * @default Info
 * @parent Text Options
 *
 * @param State Trait Header Text
 * @desc Text to show in state's trait header
 * @default Effects
 * @parent Text Options
 *
 * @param State Note Header Text
 * @desc Text to show in state's note header
 * @default Notes
 * @parent Text Options
 *
 * @param Skill Info Header Text
 * @desc Text to show in skill's info header
 * @default Info
 * @parent Text Options
 *
 * @param Skill Trait Header Text
 * @desc Text to show in skill's trait header
 * @default Effects
 * @parent Text Options
 *
 * @param Skill Description Header Text
 * @desc Text to show in skill's description header
 * @default Description
 * @parent Text Options
 *
 * @param Skill Note Header Text
 * @desc Text to show in skill's note header
 * @default Notes
 * @parent Text Options
 *
 * @param Weapon Info Header Text
 * @desc Text to show in weapon's info header
 * @default Info
 * @parent Text Options
 *
 * @param Weapon Stat Header Text
 * @desc Text to show in weapon's stat header
 * @default Stats
 * @parent Text Options
 *
 * @param Weapon Trait Header Text
 * @desc Text to show in weapon's trait header
 * @default Effects
 * @parent Text Options
 *
 * @param Weapon Description Header Text
 * @desc Text to show in weapon's description header
 * @default Description
 * @parent Text Options
 *
 * @param Weapon Note Header Text
 * @desc Text to show in weapon's note header
 * @default Notes
 * @parent Text Options
 *
 * @param Armor Info Header Text
 * @desc Text to show in armor's info header
 * @default Info
 * @parent Text Options
 *
 * @param Armor Stat Header Text
 * @desc Text to show in armor's stat header
 * @default Stats
 * @parent Text Options
 *
 * @param Armor Trait Header Text
 * @desc Text to show in armor's trait header
 * @default Effects
 * @parent Text Options
 *
 * @param Armor Description Header Text
 * @desc Text to show in armor's description header
 * @default Description
 * @parent Text Options
 *
 * @param Armor Note Header Text
 * @desc Text to show in armor's note header
 * @default Notes
 * @parent Text Options
 *
 * @param Item Info Header Text
 * @desc Text to show in item's info header
 * @default Info
 * @parent Text Options
 *
 * @param Item Effect Header Text
 * @desc Text to show in item's effect header
 * @default Effects
 * @parent Text Options
 *
 * @param Item Description Header Text
 * @desc Text to show in item's description header
 * @default Description
 * @parent Text Options
 *
 * @param Item Note Header Text
 * @desc Text to show in item's note header
 * @default Notes
 * @parent Text Options
 *
 * @param Bestiary Stats Header Text
 * @desc Text to show in bestiary's stats header
 * @default Stats
 * @parent Text Options
 *
 * @param Bestiary Drops Header Text
 * @desc Text to show in bestiary's drops header
 * @default Drops
 * @parent Text Options
 *
 * @param Bestiary Sketch Header Text
 * @desc Text to show in bestiary's sketch header
 * @default Sketch
 * @parent Text Options
 *
 * @param Bestiary Skills Header Text
 * @desc Text to show in bestiary's skills header
 * @default Skills
 * @parent Text Options
 *
 * @param Bestiary Note Header Text
 * @desc Text to show in bestiary's note header
 * @default Notes
 * @parent Text Options
 *
 * @param Date Format
 * @parent Text Options
 * @type number
 * @min 0
 * @max 8
 * @desc Number specifying date format. See documentation for help. Valid Range: 0-8
 * @default 0
 * 
 * @param Integration Options
 * 
 * @param Show Difficulty Mods
 * @type boolean
 * @desc If true, stats/exp/gold display accurate to the current difficulty (requires CGMZ Difficulty)
 * @default true
 * @parent Integration Options
*/
/*~struct~Category:
 * @param Category Name
 * @desc Text to show for category name in total window
 * 
 * @param Category Symbol
 * @desc Internal recognition of category, see documentation for help
 *
 * @param Category Display Requirements
 * @type struct<Requirements>
 * @default {"Item":"0","Switch":"0"}
 * @desc Requirements for the category to show up in category window
 * 
 * @param Category Enable Requirements
 * @type struct<Requirements>
 * @default {"Item":"0","Switch":"0"}
 * @desc Requirements for the category to be enabled and selectable
 *
 * @param Command Text
 * @desc Text to show for category in command window
*/
/*~struct~Subcategory:
 * @param Main Category Id
 * @desc Main category id. See help for default ids
 * 
 * @param Subcategory Id
 * @desc Internal recognition of subcategory. Cannot be blank. Must be unique.
 * 
 * @param Subcategory Name
 * @desc Text to display wherever the subcategory is used.
 *
 * @param Entry Ids
 * @type number[]
 * @default []
 * @desc Ids of objects from the main category to display in the subcategory
*/
/*~struct~Requirements:
 * @param Item
 * @type item
 * 
 * @param Switch
 * @type switch
*/
/*~struct~Custom:
 * @param Name
 * @desc The entry name.
 * 
 * @param Display Name
 * @desc The name to display in the Display window
 * 
 * @param Category Symbol
 * @desc Category this entry belongs to.
 *
 * @param Description
 * @type note
 * @desc Description to display for the entry.
 * @default ""
 *
 * @param Custom Info
 * @type note[]
 * @desc Custom info lines
 * @default []
 *
 * @param Custom Headers
 * @type text[]
 * @desc Custom info headers
 * @default []
 * 
 * @param Sketch
 * @dir img/
 * @type file[]
 * @desc image(s) to show at bottom of entry.
 * @default []
 *
 * @param Main Id
 * @type Number
 * @desc The id of a main category object to display (set to 0 to use custom info).
 * @default 0
 *
 * @param Main Type
 * @type select
 * @option enemy
 * @option item
 * @option armor
 * @option weapon
 * @option skill
 * @option state
 * @option actor
 * @desc The type of main category object to show if Main Id is greater than 0
 * @default enemy
*/
/*~struct~CustomDiscovery:
 * @param id
 * @type number
 * @desc The id number of the custom entry to discover
 * @default 1
 *
 * @param symbol
 * @desc The Category Symbol of the custom entry to discover
 * @default 
*/
/*~struct~BGM:
 * @param name
 * @type file
 * @dir audio/bgm/
 * @desc The audio file to play
 * 
 * @param volume
 * @type number
 * @min 0
 * @max 100
 * @default 90
 * @desc The volume of the sound
 * 
 * @param pitch
 * @type number
 * @min 50
 * @max 150
 * @default 100
 * @desc The pitch of the sound
 * 
 * @param pan
 * @type number
 * @min -100
 * @max 100
 * @default 0
 * @desc The pan of the sound
*/
/*~struct~ExtraEnemyInfo:
 * @param id
 * @type enemy
 * @desc The enemy to add extra info for
 * 
 * @param BGM
 * @type struct<BGM>
 * @desc Custom battle music to play when viewing this enemy in bestiary. Leave blank to use default.
*/
/*~struct~Background:
 * @param symbol
 * @desc The category symbol the background is for. See documentation.
 * 
 * @param image
 * @type file
 * @dir img/
 * @desc The image file to use for the background for the given category
*/
/*:zh-CN
 * @author Casper Gaming
 * @url https://www.caspergaming.com/plugins/cgmz/encyclopedia/
 * @target MZ
 * @plugindesc 百科全书（记录游戏内各种信息的图鉴）
 * @help
 * ============================================================================
 * 【使用条款】
 * 1、本插件可作商用或非商用。
 * 2、须注明插件作者"Casper Gaming"。
 * 3、须提供该插件的作者网站链接。
 * 4、最终使用条款以作者官网公告为准。https://www.caspergaming.com/terms-of-use/
 * ============================================================================
 * 【赞助支持】
 * 您可以登陆以下网站并对作者进行支持和赞助。
 * 然后获得作者和其插件的最新资讯，以及测试版插件的试用。
 * https://www.patreon.com/CasperGamingRPGM
 * ============================================================================
 * 【插件版本】V 1.10.0
 * ----------------------------------------------------------------------------
 * 【兼容性】仅测试作者所制作的插件
 * 【RM版本】RPG Maker MZ 1.8.0
 * ----------------------------------------------------------------------------
 * 【插件描述】
 * 建立一个功能强大的百科全书系统，用于收集记录游戏中的各种信息。
 * 默认图鉴类别：敌人、物品、武器、防具、技能、状态。
 * 支持创建新的图鉴类别来收集相关游戏的信息。
 *
 * 【搭配插件】
 * CGMZ Core:核心插件，运行作者插件的必须插件。
 * ----------------------------------------------------------------------------
 *【使用说明】
 * 一、打开百科全书。
 * 1. 将百科全书加入到游戏菜单作为选项进行打开，
 *    需要使用CGMZ_MenuCommandWindow插件，JS指令是：
 *    SceneManager.push(CGMZ_Scene_Encyclopedia);
 * 2. 如果你需要打开指定类别的百科全书图鉴：
 *    SceneManager.prepareNextScene("类别");
 *    类别即武器、物品、技能等。
 * 3. 以上2个指令也可以在事件-脚本指令中使用。
 *    
 * 二、插件指令： 
 * 1.发现敌人（Discover Enemy）
 * 2.发现物品（Discover Item）
 * 3.发现武器（Discover Weapon）
 * 4.发现防具（Discover Armor）
 * 5.发现技能（Discover Skill）
 * 6.发现状态（Discover State）
 * 7.发现自定义信息（Discover Custom）
 * 8.批量发现默认类别信息（Discover Batch）
 * 9.批量发现自定义类别信息（Discover Custom Batch）
 * 10.打开百科全书（Call Scene）可以设置打开某个类别，打开后停留在该类别窗口，但其他类别依然可选。
 * 11.获取完成度变量（Get Completion）获取百科全书的百分比完成度作为变量在游戏中使用。
 * 12.重置数据（Reinitialize）将百科全书的数据重置到开始新游戏时的状态。
 * 
 * • Check Discovered
 * Turns a game switch ON/OFF if a given entry is discovered/undiscovered
 *
 * 三、自定义或默认的类别和信息（自定义信息 Custom Entry）
 * 1.自定义信息需要使用插件指令激活，才能在百科全书内显示。
 * 2.关于自定义信息的ID，由于插件是早期制作然后移植到MZ，定义ID方面有些不便和复杂，请注意查看举例。
 *   举例：当设置了三个自定义信息类别为：城镇、人物、地下城。
 *         而设置了若干个相关的自定义信息，在设置界面内显示如下：
 *         1.城镇A
 *         2.地下城A
 *         3.人物A
 *         4.城镇B
 *         5.人物B
 *         6.城镇C
 *   激活：激活需要输入ID和类别命令（symbol）。如果要激活人物A，则要输入ID=1，类别=人物。
 *         从列表中看，人物A在所有新一种排第三，但是它在人物这个类别中是第一个，所以ID是1。
 *         如要激活第五位的人物B则ID=2，激活第六位的城镇C则ID=3，以此类推。
 *
 * 3.默认的类别和条目信息，在正常情况下会自动加入百科全书。如：敌人、物品、武器、防具、技能、状态。
 *
 * 四、备注指令（在设置画面备注栏输入）
 * 1.使该条目在百科全书内显示一个额外的描述：<cgmzdesc:[描述内容]>
 * 2.使该条目在百科全书内不显示：<cgmzencyclopediahide>
 * 
 * 五、大图标位置和尺寸设置
 * This option changes the size of the icon displayed by default for items,
 * armors, weapons, states, and skills. It displaces text to the right based
 * on its height. Here are some common multiplier sizes that play nice with
 * text:
 * Lines displaced: 1, use multiplier size: 1.1
 * Lines displaced: 2, use multiplier size: 2.2
 * Lines displaced: 3, use multiplier size: 3.3
 *
 * 六、支持已保存的游戏
 * This plugin has limited compatibility with saved games. New entries of any
 * category will automatically be recognized by saved games. Modified or
 * deleted entries are not supported/recognized. This means if you add a new
 * enemy (for example), this should work in a saved game. However, if you
 * change an enemy or delete an enemy, this would cause problems in saved
 * games.
 * --------------------------Subcategories-------------------------------------
 * Subcategories are optional. To set up a subcategory, provide the main
 * category id and then a unique id for the subcategory. There will also be an
 * "all" subcategory, so do not use "all" for the subcategory id. From there,
 * you can choose the entry ids to include in the subcategory.
 *
 * You could use this to split the bestiary up between normal and boss enemies,
 * weapons between axes, maces, and swords, and many more uses.
 *
 * Default main category ids are: bestiary, items, armors, weapons, skills,
 * states, actors.
 * -----------------------Category Backgrounds---------------------------------
 * To show a background image in the Encyclopedia Scene for a specific
 * category, set the symbol to the category symbol and the image to the image
 * file you want to use.
 *
 * The symbols for the default categories are:
 * bestiary
 * items
 * armors
 * weapons
 * skills
 * states
 * actors
 * ----------------------------Text Codes--------------------------------------
 * In a custom entry description, you can use the encyclopedia text code:
 * \cgmzencdescimg[x]
 * to display the x numbered sketch belonging to the same entry mixed in with
 * the text of the description. Begins at 0 for the first sketch.
 * ----------------------------List Order--------------------------------------
 * You can use the List Order parameters for the default categories to
 * change the display order of those entries in the encyclopedia. Entries not
 * listed in the List Order parameter will display in the default order (how
 * they are in the database).
 * ---------------------------Date Formats-------------------------------------
 * The following numbers correspond to the following date formats:
 * 0: MM/DD/YYYY     (ex: 1/20/2001)
 * 1: DD/MM/YYYY     (ex: 20/1/2001)
 * 2: YYYY/MM/DD     (ex: 2001/1/20)
 * 3: Month DD, YYYY (ex: January 20, 2001)
 * 4: DD Month YYYY  (ex: 20 January 2001)
 * 5: Mon. DD, YYYY  (ex: Jan 20, 2001)
 * 6: DD Mon. YYYY   (ex: 20 Jan 2001)
 * 7: MM/DD          (ex: 1/20)
 * 8: DD/MM          (ex: 20/1)
 * ----------------------------------------------------------------------------
 *【版本更新历史】
 * 1.0 - Initial release
 * 1.1.0:
 * - Added additional checks during battle to discover enemies
 * 1.1.1:
 * - Fixed totals window being too large in some cases
 * - Fixed list window items having no padding
 * - Fixed bug with the list window not scrolling up after cancel
 * 1.1.2:
 * - This plugin now initiates a check for CGMZ Achievements after discovery
 * 1.1.3:
 * - Fixed a bug with TP Gain effects being drawn over Item descriptions
 * - Whitespace is now trimmed from the currency unit for the heading in
 *   bestiary
 * 1.2.0:
 * - New entries and custom data are now automatically recognized in saved
 *   games
 * - Added ability to use text codes in descriptions, categories, and item
 *   lists
 * - Added option to change label text color
 * - Added option to change text alignment of totals window
 * - Added option to customize category window height and column count
 * - Added plugin command to discover multiple entries at once
 * - Fixed bug with custom image size being incorrect for first draw
 * - Fixed display bug for items with learn skill effects
 * - Fixed display bug with Drop Item Double party effects
 * - Compatibility for VS Core (fix for weird window spacing)
 * 1.2.1:
 * - Fixed bug with columns for other horizontal command windows 
 * 1.2.2:
 * - Fixed bug with Include Categories (when set to OFF only) behaving weirdly.
 * 1.3.0:
 * - Added ability to choose which info to display for every category
 * - Added ability to re-order information shown for every category
 * - Added custom batch discovery plugin command
 * - Added ability to turn off auto-discovery
 * - Increased max height of display window
 * - Fixed bug with custom entries that didn't have descriptions
 * - Fixed bug with uppercase symbols for custom categories
 * - Documentation no longer horizontally scrolls
 * - Documentation update to be easier to read/explain more
 * 1.4.0:
 * - You can now choose which category begins selected when the scene
 *   opens
 * - Added plugin command to store completion % in a variable
 * - Added plugin command to change custom entry description
 * 1.5.0:
 * - Added option to display different name in list and display windows
 *   for custom entries
 * - Custom entries now support multiple images instead of just one
 * - Added plugin command to change custom entry sketch
 * - Fixed issue with adding this plugin into a saved game that did not
 *   previously have the encyclopedia.
 * 1.6.0:
 * - Added option to hide undiscovered entries from the list window
 * - Added option to customize the sort order in the list window
 * - Added text code for displaying sketch images mixed in with
 *   description for custom entries
 * - Updated color parameters to use new text color selector
 * 1.6.1:
 * - Bugfix for missing parameters if using Chinese language
 * 1.7.0:
 * - Added new built in category: Actors
 * - Added option to center large icons
 * - Added option to show list window on right
 * - Added option to disable Touch UI space at top
 * - Added ability to change window padding for each window
 * - Added ability to change windowskin for each window
 * - Added ability to change the list window width
 * - Added Spanish language support
 * 1.7.1:
 * - Bugfix for incorrect states being included in some cases
 * - Bugfix for font not resetting when drawing a new entry
 * - Bugfix for certain cases where touch UI could cause list window
 *   scroll to be incorrect
 * 1.7.2:
 * - Bugfix for crash when drawing actors with center icons option on
 * 1.7.3:
 * - Bugfix for actor entries resetting after first save
 * 1.8.0:
 * - Added ability to play BGMs while viewing enemies in bestiary
 * - Added option to display the date an entry was discovered
 * - Added option to autodiscover skills when they are used
 * - This plugin can now integrate with CGMZ Difficulty to show enemy
 *   stats/gold/exp based on the current difficulty
 * - This plugin now reports JSON parameter errors instead of crashing. If 
 *   something isn't working right, please check dev tool console before
 *   reporting a bug.
 * 1.9.0:
 * - Added option to display the skills an enemy can use
 * - Added option to have a custom scene background image for each category
 * - Added option to change header line gradient colors
 * - Added option to have windows be transparent
 * - Added plugin command to check if an entry has been discovered
 * - Added option to automatically hide entries that have no name or a user
 *   defined string in their name
 * - Added option to make entries in the encyclopedia opt-in
 * 1.9.1:
 * - Fixed crash when selecting empty enemy entry (all entries hidden)
 * - Fix bug with empty entry showing last selected non-empty entry info
 * 1.10.0:
 * - Added subcategories
 * - Custom entries can now display main-category object data
 * - Added custom headers and info lines to custom entries
 * - Added option to change category window alignment
 *
 * @command DiscoverEnemy
 * @text 发现敌人
 * @desc 通过ID激活敌人信息，并使其可以在百科全书中显示。
 *
 * @arg id
 * @text 敌人ID
 * @type enemy
 * @desc 选择一个ID来激活对应敌人的信息。
 * @default 1
 *
 * @command DiscoverItem
 * @text 发现物品
 * @desc 通过ID激活物品信息，并使其可以在百科全书中显示。
 *
 * @arg id
 * @text 物品ID
 * @type item
 * @desc 选择一个ID来激活对应物品的信息。
 * @default 1
 *
 * @command DiscoverArmor
 * @text 发现防具
 * @desc 通过ID激活防具信息，并使其可以在百科全书中显示。
 *
 * @arg id
 * @text 防具ID
 * @type armor
 * @desc 选择一个ID来激活对应防具的信息。
 * @default 1
 *
 * @command DiscoverWeapon
 * @text 发现武器
 * @desc  通过ID激活武器信息，并使其可以在百科全书中显示。
 *
 * @arg id
 * @text 武器ID
 * @type weapon
 * @desc 选择一个ID来激活对应武器的信息。
 * @default 1
 *
 * @command DiscoverSkill
 * @text 发现技能
 * @desc 通过ID激活技能信息，并使其可以在百科全书中显示。
 *
 * @arg id
 * @text 技能ID
 * @type skill
 * @desc 选择一个ID来激活对应技能的信息。
 * @default 1
 *
 * @command DiscoverState
 * @text 发现状态
 * @desc 通过ID激活状态信息，并使其可以在百科全书中显示。
 *
 * @arg id
 * @text 状态ID
 * @type state
 * @desc 选择一个ID来激活对应状态的信息。
 * @default 1
 *
 * @command Discover Actor
 * @desc Discovers an actor manually in the encyclopedia
 *
 * @arg id
 * @type actor
 * @desc The id number of the actor to discover
 * @default 1
 *
 * @command Discover Batch
 * @text 批量发现默认类别信息
 * @desc 批量发现默认类别信息，如敌人、物品、武器、防具、技能和状态。
 *
 * @arg enemies
 * @text 敌人
 * @type enemy[]
 * @desc 选择一个ID来激活对应敌人的信息。可以多选。
 * @default []
 *
 * @arg items
 * @text 物品
 * @type item[]
 * @desc 选择一个ID来激活对应物品的信息。可以多选。
 * @default []
 *
 * @arg weapons
 * @text 武器
 * @type weapon[]
 * @desc 选择一个ID来激活对应武器的信息。可以多选。
 * @default []
 *
 * @arg armors
 * @text 防具
 * @type armor[]
 * @desc 选择一个ID来激活对应防具的信息。可以多选。
 * @default []
 *
 * @arg skills
 * @text 技能
 * @type skill[]
 * @desc 选择一个ID来激活对应技能的信息。可以多选。
 * @default []
 *
 * @arg states
 * @text 状态
 * @type state[]
 * @desc 选择一个ID来激活对应状态能的信息。可以多选。
 * @default []
 *
 * @arg actors
 * @type actor[]
 * @desc The id number of the actors to discover
 * @default []
 *
 * @command DiscoverCustom
 * @text 发现自定义信息
 * @desc 通过ID激活自定义信息，并使其可以在百科全书中显示。
 *
 * @arg id
 * @text 自定义信息ID
 * @type number
 * @desc 选择自定义信息在同类别中的顺序ID来激活。（具体见【使用说明】）
 * @default 1
 *
 * @arg symbol
 * @text 自定义类别字符
 * @desc 输入以指定自定义信息条目所属的类别字符（Category Symbol）。字符、大小写必须一致。
 * @default 
 *
 * @command Discover Custom Batch
 * @text 批量发现自定义类别信息
 * @desc Discovers multiple custom entries in the encyclopedia
 *
 * @arg entries
 * @text 自定义信息
 * @type struct<CustomDiscovery>[]
 * @desc 选择需要激活的自定义类别信息。
 * @default []
 *
 * @command Call Scene
 * @text 打开百科全书
 * @desc 打开百科全书。
 *
 * @arg category
 * @text 打开类别
 * @desc 打开菜单后跳转到指定的类别。
 *
 * @command Get Completion
 * @text 获取百分比变量
 * @desc 获取百科全书完成度的百分比数值作为变量。（如86%则变量为86 ）
 *
 * @arg Variable
 * @text 选择变量
 * @type variable
 * @desc 选择一个变量来获取百科全书完成度百分比数值。（如86%则变量为86 ）
 * @default 1
 *
 * @arg symbol
 * @text 选择类别
 * @desc 选择一个类别的完成度百分比作为变量，留空则提取全类别的总完成度。（如86%则变量为86 ）
 * @default total
 *
 * @command Change Description
 * @text 修改自定义信息的描述
 * @desc 修改自定义信息的描述。
 *
 * @arg Name
 * @text 自定义信息名称
 * @desc 需要修改描述的自定义信息的名称。
 *
 * @arg Symbol
 * @text 自定义类别字符
 * @desc 输入需要修改描述的自定义信息条目所属的类别字符（Category Symbol）。字符、大小写必须一致。
 *
 * @arg Description
 * @text 新的描述
 * @type note
 * @desc 输入新的描述内容。
 * @default ""
 *
 * @command Change Sketch
 * @text 新的图片
 * @desc 修改一个自定义信息的图片。
 *
 * @arg Name
 * @text 自定义信息名称
 * @desc 需要修改图片的自定义信息的名称。
 *
 * @arg Symbol
 * @text 自定义类别字符
 * @desc 输入需要修改图片的自定义信息条目所属的类别字符（Category Symbol）。字符、大小写必须一致。
 *
 * @arg Sketch
 * @text 图片
 * @type file[]
 * @dir img/
 * @desc 选择一张新图片用于该自定义信息。
 * @default []
 *
 * @command Check Discovered
 * @desc Check if an entry has been discovered
 *
 * @arg Id
 * @type number
 * @desc The id number of the entry to check
 *
 * @arg Symbol
 * @desc The Category Symbol of the entry to check
 *
 * @arg Switch
 * @type switch
 * @default 0
 * @desc The game switch to turn on/off by discover status
 *
 * @command Reinitialize
 * @text 重置数据
 * @desc 调试用指令，将百科全书数据重置到新游戏开始时的状态。
 *
 * @param Functional Options
 * @text 功能设置
 * 
 * @param Autodiscover Bestiary
 * @text 自动激活信息：敌人类
 * @type boolean
 * @desc Ture-在遭遇敌人后自动将信息记录到百科全书中。
 * False-只能使用插件指令来激活信息。
 * @default true
 * @parent Functional Options
 * 
 * @param Autodiscover Items
 * @text 自动激活信息：物品类
 * @type boolean
 * @desc Ture-在获得物品后自动将信息记录到百科全书中。
 * False-只能使用插件指令来激活信息。
 * @default true
 * @parent Functional Options
 * 
 * @param Autodiscover Armors
 * @text 自动激活信息：防具类
 * @type boolean
 * @desc Ture-在获得防具后自动将信息记录到百科全书中。
 * False-只能使用插件指令来激活信息。
 * @default true
 * @parent Functional Options
 * 
 * @param Autodiscover Weapons
 * @text 自动激活信息：武器类
 * @type boolean
 * @desc Ture-在获得武器后自动将信息记录到百科全书中。
 * False-只能使用插件指令来激活信息。
 * @default true
 * @parent Functional Options
 * 
 * @param Autodiscover Skills
 * @text 自动激活信息：技能类
 * @type boolean
 * @desc Ture-在习得技能后自动将信息记录到百科全书中。
 * False-只能使用插件指令来激活信息。
 * @default true
 * @parent Functional Options
 * 
 * @param Autodiscover States
 * @text 自动激活信息：状态类
 * @type boolean
 * @desc Ture-在获得状态后自动将信息记录到百科全书中。
 * False-只能使用插件指令来激活信息。
 * @default true
 * @parent Functional Options
 * 
 * @param Autodiscover Actors
 * @type boolean
 * @desc Determines if actors should be automatically discovered
 * @default true
 * @parent Functional Options
 * 
 * @param Autodiscover Skills On Use
 * @type boolean
 * @desc Determines if skills should be automatically discovered when used
 * @default true
 * @parent Functional Options
 * 
 * @param Ignore Blank Entries
 * @type boolean
 * @desc Determines if the encyclopedia should automatically ignore entries with blank names
 * @default true
 * @parent Functional Options
 * 
 * @param Ignore Entries With Name
 * @desc Any entry with the string entered here in its name will be automatically excluded from the encyclopedia
 * @default -----
 * @parent Functional Options
 * 
 * @param Opt In Entries
 * @type boolean
 * @desc If true, only entries with the <cgmzencyclopediahide> notetag will be included in the encyclopedia
 * @default false
 * @parent Functional Options
 *
 * @param Category Options
 * @text 类别设置
 * 
 * @param Include Bestiary
 * @text 显示敌人类别
 * @type boolean
 * @desc 百科全书内是否显示敌人类别。
 * @default true
 * @parent Category Options
 * 
 * @param Include Items
 * @text 显示物品类别
 * @type boolean
 * @desc 百科全书内是否显示物品类别。
 * @default true
 * @parent Category Options
 * 
 * @param Include Armors
 * @text 显示防具类别
 * @type boolean
 * @desc 百科全书内是否显示防具类别。
 * @default true
 * @parent Category Options
 * 
 * @param Include Weapons
 * @text 显示武器类别
 * @type boolean
 * @desc 百科全书内是否显示武器类别。
 * @default true
 * @parent Category Options
 * 
 * @param Include Skills
 * @text 显示技能类别
 * @type boolean
 * @desc 百科全书内是否显示技能类别。
 * @default true
 * @parent Category Options
 * 
 * @param Include States
 * @text 显示状态类别
 * @type boolean
 * @desc 百科全书内是否显示状态类别。
 * @default true
 * @parent Category Options
 * 
 * @param Include Actors
 * @type boolean
 * @desc Determines if the scene should include the actors part of the encyclopedia
 * @default true
 * @parent Category Options
 *
 * @param Categories
 * @text 设置类别
 * @type struct<Category>[]
 * @default ["{\"Category Name\":\"Bestiary\",\"Category Symbol\":\"bestiary\",\"Category Display Requirements\":\"{\\\"Item\\\":\\\"0\\\",\\\"Switch\\\":\\\"0\\\"}\",\"Category Enable Requirements\":\"{\\\"Item\\\":\\\"0\\\",\\\"Switch\\\":\\\"0\\\"}\",\"Command Text\":\"Bestiary\"}","{\"Category Name\":\"Items\",\"Category Symbol\":\"items\",\"Category Display Requirements\":\"{\\\"Item\\\":\\\"0\\\",\\\"Switch\\\":\\\"0\\\"}\",\"Category Enable Requirements\":\"{\\\"Item\\\":\\\"0\\\",\\\"Switch\\\":\\\"0\\\"}\",\"Command Text\":\"Items\"}","{\"Category Name\":\"Armors\",\"Category Symbol\":\"armors\",\"Category Display Requirements\":\"{\\\"Item\\\":\\\"0\\\",\\\"Switch\\\":\\\"0\\\"}\",\"Category Enable Requirements\":\"{\\\"Item\\\":\\\"0\\\",\\\"Switch\\\":\\\"0\\\"}\",\"Command Text\":\"Armors\"}","{\"Category Name\":\"Weapons\",\"Category Symbol\":\"weapons\",\"Category Display Requirements\":\"{\\\"Item\\\":\\\"0\\\",\\\"Switch\\\":\\\"0\\\"}\",\"Category Enable Requirements\":\"{\\\"Item\\\":\\\"0\\\",\\\"Switch\\\":\\\"0\\\"}\",\"Command Text\":\"Weapons\"}","{\"Category Name\":\"Skills\",\"Category Symbol\":\"skills\",\"Category Display Requirements\":\"{\\\"Item\\\":\\\"0\\\",\\\"Switch\\\":\\\"0\\\"}\",\"Category Enable Requirements\":\"{\\\"Item\\\":\\\"0\\\",\\\"Switch\\\":\\\"0\\\"}\",\"Command Text\":\"Skills\"}","{\"Category Name\":\"States\",\"Category Symbol\":\"states\",\"Category Display Requirements\":\"{\\\"Item\\\":\\\"0\\\",\\\"Switch\\\":\\\"0\\\"}\",\"Category Enable Requirements\":\"{\\\"Item\\\":\\\"0\\\",\\\"Switch\\\":\\\"0\\\"}\",\"Command Text\":\"States\"}","{\"Category Name\":\"Actors\",\"Category Symbol\":\"actors\",\"Category Display Requirements\":\"{\\\"Item\\\":\\\"0\\\",\\\"Switch\\\":\\\"0\\\"}\",\"Category Enable Requirements\":\"{\\\"Item\\\":\\\"0\\\",\\\"Switch\\\":\\\"0\\\"}\",\"Command Text\":\"Actors\"}"]
 * @desc 设置默认和自定义类别。
 * @parent Category Options
 *
 * @param Subcategories
 * @type struct<Subcategory>[]
 * @default []
 * @parent Category Options
 *
 * @param Custom Entry Options
 * @text 自定义信息设置
 *
 * @param Custom Entries
 * @text 自定义信息
 * @parent Custom Entry Options
 * @type struct<Custom>[]
 * @default []
 * @desc 设置你想要的自定义信息条目及所属的自定义类别。
 *
 * @param Extra Entry Settings
 *
 * @param Extra Bestiary Settings
 * @parent Extra Entry Settings
 * @type struct<ExtraEnemyInfo>[]
 * @default []
 * @desc Set up extra enemy information here
 *
 * @param Encyclopedia Scene Options
 * @desc 百科全书设置
 *
 * @param Unknown Entry
 * @text 未激活信息的显示
 * @desc 设置一段文字或符号来表示未激活的信息条目。
 * @default ? ? ? ? ?
 * @parent Encyclopedia Scene Options
 *
 * @param Unknown Entry Display
 * @text 未激活信息的描述
 * @desc 设置一段未激活信息条目在信息栏内显示的描述。
 * @default 还没有收集到相关的信息。
 * @parent Encyclopedia Scene Options
 *
 * @param Total Window Text
 * @text 全类别完成度的描述
 * @desc 进度窗口内关于百科全书所有类别的合计完成度百分比的描述。
 * @default 总完成度:
 * @parent Encyclopedia Scene Options
 *
 * @param Total Window Rounding
 * @text 完成度小数点设置
 * @desc 全类别完成度小数点后显示几位数的设置。（最小1，默认2）
 * @type number
 * @min 1
 * @default 2
 * @parent Encyclopedia Scene Options
 *
 * @param Total Window Alignment
 * @text 总完成度的文字位置
 * @parent Encyclopedia Scene Options
 * @type select
 * @option left
 * @option center
 * @option right
 * @desc Left-靠左，Center-居中，Right-靠右。
 * @default left
 *
 * @param List Window Alignment
 * @text 信息列表的条目文字位置
 * @parent Encyclopedia Scene Options
 * @type select
 * @option left
 * @option center
 * @option right
 * @desc Left-靠左，Center-居中，Right-靠右。
 * @default left
 *
 * @param Category Window Alignment
 * @parent Encyclopedia Scene Options
 * @type select
 * @option left
 * @option center
 * @option right
 * @desc The alignment of the text in the category window
 * @default center
 *
 * @param Subcategory Window Alignment
 * @parent Encyclopedia Scene Options
 * @type select
 * @option left
 * @option center
 * @option right
 * @desc The alignment of the text in the subcategory window
 * @default center
 *
 * @param Subcategory Columns
 * @desc The maximum amount of columns to display in the category window
 * @type number
 * @min 1
 * @default 4
 * @parent Encyclopedia Scene Options
 *
 * @param Show Subcategory All
 * @parent Encyclopedia Scene Options
 * @type boolean
 * @desc If true, will display an "all" subcategory
 * @default true
 *
 * @param List Window Enable Text Codes
 * @text 信息列表能否使用文本指令
 * @parent Encyclopedia Scene Options
 * @type boolean
 * @desc Ture-允许使用如\I[n]图标或\C[n]颜色之类等指令，但失去字体缩放功能。False-会自动缩放过长的文本以显示完整信息。
 * @default false
 *
 * @param Number Entries
 * @text 是否在信息列表中加入编号
 * @type boolean
 * @desc Ture-对每条信息加入编号。但这不会对应物品、装备、敌人在设置中的ID。
 * @default true
 * @parent Encyclopedia Scene Options
 *
 * @param Hide Undiscovered
 * @type boolean
 * @desc If true, undiscovered entries will not display in the list window
 * @default false
 * @parent Encyclopedia Scene Options
 *
 * @param Number Bestiary Skills
 * @type boolean
 * @desc If true, skills will be numbered in the bestiary
 * @default true
 * @parent Encyclopedia Scene Options
 *
 * @param Bestiary Skill Number Separator
 * @desc The text to come after the skill number but before the skill in the bestiary
 * @default . 
 * @parent Encyclopedia Scene Options
 *
 * @param Disable Touch UI Space
 * @parent Encyclopedia Scene Options
 * @type boolean
 * @desc If true, will not leave space for Touch UI buttons if Touch UI is disabled
 * @default false
 *
 * @param List Window On Right
 * @parent Encyclopedia Scene Options
 * @type boolean
 * @desc If true, will display the list window on the right side of the screen
 * @default false
 *
 * @param List Window Width
 * @parent Encyclopedia Scene Options
 * @type number
 * @min 0
 * @max 100
 * @desc % of the screen width the list window takes up
 * @default 33
 *
 * @param Categories Per Line
 * @text 类别列表的显示条数
 * @type number
 * @min 1
 * @desc 设置类别列表内一行显示多少条类别。
 * @default 4
 * @parent Encyclopedia Scene Options
 *
 * @param Category Lines
 * @text 类别列表的显示行数。
 * @type number
 * @min 1
 * @desc 设置类别列表内显示多少行类别，超出的需要滚动窗口才能显示。
 * @default 1
 * @parent Encyclopedia Scene Options
 *
 * @param Bestiary List Order
 * @type enemy[]
 * @desc Order enemies should display in list window. Leave blank to use default order.
 * @default []
 * @parent Encyclopedia Scene Options
 *
 * @param Items List Order
 * @type item[]
 * @desc Order items should display in list window. Leave blank to use default order.
 * @default []
 * @parent Encyclopedia Scene Options
 *
 * @param Armors List Order
 * @type armor[]
 * @desc Order armors should display in list window. Leave blank to use default order.
 * @default []
 * @parent Encyclopedia Scene Options
 *
 * @param Weapons List Order
 * @type weapon[]
 * @desc Order weapons should display in list window. Leave blank to use default order.
 * @default []
 * @parent Encyclopedia Scene Options
 *
 * @param Skills List Order
 * @type skill[]
 * @desc Order skills should display in list window. Leave blank to use default order.
 * @default []
 * @parent Encyclopedia Scene Options
 *
 * @param States List Order
 * @type state[]
 * @desc Order states should display in list window. Leave blank to use default order.
 * @default []
 * @parent Encyclopedia Scene Options
 *
 * @param Actors List Order
 * @type actor[]
 * @desc Order actor should display in list window. Leave blank to use default order.
 * @default []
 * @parent Encyclopedia Scene Options
 *
 * @param Transparent Windows
 * @type boolean
 * @default false
 * @desc If the Encyclopedia Windows should have a transparent background
 * @parent Encyclopedia Scene Options
 *
 * @param Category Window Padding
 * @type number
 * @min 0
 * @default 12
 * @desc The window padding for the category window
 * @parent Encyclopedia Scene Options
 *
 * @param Subcategory Window Padding
 * @type number
 * @min 0
 * @default 12
 * @desc The window padding for the subcategory window
 * @parent Encyclopedia Scene Options
 *
 * @param List Window Padding
 * @type number
 * @min 0
 * @default 12
 * @desc The window padding for the list window
 * @parent Encyclopedia Scene Options
 *
 * @param Total Window Padding
 * @type number
 * @min 0
 * @default 12
 * @desc The window padding for the total window
 * @parent Encyclopedia Scene Options
 *
 * @param Display Window Padding
 * @type number
 * @min 0
 * @default 12
 * @desc The window padding for the display window
 * @parent Encyclopedia Scene Options
 *
 * @param List Windowskin
 * @parent Encyclopedia Scene Options 
 * @type file
 * @dir img/
 * @desc The windowskin to use for the list window. Leave blank to use default.
 *
 * @param Display Windowskin
 * @parent Encyclopedia Scene Options
 * @type file
 * @dir img/
 * @desc The windowskin to use for the display window. Leave blank to use default.
 *
 * @param Total Windowskin
 * @parent Encyclopedia Scene Options
 * @type file
 * @dir img/
 * @desc The windowskin to use for the total window. Leave blank to use default.
 *
 * @param Category Windowskin
 * @parent Encyclopedia Scene Options
 * @type file
 * @dir img/
 * @desc The windowskin to use for the Category window. Leave blank to use default.
 *
 * @param Subcategory Windowskin
 * @parent Encyclopedia Scene Options
 * @type file
 * @dir img/
 * @desc The windowskin to use for the Subcategory window. Leave blank to use default.
 *
 * @param Default Enemy Battle BGM
 * @parent Encyclopedia Scene Options
 * @type struct<BGM>
 * @desc Default BGM to play when viewing an enemy in the bestiary. Leave blank for no sound.
 *
 * @param Category Backgrounds
 * @parent Encyclopedia Scene Options
 * @type struct<Background>[]
 * @default []
 * @desc Set up scene backgrounds for the various categories here
 *
 * @param Display Window Options
 * @text 信息显示设置
 *
 * @param Bestiary Display Info
 * @text 敌人类别的信息显示
 * @type select[]
 * @option Name
 * @option Stats
 * @option Exp
 * @option Gold
 * @option Drops
 * @option Skills
 * @option Note
 * @option Sketch
 * @option Discover Date
 * @option Info Header
 * @option Stats Header
 * @option Drops Header
 * @option Note Header
 * @option Sketch Header
 * @option Skills Header
 * @option Blank Line
 * @desc 选择敌人类别信息所显示的项目。如：敌人名称、获得经验、物品掉落等。
 * @default ["Name","Stats","Exp","Gold","Drops","Note","Sketch"]
 * @parent Display Window Options
 *
 * @param Item Display Info
 * @text 物品类别的信息显示
 * @type select[]
 * @option Name
 * @option Icon
 * @option Price
 * @option Key Item
 * @option Possession
 * @option Consumable
 * @option Success Rate
 * @option Effects
 * @option Description
 * @option Note
 * @option Discover Date
 * @option Info Header
 * @option Effect Header
 * @option Note Header
 * @option Description Header
 * @option Blank Line
 * @desc 选择物品类别信息所显示的项目。如：价格、持有数、使用效果等。
 * @default ["Name","Icon","Price","Key Item","Possession","Consumable","Success Rate","Effects","Description","Note"]
 * @parent Display Window Options
 *
 * @param Armor Display Info
 * @text 防具类别的信息显示
 * @type select[]
 * @option Name
 * @option Icon
 * @option Price
 * @option Equip Type
 * @option Possession
 * @option Armor Type
 * @option Stats
 * @option Traits
 * @option Description
 * @option Note
 * @option Discover Date
 * @option Info Header
 * @option Trait Header
 * @option Note Header
 * @option Description Header
 * @option Stat Header
 * @option Blank Line
 * @desc 选择防具类别信息所显示的项目。如：装备类型、装备能力值等。
 * @default ["Name","Icon","Price","Equip Type","Possession","Armor Type","Stats","Traits","Description","Note"]
 * @parent Display Window Options
 *
 * @param Weapon Display Info
 * @text 武器类别的信息显示
 * @type select[]
 * @option Name
 * @option Icon
 * @option Price
 * @option Equip Type
 * @option Possession
 * @option Weapon Type
 * @option Stats
 * @option Traits
 * @option Description
 * @option Note
 * @option Discover Date
 * @option Info Header
 * @option Trait Header
 * @option Note Header
 * @option Description Header
 * @option Stat Header
 * @option Blank Line
 * @desc 选择武器类别信息所显示的项目。如：武器类型、攻击属性、武器能力值等。
 * @default ["Name","Icon","Price","Equip Type","Possession","Weapon Type","Stats","Traits","Description","Note"]
 * @parent Display Window Options
 *
 * @param Skill Display Info
 * @text 技能类别的信息显示
 * @type select[]
 * @option Name
 * @option Icon
 * @option Type
 * @option Costs
 * @option Success Rate
 * @option TP Gain
 * @option Effects
 * @option Description
 * @option Note
 * @option Discover Date
 * @option Info Header
 * @option Effect Header
 * @option Note Header
 * @option Description Header
 * @option Blank Line
 * @desc 选择技能类别信息所显示的项目。如：技能类型、MP或TP消耗、命中率等。
 * @default ["Name","Icon","Type","Costs","Success Rate","TP Gain","Effects","Description","Note"]
 * @parent Display Window Options
 *
 * @param State Display Info
 * @text 状态类别的信息显示
 * @type select[]
 * @option Name
 * @option Icon
 * @option Duration
 * @option Battle End Removal
 * @option Walking Removal
 * @option Damage Removal
 * @option Traits
 * @option Note
 * @option Discover Date
 * @option Info Header
 * @option Trait Header
 * @option Note Header
 * @option Blank Line
 * @desc 选择状态类别信息所显示的项目。如：持续时间、解除方式等。
 * @default ["Name","Icon","Duration","Battle End Removal","Walking Removal","Damage Removal","Traits","Note"]
 * @parent Display Window Options
 *
 * @param Actor Display Info
 * @type select[]
 * @option Name
 * @option Face
 * @option Nickname
 * @option Class
 * @option Initial Level
 * @option Max Level
 * @option Profile
 * @option Stats
 * @option Traits
 * @option Note
 * @option Discover Date
 * @option Info Header
 * @option Stat Header
 * @option Trait Header
 * @option Note Header
 * @option Blank Line
 * @desc The information and order to display when drawing an actor entry
 * @default ["Name","Face","Nickname","Class","Profile","Stats","Traits","Note"]
 * @parent Display Window Options
 *
 * @param Custom Display Info
 * @text 自定义类别的信息显示
 * @type select[]
 * @option Name
 * @option Sketch
 * @option Description
 * @option Discover Date
 * @option Custom Info
 * @option Sketch Header
 * @option Description Header
 * @option Custom Header
 * @option Blank Line
 * @desc 选择自定义类别信息所显示的项目。目前只支持：信息名称、信息描述和展示图片。
 * @default ["Name","Description","Sketch"]
 * @parent Display Window Options
 *
 * @param Stat Display Info
 * @text 能力值的显示
 * @type select[]
 * @option Max HP
 * @option Max MP
 * @option Attack
 * @option Defense
 * @option M Attack
 * @option M Defense
 * @option Agility
 * @option Luck
 * @desc 选择能力值的所显示项目，如武器和防具信息里。能力值的显示文本会关联数据库中用语的设置。
 * @default ["Max HP","Max MP","Attack","Defense","M Attack","M Defense","Agility","Luck"]
 * @parent Display Window Options
 *
 * @param Effect Display Info
 * @text 效果的显示
 * @type select[]
 * @option HP Effect
 * @option MP Effect
 * @option TP Effect
 * @option State Add
 * @option State Remove
 * @option Buff
 * @option Debuff
 * @option Removed Buff
 * @option Removed Debuff
 * @option Grow
 * @option Learn
 * @desc The information and order to display when drawing stats
 * @default ["HP Effect","MP Effect","TP Effect","State Add","State Remove","Buff","Debuff","Removed Buff","Removed Debuff","Grow","Learn"]
 * @parent Display Window Options
 *
 * @param Trait Display Info
 * @text 特性的显示
 * @type select[]
 * @option Attack Speed
 * @option Attack Times
 * @option Attack Element
 * @option Attack States
 * @option Party Ability
 * @option Seal Skill Types
 * @option Add Skill Types
 * @option Add Skills
 * @option Seal Skills
 * @option State Resist
 * @desc The information and order to display when drawing stats
 * @default ["Attack Speed","Attack Times","Attack Element","Attack States","Party Ability","Seal Skill Types","Add Skill Types","Add Skills","Seal Skills","State Resist"]
 * @parent Display Window Options
 *
 * @param Strip Newlines In Description
 * @text 空格换行
 * @type boolean
 * @desc 在描述中使用空格作为换行？
 * @default true
 * @parent Display Window Options
 *
 * @param Center Icons
 * @type boolean
 * @desc If true, icon display will be centered in the encyclopedia
 * @default false
 * @parent Display Window Options
 *
 * @param Scroll Wait
 * @text 滚动等待
 * @parent Display Window Options
 * @type number
 * @min 0
 * @desc amount of time (in frames) to wait before beginning to scroll
 * @default 300
 *
 * @param Scroll Speed
 * @text 滚动速度
 * @parent Display Window Options
 * @type number
 * @min 0
 * @desc speed at which the display window scrolls (if needed)
 * @default 1
 *
 * @param Scroll Deceleration
 * @text 滚动减速
 * @parent Display Window Options
 * @type number
 * @min 0.01
 * @max 0.99
 * @decimals 2
 * @desc Rate of deceleration after letting go of touch
 * @default 0.92
 *
 * @param Auto Scroll
 * @text 自动滚动
 * @parent Display Window Options
 * @type boolean
 * @desc Determine if the display window should automatically scroll after so long of no user input
 * @default true
 *
 * @param Large Icon Multiplier
 * @text 大图标尺寸
 * @desc 设置大图标的尺寸倍数。（最小0.1，默认3.3）
 * @type number
 * @decimals 1
 * @min 0.1
 * @default 3.3
 * @parent Display Window Options
 *
 * @param Text Options
 * @text 文本设置
 *
 * @param Label Color
 * @text 标签颜色
 * @type color
 * @desc 设置标签的颜色。
 * @default 1
 * @parent Text Options
 *
 * @param Header Color 1
 * @type color
 * @desc The first color of the header line color gradient
 * @default 1
 * @parent Text Options
 *
 * @param Header Color 2
 * @type color
 * @desc The second color of the header line color gradient
 * @default 0
 * @parent Text Options
 *
 * @param Yes Text
 * @text 是的描述
 * @desc 选择"是"的文本描述
 * @default 是
 * @parent Text Options
 *
 * @param No Text
 * @text 否的描述
 * @desc 选择"否"的文本描述
 * @default 否
 * @parent Text Options
 *
 * @param Price Text
 * @text 价格的描述
 * @desc "价格"的描述
 * @default 价格:
 * @parent Text Options
 *
 * @param No Price Text
 * @text 无法出售的描述
 * @desc 当物品或装备属于"无法出售"的描述。
 * @default 无法出售
 * @parent Text Options
 *
 * @param Key Item Text
 * @text 关键物品的描述
 * @desc 当物品属于"关键物品"的描述。
 * @default 关键物品:
 * @parent Text Options
 *
 * @param Possession Text
 * @text 持有数量的描述
 * @desc 持有数量的描述。
 * @default 持有数:
 * @parent Text Options
 *
 * @param Equip Type Text
 * @text 装备类型的描述
 * @desc 关于装备所属部位、位置、类型的描述。（如武器、盾牌、头部、躯干、饰品等）
 * @default 装备类型:
 * @parent Text Options
 *
 * @param Armor Type Text
 * @text 护甲类型的描述
 * @desc 护甲类型的描述。（如板甲、皮甲、布甲等）
 * @default 护甲类型:
 * @parent Text Options
 *
 * @param No Armor Type Text
 * @text 无护甲类型的描述
 * @desc 当护甲没有定义类型时的描述。
 * @default 无
 * @parent Text Options
 *
 * @param Weapon Type Text
 * @text 武器类型的描述
 * @desc 武器类型的描述。（如剑、斧、锤）
 * @default 武器类型:
 * @parent Text Options
 *
 * @param No Weapon Type Text
 * @text 无武器类型的描述
 * @desc 当武器没有定义类型时的描述。
 * @default 无
 * @parent Text Options
 *
 * @param Skill Type Text
 * @text 技能类型的描述
 * @desc 技能类型的描述。（如特技、魔法等）
 * @default 技能类型:
 * @parent Text Options
 *
 * @param No Skill Type Text
 * @text 无技能类型的描述
 * @desc 当技能没有定义类型时的描述。
 * @default 基本技能
 * @parent Text Options
 *
 * @param Drops Text
 * @text 战利品的描述
 * @desc 击败敌人后掉落的战利品的描述。
 * @default 战利品:
 * @parent Text Options
 *
 * @param Show Drop Chances
 * @text 显示掉落几率
 * @desc 是否在百科全书中显示敌人战利品的掉落几率。
 * @type boolean
 * @default true
 * @parent Text Options
 *
 * @param Drop Chance Text
 * @text 掉落几率的描述
 * @desc 战利品掉落几率的描述。
 * @default 掉落几率:
 * @parent Text Options
 *
 * @param Sketch Text
 * @text 显示图片的描述
 * @desc 显示图片的描述。
 * @default 图鉴:
 * @parent Text Options
 *
 * @param Note Text
 * @text 备注的描述
 * @desc 备注的描述。
 * @default 备注:
 * @parent Text Options
 *
 * @param Nickname Text
 * @desc Text to describe an actor's nickname
 * @default Nickname:
 * @parent Text Options
 *
 * @param Class Text
 * @desc Text to describe an actor's class
 * @default Class:
 * @parent Text Options
 *
 * @param Initial Level Text
 * @desc Text to describe an actor's initial level
 * @default Initial Level:
 * @parent Text Options
 *
 * @param Max Level Text
 * @desc Text to describe an actor's max level
 * @default Max Level:
 * @parent Text Options
 *
 * @param Profile Text
 * @desc Text to describe an actor's profile
 * @default Profile:
 * @parent Text Options
 *
 * @param Success Rate Text
 * @text 成功率的描述
 * @desc 成功率的描述。
 * @default 成功率:
 * @parent Text Options
 *
 * @param Consumable Text
 * @text 消耗品的描述
 * @desc 消耗品的描述。
 * @default 消耗品:
 * @parent Text Options
 *
 * @param HP Effect Text
 * @text 生命值效果的描述
 * @desc 生命值效果的描述。
 * @default 生命值:
 * @parent Text Options
 *
 * @param MP Effect Text
 * @text 魔力值效果的描述
 * @desc 魔力值效果的描述。
 * @default 法力值:
 * @parent Text Options
 *
 * @param TP Effect Text
 * @text 特技值效果的描述
 * @desc 特技值效果的描述。
 * @default 活力值:
 * @parent Text Options
 *
 * @param Add State Text
 * @text 附加状态的描述
 * @desc 附加状态的描述。
 * @default 附加状态:
 * @parent Text Options
 *
 * @param Remove State Text
 * @text 移除状态的描述
 * @desc 移除状态的描述。
 * @default 移除状态:
 * @parent Text Options
 *
 * @param Add Buff Text
 * @text 能力值强化的描述
 * @desc 能力值强化的描述。
 * @default 强化:
 * @parent Text Options
 *
 * @param Add Debuff Text
 * @text 能力值弱化的描述
 * @desc 能力值弱化的描述。
 * @default 弱化:
 * @parent Text Options
 *
 * @param Remove Buff Text
 * @text 移除能力值强化的描述
 * @desc 移除能力值强化的描述。
 * @default 解除强化:
 * @parent Text Options
 *
 * @param Remove Debuff Text
 * @text 移除能力值弱化的描述
 * @desc 移除能力值弱化的描述。
 * @default 解除弱化:
 * @parent Text Options
 *
 * @param Grow Text
 * @text 能力值成长的描述
 * @desc 能力值成长的描述。
 * @default 永久提高:
 * @parent Text Options
 *
 * @param Party Ability Text
 * @text 队伍能力的描述
 * @desc 物品或装备具备的队伍能力的描述。
 * @default 队伍能力:
 * @parent Text Options
 *
 * @param Half Encounter Text
 * @text 遇敌减半的描述
 * @desc 队伍遇敌几率减半的描述。
 * @default 遇敌几率减半
 * @parent Text Options
 *
 * @param No Encounter Text
 * @text 不遇敌的描述。
 * @desc 队伍不会遇敌的描述。
 * @default 不会遇敌。
 * @parent Text Options
 *
 * @param Cancel Surprise Text
 * @text 不会被偷袭的描述。
 * @desc 队伍不会被敌人偷袭的描述。
 * @default 取消偷袭
 * @parent Text Options
 *
 * @param Raise Preemptive Text
 * @text 先发制人的描述
 * @desc 提高队伍先发制人几率的描述。
 * @default 先发制人
 * @parent Text Options
 *
 * @param Gold Double Text
 * @text 双倍金钱的描述
 * @desc 队伍战斗胜利会获得双倍金币的描述。
 * @default 双倍金钱
 * @parent Text Options
 *
 * @param Drop Item Double Text
 * @text 双倍战利品的描述
 * @desc 队伍战斗胜利获得道具的几率提高1倍的描述。
 * @default 双倍战利品
 * @parent Text Options
 *
 * @param Description Text
 * @text 描述的描述
 * @desc 物品和装备等的描述的描述。（LOL）
 * @default 描述:
 * @parent Text Options
 *
 * @param Element Text
 * @text 攻击属性的描述
 * @desc 攻击附带属性的描述。
 * @default 属性:
 * @parent Text Options
 *
 * @param Attack Speed Text
 * @text 攻击速度补正的描述
 * @desc 攻击速度补正的描述。
 * @default 攻击速度:
 * @parent Text Options
 *
 * @param Attack Times Text
 * @text 攻击次数的描述
 * @desc 攻击次数的描述。
 * @default 攻击追加次数:
 * @parent Text Options
 *
 * @param Attack State Text
 * @text 攻击附加状态的描述
 * @desc 攻击附加状态的描述。
 * @default 攻击附加状态:
 * @parent Text Options
 *
 * @param MP Cost Text
 * @text 法力值消耗的描述
 * @desc 法力值消耗的描述。
 * @default MP消耗:
 * @parent Text Options
 *
 * @param TP Cost Text
 * @text 特技值消耗的描述
 * @desc 特技值消耗的描述。
 * @default TP消耗:
 * @parent Text Options
 *
 * @param User TP Gain Text
 * @text 获得特技值的描述
 * @desc 获得特技值的描述。
 * @default TP获得:
 * @parent Text Options
 *
 * @param Battle Removal Text
 * @text 战斗结束后移除状态的描述
 * @desc 战斗结束后移除状态的描述。
 * @default 战斗结束后移除:
 * @parent Text Options
 *
 * @param Walking Removal Text
 * @text 移动一定步数后移除状态的描述
 * @desc 移动一定步数后移除状态的描述。
 * @default 移动后移除:
 * @parent Text Options
 *
 * @param Damage Removal Text
 * @text 受伤会移除状态的描述
 * @desc 受伤会移除状态的描述。
 * @default 受伤后移除:
 * @parent Text Options
 *
 * @param Duration Text
 * @text 状态持续时间的描述
 * @desc 状态持续时间的描述。
 * @default 状态持续:
 * @parent Text Options
 *
 * @param Infinite Text
 * @text 状态永久持续的描述
 * @desc 状态永久持续的描述。
 * @default 永久
 * @parent Text Options
 *
 * @param Turns Text
 * @text 状态持续回合的描述
 * @desc 状态持续回合的描述。
 * @default 回合
 * @parent Text Options
 *
 * @param Seal Skill Types Text
 * @text 封印技能类型的描述
 * @desc 封印技能类型的描述。
 * @default 封印:
 * @parent Text Options
 *
 * @param Add Skill Types Text
 * @text 解除封印技能类型的描述
 * @desc 解除封印类型的描述
 * @default 解除封印:
 * @parent Text Options
 *
 * @param Seal Skill Text
 * @text 封印某个技能的描述
 * @desc 封印某个技能的描述。
 * @default 封印:
 * @parent Text Options
 *
 * @param Add Skill Text
 * @text 装备自带技能的描述
 * @desc 装备自带技能的描述。（穿戴时可以使用的技能，脱下后会失去技能）
 * @default 装备技能:
 * @parent Text Options
 *
 * @param State Resist Text
 * @text 状态免疫的描述
 * @desc 状态免疫的描述。
 * @default 状态免疫:
 * @parent Text Options
 *
 * @param Learn Skill Text
 * @text 习得技能的描述
 * @desc 习得技能的描述。
 * @default 习得技能:
 * @parent Text Options
 *
 * @param Discover Date Text
 * @desc Text to describe the date an entry was discovered
 * @default Discovered:
 * @parent Text Options
 *
 * @param Unknown Date Text
 * @desc Text to describe an unknown date
 * @default Unknown
 * @parent Text Options
 *
 * @param Subcategory All Text
 * @desc Text to describe the all subcategory
 * @default All
 * @parent Text Options
 *
 * @param Custom Sketch Header Text
 * @text 图鉴类的标题描述
 * @desc 图鉴类的标题描述。
 * @default 图鉴
 * @parent Text Options
 *
 * @param Custom Description Header Text
 * @text 描述类的标题描述
 * @desc 描述类的标题描述。
 * @default 描述
 * @parent Text Options
 *
 * @param Actor Info Header Text
 * @desc Text to show in actor's info header
 * @default Info
 * @parent Text Options
 *
 * @param Actor Stat Header Text
 * @desc Text to show in actor's info header
 * @default Stats
 * @parent Text Options
 *
 * @param Actor Trait Header Text
 * @desc Text to show in actor's trait header
 * @default Effects
 * @parent Text Options
 *
 * @param Actor Note Header Text
 * @desc Text to show in actor's note header
 * @default Notes
 * @parent Text Options
 *
 * @param State Info Header Text
 * @text 状态信息类的标题描述
 * @desc 状态信息类的标题描述。
 * @default 信息
 * @parent Text Options
 *
 * @param State Trait Header Text
 * @text 状态特性类的标题描述
 * @desc 状态特性类的标题描述。
 * @default 特性
 * @parent Text Options
 *
 * @param State Note Header Text
 * @text 状态备注类的标题描述
 * @desc 状态备注类的标题描述。
 * @default 备注
 * @parent Text Options
 *
 * @param Skill Info Header Text
 * @text 技能信息类的标题描述
 * @desc 技能信息类的标题描述
 * @default 信息
 * @parent Text Options
 *
 * @param Skill Trait Header Text
 * @text 技能特性类的标题描述
 * @desc 技能特性类的标题描述。
 * @default 特性
 * @parent Text Options
 *
 * @param Skill Description Header Text
 * @text 技能描述类的标题描述
 * @desc 技能描述类的标题描述。
 * @default 描述
 * @parent Text Options
 *
 * @param Skill Note Header Text
 * @text 技能备注类的标题描述
 * @desc 技能备注类的标题描述。
 * @default 备注
 * @parent Text Options
 *
 * @param Weapon Info Header Text
 * @text 武器信息类的标题描述
 * @desc 武器信息类的标题描述。
 * @default 信息
 * @parent Text Options
 *
 * @param Weapon Stat Header Text
 * @text 武器能力类的标题描述
 * @desc 武器能力类的标题描述。
 * @default 能力值
 * @parent Text Options
 *
 * @param Weapon Trait Header Text
 * @text 武器特性类的标题描述
 * @desc 武器特性类的标题描述。
 * @default 特性
 * @parent Text Options
 *
 * @param Weapon Description Header Text
 * @text 武器描述类的标题描述
 * @desc 武器描述类的标题描述。
 * @default 描述
 * @parent Text Options
 *
 * @param Weapon Note Header Text
 * @text 武器备注类的标题描述
 * @desc 武器备注类的标题描述。
 * @default 备注
 * @parent Text Options
 *
 * @param Armor Info Header Text
 * @text 防具信息类的标题描述
 * @desc 防具信息类的标题描述。
 * @default 信息
 * @parent Text Options
 *
 * @param Armor Stat Header Text
 * @text 防具能力类的标题描述
 * @desc 防具能力类的标题描述。
 * @default 能力值
 * @parent Text Options
 *
 * @param Armor Trait Header Text
 * @text 防具特性类的标题描述
 * @desc 防具特性类的标题描述。
 * @default 特性
 * @parent Text Options
 *
 * @param Armor Description Header Text
 * @text 防具描述类的标题描述
 * @desc 防具描述类的标题描述。
 * @default 描述
 * @parent Text Options
 *
 * @param Armor Note Header Text
 * @text 防具备注类的标题描述
 * @desc 防具备注类的标题描述。
 * @default 备注
 * @parent Text Options
 *
 * @param Item Info Header Text
 * @text 物品信息类的标题描述
 * @desc 物品信息类的标题描述。
 * @default 信息
 * @parent Text Options
 *
 * @param Item Effect Header Text
 * @text 物品效果类的标题描述
 * @desc 物品效果类的标题描述。
 * @default 效果
 * @parent Text Options
 *
 * @param Item Description Header Text
 * @text 物品描述类的标题描述
 * @desc 物品描述类的标题描述。
 * @default 描述
 * @parent Text Options
 *
 * @param Item Note Header Text
 * @text 物品备注类的标题描述
 * @desc 物品备注类的标题描述。
 * @default 备注
 * @parent Text Options
 *
 * @param Bestiary Stats Header Text
 * @text 敌人能力类的标题描述
 * @desc 敌人能力类的标题描述。
 * @default 能力值
 * @parent Text Options
 *
 * @param Bestiary Drops Header Text
 * @text 敌人掉落类的标题描述
 * @desc 敌人掉落类的标题描述。
 * @default 掉落
 * @parent Text Options
 *
 * @param Bestiary Sketch Header Text
 * @text 敌人图鉴类的标题描述
 * @desc 敌人图鉴类的标题描述。
 * @default 图鉴
 * @parent Text Options
 *
 * @param Bestiary Skills Header Text
 * @desc Text to show in bestiary's skills header
 * @default Skills
 * @parent Text Options
 *
 * @param Bestiary Note Header Text
 * @text 敌人备注类的标题描述
 * @desc 敌人备注类的标题描述。
 * @default 备注
 * @parent Text Options
 *
 * @param Date Format
 * @parent Text Options
 * @type number
 * @min 0
 * @max 8
 * @desc Number specifying date format. See documentation for help. Valid Range: 0-8
 * @default 0
 * 
 * @param Integration Options
 * 
 * @param Show Difficulty Mods
 * @type boolean
 * @desc If true, stats/exp/gold display accurate to the current difficulty (requires CGMZ Difficulty)
 * @default true
 * @parent Integration Options
*/
/*~struct~Category:zh-CN
 * @param Category Name
 * @text 类别名称（完成度）
 * @desc 在完成度窗口显示的类别名称。
 * 
 * @param Category Symbol
 * @text 类别字符
 * @desc 百科全书的类别字符，用于插件指令引用等。
 *
 * @param Category Display Requirements
 * @text 类别显示要求
 * @type struct<Requirements>
 * @default {"Item":"0","Switch":"0"}
 * @desc 设置该类别在列表内显示的条件要求（持有物品或激活开关）。
 * 
 * @param Category Enable Requirements
 * @text 类别选择要求
 * @type struct<Requirements>
 * @default {"Item":"0","Switch":"0"}
 * @desc 设置该类别在列表内能否被选择的条件要求（持有物品或激活开关）。
 *
 * @param Command Text
 * @text 类别名称（列表）
 * @desc 在类别选择列表中显示的类别名称。
*/
/*~struct~Subcategory:zh-CN
 * @param Main Category Id
 * @desc Main category id. See help for default ids
 * 
 * @param Subcategory Id
 * @desc Internal recognition of subcategory. Cannot be blank. Must be unique.
 * 
 * @param Subcategory Name
 * @desc Text to display wherever the subcategory is used.
 *
 * @param Entry Ids
 * @type number[]
 * @default []
 * @desc Ids of objects from the main category to display in the subcategory
*/
/*~struct~Requirements:zh-CN
 * @param Item
 * @text 物品
 * @type item
 * 
 * @param Switch
 * @text 开关
 * @type switch
*/
/*~struct~Custom:zh-CN
 * @param Name
 * @text 名称
 * @desc 自定义信息的名字.
 * 
 * @param Display Name
 * @text 显示名称
 * @desc自定义信息所显示的名称。
 * 
 * @param Category Symbol
 * @text 类别字符
 * @desc 输入所属类别的命令字符。
 *
 * @param Description
 * @text 描述
 * @type note
 * @desc 设置自定义信息的描述。
 * @default ""
 *
 * @param Custom Info
 * @type note[]
 * @desc Custom info lines
 * @default []
 *
 * @param Custom Headers
 * @type text[]
 * @desc Custom info headers
 * @default []
 * 
 * @param Sketch
 * @text 图鉴
 * @dir img/
 * @type file[]
 * @desc 设置自定义信息显示的图片。
 * @default []
 *
 * @param Main Id
 * @type Number
 * @desc The id of a main category object to display (set to 0 to use custom info).
 * @default 0
 *
 * @param Main Type
 * @type select
 * @option enemy
 * @option item
 * @option armor
 * @option weapon
 * @option skill
 * @option state
 * @option actor
 * @desc The type of main category object to show if Main Id is greater than 0
 * @default enemy
*/
/*~struct~CustomDiscovery:zh-CN
 * @param id
 * @text 自定义信息ID
 * @type number
 * @desc 自定义信息所在类别中的顺序ID，具体见【使用说明】。
 * @default 1
 *
 * @param symbol
 * @text 命令字符
 * @desc 自定义信息所属类别的类别字符（Category Symbol）。
 * @default 
*/
/*~struct~BGM:zh-CN
 * @param name
 * @type file
 * @dir audio/bgm
 * @desc The audio file to play
 * 
 * @param volume
 * @type number
 * @min 0
 * @max 100
 * @default 90
 * @desc The volume of the sound
 * 
 * @param pitch
 * @type number
 * @min 50
 * @max 150
 * @default 100
 * @desc The pitch of the sound
 * 
 * @param pan
 * @type number
 * @min -100
 * @max 100
 * @default 0
 * @desc The pan of the sound
*/
/*~struct~ExtraEnemyInfo:zh-CN
 * @param id
 * @type enemy
 * @desc The enemy to add extra info for
 * 
 * @param BGM
 * @type struct<BGM>
 * @desc Custom battle music to play when viewing this enemy in bestiary. Leave blank to use default.
*/
/*~struct~Background:zh-CN
 * @param symbol
 * @desc The category symbol the background is for. See documentation.
 * 
 * @param image
 * @type file
 * @dir img/
 * @desc The image file to use for the background for the given category
*/
/*:es
 * @author Casper Gaming
 * @url https://www.caspergaming.com/plugins/cgmz/encyclopedia/
 * @target MZ
 * @plugindesc Crea una escena de enciclopedia para tu juego.
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
 * Versión: 1.10.0
 * ----------------------------------------------------------------------------
 * Compatibilidad: Sólo probado con mis CGMZ plugins.
 * Hecho para RPG Maker MZ 1.8.0
 * ----------------------------------------------------------------------------
 * Descripción: Este plugin crea una poderosa enciclopedia para tu juego, con 
 * categorías predeterminadas que incluyen bestiario, artículos, armaduras,  
 * armas, habilidades y estados. También puede manejar tantas categorías 
 * personalizadas como desee con sus propias entradas personalizadas.
 * ----------------------------------------------------------------------------
 * Documentación:
 * -----------------------Agregar al menú principal----------------------------
 * Para llamar fácilmente a la enciclopedia desde el menú principal, usa la 
 * ventana  de comandos del menú CGMZ y usa el siguiente script en sus
 * parámetros:
 * SceneManager.push(CGMZ_Scene_Encyclopedia);
 *
 * Si desea seleccionar una categoría específica, puede agregar el siguiente JS 
 * *después* del JS anterior:
 * SceneManager.prepareNextScene(categoría);
 * donde la categoría será algo así como "artículos", incluidas las citas
 * -------------------------Comandos de Plugin---------------------------------
 * • Descubrir Enemigo
 * Este comando descubre al enemigo con la identificación proporcionada.
 * 
 * • Descubrir artículo
 * Este comando descubre el artículo con la identificación proporcionada.
 * 
 * • Descubrir arma
 * Este comando descubre el arma con la identificación proporcionada.
 * 
 * • Descubrir armadura
 * Este comando descubre la armadura con la identificación proporcionada.
 * 
 * • Descubrir habilidad
 * Este comando descubre la habilidad con la identificación proporcionada.
 * 
 * • Descubrir estado
 * Este comando descubre el estado con la identificación proporcionada.
 * 
 * • Descubrir personalizado
 * Este comando descubre la entrada personalizada con la identificación y
 * el símbolo provistos
 * 
 * • Descubrir lote
 * Este comando descubre múltiples enemigos/elementos/armas/armaduras/
 * habilidades/estados.
 * 
 * • Descubrir lote personalizado
 * Este comando descubre múltiples entradas personalizadas.
 * 
 * • Call Scene
 * Este comando llamará a la escena de la enciclopedia. Opcionalmente, 
 * seleccione la categoría que debe comenzar seleccionada.
 * 
 * • Obtener finalización
 * Almacena el % de finalización de una categoría (o todas) en una variable de
 * juego. total = todas las categorías %
 * 
 * • Check Discovered
 * Turns a game switch ON/OFF if a given entry is discovered/undiscovered
 * 
 * • Reinicializar
 * Este comando reinicializa TODOS los datos de la enciclopedia como  si 
 * hubieras comenzado un nuevo juego.
 * --------------------Categorías personalizadas-------------------------------
 * Las categorías personalizadas deben rastrearse manualmente. Categorías 
 * predeterminadas (bestiario, artículo, arma, armadura, habilidad, estado) se 
 * rastrearán automáticamente si se incluyen, excepto en algunas circunstancias
 * poco comunes.
 * --------------------------Subcategories-------------------------------------
 * Subcategories are optional. To set up a subcategory, provide the main
 * category id and then a unique id for the subcategory. There will also be an
 * "all" subcategory, so do not use "all" for the subcategory id. From there,
 * you can choose the entry ids to include in the subcategory.
 *
 * You could use this to split the bestiary up between normal and boss enemies,
 * weapons between axes, maces, and swords, and many more uses.
 *
 * Default main category ids are: bestiary, items, armors, weapons, skills,
 * states, actors.
 * -----------------------Category Backgrounds---------------------------------
 * To show a background image in the Encyclopedia Scene for a specific
 * category, set the symbol to the category symbol and the image to the image
 * file you want to use.
 *
 * The symbols for the default categories are:
 * bestiary
 * items
 * armors
 * weapons
 * skills
 * states
 * actors
 * ------------------------Etiquetas de notas----------------------------------
 * <cgmzdesc:[description]> - Pone una "nota" en la página de visualización de 
 * la enciclopedia
 *
 * <cgmzencyclopediahide> - No incluye el ítem en la enciclopedia
 * ----------------------------Text Codes--------------------------------------
 * In a custom entry description, you can use the encyclopedia text code:
 * \cgmzencdescimg[x]
 * to display the x numbered sketch belonging to the same entry mixed in with
 * the text of the description. Begins at 0 for the first sketch.
 * ----------------Opción de multiplicador de icono grande---------------------
 * Esta opción cambia el tamaño del icono que se muestra de forma 
 * predeterminada  para elementos, armaduras, armas, estados y habilidades.
 * Desplaza el texto a la  derecha en función de su altura. Aquí hay algunos
 * tamaños de multiplicadores comunes que funcionan bien con el texto:
 * Líneas desplazadas: 1, use el tamaño del multiplicador: 1.1
 * Líneas desplazadas: 2, use el tamaño del multiplicador: 2.2
 * Líneas desplazadas: 3, use el tamaño del multiplicador: 3.3
 * ---------------------------Date Formats-------------------------------------
 * The following numbers correspond to the following date formats:
 * 0: MM/DD/YYYY     (ex: 1/20/2001)
 * 1: DD/MM/YYYY     (ex: 20/1/2001)
 * 2: YYYY/MM/DD     (ex: 2001/1/20)
 * 3: Month DD, YYYY (ex: January 20, 2001)
 * 4: DD Month YYYY  (ex: 20 January 2001)
 * 5: Mon. DD, YYYY  (ex: Jan 20, 2001)
 * 6: DD Mon. YYYY   (ex: 20 Jan 2001)
 * 7: MM/DD          (ex: 1/20)
 * 8: DD/MM          (ex: 20/1)
 * -------------------------Partidas guardadas---------------------------------
 * Este plugin tiene compatibilidad limitada con juegos guardados. Las nuevas 
 * entradas de cualquier categoría serán reconocidas automáticamente por los
 * juegos  guardados. Las entradas modificadas o eliminadas no son
 * compatibles/reconocidas. Esto significa que si agregas un nuevo enemigo (por
 * ejemplo), esto debería funcionar en un juego guardado. Sin embargo, si
 * cambias un enemigo o eliminas un enemigo, esto causaría problemas en las
 * partidas guardadas.
 * -----------------------Historial de Versiones-------------------------------
 * 1.0 - Versión inicial
 *
 * 1.1.0:
 * - Se agregaron controles adicionales durante la batalla para descubrir
 *   enemigos.
 *
 * 1.1.1:
 * - La ventana de totales fijos es demasiado grande en algunos casos
 * - Elementos de la ventana de lista fija que no tienen relleno
 * - Se corrigió el error con la ventana de la lista que no se desplazaba 
 *   hacia arriba después de cancelar
 *
 * 1.1.2:
 * - Este complemento ahora inicia una verificación de logros de CGMZ después 
 *   del descubrimiento
 *
 * 1.1.3:
 * - Se corrigió un error con los efectos de ganancia de TP que se dibujaban 
 *   sobre las descripciones de los artículos
 * - Los espacios en blanco ahora se recortan de la unidad monetaria para el
 *   encabezado en bestiario
 *
 * 1.2.0:
 * - Las nuevas entradas y los datos personalizados ahora se reconocen 
 *   automáticamente en juegos guardados
 * - Se agregó la capacidad de usar códigos de texto en descripciones, 
 *   categorías y listas de elementos
 * - Opción agregada para cambiar el color del texto de la etiqueta
 * - Opción agregada para cambiar la alineación del texto de la ventana de totales
 * - Opción agregada para personalizar la altura de la ventana de categoría y el 
 *   recuento de columnas
 * - Comando de complemento agregado para descubrir múltiples entradas a la vez
 * - Se corrigió un error con el tamaño de imagen personalizado incorrecto para el 
 *   primer sorteo
 * - Error de visualización fijo para elementos con efectos de habilidad de aprendizaje
 * - Se corrigió el error de visualización con los efectos de grupo doble de Drop Item
 *   (Soltar Artículo)
 * - Compatibilidad con VS Core (arreglo para espacios extraños entre ventanas)
 *
 * 1.2.1:
 * - Error corregido con columnas para otras ventanas de comandos horizontales
 *
 * 1.2.2:
 * - Se corrigió un error con las categorías de inclusión (solo cuando se desactiva) 
 *   que se comportaba de manera extraña.
 *
 * 1.3.0:
 * - Se agregó la capacidad de elegir qué información mostrar para cada categoría
 * - Se agregó la capacidad de reordenar la información que se muestra para cada categoría
 * - Se agregó un comando de complemento de descubrimiento por lotes personalizado
 * - Se agregó la capacidad de desactivar el descubrimiento automático
 * - Aumento de la altura máxima de la ventana de visualización
 * - Error solucionado con entradas personalizadas que no tenían descripciones
 * - Error solucionado con símbolos en mayúsculas para categorías personalizadas
 * - La documentación ya no se desplaza horizontalmente
 * - Actualización de la documentación para que sea más fácil de leer/explicar más
 *
 * 1.4.0:
 * - Ahora puede elegir qué categoría comienza seleccionada cuando la escena
 * abre
 * - Se agregó un comando de complemento para almacenar el% de finalización en una variable
 * - Comando de complemento agregado para cambiar la descripción de entrada personalizada
 *
 * 1.5.0:
 * - Opción agregada para mostrar un nombre diferente en la lista y ventanas de visualización
 * para entradas personalizadas
 * - Las entradas personalizadas ahora admiten varias imágenes en lugar de una sola
 * - Comando de complemento agregado para cambiar el boceto de entrada personalizado
 * - Se solucionó el problema al agregar este complemento en un juego guardado que no
 * Disponer previamente de la enciclopedia.
 *
 * 1.6.0:
 * - Opción agregada para ocultar entradas no descubiertas de la ventana de lista
 * - Added option to customize the sort order in the list window
 * - Added text code for displaying sketch images mixed in with
 *   description for custom entries
 * - Updated color parameters to use new text color selector
 *
 * 1.6.1:
 * - Bugfix for missing parameters if using Chinese language
 *
 * 1.7.0:
 * - Added new built in category: Actors
 * - Added option to center large icons
 * - Added option to show list window on right
 * - Added option to disable Touch UI space at top
 * - Added ability to change window padding for each window
 * - Added ability to change windowskin for each window
 * - Added ability to change the list window width
 * - Added Spanish language support
 *
 * 1.7.1:
 * - Bugfix for incorrect states being included in some cases
 * - Bugfix for font not resetting when drawing a new entry
 * - Bugfix for certain cases where touch UI could cause list window
 *   scroll to be incorrect
 * 
 * 1.7.2:
 * - Bugfix for crash when drawing actors with center icons option on
 * 
 * 1.7.3:
 * - Bugfix for actor entries resetting after first save
 * 
 * 1.8.0:
 * - Added ability to play BGMs while viewing enemies in bestiary
 * - Added option to display the date an entry was discovered
 * - Added option to autodiscover skills when they are used
 * - This plugin can now integrate with CGMZ Difficulty to show enemy
 *   stats/gold/exp based on the current difficulty
 * - This plugin now reports JSON parameter errors instead of crashing. If 
 *   something isn't working right, please check dev tool console before
 *   reporting a bug.
 * 
 * 1.9.0:
 * - Added option to display the skills an enemy can use
 * - Added option to have a custom scene background image for each category
 * - Added option to change header line gradient colors
 * - Added option to have windows be transparent
 * - Added plugin command to check if an entry has been discovered
 * - Added option to automatically hide entries that have no name or a user
 *   defined string in their name
 * - Added option to make entries in the encyclopedia opt-in
 * 
 * 1.9.1:
 * - Fixed crash when selecting empty enemy entry (all entries hidden)
 * - Fix bug with empty entry showing last selected non-empty entry info
 * 
 * 1.10.0:
 * - Added subcategories
 * - Custom entries can now display main-category object data
 * - Added custom headers and info lines to custom entries
 * - Added option to change category window alignment
 *
 * @command DiscoverEnemy
 * @text Descubrir enemigo
 * @desc Descubre a un enemigo manualmente en la enciclopedia.
 *
 * @arg id
 * @text Número de ID del enemigo
 * @type enemy
 * @desc El número de identificación del enemigo a descubrir.
 * @default 1
 *
 * @command DiscoverItem
 * @text Descubrir artículo
 * @desc Descubre un artículo manualmente en la enciclopedia.
 *
 * @arg id
 * @text Número de ID del articulo
 * @type item
 * @desc El número de identificación del articulo a descubrir.
 * @default 1
 *
 * @command DiscoverArmor
 * @text Descubrir la armadura
 * @desc Descubre una armadura manualmente en la enciclopedia.
 *
 * @arg id
 * @text Número de ID de la armadura
 * @type armor
 * @desc El número de identificación de la armadura a descubrir.
 * @default 1
 *
 * @command DiscoverWeapon
 * @text Descubrir arma
 * @desc Descubre un arma manualmente en la enciclopedia.
 *
 * @arg id
 * @text Número de ID del arma
 * @type weapon
 * @desc El número de identificación del arma a descubrir.
 * @default 1
 *
 * @command DiscoverSkill
 * @text Descubrir Habilidad
 * @desc Descubre una habilidad manualmente en la enciclopedia.
 *
 * @arg id
 * @text Número de ID de la habilidad
 * @type skill
 * @desc El número de identificación de la habilidad a descubrir.
 * @default 1
 *
 * @command DiscoverState
 * @text Descubrir Estado
 * @desc Descubre un estado manualmente en la enciclopedia.
 *
 * @arg id
 * @text Número de ID del Estado
 * @type state
 * @desc El número de identificación del estado a descubrir.
 * @default 1
 *
 * @command Discover Actor
 * @desc Discovers an actor manually in the encyclopedia
 *
 * @arg id
 * @type actor
 * @desc The id number of the actor to discover
 * @default 1
 *
 * @command Discover Batch
 * @text Descubrir lote
 * @desc Descubre múltiples entradas.
 *
 * @arg enemies
 * @text Número de Id de Enemigos
 * @type enemy[]
 * @desc El número de identificación de los enemigos a descubrir.
 * @default []
 *
 * @arg items
 * @text Número de Id de los artículos
 * @type item[]
 * @desc El número de identificación de los elementos a descubrir.
 * @default []
 *
 * @arg weapons
 * @text Número de Id de las armas
 * @type weapon[]
 * @desc El número de identificación de las armas a descubrir.
 * @default []
 *
 * @arg armors
 * @text Número de Id de las armaduras
 * @type armor[]
 * @desc El número de identificación de las armaduras a descubrir.
 * @default []
 *
 * @arg skills
 * @text Número de Id de las habilidades
 * @type skill[]
 * @desc El número de identificación de las habilidades a descubrir.
 * @default []
 *
 * @arg states
 * @text Número de Id de las Estados
 * @type state[]
 * @desc El número de identificación de las Estados a descubrir.
 * @default []
 *
 * @arg actors
 * @type actor[]
 * @desc The id number of the actors to discover
 * @default []
 *
 * @command DiscoverCustom
 * @text Descubrir entrada personalizada
 * @text Discover Custom
 * @desc Descubre una entrada personalizada en la enciclopedia.
 *
 * @arg id
 * @text Número de Id de las entradas
 * @type number
 * @desc El número de identificación de la entrada a descubrir.
 * @default 1
 *
 * @arg symbol
 * @text Símbolo
 * @desc El símbolo de categoría de la entrada a descubrir.
 * @default 
 *
 * @command Discover Custom Batch
 * @text Descubrir lote personalizado
 * @desc Descubre múltiples entradas personalizadas en la enciclopedia.
 *
 * @arg entries
 * @text Entradas personalizadas
 * @type struct<CustomDiscovery>[]
 * @desc Entradas personalizadas para descubrir.
 * @default []
 *
 * @command Call Scene
 * @text Escena de llamada
 * @desc Llama a la escena de la enciclopedia.
 *
 * @arg category
 * @text Símbolo de Categoría
 * @desc Símbolo de categoría para seleccionar después de abrir.
 *
 * @command Get Completion
 * @text Obtener finalización
 * @desc Almacena el porcentaje de finalización en una variable del juego.
 *
 * @arg Variable
 * @text Variable
 * @type variable
 * @desc La variable en la cual almacenar el % de finalización.
 * @default 1
 *
 * @arg symbol
 * @text Símbolo de Categoría para chequear
 * @desc El símbolo de categoría para verificar el porcentaje de finalización (dejar en blanco para completar en general).
 * @default total
 *
 * @command Change Description
 * @text Cambiar Descripción
 * @desc Cambiar una descripción de entrada personalizada.
 *
 * @arg Name
 * @text Nombre de la entrada
 * @desc El nombre de la entrada a cambiar.
 *
 * @arg Symbol
 * @text Símbolo de Categoría
 * @desc El símbolo de categoría al que pertenece la entrada.
 *
 * @arg Description
 * @text Descripción de Entrada
 * @type note
 * @desc La nueva descripción de la entrada.
 * @default ""
 *
 * @command Change Sketch
 * @text Cambiar Bosquejo
 * @desc Cambiar un croquis/bosquejo de entrada personalizado.
 *
 * @arg Name
 * @text Nombre de entrada
 * @desc El nombre de la entrada a cambiar.
 *
 * @arg Symbol
 * @text Símbolo de entrada
 * @desc El símbolo de categoría al que pertenece la entrada.
 *
 * @arg Sketch
 * @text Bosquejo/Croquis
 * @type file[]
 * @dir img/
 * @desc El nuevo boceto para la entrada.
 * @default []
 *
 * @command Check Discovered
 * @desc Check if an entry has been discovered
 *
 * @arg Id
 * @type number
 * @desc The id number of the entry to check
 *
 * @arg Symbol
 * @desc The Category Symbol of the entry to check
 *
 * @arg Switch
 * @type switch
 * @default 0
 * @desc The game switch to turn on/off by discover status
 *
 * @command Reinitialize
 * @text Reinicializar
 * @desc Restablece todos los datos de la enciclopedia. Úsela para juegos guardados para reconocer datos modificados.
 *
 * @param Functional Options
 * @text Opciones funcionales
 * 
 * @param Autodiscover Bestiary
 * @text Bestiario de detección automática
 * @type boolean
 * @descDetermina si los enemigos deben ser descubiertos automáticamente.
 * @default true
 * @parent Functional Options
 * 
 * @param Autodiscover Items
 * @text Elementos de detección automática
 * @type boolean
 * @desc Determina si los elementos deben descubrirse automáticamente.
 * @default true
 * @parent Functional Options
 * 
 * @param Autodiscover Armors
 * @text Armaduras de descubrimiento automático
 * @type boolean
 * @desc Determina si las armaduras deben ser descubiertas automáticamente.
 * @default true
 * @parent Functional Options
 * 
 * @param Autodiscover Weapons
 * @text Armas de descubrimiento automático
 * @type boolean
 * @desc Determina si las armas deben ser descubiertas automáticamente.
 * @default true
 * @parent Functional Options
 * 
 * @param Autodiscover Skills
 * @text Habilidades de descubrimiento automático
 * @type boolean
 * @desc Determina si las habilidades deben descubrirse automáticamente.
 * @default true
 * @parent Functional Options
 * 
 * @param Autodiscover States
 * @text Estados de descubrimiento automático
 * @type boolean
 * @desc Determina si los estados deben descubrirse automáticamente.
 * @default true
 * @parent Functional Options
 * 
 * @param Autodiscover Actors
 * @type boolean
 * @desc Determines if actors should be automatically discovered
 * @default true
 * @parent Functional Options
 * 
 * @param Autodiscover Skills On Use
 * @type boolean
 * @desc Determines if skills should be automatically discovered when used
 * @default true
 * @parent Functional Options
 * 
 * @param Ignore Blank Entries
 * @type boolean
 * @desc Determines if the encyclopedia should automatically ignore entries with blank names
 * @default true
 * @parent Functional Options
 * 
 * @param Ignore Entries With Name
 * @desc Any entry with the string entered here in its name will be automatically excluded from the encyclopedia
 * @default -----
 * @parent Functional Options
 * 
 * @param Opt In Entries
 * @type boolean
 * @desc If true, only entries with the <cgmzencyclopediahide> notetag will be included in the encyclopedia
 * @default false
 * @parent Functional Options
 *
 * @param Category Options
 * @text Opciones de Categoría
 * 
 * @param Include Bestiary
 * @text Incluir Bestiario
 * @type boolean
 * @desc Determina si la escena debe incluir la parte del bestiario de la enciclopedia.
 * @default true
 * @parent Category Options
 * 
 * @param Include Items
 * @text Incluir artículos/elementos
 * @type boolean
 * @desc Determina si la escena debe incluir los elementos que forman parte de la enciclopedia.
 * @default true
 * @parent Category Options
 * 
 * @param Include Armors
 * @text Incluir Armaduras
 * @type boolean
 * @desc Determina si la escena debe incluir lar armaduras que forman parte de la enciclopedia.
 * @default true
 * @parent Category Options
 * 
 * @param Include Weapons
 * @text Incluir Armas
 * @type boolean
 * @desc Determina si la escena debe incluir las armas que forman parte de la enciclopedia.
 * @default true
 * @parent Category Options
 * 
 * @param Include Skills
 * @text Incluir Habilidades
 * @type boolean
 * @desc Determina si la escena debe incluir las habilidades que forman parte de la enciclopedia.
 * @default true
 * @parent Category Options
 * 
 * @param Include States
 * @text Incluir Estados
 * @type boolean
 * @desc Determina si la escena debe incluir los estados que forman parte de la enciclopedia.
 * @default true
 * @parent Category Options
 * 
 * @param Include Actors
 * @type boolean
 * @desc Determines if the scene should include the actors part of the encyclopedia
 * @default true
 * @parent Category Options
 *
 * @param Categories
 * @text Categorías
 * @type struct<Category>[]
 * @default ["{\"Category Name\":\"Bestiary\",\"Category Symbol\":\"bestiary\",\"Category Display Requirements\":\"{\\\"Item\\\":\\\"0\\\",\\\"Switch\\\":\\\"0\\\"}\",\"Category Enable Requirements\":\"{\\\"Item\\\":\\\"0\\\",\\\"Switch\\\":\\\"0\\\"}\",\"Command Text\":\"Bestiary\"}","{\"Category Name\":\"Items\",\"Category Symbol\":\"items\",\"Category Display Requirements\":\"{\\\"Item\\\":\\\"0\\\",\\\"Switch\\\":\\\"0\\\"}\",\"Category Enable Requirements\":\"{\\\"Item\\\":\\\"0\\\",\\\"Switch\\\":\\\"0\\\"}\",\"Command Text\":\"Items\"}","{\"Category Name\":\"Armors\",\"Category Symbol\":\"armors\",\"Category Display Requirements\":\"{\\\"Item\\\":\\\"0\\\",\\\"Switch\\\":\\\"0\\\"}\",\"Category Enable Requirements\":\"{\\\"Item\\\":\\\"0\\\",\\\"Switch\\\":\\\"0\\\"}\",\"Command Text\":\"Armors\"}","{\"Category Name\":\"Weapons\",\"Category Symbol\":\"weapons\",\"Category Display Requirements\":\"{\\\"Item\\\":\\\"0\\\",\\\"Switch\\\":\\\"0\\\"}\",\"Category Enable Requirements\":\"{\\\"Item\\\":\\\"0\\\",\\\"Switch\\\":\\\"0\\\"}\",\"Command Text\":\"Weapons\"}","{\"Category Name\":\"Skills\",\"Category Symbol\":\"skills\",\"Category Display Requirements\":\"{\\\"Item\\\":\\\"0\\\",\\\"Switch\\\":\\\"0\\\"}\",\"Category Enable Requirements\":\"{\\\"Item\\\":\\\"0\\\",\\\"Switch\\\":\\\"0\\\"}\",\"Command Text\":\"Skills\"}","{\"Category Name\":\"States\",\"Category Symbol\":\"states\",\"Category Display Requirements\":\"{\\\"Item\\\":\\\"0\\\",\\\"Switch\\\":\\\"0\\\"}\",\"Category Enable Requirements\":\"{\\\"Item\\\":\\\"0\\\",\\\"Switch\\\":\\\"0\\\"}\",\"Command Text\":\"States\"}","{\"Category Name\":\"Actors\",\"Category Symbol\":\"actors\",\"Category Display Requirements\":\"{\\\"Item\\\":\\\"0\\\",\\\"Switch\\\":\\\"0\\\"}\",\"Category Enable Requirements\":\"{\\\"Item\\\":\\\"0\\\",\\\"Switch\\\":\\\"0\\\"}\",\"Command Text\":\"Actors\"}"]
 * @desc Categorías de la enciclopedia para seleccionar en la escena de la enciclopedia.
 * @parent Category Options
 *
 * @param Subcategories
 * @type struct<Subcategory>[]
 * @default []
 * @parent Category Options
 *
 * @param Custom Entry Options
 * @text Opciones de entrada personalizadas.
 *
 * @param Custom Entries
 * @text Opciones de entrada personalizadas
 * @parent Custom Entry Options
 * @type struct<Custom>[]
 * @default []
 * @desc Entradas personalizadas que aún no están cubiertas en la enciclopedia.
 *
 * @param Extra Entry Settings
 *
 * @param Extra Bestiary Settings
 * @parent Extra Entry Settings
 * @type struct<ExtraEnemyInfo>[]
 * @default []
 * @desc Set up extra enemy information here
 *
 * @param Encyclopedia Scene Options
 * @text Opciones de escena de la enciclopedia
 *
 * @param Unknown Entry
 * @text Entrada desconocida
 * @desc Texto para poner en la ventana de lista para una entrada desconocida.
 * @default ? ? ? ? ?
 * @parent Encyclopedia Scene Options
 *
 * @param Unknown Entry Display
 * @text Visualización de entrada desconocida
 * @desc Texto para poner en la ventana de visualización para una entrada desconocida.
 * @default This has not yet been discovered.
 * @parent Encyclopedia Scene Options
 *
 * @param Total Window Text
 * @text Texto total de la ventana
 * @desc Texto a poner para el % de finalización total.
 * @default Total:
 * @parent Encyclopedia Scene Options
 *
 * @param Total Window Rounding
 * @text Redondeo total de la ventana
 * @desc A cuantos decimales redondear.
 * @type number
 * @min 1
 * @default 2
 * @parent Encyclopedia Scene Options
 *
 * @param Total Window Alignment
 * @text Alineación total de ventanas
 * @parent Encyclopedia Scene Options
 * @type select
 * @option left
 * @option center
 * @option right
 * @desc La alineación del texto en la ventana de totales.
 * @default left
 *
 * @param List Window Alignment
 * @text Alineación de ventana de lista
 * @parent Encyclopedia Scene Options
 * @type select
 * @option left
 * @option center
 * @option right
 * @desc La alineación del texto en la ventana de lista.
 * @default left
 *
 * @param Category Window Alignment
 * @parent Encyclopedia Scene Options
 * @type select
 * @option left
 * @option center
 * @option right
 * @desc The alignment of the text in the category window
 * @default center
 *
 * @param Subcategory Window Alignment
 * @parent Encyclopedia Scene Options
 * @type select
 * @option left
 * @option center
 * @option right
 * @desc The alignment of the text in the subcategory window
 * @default center
 *
 * @param Subcategory Columns
 * @desc The maximum amount of columns to display in the category window
 * @type number
 * @min 1
 * @default 4
 * @parent Encyclopedia Scene Options
 *
 * @param Show Subcategory All
 * @parent Encyclopedia Scene Options
 * @type boolean
 * @desc If true, will display an "all" subcategory
 * @default true
 *
 * @param List Window Enable Text Codes
 * @text Ventana de lista Habilitar códigos de texto
 * @parent Encyclopedia Scene Options
 * @type boolean
 * @desc ¿Permitir códigos de texto en la ventana de lista? Esto ya no reducirá automáticamente el texto para que quepa.
 * @default false
 *
 * @param Number Entries
 * @text Entradas de números
 * @type boolean
 * @desc ¿Numerar cada entrada en la ventana de lista?
 * @default true
 * @parent Encyclopedia Scene Options
 *
 * @param Hide Undiscovered
 * @text Ocultar No descubierto
 * @type boolean
 * @desc Si es verdadero, las entradas no descubiertas no se mostrarán en la ventana de lista.
 * @default false
 * @parent Encyclopedia Scene Options
 *
 * @param Number Bestiary Skills
 * @type boolean
 * @desc If true, skills will be numbered in the bestiary
 * @default true
 * @parent Encyclopedia Scene Options
 *
 * @param Bestiary Skill Number Separator
 * @desc The text to come after the skill number but before the skill in the bestiary
 * @default . 
 * @parent Encyclopedia Scene Options
 *
 * @param Disable Touch UI Space
 * @parent Encyclopedia Scene Options
 * @type boolean
 * @desc If true, will not leave space for Touch UI buttons if Touch UI is disabled
 * @default false
 *
 * @param List Window On Right
 * @parent Encyclopedia Scene Options
 * @type boolean
 * @desc If true, will display the list window on the right side of the screen
 * @default false
 *
 * @param List Window Width
 * @parent Encyclopedia Scene Options
 * @type number
 * @min 0
 * @max 100
 * @desc % of the screen width the list window takes up
 * @default 33
 *
 * @param Categories Per Line
 * @text Categorías por Línea
 * @type number
 * @min 1
 * @desc Cantidad de categorías a mostrar por línea.
 * @default 4
 * @parent Encyclopedia Scene Options
 *
 * @param Category Lines
 * @text Líneas de categoría
 * @type number
 * @min 1
 * @desc Cantidad de líneas para mostrar antes de desplazarse en la ventana de categoría.
 * @default 1
 * @parent Encyclopedia Scene Options
 *
 * @param Bestiary List Order
 * @text Orden de la lista de bestiarios
 * @type enemy[]
 * @desc El orden de los enemigos deben mostrarse en la ventana de lista. Deja en blanco para usar el orden predeterminado.
 * @default []
 * @parent Encyclopedia Scene Options
 *
 * @param Items List Order
 * @text Orden de la lista de elementos/artículos
 * @type item[]
 * @desc El orden de los artículos deben mostrarse en la ventana de lista. Deja en blanco para usar el orden predeterminado.
 * @default []
 * @parent Encyclopedia Scene Options
 *
 * @param Armors List Order
 * @text Orden de la lista de armaduras
 * @type armor[]
 * @desc El orden de las armaduras deben mostrarse en la ventana de lista. Deja en blanco para usar el orden predeterminado.
 * @default []
 * @parent Encyclopedia Scene Options
 *
 * @param Weapons List Order
 * @text Orden de la lista de Armas
 * @type weapon[]
 * @desc El orden de las armas deben mostrarse en la ventana de lista. Deja en blanco para usar el orden predeterminado.
 * @default []
 * @parent Encyclopedia Scene Options
 *
 * @param Skills List Order
 * @text Orden de la lista de Habilidades
 * @type skill[]
 * @desc El orden de las habilidades deben mostrarse en la ventana de lista. Deja en blanco para usar el orden predeterminado.
 * @default []
 * @parent Encyclopedia Scene Options
 *
 * @param States List Order
 * @text Orden de la lista de Estados
 * @type state[]
 * @desc El orden de los estados deben mostrarse en la ventana de lista. Deja en blanco para usar el orden predeterminado.
 * @default []
 * @parent Encyclopedia Scene Options
 *
 * @param Actors List Order
 * @type actor[]
 * @desc Order actor should display in list window. Leave blank to use default order.
 * @default []
 * @parent Encyclopedia Scene Options
 *
 * @param Transparent Windows
 * @type boolean
 * @default false
 * @desc If the Encyclopedia Windows should have a transparent background
 * @parent Encyclopedia Scene Options
 *
 * @param Category Window Padding
 * @type number
 * @min 0
 * @default 12
 * @desc The window padding for the category window
 * @parent Encyclopedia Scene Options
 *
 * @param Subcategory Window Padding
 * @type number
 * @min 0
 * @default 12
 * @desc The window padding for the subcategory window
 * @parent Encyclopedia Scene Options
 *
 * @param List Window Padding
 * @type number
 * @min 0
 * @default 12
 * @desc The window padding for the list window
 * @parent Encyclopedia Scene Options
 *
 * @param Total Window Padding
 * @type number
 * @min 0
 * @default 12
 * @desc The window padding for the total window
 * @parent Encyclopedia Scene Options
 *
 * @param Display Window Padding
 * @type number
 * @min 0
 * @default 12
 * @desc The window padding for the display window
 * @parent Encyclopedia Scene Options
 *
 * @param List Windowskin
 * @parent Encyclopedia Scene Options 
 * @type file
 * @dir img/
 * @desc The windowskin to use for the list window. Leave blank to use default.
 *
 * @param Display Windowskin
 * @parent Encyclopedia Scene Options
 * @type file
 * @dir img/
 * @desc The windowskin to use for the display window. Leave blank to use default.
 *
 * @param Total Windowskin
 * @parent Encyclopedia Scene Options
 * @type file
 * @dir img/
 * @desc The windowskin to use for the total window. Leave blank to use default.
 *
 * @param Category Windowskin
 * @parent Encyclopedia Scene Options
 * @type file
 * @dir img/
 * @desc The windowskin to use for the Category window. Leave blank to use default.
 *
 * @param Subcategory Windowskin
 * @parent Encyclopedia Scene Options
 * @type file
 * @dir img/
 * @desc The windowskin to use for the Subcategory window. Leave blank to use default.
 *
 * @param Default Enemy Battle BGM
 * @parent Encyclopedia Scene Options
 * @type struct<BGM>
 * @desc Default BGM to play when viewing an enemy in the bestiary. Leave blank for no sound.
 *
 * @param Category Backgrounds
 * @parent Encyclopedia Scene Options
 * @type struct<Background>[]
 * @default []
 * @desc Set up scene backgrounds for the various categories here
 *
 * @param Display Window Options
 * @text Opciones de la ventana de visualización
 *
 * @param Bestiary Display Info
 * @text Información de visualización del bestiario
 * @type select[]
 * @option Name
 * @option Stats
 * @option Exp
 * @option Gold
 * @option Drops
 * @option Skills
 * @option Note
 * @option Sketch
 * @option Discover Date
 * @option Info Header
 * @option Stats Header
 * @option Drops Header
 * @option Note Header
 * @option Sketch Header
 * @option Skills Header
 * @option Blank Line
 * @desc La información y el orden que se muestra al dibujar una entrada de bestiario.
 * @default ["Name","Stats","Exp","Gold","Drops","Note","Sketch"]
 * @parent Display Window Options
 *
 * @param Item Display Info
 * @text Información de visualización del artículo
 * @type select[]
 * @option Name
 * @option Icon
 * @option Price
 * @option Key Item
 * @option Possession
 * @option Consumable
 * @option Success Rate
 * @option Effects
 * @option Description
 * @option Note
 * @option Discover Date
 * @option Info Header
 * @option Effect Header
 * @option Note Header
 * @option Description Header
 * @option Blank Line
 * @desc La información y el orden que se mostrará al dibujar una entrada de artículo.
 * @default ["Name","Icon","Price","Key Item","Possession","Consumable","Success Rate","Effects","Description","Note"]
 * @parent Display Window Options
 *
 * @param Armor Display Info
 * @text Información de visualización de armadura
 * @type select[]
 * @option Name
 * @option Icon
 * @option Price
 * @option Equip Type
 * @option Possession
 * @option Armor Type
 * @option Stats
 * @option Traits
 * @option Description
 * @option Note
 * @option Discover Date
 * @option Info Header
 * @option Trait Header
 * @option Note Header
 * @option Description Header
 * @option Stat Header
 * @option Blank Line
 * @desc La información y el orden que se mostrará al dibujar una entrada de la armadura.
 * @default ["Name","Icon","Price","Equip Type","Possession","Armor Type","Stats","Traits","Description","Note"]
 * @parent Display Window Options
 *
 * @param Weapon Display Info
 * @text Información de visualización de armas
 * @type select[]
 * @option Name
 * @option Icon
 * @option Price
 * @option Equip Type
 * @option Possession
 * @option Weapon Type
 * @option Stats
 * @option Traits
 * @option Description
 * @option Note
 * @option Discover Date
 * @option Info Header
 * @option Trait Header
 * @option Note Header
 * @option Description Header
 * @option Stat Header
 * @option Blank Line
 * @desc La información y el orden que se mostrará al dibujar una entrada del arma.
 * @default ["Name","Icon","Price","Equip Type","Possession","Weapon Type","Stats","Traits","Description","Note"]
 * @parent Display Window Options
 *
 * @param Skill Display Info
 * @text Información de visualización de habilidades
 * @type select[]
 * @option Name
 * @option Icon
 * @option Type
 * @option Costs
 * @option Success Rate
 * @option TP Gain
 * @option Effects
 * @option Description
 * @option Note
 * @option Discover Date
 * @option Info Header
 * @option Effect Header
 * @option Note Header
 * @option Description Header
 * @option Blank Line
 * @desc La información y el orden que se mostrará al dibujar una entrada de la habilidad.
 * @default ["Name","Icon","Type","Costs","Success Rate","TP Gain","Effects","Description","Note"]
 * @parent Display Window Options
 *
 * @param State Display Info
 * @text Información de visualización de estado
 * @type select[]
 * @option Name
 * @option Icon
 * @option Duration
 * @option Battle End Removal
 * @option Walking Removal
 * @option Damage Removal
 * @option Traits
 * @option Note
 * @option Discover Date
 * @option Info Header
 * @option Trait Header
 * @option Note Header
 * @option Blank Line
 * @desc La información y el orden que se mostrará al dibujar una entrada del estado.
 * @default ["Name","Icon","Duration","Battle End Removal","Walking Removal","Damage Removal","Traits","Note"]
 * @parent Display Window Options
 *
 * @param Actor Display Info
 * @type select[]
 * @option Name
 * @option Face
 * @option Nickname
 * @option Class
 * @option Initial Level
 * @option Max Level
 * @option Profile
 * @option Stats
 * @option Traits
 * @option Note
 * @option Discover Date
 * @option Info Header
 * @option Stat Header
 * @option Trait Header
 * @option Note Header
 * @option Blank Line
 * @desc The information and order to display when drawing an actor entry
 * @default ["Name","Face","Nickname","Class","Profile","Stats","Traits","Note"]
 * @parent Display Window Options
 *
 * @param Custom Display Info
 * @text Información de visualización personalizada
 * @type select[]
 * @option Name
 * @option Sketch
 * @option Description
 * @option Discover Date
 * @option Custom Info
 * @option Sketch Header
 * @option Description Header
 * @option Custom Header
 * @option Blank Line
 * @desc La información y el orden que se mostrará al dibujar una entrada personalizada.
 * @default ["Name","Description","Sketch"]
 * @parent Display Window Options
 *
 * @param Stat Display Info
 * @text Información de visualización de estadísticas
 * @type select[]
 * @option Max HP
 * @option Max MP
 * @option Attack
 * @option Defense
 * @option M Attack
 * @option M Defense
 * @option Agility
 * @option Luck
 * @desc La información y el orden para mostrar al dibujar estadísticas.
 * @default ["Max HP","Max MP","Attack","Defense","M Attack","M Defense","Agility","Luck"]
 * @parent Display Window Options
 *
 * @param Effect Display Info
 * @text Información de visualización de efectos
 * @type select[]
 * @option HP Effect
 * @option MP Effect
 * @option TP Effect
 * @option State Add
 * @option State Remove
 * @option Buff
 * @option Debuff
 * @option Removed Buff
 * @option Removed Debuff
 * @option Grow
 * @option Learn
 * @desc La información y el orden para mostrar al dibujar estadísticas.
 * @default ["HP Effect","MP Effect","TP Effect","State Add","State Remove","Buff","Debuff","Removed Buff","Removed Debuff","Grow","Learn"]
 * @parent Display Window Options
 *
 * @param Trait Display Info
 * @text Información de visualización de características
 * @type select[]
 * @option Attack Speed
 * @option Attack Times
 * @option Attack Element
 * @option Attack States
 * @option Party Ability
 * @option Seal Skill Types
 * @option Add Skill Types
 * @option Add Skills
 * @option Seal Skills
 * @option State Resist
 * @desc La información y el orden para mostrar al dibujar estadísticas.
 * @default ["Attack Speed","Attack Times","Attack Element","Attack States","Party Ability","Seal Skill Types","Add Skill Types","Add Skills","Seal Skills","State Resist"]
 * @parent Display Window Options
 *
 * @param Strip Newlines In Description
 * @text Quitar líneas nuevas en la descripción
 * @type boolean
 * @desc ¿Reemplazar líneas nuevas con un espacio en la descripción de artículos/etc?
 * @default true
 * @parent Display Window Options
 *
 * @param Center Icons
 * @type boolean
 * @desc If true, icon display will be centered in the encyclopedia
 * @default false
 * @parent Display Window Options
 *
 * @param Scroll Wait
 * @text Tiempo de espera para Desplazarse 
 * @parent Display Window Options
 * @type number
 * @min 0
 * @desc Cantidad de tiempo (en fotogramas) a esperar antes de comenzar a desplazarse.
 * @default 300
 *
 * @param Scroll Speed
 * @text Velocidad de desplazamiento
 * 
 * @parent Display Window Options
 * @text Opciones de la ventana de visualización
 * @type number
 * @min 0
 * @desc Velocidad a la que se desplaza la ventana de visualización (si es necesario).
 * @default 1
 *
 * @param Scroll Deceleration
 * @text Desaceleración de desplazamiento
 * @parent Display Window Options
 * @type number
 * @min 0.01
 * @max 0.99
 * @decimals 2
 * @desc Tasa de desaceleración después de soltar el toque.
 * @default 0.92
 *
 * @param Auto Scroll
 * @text Desplazamiento automático
 * @parent Display Window Options
 * @type boolean
 * @desc Determinar si la ventana de visualización debe desplazarse automáticamente después de tanto tiempo sin intervención del usuario.
 * @default true
 *
 * @param Large Icon Multiplier
 * @text Multiplicador de iconos grandes
 * @desc Determina el factor para aumentar el tamaño del ícono para un ícono grande.
 * @type number
 * @decimals 1
 * @min 0.1
 * @default 3.3
 * @parent Display Window Options
 *
 * @param Text Options
 * @text Opciones de texo
 *
 * @param Label Color
 * @text Color de la etiqueta
 * @type color
 * @desc El color de la etiqueta/texto del encabezado.
 * @default 1
 * @min 0
 * @parent Text Options
 *
 * @param Header Color 1
 * @type color
 * @desc The first color of the header line color gradient
 * @default 1
 * @parent Text Options
 *
 * @param Header Color 2
 * @type color
 * @desc The second color of the header line color gradient
 * @default 0
 * @parent Text Options
 *
 * @param Yes Text
 * @text Texto Sí
 * @desc Palabra a usar para una respuesta afirmativa.
 * @default Yes
 * @parent Text Options
 *
 * @param No Text
 * @text Texto No
 * @desc Palabra a usar para una respuesta negativa.
 * @default No
 * @parent Text Options
 *
 * @param Price Text
 * @text Texto - Precio
 * @desc Texto a mostrar al describir el precio.
 * @default Price:
 * @parent Text Options
 *
 * @param No Price Text
 * @text Texto - Sin Precio
 * @desc Texto para mostrar al describir el precio cuando el artículo no se puede vender.
 * @default Not for sale
 * @parent Text Options
 *
 * @param Key Item Text
 * @text Texto del elemento clave
 * @desc Texto para mostrar al describir un elemento clave o no elemento clave.
 * @default Key Item:
 * @parent Text Options
 *
 * @param Possession Text
 * @text Texto - Posesión
 * @desc Texto para mostrar al describir cuántos artículos tiene el jugador.
 * @default Possession:
 * @parent Text Options
 *
 * @param Equip Type Text
 * @text Texto - Tipo de Equipo
 * @desc Texto para mostrar al describir en qué ranura va el equipo (tipo de equipo).
 * @default Equip Slot:
 * @parent Text Options
 *
 * @param Armor Type Text
 * @text Texto - Tipo de Armadura
 * @desc Texto para mostrar al describir qué tipo de armadura es (tipo de armadura).
 * @default Armor Type:
 * @parent Text Options
 *
 * @param No Armor Type Text
 * @text Texto - Sin tipo de armadura
 * @desc Texto para mostrar cuando la armadura no tiene ningún tipo en la base de datos.
 * @default None
 * @parent Text Options
 *
 * @param Weapon Type Text
 * @text Texto - Tipo de Arma
 * @desc Texto para mostrar al describir qué tipo de arma es (tipo de arma).
 * @default Weapon Type:
 * @parent Text Options
 *
 * @param No Weapon Type Text
 * @text Texto - Sin tipo de armadura
 * @desc Texto para mostrar cuando el arma no tiene ningún tipo en la base de datos.
 * @default None
 * @parent Text Options
 *
 * @param Skill Type Text
 * @text Texto - Tipo de Habilidad
 * @desc Texto para mostrar al describir qué tipo de habilidad es (tipo de habilidad).
 * @default Skill Type:
 * @parent Text Options
 *
 * @param No Skill Type Text
 * @text Texto - Sin tipo de habilidad
 * @desc Texto para mostrar cuando la habilidad no tiene ningún tipo en la base de datos.
 * @default Basic
 * @parent Text Options
 *
 * @param Drops Text
 * @text Texto - Recompensas/Botín
 * @desc Texto para mostrar al describir las recompensas de un enemigo.
 * @default Drops:
 * @parent Text Options
 *
 * @param Show Drop Chances
 * @text Mostrar probabilidad de caída
 * @desc Determinar si las posibilidades de caída se muestran en la enciclopedia.
 * @type boolean
 * @default true
 * @parent Text Options
 *
 * @param Drop Chance Text
 * @text Texto - Probabilidad de caída
 * @desc Texto para mostrar al describir la probabilidad de caída de un artículo.
 * @default Chance:
 * @parent Text Options
 *
 * @param Sketch Text
 * @text Texto - Bosquejo/Croquis
 * @desc Texto para mostrar al describir un boceto de un elemento.
 * @default Sketch:
 * @parent Text Options
 *
 * @param Note Text
 * @text Texto - Nota
 * @desc Texto para describir lo que se encuentra en las meta notas.
 * @default Note:
 * @parent Text Options
 *
 * @param Nickname Text
 * @desc Text to describe an actor's nickname
 * @default Nickname:
 * @parent Text Options
 *
 * @param Class Text
 * @desc Text to describe an actor's class
 * @default Class:
 * @parent Text Options
 *
 * @param Initial Level Text
 * @desc Text to describe an actor's initial level
 * @default Initial Level:
 * @parent Text Options
 *
 * @param Max Level Text
 * @desc Text to describe an actor's max level
 * @default Max Level:
 * @parent Text Options
 *
 * @param Profile Text
 * @desc Text to describe an actor's profile
 * @default Profile:
 * @parent Text Options
 *
 * @param Success Rate Text
 * @text Texto - Tasa de Éxito
 * @desc Texto para describir la tasa de éxito de un elemento
 * @default Success Rate:
 * @parent Text Options
 *
 * @param Consumable Text
 * @text Texto - Consumible
 * @desc Texto para describir si un artículo es consumible.
 * @default Consumable:
 * @parent Text Options
 *
 * @param HP Effect Text
 * @text Texto - Efecto HP (Salud)
 * @desc Texto para describir cuando un elemento tiene un efecto HP.
 * @default HP Effect:
 * @parent Text Options
 *
 * @param MP Effect Text
 * @text Texto - Efecto MP (Magia/Maná)
 * @desc Texto para describir cuando un elemento tiene un efecto MP.
 * @default MP Effect:
 * @parent Text Options
 *
 * @param TP Effect Text
 * @text Texto - Efecto TP (Puntos de técnica)
 * @desc Texto para describir cuando un elemento tiene un efecto TP.
 * @default TP Effect:
 * @parent Text Options
 *
 * @param Add State Text
 * @text Texto - Agregar estado
 * @desc Texto para describir cuándo un elemento tiene un efecto de estado agregado.
 * @default Causes:
 * @parent Text Options
 *
 * @param Remove State Text
 * @text Texto - Remover estado
 * @desc Texto para describir cuándo un elemento tiene un efecto de estado de eliminación.
 * @default Cures:
 * @parent Text Options
 *
 * @param Add Buff Text
 * @text Texto - Agregar ventaja/mejora
 * @desc Texto para describir cuando un elemento tiene un efecto de mejora.
 * @default Buffs:
 * @parent Text Options
 *
 * @param Add Debuff Text
 * @text Texto - Agregar desventaja
 * @desc Texto para describir cuándo un objeto tiene un efecto de desventaja.
 * @default Debuffs:
 * @parent Text Options
 *
 * @param Remove Buff Text
 * @text Texto - Remover ventaja/mejora
 * @desc Texto para describir cuándo un elemento elimina un efecto de mejora.
 * @default Remove Buffs:
 * @parent Text Options
 *
 * @param Remove Debuff Text
 * @text Texto - Remover desventaja
 * @desc Texto para describir cuándo un elemento elimina un efecto de desventaja.
 * @default Clear Debuffs:
 * @parent Text Options
 *
 * @param Grow Text
 * @text Texto - Crecimiento
 * @desc Texto para describir cuando un elemento tiene un efecto de crecimiento.
 * @default Trains:
 * @parent Text Options
 *
 * @param Party Ability Text
 * @text Texto - Habilidad de grupo
 * @desc Texto para describir la habilidad del equipo que posee el artículo o equipo.
 * @default Special Effect:
 * @parent Text Options
 *
 * @param Half Encounter Text
 * @text Texto - Encuentro medio
 * @desc Una descripción que reduce a la mitad la posibilidad de que un equipo se encuentre con un enemigo..
 * @default Half Encounter Rate
 * @parent Text Options
 *
 * @param No Encounter Text
 * @text Texto - Sin Encuentro
 * @desc Texto para describir que el equipo no encontrará enemigos.
 * @default No Encounters
 * @parent Text Options
 *
 * @param Cancel Surprise Text
 * @text Texto - Cancelar Sorpresa 
 * @desc Texto para describir que el equipo no será emboscado por el enemigo.
 * @default Cancel Surprise
 * @parent Text Options
 *
 * @param Raise Preemptive Text
 * @text Texto - Aumento preventivo
 * @desc Texto para describir la primera probabilidad de ataque preventivo del equipo.
 * @default Raise Preemptive
 * @parent Text Options
 *
 * @param Gold Double Text
 * @text Texo - Doble de oro
 * @desc Texto paara describir que las monedas de oro dobles se obtendrá cuando el equipo gane la batalla.
 * @default 2x Gold Drops
 * @parent Text Options
 *
 * @param Drop Item Double Text
 * @text Texto - Doble botín
 * @desc Texto paara describir que se duplica la probabilidad de que el equipo gane la batalla para obtener el objeto.
 * @default 2x Item Drops
 * @parent Text Options
 *
 * @param Description Text
 * @text Texto - Descripción
 * @desc Texto para describir la descripción del artículo.
 * @default Description:
 * @parent Text Options
 *
 * @param Element Text
 * @text Texto - Elemento 
 * @desc Texto para describir el rasgo del elemento de ataque.
 * @default Element:
 * @parent Text Options
 *
 * @param Attack Speed Text
 * @text Texto - Velocidad de Ataque 
 * @desc Texto para describir el rasgo de velocidad de ataque.
 * @default Speed Effect:
 * @parent Text Options
 *
 * @param Attack Times Text
 * @text Texto - Tiempos de ataque
 * @desc Texto para describir tiempos de ataque + rasgo.
 * @default Additional Attacks:
 * @parent Text Options
 *
 * @param Attack State Text
 * @text Texto - Estados de ataque 
 * @desc Texto para describir el rasgo de estado de aplicación del ataque.
 * @default Applies:
 * @parent Text Options
 *
 * @param MP Cost Text
 * @text Texto - Costo de MP (Maná)
 * @desc Texto para describir el costo de MP.
 * @default MP Cost:
 * @parent Text Options
 *
 * @param TP Cost Text
 * @text Texto - Costo de TP (Puntos de técnica)
 * @desc Texto para describir el costo de TP.
 * @default TP Cost:
 * @parent Text Options
 *
 * @param User TP Gain Text
 * @text Texto - Ganancia de TP de usuario
 * @desc Texto para describir la ganancia de TP del usuario
 * @default User TP Gain:
 * @parent Text Options
 *
 * @param Battle Removal Text
 * @text Texto - Eliminación de batalla
 * @desc Texto para describir que el estado se elimina después de la batalla.
 * @default Removed after battle:
 * @parent Text Options
 *
 * @param Walking Removal Text
 * @text Texto - Eliminación de pasos
 * @desc Eliminar la descripción del estado después de mover una cierta cantidad de pasos.
 * @default Removed after walking:
 * @parent Text Options
 *
 * @param Damage Removal Text
 * @text Texto - Eliminación de daños
 * @desc Texto para describir la eliminación del estado después de la lesión/daño.
 * @default Removed after damage:
 * @parent Text Options
 *
 * @param Duration Text
 * @text Texto - Duración
 * @desc Texto para describir la duración de la eliminación automática del estado.
 * @default Duration:
 * @parent Text Options
 *
 * @param Infinite Text
 * @text Texto - Infinito
 * @desc Texto para describir cuándo el estado no se elimina automáticamente después de una cierta cantidad de turnos.
 * @default Infinite
 * @parent Text Options
 *
 * @param Turns Text
 * @text Texto - Turnos
 * @desc Texto para describir turnos en batalla.
 * @default Turns
 * @parent Text Options
 *
 * @param Seal Skill Types Text
 * @text Texto - Tipos de habilidades de sello
 * @desc Texto para describir rasgos que sella tipos de habilidades.
 * @default Locks:
 * @parent Text Options
 *
 * @param Add Skill Types Text
 * @text Texto - Agregar tipos de habilidades
 * @desc Texto para describir el rasgo que agrega tipos de habilidades.
 * @default Unlocks:
 * @parent Text Options
 *
 * @param Seal Skill Text
 * @text Texto - Habilidad de sello
 * @desc Texto para describir rasgos que sella habilidades.
 * @default Locks:
 * @parent Text Options
 *
 * @param Add Skill Text
 * @text Texto - Agregar habilidades
 * @desc Texto para describir rasgos que añade habilidades.
 * @default Grants:
 * @parent Text Options
 *
 * @param State Resist Text
 * @text Texto - Resistencia estatal
 * @desc Texto para describir el rasgo que resiste estados.
 * @default Resists:
 * @parent Text Options
 *
 * @param Learn Skill Text
 * @text Texto - Aprender habilidad
 * @desc Texto para describir el efecto que aprende una habilidad.
 * @default Learns:
 * @parent Text Options
 *
 * @param Discover Date Text
 * @desc Text to describe the date an entry was discovered
 * @default Discovered:
 * @parent Text Options
 *
 * @param Unknown Date Text
 * @desc Text to describe an unknown date
 * @default Unknown
 * @parent Text Options
 *
 * @param Subcategory All Text
 * @desc Text to describe the all subcategory
 * @default All
 * @parent Text Options
 *
 * @param Custom Sketch Header Text
 * @text Texto - Encabezado de croquis personalizado
 * @desc Texto para mostrar en el encabezado del boceto personalizado.
 * @default Sketch
 * @parent Text Options
 *
 * @param Custom Description Header Text
 * @text Texto - Encabezado de descripción personalizado
 * @desc Texto para mostrar en el encabezado de descripción personalizado.
 * @default Description
 * @parent Text Options
 *
 * @param Actor Info Header Text
 * @desc Text to show in actor's info header
 * @default Info
 * @parent Text Options
 *
 * @param Actor Stat Header Text
 * @desc Text to show in actor's info header
 * @default Stats
 * @parent Text Options
 *
 * @param Actor Trait Header Text
 * @desc Text to show in actor's trait header
 * @default Effects
 * @parent Text Options
 *
 * @param Actor Note Header Text
 * @desc Text to show in actor's note header
 * @default Notes
 * @parent Text Options
 *
 * @param State Info Header Text
 * @text Texto - Encabezado de información de estado
 * @desc Texto para mostrar en el encabezado de información del estado.
 * @default Info
 * @parent Text Options
 *
 * @param State Trait Header Text
 * @text Texto - Encabezado de rasgo de estado
 * @desc Texto para mostrar en el encabezado de característica del estado.
 * @default Effects
 * @parent Text Options
 *
 * @param State Note Header Text
 * @text Texto - Encabezado de nota de estado
 * @desc Texto para mostrar en el encabezado de la nota del estado.
 * @default Notes
 * @parent Text Options
 *
 * @param Skill Info Header Text
 * @text Texto - Encabezado de información de habilidad
 * @desc Texto para mostrar en el encabezado de información de la habilidad.
 * @default Info
 * @parent Text Options
 *
 * @param Skill Trait Header Text
 * @text Texto - Encabezado de rasgo de habilidad
 * @desc Texto para mostrar en el encabezado de características de la habilidad.
 * @default Effects
 * @parent Text Options
 *
 * @param Skill Description Header Text
 * @text Texto - Encabezado Descripción de Habilidad
 * @desc Texto para mostrar en el encabezado de descripción de la habilidad.
 * @default Description
 * @parent Text Options
 *
 * @param Skill Note Header Text
 * @text Texto - Encabezado de nota de habilidad
 * @desc Texto para mostrar en el encabezado de la nota de la habilidad.
 * @default Notes
 * @parent Text Options
 *
 * @param Weapon Info Header Text
 * @text Texto - Encabezado de información de armas
 * @desc Texto para mostrar en el encabezado de información del arma.
 * @default Info
 * @parent Text Options
 *
 * @param Weapon Stat Header Text
 * @text Texto - Encabezado de estadísticas de armas
 * @desc Texto para mostrar en el encabezado de estadísticas del arma.
 * @default Stats
 * @parent Text Options
 *
 * @param Weapon Trait Header Text
 * @text Texto - Encabezado de rasgo de arma
 * @desc Texto para mostrar en el encabezado de características del arma.
 * @default Effects
 * @parent Text Options
 *
 * @param Weapon Description Header Text
 * @text Texto - Encabezado de descripción de arma
 * @desc Texto para mostrar en el encabezado de descripción del arma.
 * @default Description
 * @parent Text Options
 *
 * @param Weapon Note Header Text
 * @text Texto - Encabezado de nota de arma
 * @desc Texto para mostrar en el encabezado de la nota del arma.
 * @default Notes
 * @parent Text Options
 *
 * @param Armor Info Header Text
 * @text Texto - Encabezado de información de armadura
 * @desc Texto para mostrar en el encabezado de información de la armadura.
 * @default Info
 * @parent Text Options
 *
 * @param Armor Stat Header Text
 * @text Texto - Encabezado de estadísticas de armadura
 * @desc Texto para mostrar en el encabezado de estadísticas de la armadura.
 * @default Stats
 * @parent Text Options
 *
 * @param Armor Trait Header Text
 * @text Texto - Encabezado de rasgo de armadura
 * @desc Texto para mostrar en el encabezado de características de la armadura.
 * @default Effects
 * @parent Text Options
 *
 * @param Armor Description Header Text
 * @text Texto - Encabezado de descripción de armadura
 * @desc Texto para mostrar en el encabezado de descripción de la armadura.
 * @default Description
 * @parent Text Options
 *
 * @param Armor Note Header Text
 * @text Texto - Encabezado de nota de armadura
 * @desc Texto para mostrar en el encabezado de la nota de la armadura.
 * @default Notes
 * @parent Text Options
 *
 * @param Item Info Header Text
 * @text Texto - Encabezado de información del artículo
 * @desc Texto para mostrar en el encabezado de información del elemento.
 * @default Info
 * @parent Text Options
 *
 * @param Item Effect Header Text
 * @text Texto - Encabezado de efecto de artículo
 * @desc Texto para mostrar en el encabezado de efecto del elemento.
 * @default Effects
 * @parent Text Options
 *
 * @param Item Description Header Text
 * @text Texto - Encabezado Descripción de Elemento
 * @desc Texto para mostrar en el encabezado de descripción del artículo.
 * @default Description
 * @parent Text Options
 *
 * @param Item Note Header Text
 * @text Texto - Encabezado de nota de elemento
 * @desc Texto para mostrar en el encabezado de la nota del artículo.
 * @default Notes
 * @parent Text Options
 *
 * @param Bestiary Stats Header Text
 * @text Texto - Encabezado de estadísticas de bestiario
 * @desc Texto para mostrar en el encabezado de estadísticas del bestiario.
 * @default Stats
 * @parent Text Options
 *
 * @param Bestiary Drops Header Text
 * @text Texto - Encabezado de caída de bestiario
 * @desc Texto para mostrar en el encabezado de caída del bestiario
 * @default Drops
 * @parent Text Options
 *
 * @param Bestiary Sketch Header Text
 * @text Texto - Encabezado de bosquejo de bestiario
 * @desc Texto para mostrar en el encabezado del boceto del bestiario.
 * @default Sketch
 * @parent Text Options
 *
 * @param Bestiary Skills Header Text
 * @desc Text to show in bestiary's skills header
 * @default Skills
 * @parent Text Options
 *
 * @param Bestiary Note Header Text
 * @text Texto - Encabezado de nota de bestiario
 * @desc Texto para mostrar en el encabezado de la nota del bestiario.
 * @default Notes
 * @parent Text Options
 *
 * @param Date Format
 * @parent Text Options
 * @type number
 * @min 0
 * @max 8
 * @desc Number specifying date format. See documentation for help. Valid Range: 0-8
 * @default 0
 * 
 * @param Integration Options
 * 
 * @param Show Difficulty Mods
 * @type boolean
 * @desc If true, stats/exp/gold display accurate to the current difficulty (requires CGMZ Difficulty)
 * @default true
 * @parent Integration Options
*/
/*~struct~Category:es
 * @param Category Name
 * @text Nombre de Categoría
 * @desc Texto a mostrar para el nombre de la categoría en la ventana total.
 * 
 * @param Category Symbol
 * @text Símbolo de Categoría 
 * @desc Reconocimiento interno de categoría, consulte la documentación para obtener ayuda.
 *
 * @param Category Display Requirements
 * @text Requisitos de visualización de categorías
 * @type struct<Requirements>
 * @default {"Item":"0","Switch":"0"}
 * @desc Requisitos para que la categoría se muestre en la ventana de categoría.
 * 
 * @param Category Enable Requirements
 * @text Requisitos de habilitación de categoría
 * @type struct<Requirements>
 * @default {"Item":"0","Switch":"0"}
 * @desc Requisitos para que la categoría sea habilitada y seleccionable.
 *
 * @param Command Text
 * @text Texto de Comando 
 * @desc Texto para mostrar por categoría en la ventana de comandos.
*/
/*~struct~Subcategory:es
 * @param Main Category Id
 * @desc Main category id. See help for default ids
 * 
 * @param Subcategory Id
 * @desc Internal recognition of subcategory. Cannot be blank. Must be unique.
 * 
 * @param Subcategory Name
 * @desc Text to display wherever the subcategory is used.
 *
 * @param Entry Ids
 * @type number[]
 * @default []
 * @desc Ids of objects from the main category to display in the subcategory
*/
/*~struct~Requirements:es
 * @param Item
 * @text Artículo
 * @type item
 * 
 * @param Switch
 * @text Interruptor
 * @type switch
*/
/*~struct~Custom:es
 * @param Name
 * @text Nombre
 * @desc El nombre de entrada.
 * 
 * @param Display Name
 * @text Nombre para mostrar
 * @desc El nombre que se mostrará en la ventana de visualización.
 * 
 * @param Category Symbol
 * @text Símbolo de Categoria
 * @desc Categoría a la que pertenece esta entrada.
 *
 * @param Description
 * @text Descripción
 * @type note
 * @desc Descripción a mostrar para la entrada.
 * @default ""
 *
 * @param Custom Info
 * @type note[]
 * @desc Custom info lines
 * @default []
 *
 * @param Custom Headers
 * @type text[]
 * @desc Custom info headers
 * @default []
 * 
 * @param Sketch
 * @text Bosquejo
 * @dir img/
 * @type file[]
 * @desc Imagen(es) para mostrar en la parte inferior de la entrada.
 * @default []
 *
 * @param Main Id
 * @type Number
 * @desc The id of a main category object to display (set to 0 to use custom info).
 * @default 0
 *
 * @param Main Type
 * @type select
 * @option enemy
 * @option item
 * @option armor
 * @option weapon
 * @option skill
 * @option state
 * @option actor
 * @desc The type of main category object to show if Main Id is greater than 0
 * @default enemy
*/
/*~struct~CustomDiscovery:es
 * @param id
 * @text Identificación
 * @type number
 * @desc El número de identificación de la entrada personalizada para descubrir.
 * @default 1
 *
 * @param symbol
 * @text Símbolo
 * @desc El símbolo de categoría de la entrada personalizada para descubrir.
 * @default 
*/
/*~struct~BGM:es
 * @param name
 * @type file
 * @dir audio/bgm
 * @desc The audio file to play
 * 
 * @param volume
 * @type number
 * @min 0
 * @max 100
 * @default 90
 * @desc The volume of the sound
 * 
 * @param pitch
 * @type number
 * @min 50
 * @max 150
 * @default 100
 * @desc The pitch of the sound
 * 
 * @param pan
 * @type number
 * @min -100
 * @max 100
 * @default 0
 * @desc The pan of the sound
*/
/*~struct~ExtraEnemyInfo:es
 * @param id
 * @type enemy
 * @desc The enemy to add extra info for
 * 
 * @param BGM
 * @type struct<BGM>
 * @desc Custom battle music to play when viewing this enemy in bestiary. Leave blank to use default.
*/
/*~struct~Background:es
 * @param symbol
 * @desc The category symbol the background is for. See documentation.
 * 
 * @param image
 * @type file
 * @dir img/
 * @desc The image file to use for the background for the given category
*/
Imported.CGMZ_Encyclopedia = true;
CGMZ.Versions["Encyclopedia and Bestiary"] = "1.10.0";
CGMZ.Encyclopedia = {};
CGMZ.Encyclopedia.parameters = PluginManager.parameters('CGMZ_Encyclopedia');
CGMZ.Encyclopedia.IncludeBestiary = (CGMZ.Encyclopedia.parameters["Include Bestiary"] === "true");
CGMZ.Encyclopedia.IncludeItems = (CGMZ.Encyclopedia.parameters["Include Items"] === "true");
CGMZ.Encyclopedia.IncludeArmors = (CGMZ.Encyclopedia.parameters["Include Armors"] === "true");
CGMZ.Encyclopedia.IncludeWeapons = (CGMZ.Encyclopedia.parameters["Include Weapons"] === "true");
CGMZ.Encyclopedia.IncludeSkills = (CGMZ.Encyclopedia.parameters["Include Skills"] === "true");
CGMZ.Encyclopedia.IncludeStates = (CGMZ.Encyclopedia.parameters["Include States"] === "true");
CGMZ.Encyclopedia.IncludeActors = (CGMZ.Encyclopedia.parameters["Include Actors"] === "true");
CGMZ.Encyclopedia.AutodiscoverBestiary = (CGMZ.Encyclopedia.parameters["Autodiscover Bestiary"] === "true");
CGMZ.Encyclopedia.AutodiscoverItems = (CGMZ.Encyclopedia.parameters["Autodiscover Items"] === "true");
CGMZ.Encyclopedia.AutodiscoverArmors = (CGMZ.Encyclopedia.parameters["Autodiscover Armors"] === "true");
CGMZ.Encyclopedia.AutodiscoverWeapons = (CGMZ.Encyclopedia.parameters["Autodiscover Weapons"] === "true");
CGMZ.Encyclopedia.AutodiscoverSkills = (CGMZ.Encyclopedia.parameters["Autodiscover Skills"] === "true");
CGMZ.Encyclopedia.AutodiscoverSkillsOnUse = (CGMZ.Encyclopedia.parameters["Autodiscover Skills On Use"] === "true");
CGMZ.Encyclopedia.AutodiscoverStates = (CGMZ.Encyclopedia.parameters["Autodiscover States"] === "true");
CGMZ.Encyclopedia.AutodiscoverActors = (CGMZ.Encyclopedia.parameters["Autodiscover Actors"] === "true");
CGMZ.Encyclopedia.NumberEntries = (CGMZ.Encyclopedia.parameters["Number Entries"] === "true");
CGMZ.Encyclopedia.ShowDropChances = (CGMZ.Encyclopedia.parameters["Show Drop Chances"] === "true");
CGMZ.Encyclopedia.ListWindowEnableTextCodes = (CGMZ.Encyclopedia.parameters["List Window Enable Text Codes"] === 'true');
CGMZ.Encyclopedia.StripNewlinesInDescription = (CGMZ.Encyclopedia.parameters["Strip Newlines In Description"] === 'true');
CGMZ.Encyclopedia.HideUndiscovered = (CGMZ.Encyclopedia.parameters["Hide Undiscovered"] === 'true');
CGMZ.Encyclopedia.CenterIcons = (CGMZ.Encyclopedia.parameters["Center Icons"] === 'true');
CGMZ.Encyclopedia.AutoScroll = (CGMZ.Encyclopedia.parameters["Auto Scroll"] === "true");
CGMZ.Encyclopedia.DisableTouchUISpace = (CGMZ.Encyclopedia.parameters["Disable Touch UI Space"] === 'true');
CGMZ.Encyclopedia.ListWindowRight = (CGMZ.Encyclopedia.parameters["List Window On Right"] === 'true');
CGMZ.Encyclopedia.ShowDifficultyMods = (CGMZ.Encyclopedia.parameters["Show Difficulty Mods"] === 'true');
CGMZ.Encyclopedia.IgnoreBlankEntries = (CGMZ.Encyclopedia.parameters["Ignore Blank Entries"] === 'true');
CGMZ.Encyclopedia.OptInEntries = (CGMZ.Encyclopedia.parameters["Opt In Entries"] === 'true');
CGMZ.Encyclopedia.TransparentWindows = (CGMZ.Encyclopedia.parameters["Transparent Windows"] === 'true');
CGMZ.Encyclopedia.NumberBestiarySkills = (CGMZ.Encyclopedia.parameters["Number Bestiary Skills"] === 'true');
CGMZ.Encyclopedia.ShowSubcategoryAll = (CGMZ.Encyclopedia.parameters["Show Subcategory All"] === 'true');
CGMZ.Encyclopedia.UnknownEntry = CGMZ.Encyclopedia.parameters["Unknown Entry"];
CGMZ.Encyclopedia.UnknownEntryDisplay = CGMZ.Encyclopedia.parameters["Unknown Entry Display"];
CGMZ.Encyclopedia.TotalText = CGMZ.Encyclopedia.parameters["Total Window Text"];
CGMZ.Encyclopedia.PriceText = CGMZ.Encyclopedia.parameters["Price Text"];
CGMZ.Encyclopedia.NoPriceText = CGMZ.Encyclopedia.parameters["No Price Text"];
CGMZ.Encyclopedia.KeyItemText = CGMZ.Encyclopedia.parameters["Key Item Text"];
CGMZ.Encyclopedia.PossessionText = CGMZ.Encyclopedia.parameters["Possession Text"];
CGMZ.Encyclopedia.EquipTypeText = CGMZ.Encyclopedia.parameters["Equip Type Text"];
CGMZ.Encyclopedia.ArmorTypeText = CGMZ.Encyclopedia.parameters["Armor Type Text"];
CGMZ.Encyclopedia.NoArmorTypeText = CGMZ.Encyclopedia.parameters["No Armor Type Text"];
CGMZ.Encyclopedia.WeaponTypeText = CGMZ.Encyclopedia.parameters["Weapon Type Text"];
CGMZ.Encyclopedia.NoWeaponTypeText = CGMZ.Encyclopedia.parameters["No Weapon Type Text"];
CGMZ.Encyclopedia.SkillTypeText = CGMZ.Encyclopedia.parameters["Skill Type Text"];
CGMZ.Encyclopedia.NoSkillTypeText = CGMZ.Encyclopedia.parameters["No Skill Type Text"];
CGMZ.Encyclopedia.DropsText = CGMZ.Encyclopedia.parameters["Drops Text"];
CGMZ.Encyclopedia.DropChanceText = CGMZ.Encyclopedia.parameters["Drop Chance Text"];
CGMZ.Encyclopedia.SketchText = CGMZ.Encyclopedia.parameters["Sketch Text"];
CGMZ.Encyclopedia.NoteText = CGMZ.Encyclopedia.parameters["Note Text"];
CGMZ.Encyclopedia.SuccessRateText = CGMZ.Encyclopedia.parameters["Success Rate Text"];
CGMZ.Encyclopedia.ConsumableText = CGMZ.Encyclopedia.parameters["Consumable Text"];
CGMZ.Encyclopedia.EffectsText = CGMZ.Encyclopedia.parameters["Effects Text"];
CGMZ.Encyclopedia.HPEffectText = CGMZ.Encyclopedia.parameters["HP Effect Text"];
CGMZ.Encyclopedia.MPEffectText = CGMZ.Encyclopedia.parameters["MP Effect Text"];
CGMZ.Encyclopedia.TPEffectText = CGMZ.Encyclopedia.parameters["TP Effect Text"];
CGMZ.Encyclopedia.AddStateText = CGMZ.Encyclopedia.parameters["Add State Text"];
CGMZ.Encyclopedia.RemoveStateText = CGMZ.Encyclopedia.parameters["Remove State Text"];
CGMZ.Encyclopedia.AddBuffText = CGMZ.Encyclopedia.parameters["Add Buff Text"];
CGMZ.Encyclopedia.AddDebuffText = CGMZ.Encyclopedia.parameters["Add Debuff Text"];
CGMZ.Encyclopedia.BuffRemovalText = CGMZ.Encyclopedia.parameters["Remove Buff Text"];
CGMZ.Encyclopedia.DebuffRemovalText = CGMZ.Encyclopedia.parameters["Remove Debuff Text"];
CGMZ.Encyclopedia.GrowText = CGMZ.Encyclopedia.parameters["Grow Text"];
CGMZ.Encyclopedia.LearnSkillText = CGMZ.Encyclopedia.parameters["Learn Skill Text"];
CGMZ.Encyclopedia.PartyAbilityText = CGMZ.Encyclopedia.parameters["Party Ability Text"];
CGMZ.Encyclopedia.HalfEncounterText = CGMZ.Encyclopedia.parameters["Half Encounter Text"];
CGMZ.Encyclopedia.NoEncounterText = CGMZ.Encyclopedia.parameters["No Encounter Text"];
CGMZ.Encyclopedia.CancelSurpriseText = CGMZ.Encyclopedia.parameters["Cancel Surprise Text"];
CGMZ.Encyclopedia.RaisePreemptiveText = CGMZ.Encyclopedia.parameters["Raise Preemptive Text"];
CGMZ.Encyclopedia.GoldDoubleText = CGMZ.Encyclopedia.parameters["Gold Double Text"];
CGMZ.Encyclopedia.DropItemDoubleText = CGMZ.Encyclopedia.parameters["Drop Item Double Text"];
CGMZ.Encyclopedia.DescriptionText = CGMZ.Encyclopedia.parameters["Description Text"];
CGMZ.Encyclopedia.ElementText = CGMZ.Encyclopedia.parameters["Element Text"];
CGMZ.Encyclopedia.AttackSpeedText = CGMZ.Encyclopedia.parameters["Attack Speed Text"];
CGMZ.Encyclopedia.AttackTimesText = CGMZ.Encyclopedia.parameters["Attack Times Text"];
CGMZ.Encyclopedia.AttackStateText = CGMZ.Encyclopedia.parameters["Attack State Text"];
CGMZ.Encyclopedia.MPCostText = CGMZ.Encyclopedia.parameters["MP Cost Text"];
CGMZ.Encyclopedia.TPCostText = CGMZ.Encyclopedia.parameters["TP Cost Text"];
CGMZ.Encyclopedia.UserTPGainText = CGMZ.Encyclopedia.parameters["User TP Gain Text"];
CGMZ.Encyclopedia.BattleRemovalText = CGMZ.Encyclopedia.parameters["Battle Removal Text"];
CGMZ.Encyclopedia.WalkingRemovalText = CGMZ.Encyclopedia.parameters["Walking Removal Text"];
CGMZ.Encyclopedia.DamageRemovalText = CGMZ.Encyclopedia.parameters["Damage Removal Text"];
CGMZ.Encyclopedia.DurationText = CGMZ.Encyclopedia.parameters["Duration Text"];
CGMZ.Encyclopedia.InfiniteText = CGMZ.Encyclopedia.parameters["Infinite Text"];
CGMZ.Encyclopedia.TurnsText = CGMZ.Encyclopedia.parameters["Turns Text"];
CGMZ.Encyclopedia.SealSkillTypesText = CGMZ.Encyclopedia.parameters["Seal Skill Types Text"];
CGMZ.Encyclopedia.AddSkillTypesText = CGMZ.Encyclopedia.parameters["Add Skill Types Text"];
CGMZ.Encyclopedia.SealSkillText = CGMZ.Encyclopedia.parameters["Seal Skill Text"];
CGMZ.Encyclopedia.AddSkillText = CGMZ.Encyclopedia.parameters["Add Skill Text"];
CGMZ.Encyclopedia.StateResistText = CGMZ.Encyclopedia.parameters["State Resist Text"];
CGMZ.Encyclopedia.YesText = CGMZ.Encyclopedia.parameters["Yes Text"];
CGMZ.Encyclopedia.NoText = CGMZ.Encyclopedia.parameters["No Text"];
CGMZ.Encyclopedia.UnknownDateText = CGMZ.Encyclopedia.parameters["Unknown Date Text"];
CGMZ.Encyclopedia.CustomSketchHeaderText = CGMZ.Encyclopedia.parameters["Custom Sketch Header Text"];
CGMZ.Encyclopedia.CustomDescriptionHeaderText = CGMZ.Encyclopedia.parameters["Custom Description Header Text"];
CGMZ.Encyclopedia.ActorInfoHeaderText = CGMZ.Encyclopedia.parameters["Actor Info Header Text"];
CGMZ.Encyclopedia.ActorStatHeaderText = CGMZ.Encyclopedia.parameters["Actor Stat Header Text"];
CGMZ.Encyclopedia.ActorTraitHeaderText = CGMZ.Encyclopedia.parameters["Actor Trait Header Text"];
CGMZ.Encyclopedia.ActorNoteHeaderText = CGMZ.Encyclopedia.parameters["Actor Note Header Text"];
CGMZ.Encyclopedia.StateInfoHeaderText = CGMZ.Encyclopedia.parameters["State Info Header Text"];
CGMZ.Encyclopedia.StateTraitHeaderText = CGMZ.Encyclopedia.parameters["State Trait Header Text"];
CGMZ.Encyclopedia.StateNoteHeaderText = CGMZ.Encyclopedia.parameters["State Note Header Text"];
CGMZ.Encyclopedia.SkillInfoHeaderText = CGMZ.Encyclopedia.parameters["Skill Info Header Text"];
CGMZ.Encyclopedia.SkillEffectHeaderText = CGMZ.Encyclopedia.parameters["Skill Trait Header Text"];
CGMZ.Encyclopedia.SkillNoteHeaderText = CGMZ.Encyclopedia.parameters["Skill Note Header Text"];
CGMZ.Encyclopedia.SkillDescriptionHeaderText = CGMZ.Encyclopedia.parameters["Skill Description Header Text"];
CGMZ.Encyclopedia.WeaponInfoHeaderText = CGMZ.Encyclopedia.parameters["Weapon Info Header Text"];
CGMZ.Encyclopedia.WeaponStatHeaderText = CGMZ.Encyclopedia.parameters["Weapon Stat Header Text"];
CGMZ.Encyclopedia.WeaponTraitHeaderText = CGMZ.Encyclopedia.parameters["Weapon Trait Header Text"];
CGMZ.Encyclopedia.WeaponNoteHeaderText = CGMZ.Encyclopedia.parameters["Weapon Note Header Text"];
CGMZ.Encyclopedia.WeaponDescriptionHeaderText = CGMZ.Encyclopedia.parameters["Weapon Description Header Text"];
CGMZ.Encyclopedia.ArmorInfoHeaderText = CGMZ.Encyclopedia.parameters["Armor Info Header Text"];
CGMZ.Encyclopedia.ArmorStatHeaderText = CGMZ.Encyclopedia.parameters["Armor Stat Header Text"];
CGMZ.Encyclopedia.ArmorTraitHeaderText = CGMZ.Encyclopedia.parameters["Armor Trait Header Text"];
CGMZ.Encyclopedia.ArmorNoteHeaderText = CGMZ.Encyclopedia.parameters["Armor Note Header Text"];
CGMZ.Encyclopedia.ArmorDescriptionHeaderText = CGMZ.Encyclopedia.parameters["Armor Description Header Text"];
CGMZ.Encyclopedia.ItemInfoHeaderText = CGMZ.Encyclopedia.parameters["Item Info Header Text"];
CGMZ.Encyclopedia.ItemEffectHeaderText = CGMZ.Encyclopedia.parameters["Item Effect Header Text"];
CGMZ.Encyclopedia.ItemNoteHeaderText = CGMZ.Encyclopedia.parameters["Item Note Header Text"];
CGMZ.Encyclopedia.ItemDescriptionHeaderText = CGMZ.Encyclopedia.parameters["Item Description Header Text"];
CGMZ.Encyclopedia.BestiaryStatsHeaderText = CGMZ.Encyclopedia.parameters["Bestiary Stats Header Text"];
CGMZ.Encyclopedia.BestiaryNoteHeaderText = CGMZ.Encyclopedia.parameters["Bestiary Note Header Text"];
CGMZ.Encyclopedia.BestiaryDropsHeaderText = CGMZ.Encyclopedia.parameters["Bestiary Drops Header Text"];
CGMZ.Encyclopedia.BestiarySketchHeaderText = CGMZ.Encyclopedia.parameters["Bestiary Sketch Header Text"];
CGMZ.Encyclopedia.NicknameText = CGMZ.Encyclopedia.parameters["Nickname Text"];
CGMZ.Encyclopedia.ClassText = CGMZ.Encyclopedia.parameters["Class Text"];
CGMZ.Encyclopedia.InitialLevelText = CGMZ.Encyclopedia.parameters["Initial Level Text"];
CGMZ.Encyclopedia.MaxLevelText = CGMZ.Encyclopedia.parameters["Max Level Text"];
CGMZ.Encyclopedia.ProfileText = CGMZ.Encyclopedia.parameters["Profile Text"];
CGMZ.Encyclopedia.DiscoverDateText = CGMZ.Encyclopedia.parameters["Discover Date Text"];
CGMZ.Encyclopedia.SubcategoryAllText = CGMZ.Encyclopedia.parameters["Subcategory All Text"];
CGMZ.Encyclopedia.TotalWindowAlignment = CGMZ.Encyclopedia.parameters["Total Window Alignment"];
CGMZ.Encyclopedia.ListWindowTextAlignment = CGMZ.Encyclopedia.parameters["List Window Alignment"];
CGMZ.Encyclopedia.CategoryWindowTextAlignment = CGMZ.Encyclopedia.parameters["Category Window Alignment"];
CGMZ.Encyclopedia.SubcategoryWindowTextAlignment = CGMZ.Encyclopedia.parameters["Subcategory Window Alignment"];
CGMZ.Encyclopedia.ListWindowskin = CGMZ.Encyclopedia.parameters["List Windowskin"];
CGMZ.Encyclopedia.DisplayWindowskin = CGMZ.Encyclopedia.parameters["Display Windowskin"];
CGMZ.Encyclopedia.TotalWindowskin = CGMZ.Encyclopedia.parameters["Total Windowskin"];
CGMZ.Encyclopedia.CategoryWindowskin = CGMZ.Encyclopedia.parameters["Category Windowskin"];
CGMZ.Encyclopedia.SubcategoryWindowskin = CGMZ.Encyclopedia.parameters["Subcategory Windowskin"];
CGMZ.Encyclopedia.IgnoreEntriesWithName = CGMZ.Encyclopedia.parameters["Ignore Entries With Name"];
CGMZ.Encyclopedia.BestiarySkillsHeaderText = CGMZ.Encyclopedia.parameters["Bestiary Skills Header Text"];
CGMZ.Encyclopedia.BestiarySkillNumberSeparator = CGMZ.Encyclopedia.parameters["Bestiary Skill Number Separator"];
CGMZ.Encyclopedia.DecimalSpots = Number(CGMZ.Encyclopedia.parameters["Total Window Rounding"]);
CGMZ.Encyclopedia.ScrollWait = Number(CGMZ.Encyclopedia.parameters["Scroll Wait"]);
CGMZ.Encyclopedia.ScrollSpeed = Number(CGMZ.Encyclopedia.parameters["Scroll Speed"]);
CGMZ.Encyclopedia.CategoriesPerLine = Number(CGMZ.Encyclopedia.parameters["Categories Per Line"]);
CGMZ.Encyclopedia.CategoryLines = Number(CGMZ.Encyclopedia.parameters["Category Lines"]);
CGMZ.Encyclopedia.LabelColor = Number(CGMZ.Encyclopedia.parameters["Label Color"]);
CGMZ.Encyclopedia.CategoryWindowPadding = Number(CGMZ.Encyclopedia.parameters["Category Window Padding"]);
CGMZ.Encyclopedia.SubcategoryWindowPadding = Number(CGMZ.Encyclopedia.parameters["Subcategory Window Padding"]);
CGMZ.Encyclopedia.ListWindowPadding = Number(CGMZ.Encyclopedia.parameters["List Window Padding"]);
CGMZ.Encyclopedia.TotalWindowPadding = Number(CGMZ.Encyclopedia.parameters["Total Window Padding"]);
CGMZ.Encyclopedia.DisplayWindowPadding = Number(CGMZ.Encyclopedia.parameters["Display Window Padding"]);
CGMZ.Encyclopedia.ListWindowWidth = Number(CGMZ.Encyclopedia.parameters["List Window Width"]);
CGMZ.Encyclopedia.DateFormat = Number(CGMZ.Encyclopedia.parameters["Date Format"]);
CGMZ.Encyclopedia.HeaderColor1 = Number(CGMZ.Encyclopedia.parameters["Header Color 1"]);
CGMZ.Encyclopedia.HeaderColor2 = Number(CGMZ.Encyclopedia.parameters["Header Color 2"]);
CGMZ.Encyclopedia.SubcategoryColumns = Number(CGMZ.Encyclopedia.parameters["Subcategory Columns"]);
CGMZ.Encyclopedia.ScrollDeceleration = parseFloat(CGMZ.Encyclopedia.parameters["Scroll Deceleration"]);
CGMZ.Encyclopedia.LargeIconMultiplier = parseFloat(CGMZ.Encyclopedia.parameters["Large Icon Multiplier"]);
CGMZ.Encyclopedia.Categories = CGMZ_Utils.parseJSON(CGMZ.Encyclopedia.parameters["Categories"], [], "CGMZ Encyclopedia", "Your Categories parameter is set up incorrectly.");
CGMZ.Encyclopedia.Subcategories = CGMZ_Utils.parseJSON(CGMZ.Encyclopedia.parameters["Subcategories"], [], "CGMZ Encyclopedia", "Your Subcategories parameter is set up incorrectly.");
CGMZ.Encyclopedia.CustomEntries = CGMZ_Utils.parseJSON(CGMZ.Encyclopedia.parameters["Custom Entries"], [], "CGMZ Encyclopedia", "Your Custom Entries parameter is set up incorrectly.");
CGMZ.Encyclopedia.CustomDisplayInfo = CGMZ_Utils.parseJSON(CGMZ.Encyclopedia.parameters["Custom Display Info"], [], "CGMZ Encyclopedia", "Your Custom Display Info parameter is set up incorrectly.");
CGMZ.Encyclopedia.ActorDisplayInfo = CGMZ_Utils.parseJSON(CGMZ.Encyclopedia.parameters["Actor Display Info"], [], "CGMZ Encyclopedia", "Your Actor Display Info parameter is set up incorrectly.");
CGMZ.Encyclopedia.StateDisplayInfo = CGMZ_Utils.parseJSON(CGMZ.Encyclopedia.parameters["State Display Info"], [], "CGMZ Encyclopedia", "Your State Display Info parameter is set up incorrectly.");
CGMZ.Encyclopedia.SkillDisplayInfo = CGMZ_Utils.parseJSON(CGMZ.Encyclopedia.parameters["Skill Display Info"], [], "CGMZ Encyclopedia", "Your Skill Display Info parameter is set up incorrectly.");
CGMZ.Encyclopedia.WeaponDisplayInfo = CGMZ_Utils.parseJSON(CGMZ.Encyclopedia.parameters["Weapon Display Info"], [], "CGMZ Encyclopedia", "Your Weapon Display Info parameter is set up incorrectly.");
CGMZ.Encyclopedia.ArmorDisplayInfo = CGMZ_Utils.parseJSON(CGMZ.Encyclopedia.parameters["Armor Display Info"], [], "CGMZ Encyclopedia", "Your Armor Display Info parameter is set up incorrectly.");
CGMZ.Encyclopedia.ItemDisplayInfo = CGMZ_Utils.parseJSON(CGMZ.Encyclopedia.parameters["Item Display Info"], [], "CGMZ Encyclopedia", "Your Item Display Info parameter is set up incorrectly.");
CGMZ.Encyclopedia.BestiaryDisplayInfo = CGMZ_Utils.parseJSON(CGMZ.Encyclopedia.parameters["Bestiary Display Info"], [], "CGMZ Encyclopedia", "Your Bestiary Display Info parameter is set up incorrectly.");
CGMZ.Encyclopedia.StatDisplayInfo = CGMZ_Utils.parseJSON(CGMZ.Encyclopedia.parameters["Stat Display Info"], [], "CGMZ Encyclopedia", "Your Stat Display Info parameter is set up incorrectly.");
CGMZ.Encyclopedia.EffectDisplayInfo = CGMZ_Utils.parseJSON(CGMZ.Encyclopedia.parameters["Effect Display Info"], [], "CGMZ Encyclopedia", "Your Effect Display Info parameter is set up incorrectly.");
CGMZ.Encyclopedia.TraitDisplayInfo = CGMZ_Utils.parseJSON(CGMZ.Encyclopedia.parameters["Trait Display Info"], [], "CGMZ Encyclopedia", "Your Trait Display Info parameter is set up incorrectly.");
CGMZ.Encyclopedia.BestiaryListOrder = CGMZ_Utils.parseJSON(CGMZ.Encyclopedia.parameters["Bestiary List Order"], [], "CGMZ Encyclopedia", "Your Bestiary List Order parameter is set up incorrectly.").map(a => Number(a)).reverse();
CGMZ.Encyclopedia.ItemsListOrder = CGMZ_Utils.parseJSON(CGMZ.Encyclopedia.parameters["Items List Order"], [], "CGMZ Encyclopedia", "Your Items List Order parameter is set up incorrectly.").map(a => Number(a)).reverse();
CGMZ.Encyclopedia.ArmorsListOrder = CGMZ_Utils.parseJSON(CGMZ.Encyclopedia.parameters["Armors List Order"], [], "CGMZ Encyclopedia", "Your Armors List Order parameter is set up incorrectly.").map(a => Number(a)).reverse();
CGMZ.Encyclopedia.WeaponsListOrder = CGMZ_Utils.parseJSON(CGMZ.Encyclopedia.parameters["Weapons List Order"], [], "CGMZ Encyclopedia", "Your Weapons List Order parameter is set up incorrectly.").map(a => Number(a)).reverse();
CGMZ.Encyclopedia.SkillsListOrder = CGMZ_Utils.parseJSON(CGMZ.Encyclopedia.parameters["Skills List Order"], [], "CGMZ Encyclopedia", "Your Skills List Order parameter is set up incorrectly.").map(a => Number(a)).reverse();
CGMZ.Encyclopedia.StatesListOrder = CGMZ_Utils.parseJSON(CGMZ.Encyclopedia.parameters["States List Order"], [], "CGMZ Encyclopedia", "Your States List Order parameter is set up incorrectly.").map(a => Number(a)).reverse();
CGMZ.Encyclopedia.ActorsListOrder = CGMZ_Utils.parseJSON(CGMZ.Encyclopedia.parameters["Actors List Order"], [], "CGMZ Encyclopedia", "Your Actor List Order parameter is set up incorrectly.").map(a => Number(a)).reverse();
CGMZ.Encyclopedia.ExtraEnemyInfo = CGMZ_Utils.parseJSON(CGMZ.Encyclopedia.parameters["Extra Bestiary Settings"], [], "CGMZ Encyclopedia", "Your Extra Enemy Info parameter is set up incorrectly.");
CGMZ.Encyclopedia.CategoryBackgrounds = CGMZ_Utils.parseJSON(CGMZ.Encyclopedia.parameters["Category Backgrounds"], [], "CGMZ Encyclopedia", "Your Category Backgrounds parameter was not valid JSON, and could not be read.");
CGMZ.Encyclopedia.DefaultEnemyBGM = CGMZ.Encyclopedia.parameters["Default Enemy Battle BGM"];
if(CGMZ.Encyclopedia.DefaultEnemyBGM) {
	CGMZ.Encyclopedia.DefaultEnemyBGM = CGMZ_Utils.parseJSON(CGMZ.Encyclopedia.DefaultEnemyBGM, null, "CGMZ Encyclopedia", "Your Default Enemy Battle BGM parameter is set up incorrectly.");
	if(CGMZ.Encyclopedia.DefaultEnemyBGM) {
		CGMZ.Encyclopedia.DefaultEnemyBGM.volume = Number(CGMZ.Encyclopedia.DefaultEnemyBGM.volume);
		CGMZ.Encyclopedia.DefaultEnemyBGM.pan = Number(CGMZ.Encyclopedia.DefaultEnemyBGM.pan);
		CGMZ.Encyclopedia.DefaultEnemyBGM.pitch = Number(CGMZ.Encyclopedia.DefaultEnemyBGM.pitch);
	}
}
//=============================================================================
// CGMZ_EncyclopediaData
//-----------------------------------------------------------------------------
// Class that stores the id and discovery of built-in encyclopedia classes
// such as enemies or items. Not for custom category data.
//=============================================================================
function CGMZ_EncyclopediaData(id, index) {
    this.initialize.apply(this, arguments);
}
//-----------------------------------------------------------------------------
// Initialize Data
//-----------------------------------------------------------------------------
CGMZ_EncyclopediaData.prototype.initialize = function(id, index) {
	this._id = id;
	this._index = index;
	this._discovered = false;
	this._discoverDate = null;
};
//-----------------------------------------------------------------------------
// Check if the object is discovered
//-----------------------------------------------------------------------------
CGMZ_EncyclopediaData.prototype.isDiscovered = function() {
	return this._discovered;
};
//-----------------------------------------------------------------------------
// Discover the object
//-----------------------------------------------------------------------------
CGMZ_EncyclopediaData.prototype.discover = function() {
	this._discovered = true;
	const date = new Date();
	const day = date.getDate();
	const month = date.getMonth();
	const year = date.getFullYear();
	this._discoverDate = $cgmzTemp.createDateText(day, month, year, CGMZ.Encyclopedia.DateFormat, "/");
};
//=============================================================================
// CGMZ_CustomEncyclopediaData
//-----------------------------------------------------------------------------
// Class that stores the data of custom entries in the encyclopedia
//=============================================================================
function CGMZ_CustomEncyclopediaData(id, data) {
    this.initialize.apply(this, arguments);
}
//-----------------------------------------------------------------------------
// Initialize Data
//-----------------------------------------------------------------------------
CGMZ_CustomEncyclopediaData.prototype.initialize = function(id, data) {
	this._id = id+1;
	this._index = id+1;
	this._discovered = false;
	this._name = data.Name;
	this._displayName = data["Display Name"];
	this._sketch = JSON.parse(data.Sketch);
	this._description = JSON.parse(data.Description);
	this._discoverDate = null;
	this._customHeaders = CGMZ_Utils.parseJSON(data["Custom Headers"], [], "CGMZ Encyclopedia", "Your custom entry with name '" + this._name + "' had invalid JSON in the Custom Headers parameter and could not be read.");
	this._customInfo = CGMZ_Utils.parseJSON(data["Custom Info"], [], "CGMZ Encyclopedia", "Your custom entry with name '" + this._name + "' had invalid JSON in the Custom Info parameter and could not be read.").map(info => CGMZ_Utils.parseJSON(info, null, "CGMZ Encyclopedia", "Your custom entry with name '" + this._name + "' had invalid JSON in the Custom Info parameter and could not be read."));
	this._mainId = Number(data["Main Id"]);
	this._mainType = data["Main Type"];
};
//-----------------------------------------------------------------------------
// Check if the object is discovered
//-----------------------------------------------------------------------------
CGMZ_CustomEncyclopediaData.prototype.isDiscovered = function() {
	return this._discovered;
};
//-----------------------------------------------------------------------------
// Discover the object
//-----------------------------------------------------------------------------
CGMZ_CustomEncyclopediaData.prototype.discover = function() {
	this._discovered = true;
	const date = new Date();
	const day = date.getDate();
	const month = date.getMonth();
	const year = date.getFullYear();
	this._discoverDate = $cgmzTemp.createDateText(day, month, year, CGMZ.Encyclopedia.DateFormat, "/");
};
//=============================================================================
// CGMZ_Encyclopedia
//-----------------------------------------------------------------------------
// Store and manage encyclopedia data.
//=============================================================================
function CGMZ_Encyclopedia() {
    this.initialize.apply(this, arguments);
}
//-----------------------------------------------------------------------------
// Initialize Encyclopedia
//-----------------------------------------------------------------------------
CGMZ_Encyclopedia.prototype.initialize = function() {
	this._bestiary = [];
	this._items = [];
	this._armors = [];
	this._weapons = [];
	this._skills = [];
	this._states = [];
	this.initializeData(this._bestiary, 'bestiary');
	this.initializeData(this._items, 'items');
	this.initializeData(this._armors, 'armors');
	this.initializeData(this._weapons, 'weapons');
	this.initializeData(this._skills, 'skills');
	this.initializeData(this._states, 'states');
	this.initializeActors();
	this._totalDiscovered = 0;
	this._bestiaryDiscovered = 0;
	this._itemsDiscovered = 0;
	this._armorsDiscovered = 0;
	this._weaponsDiscovered = 0;
	this._skillsDiscovered = 0;
	this._statesDiscovered = 0;
	this._customData = {};
	this._customDiscovered = {};
	this.initializeCustomData();
};
//-----------------------------------------------------------------------------
// Initialize any encyclopedia data array to all undiscovered.
//-----------------------------------------------------------------------------
CGMZ_Encyclopedia.prototype.initializeActors = function() {
	this._actors = [];
	this.initializeData(this._actors, 'actors');
	this._actorsDiscovered = 0;
};
//-----------------------------------------------------------------------------
// Initialize any encyclopedia data array to all undiscovered.
//-----------------------------------------------------------------------------
CGMZ_Encyclopedia.prototype.initializeData = function(array, symbol) {
	let gameData = null;
	switch(symbol) {
		case 'bestiary':
			if(!CGMZ.Encyclopedia.IncludeBestiary) return;
			gameData = $dataEnemies;
			break;
		case 'items':
			if(!CGMZ.Encyclopedia.IncludeItems) return;
			gameData = $dataItems;
			break;
		case 'armors':
			if(!CGMZ.Encyclopedia.IncludeArmors) return;
			gameData = $dataArmors;
			break;
		case 'weapons':
			if(!CGMZ.Encyclopedia.IncludeWeapons) return;
			gameData = $dataWeapons;
			break;
		case 'skills':
			if(!CGMZ.Encyclopedia.IncludeSkills) return;
			gameData = $dataSkills;
			break;
		case 'states':
			if(!CGMZ.Encyclopedia.IncludeStates) return;
			gameData = $dataStates;
			break;
		case 'actors':
			if(!CGMZ.Encyclopedia.IncludeActors) return;
			gameData = $dataActors;
			break;
	}
	if(!gameData) return;
	let index = 1;
	for(let i = 1; i < gameData.length; i++) {
		if(this.meetsExclusionCriteria(gameData[i])) continue;
		const data = new CGMZ_EncyclopediaData(i, index);
		if(!array.find(entry => entry._id === data._id)) array.push(data);
		index++;
	}
};
//-----------------------------------------------------------------------------
// Check if the game data meets criteria to be excluded from encyclopedia
//-----------------------------------------------------------------------------
CGMZ_Encyclopedia.prototype.meetsExclusionCriteria = function(data) {
	if(!data) return true;
	if(CGMZ.Encyclopedia.IgnoreBlankEntries && !data.name) return true;
	if(CGMZ.Encyclopedia.IgnoreEntriesWithName && data.name.includes(CGMZ.Encyclopedia.IgnoreEntriesWithName)) return true;
	if(CGMZ.Encyclopedia.OptInEntries && (!data.meta || !data.meta.cgmzencyclopediahide)) return true;
	if(!CGMZ.Encyclopedia.OptInEntries && data.meta && data.meta.cgmzencyclopediahide) return true;
	return false;
};
//-----------------------------------------------------------------------------
// Initialize custom data
//-----------------------------------------------------------------------------
CGMZ_Encyclopedia.prototype.initializeCustomData = function() {
	for(const customData of CGMZ.Encyclopedia.CustomEntries) {
		const data = JSON.parse(customData);
		const symbol = data["Category Symbol"];
		if(!this._customData.hasOwnProperty(symbol)) {
			this._customData[symbol] = [];
			this._customDiscovered[symbol] = 0;
		}
		const newObj = new CGMZ_CustomEncyclopediaData(this._customData[symbol].length, data);
		const currentObj = this._customData[symbol].find(obj => obj._name === newObj._name);
		if(!currentObj) {
			this._customData[symbol].push(newObj);
		} else if(typeof currentObj._displayName === "undefined") {
			currentObj._displayName = newObj._displayName;
		}
		// patch custom data to add missing custom header / info if those properties do not exist (saved game prior to 1.10.0)
		if(currentObj && !currentObj._customHeaders) {
			currentObj._customHeaders = JSON.parse(JSON.stringify(newObj._customHeaders));
			currentObj._customInfo = JSON.parse(JSON.stringify(newObj._customInfo));
			currentObj._mainId = newObj._mainId;
			currentObj._mainType = newObj._mainType;
		}
	}
	this._totalEntries = this.calculateTotalEntries();
};
//-----------------------------------------------------------------------------
// Calculate total amount of entries
//-----------------------------------------------------------------------------
CGMZ_Encyclopedia.prototype.calculateTotalEntries = function() {
	let total = 0;
	if(CGMZ.Encyclopedia.IncludeBestiary) total += this._bestiary.length;
	if(CGMZ.Encyclopedia.IncludeItems) total += this._items.length;
	if(CGMZ.Encyclopedia.IncludeArmors) total += this._armors.length;
	if(CGMZ.Encyclopedia.IncludeWeapons) total += this._weapons.length;
	if(CGMZ.Encyclopedia.IncludeSkills) total += this._skills.length;
	if(CGMZ.Encyclopedia.IncludeStates) total += this._states.length;
	if(CGMZ.Encyclopedia.IncludeActors && this._actors) total += this._actors.length;
	for(const symbol of Object.keys(this._customData)) {
		total += this._customData[symbol].length;
	}
	return total;
};
//-----------------------------------------------------------------------------
// Processing a (potential) new discovery
//-----------------------------------------------------------------------------
CGMZ_Encyclopedia.prototype.processDiscovery = function(symbol, id) {
	const dataArray = this.getEncyclopediaData(symbol);
	if(dataArray.length < 1) return;
	const dataObject = this.getEncyclopediaObject(dataArray, Number(id));
	if(dataObject && !dataObject.isDiscovered()) { // Actually is new discovery !dataObject._discovered
		this._totalDiscovered++;
		switch(symbol) {
			case 'bestiary': this._bestiaryDiscovered++; break;
			case 'items': this._itemsDiscovered++; break;
			case 'armors': this._armorsDiscovered++; break;
			case 'weapons': this._weaponsDiscovered++; break;
			case 'skills': this._skillsDiscovered++; break;
			case 'states': this._statesDiscovered++; break;
			case 'actors': this._actorsDiscovered++; break;
			default: this._customDiscovered[symbol]++;
		}
		dataObject.discover(); // dataObject._discovered = true;
		if(Imported.CGMZ_Achievements) {
			$cgmz.checkAchievementEncyclopediaCriteria();
		}
	}
};
//-----------------------------------------------------------------------------
// Get Encyclopedia Object from Array
// Possible that arrays are not in order of the ID, in this case it will find proper ID.
//-----------------------------------------------------------------------------
CGMZ_Encyclopedia.prototype.getEncyclopediaObject = function(array, id) {
	return array.find(obj => obj._id === id);
};
//-----------------------------------------------------------------------------
// Get Encyclopedia Discovered
// Returns amount discovered if possible, otherwise returns -1
//-----------------------------------------------------------------------------
CGMZ_Encyclopedia.prototype.getAmountDiscovered = function(symbol) {
	switch(symbol) {
		case 'total': return this._totalDiscovered;
		case 'bestiary': return this._bestiaryDiscovered;
		case 'items': return this._itemsDiscovered;
		case 'armors': return this._armorsDiscovered;
		case 'weapons': return this._weaponsDiscovered;
		case 'skills': return this._skillsDiscovered;
		case 'states': return this._statesDiscovered;
		case 'actors': return this._actorsDiscovered;
		default: return (this._customDiscovered[symbol] || this._customDiscovered[symbol] === 0) ? this._customDiscovered[symbol] : -1;
	}
};
//-----------------------------------------------------------------------------
// Get Encyclopedia Entries
// Returns amount of entries if possible, otherwise returns -1
//-----------------------------------------------------------------------------
CGMZ_Encyclopedia.prototype.getAmountEntries = function(symbol) {
	switch(symbol) {
		case 'total': return this._totalEntries;
		case 'bestiary': return this._bestiary.length;
		case 'items': return this._items.length;
		case 'armors': return this._armors.length;
		case 'weapons': return this._weapons.length;
		case 'skills': return this._skills.length;
		case 'states': return this._states.length;
		case 'actors': return this._actors.length;
		default: return (this._customData[symbol]) ? this._customData[symbol].length : -1;
	}
};
//-----------------------------------------------------------------------------
// Get Encyclopedia Data
// Returns data array if possible, otherwise returns []
//-----------------------------------------------------------------------------
CGMZ_Encyclopedia.prototype.getEncyclopediaData = function(symbol) {
	switch(symbol) {
		case 'bestiary': return this._bestiary;
		case 'items': return this._items;
		case 'armors': return this._armors;
		case 'weapons': return this._weapons;
		case 'skills': return this._skills;
		case 'states': return this._states;
		case 'actors': return this._actors;
		default: return (this._customData[symbol]) ? this._customData[symbol] : [];
	}
};
//-----------------------------------------------------------------------------
// Discover troop enemies
//-----------------------------------------------------------------------------
CGMZ_Encyclopedia.prototype.discoverTroop = function(troopId) {
	if(!CGMZ.Encyclopedia.IncludeBestiary) return;
	const troop = $dataTroops[troopId];
	for(const member of troop.members) {
		if ($dataEnemies[member.enemyId]) {
			this.processDiscovery('bestiary', member.enemyId);
		}
	}
};
//-----------------------------------------------------------------------------
// Discover items, weapons, or armors
//-----------------------------------------------------------------------------
CGMZ_Encyclopedia.prototype.discoverItem = function(id, symbol) {
	switch(symbol) {
		case 'item':
			if(!CGMZ.Encyclopedia.IncludeItems) return;
			this.processDiscovery('items', id);
			break;
		case 'weapon':
			if(!CGMZ.Encyclopedia.IncludeWeapons) return;
			this.processDiscovery('weapons', id);
			break;
		case 'armor':
			if(!CGMZ.Encyclopedia.IncludeArmors) return;
			this.processDiscovery('armors', id);
	}
};
//-----------------------------------------------------------------------------
// Discover skills
//-----------------------------------------------------------------------------
CGMZ_Encyclopedia.prototype.discoverSkill = function(id) {
	if(!CGMZ.Encyclopedia.IncludeSkills) return;
	this.processDiscovery('skills', id);
};
//-----------------------------------------------------------------------------
// Discover skills
//-----------------------------------------------------------------------------
CGMZ_Encyclopedia.prototype.discoverState = function(id) {
	if(!CGMZ.Encyclopedia.IncludeStates) return;
	this.processDiscovery('states', id);
};
//-----------------------------------------------------------------------------
// Discover actors
//-----------------------------------------------------------------------------
CGMZ_Encyclopedia.prototype.discoverActor = function(id) {
	if(!CGMZ.Encyclopedia.IncludeActors) return;
	this.processDiscovery('actors', id);
};
//-----------------------------------------------------------------------------
// Change a custom entry description
//-----------------------------------------------------------------------------
CGMZ_Encyclopedia.prototype.changeCustomDescription = function(symbol, name, newDescription) {
	if(!this._customData[symbol]) return;
	const obj = this._customData[symbol].find(obj => obj._name === name)
	if(!obj) return;
	obj._description = newDescription;
};
//-----------------------------------------------------------------------------
// Change a custom entry sketch
//-----------------------------------------------------------------------------
CGMZ_Encyclopedia.prototype.changeCustomSketch = function(symbol, name, newSketch) {
	if(!this._customData[symbol]) return;
	const obj = this._customData[symbol].find(obj => obj._name === name)
	if(!obj) return;
	obj._sketch = newSketch;
};
//=============================================================================
// CGMZ_Encyclopedia_Subcategory
//-----------------------------------------------------------------------------
// Temporary class for subcategory data
//=============================================================================
function CGMZ_Encyclopedia_Subcategory() {
    this.initialize.apply(this, arguments);
}
//-----------------------------------------------------------------------------
// Initialize Data
//-----------------------------------------------------------------------------
CGMZ_Encyclopedia_Subcategory.prototype.initialize = function(subcategory) {
	this.id = subcategory["Subcategory Id"];
	this.mainId = subcategory["Main Category Id"];
	this.name = subcategory["Subcategory Name"];
	this.entryList = CGMZ_Utils.parseJSON(subcategory["Entry Ids"], [], "CGMZ Encyclopedia", "Your subcategory with id '" + this.id + "' had invalid JSON and could not be read.").map(x => Number(x));
};
//=============================================================================
// CGMZ_Temp
//-----------------------------------------------------------------------------
// Handling for encyclopedia plugin commands. Create custom temp data
//=============================================================================
//-----------------------------------------------------------------------------
// Load extra entry settings
//-----------------------------------------------------------------------------
const alias_CGMZ_Encyclopedia_CGMZTemp_createPluginData = CGMZ_Temp.prototype.createPluginData;
CGMZ_Temp.prototype.createPluginData = function() {
	alias_CGMZ_Encyclopedia_CGMZTemp_createPluginData.call(this);
	this._encyclopediaExtraEnemyData = {};
	this._encyclopediaSubcategoryMap = {};
	this._encyclopediaSubcategories = {};
	for(const extraEnemyJSON of CGMZ.Encyclopedia.ExtraEnemyInfo) {
		const extraEnemyInfo = CGMZ_Utils.parseJSON(extraEnemyJSON, null, "CGMZ Encyclopedia", "Error encountered while parsing an Extra Enemy Info parameter: " + extraEnemyJSON);
		if(!extraEnemyInfo) continue;
		const bgm = CGMZ_Utils.parseJSON(extraEnemyInfo.BGM, null, "CGMZ Encyclopedia", "Error encountered while parsing an Extra Enemy Info BGM parameter: " + extraEnemyJSON);
		if(bgm) {
			bgm.volume = Number(bgm.volume);
			bgm.pan = Number(bgm.pan);
			bgm.pitch = Number(bgm.pitch);
		}
		this._encyclopediaExtraEnemyData[Number(extraEnemyInfo.id)] = {bgm: bgm};
	}
	for(const subcategoryJSON of CGMZ.Encyclopedia.Subcategories) {
		const parsed = CGMZ_Utils.parseJSON(subcategoryJSON, null, "CGMZ Encyclopedia", "One of your subcategories was set up incorrectly and could not be read.");
		if(!parsed) continue;
		if(!this._encyclopediaSubcategoryMap[parsed["Main Category Id"]]) {
			this._encyclopediaSubcategoryMap[parsed["Main Category Id"]] = [parsed["Subcategory Id"]];
		} else {
			this._encyclopediaSubcategoryMap[parsed["Main Category Id"]].push(parsed["Subcategory Id"]);
		}
		const subcategory = new CGMZ_Encyclopedia_Subcategory(parsed);
		this._encyclopediaSubcategories[subcategory.id] = subcategory;
	}
};
//-----------------------------------------------------------------------------
// Get extra enemy settings
//-----------------------------------------------------------------------------
CGMZ_Temp.prototype.getEncyclopediaExtraBestiarySettings = function(id) {
	return this._encyclopediaExtraEnemyData[id];
};
//-----------------------------------------------------------------------------
// Check if a subcategory exists for a given main category symbol
//-----------------------------------------------------------------------------
CGMZ_Temp.prototype.hasEncyclopediaSubcategoriesForSymbol = function(symbol) {
	return !!this._encyclopediaSubcategoryMap[symbol];
};
//-----------------------------------------------------------------------------
// Register Plugin Commands
//-----------------------------------------------------------------------------
const alias_CGMZ_Encyclopedia_registerPluginCommands = CGMZ_Temp.prototype.registerPluginCommands;
CGMZ_Temp.prototype.registerPluginCommands = function() {
	alias_CGMZ_Encyclopedia_registerPluginCommands.call(this);
	PluginManager.registerCommand("CGMZ_Encyclopedia", "Reinitialize", this.pluginCommandEncyclopediaReinitialize);
	PluginManager.registerCommand("CGMZ_Encyclopedia", "Call Scene", this.pluginCommandEncyclopediaCallScene);
	PluginManager.registerCommand("CGMZ_Encyclopedia", "DiscoverEnemy", this.pluginCommandEncyclopediaDiscoverEnemy);
	PluginManager.registerCommand("CGMZ_Encyclopedia", "DiscoverItem", this.pluginCommandEncyclopediaDiscoverItem);
	PluginManager.registerCommand("CGMZ_Encyclopedia", "DiscoverArmor", this.pluginCommandEncyclopediaDiscoverArmor);
	PluginManager.registerCommand("CGMZ_Encyclopedia", "DiscoverWeapon", this.pluginCommandEncyclopediaDiscoverWeapon);
	PluginManager.registerCommand("CGMZ_Encyclopedia", "DiscoverSkill", this.pluginCommandEncyclopediaDiscoverSkill);
	PluginManager.registerCommand("CGMZ_Encyclopedia", "DiscoverState", this.pluginCommandEncyclopediaDiscoverState);
	PluginManager.registerCommand("CGMZ_Encyclopedia", "Discover Actor", this.pluginCommandEncyclopediaDiscoverActor);
	PluginManager.registerCommand("CGMZ_Encyclopedia", "DiscoverCustom", this.pluginCommandEncyclopediaDiscoverCustom);
	PluginManager.registerCommand("CGMZ_Encyclopedia", "Discover Batch", this.pluginCommandEncyclopediaDiscoverBatch);
	PluginManager.registerCommand("CGMZ_Encyclopedia", "Discover Custom Batch", this.pluginCommandEncyclopediaDiscoverCustomBatch);
	PluginManager.registerCommand("CGMZ_Encyclopedia", "Get Completion", this.pluginCommandEncyclopediaGetCompletion);
	PluginManager.registerCommand("CGMZ_Encyclopedia", "Change Description", this.pluginCommandEncyclopediaChangeDescription);
	PluginManager.registerCommand("CGMZ_Encyclopedia", "Change Sketch", this.pluginCommandEncyclopediaChangeSketch);
	PluginManager.registerCommand("CGMZ_Encyclopedia", "Check Discovered", this.pluginCommandEncyclopediaCheckDiscovered);
};
//-----------------------------------------------------------------------------
// Plugin Command - Reinitialize the encyclopedia data
//-----------------------------------------------------------------------------
CGMZ_Temp.prototype.pluginCommandEncyclopediaReinitialize = function() {
	$cgmz.initializeEncyclopediaData(true);
};
//-----------------------------------------------------------------------------
// Plugin Command - Call the Encyclopedia Scene
//-----------------------------------------------------------------------------
CGMZ_Temp.prototype.pluginCommandEncyclopediaCallScene = function(args) {
	SceneManager.push(CGMZ_Scene_Encyclopedia);
	SceneManager.prepareNextScene(args.category);
};
//-----------------------------------------------------------------------------
// Plugin Command - Discover an enemy
//-----------------------------------------------------------------------------
CGMZ_Temp.prototype.pluginCommandEncyclopediaDiscoverEnemy = function(args) {
	$cgmz.encyclopediaDiscovery("bestiary", Number(args.id));
};
//-----------------------------------------------------------------------------
// Plugin Command - Discover an item
//-----------------------------------------------------------------------------
CGMZ_Temp.prototype.pluginCommandEncyclopediaDiscoverItem = function(args) {
	$cgmz.encyclopediaDiscovery("items", Number(args.id));
};
//-----------------------------------------------------------------------------
// Plugin Command - Discover an armor
//-----------------------------------------------------------------------------
CGMZ_Temp.prototype.pluginCommandEncyclopediaDiscoverArmor = function(args) {
	$cgmz.encyclopediaDiscovery("armors", Number(args.id));
};
//-----------------------------------------------------------------------------
// Plugin Command - Discover a weapon
//-----------------------------------------------------------------------------
CGMZ_Temp.prototype.pluginCommandEncyclopediaDiscoverWeapon = function(args) {
	$cgmz.encyclopediaDiscovery("weapons", Number(args.id));
};
//-----------------------------------------------------------------------------
// Plugin Command - Discover a skill
//-----------------------------------------------------------------------------
CGMZ_Temp.prototype.pluginCommandEncyclopediaDiscoverSkill = function(args) {
	$cgmz.encyclopediaDiscovery("skills", Number(args.id));
};
//-----------------------------------------------------------------------------
// Plugin Command - Discover a state
//-----------------------------------------------------------------------------
CGMZ_Temp.prototype.pluginCommandEncyclopediaDiscoverState = function(args) {
	$cgmz.encyclopediaDiscovery("states", Number(args.id));
};
//-----------------------------------------------------------------------------
// Plugin Command - Discover an actor
//-----------------------------------------------------------------------------
CGMZ_Temp.prototype.pluginCommandEncyclopediaDiscoverActor = function(args) {
	$cgmz.encyclopediaDiscovery("actors", Number(args.id));
};
//-----------------------------------------------------------------------------
// Plugin Command - Discover a custom entry
//-----------------------------------------------------------------------------
CGMZ_Temp.prototype.pluginCommandEncyclopediaDiscoverCustom = function(args) {
	$cgmz.encyclopediaDiscovery(args.symbol, Number(args.id));
};
//-----------------------------------------------------------------------------
// Plugin Command - Discover multiple entries
//-----------------------------------------------------------------------------
CGMZ_Temp.prototype.pluginCommandEncyclopediaDiscoverBatch = function(args) {
	for(const enemyId of JSON.parse(args.enemies)) {
		$cgmz.encyclopediaDiscovery("bestiary", Number(enemyId));
	}
	for(const itemId of JSON.parse(args.items)) {
		$cgmz.encyclopediaDiscovery("items", Number(itemId));
	}
	for(const weaponId of JSON.parse(args.weapons)) {
		$cgmz.encyclopediaDiscovery("weapons", Number(weaponId));
	}
	for(const armorId of JSON.parse(args.armors)) {
		$cgmz.encyclopediaDiscovery("armors", Number(armorId));
	}
	for(const skillId of JSON.parse(args.skills)) {
		$cgmz.encyclopediaDiscovery("skills", Number(skillId));
	}
	for(const stateId of JSON.parse(args.states)) {
		$cgmz.encyclopediaDiscovery("states", Number(stateId));
	}
	for(const actorId of JSON.parse(args.actors)) {
		$cgmz.encyclopediaDiscovery("actors", Number(actorId));
	}
};
//-----------------------------------------------------------------------------
// Plugin Command - Discover multiple custom entries
//-----------------------------------------------------------------------------
CGMZ_Temp.prototype.pluginCommandEncyclopediaDiscoverCustomBatch = function(args) {
	const entries = JSON.parse(args.entries);
	for(const entryJSON of entries) {
		const entry = JSON.parse(entryJSON);
		$cgmz.encyclopediaDiscovery(entry.symbol, Number(entry.id));
	}
};
//-----------------------------------------------------------------------------
// Plugin Command - Get Completion % in Game Variable
//-----------------------------------------------------------------------------
CGMZ_Temp.prototype.pluginCommandEncyclopediaGetCompletion = function(args) {
	const variableId = Number(args.Variable);
	const percentage = ($cgmz._encyclopedia.getAmountDiscovered(args.symbol) / $cgmz._encyclopedia.getAmountEntries(args.symbol)) * 100;
	$gameVariables.setValue(variableId, Number(percentage));
};
//-----------------------------------------------------------------------------
// Plugin Command - Change Custom Entry Description
//-----------------------------------------------------------------------------
CGMZ_Temp.prototype.pluginCommandEncyclopediaChangeDescription = function(args) {
	$cgmz._encyclopedia.changeCustomDescription(args.Symbol, args.Name, JSON.parse(args.Description));
};
//-----------------------------------------------------------------------------
// Plugin Command - Change Custom Entry Sketch
//-----------------------------------------------------------------------------
CGMZ_Temp.prototype.pluginCommandEncyclopediaChangeSketch = function(args) {
	$cgmz._encyclopedia.changeCustomSketch(args.Symbol, args.Name, JSON.parse(args.Sketch));
};
//-----------------------------------------------------------------------------
// Plugin Command - Check if an entry is discovered
//-----------------------------------------------------------------------------
CGMZ_Temp.prototype.pluginCommandEncyclopediaCheckDiscovered = function(args) {
	$gameSwitches.setValue(Number(args.Switch), $cgmz.isEncyclopediaEntryDiscovered(args.Symbol, Number(args.Id)));
};
//=============================================================================
// CGMZ
//-----------------------------------------------------------------------------
// Manage encyclopedia data
//=============================================================================
//-----------------------------------------------------------------------------
// Alias. Also initialize encyclopedia data
//-----------------------------------------------------------------------------
const alias_CGMZ_Encyclopedia_createPluginData = CGMZ_Core.prototype.createPluginData;
CGMZ_Core.prototype.createPluginData = function() {
	alias_CGMZ_Encyclopedia_createPluginData.call(this);
	this.initializeEncyclopediaData(false);
};
//-----------------------------------------------------------------------------
// Initialize encyclopedia data
//-----------------------------------------------------------------------------
CGMZ_Core.prototype.initializeEncyclopediaData = function(reinitialize) {
	if(!this._encyclopedia || reinitialize) {
		this.setupEncyclopediaVariables();
	}
};
//-----------------------------------------------------------------------------
// Initialize encyclopedia variables
//-----------------------------------------------------------------------------
CGMZ_Core.prototype.setupEncyclopediaVariables = function() {
	this._encyclopedia = new CGMZ_Encyclopedia();
	this._encyclopediaVersion = "1.7.0";
};
//-----------------------------------------------------------------------------
// Check for new data after game load
//-----------------------------------------------------------------------------
const alias_CGMZ_Encyclopedia_CGMZCore_onAfterLoad = CGMZ_Core.prototype.onAfterLoad;
CGMZ_Core.prototype.onAfterLoad = function() {
	alias_CGMZ_Encyclopedia_CGMZCore_onAfterLoad.call(this);
	if(!this._encyclopedia) this.setupEncyclopediaVariables();
	this._encyclopedia.initializeData(this._encyclopedia._bestiary, 'bestiary');
	this._encyclopedia.initializeData(this._encyclopedia._items, 'items');
	this._encyclopedia.initializeData(this._encyclopedia._armors, 'armors');
	this._encyclopedia.initializeData(this._encyclopedia._weapons, 'weapons');
	this._encyclopedia.initializeData(this._encyclopedia._skills, 'skills');
	this._encyclopedia.initializeData(this._encyclopedia._states, 'states');
	if(this._encyclopedia._actors) this._encyclopedia.initializeData(this._encyclopedia._actors, 'actors');
	this._encyclopedia.initializeCustomData();
	this.patchOldEncyclopediaVersions();
};
//-----------------------------------------------------------------------------
// Patch old encyclopedia data in save games
//-----------------------------------------------------------------------------
CGMZ_Core.prototype.patchOldEncyclopediaVersions = function() {
	if(!this._encyclopediaVersion) {
		this._encyclopediaVersion = "1.7.0";
		this._encyclopedia.initializeActors();
	}
};
//-----------------------------------------------------------------------------
// Discover encyclopedia entry manually
//-----------------------------------------------------------------------------
CGMZ_Core.prototype.encyclopediaDiscovery = function(symbol, id) {
	this._encyclopedia.processDiscovery(symbol, id);
};
//-----------------------------------------------------------------------------
// Get Encyclopedia Discovered
// Returns amount discovered if possible, otherwise returns -1
//-----------------------------------------------------------------------------
CGMZ_Core.prototype.getEncyclopediaDiscovered = function(symbol) {
	return this._encyclopedia.getAmountDiscovered(symbol);
};
//-----------------------------------------------------------------------------
// Get Encyclopedia Entries
// Returns amount of entries if possible, otherwise returns -1
//-----------------------------------------------------------------------------
CGMZ_Core.prototype.getEncyclopediaEntries = function(symbol) {
	return this._encyclopedia.getAmountEntries(symbol);
};
//-----------------------------------------------------------------------------
// Get Encyclopedia Data Array
// Returns proper array if possible, otherwise returns []
//-----------------------------------------------------------------------------
CGMZ_Core.prototype.getEncyclopediaData = function(symbol) {
	return this._encyclopedia.getEncyclopediaData(symbol);
};
//-----------------------------------------------------------------------------
// Get Encyclopedia Object
// Returns data object from array
//-----------------------------------------------------------------------------
CGMZ_Core.prototype.getEncyclopediaObject = function(symbol, id) {
	const array = this._encyclopedia.getEncyclopediaData(symbol);
	return this._encyclopedia.getEncyclopediaObject(array, id);
};
//-----------------------------------------------------------------------------
// Discover states
//-----------------------------------------------------------------------------
CGMZ_Core.prototype.isEncyclopediaEntryDiscovered = function(symbol, id) {
	const obj = this.getEncyclopediaObject(symbol, id);
	return obj.isDiscovered();
};
//-----------------------------------------------------------------------------
// Discover enemies from a troop
//-----------------------------------------------------------------------------
CGMZ_Core.prototype.EncyclopediaDiscoverTroop = function(troopId) {
	this._encyclopedia.discoverTroop(troopId);
};
//-----------------------------------------------------------------------------
// Discover items, weapons, and armors (symbol = "item", "weapon", "armor")
//-----------------------------------------------------------------------------
CGMZ_Core.prototype.EncyclopediaDiscoverItem = function(id, symbol) {
	this._encyclopedia.discoverItem(id, symbol);
};
//-----------------------------------------------------------------------------
// Discover skills
//-----------------------------------------------------------------------------
CGMZ_Core.prototype.EncyclopediaDiscoverSkill = function(skillId) {
	this._encyclopedia.discoverSkill(skillId);
};
//-----------------------------------------------------------------------------
// Discover states
//-----------------------------------------------------------------------------
CGMZ_Core.prototype.EncyclopediaDiscoverState = function(stateId) {
	this._encyclopedia.discoverState(stateId);
};
//-----------------------------------------------------------------------------
// Discover actors
//-----------------------------------------------------------------------------
CGMZ_Core.prototype.EncyclopediaDiscoverActor = function(actorId) {
	this._encyclopedia.discoverActor(actorId);
};
//-----------------------------------------------------------------------------
// Get total discovered %
//-----------------------------------------------------------------------------
CGMZ_Core.prototype.getEncyclopediaTotalPercent = function() {
	let percentage = this._encyclopedia.getAmountDiscovered('total') / this._encyclopedia.getAmountEntries('total');
	percentage *= 100;
	return parseFloat(percentage.toFixed(CGMZ.Encyclopedia.DecimalSpots));
};
//-----------------------------------------------------------------------------
// Get bestiary discovered %
//-----------------------------------------------------------------------------
CGMZ_Core.prototype.getEncyclopediaBestiaryPercent = function() {
	let percentage = this._encyclopedia.getAmountDiscovered('bestiary') / this._encyclopedia.getAmountEntries('bestiary');
	percentage *= 100;
	return parseFloat(percentage.toFixed(CGMZ.Encyclopedia.DecimalSpots));
};
//-----------------------------------------------------------------------------
// Get items discovered %
//-----------------------------------------------------------------------------
CGMZ_Core.prototype.getEncyclopediaItemsPercent = function() {
	let percentage = this._encyclopedia.getAmountDiscovered('items') / this._encyclopedia.getAmountEntries('items');
	percentage *= 100;
	return parseFloat(percentage.toFixed(CGMZ.Encyclopedia.DecimalSpots));
};
//-----------------------------------------------------------------------------
// Get weapons discovered %
//-----------------------------------------------------------------------------
CGMZ_Core.prototype.getEncyclopediaWeaponsPercent = function() {
	let percentage = this._encyclopedia.getAmountDiscovered('weapons') / this._encyclopedia.getAmountEntries('weapons');
	percentage *= 100;
	return parseFloat(percentage.toFixed(CGMZ.Encyclopedia.DecimalSpots));
};
//-----------------------------------------------------------------------------
// Get armors discovered %
//-----------------------------------------------------------------------------
CGMZ_Core.prototype.getEncyclopediaArmorsPercent = function() {
	let percentage = this._encyclopedia.getAmountDiscovered('armors') / this._encyclopedia.getAmountEntries('armors');
	percentage *= 100;
	return parseFloat(percentage.toFixed(CGMZ.Encyclopedia.DecimalSpots));
};
//-----------------------------------------------------------------------------
// Get skills discovered %
//-----------------------------------------------------------------------------
CGMZ_Core.prototype.getEncyclopediaSkillsPercent = function() {
	let percentage = this._encyclopedia.getAmountDiscovered('skills') / this._encyclopedia.getAmountEntries('skills');
	percentage *= 100;
	return parseFloat(percentage.toFixed(CGMZ.Encyclopedia.DecimalSpots));
};
//-----------------------------------------------------------------------------
// Get states discovered %
//-----------------------------------------------------------------------------
CGMZ_Core.prototype.getEncyclopediaStatesPercent = function() {
	let percentage = this._encyclopedia.getAmountDiscovered('states') / this._encyclopedia.getAmountEntries('states');
	percentage *= 100;
	return parseFloat(percentage.toFixed(CGMZ.Encyclopedia.DecimalSpots));
};
//-----------------------------------------------------------------------------
// Get actors discovered %
//-----------------------------------------------------------------------------
CGMZ_Core.prototype.getEncyclopediaActorsPercent = function() {
	let percentage = this._encyclopedia.getAmountDiscovered('actors') / this._encyclopedia.getAmountEntries('actors');
	percentage *= 100;
	return parseFloat(percentage.toFixed(CGMZ.Encyclopedia.DecimalSpots));
};
//-----------------------------------------------------------------------------
// Get custom discovered %
//-----------------------------------------------------------------------------
CGMZ_Core.prototype.getEncyclopediaCustomPercent = function(symbol) {
	let percentage = this._encyclopedia.getAmountDiscovered(symbol) / this._encyclopedia.getAmountEntries(symbol);
	percentage *= 100;
	return parseFloat(percentage.toFixed(CGMZ.Encyclopedia.DecimalSpots));
};
//=============================================================================
// CGMZ_Scene_Encyclopedia
//-----------------------------------------------------------------------------
// Handle the encyclopedia scene
//=============================================================================
function CGMZ_Scene_Encyclopedia() {
    this.initialize.apply(this, arguments);
}
CGMZ_Scene_Encyclopedia.prototype = Object.create(Scene_MenuBase.prototype);
CGMZ_Scene_Encyclopedia.prototype.constructor = CGMZ_Scene_Encyclopedia;
//-----------------------------------------------------------------------------
// Initialize
//-----------------------------------------------------------------------------
CGMZ_Scene_Encyclopedia.prototype.initialize = function() {
    Scene_MenuBase.prototype.initialize.call(this);
	this.setupCategoryBackgrounds();
	this._savedBGM = null;
	this._savedBGS = null;
	this._backgroundCustomSprite = new Sprite();
	this._backgroundCustomSprite.hide();
	this.addChild(this._backgroundCustomSprite);
	this._symbol = null;
};
//-----------------------------------------------------------------------------
// Set up the category background map for later use
//-----------------------------------------------------------------------------
CGMZ_Scene_Encyclopedia.prototype.setupCategoryBackgrounds = function() {
    this._categoryBackgroundMap = {};
	for(const backgroundJSON of CGMZ.Encyclopedia.CategoryBackgrounds) {
		const backgroundData = CGMZ_Utils.parseJSON(backgroundJSON, null, "CGMZ Encyclopedia", "One of your Category Backgrounds had invalid JSON, and could not be read. Skipping...");
		if(!backgroundData) continue;
		this._categoryBackgroundMap[backgroundData.symbol] = backgroundData.image;
	}
};
//-----------------------------------------------------------------------------
// Prepare scene to select category if provided
//-----------------------------------------------------------------------------
CGMZ_Scene_Encyclopedia.prototype.prepare = function(category) {
    this._startingCategory = category;
};
//-----------------------------------------------------------------------------
// Create encyclopedia windows
//-----------------------------------------------------------------------------
CGMZ_Scene_Encyclopedia.prototype.create = function() {
    Scene_MenuBase.prototype.create.call(this);
	this.createCategoryWindow();
	this.createTotalsWindow();
	this.createListWindow();
	this.createDummyWindow();
	this.createDisplayWindow();
	this.createSubcategoryWindow();
	if(this._startingCategory && this._categoryWindow.findSymbol(this._startingCategory)) this._categoryWindow.selectSymbol(this._startingCategory);
};
//-----------------------------------------------------------------------------
// Create encyclopedia category window
//-----------------------------------------------------------------------------
CGMZ_Scene_Encyclopedia.prototype.createCategoryWindow = function() {
    this._categoryWindow = new CGMZ_Window_EncyclopediaCategory(this.categoryWindowRect());
	this._categoryWindow.setHandler('ok', this.onCategoryOk.bind(this));
	this._categoryWindow.setHandler('cancel', this.popScene.bind(this));
    this.addWindow(this._categoryWindow);
};
//-----------------------------------------------------------------------------
// Category Window Rect
//-----------------------------------------------------------------------------
CGMZ_Scene_Encyclopedia.prototype.categoryWindowRect = function() {
	const x = 0;
	const y = this.hasTouchUI() ? this.buttonAreaHeight() : 0;
	const width = Graphics.boxWidth;
	const height = this.calcWindowHeight(CGMZ.Encyclopedia.CategoryLines, true);
    return new Rectangle(x, y, width, height);
};
//-----------------------------------------------------------------------------
// Create encyclopedia subcategory window
//-----------------------------------------------------------------------------
CGMZ_Scene_Encyclopedia.prototype.createSubcategoryWindow = function() {
    this._subcategoryWindow = new CGMZ_Window_EncyclopediaSubcategory(this.subcategoryWindowRect());
	this._subcategoryWindow.setHandler('ok', this.onSubcategoryOk.bind(this));
	this._subcategoryWindow.setHandler('cancel', this.onSubcategoryCancel.bind(this));
	this._categoryWindow.setSubcategoryWindow(this._subcategoryWindow);
    this.addWindow(this._subcategoryWindow);
};
//-----------------------------------------------------------------------------
// Subcategory Window Rect
//-----------------------------------------------------------------------------
CGMZ_Scene_Encyclopedia.prototype.subcategoryWindowRect = function() {
	const x = 0;
	const y = this._categoryWindow.y + this._categoryWindow.height;
	const width = this._categoryWindow.width;
	const height = this.calcWindowHeight(1, true);
    return new Rectangle(x, y, width, height);
};
//-----------------------------------------------------------------------------
// Create Totals Window
//-----------------------------------------------------------------------------
CGMZ_Scene_Encyclopedia.prototype.createTotalsWindow = function() {
    this._totalsWindow = new CGMZ_Window_EncyclopediaTotals(this.totalsWindowRect());
	this._categoryWindow.setTotalWindow(this._totalsWindow);
    this.addWindow(this._totalsWindow);
};
//-----------------------------------------------------------------------------
// Totals Window Rect
//-----------------------------------------------------------------------------
CGMZ_Scene_Encyclopedia.prototype.totalsWindowRect = function() {
	const width = Graphics.boxWidth * (CGMZ.Encyclopedia.ListWindowWidth / 100.0);
	const height = this.calcWindowHeight(2, false);
	const x = CGMZ.Encyclopedia.ListWindowRight ? Graphics.boxWidth - width : 0 ;
	const y = Graphics.boxHeight - this.calcWindowHeight(2, false);
	return new Rectangle(x, y, width, height);
};
//-----------------------------------------------------------------------------
// Create List Window
//-----------------------------------------------------------------------------
CGMZ_Scene_Encyclopedia.prototype.createListWindow = function() {
    this._listWindow = new CGMZ_Window_EncyclopediaList(this.listWindowRect());
	this._listWindow.setHandler('cancel', this.onListCancel.bind(this));
	this._listWindow.setHandler('ok', this.onListOk.bind(this));
	this._categoryWindow.setListWindow(this._listWindow);
    this.addWindow(this._listWindow);
};
//-----------------------------------------------------------------------------
// List Window Rect
//-----------------------------------------------------------------------------
CGMZ_Scene_Encyclopedia.prototype.listWindowRect = function() {
	const width = this._totalsWindow.width;
	const height = Graphics.boxHeight - (this._categoryWindow.y + this._categoryWindow.height) - this._totalsWindow.height;
	const y = this._categoryWindow.y + this._categoryWindow.height;
	const x = this._totalsWindow.x;
	return new Rectangle(x, y, width, height);
};
//-----------------------------------------------------------------------------
// Create Dummy Window
//-----------------------------------------------------------------------------
CGMZ_Scene_Encyclopedia.prototype.createDummyWindow = function() {
    this._dummyWindow = new CGMZ_Window_EncDummy(this.displayWindowRect());
    this.addWindow(this._dummyWindow);
};
//-----------------------------------------------------------------------------
// Create Display Window
//-----------------------------------------------------------------------------
CGMZ_Scene_Encyclopedia.prototype.createDisplayWindow = function() {
    this._displayWindow = new CGMZ_Window_EncyclopediaDisplay(this.displayWindowRect());
	this._listWindow.setDisplayWindow(this._displayWindow);
	this._displayWindow.hide();
	this._displayWindow.deactivate();
	this._displayWindow.setHandler('cancel', this.onDisplayCancel.bind(this));
    this.addWindow(this._displayWindow);
};
//-----------------------------------------------------------------------------
// Display window (and dummy window) rect
//-----------------------------------------------------------------------------
CGMZ_Scene_Encyclopedia.prototype.displayWindowRect = function() {
    const x = CGMZ.Encyclopedia.ListWindowRight ? 0 : this._listWindow.width;
	const y = this._listWindow.y;
	const width = Graphics.boxWidth - this._listWindow.width;
	const height = Graphics.boxHeight - y;
	return new Rectangle(x, y, width, height);
};
//-----------------------------------------------------------------------------
// Check if should make room for Touch UI
//-----------------------------------------------------------------------------
CGMZ_Scene_Encyclopedia.prototype.hasTouchUI = function() {
	return !CGMZ.Encyclopedia.DisableTouchUISpace || ConfigManager.touchUI;
};
//-----------------------------------------------------------------------------
// Check if the current category has subcategories
//-----------------------------------------------------------------------------
CGMZ_Scene_Encyclopedia.prototype.hasSubcategories = function() {
	const categorySymbol = this._categoryWindow.currentSymbol();
	return $cgmzTemp.hasEncyclopediaSubcategoriesForSymbol(categorySymbol);
};
//-----------------------------------------------------------------------------
// On category OK
//-----------------------------------------------------------------------------
CGMZ_Scene_Encyclopedia.prototype.onCategoryOk = function() {
	if(this.hasSubcategories()) {
		this._subcategoryWindow.show();
		this._subcategoryWindow.activate();
		this._subcategoryWindow.select(0);
		this._subcategoryWindow.ensureCursorVisible(true);
	} else {
		this._dummyWindow.hide();
		this._displayWindow.show();
		this._categoryWindow.deactivate();
		this._listWindow.activate();
		this._listWindow.select(0);
		this._listWindow.ensureCursorVisible(true);
	}
};
//-----------------------------------------------------------------------------
// On subcategory ok
//-----------------------------------------------------------------------------
CGMZ_Scene_Encyclopedia.prototype.onSubcategoryOk = function() {
	this._dummyWindow.hide();
	this._displayWindow.show();
	this._listWindow.setSubcategory(this._subcategoryWindow.subcategory());
    this._listWindow.activate();
	this._listWindow.select(0);
	this._listWindow.ensureCursorVisible(true);
	this._subcategoryWindow.deactivate();
	this._subcategoryWindow.hide();
};
//-----------------------------------------------------------------------------
// On subcategory cancel
//-----------------------------------------------------------------------------
CGMZ_Scene_Encyclopedia.prototype.onSubcategoryCancel = function() {
    this._categoryWindow.activate();
	this._subcategoryWindow.deactivate();
	this._subcategoryWindow.hide();
};
//-----------------------------------------------------------------------------
// On list cancel
//-----------------------------------------------------------------------------
CGMZ_Scene_Encyclopedia.prototype.onListCancel = function() {
	this._dummyWindow.show();
	this._displayWindow.hide();
	this._displayWindow.setItem("clear", null);
	if(this.hasSubcategories()) {
		this._subcategoryWindow.show();
		this._subcategoryWindow.activate();
	} else {
		this._categoryWindow.activate();
	}
	this._listWindow.setSubcategory("all");
	this._listWindow.select(0);
	this._listWindow.ensureCursorVisible(true);
	this._listWindow.deactivate();
	this._listWindow.deselect();
};
//-----------------------------------------------------------------------------
// On list OK
//-----------------------------------------------------------------------------
CGMZ_Scene_Encyclopedia.prototype.onListOk = function() {
	if(this._listWindow.canPlayBGM()) {
		this._savedBGM = AudioManager.saveBgm();
		this._savedBGS = AudioManager.saveBgs();
		AudioManager.playBgm(this._listWindow.getBGMToPlay());
	}
	this._displayWindow.activate();
	this._listWindow.deactivate();
};
//-----------------------------------------------------------------------------
// On display cancel
//-----------------------------------------------------------------------------
CGMZ_Scene_Encyclopedia.prototype.onDisplayCancel = function() {
	if(this._listWindow.canPlayBGM()) {
		(this._savedBGM) ? AudioManager.replayBgm(this._savedBGM) : AudioManager.stopBgm();
		if(this._savedBGS) AudioManager.replayBgs(this._savedBGS);
		this._savedBGM = null;
		this._savedBGS = null;
	}
    this._displayWindow.deactivate();
	this._listWindow.activate();
};
//-----------------------------------------------------------------------------
// Update the scene
//-----------------------------------------------------------------------------
CGMZ_Scene_Encyclopedia.prototype.update = function() {
    Scene_MenuBase.prototype.update.call(this);
	this.updateBackgroundImage();
};
//-----------------------------------------------------------------------------
// Update the background image
//-----------------------------------------------------------------------------
CGMZ_Scene_Encyclopedia.prototype.updateBackgroundImage = function() {
    if(!this._categoryWindow) return;
	const data = this._categoryWindow.currentData();
	if(!data) return;
	const symbol = data.symbol;
	if(!symbol) return;
	if(symbol !== this._symbol) {
		this._symbol = symbol;
		const imageData = this.getBackgroundImageData(symbol);
		if(imageData) {
			this._backgroundCustomSprite.bitmap = ImageManager.loadBitmap(imageData.folder, imageData.filename);
			this._backgroundSprite.hide();
			this._backgroundCustomSprite.show();
		} else {
			this._backgroundCustomSprite.hide();
			this._backgroundSprite.show();
		}
	}
};
//-----------------------------------------------------------------------------
// Get the background image for the given symbol
//-----------------------------------------------------------------------------
CGMZ_Scene_Encyclopedia.prototype.getBackgroundImageData = function(symbol) {
	const imagePath = this._categoryBackgroundMap[symbol];
	if(!imagePath) return null;
	return CGMZ_Utils.getImageData(imagePath, "img/");
};
//=============================================================================
// CGMZ_Window_EncyclopediaCategory
//-----------------------------------------------------------------------------
// Command window for choosing a category in the encyclopedia
//=============================================================================
function CGMZ_Window_EncyclopediaCategory(rect) {
    this.initialize.apply(this, arguments);
}
CGMZ_Window_EncyclopediaCategory.prototype = Object.create(Window_HorzCommand.prototype);
CGMZ_Window_EncyclopediaCategory.prototype.constructor = CGMZ_Window_EncyclopediaCategory;
//-----------------------------------------------------------------------------
// Initialize
//-----------------------------------------------------------------------------
CGMZ_Window_EncyclopediaCategory.prototype.initialize = function(rect) {
	Window_HorzCommand.prototype.initialize.call(this, rect);
	this.setBackgroundType(2 * (CGMZ.Encyclopedia.TransparentWindows));
};
//-----------------------------------------------------------------------------
// Set the window padding
//-----------------------------------------------------------------------------
CGMZ_Window_EncyclopediaCategory.prototype.updatePadding = function() {
    this.padding = CGMZ.Encyclopedia.CategoryWindowPadding;
};
//-----------------------------------------------------------------------------
// Load Proper Windowskin
//-----------------------------------------------------------------------------
CGMZ_Window_EncyclopediaCategory.prototype.loadWindowskin = function() {
	if(CGMZ.Encyclopedia.CategoryWindowskin) {
		const windowskin = CGMZ_Utils.getImageData(CGMZ.Encyclopedia.CategoryWindowskin, "img");
		this.windowskin = ImageManager.loadBitmap(windowskin.folder, windowskin.filename);
	} else {
		Window_HorzCommand.prototype.loadWindowskin.call(this);
	}
};
//-----------------------------------------------------------------------------
// Max columns to display
//-----------------------------------------------------------------------------
CGMZ_Window_EncyclopediaCategory.prototype.maxCols = function() {
    return CGMZ.Encyclopedia.CategoriesPerLine;
};
//-----------------------------------------------------------------------------
// Make list of commands to display
//-----------------------------------------------------------------------------
CGMZ_Window_EncyclopediaCategory.prototype.makeCommandList = function() {
	for(const category of CGMZ.Encyclopedia.Categories) {
		const categoryData = CGMZ_Utils.parseJSON(category, null, "CGMZ Encyclopedia", "One of your categories had invalid JSON and could not be parse: " + category);
		if(categoryData && this.canShowCommand(categoryData)) {
			const name = categoryData["Command Text"];
			const symbol = categoryData["Category Symbol"];
			const ext = categoryData["Category Name"];
			this.addCommand(name, symbol, this.enableEncyclopediaCommand(categoryData), ext);
		}
	}
};
//-----------------------------------------------------------------------------
// Can Show Category?
//-----------------------------------------------------------------------------
CGMZ_Window_EncyclopediaCategory.prototype.canShowCommand = function(categoryData) {
	switch(categoryData["Category Symbol"]) {
		case 'bestiary': if(!CGMZ.Encyclopedia.IncludeBestiary) return false; break;
		case 'items': if(!CGMZ.Encyclopedia.IncludeItems) return false; break;
		case 'armors': if(!CGMZ.Encyclopedia.IncludeArmors) return false; break;
		case 'weapons': if(!CGMZ.Encyclopedia.IncludeWeapons) return false; break;
		case 'skills': if(!CGMZ.Encyclopedia.IncludeSkills) return false; break;
		case 'states': if(!CGMZ.Encyclopedia.IncludeStates) return false; break;
		case 'actors': if(!CGMZ.Encyclopedia.IncludeActors) return false;
	}
	const showReqs = CGMZ_Utils.parseJSON(categoryData["Category Display Requirements"], null, "CGMZ Encyclopedia", "Your category with symbol " + categoryData["Category Symbol"] + " had invalid Display Requirements.");
	if(!showReqs) return true;
	const itemID = Number(showReqs["Item"]);
	const switchID = Number(showReqs["Switch"]);
	if(itemID > 0 && !$gameParty.hasItem($dataItems[itemID])) {
		return false;
	}
	if(switchID > 0 && !$gameSwitches.value(switchID)) {
		return false;
	}
	return true;
};
//-----------------------------------------------------------------------------
// Command Enabled?
//-----------------------------------------------------------------------------
CGMZ_Window_EncyclopediaCategory.prototype.enableEncyclopediaCommand = function(categoryData) {
	const enableReqs = CGMZ_Utils.parseJSON(categoryData["Category Enable Requirements"], null, "CGMZ Encyclopedia", "Your category with symbol " + categoryData["Category Symbol"] + " had invalid Display Requirements.");
	if(!enableReqs) return true;
	const itemID = Number(enableReqs["Item"]);
	const switchID = Number(enableReqs["Switch"]);
	if(itemID && !$gameParty.hasItem($dataItems[itemID])) {
		return false;
	}
	if(switchID && !$gameSwitches.value(switchID)) {
		return false;
	}
	return true;
};
//-----------------------------------------------------------------------------
// Draw the item with text codes
//-----------------------------------------------------------------------------
CGMZ_Window_EncyclopediaCategory.prototype.drawItem = function(index) {
	const rect = this.itemLineRect(index);
	this.resetTextColor();
	this.changePaintOpacity(this.isCommandEnabled(index));
	this.CGMZ_drawTextLine(this.commandName(index), rect.x, rect.y, rect.width, this.itemTextAlign());
};
//-----------------------------------------------------------------------------
// Get the alignment of the text in the window
//-----------------------------------------------------------------------------
CGMZ_Window_EncyclopediaCategory.prototype.itemTextAlign = function() {
	return CGMZ.Encyclopedia.CategoryWindowTextAlignment;
};
//-----------------------------------------------------------------------------
// Set total (helper) window
//-----------------------------------------------------------------------------
CGMZ_Window_EncyclopediaCategory.prototype.setTotalWindow = function(totalWindow) {
	this._totalWindow = totalWindow;
	this.callUpdateHelp();
};
//-----------------------------------------------------------------------------
// Set list (helper) window
//-----------------------------------------------------------------------------
CGMZ_Window_EncyclopediaCategory.prototype.setListWindow = function(listWindow) {
	this._listWindow = listWindow;
	this.callUpdateHelp();
};
//-----------------------------------------------------------------------------
// Set subcategory (helper) window
//-----------------------------------------------------------------------------
CGMZ_Window_EncyclopediaCategory.prototype.setSubcategoryWindow = function(subcategoryWindow) {
	this._subcategoryWindow = subcategoryWindow;
	this.callUpdateHelp();
};
//-----------------------------------------------------------------------------
// See if able to update helper windows
//-----------------------------------------------------------------------------
CGMZ_Window_EncyclopediaCategory.prototype.callUpdateHelp = function() {
	if(this.active) {
		this.updateHelperWindows();
	}
};
//-----------------------------------------------------------------------------
// See if able to update helper windows
//-----------------------------------------------------------------------------
CGMZ_Window_EncyclopediaCategory.prototype.updateHelperWindows = function() {
	if(this._listWindow) {
		this._listWindow.setItem(this.currentData());
	}
	if(this._totalWindow) {
		this._totalWindow.setItem(this.currentData());
	}
	if(this._subcategoryWindow) {
		this._subcategoryWindow.setItem(this.currentData());
	}
};
//=============================================================================
// CGMZ_Window_EncyclopediaSubcategory
//-----------------------------------------------------------------------------
// Command window for choosing a subcategory in the encyclopedia
//=============================================================================
function CGMZ_Window_EncyclopediaSubcategory(rect) {
    this.initialize.apply(this, arguments);
}
CGMZ_Window_EncyclopediaSubcategory.prototype = Object.create(Window_HorzCommand.prototype);
CGMZ_Window_EncyclopediaSubcategory.prototype.constructor = CGMZ_Window_EncyclopediaSubcategory;
//-----------------------------------------------------------------------------
// Initialize
//-----------------------------------------------------------------------------
CGMZ_Window_EncyclopediaSubcategory.prototype.initialize = function(rect) {
	Window_HorzCommand.prototype.initialize.call(this, rect);
	this.deselect();
	this.deactivate();
	this.hide();
	this._categoryId = null;
	this.setBackgroundType(2 * (CGMZ.Encyclopedia.TransparentWindows));
};
//-----------------------------------------------------------------------------
// Set the window padding
//-----------------------------------------------------------------------------
CGMZ_Window_EncyclopediaSubcategory.prototype.updatePadding = function() {
    this.padding = CGMZ.Encyclopedia.SubcategoryWindowPadding;
};
//-----------------------------------------------------------------------------
// Load Proper Windowskin
//-----------------------------------------------------------------------------
CGMZ_Window_EncyclopediaSubcategory.prototype.loadWindowskin = function() {
	if(CGMZ.Encyclopedia.SubcategoryWindowskin) {
		const windowskin = CGMZ_Utils.getImageData(CGMZ.Encyclopedia.SubcategoryWindowskin, "img");
		this.windowskin = ImageManager.loadBitmap(windowskin.folder, windowskin.filename);
	} else {
		Window_HorzCommand.prototype.loadWindowskin.call(this);
	}
};
//-----------------------------------------------------------------------------
// Get the current subcategory
//-----------------------------------------------------------------------------
CGMZ_Window_EncyclopediaSubcategory.prototype.subcategory = function() {
	return this.currentSymbol();
};
//-----------------------------------------------------------------------------
// Max columns to display
//-----------------------------------------------------------------------------
CGMZ_Window_EncyclopediaSubcategory.prototype.maxCols = function() {
	const categoryMap = $cgmzTemp._encyclopediaSubcategoryMap[this._categoryId];
    return (categoryMap) ? Math.min(categoryMap.length + 1 * CGMZ.Encyclopedia.ShowSubcategoryAll, CGMZ.Encyclopedia.SubcategoryColumns) : CGMZ.Encyclopedia.SubcategoryColumns;
};
//-----------------------------------------------------------------------------
// Max columns to display
//-----------------------------------------------------------------------------
CGMZ_Window_EncyclopediaSubcategory.prototype.setItem = function(item) {
	if(!item || item.symbol === this._categoryId) return;
    this._categoryId = item.symbol;
	this.refresh();
};
//-----------------------------------------------------------------------------
// Make list of commands to display
//-----------------------------------------------------------------------------
CGMZ_Window_EncyclopediaSubcategory.prototype.makeCommandList = function() {
	const subcategories = $cgmzTemp._encyclopediaSubcategoryMap[this._categoryId] || [null];
	if(CGMZ.Encyclopedia.ShowSubcategoryAll) this.addCommand(CGMZ.Encyclopedia.SubcategoryAllText, "all", true, "ext");
	for(const subcategoryId of subcategories) {
		if(!subcategoryId) continue;
		const subcategory = $cgmzTemp._encyclopediaSubcategories[subcategoryId];
		if(!subcategory) continue;
		this.addCommand(subcategory.name, subcategoryId, true, subcategory.entryList.clone());
	}
};
//-----------------------------------------------------------------------------
// Draw the item with text codes
//-----------------------------------------------------------------------------
CGMZ_Window_EncyclopediaSubcategory.prototype.drawItem = function(index) {
	const rect = this.itemLineRect(index);
	this.resetTextColor();
	this.changePaintOpacity(true);
	this.CGMZ_drawTextLine(this.commandName(index), rect.x, rect.y, rect.width, this.itemTextAlign());
};
//-----------------------------------------------------------------------------
// Get the alignment of the text in the window
//-----------------------------------------------------------------------------
CGMZ_Window_EncyclopediaSubcategory.prototype.itemTextAlign = function() {
	return CGMZ.Encyclopedia.SubcategoryWindowTextAlignment;
};
//=============================================================================
// CGMZ_Window_EncDummy
//-----------------------------------------------------------------------------
// Dummy window for when not displaying anything
//=============================================================================
function CGMZ_Window_EncDummy(rect) {
    this.initialize.apply(this, arguments);
}
CGMZ_Window_EncDummy.prototype = Object.create(Window_Base.prototype);
CGMZ_Window_EncDummy.prototype.constructor = CGMZ_Window_EncDummy;
//-----------------------------------------------------------------------------
// Initialize
//-----------------------------------------------------------------------------
CGMZ_Window_EncDummy.prototype.initialize = function(rect) {
	Window_Base.prototype.initialize.call(this, rect);
	this.setBackgroundType(2 * (CGMZ.Encyclopedia.TransparentWindows));
};
//-----------------------------------------------------------------------------
// Load Proper Windowskin
//-----------------------------------------------------------------------------
CGMZ_Window_EncDummy.prototype.loadWindowskin = function() {
	if(CGMZ.Encyclopedia.DisplayWindowskin) {
		const windowskin = CGMZ_Utils.getImageData(CGMZ.Encyclopedia.DisplayWindowskin, "img");
		this.windowskin = ImageManager.loadBitmap(windowskin.folder, windowskin.filename);
	} else {
		CGMZ_Window_Scrollable.prototype.loadWindowskin.call(this);
	}
};
//=============================================================================
// CGMZ_Window_EncyclopediaTotals
//-----------------------------------------------------------------------------
// Shows completion % for encyclopedia
//=============================================================================
function CGMZ_Window_EncyclopediaTotals(rect) {
    this.initialize.apply(this, arguments);
}
CGMZ_Window_EncyclopediaTotals.prototype = Object.create(Window_Base.prototype);
CGMZ_Window_EncyclopediaTotals.prototype.constructor = CGMZ_Window_EncyclopediaTotals;
//-----------------------------------------------------------------------------
// Initialize
//-----------------------------------------------------------------------------
CGMZ_Window_EncyclopediaTotals.prototype.initialize = function(rect) {
	Window_Base.prototype.initialize.call(this, rect);
	this.setBackgroundType(2 * (CGMZ.Encyclopedia.TransparentWindows));
	this._symbol = null;
	this._name = null;
};
//-----------------------------------------------------------------------------
// Set the window padding
//-----------------------------------------------------------------------------
CGMZ_Window_EncyclopediaTotals.prototype.updatePadding = function() {
    this.padding = CGMZ.Encyclopedia.TotalWindowPadding;
};
//-----------------------------------------------------------------------------
// Load Proper Windowskin
//-----------------------------------------------------------------------------
CGMZ_Window_EncyclopediaTotals.prototype.loadWindowskin = function() {
	if(CGMZ.Encyclopedia.TotalWindowskin) {
		const windowskin = CGMZ_Utils.getImageData(CGMZ.Encyclopedia.TotalWindowskin, "img");
		this.windowskin = ImageManager.loadBitmap(windowskin.folder, windowskin.filename);
	} else {
		Window_Base.prototype.loadWindowskin.call(this);
	}
};
//-----------------------------------------------------------------------------
// Set Item
//-----------------------------------------------------------------------------
CGMZ_Window_EncyclopediaTotals.prototype.setItem = function(data) {
	if(this._name === data.ext) return;
	this._symbol = data.symbol;
	this._name = data.ext;
	this.refresh();
};
//-----------------------------------------------------------------------------
// Refresh
//-----------------------------------------------------------------------------
CGMZ_Window_EncyclopediaTotals.prototype.refresh = function() {
	this.contents.clear();
	this.drawSpecificCompletion(this._symbol, this._name);
	this.drawTotalCompletion();
};
//-----------------------------------------------------------------------------
// Draw overall completion %
//-----------------------------------------------------------------------------
CGMZ_Window_EncyclopediaTotals.prototype.drawTotalCompletion = function() {
	const totalDiscovered = $cgmz.getEncyclopediaDiscovered('total');
	const totalEntries = $cgmz.getEncyclopediaEntries('total');
	const completion = Number((totalDiscovered/totalEntries)*100).toFixed(CGMZ.Encyclopedia.DecimalSpots);
	const string = "\\c[" + CGMZ.Encyclopedia.LabelColor + "]" + CGMZ.Encyclopedia.TotalText + "\\c[0]" + completion + "%";
	this.CGMZ_drawTextLine(string, 0, this.lineHeight(), this.contents.width, CGMZ.Encyclopedia.TotalWindowAlignment);
};
//-----------------------------------------------------------------------------
// Draw specific category completion
//-----------------------------------------------------------------------------
CGMZ_Window_EncyclopediaTotals.prototype.drawSpecificCompletion = function(symbol, name) {
	const discovered = $cgmz.getEncyclopediaDiscovered(symbol);
	const entries = $cgmz.getEncyclopediaEntries(symbol);
	const completion = Number((discovered/entries)*100).toFixed(CGMZ.Encyclopedia.DecimalSpots);
	const string = "\\c[" + CGMZ.Encyclopedia.LabelColor + "]" + name + ": \\c[0]" + completion + "%";
	this.CGMZ_drawTextLine(string, 0, 0, this.contents.width, CGMZ.Encyclopedia.TotalWindowAlignment);
};
//=============================================================================
// CGMZ_Window_EncyclopediaList
//-----------------------------------------------------------------------------
// Selectable window for choosing an entry in a list.
//=============================================================================
function CGMZ_Window_EncyclopediaList(rect) {
    this.initialize.apply(this, arguments);
}
CGMZ_Window_EncyclopediaList.prototype = Object.create(Window_Selectable.prototype);
CGMZ_Window_EncyclopediaList.prototype.constructor = CGMZ_Window_EncyclopediaList;
//-----------------------------------------------------------------------------
// Initialize
//-----------------------------------------------------------------------------
CGMZ_Window_EncyclopediaList.prototype.initialize = function(rect) {
    Window_Selectable.prototype.initialize.call(this, rect);
	this.setBackgroundType(2 * (CGMZ.Encyclopedia.TransparentWindows));
	this._symbol = null;
	this._subcategory = null;
};
//-----------------------------------------------------------------------------
// Set the window padding
//-----------------------------------------------------------------------------
CGMZ_Window_EncyclopediaList.prototype.updatePadding = function() {
    this.padding = CGMZ.Encyclopedia.ListWindowPadding;
};
//-----------------------------------------------------------------------------
// Load Proper Windowskin
//-----------------------------------------------------------------------------
CGMZ_Window_EncyclopediaList.prototype.loadWindowskin = function() {
	if(CGMZ.Encyclopedia.ListWindowskin) {
		const windowskin = CGMZ_Utils.getImageData(CGMZ.Encyclopedia.ListWindowskin, "img");
		this.windowskin = ImageManager.loadBitmap(windowskin.folder, windowskin.filename);
	} else {
		Window_Selectable.prototype.loadWindowskin.call(this);
	}
};
//-----------------------------------------------------------------------------
// Check if conditions are met for playing battle BGMs for bestiary
//-----------------------------------------------------------------------------
CGMZ_Window_EncyclopediaList.prototype.canPlayBGM = function() {
	return (this._symbol === "bestiary" && this.item() && this.item().isDiscovered && this.item().isDiscovered() && this.hasBGMToPlay());
};
//-----------------------------------------------------------------------------
// Check if default BGM or entry BGM exists
// Only safe to call after verifying symbol is bestiary
//-----------------------------------------------------------------------------
CGMZ_Window_EncyclopediaList.prototype.hasBGMToPlay = function() {
	const itemSettings = $cgmzTemp.getEncyclopediaExtraBestiarySettings(this.item()._id);
	return (!!CGMZ.Encyclopedia.DefaultEnemyBGM || (itemSettings && itemSettings.bgm));
};
//-----------------------------------------------------------------------------
// Play the correct BGM
// Only safe to call after verifying symbol is bestiary
//-----------------------------------------------------------------------------
CGMZ_Window_EncyclopediaList.prototype.getBGMToPlay = function() {
	const itemSettings = $cgmzTemp.getEncyclopediaExtraBestiarySettings(this.item()._id);
	const bgm = (itemSettings && itemSettings.bgm) ? itemSettings.bgm : CGMZ.Encyclopedia.DefaultEnemyBGM;
	return bgm;
};
//-----------------------------------------------------------------------------
// Set Item
//-----------------------------------------------------------------------------
CGMZ_Window_EncyclopediaList.prototype.setItem = function(data) {
	if(this._symbol === data.symbol) return;
	this._symbol = data.symbol;
	this.scrollTo(0, 0);
	this.refresh();
};
//-----------------------------------------------------------------------------
// Set Subcategory
//-----------------------------------------------------------------------------
CGMZ_Window_EncyclopediaList.prototype.setSubcategory = function(symbol) {
	if(this._subcategory === symbol) return;
	this._subcategory = symbol;
	this.scrollTo(0, 0);
	this.refresh();
};
//-----------------------------------------------------------------------------
// Max items
//-----------------------------------------------------------------------------
CGMZ_Window_EncyclopediaList.prototype.maxItems = function() {
    return this._data ? this._data.length : 1;
};
//-----------------------------------------------------------------------------
// Current item
//-----------------------------------------------------------------------------
CGMZ_Window_EncyclopediaList.prototype.item = function() {
    return this._data[this.index()];
};
//-----------------------------------------------------------------------------
// Refresh
//-----------------------------------------------------------------------------
CGMZ_Window_EncyclopediaList.prototype.refresh = function() {
	this.makeItemList();
	Window_Selectable.prototype.refresh.call(this);
};
//-----------------------------------------------------------------------------
// Make item list
//-----------------------------------------------------------------------------
CGMZ_Window_EncyclopediaList.prototype.makeItemList = function() {
	this._data = [];
	let sortOrderArray = [];
	const unfilteredData = $cgmz.getEncyclopediaData(this._symbol);
    const filteredData = unfilteredData.filter(entry => this.filterEntry(entry));
	switch(this._symbol) {
		case 'bestiary': sortOrderArray = CGMZ.Encyclopedia.BestiaryListOrder; break;
		case 'items': sortOrderArray = CGMZ.Encyclopedia.ItemsListOrder; break;
		case 'armors': sortOrderArray = CGMZ.Encyclopedia.ArmorsListOrder; break;
		case 'weapons': sortOrderArray = CGMZ.Encyclopedia.WeaponsListOrder; break;
		case 'skills': sortOrderArray = CGMZ.Encyclopedia.SkillsListOrder; break;
		case 'states': sortOrderArray = CGMZ.Encyclopedia.StatesListOrder; break;
		case 'actors': sortOrderArray = CGMZ.Encyclopedia.ActorsListOrder;
	}
	filteredData.sort((a, b) => {
		const indexA = sortOrderArray.indexOf(a._id);
		const indexB = sortOrderArray.indexOf(b._id);
		if(indexB === -1 && indexA === -1) return 0;
		if(indexA < indexB) return 1;
		return -1;
	});
	this._data = filteredData;
};
//-----------------------------------------------------------------------------
// Make item list
//-----------------------------------------------------------------------------
CGMZ_Window_EncyclopediaList.prototype.filterEntry = function(entry) {
	if(CGMZ.Encyclopedia.HideUndiscovered && !entry._discovered) return false;
	if(this._subcategory) {
		const subcategoryData = $cgmzTemp._encyclopediaSubcategories[this._subcategory];
		if(subcategoryData) {
			if(!subcategoryData.entryList.includes(entry._id)) return false;
		}
	}
	return true;
};
//-----------------------------------------------------------------------------
// Draw item in list
//-----------------------------------------------------------------------------
CGMZ_Window_EncyclopediaList.prototype.drawItem = function(index) {
    const item = this._data[index];
    const rect = this.itemRectWithPadding(index);
	const number = CGMZ.Encyclopedia.NumberEntries ? (index+1) + ". " : "";
	const name = item._discovered ? this.getItemName(this._symbol, item._id) : CGMZ.Encyclopedia.UnknownEntry;
	this.changePaintOpacity(this.isEnabled(item));
	if(CGMZ.Encyclopedia.ListWindowEnableTextCodes) {
		this.CGMZ_drawTextLine(number + name, rect.x, rect.y, rect.width, CGMZ.Encyclopedia.ListWindowTextAlignment);
	} else {
		this.drawText(number + name, rect.x, rect.y, rect.width, CGMZ.Encyclopedia.ListWindowTextAlignment);
	}
};
//-----------------------------------------------------------------------------
// Determine if item is enabled
//-----------------------------------------------------------------------------
CGMZ_Window_EncyclopediaList.prototype.isEnabled = function(item) {
    return item._discovered;
};
//-----------------------------------------------------------------------------
// Get the name of the object
//-----------------------------------------------------------------------------
CGMZ_Window_EncyclopediaList.prototype.getItemName = function(symbol, id) {
    switch(symbol) {
		case 'bestiary': return $dataEnemies[id].name;
		case 'items': return $dataItems[id].name;
		case 'armors': return $dataArmors[id].name;
		case 'weapons': return $dataWeapons[id].name;
		case 'skills': return $dataSkills[id].name;
		case 'states': return $dataStates[id].name;
		case 'actors': return $dataActors[id].name;
		default: const obj = $cgmz.getEncyclopediaObject(symbol, id);
				 return (obj) ? obj._name : CGMZ.Encyclopedia.UnknownEntry;
	}
};
//-----------------------------------------------------------------------------
// Set display window
//-----------------------------------------------------------------------------
CGMZ_Window_EncyclopediaList.prototype.setDisplayWindow = function(displayWindow) {
    this._displayWindow = displayWindow;
    this.callUpdateHelp();
};
//-----------------------------------------------------------------------------
// See if can update display window
//-----------------------------------------------------------------------------
CGMZ_Window_EncyclopediaList.prototype.callUpdateHelp = function() {
    if(this.active && this._displayWindow) {
		this.updateHelp();
	}
};
//-----------------------------------------------------------------------------
// Update display window
//-----------------------------------------------------------------------------
CGMZ_Window_EncyclopediaList.prototype.updateHelp = function() {
    this._displayWindow.setItem(this.item(), this._symbol);
};
//=============================================================================
// CGMZ_Window_EncyclopediaDisplay
//-----------------------------------------------------------------------------
// Shows completion % for encyclopedia
//=============================================================================
function CGMZ_Window_EncyclopediaDisplay(rect) {
    this.initialize.apply(this, arguments);
}
CGMZ_Window_EncyclopediaDisplay.prototype = Object.create(CGMZ_Window_Scrollable.prototype);
CGMZ_Window_EncyclopediaDisplay.prototype.constructor = CGMZ_Window_EncyclopediaDisplay;
//-----------------------------------------------------------------------------
// Initialize
//-----------------------------------------------------------------------------
CGMZ_Window_EncyclopediaDisplay.prototype.initialize = function(rect) {
	const heightMultiplier = 10; // maximum of 5 windows tall of data to scroll
    CGMZ_Window_Scrollable.prototype.initialize.call(this, rect, heightMultiplier, CGMZ.Encyclopedia.ScrollWait, CGMZ.Encyclopedia.ScrollSpeed, CGMZ.Encyclopedia.AutoScroll, CGMZ.Encyclopedia.ScrollDeceleration);
	this.setBackgroundType(2 * (CGMZ.Encyclopedia.TransparentWindows));
	this._data = null;
	this._iconBitmap = ImageManager.loadSystem('IconSet'); //only load this once
	this._largeIconWidth = ImageManager.iconWidth*CGMZ.Encyclopedia.LargeIconMultiplier;
	this._largeIconHeight = ImageManager.iconHeight*CGMZ.Encyclopedia.LargeIconMultiplier;
	this.createContents();
	this.createBattlerSprite();
	this._customSprites = [];
};
//-----------------------------------------------------------------------------
// Create the battler sprite
//-----------------------------------------------------------------------------
CGMZ_Window_EncyclopediaDisplay.prototype.createBattlerSprite = function() {
	this._battlerSprite = new Sprite();
	this._battlerSprite.anchor.x = 0.5;
	this.addInnerChild(this._battlerSprite);
};
//-----------------------------------------------------------------------------
// Set the window padding
//-----------------------------------------------------------------------------
CGMZ_Window_EncyclopediaDisplay.prototype.updatePadding = function() {
    this.padding = CGMZ.Encyclopedia.DisplayWindowPadding;
};
//-----------------------------------------------------------------------------
// Load Proper Windowskin
//-----------------------------------------------------------------------------
CGMZ_Window_EncyclopediaDisplay.prototype.loadWindowskin = function() {
	if(CGMZ.Encyclopedia.DisplayWindowskin) {
		const windowskin = CGMZ_Utils.getImageData(CGMZ.Encyclopedia.DisplayWindowskin, "img");
		this.windowskin = ImageManager.loadBitmap(windowskin.folder, windowskin.filename);
	} else {
		CGMZ_Window_Scrollable.prototype.loadWindowskin.call(this);
	}
};
//-----------------------------------------------------------------------------
// Set Item
//-----------------------------------------------------------------------------
CGMZ_Window_EncyclopediaDisplay.prototype.setItem = function(item, symbol) {
	if(!item || this._data === item) return;
	if(item === "clear") {
		this._data = null;
		this.contents.clear();
		this._neededHeight = 0;
		this.checkForScroll();
		return;
	}
	this._data = item;
	this._symbol = symbol;
	this.refresh();
};
//-----------------------------------------------------------------------------
// Refresh
//-----------------------------------------------------------------------------
CGMZ_Window_EncyclopediaDisplay.prototype.refresh = function() {
	this.setupWindowForNewEntry();
	if(this._data) this.drawEncyclopediaEntry();
};
//-----------------------------------------------------------------------------
// Refresh
//-----------------------------------------------------------------------------
CGMZ_Window_EncyclopediaDisplay.prototype.makeObjectId = function() {
	return (this._data._mainId) ? this._data._mainId : this._data._id;
};
//-----------------------------------------------------------------------------
// Draw Encyclopedia Entry
//-----------------------------------------------------------------------------
CGMZ_Window_EncyclopediaDisplay.prototype.drawEncyclopediaEntry = function() {
	this._battlerSprite.hide();
	for(const sprite of this._customSprites) {
		sprite.hide();
	}
	this._customSketchesLoaded = 0;
	this._customSpriteSlots = 0;
	this._iconDisplacement = {yStart:0,yEnd:0,xStart:0,xEnd:this._largeIconWidth+4,isDisplaced:false};
	this.resetFontSettings();
	if(!this._data.isDiscovered()) {
		this.drawUnknownItem();
	}
	else {
		switch(this._symbol) {
			case 'bestiary': this.loadBestiaryImage(); break;
			case 'items': this.drawItem(); break;
			case 'armors': this.drawArmor(); break;
			case 'weapons':	this.drawWeapon(); break;
			case 'skills': this.drawSkill(); break;
			case 'states': this.drawState(); break;
			case 'actors': this.drawActor(); break;
			default: this.loadCustomImage();
		}
	}
};
//-----------------------------------------------------------------------------
// Draw Encyclopedia Unknown Entry
//-----------------------------------------------------------------------------
CGMZ_Window_EncyclopediaDisplay.prototype.drawUnknownItem = function() {
	this._neededHeight = this.CGMZ_drawText(CGMZ.Encyclopedia.UnknownEntryDisplay, 0, 0, 0, this.contents.width, 'center');
	this._neededHeight += $gameSystem.windowPadding()*2;
	this.checkForScroll();
};
//-----------------------------------------------------------------------------
// Load Bestiary Sketch Image
//-----------------------------------------------------------------------------
CGMZ_Window_EncyclopediaDisplay.prototype.loadBestiaryImage = function() {
	const enemy = $dataEnemies[this.makeObjectId()];
	if ($gameSystem.isSideView()) {
		this._battlerSprite.bitmap = ImageManager.loadSvEnemy(enemy.battlerName);
	} else {
		this._battlerSprite.bitmap = ImageManager.loadEnemy(enemy.battlerName);
	}
	this._battlerSprite.bitmap.addLoadListener(this.drawBestiary.bind(this));
};
//-----------------------------------------------------------------------------
// Draw Bestiary Encyclopedia Entry
//-----------------------------------------------------------------------------
CGMZ_Window_EncyclopediaDisplay.prototype.drawBestiary = function() {
	const enemy = $dataEnemies[this.makeObjectId()];
	const difficulty = (CGMZ.Encyclopedia.ShowDifficultyMods && Imported.CGMZ_Difficulty) ? $cgmzTemp.getDifficulty($cgmz.getDifficulty()) : null;
	this._neededHeight = 0;
	for(const section of CGMZ.Encyclopedia.BestiaryDisplayInfo) {
		switch(section) {
			case "Name":
				this._neededHeight += this.drawEncyclopediaName(enemy.name);
				break;
			case "Stats":
				const params = (difficulty) ? enemy.params.map(param => Math.round(param * difficulty._enemyStatModifier)) : enemy.params;
				this._neededHeight += this.drawEncyclopediaStats(params, false);
				break;
			case "Exp":
				const exp = (difficulty) ? Math.round(enemy.exp * difficulty._enemyExpModifier) : enemy.exp;
				this.drawEncyclopediaBestiaryExpReward(exp);
				this._neededHeight += this.lineHeight();
				break;
			case "Gold":
				const gold = (difficulty) ? Math.round(enemy.gold * difficulty._enemyGoldModifier) : enemy.gold;
				this.drawEncyclopediaBestiaryGoldReward(gold);
				this._neededHeight += this.lineHeight();
				break;
			case "Drops":
				this.drawEncyclopediaBestiaryDrops(enemy.dropItems); // This function takes care of neededHeight
				break;
			case "Skills":
				this.drawEncyclopediaBestiarySkills(enemy.actions); // This function takes care of neededHeight
				break;
			case "Note":
				this._neededHeight += this.drawEncyclopediaMeta(enemy.meta.cgmzdesc);
				break;
			case "Sketch":
				this._neededHeight += this.displayBitmap(enemy.battlerHue);
				break;
			case "Discover Date":
				this.drawEncyclopediaDiscoverDate(this._data._discoverDate);
				this._neededHeight += this.lineHeight();
				break;
			case "Stats Header":
				this.CGMZ_drawHeader(CGMZ.Encyclopedia.BestiaryStatsHeaderText, this._neededHeight, CGMZ.Encyclopedia.HeaderColor1, CGMZ.Encyclopedia.HeaderColor2);
				this._neededHeight += this.lineHeight();
				break;
			case "Drops Header":
				this.CGMZ_drawHeader(CGMZ.Encyclopedia.BestiaryDropsHeaderText, this._neededHeight, CGMZ.Encyclopedia.HeaderColor1, CGMZ.Encyclopedia.HeaderColor2);
				this._neededHeight += this.lineHeight();
				break;
			case "Note Header":
				if(enemy.meta.cgmzdesc) {
					this.CGMZ_drawHeader(CGMZ.Encyclopedia.BestiaryNoteHeaderText, this._neededHeight, CGMZ.Encyclopedia.HeaderColor1, CGMZ.Encyclopedia.HeaderColor2);
					this._neededHeight += this.lineHeight();
				}
				break;
			case "Sketch Header":
				this.CGMZ_drawHeader(CGMZ.Encyclopedia.BestiarySketchHeaderText, this._neededHeight, CGMZ.Encyclopedia.HeaderColor1, CGMZ.Encyclopedia.HeaderColor2);
				this._neededHeight += this.lineHeight();
				break;
			case "Skills Header":
				this.CGMZ_drawHeader(CGMZ.Encyclopedia.BestiarySkillsHeaderText, this._neededHeight, CGMZ.Encyclopedia.HeaderColor1, CGMZ.Encyclopedia.HeaderColor2);
				this._neededHeight += this.lineHeight();
				break;
			case "Blank Line": this._neededHeight += this.lineHeight();
		}
	}
	this._neededHeight += $gameSystem.windowPadding()*2;
	this.checkForScroll();
};
//-----------------------------------------------------------------------------
// Draw Item Encyclopedia Entry
//-----------------------------------------------------------------------------
CGMZ_Window_EncyclopediaDisplay.prototype.drawItem = function() {
	const item = $dataItems[this.makeObjectId()];
	const effectTracker = this.populateEffectTracker(item.effects);
	this._neededHeight = 0;
	for(const section of CGMZ.Encyclopedia.ItemDisplayInfo) {
		switch(section) {
			case "Name":
				this._neededHeight += this.drawEncyclopediaName(item.name);
				break;
			case "Icon":
				this.drawEncyclopediaLargeIcon(item.iconIndex);
				if(CGMZ.Encyclopedia.CenterIcons) {
					this._neededHeight += this._largeIconHeight;
				} else {
					this._iconDisplacement.yStart = this._neededHeight;
					this._iconDisplacement.yEnd = this._neededHeight + this._largeIconHeight;
					this._iconDisplacement.isDisplaced = true;
				}
				break;
			case "Price":
				this.drawEncyclopediaPrice(item.price);
				this._neededHeight += this.lineHeight();
				break;
			case "Key Item":
				this.drawEncyclopediaKeyItem(item.itypeId);
				this._neededHeight += this.lineHeight();
				break;
			case "Possession":
				this.drawEncyclopediaPossession($gameParty.numItems(item));
				this._neededHeight += this.lineHeight();
				break;
			case "Success Rate":
				this.drawEncyclopediaSuccessRate(item.successRate);
				this._neededHeight += this.lineHeight();
				break;
			case "Consumable":
				this.drawEncyclopediaConsumable(item.consumable);
				this._neededHeight += this.lineHeight();
				break;
			case "TP Gain":
				if(item.tpGain) {
					this.drawUserTPGain(item.tpGain);
					this._neededHeight += this.lineHeight();
				}
				break;
			case "Effects":
				if(this.hasEffects(effectTracker)) {
					this.drawEncyclopediaEffects(effectTracker); // This function takes care of needed height itself
				}
				break;
			case "Description":
				this._neededHeight += this.drawEncyclopediaDescription(item.description);
				break;
			case "Note":
				this._neededHeight += this.drawEncyclopediaMeta(item.meta.cgmzdesc);
				break;
			case "Discover Date":
				this.drawEncyclopediaDiscoverDate(this._data._discoverDate);
				this._neededHeight += this.lineHeight();
				break;
			case "Info Header":
				this.CGMZ_drawHeader(CGMZ.Encyclopedia.ItemInfoHeaderText, this._neededHeight, CGMZ.Encyclopedia.HeaderColor1, CGMZ.Encyclopedia.HeaderColor2);
				this._neededHeight += this.lineHeight();
				break;
			case "Effect Header":
				if(this.hasEffects(effectTracker)) {
					this.CGMZ_drawHeader(CGMZ.Encyclopedia.ItemEffectHeaderText, this._neededHeight, CGMZ.Encyclopedia.HeaderColor1, CGMZ.Encyclopedia.HeaderColor2);
					this._neededHeight += this.lineHeight();
				}
				break;
			case "Note Header":
				if(item.meta.cgmzdesc) {
					this.CGMZ_drawHeader(CGMZ.Encyclopedia.ItemNoteHeaderText, this._neededHeight, CGMZ.Encyclopedia.HeaderColor1, CGMZ.Encyclopedia.HeaderColor2);
					this._neededHeight += this.lineHeight();
				}
				break;
			case "Description Header":
				this.CGMZ_drawHeader(CGMZ.Encyclopedia.ItemDescriptionHeaderText, this._neededHeight, CGMZ.Encyclopedia.HeaderColor1, CGMZ.Encyclopedia.HeaderColor2);
				this._neededHeight += this.lineHeight();
				break;
			case "Blank Line": this._neededHeight += this.lineHeight();
		}
	}
	this._neededHeight += $gameSystem.windowPadding()*2;
	this.checkForScroll();
};
//-----------------------------------------------------------------------------
// Draw Armor Encyclopedia Entry
//-----------------------------------------------------------------------------
CGMZ_Window_EncyclopediaDisplay.prototype.drawArmor = function() {
	const armor = $dataArmors[this.makeObjectId()];
	const traitTracker = this.populateTraitTracker(armor.traits);
	this._neededHeight = 0;
	for(const section of CGMZ.Encyclopedia.ArmorDisplayInfo) {
		switch(section) {
			case "Name":
				this._neededHeight += this.drawEncyclopediaName(armor.name);
				break;
			case "Icon":
				this.drawEncyclopediaLargeIcon(armor.iconIndex);
				if(CGMZ.Encyclopedia.CenterIcons) {
					this._neededHeight += this._largeIconHeight;
				} else {
					this._iconDisplacement.yStart = this._neededHeight;
					this._iconDisplacement.yEnd = this._neededHeight + this._largeIconHeight;
					this._iconDisplacement.isDisplaced = true;
				}
				break;
			case "Price":
				this.drawEncyclopediaPrice(armor.price);
				this._neededHeight += this.lineHeight();
				break;
			case "Equip Type":
				this.drawEncyclopediaType($dataSystem.equipTypes[armor.etypeId], 'equip');
				this._neededHeight += this.lineHeight();
				break;
			case "Possession":
				this.drawEncyclopediaPossession($gameParty.numItems(armor));
				this._neededHeight += this.lineHeight();
				break;
			case "Armor Type":
				this.drawEncyclopediaType($dataSystem.armorTypes[armor.atypeId], 'armor');
				this._neededHeight += this.lineHeight();
				break;
			case "Stats":
				this._neededHeight += this.drawEncyclopediaStats(armor.params, true);
				break;
			case "Traits":
				if(this.hasTraits(traitTracker)) {
					this.drawEncyclopediaTrait(traitTracker); // This function takes care of needed height itself
				}
				break;
			case "Description":
				this._neededHeight += this.drawEncyclopediaDescription(armor.description);
				break;
			case "Note":
				this._neededHeight += this.drawEncyclopediaMeta(armor.meta.cgmzdesc);
				break;
			case "Discover Date":
				this.drawEncyclopediaDiscoverDate(this._data._discoverDate);
				this._neededHeight += this.lineHeight();
				break;
			case "Info Header":
				this.CGMZ_drawHeader(CGMZ.Encyclopedia.ArmorInfoHeaderText, this._neededHeight, CGMZ.Encyclopedia.HeaderColor1, CGMZ.Encyclopedia.HeaderColor2);
				this._neededHeight += this.lineHeight();
				break;
			case "Trait Header":
				if(this.hasTraits(traitTracker)) {
					this.CGMZ_drawHeader(CGMZ.Encyclopedia.ArmorTraitHeaderText, this._neededHeight, CGMZ.Encyclopedia.HeaderColor1, CGMZ.Encyclopedia.HeaderColor2);
					this._neededHeight += this.lineHeight();
				}
				break;
			case "Note Header":
				if(armor.meta.cgmzdesc) {
					this.CGMZ_drawHeader(CGMZ.Encyclopedia.ArmorNoteHeaderText, this._neededHeight, CGMZ.Encyclopedia.HeaderColor1, CGMZ.Encyclopedia.HeaderColor2);
					this._neededHeight += this.lineHeight();
				}
				break;
			case "Description Header":
				this.CGMZ_drawHeader(CGMZ.Encyclopedia.ArmorDescriptionHeaderText, this._neededHeight, CGMZ.Encyclopedia.HeaderColor1, CGMZ.Encyclopedia.HeaderColor2);
				this._neededHeight += this.lineHeight();
				break;
			case "Stat Header":
				this.CGMZ_drawHeader(CGMZ.Encyclopedia.ArmorStatHeaderText, this._neededHeight, CGMZ.Encyclopedia.HeaderColor1, CGMZ.Encyclopedia.HeaderColor2);
				this._neededHeight += this.lineHeight();
				break;
			case "Blank Line": this._neededHeight += this.lineHeight();
		}
	}
	this._neededHeight += $gameSystem.windowPadding()*2;
	this.checkForScroll();
};
//-----------------------------------------------------------------------------
// Draw Weapon Encyclopedia Entry
//-----------------------------------------------------------------------------
CGMZ_Window_EncyclopediaDisplay.prototype.drawWeapon = function() {
	const weapon = $dataWeapons[this.makeObjectId()];
	const traitTracker = this.populateTraitTracker(weapon.traits);
	this._neededHeight = 0;
	for(const section of CGMZ.Encyclopedia.WeaponDisplayInfo) {
		switch(section) {
			case "Name":
				this._neededHeight += this.drawEncyclopediaName(weapon.name);
				break;
			case "Icon":
				this.drawEncyclopediaLargeIcon(weapon.iconIndex);
				if(CGMZ.Encyclopedia.CenterIcons) {
					this._neededHeight += this._largeIconHeight;
				} else {
					this._iconDisplacement.yStart = this._neededHeight;
					this._iconDisplacement.yEnd = this._neededHeight + this._largeIconHeight;
					this._iconDisplacement.isDisplaced = true;
				}
				break;
			case "Price":
				this.drawEncyclopediaPrice(weapon.price);
				this._neededHeight += this.lineHeight();
				break;
			case "Equip Type":
				this.drawEncyclopediaType($dataSystem.equipTypes[weapon.etypeId], 'equip');
				this._neededHeight += this.lineHeight();
				break;
			case "Possession":
				this.drawEncyclopediaPossession($gameParty.numItems(weapon));
				this._neededHeight += this.lineHeight();
				break;
			case "Weapon Type":
				this.drawEncyclopediaType($dataSystem.weaponTypes[weapon.wtypeId], 'weapon');
				this._neededHeight += this.lineHeight();
				break;
			case "Stats":
				this._neededHeight += this.drawEncyclopediaStats(weapon.params, true);
				break;
			case "Traits":
				if(this.hasTraits(traitTracker)) {
					this.drawEncyclopediaTrait(traitTracker); // This function takes care of needed height itself
				}
				break;
			case "Description":
				this._neededHeight += this.drawEncyclopediaDescription(weapon.description);
				break;
			case "Note":
				this._neededHeight += this.drawEncyclopediaMeta(weapon.meta.cgmzdesc);
				break;
			case "Discover Date":
				this.drawEncyclopediaDiscoverDate(this._data._discoverDate);
				this._neededHeight += this.lineHeight();
				break;
			case "Info Header":
				this.CGMZ_drawHeader(CGMZ.Encyclopedia.WeaponInfoHeaderText, this._neededHeight, CGMZ.Encyclopedia.HeaderColor1, CGMZ.Encyclopedia.HeaderColor2);
				this._neededHeight += this.lineHeight();
				break;
			case "Trait Header":
				if(this.hasTraits(traitTracker)) {
					this.CGMZ_drawHeader(CGMZ.Encyclopedia.WeaponTraitHeaderText, this._neededHeight, CGMZ.Encyclopedia.HeaderColor1, CGMZ.Encyclopedia.HeaderColor2);
					this._neededHeight += this.lineHeight();
				}
				break;
			case "Note Header":
				if(weapon.meta.cgmzdesc) {
					this.CGMZ_drawHeader(CGMZ.Encyclopedia.WeaponNoteHeaderText, this._neededHeight, CGMZ.Encyclopedia.HeaderColor1, CGMZ.Encyclopedia.HeaderColor2);
					this._neededHeight += this.lineHeight();
				}
				break;
			case "Description Header":
				this.CGMZ_drawHeader(CGMZ.Encyclopedia.WeaponDescriptionHeaderText, this._neededHeight, CGMZ.Encyclopedia.HeaderColor1, CGMZ.Encyclopedia.HeaderColor2);
				this._neededHeight += this.lineHeight();
				break;
			case "Stat Header":
				this.CGMZ_drawHeader(CGMZ.Encyclopedia.WeaponStatHeaderText, this._neededHeight, CGMZ.Encyclopedia.HeaderColor1, CGMZ.Encyclopedia.HeaderColor2);
				this._neededHeight += this.lineHeight();
				break;
			case "Blank Line": this._neededHeight += this.lineHeight();
		}
	}
	this._neededHeight += $gameSystem.windowPadding()*2;
	this.checkForScroll();
};
//-----------------------------------------------------------------------------
// Draw Skill Encyclopedia Entry
//-----------------------------------------------------------------------------
CGMZ_Window_EncyclopediaDisplay.prototype.drawSkill = function() {
	const skill = $dataSkills[this.makeObjectId()];
	const effectTracker = this.populateEffectTracker(skill.effects);
	this._neededHeight = 0;
	for(const section of CGMZ.Encyclopedia.SkillDisplayInfo) {
		switch(section) {
			case "Name":
				this._neededHeight += this.drawEncyclopediaName(skill.name);
				break;
			case "Icon":
				this.drawEncyclopediaLargeIcon(skill.iconIndex);
				if(CGMZ.Encyclopedia.CenterIcons) {
					this._neededHeight += this._largeIconHeight;
				} else {
					this._iconDisplacement.yStart = this._neededHeight;
					this._iconDisplacement.yEnd = this._neededHeight + this._largeIconHeight;
					this._iconDisplacement.isDisplaced = true;
				}
				break;
			case "Type":
				this.drawEncyclopediaType($dataSystem.skillTypes[skill.stypeId], 'skill');
				this._neededHeight += this.lineHeight();
				break;
			case "Costs":
				this.drawSkillCosts(skill.mpCost, skill.tpCost);
				this._neededHeight += this.lineHeight();
				break;
			case "Success Rate":
				this.drawEncyclopediaSuccessRate(skill.successRate);
				this._neededHeight += this.lineHeight();
				break;
			case "TP Gain":
				if(skill.tpGain) {
					this.drawUserTPGain(skill.tpGain);
					this._neededHeight += this.lineHeight();
				}
				break;
			case "Effects":
				if(this.hasEffects(effectTracker)) {
					this.drawEncyclopediaEffects(effectTracker); // This function takes care of needed height itself
				}
				break;
			case "Description":
				this._neededHeight += this.drawEncyclopediaDescription(skill.description);
				break;
			case "Note":
				this._neededHeight += this.drawEncyclopediaMeta(skill.meta.cgmzdesc);
				break;
			case "Discover Date":
				this.drawEncyclopediaDiscoverDate(this._data._discoverDate);
				this._neededHeight += this.lineHeight();
				break;
			case "Info Header":
				this.CGMZ_drawHeader(CGMZ.Encyclopedia.SkillInfoHeaderText, this._neededHeight, CGMZ.Encyclopedia.HeaderColor1, CGMZ.Encyclopedia.HeaderColor2);
				this._neededHeight += this.lineHeight();
				break;
			case "Description Header":
				this.CGMZ_drawHeader(CGMZ.Encyclopedia.SkillDescriptionHeaderText, this._neededHeight, CGMZ.Encyclopedia.HeaderColor1, CGMZ.Encyclopedia.HeaderColor2);
				this._neededHeight += this.lineHeight();
				break;
			case "Effect Header":
				if(this.hasEffects(effectTracker)) {
					this.CGMZ_drawHeader(CGMZ.Encyclopedia.SkillEffectHeaderText, this._neededHeight, CGMZ.Encyclopedia.HeaderColor1, CGMZ.Encyclopedia.HeaderColor2);
					this._neededHeight += this.lineHeight();
				}
				break;
			case "Note Header":
				if(skill.meta.cgmzdesc) {
					this.CGMZ_drawHeader(CGMZ.Encyclopedia.SkillNoteHeaderText, this._neededHeight, CGMZ.Encyclopedia.HeaderColor1, CGMZ.Encyclopedia.HeaderColor2);
					this._neededHeight += this.lineHeight();
				}
				break;
			case "Blank Line": this._neededHeight += this.lineHeight();
		}
	}
	this._neededHeight += $gameSystem.windowPadding()*2;
	this.checkForScroll();
};
//-----------------------------------------------------------------------------
// Draw State Encyclopedia Entry
//-----------------------------------------------------------------------------
CGMZ_Window_EncyclopediaDisplay.prototype.drawState = function() {
	const state = $dataStates[this.makeObjectId()];
	const traitTracker = this.populateTraitTracker(state.traits);
	this._neededHeight = 0;
	for(const section of CGMZ.Encyclopedia.StateDisplayInfo) {
		switch(section) {
			case "Name":
				this._neededHeight += this.drawEncyclopediaName(state.name);
				break;
			case "Icon":
				this.drawEncyclopediaLargeIcon(state.iconIndex);
				if(CGMZ.Encyclopedia.CenterIcons) {
					this._neededHeight += this._largeIconHeight;
				} else {
					this._iconDisplacement.yStart = this._neededHeight;
					this._iconDisplacement.yEnd = this._neededHeight + this._largeIconHeight;
					this._iconDisplacement.isDisplaced = true;
				}
				break;
			case "Duration":
				this.drawStateDuration(state.autoRemovalTiming, state.minTurns, state.maxTurns);
				this._neededHeight += this.lineHeight();
				break;
			case "Battle End Removal":
				this.drawStateRemoval(state.removeAtBattleEnd, CGMZ.Encyclopedia.BattleRemovalText);
				this._neededHeight += this.lineHeight();
				break;
			case "Walking Removal":
				this.drawStateRemoval(state.removeByWalking, CGMZ.Encyclopedia.WalkingRemovalText);
				this._neededHeight += this.lineHeight();
				break;
			case "Damage Removal":
				this.drawStateRemoval(state.removeByDamage, CGMZ.Encyclopedia.DamageRemovalText);
				this._neededHeight += this.lineHeight();
				break;
			case "Traits":
				if(this.hasTraits(traitTracker)) {
					this.drawEncyclopediaTrait(traitTracker); // This function takes care of needed height itself
				}
				break;
			case "Note":
				this._neededHeight += this.drawEncyclopediaMeta(state.meta.cgmzdesc);
				break;
			case "Discover Date":
				this.drawEncyclopediaDiscoverDate(this._data._discoverDate);
				this._neededHeight += this.lineHeight();
				break;
			case "Info Header":
				this.CGMZ_drawHeader(CGMZ.Encyclopedia.StateInfoHeaderText, this._neededHeight, CGMZ.Encyclopedia.HeaderColor1, CGMZ.Encyclopedia.HeaderColor2);
				this._neededHeight += this.lineHeight();
				break;
			case "Trait Header":
				if(this.hasTraits(traitTracker)) {
					this.CGMZ_drawHeader(CGMZ.Encyclopedia.StateTraitHeaderText, this._neededHeight, CGMZ.Encyclopedia.HeaderColor1, CGMZ.Encyclopedia.HeaderColor2);
					this._neededHeight += this.lineHeight();
				}
				break;
			case "Note Header":
				if(state.meta.cgmzdesc) {
					this.CGMZ_drawHeader(CGMZ.Encyclopedia.StateNoteHeaderText, this._neededHeight, CGMZ.Encyclopedia.HeaderColor1, CGMZ.Encyclopedia.HeaderColor2);
					this._neededHeight += this.lineHeight();
				}
				break;
			case "Blank Line": this._neededHeight += this.lineHeight();
		}
	}
	this._neededHeight += $gameSystem.windowPadding()*2;
	this.checkForScroll();
};
//-----------------------------------------------------------------------------
// Draw Actor Encyclopedia Entry
//-----------------------------------------------------------------------------
CGMZ_Window_EncyclopediaDisplay.prototype.drawActor = function() {
	const actorData = $dataActors[this.makeObjectId()];
	const actorGame = $gameActors.actor(this.makeObjectId());
	const traitTracker = this.populateTraitTracker(actorData.traits);
	this._neededHeight = 0;
	for(const section of CGMZ.Encyclopedia.ActorDisplayInfo) {
		switch(section) {
			case "Name":
				this._neededHeight += this.drawEncyclopediaName(actorGame.name());
				break;
			case "Face":
				this.drawEncyclopediaActorFace(actorGame.faceName(), actorGame.faceIndex());
				if(CGMZ.Encyclopedia.CenterIcons) {
					this._neededHeight += 144;
				} else {
					this._iconDisplacement.yStart = this._neededHeight;
					this._iconDisplacement.yEnd = this._neededHeight + 140;
					this._iconDisplacement.xEnd = 148; // 4px padding
					this._iconDisplacement.isDisplaced = true;
				}
				break;
			case "Nickname":
				this.drawEncyclopediaNickname(actorGame.nickname());
				this._neededHeight += this.lineHeight();
				break;
			case "Class":
				this.drawEncyclopediaClass(actorGame.currentClass().name);
				this._neededHeight += this.lineHeight();
				break;
			case "Initial Level":
				this.drawEncyclopediaActorLevel(actorData.initialLevel, CGMZ.Encyclopedia.InitialLevelText);
				this._neededHeight += this.lineHeight();
				break;
			case "Max Level":
				this.drawEncyclopediaActorLevel(actorData.maxLevel, CGMZ.Encyclopedia.MaxLevelText);
				this._neededHeight += this.lineHeight();
				break;
			case "Profile":
				this._neededHeight += this.drawEncyclopediaActorProfile(actorGame.profile());
				break;
			case "Stats":
				const stats = [actorGame.paramBase(0),actorGame.paramBase(1),actorGame.paramBase(2),actorGame.paramBase(3),actorGame.paramBase(4),actorGame.paramBase(5),actorGame.paramBase(6),actorGame.paramBase(7)];
				this._neededHeight += this.drawEncyclopediaStats(stats, false);
				break;
			case "Traits":
				if(this.hasTraits(traitTracker)) {
					this.drawEncyclopediaTrait(traitTracker); // This function takes care of needed height itself
				}
				break;
			case "Note":
				this._neededHeight += this.drawEncyclopediaMeta(actorData.meta.cgmzdesc);
				break;
			case "Discover Date":
				this.drawEncyclopediaDiscoverDate(this._data._discoverDate);
				this._neededHeight += this.lineHeight();
				break;
			case "Info Header":
				this.CGMZ_drawHeader(CGMZ.Encyclopedia.ActorInfoHeaderText, this._neededHeight, CGMZ.Encyclopedia.HeaderColor1, CGMZ.Encyclopedia.HeaderColor2);
				this._neededHeight += this.lineHeight();
				break;
			case "Stat Header":
				this.CGMZ_drawHeader(CGMZ.Encyclopedia.ActorStatHeaderText, this._neededHeight, CGMZ.Encyclopedia.HeaderColor1, CGMZ.Encyclopedia.HeaderColor2);
				this._neededHeight += this.lineHeight();
				break;
			case "Trait Header":
				if(this.hasTraits(traitTracker)) {
					this.CGMZ_drawHeader(CGMZ.Encyclopedia.ActorTraitHeaderText, this._neededHeight, CGMZ.Encyclopedia.HeaderColor1, CGMZ.Encyclopedia.HeaderColor2);
					this._neededHeight += this.lineHeight();
				}
				break;
			case "Note Header":
				if(actorData.meta.cgmzdesc) {
					this.CGMZ_drawHeader(CGMZ.Encyclopedia.ActorNoteHeaderText, this._neededHeight, CGMZ.Encyclopedia.HeaderColor1, CGMZ.Encyclopedia.HeaderColor2);
					this._neededHeight += this.lineHeight();
				}
				break;
			case "Blank Line": this._neededHeight += this.lineHeight();
		}
	}
	this._neededHeight += $gameSystem.windowPadding()*2;
	this.checkForScroll();
};
//-----------------------------------------------------------------------------
// Load Custom Encyclopedia Entry Sketch Image
// Also support legacy custom entry sketch (not array)
//-----------------------------------------------------------------------------
CGMZ_Window_EncyclopediaDisplay.prototype.loadCustomImage = function() {
	if(this.hasCustomImages(this._data._sketch)) {
		if(Array.isArray(this._data._sketch)) {
			for(const sketch of this._data._sketch) {
				const imageData = $cgmzTemp.getImageData(sketch);
				if(this._customSprites[this._customSpriteSlots]) {
					const sprite = this._customSprites[this._customSpriteSlots];
					sprite.bitmap = ImageManager.loadBitmap(imageData.folder, imageData.filename);
					sprite.bitmap.addLoadListener(this.onCustomImageLoaded.bind(this));
				} else {
					const sprite = new Sprite();
					sprite.anchor.x = 0.5;
					sprite.bitmap = ImageManager.loadBitmap(imageData.folder, imageData.filename);
					this._customSprites.push(sprite);
					sprite.bitmap.addLoadListener(this.onCustomImageLoaded.bind(this));
					this.addInnerChild(sprite);
				}
				this._customSpriteSlots++;
			}
		} else { // Legacy custom image handling
			const imageData = $cgmzTemp.getImageData(this._data._sketch);
			if(imageData.folder.contains('img/img')) {
				imageData.folder = imageData.folder.substring(4, imageData.folder.length);
			}
			this._battlerSprite.bitmap = ImageManager.loadBitmap(imageData.folder, imageData.filename);
			this._battlerSprite.bitmap.addLoadListener(this.drawCustom.bind(this));
		}
	} else {
		this.drawCustom();
	}
};
//-----------------------------------------------------------------------------
// Check if the custom entry has images
//-----------------------------------------------------------------------------
CGMZ_Window_EncyclopediaDisplay.prototype.hasCustomImages = function(sketch) {
	if(Array.isArray(sketch)) return sketch.length > 0;
	return !!sketch
};
//-----------------------------------------------------------------------------
// On custom image loaded - load all custom images before draw
//-----------------------------------------------------------------------------
CGMZ_Window_EncyclopediaDisplay.prototype.onCustomImageLoaded = function() {
	this._customSketchesLoaded++;
	if(this._data && this._data._sketch && this._customSketchesLoaded >= this._data._sketch.length) this.drawCustom();
};
//-----------------------------------------------------------------------------
// Draw Custom Encyclopedia Entry
//-----------------------------------------------------------------------------
CGMZ_Window_EncyclopediaDisplay.prototype.drawCustom = function() {
	if(this._data._mainId) { // check if should instead draw main category object
		switch(this._data._mainType) {
			case 'enemy': this.loadBestiaryImage(); break;
			case 'item': this.drawItem(); break;
			case 'weapon': this.drawWeapon(); break;
			case 'armor': this.drawArmor(); break;
			case 'skill': this.drawSkill(); break;
			case 'state': this.drawState(); break;
			case 'actor': this.drawActor(); break;
		}
		return;
	} // end draw main category object
	this._neededHeight = 0;
	let customInfo = 0;
	let customHeader = 0;
	const descRegex = /\\cgmzencdescimg\[([0-9]+)\]/g;
	const descriptionImages = [...this._data._description.matchAll(descRegex)].map(obj => Number(obj[1]));
	for(const section of CGMZ.Encyclopedia.CustomDisplayInfo) {
		switch(section) {
			case "Name":
				const name = this._data._displayName || this._data._name;
				this._neededHeight += this.drawEncyclopediaName(name);
				break;
			case "Description":
				this._neededHeight += this.drawCustomDescription(this._data._description, descriptionImages);
				this.resetFontSettings();
				break;
			case "Sketch":
				if(Array.isArray(this._data._sketch)) {
					this._neededHeight += this.displayCustomSketches(descriptionImages);
				} else if(this._data._sketch) { // Legacy sketch handling
					this._neededHeight += this.displayBitmap(0);
				}
				break;
			case "Discover Date":
				this.drawEncyclopediaDiscoverDate(this._data._discoverDate);
				this._neededHeight += this.lineHeight();
				break;
			case "Custom Info":
				if(this._data._customInfo[customInfo]) {
					this._neededHeight += this.CGMZ_drawText(this._data._customInfo[customInfo++], 0, 0, this._neededHeight, this.contents.width, "left");
					this.resetFontSettings();
				}
				break;
			case "Sketch Header":
				if(this.hasCustomImages(this._data._sketch)) {
					this.CGMZ_drawHeader(CGMZ.Encyclopedia.CustomSketchHeaderText, this._neededHeight, CGMZ.Encyclopedia.HeaderColor1, CGMZ.Encyclopedia.HeaderColor2);
					this._neededHeight += this.lineHeight();
				}
				break;
			case "Description Header":
				if(this._data._description) {
					this.CGMZ_drawHeader(CGMZ.Encyclopedia.CustomDescriptionHeaderText, this._neededHeight, CGMZ.Encyclopedia.HeaderColor1, CGMZ.Encyclopedia.HeaderColor2);
					this._neededHeight += this.lineHeight();
				}
				break;
			case "Custom Header":
				if(this._data._customHeaders[customHeader]) {
					this.CGMZ_drawHeader(this._data._customHeaders[customHeader++], this._neededHeight, CGMZ.Encyclopedia.HeaderColor1, CGMZ.Encyclopedia.HeaderColor2);
					this._neededHeight += this.lineHeight();
				}
				break;
			case "Blank Line": this._neededHeight += this.lineHeight();
		}
	}
	this._neededHeight += $gameSystem.windowPadding()*2;
	this.checkForScroll();
};
//-----------------------------------------------------------------------------
// Adjust available width for icon displacement (if any)
//-----------------------------------------------------------------------------
CGMZ_Window_EncyclopediaDisplay.prototype.adjustWidthForIconDisplacement = function(width = this.contents.width) {
	if(!this._iconDisplacement.isDisplaced) return width;
	if(this._neededHeight >= this._iconDisplacement.yStart && this._neededHeight <= this._iconDisplacement.yEnd) {
		return width - this._iconDisplacement.xEnd;
	}
	return width;
};
//-----------------------------------------------------------------------------
// Adjust starting x for icon displacement (if any)
//-----------------------------------------------------------------------------
CGMZ_Window_EncyclopediaDisplay.prototype.adjustXForIconDisplacement = function(x = 0) {
	if(!this._iconDisplacement.isDisplaced) return x;
	if(this._neededHeight >= this._iconDisplacement.yStart && this._neededHeight <= this._iconDisplacement.yEnd) {
		return x + this._iconDisplacement.xEnd;
	}
	return x;
};
//-----------------------------------------------------------------------------
// Draw "name" of entry in bold
//-----------------------------------------------------------------------------
CGMZ_Window_EncyclopediaDisplay.prototype.drawEncyclopediaName = function(name) {
	const width = this.adjustWidthForIconDisplacement();
	const x = this.adjustXForIconDisplacement();
	this.contents.fontBold = true;
	const outputHeight = this.CGMZ_drawTextLine(name, x, this._neededHeight, width, 'center');
	this.contents.fontBold = false;
	return outputHeight;
};
//-----------------------------------------------------------------------------
// Draws a standard Encyclopedia line - used for all categories
//-----------------------------------------------------------------------------
CGMZ_Window_EncyclopediaDisplay.prototype.drawEncyclopediaStandardLine = function(label, descriptor, x, y, width) {
	const totalString = '\\c[' + CGMZ.Encyclopedia.LabelColor + ']' + label + '\\c[0]' + descriptor;
	this.CGMZ_drawTextLine(totalString, x, y, width, 'left');
};
//-----------------------------------------------------------------------------
// Draw label / header text
//-----------------------------------------------------------------------------
CGMZ_Window_EncyclopediaDisplay.prototype.drawLabel = function(label, x, y, alignment = "left") {
	this.changeTextColor(ColorManager.textColor(CGMZ.Encyclopedia.LabelColor));
	this.drawText(label, x, y, this.contents.width - x, alignment);
	this.changeTextColor(ColorManager.normalColor());
};
//-----------------------------------------------------------------------------
// Draws text array with descriptor in first line.
// Makes sure to have enough space for each item.
// Returns total output height
//-----------------------------------------------------------------------------
CGMZ_Window_EncyclopediaDisplay.prototype.drawTextArray = function(label, array, separator = " ") {
	this.drawLabel(label, 0, this._neededHeight);
	const xOffset = this.textWidth(label);
	const string = array.join(separator);
	const outputHeight = this.CGMZ_drawText(string, 0, xOffset, this._neededHeight, this.contents.width);
	return outputHeight;
};
//-----------------------------------------------------------------------------
// Draw Items (skill, state, etc) - Draws skills with icon with enough space on line
// Returns output height
//-----------------------------------------------------------------------------
CGMZ_Window_EncyclopediaDisplay.prototype.drawItemNames = function(label, x, width, itemIds, symbol) {
	const itemStrings = [];
	for(const itemId of itemIds) {
		const item = (symbol === 'skill') ? $dataSkills[itemId] : $dataStates[itemId];
		const stringRepresentation = "\\i[" + item.iconIndex + "]" + item.name;
		itemStrings.push(stringRepresentation);
	}
	this.drawLabel(label, x, this._neededHeight);
	const xOffset = x + this.textWidth(label)
	const string = itemStrings.join(", ");
	const outputHeight = this.CGMZ_drawText(string, x, xOffset, this._neededHeight, width);
	return outputHeight;
};
//-----------------------------------------------------------------------------
// Draw Actor Face - used for actor
//-----------------------------------------------------------------------------
CGMZ_Window_EncyclopediaDisplay.prototype.drawEncyclopediaActorFace = function(faceName, faceIndex) {
	const bitmap = ImageManager.loadFace(faceName);
	const pw = ImageManager.faceWidth;
    const ph = ImageManager.faceHeight;
	const dx = CGMZ.Encyclopedia.CenterIcons ? (this.contents.width / 2) - (pw / 2) : 0;
	const dy = this._neededHeight;
	const sx = Math.floor((faceIndex % 4) * pw);
    const sy = Math.floor(Math.floor(faceIndex / 4) * ph);
    this.contents.blt(bitmap, sx, sy, pw, ph, dx, dy);
};
//-----------------------------------------------------------------------------
// Draw Large icon - used for item, armor, weapon, skill, state.
//-----------------------------------------------------------------------------
CGMZ_Window_EncyclopediaDisplay.prototype.drawEncyclopediaLargeIcon = function(iconIndex) {
	const bitmap = this._iconBitmap;
	const pw = ImageManager.iconWidth;
    const ph = ImageManager.iconHeight;
    const sx = (iconIndex % 16) * pw;
    const sy = Math.floor(iconIndex / 16) * ph;
	const dw = this._largeIconWidth;
	const dh = this._largeIconHeight;
	const x = CGMZ.Encyclopedia.CenterIcons ? (this.contents.width / 2) - (dw / 2) : 0;
	const y = this._neededHeight;
    this.contents.blt(bitmap, sx, sy, pw, ph, x, y, dw, dh);
};
//-----------------------------------------------------------------------------
// Draw Discover Date - used by everything
//-----------------------------------------------------------------------------
CGMZ_Window_EncyclopediaDisplay.prototype.drawEncyclopediaDiscoverDate = function(date) {
	const x = this.adjustXForIconDisplacement();
	const width = this.adjustWidthForIconDisplacement();
	const dateText = (date) ? date : CGMZ.Encyclopedia.UnknownDateText;
	this.drawEncyclopediaStandardLine(CGMZ.Encyclopedia.DiscoverDateText, dateText, x, this._neededHeight, width);
};
//-----------------------------------------------------------------------------
// Draw Nickname - used for actor
//-----------------------------------------------------------------------------
CGMZ_Window_EncyclopediaDisplay.prototype.drawEncyclopediaNickname = function(nickname) {
	const x = this.adjustXForIconDisplacement();
	const width = this.adjustWidthForIconDisplacement();
	this.drawEncyclopediaStandardLine(CGMZ.Encyclopedia.NicknameText, nickname, x, this._neededHeight, width);
};
//-----------------------------------------------------------------------------
// Draw Class - used for actor
//-----------------------------------------------------------------------------
CGMZ_Window_EncyclopediaDisplay.prototype.drawEncyclopediaClass = function(className) {
	const x = this.adjustXForIconDisplacement();
	const width = this.adjustWidthForIconDisplacement();
	this.drawEncyclopediaStandardLine(CGMZ.Encyclopedia.ClassText, className, x, this._neededHeight, width);
};
//-----------------------------------------------------------------------------
// Draw Actor Level - used for actor
//-----------------------------------------------------------------------------
CGMZ_Window_EncyclopediaDisplay.prototype.drawEncyclopediaActorLevel = function(level, descriptor) {
	const x = this.adjustXForIconDisplacement();
	const width = this.adjustWidthForIconDisplacement();
	this.drawEncyclopediaStandardLine(descriptor, level, x, this._neededHeight, width);
};
//-----------------------------------------------------------------------------
// Draw Actor Level - used for actor
//-----------------------------------------------------------------------------
CGMZ_Window_EncyclopediaDisplay.prototype.drawEncyclopediaActorProfile = function(profile) {
	const x = this.adjustXForIconDisplacement();
	const width = this.adjustWidthForIconDisplacement();
	const string = '\\c[' + CGMZ.Encyclopedia.LabelColor + ']' + CGMZ.Encyclopedia.ProfileText + '\\c[0]' + profile; 
	const drawnHeight = this.CGMZ_drawText(string, x, x, this._neededHeight, width, 'left');
	return drawnHeight;
};
//-----------------------------------------------------------------------------
// Draw Price - used for item, armor, weapon
//-----------------------------------------------------------------------------
CGMZ_Window_EncyclopediaDisplay.prototype.drawEncyclopediaPrice = function(price) {
	const x = this.adjustXForIconDisplacement();
	const width = this.adjustWidthForIconDisplacement();
	const descriptor = (price == 0) ? CGMZ.Encyclopedia.NoPriceText : $cgmzTemp.numberSplit(price) + " " + TextManager.currencyUnit;
	this.drawEncyclopediaStandardLine(CGMZ.Encyclopedia.PriceText, descriptor, x, this._neededHeight, width);
};
//-----------------------------------------------------------------------------
// Draw Key item - used for item
//-----------------------------------------------------------------------------
CGMZ_Window_EncyclopediaDisplay.prototype.drawEncyclopediaKeyItem = function(itype) {
	const x = this.adjustXForIconDisplacement();
	const width = this.adjustWidthForIconDisplacement();
	const descriptor = (itype == 2) ? CGMZ.Encyclopedia.YesText : CGMZ.Encyclopedia.NoText;
	this.drawEncyclopediaStandardLine(CGMZ.Encyclopedia.KeyItemText, descriptor, x, this._neededHeight, width);
};
//-----------------------------------------------------------------------------
// Draw Type - Used for armor, weapon, skill
//-----------------------------------------------------------------------------
CGMZ_Window_EncyclopediaDisplay.prototype.drawEncyclopediaType = function(typeName, typeSymbol) {
	let descriptor = CGMZ.Encyclopedia.EquipTypeText;
	switch(typeSymbol) {
		case 'armor':
			descriptor = CGMZ.Encyclopedia.ArmorTypeText;
			if(!typeName) typeName = CGMZ.Encyclopedia.NoArmorTypeText;
			break;
		case 'weapon':
			descriptor = CGMZ.Encyclopedia.WeaponTypeText;
			if(!typeName) typeName = CGMZ.Encyclopedia.NoWeaponTypeText;
			break;
		case 'skill':
			descriptor = CGMZ.Encyclopedia.SkillTypeText;
			if(!typeName) typeName = CGMZ.Encyclopedia.NoSkillTypeText;
	}
	const x = this.adjustXForIconDisplacement();
	const width = this.adjustWidthForIconDisplacement();
	this.drawEncyclopediaStandardLine(descriptor, typeName, x, this._neededHeight, width);
};
//-----------------------------------------------------------------------------
// Draw Possession - used for item, weapon, armor
//-----------------------------------------------------------------------------
CGMZ_Window_EncyclopediaDisplay.prototype.drawEncyclopediaPossession = function(amount) {
	const x = this.adjustXForIconDisplacement();
	const width = this.adjustWidthForIconDisplacement();
	const descriptor = $cgmzTemp.numberSplit(amount);
	this.drawEncyclopediaStandardLine(CGMZ.Encyclopedia.PossessionText, descriptor, x, this._neededHeight, width);
};
//-----------------------------------------------------------------------------
// Draw Stats - used by weapon, armors, bestiary, actor
//-----------------------------------------------------------------------------
CGMZ_Window_EncyclopediaDisplay.prototype.drawEncyclopediaStats = function(params, useSign) {
	const width = this.contents.width / 2; // 2 column display
	const statArray = ["Max HP","Max MP","Attack","Defense","M Attack","M Defense","Agility","Luck"];
	let outputHeight = 0;
	let i = 0;
	for(const stat of CGMZ.Encyclopedia.StatDisplayInfo) {
		outputHeight = this.lineHeight()*(Math.trunc(i/2));
		const statId = statArray.indexOf(stat);
		const x = (i%2 == 0) ? 0 : width;
		const descriptor1 = TextManager.param(statId) + ": ";
		const descriptor2 = $cgmzTemp.numberSplit(params[statId]);
		const sign = (useSign && params[statId] > 0) ? "+" : "";
		this.drawEncyclopediaStandardLine(descriptor1, sign + descriptor2, x, this._neededHeight + outputHeight, width);
		i++;
	}
	outputHeight += this.lineHeight();
	return outputHeight;
};
//-----------------------------------------------------------------------------
// Draw exp drop of an enemy - used by the Bestiary
//-----------------------------------------------------------------------------
CGMZ_Window_EncyclopediaDisplay.prototype.drawEncyclopediaBestiaryExpReward = function(exp) {
	const descriptor1 = TextManager.basic(8) + ": "; // full EXP string (not abbr)
	const descriptor2 = $cgmzTemp.numberSplit(exp);
	this.drawEncyclopediaStandardLine(descriptor1, descriptor2, 0, this._neededHeight, this.contents.width);
};
//-----------------------------------------------------------------------------
// Draw gold drop of an enemy - used by the Bestiary
//-----------------------------------------------------------------------------
CGMZ_Window_EncyclopediaDisplay.prototype.drawEncyclopediaBestiaryGoldReward = function(gold) {
	const descriptor1 = (TextManager.currencyUnit).trim() + ": ";
	const descriptor2 = $cgmzTemp.numberSplit(gold);
	this.drawEncyclopediaStandardLine(descriptor1, descriptor2, 0, this._neededHeight, this.contents.width);
};
//-----------------------------------------------------------------------------
// Draw enemy skills - used by the Bestiary
//-----------------------------------------------------------------------------
CGMZ_Window_EncyclopediaDisplay.prototype.drawEncyclopediaBestiarySkills = function(skills) {
	let i = 1;
	for(const skillData of skills) {
		const skill = $dataSkills[skillData.skillId];
		if(!skill) continue;
		let string = skill.name;
		if(skill.iconIndex > 0) string = '\\i[' + skill.iconIndex + ']' + string;
		if(CGMZ.Encyclopedia.NumberBestiarySkills) string = '\\c[' + CGMZ.Encyclopedia.LabelColor + ']' + i + CGMZ.Encyclopedia.BestiarySkillNumberSeparator + '\\c[0]' + string;
		this.CGMZ_drawTextLine(string, 0, this._neededHeight, this.contents.width, 'left');
		this._neededHeight += this.lineHeight();
		i++;
	}
};
//-----------------------------------------------------------------------------
// Draw dropped items of an enemy - Always used by Bestiary
// This function takes care of window's neededHeight
//-----------------------------------------------------------------------------
CGMZ_Window_EncyclopediaDisplay.prototype.drawEncyclopediaBestiaryDrops = function(drops) {
	const width = this.contents.width / 2;
	for(const drop of drops) {
		if(drop.kind === 0) continue;
		let item = null;
		switch(drop.kind) {
			case 1: item = $dataItems[drop.dataId]; break;
			case 2: item = $dataWeapons[drop.dataId]; break;
			case 3: item = $dataArmors[drop.dataId];
		}
		let x = 0;
		this.drawItemName(item, x, this._neededHeight, width);
		if(CGMZ.Encyclopedia.ShowDropChances) {
			x = width;
			this.drawLabel(CGMZ.Encyclopedia.DropChanceText, x, this._neededHeight);
			x += this.textWidth(CGMZ.Encyclopedia.DropChanceText);
			const descriptor = ((1/drop.denominator)*100).toFixed(2) + "%";
			this.drawText(descriptor, x, this._neededHeight, this.contents.width, 'left');
		}
		this._neededHeight += this.lineHeight();
	}
};
//-----------------------------------------------------------------------------
// Draws meta note if applicable. Returns output height
// <cgmzdesc:Description Here>
//-----------------------------------------------------------------------------
CGMZ_Window_EncyclopediaDisplay.prototype.drawEncyclopediaMeta = function(meta) {
	if(!meta) return 0;
	this.drawLabel(CGMZ.Encyclopedia.NoteText, 0, this._neededHeight);
	const xOffset = this.textWidth(CGMZ.Encyclopedia.NoteText);
	const outputHeight = this.CGMZ_drawText(meta, 0, xOffset, this._neededHeight, this.contents.width, 'left');
	return outputHeight;
};
//-----------------------------------------------------------------------------
// Draws description if applicable. Returns y-value past last line.
//-----------------------------------------------------------------------------
CGMZ_Window_EncyclopediaDisplay.prototype.drawEncyclopediaDescription = function(description) {
	if(!description) return 0;
	this.drawLabel(CGMZ.Encyclopedia.DescriptionText, 0, this._neededHeight);
	if(CGMZ.Encyclopedia.StripNewlinesInDescription) {
		description = description.replace(/(\r\n|\n|\r)/gm, " ");
	}
	const xOffset = this.textWidth(CGMZ.Encyclopedia.DescriptionText);
	const outputHeight = this.CGMZ_drawText(description, 0, xOffset, this._neededHeight, this.contents.width, 'left');
	return outputHeight;
};
//-----------------------------------------------------------------------------
// Draws success rate of an item - used for item entries
//-----------------------------------------------------------------------------
CGMZ_Window_EncyclopediaDisplay.prototype.drawEncyclopediaSuccessRate = function(rate) {
	const x = this.adjustXForIconDisplacement();
	const width = this.adjustWidthForIconDisplacement();
	this.drawEncyclopediaStandardLine(CGMZ.Encyclopedia.SuccessRateText, rate + "%", x, this._neededHeight, width);
};
//-----------------------------------------------------------------------------
// Draws whether item is consumed on use - used for item entries
//-----------------------------------------------------------------------------
CGMZ_Window_EncyclopediaDisplay.prototype.drawEncyclopediaConsumable = function(consumable) {
	const x = this.adjustXForIconDisplacement();
	const width = this.adjustWidthForIconDisplacement();
	const descriptor = consumable ? CGMZ.Encyclopedia.YesText : CGMZ.Encyclopedia.NoText;
	this.drawEncyclopediaStandardLine(CGMZ.Encyclopedia.ConsumableText, descriptor, x, this._neededHeight, width);
};
//-----------------------------------------------------------------------------
// Draws item effects as needed - used for item entries
// Returns y value after drawing the last effect
//-----------------------------------------------------------------------------
CGMZ_Window_EncyclopediaDisplay.prototype.drawEncyclopediaEffects = function(tracker) {
	const x = 0;
	const width = this.contents.width;
	let descriptor1 = "";
	let descriptor2 = "";
	let sign = "";
	for(const section of CGMZ.Encyclopedia.EffectDisplayInfo) {
		switch(section) {
			case "HP Effect":
				if(tracker.HPv1 || tracker.HPv2) {
					descriptor1 = CGMZ.Encyclopedia.HPEffectText;
					if(tracker.HPv1 > 100) tracker.HPv1 = 100;
					if(tracker.HPv1 < -100) tracker.HPv1 = -100;
					if(tracker.HPv1 && tracker.HPv2) {
						sign = (tracker.HPv2 > 0) ? "+ " : "- ";
						descriptor2 = tracker.HPv1 + "% " + sign + $cgmzTemp.numberSplit(Math.abs(tracker.HPv2));
					} else if(tracker.HPv1) {
						descriptor2 = tracker.HPv1 + "%";
						if(tracker.HPv1 > 0) descriptor2 = "+" + descriptor2;
					} else {
						descriptor2 = $cgmzTemp.numberSplit(tracker.HPv2);
						if(tracker.HPv2 > 0) descriptor2 = "+" + descriptor2;
					}
					this.drawEncyclopediaStandardLine(descriptor1, descriptor2, x, this._neededHeight, width);
					this._neededHeight += this.lineHeight();
				}
				break;
			case "MP Effect":
				if(tracker.MPv1 || tracker.MPv2) {
					descriptor1 = CGMZ.Encyclopedia.MPEffectText;
					if(tracker.MPv1 > 100) tracker.MPv1 = 100;
					if(tracker.MPv1 < -100) tracker.MPv1 = -100;
					if(tracker.MPv1 && tracker.MPv2) {
						sign = (tracker.MPv2 > 0) ? "+ " : "- ";
						descriptor2 = tracker.MPv1 + "% " + sign + $cgmzTemp.numberSplit(Math.abs(tracker.MPv2));
					} else if(tracker.MPv1) {
						descriptor2 = tracker.MPv1 + "%";
						if(tracker.MPv1 > 0) descriptor2 = "+" + descriptor2;
					} else {
						descriptor2 = $cgmzTemp.numberSplit(tracker.MPv2);
						if(tracker.MPv2 > 0) descriptor2 = "+" + descriptor2;
					}
					this.drawEncyclopediaStandardLine(descriptor1, descriptor2, x, this._neededHeight, width);
					this._neededHeight += this.lineHeight();
				}
				break;
			case "TP Effect":
				if(tracker.TP != 0) {
					descriptor1 = CGMZ.Encyclopedia.TPEffectText;
					descriptor2 = $cgmzTemp.numberSplit(tracker.TP);
					if(tracker.TP > 0) descriptor2 = "+" + descriptor2;
					this.drawEncyclopediaStandardLine(descriptor1, descriptor2, x, this._neededHeight, width);
					this._neededHeight += this.lineHeight();
				}
				break;
			case "State Add":
				if(tracker.ADDSTATE.length > 0) {
					this._neededHeight += this.drawItemNames(CGMZ.Encyclopedia.AddStateText, x, width, tracker.ADDSTATE, 'state');
				}
				break;
			case "State Remove":
				if(tracker.REMOVESTATE.length > 0) {
					this._neededHeight += this.drawItemNames(CGMZ.Encyclopedia.RemoveStateText, x, width, tracker.REMOVESTATE, 'state');
				}
				break;
			case "Buff":
				if(tracker.BUFFS.length > 0) {
					this._neededHeight += this.drawBuffParameters(CGMZ.Encyclopedia.AddBuffText, x, width, tracker.BUFFS);
				}
				break;
			case "Debuff":
				if(tracker.DEBUFFS.length > 0) {
					this._neededHeight += this.drawBuffParameters(CGMZ.Encyclopedia.AddDebuffText, x, width, tracker.DEBUFFS);
				}
				break;
			case "Remove Buff":
				if(tracker.REMOVEDBUFFS.length > 0) {
					this._neededHeight += this.drawBuffParameters(CGMZ.Encyclopedia.BuffRemovalText, x, width, tracker.REMOVEDBUFFS);
				}
				break;
			case "Remove Debuff":
				if(tracker.REMOVEDDEBUFFS.length > 0) {
					this._neededHeight += this.drawBuffParameters(CGMZ.Encyclopedia.DebuffRemovalText, x, width, tracker.REMOVEDDEBUFFS);
				}
				break;
			case "Grow":
				if(tracker.GROW.length > 0) {
					this._neededHeight += this.drawBuffParameters(CGMZ.Encyclopedia.GrowText, x, width, tracker.GROW);
				}
				break;
			case "Learn":
				if(tracker.LEARNS.length > 0) {
					this._neededHeight += this.drawItemNames(CGMZ.Encyclopedia.LearnSkillText, x, width, tracker.LEARNS, 'skill');
				}
		}
	}
};
//-----------------------------------------------------------------------------
// Returns a tracker object of all item effects
//-----------------------------------------------------------------------------
CGMZ_Window_EncyclopediaDisplay.prototype.populateEffectTracker = function(effects) {
	let tracker = {"HPv1": 0, "HPv2": 0, "MPv1": 0, "MPv2": 0, "TP": 0, "ADDSTATE": [], "REMOVESTATE": [], "BUFFS": [], "DEBUFFS": [],
				   "REMOVEDBUFFS": [], "REMOVEDDEBUFFS": [], "GROW": [], "LEARNS": []};
	for(const effect of effects) {
		switch(effect.code) {
			// HP Effect
			case 11: 
				if(CGMZ.Encyclopedia.EffectDisplayInfo.includes("HP Effect")) {
					tracker.HPv1 += effect.value1*100;
			        tracker.HPv2 += effect.value2;
				}
				break;
			// MP Effect
			case 12:
				if(CGMZ.Encyclopedia.EffectDisplayInfo.includes("MP Effect")) {
					tracker.MPv1 += effect.value1*100;
					tracker.MPv2 += effect.value2;
				}
				break;
			// TP Effect
			case 13:
				if(CGMZ.Encyclopedia.EffectDisplayInfo.includes("TP Effect")) tracker.TP += effect.value1;
				break;
			// Add State effect
			case 21: if(effect.dataId && CGMZ.Encyclopedia.EffectDisplayInfo.includes("State Add")) tracker.ADDSTATE.push(effect.dataId);
					 break;
			// Remove State effect
			case 22: if(effect.dataId && CGMZ.Encyclopedia.EffectDisplayInfo.includes("State Remove")) tracker.REMOVESTATE.push(effect.dataId);
					 break;
			// Add buff effect
			case 31: 
				if(CGMZ.Encyclopedia.EffectDisplayInfo.includes("Buff")) tracker.BUFFS.push(effect.dataId);
				break;
			// Add debuff effect
			case 32:
				if(CGMZ.Encyclopedia.EffectDisplayInfo.includes("Debuff")) tracker.DEBUFFS.push(effect.dataId);
				break;
			// Remove buff effect
			case 33:
				if(CGMZ.Encyclopedia.EffectDisplayInfo.includes("Remove Buff")) tracker.REMOVEDBUFFS.push(effect.dataId);
				break;
			// Remove debuff effect
			case 34:
				if(CGMZ.Encyclopedia.EffectDisplayInfo.includes("Remove Debuff")) tracker.REMOVEDDEBUFFS.push(effect.dataId);
				break;
			// Grow effect
			case 42:
				if(CGMZ.Encyclopedia.EffectDisplayInfo.includes("Grow")) tracker.GROW.push(effect.dataId);
				break;
			// Learn Skill effect
			case 43: if(CGMZ.Encyclopedia.EffectDisplayInfo.includes("Learn")) tracker.LEARNS.push(effect.dataId);
		}
	}
	return tracker;
};
//-----------------------------------------------------------------------------
// Check if has effects to draw
//-----------------------------------------------------------------------------
CGMZ_Window_EncyclopediaDisplay.prototype.hasEffects = function(tracker) {
	return (tracker.HPv1 || tracker.HPv2 || tracker.MPv1 || tracker.MPv2 || tracker.TP ||  tracker.ADDSTATE.length > 0 ||
			tracker.REMOVESTATE.length > 0 || tracker.BUFFS.length > 0 || tracker.DEBUFFS.length > 0 || tracker.REMOVEDBUFFS.length > 0 ||
			tracker.REMOVEDDEBUFFS.length > 0 || tracker.GROW.length > 0 || tracker.LEARNS.length > 0);
};
//-----------------------------------------------------------------------------
// Draw Buff Parameters - Draws buffs/debuffs with enough space on line
// Returns y value below last line drawn
//-----------------------------------------------------------------------------
CGMZ_Window_EncyclopediaDisplay.prototype.drawBuffParameters = function(label, x, width, buffArray) {
	this.drawLabel(label, x, this._neededHeight);
	const xOffset = x + this.textWidth(label);
	const string = buffArray.map(buffId => TextManager.param(buffId)).join(", ");
	const outputHeight = this.CGMZ_drawText(string, x, xOffset, this._neededHeight, width);
	return outputHeight;
};
//-----------------------------------------------------------------------------
// Check if has traits to draw
//-----------------------------------------------------------------------------
CGMZ_Window_EncyclopediaDisplay.prototype.hasTraits = function(tracker) {
	return (tracker.ATKSPEED || tracker.ATKTIMES || tracker.ATKELEMENT.length > 0 || tracker.ATKSTATES.length > 0 ||
			tracker.PARTYABILITY.length > 0 || tracker.ADDSKILLTYPES.length > 0 || tracker.SEALSKILLTYPES.length > 0 || 
			tracker.ADDSKILLS.length > 0 || tracker.SEALSKILLS.length > 0 || tracker.STATERESIST.length > 0);
};
//-----------------------------------------------------------------------------
// Draw Trait - draws a trait such as attack element or party ability
//-----------------------------------------------------------------------------
CGMZ_Window_EncyclopediaDisplay.prototype.drawEncyclopediaTrait = function(tracker) {
	for(const section of CGMZ.Encyclopedia.TraitDisplayInfo) {
		switch(section) {
			case "Attack Speed":
				if(tracker.ATKSPEED) {
					this.drawEncyclopediaStandardLine(CGMZ.Encyclopedia.AttackSpeedText, tracker.ATKSPEED, 0, this._neededHeight, this.contents.width);
					this._neededHeight += this.lineHeight();
				}
				break;
			case "Attack Times":
				if(tracker.ATKTIMES) {
					this.drawEncyclopediaStandardLine(CGMZ.Encyclopedia.AttackTimesText, tracker.ATKTIMES, 0, this._neededHeight, this.contents.width);
					this._neededHeight += this.lineHeight();
				}
				break;
			case "Attack Element":
				if(tracker.ATKELEMENT.length > 0) {
					this._neededHeight += this.drawTextArray(CGMZ.Encyclopedia.ElementText, tracker.ATKELEMENT, ", ");
				}
				break;
			case "Attack States":
				if(tracker.ATKSTATES.length > 0) {
					this._neededHeight += this.drawItemNames(CGMZ.Encyclopedia.AttackStateText, 0, this.contents.width, tracker.ATKSTATES, 'state');
				}
				break;
			case "Party Ability":
				if(tracker.PARTYABILITY.length > 0) {
					this._neededHeight += this.drawTextArray(CGMZ.Encyclopedia.PartyAbilityText, tracker.PARTYABILITY, ", ");
				}
				break;
			case "Seal Skill Types":
				if(tracker.SEALSKILLTYPES.length > 0) {
					this._neededHeight += this.drawTextArray(CGMZ.Encyclopedia.SealSkillTypesText, tracker.SEALSKILLTYPES, ", ");
				}
				break;
			case "Add Skill Types":
				if(tracker.ADDSKILLTYPES.length > 0) {
					this._neededHeight += this.drawTextArray(CGMZ.Encyclopedia.AddSkillTypesText, tracker.ADDSKILLTYPES, ", ");
				}
				break;
			case "Add Skills":
				if(tracker.ADDSKILLS.length > 0) {
					this._neededHeight += this.drawItemNames(CGMZ.Encyclopedia.AddSkillText, 0, this.contents.width, tracker.ADDSKILLS, 'skill');
				}
				break;
			case "Seal Skills":
				if(tracker.SEALSKILLS.length > 0) {
					this._neededHeight += this.drawItemNames(CGMZ.Encyclopedia.SealSkillText, 0, this.contents.width, tracker.SEALSKILLS, 'skill');
				}
				break;
			case "State Resist":
				if(tracker.STATERESIST.length > 0) {
					this._neededHeight += this.drawItemNames(CGMZ.Encyclopedia.StateResistText, 0, this.contents.width, tracker.STATERESIST, 'state');
				}
		}
	}
};
//-----------------------------------------------------------------------------
// Returns a tracker object of all traits on an object
//-----------------------------------------------------------------------------
CGMZ_Window_EncyclopediaDisplay.prototype.populateTraitTracker = function(traits) {
	const tracker = {"ATKSPEED": 0, "ATKTIMES": 0, "ATKELEMENT": [], "ATKSTATES": [], "PARTYABILITY": [],
				   "ADDSKILLTYPES": [], "SEALSKILLTYPES": [], "ADDSKILLS": [], "SEALSKILLS": [], "STATERESIST": []};
	for(const trait of traits) {
		switch(trait.code) {
			// Attack Element
			case 31:
				if(CGMZ.Encyclopedia.TraitDisplayInfo.includes("Attack Element")) tracker.ATKELEMENT.push($dataSystem["elements"][trait.dataId]);
				break;
			// Attack State
			case 32:
				if(CGMZ.Encyclopedia.TraitDisplayInfo.includes("Attack States")) tracker.ATKSTATES.push(trait.dataId);
				break;
			// Attack Speed
			case 33:
				if(CGMZ.Encyclopedia.TraitDisplayInfo.includes("Attack Speed")) tracker.ATKSPEED += trait.value;
				break;
			// Attack Times
			case 34:
				if(CGMZ.Encyclopedia.TraitDisplayInfo.includes("Attack Times")) tracker.ATKTIMES += trait.value;
				break;
			// Add Skill Type
			case 41:
				if(CGMZ.Encyclopedia.TraitDisplayInfo.includes("Add Skill Types")) tracker.ADDSKILLTYPES.push($dataSystem.skillTypes[trait.dataId]);
				break;
			// Seal Skill Type
			case 42: 
				if(CGMZ.Encyclopedia.TraitDisplayInfo.includes("Seal Skill Types")) tracker.SEALSKILLTYPES.push($dataSystem.skillTypes[trait.dataId]);
				break;
			// Add Skill
			case 43:
				if(CGMZ.Encyclopedia.TraitDisplayInfo.includes("Add Skills")) tracker.ADDSKILLS.push(trait.dataId);
				break;
			// Seal Skill
			case 44:
				if(CGMZ.Encyclopedia.TraitDisplayInfo.includes("Seal Skills")) tracker.SEALSKILLS.push(trait.dataId);
				break;
			// State Resist
			case 14:
				if(CGMZ.Encyclopedia.TraitDisplayInfo.includes("State Resist")) tracker.STATERESIST.push(trait.dataId);
				break;
			// party ability
			case 64:
				if(CGMZ.Encyclopedia.TraitDisplayInfo.includes("Party Ability")) {
					switch(trait.dataId) {
						case 0: tracker.PARTYABILITY.push(CGMZ.Encyclopedia.HalfEncounterText); break;
						case 1: tracker.PARTYABILITY.push(CGMZ.Encyclopedia.NoEncounterText); break; break;
						case 3: tracker.PARTYABILITY.push(CGMZ.Encyclopedia.RaisePreemptiveText); break;
						case 4: tracker.PARTYABILITY.push(CGMZ.Encyclopedia.GoldDoubleText); break;
						case 5: tracker.PARTYABILITY.push(CGMZ.Encyclopedia.DropItemDoubleText);
					}
				}
		}
	}
	return tracker;
};
//-----------------------------------------------------------------------------
// Draws skill tp and mp costs - used for skill entries
//-----------------------------------------------------------------------------
CGMZ_Window_EncyclopediaDisplay.prototype.drawSkillCosts = function(mpCost, tpCost) {
	let x = this.adjustXForIconDisplacement();
	let width = this.adjustWidthForIconDisplacement();
	const descriptor1 = $cgmzTemp.numberSplit(mpCost);
	const descriptor2 = $cgmzTemp.numberSplit(tpCost);
	this.drawEncyclopediaStandardLine(CGMZ.Encyclopedia.MPCostText, descriptor1, x, this._neededHeight, width);
	this._neededHeight += this.lineHeight();
	x = this.adjustXForIconDisplacement();
	width = this.adjustWidthForIconDisplacement();
	this.drawEncyclopediaStandardLine(CGMZ.Encyclopedia.TPCostText, descriptor2, x, this._neededHeight, width);
};
//-----------------------------------------------------------------------------
// Draws skill tp gain - used for skill/item entries
//-----------------------------------------------------------------------------
CGMZ_Window_EncyclopediaDisplay.prototype.drawUserTPGain = function(tpGain) {
	const x = this.adjustXForIconDisplacement();
	const width = this.adjustWidthForIconDisplacement();
	const descriptor = $cgmzTemp.numberSplit(tpGain);
	this.drawEncyclopediaStandardLine(CGMZ.Encyclopedia.UserTPGainText, descriptor, x, this._neededHeight, width);
};
//-----------------------------------------------------------------------------
// Draw generic state removal (battle/turn/walk)
//-----------------------------------------------------------------------------
CGMZ_Window_EncyclopediaDisplay.prototype.drawStateRemoval = function(removed, descriptor) {
	const x = this.adjustXForIconDisplacement();
	const width = this.adjustWidthForIconDisplacement();
	const descriptor2 = (removed) ? CGMZ.Encyclopedia.YesText : CGMZ.Encyclopedia.NoText;
	this.drawEncyclopediaStandardLine(descriptor, descriptor2, x, this._neededHeight, width);
};
//-----------------------------------------------------------------------------
// Draw auto removal (turns)
//-----------------------------------------------------------------------------
CGMZ_Window_EncyclopediaDisplay.prototype.drawStateDuration = function(auto, min, max) {
	const x = this.adjustXForIconDisplacement();
	const width = this.adjustWidthForIconDisplacement();
	let descriptor = "";
	if(auto) {
		descriptor = (min == max) ? min + " " + CGMZ.Encyclopedia.TurnsText : min + " - " + max + " " + CGMZ.Encyclopedia.TurnsText;
	} else {
		descriptor =  CGMZ.Encyclopedia.InfiniteText;
	}
	this.drawEncyclopediaStandardLine(CGMZ.Encyclopedia.DurationText, descriptor, x, this._neededHeight, width);
};
//-----------------------------------------------------------------------------
// Draws custom description. Some additional parsing required.
//-----------------------------------------------------------------------------
CGMZ_Window_EncyclopediaDisplay.prototype.drawCustomDescription = function(description, imagesArray) {
	if(!description) return 0;
	const descRegex = /\\cgmzencdescimg\[[0-9]+\]/g;
	description = description.split(descRegex);
	this.drawLabel(CGMZ.Encyclopedia.DescriptionText, 0, this._neededHeight);
	let xOffset = this.textWidth(CGMZ.Encyclopedia.DescriptionText);
	let outputHeight = 0;
	for(let i = 0; i < description.length; i++) {
		outputHeight += this.CGMZ_drawText(description[i], 0, xOffset, this._neededHeight + outputHeight, this.contents.width, 'left');
		if(imagesArray.length > 0 && i < imagesArray.length) {
			const imgId = imagesArray[i];
			let scale = 1;
			if(this._customSprites[imgId].width > this.contents.width) {
				scale = this.contents.width / this._customSprites[imgId].width;
			}
			this._customSprites[imgId].scale.x = scale;
			this._customSprites[imgId].scale.y = scale;
			this._customSprites[imgId].y = this._neededHeight + outputHeight;
			this._customSprites[imgId].x = this.contents.width / 2;
			this._customSprites[imgId].show();
			outputHeight += this._customSprites[imgId].height * scale;
		}
		xOffset = 0;
	}
	return outputHeight;
};
//-----------------------------------------------------------------------------
// Draws custom/bestiary sketch image as sprite.
// Only legacy custom images. New custom images use displayCustomSketches
//-----------------------------------------------------------------------------
CGMZ_Window_EncyclopediaDisplay.prototype.displayBitmap = function(hue) {
	let scale = 1;
	if(this._battlerSprite.width > this.contents.width) {
		scale = this.contents.width / this._battlerSprite.width;
	}
	this._battlerSprite.scale.x = scale;
	this._battlerSprite.scale.y = scale;
	this._battlerSprite.y = this._neededHeight;
	this._battlerSprite.x = this.contents.width / 2;
	this._battlerSprite.setHue(hue);
	this._battlerSprite.show();
	return this._battlerSprite.height * scale;
};
//-----------------------------------------------------------------------------
// Draws custom sketches as sprites. Returns total output height of sketches
//-----------------------------------------------------------------------------
CGMZ_Window_EncyclopediaDisplay.prototype.displayCustomSketches = function(imagesToHide) {
	if(!this._data || !this._data._sketch) return 0;
	let outputHeight = 0;
	for(let i = 0; i < this._data._sketch.length; i++) {
		if(imagesToHide.includes(i)) continue;
		let scale = 1;
		if(this._customSprites[i].width > this.contents.width) {
			scale = this.contents.width / this._customSprites[i].width;
		}
		this._customSprites[i].scale.x = scale;
		this._customSprites[i].scale.y = scale;
		this._customSprites[i].y = this._neededHeight + outputHeight;
		this._customSprites[i].x = this.contents.width / 2;
		this._customSprites[i].show();
		outputHeight += this._customSprites[i].height * scale + $gameSystem.windowPadding();
	}
	return outputHeight;
};
//=============================================================================
// BattleManager
//-----------------------------------------------------------------------------
// Discover enemies automatically
//=============================================================================
//-----------------------------------------------------------------------------
// Alias. Discover the enemies when battle starts
//-----------------------------------------------------------------------------
const alias_CGMZ_Encyclopedia_BattleManager_setup = BattleManager.setup;
BattleManager.setup = function(troopId, canEscape, canLose) {
    alias_CGMZ_Encyclopedia_BattleManager_setup.call(this, troopId, canEscape, canLose);
	if(CGMZ.Encyclopedia.AutodiscoverBestiary) {
		$cgmz.EncyclopediaDiscoverTroop(troopId);
	}
};
//-----------------------------------------------------------------------------
// Alias. Discover the enemies when a turn starts
//-----------------------------------------------------------------------------
const alias_CGMZ_Encyclopedia_BattleManager_startTurn = BattleManager.startTurn;
BattleManager.startTurn = function() {
    alias_CGMZ_Encyclopedia_BattleManager_startTurn.call(this);
	if(CGMZ.Encyclopedia.AutodiscoverBestiary) {
		$gameTroop.members().forEach((enemy) => {
			$cgmz.encyclopediaDiscovery("bestiary", enemy._enemyId);
		});
	}
};
//-----------------------------------------------------------------------------
// Alias. Discover enemies when they are the target of an attack or they attack
//-----------------------------------------------------------------------------
const alias_CGMZ_Encyclopedia_BattleManager_invokeAction = BattleManager.invokeAction;
BattleManager.invokeAction = function(subject, target) {
	alias_CGMZ_Encyclopedia_BattleManager_invokeAction.call(this, subject, target);
	if(CGMZ.Encyclopedia.AutodiscoverBestiary) {
		if(target.isEnemy()) {
			$cgmz.encyclopediaDiscovery("bestiary", target._enemyId);
		} else if(subject.isEnemy()) {
			$cgmz.encyclopediaDiscovery("bestiary", subject._enemyId);
		}
	}
};
//=============================================================================
// Game_Party
//-----------------------------------------------------------------------------
// Discover items, weapons, armors automatically. Discover actors automatically
//=============================================================================
//-----------------------------------------------------------------------------
// Discover items, weapons, armors when party gains them.
//-----------------------------------------------------------------------------
const alias_CGMZ_Encyclopedia_GameParty_gainItem = Game_Party.prototype.gainItem;
Game_Party.prototype.gainItem = function(item, amount, includeEquip) {
	alias_CGMZ_Encyclopedia_GameParty_gainItem.call(this, item, amount, includeEquip);
    if (DataManager.isItem(item) && CGMZ.Encyclopedia.AutodiscoverItems) {
        $cgmz.EncyclopediaDiscoverItem(item.id, "item");
    } else if (DataManager.isWeapon(item) && CGMZ.Encyclopedia.AutodiscoverWeapons) {
        $cgmz.EncyclopediaDiscoverItem(item.id, "weapon");
    } else if (DataManager.isArmor(item) && CGMZ.Encyclopedia.AutodiscoverArmors) {
        $cgmz.EncyclopediaDiscoverItem(item.id, "armor");
    }
};
//-----------------------------------------------------------------------------
// Discover actors when the party gains them
//-----------------------------------------------------------------------------
const alias_CGMZ_Encyclopedia_GameParty_addActor = Game_Party.prototype.addActor;
Game_Party.prototype.addActor = function(actorId) {
    alias_CGMZ_Encyclopedia_GameParty_addActor.apply(this, arguments);
	if(CGMZ.Encyclopedia.AutodiscoverActors) {
		$cgmz.EncyclopediaDiscoverActor(actorId);
	}
};
//=============================================================================
// Game_Actor
//-----------------------------------------------------------------------------
// Discover skills automatically
//=============================================================================
//-----------------------------------------------------------------------------
// Alias. Discover skills when actor learns skill.
//-----------------------------------------------------------------------------
const alias_CGMZ_Encyclopedia_GameActor_learnSkill = Game_Actor.prototype.learnSkill;
Game_Actor.prototype.learnSkill = function(skillId) {
    alias_CGMZ_Encyclopedia_GameActor_learnSkill.call(this, skillId);
	if(CGMZ.Encyclopedia.AutodiscoverSkills) {
		$cgmz.EncyclopediaDiscoverSkill(skillId);
	}
};
//=============================================================================
// Game_Battler
//-----------------------------------------------------------------------------
// Discover states automatically
//=============================================================================
//-----------------------------------------------------------------------------
// Alias. Discover state when actor or enemy afflicted with one
//-----------------------------------------------------------------------------
const alias_CGMZ_Encyclopedia_GameBattler_addState = Game_Battler.prototype.addState;
Game_Battler.prototype.addState = function(stateId) {
	alias_CGMZ_Encyclopedia_GameBattler_addState.call(this, stateId);
    if(this.isStateAddable(stateId) && CGMZ.Encyclopedia.AutodiscoverStates) {
        $cgmz.EncyclopediaDiscoverState(stateId);
    }
};
//=============================================================================
// Game_Action
//-----------------------------------------------------------------------------
// Discover skills automatically when used
//=============================================================================
//-----------------------------------------------------------------------------
// Discover skill when used
//-----------------------------------------------------------------------------
const alias_CGMZ_Encyclopedia_GameAction_apply = Game_Action.prototype.apply;
Game_Action.prototype.apply = function(target) {
	if(CGMZ.Encyclopedia.AutodiscoverSkillsOnUse && this._item && this.isSkill()) {
		$cgmz.EncyclopediaDiscoverSkill(this._item._itemId);
	}
	alias_CGMZ_Encyclopedia_GameAction_apply.apply(this, arguments);
};