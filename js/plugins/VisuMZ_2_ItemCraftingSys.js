//=============================================================================
// VisuStella MZ - Item Crafting System
// VisuMZ_2_ItemCraftingSys.js
//=============================================================================

var Imported = Imported || {};
Imported.VisuMZ_2_ItemCraftingSys = true;

var VisuMZ = VisuMZ || {};
VisuMZ.ItemCraftingSys = VisuMZ.ItemCraftingSys || {};
VisuMZ.ItemCraftingSys.version = 1.25;

//=============================================================================
 /*:
 * @target MZ
 * @plugindesc [RPG Maker MZ] [Tier 2] [Version 1.25] [ItemCraftingSys]
 * @author VisuStella
 * @url http://www.yanfly.moe/wiki/Item_Crafting_System_VisuStella_MZ
 * @base VisuMZ_1_ItemsEquipsCore
 * @orderAfter VisuMZ_1_ItemsEquipsCore
 *
 * @help
 * ============================================================================
 * Introduction
 * ============================================================================
 *
 * Item crafting has become a common feature in many RPG's. However, it is not
 * a feature included by default with RPG Maker MZ. This plugin adds in a scene
 * that supports item crafting, either through the main menu, or through an
 * event initiated command.
 * 
 * Craftable items are normally all available by default, but they can be
 * barred away through switch requirements. Upon crafting items, switches can
 * also be turned on/off to make a progression system if desired.
 * 
 * Item ingredients can be items, weapons, armors, and cost gold as well.
 * Multiple ingredients can be required at a time or just one. Some items can
 * also be set to only be craftable at custom crafting areas.
 *
 * Features include all (but not limited to) the following:
 * 
 * * Adds an item crafting scene to the game.
 * * Item crafting scene can be accessible from the Main Menu or through
 *   event-based Plugin Commands.
 * * Crafting ingredients can consist of items, weapons, armors, and gold.
 * * Crafting specific items can require switches to be turned on in order to
 *   be listed in the crafting list.
 * * Upon crafting specific items, they can also turn on/off other switches,
 *   making a progression system to be possible.
 * * Custom item crafting effects can occur for those who understand JavaScript
 *   to implement.
 * * This plugin can mask the names of uncrafted items, too.
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
 * - VisuMZ_1_ItemsEquipsCore
 *
 * This plugin requires the above listed plugins to be installed inside your
 * game's Plugin Manager list in order to work. You cannot start your game with
 * this plugin enabled without the listed plugins.
 *
 * ------ Tier 2 ------
 *
 * This plugin is a Tier 1 plugin. Place it under other plugins of lower tier
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
 * Proxy Items
 * 
 * Proxy Items are temporary substitutes for another. When they are acquired
 * through crafting, they will turn into the item, weapon, or armor they are a
 * proxy for. Only the icon, name, help description, and status details will
 * match up. Everything else will remain separate such as the notetag data and
 * the ingredients list. This allows you to effectively have multiple ways to
 * craft the same item using different recipes.
 * 
 * For more details, look inside of the Notetags section for Proxy items.
 *
 * ---
 *
 * ============================================================================
 * VisuStella MZ Compatibility
 * ============================================================================
 *
 * While this plugin is compatible with the majority of the VisuStella MZ
 * plugin library, it is not compatible with specific plugins or specific
 * features. This section will highlight the main plugins/features that will
 * not be compatible with this plugin or put focus on how the make certain
 * features compatible.
 *
 * ---
 * 
 * VisuMZ_2_ShopCommonEvents
 * 
 * If VisuStella MZ's Shop Common Events is present, you can utilize its
 * Common Event function to trigger upon crafting items, weapons, and/or armors
 * to take the player outside of the shop and returning back.
 * 
 * The following notetags will become usable:
 * 
 *   <Once Craft Common Event: id>
 * 
 *   <Once Craft Common Event Switch: id>
 *   <Once Craft Common Event All Switches: id, id, id>
 *   <Once Craft Common Event Any Switches: id, id, id>
 * 
 *   <Repeat Craft Common Event: id>
 *
 *   <Repeat Craft Common Event Switch: id>
 *   <Repeat Craft Common Event All Switches: id, id, id>
 *   <Repeat Craft Common Event Any Switches: id, id, id>
 * 
 * The following Plugin Commands will become usable:
 * 
 *   Scene: Common Event Return
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
 * === General Notetags ===
 * 
 * These notetags are used to mark the item as a craftable item or as items
 * that can only be crafted through a custom crafting list.
 *
 * ---
 *
 * <Crafting Ingredients>
 *  Item id: x
 *  Item name: x
 *  Weapon id: x
 *  Weapon name: x
 *  Armor id: x
 *  Armor name: x
 *  Gold: x
 *  Category name: x
 * </Crafting Ingredients>
 *
 * - Used for: Item, Weapon, Armor Notetags
 * - Turns this item/weapon/armor into a craftable item by using the listed
 *   ingredients to craft with.
 * - If the 'Category name' variant is used, it will draw from all items,
 *   weapons, and armors that have matching <Category: x> notetag data.
 * - Insert/delete any number of copies of the ingredients as needed.
 * - Replace 'id' with the item/weapon/armor ID of the ingredient to be used.
 * - Replace 'name' with the name of the item/weapon/armor/category to be used.
 * - Replace 'x' with the number of ingredients needed to be used for crafting.
 * 
 * Category Rules:
 * 
 * - If the 'Category name' variant is used, it will draw from all items,
 *   weapons, and armors that have matching <Category: x> notetag data.
 * - Multiples of the same category name can be used. However, the player must
 *   select different items each time.
 * - If the selected category item already exists as a static ingredient, that
 *   item cannot be selected either.
 * 
 * Examples:
 * 
 * <Crafting Ingredients>
 *  Item 5: 1
 *  Item 6: 3
 *  Gold: 100
 * </Crafting Ingredients>
 * 
 * <Crafting Ingredients>
 *  Item Potion: 1
 *  Item Magic Water: 3
 *  Gold: 100
 * </Crafting Ingredients>
 * 
 * <Crafting Ingredients>
 *  Weapon 1: 4
 *  Armor 2: 2
 * </Crafting Ingredients>
 * 
 * <Crafting Ingredients>
 *  Weapon Sword: 4
 *  Armor Hat: 2
 * </Crafting Ingredients>
 * 
 * <Crafting Ingredients>
 *  Category Fruit: 2
 *  Category Meat: 3
 * </Crafting Ingredients>
 * 
 * ---
 *
 * <Custom Crafting Only>
 *
 * - Used for: Item, Weapon, Armor Notetags
 * - This item can only be crafted with custom crafting lists selected through
 *   the Plugin Command.
 *
 * ---
 * 
 * === Proxy Notetags ===
 * 
 * ---
 * 
 * <Proxy: id>
 * <Proxy: name>
 * 
 * - Used for: Item, Weapon, Armor Notetags
 * - REQUIRES the most up to date VisuMZ Items and Equips Core!
 * - Turns this item, weapon, or armor into a proxy for another item, allowing
 *   you to create recipes with different ingredients in <Crafting Ingredients>
 *   notetag contents and yield the same item.
 * - The proxy item itself will take on the name, icon, and description of the
 *   original item it is supposed to represent.
 * - No other properties are carried over from the original.
 * - When viewed through the Window_ShopStatus window, the contents will
 *   reference the original item and not the proxy item.
 * - Proxy items themselves cannot be acquired. This includes event commands,
 *   item drops, or equips.
 * - When crafted, the item yielded won't be the proxy item but the item it is
 *   a proxy for.
 * - Replace 'id' with a number representing the item, weapon, or armor ID of
 *   the same item type. If the proxy is an item, this will reference an item.
 *   If the proxy is a weapon, this will reference a weapon. Same for armors.
 * - Replace 'name' with text representing the item, weapon, or armor's name.
 *   The referenced item needs to be the same item type as the proxy. Item for
 *   item, weapon for weapon, armor for armor.
 * 
 * ---
 * 
 * === Switch-Related Notetags ===
 * 
 * These notetags can make item crafting require certain switches to be on,
 * or turn switches on/off upon crafting items.
 *
 * ---
 *
 * <Crafting Show Switch: x>
 * 
 * <Crafting Show All Switches: x,x,x>
 * <Crafting Show Any Switches: x,x,x>
 *
 * - Used for: Item, Weapon, Armor Notetags
 * - Determines the visibility of the craftable item in the crafting scene.
 * - Replace 'x' with the switch ID to determine the item's visibility.
 * - If 'All' notetag variant is used, item will be hidden until all switches
 *   are ON. Then, it would be shown.
 * - If 'Any' notetag variant is used, item will be shown if any of the
 *   switches are ON. Otherwise, it would be hidden.
 * - Insert as many switch ID's as needed.
 * - This can be bypassed with the custom Item Crafting list plugin command
 *   option if enabled.
 *
 * ---
 *
 * <Crafting Turn On Switch: x>
 * <Crafting Turn On Switches: x,x,x>
 * 
 * <Crafting Turn Off Switch: x>
 * <Crafting Turn Off Switches: x,x,x>
 *
 * - Used for: Item, Weapon, Armor Notetags
 * - Upon crafting this item, turn on/off the marked switch(es).
 * - Replace 'x' with the switch ID to turn on/off.
 *
 * ---
 * 
 * === Masking-Related Notetags ===
 * 
 * These notetags can are used to determine name-masking properties for
 * uncrafted items.
 *
 * ---
 *
 * <Crafting Mask: text>
 *
 * - Used for: Item, Weapon, Armor Notetags
 * - Displays the specific 'text' when the item has not yet been crafted.
 * - Replace 'text' with the text you wish to display if the item has not yet
 *   been crafted by the player.
 * - This can be bypassed with the custom Item Crafting list plugin command
 *   option if enabled.
 *
 * ---
 *
 * <Crafting No Mask>
 *
 * - Used for: Item, Weapon, Armor Notetags
 * - Bypasses name masking even if the item has not yet been crafted.
 *
 * ---
 * 
 * === JavaScript Notetag: Effect-Related ===
 * 
 * The following are notetags made for users with JavaScript knowledge to
 * make custom effects that occur upon crafting the item.
 *
 * ---
 *
 * <JS Crafting Effect>
 *  code
 *  code
 *  code
 * </JS Crafting Effect>
 *
 * - Used for: Item, Weapon, Armor Notetags
 * - Replace 'code' with JavaScript code to determine what kinds of effects you
 *   want to occur upon crafting this item.
 * - The 'item' variable represents the item being crafted.
 * - The 'number' variable represents the number of items being crafted.
 *
 * ---
 * 
 * === Crafting Animation-Related Notetags ===
 * 
 * These notetags let you set custom crafting animations when a specific item,
 * weapon, or armor is crafted so that way, they don't all have to use the
 * default crafting animation from the plugin parameters.
 * 
 * ---
 * 
 * <Crafting Animation: id>
 * <Crafting Animation: id, id, id>
 * 
 * - Used for: Item, Weapon, Armor Notetags
 * - Plays the animation(s) when this item, weapon, or armor is crafted.
 * - This will override the default animation settings found in the plugin
 *   parameters and use the unique one set through notetags instead.
 * - Replace 'id' with the ID of the animation you wish to play.
 * - If multiple ID's are found, then each animation will play one by one in
 *   the order they are listed.
 * 
 * ---
 * 
 * <Crafting Fade Speed: x>
 * 
 * - Used for: Item, Weapon, Armor Notetags
 * - This determines the speed at which the item's icon fades in during the
 *   crafting animation.
 * - Replace 'x' with a number value to determine how fast the icon fades in.
 * - Use lower numbers for slower fade speeds and higher numbers for faster
 *   fade speeds.
 * 
 * ---
 * 
 * <Crafting Picture: filename>
 * <Picture: filename>
 * 
 * - Used for: Item, Weapon, Armor Notetags
 * - Uses a picture from your project's /img/pictures/ folder instead of the
 *   item, weapon, or armor's icon during crafting instead.
 * - Replace 'filename' with the filename of the image.
 *   - Do not include the file extension.
 * - Scaling will not apply to the picture.
 * - Use the <Picture: filename> version for any other plugins that may be
 *   using this as an image outside of crafting, too.
 * - The size used for the image will vary based on your game's resolution.
 * 
 * ---
 * 
 * === Crafting Common Event Notetags ===
 * 
 * ---
 *
 * <Once Craft Common Event: id>
 * <Repeat Craft Common Event: id>
 *
 * - Used for: Item, Weapon, Armor Notetags
 * - Requires VisuMZ_2_ShopCommonEvents!
 * - This will cause a specific Common Event to launch when crafted.
 * - Replace 'id' with a number representing the ID of the Common Event that
 *   you wish to launch upon this item being crafted.
 * - The "Once" notetag variant will only occur once when crafted.
 *   - Any subsequent purchases of the item will not launch the Common Event.
 * - The "Repeat" notetag variant will occur repeatedly when crafted.
 * - If both "Once" and "Repeat" notetags are present in the item, then the
 *   "Once" variant will take priority first. Any subsequent purchases will go
 *   to the "Repeat" variant.
 * - Any switch requirement notetags need to be met in order for either
 *   notetag to have any effect.
 * - Use the Plugin Command "Scene: Common Event Return" to return back to the
 *   last Item Crafting scene.
 *
 * ---
 * 
 * === Crafting Common Event Requirement-Related Notetags ===
 * 
 * ---
 *
 * <Once Craft Common Event Switch: id>
 * <Once Craft Common Event All Switches: id, id, id>
 * <Once Craft Common Event Any Switches: id, id, id>
 *
 * <Repeat Craft Common Event Switch: id>
 * <Repeat Craft Common Event All Switches: id, id, id>
 * <Repeat Craft Common Event Any Switches: id, id, id>
 *
 * - Used for: Item, Weapon, Armor Notetags
 * - Requires the respective Craft Common Events to have these Switches enabled
 *   in the "ON" position in order for them to launch.
 *   - "Once" variant will only affect the "Once" notetag variants.
 *   - "Repeat" variant will only affect the "Repeat" notetag variants.
 * - The "All" variant will require all listed Switch ID's to be "ON".
 * - The "Any" variant will require only one listed Switch ID to be "ON".
 * - Replace 'id' with a number representing the Switch ID that needs to be in
 *   the "ON" position for the requirement to be met.
 *   - Insert multiple 'id' to require more Switch ID's.
 *
 * ---
 * 
 * === Batch-Related Notetags ===
 * 
 * ---
 *
 * <Craft Batch>
 *  listing
 *  listing
 *  listing
 * </Craft Batch>
 *
 * - Used for: Item, Weapon, Armor Notetags
 * - Requires VisuMZ_3_ShopBatches!
 * - Creates a list of items, weapons, and armors that the player will gain
 *   when this batch object is crafted.
 *   - This also means that in addition to this notetag, the notetag for
 *     <Crafting Ingredients> is also needed.
 *   - This item will also not be masked.
 * - Proxy items, weapons, or armors cannot be listed and will be bypassed.
 * - This item, weapon, or armor cannot be crafted if all of the listed items,
 *   weapons, or armors are at max quantity within the party's inventory.
 * - The listed items will NOT utilize any on craft effects for the individual
 *   listed items themselves.
 * - Replace 'listing' with any of the listing types found below:
 * 
 *     Item id
 *     Item name
 *     Weapon id
 *     Weapon name
 *     Armor id
 *     Armor name
 * 
 *     Item id: quantity
 *     Item name: quantity
 *     Weapon id: quantity
 *     Weapon name: quantity
 *     Armor id: quantity
 *     Armor name: quantity
 * 
 *   - Replace 'id' with a number representing the ID of the item, weapon, or
 *     armor that is to be listed.
 *     - Items CANNOT add themselves!
 *     - ie. Item #8 must not give Item #8.
 *   - Replace 'name' with the associated item, weapon, or armor's name.
 *     - Items CANNOT add themselves!
 *     - ie. Item 'Super Potion' must not give Item 'Super Potion'.
 *   - Replace 'quantity' with a number representing the number of items,
 *     weapons, or armors that will be acquired when the batch item is crafted.
 *     - If the variant without 'quantity' is used, quantity will default to 1.
 * 
 *   Examples:
 * 
 *   ---
 * 
 *   <Craft Batch>
 *    Item Potion: 10
 *    Item Super Potion: 5
 *    Weapon Short Sword: 3
 *    Weapon Long Sword: 2
 *    Armor Linen Clothing: 4
 *    Armor Cloth Armor: 3
 *   </Craft Batch>
 * 
 *   ---
 * 
 *   <Craft Batch>
 *    Item 7: 10
 *    Item 8: 5
 *    Weapon 1: 3
 *    Weapon 2: 2
 *    Armor 2: 4
 *    Armor 8: 3
 *   </Craft Batch>
 * 
 *   ---
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
 * === Scene ===
 * 
 * ---
 *
 * Scene: Item Crafting (All)
 * - Go to the Item Crafting scene.
 * - All enabled recipes will be available.
 *
 * ---
 *
 * Scene: Item Crafting (Custom)
 * - Go to the Item Crafting scene.
 * - Select specific items to craft here.
 * - Some items can only appear through custom lists like this by using the
 *   <Custom Crafting Only> notetag.
 *
 *   Items:
 *   - Select which Item ID(s) to become craftable.
 *
 *   Weapons:
 *   - Select which Weapon ID(s) to become craftable.
 *
 *   Armors:
 *   - Select which armor ID(s) to become craftable.
 *
 *   Bypass Switches?:
 *   - Bypass any of the requirement switches?
 *
 *   Bypass Masks?:
 *   - Bypass name masking for uncrafted items?
 *
 * ---
 * 
 * Scene: Common Event Return
 * - Return to the last shop if coming from a Crafting Common Event.
 * - Requires VisuMZ_2_ShopCommonEvents!
 * 
 * ---
 * 
 * === System ===
 * 
 * ---
 *
 * System: Enable Crafting in Menu?
 * - Enables/disables Crafting menu inside the main menu.
 *
 *   Enable/Disable?:
 *   - Enables/disables Crafting menu inside the main menu.
 *
 * ---
 *
 * System: Show Crafting in Menu?
 * - Shows/hides Crafting menu inside the main menu.
 *
 *   Show/Hide?:
 *   - Shows/hides Crafting menu inside the main menu.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: General Settings
 * ============================================================================
 *
 * General settings pertaining to Item Crafting.
 *
 * ---
 *
 * Scene_ItemCrafting
 * 
 *   Assist Button:
 *   - Text used to for the Button Assist Window's OK button when about ready
 *     to craft an item.
 * 
 *   Crafted Icon:
 *   - Icon used to depict of an item has already been crafted.
 * 
 *   Ingredient Bridge:
 *   - Text used to bridge ingredients in the item crafting scene.
 *
 * ---
 * 
 * Switches
 * 
 *   Switch: Craft:
 *   - Crafting items in Crafting Scene turns this Switch to ON.
 *   - Switch reverts to OFF whenever the Crafting Scene opens.
 * 
 * ---
 * 
 * Categories
 * 
 *   Category Title:
 *   - Text format used for display categories.
 *   - %1 - Category Name, %2 - Needed Quantity
 * 
 *   Selected Color:
 *   - Use #rrggbb for custom colors or regular numbers for text colors from
 *     the Window Skin.
 * 
 *   Selected Text:
 *   - This is the add on text that is displayed after an item's name that's
 *     already an ingredient.
 * 
 *   Uncategorized Text:
 *   - Text used for an uncategorized item category.
 * 
 *   Uncategorized Icon:
 *   - Icon used for uncategorized item category.
 * 
 * ---
 * 
 * Vocabulary
 * 
 *   Owned:
 *   -Text used for how much of an item is owned.
 * 
 *   Shift:
 *   - Text used for the change in value.
 * 
 *   Net:
 *   - Text used for the net result.
 * 
 * ---
 *
 * Global JS Effects
 * 
 *   JS: Listing:
 *   - Code that is run globally across all items when checking if an item
 *     should be listed or not.
 * 
 *   JS: Craft Effect:
 *   - Code that is run globally across all items when crafted.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Masking Settings
 * ============================================================================
 *
 * Masking settings related to uncrafted items.
 *
 * ---
 *
 * Masking
 * 
 *   Enable Masking:
 *   - Enable masking for uncrafted items?
 * 
 *   Italics For Masking:
 *   - Use Italics when masking?
 * 
 *   Mask Character:
 *   - Text used for masking per individual character.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Main Menu Settings
 * ============================================================================
 *
 * Main Menu settings for Item Crafting.
 *
 * ---
 *
 * Main Menu
 * 
 *   Command Name:
 *   - Name of the 'Crafting' option in the Main Menu.
 * 
 *   Show in Main Menu?:
 *   - Add the 'Crafting' option to the Main Menu by default?
 * 
 *   Enable in Main Menu?:
 *   - Enable the 'Crafting' option to the Main Menu by default?
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Animation Settings
 * ============================================================================
 *
 * Default settings for playing animations after crafting.
 *
 * ---
 *
 * General
 * 
 *   Show Animations?:
 *   - Show animations when crafting an item?
 * 
 *   Show Windows?:
 *   - Show windows during an item crafting animation?
 * 
 *   Default Animations:
 *   - Default animation(s) do you want to play when crafting.
 *
 * ---
 *
 * Sprite
 * 
 *   Scale:
 *   - How big do you want the item sprite to be on screen?
 * 
 *   Fade Speed:
 *   - How fast do you want the item to fade in?
 *
 * ---
 * 
 * ============================================================================
 * Plugin Parameters: Crafting Sound Settings
 * ============================================================================
 *
 * Default settings for the sound effect played when crafting an item.
 *
 * ---
 *
 * Sound
 * 
 *   Filename:
 *   - Filename of the sound effect played.
 * 
 *   Volume:
 *   - Volume of the sound effect played.
 * 
 *   Pitch:
 *   - Pitch of the sound effect played.
 * 
 *   Pan:
 *   - Pan of the sound effect played.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Background Settings
 * ============================================================================
 *
 * Background settings for Scene_ItemCrafting.
 *
 * ---
 *
 * Background Settings
 * 
 *   Snapshop Opacity:
 *   - Snapshot opacity for the scene.
 * 
 *   Background 1:
 *   Background 2:
 *   - Filename used for the bottom background image.
 *   - Leave empty if you don't wish to use one.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Window Settings
 * ============================================================================
 *
 * Window settings pertaining to Item Crafting.
 *
 * ---
 *
 * Windows
 * 
 *   Requirement Font Size:
 *   - Font size used for requirement quantity.
 * 
 *   Show Tooltips:
 *   - Show tooltips when the mouse hovers over an ingredient?
 * 
 *   Custom Window Skin:
 *   - Select a custom window skin if you want the tooltip window to have one.
 *
 * ---
 *
 * Background Types
 * 
 *   Help Window:
 *   Category Window:
 *   Gold Window:
 *   List Window:
 *   Status Window:
 *   Ingredient Title:
 *   Ingredient List:
 *   Number Window:
 *   Button Assist Window:
 *   - Select background type for the specific window.
 *
 * ---
 * 
 * Custom Layout
 * 
 *   Added in version 1.20
 * 
 *   Enable Custom Layout:
 *   - Enable a custom layout or automatically create a layout based on the
 *     shop scene?
 * 
 *   Help Window JS:
 *   - Code used to determine the dimensions for this window.
 * 
 *   Category Window JS:
 *   - Code used to determine the dimensions for this window.
 *   - These settings are also used for the ingredients title window.
 * 
 *   Gold Window JS:
 *   - Code used to determine the dimensions for this window.
 * 
 *   Item Window JS:
 *   - Code used to determine the dimensions for this window.
 *   - These settings are also used for ingredients list and number windows.
 * 
 *   Status Window JS:
 *   - Code used to determine the dimensions for this window.
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
 * Version 1.25: October 16, 2025
 * * Compatibility Update!
 * ** Added better compatibility checks for shop batches to make sure they
 *    don't give out free items. Fix made by Arisu.
 * 
 * Version 1.24: July 17, 2025
 * * Bug Fixes!
 * ** Fixed a name masking bug that would result in a crash. Fix made by Arisu.
 * 
 * Version 1.23: May 15, 2025
 * * Compatibility Update!
 * ** Added better compatibility with Message Core's text language settings.
 *    Update made by Arisu.
 * 
 * Version 1.22: February 20, 2025
 * * Compatibility Update!
 * ** Updated for RPG Maker MZ Core Scripts 1.9.0!
 * *** Better compatibility with different icon sizes.
 * * Documentation Update!
 * ** Added extra clarity to <Craft Batch>
 * *** Items CANNOT add themselves!
 * *** ie. Item 'Super Potion' must not give Item 'Super Potion'.
 * * Feature Update!
 * ** Add fail safes to prevent items from having batch entries add themselves.
 *    Added by Arisu.
 * 
 * Version 1.21: July 18, 2024
 * * Compatibility Update!
 * ** Added compatibility with new Items and Equips Core features!
 * 
 * Version 1.20: March 14, 2024
 * * Bug Fixes!
 * ** Fixed a crash that would cause a conflict with related non-crafting
 *    scenes. Fix made by Arisu.
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Plugin Parameters added by Arisu:
 * *** Plugin Parameters > Windows > Custom Layout
 * **** By enabling this, you can use JS to determine the window positions you
 *      want to layout in the item crafting scene. Otherwise, if left disabled,
 *      the plugin will automatically utilize the layout found in the shop
 *      scene to determine where the windows will go.
 * 
 * Version 1.19: February 15, 2024
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New notetags added by Arisu:
 * *** <Craft Batch>
 * **** When this "item" is crafted, yields multiples of the listed item.
 * **** Requires VisuMZ_3_ShopBatches
 * 
 * Version 1.18: August 4, 2022
 * * Bug Fixes!
 * ** Crafting an item on a different tab than the first will no longer reset
 *    back to the first tab. Fix made by Irina.
 * 
 * Version 1.17: July 14, 2022
 * * Optimization Update!
 * ** Plugin should run more optimized.
 * 
 * Version 1.16: May 12, 2022
 * * Compatibility Update
 * ** Compatibility with VisuMZ Shop Common Events added.
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New notetag effects added by Irina and sponsored by MirageV:
 * *** <Once Craft Common Event: id>
 * *** <Repeat Craft Common Event: id>
 * **** Requires VisuMZ_2_ShopCommonEvents!
 * **** This will cause a specific Common Event to launch when crafted.
 * *** <Once Craft Common Event Switch: id>
 * *** <Once Craft Common Event All Switches: id, id, id>
 * *** <Once Craft Common Event Any Switches: id, id, id>
 * *** <Repeat Craft Common Event Switch: id>
 * *** <Repeat Craft Common Event All Switches: id, id, id>
 * *** <Repeat Craft Common Event Any Switches: id, id, id>
 * **** Requires the respective Craft Common Events to have these Switches
 *      enabled in the "ON" position in order for them to launch.
 * ** New Plugin Command added by Irina and sponsored by MirageV:
 * *** Scene: Common Event Return
 * **** Requires VisuMZ_2_ShopCommonEvents!
 * **** Return to the last shop if coming from a Crafting Common Event.
 * 
 * Version 1.15: April 7, 2022
 * * Feature Update!
 * ** Any disappearing categories as a result of hiding recipes after crafting
 *    an item will result in the first category being selected.
 * 
 * Version 1.14: March 31, 2022
 * * Feature Update!
 * ** Failsafe added for situations where if the game dev decides to force an
 *    impossible situation in the Item Crafting scene (such as turning on a
 *    switch that erases all recipes), then the Item Scene will automatically
 *    exit out of it with zero prompts. Update made by Olivia.
 * 
 * Version 1.13: January 20, 2022
 * * Bug Fixes!
 * ** Tooltips for proxy items no longer show the original item's materials.
 *    Fix made by Olivia.
 * 
 * Version 1.12: December 23, 2021
 * * Documentation Update!
 * ** Help file updated for new features.
 * ** Added Major Changes section for "Proxy Items".
 * * Feature Update!
 * ** Number window is now updated to show how much of an ingredient the player
 *    owns, how much will be consumed, and the number result of the crafting.
 * * New Features!
 * ** New notetags added by Arisu!
 * *** <Proxy: id>
 * *** <Proxy: name>
 * **** REQUIRES the most up to date VisuMZ Items and Equips Core!
 * **** Turns this item, weapon, or armor into a proxy for another item,
 *      allowing you to create recipes with different ingredients in
 *      <Crafting Ingredients> notetag contents and yield the same item.
 * **** The proxy item itself will take on the name, icon, and description of
 *      the original item it is supposed to represent.
 * **** No other properties are carried over from the original.
 * **** When viewed through the Window_ShopStatus window, the contents will
 *      reference the original item and not the proxy item.
 * **** Proxy items themselves cannot be acquired. This includes event
 *      commands, item drops, or equips.
 * **** When crafted, the item yielded won't be the proxy item but the item it
 *      is a proxy for.
 * **** Replace 'id' with a number representing the item, weapon, or armor ID
 *      of the same item type. If the proxy is an item, this will reference an
 *      item. If the proxy is a weapon, this will reference a weapon. Same for
 *      armors.
 * **** Replace 'name' with text representing the item, weapon, or armor's
 *      name. The referenced item needs to be the same item type as the proxy.
 *      Item for item, weapon for weapon, armor for armor.
 * ** New Plugin Parameters added by Arisu!
 * *** Plugin Parameters > General > Vocab > Owned
 * *** Plugin Parameters > General > Vocab > Shift
 * *** Plugin Parameters > General > Vocab > Net
 * **** These are new vocabulary terms for the new number window appearance.
 * 
 * Version 1.11: July 9, 2021
 * * Compatibility Update
 * ** Added compatibility functionality for future plugins.
 * 
 * Version 1.10: June 25, 2021
 * * Bug Fixes!
 * ** When exiting out of the ingredients list back towards the item selection
 *    window, the help window should now be properly updated. Fix by Irina.
 * 
 * Version 1.09: March 12, 2021
 * * Bug Fixes!
 * ** Having extra spaces before an ingredient's name should no longer cause
 *    problems to information parsing. Fix made by Irina.
 * 
 * Version 1.08: March 5, 2021
 * * Feature Update!
 * ** Plugin Commands and Item Crafting Scene option will not appear if you do
 *    not have any recipes prepared at all in your game. Update made by Irina.
 * 
 * Version 1.07: February 26, 2021
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Plugin Parameters added by Irina and sponsored by AndyL:
 * *** Plugin Parameters > General Settings > Switches > Switch: Craft
 * **** Crafting items in Crafting Scene turns this Switch to ON.
 * **** Switch reverts to OFF whenever the Crafting Scene opens.
 * **** This can be used after an "Item Crafting" plugin command to determine
 *      if the player has crafted an item or not.
 * 
 * Version 1.06: December 25, 2020
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New notetag added by Yanfly.
 * *** <Crafting Picture: filename> and <Picture: filename>
 * **** Uses a picture from your project's /img/pictures/ folder instead of the
 *      item, weapon, or armor's icon during crafting instead.
 * 
 * Version 1.05: November 29, 2020
 * * Bug Fixes!
 * ** If on-screen touch buttons are disabled, they will no longer cause crash
 *    errors. Fix made by Arisu.
 * 
 * Version 1.04: November 15, 2020
 * * Optimization Update!
 * ** Plugin should run more optimized.
 * 
 * Version 1.03: November 8, 2020
 * * Feature Update!
 * ** Animations are now more compatible with the sprites. Update by Irina.
 * 
 * Version 1.02: October 25, 2020
 * * Bug Fixes!
 * ** Masked Names no longer show in the number input window. Fixed by Irina.
 * ** Plugin no longer requires a new game to be started in order for Item
 *    Crafting to work for the main menu. Fix made by Irina.
 * ** Touch Button for OK will no longer bypass the item requirements.
 *    Fix made by Irina.
 * ** Uncategorized items will now default to a newly created Uncategorized
 *    list of items. Fix made by Irina.
 * * Documentation Update!
 * ** Plugin Parameters > General is updated with "Uncategorized Text" and
 *    "Uncategorized Icon" for uncategorized items.
 *
 * Version 1.01: October 18, 2020
 * * Feature Update!
 * ** Bounce SFX pitch plugin parameter is now uncapped.
 * * Bug Fixes!
 * ** Color matches no longer crash the game if the matching amount is set to
 *    zero. Bug fixed by Yanfly.
 * ** Selecting a category without modern controls will now activate the list
 *    window. Bug fixed by Yanfly.
 * ** The Category Window no longer disappears when there's only one
 *    category. Bug fixed by Yanfly.
 * * Compatibility Update!
 * ** Plugins should be more compatible with one another.
 *
 * Version 1.00 Official Release Date: November 2, 2020
 * * Finished Plugin!
 *
 * ============================================================================
 * End of Helpfile
 * ============================================================================
 *
 * @ --------------------------------------------------------------------------
 *
 * @command Separator_Begin
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ItemCraftingSceneOpen
 * @text Scene: Item Crafting (All)
 * @desc Go to the Item Crafting scene.
 * All enabled recipes will be available.
 *
 * @ --------------------------------------------------------------------------
 *
 * @command CustomItemCraftingSceneOpen
 * @text Scene: Item Crafting (Custom)
 * @desc Go to the Item Crafting scene.
 * Select specific items to craft here.
 * 
 * @arg Contents
 *
 * @arg Items:arraynum
 * @text Items
 * @type item[]
 * @parent Contents
 * @desc Select which Item ID(s) to become craftable.
 * @default []
 *
 * @arg Weapons:arraynum
 * @text Weapons
 * @type weapon[]
 * @parent Contents
 * @desc Select which Weapon ID(s) to become craftable.
 * @default []
 *
 * @arg Armors:arraynum
 * @text Armors
 * @type armor[]
 * @parent Contents
 * @desc Select which armor ID(s) to become craftable.
 * @default []
 * 
 * @arg Settings
 *
 * @arg BypassSwitches:eval
 * @text Bypass Switches?
 * @parent Settings
 * @type boolean
 * @on Bypass
 * @off Don't Bypass
 * @desc Bypass any of the requirement switches?
 * @default false
 *
 * @arg BypassMasks:eval
 * @text Bypass Masks?
 * @parent Settings
 * @type boolean
 * @on Bypass
 * @off Don't Bypass
 * @desc Bypass name masking for uncrafted items?
 * @default false
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ReturnToLastCrafting
 * @text Scene: Common Event Return
 * @desc Return to the last shop if coming from a Crafting Common Event.
 * Requires VisuMZ_2_ShopCommonEvents!
 *
 * @ --------------------------------------------------------------------------
 *
 * @command Separator_System
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SystemEnableItemCraftingMenu
 * @text System: Enable Crafting in Menu?
 * @desc Enables/disables Crafting menu inside the main menu.
 *
 * @arg Enable:eval
 * @text Enable/Disable?
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc Enables/disables Crafting menu inside the main menu.
 * @default true
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SystemShowItemCraftingMenu
 * @text System: Show Crafting in Menu?
 * @desc Shows/hides Crafting menu inside the main menu.
 *
 * @arg Show:eval
 * @text Show/Hide?
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Shows/hides Crafting menu inside the main menu.
 * @default true
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
 * @param ItemCraftingSys
 * @default Plugin Parameters
 *
 * @param ATTENTION
 * @default READ THE HELP FILE
 *
 * @param BreakSettings
 * @text --------------------------
 * @default ----------------------------------
 *
 * @param General:struct
 * @text General Settings
 * @type struct<General>
 * @desc General settings pertaining to Item Crafting.
 * @default {"Scene":"","CraftAssistButton:str":"Craft","CraftedIcon:num":"223","IngredientBridge:str":"+","Categories":"","CategoryIcon:num":"16","CategoryTitle:str":"Pick %1 Type (Quantity: %2)","SelectedColor:str":"17","SelectedText:str":" (Selected)","Uncategorized:str":"Uncategorized","NoCategoryIcon:num":"160","JS":"","jsGlobalListing:func":"\"// Declare Variables\\nlet item = arguments[0]; // This is the item being crafted.\\nlet listed = true;       // Default listing value.\\n\\n// Perform Checks\\n\\n\\n// Return Boolean\\nreturn listed;\"","jsGlobalCraftEffect:func":"\"// Declare Variables\\nlet item = arguments[0];   // This is the item being crafted.\\nlet number = arguments[1]; // This is the number of them being crafted.\\n\\n// Perform Actions\""}
 *
 * @param Mask:struct
 * @text Masking Settings
 * @type struct<Mask>
 * @desc Masking settings related to uncrafted items.
 * @default {"Enable:eval":"true","MaskItalics:eval":"true","MaskLetter:str":"?"}
 *
 * @param MainMenu:struct
 * @text Main Menu Settings
 * @type struct<MainMenu>
 * @desc Main Menu settings for Item Crafting.
 * @default {"Name:str":"Crafting","ShowMainMenu:eval":"true","EnableMainMenu:eval":"true"}
 * 
 * @param Animation:struct
 * @text Animation Settings
 * @type struct<Animation>
 * @desc Default settings for playing animations after crafting.
 * @default {"General":"","ShowAnimations:eval":"true","ShowWindows:eval":"false","Animations:arraynum":"[\"44\",\"47\"]","Sprite":"","Scale:num":"8.0","FadeSpeed:num":"4"}
 *
 * @param Sound:struct
 * @text Crafting Sound Settings
 * @type struct<Sound>
 * @desc Default settings for the sound effect played when crafting an item.
 * @default {"name:str":"Skill2","volume:num":"90","pitch:num":"100","pan:num":"0"}
 *
 * @param BgSettings:struct
 * @text Background Settings
 * @type struct<BgSettings>
 * @desc Background settings for Scene_ItemCrafting.
 * @default {"SnapshotOpacity:num":"192","BgFilename1:str":"","BgFilename2:str":""}
 *
 * @param Window:struct
 * @text Window Settings
 * @type struct<Window>
 * @desc Window settings for Scene_ItemCrafting.
 * The window positions are the same as Scene_Shop.
 * @default {"ReqQuantityFontSize:num":"18","ToolTips:eval":"true","name:str":"","BgTypes":"","HelpBgType:num":"0","CategoryBgType:num":"0","GoldBgType:num":"0","ListBgType:num":"0","StatusBgType:num":"0","IngredientTitle:num":"0","IngredientList:num":"0","NumberBgType:num":"0","ButtonAssistBgType:num":"0","Custom":"","EnableCustomLayout:eval":"false","HelpWindow_RectJS:func":"\"const wx = 0;\\nconst wy = this.helpAreaTop();\\nconst ww = Graphics.boxWidth;\\nconst wh = this.helpAreaHeight();\\nreturn new Rectangle(wx, wy, ww, wh);\"","CategoryWindow_RectJS:func":"\"const wx = this.isRightInputMode() ? this.mainCommandWidth() : 0;\\nconst wy = this.mainAreaTop();\\nconst ww = Graphics.boxWidth - this.mainCommandWidth();\\nconst wh = this.calcWindowHeight(1, true);\\nreturn new Rectangle(wx, wy, ww, wh);\"","GoldWindow_RectJS:func":"\"const ww = this.mainCommandWidth();\\nconst wh = this.calcWindowHeight(1, true);\\nconst wx = this.isRightInputMode() ? 0 : Graphics.boxWidth - ww;\\nconst wy = this.mainAreaTop();\\nreturn new Rectangle(wx, wy, ww, wh);\"","ItemWindow_RectJS:func":"\"const wy = this._commandWindow.y + this._commandWindow.height;\\nconst ww = Graphics.boxWidth - this.statusWidth();\\nconst wh = this.mainAreaHeight() - this._commandWindow.height;\\nconst wx = this.isRightInputMode() ? Graphics.boxWidth - ww : 0;\\nreturn new Rectangle(wx, wy, ww, wh);\"","StatusWindow_RectJS:func":"\"const ww = this.statusWidth();\\nconst wh = this.mainAreaHeight() - this._commandWindow.height;\\nconst wx = this.isRightInputMode() ? 0 : Graphics.boxWidth - ww;\\nconst wy = this._commandWindow.y + this._commandWindow.height;\\nreturn new Rectangle(wx, wy, ww, wh);\""}
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
/*~struct~General:
 *
 * @param Scene
 * @text Scene_ItemCrafting
 *
 * @param CraftAssistButton:str
 * @text Assist Button
 * @parent Scene
 * @desc Text used to for the Button Assist Window's OK button when about ready to craft an item.
 * @default Craft
 *
 * @param CraftedIcon:num
 * @text Crafted Icon
 * @parent Scene
 * @desc Icon used to depict of an item has already been crafted.
 * @default 223
 *
 * @param IngredientBridge:str
 * @text Ingredient Bridge
 * @parent Scene
 * @desc Text used to bridge ingredients in the item crafting scene.
 * @default +
 *
 * @param Switches
 *
 * @param SwitchCraft:num
 * @text Switch: Craft
 * @parent Switches
 * @type switch
 * @desc Crafting items in Crafting Scene turns this Switch to ON.
 * Switch reverts to OFF whenever the Crafting Scene opens.
 * @default 0
 * 
 * @param Categories
 *
 * @param CategoryIcon:num
 * @text Category Icon
 * @parent Categories
 * @desc Icon used for open-ended ingredients.
 * @default 16
 *
 * @param CategoryTitle:str
 * @text Category Title
 * @parent Categories
 * @desc Text format used for display categories.
 * %1 - Category Name, %2 - Needed Quantity
 * @default Pick %1 Type (Quantity: %2)
 *
 * @param SelectedColor:str
 * @text Selected Color
 * @parent Categories
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 17
 *
 * @param SelectedText:str
 * @text Selected Text
 * @parent Categories
 * @desc This is the add on text that is displayed after an
 * item's name that's already an ingredient.
 * @default  (Selected)
 *
 * @param Uncategorized:str
 * @text Uncategorized Text
 * @parent Categories
 * @desc Text used for an uncategorized item category.
 * @default Uncategorized
 *
 * @param NoCategoryIcon:num
 * @text Uncategorized Icon
 * @parent Categories
 * @desc Icon used for uncategorized item category.
 * @default 160
 * 
 * @param Vocab
 * @text Vocabulary
 *
 * @param NumWindowOwned:str
 * @text Owned
 * @parent Vocab
 * @desc Text used for how much of an item is owned.
 * @default Owned
 *
 * @param NumWindowShift:str
 * @text Shift
 * @parent Vocab
 * @desc Text used for the change in value.
 * @default Change
 *
 * @param NumWindowNet:str
 * @text Net
 * @parent Vocab
 * @desc Text used for the net result.
 * @default Net
 *
 * @param JS
 * @text Global JS Effects
 *
 * @param jsGlobalListing:func
 * @text JS: Listing
 * @parent JS
 * @type note
 * @desc Code that is run globally across all items when checking if an item should be listed or not.
 * @default "// Declare Variables\nlet item = arguments[0]; // This is the item being crafted.\nlet listed = true;       // Default listing value.\n\n// Perform Checks\n\n\n// Return Boolean\nreturn listed;"
 *
 * @param jsGlobalCraftEffect:func
 * @text JS: Craft Effect
 * @parent JS
 * @type note
 * @desc Code that is run globally across all items when crafted.
 * @default "// Declare Variables\nlet item = arguments[0];   // This is the item being crafted.\nlet number = arguments[1]; // This is the number of them being crafted.\n\n// Perform Actions"
 *
 */
/* ----------------------------------------------------------------------------
 * Masking Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Mask:
 *
 * @param Enable:eval
 * @text Enable Masking
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc Enable masking for uncrafted items?
 * @default true
 *
 * @param MaskItalics:eval
 * @text Italics For Masking
 * @type boolean
 * @on Italics
 * @off Normal
 * @desc Use Italics when masking?
 * @default true
 *
 * @param MaskLetter:str
 * @text Mask Character
 * @desc Text used for masking per individual character.
 * @default ?
 *
 */
/* ----------------------------------------------------------------------------
 * MainMenu Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~MainMenu:
 *
 * @param Name:str
 * @text Command Name
 * @parent Options
 * @desc Name of the 'Crafting' option in the Main Menu.
 * @default Crafting
 *
 * @param ShowMainMenu:eval
 * @text Show in Main Menu?
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Add the 'Crafting' option to the Main Menu by default?
 * @default true
 *
 * @param EnableMainMenu:eval
 * @text Enable in Main Menu?
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc Enable the 'Crafting' option to the Main Menu by default?
 * @default true
 *
 */
/* ----------------------------------------------------------------------------
 * Animation Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Animation:
 *
 * @param General
 *
 * @param ShowAnimations:eval
 * @text Show Animations?
 * @parent General
 * @type boolean
 * @on Show
 * @off Skip
 * @desc Show animations when crafting an item?
 * @default true
 *
 * @param ShowWindows:eval
 * @text Show Windows?
 * @parent General
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show windows during an item crafting animation?
 * @default false
 *
 * @param Animations:arraynum
 * @text Default Animations
 * @parent General
 * @type animation[]
 * @desc Default animation(s) do you want to play when crafting.
 * @default ["44","47"]
 *
 * @param Sprite
 * @text Item Sprite
 *
 * @param Scale:num
 * @text Scale
 * @parent Sprite
 * @desc How big do you want the item sprite to be on screen?
 * @default 8.0
 *
 * @param FadeSpeed:num
 * @text Fade Speed
 * @parent Sprite
 * @type number
 * @min 1
 * @desc How fast do you want the item to fade in?
 * @default 4
 *
 */
/* ----------------------------------------------------------------------------
 * Sound Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Sound:
 *
 * @param name:str
 * @text Filename
 * @type file
 * @dir audio/se/
 * @desc Filename of the sound effect played.
 * @default Skill2
 *
 * @param volume:num
 * @text Volume
 * @type number
 * @max 100
 * @desc Volume of the sound effect played.
 * @default 90
 *
 * @param pitch:num
 * @text Pitch
 * @type number
 * @max 100
 * @desc Pitch of the sound effect played.
 * @default 100
 *
 * @param pan:num
 * @text Pan
 * @desc Pan of the sound effect played.
 * @default 0
 *
 */
/* ----------------------------------------------------------------------------
 * Background Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~BgSettings:
 *
 * @param SnapshotOpacity:num
 * @text Snapshop Opacity
 * @type number
 * @min 0
 * @max 255
 * @desc Snapshot opacity for the scene.
 * @default 192
 *
 * @param BgFilename1:str
 * @text Background 1
 * @type file
 * @dir img/titles1/
 * @desc Filename used for the bottom background image.
 * Leave empty if you don't wish to use one.
 * @default 
 *
 * @param BgFilename2:str
 * @text Background 2
 * @type file
 * @dir img/titles2/
 * @desc Filename used for the upper background image.
 * Leave empty if you don't wish to use one.
 * @default 
 *
 */
/* ----------------------------------------------------------------------------
 * Window Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Window:
 *
 * @param ReqQuantityFontSize:num
 * @text Requirement Font Size
 * @parent Windows
 * @desc Font size used for requirement quantity.
 * @default 18
 *
 * @param ToolTips:eval
 * @text Show Tooltips
 * @parent Windows
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show tooltips when the mouse hovers over an ingredient?
 * @default true
 *
 * @param name:str
 * @text Custom Window Skin
 * @parent ToolTips:eval
 * @type file
 * @dir img/system/
 * @desc Select a custom window skin if you want the tooltip window to have one.
 * @default 
 *
 * @param BgTypes
 * @text Background Types
 * @parent Windows
 *
 * @param HelpBgType:num
 * @text Help Window
 * @parent BgTypes
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for the Help Window.
 * @default 0
 *
 * @param CategoryBgType:num
 * @text Category Window
 * @parent BgTypes
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for the Category Window.
 * @default 0
 *
 * @param GoldBgType:num
 * @text Gold Window
 * @parent BgTypes
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for the Gold Window.
 * @default 0
 *
 * @param ListBgType:num
 * @text List Window
 * @parent BgTypes
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for the List Window.
 * @default 0
 *
 * @param StatusBgType:num
 * @text Status Window
 * @parent BgTypes
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for the Status Window.
 * @default 0
 *
 * @param IngredientTitle:num
 * @text Ingredient Title
 * @parent BgTypes
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for the Ingredient Title Window.
 * @default 0
 *
 * @param IngredientList:num
 * @text Ingredient List
 * @parent BgTypes
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for the Ingredient List Window.
 * @default 0
 *
 * @param NumberBgType:num
 * @text Number Window
 * @parent BgTypes
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for the Number Window.
 * @default 0
 *
 * @param ButtonAssistBgType:num
 * @text Button Assist Window
 * @parent BgTypes
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for the Number Window.
 * @default 0
 *
 * @param Custom
 * @text Custom Layout
 *
 * @param EnableCustomLayout:eval
 * @text Enable Custom Layout
 * @parent Custom
 * @type boolean
 * @on Custom
 * @off Automatic
 * @desc Enable a custom layout or automatically create a layout
 * based on the shop scene?
 * @default false
 *
 * @param HelpWindow_RectJS:func
 * @text Help Window JS
 * @parent Custom
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const wx = 0;\nconst wy = this.helpAreaTop();\nconst ww = Graphics.boxWidth;\nconst wh = this.helpAreaHeight();\nreturn new Rectangle(wx, wy, ww, wh);"
 *
 * @param CategoryWindow_RectJS:func
 * @text Category Window
 * @parent Custom
 * @type note
 * @desc Code used to determine the dimensions for these windows.
 * @default "const wx = this.isRightInputMode() ? this.mainCommandWidth() : 0;\nconst wy = this.mainAreaTop();\nconst ww = Graphics.boxWidth - this.mainCommandWidth();\nconst wh = this.calcWindowHeight(1, true);\nreturn new Rectangle(wx, wy, ww, wh);"
 *
 * @param GoldWindow_RectJS:func
 * @text Gold Window
 * @parent Custom
 * @type note
 * @desc Code used to determine the dimensions for these windows.
 * @default "const ww = this.mainCommandWidth();\nconst wh = this.calcWindowHeight(1, true);\nconst wx = this.isRightInputMode() ? 0 : Graphics.boxWidth - ww;\nconst wy = this.mainAreaTop();\nreturn new Rectangle(wx, wy, ww, wh);"
 *
 * @param ItemWindow_RectJS:func
 * @text Item Window
 * @parent Custom
 * @type note
 * @desc Code used to determine the dimensions for these windows.
 * @default "const wy = this._commandWindow.y + this._commandWindow.height;\nconst ww = Graphics.boxWidth - this.statusWidth();\nconst wh = this.mainAreaHeight() - this._commandWindow.height;\nconst wx = this.isRightInputMode() ? Graphics.boxWidth - ww : 0;\nreturn new Rectangle(wx, wy, ww, wh);"
 *
 * @param StatusWindow_RectJS:func
 * @text Status Window
 * @parent Custom
 * @type note
 * @desc Code used to determine the dimensions for these windows.
 * @default "const ww = this.statusWidth();\nconst wh = this.mainAreaHeight() - this._commandWindow.height;\nconst wx = this.isRightInputMode() ? 0 : Graphics.boxWidth - ww;\nconst wy = this._commandWindow.y + this._commandWindow.height;\nreturn new Rectangle(wx, wy, ww, wh);"
 *
 */
//=============================================================================

const _0x1c7984=_0x3fc4;(function(_0xf6644c,_0x3f7d44){const _0x2c7d0c=_0x3fc4,_0x195e7d=_0xf6644c();while(!![]){try{const _0x378caf=-parseInt(_0x2c7d0c(0x30e))/0x1*(-parseInt(_0x2c7d0c(0x1e3))/0x2)+parseInt(_0x2c7d0c(0x27f))/0x3+parseInt(_0x2c7d0c(0x2df))/0x4+-parseInt(_0x2c7d0c(0x131))/0x5*(-parseInt(_0x2c7d0c(0x256))/0x6)+parseInt(_0x2c7d0c(0x32f))/0x7+parseInt(_0x2c7d0c(0x2cb))/0x8+-parseInt(_0x2c7d0c(0x2c5))/0x9*(parseInt(_0x2c7d0c(0x330))/0xa);if(_0x378caf===_0x3f7d44)break;else _0x195e7d['push'](_0x195e7d['shift']());}catch(_0x2c261c){_0x195e7d['push'](_0x195e7d['shift']());}}}(_0x3ff5,0x1a26d));var label=_0x1c7984(0x338),tier=tier||0x0,dependencies=[_0x1c7984(0x1f2)],pluginData=$plugins[_0x1c7984(0x213)](function(_0x1397d5){const _0x3598f7=_0x1c7984;return _0x1397d5[_0x3598f7(0x157)]&&_0x1397d5[_0x3598f7(0x2e4)][_0x3598f7(0x12e)]('['+label+']');})[0x0];VisuMZ[label]['Settings']=VisuMZ[label][_0x1c7984(0x24c)]||{},VisuMZ[_0x1c7984(0x2d8)]=function(_0x23366b,_0xbaa7b1){const _0x47ef44=_0x1c7984;for(const _0x19858b in _0xbaa7b1){if(_0x19858b['match'](/(.*):(.*)/i)){const _0x5644ab=String(RegExp['$1']),_0xd32cf6=String(RegExp['$2'])[_0x47ef44(0x232)]()['trim']();let _0x5eda8f,_0x3d9761,_0x1d56b2;switch(_0xd32cf6){case'NUM':_0x5eda8f=_0xbaa7b1[_0x19858b]!==''?Number(_0xbaa7b1[_0x19858b]):0x0;break;case _0x47ef44(0x123):_0x3d9761=_0xbaa7b1[_0x19858b]!==''?JSON['parse'](_0xbaa7b1[_0x19858b]):[],_0x5eda8f=_0x3d9761[_0x47ef44(0x1d2)](_0x460e39=>Number(_0x460e39));break;case'EVAL':_0x5eda8f=_0xbaa7b1[_0x19858b]!==''?eval(_0xbaa7b1[_0x19858b]):null;break;case'ARRAYEVAL':_0x3d9761=_0xbaa7b1[_0x19858b]!==''?JSON[_0x47ef44(0x1d1)](_0xbaa7b1[_0x19858b]):[],_0x5eda8f=_0x3d9761[_0x47ef44(0x1d2)](_0x1f7218=>eval(_0x1f7218));break;case'JSON':_0x5eda8f=_0xbaa7b1[_0x19858b]!==''?JSON[_0x47ef44(0x1d1)](_0xbaa7b1[_0x19858b]):'';break;case _0x47ef44(0x29e):_0x3d9761=_0xbaa7b1[_0x19858b]!==''?JSON[_0x47ef44(0x1d1)](_0xbaa7b1[_0x19858b]):[],_0x5eda8f=_0x3d9761[_0x47ef44(0x1d2)](_0x26b593=>JSON[_0x47ef44(0x1d1)](_0x26b593));break;case _0x47ef44(0x2cf):_0x5eda8f=_0xbaa7b1[_0x19858b]!==''?new Function(JSON[_0x47ef44(0x1d1)](_0xbaa7b1[_0x19858b])):new Function(_0x47ef44(0x309));break;case _0x47ef44(0x2ea):_0x3d9761=_0xbaa7b1[_0x19858b]!==''?JSON['parse'](_0xbaa7b1[_0x19858b]):[],_0x5eda8f=_0x3d9761['map'](_0x4a0024=>new Function(JSON[_0x47ef44(0x1d1)](_0x4a0024)));break;case _0x47ef44(0x245):_0x5eda8f=_0xbaa7b1[_0x19858b]!==''?String(_0xbaa7b1[_0x19858b]):'';break;case _0x47ef44(0x199):_0x3d9761=_0xbaa7b1[_0x19858b]!==''?JSON[_0x47ef44(0x1d1)](_0xbaa7b1[_0x19858b]):[],_0x5eda8f=_0x3d9761[_0x47ef44(0x1d2)](_0x349c9e=>String(_0x349c9e));break;case _0x47ef44(0x2ff):_0x1d56b2=_0xbaa7b1[_0x19858b]!==''?JSON[_0x47ef44(0x1d1)](_0xbaa7b1[_0x19858b]):{},_0x5eda8f=VisuMZ[_0x47ef44(0x2d8)]({},_0x1d56b2);break;case'ARRAYSTRUCT':_0x3d9761=_0xbaa7b1[_0x19858b]!==''?JSON[_0x47ef44(0x1d1)](_0xbaa7b1[_0x19858b]):[],_0x5eda8f=_0x3d9761[_0x47ef44(0x1d2)](_0xa8910c=>VisuMZ[_0x47ef44(0x2d8)]({},JSON[_0x47ef44(0x1d1)](_0xa8910c)));break;default:continue;}_0x23366b[_0x5644ab]=_0x5eda8f;}}return _0x23366b;},(_0x21a084=>{const _0xb427d9=_0x1c7984,_0x5d32de=_0x21a084['name'];for(const _0x1bca6d of dependencies){if(!Imported[_0x1bca6d]){alert('%1\x20is\x20missing\x20a\x20required\x20plugin.\x0aPlease\x20install\x20%2\x20into\x20the\x20Plugin\x20Manager.'['format'](_0x5d32de,_0x1bca6d)),SceneManager[_0xb427d9(0x1fc)]();break;}}const _0x3c0289=_0x21a084[_0xb427d9(0x2e4)];if(_0x3c0289[_0xb427d9(0x2be)](/\[Version[ ](.*?)\]/i)){const _0x50a188=Number(RegExp['$1']);_0x50a188!==VisuMZ[label][_0xb427d9(0x1e0)]&&(alert(_0xb427d9(0x2bd)['format'](_0x5d32de,_0x50a188)),SceneManager[_0xb427d9(0x1fc)]());}if(_0x3c0289[_0xb427d9(0x2be)](/\[Tier[ ](\d+)\]/i)){const _0x497300=Number(RegExp['$1']);_0x497300<tier?(alert(_0xb427d9(0x151)[_0xb427d9(0x1e1)](_0x5d32de,_0x497300,tier)),SceneManager[_0xb427d9(0x1fc)]()):tier=Math[_0xb427d9(0x200)](_0x497300,tier);}VisuMZ[_0xb427d9(0x2d8)](VisuMZ[label][_0xb427d9(0x24c)],_0x21a084[_0xb427d9(0x13e)]);})(pluginData);if(VisuMZ[_0x1c7984(0x1fb)][_0x1c7984(0x1e0)]<1.38){let text='';text+='VisuMZ_1_ItemsEquipsCore\x20needs\x20to\x20be\x20updated\x20',text+=_0x1c7984(0x19a),alert(text),SceneManager[_0x1c7984(0x1fc)]();}VisuMZ[_0x1c7984(0x338)][_0x1c7984(0x11d)]=_0x1c7984(0x236),PluginManager[_0x1c7984(0x25f)](pluginData['name'],_0x1c7984(0x2b9),_0xdb48ce=>{const _0x37e54a=_0x1c7984;if(SceneManager['isSceneBattle']())return;if(SceneManager[_0x37e54a(0x272)]())return;if($gameSystem[_0x37e54a(0x257)])return;if(DataManager[_0x37e54a(0x23c)]()['length']<=0x0){$gameTemp['isPlaytest']()&&alert(VisuMZ[_0x37e54a(0x338)][_0x37e54a(0x11d)]);return;}SceneManager['push'](Scene_ItemCrafting);}),PluginManager['registerCommand'](pluginData[_0x1c7984(0x163)],_0x1c7984(0x267),_0x5cfc52=>{const _0xfc1be5=_0x1c7984;if(SceneManager[_0xfc1be5(0x31e)]())return;if(SceneManager['isSceneItemCrafting']())return;if($gameSystem['_craftingCommonEventScene'])return;VisuMZ[_0xfc1be5(0x2d8)](_0x5cfc52,_0x5cfc52);const _0x1a3e29={'items':_0x5cfc52[_0xfc1be5(0x2e1)]['map'](_0x58dcd5=>$dataItems[_0x58dcd5])['filter'](_0x52ed3f=>DataManager[_0xfc1be5(0x1cc)]()['includes'](_0x52ed3f)),'weapons':_0x5cfc52[_0xfc1be5(0x14d)][_0xfc1be5(0x1d2)](_0x284b12=>$dataWeapons[_0x284b12])[_0xfc1be5(0x213)](_0x2945f9=>DataManager['allCraftableWeapons']()[_0xfc1be5(0x12e)](_0x2945f9)),'armors':_0x5cfc52[_0xfc1be5(0x178)]['map'](_0x1d8b21=>$dataArmors[_0x1d8b21])['filter'](_0x42d1eb=>DataManager['allCraftableArmors']()['includes'](_0x42d1eb)),'BypassSwitches':_0x5cfc52[_0xfc1be5(0x266)],'BypassMasks':_0x5cfc52['BypassMasks']};_0x1a3e29['all']=_0x1a3e29[_0xfc1be5(0x2ee)]['concat'](_0x1a3e29[_0xfc1be5(0x165)],_0x1a3e29['armors']);if(_0x1a3e29[_0xfc1be5(0x29d)][_0xfc1be5(0x2ad)]<=0x0){$gameTemp[_0xfc1be5(0x237)]()&&alert(VisuMZ[_0xfc1be5(0x338)][_0xfc1be5(0x11d)]);return;}$gameTemp[_0xfc1be5(0x179)](_0x1a3e29),SceneManager[_0xfc1be5(0x21f)](Scene_ItemCrafting);}),PluginManager['registerCommand'](pluginData[_0x1c7984(0x163)],'ReturnToLastCrafting',_0x8ceb23=>{const _0x38c615=_0x1c7984;if(!SceneManager['isSceneMap']())return;if(!$gameSystem[_0x38c615(0x257)])return;$gameSystem['_craftingCommonEventScene']=undefined,SceneManager[_0x38c615(0x21f)](Scene_ItemCrafting);}),PluginManager[_0x1c7984(0x25f)](pluginData[_0x1c7984(0x163)],'SystemEnableItemCraftingMenu',_0x1b7501=>{const _0x9097fd=_0x1c7984;VisuMZ['ConvertParams'](_0x1b7501,_0x1b7501),$gameSystem['setMainMenuItemCraftingEnabled'](_0x1b7501[_0x9097fd(0x2bf)]);}),PluginManager[_0x1c7984(0x25f)](pluginData[_0x1c7984(0x163)],_0x1c7984(0x1b8),_0x1a1b5f=>{const _0x428256=_0x1c7984;VisuMZ['ConvertParams'](_0x1a1b5f,_0x1a1b5f),$gameSystem[_0x428256(0x18b)](_0x1a1b5f[_0x428256(0x241)]);}),VisuMZ[_0x1c7984(0x338)]['RegExp']={'Ingredients':/<(?:CRAFT|CRAFTING|RECIPE|SYNTHESIS) INGREDIENTS>\s*([\s\S]*)\s*<\/(?:CRAFT|CRAFTING|RECIPE|SYNTHESIS) INGREDIENTS>/i,'AllSwitches':/<(?:CRAFT|CRAFTING|RECIPE|SYNTHESIS) SHOW (?:SWITCH|SWITCHES|ALL SWITCH|ALL SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/gi,'AnySwitches':/<(?:CRAFT|CRAFTING|RECIPE|SYNTHESIS) SHOW (?:ANY SWITCH|ANY SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/gi,'OnSwitches':/<(?:CRAFT|CRAFTING|RECIPE|SYNTHESIS) TURN ON (?:SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/gi,'OffSwitches':/<(?:CRAFT|CRAFTING|RECIPE|SYNTHESIS) TURN OFF (?:SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/gi,'MaskText':/<(?:CRAFT|CRAFTING|RECIPE|SYNTHESIS) MASK:[ ](.*)>/i,'NoMask':/<(?:CRAFT|CRAFTING|RECIPE|SYNTHESIS) NO MASK>/i,'customCraftingOnly':/<CUSTOM (?:CRAFT|CRAFTING|RECIPE|SYNTHESIS) ONLY>/i,'jsOnCraft':/<JS (?:CRAFT|CRAFTING|RECIPE|SYNTHESIS) EFFECT>\s*([\s\S]*)\s*<\/JS (?:CRAFT|CRAFTING|RECIPE|SYNTHESIS) EFFECT>/i,'animationIDs':/<(?:CRAFT|CRAFTING|RECIPE|SYNTHESIS) (?:ANIMATION|ANIMATIONS|ANI):[ ](.*)>/i,'opacitySpeed':/<(?:CRAFT|CRAFTING|RECIPE|SYNTHESIS) FADE SPEED:[ ](\d+)>/i,'craftPicture':/<(?:CRAFT|CRAFTING|RECIPE|SYNTHESIS) (?:PICTURE|FILENAME):[ ](.*)>/i,'bigPicture':/<PICTURE:[ ](.*)>/i,'CraftEventOnce':/<(?:ONCE|ONE TIME|ONE-TIME)[ ]CRAFT[ ](?:EVENT|COMMON EVENT):[ ](\d+)>/i,'CraftEventRepeat':/<(?:REPEAT|REPEATING|RECURRING)[ ]CRAFT[ ](?:EVENT|COMMON EVENT):[ ](\d+)>/i,'CraftOnceAllSw':/<(?:ONCE|ONE TIME|ONE-TIME)[ ]CRAFT[ ](?:EVENT|COMMON EVENT)[ ](?:SWITCH|SWITCHES|ALL SWITCHES):[ ](.*)>/i,'CraftOnceAnySw':/<(?:ONCE|ONE TIME|ONE-TIME)[ ]CRAFT[ ](?:EVENT|COMMON EVENT)[ ](?:ANY SWITCH|ANY SWITCHES):[ ](.*)>/i,'CraftRepeatAllSw':/<(?:REPEAT|REPEATING|RECURRING)[ ]CRAFT[ ](?:EVENT|COMMON EVENT)[ ](?:SWITCH|SWITCHES|ALL SWITCHES):[ ](.*)>/i,'CraftRepeatAnySw':/<(?:REPEAT|REPEATING|RECURRING)[ ]CRAFT[ ](?:EVENT|COMMON EVENT)[ ](?:ANY SWITCH|ANY SWITCHES):[ ](.*)>/i,'CraftBatchWrap':/<CRAFT BATCH>\s*([\s\S]*)\s*<\/CRAFT BATCH>/i},VisuMZ[_0x1c7984(0x338)][_0x1c7984(0x285)]=Scene_Boot['prototype'][_0x1c7984(0x1a5)],Scene_Boot['prototype'][_0x1c7984(0x1a5)]=function(){const _0x23636d=_0x1c7984;VisuMZ['ItemCraftingSys']['Scene_Boot_onDatabaseLoaded'][_0x23636d(0x253)](this),this[_0x23636d(0x24e)]();},Scene_Boot[_0x1c7984(0x289)][_0x1c7984(0x24e)]=function(){this['process_VisuMZ_ItemCraftingSys_JS_TraitObject_Notetags']();},Scene_Boot['prototype'][_0x1c7984(0x15a)]=function(){const _0x294de8=_0x1c7984;if(VisuMZ['ParseAllNotetags'])return;const _0x3386fe=$dataItems[_0x294de8(0x238)]($dataWeapons,$dataArmors);for(const _0x345b5c of _0x3386fe){if(!_0x345b5c)continue;VisuMZ['ItemCraftingSys'][_0x294de8(0x15d)](_0x345b5c);}},VisuMZ[_0x1c7984(0x338)][_0x1c7984(0x2de)]=VisuMZ[_0x1c7984(0x2de)],VisuMZ['ParseItemNotetags']=function(_0x1896f7){const _0x2e3edf=_0x1c7984;VisuMZ[_0x2e3edf(0x338)][_0x2e3edf(0x2de)][_0x2e3edf(0x253)](this,_0x1896f7),VisuMZ[_0x2e3edf(0x338)][_0x2e3edf(0x15d)](_0x1896f7);},VisuMZ[_0x1c7984(0x338)][_0x1c7984(0x218)]=VisuMZ['ParseWeaponNotetags'],VisuMZ[_0x1c7984(0x218)]=function(_0x5e0b74){const _0x2fd07a=_0x1c7984;VisuMZ[_0x2fd07a(0x338)][_0x2fd07a(0x218)][_0x2fd07a(0x253)](this,_0x5e0b74),VisuMZ[_0x2fd07a(0x338)]['Parse_Notetags_CreateJS'](_0x5e0b74);},VisuMZ[_0x1c7984(0x338)][_0x1c7984(0x28b)]=VisuMZ[_0x1c7984(0x28b)],VisuMZ['ParseArmorNotetags']=function(_0x3d50df){const _0x2e72c1=_0x1c7984;VisuMZ[_0x2e72c1(0x338)]['ParseArmorNotetags'][_0x2e72c1(0x253)](this,_0x3d50df),VisuMZ['ItemCraftingSys']['Parse_Notetags_CreateJS'](_0x3d50df);},VisuMZ[_0x1c7984(0x338)][_0x1c7984(0x15d)]=function(_0x573b2d){const _0x3cecce=_0x1c7984;_0x573b2d[_0x3cecce(0x251)]['match'](VisuMZ['ItemCraftingSys'][_0x3cecce(0x1cf)][_0x3cecce(0x161)])&&VisuMZ[_0x3cecce(0x338)]['createJS'](_0x573b2d,RegExp['$1']);},VisuMZ[_0x1c7984(0x338)]['JS']={},VisuMZ['ItemCraftingSys'][_0x1c7984(0x1f6)]=function(_0x34fcb0,_0x5ba27f){const _0x1ce75d=_0x1c7984,_0x51dc10=_0x1ce75d(0x193)[_0x1ce75d(0x1e1)](_0x5ba27f),_0x193089=DataManager[_0x1ce75d(0x319)](_0x34fcb0);VisuMZ[_0x1ce75d(0x338)]['JS'][_0x193089]=new Function(_0x51dc10);},DataManager['isCraftItemListed']=function(_0xf70f62){const _0x3a5650=_0x1c7984;if(!_0xf70f62)return![];if(DataManager[_0x3a5650(0x164)](_0xf70f62)['length']<=0x0)return![];if(_0xf70f62[_0x3a5650(0x251)][_0x3a5650(0x2be)](VisuMZ[_0x3a5650(0x338)][_0x3a5650(0x1cf)][_0x3a5650(0x20a)])){if(!$gameTemp['getCustomItemCraftingSettings']())return![];}if(!VisuMZ[_0x3a5650(0x338)]['Settings'][_0x3a5650(0x1fe)][_0x3a5650(0x1a9)][_0x3a5650(0x253)](this,_0xf70f62))return![];if(!VisuMZ[_0x3a5650(0x338)][_0x3a5650(0x168)](_0xf70f62))return![];if(!VisuMZ[_0x3a5650(0x338)]['CheckAnySwitches'](_0xf70f62))return![];return!![];},VisuMZ['ItemCraftingSys'][_0x1c7984(0x168)]=function(_0x4713ae){const _0xbf214=_0x1c7984,_0x547279=$gameTemp[_0xbf214(0x133)]();if(_0x547279&&_0x547279['BypassSwitches'])return!![];const _0x36b2d3=VisuMZ[_0xbf214(0x338)]['RegExp'][_0xbf214(0x222)],_0x27d403=_0x4713ae['note'][_0xbf214(0x2be)](_0x36b2d3);if(_0x27d403)for(const _0x289a2f of _0x27d403){if(!_0x289a2f)continue;_0x289a2f['match'](_0x36b2d3);const _0x57f425=JSON[_0xbf214(0x1d1)]('['+RegExp['$1']['match'](/\d+/g)+']');for(const _0x2175c7 of _0x57f425){if(!$gameSwitches[_0xbf214(0x23e)](_0x2175c7))return![];}}return!![];},VisuMZ[_0x1c7984(0x338)]['CheckAnySwitches']=function(_0xf032f1){const _0x4614a4=_0x1c7984,_0x3085bf=$gameTemp[_0x4614a4(0x133)]();if(_0x3085bf&&_0x3085bf['BypassSwitches'])return!![];const _0x2d5bb2=VisuMZ[_0x4614a4(0x338)][_0x4614a4(0x1cf)][_0x4614a4(0x118)],_0x621a05=_0xf032f1[_0x4614a4(0x251)]['match'](_0x2d5bb2);if(_0x621a05){for(const _0x5dc26c of _0x621a05){if(!_0x5dc26c)continue;_0x5dc26c[_0x4614a4(0x2be)](_0x2d5bb2);const _0x149c9a=JSON['parse']('['+RegExp['$1'][_0x4614a4(0x2be)](/\d+/g)+']');for(const _0x562813 of _0x149c9a){if($gameSwitches[_0x4614a4(0x23e)](_0x562813))return!![];}}return![];}return!![];},DataManager['currentCraftableItems']=function(){const _0x1afc99=_0x1c7984,_0xdb0ab=$gameTemp[_0x1afc99(0x133)]();if(_0xdb0ab)return _0xdb0ab['all']['filter'](_0x5a3296=>this[_0x1afc99(0x26a)](_0x5a3296));const _0xe9f49e=this[_0x1afc99(0x302)](),_0x5d2176=this['craftableWeapons'](),_0x1a2c99=this['craftableArmors']();return _0xe9f49e[_0x1afc99(0x238)](_0x5d2176,_0x1a2c99);},DataManager[_0x1c7984(0x302)]=function(){const _0x688f9f=_0x1c7984;let _0x18ead0=this[_0x688f9f(0x1cc)]()[_0x688f9f(0x213)](_0x5cac17=>this[_0x688f9f(0x26a)](_0x5cac17));if(VisuMZ[_0x688f9f(0x1fb)][_0x688f9f(0x14c)])VisuMZ[_0x688f9f(0x1fb)]['SortByIDandPriority'](_0x18ead0);return _0x18ead0;},DataManager[_0x1c7984(0x1cc)]=function(){const _0x2d645a=_0x1c7984;if(this[_0x2d645a(0x316)]!==undefined)return this[_0x2d645a(0x316)];this[_0x2d645a(0x316)]=[];for(const _0x1a5854 of $dataItems){if(!_0x1a5854)continue;_0x1a5854['note'][_0x2d645a(0x2be)](VisuMZ['ItemCraftingSys']['RegExp'][_0x2d645a(0x1bf)])&&this[_0x2d645a(0x316)][_0x2d645a(0x21f)](_0x1a5854);}return this[_0x2d645a(0x316)];},DataManager['craftableWeapons']=function(){const _0x1b06c1=_0x1c7984;let _0x4b41b0=this[_0x1b06c1(0x16b)]()[_0x1b06c1(0x213)](_0x232645=>this['isCraftItemListed'](_0x232645));if(VisuMZ[_0x1b06c1(0x1fb)][_0x1b06c1(0x14c)])VisuMZ[_0x1b06c1(0x1fb)][_0x1b06c1(0x14c)](_0x4b41b0);return _0x4b41b0;},DataManager['allCraftableWeapons']=function(){const _0x5b8716=_0x1c7984;if(this[_0x5b8716(0x249)]!==undefined)return this[_0x5b8716(0x249)];this['_allCraftableWeapons']=[];for(const _0x412eb1 of $dataWeapons){if(!_0x412eb1)continue;_0x412eb1[_0x5b8716(0x251)][_0x5b8716(0x2be)](VisuMZ[_0x5b8716(0x338)][_0x5b8716(0x1cf)][_0x5b8716(0x1bf)])&&this[_0x5b8716(0x249)][_0x5b8716(0x21f)](_0x412eb1);}return this[_0x5b8716(0x249)];},DataManager[_0x1c7984(0x217)]=function(){const _0x473242=_0x1c7984;let _0x23c214=this[_0x473242(0x162)]()[_0x473242(0x213)](_0x115f59=>this['isCraftItemListed'](_0x115f59));if(VisuMZ['ItemsEquipsCore'][_0x473242(0x14c)])VisuMZ[_0x473242(0x1fb)][_0x473242(0x14c)](_0x23c214);return _0x23c214;},DataManager[_0x1c7984(0x162)]=function(){const _0x3c9928=_0x1c7984;if(this[_0x3c9928(0x14b)]!==undefined)return this[_0x3c9928(0x14b)];this[_0x3c9928(0x14b)]=[];for(const _0x3b6859 of $dataArmors){if(!_0x3b6859)continue;_0x3b6859[_0x3c9928(0x251)]['match'](VisuMZ[_0x3c9928(0x338)][_0x3c9928(0x1cf)][_0x3c9928(0x1bf)])&&this[_0x3c9928(0x14b)][_0x3c9928(0x21f)](_0x3b6859);}return this[_0x3c9928(0x14b)];},DataManager[_0x1c7984(0x164)]=function(_0x2b92c5){const _0x217a27=_0x1c7984;if(!_0x2b92c5)return[];const _0x195a89=this[_0x217a27(0x319)](_0x2b92c5);return this[_0x217a27(0x225)]===undefined&&this[_0x217a27(0x1c8)](),this[_0x217a27(0x225)][_0x195a89]||[];},DataManager[_0x1c7984(0x319)]=function(_0x22d3a5){const _0x101c3c=_0x1c7984;let _0x16fc58=_0x101c3c(0x1d0);if(this[_0x101c3c(0x224)](_0x22d3a5))return _0x16fc58['format']('Item',_0x22d3a5['id']);if(this[_0x101c3c(0x33f)](_0x22d3a5))return _0x16fc58[_0x101c3c(0x1e1)](_0x101c3c(0x204),_0x22d3a5['id']);if(this[_0x101c3c(0x286)](_0x22d3a5))return _0x16fc58[_0x101c3c(0x1e1)]('Armor',_0x22d3a5['id']);return'';},DataManager[_0x1c7984(0x1c8)]=function(){const _0x3c9c62=_0x1c7984;this['_craftingIngredients']={};const _0x3c4e84=$dataItems[_0x3c9c62(0x238)]($dataWeapons,$dataArmors);for(const _0x506fda of _0x3c4e84){if(!_0x506fda)continue;if(_0x506fda[_0x3c9c62(0x251)][_0x3c9c62(0x2be)](VisuMZ['ItemCraftingSys']['RegExp'][_0x3c9c62(0x1bf)])){const _0x290d99=String(RegExp['$1'])[_0x3c9c62(0x144)](/[\r\n]+/),_0x3bfabb=this[_0x3c9c62(0x332)](_0x506fda,_0x290d99);if(_0x3bfabb[_0x3c9c62(0x2ad)]<=0x0)continue;const _0x2345c8=this['createCraftingItemKey'](_0x506fda);this[_0x3c9c62(0x225)][_0x2345c8]=_0x3bfabb;}}},DataManager[_0x1c7984(0x332)]=function(_0x4d0953,_0x3c4041){const _0x2e9663=_0x1c7984;let _0x51abbd=[];for(let _0xc3c16c of _0x3c4041){_0xc3c16c=_0xc3c16c['trim']();if(_0xc3c16c[_0x2e9663(0x2be)](/GOLD:[ ](\d+)/i))_0x51abbd[_0x2e9663(0x21f)]([_0x2e9663(0x209),Number(RegExp['$1'])]);else{if(_0xc3c16c['match'](/CATEGORY[ ](.*):[ ](\d+)/i)){const _0x5a21b5=String(RegExp['$1'])[_0x2e9663(0x2f5)](),_0x4d66be=Number(RegExp['$2'])||0x1,_0x1bb069='category:\x20%1'[_0x2e9663(0x1e1)](_0x5a21b5);_0x51abbd['push']([_0x1bb069,_0x4d66be]);}else{if(_0xc3c16c['match'](/(.*?)[ ](\d+):[ ](\d+)/i)){const _0x2505b2=RegExp['$1'][_0x2e9663(0x17f)]()[_0x2e9663(0x2f5)](),_0xf870f3=Number(RegExp['$2'])||0x0,_0x2cbe83=Number(RegExp['$3'])||0x1;let _0x51bde4=null;if(['item',_0x2e9663(0x2ee)][_0x2e9663(0x12e)](_0x2505b2))_0x51bde4=$dataItems;if([_0x2e9663(0x25e),'weapons']['includes'](_0x2505b2))_0x51bde4=$dataWeapons;if([_0x2e9663(0x307),'armors'][_0x2e9663(0x12e)](_0x2505b2))_0x51bde4=$dataArmors;this['checkItemCraftingResultsValid'](_0x4d0953,_0x51bde4,_0xf870f3,_0x51abbd)&&_0x51abbd[_0x2e9663(0x21f)]([_0x51bde4[_0xf870f3],_0x2cbe83]);}else{if(_0xc3c16c[_0x2e9663(0x2be)](/(.*?)[ ](.*):[ ](\d+)/i)){const _0x35e30d=RegExp['$1']['toLowerCase']()[_0x2e9663(0x2f5)](),_0x41e297=RegExp['$2'][_0x2e9663(0x2f5)](),_0x2dd4df=Number(RegExp['$3'])||0x1;let _0x3e2188=null,_0x4f8785=0x0;[_0x2e9663(0x1a0),'items'][_0x2e9663(0x12e)](_0x35e30d)&&(_0x3e2188=$dataItems,_0x4f8785=this['getItemIdWithName'](_0x41e297)),[_0x2e9663(0x25e),_0x2e9663(0x165)][_0x2e9663(0x12e)](_0x35e30d)&&(_0x3e2188=$dataWeapons,_0x4f8785=this[_0x2e9663(0x2b8)](_0x41e297)),['armor','armors']['includes'](_0x35e30d)&&(_0x3e2188=$dataArmors,_0x4f8785=this['getArmorIdWithName'](_0x41e297)),this['checkItemCraftingResultsValid'](_0x4d0953,_0x3e2188,_0x4f8785,_0x51abbd)&&_0x51abbd[_0x2e9663(0x21f)]([_0x3e2188[_0x4f8785],_0x2dd4df]);}}}}}return _0x51abbd;},DataManager[_0x1c7984(0x301)]=function(_0x2055f0,_0x502fee,_0x112ffa,_0x2c06b0){if(!_0x502fee)return![];if(!_0x502fee[_0x112ffa])return![];const _0xe63b16=_0x502fee[_0x112ffa];if(_0xe63b16===_0x2055f0)return![];for(const _0x187cc2 of _0x2c06b0){if(!_0x187cc2)continue;if(_0x187cc2[0x0]===_0xe63b16)return![];}return!![];},DataManager[_0x1c7984(0x328)]=function(_0x42a6e1){const _0x339f48=_0x1c7984;_0x42a6e1=_0x42a6e1[_0x339f48(0x232)]()[_0x339f48(0x2f5)](),this[_0x339f48(0x13d)]=this[_0x339f48(0x13d)]||{};if(this[_0x339f48(0x13d)][_0x42a6e1])return this[_0x339f48(0x13d)][_0x42a6e1];for(const _0x45ecbd of $dataItems){if(!_0x45ecbd)continue;this[_0x339f48(0x13d)][_0x45ecbd['name'][_0x339f48(0x232)]()[_0x339f48(0x2f5)]()]=_0x45ecbd['id'];}return this[_0x339f48(0x13d)][_0x42a6e1]||0x0;},DataManager[_0x1c7984(0x2b8)]=function(_0x39bbb6){const _0x428d3b=_0x1c7984;_0x39bbb6=_0x39bbb6[_0x428d3b(0x232)]()[_0x428d3b(0x2f5)](),this[_0x428d3b(0x1d3)]=this['_weaponIDs']||{};if(this[_0x428d3b(0x1d3)][_0x39bbb6])return this[_0x428d3b(0x1d3)][_0x39bbb6];for(const _0x271041 of $dataWeapons){if(!_0x271041)continue;this[_0x428d3b(0x1d3)][_0x271041[_0x428d3b(0x163)]['toUpperCase']()[_0x428d3b(0x2f5)]()]=_0x271041['id'];}return this['_weaponIDs'][_0x39bbb6]||0x0;},DataManager['getArmorIdWithName']=function(_0x3e7290){const _0x35e079=_0x1c7984;_0x3e7290=_0x3e7290[_0x35e079(0x232)]()[_0x35e079(0x2f5)](),this[_0x35e079(0x244)]=this[_0x35e079(0x244)]||{};if(this[_0x35e079(0x244)][_0x3e7290])return this[_0x35e079(0x244)][_0x3e7290];for(const _0x20d142 of $dataArmors){if(!_0x20d142)continue;this['_armorIDs'][_0x20d142[_0x35e079(0x163)]['toUpperCase']()['trim']()]=_0x20d142['id'];}return this[_0x35e079(0x244)][_0x3e7290]||0x0;},DataManager['isCraftingItemMasked']=function(_0x793768){const _0x554a60=_0x1c7984;if(!_0x793768)return![];if(DataManager[_0x554a60(0x202)](_0x793768))return![];if(!VisuMZ['ItemCraftingSys']['Settings'][_0x554a60(0x275)][_0x554a60(0x2bf)])return![];DataManager['getProxyItem']&&(_0x793768=DataManager[_0x554a60(0x311)](_0x793768));const _0x23bbf5=$gameTemp['getCustomItemCraftingSettings']();if(_0x23bbf5&&_0x23bbf5['BypassMasks'])return![];if(_0x793768[_0x554a60(0x251)][_0x554a60(0x2be)](VisuMZ[_0x554a60(0x338)][_0x554a60(0x1cf)][_0x554a60(0x1e4)]))return![];return!$gameSystem[_0x554a60(0x12c)](_0x793768);},DataManager[_0x1c7984(0x202)]=function(_0x411057){const _0x3aacb3=_0x1c7984;if(!Imported[_0x3aacb3(0x1c4)])return![];return this[_0x3aacb3(0x308)](_0x411057)!==null;},DataManager[_0x1c7984(0x308)]=function(_0x1ec394){const _0x42eec4=_0x1c7984;if(!_0x1ec394)return null;if(this[_0x42eec4(0x288)](_0x1ec394))return null;if(this[_0x42eec4(0x262)](_0x1ec394))return null;if(!Imported[_0x42eec4(0x1c4)])return null;let _0xacb33d='';if(DataManager[_0x42eec4(0x224)](_0x1ec394))_0xacb33d=_0x42eec4(0x228)[_0x42eec4(0x1e1)](_0x1ec394['id']);else{if(DataManager[_0x42eec4(0x33f)](_0x1ec394))_0xacb33d=_0x42eec4(0x1e8)['format'](_0x1ec394['id']);else{if(DataManager[_0x42eec4(0x286)](_0x1ec394))_0xacb33d=_0x42eec4(0x252)['format'](_0x1ec394['id']);else return null;}}DataManager[_0x42eec4(0x247)]=DataManager[_0x42eec4(0x247)]||{};if(DataManager['_cache_getCraftBatchItems'][_0xacb33d]!==undefined)return DataManager[_0x42eec4(0x247)][_0xacb33d];let _0x308ba6=![],_0x1a0ead={};const _0xbf0d8a=VisuMZ[_0x42eec4(0x338)][_0x42eec4(0x1cf)],_0x53dbe9=_0x1ec394[_0x42eec4(0x251)]||'';if(_0x53dbe9['match'](_0xbf0d8a[_0x42eec4(0x13c)])){const _0x5173cc=String(RegExp['$1'])['split'](/[\r\n]+/)[_0x42eec4(0x2e5)]('');_0x1a0ead={'items':{},'weapons':{},'armors':{}};for(const _0x3a96b4 of _0x5173cc){if(_0x3a96b4[_0x42eec4(0x2be)](/ITEM[ ](.*):[ ](\d+)/i)){const _0x5adb1e=String(RegExp['$1']),_0x2934f1=Math[_0x42eec4(0x200)](0x1,Number(RegExp['$2'])),_0x2b08c7=/^\d+$/[_0x42eec4(0x276)](_0x5adb1e),_0x3562f3=_0x2b08c7?Number(_0x5adb1e):this['getItemIdWithName'](_0x5adb1e);if(DataManager[_0x42eec4(0x224)](_0x1ec394)&&_0x3562f3===_0x1ec394['id']){let _0x10ce6f='';_0x10ce6f+=_0x42eec4(0x317)[_0x42eec4(0x1e1)](_0x1ec394[_0x42eec4(0x163)]),_0x10ce6f+='-\x20Items\x20must\x20never\x20give\x20themselves!',alert(_0x10ce6f),SceneManager[_0x42eec4(0x1fc)]();}_0x1a0ead[_0x42eec4(0x2ee)][_0x3562f3]=_0x2934f1,_0x308ba6=!![];}else{if(_0x3a96b4[_0x42eec4(0x2be)](/ITEM[ ](.*)/i)){const _0x42724e=String(RegExp['$1']),_0xa0ce45=/^\d+$/[_0x42eec4(0x276)](_0x42724e),_0x161851=_0xa0ce45?Number(_0x42724e):this[_0x42eec4(0x328)](_0x42724e);if(DataManager['isItem'](_0x1ec394)&&_0x161851===_0x1ec394['id']){let _0x22f34c='';_0x22f34c+=_0x42eec4(0x317)[_0x42eec4(0x1e1)](_0x1ec394[_0x42eec4(0x163)]),_0x22f34c+='-\x20Items\x20must\x20never\x20give\x20themselves!',alert(_0x22f34c),SceneManager[_0x42eec4(0x1fc)]();}_0x1a0ead[_0x42eec4(0x2ee)][_0x161851]=0x1,_0x308ba6=!![];}}if(_0x3a96b4[_0x42eec4(0x2be)](/WEAPON[ ](.*):[ ](\d+)/i)){const _0x56edc3=String(RegExp['$1']),_0x3ba2da=Math[_0x42eec4(0x200)](0x1,Number(RegExp['$2'])),_0x4d9ea9=/^\d+$/[_0x42eec4(0x276)](_0x56edc3),_0xf8dabf=_0x4d9ea9?Number(_0x56edc3):this['getWeaponIdWithName'](_0x56edc3);if(DataManager['isWeapon'](_0x1ec394)&&_0xf8dabf===_0x1ec394['id']){let _0x3cc280='';_0x3cc280+=_0x42eec4(0x317)[_0x42eec4(0x1e1)](_0x1ec394[_0x42eec4(0x163)]),_0x3cc280+='-\x20Items\x20must\x20never\x20give\x20themselves!',alert(_0x3cc280),SceneManager[_0x42eec4(0x1fc)]();}_0x1a0ead[_0x42eec4(0x165)][_0xf8dabf]=_0x3ba2da,_0x308ba6=!![];}else{if(_0x3a96b4[_0x42eec4(0x2be)](/WEAPON[ ](.*)/i)){const _0x52547b=String(RegExp['$1']),_0x43947d=/^\d+$/[_0x42eec4(0x276)](_0x52547b),_0x467e22=_0x43947d?Number(_0x52547b):this[_0x42eec4(0x2b8)](_0x52547b);if(DataManager['isWeapon'](_0x1ec394)&&_0x467e22===_0x1ec394['id']){let _0x57cf83='';_0x57cf83+='%1\x20has\x20illegal\x20batch\x20contents:\x0a'[_0x42eec4(0x1e1)](_0x1ec394[_0x42eec4(0x163)]),_0x57cf83+='-\x20Items\x20must\x20never\x20give\x20themselves!',alert(_0x57cf83),SceneManager['exit']();}_0x1a0ead[_0x42eec4(0x165)][_0x467e22]=0x1,_0x308ba6=!![];}}if(_0x3a96b4[_0x42eec4(0x2be)](/ARMOR[ ](.*):[ ](\d+)/i)){const _0x845341=String(RegExp['$1']),_0x1c5f92=Math[_0x42eec4(0x200)](0x1,Number(RegExp['$2'])),_0x11c8ee=/^\d+$/[_0x42eec4(0x276)](_0x845341),_0x119526=_0x11c8ee?Number(_0x845341):this[_0x42eec4(0x139)](_0x845341);if(DataManager[_0x42eec4(0x286)](_0x1ec394)&&_0x119526===_0x1ec394['id']){let _0x11075d='';_0x11075d+='%1\x20has\x20illegal\x20batch\x20contents:\x0a'['format'](_0x1ec394[_0x42eec4(0x163)]),_0x11075d+=_0x42eec4(0x184),alert(_0x11075d),SceneManager[_0x42eec4(0x1fc)]();}_0x1a0ead[_0x42eec4(0x269)][_0x119526]=_0x1c5f92,_0x308ba6=!![];}else{if(_0x3a96b4[_0x42eec4(0x2be)](/ARMOR[ ](.*)/i)){const _0xa167fc=String(RegExp['$1']),_0x4c33f6=/^\d+$/['test'](_0xa167fc),_0x191bbe=_0x4c33f6?Number(_0xa167fc):this['getArmorIdWithName'](_0xa167fc);if(DataManager[_0x42eec4(0x286)](_0x1ec394)&&_0x191bbe===_0x1ec394['id']){let _0x36827a='';_0x36827a+=_0x42eec4(0x317)[_0x42eec4(0x1e1)](_0x1ec394['name']),_0x36827a+='-\x20Items\x20must\x20never\x20give\x20themselves!',alert(_0x36827a),SceneManager[_0x42eec4(0x1fc)]();}_0x1a0ead[_0x42eec4(0x269)][_0x191bbe]=0x1,_0x308ba6=!![];}}}}if(!_0x308ba6)_0x1a0ead=null;return DataManager[_0x42eec4(0x247)][_0xacb33d]=_0x1a0ead,DataManager[_0x42eec4(0x247)][_0xacb33d];},ImageManager[_0x1c7984(0x246)]=VisuMZ['ItemCraftingSys'][_0x1c7984(0x24c)][_0x1c7984(0x1fe)]['CraftedIcon'],SoundManager[_0x1c7984(0x20f)]=function(_0x16fc80){const _0x1f89d4=_0x1c7984;AudioManager['playStaticSe'](VisuMZ[_0x1f89d4(0x338)][_0x1f89d4(0x24c)][_0x1f89d4(0x27d)]);},TextManager[_0x1c7984(0x20e)]=VisuMZ[_0x1c7984(0x338)][_0x1c7984(0x24c)]['General'][_0x1c7984(0x1bd)],TextManager[_0x1c7984(0x177)]=VisuMZ['ItemCraftingSys'][_0x1c7984(0x24c)][_0x1c7984(0x1fe)][_0x1c7984(0x2fe)],TextManager[_0x1c7984(0x248)]=VisuMZ[_0x1c7984(0x338)][_0x1c7984(0x24c)]['Mask']['MaskLetter'],TextManager[_0x1c7984(0x333)]=VisuMZ[_0x1c7984(0x338)][_0x1c7984(0x24c)][_0x1c7984(0x2b4)]['Name'],TextManager[_0x1c7984(0x2da)]={'owned':VisuMZ[_0x1c7984(0x338)][_0x1c7984(0x24c)][_0x1c7984(0x1fe)][_0x1c7984(0x28c)]||_0x1c7984(0x10e),'shift':VisuMZ['ItemCraftingSys'][_0x1c7984(0x24c)]['General'][_0x1c7984(0x183)]||_0x1c7984(0x227),'net':VisuMZ[_0x1c7984(0x338)]['Settings'][_0x1c7984(0x1fe)][_0x1c7984(0x2b3)]||'Net'},ColorManager['getColor']=function(_0x1acd1f){const _0x365c41=_0x1c7984;return _0x1acd1f=String(_0x1acd1f),_0x1acd1f[_0x365c41(0x2be)](/#(.*)/i)?_0x365c41(0x16d)[_0x365c41(0x1e1)](String(RegExp['$1'])):this[_0x365c41(0x2a1)](Number(_0x1acd1f));},SceneManager[_0x1c7984(0x31e)]=function(){const _0x47726d=_0x1c7984;return this[_0x47726d(0x22e)]&&this[_0x47726d(0x22e)]['constructor']===Scene_Battle;},SceneManager[_0x1c7984(0x272)]=function(){const _0x4b0116=_0x1c7984;return this['_scene']&&this[_0x4b0116(0x22e)]['constructor']===Scene_ItemCrafting;},Game_Temp['prototype'][_0x1c7984(0x133)]=function(){const _0x5e17c7=_0x1c7984;return this[_0x5e17c7(0x21e)];},Game_Temp['prototype'][_0x1c7984(0x115)]=function(){const _0x44e570=_0x1c7984;this[_0x44e570(0x21e)]=undefined;},Game_Temp[_0x1c7984(0x289)][_0x1c7984(0x179)]=function(_0x16e053){const _0x38eea4=_0x1c7984;this[_0x38eea4(0x21e)]=_0x16e053;},VisuMZ[_0x1c7984(0x338)][_0x1c7984(0x2db)]=Game_System['prototype'][_0x1c7984(0x318)],Game_System[_0x1c7984(0x289)][_0x1c7984(0x318)]=function(){const _0x11e850=_0x1c7984;VisuMZ[_0x11e850(0x338)][_0x11e850(0x2db)][_0x11e850(0x253)](this),this[_0x11e850(0x16a)](),this['initItemCraftingSys'](),this[_0x11e850(0x31b)]();},Game_System['prototype'][_0x1c7984(0x16a)]=function(){const _0x32a2fa=_0x1c7984;this[_0x32a2fa(0x1ce)]={'shown':VisuMZ[_0x32a2fa(0x338)][_0x32a2fa(0x24c)]['MainMenu']['ShowMainMenu'],'enabled':VisuMZ['ItemCraftingSys']['Settings']['MainMenu']['EnableMainMenu']};},Game_System[_0x1c7984(0x289)][_0x1c7984(0x18f)]=function(){const _0x33d38c=_0x1c7984;if(this[_0x33d38c(0x1ce)]===undefined)this[_0x33d38c(0x16a)]();return this[_0x33d38c(0x1ce)][_0x33d38c(0x271)];},Game_System[_0x1c7984(0x289)][_0x1c7984(0x18b)]=function(_0x330ffb){const _0x1f2b69=_0x1c7984;if(this['_ItemCrafting_MainMenu']===undefined)this[_0x1f2b69(0x16a)]();this[_0x1f2b69(0x1ce)][_0x1f2b69(0x271)]=_0x330ffb;},Game_System[_0x1c7984(0x289)][_0x1c7984(0x143)]=function(){const _0x40952b=_0x1c7984;if(this[_0x40952b(0x1ce)]===undefined)this[_0x40952b(0x16a)]();return this[_0x40952b(0x1ce)][_0x40952b(0x127)];},Game_System[_0x1c7984(0x289)][_0x1c7984(0x22c)]=function(_0x5bb2d7){const _0x6b3f07=_0x1c7984;if(this['_ItemCrafting_MainMenu']===undefined)this[_0x6b3f07(0x16a)]();this[_0x6b3f07(0x1ce)][_0x6b3f07(0x127)]=_0x5bb2d7;},Game_System['prototype'][_0x1c7984(0x18c)]=function(){const _0x371b90=_0x1c7984;this[_0x371b90(0x2cc)]={'items':{},'weapons':{},'armors':{}};},Game_System['prototype'][_0x1c7984(0x12c)]=function(_0xf70749){const _0x140178=_0x1c7984;return!!this[_0x140178(0x264)](_0xf70749);},Game_System['prototype'][_0x1c7984(0x264)]=function(_0x16874b){const _0x30fe14=_0x1c7984;if(!_0x16874b)return![];if(this[_0x30fe14(0x2cc)]===undefined)this[_0x30fe14(0x18c)]();let _0x580b3d={};if(DataManager[_0x30fe14(0x224)](_0x16874b))_0x580b3d=this['_itemsCrafted']['items'];if(DataManager['isWeapon'](_0x16874b))_0x580b3d=this[_0x30fe14(0x2cc)][_0x30fe14(0x165)];if(DataManager[_0x30fe14(0x286)](_0x16874b))_0x580b3d=this[_0x30fe14(0x2cc)]['armors'];return _0x580b3d[_0x16874b['id']]||0x0;},Game_System['prototype'][_0x1c7984(0x2a8)]=function(_0x1e6e2f,_0x31380c){const _0x4190c4=_0x1c7984;if(!_0x1e6e2f)return![];if(this[_0x4190c4(0x2cc)]===undefined)this[_0x4190c4(0x18c)]();_0x31380c=_0x31380c||0x1;let _0x37109b={};if(DataManager[_0x4190c4(0x224)](_0x1e6e2f))_0x37109b=this[_0x4190c4(0x2cc)][_0x4190c4(0x2ee)];if(DataManager[_0x4190c4(0x33f)](_0x1e6e2f))_0x37109b=this['_itemsCrafted']['weapons'];if(DataManager['isArmor'](_0x1e6e2f))_0x37109b=this[_0x4190c4(0x2cc)]['armors'];_0x37109b[_0x1e6e2f['id']]=_0x37109b[_0x1e6e2f['id']]||0x0,_0x37109b[_0x1e6e2f['id']]+=_0x31380c;},Game_System[_0x1c7984(0x289)][_0x1c7984(0x31b)]=function(){const _0x4cb954=_0x1c7984;this[_0x4cb954(0x292)]={'items':[],'weapons':[],'armors':[]};},Game_System[_0x1c7984(0x289)]['registerCraftingEvent']=function(_0x4e6af2){const _0x34f870=_0x1c7984;if(this[_0x34f870(0x292)]===undefined)this['initItemCraftingEvents']();let _0x2db778=[];if(DataManager[_0x34f870(0x224)](_0x4e6af2))_0x2db778=this['_craftingEvents']['items'];else{if(DataManager[_0x34f870(0x33f)](_0x4e6af2))_0x2db778=this[_0x34f870(0x292)][_0x34f870(0x165)];else DataManager[_0x34f870(0x286)](_0x4e6af2)&&(_0x2db778=this[_0x34f870(0x292)][_0x34f870(0x269)]);}!_0x2db778[_0x34f870(0x12e)](_0x4e6af2['id'])&&_0x2db778['push'](_0x4e6af2['id']);},Game_System[_0x1c7984(0x289)][_0x1c7984(0x2d5)]=function(_0x1b84ee){const _0x1a206b=_0x1c7984;if(this[_0x1a206b(0x292)]===undefined)this[_0x1a206b(0x31b)]();let _0x21fb64=[];if(DataManager[_0x1a206b(0x224)](_0x1b84ee))_0x21fb64=this[_0x1a206b(0x292)][_0x1a206b(0x2ee)];else{if(DataManager[_0x1a206b(0x33f)](_0x1b84ee))_0x21fb64=this[_0x1a206b(0x292)][_0x1a206b(0x165)];else DataManager[_0x1a206b(0x286)](_0x1b84ee)&&(_0x21fb64=this[_0x1a206b(0x292)][_0x1a206b(0x269)]);}return _0x21fb64[_0x1a206b(0x12e)](_0x1b84ee['id']);},VisuMZ[_0x1c7984(0x338)][_0x1c7984(0x1c0)]=Game_Party[_0x1c7984(0x289)][_0x1c7984(0x33a)],Game_Party['prototype'][_0x1c7984(0x33a)]=function(_0x57620b){const _0x58b556=_0x1c7984;if(DataManager['hasCraftBatchItems'](_0x57620b))return 0x0;return VisuMZ[_0x58b556(0x338)][_0x58b556(0x1c0)][_0x58b556(0x253)](this,_0x57620b);},VisuMZ['ItemCraftingSys'][_0x1c7984(0x2a0)]=Game_Party[_0x1c7984(0x289)][_0x1c7984(0x2f6)],Game_Party[_0x1c7984(0x289)][_0x1c7984(0x2f6)]=function(_0x1fb231,_0x1fcfef,_0x904767){const _0x13a678=_0x1c7984;DataManager['hasCraftBatchItems'](_0x1fb231)&&_0x1fcfef>0x0?this['gainCraftBatchItems'](_0x1fb231,_0x1fcfef):VisuMZ['ItemCraftingSys'][_0x13a678(0x2a0)][_0x13a678(0x253)](this,_0x1fb231,_0x1fcfef,_0x904767);},Game_Party[_0x1c7984(0x289)][_0x1c7984(0x1a1)]=function(_0x551d2c,_0x2cf905){const _0x7a238f=_0x1c7984,_0x36fb13=DataManager[_0x7a238f(0x308)](_0x551d2c),_0x16cfad=[_0x7a238f(0x2ee),'weapons',_0x7a238f(0x269)];for(const _0x58a2c6 of _0x16cfad){const _0x765f02=_0x36fb13[_0x58a2c6];for(const _0x3e199c in _0x765f02){const _0x95ed31=Number(_0x3e199c),_0x5f3917=(_0x765f02[_0x3e199c]||0x1)*_0x2cf905;let _0x10bb99=null;if(_0x58a2c6==='items')_0x10bb99=$dataItems[_0x95ed31];if(_0x58a2c6==='weapons')_0x10bb99=$dataWeapons[_0x95ed31];if(_0x58a2c6===_0x7a238f(0x269))_0x10bb99=$dataArmors[_0x95ed31];if(DataManager[_0x7a238f(0x262)](_0x10bb99))continue;_0x10bb99&&(this[_0x7a238f(0x2f6)](_0x10bb99,_0x5f3917),![]&&console['log'](_0x10bb99[_0x7a238f(0x163)]+'\x20x'+_0x5f3917));}}},Game_Party[_0x1c7984(0x289)][_0x1c7984(0x23a)]=function(_0x3907ec){const _0x5354fa=_0x1c7984,_0x5b5254=DataManager[_0x5354fa(0x308)](_0x3907ec),_0x2b19df=[_0x5354fa(0x2ee),_0x5354fa(0x165),_0x5354fa(0x269)];for(const _0x2f7d44 of _0x2b19df){const _0x19cfaf=_0x5b5254[_0x2f7d44];for(const _0x4c1805 in _0x19cfaf){const _0x50301b=Number(_0x4c1805);let _0x26c3c1=null;if(_0x2f7d44==='items')_0x26c3c1=$dataItems[_0x50301b];if(_0x2f7d44===_0x5354fa(0x165))_0x26c3c1=$dataWeapons[_0x50301b];if(_0x2f7d44==='armors')_0x26c3c1=$dataArmors[_0x50301b];if(DataManager['isProxyItem'](_0x26c3c1))continue;if(_0x26c3c1&&!this[_0x5354fa(0x20b)](_0x26c3c1))return![];}}return!![];},Game_Party[_0x1c7984(0x289)]['calcCraftBatchItemsMax']=function(_0x4855f0){const _0x47111b=_0x1c7984;let _0x1b661c=0x0;const _0x5ba0f8=DataManager[_0x47111b(0x308)](_0x4855f0),_0x561557=['items',_0x47111b(0x165),_0x47111b(0x269)];for(const _0x58d15b of _0x561557){const _0x3adcfe=_0x5ba0f8[_0x58d15b];for(const _0x417acd in _0x3adcfe){const _0x23c2b5=Number(_0x417acd),_0x483ff8=_0x3adcfe[_0x417acd]||0x1;let _0x9e59b0=null;if(_0x58d15b===_0x47111b(0x2ee))_0x9e59b0=$dataItems[_0x23c2b5];if(_0x58d15b===_0x47111b(0x165))_0x9e59b0=$dataWeapons[_0x23c2b5];if(_0x58d15b===_0x47111b(0x269))_0x9e59b0=$dataArmors[_0x23c2b5];if(DataManager['isProxyItem'](_0x9e59b0))continue;if(_0x9e59b0){const _0x3322d6=this['maxItems'](_0x9e59b0),_0x4bbf25=this[_0x47111b(0x33a)](_0x9e59b0),_0x159601=_0x3322d6-_0x4bbf25;if(_0x159601>0x0){let _0x65f936=_0x159601/_0x483ff8;_0x65f936=Math['ceil'](_0x65f936),_0x1b661c=Math[_0x47111b(0x200)](_0x1b661c,_0x65f936);}}}}const _0x49bc96=DataManager[_0x47111b(0x164)](_0x4855f0);for(const _0x3655c7 of _0x49bc96){if(!_0x3655c7)continue;let _0x15717f=_0x3655c7[0x0];const _0x3eda21=_0x3655c7[0x1];if(_0x15717f==='gold'){if($gameParty['gold']()<_0x3eda21)return 0x0;let _0x17a8e3=Math[_0x47111b(0x2ed)]($gameParty['gold']()/_0x3eda21);_0x1b661c=Math[_0x47111b(0x211)](_0x1b661c,_0x17a8e3);}else{typeof _0x15717f==='string'&&_0x15717f['match'](/CATEGORY/i)&&(_0x15717f=SceneManager['_scene']['_ingredientsList'][categoryIndex],categoryIndex+=0x1);let _0x492368=Math[_0x47111b(0x2ed)]($gameParty[_0x47111b(0x33a)](_0x15717f)/_0x3eda21);_0x1b661c=Math[_0x47111b(0x211)](_0x1b661c,_0x492368);}if(_0x1b661c<=0x0)return 0x0;}return _0x1b661c;},VisuMZ[_0x1c7984(0x338)][_0x1c7984(0x214)]=Scene_Menu['prototype'][_0x1c7984(0x2c9)],Scene_Menu['prototype'][_0x1c7984(0x2c9)]=function(){const _0xd2e2ad=_0x1c7984;VisuMZ[_0xd2e2ad(0x338)]['Scene_Menu_createCommandWindow']['call'](this);const _0x209720=this['_commandWindow'];_0x209720[_0xd2e2ad(0x128)](_0xd2e2ad(0x1ab),this['commandItemCrafting'][_0xd2e2ad(0x12a)](this));},Scene_Menu[_0x1c7984(0x289)]['commandItemCrafting']=function(){const _0x3c28c6=_0x1c7984;SceneManager[_0x3c28c6(0x21f)](Scene_ItemCrafting);};function Scene_ItemCrafting(){const _0x3c45be=_0x1c7984;this[_0x3c45be(0x318)](...arguments);}function _0x3fc4(_0xdb5fe0,_0x2afbd7){const _0x3ff520=_0x3ff5();return _0x3fc4=function(_0x3fc499,_0x1f948d){_0x3fc499=_0x3fc499-0x10d;let _0x119758=_0x3ff520[_0x3fc499];return _0x119758;},_0x3fc4(_0xdb5fe0,_0x2afbd7);}Scene_ItemCrafting[_0x1c7984(0x289)]=Object[_0x1c7984(0x220)](Scene_Item[_0x1c7984(0x289)]),Scene_ItemCrafting[_0x1c7984(0x289)]['constructor']=Scene_ItemCrafting,Scene_ItemCrafting[_0x1c7984(0x289)][_0x1c7984(0x318)]=function(){const _0x3fa55a=_0x1c7984;Scene_Item[_0x3fa55a(0x289)]['initialize']['call'](this),$gameSystem[_0x3fa55a(0x257)]=undefined;},Scene_ItemCrafting[_0x1c7984(0x289)][_0x1c7984(0x1ca)]=function(){const _0x4df8f9=_0x1c7984;Scene_Item[_0x4df8f9(0x289)][_0x4df8f9(0x1ca)]['call'](this),this[_0x4df8f9(0x255)]();},Scene_ItemCrafting[_0x1c7984(0x289)][_0x1c7984(0x220)]=function(){const _0xfdc1a4=_0x1c7984;Scene_Item[_0xfdc1a4(0x289)][_0xfdc1a4(0x220)][_0xfdc1a4(0x253)](this),this[_0xfdc1a4(0x2fd)](),this['createNumberWindow'](),this[_0xfdc1a4(0x2c1)](),this[_0xfdc1a4(0x29f)](),this[_0xfdc1a4(0x2f7)]()&&this['onCategoryOk'](),this[_0xfdc1a4(0x190)](),this[_0xfdc1a4(0x215)]();},Scene_ItemCrafting[_0x1c7984(0x289)]['setWindowBackgroundTypes']=function(){const _0x224b5e=_0x1c7984,_0x405c38=VisuMZ[_0x224b5e(0x338)][_0x224b5e(0x24c)][_0x224b5e(0x335)];this[_0x224b5e(0x212)]&&this[_0x224b5e(0x212)][_0x224b5e(0x250)](_0x405c38['HelpBgType']),this[_0x224b5e(0x279)]&&this[_0x224b5e(0x279)][_0x224b5e(0x250)](_0x405c38['CategoryBgType']),this[_0x224b5e(0x19e)]&&this[_0x224b5e(0x19e)]['setBackgroundType'](_0x405c38[_0x224b5e(0x2c7)]),this[_0x224b5e(0x1fd)]&&this[_0x224b5e(0x1fd)][_0x224b5e(0x250)](_0x405c38['ListBgType']),this[_0x224b5e(0x117)]&&this[_0x224b5e(0x117)][_0x224b5e(0x250)](_0x405c38[_0x224b5e(0x206)]),this[_0x224b5e(0x221)]&&this[_0x224b5e(0x221)][_0x224b5e(0x250)](_0x405c38['IngredientTitle']),this[_0x224b5e(0x147)]&&this['_ingredientSelectList'][_0x224b5e(0x250)](_0x405c38[_0x224b5e(0x116)]),this[_0x224b5e(0x2f2)]&&this[_0x224b5e(0x2f2)][_0x224b5e(0x250)](_0x405c38[_0x224b5e(0x234)]),this[_0x224b5e(0x18e)]&&this[_0x224b5e(0x18e)][_0x224b5e(0x250)](_0x405c38[_0x224b5e(0x1b2)]);},Scene_ItemCrafting[_0x1c7984(0x289)][_0x1c7984(0x110)]=function(){const _0x4e2c83=_0x1c7984;return Scene_Shop[_0x4e2c83(0x289)][_0x4e2c83(0x1d5)]['call'](this);},Scene_ItemCrafting[_0x1c7984(0x289)][_0x1c7984(0x2fd)]=function(){const _0x11800b=_0x1c7984,_0x318d5e=this[_0x11800b(0x21d)]();this[_0x11800b(0x19e)]=new Window_Gold(_0x318d5e),this[_0x11800b(0x2ba)](this[_0x11800b(0x19e)]);},Scene_ItemCrafting[_0x1c7984(0x289)][_0x1c7984(0x21d)]=function(){const _0xb31b7=_0x1c7984;return Scene_Shop['prototype'][_0xb31b7(0x281)][_0xb31b7(0x253)](this);},Scene_ItemCrafting[_0x1c7984(0x289)][_0x1c7984(0x1fa)]=function(){const _0x21ad7e=_0x1c7984;return Scene_Shop[_0x21ad7e(0x289)][_0x21ad7e(0x120)]['call'](this);},Scene_ItemCrafting['prototype'][_0x1c7984(0x24d)]=function(){const _0x42b76b=_0x1c7984;this[_0x42b76b(0x153)](),this[_0x42b76b(0x2f7)]()&&this[_0x42b76b(0x31d)](),this['allowCreateStatusWindow']()&&(this['createStatusWindow'](),this[_0x42b76b(0x2ba)](this['_itemWindow']));},Scene_ItemCrafting['prototype'][_0x1c7984(0x153)]=function(){const _0x392d38=_0x1c7984,_0xcebfaa=this['itemWindowRect']();this['_itemWindow']=new Window_ItemCraftingList(_0xcebfaa),this[_0x392d38(0x1fd)]['setHelpWindow'](this[_0x392d38(0x212)]),this['_itemWindow']['setHandler']('ok',this[_0x392d38(0x158)][_0x392d38(0x12a)](this)),this[_0x392d38(0x1fd)]['setHandler']('cancel',this[_0x392d38(0x182)][_0x392d38(0x12a)](this)),this[_0x392d38(0x2ba)](this[_0x392d38(0x1fd)]),this['_categoryWindow'][_0x392d38(0x219)](this[_0x392d38(0x1fd)]),!this[_0x392d38(0x279)][_0x392d38(0x142)]()&&(this[_0x392d38(0x1fd)]['y']-=this[_0x392d38(0x279)]['height'],this[_0x392d38(0x1fd)][_0x392d38(0x28a)]+=this['_categoryWindow'][_0x392d38(0x28a)],this['_categoryWindow']['hide'](),this[_0x392d38(0x279)]['deactivate'](),this[_0x392d38(0x2c3)]());},Scene_ItemCrafting[_0x1c7984(0x289)][_0x1c7984(0x339)]=function(){const _0x745189=_0x1c7984;return this[_0x745189(0x18a)]=this[_0x745189(0x279)],Scene_Shop[_0x745189(0x289)]['buyWindowRectItemsEquipsCore'][_0x745189(0x253)](this);},Scene_ItemCrafting[_0x1c7984(0x289)][_0x1c7984(0x30f)]=function(){const _0x62bb7f=_0x1c7984;return Scene_Shop[_0x62bb7f(0x289)][_0x62bb7f(0x260)][_0x62bb7f(0x253)](this);},Scene_ItemCrafting['prototype'][_0x1c7984(0x145)]=function(){const _0x12e732=_0x1c7984,_0x39e43f=this[_0x12e732(0x339)]();this[_0x12e732(0x2f2)]=new Window_ItemCraftingNumber(_0x39e43f),this['_numberWindow'][_0x12e732(0x194)](),this[_0x12e732(0x2f2)][_0x12e732(0x128)]('ok',this[_0x12e732(0x113)][_0x12e732(0x12a)](this)),this['_numberWindow']['setHandler'](_0x12e732(0x185),this[_0x12e732(0x19f)]['bind'](this)),this['addWindow'](this[_0x12e732(0x2f2)]);},Scene_ItemCrafting[_0x1c7984(0x289)][_0x1c7984(0x2c1)]=function(){const _0x17aed4=_0x1c7984,_0x4e4464=this[_0x17aed4(0x1fa)]();this[_0x17aed4(0x221)]=new Window_Selectable(_0x4e4464),this['_ingredientSelectTitle'][_0x17aed4(0x194)](),this[_0x17aed4(0x2ba)](this['_ingredientSelectTitle']);},Scene_ItemCrafting[_0x1c7984(0x289)][_0x1c7984(0x29f)]=function(){const _0xe37841=_0x1c7984,_0x322721=this[_0xe37841(0x339)](),_0x925bfc=new Window_ItemCraftingIngredient(_0x322721);_0x925bfc['hide'](),_0x925bfc['setHelpWindow'](this[_0xe37841(0x212)]),_0x925bfc[_0xe37841(0x30a)](this[_0xe37841(0x117)]),_0x925bfc[_0xe37841(0x128)]('ok',this[_0xe37841(0x2b0)][_0xe37841(0x12a)](this)),_0x925bfc['setHandler'](_0xe37841(0x185),this[_0xe37841(0x1da)]['bind'](this)),this[_0xe37841(0x147)]=_0x925bfc,this[_0xe37841(0x2ba)](this[_0xe37841(0x147)]);},Scene_ItemCrafting['prototype'][_0x1c7984(0x2b5)]=function(){const _0x22f4dc=_0x1c7984;return VisuMZ[_0x22f4dc(0x338)][_0x22f4dc(0x24c)][_0x22f4dc(0x335)][_0x22f4dc(0x2e7)];},Scene_ItemCrafting[_0x1c7984(0x289)][_0x1c7984(0x110)]=function(){const _0x93effd=_0x1c7984;return this[_0x93effd(0x2b5)]()?this[_0x93effd(0x156)]():Scene_Shop['prototype'][_0x93effd(0x1d5)][_0x93effd(0x253)](this);},Scene_ItemCrafting['prototype'][_0x1c7984(0x156)]=function(){const _0x24d0b6=_0x1c7984;if(VisuMZ[_0x24d0b6(0x338)][_0x24d0b6(0x24c)]['Window'][_0x24d0b6(0x240)])return VisuMZ[_0x24d0b6(0x338)][_0x24d0b6(0x24c)][_0x24d0b6(0x335)][_0x24d0b6(0x240)][_0x24d0b6(0x253)](this);const _0x153d55=0x0,_0x4eea6d=this['helpAreaTop'](),_0x41a3b3=Graphics[_0x24d0b6(0x12f)],_0x5ea16a=this['helpAreaHeight']();return new Rectangle(_0x153d55,_0x4eea6d,_0x41a3b3,_0x5ea16a);},Scene_ItemCrafting[_0x1c7984(0x289)]['categoryWindowRect']=function(){const _0x326607=_0x1c7984;return this['isCustomLayout']()?this[_0x326607(0x129)]():Scene_Shop[_0x326607(0x289)][_0x326607(0x120)]['call'](this);},Scene_ItemCrafting[_0x1c7984(0x289)][_0x1c7984(0x129)]=function(){const _0x407c84=_0x1c7984;if(VisuMZ[_0x407c84(0x338)][_0x407c84(0x24c)][_0x407c84(0x335)]['CategoryWindow_RectJS'])return VisuMZ[_0x407c84(0x338)][_0x407c84(0x24c)][_0x407c84(0x335)][_0x407c84(0x111)][_0x407c84(0x253)](this);const _0x1c4cae=this['isRightInputMode']()?this[_0x407c84(0x27c)]():0x0,_0x52a8b6=this[_0x407c84(0x1a4)](),_0x3a66db=Graphics[_0x407c84(0x12f)]-this[_0x407c84(0x27c)](),_0x587821=this[_0x407c84(0x21b)](0x1,!![]);return new Rectangle(_0x1c4cae,_0x52a8b6,_0x3a66db,_0x587821);},Scene_ItemCrafting[_0x1c7984(0x289)][_0x1c7984(0x21d)]=function(){const _0x1d59ed=_0x1c7984;return this[_0x1d59ed(0x2b5)]()?this[_0x1d59ed(0x2c0)]():Scene_Shop[_0x1d59ed(0x289)]['goldWindowRectItemsEquipsCore'][_0x1d59ed(0x253)](this);},Scene_ItemCrafting[_0x1c7984(0x289)][_0x1c7984(0x2c0)]=function(){const _0x21763d=_0x1c7984;if(VisuMZ['ItemCraftingSys'][_0x21763d(0x24c)][_0x21763d(0x335)][_0x21763d(0x26d)])return VisuMZ['ItemCraftingSys'][_0x21763d(0x24c)][_0x21763d(0x335)][_0x21763d(0x26d)][_0x21763d(0x253)](this);const _0x48a935=this['mainCommandWidth'](),_0x42e5a5=this['calcWindowHeight'](0x1,!![]),_0x15dac8=this[_0x21763d(0x19c)]()?0x0:Graphics['boxWidth']-_0x48a935,_0x23b91e=this[_0x21763d(0x1a4)]();return new Rectangle(_0x15dac8,_0x23b91e,_0x48a935,_0x42e5a5);},Scene_ItemCrafting[_0x1c7984(0x289)][_0x1c7984(0x339)]=function(){const _0x22bfba=_0x1c7984;return this['_commandWindow']=this[_0x22bfba(0x279)],this[_0x22bfba(0x2b5)]()?this['itemWindowRectJS']():Scene_Shop[_0x22bfba(0x289)][_0x22bfba(0x32c)]['call'](this);},Scene_ItemCrafting[_0x1c7984(0x289)][_0x1c7984(0x320)]=function(){const _0x21888e=_0x1c7984;if(VisuMZ[_0x21888e(0x338)][_0x21888e(0x24c)][_0x21888e(0x335)][_0x21888e(0x2b1)])return VisuMZ[_0x21888e(0x338)][_0x21888e(0x24c)][_0x21888e(0x335)][_0x21888e(0x2b1)][_0x21888e(0x253)](this);const _0x24dd96=this[_0x21888e(0x18a)]['y']+this['_commandWindow'][_0x21888e(0x28a)],_0x381e2a=Graphics['boxWidth']-this['statusWidth'](),_0xd7e6a9=this[_0x21888e(0x313)]()-this['_commandWindow'][_0x21888e(0x28a)],_0x3da14e=this['isRightInputMode']()?Graphics[_0x21888e(0x12f)]-_0x381e2a:0x0;return new Rectangle(_0x3da14e,_0x24dd96,_0x381e2a,_0xd7e6a9);},Scene_ItemCrafting[_0x1c7984(0x289)][_0x1c7984(0x21a)]=function(){const _0x329cbc=_0x1c7984;if(this[_0x329cbc(0x2b5)]())return!![];return Scene_Item[_0x329cbc(0x289)][_0x329cbc(0x21a)][_0x329cbc(0x253)](this);},Scene_ItemCrafting['prototype']['statusWindowRect']=function(){const _0x1fbb8c=_0x1c7984;return this[_0x1fbb8c(0x2b5)]()?this[_0x1fbb8c(0x265)]():Scene_Shop[_0x1fbb8c(0x289)][_0x1fbb8c(0x260)]['call'](this);},Scene_ItemCrafting[_0x1c7984(0x289)]['statusWindowRectJS']=function(){const _0x51db8f=_0x1c7984;if(VisuMZ['ItemCraftingSys'][_0x51db8f(0x24c)][_0x51db8f(0x335)][_0x51db8f(0x1ad)])return VisuMZ['ItemCraftingSys']['Settings'][_0x51db8f(0x335)][_0x51db8f(0x1ad)][_0x51db8f(0x253)](this);const _0x65c44c=this[_0x51db8f(0x263)](),_0x3714f6=this[_0x51db8f(0x313)]()-this[_0x51db8f(0x18a)][_0x51db8f(0x28a)],_0x4cd8c3=this[_0x51db8f(0x19c)]()?0x0:Graphics[_0x51db8f(0x12f)]-_0x65c44c,_0x5c2496=this[_0x51db8f(0x18a)]['y']+this[_0x51db8f(0x18a)][_0x51db8f(0x28a)];return new Rectangle(_0x4cd8c3,_0x5c2496,_0x65c44c,_0x3714f6);},Scene_ItemCrafting['prototype'][_0x1c7984(0x2c3)]=function(){const _0x3ec00a=_0x1c7984;this['_itemWindow'][_0x3ec00a(0x223)](),this[_0x3ec00a(0x1fd)]['smoothSelect'](0x0);},Scene_ItemCrafting[_0x1c7984(0x289)][_0x1c7984(0x158)]=function(){const _0x342ae0=_0x1c7984;$gameTemp[_0x342ae0(0x24f)]=!![],this[_0x342ae0(0x17e)]=this['_itemWindow']['item'](),this[_0x342ae0(0x1fd)][_0x342ae0(0x194)](),this[_0x342ae0(0x2a5)](),this[_0x342ae0(0x2bb)]()?this[_0x342ae0(0x327)]():this[_0x342ae0(0x11c)](),$gameTemp[_0x342ae0(0x24f)]=![],this[_0x342ae0(0x17e)]=this[_0x342ae0(0x1fd)][_0x342ae0(0x1a0)]();},Scene_ItemCrafting[_0x1c7984(0x289)][_0x1c7984(0x11c)]=function(){const _0x9e0e2b=_0x1c7984;this[_0x9e0e2b(0x221)][_0x9e0e2b(0x194)](),this[_0x9e0e2b(0x147)][_0x9e0e2b(0x194)](),this[_0x9e0e2b(0x279)][_0x9e0e2b(0x22f)](),$gameTemp[_0x9e0e2b(0x24f)]=!![],this[_0x9e0e2b(0x2f2)][_0x9e0e2b(0x14a)](this[_0x9e0e2b(0x1fd)][_0x9e0e2b(0x1a0)]()),$gameTemp[_0x9e0e2b(0x24f)]=![],this[_0x9e0e2b(0x2f2)][_0x9e0e2b(0x22f)](),this[_0x9e0e2b(0x2f2)][_0x9e0e2b(0x223)]();},Scene_ItemCrafting[_0x1c7984(0x289)][_0x1c7984(0x15c)]=function(){const _0x438479=_0x1c7984;this['_numberWindow'][_0x438479(0x194)](),this[_0x438479(0x221)]['hide'](),this[_0x438479(0x147)][_0x438479(0x194)](),this[_0x438479(0x279)][_0x438479(0x22f)](),this[_0x438479(0x1fd)]['show'](),this['_itemWindow'][_0x438479(0x223)](),this[_0x438479(0x1fd)][_0x438479(0x2d7)]();},Scene_ItemCrafting['prototype'][_0x1c7984(0x113)]=function(){const _0x6292d1=_0x1c7984;VisuMZ[_0x6292d1(0x338)][_0x6292d1(0x24c)][_0x6292d1(0x1c9)][_0x6292d1(0x31c)]?this[_0x6292d1(0x155)]():this[_0x6292d1(0x119)]();},Scene_ItemCrafting[_0x1c7984(0x289)][_0x1c7984(0x119)]=function(){const _0x3a785e=_0x1c7984;this[_0x3a785e(0x233)][_0x3a785e(0x2ce)]=!![],this[_0x3a785e(0x2d2)]=![],this['processItemCrafting'](),this[_0x3a785e(0x1f4)](),this['onAnimationFinish']();},Scene_ItemCrafting[_0x1c7984(0x289)][_0x1c7984(0x268)]=function(){const _0x1e0a94=_0x1c7984;this[_0x1e0a94(0x2d6)]()?this[_0x1e0a94(0x274)]():this['returnBackToItemWindow']();},Scene_ItemCrafting['prototype']['returnBackToItemWindow']=function(){const _0x46019d=_0x1c7984;this[_0x46019d(0x15c)](),this[_0x46019d(0x1fd)]['refresh'](),this[_0x46019d(0x279)]['refresh'](),this[_0x46019d(0x279)]['refreshCursor'](),this['_categoryWindow'][_0x46019d(0x121)](),this[_0x46019d(0x19e)]['refresh'](),this[_0x46019d(0x1fd)][_0x46019d(0x2d7)]();},Scene_ItemCrafting['prototype'][_0x1c7984(0x235)]=function(){const _0x26bd6b=_0x1c7984;$gameTemp[_0x26bd6b(0x24f)]=!![];let _0x579c5d=this[_0x26bd6b(0x1fd)][_0x26bd6b(0x1a0)]();$gameTemp['_bypassProxy']=![];const _0x19fcd1=this[_0x26bd6b(0x2f2)]['number'](),_0x8eda9a=DataManager[_0x26bd6b(0x164)](_0x579c5d);let _0x47cc37=0x0;for(const _0x5ed126 of _0x8eda9a){if(!_0x5ed126)continue;let _0x5993fa=_0x5ed126[0x0];const _0x23ae40=_0x5ed126[0x1]*_0x19fcd1;_0x5993fa===_0x26bd6b(0x209)?$gameParty[_0x26bd6b(0x2bc)](_0x23ae40):(typeof _0x5993fa===_0x26bd6b(0x149)&&_0x5993fa[_0x26bd6b(0x2be)](/CATEGORY/i)&&(_0x5993fa=this[_0x26bd6b(0x12d)][_0x47cc37],_0x47cc37+=0x1),$gameParty[_0x26bd6b(0x1ed)](_0x5993fa,_0x23ae40,![]));}_0x579c5d=this[_0x26bd6b(0x1fd)][_0x26bd6b(0x1a0)](),$gameParty[_0x26bd6b(0x2f6)](_0x579c5d,_0x19fcd1),this[_0x26bd6b(0x2f2)][_0x26bd6b(0x2dd)]()>0x0?SoundManager[_0x26bd6b(0x20f)]():SoundManager[_0x26bd6b(0x28d)](),$gameSystem['registerCraftedItem'](_0x579c5d,_0x19fcd1);},Scene_ItemCrafting['prototype']['onItemCrafted']=function(){const _0x2c694c=_0x1c7984,_0x440b71=this[_0x2c694c(0x17e)],_0x280b9b=this[_0x2c694c(0x2f2)][_0x2c694c(0x2dd)]();VisuMZ[_0x2c694c(0x338)][_0x2c694c(0x2d4)](_0x440b71,!![]),VisuMZ[_0x2c694c(0x338)][_0x2c694c(0x2d4)](_0x440b71,![]),this['enableCraftingSwitches']();const _0x2af349=DataManager[_0x2c694c(0x319)](_0x440b71);VisuMZ[_0x2c694c(0x338)]['JS'][_0x2af349]&&VisuMZ[_0x2c694c(0x338)]['JS'][_0x2af349][_0x2c694c(0x253)](this,_0x440b71,_0x280b9b),VisuMZ[_0x2c694c(0x338)][_0x2c694c(0x24c)][_0x2c694c(0x1fe)][_0x2c694c(0x1f1)][_0x2c694c(0x253)](this,_0x440b71,_0x280b9b);},VisuMZ[_0x1c7984(0x338)]['TurnSwitches']=function(_0x627e1a,_0x5a0515){const _0xea23d7=_0x1c7984,_0x49b9dc=_0x5a0515?VisuMZ[_0xea23d7(0x338)]['RegExp'][_0xea23d7(0x130)]:VisuMZ['ItemCraftingSys'][_0xea23d7(0x1cf)][_0xea23d7(0x229)],_0x2e0a38=_0x627e1a[_0xea23d7(0x251)][_0xea23d7(0x2be)](_0x49b9dc);if(_0x2e0a38)for(const _0x2d4c54 of _0x2e0a38){if(!_0x2d4c54)continue;_0x2d4c54['match'](_0x49b9dc);const _0x499faf=JSON[_0xea23d7(0x1d1)]('['+RegExp['$1'][_0xea23d7(0x2be)](/\d+/g)+']');for(const _0x589684 of _0x499faf){$gameSwitches[_0xea23d7(0x191)](_0x589684,_0x5a0515);}}},Scene_ItemCrafting[_0x1c7984(0x289)][_0x1c7984(0x19f)]=function(){const _0xd49679=_0x1c7984;SoundManager[_0xd49679(0x28d)](),this[_0xd49679(0x1da)]();},Scene_ItemCrafting[_0x1c7984(0x289)][_0x1c7984(0x2b0)]=function(){const _0x4be6bc=_0x1c7984,_0x19b8a3=this[_0x4be6bc(0x147)][_0x4be6bc(0x1a0)]();this[_0x4be6bc(0x12d)][this[_0x4be6bc(0x329)]]=_0x19b8a3,this['_ingredientIndex']++,this[_0x4be6bc(0x327)]();},Scene_ItemCrafting[_0x1c7984(0x289)]['onIngredientListCancel']=function(){const _0x2f83c4=_0x1c7984;this[_0x2f83c4(0x12d)][_0x2f83c4(0x207)](),this[_0x2f83c4(0x329)]--,this[_0x2f83c4(0x329)]<0x0?this['activateItemWindow']():this['setupSelectIngredientWindow']();},Scene_ItemCrafting['prototype'][_0x1c7984(0x2a5)]=function(){const _0x514e98=_0x1c7984;this[_0x514e98(0x1b6)]=[],this[_0x514e98(0x1f9)]=[],this['_ingredientsList']=[],this[_0x514e98(0x329)]=0x0;},Scene_ItemCrafting['prototype']['doesItemHaveOpenCategories']=function(){const _0x2d5904=_0x1c7984;if(!this['_item'])return![];const _0xce2800=DataManager[_0x2d5904(0x164)](this['_item']);for(const _0x33e593 of _0xce2800){if(!_0x33e593)continue;const _0x412cca=_0x33e593[0x0];if(!_0x412cca)continue;if(typeof _0x412cca===_0x2d5904(0x149)&&_0x412cca[_0x2d5904(0x2be)](/CATEGORY/i)){_0x412cca['match'](/CATEGORY: (.*)/i);const _0x28f999=String(RegExp['$1'])[_0x2d5904(0x2f5)]();this[_0x2d5904(0x1b6)][_0x2d5904(0x21f)](_0x28f999),this['_ingredientAmounts'][_0x2d5904(0x21f)](_0x33e593[0x1]||0x1);}}return this[_0x2d5904(0x1b6)][_0x2d5904(0x2ad)]>0x0;},Scene_ItemCrafting[_0x1c7984(0x289)][_0x1c7984(0x327)]=function(){const _0x29ea20=_0x1c7984;if(this[_0x29ea20(0x329)]>=this[_0x29ea20(0x1b6)][_0x29ea20(0x2ad)])return this['setupNumberWindow']();this[_0x29ea20(0x279)][_0x29ea20(0x194)](),this['_numberWindow'][_0x29ea20(0x194)]();const _0x1fe8a8=this[_0x29ea20(0x1b6)][this[_0x29ea20(0x329)]],_0x4ba03d=this[_0x29ea20(0x1f9)][this[_0x29ea20(0x329)]];this[_0x29ea20(0x221)]['show'](),this['_ingredientSelectList'][_0x29ea20(0x22f)](),this[_0x29ea20(0x221)][_0x29ea20(0x2fb)][_0x29ea20(0x138)]();const _0x462250=VisuMZ[_0x29ea20(0x338)][_0x29ea20(0x24c)][_0x29ea20(0x1fe)][_0x29ea20(0x334)],_0x36bdb4=VisuMZ[_0x29ea20(0x1fb)][_0x29ea20(0x24c)][_0x29ea20(0x1c6)][_0x29ea20(0x196)],_0x180af5=_0x462250[_0x29ea20(0x1e1)](_0x1fe8a8,_0x36bdb4[_0x29ea20(0x1e1)](_0x4ba03d)),_0x2bc916=this[_0x29ea20(0x221)][_0x29ea20(0x1f3)](0x0);this['_ingredientSelectTitle'][_0x29ea20(0x1b3)](_0x180af5,_0x2bc916['x'],_0x2bc916['y']),this['_ingredientSelectList'][_0x29ea20(0x14a)](_0x1fe8a8,_0x4ba03d);},Scene_ItemCrafting['prototype'][_0x1c7984(0x1ee)]=function(){const _0x491778=_0x1c7984;if(this[_0x491778(0x2f2)]&&this[_0x491778(0x2f2)][_0x491778(0x181)])return TextManager[_0x491778(0x20d)]('left','right');return Scene_Item[_0x491778(0x289)][_0x491778(0x1ee)][_0x491778(0x253)](this);},Scene_ItemCrafting['prototype'][_0x1c7984(0x15b)]=function(){const _0x2e000b=_0x1c7984;if(this['_numberWindow']&&this[_0x2e000b(0x2f2)][_0x2e000b(0x181)])return TextManager[_0x2e000b(0x20d)]('up','down');return Scene_Item['prototype'][_0x2e000b(0x15b)][_0x2e000b(0x253)](this);},Scene_ItemCrafting[_0x1c7984(0x289)][_0x1c7984(0x122)]=function(){const _0x9766e=_0x1c7984;if(this[_0x9766e(0x210)]())return VisuMZ[_0x9766e(0x1fb)][_0x9766e(0x24c)][_0x9766e(0x1c6)][_0x9766e(0x27e)];else{if(this[_0x9766e(0x2f2)]&&this[_0x9766e(0x2f2)]['active'])return VisuMZ['ItemsEquipsCore'][_0x9766e(0x24c)][_0x9766e(0x321)][_0x9766e(0x2a7)];}return Scene_Item['prototype']['buttonAssistText1']['call'](this);},Scene_ItemCrafting[_0x1c7984(0x289)][_0x1c7984(0x2c8)]=function(){const _0x58b04b=_0x1c7984;if(this[_0x58b04b(0x2f2)]&&this[_0x58b04b(0x2f2)]['active'])return VisuMZ['ItemsEquipsCore'][_0x58b04b(0x24c)][_0x58b04b(0x321)]['buttonAssistLargeIncrement'];return Scene_Item[_0x58b04b(0x289)][_0x58b04b(0x2c8)][_0x58b04b(0x253)](this);},Scene_ItemCrafting[_0x1c7984(0x289)][_0x1c7984(0x1a2)]=function(){const _0x41dca6=_0x1c7984;return this[_0x41dca6(0x2f2)]&&this['_numberWindow'][_0x41dca6(0x181)]?TextManager['itemCraftingNumberWindowOk']:Scene_Item[_0x41dca6(0x289)][_0x41dca6(0x1a2)][_0x41dca6(0x253)](this);},Scene_ItemCrafting['prototype'][_0x1c7984(0x2f0)]=function(){const _0x19d539=_0x1c7984;Scene_MenuBase['prototype'][_0x19d539(0x2f0)]['call'](this),this[_0x19d539(0x1db)](this[_0x19d539(0x2a4)]()),this[_0x19d539(0x136)]();},Scene_ItemCrafting[_0x1c7984(0x289)]['getBackgroundOpacity']=function(){const _0xdc163f=_0x1c7984;return VisuMZ[_0xdc163f(0x338)]['Settings'][_0xdc163f(0x30d)]['SnapshotOpacity'];},Scene_ItemCrafting[_0x1c7984(0x289)][_0x1c7984(0x136)]=function(){const _0x2eb73f=_0x1c7984,_0x48e93c={'BgFilename1':VisuMZ[_0x2eb73f(0x338)][_0x2eb73f(0x24c)][_0x2eb73f(0x30d)][_0x2eb73f(0x331)],'BgFilename2':VisuMZ[_0x2eb73f(0x338)]['Settings'][_0x2eb73f(0x30d)][_0x2eb73f(0x26c)]};_0x48e93c&&(_0x48e93c[_0x2eb73f(0x331)]!==''||_0x48e93c['BgFilename2']!=='')&&(this['_backSprite1']=new Sprite(ImageManager[_0x2eb73f(0x1af)](_0x48e93c[_0x2eb73f(0x331)])),this['_backSprite2']=new Sprite(ImageManager['loadTitle2'](_0x48e93c[_0x2eb73f(0x26c)])),this[_0x2eb73f(0x1d7)](this[_0x2eb73f(0x2f1)]),this[_0x2eb73f(0x1d7)](this[_0x2eb73f(0x17c)]),this['_backSprite1'][_0x2eb73f(0x114)]['addLoadListener'](this[_0x2eb73f(0x160)][_0x2eb73f(0x12a)](this,this[_0x2eb73f(0x2f1)])),this[_0x2eb73f(0x17c)]['bitmap'][_0x2eb73f(0x2fc)](this[_0x2eb73f(0x160)][_0x2eb73f(0x12a)](this,this[_0x2eb73f(0x17c)])));},Scene_ItemCrafting[_0x1c7984(0x289)][_0x1c7984(0x160)]=function(_0x2746bd){const _0x5c884e=_0x1c7984;this[_0x5c884e(0x2e2)](_0x2746bd),this[_0x5c884e(0x1ea)](_0x2746bd);},Scene_ItemCrafting[_0x1c7984(0x289)][_0x1c7984(0x155)]=function(){const _0x462870=_0x1c7984;this['_animationPlaying']=!![],this[_0x462870(0x22d)]=0x14,this[_0x462870(0x233)][_0x462870(0x2ce)]=VisuMZ[_0x462870(0x338)][_0x462870(0x24c)][_0x462870(0x1c9)]['ShowWindows']||![],this[_0x462870(0x154)]();},Scene_ItemCrafting[_0x1c7984(0x289)][_0x1c7984(0x154)]=function(){const _0x3fdd20=_0x1c7984;this[_0x3fdd20(0x2e6)]=new Sprite(),this[_0x3fdd20(0x1d7)](this[_0x3fdd20(0x2e6)]),this['setItemSpriteBitmap'](),this[_0x3fdd20(0x297)](),this['setItemSpritePosition'](),this[_0x3fdd20(0x29c)](),this[_0x3fdd20(0x2af)](),this['createAnimation'](this[_0x3fdd20(0x280)][_0x3fdd20(0x336)]());},Scene_ItemCrafting['prototype'][_0x1c7984(0x2f9)]=function(){const _0x63d0d1=_0x1c7984,_0x4e1316=VisuMZ['ItemCraftingSys'][_0x63d0d1(0x1cf)],_0xd88db7=this[_0x63d0d1(0x17e)]['note'];this[_0x63d0d1(0x32d)]='';if(_0xd88db7[_0x63d0d1(0x2be)](_0x4e1316[_0x63d0d1(0x2b2)]))this[_0x63d0d1(0x32d)]=String(RegExp['$1']);else _0xd88db7['match'](_0x4e1316['bigPicture'])&&(this[_0x63d0d1(0x32d)]=String(RegExp['$1']));this[_0x63d0d1(0x22b)]=new Sprite();this[_0x63d0d1(0x32d)]?this['_iconSprite'][_0x63d0d1(0x114)]=ImageManager[_0x63d0d1(0x315)](this[_0x63d0d1(0x32d)]):(this['_iconSprite'][_0x63d0d1(0x114)]=ImageManager[_0x63d0d1(0x28e)](_0x63d0d1(0x293)),this[_0x63d0d1(0x22b)][_0x63d0d1(0x114)]['smooth']=![]);this[_0x63d0d1(0x22b)][_0x63d0d1(0x29b)]['x']=0.5,this['_iconSprite'][_0x63d0d1(0x29b)]['y']=0.5;if(!this[_0x63d0d1(0x32d)]){const _0x432842=VisuMZ[_0x63d0d1(0x338)]['Settings'][_0x63d0d1(0x1c9)][_0x63d0d1(0x10f)]||0x8;this['_iconSprite'][_0x63d0d1(0x2b6)]['x']=_0x432842,this[_0x63d0d1(0x22b)][_0x63d0d1(0x2b6)]['y']=_0x432842;}this[_0x63d0d1(0x2e6)][_0x63d0d1(0x1d7)](this[_0x63d0d1(0x22b)]);},Scene_ItemCrafting[_0x1c7984(0x289)][_0x1c7984(0x297)]=function(){const _0x5413b6=_0x1c7984;if(this[_0x5413b6(0x32d)])return;const _0x2e4c30=this[_0x5413b6(0x17e)],_0x422cf2=_0x2e4c30[_0x5413b6(0x299)],_0x5806bf=ImageManager[_0x5413b6(0x134)],_0xc80c37=ImageManager[_0x5413b6(0x1ba)],_0x24996d=_0x422cf2%0x10*_0x5806bf,_0x42f3e5=Math[_0x5413b6(0x2ed)](_0x422cf2/0x10)*_0xc80c37;this[_0x5413b6(0x22b)][_0x5413b6(0x2c4)](_0x24996d,_0x42f3e5,_0x5806bf,_0xc80c37);},Scene_ItemCrafting[_0x1c7984(0x289)][_0x1c7984(0x11f)]=function(){const _0x4e8c2c=_0x1c7984;this[_0x4e8c2c(0x2e6)]['x']=Math['round'](Graphics[_0x4e8c2c(0x16c)]/0x2);const _0xf265c2=Math[_0x4e8c2c(0x27b)](ImageManager[_0x4e8c2c(0x1ba)]*this[_0x4e8c2c(0x2e6)][_0x4e8c2c(0x2b6)]['y']);this['_itemSprite']['y']=Math[_0x4e8c2c(0x27b)]((Graphics[_0x4e8c2c(0x28a)]+_0xf265c2)/0x2);},Scene_ItemCrafting['prototype']['setItemSpriteOpacity']=function(){const _0x473094=_0x1c7984;this[_0x473094(0x32a)]=VisuMZ['ItemCraftingSys'][_0x473094(0x24c)]['Animation'][_0x473094(0x2e9)]||0x1,this[_0x473094(0x17e)]['note']['match'](VisuMZ[_0x473094(0x338)]['RegExp']['opacitySpeed'])&&(this[_0x473094(0x32a)]=Math['max'](Number(RegExp['$1']),0x1)),this[_0x473094(0x2e6)][_0x473094(0x1a8)]=0x0;},Scene_ItemCrafting[_0x1c7984(0x289)][_0x1c7984(0x2af)]=function(){const _0x3b7778=_0x1c7984;this[_0x3b7778(0x280)]=[],this[_0x3b7778(0x17e)][_0x3b7778(0x251)]['match'](VisuMZ['ItemCraftingSys'][_0x3b7778(0x1cf)][_0x3b7778(0x11e)])?this['_animationIDs']=RegExp['$1'][_0x3b7778(0x144)](',')[_0x3b7778(0x1d2)](_0x52d105=>Number(_0x52d105)):this['_animationIDs']=this[_0x3b7778(0x280)][_0x3b7778(0x238)](VisuMZ['ItemCraftingSys'][_0x3b7778(0x24c)][_0x3b7778(0x1c9)][_0x3b7778(0x16f)]);},Scene_ItemCrafting[_0x1c7984(0x289)][_0x1c7984(0x1c3)]=function(_0x37845b){const _0x36fe14=_0x1c7984,_0x3b1e67=$dataAnimations[_0x37845b];if(!_0x3b1e67)return;const _0x203e3c=this[_0x36fe14(0x13b)](_0x3b1e67);this[_0x36fe14(0x295)]=new(_0x203e3c?Sprite_AnimationMV:Sprite_Animation)();const _0x32fe9c=[this[_0x36fe14(0x2e6)]],_0x15db12=0x0;this[_0x36fe14(0x295)][_0x36fe14(0x14a)](_0x32fe9c,_0x3b1e67,![],_0x15db12,null),this[_0x36fe14(0x1d7)](this[_0x36fe14(0x295)]);},Scene_ItemCrafting[_0x1c7984(0x289)]['isMVAnimation']=function(_0xa459e0){const _0x4333e8=_0x1c7984;return!!_0xa459e0[_0x4333e8(0x1ff)];},Scene_ItemCrafting[_0x1c7984(0x289)]['updateCraftingAnimation']=function(){const _0x532c6c=_0x1c7984;if(!this[_0x532c6c(0x2d2)])return;this['updateItemSpriteOpacity'](),this['updateAnimationSprite'](),this[_0x532c6c(0x2c6)]()&&this['processFinishAnimation']();},Scene_ItemCrafting[_0x1c7984(0x289)][_0x1c7984(0x1d6)]=function(){const _0x18f368=_0x1c7984;this[_0x18f368(0x2e6)][_0x18f368(0x1a8)]+=this[_0x18f368(0x32a)];},Scene_ItemCrafting[_0x1c7984(0x289)][_0x1c7984(0x14e)]=function(){const _0x2b7b51=_0x1c7984;if(!this[_0x2b7b51(0x295)])return;if(this[_0x2b7b51(0x295)][_0x2b7b51(0x140)]())return;this[_0x2b7b51(0x14f)](),this['createAnimation'](this['_animationIDs']['shift']());},Scene_ItemCrafting[_0x1c7984(0x289)][_0x1c7984(0x14f)]=function(){const _0x2a4a3c=_0x1c7984;if(!this[_0x2a4a3c(0x295)])return;this[_0x2a4a3c(0x2a3)](this[_0x2a4a3c(0x295)]),this[_0x2a4a3c(0x295)][_0x2a4a3c(0x2e8)](),this[_0x2a4a3c(0x295)]=undefined;},Scene_ItemCrafting[_0x1c7984(0x289)]['destroyItemSprite']=function(){const _0x5d45ea=_0x1c7984;if(!this[_0x5d45ea(0x2e6)])return;this['removeChild'](this[_0x5d45ea(0x2e6)]),this['_itemSprite']['destroy'](),this[_0x5d45ea(0x2e6)]=undefined;},Scene_ItemCrafting['prototype'][_0x1c7984(0x2c6)]=function(){const _0x1a5398=_0x1c7984;if(TouchInput[_0x1a5398(0x32e)]())return!![];if(Input[_0x1a5398(0x1a6)]('ok'))return!![];if(Input[_0x1a5398(0x1a6)]('cancel'))return!![];if(this[_0x1a5398(0x2e6)][_0x1a5398(0x1a8)]<0xff)return![];if(this[_0x1a5398(0x295)])return![];return this[_0x1a5398(0x22d)]--<=0x0;},Scene_ItemCrafting[_0x1c7984(0x289)][_0x1c7984(0x324)]=function(){const _0x2888a2=_0x1c7984;this[_0x2888a2(0x14f)](),this[_0x2888a2(0x2ef)](),this[_0x2888a2(0x119)](),TouchInput[_0x2888a2(0x138)](),Input['clear']();},Scene_ItemCrafting[_0x1c7984(0x289)][_0x1c7984(0x1c2)]=function(){const _0x2a4af4=_0x1c7984;Scene_Item[_0x2a4af4(0x289)][_0x2a4af4(0x1c2)][_0x2a4af4(0x253)](this);if($gameSystem['_craftingCommonEventScene'])return;$gameTemp[_0x2a4af4(0x115)]();},Scene_ItemCrafting[_0x1c7984(0x289)]['resetCraftingSwitches']=function(){const _0x26a76b=_0x1c7984;if(!SceneManager[_0x26a76b(0x272)]())return;const _0x20d9b2=VisuMZ[_0x26a76b(0x338)][_0x26a76b(0x24c)][_0x26a76b(0x1fe)];_0x20d9b2[_0x26a76b(0x1ef)]&&$gameSwitches[_0x26a76b(0x191)](_0x20d9b2[_0x26a76b(0x1ef)],![]);},Scene_ItemCrafting[_0x1c7984(0x289)]['enableCraftingSwitches']=function(){const _0x16398a=_0x1c7984;if(!SceneManager[_0x16398a(0x272)]())return;const _0x17be52=VisuMZ[_0x16398a(0x338)][_0x16398a(0x24c)][_0x16398a(0x1fe)];_0x17be52['SwitchCraft']&&$gameSwitches[_0x16398a(0x191)](_0x17be52[_0x16398a(0x1ef)],!![]);},Scene_ItemCrafting['prototype'][_0x1c7984(0x2d6)]=function(){const _0x4f0e9d=_0x1c7984;if(!Imported[_0x4f0e9d(0x304)])return![];const _0x44c1ef=this['_item']?this['_item'][_0x4f0e9d(0x251)]||'':'',_0x4ab102=VisuMZ[_0x4f0e9d(0x338)][_0x4f0e9d(0x1cf)];if(_0x44c1ef['match'](_0x4ab102[_0x4f0e9d(0x24a)])&&!$gameSystem[_0x4f0e9d(0x2d5)](this[_0x4f0e9d(0x17e)])&&this[_0x4f0e9d(0x2ec)](!![]))return!![];else{if(_0x44c1ef['match'](_0x4ab102[_0x4f0e9d(0x132)])&&this[_0x4f0e9d(0x2ec)](![]))return!![];}return![];},Scene_ItemCrafting[_0x1c7984(0x289)][_0x1c7984(0x2ec)]=function(_0x296a27){const _0x7bc736=_0x1c7984,_0x18061b=this[_0x7bc736(0x17e)]?this['_item']['note']:'',_0x3f11f0=VisuMZ[_0x7bc736(0x338)][_0x7bc736(0x1cf)],_0x198ee3=_0x296a27?'CraftOnce':_0x7bc736(0x2d3);if(_0x18061b['match'](_0x3f11f0[_0x198ee3+_0x7bc736(0x25a)])){const _0x2188e7=RegExp['$1']['split'](',')[_0x7bc736(0x1d2)](_0x4d6339=>Number(_0x4d6339));for(const _0x1f25ab of _0x2188e7){if($gameSwitches['value'](_0x1f25ab)===![])return![];}}if(_0x18061b[_0x7bc736(0x2be)](_0x3f11f0[_0x198ee3+_0x7bc736(0x28f)])){const _0x549473=RegExp['$1']['split'](',')['map'](_0x35efe9=>Number(_0x35efe9));for(const _0x13ac52 of _0x549473){if($gameSwitches['value'](_0x13ac52)===!![])return!![];}return![];}return!![];},Scene_ItemCrafting['prototype']['processCraftCommonEvent']=function(){const _0x3c2186=_0x1c7984,_0x1adbc2=this[_0x3c2186(0x17e)]?this['_item'][_0x3c2186(0x251)]:'',_0x34e7e0=VisuMZ['ItemCraftingSys'][_0x3c2186(0x1cf)];let _0x432e7f=0x0;if(this['meetsCraftingCommonEventSwitches'](!![])&&_0x1adbc2[_0x3c2186(0x2be)](_0x34e7e0[_0x3c2186(0x24a)])&&!$gameSystem[_0x3c2186(0x2d5)](this[_0x3c2186(0x17e)]))_0x432e7f=Number(RegExp['$1'])||0x1,$gameSystem[_0x3c2186(0x325)](this[_0x3c2186(0x17e)]);else this[_0x3c2186(0x2ec)](![])&&_0x1adbc2['match'](_0x34e7e0[_0x3c2186(0x132)])&&(_0x432e7f=Number(RegExp['$1'])||0x1);if(_0x432e7f<=0x0){this['returnBackToItemWindow']();return;}$gameSystem[_0x3c2186(0x257)]=!![],$gameTemp['reserveCommonEvent'](_0x432e7f),SceneManager[_0x3c2186(0x175)](Scene_Map);},VisuMZ[_0x1c7984(0x338)][_0x1c7984(0x15f)]=Window_MenuCommand[_0x1c7984(0x289)][_0x1c7984(0x1f8)],Window_MenuCommand['prototype'][_0x1c7984(0x1f8)]=function(){const _0x1d0c0a=_0x1c7984;VisuMZ['ItemCraftingSys'][_0x1d0c0a(0x15f)][_0x1d0c0a(0x253)](this),this[_0x1d0c0a(0x30b)]();},Window_MenuCommand[_0x1c7984(0x289)][_0x1c7984(0x30b)]=function(){const _0x5c6cfb=_0x1c7984;if(!this[_0x5c6cfb(0x287)]())return;if(!this[_0x5c6cfb(0x19b)]())return;const _0x30caf1=TextManager[_0x5c6cfb(0x333)],_0x4ca138=this[_0x5c6cfb(0x141)]();this[_0x5c6cfb(0x1e2)](_0x30caf1,'itemCrafting',_0x4ca138);},Window_MenuCommand[_0x1c7984(0x289)][_0x1c7984(0x287)]=function(){return Imported['VisuMZ_1_MainMenuCore']?![]:!![];},Window_MenuCommand['prototype'][_0x1c7984(0x19b)]=function(){const _0x3aa71e=_0x1c7984;return $gameSystem[_0x3aa71e(0x18f)]();},Window_MenuCommand[_0x1c7984(0x289)]['isItemCraftingCommandEnabled']=function(){const _0x342a46=_0x1c7984;if(DataManager[_0x342a46(0x23c)]()[_0x342a46(0x2ad)]<=0x0)return![];return $gameSystem[_0x342a46(0x143)]();},VisuMZ[_0x1c7984(0x338)]['Window_ItemCategory_makeCommandList']=Window_ItemCategory[_0x1c7984(0x289)][_0x1c7984(0x22a)],Window_ItemCategory[_0x1c7984(0x289)]['makeCommandList']=function(){const _0x199afa=_0x1c7984;if(SceneManager[_0x199afa(0x272)]()){this['addItemCategories']();if(this[_0x199afa(0x1a7)][_0x199afa(0x2ad)]<=0x0){this[_0x199afa(0x2f8)](),SceneManager[_0x199afa(0x22e)][_0x199afa(0x169)]();return;}this[_0x199afa(0x186)]();let _0xa3571b=this[_0x199afa(0x341)]();if(this[_0x199afa(0x32b)]){const _0x3f006d=this[_0x199afa(0x2f3)](this[_0x199afa(0x32b)]);if(_0x3f006d>=0x0)_0xa3571b=_0x3f006d;}_0xa3571b=_0xa3571b>=this['_list'][_0x199afa(0x2ad)]?0x0:_0xa3571b,this[_0x199afa(0x2ac)](_0xa3571b);}else VisuMZ[_0x199afa(0x338)][_0x199afa(0x231)][_0x199afa(0x253)](this);},Window_ItemCategory['prototype'][_0x1c7984(0x186)]=function(){const _0x1d3c7f=_0x1c7984,_0x57ca9a=Window_ItemCategory[_0x1d3c7f(0x203)],_0x194e83=DataManager[_0x1d3c7f(0x23c)]()[_0x1d3c7f(0x226)](),_0x2710d4=[];for(const _0x380e8c of _0x57ca9a){this[_0x1d3c7f(0x1c1)]=_0x380e8c[_0x1d3c7f(0x135)];for(const _0x2720f9 of _0x194e83){Window_ItemList[_0x1d3c7f(0x289)]['includes']['call'](this,_0x2720f9)&&_0x2710d4[_0x1d3c7f(0x21f)](_0x2720f9);}}this[_0x1d3c7f(0x1c1)]=null;for(const _0x54a8fb of _0x2710d4){_0x194e83[_0x1d3c7f(0x2e5)](_0x54a8fb);}_0x194e83[_0x1d3c7f(0x2ad)]>0x0&&this[_0x1d3c7f(0x2f8)](),this[_0x1d3c7f(0x254)]=_0x194e83;},Window_ItemCategory[_0x1c7984(0x289)]['addUncategorizedItemCategory']=function(){const _0x12b7ea=_0x1c7984,_0x295a18=VisuMZ[_0x12b7ea(0x338)][_0x12b7ea(0x24c)][_0x12b7ea(0x1fe)];let _0x4007f7=_0x295a18[_0x12b7ea(0x337)]||'Uncategorized',_0x443ff7=_0x295a18[_0x12b7ea(0x1e9)]||0xa0;_0x4007f7=_0x12b7ea(0x1aa)[_0x12b7ea(0x1e1)](_0x443ff7,_0x4007f7),this['addCommand'](_0x4007f7,_0x12b7ea(0x1be),!![],'ItemCraftingNoCategory');},VisuMZ[_0x1c7984(0x338)]['Window_ItemCategory_addItemCategory']=Window_ItemCategory[_0x1c7984(0x289)][_0x1c7984(0x188)],Window_ItemCategory['prototype']['addItemCategory']=function(_0x1db65e){const _0xbf2649=_0x1c7984;if(SceneManager[_0xbf2649(0x272)]()&&!this[_0xbf2649(0x16e)](_0x1db65e))return;VisuMZ[_0xbf2649(0x338)][_0xbf2649(0x2fa)][_0xbf2649(0x253)](this,_0x1db65e);},Window_ItemCategory['prototype']['isItemCraftingCategoryValid']=function(_0x4e64fa){const _0x15c609=_0x1c7984,_0xcb083f=DataManager[_0x15c609(0x23c)](),_0x2fbbd6=_0x4e64fa['Type'],_0x35c037=_0x4e64fa[_0x15c609(0x2ab)];this[_0x15c609(0x1c1)]=_0x2fbbd6;for(const _0x1f7af8 of _0xcb083f){if(!_0x1f7af8)continue;if(Window_ItemList['prototype']['includes'][_0x15c609(0x253)](this,_0x1f7af8))return this[_0x15c609(0x1c1)]=null,!![];}return this['_category']=null,![];},VisuMZ['ItemCraftingSys']['Window_ItemCategory_needsSelection']=Window_ItemCategory['prototype'][_0x1c7984(0x142)],Window_ItemCategory[_0x1c7984(0x289)][_0x1c7984(0x142)]=function(){const _0x1b3df7=_0x1c7984;if(SceneManager[_0x1b3df7(0x272)]())return!![];return VisuMZ[_0x1b3df7(0x338)][_0x1b3df7(0x322)][_0x1b3df7(0x253)](this);},VisuMZ[_0x1c7984(0x338)][_0x1c7984(0x1b7)]=Window_Selectable[_0x1c7984(0x289)]['select'],Window_Selectable[_0x1c7984(0x289)]['select']=function(_0x311c2e){const _0xb07c0f=_0x1c7984;VisuMZ[_0xb07c0f(0x338)][_0xb07c0f(0x1b7)][_0xb07c0f(0x253)](this,_0x311c2e),this['constructor']===Window_ItemCategory&&SceneManager['isSceneItemCrafting']()&&_0x311c2e>=0x0&&(this['_lastCraftingExt']=this[_0xb07c0f(0x1b0)]()||'');};function Window_ItemCraftingList(){const _0x587bbb=_0x1c7984;this[_0x587bbb(0x318)](...arguments);}Window_ItemCraftingList['prototype']=Object[_0x1c7984(0x220)](Window_ItemList['prototype']),Window_ItemCraftingList['prototype'][_0x1c7984(0x125)]=Window_ItemCraftingList,Window_ItemCraftingList[_0x1c7984(0x1a3)]=VisuMZ[_0x1c7984(0x338)]['Settings'][_0x1c7984(0x335)][_0x1c7984(0x1bb)],Window_ItemCraftingList[_0x1c7984(0x197)]=VisuMZ[_0x1c7984(0x338)][_0x1c7984(0x24c)]['Mask'][_0x1c7984(0x270)],Window_ItemCraftingList[_0x1c7984(0x289)][_0x1c7984(0x318)]=function(_0xd02ad7){const _0xe49a19=_0x1c7984;Window_ItemList[_0xe49a19(0x289)][_0xe49a19(0x318)][_0xe49a19(0x253)](this,_0xd02ad7),this[_0xe49a19(0x25d)]();},Window_ItemCraftingList[_0x1c7984(0x289)][_0x1c7984(0x112)]=function(){return 0x1;},Window_ItemCraftingList[_0x1c7984(0x289)]['itemHeight']=function(){const _0x4cf19a=_0x1c7984;return Window_Scrollable[_0x4cf19a(0x289)]['itemHeight']['call'](this)*0x3+0x8;},Window_ItemCraftingList[_0x1c7984(0x289)]['isEnabled']=function(_0x9425c8){return!![];},Window_ItemCraftingList['prototype'][_0x1c7984(0x2e3)]=function(){const _0x4648f2=_0x1c7984;this[_0x4648f2(0x216)]=DataManager[_0x4648f2(0x23c)]()['filter'](_0x973775=>this['includes'](_0x973775));const _0x2c31d8=this['_data'][_0x4648f2(0x1d2)](_0x393932=>DataManager[_0x4648f2(0x164)](_0x393932)[_0x4648f2(0x2ad)]);this[_0x4648f2(0x1f5)]=Math[_0x4648f2(0x200)](..._0x2c31d8)+0x1;},Window_ItemCraftingList['prototype'][_0x1c7984(0x12e)]=function(_0x278adb){const _0x1272d5=_0x1c7984;if(this[_0x1272d5(0x1c1)]===_0x1272d5(0x1c7)){const _0x2542ae=SceneManager[_0x1272d5(0x22e)];if(_0x2542ae&&_0x2542ae[_0x1272d5(0x279)]&&_0x2542ae[_0x1272d5(0x279)]['_nonCategoryItemCraftingItems'])return _0x2542ae[_0x1272d5(0x279)][_0x1272d5(0x254)][_0x1272d5(0x12e)](_0x278adb);}return Window_ItemList[_0x1272d5(0x289)][_0x1272d5(0x12e)]['call'](this,_0x278adb);},Window_ItemCraftingList[_0x1c7984(0x289)][_0x1c7984(0x1dc)]=function(){},Window_ItemCraftingList['prototype']['drawItem']=function(_0x54c1cd){const _0x8b37d=_0x1c7984,_0x5af9f6=this['itemAt'](_0x54c1cd);if(!_0x5af9f6)return;const _0x2e47b8=this[_0x8b37d(0x2d9)](_0x54c1cd);this[_0x8b37d(0x1d8)](),this[_0x8b37d(0x192)](_0x2e47b8,0x2),this[_0x8b37d(0x198)](_0x54c1cd,_0x5af9f6,_0x2e47b8),this['drawCraftedIcon'](_0x5af9f6,_0x2e47b8),this['drawCraftingItemName'](_0x5af9f6,_0x2e47b8),this[_0x8b37d(0x298)](_0x5af9f6,_0x2e47b8);},Window_ItemCraftingList['prototype']['drawFadedItemBackground']=function(_0x501885,_0x419cdf){const _0x55290f=_0x1c7984;_0x419cdf=_0x419cdf||0x1,this['changePaintOpacity'](![]);const _0xa07f36=ColorManager['dimColor1'](),_0x171f81=ColorManager[_0x55290f(0x152)](),_0x425339=_0x501885[_0x55290f(0x16c)]/0x2,_0x1a85d7=this[_0x55290f(0x243)]();while(_0x419cdf--){this['contents'][_0x55290f(0x137)](_0x501885['x'],_0x501885['y'],_0x425339,_0x1a85d7,_0x171f81,_0xa07f36),this['contents'][_0x55290f(0x137)](_0x501885['x']+_0x425339,_0x501885['y'],_0x425339,_0x1a85d7,_0xa07f36,_0x171f81);}this['changePaintOpacity'](!![]);},Window_Base['prototype']['drawCraftingItemName']=function(_0xc56180,_0x2fe2f9){const _0x2f61a4=_0x1c7984;let _0x1694b9=_0xc56180[_0x2f61a4(0x163)],_0xc2bf8a=_0x2fe2f9[_0x2f61a4(0x28a)]+this[_0x2f61a4(0x33c)]()*0x2,_0x3a25e8=_0x2fe2f9['y'],_0x2f01d1=_0x2fe2f9['width']-_0xc2bf8a-this[_0x2f61a4(0x33c)]()-ImageManager[_0x2f61a4(0x134)];DataManager['isCraftingItemMasked'](_0xc56180)&&(_0x1694b9=VisuMZ[_0x2f61a4(0x338)][_0x2f61a4(0x205)](_0xc56180),this[_0x2f61a4(0x2fb)][_0x2f61a4(0x26e)]=Window_ItemCraftingList[_0x2f61a4(0x197)]),this[_0x2f61a4(0x2b7)](_0x1694b9,_0xc2bf8a,_0x3a25e8,_0x2f01d1,_0x2f61a4(0x17d)),this[_0x2f61a4(0x2fb)][_0x2f61a4(0x26e)]=![];},VisuMZ['ItemCraftingSys'][_0x1c7984(0x205)]=function(_0x13eab0){const _0x5244c3=_0x1c7984;return DataManager[_0x5244c3(0x311)]&&(_0x13eab0=DataManager[_0x5244c3(0x311)](_0x13eab0)),_0x13eab0[_0x5244c3(0x251)][_0x5244c3(0x2be)](VisuMZ[_0x5244c3(0x338)][_0x5244c3(0x1cf)][_0x5244c3(0x19d)])?String(RegExp['$1']):this[_0x5244c3(0x2eb)](_0x13eab0[_0x5244c3(0x163)]);},VisuMZ['ItemCraftingSys'][_0x1c7984(0x2eb)]=function(_0x1e6863){const _0x212b1c=_0x1c7984;return Imported[_0x212b1c(0x1ac)]&&TextManager['parseLocalizedText']&&(_0x1e6863=TextManager[_0x212b1c(0x314)](_0x1e6863)),Array(_0x1e6863[_0x212b1c(0x2ad)]+0x1)[_0x212b1c(0x1f7)](TextManager[_0x212b1c(0x248)]);},Window_ItemCraftingList['prototype'][_0x1c7984(0x198)]=function(_0x2f5a6e,_0xa31cf8,_0x2b52be){const _0x3530a8=_0x1c7984,_0x51d4d0=VisuMZ[_0x3530a8(0x338)][_0x3530a8(0x1cf)],_0x1ae25b=_0xa31cf8['note'];let _0x2cd25e='';if(_0x1ae25b['match'](_0x51d4d0[_0x3530a8(0x2b2)]))_0x2cd25e=String(RegExp['$1']);else _0x1ae25b[_0x3530a8(0x2be)](_0x51d4d0[_0x3530a8(0x1ec)])&&(_0x2cd25e=String(RegExp['$1']));if(_0x2cd25e){const _0x114b28=ImageManager[_0x3530a8(0x315)](_0x2cd25e);_0x114b28['addLoadListener'](this[_0x3530a8(0x23f)][_0x3530a8(0x12a)](this,_0x2f5a6e,_0x114b28));}else this['drawBigItemIcon'](_0xa31cf8,_0x2b52be);},Window_ItemCraftingList[_0x1c7984(0x289)][_0x1c7984(0x23f)]=function(_0x4bb004,_0x37c4b0){const _0x345885=_0x1c7984,_0x5f2b15=this[_0x345885(0x2d9)](_0x4bb004);let _0x3877bf=_0x5f2b15['x']+this[_0x345885(0x33c)](),_0x2a82aa=_0x5f2b15['y']+0x4,_0x15b978=_0x5f2b15[_0x345885(0x16c)]-this[_0x345885(0x33c)]()*0x2,_0x47f354=_0x5f2b15[_0x345885(0x28a)]-0x8,_0x18fbfc=Math['min'](_0x15b978,_0x47f354);const _0x15584a=_0x18fbfc/_0x37c4b0[_0x345885(0x16c)],_0x14bed5=_0x18fbfc/_0x37c4b0[_0x345885(0x28a)],_0x158230=Math[_0x345885(0x211)](_0x15584a,_0x14bed5,0x1);let _0x2e2b79=Math['round'](_0x37c4b0[_0x345885(0x16c)]*_0x158230),_0x123060=Math[_0x345885(0x27b)](_0x37c4b0[_0x345885(0x28a)]*_0x158230);_0x3877bf+=Math['round']((_0x18fbfc-_0x2e2b79)/0x2),_0x2a82aa+=Math['round']((_0x18fbfc-_0x123060)/0x2);const _0x1b94bb=_0x37c4b0['width'],_0x463ff4=_0x37c4b0[_0x345885(0x28a)];this[_0x345885(0x2fb)][_0x345885(0x33d)][_0x345885(0x291)]=!![],this[_0x345885(0x2fb)][_0x345885(0x189)](_0x37c4b0,0x0,0x0,_0x1b94bb,_0x463ff4,_0x3877bf,_0x2a82aa,_0x2e2b79,_0x123060),this['contents'][_0x345885(0x33d)][_0x345885(0x291)]=!![];},Window_ItemCraftingList[_0x1c7984(0x289)][_0x1c7984(0x1d9)]=function(_0x365a70,_0x592ceb){const _0x57aa5c=_0x1c7984,_0x2b7b81=_0x365a70['iconIndex'];let _0x3f49cc=_0x592ceb['x']+this[_0x57aa5c(0x33c)](),_0x30fa38=_0x592ceb['y']+0x4,_0x494df9=_0x592ceb[_0x57aa5c(0x16c)]-this['itemPadding']()*0x2,_0x259956=_0x592ceb['height']-0x8,_0x277fdd=Math[_0x57aa5c(0x211)](_0x494df9,_0x259956);_0x277fdd=Math[_0x57aa5c(0x2ed)](_0x277fdd/ImageManager[_0x57aa5c(0x134)])*ImageManager['iconWidth'],_0x30fa38+=(_0x259956-_0x277fdd)/0x2;const _0x5561a1=ImageManager[_0x57aa5c(0x28e)](_0x57aa5c(0x293)),_0x45d94c=ImageManager[_0x57aa5c(0x134)],_0x7470eb=ImageManager[_0x57aa5c(0x1ba)],_0x57bc3f=_0x2b7b81%0x10*_0x45d94c,_0x50a5eb=Math['floor'](_0x2b7b81/0x10)*_0x7470eb;this[_0x57aa5c(0x2fb)][_0x57aa5c(0x33d)][_0x57aa5c(0x291)]=![],this[_0x57aa5c(0x2fb)]['blt'](_0x5561a1,_0x57bc3f,_0x50a5eb,_0x45d94c,_0x7470eb,_0x3f49cc,_0x30fa38,_0x277fdd,_0x277fdd),this[_0x57aa5c(0x2fb)][_0x57aa5c(0x33d)][_0x57aa5c(0x291)]=!![];},Window_ItemCraftingList[_0x1c7984(0x289)][_0x1c7984(0x277)]=function(_0xcb9631,_0x19e6fd){const _0xe45a1f=_0x1c7984;if(!$gameSystem[_0xe45a1f(0x12c)](_0xcb9631))return;const _0x3c1f04=ImageManager['itemCraftedIcon'];let _0x171acb=_0x19e6fd['x']+_0x19e6fd['width']-ImageManager[_0xe45a1f(0x134)],_0xf11728=_0x19e6fd['y']+0x2;this[_0xe45a1f(0x1eb)](_0x3c1f04,_0x171acb,_0xf11728);},Window_ItemCraftingList['prototype']['drawCraftingIngredients']=function(_0x5c0e76,_0x5ecf7b){const _0x2d19a0=_0x1c7984,_0x57f179=DataManager[_0x2d19a0(0x164)](_0x5c0e76);let _0x3fe0b4=_0x5ecf7b['height']+this[_0x2d19a0(0x33c)]()*0x2,_0x41b137=_0x5ecf7b['y']+Math[_0x2d19a0(0x27b)](this[_0x2d19a0(0x243)]()*1.2),_0x19986e=_0x5ecf7b[_0x2d19a0(0x16c)]-_0x3fe0b4-this[_0x2d19a0(0x33c)](),_0x32ca2c=Math[_0x2d19a0(0x2ed)](_0x19986e/this['_maxIngredientsSize']),_0x666f57=!![];for(const _0x4b3035 of _0x57f179){if(!_0x666f57){let _0xf066ce=TextManager['itemCraftingIngredientsBridge'],_0x18e05a=_0x5ecf7b['y']+(_0x5ecf7b[_0x2d19a0(0x28a)]-this['lineHeight']()*1.5);this[_0x2d19a0(0x2b7)](_0xf066ce,_0x3fe0b4,_0x18e05a,_0x32ca2c,_0x2d19a0(0x284));}_0x3fe0b4+=_0x32ca2c;const _0x1004d2=_0x4b3035[0x0],_0x17cdcd=_0x4b3035[0x1],_0x59128a=_0x1004d2==='gold'?$gameParty[_0x2d19a0(0x209)]():$gameParty['numItems'](_0x1004d2);if(_0x1004d2===_0x2d19a0(0x209))this[_0x2d19a0(0x294)](_0x17cdcd,_0x59128a,_0x3fe0b4,_0x41b137,_0x32ca2c);else typeof _0x1004d2===_0x2d19a0(0x149)&&_0x1004d2[_0x2d19a0(0x2be)](/CATEGORY/i)?this['drawIngredientCategory'](_0x1004d2,_0x17cdcd,_0x3fe0b4,_0x41b137,_0x32ca2c):this['drawIngredientItem'](_0x1004d2,_0x17cdcd,_0x59128a,_0x3fe0b4,_0x41b137,_0x32ca2c);this['resetFontSettings'](),_0x666f57=![];}},Window_ItemCraftingList[_0x1c7984(0x289)]['drawIngredientGold']=function(_0x4f0a92,_0x12683d,_0x47a77e,_0x5f30ac,_0x4fd798){const _0x322e67=_0x1c7984;if(Imported[_0x322e67(0x33e)]){let _0x258e94=_0x47a77e-Math[_0x322e67(0x27b)](ImageManager[_0x322e67(0x134)]/0x2),_0x1718df=_0x5f30ac+Math[_0x322e67(0x27b)]((this[_0x322e67(0x243)]()-ImageManager[_0x322e67(0x1ba)])/0x2);const _0x55a696=VisuMZ['CoreEngine']?VisuMZ[_0x322e67(0x1b4)][_0x322e67(0x24c)][_0x322e67(0x159)]['GoldIcon']:0x0;this[_0x322e67(0x1eb)](_0x55a696,_0x258e94,_0x1718df);}else{let _0x1ecb21=_0x47a77e-Math['round'](_0x4fd798/0x2),_0x297a99=_0x5f30ac+Math[_0x322e67(0x27b)]((this[_0x322e67(0x243)]()-ImageManager[_0x322e67(0x1ba)])/0x2);this[_0x322e67(0x273)](ColorManager[_0x322e67(0x20c)]()),this[_0x322e67(0x300)](),this[_0x322e67(0x2b7)](TextManager[_0x322e67(0x11b)],_0x1ecb21,_0x297a99,_0x4fd798,_0x322e67(0x284)),this[_0x322e67(0x1d8)]();}let _0x1402bd=_0x47a77e-Math[_0x322e67(0x27b)](_0x4fd798/0x2),_0x5dd72c=_0x5f30ac+this[_0x322e67(0x243)]();const _0x53b3bb=VisuMZ['ItemsEquipsCore'][_0x322e67(0x24c)][_0x322e67(0x1c6)]['ItemQuantityFmt'];let _0xca572c=_0x53b3bb[_0x322e67(0x1e1)](_0x4f0a92);_0x4f0a92>_0x12683d&&this[_0x322e67(0x273)](ColorManager[_0x322e67(0x2a9)]()),this[_0x322e67(0x2fb)][_0x322e67(0x1ae)]=Window_ItemCraftingList[_0x322e67(0x1a3)],this[_0x322e67(0x2b7)](_0xca572c,_0x1402bd,_0x5dd72c,_0x4fd798,_0x322e67(0x284));},Window_ItemCraftingList[_0x1c7984(0x289)]['drawIngredientCategory']=function(_0x50d451,_0x383609,_0x8aedf2,_0x5d83db,_0x58bbde){const _0x22ffe4=_0x1c7984,_0x3593e8=VisuMZ['ItemCraftingSys'][_0x22ffe4(0x24c)]['General'];let _0x76906a=_0x8aedf2-Math['round'](ImageManager[_0x22ffe4(0x134)]/0x2),_0x51ef83=_0x5d83db+Math[_0x22ffe4(0x27b)]((this[_0x22ffe4(0x243)]()-ImageManager[_0x22ffe4(0x1ba)])/0x2);this[_0x22ffe4(0x1eb)](_0x3593e8[_0x22ffe4(0x11a)],_0x76906a,_0x51ef83),_0x50d451[_0x22ffe4(0x2be)](/CATEGORY: (.*)/i);const _0x11b4f9=String(RegExp['$1'])['trim']();let _0x22c041=_0x8aedf2-Math[_0x22ffe4(0x27b)](_0x58bbde/0x2),_0x48a57a=_0x5d83db;this[_0x22ffe4(0x2fb)][_0x22ffe4(0x1ae)]=Window_ItemCraftingList[_0x22ffe4(0x1a3)],this[_0x22ffe4(0x2b7)](_0x11b4f9,_0x22c041,_0x48a57a,_0x58bbde,'center');let _0x1aef26=_0x8aedf2-Math[_0x22ffe4(0x27b)](_0x58bbde/0x2),_0xdfb618=_0x5d83db+this[_0x22ffe4(0x243)]();const _0x376682=VisuMZ[_0x22ffe4(0x1fb)][_0x22ffe4(0x24c)][_0x22ffe4(0x1c6)][_0x22ffe4(0x196)];let _0x107bbe=_0x376682['format'](_0x383609);this[_0x22ffe4(0x2fb)][_0x22ffe4(0x1ae)]=Window_ItemCraftingList[_0x22ffe4(0x1a3)],this[_0x22ffe4(0x2b7)](_0x107bbe,_0x1aef26,_0xdfb618,_0x58bbde,_0x22ffe4(0x284));},Window_ItemCraftingList[_0x1c7984(0x289)][_0x1c7984(0x239)]=function(_0x566fea,_0x1c7212,_0x121ae6,_0x485bba,_0x336631,_0xb88bdc){const _0x447138=_0x1c7984;let _0x1f00c7=_0x485bba-Math[_0x447138(0x27b)](ImageManager[_0x447138(0x134)]/0x2),_0x4c2304=_0x336631+Math[_0x447138(0x27b)]((this[_0x447138(0x243)]()-ImageManager[_0x447138(0x1ba)])/0x2);this[_0x447138(0x1eb)](_0x566fea[_0x447138(0x299)],_0x1f00c7,_0x4c2304);let _0x59d8d3=_0x485bba-Math[_0x447138(0x27b)](_0xb88bdc/0x2),_0x256479=_0x336631+this['lineHeight']();const _0x3c6b22=VisuMZ[_0x447138(0x1fb)][_0x447138(0x24c)][_0x447138(0x1c6)][_0x447138(0x196)];let _0x3eda11=_0x3c6b22['format'](_0x447138(0x31a)[_0x447138(0x1e1)](_0x121ae6,_0x1c7212));_0x1c7212>_0x121ae6&&this[_0x447138(0x273)](ColorManager[_0x447138(0x2a9)]()),this[_0x447138(0x2fb)][_0x447138(0x1ae)]=Window_ItemCraftingList[_0x447138(0x1a3)],this['drawText'](_0x3eda11,_0x59d8d3,_0x256479,_0xb88bdc,'center');},Window_ItemCraftingList[_0x1c7984(0x289)]['createTooltipWindow']=function(){const _0x8d375a=_0x1c7984;if(!VisuMZ[_0x8d375a(0x338)][_0x8d375a(0x24c)]['Window']['ToolTips'])return;const _0x1bdab7=new Rectangle(0x0,0x0,Graphics[_0x8d375a(0x12f)],Window_Base[_0x8d375a(0x289)][_0x8d375a(0x25c)](0x1));this[_0x8d375a(0x290)]=new Window_ItemCraftingTooltip(_0x1bdab7),this['addChild'](this[_0x8d375a(0x290)]);},Window_ItemCraftingList[_0x1c7984(0x289)][_0x1c7984(0x1ca)]=function(){const _0x5e6675=_0x1c7984;Window_ItemList['prototype']['update'][_0x5e6675(0x253)](this),this[_0x5e6675(0x187)]();},Window_ItemCraftingList[_0x1c7984(0x289)][_0x1c7984(0x187)]=function(){const _0x456371=_0x1c7984;if(!this[_0x456371(0x290)])return;this['tooltipFrameCheckRequirements']()?this[_0x456371(0x30c)]():this[_0x456371(0x290)][_0x456371(0x2dc)]('');const _0x3d158b=new Point(TouchInput['x'],TouchInput['y']),_0x562116=this['worldTransform'][_0x456371(0x15e)](_0x3d158b);this[_0x456371(0x290)]['x']=_0x562116['x']-this[_0x456371(0x290)][_0x456371(0x16c)]/0x2,this[_0x456371(0x290)]['y']=_0x562116['y']-this[_0x456371(0x290)][_0x456371(0x28a)];},Window_ItemCraftingList['prototype'][_0x1c7984(0x17a)]=function(){const _0xf36fb7=_0x1c7984;if(!this[_0xf36fb7(0x181)])return![];if(!this['item']())return![];if(!this[_0xf36fb7(0x173)]())return![];if(this[_0xf36fb7(0x2aa)]()!==this['index']())return![];return!![];},Window_ItemCraftingList[_0x1c7984(0x289)][_0x1c7984(0x30c)]=function(){const _0x5a4032=_0x1c7984,_0x977416=this['itemRectWithPadding'](this[_0x5a4032(0x341)]());$gameTemp[_0x5a4032(0x24f)]=!![];const _0x4dcef6=DataManager[_0x5a4032(0x164)](this[_0x5a4032(0x1a0)]());$gameTemp[_0x5a4032(0x24f)]=![];const _0x50f7dd=new Point(TouchInput['x'],TouchInput['y']),_0x55e390=this[_0x5a4032(0x26f)][_0x5a4032(0x15e)](_0x50f7dd);let _0x12131b=_0x977416[_0x5a4032(0x28a)]+this[_0x5a4032(0x33c)]()*0x2,_0x4407e8=_0x977416['y']+this['lineHeight'](),_0x34dd79=_0x977416[_0x5a4032(0x16c)]-_0x12131b-this[_0x5a4032(0x33c)](),_0x5b14e2=Math[_0x5a4032(0x2ed)](_0x34dd79/this[_0x5a4032(0x1f5)]);for(const _0x4cf901 of _0x4dcef6){_0x12131b+=_0x5b14e2;const _0x4dac6c=new Rectangle(_0x12131b-ImageManager[_0x5a4032(0x134)],0x0,ImageManager[_0x5a4032(0x134)]*0x2,Graphics['boxHeight']);if(_0x4dac6c[_0x5a4032(0x242)](_0x55e390['x'],_0x55e390['y'])){let _0x2f29c9=_0x4cf901[0x0],_0x41d294='';if(_0x2f29c9===_0x5a4032(0x209))_0x41d294=TextManager['currencyUnit'];else typeof _0x2f29c9==='string'&&_0x2f29c9[_0x5a4032(0x2be)](/CATEGORY/i)?(_0x2f29c9[_0x5a4032(0x2be)](/CATEGORY: (.*)/i),_0x41d294=String(RegExp['$1'])['trim']()):_0x41d294=_0x2f29c9[_0x5a4032(0x163)];this[_0x5a4032(0x290)][_0x5a4032(0x2dc)](_0x41d294[_0x5a4032(0x2f5)]());return;}}this[_0x5a4032(0x290)]['setText']('');},Window_ItemCraftingList[_0x1c7984(0x289)]['updateHelp']=function(){const _0x4a6046=_0x1c7984,_0x1431da=this[_0x4a6046(0x1a0)]()&&DataManager['isCraftingItemMasked'](this['item']())?null:this['item']();this[_0x4a6046(0x1b9)](_0x1431da),this['_statusWindow']&&this[_0x4a6046(0x117)]['constructor']===Window_ShopStatus&&this[_0x4a6046(0x117)][_0x4a6046(0x26b)](_0x1431da);};function Window_ItemCraftingTooltip(){const _0x3c9ff1=_0x1c7984;this[_0x3c9ff1(0x318)](...arguments);}Window_ItemCraftingTooltip[_0x1c7984(0x289)]=Object[_0x1c7984(0x220)](Window_Base[_0x1c7984(0x289)]),Window_ItemCraftingTooltip['prototype'][_0x1c7984(0x125)]=Window_ItemCraftingTooltip,Window_ItemCraftingTooltip[_0x1c7984(0x25b)]=VisuMZ[_0x1c7984(0x338)]['Settings']['Window'][_0x1c7984(0x163)],Window_ItemCraftingTooltip[_0x1c7984(0x289)][_0x1c7984(0x318)]=function(_0x5e7800){const _0x16f2f8=_0x1c7984;Window_Base[_0x16f2f8(0x289)][_0x16f2f8(0x318)][_0x16f2f8(0x253)](this,_0x5e7800),this[_0x16f2f8(0x250)](this[_0x16f2f8(0x18d)]()?0x0:0x2),this[_0x16f2f8(0x2dc)]('');},Window_ItemCraftingTooltip['prototype'][_0x1c7984(0x18d)]=function(){const _0x3088cd=_0x1c7984;return Window_ItemCraftingTooltip[_0x3088cd(0x25b)]!=='';},Window_ItemCraftingTooltip[_0x1c7984(0x289)][_0x1c7984(0x23d)]=function(){const _0xb6e762=_0x1c7984;Window_ItemCraftingTooltip[_0xb6e762(0x25b)]!==''?this[_0xb6e762(0x2ae)]=ImageManager['loadSystem'](Window_ItemCraftingTooltip['tooltipSkin']):Window_Base[_0xb6e762(0x289)][_0xb6e762(0x23d)][_0xb6e762(0x253)](this);},Window_ItemCraftingTooltip[_0x1c7984(0x289)][_0x1c7984(0x2dc)]=function(_0x555e4c){const _0x4abb22=_0x1c7984;this[_0x4abb22(0x201)]!==_0x555e4c&&(this[_0x4abb22(0x201)]=_0x555e4c,this[_0x4abb22(0x230)]());},Window_ItemCraftingTooltip['prototype'][_0x1c7984(0x138)]=function(){this['setText']('');},Window_ItemCraftingTooltip['prototype']['setItem']=function(_0x44e6b0){this['setText'](_0x44e6b0?_0x44e6b0['name']:'');},Window_ItemCraftingTooltip[_0x1c7984(0x289)][_0x1c7984(0x230)]=function(){const _0x16fefc=_0x1c7984,_0x2461cf=this[_0x16fefc(0x1e6)]();this[_0x16fefc(0x21c)](),this['drawText'](this[_0x16fefc(0x201)],0x0,0x0,this['innerWidth'],_0x16fefc(0x284));},Window_ItemCraftingTooltip[_0x1c7984(0x289)][_0x1c7984(0x21c)]=function(){const _0x4b22cd=_0x1c7984;if(this['_text']==='')this[_0x4b22cd(0x2fb)][_0x4b22cd(0x138)](),this[_0x4b22cd(0x16c)]=0x0;else{let _0x5e8cae=this['textWidth'](this[_0x4b22cd(0x201)])+this[_0x4b22cd(0x33c)]()*0x4;this['width']=_0x5e8cae+$gameSystem[_0x4b22cd(0x170)]()*0x2,this[_0x4b22cd(0x17b)]();if(this['hasCustomWindowSkin']())return;const _0x42192e=ColorManager[_0x4b22cd(0x2d0)]();this[_0x4b22cd(0x2fb)]['fillRect'](0x0,0x0,this[_0x4b22cd(0x2d1)],this[_0x4b22cd(0x2a6)],_0x42192e);}};function Window_ItemCraftingNumber(){const _0x564543=_0x1c7984;this[_0x564543(0x318)](...arguments);}function _0x3ff5(){const _0x439134=['initItemCraftingMainMenu','allCraftableWeapons','width','#%1','isItemCraftingCategoryValid','Animations','windowPadding','drawTotalPrice','itemNameY','isTouchedInsideFrame','cursorWidth','goto','contentsBack','itemCraftingNumberWindowOk','Armors','setCustomItemCraftingSettings','tooltipFrameCheckRequirements','createContents','_backSprite2','left','_item','toLowerCase','drawHorzLine','active','onItemCancel','NumWindowShift','-\x20Items\x20must\x20never\x20give\x20themselves!','cancel','createUncategorizedItemCategory','updateTooltipWindow','addItemCategory','blt','_commandWindow','setMainMenuItemCraftingVisible','initItemCraftingSys','hasCustomWindowSkin','_buttonAssistWindow','isMainMenuItemCraftingVisible','setWindowBackgroundTypes','setValue','drawFadedItemBackground','\x0a\x20\x20\x20\x20\x20\x20\x20\x20//\x20Declare\x20Arguments\x0a\x20\x20\x20\x20\x20\x20\x20\x20let\x20item\x20=\x20arguments[0];\x0a\x20\x20\x20\x20\x20\x20\x20\x20let\x20number\x20=\x20arguments[1];\x0a\x0a\x20\x20\x20\x20\x20\x20\x20\x20//\x20Process\x20Code\x0a\x20\x20\x20\x20\x20\x20\x20\x20try\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20%1\x0a\x20\x20\x20\x20\x20\x20\x20\x20}\x20catch\x20(e)\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20if\x20($gameTemp.isPlaytest())\x20console.log(e);\x0a\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x20\x20\x20\x20','hide','drawMathMarks','ItemQuantityFmt','maskItalics','drawBigItemImage','ARRAYSTR','in\x20order\x20for\x20VisuMZ_2_ItemCraftingSys\x20to\x20work.','isItemCraftingCommandVisible','isRightInputMode','MaskText','_goldWindow','onNumberCancel','item','gainCraftBatchItems','buttonAssistText4','quantityFontSize','mainAreaTop','onDatabaseLoaded','isTriggered','_list','opacity','jsGlobalListing','\x5cI[%1]%2','itemCrafting','VisuMZ_1_MessageCore','StatusWindow_RectJS','fontSize','loadTitle1','currentExt','drawCategories','ButtonAssistBgType','drawTextEx','CoreEngine','visualGoldDisplayAutosize','_ingredientCategories','Window_Selectable_select','SystemShowItemCraftingMenu','setHelpWindowItem','iconHeight','ReqQuantityFontSize','visualGoldDisplayNoCost','IngredientBridge','category','Ingredients','Game_Party_numItems','_category','terminate','createAnimation','VisuMZ_3_ShopBatches','changeOkButtonEnable','ItemScene','ItemCraftingNoCategory','createCraftingIngredientsLists','Animation','update','ceil','allCraftableItems','_categoryIndex','_ItemCrafting_MainMenu','RegExp','%1%2','parse','map','_weaponIDs','_amount','helpWindowRectItemsEquipsCore','updateItemSpriteOpacity','addChild','resetFontSettings','drawBigItemIcon','onIngredientListCancel','setBackgroundOpacity','selectLast','drawShopBatchContentsRemaining','isOkEnabled','drawCraftBatchContentsList','version','format','addCommand','2276EEvxMo','NoMask','drawGoldIngredient','baseTextRect','smoothSelect','weapon-%1','NoCategoryIcon','centerSprite','drawIcon','bigPicture','loseItem','buttonAssistKey1','SwitchCraft','determineMax','jsGlobalCraftEffect','VisuMZ_1_ItemsEquipsCore','itemLineRect','onItemCrafted','_maxIngredientsSize','createJS','join','addOriginalCommands','_ingredientAmounts','categoryWindowRect','ItemsEquipsCore','exit','_itemWindow','General','frames','max','_text','hasCraftBatchItems','categoryList','Weapon','maskItemName','StatusBgType','pop','drawItemBackground','gold','customCraftingOnly','hasMaxItems','systemColor','getInputMultiButtonStrings','itemCraftingIngredientsBridge','playItemCrafting','buttonAssistItemListRequirement','min','_helpWindow','filter','Scene_Menu_createCommandWindow','resetCraftingSwitches','_data','craftableArmors','ParseWeaponNotetags','setItemWindow','allowCreateStatusWindow','calcWindowHeight','drawTooltipBackground','goldWindowRect','_customItemCraftingSettings','push','create','_ingredientSelectTitle','AllSwitches','activate','isItem','_craftingIngredients','clone','Change','item-%1','OffSwitches','makeCommandList','_iconSprite','setMainMenuItemCraftingEnabled','_animationWait','_scene','show','refresh','Window_ItemCategory_makeCommandList','toUpperCase','_windowLayer','NumberBgType','processItemCrafting','You\x20do\x20not\x20have\x20any\x20craftable\x20items!\x0aRefer\x20to\x20the\x20help\x20file\x20on\x20how\x20to\x20create\x20crafting\x20recipes.','isPlaytest','concat','drawIngredientItem','allOfCraftBatchItemsMax','onButtonOk','currentCraftableItems','loadWindowskin','value','drawPicture','HelpWindow_RectJS','Show','contains','lineHeight','_armorIDs','STR','itemCraftedIcon','_cache_getCraftBatchItems','itemCraftingMask','_allCraftableWeapons','CraftEventOnce','net','Settings','createItemWindow','process_VisuMZ_ItemCraftingSys_Notetags','_bypassProxy','setBackgroundType','note','armor-%1','call','_nonCategoryItemCraftingItems','updateCraftingAnimation','282EkwiwL','_craftingCommonEventScene','drawIngredients','getColor','AllSw','tooltipSkin','fittingHeight','createTooltipWindow','weapon','registerCommand','statusWindowRectItemsEquipsCore','\x20+\x20','isProxyItem','statusWidth','getItemCraftedTimes','statusWindowRectJS','BypassSwitches','CustomItemCraftingSceneOpen','onAnimationFinish','armors','isCraftItemListed','setItem','BgFilename2','GoldWindow_RectJS','fontItalic','worldTransform','MaskItalics','shown','isSceneItemCrafting','changeTextColor','processCraftCommonEvent','Mask','test','drawCraftedIcon','shouldDrawCraftBatchContents','_categoryWindow','isEnabled','round','mainCommandWidth','Sound','buttonAssistCategory','50097wvuvXk','_animationIDs','goldWindowRectItemsEquipsCore','drawCraftBatchContents','maxGold','center','Scene_Boot_onDatabaseLoaded','isArmor','addItemCraftingCommandAutomatically','isSkill','prototype','height','ParseArmorNotetags','NumWindowOwned','playCancel','loadSystem','AnySw','_tooltipWindow','imageSmoothingEnabled','_craftingEvents','IconSet','drawIngredientGold','_animationSprite','showBatchContents','setItemSpriteFrame','drawCraftingIngredients','iconIndex','_number','anchor','setItemSpriteOpacity','all','ARRAYJSON','createIngredientSelectionList','Game_Party_gainItem','textColor','\x20=\x20','removeChild','getBackgroundOpacity','clearUserSelectedIngredients','innerHeight','buttonAssistSmallIncrement','registerCraftedItem','powerDownColor','hitIndex','Icon','select','length','windowskin','createAnimationIDs','onIngredientListOk','ItemWindow_RectJS','craftPicture','NumWindowNet','MainMenu','isCustomLayout','scale','drawText','getWeaponIdWithName','ItemCraftingSceneOpen','addWindow','doesItemHaveOpenCategories','loseGold','%1\x27s\x20version\x20does\x20not\x20match\x20plugin\x27s.\x20Please\x20update\x20it\x20in\x20the\x20Plugin\x20Manager.','match','Enable','goldWindowRectJS','createIngredientSelectionTitle','Window_ShopStatus_setItem','onCategoryOk','setFrame','5252868wJHwaQ','isFinishedAnimating','GoldBgType','buttonAssistText2','createCommandWindow','itemRect','198120OhYGWR','_itemsCrafted','totalPriceY','visible','FUNC','dimColor1','innerWidth','_animationPlaying','CraftRepeat','TurnSwitches','hasCraftingEventOccurred','itemHasCraftCommonEvent','updateHelp','ConvertParams','itemRectWithPadding','ItemCraftingNumberWindow','Game_System_initialize','setText','number','ParseItemNotetags','464252RzcuGg','right','Items','scaleSprite','makeItemList','description','remove','_itemSprite','EnableCustomLayout','destroy','FadeSpeed','ARRAYFUNC','maskName','meetsCraftingCommonEventSwitches','floor','items','destroyItemSprite','createBackground','_backSprite1','_numberWindow','findExt','drawItemName','trim','gainItem','isUseModernControls','addUncategorizedItemCategory','setItemSpriteBitmap','Window_ItemCategory_addItemCategory','contents','addLoadListener','createGoldWindow','CraftAssistButton','STRUCT','makeFontBigger','checkItemCraftingResultsValid','craftableItems','_max','VisuMZ_2_ShopCommonEvents','setItemForCraftBatchContents','drawCurrencyValue','armor','getCraftBatchItems','return\x200','setStatusWindow','addItemCraftingCommand','setTooltipWindowText','BgSettings','181XszSFl','statusWindowRect','standardIconWidth','getProxyItem','drawItemIngredient','mainAreaHeight','parseLocalizedText','loadPicture','_allCraftableItems','%1\x20has\x20illegal\x20batch\x20contents:\x0a','initialize','createCraftingItemKey','%1/%2','initItemCraftingEvents','ShowAnimations','postCreateItemWindowModernControls','isSceneBattle','categories','itemWindowRectJS','ShopScene','Window_ItemCategory_needsSelection','drawCurrentItemName','processFinishAnimation','registerCraftingEvent','_buttons','setupSelectIngredientWindow','getItemIdWithName','_ingredientIndex','_itemSpriteOpacitySpeed','_lastCraftingExt','buyWindowRectItemsEquipsCore','_craftPicture','isReleased','1246273fwasNd','10poYeWM','BgFilename1','parseCraftingIngredientsData','ItemCraftingMenuCommand','CategoryTitle','Window','shift','Uncategorized','ItemCraftingSys','itemWindowRect','numItems','placeButtons','itemPadding','_context','VisuMZ_0_CoreEngine','isWeapon','Window_ShopStatus_refresh','index','drawShopBatchContentsItem','BATCH_CONTENTS','Owned','Scale','helpWindowRect','CategoryWindow_RectJS','maxCols','onNumberOk','bitmap','clearCustomItemCraftingSettings','IngredientList','_statusWindow','AnySwitches','finishAnimation','CategoryIcon','currencyUnit','setupNumberWindow','WarningMsg','animationIDs','setItemSpritePosition','commandWindowRectItemsEquipsCore','callUpdateHelp','buttonAssistText1','ARRAYNUM','_alreadySelected','constructor','SelectedText','enabled','setHandler','categoryWindowRectJS','bind','calcCraftBatchItemsMax','isItemCrafted','_ingredientsList','includes','boxWidth','OnSwitches','15875kOTIGB','CraftEventRepeat','getCustomItemCraftingSettings','iconWidth','Type','createCustomBackgroundImages','gradientFillRect','clear','getArmorIdWithName','isTouchOkEnabled','isMVAnimation','CraftBatchWrap','_itemIDs','parameters','textWidth','isPlaying','isItemCraftingCommandEnabled','needsSelection','isMainMenuItemCraftingEnabled','split','createNumberWindow','isShowNew','_ingredientSelectList','selectedIngredientList','string','setup','_allCraftableArmors','SortByIDandPriority','Weapons','updateAnimationSprite','destroyAnimationSprite','isCraftingItemMasked','%1\x20is\x20incorrectly\x20placed\x20on\x20the\x20plugin\x20list.\x0aIt\x20is\x20a\x20Tier\x20%2\x20plugin\x20placed\x20over\x20other\x20Tier\x20%3\x20plugins.\x0aPlease\x20reorder\x20the\x20plugin\x20list\x20from\x20smallest\x20to\x20largest\x20tier\x20numbers.','dimColor2','createItemWindowBase','createItemSprite','startAnimation','helpWindowRectJS','status','onItemOk','Gold','process_VisuMZ_ItemCraftingSys_JS_TraitObject_Notetags','buttonAssistKey2','activateItemWindow','Parse_Notetags_CreateJS','applyInverse','Window_MenuCommand_addOriginalCommands','adjustSprite','jsOnCraft','allCraftableArmors','name','getCraftingIngredients','weapons','maxItems','owned','CheckAllSwitches','popScene'];_0x3ff5=function(){return _0x439134;};return _0x3ff5();}Window_ItemCraftingNumber[_0x1c7984(0x289)]=Object[_0x1c7984(0x220)](Window_ShopNumber[_0x1c7984(0x289)]),Window_ItemCraftingNumber[_0x1c7984(0x289)][_0x1c7984(0x125)]=Window_ItemCraftingNumber,Window_ItemCraftingNumber[_0x1c7984(0x289)][_0x1c7984(0x318)]=function(_0x24c2e2){const _0x12ba2a=_0x1c7984;Window_ShopNumber['prototype'][_0x12ba2a(0x318)]['call'](this,_0x24c2e2);},Window_ItemCraftingNumber[_0x1c7984(0x289)][_0x1c7984(0x14a)]=function(_0x8bd07f){const _0x2bce0f=_0x1c7984;this[_0x2bce0f(0x17e)]=_0x8bd07f,this[_0x2bce0f(0x303)]=this[_0x2bce0f(0x1f0)](),this[_0x2bce0f(0x29a)]=Math[_0x2bce0f(0x211)](0x1,this['_max']),this[_0x2bce0f(0x33b)](),this[_0x2bce0f(0x230)]();},Window_ItemCraftingNumber[_0x1c7984(0x289)][_0x1c7984(0x1f0)]=function(){const _0x5a7e2a=_0x1c7984;if(DataManager[_0x5a7e2a(0x202)](this[_0x5a7e2a(0x17e)]))return $gameParty[_0x5a7e2a(0x12b)](this[_0x5a7e2a(0x17e)]);const _0xf26c3f=[],_0x200704=this['_item'],_0x4235d9=DataManager[_0x5a7e2a(0x164)](_0x200704);let _0x4cdf5c=0x0;for(const _0x39b5bf of _0x4235d9){if(!_0x39b5bf)continue;let _0x3f493e=_0x39b5bf[0x0];const _0x501bcb=_0x39b5bf[0x1];_0x3f493e===_0x5a7e2a(0x209)?_0xf26c3f[_0x5a7e2a(0x21f)](Math[_0x5a7e2a(0x2ed)]($gameParty[_0x5a7e2a(0x209)]()/_0x501bcb)):(typeof _0x3f493e===_0x5a7e2a(0x149)&&_0x3f493e[_0x5a7e2a(0x2be)](/CATEGORY/i)&&(_0x3f493e=SceneManager['_scene'][_0x5a7e2a(0x12d)][_0x4cdf5c],_0x4cdf5c+=0x1),_0xf26c3f[_0x5a7e2a(0x21f)](Math['floor']($gameParty['numItems'](_0x3f493e)/_0x501bcb)));}if(_0xf26c3f[_0x5a7e2a(0x2ad)]<=0x0)_0xf26c3f[_0x5a7e2a(0x21f)](0x0);return _0xf26c3f[_0x5a7e2a(0x21f)]($gameParty[_0x5a7e2a(0x166)](_0x200704)-$gameParty[_0x5a7e2a(0x33a)](_0x200704)),Math[_0x5a7e2a(0x211)](..._0xf26c3f);},Window_ItemCraftingNumber['prototype'][_0x1c7984(0x230)]=function(){const _0x543ca5=_0x1c7984;Window_Selectable['prototype'][_0x543ca5(0x230)][_0x543ca5(0x253)](this),this[_0x543ca5(0x1c5)](),this[_0x543ca5(0x208)](0x0),this[_0x543ca5(0x171)](),this[_0x543ca5(0x180)](),this[_0x543ca5(0x323)]();},Window_ItemCraftingNumber[_0x1c7984(0x289)]['changeOkButtonEnable']=function(){const _0x435d8c=_0x1c7984,_0x1ab0a2=this[_0x435d8c(0x326)][0x4];if(!_0x1ab0a2)return;this[_0x435d8c(0x1de)]()?_0x1ab0a2['setClickHandler'](this[_0x435d8c(0x23b)]['bind'](this)):_0x1ab0a2['_clickHandler']=null;},Window_ItemCraftingNumber['prototype'][_0x1c7984(0x172)]=function(){const _0x4fe1ee=_0x1c7984;return Math[_0x4fe1ee(0x2ed)](this['totalPriceY']()+this[_0x4fe1ee(0x243)]()*0x2);},Window_ItemCraftingNumber[_0x1c7984(0x289)][_0x1c7984(0x2cd)]=function(){return Math['floor'](this['innerHeight']-this['lineHeight']()*6.5);},Window_ItemCraftingNumber[_0x1c7984(0x289)]['buttonY']=function(){const _0x13daeb=_0x1c7984;return Math['floor'](this['itemNameY']()+this[_0x13daeb(0x243)]()*0x2);},Window_ItemCraftingNumber[_0x1c7984(0x289)]['isOkEnabled']=function(){const _0x147f6b=_0x1c7984;if((this['_number']||0x0)<=0x0)return![];return Window_ShopNumber[_0x147f6b(0x289)]['isOkEnabled'][_0x147f6b(0x253)](this);},Window_ItemCraftingNumber[_0x1c7984(0x289)][_0x1c7984(0x13a)]=function(){const _0xeb5626=_0x1c7984;return this[_0xeb5626(0x1de)]();},Window_ItemCraftingNumber['prototype'][_0x1c7984(0x171)]=function(){const _0x28ddac=_0x1c7984,_0x15a9c3=DataManager[_0x28ddac(0x164)](this['_item']);let _0x45116b=this['totalPriceY']();_0x45116b-=this[_0x28ddac(0x243)]()*_0x15a9c3[_0x28ddac(0x2ad)],this[_0x28ddac(0x1cd)]=0x0,this[_0x28ddac(0x1b1)](_0x45116b);for(const _0x50c924 of _0x15a9c3){_0x45116b+=this['lineHeight']();if(!_0x50c924)continue;this[_0x28ddac(0x258)](_0x50c924,_0x45116b);};},Window_ItemCraftingNumber[_0x1c7984(0x289)][_0x1c7984(0x1b1)]=function(_0x1c223b){const _0x3c7761=_0x1c7984,_0x46ef00=this[_0x3c7761(0x33c)]();let _0xe683cb=_0x46ef00*0x2;const _0x4650e2=this[_0x3c7761(0x2d1)]-_0xe683cb-_0x46ef00*0x3,_0x3f4fc1=_0xe683cb+Math[_0x3c7761(0x1cb)](_0x4650e2/0x3),_0x52fe50=Math['floor'](_0x4650e2*0x2/0x3/0x3),_0x501162=Math[_0x3c7761(0x200)](this[_0x3c7761(0x13f)](_0x3c7761(0x261)),this[_0x3c7761(0x13f)]('\x20=\x20'));this[_0x3c7761(0x1d8)](),this['changeTextColor'](ColorManager[_0x3c7761(0x20c)]());const _0x3dfe5a=[_0x3c7761(0x167),_0x3c7761(0x336),_0x3c7761(0x24b)];for(let _0xd1cbf=0x0;_0xd1cbf<0x3;_0xd1cbf++){const _0x17b501=_0x3dfe5a[_0xd1cbf],_0x44419f=TextManager[_0x3c7761(0x2da)][_0x17b501];this[_0x3c7761(0x2b7)](_0x44419f,_0x3f4fc1+_0x52fe50*_0xd1cbf+_0x501162,_0x1c223b,_0x52fe50-_0x501162,_0x3c7761(0x284));}},Window_ItemCraftingNumber[_0x1c7984(0x289)]['drawMathMarks']=function(_0x3dec6b,_0x250284){const _0x2872da=_0x1c7984,_0xb4d835=this[_0x2872da(0x33c)]();let _0x46b7bf=_0xb4d835*0x2;const _0x2d2956=this[_0x2872da(0x2d1)]-_0x46b7bf-_0xb4d835*0x3,_0x53fbfe=_0x46b7bf+Math['ceil'](_0x2d2956/0x3),_0x4f43ab=Math[_0x2872da(0x2ed)](_0x2d2956*0x2/0x3/0x3);_0x250284='\x20%1'[_0x2872da(0x1e1)](_0x250284),this[_0x2872da(0x2b7)](_0x250284,_0x53fbfe+_0x4f43ab*0x1,_0x3dec6b,_0x4f43ab,_0x2872da(0x17d)),this['drawText']('\x20=',_0x53fbfe+_0x4f43ab*0x2,_0x3dec6b,_0x4f43ab,_0x2872da(0x17d));},Window_ItemCraftingNumber[_0x1c7984(0x289)][_0x1c7984(0x258)]=function(_0x39209c,_0x387912){const _0x1885fa=_0x1c7984;let _0x570c30=_0x39209c[0x0];this[_0x1885fa(0x1d8)](),this[_0x1885fa(0x195)](_0x387912,'-'),_0x570c30===_0x1885fa(0x209)?this[_0x1885fa(0x1e5)](_0x39209c,_0x387912,!![]):this[_0x1885fa(0x312)](_0x39209c,_0x387912,!![],![]);},Window_ItemCraftingNumber[_0x1c7984(0x289)]['drawCurrentItemName']=function(){const _0x31d2e8=_0x1c7984,_0xa8ecde=[this[_0x31d2e8(0x17e)],0x1],_0x58e1f5=this[_0x31d2e8(0x172)](),_0x1ae2ec=DataManager[_0x31d2e8(0x150)](this[_0x31d2e8(0x17e)]);this[_0x31d2e8(0x312)](_0xa8ecde,_0x58e1f5,![],_0x1ae2ec),this[_0x31d2e8(0x195)](_0x58e1f5,'+');},Window_ItemCraftingNumber[_0x1c7984(0x289)][_0x1c7984(0x1b5)]=function(){return!![];},Window_ItemCraftingNumber['prototype'][_0x1c7984(0x1bc)]=function(){return![];},Window_ItemCraftingNumber[_0x1c7984(0x289)][_0x1c7984(0x1e5)]=function(_0x12e035,_0x213ed7,_0x465978){const _0x5e4863=_0x1c7984,_0x4c186b=this['itemPadding']();let _0x507043=_0x4c186b*0x2;const _0x236cee=this[_0x5e4863(0x2d1)]-_0x507043-_0x4c186b*0x3,_0x58658b=_0x507043+Math['ceil'](_0x236cee/0x3),_0x471656=Math[_0x5e4863(0x2ed)](_0x236cee*0x2/0x3/0x3),_0x7c71b8=Math[_0x5e4863(0x200)](this[_0x5e4863(0x13f)](_0x5e4863(0x261)),this['textWidth'](_0x5e4863(0x2a2))),_0x6960c8=_0x12e035[0x0],_0x317bc2=_0x12e035[0x1],_0x20fb51=_0x317bc2*this[_0x5e4863(0x29a)],_0x5b0822=VisuMZ[_0x5e4863(0x1b4)]?VisuMZ[_0x5e4863(0x1b4)][_0x5e4863(0x24c)][_0x5e4863(0x159)]['GoldIcon']:0x0;if(_0x5b0822>0x0){const _0x4da128=ImageManager[_0x5e4863(0x310)]||0x20,_0x4ff28b=_0x4da128-ImageManager[_0x5e4863(0x134)],_0x908647=_0x4da128+0x4,_0x2daad8=_0x213ed7+(this['lineHeight']()-ImageManager['iconHeight'])/0x2;this[_0x5e4863(0x1eb)](_0x5b0822+Math[_0x5e4863(0x1cb)](_0x4ff28b/0x2),_0x507043,_0x2daad8),_0x507043+=_0x908647;}this[_0x5e4863(0x273)](ColorManager['systemColor']()),this[_0x5e4863(0x2b7)](TextManager[_0x5e4863(0x11b)],_0x507043,_0x213ed7,_0x471656,_0x5e4863(0x17d));const _0x146c4c=$gameParty['gold']();this['drawCurrencyValue'](_0x146c4c,TextManager[_0x5e4863(0x11b)],_0x58658b,_0x213ed7,_0x471656);const _0x15a639=_0x58658b+_0x471656*0x1+_0x7c71b8,_0xd1fdc2=_0x471656-_0x7c71b8;this['drawCurrencyValue'](_0x20fb51,TextManager[_0x5e4863(0x11b)],_0x15a639,_0x213ed7,_0xd1fdc2);const _0x190eab=_0x58658b+_0x471656*0x2+_0x7c71b8,_0x174c8b=_0x471656-_0x7c71b8,_0x21a989=Math['min'](_0x146c4c+_0x20fb51*(_0x465978?-0x1:0x1),$gameParty[_0x5e4863(0x283)]());this[_0x5e4863(0x306)](_0x21a989,TextManager[_0x5e4863(0x11b)],_0x190eab,_0x213ed7,_0x174c8b);},Window_ItemCraftingNumber['prototype'][_0x1c7984(0x312)]=function(_0x3fa4fc,_0x54c4a0,_0x39b24c,_0x5c1762){const _0x216a32=_0x1c7984,_0x1faf22=this[_0x216a32(0x33c)]();let _0xffc834=_0x1faf22*0x2;const _0x2a8936=this['innerWidth']-_0xffc834-_0x1faf22*0x3,_0x5ce7d9=_0xffc834+Math[_0x216a32(0x1cb)](_0x2a8936/0x3),_0x508ce4=Math[_0x216a32(0x2ed)](_0x2a8936*0x2/0x3/0x3),_0x2d8041=Math['max'](this[_0x216a32(0x13f)](_0x216a32(0x261)),this['textWidth'](_0x216a32(0x2a2)));let _0x404cdf=_0x3fa4fc[0x0];typeof _0x404cdf===_0x216a32(0x149)&&_0x404cdf[_0x216a32(0x2be)](/CATEGORY/i)&&(_0x404cdf=SceneManager[_0x216a32(0x22e)][_0x216a32(0x12d)][this[_0x216a32(0x1cd)]],this[_0x216a32(0x1cd)]+=0x1);const _0x32a1b6=_0x3fa4fc[0x1],_0x3a35d4=_0x32a1b6*this['_number'];let _0x4f631a=_0x404cdf[_0x216a32(0x299)];const _0x4e33ab=_0x4f631a>0x0?ImageManager[_0x216a32(0x134)]+0x4:0x0;if(_0x5c1762){const _0x16be21=new Rectangle(_0xffc834,_0x54c4a0,_0x2a8936,this[_0x216a32(0x243)]());this['drawCraftingItemName'](_0x404cdf,_0x16be21),this[_0x216a32(0x1eb)](_0x404cdf[_0x216a32(0x299)],_0x16be21['x'],_0x16be21['y']);}else this[_0x216a32(0x2f4)](_0x404cdf,_0xffc834,_0x54c4a0,_0x2a8936);const _0x281289=_0x5ce7d9+_0x508ce4*0x0,_0x4998a0=_0x508ce4-_0x4e33ab,_0x211f25=$gameParty[_0x216a32(0x33a)](_0x404cdf);this[_0x216a32(0x2b7)](_0x211f25,_0x281289,_0x54c4a0,_0x4998a0,_0x216a32(0x2e0)),this[_0x216a32(0x1eb)](_0x4f631a,_0x281289+_0x4998a0+0x4,_0x54c4a0);const _0x17a5b1=_0x5ce7d9+_0x508ce4*0x1+_0x2d8041,_0x2aac01=_0x508ce4-_0x2d8041-_0x4e33ab;this[_0x216a32(0x2b7)](_0x3a35d4,_0x17a5b1,_0x54c4a0,_0x2aac01,_0x216a32(0x2e0)),this['drawIcon'](_0x4f631a,_0x17a5b1+_0x2aac01+0x4,_0x54c4a0);const _0xe25158=_0x5ce7d9+_0x508ce4*0x2+_0x2d8041,_0x1f52eb=_0x508ce4-_0x2d8041-_0x4e33ab,_0x5b3782=_0x211f25+_0x3a35d4*(_0x39b24c?-0x1:0x1);this['drawText'](_0x5b3782,_0xe25158,_0x54c4a0,_0x1f52eb,_0x216a32(0x2e0)),this[_0x216a32(0x1eb)](_0x4f631a,_0xe25158+_0x1f52eb+0x4,_0x54c4a0);},Window_ItemCraftingNumber[_0x1c7984(0x289)][_0x1c7984(0x2ca)]=function(){const _0x1605ff=_0x1c7984,_0x2bcff5=this[_0x1605ff(0x33c)]();let _0x1ffe42=_0x2bcff5*0x2;const _0x4871c2=this[_0x1605ff(0x2d1)]-_0x1ffe42-_0x2bcff5*0x3,_0x11d871=_0x1ffe42+Math[_0x1605ff(0x1cb)](_0x4871c2/0x3),_0x318d12=this[_0x1605ff(0x172)](),_0x362e75=Math['floor'](_0x4871c2*0x2/0x3/0x3),_0x4b5c8d=Math[_0x1605ff(0x200)](this[_0x1605ff(0x13f)](_0x1605ff(0x261)),this[_0x1605ff(0x13f)](_0x1605ff(0x2a2))),_0x5f795=this[_0x1605ff(0x17e)]?.[_0x1605ff(0x299)]>0x0?ImageManager[_0x1605ff(0x134)]:0x0,_0x3b7560=this[_0x1605ff(0x174)](),_0x32df7d=new Rectangle(Math[_0x1605ff(0x2ed)](_0x11d871+_0x362e75*0x2-this[_0x1605ff(0x174)]()-_0x5f795+this[_0x1605ff(0x33c)]()/0x2-0x2),_0x318d12,this[_0x1605ff(0x174)](),this[_0x1605ff(0x243)]());return _0x32df7d;};function Window_ItemCraftingIngredient(){const _0x18f29f=_0x1c7984;this[_0x18f29f(0x318)](...arguments);}Window_ItemCraftingIngredient[_0x1c7984(0x289)]=Object[_0x1c7984(0x220)](Window_ItemList[_0x1c7984(0x289)]),Window_ItemCraftingIngredient[_0x1c7984(0x289)][_0x1c7984(0x125)]=Window_ItemCraftingIngredient,Window_ItemCraftingIngredient['prototype']['initialize']=function(_0x2618a9){const _0x34037c=_0x1c7984;Window_Selectable[_0x34037c(0x289)][_0x34037c(0x318)][_0x34037c(0x253)](this,_0x2618a9),this[_0x34037c(0x1d4)]=0x0;},Window_ItemCraftingIngredient[_0x1c7984(0x289)][_0x1c7984(0x146)]=function(){return![];},Window_ItemCraftingIngredient['prototype']['setup']=function(_0x3fa288,_0x33dfbf){const _0x403635=_0x1c7984;this[_0x403635(0x1c1)]=_0x3fa288,this['_amount']=_0x33dfbf||0x1,this[_0x403635(0x230)](),this['scrollTo'](0x0,0x0),this['activate'](),this[_0x403635(0x1e7)](0x0);},Window_ItemCraftingIngredient[_0x1c7984(0x289)][_0x1c7984(0x2e3)]=function(){const _0x301bca=_0x1c7984;this[_0x301bca(0x216)]=$gameParty['allItems']()[_0x301bca(0x213)](_0x88bd54=>this[_0x301bca(0x12e)](_0x88bd54));},Window_ItemCraftingIngredient[_0x1c7984(0x289)][_0x1c7984(0x12e)]=function(_0x2872d1){const _0x1a7388=_0x1c7984;if(!_0x2872d1)return![];if(_0x2872d1===SceneManager[_0x1a7388(0x22e)]['_item'])return![];return _0x2872d1[_0x1a7388(0x31f)][_0x1a7388(0x12e)](this[_0x1a7388(0x1c1)][_0x1a7388(0x232)]()['trim']());},Window_ItemCraftingIngredient[_0x1c7984(0x289)][_0x1c7984(0x27a)]=function(_0x142f90){const _0x4421e7=_0x1c7984;if(!_0x142f90)return![];if(this[_0x4421e7(0x148)]()['includes'](_0x142f90))return![];return $gameParty['numItems'](_0x142f90)>=this[_0x4421e7(0x1d4)];},Window_ItemCraftingIngredient[_0x1c7984(0x289)][_0x1c7984(0x148)]=function(){const _0x26c336=_0x1c7984,_0x36e1d2=[],_0x105115=DataManager[_0x26c336(0x164)](SceneManager[_0x26c336(0x22e)][_0x26c336(0x17e)]);for(const _0x1a8f54 of _0x105115){if(!_0x1a8f54)continue;const _0x239c6b=_0x1a8f54[0x0];(DataManager['isItem'](_0x239c6b)||DataManager['isWeapon'](_0x239c6b)||DataManager[_0x26c336(0x286)](_0x239c6b))&&_0x36e1d2[_0x26c336(0x21f)](_0x239c6b);}return _0x36e1d2['concat'](SceneManager[_0x26c336(0x22e)][_0x26c336(0x12d)]);},Window_ItemCraftingIngredient[_0x1c7984(0x289)][_0x1c7984(0x2f4)]=function(_0x39edeb,_0x1ed630,_0x5a68fd,_0xd7f0fa){const _0x4c26f2=_0x1c7984;_0x39edeb&&this[_0x4c26f2(0x148)]()[_0x4c26f2(0x12e)](_0x39edeb)&&(this[_0x4c26f2(0x124)]=!![]),Window_ItemList[_0x4c26f2(0x289)][_0x4c26f2(0x2f4)]['call'](this,_0x39edeb,_0x1ed630,_0x5a68fd,_0xd7f0fa),this[_0x4c26f2(0x124)]=![];},Window_ItemCraftingIngredient['prototype'][_0x1c7984(0x2b7)]=function(_0x11b33a,_0x3c4204,_0x3c73ae,_0x45c997,_0x4c0ff2){const _0x4cd27d=_0x1c7984;if(this[_0x4cd27d(0x124)]){const _0xe821f0=VisuMZ[_0x4cd27d(0x338)][_0x4cd27d(0x24c)][_0x4cd27d(0x1fe)];this[_0x4cd27d(0x2fb)][_0x4cd27d(0x2a1)]=ColorManager[_0x4cd27d(0x259)](_0xe821f0['SelectedColor']),_0x11b33a+=_0xe821f0[_0x4cd27d(0x126)];}Window_Base[_0x4cd27d(0x289)]['drawText'][_0x4cd27d(0x253)](this,_0x11b33a,_0x3c4204,_0x3c73ae,_0x45c997,_0x4c0ff2);},VisuMZ[_0x1c7984(0x338)][_0x1c7984(0x340)]=Window_ShopStatus[_0x1c7984(0x289)][_0x1c7984(0x230)],Window_ShopStatus[_0x1c7984(0x289)][_0x1c7984(0x230)]=function(){const _0x2c0824=_0x1c7984;this[_0x2c0824(0x278)](this[_0x2c0824(0x17e)])?this[_0x2c0824(0x305)](this[_0x2c0824(0x17e)]):VisuMZ['ItemCraftingSys'][_0x2c0824(0x340)][_0x2c0824(0x253)](this);},VisuMZ['ItemCraftingSys']['Window_ShopStatus_setItem']=Window_ShopStatus[_0x1c7984(0x289)][_0x1c7984(0x26b)],Window_ShopStatus[_0x1c7984(0x289)][_0x1c7984(0x26b)]=function(_0x3beeb7){const _0x2a0c7d=_0x1c7984;this['shouldDrawCraftBatchContents'](_0x3beeb7)?this[_0x2a0c7d(0x305)](_0x3beeb7):VisuMZ[_0x2a0c7d(0x338)][_0x2a0c7d(0x2c2)][_0x2a0c7d(0x253)](this,_0x3beeb7);},Window_ShopStatus['prototype']['shouldDrawCraftBatchContents']=function(_0x29e956){const _0x25b678=_0x1c7984;if(!_0x29e956)return![];if(!SceneManager[_0x25b678(0x272)]())return![];if(Imported['VisuMZ_3_ShopBatches']){if(!Window_ShopStatus[_0x25b678(0x10d)][_0x25b678(0x296)])return![];}return DataManager[_0x25b678(0x202)](_0x29e956);},Window_ShopStatus['prototype'][_0x1c7984(0x305)]=function(_0x11cccf){const _0x20d0eb=_0x1c7984;this['_item']=_0x11cccf,this[_0x20d0eb(0x2fb)][_0x20d0eb(0x138)](),this[_0x20d0eb(0x176)][_0x20d0eb(0x138)](),this['drawCraftBatchContents'](_0x11cccf);},Window_ShopStatus[_0x1c7984(0x289)][_0x1c7984(0x282)]=function(_0x8c2bf6){const _0x1d3ff2=_0x1c7984;let _0x46bc39=this['drawShopBatchContentsTitle']();_0x46bc39=this[_0x1d3ff2(0x1df)](_0x46bc39,_0x8c2bf6),this[_0x1d3ff2(0x1dd)](_0x46bc39);},Window_ShopStatus['prototype'][_0x1c7984(0x1df)]=function(_0x453849,_0x109e21){const _0x2b6e3c=_0x1c7984,_0x1d9157=DataManager[_0x2b6e3c(0x308)](_0x109e21),_0xdbd5f5=[_0x2b6e3c(0x2ee),'weapons',_0x2b6e3c(0x269)];for(const _0x34dd68 of _0xdbd5f5){const _0x417942=_0x1d9157[_0x34dd68];for(const _0x11b578 in _0x417942){const _0x486e54=Number(_0x11b578),_0x540ee9=_0x417942[_0x11b578]||0x0;let _0x1c6b6c=null;if(_0x34dd68==='items')_0x1c6b6c=$dataItems[_0x486e54];if(_0x34dd68==='weapons')_0x1c6b6c=$dataWeapons[_0x486e54];if(_0x34dd68==='armors')_0x1c6b6c=$dataArmors[_0x486e54];if(DataManager['isProxyItem'](_0x1c6b6c))continue;_0x1c6b6c&&(this[_0x2b6e3c(0x1d8)](),this[_0x2b6e3c(0x342)](_0x453849,_0x1c6b6c,_0x540ee9),_0x453849+=this[_0x2b6e3c(0x243)]());}}return _0x453849;};