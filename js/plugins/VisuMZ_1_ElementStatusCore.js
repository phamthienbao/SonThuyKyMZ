//=============================================================================
// VisuStella MZ - Elements & Status Menu Core
// VisuMZ_1_ElementStatusCore.js
//=============================================================================

var Imported = Imported || {};
Imported.VisuMZ_1_ElementStatusCore = true;

var VisuMZ = VisuMZ || {};
VisuMZ.ElementStatusCore = VisuMZ.ElementStatusCore || {};
VisuMZ.ElementStatusCore.version = 1.29;

//=============================================================================
 /*:
 * @target MZ
 * @plugindesc [RPG Maker MZ] [Tier 1] [Version 1.29] [ElementStatusCore]
 * @author VisuStella
 * @url http://www.yanfly.moe/wiki/Elements_and_Status_Menu_Core_VisuStella_MZ
 * @orderAfter VisuMZ_0_CoreEngine
 *
 * @help
 * ============================================================================
 * Introduction
 * ============================================================================
 *
 * The Elements & Status Menu Core plugin gives you more control over in-game
 * elemental rate calculations, providing Trait Sets to streamline assigning
 * elements to actors and enemies, and updating the Status Menu to display all
 * that information properly.
 *
 * Features include all (but not limited to) the following:
 * 
 * * Element Rate control from target side and user side.
 * * Elemental Absorption and Elemental Reflection added.
 * * Assign items and skills to have multiple elements.
 * * Elemental rates can be adjusted from additive and multiplicative notetags.
 * * Forcing Elemental Rates and nullifying Elemental properties.
 * * Trait Sets added to mass assign traits through the usage of notetags.
 * * Trait Sets used to assign Elements, SubElements, Genders, Races, Natures,
 *   Alignments, Blessings, Curses, Zodiacs, and Variants.
 * * Randomized Trait Sets with weights to make enemies more dynamic.
 * * The ability to change traits midway through the game by Plugin Commands.
 * * Updated Status Menu Layout to display all this new information.
 * * Control over the information category tabs in the Status Menu.
 * * Change up the actor's Biography midway through the game by Plugin Command.
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
 * Major Changes
 * ============================================================================
 *
 * This plugin adds some new hard-coded features to RPG Maker MZ's functions.
 * The following is a list of them.
 *
 * ---
 *
 * Element Damage Calculation
 *
 * - Elemental damage was calculated in one very specific way in RPG Maker MZ:
 * getting the target's elemental resistance found across various database
 * objects and applying the damage to that rate. This plugin extends that by
 * giving more ways to extend the target's elemental damage rate as add in a
 * facet which introduces the attacker's elemental bonus damage, too.
 *
 * ---
 *
 * Multi-Elemental Calculation
 *
 * - By default in RPG Maker MZ, if there are multiple elements assigned to an
 * action, then the element with the highest rate is taken. This plugin will
 * give you, the game dev, the decision on how this is handled: the default
 * maximum rate, a minimum rate, a multiplicative product, an additive sum, or
 * an average of all the elemental rates calculated.
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
 * === Element-Related Notetags ===
 *
 * The following are element-related notetags.
 *
 * ---
 *
 * <Multi-Element: x>
 * <Multi-Element: x,x,x>
 *
 * <Multi-Element: name>
 * <Multi-Element: name, name, name>
 *
 * - Used for: Skill, Item Notetags
 * - Gives this action an additional element (alongside the Damage element)
 *   when calculating damage.
 * - Replace 'x' with the ID of the element from Database > Types.
 * - For 'name' notetag variant, replace 'name' with the element's name.
 *   Remove any \I[x] in the 'name' replacement.
 * - Insert multiples of this notetag to allow unit to assign more elements.
 *
 * ---
 *
 * <Multi-Element Rule: Maximum>
 * <Multi-Element Rule: Minimum>
 * <Multi-Element Rule: Multiply>
 * <Multi-Element Rule: Additive>
 * <Multi-Element Rule: Average>
 *
 * - Used for: Skill, Item Notetags
 * - Changes the multi-element ruling for this action to either 'Maximum',
 *   'Minimum', 'Multiply', 'Additive', or 'Average'.
 * - If this notetag is not used, refer to the default ruling set by the
 *   Plugin Parameters.
 *
 * ---
 *
 * <Force Action Element: Null>
 *
 * <Force Action Element: x>
 * <Force Action Element: x,x,x>
 *
 * <Force Action Element: name>
 * <Force Action Element: name, name, name>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Forces any actions performed by this unit to be the specific element(s).
 * - Replace 'x' with the ID of the element from Database > Types.
 * - For 'name' notetag variant, replace 'name' with the element's name.
 *   Remove any \I[x] in the 'name' replacement.
 * - If multiples of this notetag are found across various Database objects,
 *   priority will go in the order of states, actor, enemy, class, equips.
 *
 * ---
 *
 * <Force Received Element id Rate: x%>
 * <Force Received Element id Rate: x.x>
 *
 * <Force Received Element name Rate: x%>
 * <Force Received Element name Rate: x.x>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Forces the unit to receive elemental damage at x multiplier.
 * - Replace 'id' with the ID of the element.
 * - For 'name' notetag variant, replace 'name' with the element's name.
 *   Remove any \I[x] in the 'name' replacement.
 * - Insert multiples of this notetag to allow unit to assign more elements.
 *
 * ---
 *
 * <Received Element id Plus: +x%>
 * <Received Element id Plus: +x.x>
 *
 * <Received Element name Plus: +x%>
 * <Received Element name Plus: +x.x>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Alters the received elemental damage additively before applying rates and
 *   flat bonuses.
 * - Replace 'id' with the ID of the element.
 * - For 'name' notetag variant, replace 'name' with the element's name.
 *   Remove any \I[x] in the 'name' replacement.
 * - Insert multiples of this notetag to allow unit to assign more elements.
 * - Formula works as follows: (base + plus) * rate + flat
 * - Formula may vary if changed up in the Plugin Parameters.
 * - This does not add on flat bonus damages after calculating elemental rates.
 *   This merely adds onto it at the end after applying rates if the formula
 *   from above is unchanged.
 *
 * ---
 *
 * <Received Element id Rate: x%>
 * <Received Element id Rate: x.x>
 *
 * <Received Element name Rate: x%>
 * <Received Element name Rate: x.x>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Alters the received elemental damage multiplicatively after applying plus
 *   and before applying flat bonuses.
 * - Replace 'id' with the ID of the element.
 * - For 'name' notetag variant, replace 'name' with the element's name.
 *   Remove any \I[x] in the 'name' replacement.
 * - Insert multiples of this notetag to allow unit to assign more elements.
 * - Formula works as follows: (base + plus) * rate + flat
 * - Formula may vary if changed up in the Plugin Parameters.
 *
 * ---
 *
 * <Received Element id Flat: +x%>
 * <Received Element id Flat: +x.x>
 *
 * <Received Element name Flat: +x%>
 * <Received Element name Flat: +x.x>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Alters the received elemental damage additively after applying rates and
 *   plus bonuses.
 * - Replace 'id' with the ID of the element.
 * - For 'name' notetag variant, replace 'name' with the element's name.
 *   Remove any \I[x] in the 'name' replacement.
 * - Insert multiples of this notetag to allow unit to assign more elements.
 * - Formula works as follows: (base + plus) * rate + flat
 * - Formula may vary if changed up in the Plugin Parameters.
 * - This does not add on flat bonus damages after calculating elemental rates.
 *   This merely adds onto it at the end after applying rates if the formula
 *   from above is unchanged.
 *
 * ---
 *
 * <Dealt Element id Plus: +x%>
 * <Dealt Element id Plus: +x.x>
 *
 * <Dealt Element name Plus: +x%>
 * <Dealt Element name Plus: +x.x>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Alters the dealt elemental damage additively before applying rates and
 *   flat bonuses.
 * - Replace 'id' with the ID of the element.
 * - For 'name' notetag variant, replace 'name' with the element's name.
 *   Remove any \I[x] in the 'name' replacement.
 * - Insert multiples of this notetag to allow unit to assign more elements.
 * - Formula works as follows: (base + plus) * rate + flat
 * - Formula may vary if changed up in the Plugin Parameters.
 * - This does not add on flat bonus damages after calculating elemental rates.
 *   This merely adds onto it at the end after applying rates if the formula
 *   from above is unchanged.
 *
 * ---
 *
 * <Dealt Element id Rate: x%>
 * <Dealt Element id Rate: x.x>
 *
 * <Dealt Element name Rate: x%>
 * <Dealt Element name Rate: x.x>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Alters the dealt elemental damage multiplicatively after applying plus and
 *   before applying flat bonuses.
 * - Replace 'id' with the ID of the element.
 * - For 'name' notetag variant, replace 'name' with the element's name.
 *   Remove any \I[x] in the 'name' replacement.
 * - Insert multiples of this notetag to allow unit to assign more elements.
 * - Formula works as follows: (base + plus) * rate + flat
 * - Formula may vary if changed up in the Plugin Parameters.
 *
 * ---
 *
 * <Dealt Element id Flat: +x%>
 * <Dealt Element id Flat: +x.x>
 *
 * <Dealt Element name Flat: +x%>
 * <Dealt Element name Flat: +x.x>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Alters the dealt elemental damage additively after applying rates and
 *   plus bonuses.
 * - Replace 'id' with the ID of the element.
 * - For 'name' notetag variant, replace 'name' with the element's name.
 *   Remove any \I[x] in the 'name' replacement.
 * - Insert multiples of this notetag to allow unit to assign more elements.
 * - Formula works as follows: (base + plus) * rate + flat
 * - Formula may vary if changed up in the Plugin Parameters.
 * - This does not add on flat bonus damages after calculating elemental rates.
 *   This merely adds onto it at the end after applying rates if the formula
 *   from above is unchanged.
 *
 * ---
 *
 * <Element Absorb: x>
 * <Element Absorb: x,x,x>
 *
 * <Element Absorb: name>
 * <Element Absorb: name, name, name>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Gives the unit the ability to absorb damage from element.
 * - Replace 'x' with the ID of the element from Database > Types.
 * - For 'name' notetag variant, replace 'name' with the element's name.
 *   Remove any \I[x] in the 'name' replacement.
 * - Insert multiples of this notetag to allow unit to absorb more elements.
 * - Absorption is calculated after all other element rates have been made.
 *
 * ---
 *
 * <Element Reflect: x>
 * <Element Reflect: x,x,x>
 *
 * <Element Reflect: name>
 * <Element Reflect: name, name, name>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Gives the unit the ability to reflect damage from element.
 * - Replace 'x' with the ID of the element from Database > Types.
 * - For 'name' notetag variant, replace 'name' with the element's name.
 *   Remove any \I[x] in the 'name' replacement.
 * - Insert multiples of this notetag to allow unit to reflect more elements.
 * - Reflection occurs before any damage is calculated and dealt.
 * - Elemental Reflection will take priority over Magic Reflection.
 *
 * ---
 *
 * <Bypass Element Reflect>
 *
 * - Used for: Skill, Item Notetags
 * - Makes this skill/item unable to be reflected by Element Reflect effect.
 *
 * ---
 * 
 * <Element Reflect Rule: All>
 * - Used for: Skill, Item Notetags
 * - Makes this skill/item require all of the action's elements to be
 *   considered "reflected" in order for this action to be actually reflected.
 * - If this notetag is not used, refer to setting found in Plugin Parameters.
 * 
 * ---
 * 
 * <Element Reflect Rule: All>
 * - Used for: Skill, Item Notetags
 * - Makes this skill/item require only one of action's element to be
 *   considered "reflected" in order for this action to be actually reflected.
 * - If this notetag is not used, refer to setting found in Plugin Parameters.
 * 
 * ---
 * 
 * <Element Pierce: x>
 * <Element Pierce: x,x,x>
 * 
 * <Element Pierce: name>
 * <Element Pierce: name, name, name>
 * 
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Gives the unit the ability to attack with the element and bypass any kinds
 *   of damage immunities, reflections, and absorptions.
 *   - Actions can still miss or be countered, however.
 * - If an action has multiple elements, as long as one element has pierce, the
 *   action will go through.
 * - Replace 'x' with the ID of the element from Database > Types.
 * - For 'name' notetag variant, replace 'name' with the element's name.
 *   Remove any \I[x] in the 'name' replacement.
 * - Insert multiples of this notetag to allow unit to reflect more elements.
 * 
 * ---
 *
 * <Element Pierce>
 *
 * - Used for: Skill, Item Notetags
 * - Makes this skill/item bypass any kinds of damage immunities, reflections,
 *   and absorptions.
 *   - Action can still miss or be countered, however.
 *
 * ---
 *
 * === JavaScript Notetags: Element-Related ===
 *
 * The following are notetags made for users with JavaScript knowledge to
 * determine dynamic element-related effects.
 *
 * ---
 *
 * <JS Force Received Element id Rate: code>
 * <JS Force Received Element name Rate: code>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Forces the unit to receive elemental damage at a code-determined rate.
 * - Replace 'id' with the ID of the element.
 * - For 'name' notetag variant, replace 'name' with the element's name.
 * - Replace 'code' with JavaScript code to determine the change.
 * - Insert multiples of this notetag to allow unit to assign more elements.
 *
 * ---
 *
 * <JS Received Element id Plus: code>
 * <JS Received Element name Plus: code>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Alters the received elemental damage additively before applying rates and
 *   flat bonuses.
 * - Replace 'id' with the ID of the element.
 * - For 'name' notetag variant, replace 'name' with the element's name.
 * - Replace 'code' with JavaScript code to determine the change.
 * - Insert multiples of this notetag to allow unit to assign more elements.
 *
 * ---
 *
 * <JS Received Element id Rate: code>
 * <JS Received Element name Rate: code>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Alters the received elemental damage additively after applying plus and
 *   before applying flat bonuses.
 * - Replace 'id' with the ID of the element.
 * - For 'name' notetag variant, replace 'name' with the element's name.
 * - Replace 'code' with JavaScript code to determine the change.
 * - Insert multiples of this notetag to allow unit to assign more elements.
 *
 * ---
 *
 * <JS Received Element id Flat: code>
 * <JS Received Element name Flat: code>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Alters the received elemental damage additively after applying rates and
 *   plus bonuses.
 * - Replace 'id' with the ID of the element.
 * - For 'name' notetag variant, replace 'name' with the element's name.
 * - Replace 'code' with JavaScript code to determine the change.
 * - Insert multiples of this notetag to allow unit to assign more elements.
 *
 * ---
 *
 * <JS Dealt Element id Plus: code>
 * <JS Dealt Element name Plus: code>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Alters the dealt elemental damage additively before applying rates and
 *   flat bonuses.
 * - Replace 'id' with the ID of the element.
 * - For 'name' notetag variant, replace 'name' with the element's name.
 * - Replace 'code' with JavaScript code to determine the change.
 * - Insert multiples of this notetag to allow unit to assign more elements.
 *
 * ---
 *
 * <JS Dealt Element id Rate: code>
 * <JS Dealt Element name Rate: code>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Alters the dealt elemental damage additively after applying plus and
 *   before applying flat bonuses.
 * - Replace 'id' with the ID of the element.
 * - For 'name' notetag variant, replace 'name' with the element's name.
 * - Replace 'code' with JavaScript code to determine the change.
 * - Insert multiples of this notetag to allow unit to assign more elements.
 *
 * ---
 *
 * <JS Dealt Element id Flat: code>
 * <JS Dealt Element name Flat: code>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Alters the dealt elemental damage additively after applying rates and
 *   plus bonuses.
 * - Replace 'id' with the ID of the element.
 * - For 'name' notetag variant, replace 'name' with the element's name.
 * - Replace 'code' with JavaScript code to determine the change.
 * - Insert multiples of this notetag to allow unit to assign more elements.
 *
 * ---
 *
 * === Trait Set Notetags ===
 *
 * Trait Sets are used to apply various properties to actor and enemy units as
 * a whole depending on what the trait set is. Use the following notetags to
 * determine how to properly assign the desired Trait Set.
 *
 * WARNING: Trait Sets only work if they are enabled in the Plugin Parameters:
 * ElementStatusCore => General Trait Set Settings => Enable Trait Sets?
 *
 * ---
 *
 * <Element: name>
 * <SubElement: name>
 * <Gender: name>
 * <Race: name>
 * <Nature: name>
 * <Alignment: name>
 * <Blessing: name>
 * <Curse: name>
 * <Zodiac: name>
 * <Variant: name>
 *
 * - Used for: Actor, Enemy Notetags
 * - Determines the specific Trait Set(s) for the actor or enemy unit.
 * - Replace 'name' with the name of an associated Trait Set type found in the
 *   Plugin Parameters.
 * - If any of these notetags are unused, the Trait Set will default to the one
 *   determined in the Plugin Parameters.
 *
 * Examples:
 *
 * <Element: Fire>
 * <SubElement: Thunder>
 * <Gender: Male>
 * <Nature: Jolly>
 * <Alignment: Chaotic Good>
 * <Zodiac: Aries>
 *
 * ---
 *
 * <Trait Sets>
 *  Element:    name
 *  SubElement: name
 *  Gender:     name
 *  Race:       name
 *  Nature:     name
 *  Alignment:  name
 *  Blessing:   name
 *  Curse:      name
 *  Zodiac:     name
 *  Variant:    name
 * </Trait Sets>
 *
 * - Used for: Actor, Enemy Notetags
 * - Determines the Trait Set(s) for the actor or enemy unit.
 * - Replace 'name' with the name of an associated Trait Set type found in the
 *   Plugin Parameters.
 * - You may remove the Trait Set types (ie. Blessing and Curse) that you don't
 *   want to assign anything to from the list.
 * - If any of these sets are unused, the Trait Set will default to the one
 *   determined in the Plugin Parameters.
 *
 * Example:
 *
 * <Trait Sets>
 *  Element:    Fire
 *  SubElement: Thunder
 *  Gender:     Male
 *  Nature:     Jolly
 *  Alignment:  Chaotic Good
 *  Zodiac:     Aries
 * </Trait Sets>
 *
 * ---
 *
 * <Random type>
 *  name: weight
 *  name: weight
 *  name: weight
 * </Random type>
 *
 * - Used for: Actor, Enemy Notetags
 * - Assigns a random Trait Set for this Trait Set 'type'.
 * - Replace 'type' with 'Element', 'SubElement', 'Gender', 'Race', 'Nature',
 *   'Alignment', 'Blessing', 'Curse', 'Zodiac', or 'Variant' depending on
 *   which you're trying to randomize.
 * - Replace 'name' with the name of an associated Trait Set type found in the
 *   Plugin Parameters.
 * - Replace 'weight' with a number value representing how often the 'name'
 *   would come up. The higher the weight, the more often. You may omit this
 *   and the colon(:) and just type in the 'name' instead.
 * - This would bypass the innate settings determined in the Plugin Parameters.
 *
 * Examples:
 *
 * <Random Gender>
 *  Male: 75
 *  Female: 25
 * </Random Gender>
 * 
 * <Random Variant>
 *  Mighty: 10
 *  Major: 20
 *  Greater: 60
 *  Normal: 200
 *  Lesser: 10
 *  Minor
 *  Puny
 * </Random Variant>
 *
 * ---
 *
 * <No Random Trait Sets>
 *
 * - Used for: Actor, Enemy Notetags
 * - Prevents random Trait Sets from being assigned to this actor/enemy unit.
 *
 * ---
 *
 * <Trait Set Name Format>
 *  text
 * </Trait Set Name Format>
 *
 * - Used for: Enemy Notetags
 * - Enemy names can be affected by the Trait Sets they have. Replace 'text'
 *   with the format you wish to see them have.
 * - Insert [Name] into 'text' to determine where the enemy's name goes.
 * - Insert [Letter] into 'text' to determine where the enemy's letter goes.
 * - Insert [Element] into 'text' to determine where the format text goes.
 * - Insert [SubElement] into 'text' to determine where the format text goes.
 * - Insert [Gender] into 'text' to determine where the format text goes.
 * - Insert [Race] into 'text' to determine where the format text goes.
 * - Insert [Nature] into 'text' to determine where the format text goes.
 * - Insert [Alignment] into 'text' to determine where the format text goes.
 * - Insert [Blessing] into 'text' to determine where the format text goes.
 * - Insert [Curse] into 'text' to determine where the format text goes.
 * - Insert [Zodiac] into 'text' to determine where the format text goes.
 * - Insert [Variant] into 'text' to determine where the format text goes.
 * 
 * Example:
 *
 * <Trait Set Name Format>
 *  [Alignment] [Nature] [Element] [Name][Gender] [Letter]
 * </Trait Set Name Format>
 *
 * ---
 *
 * <traitname Battler Name: filename>
 *
 * <traitname Battler Names>
 *  filename: weight
 *  filename: weight
 *  filename: weight
 * </traitname Battler Names>
 *
 * - Used for: Enemy Notetags
 * - Allows certain Trait Sets to cause battlers to have a unique appearance.
 * - Replace 'traitname' with the name of the Trait Set (ie. Male, Female).
 * - Replace 'filename' with the battler graphic to associate with that
 * - Replace 'weight' with a number value representing how often the 'name'
 *   would come up. The higher the weight, the more often. You may omit this
 *   and the colon(:) and just type in the 'name' instead.
 *   Trait Set.
 *
 * Examples:
 *
 * <Male Battler Name: Spider1>
 * <Female Battler Name: Spider2>
 *
 * <Male Battler Names>
 *  Rogue: 25
 *  Fighter: 10
 *  Warrior
 * </Male Battler Names>
 *
 * ---
 *
 * <traitname Battler Hue: x>
 *
 * <traitname Battler Hues>
 *  x: weight
 *  x: weight
 *  x: weight
 * </traitname Battler Hues>
 *
 * - Used for: Enemy Notetags
 * - Allows certain Trait Sets to cause battlers to use a different hue.
 * - Replace 'traitname' with the name of the Trait Set (ie. Male, Female).
 * - Replace 'x' with a number from 0 to 360 depicting the hue to become.
 * - Replace 'weight' with a number value representing how often the 'name'
 *   would come up. The higher the weight, the more often. You may omit this
 *   and the colon(:) and just type in the 'name' instead.
 *
 * Examples:
 *
 * <Male Battler Hue: 160>
 * <Female Battler Hue: 275>
 *
 * <Female Battler Hues>
 *  275: 10
 *  325: 5
 *  345
 * </Female Battler Hues>
 *
 * ---
 * 
 * <Equip Trait Requirement: name>
 * <Equip Trait Requirement: name, name, name>
 * 
 * - Used for: Weapon, Armor Notetags
 * - Makes this piece of equipment equippable by only actors with those traits.
 * - If there are multiple traits required, all of them have to be met.
 * - If multiple trait types share the same trait name, the listed name will
 *   count for all of them.
 * - Replace 'name' with the name of an associated Trait Set type found in the
 *   Plugin Parameters.
 * - Changing trait sets mid-game will remove unmatched traits.
 * - Usage Example: <Equip Trait Requirement: Female> makes the item only
 *   equippable by female actors as long as they are tagged as female.
 * 
 * ---
 * 
 * <Damage VS name Trait: x%>
 * 
 * - Used for: Actor, Class, Skill, Item, Weapon, Armor, Enemy, State Notetags
 * - If used on a skill or item, the action will perform 'x%' damage versus any
 *   targets with 'name' trait sets (any of them).
 * - If present in an actor, class, weapon, armor, enemy, or state's notebox,
 *   all damage types will be multiplied by 'x%' versus targets with 'name'
 *   trait sets (any of them).
 * - This notetag does not affect healing.
 * - Replace 'name' with the name of an associated Trait Set type found in the
 *   Plugin Parameters.
 * - Replace 'x' with a number representing a percentage value to augment
 *   damage by.
 * - Use multiple notetags to affect multiple trait types. If multiple effects
 *   manage to stack, they will stack multiplicatively.
 * 
 * ---
 * 
 * <Healing VS name Trait: x%>
 * 
 * - Used for: Actor, Class, Skill, Item, Weapon, Armor, Enemy, State Notetags
 * - If used on a skill or item, the action will perform 'x%' heals versus any
 *   targets with 'name' trait sets (any of them).
 * - If present in an actor, class, weapon, armor, enemy, or state's notebox,
 *   all heal types will be multiplied by 'x%' versus targets with 'name'
 *   trait sets (any of them).
 * - This notetag does not affect damage.
 * - Replace 'name' with the name of an associated Trait Set type found in the
 *   Plugin Parameters.
 * - Replace 'x' with a number representing a percentage value to augment
 *   heals by.
 * - Use multiple notetags to affect multiple trait types. If multiple effects
 *   manage to stack, they will stack multiplicatively.
 * 
 * ---
 * 
 * <Accuracy VS name Trait: x%>
 * <Accuracy VS name Trait: +x%>
 * <Accuracy VS name Trait: -x%>
 * 
 * - Used for: Actor, Class, Skill, Item, Weapon, Armor, Enemy, State Notetags
 * - If used on a skill or item, the action will have 'x%', '+x%', or '-x%'
 *   accuracy against any targets with 'name' trait sets (any of them).
 * - If present in an actor, class, weapon, armor, enemy, or state's notebox,
 *   all actions will have 'x%', '+x%', or '-x%' accuracy against any targets
 *   with 'name' trait sets (any of them).
 * - Replace 'name' with the name of an associated Trait Set type found in the
 *   Plugin Parameters.
 * - Replace 'x' respectively for percentile or additive/subtractive values.
 *   - 'x%' means an action with an accuracy rate of 20% will be (20% * x%).
 *   - '+x%' means an action with an accuracy rate of 20% will be (20% + x%).
 *   - '-x%' means an action with an accuracy rate of 20% will be (20% - x%).
 * - Multiple 'x%' notetags will stack multiplicatively.
 * - Multiple '+x' and '-x' notetags will stack additively.
 * 
 * ---
 * 
 * <Critical VS name Trait: x%>
 * <Critical VS name Trait: +x%>
 * <Critical VS name Trait: -x%>
 * 
 * - Used for: Actor, Class, Skill, Item, Weapon, Armor, Enemy, State Notetags
 * - If used on a skill or item, the action will have 'x%', '+x%', or '-x%'
 *   crtical rate against any targets with 'name' trait sets (any of them).
 * - If present in an actor, class, weapon, armor, enemy, or state's notebox,
 *   all actions will have 'x%', '+x%', or '-x%' crtical rate against any
 *   targets with 'name' trait sets (any of them).
 * - Replace 'name' with the name of an associated Trait Set type found in the
 *   Plugin Parameters.
 * - Replace 'x' respectively for percentile or additive/subtractive values.
 *   - 'x%' means an action with a critical rate of 20% will be (20% * x%).
 *   - '+x%' means an action with a critical rate of 20% will be (20% + x%).
 *   - '-x%' means an action with a critical rate of 20% will be (20% - x%).
 * - Multiple 'x%' notetags will stack multiplicatively.
 * - Multiple '+x' and '-x' notetags will stack additively.
 * 
 * ---
 * 
 * <Replace type Trait: name>
 * 
 * - Used for: Weapon, Armor, State Notetags
 * - Replaces the current 'type' Trait with 'name' Trait.
 * - This allows things like changing an ice element type to fire element.
 * - Replace 'type' with 'Element', 'SubElement', 'Gender', 'Race', 'Nature',
 *   'Alignment', 'Blessing', 'Curse', 'Zodiac', or 'Variant'
 * - Replace 'name' with the name of an associated Trait Set type found in the
 *   Plugin Parameters.
 * - To change multiple trait types for one item, insert multiple of this
 *   notetag to change multiple traits.
 * - Priority goes in order of high priority states to lower priority states,
 *   then equipment in their equipped order.
 * 
 * ---
 *
 * === Actor Biography Notetag ===
 *
 * The following notetag is used for the Status Menu if the updated Status Menu
 * Layout option has been enabled from the Plugin Parameters.
 *
 * ---
 *
 * <Biography>
 *  text
 *  text
 *  text
 * </Biography>
 *
 * - Used for: Actor Notetags
 * - Determines the actor's biography shown in the Status Menu.
 * - Replace 'text' with the text intended.
 * - Text Codes are allowed.
 * - The biography can be changed mid-game through Plugin Commands.
 * - If this notetag isn't used, then the actor's profile message is displayed
 *   as the biography.
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
 * === Actor Plugin Commands ===
 * 
 * ---
 *
 * Actor: Change Biography (Group)
 * Actor: Change Biography (Range)
 * Actor: Change Biography (JS)
 * - Changes the biography of the selected actor(s).
 * - Each version has a different means of selecting Actor ID's.
 * 
 *   Step 1: Target ID
 *   - Select which Actor ID(s) to affect.
 *
 *   Step 2: Biography
 *   - Change the biography for target actor(s) to this.
 *   - Text codes allowed. 
 *   - %1 - Actor's name.
 *
 * ---
 *
 * Actor: Change Trait Sets (Group)
 * Actor: Change Trait Sets (Range)
 * Actor: Change Trait Sets (JS)
 * - Changes the Trait Set(s) of the selected actor(s).
 * - Each version has a different means of selecting Actor ID's.
 *
 *   Step 1: Target ID
 *   - Select which Actor ID(s) to affect.
 *
 *   Step 2: Change Trait Set
 *   - Element
 *   - SubElement
 *   - Gender
 *   - Race
 *   - Nature
 *   - Alignment
 *   - Blessing
 *   - Curse
 *   - Zodiac
 *   - Variant
 *     - Change to the name of the Trait Set to switch actor(s) to.
 *     - "Unchanged" to leave alone.
 *     - "Random" to randomize.
 *       - Random will use the random pool dictated by the Plugin Parameters
 *         and the Trait Set weights determined there as well.
 *
 * ---
 * 
 * === Enemy Plugin Commands ===
 * 
 * ---
 *
 * Enemy: Change Trait Sets (Group)
 * Enemy: Change Trait Sets (Range)
 * Enemy: Change Trait Sets (JS)
 * - Changes the Trait Set(s) of the selected enemy(ies).
 * - Each version has a different means of selecting Enemy Indexes.
 *
 *   Step 1: Target ID
 *   - Select which Enemy Index(es) to affect.
 *
 *   Step 2: Change Trait Set
 *   - Element
 *   - SubElement
 *   - Gender
 *   - Race
 *   - Nature
 *   - Alignment
 *   - Blessing
 *   - Curse
 *   - Zodiac
 *   - Variant
 *     - Change to the name of the Trait Set to switch target(s) to.
 *     - "Unchanged" to leave alone.
 *     - "Random" to randomize.
 *       - Random will use the random pool dictated by the Plugin Parameters
 *         and the Trait Set weights determined there as well.
 *
 * ---
 *
 * ============================================================================
 * Script Calls
 * ============================================================================
 *
 * The following are Script Calls that can be used with this plugin. These are
 * made for JavaScript proficient users. We are not responsible if you use them
 * incorrectly or for unintended usage.
 *
 * ---
 * 
 * === Trait Set-Related Script Calls ===
 * 
 * ---
 *
 * battler.hasTraitSet(typeName)
 * 
 * - Returns a 'true' or 'false' value if the battler has a specific trait set.
 * - This will check all 10 trait set categories (elements, subelements,
 *   gender, race, nature, alignment, blessing, curse, zodiac, variant) and if
 *   any of them match, this will return 'true'. If not, returns 'false'.
 * - 'battler' references a Game_Actor or Game_Enemy.
 * - Replace 'typeName' with a string representing the trait set key name
 *   (ie. 'male' or 'female' or 'goblin' or 'human').
 * 
 * Examples:
 * 
 *   $gameActors.actor(1).hasTraitSet('male')
 *   $gameParty.leader().hasTraitSet('female')
 *   $gameTroop.members()[0].hasTraitSet('goblin')
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Element Rulings
 * ============================================================================
 *
 * These Plugin Parameters control the rulings for Element-related mechanics.
 * These play an important part in determine what to do when multiple elements
 * are present, how to calculate the elemental rates, and 
 *
 * ---
 *
 * Rulings
 * 
 *   Multi-Element Ruling:
 *   - Ruling on how to calculate element rate when there are  multiple
 *     elements used for damage calculation.
 *     - Maximum (largest rate of all elements)
 *     - Minimum (smallest rate of all elements)
 *     - Multiplicative (product of all elements used)
 *     - Additive (sum of all elements used)
 *     - Average (of all the elements used)
 * 
 *   Reflect-Element Ruling:
 *   - Ruling on how element reflect is handled for multi-elements.
 *     - All (All elements must be Reflected)
 *     - Any (Only one element must be Reflected)
 * 
 *   JS: Maximum Rate:
 *   - Determine how maximum element rate is calculated.
 * 
 *   JS: Minimum Rate:
 *   - Determine how minimum element rate is calculated.
 * 
 *   JS: Multiply Rate:
 *   - Determine how a multiplied element rate is calculated.
 * 
 *   JS: Additive Rate:
 *   - Determine how an additive element rate is calculated.
 * 
 *   JS: Average Rate:
 *   - Determine how an average element rate is calculated.
 *
 * ---
 *
 * Formulas
 * 
 *   JS: Received Rate:
 *   - Determine how the element rate for the receiving target is calculated.
 * 
 *   JS: Finalize Rate:
 *   - Determine how the finalized element rate before damage is calculated.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Status Menu Settings
 * ============================================================================
 *
 * The Status Menu Settings determine how the Status Menu appears and the
 * various objects that exist within it. The option to update it to a more
 * updated menu also exists, too.
 *
 * ---
 *
 * General
 * 
 *   Use Updated Layout:
 *   - Use the Updated Status Menu Layout provided by this plugin?
 *   - This will override the Core Engine windows settings.
 * 
 *   Layout Style:
 *   - If using an updated layout, how do you want to style the
 *     menu scene layout?
 *     - Upper Help, Top Category
 *     - Upper Help, Bottom Category
 *     - Lower Help, Top Category
 *     - Lower Help, Bottom Category
 * 
 *   Trait Set Font Size:
 *   - The font size used for Trait Set Descriptions.
 * 
 *   Show Back Rectangles?:
 *   - Show back rectangles of darker colors to display information better?
 * 
 *     Back Rectangle Color:
 *     - Use #rrggbb for custom colors or regular numbers for text colors
 *       from the Window Skin.
 *
 * ---
 *
 * Category Window
 * 
 *   Style:
 *   - How do you wish to draw commands in the Category Window?
 *   - Text Only: Display only the text.
 *   - Icon Only: Display only the icon.
 *   - Icon + Text: Display the icon first, then the text.
 *   - Auto: Determine which is better to use based on the size of the cell.
 * 
 *   Text Align:
 *   - Text alignment for the Category Window.
 *
 * ---
 *
 * Displayed Parameters
 * 
 *   Column 1:
 *   Column 2:
 *   Column 3:
 *   - A list of the parameters that will be displayed in column 1.
 *   - Basic Parameters (ie. MaxHP, ATK, LUK)
 *   - X Parameters (ie. HIT, EVA, CRI)
 *   - S Parameters (ie. PDR, MDR, EXR)
 *
 * ---
 *
 * Elements
 * 
 *   Excluded Elements:
 *   - These element ID's are excluded from the Status Menu list.
 * 
 *   IDs: Column 1:
 *   IDs: Column 2:
 *   - The list of element ID's to show in column 1/2.
 *   - If neither column has ID's, list all elements.
 *   - If you have a lot of elements and a single column does not have enough
 *     room to display them all, use these Plugin Parameters to split them up
 *     into two columns.
 *   - This can also be used for those who wish to separate their elements
 *     between physical and magical elements, major and minor, etc.
 *
 * ---
 *
 * Vocabulary
 * 
 *   Biography:
 *   - Vocabulary for 'Biography'.
 * 
 *   Damage: Absorb:
 *   - Vocabulary for 'Damage: Absorb'.
 * 
 *   Damage: Received:
 *   - Vocabulary for 'Damage: Received'.
 * 
 *   Damage: Dealt:
 *   - Vocabulary for 'Damage: Dealt'.
 * 
 *   Skill Types:
 *   - Vocabulary for 'Skill Types'.
 * 
 *   Weapon Types:
 *   - Vocabulary for 'Weapon Types'.
 * 
 *   Armor Types:
 *   - Vocabulary for 'Armor Types'.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Status Menu Categories
 * ============================================================================
 *
 * These Plugin Parameters allow you, the game dev, to add new categories to
 * the Status Menu as you please, and change up how the information is found
 * and displayed within the Status Menu. This will only apply if the Updated
 * Status Menu Layout is enabled.
 *
 * ---
 *
 * Category
 * 
 *   Symbol:
 *   - Symbol used for this category.
 * 
 *   Icon:
 *   - Icon used for this category.
 *   - Use 0 for no icon.
 * 
 *   Text:
 *   - Text name used for this category.
 * 
 *   JS: Draw Data:
 *   - Code used to determine what appears in the data window.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: General Trait Set Settings
 * ============================================================================
 *
 * Trait Sets are new properties added to RPG Maker MZ through this plugin.
 * They're used to streamline the process of applying traits to actors and
 * enemies through the database.
 *
 * Instead of having to manually adjust the elemental rate of each enemy,
 * you can now assign them to a Trait Set (through the Plugin Parameters) and
 * then assign that Trait Set to an enemy or batch of enemies instead. This
 * means that all enemies with <Element: Fire> would be weak and resistance to
 * the same elements determined by the Elemental Fire Trait Set.
 *
 * These Plugin Parameters adjust how Trait Sets are handled on a general scale
 * within your game.
 *
 * ---
 *
 * General
 * 
 *   Enable Trait Sets?:
 *   - Enable Trait Sets? This must be enabled for Trait Sets to have any kind
 *     of effect on battlers.
 * 
 *   Enemy Name Format:
 *   - Enemy name format on how Trait Sets affect how enemy names appear.
 *   - Choose from the list or customize it.
 *     - [name] [letter]
 *     - [element] [name] [letter]
 *     - [element] [subelement] [name] [letter]
 *     - [name][gender] [letter]
 *     - [race] [name][gender] [letter]
 *     - [alignment] [name][gender] [letter]
 *     - [blessing] [name][gender] [letter]
 *     - [curse] [name][gender] [letter]
 *     - [name][gender]([zodiac]) [letter]
 *     - [variant] [name][gender] [letter]
 *     - [variant] [nature] [name][gender] [letter]
 *     - [variant] [nature] [element] [name][gender] [letter]
 *     - [alignment] [variant] [nature] [element] [name][gender] [letter]
 *     - ...and more...
 *
 * ---
 *
 * Trait Columns
 *
 *   Column 1 Traits:
 *   Column 2 Traits:
 *   - List of the traits that appear in this column.
 *   - Used by default in the Properties category.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Trait Set Types
 * ============================================================================
 *
 * Trait Sets are new properties added to RPG Maker MZ through this plugin.
 * They're used to streamline the process of applying traits to actors and
 * enemies through the database.
 *
 * Instead of having to manually adjust the elemental rate of each enemy,
 * you can now assign them to a Trait Set (through the Plugin Parameters) and
 * then assign that Trait Set to an enemy or batch of enemies instead. This
 * means that all enemies with <Element: Fire> would be weak and resistance to
 * the same elements determined by the Elemental Fire Trait Set.
 *
 * There are 10 different types of Trait Set Types out there that you can
 * assign to actors and enemies and they all work the same way, just under
 * different categories.
 *
 * ---
 *
 * Element
 * SubElement
 * Gender
 * Race
 * Nature
 * Alignment
 * Blessing
 * Curse
 * Zodiac
 * Variant
 * 
 *   Name:
 *   - Name of this Trait Set. Also used as a reference key
 * 
 *   Display Text:
 *   - How the Trait Set is displayed in game when selected.
 *   - Text codes are allowed.
 * 
 *   Help Description:
 *   - Help description for this Trait Set if required.
 * 
 *   Format Text:
 *   - The text that's added onto an enemy's name if this Trait Set is used.
 * 
 *   Valid for Random?:
 *   - Is this Trait Set valid for random selection?
 * 
 *   Random Weight:
 *   - Default weight of this Trait Set if valid for random.
 * 
 *   Traits:
 * 
 *   Element Rates:
 *   - The elemental damage rates received for this Trait Set.
 *   - The modifiers are multiplicative.
 * 
 *   Basic Parameters:
 *   - The basic parameter rates altered by this Trait set.
 *   - The modifiers are multiplicative.
 * 
 *   X Parameters:
 *   - The X parameter rates altered by this Trait set.
 *   - The modifiers are additive.
 * 
 *   S Parameters:
 *   - The S parameter rates altered by this Trait set.
 *   - The modifiers are multiplicative.
 * 
 *   Passive States:
 *   - Passive states that are applied to this Trait Set.
 *   - Requires VisuMZ_1_SkillsStatesCore.
 *   - Refer to VisuMZ_1_SkillsStatesCore's documentation for more details.
 * 
 *   Equipment:
 * 
 *   Weapon Types:
 *   - Additional weapon types usable by this Trait Set.
 * 
 *   Armor Types:
 *   - Additional armor types usable by this Trait Set.
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
 * Version 1.30: December 15, 2025
 * * Bug Fixes!
 * ** Fixed an incompatibility with TPB and Skills & States Core's Miasma
 *    effects, causing some parameters to appear and cache at 0. Fix made by
 *    Arisu.
 * 
 * Version 1.29: November 13, 2025
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New notetag added by Arisu:
 * *** <Replace type Trait: name>
 * **** Replaces the current 'type' Trait with 'name' Trait.
 * **** This allows things like changing an ice element type to fire element.
 * 
 * Version 1.28: February 20, 2025
 * * Compatibility Update!
 * ** Updated for RPG Maker MZ Core Scripts 1.9.0!
 * *** Better compatibility with different icon sizes.
 * * Documentation Update!
 * ** Help file updated to add extra note to "Status Menu Settings"
 * *** Plugin Parameters > Status Menu Settings > Elements > IDs: Column 1/2
 * **** If you have a lot of elements and a single column does not have enough
 *      room to display them all, use these Plugin Parameters to split them up
 *      into two columns.
 * **** This can also be used for those who wish to separate their elements
 *      between physical and magical elements, major and minor, etc.
 * 
 * Version 1.27: January 16, 2025
 * * Bug Fixes!
 * ** Fixed an issue where certain icons were not aligning properly at
 *    different line height settings. Fix made by Olivia.
 * 
 * Version 1.26: September 19, 2024
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Plugin Parameter added by Olivia:
 * *** Parameters > Element Rulings > Reflect-Element Ruling
 * **** Ruling on how element reflect is handled for multi-elements.
 * ***** All (All elements must be Reflected)
 * ***** Any (Only one element must be Reflected)
 * ** New Notetag added by Olivia:
 * *** <Element Reflect Rule: All>
 * **** Makes this skill/item require all of the action's elements to be
 *      considered "reflected" in order for this action to be actually
 *      reflected.
 * *** <Element Reflect Rule: All>
 * **** Makes this skill/item require only one of action's element to be
 *      considered "reflected" in order for this action to be actually
 *      reflected.
 * 
 * Version 1.25: July 18, 2024
 * * Optimization Update!
 * ** Plugin should run more optimized.
 * 
 * Version 1.24: May 16, 2024
 * * Bug Fixes!
 * ** Fixed a bug where if enemies transformed, their trait sets did not.
 *    Fix made by Irina.
 * 
 * Version 1.23: November 16, 2023
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New notetags added by Arisu:
 * *** <Damage vs name Trait: x%>
 * *** <Healing vs name Trait: x%>
 * *** <Accuracy VS name Trait: x%>
 * *** <Critical VS name Trait: x%>
 * **** New notetags that enhance actions and trait objects to augment damage,
 *      healing, accuracy, and critical hit rates against targets with specific
 *      trait sets.
 * ** New script calls added by Arisu:
 * *** battler.hasTraitSet(typeName)
 * **** This will check all 10 trait set categories (elements, subelements,
 *      gender, race, nature, alignment, blessing, curse, zodiac, variant) and
 *      if any of them match, this will return 'true'. If not, returns 'false'.
 * 
 * Version 1.22: May 18, 2023
 * * Bug Fixes!
 * ** Fixed a bug that prevented "max" element rate rulings to disable element
 *    absorption. Fix made by Arisu.
 * 
 * Version 1.21: March 16, 2023
 * * Compatibility Update!
 * ** Added compatibility functionality for future plugins.
 * 
 * Version 1.20: February 16, 2023
 * * Compatibility Update!
 * ** Added compatibility functionality for future plugins.
 * 
 * Version 1.19: January 20, 2023
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Notetags added by Olivia and sponsored by Anon:
 * ** Trait Object Notetag: <Element Pierce: x,x,x>
 * *** Gives the unit the ability to attack with the element and bypass any
 *     kinds of damage immunities, reflections, and absorptions. Actions can
 *     still miss or be countered, however.
 * ** Action Object Notetag: <Element Pierce>
 * *** Makes this skill/item bypass any kinds of damage immunities,
 *     reflections, and absorptions. Action can still miss or be countered.
 * 
 * Version 1.18: August 18, 2022
 * * Feature Update!
 * ** When enemy traits are changed, their visuals will reflect the change.
 *    Update made by Arisu.
 * 
 * Version 1.17: April 28, 2022
 * * Bug Fixes!
 * ** Fixed a problem with certain trait affinities ignoring zero values.
 *    Fix made by Olivia.
 * 
 * Version 1.16: October 14, 2021
 * * Compatibility Update!
 * ** Those using the updated layout of the Status Menu will now have the
 *    windows inherit the background type of the previous layout's Status
 *    Window Background Type from the Core Engine settings. Update by Irina.
 * 
 * Version 1.15: July 23, 2021
 * * Bug Fixes!
 * ** Fixed trait blessing calculations for X Parameters to make more sense and
 *    not snuff out if the base value is 0%.
 *    Fix made by Arisu.
 * 
 * Version 1.14: May 28, 2021
 * * Bug Fixes!
 * ** Added fail safe to prevent passive state melding from traits to crash the
 *    game when cache fails to collect data. Fix by Irina.
 * 
 * Version 1.13: May 21, 2021
 * * Documentation Update
 * ** Added for Trait "Passive States" section:
 * *** Refer to VisuMZ_1_SkillsStatesCore's documentation for more details.
 * 
 * Version 1.12: April 30, 2021
 * * Bug Fixes!
 * ** When changing traits to a random value, load up any passive states and
 *    other effects that may have changed. Fix made by Arisu.
 * 
 * Version 1.11: February 26, 2021
 * * Optimization Update!
 * ** Plugin should run more optimized.
 * 
 * Version 1.10: January 29, 2021
 * * Bug Fixes!
 * ** <Multi-Element: x> notetags should now work properly. Fix made by Olivia.
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New notetag added by Irina:
 * *** <Equip Trait Requirement: name>
 * **** Makes this piece of equipment equippable by only actors with those
 *      traits. If there are multiple traits required, all of them have to be
 *      met. If multiple trait types share the same trait name, the listed name
 *      will count for all of them.
 * **** Usage Example: <Equip Trait Requirement: Female> makes the item only
 *      equippable by female actors as long as they are tagged as female.
 * ** New Plugin Parameters added by Irina and sponsored by AndyL.
 * *** Status Menu Settings > Elements > IDs: Column 1 added
 * *** Status Menu Settings > Elements > IDs: Column 2 added
 * **** The list of element ID's to show in column 1/2.
 * **** If neither column has ID's, list all elements.
 * ***** If you do not update the drawn JS found in the Status Menu Categories
 *       Plugin Parameters, these new settings won't do anything.
 * * Feature Update!
 * ** Plugin Parameter updates made by Irina and sponsored by AndyL.
 * *** Status Menu Categories > Parameters updated
 * **** Default draw options now have a slightly thicker padding to make the
 *      parameter values easier to read.
 * *** Status Menu Categories > Elements updated
 * **** Default draw options now factor in multiple columns as applied by the
 *      new plugin parameters above.
 * *** Status Menu Categories > Access updated
 * **** Skill Types, Weapon Types, and Armor Types are now centered in the
 *      various data columns to allow for better reading.
 * ** Default settings have been added to the Plugin Parameters. If you want to
 *    acquire these settings for an already-existing project, do either of the
 *    following:
 * *** Delete the existing VisuMZ_1_ElementStatusCore.js in the Plugin Manager
 *     list and install the newest version.
 * *** Or create a new project, install VisuMZ_1_ElementStatusCore.js there,
 *     then copy over the "Status Menu Categories" parameters found in the
 *     Plugin Parameters to your current project.
 *
 * Version 1.09: January 8, 2021
 * * Bug Fixes!
 * ** Default "JS: Draw Data" code for Plugin Parameters > Status Menu
 *    Categories > Elements has been updated to account for Trait Type
 *    visibility for both Element and Sub-Element. This won't update normally
 *    as it is a part of the Plugin Parameters. You will need to either delete
 *    the reinstall the plugin into the Plugin Manager list or copy and paste
 *    the Status Menu Categories plugin parameters from a fresh install. Fix
 *    made by Irina.
 * 
 * Version 1.08: November 29, 2020
 * * Bug Fixes!
 * ** Trait Set bonuses for X Parameters and S Parameters no longer increase
 *    exponentially with each other. Fix made by Arisu.
 * 
 * Version 1.07: November 8, 2020
 * * Compatibility Update!
 * ** Plugins should be more compatible with one another.
 *
 * Version 1.06: October 18, 2020
 * * Compatibility Update!
 * ** Plugins should be more compatible with one another.
 * * Documentation Update
 * ** "Use Updated Layout" plugin parameters now have the added clause:
 *    "This will override the Core Engine windows settings." to reduce
 *    confusion. Added by Yanfly.
 *
 * Version 1.05: October 4, 2020
 * * Bug Fixes!
 * ** Main Menu Portraits are now forced to pre-load prior to entering the
 *    Status Menu scene to ensure images will properly appear.
 *    Fix made by Irina.
 * 
 * Version 1.04: September 20, 2020
 * * Bug Fixes!
 * ** The "Column 1 and 2 Traits" plugin parameters for "General Trait Set"
 *    should now work. You will need to readjust them again. Fix by Arisu.
 * ** The "Elements" Status Menu Categories tab has its "JS: Draw Data"
 *    updated to display the percentages properly for Dealt Damage bonuses.
 *    This won't update normally as it's a part of the plugin parameters. You
 *    would need to do either a fresh install, copy from the sample project,
 *    or change the code bit yourself. To change to code bit, look for this:
 *      let dealtText = '%1%'.format(dealt);
 *    and change it to:
 *      let dealtText = '%1%'.format(Math.round(dealt * 100));
 *    Fix made by Irina.
 * 
 * Version 1.03: September 6, 2020
 * * Documentation Update!
 * ** <Dealt Element id Flat: +x%> notetag gets a more indepth explanation.
 * *** This does not add on flat bonus damages after calculating elemental
 *     rates. This merely adds onto it at the end after applying rates if
 *     the formula from above is unchanged.
 * * New Features!
 * ** New Plugin Parameters added in Status Menu Settings for disabling the
 *    back rectangles and/or changing their colors.
 * 
 * Version 1.02: August 30, 2020
 * * Bug Fixes!
 * ** Trait Set bonuses for X Parameters and S Parameters now show up properly
 *    in the Status Menu. Fix made by Yanfly.
 * ** Trait Set Sideview Battler Solo Weapon and Solo Motion notetags are now
 *    fixed to register properly with Battle Core. Fix made by Shaz.
 * 
 * Version 1.01: August 23, 2020
 * * Bug Fixes!
 * ** Passive states now work with Skills & States Core. Fix made by Yanfly.
 * ** Fixed S parameters not working. Fix made by Yanfly.
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
 * @command Separator_Begin
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActorChangeBiographyGroup
 * @text Actor: Change Biography (Group)
 * @desc Changes the biography of the selected actor(s).
 * Select from a group of actor ID's to change.
 *
 * @arg Step1:arraynum
 * @text Step 1: Target ID(s)
 * @type actor[]
 * @desc Select which Actor ID(s) to affect.
 * @default ["1"]
 *
 * @arg Biography:json
 * @text Step 2: Biography
 * @type note
 * @desc Change the biography for target actor(s) to this.
 * Text codes allowed. %1 - Actor's name.
 * @default "This is %1's new biography."
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActorChangeBiographyRange
 * @text Actor: Change Biography (Range)
 * @desc Changes the biography of the selected actor(s).
 * Select from a range of actor ID's to change.
 *
 * @arg Step1
 * @text Step 1: ID Range
 *
 * @arg Step1Start:num
 * @text Range Start
 * @parent Step1
 * @type actor
 * @desc Select which Actor ID to start from.
 * @default 1
 *
 * @arg Step1End:num
 * @text Range End
 * @parent Step1
 * @type actor
 * @desc Select which Actor ID to end at.
 * @default 4
 *
 * @arg Biography:json
 * @text Step 2: Biography
 * @type note
 * @desc Change the biography for target actor(s) to this.
 * Text codes allowed. %1 - Actor's name.
 * @default "This is %1's new biography."
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActorChangeBiographyJS
 * @text Actor: Change Biography (JS)
 * @desc Changes the biography of the selected actor(s).
 * Select from a group of actor ID's using JavaScript.
 *
 * @arg Step1:arrayeval
 * @text Step 1: Target ID(s)
 * @type string[]
 * @desc Enter which Actor ID(s) to affect.
 * You may use JavaScript code.
 * @default ["$gameVariables.value(1)"]
 *
 * @arg Biography:json
 * @text Step 2: Biography
 * @type note
 * @desc Change the biography for target actor(s) to this.
 * Text codes allowed. %1 - Actor's name.
 * @default "This is %1's new biography."
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActorChangeTraitSetsGroup
 * @text Actor: Change Trait Sets (Group)
 * @desc Changes the Trait Set(s) of the selected actor(s).
 * Select from a group of actor ID's to change.
 *
 * @arg Step1:arraynum
 * @text Step 1: Target ID(s)
 * @type actor[]
 * @desc Select which Actor ID(s) to affect.
 * @default ["1"]
 *
 * @arg Step2
 * @text Step 2: Change Trait Set
 *
 * @arg Element:str
 * @text - Element
 * @parent Step2
 * @desc Change to the name of the Trait Set to switch actor(s) to.
 * "Unchanged" to leave alone. "Random" to randomize.
 * @default Unchanged
 *
 * @arg SubElement:str
 * @text - SubElement
 * @parent Step2
 * @desc Change to the name of the Trait Set to switch actor(s) to.
 * "Unchanged" to leave alone. "Random" to randomize.
 * @default Unchanged
 *
 * @arg Gender:str
 * @text - Gender
 * @parent Step2
 * @desc Change to the name of the Trait Set to switch actor(s) to.
 * "Unchanged" to leave alone. "Random" to randomize.
 * @default Unchanged
 *
 * @arg Race:str
 * @text - Race
 * @parent Step2
 * @desc Change to the name of the Trait Set to switch actor(s) to.
 * "Unchanged" to leave alone. "Random" to randomize.
 * @default Unchanged
 *
 * @arg Nature:str
 * @text - Nature
 * @parent Step2
 * @desc Change to the name of the Trait Set to switch actor(s) to.
 * "Unchanged" to leave alone. "Random" to randomize.
 * @default Unchanged
 *
 * @arg Alignment:str
 * @text - Alignment
 * @parent Step2
 * @desc Change to the name of the Trait Set to switch actor(s) to.
 * "Unchanged" to leave alone. "Random" to randomize.
 * @default Unchanged
 *
 * @arg Blessing:str
 * @text - Blessing
 * @parent Step2
 * @desc Change to the name of the Trait Set to switch actor(s) to.
 * "Unchanged" to leave alone. "Random" to randomize.
 * @default Unchanged
 *
 * @arg Curse:str
 * @text - Curse
 * @parent Step2
 * @desc Change to the name of the Trait Set to switch actor(s) to.
 * "Unchanged" to leave alone. "Random" to randomize.
 * @default Unchanged
 *
 * @arg Zodiac:str
 * @text - Zodiac
 * @parent Step2
 * @desc Change to the name of the Trait Set to switch actor(s) to.
 * "Unchanged" to leave alone. "Random" to randomize.
 * @default Unchanged
 *
 * @arg Variant:str
 * @text - Variant
 * @parent Step2
 * @desc Change to the name of the Trait Set to switch actor(s) to.
 * "Unchanged" to leave alone. "Random" to randomize.
 * @default Unchanged
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActorChangeTraitSetsRange
 * @text Actor: Change Trait Sets (Range)
 * @desc Changes the Trait Set(s) of the selected actor(s).
 * Select from a range of actor ID's to change.
 *
 * @arg Step1
 * @text Step 1: ID Range
 *
 * @arg Step1Start:num
 * @text Range Start
 * @parent Step1
 * @type actor
 * @desc Select which Actor ID to start from.
 * @default 1
 *
 * @arg Step1End:num
 * @text Range End
 * @parent Step1
 * @type actor
 * @desc Select which Actor ID to end at.
 * @default 4
 *
 * @arg Step2
 * @text Step 2: Change Trait Set
 *
 * @arg Element:str
 * @text - Element
 * @parent Step2
 * @desc Change to the name of the Trait Set to switch actor(s) to.
 * "Unchanged" to leave alone. "Random" to randomize.
 * @default Unchanged
 *
 * @arg SubElement:str
 * @text - SubElement
 * @parent Step2
 * @desc Change to the name of the Trait Set to switch actor(s) to.
 * "Unchanged" to leave alone. "Random" to randomize.
 * @default Unchanged
 *
 * @arg Gender:str
 * @text - Gender
 * @parent Step2
 * @desc Change to the name of the Trait Set to switch actor(s) to.
 * "Unchanged" to leave alone. "Random" to randomize.
 * @default Unchanged
 *
 * @arg Race:str
 * @text - Race
 * @parent Step2
 * @desc Change to the name of the Trait Set to switch actor(s) to.
 * "Unchanged" to leave alone. "Random" to randomize.
 * @default Unchanged
 *
 * @arg Nature:str
 * @text - Nature
 * @parent Step2
 * @desc Change to the name of the Trait Set to switch actor(s) to.
 * "Unchanged" to leave alone. "Random" to randomize.
 * @default Unchanged
 *
 * @arg Alignment:str
 * @text - Alignment
 * @parent Step2
 * @desc Change to the name of the Trait Set to switch actor(s) to.
 * "Unchanged" to leave alone. "Random" to randomize.
 * @default Unchanged
 *
 * @arg Blessing:str
 * @text - Blessing
 * @parent Step2
 * @desc Change to the name of the Trait Set to switch actor(s) to.
 * "Unchanged" to leave alone. "Random" to randomize.
 * @default Unchanged
 *
 * @arg Curse:str
 * @text - Curse
 * @parent Step2
 * @desc Change to the name of the Trait Set to switch actor(s) to.
 * "Unchanged" to leave alone. "Random" to randomize.
 * @default Unchanged
 *
 * @arg Zodiac:str
 * @text - Zodiac
 * @parent Step2
 * @desc Change to the name of the Trait Set to switch actor(s) to.
 * "Unchanged" to leave alone. "Random" to randomize.
 * @default Unchanged
 *
 * @arg Variant:str
 * @text - Variant
 * @parent Step2
 * @desc Change to the name of the Trait Set to switch actor(s) to.
 * "Unchanged" to leave alone. "Random" to randomize.
 * @default Unchanged
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActorChangeTraitSetsJS
 * @text Actor: Change Trait Sets (JS)
 * @desc Changes the Trait Set(s) of the selected actor(s).
 * Select from a group of actor ID's using JavaScript.
 *
 * @arg Step1:arrayeval
 * @text Step 1: Target ID(s)
 * @type string[]
 * @desc Enter which Actor ID(s) to affect.
 * You may use JavaScript code.
 * @default ["$gameVariables.value(1)"]
 *
 * @arg Step2
 * @text Step 2: Change Trait Set
 *
 * @arg Element:str
 * @text - Element
 * @parent Step2
 * @desc Change to the name of the Trait Set to switch actor(s) to.
 * "Unchanged" to leave alone. "Random" to randomize.
 * @default Unchanged
 *
 * @arg SubElement:str
 * @text - SubElement
 * @parent Step2
 * @desc Change to the name of the Trait Set to switch actor(s) to.
 * "Unchanged" to leave alone. "Random" to randomize.
 * @default Unchanged
 *
 * @arg Gender:str
 * @text - Gender
 * @parent Step2
 * @desc Change to the name of the Trait Set to switch actor(s) to.
 * "Unchanged" to leave alone. "Random" to randomize.
 * @default Unchanged
 *
 * @arg Race:str
 * @text - Race
 * @parent Step2
 * @desc Change to the name of the Trait Set to switch actor(s) to.
 * "Unchanged" to leave alone. "Random" to randomize.
 * @default Unchanged
 *
 * @arg Nature:str
 * @text - Nature
 * @parent Step2
 * @desc Change to the name of the Trait Set to switch actor(s) to.
 * "Unchanged" to leave alone. "Random" to randomize.
 * @default Unchanged
 *
 * @arg Alignment:str
 * @text - Alignment
 * @parent Step2
 * @desc Change to the name of the Trait Set to switch actor(s) to.
 * "Unchanged" to leave alone. "Random" to randomize.
 * @default Unchanged
 *
 * @arg Blessing:str
 * @text - Blessing
 * @parent Step2
 * @desc Change to the name of the Trait Set to switch actor(s) to.
 * "Unchanged" to leave alone. "Random" to randomize.
 * @default Unchanged
 *
 * @arg Curse:str
 * @text - Curse
 * @parent Step2
 * @desc Change to the name of the Trait Set to switch actor(s) to.
 * "Unchanged" to leave alone. "Random" to randomize.
 * @default Unchanged
 *
 * @arg Zodiac:str
 * @text - Zodiac
 * @parent Step2
 * @desc Change to the name of the Trait Set to switch actor(s) to.
 * "Unchanged" to leave alone. "Random" to randomize.
 * @default Unchanged
 *
 * @arg Variant:str
 * @text - Variant
 * @parent Step2
 * @desc Change to the name of the Trait Set to switch actor(s) to.
 * "Unchanged" to leave alone. "Random" to randomize.
 * @default Unchanged
 *
 * @ --------------------------------------------------------------------------
 *
 * @command Separator_Enemy
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command EnemyChangeTraitSetsGroup
 * @text Enemy: Change Trait Sets (Group)
 * @desc Changes the Trait Set(s) of the selected enemy(ies).
 * Select from a group of enemy indexes to change.
 *
 * @arg Step1:arraynum
 * @text Step 1: Target ID(s)
 * @type number[]
 * @desc Select which Enemy Index(es) to affect.
 * @default ["1"]
 *
 * @arg Step2
 * @text Step 2: Change Trait Set
 *
 * @arg Element:str
 * @text - Element
 * @parent Step2
 * @desc Change to the name of Trait Set to switch target(s) to.
 * "Unchanged" to leave alone. "Random" to randomize.
 * @default Unchanged
 *
 * @arg SubElement:str
 * @text - SubElement
 * @parent Step2
 * @desc Change to the name of Trait Set to switch target(s) to.
 * "Unchanged" to leave alone. "Random" to randomize.
 * @default Unchanged
 *
 * @arg Gender:str
 * @text - Gender
 * @parent Step2
 * @desc Change to the name of Trait Set to switch target(s) to.
 * "Unchanged" to leave alone. "Random" to randomize.
 * @default Unchanged
 *
 * @arg Race:str
 * @text - Race
 * @parent Step2
 * @desc Change to the name of Trait Set to switch target(s) to.
 * "Unchanged" to leave alone. "Random" to randomize.
 * @default Unchanged
 *
 * @arg Nature:str
 * @text - Nature
 * @parent Step2
 * @desc Change to the name of Trait Set to switch target(s) to.
 * "Unchanged" to leave alone. "Random" to randomize.
 * @default Unchanged
 *
 * @arg Alignment:str
 * @text - Alignment
 * @parent Step2
 * @desc Change to the name of Trait Set to switch target(s) to.
 * "Unchanged" to leave alone. "Random" to randomize.
 * @default Unchanged
 *
 * @arg Blessing:str
 * @text - Blessing
 * @parent Step2
 * @desc Change to the name of Trait Set to switch target(s) to.
 * "Unchanged" to leave alone. "Random" to randomize.
 * @default Unchanged
 *
 * @arg Curse:str
 * @text - Curse
 * @parent Step2
 * @desc Change to the name of Trait Set to switch target(s) to.
 * "Unchanged" to leave alone. "Random" to randomize.
 * @default Unchanged
 *
 * @arg Zodiac:str
 * @text - Zodiac
 * @parent Step2
 * @desc Change to the name of Trait Set to switch target(s) to.
 * "Unchanged" to leave alone. "Random" to randomize.
 * @default Unchanged
 *
 * @arg Variant:str
 * @text - Variant
 * @parent Step2
 * @desc Change to the name of Trait Set to switch target(s) to.
 * "Unchanged" to leave alone. "Random" to randomize.
 * @default Unchanged
 *
 * @ --------------------------------------------------------------------------
 *
 * @command EnemyChangeTraitSetsRange
 * @text Enemy: Change Trait Sets (Range)
 * @desc Changes the Trait Set(s) of the selected enemy(ies).
 * Select from a range of enemy indexes to change.
 *
 * @arg Step1
 * @text Step 1: ID Range
 *
 * @arg Step1Start:num
 * @text Range Start
 * @parent Step1
 * @type number
 * @desc Select which Enemy Index to start from.
 * @default 0
 *
 * @arg Step1End:num
 * @text Range End
 * @parent Step1
 * @type number
 * @desc Select which Index to end at.
 * @default 7
 *
 * @arg Step2
 * @text Step 2: Change Trait Set
 *
 * @arg Element:str
 * @text - Element
 * @parent Step2
 * @desc Change to the name of Trait Set to switch target(s) to.
 * "Unchanged" to leave alone. "Random" to randomize.
 * @default Unchanged
 *
 * @arg SubElement:str
 * @text - SubElement
 * @parent Step2
 * @desc Change to the name of Trait Set to switch target(s) to.
 * "Unchanged" to leave alone. "Random" to randomize.
 * @default Unchanged
 *
 * @arg Gender:str
 * @text - Gender
 * @parent Step2
 * @desc Change to the name of Trait Set to switch target(s) to.
 * "Unchanged" to leave alone. "Random" to randomize.
 * @default Unchanged
 *
 * @arg Race:str
 * @text - Race
 * @parent Step2
 * @desc Change to the name of Trait Set to switch target(s) to.
 * "Unchanged" to leave alone. "Random" to randomize.
 * @default Unchanged
 *
 * @arg Nature:str
 * @text - Nature
 * @parent Step2
 * @desc Change to the name of Trait Set to switch target(s) to.
 * "Unchanged" to leave alone. "Random" to randomize.
 * @default Unchanged
 *
 * @arg Alignment:str
 * @text - Alignment
 * @parent Step2
 * @desc Change to the name of Trait Set to switch target(s) to.
 * "Unchanged" to leave alone. "Random" to randomize.
 * @default Unchanged
 *
 * @arg Blessing:str
 * @text - Blessing
 * @parent Step2
 * @desc Change to the name of Trait Set to switch target(s) to.
 * "Unchanged" to leave alone. "Random" to randomize.
 * @default Unchanged
 *
 * @arg Curse:str
 * @text - Curse
 * @parent Step2
 * @desc Change to the name of Trait Set to switch target(s) to.
 * "Unchanged" to leave alone. "Random" to randomize.
 * @default Unchanged
 *
 * @arg Zodiac:str
 * @text - Zodiac
 * @parent Step2
 * @desc Change to the name of Trait Set to switch target(s) to.
 * "Unchanged" to leave alone. "Random" to randomize.
 * @default Unchanged
 *
 * @arg Variant:str
 * @text - Variant
 * @parent Step2
 * @desc Change to the name of Trait Set to switch target(s) to.
 * "Unchanged" to leave alone. "Random" to randomize.
 * @default Unchanged
 *
 * @ --------------------------------------------------------------------------
 *
 * @command EnemyChangeTraitSetsJS
 * @text Enemy: Change Trait Sets (JS)
 * @desc Changes the Trait Set(s) of the selected enemy(ies).
 * Select from a group of enemy indexes using JavaScript.
 *
 * @arg Step1:arrayeval
 * @text Step 1: Target ID(s)
 * @type string[]
 * @desc Enter which Enemy Indexes to affect.
 * You may use JavaScript code.
 * @default ["$gameVariables.value(1)"]
 *
 * @arg Step2
 * @text Step 2: Change Trait Set
 *
 * @arg Element:str
 * @text - Element
 * @parent Step2
 * @desc Change to the name of Trait Set to switch target(s) to.
 * "Unchanged" to leave alone. "Random" to randomize.
 * @default Unchanged
 *
 * @arg SubElement:str
 * @text - SubElement
 * @parent Step2
 * @desc Change to the name of Trait Set to switch target(s) to.
 * "Unchanged" to leave alone. "Random" to randomize.
 * @default Unchanged
 *
 * @arg Gender:str
 * @text - Gender
 * @parent Step2
 * @desc Change to the name of Trait Set to switch target(s) to.
 * "Unchanged" to leave alone. "Random" to randomize.
 * @default Unchanged
 *
 * @arg Race:str
 * @text - Race
 * @parent Step2
 * @desc Change to the name of Trait Set to switch target(s) to.
 * "Unchanged" to leave alone. "Random" to randomize.
 * @default Unchanged
 *
 * @arg Nature:str
 * @text - Nature
 * @parent Step2
 * @desc Change to the name of Trait Set to switch target(s) to.
 * "Unchanged" to leave alone. "Random" to randomize.
 * @default Unchanged
 *
 * @arg Alignment:str
 * @text - Alignment
 * @parent Step2
 * @desc Change to the name of Trait Set to switch target(s) to.
 * "Unchanged" to leave alone. "Random" to randomize.
 * @default Unchanged
 *
 * @arg Blessing:str
 * @text - Blessing
 * @parent Step2
 * @desc Change to the name of Trait Set to switch target(s) to.
 * "Unchanged" to leave alone. "Random" to randomize.
 * @default Unchanged
 *
 * @arg Curse:str
 * @text - Curse
 * @parent Step2
 * @desc Change to the name of Trait Set to switch target(s) to.
 * "Unchanged" to leave alone. "Random" to randomize.
 * @default Unchanged
 *
 * @arg Zodiac:str
 * @text - Zodiac
 * @parent Step2
 * @desc Change to the name of Trait Set to switch target(s) to.
 * "Unchanged" to leave alone. "Random" to randomize.
 * @default Unchanged
 *
 * @arg Variant:str
 * @text - Variant
 * @parent Step2
 * @desc Change to the name of Trait Set to switch target(s) to.
 * "Unchanged" to leave alone. "Random" to randomize.
 * @default Unchanged
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
 * @param ElementStatusCore
 * @default Plugin Parameters
 *
 * @param ATTENTION
 * @default READ THE HELP FILE
 *
 * @param BreakSettings
 * @text --------------------------
 * @default ----------------------------------
 *
 * @param ElementRules:struct
 * @text Element Rulings
 * @type struct<ElementRules>
 * @desc The rulings for Element-related mechanics.
 * @default {"Rulings":"","MultiRule:str":"multiply","RuleMaxCalcJSa:func":"\"// Declare Constants\\nconst target = arguments[0];\\nconst elements = arguments[1];\\nconst action = this;\\n\\n// Determine Return Value\\nconst absorbed = action.isRecover() ? [] : target.getAbsorbedElements();\\nlet max = -1000;\\nfor (const elementId of elements) {\\n    const sign = absorbed.includes(elementId) ? -1 : 1;\\n    max = Math.max(max, target.elementRate(elementId) * sign);\\n}\\nreturn max;\"","RuleMinCalcJS:func":"\"// Declare Constants\\nconst target = arguments[0];\\nconst elements = arguments[1];\\nconst action = this;\\n\\n// Determine Return Value\\nconst absorbed = action.isRecover() ? [] : target.getAbsorbedElements();\\nlet min = 0;\\nfor (const elementId of elements) {\\n    const sign = absorbed.includes(elementId) ? -1 : 1;\\n    min = Math.min(min, target.elementRate(elementId) * sign);\\n}\\nreturn min;\"","RuleMultiplyCalcJS:func":"\"// Declare Constants\\nconst target = arguments[0];\\nconst elements = arguments[1];\\nconst action = this;\\n\\n// Determine Return Value\\nconst absorbed = action.isRecover() ? [] : target.getAbsorbedElements();\\nlet rate = 1;\\nlet sign = 1;\\nfor (const elementId of elements) {\\n    if (absorbed.includes(elementId)) sign = -1;\\n    rate *= target.elementRate(elementId);\\n}\\nreturn rate * sign;\"","RuleAdditiveCalcJS:func":"\"// Declare Constants\\nconst target = arguments[0];\\nconst elements = arguments[1];\\nconst action = this;\\n\\n// Determine Return Value\\nconst absorbed = action.isRecover() ? [] : target.getAbsorbedElements();\\nlet rate = 0;\\nfor (const elementId of elements) {\\n    const sign = absorbed.includes(elementId) ? -1 : 1;\\n    rate += target.elementRate(elementId) * sign;\\n}\\nreturn rate;\"","RuleAverageCalcJS:func":"\"// Declare Constants\\nconst target = arguments[0];\\nconst elements = arguments[1];\\nconst action = this;\\n\\n// Determine Return Value\\nconst rate = action.elementsRateSum(target, elements);\\nreturn rate / elements.length;\"","Formulas":"","ReceivedRateJS:func":"\"// Declare Constants\\nconst elementId = arguments[0];\\nconst target = this;\\nconst base = 1;\\nconst plus = target.getReceiveElementPlus(elementId);\\nconst rate = target.getReceiveElementRate(elementId);\\nconst flat = target.getReceiveElementFlat(elementId);\\n\\n// Determine Return Value\\nreturn Math.max(0, (base + plus) * rate + flat);\"","FinalizeRateJS:func":"\"// Declare Constants\\nconst target = arguments[0];\\nconst action = this;\\nconst elements = action.elements();\\nconst targetRate = action.calcTargetElementRate(target, elements);\\nconst sign = targetRate >= 0 ? 1 : -1;\\nconst base = Math.abs(targetRate);\\nconst plus = action.calcUserElementDamagePlus(target, elements);\\nconst rate = action.calcUserElementDamageRate(target, elements);\\nconst flat = action.calcUserElementDamageFlat(target, elements);\\n\\n// Determine Return Value\\nreturn sign * Math.max((base + plus) * rate + flat, 0);;\""}
 *
 * @param StatusMenu:struct
 * @text Status Menu Settings
 * @type struct<StatusMenu>
 * @desc The settings for the Status Menu Scene.
 * @default {"General":"","EnableLayout:eval":"true","LayoutStyle:str":"upper/top","TraitDescriptionFontSize:num":"18","DrawBackRect:eval":"true","BackRectColor:str":"19","Command":"","CmdStyle:str":"icon","CmdTextAlign:str":"center","Parameters":"","Col1:arraystr":"[\"MaxHP\",\"MaxMP\",\"ATK\",\"DEF\",\"MAT\",\"MDF\",\"AGI\",\"LUK\"]","Col2:arraystr":"[\"HIT\",\"EVA\",\"CRI\",\"CEV\",\"MEV\",\"MRF\",\"CNT\",\"HRG\",\"MRG\",\"TRG\"]","Col3:arraystr":"[\"TGR\",\"GRD\",\"REC\",\"PHA\",\"MCR\",\"TCR\",\"PDR\",\"MDR\",\"FDR\",\"EXR\"]","Elements":"","ExcludeElements:arraynum":"[]","ElementsCol1:arraynum":"[]","ElementsCol2:arraynum":"[]","Vocabulary":"","VocabBiography:str":"Biography","VocabDmgAbsorb:str":"Absorbs %1%","VocabDmgReceive:str":"Elemental Resistance","VocabDmgDealt:str":"Bonus Damage","VocabStype:str":"Skill Types","VocabWtype:str":"Weapon Types","VocabAtype:str":"Armor Types"}
 *
 * @param StatusMenuList:arraystruct
 * @text Status Menu Categories
 * @parent StatusMenu:struct
 * @type struct<StatusCategory>[]
 * @desc This is a list of categories that appear in the 
 * Status Menu Scene.
 * @default ["{\"Symbol:str\":\"general\",\"Icon:num\":\"84\",\"Text:str\":\"General\",\"DrawJS:func\":\"\\\"// Declare Constants\\\\nconst maxExp = '-------';\\\\nconst lineHeight = this.lineHeight();\\\\nconst gaugeLineHeight = this.gaugeLineHeight();\\\\nconst basicDataHeight = lineHeight * 6.5;\\\\nconst actor = this._actor;\\\\nconst padding = this.itemPadding();\\\\nconst halfWidth = this.innerWidth / 2;\\\\nlet rect = new Rectangle(0, 0, halfWidth, this.innerHeight);\\\\nlet x = 0;\\\\nlet y = 0;\\\\n\\\\n// Draw Actor Graphic\\\\nthis.drawActorGraphic(0, this.innerWidth / 2);\\\\n\\\\n// Declare Smaller Data Area\\\\nlet sx = rect.x;\\\\nlet sy = Math.max(rect.y, rect.y + (rect.height - basicDataHeight));\\\\nlet sw = rect.width;\\\\nlet sh = rect.y + rect.height - sy;\\\\n\\\\n// Draw Actor Name\\\\nthis.drawItemDarkRect(0, sy, sw, lineHeight, 2);\\\\nthis.drawText(actor.name(), sx, sy, sw, 'center');\\\\n\\\\n// Draw Actor Level\\\\nsx = rect.x + Math.round((rect.width - 128) / 2);\\\\nsy += lineHeight;\\\\nthis.drawItemDarkRect(0, sy, sw, lineHeight);\\\\nthis.drawActorLevel(actor, sx, sy);\\\\n\\\\n// Draw Actor Class\\\\nconst className = actor.currentClass().name;\\\\nsx = rect.x + Math.round((rect.width - this.textSizeEx(className).width) / 2);\\\\nsy += lineHeight;\\\\nthis.drawItemDarkRect(0, sy, sw, lineHeight);\\\\nthis.drawTextEx(className, sx, sy, sw);\\\\n\\\\n// Draw Actor Icons\\\\nsx = rect.x + Math.round((rect.width - 144) / 2);\\\\nsy += lineHeight;\\\\nthis.drawItemDarkRect(0, sy, sw, lineHeight);\\\\nthis.drawActorIcons(actor, sx, sy);\\\\n\\\\n// Draw Gauges\\\\nsx = rect.x + Math.round((rect.width - 128) / 2);\\\\nsy += lineHeight;\\\\nthis.drawItemDarkRect(0, sy, sw, this.innerHeight - sy);\\\\nthis.placeGauge(actor, \\\\\\\"hp\\\\\\\", sx, sy);\\\\nsy += gaugeLineHeight;\\\\nthis.placeGauge(actor, \\\\\\\"mp\\\\\\\", sx, sy);\\\\nsy += gaugeLineHeight;\\\\nif ($dataSystem.optDisplayTp) {\\\\n    this.placeGauge(actor, \\\\\\\"tp\\\\\\\", sx, sy);\\\\n}\\\\n\\\\n// Declare Second Half\\\\nrect = new Rectangle(halfWidth, 0, halfWidth, this.innerHeight);\\\\n\\\\n// Draw EXP\\\\nthis.changeTextColor(ColorManager.systemColor());\\\\nthis.drawItemDarkRect(rect.x, rect.y, rect.width, lineHeight, 2);\\\\nthis.drawText(TextManager.exp, rect.x, rect.y, rect.width, 'center');\\\\nconst expHeight = lineHeight * 5;\\\\nthis.drawItemDarkRect(rect.x, rect.y + lineHeight * 1, rect.width, lineHeight * 2);\\\\nthis.drawItemDarkRect(rect.x, rect.y + lineHeight * 3, rect.width, lineHeight * 2);\\\\nconst expTotal = TextManager.expTotal.format(TextManager.exp);\\\\nconst expNext = TextManager.expNext.format(TextManager.level);\\\\nthis.changeTextColor(ColorManager.systemColor());\\\\nthis.drawText(expTotal, rect.x + padding, rect.y + lineHeight * 1, rect.width - padding * 2);\\\\nthis.drawText(expNext, rect.x + padding, rect.y + lineHeight * 3, rect.width - padding * 2);\\\\nthis.resetTextColor();\\\\nconst expTotalValue = actor.currentExp();\\\\nconst expNextValue = actor.isMaxLevel() ? maxExp : actor.nextRequiredExp();\\\\nthis.drawText(expTotalValue, rect.x + padding, rect.y + lineHeight * 1, rect.width - padding * 2, 'right');\\\\nthis.drawText(expNextValue, rect.x + padding, rect.y + lineHeight * 3, rect.width - padding * 2, 'right');\\\\n\\\\n// Write Actor Biography\\\\ny = rect.y + expHeight;\\\\nthis.changeTextColor(ColorManager.systemColor());\\\\nthis.drawItemDarkRect(rect.x, y, rect.width, lineHeight, 2);\\\\nthis.drawText(TextManager.statusMenuBiography, rect.x, y, rect.width, 'center');\\\\nthis.resetTextColor();\\\\ny += lineHeight;\\\\nconst bioText = actor.getBiography();\\\\nthis.drawItemDarkRect(rect.x, y, rect.width, this.innerHeight - y);\\\\nthis.drawTextEx(bioText, rect.x + padding, y, rect.width - padding * 2);\\\"\"}","{\"Symbol:str\":\"parameters\",\"Icon:num\":\"87\",\"Text:str\":\"Parameters\",\"DrawJS:func\":\"\\\"// Declare Constants\\\\nconst lineHeight = this.lineHeight();\\\\nconst gaugeLineHeight = this.gaugeLineHeight();\\\\nconst basicDataHeight = this.basicDataHeight();\\\\nconst padding = this.itemPadding() * 2;\\\\nconst thirdWidth = Math.floor(this.innerWidth / 3);\\\\nlet x = 0;\\\\nlet y = 0;\\\\nlet paramWidth = 0;\\\\n\\\\n// Draw Actor Graphic\\\\nthis.drawActorGraphic(0, this.innerWidth / 2);\\\\n\\\\n// Declare Parameter Rect\\\\nlet rect = new Rectangle(0, 0, thirdWidth, this.innerHeight);\\\\n\\\\n// Declare Parameters\\\\nconst params1 = this.getParameterList(1);\\\\nconst params2 = this.getParameterList(2);\\\\nconst params3 = this.getParameterList(3);\\\\nconst maxLength = Math.max(params1.length, params2.length, params3.length);\\\\nconst nameWidth = rect.width - padding * 2 - this.textWidth('88888');\\\\nconst topY = Math.max((this.innerHeight - (maxLength * lineHeight)) / 2, 0);\\\\n\\\\n// Draw Parameters 1\\\\nx = rect.x + padding;\\\\ny = topY;\\\\nparamWidth = rect.width - (padding * 2);\\\\nif (y !== 0) this.drawItemDarkRect(rect.x, 0, rect.width, y);\\\\nfor (const paramId of params1) {\\\\n    this.drawItemDarkRect(rect.x, y, rect.width, lineHeight);\\\\n    this.drawParamName(paramId, x, y, nameWidth);\\\\n    this.drawParamValue(paramId, x, y, paramWidth);\\\\n    y += lineHeight;\\\\n}\\\\nthis.drawItemDarkRect(rect.x, y, rect.width, this.innerHeight - y);\\\\n\\\\n// Draw Parameters 2\\\\nrect.x += rect.width;\\\\nx = rect.x + padding;\\\\ny = topY;\\\\nparamWidth = rect.width - (padding * 2);\\\\nif (y !== 0) this.drawItemDarkRect(rect.x, 0, rect.width, y);\\\\nfor (const paramId of params2) {\\\\n    this.drawItemDarkRect(rect.x, y, rect.width, lineHeight);\\\\n    this.drawParamName(paramId, x, y, nameWidth);\\\\n    this.drawParamValue(paramId, x, y, paramWidth);\\\\n    y += lineHeight;\\\\n}\\\\nthis.drawItemDarkRect(rect.x, y, rect.width, this.innerHeight - y);\\\\n\\\\n// Draw Parameters 3\\\\nrect.x += rect.width;\\\\nrect.width = this.innerWidth - rect.x;\\\\nx = rect.x + padding;\\\\ny = topY;\\\\nparamWidth = rect.width - (padding * 2);\\\\nif (y !== 0) this.drawItemDarkRect(rect.x, 0, rect.width, y);\\\\nfor (const paramId of params3) {\\\\n    this.drawItemDarkRect(rect.x, y, rect.width, lineHeight);\\\\n    this.drawParamName(paramId, x, y, nameWidth);\\\\n    this.drawParamValue(paramId, x, y, paramWidth);\\\\n    y += lineHeight;\\\\n}\\\\nthis.drawItemDarkRect(rect.x, y, rect.width, this.innerHeight - y);\\\"\"}","{\"Symbol:str\":\"properties\",\"Icon:num\":\"83\",\"Text:str\":\"Properties\",\"DrawJS:func\":\"\\\"// Declare Constants\\\\nconst traitCol1 = Window_StatusData.traitCol1;\\\\nconst traitCol2 = Window_StatusData.traitCol2;\\\\nconst lineHeight = this.lineHeight();\\\\nconst actor = this._actor;\\\\nconst padding = this.itemPadding();\\\\nconst traitHeight = (this.innerHeight / Math.max(traitCol1.length, traitCol2.length)) - lineHeight;\\\\nconst width = this.innerWidth / 2;\\\\nlet x = 0;\\\\nlet y = 0;\\\\n\\\\n// Draw Actor Graphic\\\\nthis.drawActorGraphic(0, width);\\\\n\\\\n// Draw Trait Set 1\\\\nfor (const type of traitCol1) {\\\\n    const traitType = DataManager.traitSetType(type);\\\\n    const traitSet = actor.traitSet(type);\\\\n    this.drawItemDarkRect(0, y, width, lineHeight, 2);\\\\n    const labelText = '\\\\\\\\\\\\\\\\C[16]%1: \\\\\\\\\\\\\\\\C[0]%2'.format(traitType.Label, traitSet.Display);\\\\n    this.drawTextEx(labelText, padding, y, width - padding * 2);\\\\n    y += lineHeight;\\\\n    this.setDescriptionFontSizeToTraitSet();\\\\n    this.drawItemDarkRect(0, y, width, traitHeight);\\\\n    this.drawTextEx(traitSet.Description, padding, y, width - padding * 2);\\\\n    y += traitHeight;\\\\n    this.resetDescriptionFontSize();\\\\n}\\\\n\\\\n// Draw Filler Rect 1\\\\nif (this.innerHeight - y > 0) {\\\\n    this.drawItemDarkRect(0, y, width, this.innerHeight - y);\\\\n}\\\\n\\\\n// Draw Trait Set 2\\\\ny = 0;\\\\nfor (const type of traitCol2) {\\\\n    const traitType = DataManager.traitSetType(type);\\\\n    const traitSet = actor.traitSet(type);\\\\n    this.drawItemDarkRect(width, y, width, lineHeight, 2);\\\\n    const labelText = '\\\\\\\\\\\\\\\\C[16]%1: \\\\\\\\\\\\\\\\C[0]%2'.format(traitType.Label, traitSet.Display);\\\\n    this.drawTextEx(labelText, width + padding, y, width - padding * 2);\\\\n    y += lineHeight;\\\\n    this.setDescriptionFontSizeToTraitSet();\\\\n    this.drawItemDarkRect(width, y, width, traitHeight);\\\\n    this.drawTextEx(traitSet.Description, width + padding, y, width - padding * 2);\\\\n    y += traitHeight;\\\\n    this.resetDescriptionFontSize();\\\\n}\\\\n\\\\n// Draw Filler Rect 1\\\\nif (this.innerHeight - y > 0) {\\\\n    this.drawItemDarkRect(width, y, width, this.innerHeight - y);\\\\n}\\\"\"}","{\"Symbol:str\":\"elements\",\"Icon:num\":\"64\",\"Text:str\":\"Elements\",\"DrawJS:func\":\"\\\"// Declare Constants\\\\nconst lineHeight = this.lineHeight();\\\\nconst actor = this._actor;\\\\nconst padding = this.itemPadding();\\\\nconst labelFmt = '\\\\\\\\\\\\\\\\C[16]%1: \\\\\\\\\\\\\\\\C[0]%2';\\\\nconst traitType1 = DataManager.traitSetType('Element');\\\\nconst traitSet1 = actor.traitSet('Element');\\\\nconst traitType2 = DataManager.traitSetType('SubElement');\\\\nconst traitSet2 = actor.traitSet('SubElement');\\\\nconst traitHeight = (this.innerHeight / Math.max(Window_StatusData.traitCol1.length, Window_StatusData.traitCol2.length)) - lineHeight;\\\\nlet x = 0;\\\\nlet y = 0;\\\\nlet width = this.innerWidth / 2;\\\\n\\\\n// Draw Actor Graphic\\\\nthis.drawActorGraphic(0, width);\\\\n\\\\n// Draw Element Trait Sets\\\\nif (traitType1.Visible || traitType2.Visible) {\\\\n    this.drawItemDarkRect(x, y, width, lineHeight, 2);\\\\n    this.drawItemDarkRect(width, y, width, lineHeight, 2);\\\\n    if (traitType1.Visible) {\\\\n        this.drawTextEx(labelFmt.format(traitType1.Label, traitSet1.Display), padding, y, width - padding * 2);\\\\n    }\\\\n    if (traitType2.Visible) {\\\\n        this.drawTextEx(labelFmt.format(traitType2.Label, traitSet2.Display), width + padding, y, width - padding * 2);\\\\n    }\\\\n    y += lineHeight;\\\\n    this.setDescriptionFontSizeToTraitSet();\\\\n    this.drawItemDarkRect(x, y, width, traitHeight);\\\\n    this.drawItemDarkRect(width, y, width, traitHeight);\\\\n    if (traitType1.Visible) {\\\\n        this.drawTextEx(traitSet1.Description, padding, y, width - padding * 2);\\\\n    }\\\\n    if (traitType2.Visible) {\\\\n        this.drawTextEx(traitSet2.Description, width + padding, y, width - padding * 2);\\\\n    }\\\\n    this.resetDescriptionFontSize();\\\\n    this.resetFontSettings();\\\\n    y += traitHeight;\\\\n}\\\\nconst topY = y;\\\\n\\\\n// Prepare Elemental Data\\\\nconst elementCol1 = this.getElementIDsCol1();\\\\nconst elementCol2 = this.getElementIDsCol2();\\\\nlet columnData;\\\\nif (elementCol2.length > 0) {\\\\n    columnData = ['Resist','Resist','Bonus','Bonus'];\\\\n} else {\\\\n    columnData = ['Resist','Bonus'];\\\\n}\\\\nconst dataRows = Math.max(elementCol1.length, elementCol2.length, 1);\\\\nconst dataCols = columnData.length;\\\\n\\\\n// Draw Elemental Data\\\\nthis.drawItemDarkRect(width * 0, y, width, lineHeight, 2);\\\\nthis.drawItemDarkRect(width * 1, y, width, lineHeight, 2);\\\\nthis.changeTextColor(ColorManager.systemColor());\\\\nthis.drawText(TextManager.statusMenuDmgReceive, width * 0, y, width, 'center');\\\\nthis.drawText(TextManager.statusMenuDmgDealt, width * 1, y, width, 'center');\\\\ny += lineHeight;\\\\nthis.setDescriptionFontSizeToTraitSet();\\\\nconst smallLineHeight = this.textSizeEx(' ').height;\\\\n\\\\n// Draw Elemental Table\\\\nfor (let i = 0; i < dataRows; i++) {\\\\n    for (let j = 0; j < dataCols; j++) {\\\\n        // Draw Dark Rect\\\\n        const colWidth = this.innerWidth / dataCols;\\\\n        this.drawItemDarkRect(colWidth * j, y, colWidth, smallLineHeight);\\\\n\\\\n        // Draw Element Name\\\\n        let elementID = elementCol1[i];\\\\n        if (dataCols === 4) {\\\\n            elementID = (j % 2 === 0) ? elementCol1[i] : elementCol2[i];\\\\n        }\\\\n        if (!elementID) continue;\\\\n        const name = $dataSystem.elements[elementID];\\\\n        this.drawTextEx(name, colWidth * (j + 1/3) + padding, y, colWidth*2/3);\\\\n        const type = columnData[j];\\\\n\\\\n        // Draw Resistance Data\\\\n        this.resetFontSettings();\\\\n        let drawText = '';\\\\n        if (type === 'Resist') {\\\\n            const rate = actor.elementRate(elementID);\\\\n            const flippedRate = (rate - 1) * -1;\\\\n            this.changeTextColor(ColorManager.paramchangeTextColor(flippedRate));\\\\n            drawText = '%1%'.format(Math.round(flippedRate * 100));\\\\n            if (actor.getAbsorbedElements().includes(elementID)) {\\\\n                this.changeTextColor(ColorManager.powerUpColor());\\\\n                drawText = TextManager.statusMenuDmgAbsorb.format(Math.round(rate * 100));\\\\n            } else if (rate > 1) {\\\\n                drawText = '%1'.format(drawText);\\\\n            } else if (rate <= 1) {\\\\n                drawText = '+%1'.format(drawText);\\\\n            }\\\\n\\\\n        // Draw Bonus Damage Data\\\\n        } else if (type === 'Bonus') {\\\\n            const dealtPlus = actor.getDealtElementPlus(elementID);\\\\n            const dealtRate = actor.getDealtElementRate(elementID);\\\\n            const dealtFlat = actor.getDealtElementFlat(elementID);\\\\n            const dealt = ((1 + dealtPlus) * dealtRate + dealtFlat) - 1;\\\\n            this.changeTextColor(ColorManager.paramchangeTextColor(dealt));\\\\n            drawText = '%1%'.format(Math.round(dealt * 100));\\\\n            if (dealt >= 0) drawText = '+%1'.format(drawText);\\\\n        }\\\\n\\\\n        // Draw Value\\\\n        this.contents.drawText(drawText, colWidth * j, y, (colWidth/3) - padding, smallLineHeight, 'right');\\\\n    }\\\\n    y += smallLineHeight;\\\\n}\\\\n\\\\n// Closing the Table\\\\nfor (let j = 0; j < dataCols; j++) {\\\\n    const colWidth = this.innerWidth / dataCols;\\\\n    this.drawItemDarkRect(colWidth * j, y, colWidth, this.innerHeight - y);\\\\n}\\\"\"}","{\"Symbol:str\":\"access\",\"Icon:num\":\"137\",\"Text:str\":\"Access\",\"DrawJS:func\":\"\\\"// Declare Constants\\\\nconst lineHeight = this.lineHeight();\\\\nconst actor = this._actor;\\\\nconst thirdWidth = Math.floor(this.innerWidth / 3);\\\\nlet x = 0;\\\\nlet y = 0;\\\\n\\\\n// Draw Actor Graphic\\\\nthis.drawActorGraphic(0, this.innerWidth / 2);\\\\n\\\\n// Declare Parameter Rect\\\\nlet rect = new Rectangle(0, 0, thirdWidth, this.innerHeight);\\\\n\\\\n// Draw Skill Types\\\\nx = rect.x;\\\\ny = 0;\\\\nthis.resetFontSettings();\\\\nthis.drawItemDarkRect(x, y, rect.width, lineHeight, 2);\\\\nthis.changeTextColor(ColorManager.systemColor());\\\\nthis.drawText(TextManager.statusMenuStype, x, y, rect.width, 'center');\\\\ny += lineHeight;\\\\nfor (const stypeId of actor.skillTypes()) {\\\\n    this.drawItemDarkRect(x, y, rect.width, lineHeight);\\\\n    if (stypeId > 0) {\\\\n        const text = $dataSystem.skillTypes[stypeId];\\\\n        const padding = Math.round((rect.width - this.stypeWidth()) / 2);\\\\n        this.drawTextEx(text, x + padding, y, rect.width - padding * 2);\\\\n    }\\\\n    y += lineHeight;\\\\n}\\\\nthis.drawItemDarkRect(x, y, rect.width, this.innerHeight - y);\\\\n\\\\n// Draw Weapon Types\\\\nrect.x += rect.width;\\\\nx = rect.x;\\\\ny = 0;\\\\nthis.resetFontSettings();\\\\nthis.drawItemDarkRect(x, y, rect.width, lineHeight, 2);\\\\nthis.changeTextColor(ColorManager.systemColor());\\\\nthis.drawText(TextManager.statusMenuWtype, x, y, rect.width, 'center');\\\\ny += lineHeight;\\\\nfor (const wtypeId of actor.weaponTypes()) {\\\\n    this.drawItemDarkRect(x, y, rect.width, lineHeight);\\\\n    if (wtypeId > 0) {\\\\n        const text = $dataSystem.weaponTypes[wtypeId];\\\\n        const padding = Math.round((rect.width - this.wtypeWidth()) / 2);\\\\n        this.drawTextEx(text, x + padding, y, rect.width - padding * 2);\\\\n    }\\\\n    y += lineHeight;\\\\n}\\\\nthis.drawItemDarkRect(x, y, rect.width, this.innerHeight - y);\\\\n\\\\n// Draw Armor Types\\\\nrect.x += rect.width;\\\\nx = rect.x;\\\\ny = 0;\\\\nrect.width = this.innerWidth - rect.x;\\\\nthis.resetFontSettings();\\\\nthis.drawItemDarkRect(x, y, rect.width, lineHeight, 2);\\\\nthis.changeTextColor(ColorManager.systemColor());\\\\nthis.drawText(TextManager.statusMenuAtype, x, y, rect.width, 'center');\\\\ny += lineHeight;\\\\nfor (const atypeId of actor.armorTypes()) {\\\\n    this.drawItemDarkRect(x, y, rect.width, lineHeight);\\\\n    if (atypeId > 0) {\\\\n        const text = $dataSystem.armorTypes[atypeId];\\\\n        const padding = Math.round((rect.width - this.atypeWidth()) / 2);\\\\n        this.drawTextEx(text, x + padding, y, rect.width - padding * 2);\\\\n    }\\\\n    y += lineHeight;\\\\n}\\\\nthis.drawItemDarkRect(x, y, rect.width, this.innerHeight - y);\\\"\"}","{\"Symbol:str\":\"cancel\",\"Icon:num\":\"82\",\"Text:str\":\"Finish\",\"DrawJS:func\":\"\\\"this.drawFirstCategoryData();\\\"\"}"]
 *
 * @param TraitBreak
 * @text --------------------------
 * @default ----------------------------------
 *
 * @param TraitSetSettings:struct
 * @text General Trait Set Settings
 * @type struct<TraitSetSettings>
 * @desc The settings for Trait Sets as a whole.
 * @default {"General":"","Enable:eval":"true","EnemyNameFmt:str":"[variant] [name][gender] [letter]","TraitColumns":"","TraitCol1:arraystr":"[\"Gender\",\"Nature\",\"Blessing\",\"Zodiac\"]","TraitCol2:arraystr":"[\"Race\",\"Alignment\",\"Curse\",\"Variant\"]"}
 *
 * @param Element:struct
 * @text Main Element Sets
 * @parent TraitSetSettings:struct
 * @type struct<TraitSetType>
 * @desc The settings for the Main Element Trait Set Type.
 * @default {"Name:str":"Element","Label:str":"Element","Visible:eval":"true","RandomizeActor:eval":"false","RandomizeEnemy:eval":"false","Default:struct":"{\"Name:str\":\"Neutral\",\"Display:str\":\"\\\\i[160]Neutral\",\"Description:json\":\"\\\"No strengths or weaknesses.\\\"\",\"FmtText:str\":\"\",\"RandomValid:eval\":\"true\",\"RandomWeight:num\":\"8\",\"Traits\":\"\",\"ElementRate:struct\":\"{}\",\"Params:struct\":\"{}\",\"XParams:struct\":\"{}\",\"SParams:struct\":\"{}\",\"PassiveStates:arraynum\":\"[]\",\"Equipment\":\"\",\"Wtypes:arraynum\":\"[]\",\"Atypes:arraynum\":\"[]\",\"EnemyRewards\":\"\",\"EXPRate:num\":\"1.00\",\"GoldRate:num\":\"1.00\",\"DropRate:num\":\"1.00\"}","List:arraystruct":"[\"{\\\"Name:str\\\":\\\"Fire\\\",\\\"Display:str\\\":\\\"\\\\\\\\I[64]Fire\\\",\\\"Description:json\\\":\\\"\\\\\\\"Strong against \\\\\\\\\\\\\\\\I[64]Fire and \\\\\\\\\\\\\\\\I[65]Ice.\\\\\\\\nWeak against \\\\\\\\\\\\\\\\I[67]Water.\\\\\\\"\\\",\\\"FmtText:str\\\":\\\"Flame\\\",\\\"RandomValid:eval\\\":\\\"true\\\",\\\"RandomWeight:num\\\":\\\"1\\\",\\\"Traits\\\":\\\"\\\",\\\"ElementRate:struct\\\":\\\"{\\\\\\\"Element1:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element2:num\\\\\\\":\\\\\\\"0.50\\\\\\\",\\\\\\\"Element3:num\\\\\\\":\\\\\\\"0.50\\\\\\\",\\\\\\\"Element4:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element5:num\\\\\\\":\\\\\\\"2.00\\\\\\\",\\\\\\\"Element6:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element7:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element8:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element9:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element10:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element11:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element12:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element13:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element14:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element15:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element16:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element17:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element18:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element19:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element20:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element21:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element22:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element23:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element24:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element25:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element26:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element27:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element28:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element29:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element30:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element31:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element32:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element33:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element34:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element35:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element36:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element37:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element38:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element39:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element40:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element41:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element42:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element43:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element44:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element45:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element46:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element47:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element48:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element49:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element50:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element51:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element52:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element53:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element54:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element55:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element56:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element57:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element58:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element59:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element60:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element61:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element62:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element63:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element64:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element65:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element66:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element67:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element68:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element69:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element70:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element71:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element72:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element73:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element74:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element75:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element76:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element77:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element78:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element79:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element80:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element81:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element82:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element83:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element84:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element85:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element86:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element87:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element88:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element89:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element90:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element91:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element92:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element93:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element94:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element95:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element96:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element97:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element98:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element99:num\\\\\\\":\\\\\\\"1.00\\\\\\\"}\\\",\\\"Params:struct\\\":\\\"{}\\\",\\\"XParams:struct\\\":\\\"{}\\\",\\\"SParams:struct\\\":\\\"{}\\\",\\\"PassiveStates:arraynum\\\":\\\"[]\\\",\\\"Equipment\\\":\\\"\\\",\\\"Wtypes:arraynum\\\":\\\"[]\\\",\\\"Atypes:arraynum\\\":\\\"[]\\\",\\\"EnemyRewards\\\":\\\"\\\",\\\"EXPRate:num\\\":\\\"1.00\\\",\\\"GoldRate:num\\\":\\\"1.00\\\",\\\"DropRate:num\\\":\\\"1.00\\\"}\",\"{\\\"Name:str\\\":\\\"Ice\\\",\\\"Display:str\\\":\\\"\\\\\\\\I[65]Ice\\\",\\\"Description:json\\\":\\\"\\\\\\\"Strong against \\\\\\\\\\\\\\\\I[65]Ice and \\\\\\\\\\\\\\\\I[69]Wind.\\\\\\\\nWeak against \\\\\\\\\\\\\\\\I[64]Fire.\\\\\\\"\\\",\\\"FmtText:str\\\":\\\"Frost\\\",\\\"RandomValid:eval\\\":\\\"true\\\",\\\"RandomWeight:num\\\":\\\"1\\\",\\\"Traits\\\":\\\"\\\",\\\"ElementRate:struct\\\":\\\"{\\\\\\\"Element1:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element2:num\\\\\\\":\\\\\\\"2.00\\\\\\\",\\\\\\\"Element3:num\\\\\\\":\\\\\\\"0.50\\\\\\\",\\\\\\\"Element4:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element5:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element6:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element7:num\\\\\\\":\\\\\\\"0.50\\\\\\\",\\\\\\\"Element8:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element9:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element10:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element11:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element12:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element13:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element14:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element15:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element16:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element17:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element18:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element19:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element20:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element21:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element22:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element23:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element24:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element25:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element26:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element27:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element28:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element29:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element30:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element31:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element32:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element33:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element34:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element35:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element36:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element37:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element38:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element39:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element40:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element41:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element42:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element43:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element44:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element45:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element46:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element47:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element48:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element49:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element50:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element51:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element52:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element53:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element54:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element55:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element56:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element57:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element58:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element59:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element60:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element61:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element62:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element63:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element64:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element65:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element66:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element67:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element68:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element69:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element70:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element71:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element72:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element73:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element74:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element75:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element76:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element77:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element78:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element79:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element80:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element81:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element82:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element83:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element84:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element85:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element86:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element87:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element88:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element89:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element90:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element91:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element92:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element93:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element94:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element95:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element96:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element97:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element98:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element99:num\\\\\\\":\\\\\\\"1.00\\\\\\\"}\\\",\\\"Params:struct\\\":\\\"{}\\\",\\\"XParams:struct\\\":\\\"{}\\\",\\\"SParams:struct\\\":\\\"{}\\\",\\\"PassiveStates:arraynum\\\":\\\"[]\\\",\\\"Equipment\\\":\\\"\\\",\\\"Wtypes:arraynum\\\":\\\"[]\\\",\\\"Atypes:arraynum\\\":\\\"[]\\\",\\\"EnemyRewards\\\":\\\"\\\",\\\"EXPRate:num\\\":\\\"1.00\\\",\\\"GoldRate:num\\\":\\\"1.00\\\",\\\"DropRate:num\\\":\\\"1.00\\\"}\",\"{\\\"Name:str\\\":\\\"Thunder\\\",\\\"Display:str\\\":\\\"\\\\\\\\I[66]Thunder\\\",\\\"Description:json\\\":\\\"\\\\\\\"Strong against \\\\\\\\\\\\\\\\I[66]Thunder and \\\\\\\\\\\\\\\\I[67]Water.\\\\\\\\nWeak against \\\\\\\\\\\\\\\\I[68]Earth.\\\\\\\"\\\",\\\"FmtText:str\\\":\\\"Electric\\\",\\\"RandomValid:eval\\\":\\\"true\\\",\\\"RandomWeight:num\\\":\\\"1\\\",\\\"Traits\\\":\\\"\\\",\\\"ElementRate:struct\\\":\\\"{\\\\\\\"Element1:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element2:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element3:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element4:num\\\\\\\":\\\\\\\"0.50\\\\\\\",\\\\\\\"Element5:num\\\\\\\":\\\\\\\"0.50\\\\\\\",\\\\\\\"Element6:num\\\\\\\":\\\\\\\"2.00\\\\\\\",\\\\\\\"Element7:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element8:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element9:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element10:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element11:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element12:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element13:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element14:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element15:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element16:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element17:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element18:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element19:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element20:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element21:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element22:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element23:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element24:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element25:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element26:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element27:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element28:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element29:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element30:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element31:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element32:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element33:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element34:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element35:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element36:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element37:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element38:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element39:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element40:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element41:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element42:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element43:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element44:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element45:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element46:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element47:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element48:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element49:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element50:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element51:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element52:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element53:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element54:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element55:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element56:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element57:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element58:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element59:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element60:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element61:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element62:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element63:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element64:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element65:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element66:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element67:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element68:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element69:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element70:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element71:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element72:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element73:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element74:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element75:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element76:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element77:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element78:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element79:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element80:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element81:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element82:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element83:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element84:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element85:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element86:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element87:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element88:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element89:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element90:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element91:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element92:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element93:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element94:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element95:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element96:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element97:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element98:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element99:num\\\\\\\":\\\\\\\"1.00\\\\\\\"}\\\",\\\"Params:struct\\\":\\\"{}\\\",\\\"XParams:struct\\\":\\\"{}\\\",\\\"SParams:struct\\\":\\\"{}\\\",\\\"PassiveStates:arraynum\\\":\\\"[]\\\",\\\"Equipment\\\":\\\"\\\",\\\"Wtypes:arraynum\\\":\\\"[]\\\",\\\"Atypes:arraynum\\\":\\\"[]\\\",\\\"EnemyRewards\\\":\\\"\\\",\\\"EXPRate:num\\\":\\\"1.00\\\",\\\"GoldRate:num\\\":\\\"1.00\\\",\\\"DropRate:num\\\":\\\"1.00\\\"}\",\"{\\\"Name:str\\\":\\\"Water\\\",\\\"Display:str\\\":\\\"\\\\\\\\I[67]Water\\\",\\\"Description:json\\\":\\\"\\\\\\\"Strong against \\\\\\\\\\\\\\\\I[67]Water and \\\\\\\\\\\\\\\\I[64]Fire.\\\\\\\\nWeak against \\\\\\\\\\\\\\\\I[66]Thunder.\\\\\\\"\\\",\\\"FmtText:str\\\":\\\"Aqua\\\",\\\"RandomValid:eval\\\":\\\"true\\\",\\\"RandomWeight:num\\\":\\\"1\\\",\\\"Traits\\\":\\\"\\\",\\\"ElementRate:struct\\\":\\\"{\\\\\\\"Element1:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element2:num\\\\\\\":\\\\\\\"0.50\\\\\\\",\\\\\\\"Element3:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element4:num\\\\\\\":\\\\\\\"2.00\\\\\\\",\\\\\\\"Element5:num\\\\\\\":\\\\\\\"0.50\\\\\\\",\\\\\\\"Element6:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element7:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element8:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element9:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element10:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element11:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element12:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element13:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element14:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element15:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element16:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element17:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element18:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element19:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element20:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element21:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element22:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element23:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element24:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element25:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element26:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element27:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element28:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element29:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element30:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element31:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element32:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element33:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element34:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element35:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element36:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element37:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element38:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element39:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element40:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element41:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element42:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element43:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element44:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element45:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element46:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element47:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element48:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element49:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element50:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element51:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element52:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element53:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element54:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element55:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element56:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element57:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element58:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element59:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element60:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element61:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element62:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element63:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element64:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element65:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element66:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element67:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element68:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element69:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element70:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element71:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element72:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element73:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element74:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element75:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element76:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element77:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element78:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element79:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element80:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element81:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element82:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element83:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element84:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element85:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element86:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element87:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element88:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element89:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element90:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element91:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element92:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element93:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element94:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element95:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element96:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element97:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element98:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element99:num\\\\\\\":\\\\\\\"1.00\\\\\\\"}\\\",\\\"Params:struct\\\":\\\"{}\\\",\\\"XParams:struct\\\":\\\"{}\\\",\\\"SParams:struct\\\":\\\"{}\\\",\\\"PassiveStates:arraynum\\\":\\\"[]\\\",\\\"Equipment\\\":\\\"\\\",\\\"Wtypes:arraynum\\\":\\\"[]\\\",\\\"Atypes:arraynum\\\":\\\"[]\\\",\\\"EnemyRewards\\\":\\\"\\\",\\\"EXPRate:num\\\":\\\"1.00\\\",\\\"GoldRate:num\\\":\\\"1.00\\\",\\\"DropRate:num\\\":\\\"1.00\\\"}\",\"{\\\"Name:str\\\":\\\"Earth\\\",\\\"Display:str\\\":\\\"\\\\\\\\I[68]Earth\\\",\\\"Description:json\\\":\\\"\\\\\\\"Strong against \\\\\\\\\\\\\\\\I[68]Earth and \\\\\\\\\\\\\\\\I[66]Thunder.\\\\\\\\nWeak against \\\\\\\\\\\\\\\\I[69]Wind.\\\\\\\"\\\",\\\"FmtText:str\\\":\\\"Stone\\\",\\\"RandomValid:eval\\\":\\\"true\\\",\\\"RandomWeight:num\\\":\\\"1\\\",\\\"Traits\\\":\\\"\\\",\\\"ElementRate:struct\\\":\\\"{\\\\\\\"Element1:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element2:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element3:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element4:num\\\\\\\":\\\\\\\"0.50\\\\\\\",\\\\\\\"Element5:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element6:num\\\\\\\":\\\\\\\"0.50\\\\\\\",\\\\\\\"Element7:num\\\\\\\":\\\\\\\"2.00\\\\\\\",\\\\\\\"Element8:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element9:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element10:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element11:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element12:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element13:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element14:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element15:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element16:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element17:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element18:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element19:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element20:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element21:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element22:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element23:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element24:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element25:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element26:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element27:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element28:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element29:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element30:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element31:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element32:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element33:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element34:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element35:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element36:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element37:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element38:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element39:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element40:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element41:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element42:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element43:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element44:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element45:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element46:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element47:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element48:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element49:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element50:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element51:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element52:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element53:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element54:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element55:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element56:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element57:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element58:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element59:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element60:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element61:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element62:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element63:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element64:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element65:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element66:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element67:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element68:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element69:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element70:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element71:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element72:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element73:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element74:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element75:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element76:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element77:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element78:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element79:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element80:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element81:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element82:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element83:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element84:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element85:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element86:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element87:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element88:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element89:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element90:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element91:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element92:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element93:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element94:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element95:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element96:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element97:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element98:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element99:num\\\\\\\":\\\\\\\"1.00\\\\\\\"}\\\",\\\"Params:struct\\\":\\\"{}\\\",\\\"XParams:struct\\\":\\\"{}\\\",\\\"SParams:struct\\\":\\\"{}\\\",\\\"PassiveStates:arraynum\\\":\\\"[]\\\",\\\"Equipment\\\":\\\"\\\",\\\"Wtypes:arraynum\\\":\\\"[]\\\",\\\"Atypes:arraynum\\\":\\\"[]\\\",\\\"EnemyRewards\\\":\\\"\\\",\\\"EXPRate:num\\\":\\\"1.00\\\",\\\"GoldRate:num\\\":\\\"1.00\\\",\\\"DropRate:num\\\":\\\"1.00\\\"}\",\"{\\\"Name:str\\\":\\\"Wind\\\",\\\"Display:str\\\":\\\"\\\\\\\\I[69]Wind\\\",\\\"Description:json\\\":\\\"\\\\\\\"Strong against \\\\\\\\\\\\\\\\I[69]Wind and \\\\\\\\\\\\\\\\I[68]Earth.\\\\\\\\nWeak against \\\\\\\\\\\\\\\\I[65]Ice.\\\\\\\"\\\",\\\"FmtText:str\\\":\\\"Air\\\",\\\"RandomValid:eval\\\":\\\"true\\\",\\\"RandomWeight:num\\\":\\\"1\\\",\\\"Traits\\\":\\\"\\\",\\\"ElementRate:struct\\\":\\\"{\\\\\\\"Element1:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element2:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element3:num\\\\\\\":\\\\\\\"2.00\\\\\\\",\\\\\\\"Element4:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element5:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element6:num\\\\\\\":\\\\\\\"0.50\\\\\\\",\\\\\\\"Element7:num\\\\\\\":\\\\\\\"0.50\\\\\\\",\\\\\\\"Element8:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element9:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element10:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element11:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element12:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element13:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element14:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element15:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element16:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element17:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element18:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element19:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element20:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element21:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element22:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element23:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element24:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element25:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element26:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element27:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element28:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element29:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element30:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element31:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element32:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element33:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element34:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element35:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element36:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element37:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element38:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element39:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element40:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element41:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element42:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element43:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element44:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element45:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element46:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element47:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element48:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element49:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element50:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element51:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element52:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element53:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element54:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element55:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element56:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element57:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element58:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element59:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element60:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element61:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element62:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element63:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element64:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element65:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element66:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element67:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element68:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element69:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element70:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element71:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element72:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element73:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element74:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element75:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element76:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element77:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element78:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element79:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element80:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element81:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element82:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element83:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element84:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element85:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element86:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element87:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element88:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element89:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element90:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element91:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element92:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element93:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element94:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element95:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element96:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element97:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element98:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element99:num\\\\\\\":\\\\\\\"1.00\\\\\\\"}\\\",\\\"Params:struct\\\":\\\"{}\\\",\\\"XParams:struct\\\":\\\"{}\\\",\\\"SParams:struct\\\":\\\"{}\\\",\\\"PassiveStates:arraynum\\\":\\\"[]\\\",\\\"Equipment\\\":\\\"\\\",\\\"Wtypes:arraynum\\\":\\\"[]\\\",\\\"Atypes:arraynum\\\":\\\"[]\\\",\\\"EnemyRewards\\\":\\\"\\\",\\\"EXPRate:num\\\":\\\"1.00\\\",\\\"GoldRate:num\\\":\\\"1.00\\\",\\\"DropRate:num\\\":\\\"1.00\\\"}\",\"{\\\"Name:str\\\":\\\"Light\\\",\\\"Display:str\\\":\\\"\\\\\\\\I[70]Light\\\",\\\"Description:json\\\":\\\"\\\\\\\"Strong against \\\\\\\\\\\\\\\\I[70]Light.\\\\\\\\nWeak against \\\\\\\\\\\\\\\\I[71]Darkness.\\\\\\\"\\\",\\\"FmtText:str\\\":\\\"Bright\\\",\\\"RandomValid:eval\\\":\\\"true\\\",\\\"RandomWeight:num\\\":\\\"1\\\",\\\"Traits\\\":\\\"\\\",\\\"ElementRate:struct\\\":\\\"{\\\\\\\"Element1:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element2:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element3:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element4:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element5:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element6:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element7:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element8:num\\\\\\\":\\\\\\\"0.50\\\\\\\",\\\\\\\"Element9:num\\\\\\\":\\\\\\\"2.00\\\\\\\",\\\\\\\"Element10:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element11:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element12:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element13:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element14:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element15:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element16:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element17:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element18:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element19:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element20:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element21:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element22:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element23:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element24:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element25:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element26:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element27:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element28:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element29:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element30:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element31:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element32:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element33:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element34:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element35:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element36:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element37:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element38:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element39:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element40:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element41:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element42:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element43:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element44:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element45:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element46:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element47:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element48:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element49:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element50:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element51:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element52:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element53:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element54:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element55:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element56:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element57:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element58:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element59:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element60:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element61:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element62:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element63:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element64:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element65:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element66:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element67:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element68:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element69:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element70:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element71:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element72:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element73:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element74:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element75:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element76:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element77:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element78:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element79:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element80:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element81:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element82:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element83:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element84:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element85:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element86:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element87:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element88:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element89:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element90:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element91:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element92:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element93:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element94:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element95:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element96:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element97:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element98:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element99:num\\\\\\\":\\\\\\\"1.00\\\\\\\"}\\\",\\\"Params:struct\\\":\\\"{}\\\",\\\"XParams:struct\\\":\\\"{}\\\",\\\"SParams:struct\\\":\\\"{}\\\",\\\"PassiveStates:arraynum\\\":\\\"[]\\\",\\\"Equipment\\\":\\\"\\\",\\\"Wtypes:arraynum\\\":\\\"[]\\\",\\\"Atypes:arraynum\\\":\\\"[]\\\",\\\"EnemyRewards\\\":\\\"\\\",\\\"EXPRate:num\\\":\\\"1.00\\\",\\\"GoldRate:num\\\":\\\"1.00\\\",\\\"DropRate:num\\\":\\\"1.00\\\"}\",\"{\\\"Name:str\\\":\\\"Darkness\\\",\\\"Display:str\\\":\\\"\\\\\\\\I[71]Darkness\\\",\\\"Description:json\\\":\\\"\\\\\\\"Strong against \\\\\\\\\\\\\\\\I[71]Darkness.\\\\\\\\nWeak against \\\\\\\\\\\\\\\\I[70]Light.\\\\\\\"\\\",\\\"FmtText:str\\\":\\\"Shadow\\\",\\\"RandomValid:eval\\\":\\\"true\\\",\\\"RandomWeight:num\\\":\\\"1\\\",\\\"Traits\\\":\\\"\\\",\\\"ElementRate:struct\\\":\\\"{\\\\\\\"Element1:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element2:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element3:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element4:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element5:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element6:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element7:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element8:num\\\\\\\":\\\\\\\"2.00\\\\\\\",\\\\\\\"Element9:num\\\\\\\":\\\\\\\"0.50\\\\\\\",\\\\\\\"Element10:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element11:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element12:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element13:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element14:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element15:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element16:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element17:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element18:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element19:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element20:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element21:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element22:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element23:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element24:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element25:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element26:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element27:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element28:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element29:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element30:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element31:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element32:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element33:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element34:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element35:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element36:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element37:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element38:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element39:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element40:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element41:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element42:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element43:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element44:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element45:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element46:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element47:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element48:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element49:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element50:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element51:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element52:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element53:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element54:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element55:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element56:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element57:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element58:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element59:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element60:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element61:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element62:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element63:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element64:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element65:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element66:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element67:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element68:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element69:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element70:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element71:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element72:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element73:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element74:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element75:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element76:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element77:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element78:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element79:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element80:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element81:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element82:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element83:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element84:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element85:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element86:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element87:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element88:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element89:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element90:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element91:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element92:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element93:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element94:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element95:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element96:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element97:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element98:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element99:num\\\\\\\":\\\\\\\"1.00\\\\\\\"}\\\",\\\"Params:struct\\\":\\\"{}\\\",\\\"XParams:struct\\\":\\\"{}\\\",\\\"SParams:struct\\\":\\\"{}\\\",\\\"PassiveStates:arraynum\\\":\\\"[]\\\",\\\"Equipment\\\":\\\"\\\",\\\"Wtypes:arraynum\\\":\\\"[]\\\",\\\"Atypes:arraynum\\\":\\\"[]\\\",\\\"EnemyRewards\\\":\\\"\\\",\\\"EXPRate:num\\\":\\\"1.00\\\",\\\"GoldRate:num\\\":\\\"1.00\\\",\\\"DropRate:num\\\":\\\"1.00\\\"}\"]"}
 *
 * @param SubElement:struct
 * @text Sub Element Sets
 * @parent TraitSetSettings:struct
 * @type struct<TraitSetType>
 * @desc The settings for the Main Element Trait Set Type.
 * @default {"Name:str":"Sub-Element","Label:str":"Sub-Element","Visible:eval":"true","RandomizeActor:eval":"false","RandomizeEnemy:eval":"false","Default:struct":"{\"Name:str\":\"-\",\"Display:str\":\"-\",\"Description:json\":\"\\\"\\\"\",\"FmtText:str\":\"\",\"RandomValid:eval\":\"true\",\"RandomWeight:num\":\"8\",\"Traits\":\"\",\"ElementRate:struct\":\"{}\",\"Params:struct\":\"{}\",\"XParams:struct\":\"{}\",\"SParams:struct\":\"{}\",\"PassiveStates:arraynum\":\"[]\",\"Equipment\":\"\",\"Wtypes:arraynum\":\"[]\",\"Atypes:arraynum\":\"[]\",\"EnemyRewards\":\"\",\"EXPRate:num\":\"1.00\",\"GoldRate:num\":\"1.00\",\"DropRate:num\":\"1.00\"}","List:arraystruct":"[\"{\\\"Name:str\\\":\\\"Fire\\\",\\\"Display:str\\\":\\\"\\\\\\\\I[64]Fire\\\",\\\"Description:json\\\":\\\"\\\\\\\"Strong against \\\\\\\\\\\\\\\\I[64]Fire and \\\\\\\\\\\\\\\\I[65]Ice.\\\\\\\\nWeak against \\\\\\\\\\\\\\\\I[67]Water.\\\\\\\"\\\",\\\"FmtText:str\\\":\\\"Flame\\\",\\\"RandomValid:eval\\\":\\\"true\\\",\\\"RandomWeight:num\\\":\\\"1\\\",\\\"Traits\\\":\\\"\\\",\\\"ElementRate:struct\\\":\\\"{\\\\\\\"Element1:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element2:num\\\\\\\":\\\\\\\"0.75\\\\\\\",\\\\\\\"Element3:num\\\\\\\":\\\\\\\"0.75\\\\\\\",\\\\\\\"Element4:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element5:num\\\\\\\":\\\\\\\"1.50\\\\\\\",\\\\\\\"Element6:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element7:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element8:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element9:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element10:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element11:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element12:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element13:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element14:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element15:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element16:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element17:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element18:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element19:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element20:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element21:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element22:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element23:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element24:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element25:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element26:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element27:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element28:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element29:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element30:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element31:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element32:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element33:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element34:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element35:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element36:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element37:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element38:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element39:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element40:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element41:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element42:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element43:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element44:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element45:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element46:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element47:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element48:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element49:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element50:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element51:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element52:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element53:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element54:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element55:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element56:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element57:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element58:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element59:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element60:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element61:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element62:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element63:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element64:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element65:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element66:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element67:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element68:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element69:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element70:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element71:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element72:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element73:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element74:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element75:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element76:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element77:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element78:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element79:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element80:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element81:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element82:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element83:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element84:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element85:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element86:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element87:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element88:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element89:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element90:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element91:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element92:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element93:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element94:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element95:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element96:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element97:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element98:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element99:num\\\\\\\":\\\\\\\"1.00\\\\\\\"}\\\",\\\"Params:struct\\\":\\\"{}\\\",\\\"XParams:struct\\\":\\\"{}\\\",\\\"SParams:struct\\\":\\\"{}\\\",\\\"PassiveStates:arraynum\\\":\\\"[]\\\",\\\"Equipment\\\":\\\"\\\",\\\"Wtypes:arraynum\\\":\\\"[]\\\",\\\"Atypes:arraynum\\\":\\\"[]\\\",\\\"EnemyRewards\\\":\\\"\\\",\\\"EXPRate:num\\\":\\\"1.00\\\",\\\"GoldRate:num\\\":\\\"1.00\\\",\\\"DropRate:num\\\":\\\"1.00\\\"}\",\"{\\\"Name:str\\\":\\\"Ice\\\",\\\"Display:str\\\":\\\"\\\\\\\\I[65]Ice\\\",\\\"Description:json\\\":\\\"\\\\\\\"Strong against \\\\\\\\\\\\\\\\I[65]Ice and \\\\\\\\\\\\\\\\I[69]Wind.\\\\\\\\nWeak against \\\\\\\\\\\\\\\\I[64]Fire.\\\\\\\"\\\",\\\"FmtText:str\\\":\\\"Frost\\\",\\\"RandomValid:eval\\\":\\\"true\\\",\\\"RandomWeight:num\\\":\\\"1\\\",\\\"Traits\\\":\\\"\\\",\\\"ElementRate:struct\\\":\\\"{\\\\\\\"Element1:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element2:num\\\\\\\":\\\\\\\"1.50\\\\\\\",\\\\\\\"Element3:num\\\\\\\":\\\\\\\"0.75\\\\\\\",\\\\\\\"Element4:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element5:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element6:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element7:num\\\\\\\":\\\\\\\"0.75\\\\\\\",\\\\\\\"Element8:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element9:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element10:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element11:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element12:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element13:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element14:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element15:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element16:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element17:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element18:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element19:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element20:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element21:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element22:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element23:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element24:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element25:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element26:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element27:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element28:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element29:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element30:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element31:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element32:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element33:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element34:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element35:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element36:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element37:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element38:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element39:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element40:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element41:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element42:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element43:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element44:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element45:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element46:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element47:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element48:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element49:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element50:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element51:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element52:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element53:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element54:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element55:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element56:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element57:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element58:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element59:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element60:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element61:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element62:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element63:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element64:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element65:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element66:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element67:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element68:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element69:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element70:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element71:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element72:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element73:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element74:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element75:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element76:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element77:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element78:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element79:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element80:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element81:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element82:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element83:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element84:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element85:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element86:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element87:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element88:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element89:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element90:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element91:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element92:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element93:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element94:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element95:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element96:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element97:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element98:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element99:num\\\\\\\":\\\\\\\"1.00\\\\\\\"}\\\",\\\"Params:struct\\\":\\\"{}\\\",\\\"XParams:struct\\\":\\\"{}\\\",\\\"SParams:struct\\\":\\\"{}\\\",\\\"PassiveStates:arraynum\\\":\\\"[]\\\",\\\"Equipment\\\":\\\"\\\",\\\"Wtypes:arraynum\\\":\\\"[]\\\",\\\"Atypes:arraynum\\\":\\\"[]\\\",\\\"EnemyRewards\\\":\\\"\\\",\\\"EXPRate:num\\\":\\\"1.00\\\",\\\"GoldRate:num\\\":\\\"1.00\\\",\\\"DropRate:num\\\":\\\"1.00\\\"}\",\"{\\\"Name:str\\\":\\\"Thunder\\\",\\\"Display:str\\\":\\\"\\\\\\\\I[66]Thunder\\\",\\\"Description:json\\\":\\\"\\\\\\\"Strong against \\\\\\\\\\\\\\\\I[66]Thunder and \\\\\\\\\\\\\\\\I[67]Water.\\\\\\\\nWeak against \\\\\\\\\\\\\\\\I[68]Earth.\\\\\\\"\\\",\\\"FmtText:str\\\":\\\"Electric\\\",\\\"RandomValid:eval\\\":\\\"true\\\",\\\"RandomWeight:num\\\":\\\"1\\\",\\\"Traits\\\":\\\"\\\",\\\"ElementRate:struct\\\":\\\"{\\\\\\\"Element1:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element2:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element3:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element4:num\\\\\\\":\\\\\\\"0.75\\\\\\\",\\\\\\\"Element5:num\\\\\\\":\\\\\\\"0.75\\\\\\\",\\\\\\\"Element6:num\\\\\\\":\\\\\\\"1.50\\\\\\\",\\\\\\\"Element7:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element8:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element9:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element10:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element11:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element12:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element13:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element14:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element15:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element16:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element17:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element18:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element19:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element20:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element21:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element22:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element23:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element24:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element25:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element26:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element27:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element28:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element29:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element30:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element31:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element32:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element33:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element34:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element35:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element36:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element37:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element38:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element39:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element40:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element41:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element42:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element43:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element44:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element45:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element46:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element47:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element48:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element49:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element50:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element51:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element52:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element53:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element54:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element55:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element56:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element57:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element58:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element59:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element60:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element61:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element62:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element63:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element64:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element65:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element66:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element67:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element68:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element69:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element70:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element71:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element72:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element73:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element74:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element75:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element76:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element77:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element78:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element79:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element80:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element81:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element82:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element83:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element84:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element85:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element86:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element87:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element88:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element89:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element90:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element91:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element92:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element93:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element94:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element95:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element96:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element97:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element98:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element99:num\\\\\\\":\\\\\\\"1.00\\\\\\\"}\\\",\\\"Params:struct\\\":\\\"{}\\\",\\\"XParams:struct\\\":\\\"{}\\\",\\\"SParams:struct\\\":\\\"{}\\\",\\\"PassiveStates:arraynum\\\":\\\"[]\\\",\\\"Equipment\\\":\\\"\\\",\\\"Wtypes:arraynum\\\":\\\"[]\\\",\\\"Atypes:arraynum\\\":\\\"[]\\\",\\\"EnemyRewards\\\":\\\"\\\",\\\"EXPRate:num\\\":\\\"1.00\\\",\\\"GoldRate:num\\\":\\\"1.00\\\",\\\"DropRate:num\\\":\\\"1.00\\\"}\",\"{\\\"Name:str\\\":\\\"Water\\\",\\\"Display:str\\\":\\\"\\\\\\\\I[67]Water\\\",\\\"Description:json\\\":\\\"\\\\\\\"Strong against \\\\\\\\\\\\\\\\I[67]Water and \\\\\\\\\\\\\\\\I[64]Fire.\\\\\\\\nWeak against \\\\\\\\\\\\\\\\I[66]Thunder.\\\\\\\"\\\",\\\"FmtText:str\\\":\\\"Aqua\\\",\\\"RandomValid:eval\\\":\\\"true\\\",\\\"RandomWeight:num\\\":\\\"1\\\",\\\"Traits\\\":\\\"\\\",\\\"ElementRate:struct\\\":\\\"{\\\\\\\"Element1:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element2:num\\\\\\\":\\\\\\\"0.75\\\\\\\",\\\\\\\"Element3:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element4:num\\\\\\\":\\\\\\\"1.50\\\\\\\",\\\\\\\"Element5:num\\\\\\\":\\\\\\\"0.75\\\\\\\",\\\\\\\"Element6:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element7:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element8:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element9:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element10:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element11:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element12:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element13:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element14:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element15:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element16:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element17:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element18:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element19:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element20:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element21:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element22:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element23:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element24:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element25:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element26:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element27:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element28:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element29:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element30:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element31:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element32:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element33:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element34:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element35:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element36:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element37:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element38:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element39:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element40:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element41:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element42:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element43:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element44:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element45:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element46:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element47:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element48:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element49:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element50:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element51:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element52:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element53:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element54:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element55:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element56:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element57:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element58:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element59:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element60:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element61:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element62:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element63:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element64:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element65:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element66:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element67:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element68:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element69:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element70:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element71:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element72:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element73:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element74:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element75:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element76:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element77:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element78:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element79:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element80:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element81:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element82:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element83:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element84:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element85:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element86:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element87:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element88:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element89:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element90:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element91:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element92:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element93:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element94:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element95:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element96:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element97:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element98:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element99:num\\\\\\\":\\\\\\\"1.00\\\\\\\"}\\\",\\\"Params:struct\\\":\\\"{}\\\",\\\"XParams:struct\\\":\\\"{}\\\",\\\"SParams:struct\\\":\\\"{}\\\",\\\"PassiveStates:arraynum\\\":\\\"[]\\\",\\\"Equipment\\\":\\\"\\\",\\\"Wtypes:arraynum\\\":\\\"[]\\\",\\\"Atypes:arraynum\\\":\\\"[]\\\",\\\"EnemyRewards\\\":\\\"\\\",\\\"EXPRate:num\\\":\\\"1.00\\\",\\\"GoldRate:num\\\":\\\"1.00\\\",\\\"DropRate:num\\\":\\\"1.00\\\"}\",\"{\\\"Name:str\\\":\\\"Earth\\\",\\\"Display:str\\\":\\\"\\\\\\\\I[68]Earth\\\",\\\"Description:json\\\":\\\"\\\\\\\"Strong against \\\\\\\\\\\\\\\\I[68]Earth and \\\\\\\\\\\\\\\\I[66]Thunder.\\\\\\\\nWeak against \\\\\\\\\\\\\\\\I[69]Wind.\\\\\\\"\\\",\\\"FmtText:str\\\":\\\"Stone\\\",\\\"RandomValid:eval\\\":\\\"true\\\",\\\"RandomWeight:num\\\":\\\"1\\\",\\\"Traits\\\":\\\"\\\",\\\"ElementRate:struct\\\":\\\"{\\\\\\\"Element1:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element2:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element3:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element4:num\\\\\\\":\\\\\\\"0.75\\\\\\\",\\\\\\\"Element5:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element6:num\\\\\\\":\\\\\\\"0.75\\\\\\\",\\\\\\\"Element7:num\\\\\\\":\\\\\\\"1.50\\\\\\\",\\\\\\\"Element8:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element9:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element10:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element11:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element12:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element13:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element14:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element15:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element16:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element17:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element18:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element19:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element20:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element21:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element22:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element23:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element24:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element25:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element26:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element27:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element28:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element29:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element30:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element31:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element32:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element33:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element34:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element35:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element36:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element37:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element38:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element39:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element40:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element41:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element42:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element43:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element44:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element45:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element46:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element47:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element48:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element49:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element50:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element51:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element52:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element53:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element54:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element55:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element56:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element57:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element58:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element59:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element60:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element61:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element62:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element63:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element64:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element65:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element66:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element67:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element68:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element69:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element70:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element71:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element72:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element73:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element74:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element75:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element76:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element77:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element78:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element79:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element80:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element81:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element82:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element83:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element84:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element85:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element86:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element87:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element88:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element89:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element90:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element91:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element92:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element93:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element94:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element95:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element96:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element97:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element98:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element99:num\\\\\\\":\\\\\\\"1.00\\\\\\\"}\\\",\\\"Params:struct\\\":\\\"{}\\\",\\\"XParams:struct\\\":\\\"{}\\\",\\\"SParams:struct\\\":\\\"{}\\\",\\\"PassiveStates:arraynum\\\":\\\"[]\\\",\\\"Equipment\\\":\\\"\\\",\\\"Wtypes:arraynum\\\":\\\"[]\\\",\\\"Atypes:arraynum\\\":\\\"[]\\\",\\\"EnemyRewards\\\":\\\"\\\",\\\"EXPRate:num\\\":\\\"1.00\\\",\\\"GoldRate:num\\\":\\\"1.00\\\",\\\"DropRate:num\\\":\\\"1.00\\\"}\",\"{\\\"Name:str\\\":\\\"Wind\\\",\\\"Display:str\\\":\\\"\\\\\\\\I[69]Wind\\\",\\\"Description:json\\\":\\\"\\\\\\\"Strong against \\\\\\\\\\\\\\\\I[69]Wind and \\\\\\\\\\\\\\\\I[68]Earth.\\\\\\\\nWeak against \\\\\\\\\\\\\\\\I[65]Ice.\\\\\\\"\\\",\\\"FmtText:str\\\":\\\"Air\\\",\\\"RandomValid:eval\\\":\\\"true\\\",\\\"RandomWeight:num\\\":\\\"1\\\",\\\"Traits\\\":\\\"\\\",\\\"ElementRate:struct\\\":\\\"{\\\\\\\"Element1:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element2:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element3:num\\\\\\\":\\\\\\\"1.50\\\\\\\",\\\\\\\"Element4:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element5:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element6:num\\\\\\\":\\\\\\\"0.75\\\\\\\",\\\\\\\"Element7:num\\\\\\\":\\\\\\\"0.75\\\\\\\",\\\\\\\"Element8:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element9:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element10:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element11:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element12:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element13:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element14:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element15:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element16:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element17:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element18:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element19:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element20:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element21:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element22:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element23:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element24:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element25:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element26:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element27:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element28:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element29:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element30:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element31:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element32:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element33:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element34:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element35:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element36:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element37:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element38:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element39:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element40:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element41:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element42:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element43:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element44:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element45:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element46:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element47:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element48:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element49:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element50:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element51:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element52:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element53:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element54:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element55:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element56:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element57:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element58:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element59:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element60:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element61:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element62:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element63:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element64:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element65:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element66:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element67:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element68:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element69:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element70:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element71:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element72:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element73:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element74:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element75:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element76:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element77:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element78:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element79:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element80:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element81:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element82:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element83:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element84:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element85:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element86:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element87:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element88:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element89:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element90:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element91:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element92:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element93:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element94:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element95:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element96:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element97:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element98:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element99:num\\\\\\\":\\\\\\\"1.00\\\\\\\"}\\\",\\\"Params:struct\\\":\\\"{}\\\",\\\"XParams:struct\\\":\\\"{}\\\",\\\"SParams:struct\\\":\\\"{}\\\",\\\"PassiveStates:arraynum\\\":\\\"[]\\\",\\\"Equipment\\\":\\\"\\\",\\\"Wtypes:arraynum\\\":\\\"[]\\\",\\\"Atypes:arraynum\\\":\\\"[]\\\",\\\"EnemyRewards\\\":\\\"\\\",\\\"EXPRate:num\\\":\\\"1.00\\\",\\\"GoldRate:num\\\":\\\"1.00\\\",\\\"DropRate:num\\\":\\\"1.00\\\"}\",\"{\\\"Name:str\\\":\\\"Light\\\",\\\"Display:str\\\":\\\"\\\\\\\\I[70]Light\\\",\\\"Description:json\\\":\\\"\\\\\\\"Strong against \\\\\\\\\\\\\\\\I[70]Light.\\\\\\\\nWeak against \\\\\\\\\\\\\\\\I[71]Darkness.\\\\\\\"\\\",\\\"FmtText:str\\\":\\\"Bright\\\",\\\"RandomValid:eval\\\":\\\"true\\\",\\\"RandomWeight:num\\\":\\\"1\\\",\\\"Traits\\\":\\\"\\\",\\\"ElementRate:struct\\\":\\\"{\\\\\\\"Element1:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element2:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element3:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element4:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element5:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element6:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element7:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element8:num\\\\\\\":\\\\\\\"0.75\\\\\\\",\\\\\\\"Element9:num\\\\\\\":\\\\\\\"1.50\\\\\\\",\\\\\\\"Element10:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element11:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element12:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element13:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element14:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element15:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element16:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element17:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element18:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element19:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element20:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element21:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element22:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element23:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element24:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element25:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element26:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element27:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element28:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element29:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element30:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element31:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element32:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element33:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element34:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element35:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element36:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element37:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element38:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element39:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element40:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element41:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element42:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element43:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element44:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element45:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element46:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element47:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element48:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element49:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element50:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element51:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element52:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element53:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element54:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element55:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element56:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element57:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element58:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element59:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element60:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element61:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element62:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element63:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element64:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element65:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element66:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element67:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element68:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element69:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element70:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element71:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element72:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element73:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element74:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element75:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element76:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element77:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element78:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element79:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element80:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element81:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element82:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element83:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element84:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element85:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element86:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element87:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element88:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element89:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element90:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element91:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element92:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element93:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element94:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element95:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element96:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element97:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element98:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element99:num\\\\\\\":\\\\\\\"1.00\\\\\\\"}\\\",\\\"Params:struct\\\":\\\"{}\\\",\\\"XParams:struct\\\":\\\"{}\\\",\\\"SParams:struct\\\":\\\"{}\\\",\\\"PassiveStates:arraynum\\\":\\\"[]\\\",\\\"Equipment\\\":\\\"\\\",\\\"Wtypes:arraynum\\\":\\\"[]\\\",\\\"Atypes:arraynum\\\":\\\"[]\\\",\\\"EnemyRewards\\\":\\\"\\\",\\\"EXPRate:num\\\":\\\"1.00\\\",\\\"GoldRate:num\\\":\\\"1.00\\\",\\\"DropRate:num\\\":\\\"1.00\\\"}\",\"{\\\"Name:str\\\":\\\"Darkness\\\",\\\"Display:str\\\":\\\"\\\\\\\\I[71]Darkness\\\",\\\"Description:json\\\":\\\"\\\\\\\"Strong against \\\\\\\\\\\\\\\\I[71]Darkness.\\\\\\\\nWeak against \\\\\\\\\\\\\\\\I[70]Light.\\\\\\\"\\\",\\\"FmtText:str\\\":\\\"Shadow\\\",\\\"RandomValid:eval\\\":\\\"true\\\",\\\"RandomWeight:num\\\":\\\"1\\\",\\\"Traits\\\":\\\"\\\",\\\"ElementRate:struct\\\":\\\"{\\\\\\\"Element1:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element2:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element3:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element4:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element5:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element6:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element7:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element8:num\\\\\\\":\\\\\\\"1.50\\\\\\\",\\\\\\\"Element9:num\\\\\\\":\\\\\\\"0.75\\\\\\\",\\\\\\\"Element10:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element11:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element12:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element13:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element14:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element15:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element16:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element17:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element18:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element19:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element20:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element21:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element22:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element23:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element24:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element25:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element26:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element27:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element28:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element29:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element30:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element31:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element32:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element33:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element34:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element35:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element36:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element37:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element38:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element39:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element40:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element41:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element42:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element43:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element44:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element45:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element46:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element47:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element48:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element49:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element50:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element51:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element52:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element53:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element54:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element55:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element56:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element57:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element58:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element59:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element60:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element61:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element62:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element63:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element64:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element65:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element66:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element67:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element68:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element69:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element70:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element71:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element72:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element73:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element74:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element75:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element76:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element77:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element78:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element79:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element80:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element81:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element82:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element83:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element84:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element85:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element86:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element87:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element88:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element89:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element90:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element91:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element92:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element93:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element94:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element95:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element96:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element97:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element98:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element99:num\\\\\\\":\\\\\\\"1.00\\\\\\\"}\\\",\\\"Params:struct\\\":\\\"{}\\\",\\\"XParams:struct\\\":\\\"{}\\\",\\\"SParams:struct\\\":\\\"{}\\\",\\\"PassiveStates:arraynum\\\":\\\"[]\\\",\\\"Equipment\\\":\\\"\\\",\\\"Wtypes:arraynum\\\":\\\"[]\\\",\\\"Atypes:arraynum\\\":\\\"[]\\\",\\\"EnemyRewards\\\":\\\"\\\",\\\"EXPRate:num\\\":\\\"1.00\\\",\\\"GoldRate:num\\\":\\\"1.00\\\",\\\"DropRate:num\\\":\\\"1.00\\\"}\"]"}
 *
 * @param Gender:struct
 * @text Gender Sets
 * @parent TraitSetSettings:struct
 * @type struct<TraitSetType>
 * @desc The settings for the Main Element Trait Set Type.
 * @default {"Name:str":"Gender","Label:str":"Gender","Visible:eval":"true","RandomizeActor:eval":"false","RandomizeEnemy:eval":"false","Default:struct":"{\"Name:str\":\"Unknown\",\"Display:str\":\"\\\\I[160]Unknown\",\"Description:json\":\"\\\"Uncertain to this unit's gender.\\\"\",\"FmtText:str\":\"\",\"RandomValid:eval\":\"false\",\"RandomWeight:num\":\"1\",\"Traits\":\"\",\"ElementRate:struct\":\"{}\",\"Params:struct\":\"{}\",\"XParams:struct\":\"{}\",\"SParams:struct\":\"{}\",\"PassiveStates:arraynum\":\"[]\",\"Equipment\":\"\",\"Wtypes:arraynum\":\"[]\",\"Atypes:arraynum\":\"[]\",\"EnemyRewards\":\"\",\"EXPRate:num\":\"1.00\",\"GoldRate:num\":\"1.00\",\"DropRate:num\":\"1.00\"}","List:arraystruct":"[\"{\\\"Name:str\\\":\\\"Male\\\",\\\"Display:str\\\":\\\"\\\\\\\\I[165]Male\\\",\\\"Description:json\\\":\\\"\\\\\\\"This unit has stronger physical attributes.\\\\\\\\nThis unit has weaker magical attributes.\\\\\\\"\\\",\\\"FmtText:str\\\":\\\"♂\\\",\\\"RandomValid:eval\\\":\\\"true\\\",\\\"RandomWeight:num\\\":\\\"50\\\",\\\"Traits\\\":\\\"\\\",\\\"ElementRate:struct\\\":\\\"{}\\\",\\\"Params:struct\\\":\\\"{\\\\\\\"Param0:num\\\\\\\":\\\\\\\"1.05\\\\\\\",\\\\\\\"Param1:num\\\\\\\":\\\\\\\"0.95\\\\\\\",\\\\\\\"Param2:num\\\\\\\":\\\\\\\"1.05\\\\\\\",\\\\\\\"Param3:num\\\\\\\":\\\\\\\"1.05\\\\\\\",\\\\\\\"Param4:num\\\\\\\":\\\\\\\"0.95\\\\\\\",\\\\\\\"Param5:num\\\\\\\":\\\\\\\"0.95\\\\\\\",\\\\\\\"Param6:num\\\\\\\":\\\\\\\"1.05\\\\\\\",\\\\\\\"Param7:num\\\\\\\":\\\\\\\"0.95\\\\\\\"}\\\",\\\"XParams:struct\\\":\\\"{}\\\",\\\"SParams:struct\\\":\\\"{}\\\",\\\"PassiveStates:arraynum\\\":\\\"[]\\\",\\\"Equipment\\\":\\\"\\\",\\\"Wtypes:arraynum\\\":\\\"[]\\\",\\\"Atypes:arraynum\\\":\\\"[]\\\",\\\"EnemyRewards\\\":\\\"\\\",\\\"EXPRate:num\\\":\\\"1.00\\\",\\\"GoldRate:num\\\":\\\"1.00\\\",\\\"DropRate:num\\\":\\\"1.00\\\"}\",\"{\\\"Name:str\\\":\\\"Female\\\",\\\"Display:str\\\":\\\"\\\\\\\\I[162]Female\\\",\\\"Description:json\\\":\\\"\\\\\\\"This unit has stronger magical attributes.\\\\\\\\nThis unit has weaker physical attributes.\\\\\\\"\\\",\\\"FmtText:str\\\":\\\"♀\\\",\\\"RandomValid:eval\\\":\\\"true\\\",\\\"RandomWeight:num\\\":\\\"50\\\",\\\"Traits\\\":\\\"\\\",\\\"ElementRate:struct\\\":\\\"{}\\\",\\\"Params:struct\\\":\\\"{\\\\\\\"Param0:num\\\\\\\":\\\\\\\"0.95\\\\\\\",\\\\\\\"Param1:num\\\\\\\":\\\\\\\"1.05\\\\\\\",\\\\\\\"Param2:num\\\\\\\":\\\\\\\"0.95\\\\\\\",\\\\\\\"Param3:num\\\\\\\":\\\\\\\"0.95\\\\\\\",\\\\\\\"Param4:num\\\\\\\":\\\\\\\"1.05\\\\\\\",\\\\\\\"Param5:num\\\\\\\":\\\\\\\"1.05\\\\\\\",\\\\\\\"Param6:num\\\\\\\":\\\\\\\"0.95\\\\\\\",\\\\\\\"Param7:num\\\\\\\":\\\\\\\"1.05\\\\\\\"}\\\",\\\"XParams:struct\\\":\\\"{}\\\",\\\"SParams:struct\\\":\\\"{}\\\",\\\"PassiveStates:arraynum\\\":\\\"[]\\\",\\\"Equipment\\\":\\\"\\\",\\\"Wtypes:arraynum\\\":\\\"[]\\\",\\\"Atypes:arraynum\\\":\\\"[]\\\",\\\"EnemyRewards\\\":\\\"\\\",\\\"EXPRate:num\\\":\\\"1.00\\\",\\\"GoldRate:num\\\":\\\"1.00\\\",\\\"DropRate:num\\\":\\\"1.00\\\"}\",\"{\\\"Name:str\\\":\\\"Both\\\",\\\"Display:str\\\":\\\"\\\\\\\\I[84]Both\\\",\\\"Description:json\\\":\\\"\\\\\\\"This unit has increased attributes.\\\\\\\"\\\",\\\"FmtText:str\\\":\\\"⚥\\\",\\\"RandomValid:eval\\\":\\\"false\\\",\\\"RandomWeight:num\\\":\\\"1\\\",\\\"Traits\\\":\\\"\\\",\\\"ElementRate:struct\\\":\\\"{}\\\",\\\"Params:struct\\\":\\\"{\\\\\\\"Param0:num\\\\\\\":\\\\\\\"1.10\\\\\\\",\\\\\\\"Param1:num\\\\\\\":\\\\\\\"1.10\\\\\\\",\\\\\\\"Param2:num\\\\\\\":\\\\\\\"1.10\\\\\\\",\\\\\\\"Param3:num\\\\\\\":\\\\\\\"1.10\\\\\\\",\\\\\\\"Param4:num\\\\\\\":\\\\\\\"1.10\\\\\\\",\\\\\\\"Param5:num\\\\\\\":\\\\\\\"1.10\\\\\\\",\\\\\\\"Param6:num\\\\\\\":\\\\\\\"1.10\\\\\\\",\\\\\\\"Param7:num\\\\\\\":\\\\\\\"1.10\\\\\\\"}\\\",\\\"XParams:struct\\\":\\\"{}\\\",\\\"SParams:struct\\\":\\\"{}\\\",\\\"PassiveStates:arraynum\\\":\\\"[]\\\",\\\"Equipment\\\":\\\"\\\",\\\"Wtypes:arraynum\\\":\\\"[]\\\",\\\"Atypes:arraynum\\\":\\\"[]\\\",\\\"EnemyRewards\\\":\\\"\\\",\\\"EXPRate:num\\\":\\\"1.00\\\",\\\"GoldRate:num\\\":\\\"1.00\\\",\\\"DropRate:num\\\":\\\"1.00\\\"}\"]"}
 *
 * @param Race:struct
 * @text Race Sets
 * @parent TraitSetSettings:struct
 * @type struct<TraitSetType>
 * @desc The settings for the Main Element Trait Set Type.
 * @default {"Name:str":"Race","Label:str":"Race","Visible:eval":"true","RandomizeActor:eval":"false","RandomizeEnemy:eval":"false","Default:struct":"{\"Name:str\":\"Uncategorized\",\"Display:str\":\"\\\\I[16]Uncategorized\",\"Description:json\":\"\\\"This race's attributes have not been determined.\\\"\",\"FmtText:str\":\"\",\"RandomValid:eval\":\"true\",\"RandomWeight:num\":\"1\",\"Traits\":\"\",\"ElementRate:struct\":\"{}\",\"Params:struct\":\"{}\",\"XParams:struct\":\"{}\",\"SParams:struct\":\"{}\",\"PassiveStates:arraynum\":\"[]\",\"Equipment\":\"\",\"Wtypes:arraynum\":\"[]\",\"Atypes:arraynum\":\"[]\",\"EnemyRewards\":\"\",\"EXPRate:num\":\"1.00\",\"GoldRate:num\":\"1.00\",\"DropRate:num\":\"1.00\"}","List:arraystruct":"[\"{\\\"Name:str\\\":\\\"Human\\\",\\\"Display:str\\\":\\\"\\\\\\\\I[82]Human\\\",\\\"Description:json\\\":\\\"\\\\\\\"This race has neutral attributes.\\\\\\\"\\\",\\\"FmtText:str\\\":\\\"Human\\\",\\\"RandomValid:eval\\\":\\\"true\\\",\\\"RandomWeight:num\\\":\\\"1\\\",\\\"Traits\\\":\\\"\\\",\\\"ElementRate:struct\\\":\\\"{}\\\",\\\"Params:struct\\\":\\\"{}\\\",\\\"XParams:struct\\\":\\\"{}\\\",\\\"SParams:struct\\\":\\\"{}\\\",\\\"PassiveStates:arraynum\\\":\\\"[]\\\",\\\"Equipment\\\":\\\"\\\",\\\"Wtypes:arraynum\\\":\\\"[]\\\",\\\"Atypes:arraynum\\\":\\\"[]\\\",\\\"EnemyRewards\\\":\\\"\\\",\\\"EXPRate:num\\\":\\\"1.00\\\",\\\"GoldRate:num\\\":\\\"1.00\\\",\\\"DropRate:num\\\":\\\"1.00\\\"}\",\"{\\\"Name:str\\\":\\\"High Elf\\\",\\\"Display:str\\\":\\\"\\\\\\\\I[101]High Elf\\\",\\\"Description:json\\\":\\\"\\\\\\\"High Elves have more MaxMP and less MaxHP.\\\\\\\\nHigh Elves can equip Canes and Magic Armor.\\\\\\\"\\\",\\\"FmtText:str\\\":\\\"High Elven\\\",\\\"RandomValid:eval\\\":\\\"true\\\",\\\"RandomWeight:num\\\":\\\"1\\\",\\\"Traits\\\":\\\"\\\",\\\"ElementRate:struct\\\":\\\"{}\\\",\\\"Params:struct\\\":\\\"{\\\\\\\"Param0:num\\\\\\\":\\\\\\\"0.90\\\\\\\",\\\\\\\"Param1:num\\\\\\\":\\\\\\\"1.10\\\\\\\",\\\\\\\"Param2:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Param3:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Param4:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Param5:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Param6:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Param7:num\\\\\\\":\\\\\\\"1.00\\\\\\\"}\\\",\\\"XParams:struct\\\":\\\"{}\\\",\\\"SParams:struct\\\":\\\"{}\\\",\\\"PassiveStates:arraynum\\\":\\\"[]\\\",\\\"Equipment\\\":\\\"\\\",\\\"Wtypes:arraynum\\\":\\\"[\\\\\\\"6\\\\\\\"]\\\",\\\"Atypes:arraynum\\\":\\\"[\\\\\\\"2\\\\\\\"]\\\",\\\"EnemyRewards\\\":\\\"\\\",\\\"EXPRate:num\\\":\\\"1.00\\\",\\\"GoldRate:num\\\":\\\"1.00\\\",\\\"DropRate:num\\\":\\\"1.00\\\"}\",\"{\\\"Name:str\\\":\\\"Wood Elf\\\",\\\"Display:str\\\":\\\"\\\\\\\\I[102]Wood Elf\\\",\\\"Description:json\\\":\\\"\\\\\\\"Wood Elves have more AGI and less DEF.\\\\\\\\nWood Elves can equip Bows and Crossbows.\\\\\\\"\\\",\\\"FmtText:str\\\":\\\"Wood Elven\\\",\\\"RandomValid:eval\\\":\\\"true\\\",\\\"RandomWeight:num\\\":\\\"1\\\",\\\"Traits\\\":\\\"\\\",\\\"ElementRate:struct\\\":\\\"{}\\\",\\\"Params:struct\\\":\\\"{\\\\\\\"Param0:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Param1:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Param2:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Param3:num\\\\\\\":\\\\\\\"0.90\\\\\\\",\\\\\\\"Param4:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Param5:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Param6:num\\\\\\\":\\\\\\\"1.10\\\\\\\",\\\\\\\"Param7:num\\\\\\\":\\\\\\\"1.00\\\\\\\"}\\\",\\\"XParams:struct\\\":\\\"{}\\\",\\\"SParams:struct\\\":\\\"{}\\\",\\\"PassiveStates:arraynum\\\":\\\"[]\\\",\\\"Equipment\\\":\\\"\\\",\\\"Wtypes:arraynum\\\":\\\"[\\\\\\\"7\\\\\\\",\\\\\\\"8\\\\\\\"]\\\",\\\"Atypes:arraynum\\\":\\\"[]\\\",\\\"EnemyRewards\\\":\\\"\\\",\\\"EXPRate:num\\\":\\\"1.00\\\",\\\"GoldRate:num\\\":\\\"1.00\\\",\\\"DropRate:num\\\":\\\"1.00\\\"}\",\"{\\\"Name:str\\\":\\\"Dark Elf\\\",\\\"Display:str\\\":\\\"\\\\\\\\I[71]Dark Elf\\\",\\\"Description:json\\\":\\\"\\\\\\\"Dark Elves have more ATK and less MAT.\\\\\\\\nDark Elves can equip Daggers and Swords.\\\\\\\"\\\",\\\"FmtText:str\\\":\\\"Dark Elven\\\",\\\"RandomValid:eval\\\":\\\"true\\\",\\\"RandomWeight:num\\\":\\\"1\\\",\\\"Traits\\\":\\\"\\\",\\\"ElementRate:struct\\\":\\\"{}\\\",\\\"Params:struct\\\":\\\"{\\\\\\\"Param0:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Param1:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Param2:num\\\\\\\":\\\\\\\"1.10\\\\\\\",\\\\\\\"Param3:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Param4:num\\\\\\\":\\\\\\\"0.90\\\\\\\",\\\\\\\"Param5:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Param6:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Param7:num\\\\\\\":\\\\\\\"1.00\\\\\\\"}\\\",\\\"XParams:struct\\\":\\\"{}\\\",\\\"SParams:struct\\\":\\\"{}\\\",\\\"PassiveStates:arraynum\\\":\\\"[]\\\",\\\"Equipment\\\":\\\"\\\",\\\"Wtypes:arraynum\\\":\\\"[\\\\\\\"1\\\\\\\",\\\\\\\"2\\\\\\\"]\\\",\\\"Atypes:arraynum\\\":\\\"[]\\\",\\\"EnemyRewards\\\":\\\"\\\",\\\"EXPRate:num\\\":\\\"1.00\\\",\\\"GoldRate:num\\\":\\\"1.00\\\",\\\"DropRate:num\\\":\\\"1.00\\\"}\",\"{\\\"Name:str\\\":\\\"Dwarf\\\",\\\"Display:str\\\":\\\"\\\\\\\\I[223]Dwarf\\\",\\\"Description:json\\\":\\\"\\\\\\\"Dwarves have more MaxHP and less AGI.\\\\\\\\nDwarves can equip Flails and Heavy Armor.\\\\\\\"\\\",\\\"FmtText:str\\\":\\\"Dwarvin\\\",\\\"RandomValid:eval\\\":\\\"true\\\",\\\"RandomWeight:num\\\":\\\"1\\\",\\\"Traits\\\":\\\"\\\",\\\"ElementRate:struct\\\":\\\"{}\\\",\\\"Params:struct\\\":\\\"{\\\\\\\"Param0:num\\\\\\\":\\\\\\\"1.10\\\\\\\",\\\\\\\"Param1:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Param2:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Param3:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Param4:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Param5:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Param6:num\\\\\\\":\\\\\\\"0.90\\\\\\\",\\\\\\\"Param7:num\\\\\\\":\\\\\\\"1.00\\\\\\\"}\\\",\\\"XParams:struct\\\":\\\"{}\\\",\\\"SParams:struct\\\":\\\"{}\\\",\\\"PassiveStates:arraynum\\\":\\\"[]\\\",\\\"Equipment\\\":\\\"\\\",\\\"Wtypes:arraynum\\\":\\\"[\\\\\\\"3\\\\\\\"]\\\",\\\"Atypes:arraynum\\\":\\\"[\\\\\\\"4\\\\\\\"]\\\",\\\"EnemyRewards\\\":\\\"\\\",\\\"EXPRate:num\\\":\\\"1.00\\\",\\\"GoldRate:num\\\":\\\"1.00\\\",\\\"DropRate:num\\\":\\\"1.00\\\"}\",\"{\\\"Name:str\\\":\\\"Gnome\\\",\\\"Display:str\\\":\\\"\\\\\\\\I[140]Gnome\\\",\\\"Description:json\\\":\\\"\\\\\\\"Gnomes have more AGI and less DEF.\\\\\\\\nGnomes can equip Daggers and Light Armor.\\\\\\\"\\\",\\\"FmtText:str\\\":\\\"Gnomish\\\",\\\"RandomValid:eval\\\":\\\"true\\\",\\\"RandomWeight:num\\\":\\\"1\\\",\\\"Traits\\\":\\\"\\\",\\\"ElementRate:struct\\\":\\\"{}\\\",\\\"Params:struct\\\":\\\"{\\\\\\\"Param0:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Param1:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Param2:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Param3:num\\\\\\\":\\\\\\\"0.90\\\\\\\",\\\\\\\"Param4:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Param5:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Param6:num\\\\\\\":\\\\\\\"1.10\\\\\\\",\\\\\\\"Param7:num\\\\\\\":\\\\\\\"1.00\\\\\\\"}\\\",\\\"XParams:struct\\\":\\\"{}\\\",\\\"SParams:struct\\\":\\\"{}\\\",\\\"PassiveStates:arraynum\\\":\\\"[]\\\",\\\"Equipment\\\":\\\"\\\",\\\"Wtypes:arraynum\\\":\\\"[\\\\\\\"1\\\\\\\"]\\\",\\\"Atypes:arraynum\\\":\\\"[\\\\\\\"3\\\\\\\"]\\\",\\\"EnemyRewards\\\":\\\"\\\",\\\"EXPRate:num\\\":\\\"1.00\\\",\\\"GoldRate:num\\\":\\\"1.00\\\",\\\"DropRate:num\\\":\\\"1.00\\\"}\",\"{\\\"Name:str\\\":\\\"Halfling\\\",\\\"Display:str\\\":\\\"\\\\\\\\I[142]Halfling\\\",\\\"Description:json\\\":\\\"\\\\\\\"Halflings have more LUK and less MaxMP.\\\\\\\\nHalflings can equip Sword and Small Shields.\\\\\\\"\\\",\\\"FmtText:str\\\":\\\"Hafling\\\",\\\"RandomValid:eval\\\":\\\"true\\\",\\\"RandomWeight:num\\\":\\\"1\\\",\\\"Traits\\\":\\\"\\\",\\\"ElementRate:struct\\\":\\\"{}\\\",\\\"Params:struct\\\":\\\"{\\\\\\\"Param0:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Param1:num\\\\\\\":\\\\\\\"0.90\\\\\\\",\\\\\\\"Param2:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Param3:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Param4:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Param5:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Param6:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Param7:num\\\\\\\":\\\\\\\"1.10\\\\\\\"}\\\",\\\"XParams:struct\\\":\\\"{}\\\",\\\"SParams:struct\\\":\\\"{}\\\",\\\"PassiveStates:arraynum\\\":\\\"[]\\\",\\\"Equipment\\\":\\\"\\\",\\\"Wtypes:arraynum\\\":\\\"[\\\\\\\"2\\\\\\\"]\\\",\\\"Atypes:arraynum\\\":\\\"[\\\\\\\"5\\\\\\\"]\\\",\\\"EnemyRewards\\\":\\\"\\\",\\\"EXPRate:num\\\":\\\"1.00\\\",\\\"GoldRate:num\\\":\\\"1.00\\\",\\\"DropRate:num\\\":\\\"1.00\\\"}\",\"{\\\"Name:str\\\":\\\"Wolfkin\\\",\\\"Display:str\\\":\\\"\\\\\\\\I[105]Wolfkin\\\",\\\"Description:json\\\":\\\"\\\\\\\"Wolfkin have more ATK and less MAT.\\\\\\\\nWolfkin can equip Claws and Gloves.\\\\\\\"\\\",\\\"FmtText:str\\\":\\\"Wolfkin\\\",\\\"RandomValid:eval\\\":\\\"true\\\",\\\"RandomWeight:num\\\":\\\"1\\\",\\\"Traits\\\":\\\"\\\",\\\"ElementRate:struct\\\":\\\"{}\\\",\\\"Params:struct\\\":\\\"{\\\\\\\"Param0:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Param1:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Param2:num\\\\\\\":\\\\\\\"1.10\\\\\\\",\\\\\\\"Param3:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Param4:num\\\\\\\":\\\\\\\"0.90\\\\\\\",\\\\\\\"Param5:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Param6:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Param7:num\\\\\\\":\\\\\\\"1.00\\\\\\\"}\\\",\\\"XParams:struct\\\":\\\"{}\\\",\\\"SParams:struct\\\":\\\"{}\\\",\\\"PassiveStates:arraynum\\\":\\\"[]\\\",\\\"Equipment\\\":\\\"\\\",\\\"Wtypes:arraynum\\\":\\\"[\\\\\\\"10\\\\\\\",\\\\\\\"11\\\\\\\"]\\\",\\\"Atypes:arraynum\\\":\\\"[]\\\",\\\"EnemyRewards\\\":\\\"\\\",\\\"EXPRate:num\\\":\\\"1.00\\\",\\\"GoldRate:num\\\":\\\"1.00\\\",\\\"DropRate:num\\\":\\\"1.00\\\"}\",\"{\\\"Name:str\\\":\\\"Felyne\\\",\\\"Display:str\\\":\\\"\\\\\\\\I[100]Felyne\\\",\\\"Description:json\\\":\\\"\\\\\\\"Felyne have more MAT and less ATK.\\\\\\\\nFelyne can equip Whips and Canes.\\\\\\\"\\\",\\\"FmtText:str\\\":\\\"Felyne\\\",\\\"RandomValid:eval\\\":\\\"true\\\",\\\"RandomWeight:num\\\":\\\"1\\\",\\\"Traits\\\":\\\"\\\",\\\"ElementRate:struct\\\":\\\"{}\\\",\\\"Params:struct\\\":\\\"{\\\\\\\"Param0:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Param1:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Param2:num\\\\\\\":\\\\\\\"0.90\\\\\\\",\\\\\\\"Param3:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Param4:num\\\\\\\":\\\\\\\"1.10\\\\\\\",\\\\\\\"Param5:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Param6:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Param7:num\\\\\\\":\\\\\\\"1.00\\\\\\\"}\\\",\\\"XParams:struct\\\":\\\"{}\\\",\\\"SParams:struct\\\":\\\"{}\\\",\\\"PassiveStates:arraynum\\\":\\\"[]\\\",\\\"Equipment\\\":\\\"\\\",\\\"Wtypes:arraynum\\\":\\\"[\\\\\\\"5\\\\\\\",\\\\\\\"6\\\\\\\"]\\\",\\\"Atypes:arraynum\\\":\\\"[]\\\",\\\"EnemyRewards\\\":\\\"\\\",\\\"EXPRate:num\\\":\\\"1.00\\\",\\\"GoldRate:num\\\":\\\"1.00\\\",\\\"DropRate:num\\\":\\\"1.00\\\"}\",\"{\\\"Name:str\\\":\\\"Lizardman\\\",\\\"Display:str\\\":\\\"\\\\\\\\I[99]Lizardman\\\",\\\"Description:json\\\":\\\"\\\\\\\"Lizardmen have more DEF and less LUK.\\\\\\\\nLizardmen can equip Axes and Spears.\\\\\\\"\\\",\\\"FmtText:str\\\":\\\"Lizardman\\\",\\\"RandomValid:eval\\\":\\\"true\\\",\\\"RandomWeight:num\\\":\\\"1\\\",\\\"Traits\\\":\\\"\\\",\\\"ElementRate:struct\\\":\\\"{}\\\",\\\"Params:struct\\\":\\\"{\\\\\\\"Param0:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Param1:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Param2:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Param3:num\\\\\\\":\\\\\\\"1.10\\\\\\\",\\\\\\\"Param4:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Param5:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Param6:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Param7:num\\\\\\\":\\\\\\\"0.90\\\\\\\"}\\\",\\\"XParams:struct\\\":\\\"{}\\\",\\\"SParams:struct\\\":\\\"{}\\\",\\\"PassiveStates:arraynum\\\":\\\"[]\\\",\\\"Equipment\\\":\\\"\\\",\\\"Wtypes:arraynum\\\":\\\"[\\\\\\\"4\\\\\\\",\\\\\\\"12\\\\\\\"]\\\",\\\"Atypes:arraynum\\\":\\\"[]\\\",\\\"EnemyRewards\\\":\\\"\\\",\\\"EXPRate:num\\\":\\\"1.00\\\",\\\"GoldRate:num\\\":\\\"1.00\\\",\\\"DropRate:num\\\":\\\"1.00\\\"}\"]"}
 *
 * @param Nature:struct
 * @text Nature Sets
 * @parent TraitSetSettings:struct
 * @type struct<TraitSetType>
 * @desc The settings for the Main Element Trait Set Type.
 * @default {"Name:str":"Nature","Label:str":"Nature","Visible:eval":"true","RandomizeActor:eval":"false","RandomizeEnemy:eval":"false","Default:struct":"{\"Name:str\":\"Chill\",\"Display:str\":\"\\\\I[84]Chill\",\"Description:json\":\"\\\"This unit has neutral parameters.\\\"\",\"FmtText:str\":\"Chill\",\"RandomValid:eval\":\"false\",\"RandomWeight:num\":\"1\",\"Traits\":\"\",\"ElementRate:struct\":\"{}\",\"Params:struct\":\"{}\",\"XParams:struct\":\"{}\",\"SParams:struct\":\"{}\",\"PassiveStates:arraynum\":\"[]\",\"Equipment\":\"\",\"Wtypes:arraynum\":\"[]\",\"Atypes:arraynum\":\"[]\",\"EnemyRewards\":\"\",\"EXPRate:num\":\"1.00\",\"GoldRate:num\":\"1.00\",\"DropRate:num\":\"1.00\"}","List:arraystruct":"[\"{\\\"Name:str\\\":\\\"Hardy\\\",\\\"Display:str\\\":\\\"\\\\\\\\I[34]\\\\\\\\I[50]Hardy\\\",\\\"Description:json\\\":\\\"\\\\\\\"This unit has neutral parameters.\\\\\\\"\\\",\\\"FmtText:str\\\":\\\"Hardy\\\",\\\"RandomValid:eval\\\":\\\"true\\\",\\\"RandomWeight:num\\\":\\\"1\\\",\\\"Traits\\\":\\\"\\\",\\\"ElementRate:struct\\\":\\\"{}\\\",\\\"Params:struct\\\":\\\"{}\\\",\\\"XParams:struct\\\":\\\"{}\\\",\\\"SParams:struct\\\":\\\"{}\\\",\\\"PassiveStates:arraynum\\\":\\\"[]\\\",\\\"Equipment\\\":\\\"\\\",\\\"Wtypes:arraynum\\\":\\\"[]\\\",\\\"Atypes:arraynum\\\":\\\"[]\\\",\\\"EnemyRewards\\\":\\\"\\\",\\\"EXPRate:num\\\":\\\"1.00\\\",\\\"GoldRate:num\\\":\\\"1.00\\\",\\\"DropRate:num\\\":\\\"1.00\\\"}\",\"{\\\"Name:str\\\":\\\"Lonely\\\",\\\"Display:str\\\":\\\"\\\\\\\\I[34]\\\\\\\\I[51]Lonely\\\",\\\"Description:json\\\":\\\"\\\\\\\"This unit has more ATK and less DEF.\\\\\\\"\\\",\\\"FmtText:str\\\":\\\"Lonely\\\",\\\"RandomValid:eval\\\":\\\"true\\\",\\\"RandomWeight:num\\\":\\\"1\\\",\\\"Traits\\\":\\\"\\\",\\\"ElementRate:struct\\\":\\\"{}\\\",\\\"Params:struct\\\":\\\"{\\\\\\\"Param0:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Param1:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Param2:num\\\\\\\":\\\\\\\"1.10\\\\\\\",\\\\\\\"Param3:num\\\\\\\":\\\\\\\"0.90\\\\\\\",\\\\\\\"Param4:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Param5:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Param6:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Param7:num\\\\\\\":\\\\\\\"1.00\\\\\\\"}\\\",\\\"XParams:struct\\\":\\\"{}\\\",\\\"SParams:struct\\\":\\\"{}\\\",\\\"PassiveStates:arraynum\\\":\\\"[]\\\",\\\"Equipment\\\":\\\"\\\",\\\"Wtypes:arraynum\\\":\\\"[]\\\",\\\"Atypes:arraynum\\\":\\\"[]\\\",\\\"EnemyRewards\\\":\\\"\\\",\\\"EXPRate:num\\\":\\\"1.00\\\",\\\"GoldRate:num\\\":\\\"1.00\\\",\\\"DropRate:num\\\":\\\"1.00\\\"}\",\"{\\\"Name:str\\\":\\\"Adamant\\\",\\\"Display:str\\\":\\\"\\\\\\\\I[34]\\\\\\\\I[52]Adamant\\\",\\\"Description:json\\\":\\\"\\\\\\\"This unit has more ATK and less MAT.\\\\\\\"\\\",\\\"FmtText:str\\\":\\\"Adamant\\\",\\\"RandomValid:eval\\\":\\\"true\\\",\\\"RandomWeight:num\\\":\\\"1\\\",\\\"Traits\\\":\\\"\\\",\\\"ElementRate:struct\\\":\\\"{}\\\",\\\"Params:struct\\\":\\\"{\\\\\\\"Param0:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Param1:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Param2:num\\\\\\\":\\\\\\\"1.10\\\\\\\",\\\\\\\"Param3:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Param4:num\\\\\\\":\\\\\\\"0.90\\\\\\\",\\\\\\\"Param5:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Param6:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Param7:num\\\\\\\":\\\\\\\"1.00\\\\\\\"}\\\",\\\"XParams:struct\\\":\\\"{}\\\",\\\"SParams:struct\\\":\\\"{}\\\",\\\"PassiveStates:arraynum\\\":\\\"[]\\\",\\\"Equipment\\\":\\\"\\\",\\\"Wtypes:arraynum\\\":\\\"[]\\\",\\\"Atypes:arraynum\\\":\\\"[]\\\",\\\"EnemyRewards\\\":\\\"\\\",\\\"EXPRate:num\\\":\\\"1.00\\\",\\\"GoldRate:num\\\":\\\"1.00\\\",\\\"DropRate:num\\\":\\\"1.00\\\"}\",\"{\\\"Name:str\\\":\\\"Naughty\\\",\\\"Display:str\\\":\\\"\\\\\\\\I[34]\\\\\\\\I[53]Naughty\\\",\\\"Description:json\\\":\\\"\\\\\\\"This unit has more ATK and less MDF.\\\\\\\"\\\",\\\"FmtText:str\\\":\\\"Naughty\\\",\\\"RandomValid:eval\\\":\\\"true\\\",\\\"RandomWeight:num\\\":\\\"1\\\",\\\"Traits\\\":\\\"\\\",\\\"ElementRate:struct\\\":\\\"{}\\\",\\\"Params:struct\\\":\\\"{\\\\\\\"Param0:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Param1:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Param2:num\\\\\\\":\\\\\\\"1.10\\\\\\\",\\\\\\\"Param3:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Param4:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Param5:num\\\\\\\":\\\\\\\"0.90\\\\\\\",\\\\\\\"Param6:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Param7:num\\\\\\\":\\\\\\\"1.00\\\\\\\"}\\\",\\\"XParams:struct\\\":\\\"{}\\\",\\\"SParams:struct\\\":\\\"{}\\\",\\\"PassiveStates:arraynum\\\":\\\"[]\\\",\\\"Equipment\\\":\\\"\\\",\\\"Wtypes:arraynum\\\":\\\"[]\\\",\\\"Atypes:arraynum\\\":\\\"[]\\\",\\\"EnemyRewards\\\":\\\"\\\",\\\"EXPRate:num\\\":\\\"1.00\\\",\\\"GoldRate:num\\\":\\\"1.00\\\",\\\"DropRate:num\\\":\\\"1.00\\\"}\",\"{\\\"Name:str\\\":\\\"Brave\\\",\\\"Display:str\\\":\\\"\\\\\\\\I[34]\\\\\\\\I[54]Brave\\\",\\\"Description:json\\\":\\\"\\\\\\\"This unit has more ATK and less AGI.\\\\\\\"\\\",\\\"FmtText:str\\\":\\\"Brave\\\",\\\"RandomValid:eval\\\":\\\"true\\\",\\\"RandomWeight:num\\\":\\\"1\\\",\\\"Traits\\\":\\\"\\\",\\\"ElementRate:struct\\\":\\\"{}\\\",\\\"Params:struct\\\":\\\"{\\\\\\\"Param0:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Param1:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Param2:num\\\\\\\":\\\\\\\"1.10\\\\\\\",\\\\\\\"Param3:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Param4:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Param5:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Param6:num\\\\\\\":\\\\\\\"0.90\\\\\\\",\\\\\\\"Param7:num\\\\\\\":\\\\\\\"1.00\\\\\\\"}\\\",\\\"XParams:struct\\\":\\\"{}\\\",\\\"SParams:struct\\\":\\\"{}\\\",\\\"PassiveStates:arraynum\\\":\\\"[]\\\",\\\"Equipment\\\":\\\"\\\",\\\"Wtypes:arraynum\\\":\\\"[]\\\",\\\"Atypes:arraynum\\\":\\\"[]\\\",\\\"EnemyRewards\\\":\\\"\\\",\\\"EXPRate:num\\\":\\\"1.00\\\",\\\"GoldRate:num\\\":\\\"1.00\\\",\\\"DropRate:num\\\":\\\"1.00\\\"}\",\"{\\\"Name:str\\\":\\\"Bold\\\",\\\"Display:str\\\":\\\"\\\\\\\\I[35]\\\\\\\\I[50]Bold\\\",\\\"Description:json\\\":\\\"\\\\\\\"This unit has more DEF and less ATK.\\\\\\\"\\\",\\\"FmtText:str\\\":\\\"Bold\\\",\\\"RandomValid:eval\\\":\\\"true\\\",\\\"RandomWeight:num\\\":\\\"1\\\",\\\"Traits\\\":\\\"\\\",\\\"ElementRate:struct\\\":\\\"{}\\\",\\\"Params:struct\\\":\\\"{\\\\\\\"Param0:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Param1:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Param2:num\\\\\\\":\\\\\\\"0.90\\\\\\\",\\\\\\\"Param3:num\\\\\\\":\\\\\\\"1.10\\\\\\\",\\\\\\\"Param4:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Param5:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Param6:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Param7:num\\\\\\\":\\\\\\\"1.00\\\\\\\"}\\\",\\\"XParams:struct\\\":\\\"{}\\\",\\\"SParams:struct\\\":\\\"{}\\\",\\\"PassiveStates:arraynum\\\":\\\"[]\\\",\\\"Equipment\\\":\\\"\\\",\\\"Wtypes:arraynum\\\":\\\"[]\\\",\\\"Atypes:arraynum\\\":\\\"[]\\\",\\\"EnemyRewards\\\":\\\"\\\",\\\"EXPRate:num\\\":\\\"1.00\\\",\\\"GoldRate:num\\\":\\\"1.00\\\",\\\"DropRate:num\\\":\\\"1.00\\\"}\",\"{\\\"Name:str\\\":\\\"Docile\\\",\\\"Display:str\\\":\\\"\\\\\\\\I[35]\\\\\\\\I[51]Docile\\\",\\\"Description:json\\\":\\\"\\\\\\\"This unit has neutral parameters.\\\\\\\"\\\",\\\"FmtText:str\\\":\\\"Docile\\\",\\\"RandomValid:eval\\\":\\\"true\\\",\\\"RandomWeight:num\\\":\\\"1\\\",\\\"Traits\\\":\\\"\\\",\\\"ElementRate:struct\\\":\\\"{}\\\",\\\"Params:struct\\\":\\\"{}\\\",\\\"XParams:struct\\\":\\\"{}\\\",\\\"SParams:struct\\\":\\\"{}\\\",\\\"PassiveStates:arraynum\\\":\\\"[]\\\",\\\"Equipment\\\":\\\"\\\",\\\"Wtypes:arraynum\\\":\\\"[]\\\",\\\"Atypes:arraynum\\\":\\\"[]\\\",\\\"EnemyRewards\\\":\\\"\\\",\\\"EXPRate:num\\\":\\\"1.00\\\",\\\"GoldRate:num\\\":\\\"1.00\\\",\\\"DropRate:num\\\":\\\"1.00\\\"}\",\"{\\\"Name:str\\\":\\\"Impish\\\",\\\"Display:str\\\":\\\"\\\\\\\\I[35]\\\\\\\\I[52]Impish\\\",\\\"Description:json\\\":\\\"\\\\\\\"This unit has more DEF and less MAT.\\\\\\\"\\\",\\\"FmtText:str\\\":\\\"Impish\\\",\\\"RandomValid:eval\\\":\\\"true\\\",\\\"RandomWeight:num\\\":\\\"1\\\",\\\"Traits\\\":\\\"\\\",\\\"ElementRate:struct\\\":\\\"{}\\\",\\\"Params:struct\\\":\\\"{\\\\\\\"Param0:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Param1:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Param2:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Param3:num\\\\\\\":\\\\\\\"1.10\\\\\\\",\\\\\\\"Param4:num\\\\\\\":\\\\\\\"0.90\\\\\\\",\\\\\\\"Param5:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Param6:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Param7:num\\\\\\\":\\\\\\\"1.00\\\\\\\"}\\\",\\\"XParams:struct\\\":\\\"{}\\\",\\\"SParams:struct\\\":\\\"{}\\\",\\\"PassiveStates:arraynum\\\":\\\"[]\\\",\\\"Equipment\\\":\\\"\\\",\\\"Wtypes:arraynum\\\":\\\"[]\\\",\\\"Atypes:arraynum\\\":\\\"[]\\\",\\\"EnemyRewards\\\":\\\"\\\",\\\"EXPRate:num\\\":\\\"1.00\\\",\\\"GoldRate:num\\\":\\\"1.00\\\",\\\"DropRate:num\\\":\\\"1.00\\\"}\",\"{\\\"Name:str\\\":\\\"Lax\\\",\\\"Display:str\\\":\\\"\\\\\\\\I[35]\\\\\\\\I[53]Lax\\\",\\\"Description:json\\\":\\\"\\\\\\\"This unit has more DEF and less MDF.\\\\\\\"\\\",\\\"FmtText:str\\\":\\\"Lax\\\",\\\"RandomValid:eval\\\":\\\"true\\\",\\\"RandomWeight:num\\\":\\\"1\\\",\\\"Traits\\\":\\\"\\\",\\\"ElementRate:struct\\\":\\\"{}\\\",\\\"Params:struct\\\":\\\"{\\\\\\\"Param0:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Param1:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Param2:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Param3:num\\\\\\\":\\\\\\\"1.10\\\\\\\",\\\\\\\"Param4:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Param5:num\\\\\\\":\\\\\\\"0.90\\\\\\\",\\\\\\\"Param6:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Param7:num\\\\\\\":\\\\\\\"1.00\\\\\\\"}\\\",\\\"XParams:struct\\\":\\\"{}\\\",\\\"SParams:struct\\\":\\\"{}\\\",\\\"PassiveStates:arraynum\\\":\\\"[]\\\",\\\"Equipment\\\":\\\"\\\",\\\"Wtypes:arraynum\\\":\\\"[]\\\",\\\"Atypes:arraynum\\\":\\\"[]\\\",\\\"EnemyRewards\\\":\\\"\\\",\\\"EXPRate:num\\\":\\\"1.00\\\",\\\"GoldRate:num\\\":\\\"1.00\\\",\\\"DropRate:num\\\":\\\"1.00\\\"}\",\"{\\\"Name:str\\\":\\\"Relaxed\\\",\\\"Display:str\\\":\\\"\\\\\\\\I[35]\\\\\\\\I[54]Relaxed\\\",\\\"Description:json\\\":\\\"\\\\\\\"This unit has more DEF and less AGI.\\\\\\\"\\\",\\\"FmtText:str\\\":\\\"Relaxed\\\",\\\"RandomValid:eval\\\":\\\"true\\\",\\\"RandomWeight:num\\\":\\\"1\\\",\\\"Traits\\\":\\\"\\\",\\\"ElementRate:struct\\\":\\\"{}\\\",\\\"Params:struct\\\":\\\"{\\\\\\\"Param0:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Param1:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Param2:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Param3:num\\\\\\\":\\\\\\\"1.10\\\\\\\",\\\\\\\"Param4:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Param5:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Param6:num\\\\\\\":\\\\\\\"0.90\\\\\\\",\\\\\\\"Param7:num\\\\\\\":\\\\\\\"1.00\\\\\\\"}\\\",\\\"XParams:struct\\\":\\\"{}\\\",\\\"SParams:struct\\\":\\\"{}\\\",\\\"PassiveStates:arraynum\\\":\\\"[]\\\",\\\"Equipment\\\":\\\"\\\",\\\"Wtypes:arraynum\\\":\\\"[]\\\",\\\"Atypes:arraynum\\\":\\\"[]\\\",\\\"EnemyRewards\\\":\\\"\\\",\\\"EXPRate:num\\\":\\\"1.00\\\",\\\"GoldRate:num\\\":\\\"1.00\\\",\\\"DropRate:num\\\":\\\"1.00\\\"}\",\"{\\\"Name:str\\\":\\\"Modest\\\",\\\"Display:str\\\":\\\"\\\\\\\\I[36]\\\\\\\\I[50]Modest\\\",\\\"Description:json\\\":\\\"\\\\\\\"This unit has more MAT and less ATK.\\\\\\\"\\\",\\\"FmtText:str\\\":\\\"Modest\\\",\\\"RandomValid:eval\\\":\\\"true\\\",\\\"RandomWeight:num\\\":\\\"1\\\",\\\"Traits\\\":\\\"\\\",\\\"ElementRate:struct\\\":\\\"{}\\\",\\\"Params:struct\\\":\\\"{\\\\\\\"Param0:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Param1:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Param2:num\\\\\\\":\\\\\\\"0.90\\\\\\\",\\\\\\\"Param3:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Param4:num\\\\\\\":\\\\\\\"1.10\\\\\\\",\\\\\\\"Param5:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Param6:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Param7:num\\\\\\\":\\\\\\\"1.00\\\\\\\"}\\\",\\\"XParams:struct\\\":\\\"{}\\\",\\\"SParams:struct\\\":\\\"{}\\\",\\\"PassiveStates:arraynum\\\":\\\"[]\\\",\\\"Equipment\\\":\\\"\\\",\\\"Wtypes:arraynum\\\":\\\"[]\\\",\\\"Atypes:arraynum\\\":\\\"[]\\\",\\\"EnemyRewards\\\":\\\"\\\",\\\"EXPRate:num\\\":\\\"1.00\\\",\\\"GoldRate:num\\\":\\\"1.00\\\",\\\"DropRate:num\\\":\\\"1.00\\\"}\",\"{\\\"Name:str\\\":\\\"Mild\\\",\\\"Display:str\\\":\\\"\\\\\\\\I[36]\\\\\\\\I[51]Mild\\\",\\\"Description:json\\\":\\\"\\\\\\\"This unit has more MAT and less DEF.\\\\\\\"\\\",\\\"FmtText:str\\\":\\\"Mild\\\",\\\"RandomValid:eval\\\":\\\"true\\\",\\\"RandomWeight:num\\\":\\\"1\\\",\\\"Traits\\\":\\\"\\\",\\\"ElementRate:struct\\\":\\\"{}\\\",\\\"Params:struct\\\":\\\"{\\\\\\\"Param0:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Param1:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Param2:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Param3:num\\\\\\\":\\\\\\\"0.90\\\\\\\",\\\\\\\"Param4:num\\\\\\\":\\\\\\\"1.10\\\\\\\",\\\\\\\"Param5:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Param6:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Param7:num\\\\\\\":\\\\\\\"1.00\\\\\\\"}\\\",\\\"XParams:struct\\\":\\\"{}\\\",\\\"SParams:struct\\\":\\\"{}\\\",\\\"PassiveStates:arraynum\\\":\\\"[]\\\",\\\"Equipment\\\":\\\"\\\",\\\"Wtypes:arraynum\\\":\\\"[]\\\",\\\"Atypes:arraynum\\\":\\\"[]\\\",\\\"EnemyRewards\\\":\\\"\\\",\\\"EXPRate:num\\\":\\\"1.00\\\",\\\"GoldRate:num\\\":\\\"1.00\\\",\\\"DropRate:num\\\":\\\"1.00\\\"}\",\"{\\\"Name:str\\\":\\\"Bashful\\\",\\\"Display:str\\\":\\\"\\\\\\\\I[36]\\\\\\\\I[52]Bashful\\\",\\\"Description:json\\\":\\\"\\\\\\\"This unit has neutral parameters.\\\\\\\"\\\",\\\"FmtText:str\\\":\\\"Bashful\\\",\\\"RandomValid:eval\\\":\\\"true\\\",\\\"RandomWeight:num\\\":\\\"1\\\",\\\"Traits\\\":\\\"\\\",\\\"ElementRate:struct\\\":\\\"{}\\\",\\\"Params:struct\\\":\\\"{}\\\",\\\"XParams:struct\\\":\\\"{}\\\",\\\"SParams:struct\\\":\\\"{}\\\",\\\"PassiveStates:arraynum\\\":\\\"[]\\\",\\\"Equipment\\\":\\\"\\\",\\\"Wtypes:arraynum\\\":\\\"[]\\\",\\\"Atypes:arraynum\\\":\\\"[]\\\",\\\"EnemyRewards\\\":\\\"\\\",\\\"EXPRate:num\\\":\\\"1.00\\\",\\\"GoldRate:num\\\":\\\"1.00\\\",\\\"DropRate:num\\\":\\\"1.00\\\"}\",\"{\\\"Name:str\\\":\\\"Rash\\\",\\\"Display:str\\\":\\\"\\\\\\\\I[36]\\\\\\\\I[53]Rash\\\",\\\"Description:json\\\":\\\"\\\\\\\"This unit has more MAT and less MDF.\\\\\\\"\\\",\\\"FmtText:str\\\":\\\"Rash\\\",\\\"RandomValid:eval\\\":\\\"true\\\",\\\"RandomWeight:num\\\":\\\"1\\\",\\\"Traits\\\":\\\"\\\",\\\"ElementRate:struct\\\":\\\"{}\\\",\\\"Params:struct\\\":\\\"{\\\\\\\"Param0:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Param1:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Param2:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Param3:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Param4:num\\\\\\\":\\\\\\\"1.10\\\\\\\",\\\\\\\"Param5:num\\\\\\\":\\\\\\\"0.90\\\\\\\",\\\\\\\"Param6:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Param7:num\\\\\\\":\\\\\\\"1.00\\\\\\\"}\\\",\\\"XParams:struct\\\":\\\"{}\\\",\\\"SParams:struct\\\":\\\"{}\\\",\\\"PassiveStates:arraynum\\\":\\\"[]\\\",\\\"Equipment\\\":\\\"\\\",\\\"Wtypes:arraynum\\\":\\\"[]\\\",\\\"Atypes:arraynum\\\":\\\"[]\\\",\\\"EnemyRewards\\\":\\\"\\\",\\\"EXPRate:num\\\":\\\"1.00\\\",\\\"GoldRate:num\\\":\\\"1.00\\\",\\\"DropRate:num\\\":\\\"1.00\\\"}\",\"{\\\"Name:str\\\":\\\"Quiet\\\",\\\"Display:str\\\":\\\"\\\\\\\\I[36]\\\\\\\\I[54]Quiet\\\",\\\"Description:json\\\":\\\"\\\\\\\"This unit has more MAT and less AGI.\\\\\\\"\\\",\\\"FmtText:str\\\":\\\"Quiet\\\",\\\"RandomValid:eval\\\":\\\"true\\\",\\\"RandomWeight:num\\\":\\\"1\\\",\\\"Traits\\\":\\\"\\\",\\\"ElementRate:struct\\\":\\\"{}\\\",\\\"Params:struct\\\":\\\"{\\\\\\\"Param0:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Param1:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Param2:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Param3:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Param4:num\\\\\\\":\\\\\\\"1.10\\\\\\\",\\\\\\\"Param5:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Param6:num\\\\\\\":\\\\\\\"0.90\\\\\\\",\\\\\\\"Param7:num\\\\\\\":\\\\\\\"1.00\\\\\\\"}\\\",\\\"XParams:struct\\\":\\\"{}\\\",\\\"SParams:struct\\\":\\\"{}\\\",\\\"PassiveStates:arraynum\\\":\\\"[]\\\",\\\"Equipment\\\":\\\"\\\",\\\"Wtypes:arraynum\\\":\\\"[]\\\",\\\"Atypes:arraynum\\\":\\\"[]\\\",\\\"EnemyRewards\\\":\\\"\\\",\\\"EXPRate:num\\\":\\\"1.00\\\",\\\"GoldRate:num\\\":\\\"1.00\\\",\\\"DropRate:num\\\":\\\"1.00\\\"}\",\"{\\\"Name:str\\\":\\\"Calm\\\",\\\"Display:str\\\":\\\"\\\\\\\\I[37]\\\\\\\\I[50]Calm\\\",\\\"Description:json\\\":\\\"\\\\\\\"This unit has more MDF and less ATK.\\\\\\\"\\\",\\\"FmtText:str\\\":\\\"Calm\\\",\\\"RandomValid:eval\\\":\\\"true\\\",\\\"RandomWeight:num\\\":\\\"1\\\",\\\"Traits\\\":\\\"\\\",\\\"ElementRate:struct\\\":\\\"{}\\\",\\\"Params:struct\\\":\\\"{\\\\\\\"Param0:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Param1:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Param2:num\\\\\\\":\\\\\\\"0.90\\\\\\\",\\\\\\\"Param3:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Param4:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Param5:num\\\\\\\":\\\\\\\"1.10\\\\\\\",\\\\\\\"Param6:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Param7:num\\\\\\\":\\\\\\\"1.00\\\\\\\"}\\\",\\\"XParams:struct\\\":\\\"{}\\\",\\\"SParams:struct\\\":\\\"{}\\\",\\\"PassiveStates:arraynum\\\":\\\"[]\\\",\\\"Equipment\\\":\\\"\\\",\\\"Wtypes:arraynum\\\":\\\"[]\\\",\\\"Atypes:arraynum\\\":\\\"[]\\\",\\\"EnemyRewards\\\":\\\"\\\",\\\"EXPRate:num\\\":\\\"1.00\\\",\\\"GoldRate:num\\\":\\\"1.00\\\",\\\"DropRate:num\\\":\\\"1.00\\\"}\",\"{\\\"Name:str\\\":\\\"Gentle\\\",\\\"Display:str\\\":\\\"\\\\\\\\I[37]\\\\\\\\I[51]Gentle\\\",\\\"Description:json\\\":\\\"\\\\\\\"This unit has more MDF and less DEF.\\\\\\\"\\\",\\\"FmtText:str\\\":\\\"Gentle\\\",\\\"RandomValid:eval\\\":\\\"true\\\",\\\"RandomWeight:num\\\":\\\"1\\\",\\\"Traits\\\":\\\"\\\",\\\"ElementRate:struct\\\":\\\"{}\\\",\\\"Params:struct\\\":\\\"{\\\\\\\"Param0:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Param1:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Param2:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Param3:num\\\\\\\":\\\\\\\"0.90\\\\\\\",\\\\\\\"Param4:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Param5:num\\\\\\\":\\\\\\\"1.10\\\\\\\",\\\\\\\"Param6:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Param7:num\\\\\\\":\\\\\\\"1.00\\\\\\\"}\\\",\\\"XParams:struct\\\":\\\"{}\\\",\\\"SParams:struct\\\":\\\"{}\\\",\\\"PassiveStates:arraynum\\\":\\\"[]\\\",\\\"Equipment\\\":\\\"\\\",\\\"Wtypes:arraynum\\\":\\\"[]\\\",\\\"Atypes:arraynum\\\":\\\"[]\\\",\\\"EnemyRewards\\\":\\\"\\\",\\\"EXPRate:num\\\":\\\"1.00\\\",\\\"GoldRate:num\\\":\\\"1.00\\\",\\\"DropRate:num\\\":\\\"1.00\\\"}\",\"{\\\"Name:str\\\":\\\"Careful\\\",\\\"Display:str\\\":\\\"\\\\\\\\I[37]\\\\\\\\I[52]Careful\\\",\\\"Description:json\\\":\\\"\\\\\\\"This unit has more MDF and less MAT.\\\\\\\"\\\",\\\"FmtText:str\\\":\\\"Careful\\\",\\\"RandomValid:eval\\\":\\\"true\\\",\\\"RandomWeight:num\\\":\\\"1\\\",\\\"Traits\\\":\\\"\\\",\\\"ElementRate:struct\\\":\\\"{}\\\",\\\"Params:struct\\\":\\\"{\\\\\\\"Param0:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Param1:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Param2:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Param3:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Param4:num\\\\\\\":\\\\\\\"0.90\\\\\\\",\\\\\\\"Param5:num\\\\\\\":\\\\\\\"1.10\\\\\\\",\\\\\\\"Param6:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Param7:num\\\\\\\":\\\\\\\"1.00\\\\\\\"}\\\",\\\"XParams:struct\\\":\\\"{}\\\",\\\"SParams:struct\\\":\\\"{}\\\",\\\"PassiveStates:arraynum\\\":\\\"[]\\\",\\\"Equipment\\\":\\\"\\\",\\\"Wtypes:arraynum\\\":\\\"[]\\\",\\\"Atypes:arraynum\\\":\\\"[]\\\",\\\"EnemyRewards\\\":\\\"\\\",\\\"EXPRate:num\\\":\\\"1.00\\\",\\\"GoldRate:num\\\":\\\"1.00\\\",\\\"DropRate:num\\\":\\\"1.00\\\"}\",\"{\\\"Name:str\\\":\\\"Quirky\\\",\\\"Display:str\\\":\\\"\\\\\\\\I[37]\\\\\\\\I[53]Quirky\\\",\\\"Description:json\\\":\\\"\\\\\\\"This unit has neutral parameters.\\\\\\\"\\\",\\\"FmtText:str\\\":\\\"Quirky\\\",\\\"RandomValid:eval\\\":\\\"true\\\",\\\"RandomWeight:num\\\":\\\"1\\\",\\\"Traits\\\":\\\"\\\",\\\"ElementRate:struct\\\":\\\"{}\\\",\\\"Params:struct\\\":\\\"{}\\\",\\\"XParams:struct\\\":\\\"{}\\\",\\\"SParams:struct\\\":\\\"{}\\\",\\\"PassiveStates:arraynum\\\":\\\"[]\\\",\\\"Equipment\\\":\\\"\\\",\\\"Wtypes:arraynum\\\":\\\"[]\\\",\\\"Atypes:arraynum\\\":\\\"[]\\\",\\\"EnemyRewards\\\":\\\"\\\",\\\"EXPRate:num\\\":\\\"1.00\\\",\\\"GoldRate:num\\\":\\\"1.00\\\",\\\"DropRate:num\\\":\\\"1.00\\\"}\",\"{\\\"Name:str\\\":\\\"Sassy\\\",\\\"Display:str\\\":\\\"\\\\\\\\I[37]\\\\\\\\I[54]Sassy\\\",\\\"Description:json\\\":\\\"\\\\\\\"This unit has more MDF and less AGI.\\\\\\\"\\\",\\\"FmtText:str\\\":\\\"Sassy\\\",\\\"RandomValid:eval\\\":\\\"true\\\",\\\"RandomWeight:num\\\":\\\"1\\\",\\\"Traits\\\":\\\"\\\",\\\"ElementRate:struct\\\":\\\"{}\\\",\\\"Params:struct\\\":\\\"{\\\\\\\"Param0:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Param1:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Param2:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Param3:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Param4:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Param5:num\\\\\\\":\\\\\\\"1.10\\\\\\\",\\\\\\\"Param6:num\\\\\\\":\\\\\\\"0.90\\\\\\\",\\\\\\\"Param7:num\\\\\\\":\\\\\\\"1.00\\\\\\\"}\\\",\\\"XParams:struct\\\":\\\"{}\\\",\\\"SParams:struct\\\":\\\"{}\\\",\\\"PassiveStates:arraynum\\\":\\\"[]\\\",\\\"Equipment\\\":\\\"\\\",\\\"Wtypes:arraynum\\\":\\\"[]\\\",\\\"Atypes:arraynum\\\":\\\"[]\\\",\\\"EnemyRewards\\\":\\\"\\\",\\\"EXPRate:num\\\":\\\"1.00\\\",\\\"GoldRate:num\\\":\\\"1.00\\\",\\\"DropRate:num\\\":\\\"1.00\\\"}\",\"{\\\"Name:str\\\":\\\"Timid\\\",\\\"Display:str\\\":\\\"\\\\\\\\I[38]\\\\\\\\I[50]Timid\\\",\\\"Description:json\\\":\\\"\\\\\\\"This unit has more AGI and less ATK.\\\\\\\"\\\",\\\"FmtText:str\\\":\\\"Timid\\\",\\\"RandomValid:eval\\\":\\\"true\\\",\\\"RandomWeight:num\\\":\\\"1\\\",\\\"Traits\\\":\\\"\\\",\\\"ElementRate:struct\\\":\\\"{}\\\",\\\"Params:struct\\\":\\\"{\\\\\\\"Param0:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Param1:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Param2:num\\\\\\\":\\\\\\\"0.90\\\\\\\",\\\\\\\"Param3:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Param4:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Param5:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Param6:num\\\\\\\":\\\\\\\"1.10\\\\\\\",\\\\\\\"Param7:num\\\\\\\":\\\\\\\"1.00\\\\\\\"}\\\",\\\"XParams:struct\\\":\\\"{}\\\",\\\"SParams:struct\\\":\\\"{}\\\",\\\"PassiveStates:arraynum\\\":\\\"[]\\\",\\\"Equipment\\\":\\\"\\\",\\\"Wtypes:arraynum\\\":\\\"[]\\\",\\\"Atypes:arraynum\\\":\\\"[]\\\",\\\"EnemyRewards\\\":\\\"\\\",\\\"EXPRate:num\\\":\\\"1.00\\\",\\\"GoldRate:num\\\":\\\"1.00\\\",\\\"DropRate:num\\\":\\\"1.00\\\"}\",\"{\\\"Name:str\\\":\\\"Hasty\\\",\\\"Display:str\\\":\\\"\\\\\\\\I[38]\\\\\\\\I[51]Hasty\\\",\\\"Description:json\\\":\\\"\\\\\\\"This unit has more AGI and less DEF.\\\\\\\"\\\",\\\"FmtText:str\\\":\\\"Hasty\\\",\\\"RandomValid:eval\\\":\\\"true\\\",\\\"RandomWeight:num\\\":\\\"1\\\",\\\"Traits\\\":\\\"\\\",\\\"ElementRate:struct\\\":\\\"{}\\\",\\\"Params:struct\\\":\\\"{\\\\\\\"Param0:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Param1:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Param2:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Param3:num\\\\\\\":\\\\\\\"0.90\\\\\\\",\\\\\\\"Param4:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Param5:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Param6:num\\\\\\\":\\\\\\\"1.10\\\\\\\",\\\\\\\"Param7:num\\\\\\\":\\\\\\\"1.00\\\\\\\"}\\\",\\\"XParams:struct\\\":\\\"{}\\\",\\\"SParams:struct\\\":\\\"{}\\\",\\\"PassiveStates:arraynum\\\":\\\"[]\\\",\\\"Equipment\\\":\\\"\\\",\\\"Wtypes:arraynum\\\":\\\"[]\\\",\\\"Atypes:arraynum\\\":\\\"[]\\\",\\\"EnemyRewards\\\":\\\"\\\",\\\"EXPRate:num\\\":\\\"1.00\\\",\\\"GoldRate:num\\\":\\\"1.00\\\",\\\"DropRate:num\\\":\\\"1.00\\\"}\",\"{\\\"Name:str\\\":\\\"Jolly\\\",\\\"Display:str\\\":\\\"\\\\\\\\I[38]\\\\\\\\I[52]Jolly\\\",\\\"Description:json\\\":\\\"\\\\\\\"This unit has more AGI and less MAT.\\\\\\\"\\\",\\\"FmtText:str\\\":\\\"Jolly\\\",\\\"RandomValid:eval\\\":\\\"true\\\",\\\"RandomWeight:num\\\":\\\"1\\\",\\\"Traits\\\":\\\"\\\",\\\"ElementRate:struct\\\":\\\"{}\\\",\\\"Params:struct\\\":\\\"{\\\\\\\"Param0:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Param1:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Param2:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Param3:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Param4:num\\\\\\\":\\\\\\\"0.90\\\\\\\",\\\\\\\"Param5:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Param6:num\\\\\\\":\\\\\\\"1.10\\\\\\\",\\\\\\\"Param7:num\\\\\\\":\\\\\\\"1.00\\\\\\\"}\\\",\\\"XParams:struct\\\":\\\"{}\\\",\\\"SParams:struct\\\":\\\"{}\\\",\\\"PassiveStates:arraynum\\\":\\\"[]\\\",\\\"Equipment\\\":\\\"\\\",\\\"Wtypes:arraynum\\\":\\\"[]\\\",\\\"Atypes:arraynum\\\":\\\"[]\\\",\\\"EnemyRewards\\\":\\\"\\\",\\\"EXPRate:num\\\":\\\"1.00\\\",\\\"GoldRate:num\\\":\\\"1.00\\\",\\\"DropRate:num\\\":\\\"1.00\\\"}\",\"{\\\"Name:str\\\":\\\"Naive\\\",\\\"Display:str\\\":\\\"\\\\\\\\I[38]\\\\\\\\I[53]Naive\\\",\\\"Description:json\\\":\\\"\\\\\\\"This unit has more AGI and less MDF.\\\\\\\"\\\",\\\"FmtText:str\\\":\\\"Naive\\\",\\\"RandomValid:eval\\\":\\\"true\\\",\\\"RandomWeight:num\\\":\\\"1\\\",\\\"Traits\\\":\\\"\\\",\\\"ElementRate:struct\\\":\\\"{}\\\",\\\"Params:struct\\\":\\\"{\\\\\\\"Param0:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Param1:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Param2:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Param3:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Param4:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Param5:num\\\\\\\":\\\\\\\"0.90\\\\\\\",\\\\\\\"Param6:num\\\\\\\":\\\\\\\"1.10\\\\\\\",\\\\\\\"Param7:num\\\\\\\":\\\\\\\"1.00\\\\\\\"}\\\",\\\"XParams:struct\\\":\\\"{}\\\",\\\"SParams:struct\\\":\\\"{}\\\",\\\"PassiveStates:arraynum\\\":\\\"[]\\\",\\\"Equipment\\\":\\\"\\\",\\\"Wtypes:arraynum\\\":\\\"[]\\\",\\\"Atypes:arraynum\\\":\\\"[]\\\",\\\"EnemyRewards\\\":\\\"\\\",\\\"EXPRate:num\\\":\\\"1.00\\\",\\\"GoldRate:num\\\":\\\"1.00\\\",\\\"DropRate:num\\\":\\\"1.00\\\"}\",\"{\\\"Name:str\\\":\\\"Serious\\\",\\\"Display:str\\\":\\\"\\\\\\\\I[38]\\\\\\\\I[54]Serious\\\",\\\"Description:json\\\":\\\"\\\\\\\"This unit has neutral parameters.\\\\\\\"\\\",\\\"FmtText:str\\\":\\\"Serious\\\",\\\"RandomValid:eval\\\":\\\"true\\\",\\\"RandomWeight:num\\\":\\\"1\\\",\\\"Traits\\\":\\\"\\\",\\\"ElementRate:struct\\\":\\\"{}\\\",\\\"Params:struct\\\":\\\"{}\\\",\\\"XParams:struct\\\":\\\"{}\\\",\\\"SParams:struct\\\":\\\"{}\\\",\\\"PassiveStates:arraynum\\\":\\\"[]\\\",\\\"Equipment\\\":\\\"\\\",\\\"Wtypes:arraynum\\\":\\\"[]\\\",\\\"Atypes:arraynum\\\":\\\"[]\\\",\\\"EnemyRewards\\\":\\\"\\\",\\\"EXPRate:num\\\":\\\"1.00\\\",\\\"GoldRate:num\\\":\\\"1.00\\\",\\\"DropRate:num\\\":\\\"1.00\\\"}\"]"}
 *
 * @param Alignment:struct
 * @text Alignment Sets
 * @parent TraitSetSettings:struct
 * @type struct<TraitSetType>
 * @desc The settings for the Main Element Trait Set Type.
 * @default {"Name:str":"Alignment","Label:str":"Alignment","Visible:eval":"true","RandomizeActor:eval":"false","RandomizeEnemy:eval":"false","Default:struct":"{\"Name:str\":\"Neutral\",\"Display:str\":\"\\\\I[160]Neutral\",\"Description:json\":\"\\\"This unit's alignment is completely neutral.\\\"\",\"FmtText:str\":\"Neutral\",\"RandomValid:eval\":\"true\",\"RandomWeight:num\":\"1\",\"Traits\":\"\",\"ElementRate:struct\":\"{}\",\"Params:struct\":\"{}\",\"XParams:struct\":\"{}\",\"SParams:struct\":\"{}\",\"PassiveStates:arraynum\":\"[]\",\"Equipment\":\"\",\"Wtypes:arraynum\":\"[]\",\"Atypes:arraynum\":\"[]\",\"EnemyRewards\":\"\",\"EXPRate:num\":\"1.00\",\"GoldRate:num\":\"1.00\",\"DropRate:num\":\"1.00\"}","List:arraystruct":"[\"{\\\"Name:str\\\":\\\"Lawful Good\\\",\\\"Display:str\\\":\\\"\\\\\\\\I[70]Lawful Good\\\",\\\"Description:json\\\":\\\"\\\\\\\"Strong against \\\\\\\\\\\\\\\\I[70]Light.\\\\\\\\nWeak against \\\\\\\\\\\\\\\\I[71]Darkness.\\\\\\\"\\\",\\\"FmtText:str\\\":\\\"Good\\\",\\\"RandomValid:eval\\\":\\\"true\\\",\\\"RandomWeight:num\\\":\\\"1\\\",\\\"Traits\\\":\\\"\\\",\\\"ElementRate:struct\\\":\\\"{\\\\\\\"Element1:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element2:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element3:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element4:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element5:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element6:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element7:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element8:num\\\\\\\":\\\\\\\"0.70\\\\\\\",\\\\\\\"Element9:num\\\\\\\":\\\\\\\"1.30\\\\\\\",\\\\\\\"Element10:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element11:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element12:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element13:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element14:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element15:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element16:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element17:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element18:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element19:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element20:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element21:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element22:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element23:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element24:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element25:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element26:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element27:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element28:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element29:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element30:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element31:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element32:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element33:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element34:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element35:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element36:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element37:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element38:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element39:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element40:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element41:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element42:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element43:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element44:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element45:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element46:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element47:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element48:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element49:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element50:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element51:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element52:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element53:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element54:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element55:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element56:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element57:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element58:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element59:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element60:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element61:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element62:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element63:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element64:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element65:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element66:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element67:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element68:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element69:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element70:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element71:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element72:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element73:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element74:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element75:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element76:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element77:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element78:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element79:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element80:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element81:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element82:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element83:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element84:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element85:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element86:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element87:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element88:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element89:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element90:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element91:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element92:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element93:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element94:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element95:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element96:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element97:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element98:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element99:num\\\\\\\":\\\\\\\"1.00\\\\\\\"}\\\",\\\"Params:struct\\\":\\\"{}\\\",\\\"XParams:struct\\\":\\\"{}\\\",\\\"SParams:struct\\\":\\\"{}\\\",\\\"PassiveStates:arraynum\\\":\\\"[]\\\",\\\"Equipment\\\":\\\"\\\",\\\"Wtypes:arraynum\\\":\\\"[]\\\",\\\"Atypes:arraynum\\\":\\\"[]\\\",\\\"EnemyRewards\\\":\\\"\\\",\\\"EXPRate:num\\\":\\\"1.00\\\",\\\"GoldRate:num\\\":\\\"1.00\\\",\\\"DropRate:num\\\":\\\"1.00\\\"}\",\"{\\\"Name:str\\\":\\\"Neutral Good\\\",\\\"Display:str\\\":\\\"\\\\\\\\I[70]Neutral Good\\\",\\\"Description:json\\\":\\\"\\\\\\\"Strong against \\\\\\\\\\\\\\\\I[70]Light.\\\\\\\\nWeak against \\\\\\\\\\\\\\\\I[71]Darkness.\\\\\\\"\\\",\\\"FmtText:str\\\":\\\"Good\\\",\\\"RandomValid:eval\\\":\\\"true\\\",\\\"RandomWeight:num\\\":\\\"1\\\",\\\"Traits\\\":\\\"\\\",\\\"ElementRate:struct\\\":\\\"{\\\\\\\"Element1:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element2:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element3:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element4:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element5:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element6:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element7:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element8:num\\\\\\\":\\\\\\\"0.80\\\\\\\",\\\\\\\"Element9:num\\\\\\\":\\\\\\\"1.20\\\\\\\",\\\\\\\"Element10:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element11:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element12:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element13:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element14:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element15:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element16:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element17:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element18:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element19:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element20:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element21:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element22:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element23:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element24:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element25:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element26:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element27:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element28:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element29:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element30:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element31:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element32:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element33:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element34:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element35:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element36:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element37:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element38:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element39:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element40:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element41:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element42:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element43:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element44:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element45:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element46:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element47:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element48:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element49:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element50:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element51:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element52:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element53:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element54:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element55:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element56:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element57:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element58:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element59:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element60:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element61:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element62:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element63:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element64:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element65:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element66:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element67:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element68:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element69:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element70:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element71:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element72:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element73:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element74:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element75:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element76:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element77:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element78:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element79:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element80:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element81:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element82:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element83:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element84:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element85:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element86:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element87:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element88:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element89:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element90:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element91:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element92:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element93:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element94:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element95:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element96:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element97:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element98:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element99:num\\\\\\\":\\\\\\\"1.00\\\\\\\"}\\\",\\\"Params:struct\\\":\\\"{}\\\",\\\"XParams:struct\\\":\\\"{}\\\",\\\"SParams:struct\\\":\\\"{}\\\",\\\"PassiveStates:arraynum\\\":\\\"[]\\\",\\\"Equipment\\\":\\\"\\\",\\\"Wtypes:arraynum\\\":\\\"[]\\\",\\\"Atypes:arraynum\\\":\\\"[]\\\",\\\"EnemyRewards\\\":\\\"\\\",\\\"EXPRate:num\\\":\\\"1.00\\\",\\\"GoldRate:num\\\":\\\"1.00\\\",\\\"DropRate:num\\\":\\\"1.00\\\"}\",\"{\\\"Name:str\\\":\\\"Chaotic Good\\\",\\\"Display:str\\\":\\\"\\\\\\\\I[70]Chaotic Good\\\",\\\"Description:json\\\":\\\"\\\\\\\"Strong against \\\\\\\\\\\\\\\\I[70]Light.\\\\\\\\nWeak against \\\\\\\\\\\\\\\\I[71]Darkness.\\\\\\\"\\\",\\\"FmtText:str\\\":\\\"Good\\\",\\\"RandomValid:eval\\\":\\\"true\\\",\\\"RandomWeight:num\\\":\\\"1\\\",\\\"Traits\\\":\\\"\\\",\\\"ElementRate:struct\\\":\\\"{\\\\\\\"Element1:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element2:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element3:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element4:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element5:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element6:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element7:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element8:num\\\\\\\":\\\\\\\"0.90\\\\\\\",\\\\\\\"Element9:num\\\\\\\":\\\\\\\"1.10\\\\\\\",\\\\\\\"Element10:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element11:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element12:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element13:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element14:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element15:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element16:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element17:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element18:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element19:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element20:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element21:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element22:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element23:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element24:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element25:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element26:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element27:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element28:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element29:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element30:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element31:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element32:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element33:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element34:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element35:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element36:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element37:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element38:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element39:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element40:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element41:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element42:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element43:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element44:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element45:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element46:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element47:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element48:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element49:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element50:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element51:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element52:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element53:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element54:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element55:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element56:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element57:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element58:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element59:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element60:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element61:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element62:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element63:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element64:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element65:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element66:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element67:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element68:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element69:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element70:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element71:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element72:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element73:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element74:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element75:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element76:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element77:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element78:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element79:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element80:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element81:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element82:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element83:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element84:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element85:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element86:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element87:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element88:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element89:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element90:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element91:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element92:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element93:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element94:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element95:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element96:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element97:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element98:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element99:num\\\\\\\":\\\\\\\"1.00\\\\\\\"}\\\",\\\"Params:struct\\\":\\\"{}\\\",\\\"XParams:struct\\\":\\\"{}\\\",\\\"SParams:struct\\\":\\\"{}\\\",\\\"PassiveStates:arraynum\\\":\\\"[]\\\",\\\"Equipment\\\":\\\"\\\",\\\"Wtypes:arraynum\\\":\\\"[]\\\",\\\"Atypes:arraynum\\\":\\\"[]\\\",\\\"EnemyRewards\\\":\\\"\\\",\\\"EXPRate:num\\\":\\\"1.00\\\",\\\"GoldRate:num\\\":\\\"1.00\\\",\\\"DropRate:num\\\":\\\"1.00\\\"}\",\"{\\\"Name:str\\\":\\\"Lawful Neutral\\\",\\\"Display:str\\\":\\\"\\\\\\\\I[160]Lawful Neutral\\\",\\\"Description:json\\\":\\\"\\\\\\\"Strong against \\\\\\\\\\\\\\\\I[67]Water, \\\\\\\\\\\\\\\\I[68]Earth, \\\\\\\\\\\\\\\\I[69]Wind.\\\\\\\\nWeak against \\\\\\\\\\\\\\\\I[64]Fire, \\\\\\\\\\\\\\\\I[65]Ice, \\\\\\\\\\\\\\\\I[66]Thunder.\\\\\\\"\\\",\\\"FmtText:str\\\":\\\"Neutral\\\",\\\"RandomValid:eval\\\":\\\"true\\\",\\\"RandomWeight:num\\\":\\\"1\\\",\\\"Traits\\\":\\\"\\\",\\\"ElementRate:struct\\\":\\\"{\\\\\\\"Element1:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element2:num\\\\\\\":\\\\\\\"1.10\\\\\\\",\\\\\\\"Element3:num\\\\\\\":\\\\\\\"1.10\\\\\\\",\\\\\\\"Element4:num\\\\\\\":\\\\\\\"1.10\\\\\\\",\\\\\\\"Element5:num\\\\\\\":\\\\\\\"0.90\\\\\\\",\\\\\\\"Element6:num\\\\\\\":\\\\\\\"0.90\\\\\\\",\\\\\\\"Element7:num\\\\\\\":\\\\\\\"0.90\\\\\\\",\\\\\\\"Element8:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element9:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element10:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element11:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element12:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element13:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element14:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element15:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element16:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element17:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element18:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element19:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element20:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element21:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element22:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element23:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element24:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element25:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element26:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element27:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element28:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element29:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element30:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element31:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element32:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element33:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element34:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element35:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element36:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element37:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element38:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element39:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element40:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element41:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element42:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element43:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element44:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element45:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element46:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element47:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element48:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element49:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element50:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element51:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element52:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element53:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element54:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element55:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element56:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element57:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element58:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element59:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element60:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element61:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element62:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element63:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element64:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element65:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element66:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element67:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element68:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element69:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element70:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element71:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element72:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element73:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element74:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element75:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element76:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element77:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element78:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element79:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element80:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element81:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element82:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element83:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element84:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element85:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element86:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element87:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element88:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element89:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element90:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element91:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element92:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element93:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element94:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element95:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element96:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element97:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element98:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element99:num\\\\\\\":\\\\\\\"1.00\\\\\\\"}\\\",\\\"Params:struct\\\":\\\"{}\\\",\\\"XParams:struct\\\":\\\"{}\\\",\\\"SParams:struct\\\":\\\"{}\\\",\\\"PassiveStates:arraynum\\\":\\\"[]\\\",\\\"Equipment\\\":\\\"\\\",\\\"Wtypes:arraynum\\\":\\\"[]\\\",\\\"Atypes:arraynum\\\":\\\"[]\\\",\\\"EnemyRewards\\\":\\\"\\\",\\\"EXPRate:num\\\":\\\"1.00\\\",\\\"GoldRate:num\\\":\\\"1.00\\\",\\\"DropRate:num\\\":\\\"1.00\\\"}\",\"{\\\"Name:str\\\":\\\"Chaotic Neutral\\\",\\\"Display:str\\\":\\\"\\\\\\\\I[160]Chaotic Neutral\\\",\\\"Description:json\\\":\\\"\\\\\\\"Strong against \\\\\\\\\\\\\\\\I[64]Fire, \\\\\\\\\\\\\\\\I[65]Ice, \\\\\\\\\\\\\\\\I[66]Thunder.\\\\\\\\nWeak against \\\\\\\\\\\\\\\\I[67]Water, \\\\\\\\\\\\\\\\I[68]Earth, \\\\\\\\\\\\\\\\I[69]Wind.\\\\\\\"\\\",\\\"FmtText:str\\\":\\\"Neutral\\\",\\\"RandomValid:eval\\\":\\\"true\\\",\\\"RandomWeight:num\\\":\\\"1\\\",\\\"Traits\\\":\\\"\\\",\\\"ElementRate:struct\\\":\\\"{\\\\\\\"Element1:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element2:num\\\\\\\":\\\\\\\"0.90\\\\\\\",\\\\\\\"Element3:num\\\\\\\":\\\\\\\"0.90\\\\\\\",\\\\\\\"Element4:num\\\\\\\":\\\\\\\"0.90\\\\\\\",\\\\\\\"Element5:num\\\\\\\":\\\\\\\"1.10\\\\\\\",\\\\\\\"Element6:num\\\\\\\":\\\\\\\"1.10\\\\\\\",\\\\\\\"Element7:num\\\\\\\":\\\\\\\"1.10\\\\\\\",\\\\\\\"Element8:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element9:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element10:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element11:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element12:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element13:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element14:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element15:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element16:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element17:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element18:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element19:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element20:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element21:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element22:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element23:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element24:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element25:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element26:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element27:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element28:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element29:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element30:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element31:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element32:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element33:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element34:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element35:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element36:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element37:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element38:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element39:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element40:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element41:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element42:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element43:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element44:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element45:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element46:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element47:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element48:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element49:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element50:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element51:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element52:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element53:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element54:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element55:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element56:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element57:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element58:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element59:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element60:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element61:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element62:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element63:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element64:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element65:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element66:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element67:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element68:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element69:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element70:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element71:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element72:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element73:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element74:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element75:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element76:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element77:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element78:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element79:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element80:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element81:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element82:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element83:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element84:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element85:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element86:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element87:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element88:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element89:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element90:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element91:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element92:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element93:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element94:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element95:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element96:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element97:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element98:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element99:num\\\\\\\":\\\\\\\"1.00\\\\\\\"}\\\",\\\"Params:struct\\\":\\\"{}\\\",\\\"XParams:struct\\\":\\\"{}\\\",\\\"SParams:struct\\\":\\\"{}\\\",\\\"PassiveStates:arraynum\\\":\\\"[]\\\",\\\"Equipment\\\":\\\"\\\",\\\"Wtypes:arraynum\\\":\\\"[]\\\",\\\"Atypes:arraynum\\\":\\\"[]\\\",\\\"EnemyRewards\\\":\\\"\\\",\\\"EXPRate:num\\\":\\\"1.00\\\",\\\"GoldRate:num\\\":\\\"1.00\\\",\\\"DropRate:num\\\":\\\"1.00\\\"}\",\"{\\\"Name:str\\\":\\\"Lawful Evil\\\",\\\"Display:str\\\":\\\"\\\\\\\\I[71]Lawful Evil\\\",\\\"Description:json\\\":\\\"\\\\\\\"Strong against \\\\\\\\\\\\\\\\I[71]Darkness.\\\\\\\\nWeak against \\\\\\\\\\\\\\\\I[70]Light.\\\\\\\"\\\",\\\"FmtText:str\\\":\\\"Evil\\\",\\\"RandomValid:eval\\\":\\\"true\\\",\\\"RandomWeight:num\\\":\\\"1\\\",\\\"Traits\\\":\\\"\\\",\\\"ElementRate:struct\\\":\\\"{\\\\\\\"Element1:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element2:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element3:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element4:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element5:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element6:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element7:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element8:num\\\\\\\":\\\\\\\"1.30\\\\\\\",\\\\\\\"Element9:num\\\\\\\":\\\\\\\"0.70\\\\\\\",\\\\\\\"Element10:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element11:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element12:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element13:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element14:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element15:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element16:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element17:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element18:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element19:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element20:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element21:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element22:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element23:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element24:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element25:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element26:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element27:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element28:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element29:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element30:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element31:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element32:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element33:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element34:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element35:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element36:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element37:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element38:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element39:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element40:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element41:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element42:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element43:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element44:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element45:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element46:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element47:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element48:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element49:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element50:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element51:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element52:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element53:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element54:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element55:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element56:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element57:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element58:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element59:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element60:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element61:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element62:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element63:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element64:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element65:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element66:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element67:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element68:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element69:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element70:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element71:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element72:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element73:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element74:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element75:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element76:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element77:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element78:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element79:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element80:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element81:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element82:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element83:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element84:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element85:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element86:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element87:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element88:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element89:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element90:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element91:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element92:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element93:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element94:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element95:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element96:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element97:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element98:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element99:num\\\\\\\":\\\\\\\"1.00\\\\\\\"}\\\",\\\"Params:struct\\\":\\\"{}\\\",\\\"XParams:struct\\\":\\\"{}\\\",\\\"SParams:struct\\\":\\\"{}\\\",\\\"PassiveStates:arraynum\\\":\\\"[]\\\",\\\"Equipment\\\":\\\"\\\",\\\"Wtypes:arraynum\\\":\\\"[]\\\",\\\"Atypes:arraynum\\\":\\\"[]\\\",\\\"EnemyRewards\\\":\\\"\\\",\\\"EXPRate:num\\\":\\\"1.00\\\",\\\"GoldRate:num\\\":\\\"1.00\\\",\\\"DropRate:num\\\":\\\"1.00\\\"}\",\"{\\\"Name:str\\\":\\\"Neutral Evil\\\",\\\"Display:str\\\":\\\"\\\\\\\\I[71]Neutral Evil\\\",\\\"Description:json\\\":\\\"\\\\\\\"Strong against \\\\\\\\\\\\\\\\I[71]Darkness.\\\\\\\\nWeak against \\\\\\\\\\\\\\\\I[70]Light.\\\\\\\"\\\",\\\"FmtText:str\\\":\\\"Evil\\\",\\\"RandomValid:eval\\\":\\\"true\\\",\\\"RandomWeight:num\\\":\\\"1\\\",\\\"Traits\\\":\\\"\\\",\\\"ElementRate:struct\\\":\\\"{\\\\\\\"Element1:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element2:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element3:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element4:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element5:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element6:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element7:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element8:num\\\\\\\":\\\\\\\"1.20\\\\\\\",\\\\\\\"Element9:num\\\\\\\":\\\\\\\"0.80\\\\\\\",\\\\\\\"Element10:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element11:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element12:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element13:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element14:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element15:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element16:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element17:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element18:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element19:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element20:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element21:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element22:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element23:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element24:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element25:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element26:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element27:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element28:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element29:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element30:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element31:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element32:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element33:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element34:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element35:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element36:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element37:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element38:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element39:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element40:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element41:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element42:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element43:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element44:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element45:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element46:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element47:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element48:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element49:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element50:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element51:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element52:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element53:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element54:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element55:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element56:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element57:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element58:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element59:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element60:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element61:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element62:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element63:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element64:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element65:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element66:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element67:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element68:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element69:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element70:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element71:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element72:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element73:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element74:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element75:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element76:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element77:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element78:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element79:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element80:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element81:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element82:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element83:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element84:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element85:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element86:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element87:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element88:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element89:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element90:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element91:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element92:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element93:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element94:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element95:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element96:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element97:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element98:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element99:num\\\\\\\":\\\\\\\"1.00\\\\\\\"}\\\",\\\"Params:struct\\\":\\\"{}\\\",\\\"XParams:struct\\\":\\\"{}\\\",\\\"SParams:struct\\\":\\\"{}\\\",\\\"PassiveStates:arraynum\\\":\\\"[]\\\",\\\"Equipment\\\":\\\"\\\",\\\"Wtypes:arraynum\\\":\\\"[]\\\",\\\"Atypes:arraynum\\\":\\\"[]\\\",\\\"EnemyRewards\\\":\\\"\\\",\\\"EXPRate:num\\\":\\\"1.00\\\",\\\"GoldRate:num\\\":\\\"1.00\\\",\\\"DropRate:num\\\":\\\"1.00\\\"}\",\"{\\\"Name:str\\\":\\\"Chaotic Evil\\\",\\\"Display:str\\\":\\\"\\\\\\\\I[71]Chaotic Evil\\\",\\\"Description:json\\\":\\\"\\\\\\\"Strong against \\\\\\\\\\\\\\\\I[71]Darkness.\\\\\\\\nWeak against \\\\\\\\\\\\\\\\I[70]Light.\\\\\\\"\\\",\\\"FmtText:str\\\":\\\"Evil\\\",\\\"RandomValid:eval\\\":\\\"true\\\",\\\"RandomWeight:num\\\":\\\"1\\\",\\\"Traits\\\":\\\"\\\",\\\"ElementRate:struct\\\":\\\"{\\\\\\\"Element1:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element2:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element3:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element4:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element5:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element6:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element7:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element8:num\\\\\\\":\\\\\\\"1.10\\\\\\\",\\\\\\\"Element9:num\\\\\\\":\\\\\\\"0.90\\\\\\\",\\\\\\\"Element10:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element11:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element12:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element13:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element14:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element15:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element16:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element17:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element18:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element19:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element20:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element21:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element22:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element23:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element24:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element25:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element26:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element27:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element28:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element29:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element30:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element31:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element32:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element33:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element34:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element35:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element36:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element37:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element38:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element39:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element40:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element41:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element42:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element43:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element44:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element45:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element46:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element47:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element48:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element49:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element50:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element51:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element52:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element53:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element54:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element55:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element56:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element57:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element58:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element59:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element60:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element61:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element62:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element63:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element64:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element65:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element66:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element67:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element68:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element69:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element70:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element71:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element72:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element73:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element74:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element75:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element76:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element77:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element78:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element79:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element80:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element81:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element82:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element83:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element84:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element85:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element86:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element87:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element88:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element89:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element90:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element91:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element92:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element93:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element94:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element95:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element96:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element97:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element98:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element99:num\\\\\\\":\\\\\\\"1.00\\\\\\\"}\\\",\\\"Params:struct\\\":\\\"{}\\\",\\\"XParams:struct\\\":\\\"{}\\\",\\\"SParams:struct\\\":\\\"{}\\\",\\\"PassiveStates:arraynum\\\":\\\"[]\\\",\\\"Equipment\\\":\\\"\\\",\\\"Wtypes:arraynum\\\":\\\"[]\\\",\\\"Atypes:arraynum\\\":\\\"[]\\\",\\\"EnemyRewards\\\":\\\"\\\",\\\"EXPRate:num\\\":\\\"1.00\\\",\\\"GoldRate:num\\\":\\\"1.00\\\",\\\"DropRate:num\\\":\\\"1.00\\\"}\"]"}
 *
 * @param Blessing:struct
 * @text Blessing Sets
 * @parent TraitSetSettings:struct
 * @type struct<TraitSetType>
 * @desc The settings for the Main Element Trait Set Type.
 * @default {"Name:str":"Blessing","Label:str":"Blessing","Visible:eval":"true","RandomizeActor:eval":"false","RandomizeEnemy:eval":"false","Default:struct":"{\"Name:str\":\"No Blessing\",\"Display:str\":\"\\\\I[160]No Blessing\",\"Description:json\":\"\\\"This unit has not received a blessing.\\\"\",\"FmtText:str\":\"\",\"RandomValid:eval\":\"true\",\"RandomWeight:num\":\"6\",\"Traits\":\"\",\"ElementRate:struct\":\"{}\",\"Params:struct\":\"{}\",\"XParams:struct\":\"{}\",\"SParams:struct\":\"{}\",\"PassiveStates:arraynum\":\"[]\",\"Equipment\":\"\",\"Wtypes:arraynum\":\"[]\",\"Atypes:arraynum\":\"[]\",\"EnemyRewards\":\"\",\"EXPRate:num\":\"1.00\",\"GoldRate:num\":\"1.00\",\"DropRate:num\":\"1.00\"}","List:arraystruct":"[\"{\\\"Name:str\\\":\\\"Dextrous\\\",\\\"Display:str\\\":\\\"\\\\\\\\I[164]Dextrous\\\",\\\"Description:json\\\":\\\"\\\\\\\"This unit has increased HIT.\\\\\\\"\\\",\\\"FmtText:str\\\":\\\"Dextrous\\\",\\\"RandomValid:eval\\\":\\\"true\\\",\\\"RandomWeight:num\\\":\\\"1\\\",\\\"Traits\\\":\\\"\\\",\\\"ElementRate:struct\\\":\\\"{}\\\",\\\"Params:struct\\\":\\\"{}\\\",\\\"XParams:struct\\\":\\\"{\\\\\\\"XParam0:num\\\\\\\":\\\\\\\"0.20\\\\\\\",\\\\\\\"XParam1:num\\\\\\\":\\\\\\\"0.00\\\\\\\",\\\\\\\"XParam2:num\\\\\\\":\\\\\\\"0.00\\\\\\\",\\\\\\\"XParam3:num\\\\\\\":\\\\\\\"0.00\\\\\\\",\\\\\\\"XParam4:num\\\\\\\":\\\\\\\"0.00\\\\\\\",\\\\\\\"XParam5:num\\\\\\\":\\\\\\\"0.00\\\\\\\",\\\\\\\"XParam6:num\\\\\\\":\\\\\\\"0.00\\\\\\\",\\\\\\\"XParam7:num\\\\\\\":\\\\\\\"0.00\\\\\\\",\\\\\\\"XParam8:num\\\\\\\":\\\\\\\"0.00\\\\\\\",\\\\\\\"XParam9:num\\\\\\\":\\\\\\\"0.00\\\\\\\"}\\\",\\\"SParams:struct\\\":\\\"{}\\\",\\\"PassiveStates:arraynum\\\":\\\"[]\\\",\\\"Equipment\\\":\\\"\\\",\\\"Wtypes:arraynum\\\":\\\"[]\\\",\\\"Atypes:arraynum\\\":\\\"[]\\\",\\\"EnemyRewards\\\":\\\"\\\",\\\"EXPRate:num\\\":\\\"1.00\\\",\\\"GoldRate:num\\\":\\\"1.00\\\",\\\"DropRate:num\\\":\\\"1.00\\\"}\",\"{\\\"Name:str\\\":\\\"Elusive\\\",\\\"Display:str\\\":\\\"\\\\\\\\I[164]Elusive\\\",\\\"Description:json\\\":\\\"\\\\\\\"This unit has increased EVA.\\\\\\\"\\\",\\\"FmtText:str\\\":\\\"Elusive\\\",\\\"RandomValid:eval\\\":\\\"true\\\",\\\"RandomWeight:num\\\":\\\"1\\\",\\\"Traits\\\":\\\"\\\",\\\"ElementRate:struct\\\":\\\"{}\\\",\\\"Params:struct\\\":\\\"{}\\\",\\\"XParams:struct\\\":\\\"{\\\\\\\"XParam0:num\\\\\\\":\\\\\\\"0.00\\\\\\\",\\\\\\\"XParam1:num\\\\\\\":\\\\\\\"0.20\\\\\\\",\\\\\\\"XParam2:num\\\\\\\":\\\\\\\"0.00\\\\\\\",\\\\\\\"XParam3:num\\\\\\\":\\\\\\\"0.00\\\\\\\",\\\\\\\"XParam4:num\\\\\\\":\\\\\\\"0.00\\\\\\\",\\\\\\\"XParam5:num\\\\\\\":\\\\\\\"0.00\\\\\\\",\\\\\\\"XParam6:num\\\\\\\":\\\\\\\"0.00\\\\\\\",\\\\\\\"XParam7:num\\\\\\\":\\\\\\\"0.00\\\\\\\",\\\\\\\"XParam8:num\\\\\\\":\\\\\\\"0.00\\\\\\\",\\\\\\\"XParam9:num\\\\\\\":\\\\\\\"0.00\\\\\\\"}\\\",\\\"SParams:struct\\\":\\\"{}\\\",\\\"PassiveStates:arraynum\\\":\\\"[]\\\",\\\"Equipment\\\":\\\"\\\",\\\"Wtypes:arraynum\\\":\\\"[]\\\",\\\"Atypes:arraynum\\\":\\\"[]\\\",\\\"EnemyRewards\\\":\\\"\\\",\\\"EXPRate:num\\\":\\\"1.00\\\",\\\"GoldRate:num\\\":\\\"1.00\\\",\\\"DropRate:num\\\":\\\"1.00\\\"}\",\"{\\\"Name:str\\\":\\\"Impact\\\",\\\"Display:str\\\":\\\"\\\\\\\\I[164]Impact\\\",\\\"Description:json\\\":\\\"\\\\\\\"This unit has increased CRI.\\\\\\\"\\\",\\\"FmtText:str\\\":\\\"Impactful\\\",\\\"RandomValid:eval\\\":\\\"true\\\",\\\"RandomWeight:num\\\":\\\"1\\\",\\\"Traits\\\":\\\"\\\",\\\"ElementRate:struct\\\":\\\"{}\\\",\\\"Params:struct\\\":\\\"{}\\\",\\\"XParams:struct\\\":\\\"{\\\\\\\"XParam0:num\\\\\\\":\\\\\\\"0.00\\\\\\\",\\\\\\\"XParam1:num\\\\\\\":\\\\\\\"0.00\\\\\\\",\\\\\\\"XParam2:num\\\\\\\":\\\\\\\"0.20\\\\\\\",\\\\\\\"XParam3:num\\\\\\\":\\\\\\\"0.00\\\\\\\",\\\\\\\"XParam4:num\\\\\\\":\\\\\\\"0.00\\\\\\\",\\\\\\\"XParam5:num\\\\\\\":\\\\\\\"0.00\\\\\\\",\\\\\\\"XParam6:num\\\\\\\":\\\\\\\"0.00\\\\\\\",\\\\\\\"XParam7:num\\\\\\\":\\\\\\\"0.00\\\\\\\",\\\\\\\"XParam8:num\\\\\\\":\\\\\\\"0.00\\\\\\\",\\\\\\\"XParam9:num\\\\\\\":\\\\\\\"0.00\\\\\\\"}\\\",\\\"SParams:struct\\\":\\\"{}\\\",\\\"PassiveStates:arraynum\\\":\\\"[]\\\",\\\"Equipment\\\":\\\"\\\",\\\"Wtypes:arraynum\\\":\\\"[]\\\",\\\"Atypes:arraynum\\\":\\\"[]\\\",\\\"EnemyRewards\\\":\\\"\\\",\\\"EXPRate:num\\\":\\\"1.00\\\",\\\"GoldRate:num\\\":\\\"1.00\\\",\\\"DropRate:num\\\":\\\"1.00\\\"}\",\"{\\\"Name:str\\\":\\\"Healthy\\\",\\\"Display:str\\\":\\\"\\\\\\\\I[164]Healthy\\\",\\\"Description:json\\\":\\\"\\\\\\\"This unit has innate HP Regeneration.\\\\\\\"\\\",\\\"FmtText:str\\\":\\\"Healthy\\\",\\\"RandomValid:eval\\\":\\\"true\\\",\\\"RandomWeight:num\\\":\\\"1\\\",\\\"Traits\\\":\\\"\\\",\\\"ElementRate:struct\\\":\\\"{}\\\",\\\"Params:struct\\\":\\\"{}\\\",\\\"XParams:struct\\\":\\\"{\\\\\\\"XParam0:num\\\\\\\":\\\\\\\"0.00\\\\\\\",\\\\\\\"XParam1:num\\\\\\\":\\\\\\\"0.00\\\\\\\",\\\\\\\"XParam2:num\\\\\\\":\\\\\\\"0.00\\\\\\\",\\\\\\\"XParam3:num\\\\\\\":\\\\\\\"0.00\\\\\\\",\\\\\\\"XParam4:num\\\\\\\":\\\\\\\"0.00\\\\\\\",\\\\\\\"XParam5:num\\\\\\\":\\\\\\\"0.00\\\\\\\",\\\\\\\"XParam6:num\\\\\\\":\\\\\\\"0.00\\\\\\\",\\\\\\\"XParam7:num\\\\\\\":\\\\\\\"0.05\\\\\\\",\\\\\\\"XParam8:num\\\\\\\":\\\\\\\"0.00\\\\\\\",\\\\\\\"XParam9:num\\\\\\\":\\\\\\\"0.00\\\\\\\"}\\\",\\\"SParams:struct\\\":\\\"{}\\\",\\\"PassiveStates:arraynum\\\":\\\"[]\\\",\\\"Equipment\\\":\\\"\\\",\\\"Wtypes:arraynum\\\":\\\"[]\\\",\\\"Atypes:arraynum\\\":\\\"[]\\\",\\\"EnemyRewards\\\":\\\"\\\",\\\"EXPRate:num\\\":\\\"1.00\\\",\\\"GoldRate:num\\\":\\\"1.00\\\",\\\"DropRate:num\\\":\\\"1.00\\\"}\",\"{\\\"Name:str\\\":\\\"Focused\\\",\\\"Display:str\\\":\\\"\\\\\\\\I[164]Focused\\\",\\\"Description:json\\\":\\\"\\\\\\\"This unit has innate MP Regeneration.\\\\\\\"\\\",\\\"FmtText:str\\\":\\\"Focused\\\",\\\"RandomValid:eval\\\":\\\"true\\\",\\\"RandomWeight:num\\\":\\\"1\\\",\\\"Traits\\\":\\\"\\\",\\\"ElementRate:struct\\\":\\\"{}\\\",\\\"Params:struct\\\":\\\"{}\\\",\\\"XParams:struct\\\":\\\"{\\\\\\\"XParam0:num\\\\\\\":\\\\\\\"0.00\\\\\\\",\\\\\\\"XParam1:num\\\\\\\":\\\\\\\"0.00\\\\\\\",\\\\\\\"XParam2:num\\\\\\\":\\\\\\\"0.00\\\\\\\",\\\\\\\"XParam3:num\\\\\\\":\\\\\\\"0.00\\\\\\\",\\\\\\\"XParam4:num\\\\\\\":\\\\\\\"0.00\\\\\\\",\\\\\\\"XParam5:num\\\\\\\":\\\\\\\"0.00\\\\\\\",\\\\\\\"XParam6:num\\\\\\\":\\\\\\\"0.00\\\\\\\",\\\\\\\"XParam7:num\\\\\\\":\\\\\\\"0.00\\\\\\\",\\\\\\\"XParam8:num\\\\\\\":\\\\\\\"0.05\\\\\\\",\\\\\\\"XParam9:num\\\\\\\":\\\\\\\"0.00\\\\\\\"}\\\",\\\"SParams:struct\\\":\\\"{}\\\",\\\"PassiveStates:arraynum\\\":\\\"[]\\\",\\\"Equipment\\\":\\\"\\\",\\\"Wtypes:arraynum\\\":\\\"[]\\\",\\\"Atypes:arraynum\\\":\\\"[]\\\",\\\"EnemyRewards\\\":\\\"\\\",\\\"EXPRate:num\\\":\\\"1.00\\\",\\\"GoldRate:num\\\":\\\"1.00\\\",\\\"DropRate:num\\\":\\\"1.00\\\"}\",\"{\\\"Name:str\\\":\\\"Energetic\\\",\\\"Display:str\\\":\\\"\\\\\\\\I[164]Energetic\\\",\\\"Description:json\\\":\\\"\\\\\\\"This unit has innate TP Regeneration.\\\\\\\"\\\",\\\"FmtText:str\\\":\\\"Energetic\\\",\\\"RandomValid:eval\\\":\\\"true\\\",\\\"RandomWeight:num\\\":\\\"1\\\",\\\"Traits\\\":\\\"\\\",\\\"ElementRate:struct\\\":\\\"{}\\\",\\\"Params:struct\\\":\\\"{}\\\",\\\"XParams:struct\\\":\\\"{\\\\\\\"XParam0:num\\\\\\\":\\\\\\\"0.00\\\\\\\",\\\\\\\"XParam1:num\\\\\\\":\\\\\\\"0.00\\\\\\\",\\\\\\\"XParam2:num\\\\\\\":\\\\\\\"0.00\\\\\\\",\\\\\\\"XParam3:num\\\\\\\":\\\\\\\"0.00\\\\\\\",\\\\\\\"XParam4:num\\\\\\\":\\\\\\\"0.00\\\\\\\",\\\\\\\"XParam5:num\\\\\\\":\\\\\\\"0.00\\\\\\\",\\\\\\\"XParam6:num\\\\\\\":\\\\\\\"0.00\\\\\\\",\\\\\\\"XParam7:num\\\\\\\":\\\\\\\"0.00\\\\\\\",\\\\\\\"XParam8:num\\\\\\\":\\\\\\\"0.05\\\\\\\",\\\\\\\"XParam9:num\\\\\\\":\\\\\\\"0.00\\\\\\\"}\\\",\\\"SParams:struct\\\":\\\"{}\\\",\\\"PassiveStates:arraynum\\\":\\\"[]\\\",\\\"Equipment\\\":\\\"\\\",\\\"Wtypes:arraynum\\\":\\\"[]\\\",\\\"Atypes:arraynum\\\":\\\"[]\\\",\\\"EnemyRewards\\\":\\\"\\\",\\\"EXPRate:num\\\":\\\"1.00\\\",\\\"GoldRate:num\\\":\\\"1.00\\\",\\\"DropRate:num\\\":\\\"1.00\\\"}\"]"}
 *
 * @param Curse:struct
 * @text Curse Sets
 * @parent TraitSetSettings:struct
 * @type struct<TraitSetType>
 * @desc The settings for the Main Element Trait Set Type.
 * @default {"Name:str":"Curse","Label:str":"Curse","Visible:eval":"true","RandomizeActor:eval":"false","RandomizeEnemy:eval":"false","Default:struct":"{\"Name:str\":\"No Curse\",\"Display:str\":\"\\\\I[160]No Curse\",\"Description:json\":\"\\\"This unit has not been cursed.\\\"\",\"FmtText:str\":\"\",\"RandomValid:eval\":\"true\",\"RandomWeight:num\":\"6\",\"Traits\":\"\",\"ElementRate:struct\":\"{}\",\"Params:struct\":\"{}\",\"XParams:struct\":\"{}\",\"SParams:struct\":\"{}\",\"PassiveStates:arraynum\":\"[]\",\"Equipment\":\"\",\"Wtypes:arraynum\":\"[]\",\"Atypes:arraynum\":\"[]\",\"EnemyRewards\":\"\",\"EXPRate:num\":\"1.00\",\"GoldRate:num\":\"1.00\",\"DropRate:num\":\"1.00\"}","List:arraystruct":"[\"{\\\"Name:str\\\":\\\"Clumsy\\\",\\\"Display:str\\\":\\\"\\\\\\\\I[170]Clumsy\\\",\\\"Description:json\\\":\\\"\\\\\\\"This unit has less HIT.\\\\\\\"\\\",\\\"FmtText:str\\\":\\\"Clumsy\\\",\\\"RandomValid:eval\\\":\\\"true\\\",\\\"RandomWeight:num\\\":\\\"1\\\",\\\"Traits\\\":\\\"\\\",\\\"ElementRate:struct\\\":\\\"{}\\\",\\\"Params:struct\\\":\\\"{}\\\",\\\"XParams:struct\\\":\\\"{\\\\\\\"XParam0:num\\\\\\\":\\\\\\\"-0.10\\\\\\\",\\\\\\\"XParam1:num\\\\\\\":\\\\\\\"0.00\\\\\\\",\\\\\\\"XParam2:num\\\\\\\":\\\\\\\"0.00\\\\\\\",\\\\\\\"XParam3:num\\\\\\\":\\\\\\\"0.00\\\\\\\",\\\\\\\"XParam4:num\\\\\\\":\\\\\\\"0.00\\\\\\\",\\\\\\\"XParam5:num\\\\\\\":\\\\\\\"0.00\\\\\\\",\\\\\\\"XParam6:num\\\\\\\":\\\\\\\"0.00\\\\\\\",\\\\\\\"XParam7:num\\\\\\\":\\\\\\\"0.00\\\\\\\",\\\\\\\"XParam8:num\\\\\\\":\\\\\\\"0.00\\\\\\\",\\\\\\\"XParam9:num\\\\\\\":\\\\\\\"0.00\\\\\\\"}\\\",\\\"SParams:struct\\\":\\\"{}\\\",\\\"PassiveStates:arraynum\\\":\\\"[]\\\",\\\"Equipment\\\":\\\"\\\",\\\"Wtypes:arraynum\\\":\\\"[]\\\",\\\"Atypes:arraynum\\\":\\\"[]\\\",\\\"EnemyRewards\\\":\\\"\\\",\\\"EXPRate:num\\\":\\\"1.00\\\",\\\"GoldRate:num\\\":\\\"1.00\\\",\\\"DropRate:num\\\":\\\"1.00\\\"}\",\"{\\\"Name:str\\\":\\\"Dazed\\\",\\\"Display:str\\\":\\\"\\\\\\\\I[170]Dazed\\\",\\\"Description:json\\\":\\\"\\\\\\\"This unit has less EVA.\\\\\\\"\\\",\\\"FmtText:str\\\":\\\"Dazed\\\",\\\"RandomValid:eval\\\":\\\"true\\\",\\\"RandomWeight:num\\\":\\\"1\\\",\\\"Traits\\\":\\\"\\\",\\\"ElementRate:struct\\\":\\\"{}\\\",\\\"Params:struct\\\":\\\"{}\\\",\\\"XParams:struct\\\":\\\"{\\\\\\\"XParam0:num\\\\\\\":\\\\\\\"0.00\\\\\\\",\\\\\\\"XParam1:num\\\\\\\":\\\\\\\"-0.10\\\\\\\",\\\\\\\"XParam2:num\\\\\\\":\\\\\\\"0.00\\\\\\\",\\\\\\\"XParam3:num\\\\\\\":\\\\\\\"0.00\\\\\\\",\\\\\\\"XParam4:num\\\\\\\":\\\\\\\"0.00\\\\\\\",\\\\\\\"XParam5:num\\\\\\\":\\\\\\\"0.00\\\\\\\",\\\\\\\"XParam6:num\\\\\\\":\\\\\\\"0.00\\\\\\\",\\\\\\\"XParam7:num\\\\\\\":\\\\\\\"0.00\\\\\\\",\\\\\\\"XParam8:num\\\\\\\":\\\\\\\"0.00\\\\\\\",\\\\\\\"XParam9:num\\\\\\\":\\\\\\\"0.00\\\\\\\"}\\\",\\\"SParams:struct\\\":\\\"{}\\\",\\\"PassiveStates:arraynum\\\":\\\"[]\\\",\\\"Equipment\\\":\\\"\\\",\\\"Wtypes:arraynum\\\":\\\"[]\\\",\\\"Atypes:arraynum\\\":\\\"[]\\\",\\\"EnemyRewards\\\":\\\"\\\",\\\"EXPRate:num\\\":\\\"1.00\\\",\\\"GoldRate:num\\\":\\\"1.00\\\",\\\"DropRate:num\\\":\\\"1.00\\\"}\",\"{\\\"Name:str\\\":\\\"Fitful\\\",\\\"Display:str\\\":\\\"\\\\\\\\I[170]Fitful\\\",\\\"Description:json\\\":\\\"\\\\\\\"This unit has less CRI.\\\\\\\"\\\",\\\"FmtText:str\\\":\\\"Fitful\\\",\\\"RandomValid:eval\\\":\\\"true\\\",\\\"RandomWeight:num\\\":\\\"1\\\",\\\"Traits\\\":\\\"\\\",\\\"ElementRate:struct\\\":\\\"{}\\\",\\\"Params:struct\\\":\\\"{}\\\",\\\"XParams:struct\\\":\\\"{\\\\\\\"XParam0:num\\\\\\\":\\\\\\\"0.00\\\\\\\",\\\\\\\"XParam1:num\\\\\\\":\\\\\\\"0.00\\\\\\\",\\\\\\\"XParam2:num\\\\\\\":\\\\\\\"-0.10\\\\\\\",\\\\\\\"XParam3:num\\\\\\\":\\\\\\\"0.00\\\\\\\",\\\\\\\"XParam4:num\\\\\\\":\\\\\\\"0.00\\\\\\\",\\\\\\\"XParam5:num\\\\\\\":\\\\\\\"0.00\\\\\\\",\\\\\\\"XParam6:num\\\\\\\":\\\\\\\"0.00\\\\\\\",\\\\\\\"XParam7:num\\\\\\\":\\\\\\\"0.00\\\\\\\",\\\\\\\"XParam8:num\\\\\\\":\\\\\\\"0.00\\\\\\\",\\\\\\\"XParam9:num\\\\\\\":\\\\\\\"0.00\\\\\\\"}\\\",\\\"SParams:struct\\\":\\\"{}\\\",\\\"PassiveStates:arraynum\\\":\\\"[]\\\",\\\"Equipment\\\":\\\"\\\",\\\"Wtypes:arraynum\\\":\\\"[]\\\",\\\"Atypes:arraynum\\\":\\\"[]\\\",\\\"EnemyRewards\\\":\\\"\\\",\\\"EXPRate:num\\\":\\\"1.00\\\",\\\"GoldRate:num\\\":\\\"1.00\\\",\\\"DropRate:num\\\":\\\"1.00\\\"}\",\"{\\\"Name:str\\\":\\\"Drained\\\",\\\"Display:str\\\":\\\"\\\\\\\\I[170]Drained\\\",\\\"Description:json\\\":\\\"\\\\\\\"This unit receives less healing.\\\\\\\"\\\",\\\"FmtText:str\\\":\\\"Drained\\\",\\\"RandomValid:eval\\\":\\\"true\\\",\\\"RandomWeight:num\\\":\\\"1\\\",\\\"Traits\\\":\\\"\\\",\\\"ElementRate:struct\\\":\\\"{}\\\",\\\"Params:struct\\\":\\\"{}\\\",\\\"XParams:struct\\\":\\\"{}\\\",\\\"SParams:struct\\\":\\\"{\\\\\\\"SParam0:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"SParam1:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"SParam2:num\\\\\\\":\\\\\\\"0.80\\\\\\\",\\\\\\\"SParam3:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"SParam4:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"SParam5:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"SParam6:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"SParam7:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"SParam8:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"SParam9:num\\\\\\\":\\\\\\\"1.00\\\\\\\"}\\\",\\\"PassiveStates:arraynum\\\":\\\"[]\\\",\\\"Equipment\\\":\\\"\\\",\\\"Wtypes:arraynum\\\":\\\"[]\\\",\\\"Atypes:arraynum\\\":\\\"[]\\\",\\\"EnemyRewards\\\":\\\"\\\",\\\"EXPRate:num\\\":\\\"1.00\\\",\\\"GoldRate:num\\\":\\\"1.00\\\",\\\"DropRate:num\\\":\\\"1.00\\\"}\",\"{\\\"Name:str\\\":\\\"Inefficient\\\",\\\"Display:str\\\":\\\"\\\\\\\\I[170]Inefficient\\\",\\\"Description:json\\\":\\\"\\\\\\\"This unit uses more MP.\\\\\\\"\\\",\\\"FmtText:str\\\":\\\"Inefficient\\\",\\\"RandomValid:eval\\\":\\\"true\\\",\\\"RandomWeight:num\\\":\\\"1\\\",\\\"Traits\\\":\\\"\\\",\\\"ElementRate:struct\\\":\\\"{}\\\",\\\"Params:struct\\\":\\\"{}\\\",\\\"XParams:struct\\\":\\\"{}\\\",\\\"SParams:struct\\\":\\\"{\\\\\\\"SParam0:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"SParam1:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"SParam2:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"SParam3:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"SParam4:num\\\\\\\":\\\\\\\"1.20\\\\\\\",\\\\\\\"SParam5:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"SParam6:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"SParam7:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"SParam8:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"SParam9:num\\\\\\\":\\\\\\\"1.00\\\\\\\"}\\\",\\\"PassiveStates:arraynum\\\":\\\"[]\\\",\\\"Equipment\\\":\\\"\\\",\\\"Wtypes:arraynum\\\":\\\"[]\\\",\\\"Atypes:arraynum\\\":\\\"[]\\\",\\\"EnemyRewards\\\":\\\"\\\",\\\"EXPRate:num\\\":\\\"1.00\\\",\\\"GoldRate:num\\\":\\\"1.00\\\",\\\"DropRate:num\\\":\\\"1.00\\\"}\",\"{\\\"Name:str\\\":\\\"Unmotivated\\\",\\\"Display:str\\\":\\\"\\\\\\\\I[170]Unmotivated\\\",\\\"Description:json\\\":\\\"\\\\\\\"This unit gaines less TP.\\\\\\\"\\\",\\\"FmtText:str\\\":\\\"Unmotivated\\\",\\\"RandomValid:eval\\\":\\\"true\\\",\\\"RandomWeight:num\\\":\\\"1\\\",\\\"Traits\\\":\\\"\\\",\\\"ElementRate:struct\\\":\\\"{}\\\",\\\"Params:struct\\\":\\\"{}\\\",\\\"XParams:struct\\\":\\\"{}\\\",\\\"SParams:struct\\\":\\\"{\\\\\\\"SParam0:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"SParam1:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"SParam2:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"SParam3:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"SParam4:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"SParam5:num\\\\\\\":\\\\\\\"0.80\\\\\\\",\\\\\\\"SParam6:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"SParam7:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"SParam8:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"SParam9:num\\\\\\\":\\\\\\\"1.00\\\\\\\"}\\\",\\\"PassiveStates:arraynum\\\":\\\"[]\\\",\\\"Equipment\\\":\\\"\\\",\\\"Wtypes:arraynum\\\":\\\"[]\\\",\\\"Atypes:arraynum\\\":\\\"[]\\\",\\\"EnemyRewards\\\":\\\"\\\",\\\"EXPRate:num\\\":\\\"1.00\\\",\\\"GoldRate:num\\\":\\\"1.00\\\",\\\"DropRate:num\\\":\\\"1.00\\\"}\"]"}
 *
 * @param Zodiac:struct
 * @text Zodiac Sets
 * @parent TraitSetSettings:struct
 * @type struct<TraitSetType>
 * @desc The settings for the Main Element Trait Set Type.
 * @default {"Name:str":"Zodiac","Label:str":"Zodiac","Visible:eval":"true","RandomizeActor:eval":"false","RandomizeEnemy:eval":"false","Default:struct":"{\"Name:str\":\"Unknown\",\"Display:str\":\"\\\\I[160]Unknown\",\"Description:json\":\"\\\"This unit's Zodiac is unknown.\\\"\",\"FmtText:str\":\"\",\"RandomValid:eval\":\"false\",\"RandomWeight:num\":\"1\",\"Traits\":\"\",\"ElementRate:struct\":\"{}\",\"Params:struct\":\"{}\",\"XParams:struct\":\"{}\",\"SParams:struct\":\"{}\",\"PassiveStates:arraynum\":\"[]\",\"Equipment\":\"\",\"Wtypes:arraynum\":\"[]\",\"Atypes:arraynum\":\"[]\",\"EnemyRewards\":\"\",\"EXPRate:num\":\"1.00\",\"GoldRate:num\":\"1.00\",\"DropRate:num\":\"1.00\"}","List:arraystruct":"[\"{\\\"Name:str\\\":\\\"Aries\\\",\\\"Display:str\\\":\\\"\\\\\\\\I[88]Aries\\\",\\\"Description:json\\\":\\\"\\\\\\\"This unit has a slight increase to ATK.\\\\\\\"\\\",\\\"FmtText:str\\\":\\\"♈\\\",\\\"RandomValid:eval\\\":\\\"true\\\",\\\"RandomWeight:num\\\":\\\"10\\\",\\\"Traits\\\":\\\"\\\",\\\"ElementRate:struct\\\":\\\"{}\\\",\\\"Params:struct\\\":\\\"{\\\\\\\"Param0:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Param1:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Param2:num\\\\\\\":\\\\\\\"1.05\\\\\\\",\\\\\\\"Param3:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Param4:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Param5:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Param6:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Param7:num\\\\\\\":\\\\\\\"1.00\\\\\\\"}\\\",\\\"XParams:struct\\\":\\\"{}\\\",\\\"SParams:struct\\\":\\\"{}\\\",\\\"PassiveStates:arraynum\\\":\\\"[]\\\",\\\"Equipment\\\":\\\"\\\",\\\"Wtypes:arraynum\\\":\\\"[]\\\",\\\"Atypes:arraynum\\\":\\\"[]\\\",\\\"EnemyRewards\\\":\\\"\\\",\\\"EXPRate:num\\\":\\\"1.00\\\",\\\"GoldRate:num\\\":\\\"1.00\\\",\\\"DropRate:num\\\":\\\"1.00\\\"}\",\"{\\\"Name:str\\\":\\\"Taurus\\\",\\\"Display:str\\\":\\\"\\\\\\\\I[88]Taurus\\\",\\\"Description:json\\\":\\\"\\\\\\\"This unit has a slight resistance to \\\\\\\\\\\\\\\\I[68]Earth.\\\\\\\"\\\",\\\"FmtText:str\\\":\\\"♋\\\",\\\"RandomValid:eval\\\":\\\"true\\\",\\\"RandomWeight:num\\\":\\\"10\\\",\\\"Traits\\\":\\\"\\\",\\\"ElementRate:struct\\\":\\\"{\\\\\\\"Element1:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element2:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element3:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element4:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element5:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element6:num\\\\\\\":\\\\\\\"0.95\\\\\\\",\\\\\\\"Element7:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element8:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element9:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element10:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element11:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element12:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element13:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element14:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element15:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element16:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element17:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element18:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element19:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element20:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element21:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element22:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element23:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element24:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element25:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element26:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element27:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element28:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element29:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element30:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element31:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element32:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element33:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element34:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element35:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element36:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element37:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element38:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element39:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element40:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element41:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element42:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element43:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element44:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element45:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element46:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element47:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element48:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element49:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element50:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element51:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element52:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element53:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element54:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element55:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element56:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element57:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element58:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element59:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element60:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element61:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element62:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element63:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element64:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element65:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element66:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element67:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element68:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element69:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element70:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element71:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element72:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element73:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element74:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element75:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element76:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element77:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element78:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element79:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element80:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element81:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element82:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element83:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element84:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element85:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element86:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element87:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element88:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element89:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element90:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element91:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element92:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element93:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element94:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element95:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element96:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element97:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element98:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element99:num\\\\\\\":\\\\\\\"1.00\\\\\\\"}\\\",\\\"Params:struct\\\":\\\"{}\\\",\\\"XParams:struct\\\":\\\"{}\\\",\\\"SParams:struct\\\":\\\"{}\\\",\\\"PassiveStates:arraynum\\\":\\\"[]\\\",\\\"Equipment\\\":\\\"\\\",\\\"Wtypes:arraynum\\\":\\\"[]\\\",\\\"Atypes:arraynum\\\":\\\"[]\\\",\\\"EnemyRewards\\\":\\\"\\\",\\\"EXPRate:num\\\":\\\"1.00\\\",\\\"GoldRate:num\\\":\\\"1.00\\\",\\\"DropRate:num\\\":\\\"1.00\\\"}\",\"{\\\"Name:str\\\":\\\"Gemini\\\",\\\"Display:str\\\":\\\"\\\\\\\\I[88]Gemini\\\",\\\"Description:json\\\":\\\"\\\\\\\"This unit has a slight increase to AGI.\\\\\\\"\\\",\\\"FmtText:str\\\":\\\"♊\\\",\\\"RandomValid:eval\\\":\\\"true\\\",\\\"RandomWeight:num\\\":\\\"10\\\",\\\"Traits\\\":\\\"\\\",\\\"ElementRate:struct\\\":\\\"{}\\\",\\\"Params:struct\\\":\\\"{\\\\\\\"Param0:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Param1:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Param2:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Param3:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Param4:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Param5:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Param6:num\\\\\\\":\\\\\\\"1.05\\\\\\\",\\\\\\\"Param7:num\\\\\\\":\\\\\\\"1.00\\\\\\\"}\\\",\\\"XParams:struct\\\":\\\"{}\\\",\\\"SParams:struct\\\":\\\"{}\\\",\\\"PassiveStates:arraynum\\\":\\\"[]\\\",\\\"Equipment\\\":\\\"\\\",\\\"Wtypes:arraynum\\\":\\\"[]\\\",\\\"Atypes:arraynum\\\":\\\"[]\\\",\\\"EnemyRewards\\\":\\\"\\\",\\\"EXPRate:num\\\":\\\"1.00\\\",\\\"GoldRate:num\\\":\\\"1.00\\\",\\\"DropRate:num\\\":\\\"1.00\\\"}\",\"{\\\"Name:str\\\":\\\"Cancer\\\",\\\"Display:str\\\":\\\"\\\\\\\\I[88]Cancer\\\",\\\"Description:json\\\":\\\"\\\\\\\"This unit has a slight increase to DEF.\\\\\\\"\\\",\\\"FmtText:str\\\":\\\"♋\\\",\\\"RandomValid:eval\\\":\\\"true\\\",\\\"RandomWeight:num\\\":\\\"10\\\",\\\"Traits\\\":\\\"\\\",\\\"ElementRate:struct\\\":\\\"{}\\\",\\\"Params:struct\\\":\\\"{\\\\\\\"Param0:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Param1:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Param2:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Param3:num\\\\\\\":\\\\\\\"1.05\\\\\\\",\\\\\\\"Param4:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Param5:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Param6:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Param7:num\\\\\\\":\\\\\\\"1.00\\\\\\\"}\\\",\\\"XParams:struct\\\":\\\"{}\\\",\\\"SParams:struct\\\":\\\"{}\\\",\\\"PassiveStates:arraynum\\\":\\\"[]\\\",\\\"Equipment\\\":\\\"\\\",\\\"Wtypes:arraynum\\\":\\\"[]\\\",\\\"Atypes:arraynum\\\":\\\"[]\\\",\\\"EnemyRewards\\\":\\\"\\\",\\\"EXPRate:num\\\":\\\"1.00\\\",\\\"GoldRate:num\\\":\\\"1.00\\\",\\\"DropRate:num\\\":\\\"1.00\\\"}\",\"{\\\"Name:str\\\":\\\"Leo\\\",\\\"Display:str\\\":\\\"\\\\\\\\I[88]Leo\\\",\\\"Description:json\\\":\\\"\\\\\\\"This unit has a slight resistance to \\\\\\\\\\\\\\\\I[64]Fire.\\\\\\\"\\\",\\\"FmtText:str\\\":\\\"♌\\\",\\\"RandomValid:eval\\\":\\\"true\\\",\\\"RandomWeight:num\\\":\\\"10\\\",\\\"Traits\\\":\\\"\\\",\\\"ElementRate:struct\\\":\\\"{\\\\\\\"Element1:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element2:num\\\\\\\":\\\\\\\"0.95\\\\\\\",\\\\\\\"Element3:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element4:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element5:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element6:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element7:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element8:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element9:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element10:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element11:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element12:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element13:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element14:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element15:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element16:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element17:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element18:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element19:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element20:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element21:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element22:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element23:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element24:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element25:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element26:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element27:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element28:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element29:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element30:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element31:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element32:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element33:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element34:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element35:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element36:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element37:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element38:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element39:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element40:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element41:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element42:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element43:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element44:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element45:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element46:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element47:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element48:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element49:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element50:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element51:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element52:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element53:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element54:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element55:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element56:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element57:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element58:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element59:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element60:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element61:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element62:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element63:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element64:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element65:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element66:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element67:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element68:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element69:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element70:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element71:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element72:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element73:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element74:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element75:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element76:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element77:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element78:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element79:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element80:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element81:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element82:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element83:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element84:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element85:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element86:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element87:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element88:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element89:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element90:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element91:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element92:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element93:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element94:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element95:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element96:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element97:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element98:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element99:num\\\\\\\":\\\\\\\"1.00\\\\\\\"}\\\",\\\"Params:struct\\\":\\\"{}\\\",\\\"XParams:struct\\\":\\\"{}\\\",\\\"SParams:struct\\\":\\\"{}\\\",\\\"PassiveStates:arraynum\\\":\\\"[]\\\",\\\"Equipment\\\":\\\"\\\",\\\"Wtypes:arraynum\\\":\\\"[]\\\",\\\"Atypes:arraynum\\\":\\\"[]\\\",\\\"EnemyRewards\\\":\\\"\\\",\\\"EXPRate:num\\\":\\\"1.00\\\",\\\"GoldRate:num\\\":\\\"1.00\\\",\\\"DropRate:num\\\":\\\"1.00\\\"}\",\"{\\\"Name:str\\\":\\\"Virgo\\\",\\\"Display:str\\\":\\\"\\\\\\\\I[88]Virgo\\\",\\\"Description:json\\\":\\\"\\\\\\\"This unit has a slight increase to MAT.\\\\\\\"\\\",\\\"FmtText:str\\\":\\\"♍\\\",\\\"RandomValid:eval\\\":\\\"true\\\",\\\"RandomWeight:num\\\":\\\"10\\\",\\\"Traits\\\":\\\"\\\",\\\"ElementRate:struct\\\":\\\"{}\\\",\\\"Params:struct\\\":\\\"{\\\\\\\"Param0:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Param1:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Param2:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Param3:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Param4:num\\\\\\\":\\\\\\\"1.05\\\\\\\",\\\\\\\"Param5:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Param6:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Param7:num\\\\\\\":\\\\\\\"1.00\\\\\\\"}\\\",\\\"XParams:struct\\\":\\\"{}\\\",\\\"SParams:struct\\\":\\\"{}\\\",\\\"PassiveStates:arraynum\\\":\\\"[]\\\",\\\"Equipment\\\":\\\"\\\",\\\"Wtypes:arraynum\\\":\\\"[]\\\",\\\"Atypes:arraynum\\\":\\\"[]\\\",\\\"EnemyRewards\\\":\\\"\\\",\\\"EXPRate:num\\\":\\\"1.00\\\",\\\"GoldRate:num\\\":\\\"1.00\\\",\\\"DropRate:num\\\":\\\"1.00\\\"}\",\"{\\\"Name:str\\\":\\\"Libra\\\",\\\"Display:str\\\":\\\"\\\\\\\\I[88]Libra\\\",\\\"Description:json\\\":\\\"\\\\\\\"This unit has a slight increase to MDF.\\\\\\\"\\\",\\\"FmtText:str\\\":\\\"♎\\\",\\\"RandomValid:eval\\\":\\\"true\\\",\\\"RandomWeight:num\\\":\\\"10\\\",\\\"Traits\\\":\\\"\\\",\\\"ElementRate:struct\\\":\\\"{}\\\",\\\"Params:struct\\\":\\\"{\\\\\\\"Param0:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Param1:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Param2:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Param3:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Param4:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Param5:num\\\\\\\":\\\\\\\"1.05\\\\\\\",\\\\\\\"Param6:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Param7:num\\\\\\\":\\\\\\\"1.00\\\\\\\"}\\\",\\\"XParams:struct\\\":\\\"{}\\\",\\\"SParams:struct\\\":\\\"{}\\\",\\\"PassiveStates:arraynum\\\":\\\"[]\\\",\\\"Equipment\\\":\\\"\\\",\\\"Wtypes:arraynum\\\":\\\"[]\\\",\\\"Atypes:arraynum\\\":\\\"[]\\\",\\\"EnemyRewards\\\":\\\"\\\",\\\"EXPRate:num\\\":\\\"1.00\\\",\\\"GoldRate:num\\\":\\\"1.00\\\",\\\"DropRate:num\\\":\\\"1.00\\\"}\",\"{\\\"Name:str\\\":\\\"Scorpio\\\",\\\"Display:str\\\":\\\"\\\\\\\\I[88]Scorpio\\\",\\\"Description:json\\\":\\\"\\\\\\\"This unit has a slight resistance to \\\\\\\\\\\\\\\\I[66]Thunder.\\\\\\\"\\\",\\\"FmtText:str\\\":\\\"♏\\\",\\\"RandomValid:eval\\\":\\\"true\\\",\\\"RandomWeight:num\\\":\\\"10\\\",\\\"Traits\\\":\\\"\\\",\\\"ElementRate:struct\\\":\\\"{\\\\\\\"Element1:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element2:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element3:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element4:num\\\\\\\":\\\\\\\"0.95\\\\\\\",\\\\\\\"Element5:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element6:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element7:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element8:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element9:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element10:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element11:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element12:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element13:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element14:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element15:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element16:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element17:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element18:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element19:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element20:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element21:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element22:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element23:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element24:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element25:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element26:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element27:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element28:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element29:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element30:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element31:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element32:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element33:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element34:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element35:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element36:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element37:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element38:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element39:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element40:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element41:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element42:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element43:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element44:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element45:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element46:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element47:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element48:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element49:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element50:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element51:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element52:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element53:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element54:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element55:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element56:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element57:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element58:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element59:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element60:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element61:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element62:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element63:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element64:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element65:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element66:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element67:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element68:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element69:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element70:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element71:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element72:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element73:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element74:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element75:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element76:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element77:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element78:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element79:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element80:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element81:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element82:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element83:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element84:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element85:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element86:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element87:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element88:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element89:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element90:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element91:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element92:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element93:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element94:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element95:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element96:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element97:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element98:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element99:num\\\\\\\":\\\\\\\"1.00\\\\\\\"}\\\",\\\"Params:struct\\\":\\\"{}\\\",\\\"XParams:struct\\\":\\\"{}\\\",\\\"SParams:struct\\\":\\\"{}\\\",\\\"PassiveStates:arraynum\\\":\\\"[]\\\",\\\"Equipment\\\":\\\"\\\",\\\"Wtypes:arraynum\\\":\\\"[]\\\",\\\"Atypes:arraynum\\\":\\\"[]\\\",\\\"EnemyRewards\\\":\\\"\\\",\\\"EXPRate:num\\\":\\\"1.00\\\",\\\"GoldRate:num\\\":\\\"1.00\\\",\\\"DropRate:num\\\":\\\"1.00\\\"}\",\"{\\\"Name:str\\\":\\\"Sagittarius\\\",\\\"Display:str\\\":\\\"\\\\\\\\I[88]Sagittarius\\\",\\\"Description:json\\\":\\\"\\\\\\\"This unit has a slight increase to LUK.\\\\\\\"\\\",\\\"FmtText:str\\\":\\\"♐\\\",\\\"RandomValid:eval\\\":\\\"true\\\",\\\"RandomWeight:num\\\":\\\"10\\\",\\\"Traits\\\":\\\"\\\",\\\"ElementRate:struct\\\":\\\"{}\\\",\\\"Params:struct\\\":\\\"{\\\\\\\"Param0:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Param1:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Param2:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Param3:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Param4:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Param5:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Param6:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Param7:num\\\\\\\":\\\\\\\"1.05\\\\\\\"}\\\",\\\"XParams:struct\\\":\\\"{}\\\",\\\"SParams:struct\\\":\\\"{}\\\",\\\"PassiveStates:arraynum\\\":\\\"[]\\\",\\\"Equipment\\\":\\\"\\\",\\\"Wtypes:arraynum\\\":\\\"[]\\\",\\\"Atypes:arraynum\\\":\\\"[]\\\",\\\"EnemyRewards\\\":\\\"\\\",\\\"EXPRate:num\\\":\\\"1.00\\\",\\\"GoldRate:num\\\":\\\"1.00\\\",\\\"DropRate:num\\\":\\\"1.00\\\"}\",\"{\\\"Name:str\\\":\\\"Capricorn\\\",\\\"Display:str\\\":\\\"\\\\\\\\I[88]Capricorn\\\",\\\"Description:json\\\":\\\"\\\\\\\"This unit has a slight resistance to \\\\\\\\\\\\\\\\I[69]Wind.\\\\\\\"\\\",\\\"FmtText:str\\\":\\\"♑\\\",\\\"RandomValid:eval\\\":\\\"true\\\",\\\"RandomWeight:num\\\":\\\"10\\\",\\\"Traits\\\":\\\"\\\",\\\"ElementRate:struct\\\":\\\"{\\\\\\\"Element1:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element2:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element3:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element4:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element5:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element6:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element7:num\\\\\\\":\\\\\\\"0.95\\\\\\\",\\\\\\\"Element8:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element9:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element10:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element11:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element12:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element13:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element14:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element15:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element16:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element17:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element18:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element19:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element20:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element21:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element22:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element23:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element24:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element25:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element26:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element27:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element28:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element29:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element30:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element31:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element32:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element33:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element34:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element35:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element36:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element37:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element38:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element39:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element40:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element41:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element42:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element43:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element44:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element45:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element46:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element47:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element48:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element49:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element50:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element51:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element52:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element53:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element54:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element55:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element56:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element57:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element58:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element59:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element60:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element61:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element62:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element63:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element64:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element65:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element66:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element67:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element68:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element69:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element70:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element71:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element72:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element73:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element74:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element75:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element76:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element77:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element78:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element79:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element80:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element81:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element82:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element83:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element84:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element85:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element86:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element87:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element88:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element89:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element90:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element91:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element92:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element93:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element94:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element95:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element96:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element97:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element98:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element99:num\\\\\\\":\\\\\\\"1.00\\\\\\\"}\\\",\\\"Params:struct\\\":\\\"{}\\\",\\\"XParams:struct\\\":\\\"{}\\\",\\\"SParams:struct\\\":\\\"{}\\\",\\\"PassiveStates:arraynum\\\":\\\"[]\\\",\\\"Equipment\\\":\\\"\\\",\\\"Wtypes:arraynum\\\":\\\"[]\\\",\\\"Atypes:arraynum\\\":\\\"[]\\\",\\\"EnemyRewards\\\":\\\"\\\",\\\"EXPRate:num\\\":\\\"1.00\\\",\\\"GoldRate:num\\\":\\\"1.00\\\",\\\"DropRate:num\\\":\\\"1.00\\\"}\",\"{\\\"Name:str\\\":\\\"Aquarius\\\",\\\"Display:str\\\":\\\"\\\\\\\\I[88]Aquarius\\\",\\\"Description:json\\\":\\\"\\\\\\\"This unit has a slight resistance to \\\\\\\\\\\\\\\\I[67]Water.\\\\\\\"\\\",\\\"FmtText:str\\\":\\\"♒\\\",\\\"RandomValid:eval\\\":\\\"true\\\",\\\"RandomWeight:num\\\":\\\"10\\\",\\\"Traits\\\":\\\"\\\",\\\"ElementRate:struct\\\":\\\"{\\\\\\\"Element1:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element2:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element3:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element4:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element5:num\\\\\\\":\\\\\\\"0.95\\\\\\\",\\\\\\\"Element6:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element7:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element8:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element9:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element10:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element11:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element12:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element13:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element14:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element15:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element16:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element17:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element18:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element19:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element20:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element21:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element22:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element23:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element24:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element25:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element26:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element27:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element28:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element29:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element30:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element31:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element32:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element33:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element34:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element35:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element36:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element37:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element38:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element39:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element40:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element41:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element42:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element43:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element44:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element45:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element46:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element47:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element48:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element49:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element50:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element51:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element52:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element53:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element54:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element55:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element56:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element57:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element58:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element59:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element60:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element61:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element62:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element63:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element64:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element65:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element66:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element67:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element68:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element69:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element70:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element71:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element72:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element73:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element74:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element75:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element76:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element77:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element78:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element79:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element80:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element81:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element82:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element83:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element84:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element85:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element86:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element87:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element88:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element89:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element90:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element91:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element92:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element93:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element94:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element95:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element96:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element97:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element98:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element99:num\\\\\\\":\\\\\\\"1.00\\\\\\\"}\\\",\\\"Params:struct\\\":\\\"{}\\\",\\\"XParams:struct\\\":\\\"{}\\\",\\\"SParams:struct\\\":\\\"{}\\\",\\\"PassiveStates:arraynum\\\":\\\"[]\\\",\\\"Equipment\\\":\\\"\\\",\\\"Wtypes:arraynum\\\":\\\"[]\\\",\\\"Atypes:arraynum\\\":\\\"[]\\\",\\\"EnemyRewards\\\":\\\"\\\",\\\"EXPRate:num\\\":\\\"1.00\\\",\\\"GoldRate:num\\\":\\\"1.00\\\",\\\"DropRate:num\\\":\\\"1.00\\\"}\",\"{\\\"Name:str\\\":\\\"Pisces\\\",\\\"Display:str\\\":\\\"\\\\\\\\I[88]Pisces\\\",\\\"Description:json\\\":\\\"\\\\\\\"This unit has a slight resistance to \\\\\\\\\\\\\\\\I[65]Ice.\\\\\\\"\\\",\\\"FmtText:str\\\":\\\"♓\\\",\\\"RandomValid:eval\\\":\\\"true\\\",\\\"RandomWeight:num\\\":\\\"10\\\",\\\"Traits\\\":\\\"\\\",\\\"ElementRate:struct\\\":\\\"{\\\\\\\"Element1:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element2:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element3:num\\\\\\\":\\\\\\\"0.95\\\\\\\",\\\\\\\"Element4:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element5:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element6:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element7:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element8:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element9:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element10:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element11:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element12:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element13:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element14:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element15:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element16:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element17:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element18:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element19:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element20:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element21:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element22:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element23:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element24:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element25:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element26:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element27:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element28:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element29:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element30:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element31:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element32:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element33:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element34:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element35:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element36:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element37:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element38:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element39:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element40:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element41:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element42:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element43:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element44:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element45:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element46:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element47:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element48:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element49:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element50:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element51:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element52:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element53:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element54:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element55:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element56:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element57:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element58:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element59:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element60:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element61:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element62:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element63:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element64:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element65:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element66:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element67:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element68:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element69:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element70:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element71:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element72:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element73:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element74:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element75:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element76:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element77:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element78:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element79:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element80:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element81:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element82:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element83:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element84:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element85:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element86:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element87:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element88:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element89:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element90:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element91:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element92:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element93:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element94:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element95:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element96:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element97:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element98:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element99:num\\\\\\\":\\\\\\\"1.00\\\\\\\"}\\\",\\\"Params:struct\\\":\\\"{}\\\",\\\"XParams:struct\\\":\\\"{}\\\",\\\"SParams:struct\\\":\\\"{}\\\",\\\"PassiveStates:arraynum\\\":\\\"[]\\\",\\\"Equipment\\\":\\\"\\\",\\\"Wtypes:arraynum\\\":\\\"[]\\\",\\\"Atypes:arraynum\\\":\\\"[]\\\",\\\"EnemyRewards\\\":\\\"\\\",\\\"EXPRate:num\\\":\\\"1.00\\\",\\\"GoldRate:num\\\":\\\"1.00\\\",\\\"DropRate:num\\\":\\\"1.00\\\"}\",\"{\\\"Name:str\\\":\\\"Ophiuchus\\\",\\\"Display:str\\\":\\\"\\\\\\\\I[88]Ophiuchus\\\",\\\"Description:json\\\":\\\"\\\\\\\"This unit is the rare Ophiuchus zodiac.\\\\\\\"\\\",\\\"FmtText:str\\\":\\\"⛎\\\",\\\"RandomValid:eval\\\":\\\"false\\\",\\\"RandomWeight:num\\\":\\\"1\\\",\\\"Traits\\\":\\\"\\\",\\\"ElementRate:struct\\\":\\\"{}\\\",\\\"Params:struct\\\":\\\"{}\\\",\\\"XParams:struct\\\":\\\"{}\\\",\\\"SParams:struct\\\":\\\"{}\\\",\\\"PassiveStates:arraynum\\\":\\\"[]\\\",\\\"Equipment\\\":\\\"\\\",\\\"Wtypes:arraynum\\\":\\\"[]\\\",\\\"Atypes:arraynum\\\":\\\"[]\\\",\\\"EnemyRewards\\\":\\\"\\\",\\\"EXPRate:num\\\":\\\"1.00\\\",\\\"GoldRate:num\\\":\\\"1.00\\\",\\\"DropRate:num\\\":\\\"1.00\\\"}\"]"}
 *
 * @param Variant:struct
 * @text Variant Sets
 * @parent TraitSetSettings:struct
 * @type struct<TraitSetType>
 * @desc The settings for the Main Element Trait Set Type.
 * @default {"Name:str":"Variant","Label:str":"Variant","Visible:eval":"true","RandomizeActor:eval":"false","RandomizeEnemy:eval":"false","Default:struct":"{\"Name:str\":\"Normal\",\"Display:str\":\"\\\\I[160]Normal\",\"Description:json\":\"\\\"This is your average unit.\\\"\",\"FmtText:str\":\"\",\"RandomValid:eval\":\"true\",\"RandomWeight:num\":\"100\",\"Traits\":\"\",\"ElementRate:struct\":\"{}\",\"Params:struct\":\"{}\",\"XParams:struct\":\"{}\",\"SParams:struct\":\"{}\",\"PassiveStates:arraynum\":\"[]\",\"Equipment\":\"\",\"Wtypes:arraynum\":\"[]\",\"Atypes:arraynum\":\"[]\",\"EnemyRewards\":\"\",\"EXPRate:num\":\"1.00\",\"GoldRate:num\":\"1.00\",\"DropRate:num\":\"1.00\"}","List:arraystruct":"[\"{\\\"Name:str\\\":\\\"Mighty\\\",\\\"Display:str\\\":\\\"\\\\\\\\I[73]Mighty\\\",\\\"Description:json\\\":\\\"\\\\\\\"This unit has increased attributes.\\\\\\\"\\\",\\\"FmtText:str\\\":\\\"Mighty\\\",\\\"RandomValid:eval\\\":\\\"true\\\",\\\"RandomWeight:num\\\":\\\"5\\\",\\\"Traits\\\":\\\"\\\",\\\"ElementRate:struct\\\":\\\"{}\\\",\\\"Params:struct\\\":\\\"{\\\\\\\"Param0:num\\\\\\\":\\\\\\\"1.30\\\\\\\",\\\\\\\"Param1:num\\\\\\\":\\\\\\\"1.30\\\\\\\",\\\\\\\"Param2:num\\\\\\\":\\\\\\\"1.30\\\\\\\",\\\\\\\"Param3:num\\\\\\\":\\\\\\\"1.30\\\\\\\",\\\\\\\"Param4:num\\\\\\\":\\\\\\\"1.30\\\\\\\",\\\\\\\"Param5:num\\\\\\\":\\\\\\\"1.30\\\\\\\",\\\\\\\"Param6:num\\\\\\\":\\\\\\\"1.30\\\\\\\",\\\\\\\"Param7:num\\\\\\\":\\\\\\\"1.30\\\\\\\"}\\\",\\\"XParams:struct\\\":\\\"{}\\\",\\\"SParams:struct\\\":\\\"{}\\\",\\\"PassiveStates:arraynum\\\":\\\"[]\\\",\\\"Equipment\\\":\\\"\\\",\\\"Wtypes:arraynum\\\":\\\"[]\\\",\\\"Atypes:arraynum\\\":\\\"[]\\\",\\\"EnemyRewards\\\":\\\"\\\",\\\"EXPRate:num\\\":\\\"1.30\\\",\\\"GoldRate:num\\\":\\\"1.50\\\",\\\"DropRate:num\\\":\\\"2.00\\\"}\",\"{\\\"Name:str\\\":\\\"Major\\\",\\\"Display:str\\\":\\\"\\\\\\\\I[73]Major\\\",\\\"Description:json\\\":\\\"\\\\\\\"This unit has increased attributes.\\\\\\\"\\\",\\\"FmtText:str\\\":\\\"Major\\\",\\\"RandomValid:eval\\\":\\\"true\\\",\\\"RandomWeight:num\\\":\\\"10\\\",\\\"Traits\\\":\\\"\\\",\\\"ElementRate:struct\\\":\\\"{}\\\",\\\"Params:struct\\\":\\\"{\\\\\\\"Param0:num\\\\\\\":\\\\\\\"1.20\\\\\\\",\\\\\\\"Param1:num\\\\\\\":\\\\\\\"1.20\\\\\\\",\\\\\\\"Param2:num\\\\\\\":\\\\\\\"1.20\\\\\\\",\\\\\\\"Param3:num\\\\\\\":\\\\\\\"1.20\\\\\\\",\\\\\\\"Param4:num\\\\\\\":\\\\\\\"1.20\\\\\\\",\\\\\\\"Param5:num\\\\\\\":\\\\\\\"1.20\\\\\\\",\\\\\\\"Param6:num\\\\\\\":\\\\\\\"1.20\\\\\\\",\\\\\\\"Param7:num\\\\\\\":\\\\\\\"1.20\\\\\\\"}\\\",\\\"XParams:struct\\\":\\\"{}\\\",\\\"SParams:struct\\\":\\\"{}\\\",\\\"PassiveStates:arraynum\\\":\\\"[]\\\",\\\"Equipment\\\":\\\"\\\",\\\"Wtypes:arraynum\\\":\\\"[]\\\",\\\"Atypes:arraynum\\\":\\\"[]\\\",\\\"EnemyRewards\\\":\\\"\\\",\\\"EXPRate:num\\\":\\\"1.20\\\",\\\"GoldRate:num\\\":\\\"1.25\\\",\\\"DropRate:num\\\":\\\"1.50\\\"}\",\"{\\\"Name:str\\\":\\\"Greater\\\",\\\"Display:str\\\":\\\"\\\\\\\\I[73]Greater\\\",\\\"Description:json\\\":\\\"\\\\\\\"This unit has increased attributes.\\\\\\\"\\\",\\\"FmtText:str\\\":\\\"Greater\\\",\\\"RandomValid:eval\\\":\\\"true\\\",\\\"RandomWeight:num\\\":\\\"20\\\",\\\"Traits\\\":\\\"\\\",\\\"ElementRate:struct\\\":\\\"{}\\\",\\\"Params:struct\\\":\\\"{\\\\\\\"Param0:num\\\\\\\":\\\\\\\"1.10\\\\\\\",\\\\\\\"Param1:num\\\\\\\":\\\\\\\"1.10\\\\\\\",\\\\\\\"Param2:num\\\\\\\":\\\\\\\"1.10\\\\\\\",\\\\\\\"Param3:num\\\\\\\":\\\\\\\"1.10\\\\\\\",\\\\\\\"Param4:num\\\\\\\":\\\\\\\"1.10\\\\\\\",\\\\\\\"Param5:num\\\\\\\":\\\\\\\"1.10\\\\\\\",\\\\\\\"Param6:num\\\\\\\":\\\\\\\"1.10\\\\\\\",\\\\\\\"Param7:num\\\\\\\":\\\\\\\"1.10\\\\\\\"}\\\",\\\"XParams:struct\\\":\\\"{}\\\",\\\"SParams:struct\\\":\\\"{}\\\",\\\"PassiveStates:arraynum\\\":\\\"[]\\\",\\\"Equipment\\\":\\\"\\\",\\\"Wtypes:arraynum\\\":\\\"[]\\\",\\\"Atypes:arraynum\\\":\\\"[]\\\",\\\"EnemyRewards\\\":\\\"\\\",\\\"EXPRate:num\\\":\\\"1.10\\\",\\\"GoldRate:num\\\":\\\"1.15\\\",\\\"DropRate:num\\\":\\\"1.25\\\"}\",\"{\\\"Name:str\\\":\\\"Lesser\\\",\\\"Display:str\\\":\\\"\\\\\\\\I[73]Lesser\\\",\\\"Description:json\\\":\\\"\\\\\\\"This unit has decreased attributes.\\\\\\\"\\\",\\\"FmtText:str\\\":\\\"Lesser\\\",\\\"RandomValid:eval\\\":\\\"true\\\",\\\"RandomWeight:num\\\":\\\"20\\\",\\\"Traits\\\":\\\"\\\",\\\"ElementRate:struct\\\":\\\"{}\\\",\\\"Params:struct\\\":\\\"{\\\\\\\"Param0:num\\\\\\\":\\\\\\\"0.90\\\\\\\",\\\\\\\"Param1:num\\\\\\\":\\\\\\\"0.90\\\\\\\",\\\\\\\"Param2:num\\\\\\\":\\\\\\\"0.90\\\\\\\",\\\\\\\"Param3:num\\\\\\\":\\\\\\\"0.90\\\\\\\",\\\\\\\"Param4:num\\\\\\\":\\\\\\\"0.90\\\\\\\",\\\\\\\"Param5:num\\\\\\\":\\\\\\\"0.90\\\\\\\",\\\\\\\"Param6:num\\\\\\\":\\\\\\\"0.90\\\\\\\",\\\\\\\"Param7:num\\\\\\\":\\\\\\\"0.90\\\\\\\"}\\\",\\\"XParams:struct\\\":\\\"{}\\\",\\\"SParams:struct\\\":\\\"{}\\\",\\\"PassiveStates:arraynum\\\":\\\"[]\\\",\\\"Equipment\\\":\\\"\\\",\\\"Wtypes:arraynum\\\":\\\"[]\\\",\\\"Atypes:arraynum\\\":\\\"[]\\\",\\\"EnemyRewards\\\":\\\"\\\",\\\"EXPRate:num\\\":\\\"0.90\\\",\\\"GoldRate:num\\\":\\\"0.95\\\",\\\"DropRate:num\\\":\\\"1.00\\\"}\",\"{\\\"Name:str\\\":\\\"Minor\\\",\\\"Display:str\\\":\\\"\\\\\\\\I[73]Minor\\\",\\\"Description:json\\\":\\\"\\\\\\\"This unit has decreased attributes.\\\\\\\"\\\",\\\"FmtText:str\\\":\\\"Minor\\\",\\\"RandomValid:eval\\\":\\\"true\\\",\\\"RandomWeight:num\\\":\\\"10\\\",\\\"Traits\\\":\\\"\\\",\\\"ElementRate:struct\\\":\\\"{}\\\",\\\"Params:struct\\\":\\\"{\\\\\\\"Param0:num\\\\\\\":\\\\\\\"0.80\\\\\\\",\\\\\\\"Param1:num\\\\\\\":\\\\\\\"0.80\\\\\\\",\\\\\\\"Param2:num\\\\\\\":\\\\\\\"0.80\\\\\\\",\\\\\\\"Param3:num\\\\\\\":\\\\\\\"0.80\\\\\\\",\\\\\\\"Param4:num\\\\\\\":\\\\\\\"0.80\\\\\\\",\\\\\\\"Param5:num\\\\\\\":\\\\\\\"0.80\\\\\\\",\\\\\\\"Param6:num\\\\\\\":\\\\\\\"0.80\\\\\\\",\\\\\\\"Param7:num\\\\\\\":\\\\\\\"0.80\\\\\\\"}\\\",\\\"XParams:struct\\\":\\\"{}\\\",\\\"SParams:struct\\\":\\\"{}\\\",\\\"PassiveStates:arraynum\\\":\\\"[]\\\",\\\"Equipment\\\":\\\"\\\",\\\"Wtypes:arraynum\\\":\\\"[]\\\",\\\"Atypes:arraynum\\\":\\\"[]\\\",\\\"EnemyRewards\\\":\\\"\\\",\\\"EXPRate:num\\\":\\\"0.80\\\",\\\"GoldRate:num\\\":\\\"0.90\\\",\\\"DropRate:num\\\":\\\"1.00\\\"}\",\"{\\\"Name:str\\\":\\\"Puny\\\",\\\"Display:str\\\":\\\"\\\\\\\\I[73]Puny\\\",\\\"Description:json\\\":\\\"\\\\\\\"This unit has decreased attributes.\\\\\\\"\\\",\\\"FmtText:str\\\":\\\"Puny\\\",\\\"RandomValid:eval\\\":\\\"true\\\",\\\"RandomWeight:num\\\":\\\"5\\\",\\\"Traits\\\":\\\"\\\",\\\"ElementRate:struct\\\":\\\"{}\\\",\\\"Params:struct\\\":\\\"{\\\\\\\"Param0:num\\\\\\\":\\\\\\\"0.70\\\\\\\",\\\\\\\"Param1:num\\\\\\\":\\\\\\\"0.70\\\\\\\",\\\\\\\"Param2:num\\\\\\\":\\\\\\\"0.70\\\\\\\",\\\\\\\"Param3:num\\\\\\\":\\\\\\\"0.70\\\\\\\",\\\\\\\"Param4:num\\\\\\\":\\\\\\\"0.70\\\\\\\",\\\\\\\"Param5:num\\\\\\\":\\\\\\\"0.70\\\\\\\",\\\\\\\"Param6:num\\\\\\\":\\\\\\\"0.70\\\\\\\",\\\\\\\"Param7:num\\\\\\\":\\\\\\\"0.70\\\\\\\"}\\\",\\\"XParams:struct\\\":\\\"{}\\\",\\\"SParams:struct\\\":\\\"{}\\\",\\\"PassiveStates:arraynum\\\":\\\"[]\\\",\\\"Equipment\\\":\\\"\\\",\\\"Wtypes:arraynum\\\":\\\"[]\\\",\\\"Atypes:arraynum\\\":\\\"[]\\\",\\\"EnemyRewards\\\":\\\"\\\",\\\"EXPRate:num\\\":\\\"0.70\\\",\\\"GoldRate:num\\\":\\\"0.85\\\",\\\"DropRate:num\\\":\\\"1.00\\\"}\"]"}
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
 * Element Rulings
 * ----------------------------------------------------------------------------
 */
/*~struct~ElementRules:
 *
 * @param Rulings
 *
 * @param MultiRule:str
 * @text Multi-Element Ruling
 * @parent Rulings
 * @type select
 * @option Maximum (largest rate of all elements)
 * @value max
 * @option Minimum (smallest rate of all elements)
 * @value min
 * @option Multiplicative (product of all elements used)
 * @value multiply
 * @option Additive (sum of all elements used)
 * @value additive
 * @option Average (of all the elements used)
 * @value average
 * @desc Ruling on how to calculate element rate when there are 
 * multiple elements used for damage calculation.
 * @default multiply
 *
 * @param ReflectRule:str
 * @text Reflect-Element Rule
 * @parent Rulings
 * @type select
 * @option All (All elements must be Reflected)
 * @value all
 * @option Any (Only one element must be Reflected)
 * @value any
 * @desc Ruling on how element reflect is handled for multi-elements.
 * @default any
 *
 * @param RuleMaxCalcJSa:func
 * @text JS: Maximum Rate
 * @parent Rulings
 * @type note
 * @desc Determine how maximum element rate is calculated.
 * @default "// Declare Constants\nconst target = arguments[0];\nconst elements = arguments[1];\nconst action = this;\n\n// Determine Return Value\nconst absorbed = action.isRecover() ? [] : target.getAbsorbedElements();\nlet max = -1000;\nfor (const elementId of elements) {\n    const sign = absorbed.includes(elementId) ? -1 : 1;\n    max = Math.max(max, target.elementRate(elementId) * sign);\n}\nreturn max;"
 *
 * @param RuleMinCalcJS:func
 * @text JS: Minimum Rate
 * @parent Rulings
 * @type note
 * @desc Determine how minimum element rate is calculated.
 * @default "// Declare Constants\nconst target = arguments[0];\nconst elements = arguments[1];\nconst action = this;\n\n// Determine Return Value\nconst absorbed = action.isRecover() ? [] : target.getAbsorbedElements();\nlet min = 0;\nfor (const elementId of elements) {\n    const sign = absorbed.includes(elementId) ? -1 : 1;\n    min = Math.min(min, target.elementRate(elementId) * sign);\n}\nreturn min;"
 *
 * @param RuleMultiplyCalcJS:func
 * @text JS: Multiply Rate
 * @parent Rulings
 * @type note
 * @desc Determine how a multiplied element rate is calculated.
 * @default "// Declare Constants\nconst target = arguments[0];\nconst elements = arguments[1];\nconst action = this;\n\n// Determine Return Value\nconst absorbed = action.isRecover() ? [] : target.getAbsorbedElements();\nlet rate = 1;\nlet sign = 1;\nfor (const elementId of elements) {\n    if (absorbed.includes(elementId)) sign = -1;\n    rate *= target.elementRate(elementId);\n}\nreturn rate * sign;"
 *
 * @param RuleAdditiveCalcJS:func
 * @text JS: Additive Rate
 * @parent Rulings
 * @type note
 * @desc Determine how an additive element rate is calculated.
 * @default "// Declare Constants\nconst target = arguments[0];\nconst elements = arguments[1];\nconst action = this;\n\n// Determine Return Value\nconst absorbed = action.isRecover() ? [] : target.getAbsorbedElements();\nlet rate = 0;\nfor (const elementId of elements) {\n    const sign = absorbed.includes(elementId) ? -1 : 1;\n    rate += target.elementRate(elementId) * sign;\n}\nreturn rate;"
 *
 * @param RuleAverageCalcJS:func
 * @text JS: Average Rate
 * @parent Rulings
 * @type note
 * @desc Determine how an average element rate is calculated.
 * @default "// Declare Constants\nconst target = arguments[0];\nconst elements = arguments[1];\nconst action = this;\n\n// Determine Return Value\nconst rate = action.elementsRateSum(target, elements);\nreturn rate / elements.length;"
 *
 * @param Formulas
 *
 * @param ReceivedRateJS:func
 * @text JS: Received Rate
 * @parent Formulas
 * @type note
 * @desc Determine how the element rate for the receiving target is calculated.
 * @default "// Declare Constants\nconst elementId = arguments[0];\nconst target = this;\nconst base = 1;\nconst plus = target.getReceiveElementPlus(elementId);\nconst rate = target.getReceiveElementRate(elementId);\nconst flat = target.getReceiveElementFlat(elementId);\n\n// Determine Return Value\nreturn Math.max(0, (base + plus) * rate + flat);"
 *
 * @param FinalizeRateJS:func
 * @text JS: Finalize Rate
 * @parent Formulas
 * @type note
 * @desc Determine how the finalized element rate before damage is calculated.
 * @default "// Declare Constants\nconst target = arguments[0];\nconst action = this;\nconst elements = action.elements();\nconst targetRate = action.calcTargetElementRate(target, elements);\nconst sign = targetRate >= 0 ? 1 : -1;\nconst base = Math.abs(targetRate);\nconst plus = action.calcUserElementDamagePlus(target, elements);\nconst rate = action.calcUserElementDamageRate(target, elements);\nconst flat = action.calcUserElementDamageFlat(target, elements);\n\n// Determine Return Value\nreturn sign * Math.max((base + plus) * rate + flat, 0);;"
 *
 */
/* ----------------------------------------------------------------------------
 * Status Menu Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~StatusMenu:
 *
 * @param General
 *
 * @param EnableLayout:eval
 * @text Use Updated Layout
 * @parent General
 * @type boolean
 * @on Use
 * @off Don't Use
 * @desc Use the Updated Status Menu Layout provided by this plugin?
 * @default true
 *
 * @param LayoutStyle:str
 * @text Layout Style
 * @parent General
 * @type select
 * @option Upper Help, Top Category
 * @value upper/top
 * @option Upper Help, Bottom Category
 * @value upper/bottom
 * @option Lower Help, Top Category
 * @value lower/top
 * @option Lower Help, Bottom Category
 * @value lower/bottom
 * @desc If using an updated layout, how do you want to style
 * the menu scene layout?
 * @default upper/top
 *
 * @param TraitDescriptionFontSize:num
 * @text Trait Set Font Size
 * @parent General
 * @type number
 * @min 1
 * @desc The font size used for Trait Set Descriptions.
 * @default 18
 *
 * @param DrawBackRect:eval
 * @text Show Back Rectangles?
 * @parent General
 * @type boolean
 * @on Draw
 * @off Don't Draw
 * @desc Show back rectangles of darker colors to display information better?
 * @default true
 *
 * @param BackRectColor:str
 * @text Back Rectangle Color
 * @parent DrawBackRect:eval
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 19
 *
 * @param Command
 * @text Category Window
 *
 * @param CmdStyle:str
 * @text Style
 * @parent Command
 * @type select
 * @option Text Only
 * @value text
 * @option Icon Only
 * @value icon
 * @option Icon + Text
 * @value iconText
 * @option Automatic
 * @value auto
 * @desc How do you wish to draw commands in the Category Window?
 * @default auto
 *
 * @param CmdTextAlign:str
 * @text Text Align
 * @parent Command
 * @type combo
 * @option left
 * @option center
 * @option right
 * @desc Text alignment for the Category Window.
 * @default center
 *
 * @param Parameters
 * @text Displayed Parameters
 * 
 * @param Col1:arraystr
 * @text Column 1
 * @parent Parameters
 * @type combo[]
 * @option MaxHP
 * @option MaxMP
 * @option ATK
 * @option DEF
 * @option MAT
 * @option MDF
 * @option AGI
 * @option LUK
 * @option HIT
 * @option EVA
 * @option CRI
 * @option CEV
 * @option MEV
 * @option MRF
 * @option CNT
 * @option HRG
 * @option MRG
 * @option TRG
 * @option TGR
 * @option GRD
 * @option REC
 * @option PHA
 * @option MCR
 * @option TCR
 * @option PDR
 * @option MDR
 * @option FDR
 * @option EXR
 * @desc A list of the parameters that will be displayed in column 1.
 * @default ["MaxHP","MaxMP","ATK","DEF","MAT","MDF","AGI","LUK"]
 *
 * @param Col2:arraystr
 * @text Column 2
 * @parent Parameters
 * @type combo[]
 * @option MaxHP
 * @option MaxMP
 * @option ATK
 * @option DEF
 * @option MAT
 * @option MDF
 * @option AGI
 * @option LUK
 * @option HIT
 * @option EVA
 * @option CRI
 * @option CEV
 * @option MEV
 * @option MRF
 * @option CNT
 * @option HRG
 * @option MRG
 * @option TRG
 * @option TGR
 * @option GRD
 * @option REC
 * @option PHA
 * @option MCR
 * @option TCR
 * @option PDR
 * @option MDR
 * @option FDR
 * @option EXR
 * @desc A list of the parameters that will be displayed in column 2.
 * @default ["HIT","EVA","CRI","CEV","MEV","MRF","CNT","HRG","MRG","TRG"]
 *
 * @param Col3:arraystr
 * @text Column 3
 * @parent Parameters
 * @type combo[]
 * @option MaxHP
 * @option MaxMP
 * @option ATK
 * @option DEF
 * @option MAT
 * @option MDF
 * @option AGI
 * @option LUK
 * @option HIT
 * @option EVA
 * @option CRI
 * @option CEV
 * @option MEV
 * @option MRF
 * @option CNT
 * @option HRG
 * @option MRG
 * @option TRG
 * @option TGR
 * @option GRD
 * @option REC
 * @option PHA
 * @option MCR
 * @option TCR
 * @option PDR
 * @option MDR
 * @option FDR
 * @option EXR
 * @desc A list of the parameters that will be displayed in column 3.
 * @default ["TGR","GRD","REC","PHA","MCR","TCR","PDR","MDR","FDR","EXR"]
 *
 * @param Elements
 *
 * @param ExcludeElements:arraynum
 * @text Excluded Elements
 * @parent Elements
 * @type number[]
 * @min 1
 * @max 99
 * @desc These element ID's are excluded from the Status Menu list.
 * @default []
 *
 * @param ElementsCol1:arraynum
 * @text IDs: Column 1
 * @parent Elements
 * @type number[]
 * @min 1
 * @max 99
 * @desc The list of element ID's to show in column 1.
 * If neither column has ID's, list all elements.
 * @default []
 *
 * @param ElementsCol2:arraynum
 * @text IDs: Column 2
 * @parent Elements
 * @type number[]
 * @min 1
 * @max 99
 * @desc The list of element ID's to show in column 2.
 * If neither column has ID's, list all elements.
 * @default []
 *
 * @param Vocabulary
 *
 * @param VocabBiography:str
 * @text Biography
 * @parent Vocabulary
 * @desc Vocabulary for 'Biography'.
 * @default Biography
 *
 * @param VocabDmgAbsorb:str
 * @text Damage: Absorb
 * @parent Vocabulary
 * @desc Vocabulary for 'Damage: Absorb'.
 * @default Absorbs %1%
 *
 * @param VocabDmgReceive:str
 * @text Damage: Received
 * @parent Vocabulary
 * @desc Vocabulary for 'Damage: Received'.
 * @default Elemental Resistance
 *
 * @param VocabDmgDealt:str
 * @text Damage: Dealt
 * @parent Vocabulary
 * @desc Vocabulary for 'Damage: Dealt'.
 * @default Bonus Damage
 *
 * @param VocabStype:str
 * @text Skill Types
 * @parent Vocabulary
 * @desc Vocabulary for 'Skill Types'.
 * @default Skill Types
 *
 * @param VocabWtype:str
 * @text Weapon Types
 * @parent Vocabulary
 * @desc Vocabulary for 'Weapon Types'.
 * @default Weapon Types
 *
 * @param VocabAtype:str
 * @text Armor Types
 * @parent Vocabulary
 * @desc Vocabulary for 'Armor Types'.
 * @default Armor Types
 *
 */
/* ----------------------------------------------------------------------------
 * Status Menu Categories
 * ----------------------------------------------------------------------------
 */
/*~struct~StatusCategory:
 *
 * @param Symbol:str
 * @text Symbol
 * @desc Symbol used for this category.
 * @default Symbol
 *
 * @param Icon:num
 * @text Icon
 * @desc Icon used for this category.
 * Use 0 for no icon.
 * @default 0
 *
 * @param Text:str
 * @text Text
 * @desc Text name used for this category.
 * @default Untitled
 *
 * @param DrawJS:func
 * @text JS: Draw Data
 * @type note
 * @desc Code used to determine what appears in the data window.
 * @default ""
 *
 */
/* ----------------------------------------------------------------------------
 * General Trait Set Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~TraitSetSettings:
 *
 * @param General
 *
 * @param Enable:eval
 * @text Enable Trait Sets?
 * @parent General
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc Enable Trait Sets? This must be enabled for Trait Sets to
 * have any kind of effect on battlers.
 * @default false
 *
 * @param EnemyNameFmt:str
 * @text Enemy Name Format
 * @parent General
 * @type combo
 * @option [name] [letter]
 * @option [element] [name] [letter]
 * @option [element] [subelement] [name] [letter]
 * @option [name][gender] [letter]
 * @option [race] [name][gender] [letter]
 * @option [alignment] [name][gender] [letter]
 * @option [blessing] [name][gender] [letter]
 * @option [curse] [name][gender] [letter]
 * @option [name][gender]([zodiac]) [letter]
 * @option [variant] [name][gender] [letter]
 * @option [variant] [nature] [name][gender] [letter]
 * @option [variant] [nature] [element] [name][gender] [letter]
 * @option [alignment] [variant] [nature] [element] [name][gender] [letter]
 * @option [alignment] [variant] [nature] [blessing] [element] [name][gender] [letter]
 * @option [alignment] [variant] [nature] [curse] [element] [name][gender] [letter]
 * @desc Enemy name format on how Trait Sets affect how enemy names
 * appear. Choose from the list or customize it.
 * @default [variant] [name][gender] [letter]
 *
 * @param TraitColumns
 * @text Trait Columns
 *
 * @param TraitCol1:arraystr
 * @text Column 1 Traits
 * @parent TraitColumns
 * @type select[]
 * @option Main Element
 * @value Element
 * @option Sub Element
 * @value SubElement
 * @option Gender
 * @value Gender
 * @option Race
 * @value Race
 * @option Nature
 * @value Nature
 * @option Alignment
 * @value Alignment
 * @option Blessing
 * @value Blessing
 * @option Curse
 * @value Curse
 * @option Zodiac
 * @value Zodiac
 * @option Variant
 * @value Variant
 * @desc List of the traits that appear in this column.
 * Used by default in the Properties category.
 * @default ["Gender","Nature","Blessing","Zodiac"]
 *
 * @param TraitCol2:arraystr
 * @text Column 2 Traits
 * @parent TraitColumns
 * @type select[]
 * @option Main Element
 * @value Element
 * @option Sub Element
 * @value SubElement
 * @option Gender
 * @value Gender
 * @option Race
 * @value Race
 * @option Nature
 * @value Nature
 * @option Alignment
 * @value Alignment
 * @option Blessing
 * @value Blessing
 * @option Curse
 * @value Curse
 * @option Zodiac
 * @value Zodiac
 * @option Variant
 * @value Variant
 * @desc List of the traits that appear in this column.
 * Used by default in the Properties category.
 * @default ["Race","Alignment","Curse","Variant"]
 *
 */
/* ----------------------------------------------------------------------------
 * Trait Set Type Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~TraitSetType:
 *
 * @param Name:str
 * @text Name
 * @desc Name of this Trait Set Type.
 * @default Untitled
 *
 * @param Label:str
 * @text Label
 * @desc How this Trait Set Type is labeled in the Status Menu.
 * Text codes are allowed.
 * @default Untitled
 *
 * @param Visible:eval
 * @text Visible
 * @type boolean
 * @on Visible
 * @off Hidden
 * @desc Is this Trait Set Type visible in the Status Menu?
 * @default true
 *
 * @param RandomizeActor:eval
 * @text Randomize for Actors?
 * @type boolean
 * @on Randomize
 * @off Default
 * @desc On actor creation, obtain a random trait from this list?
 * @default false
 *
 * @param RandomizeEnemy:eval
 * @text Randomize for Enemies?
 * @type boolean
 * @on Randomize
 * @off Default
 * @desc On enemy creation, obtain a random trait from this list?
 * @default false
 *
 * @param Default:struct
 * @text Default Trait Set
 * @type struct<TraitSet>
 * @desc If no Trait Set is declared by notetags, 
 * use this Trait Set as a default.
 * @default {}
 *
 * @param List:arraystruct
 * @text Trait Set List
 * @type struct<TraitSet>[]
 * @desc A list of all the Trait Sets available to this 
 * Trait Set Type.
 * @default []
 *
 */
/* ----------------------------------------------------------------------------
 * Trait Set Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~TraitSet:
 *
 * @param Name:str
 * @text Name
 * @desc Name of this Trait Set. Also used as a reference key.
 * @default Untitled
 *
 * @param Display:str
 * @text Display Text
 * @desc How the Trait Set is displayed in game when selected.
 * Text codes are allowed.
 * @default Untitled
 *
 * @param Description:json
 * @text Help Description
 * @type note
 * @desc Help description for this Trait Set if required.
 * @default ""
 *
 * @param FmtText:str
 * @text Format Text
 * @desc The text that's added onto an enemy's name if this
 * Trait Set is used.
 * @default 
 *
 * @param RandomValid:eval
 * @text Valid for Random?
 * @type boolean
 * @on Valid
 * @off Ignore
 * @desc Is this Trait Set valid for random selection?
 * @default true
 *
 * @param RandomWeight:num
 * @text Random Weight
 * @type number
 * @desc Default weight of this Trait Set if valid for random.
 * @default 1
 *
 * @param Traits
 *
 * @param ElementRate:struct
 * @text Element Rates
 * @parent Traits
 * @type struct<ElementChanges>
 * @desc The elemental damage rates received for this Trait Set.
 * The modifiers are multiplicative.
 * @default {}
 *
 * @param Params:struct
 * @text Basic Parameters
 * @parent Traits
 * @type struct<Params>
 * @desc The basic parameter rates altered by this Trait set.
 * The modifiers are multiplicative.
 * @default {}
 *
 * @param XParams:struct
 * @text X Parameters
 * @parent Traits
 * @type struct<XParams>
 * @desc The X parameter rates altered by this Trait set.
 * The modifiers are additive.
 * @default {}
 *
 * @param SParams:struct
 * @text S Parameters
 * @parent Traits
 * @type struct<SParams>
 * @desc The S parameter rates altered by this Trait set.
 * The modifiers are multiplicative.
 * @default {}
 *
 * @param PassiveStates:arraynum
 * @text Passive States
 * @parent Traits
 * @type state[]
 * @desc Passive states that are applied to this Trait Set.
 * Requires VisuMZ_1_SkillsStatesCore.
 * @default []
 *
 * @param Equipment
 *
 * @param Wtypes:arraynum
 * @text Weapon Types
 * @parent Equipment
 * @type number[]
 * @min 1
 * @max 99
 * @desc Additional weapon types usable by this Trait Set.
 * @default []
 *
 * @param Atypes:arraynum
 * @text Armor Types
 * @parent Equipment
 * @type number[]
 * @min 1
 * @max 99
 * @desc Additional armor types usable by this Trait Set.
 * @default []
 *
 * @param EnemyRewards
 * @text Enemy Rewards
 *
 * @param EXPRate:num
 * @text EXP Rate
 * @parent EnemyRewards
 * @desc EXP rate given by a defeated enemy with this Trait Set.
 * @default 1.00
 *
 * @param GoldRate:num
 * @text Gold Rate
 * @parent EnemyRewards
 * @desc Gold rate given by a defeated enemy with this Trait Set.
 * @default 1.00
 *
 * @param DropRate:num
 * @text Drop Rate
 * @parent EnemyRewards
 * @desc Drop rate given by a defeated enemy with this Trait Set.
 * @default 1.00
 *
 */
/* ----------------------------------------------------------------------------
 * Element Changes
 * ----------------------------------------------------------------------------
 */
/*~struct~ElementChanges:
 *
 * @param Element1:num
 * @text Element 1 Change
 * @desc Data applied to this element in the Database > Types tab.
 * @default 1.00
 *
 * @param Element2:num
 * @text Element 2 Change
 * @desc Data applied to this element in the Database > Types tab.
 * @default 1.00
 *
 * @param Element3:num
 * @text Element 3 Change
 * @desc Data applied to this element in the Database > Types tab.
 * @default 1.00
 *
 * @param Element4:num
 * @text Element 4 Change
 * @desc Data applied to this element in the Database > Types tab.
 * @default 1.00
 *
 * @param Element5:num
 * @text Element 5 Change
 * @desc Data applied to this element in the Database > Types tab.
 * @default 1.00
 *
 * @param Element6:num
 * @text Element 6 Change
 * @desc Data applied to this element in the Database > Types tab.
 * @default 1.00
 *
 * @param Element7:num
 * @text Element 7 Change
 * @desc Data applied to this element in the Database > Types tab.
 * @default 1.00
 *
 * @param Element8:num
 * @text Element 8 Change
 * @desc Data applied to this element in the Database > Types tab.
 * @default 1.00
 *
 * @param Element9:num
 * @text Element 9 Change
 * @desc Data applied to this element in the Database > Types tab.
 * @default 1.00
 *
 * @param Element10:num
 * @text Element 10 Change
 * @desc Data applied to this element in the Database > Types tab.
 * @default 1.00
 *
 * @param Element11:num
 * @text Element 11 Change
 * @desc Data applied to this element in the Database > Types tab.
 * @default 1.00
 *
 * @param Element12:num
 * @text Element 12 Change
 * @desc Data applied to this element in the Database > Types tab.
 * @default 1.00
 *
 * @param Element13:num
 * @text Element 13 Change
 * @desc Data applied to this element in the Database > Types tab.
 * @default 1.00
 *
 * @param Element14:num
 * @text Element 14 Change
 * @desc Data applied to this element in the Database > Types tab.
 * @default 1.00
 *
 * @param Element15:num
 * @text Element 15 Change
 * @desc Data applied to this element in the Database > Types tab.
 * @default 1.00
 *
 * @param Element16:num
 * @text Element 16 Change
 * @desc Data applied to this element in the Database > Types tab.
 * @default 1.00
 *
 * @param Element17:num
 * @text Element 17 Change
 * @desc Data applied to this element in the Database > Types tab.
 * @default 1.00
 *
 * @param Element18:num
 * @text Element 18 Change
 * @desc Data applied to this element in the Database > Types tab.
 * @default 1.00
 *
 * @param Element19:num
 * @text Element 19 Change
 * @desc Data applied to this element in the Database > Types tab.
 * @default 1.00
 *
 * @param Element20:num
 * @text Element 20 Change
 * @desc Data applied to this element in the Database > Types tab.
 * @default 1.00
 *
 * @param Element21:num
 * @text Element 21 Change
 * @desc Data applied to this element in the Database > Types tab.
 * @default 1.00
 *
 * @param Element22:num
 * @text Element 22 Change
 * @desc Data applied to this element in the Database > Types tab.
 * @default 1.00
 *
 * @param Element23:num
 * @text Element 23 Change
 * @desc Data applied to this element in the Database > Types tab.
 * @default 1.00
 *
 * @param Element24:num
 * @text Element 24 Change
 * @desc Data applied to this element in the Database > Types tab.
 * @default 1.00
 *
 * @param Element25:num
 * @text Element 25 Change
 * @desc Data applied to this element in the Database > Types tab.
 * @default 1.00
 *
 * @param Element26:num
 * @text Element 26 Change
 * @desc Data applied to this element in the Database > Types tab.
 * @default 1.00
 *
 * @param Element27:num
 * @text Element 27 Change
 * @desc Data applied to this element in the Database > Types tab.
 * @default 1.00
 *
 * @param Element28:num
 * @text Element 28 Change
 * @desc Data applied to this element in the Database > Types tab.
 * @default 1.00
 *
 * @param Element29:num
 * @text Element 29 Change
 * @desc Data applied to this element in the Database > Types tab.
 * @default 1.00
 *
 * @param Element30:num
 * @text Element 30 Change
 * @desc Data applied to this element in the Database > Types tab.
 * @default 1.00
 *
 * @param Element31:num
 * @text Element 31 Change
 * @desc Data applied to this element in the Database > Types tab.
 * @default 1.00
 *
 * @param Element32:num
 * @text Element 32 Change
 * @desc Data applied to this element in the Database > Types tab.
 * @default 1.00
 *
 * @param Element33:num
 * @text Element 33 Change
 * @desc Data applied to this element in the Database > Types tab.
 * @default 1.00
 *
 * @param Element34:num
 * @text Element 34 Change
 * @desc Data applied to this element in the Database > Types tab.
 * @default 1.00
 *
 * @param Element35:num
 * @text Element 35 Change
 * @desc Data applied to this element in the Database > Types tab.
 * @default 1.00
 *
 * @param Element36:num
 * @text Element 36 Change
 * @desc Data applied to this element in the Database > Types tab.
 * @default 1.00
 *
 * @param Element37:num
 * @text Element 37 Change
 * @desc Data applied to this element in the Database > Types tab.
 * @default 1.00
 *
 * @param Element38:num
 * @text Element 38 Change
 * @desc Data applied to this element in the Database > Types tab.
 * @default 1.00
 *
 * @param Element39:num
 * @text Element 39 Change
 * @desc Data applied to this element in the Database > Types tab.
 * @default 1.00
 *
 * @param Element40:num
 * @text Element 40 Change
 * @desc Data applied to this element in the Database > Types tab.
 * @default 1.00
 *
 * @param Element41:num
 * @text Element 41 Change
 * @desc Data applied to this element in the Database > Types tab.
 * @default 1.00
 *
 * @param Element42:num
 * @text Element 42 Change
 * @desc Data applied to this element in the Database > Types tab.
 * @default 1.00
 *
 * @param Element43:num
 * @text Element 43 Change
 * @desc Data applied to this element in the Database > Types tab.
 * @default 1.00
 *
 * @param Element44:num
 * @text Element 44 Change
 * @desc Data applied to this element in the Database > Types tab.
 * @default 1.00
 *
 * @param Element45:num
 * @text Element 45 Change
 * @desc Data applied to this element in the Database > Types tab.
 * @default 1.00
 *
 * @param Element46:num
 * @text Element 46 Change
 * @desc Data applied to this element in the Database > Types tab.
 * @default 1.00
 *
 * @param Element47:num
 * @text Element 47 Change
 * @desc Data applied to this element in the Database > Types tab.
 * @default 1.00
 *
 * @param Element48:num
 * @text Element 48 Change
 * @desc Data applied to this element in the Database > Types tab.
 * @default 1.00
 *
 * @param Element49:num
 * @text Element 49 Change
 * @desc Data applied to this element in the Database > Types tab.
 * @default 1.00
 *
 * @param Element50:num
 * @text Element 50 Change
 * @desc Data applied to this element in the Database > Types tab.
 * @default 1.00
 *
 * @param Element51:num
 * @text Element 51 Change
 * @desc Data applied to this element in the Database > Types tab.
 * @default 1.00
 *
 * @param Element52:num
 * @text Element 52 Change
 * @desc Data applied to this element in the Database > Types tab.
 * @default 1.00
 *
 * @param Element53:num
 * @text Element 53 Change
 * @desc Data applied to this element in the Database > Types tab.
 * @default 1.00
 *
 * @param Element54:num
 * @text Element 54 Change
 * @desc Data applied to this element in the Database > Types tab.
 * @default 1.00
 *
 * @param Element55:num
 * @text Element 55 Change
 * @desc Data applied to this element in the Database > Types tab.
 * @default 1.00
 *
 * @param Element56:num
 * @text Element 56 Change
 * @desc Data applied to this element in the Database > Types tab.
 * @default 1.00
 *
 * @param Element57:num
 * @text Element 57 Change
 * @desc Data applied to this element in the Database > Types tab.
 * @default 1.00
 *
 * @param Element58:num
 * @text Element 58 Change
 * @desc Data applied to this element in the Database > Types tab.
 * @default 1.00
 *
 * @param Element59:num
 * @text Element 59 Change
 * @desc Data applied to this element in the Database > Types tab.
 * @default 1.00
 *
 * @param Element60:num
 * @text Element 60 Change
 * @desc Data applied to this element in the Database > Types tab.
 * @default 1.00
 *
 * @param Element61:num
 * @text Element 61 Change
 * @desc Data applied to this element in the Database > Types tab.
 * @default 1.00
 *
 * @param Element62:num
 * @text Element 62 Change
 * @desc Data applied to this element in the Database > Types tab.
 * @default 1.00
 *
 * @param Element63:num
 * @text Element 63 Change
 * @desc Data applied to this element in the Database > Types tab.
 * @default 1.00
 *
 * @param Element64:num
 * @text Element 64 Change
 * @desc Data applied to this element in the Database > Types tab.
 * @default 1.00
 *
 * @param Element65:num
 * @text Element 65 Change
 * @desc Data applied to this element in the Database > Types tab.
 * @default 1.00
 *
 * @param Element66:num
 * @text Element 66 Change
 * @desc Data applied to this element in the Database > Types tab.
 * @default 1.00
 *
 * @param Element67:num
 * @text Element 67 Change
 * @desc Data applied to this element in the Database > Types tab.
 * @default 1.00
 *
 * @param Element68:num
 * @text Element 68 Change
 * @desc Data applied to this element in the Database > Types tab.
 * @default 1.00
 *
 * @param Element69:num
 * @text Element 69 Change
 * @desc Data applied to this element in the Database > Types tab.
 * @default 1.00
 *
 * @param Element70:num
 * @text Element 70 Change
 * @desc Data applied to this element in the Database > Types tab.
 * @default 1.00
 *
 * @param Element71:num
 * @text Element 71 Change
 * @desc Data applied to this element in the Database > Types tab.
 * @default 1.00
 *
 * @param Element72:num
 * @text Element 72 Change
 * @desc Data applied to this element in the Database > Types tab.
 * @default 1.00
 *
 * @param Element73:num
 * @text Element 73 Change
 * @desc Data applied to this element in the Database > Types tab.
 * @default 1.00
 *
 * @param Element74:num
 * @text Element 74 Change
 * @desc Data applied to this element in the Database > Types tab.
 * @default 1.00
 *
 * @param Element75:num
 * @text Element 75 Change
 * @desc Data applied to this element in the Database > Types tab.
 * @default 1.00
 *
 * @param Element76:num
 * @text Element 76 Change
 * @desc Data applied to this element in the Database > Types tab.
 * @default 1.00
 *
 * @param Element77:num
 * @text Element 77 Change
 * @desc Data applied to this element in the Database > Types tab.
 * @default 1.00
 *
 * @param Element78:num
 * @text Element 78 Change
 * @desc Data applied to this element in the Database > Types tab.
 * @default 1.00
 *
 * @param Element79:num
 * @text Element 79 Change
 * @desc Data applied to this element in the Database > Types tab.
 * @default 1.00
 *
 * @param Element80:num
 * @text Element 80 Change
 * @desc Data applied to this element in the Database > Types tab.
 * @default 1.00
 *
 * @param Element81:num
 * @text Element 81 Change
 * @desc Data applied to this element in the Database > Types tab.
 * @default 1.00
 *
 * @param Element82:num
 * @text Element 82 Change
 * @desc Data applied to this element in the Database > Types tab.
 * @default 1.00
 *
 * @param Element83:num
 * @text Element 83 Change
 * @desc Data applied to this element in the Database > Types tab.
 * @default 1.00
 *
 * @param Element84:num
 * @text Element 84 Change
 * @desc Data applied to this element in the Database > Types tab.
 * @default 1.00
 *
 * @param Element85:num
 * @text Element 85 Change
 * @desc Data applied to this element in the Database > Types tab.
 * @default 1.00
 *
 * @param Element86:num
 * @text Element 86 Change
 * @desc Data applied to this element in the Database > Types tab.
 * @default 1.00
 *
 * @param Element87:num
 * @text Element 87 Change
 * @desc Data applied to this element in the Database > Types tab.
 * @default 1.00
 *
 * @param Element88:num
 * @text Element 88 Change
 * @desc Data applied to this element in the Database > Types tab.
 * @default 1.00
 *
 * @param Element89:num
 * @text Element 89 Change
 * @desc Data applied to this element in the Database > Types tab.
 * @default 1.00
 *
 * @param Element90:num
 * @text Element 90 Change
 * @desc Data applied to this element in the Database > Types tab.
 * @default 1.00
 *
 * @param Element91:num
 * @text Element 91 Change
 * @desc Data applied to this element in the Database > Types tab.
 * @default 1.00
 *
 * @param Element92:num
 * @text Element 92 Change
 * @desc Data applied to this element in the Database > Types tab.
 * @default 1.00
 *
 * @param Element93:num
 * @text Element 93 Change
 * @desc Data applied to this element in the Database > Types tab.
 * @default 1.00
 *
 * @param Element94:num
 * @text Element 94 Change
 * @desc Data applied to this element in the Database > Types tab.
 * @default 1.00
 *
 * @param Element95:num
 * @text Element 95 Change
 * @desc Data applied to this element in the Database > Types tab.
 * @default 1.00
 *
 * @param Element96:num
 * @text Element 96 Change
 * @desc Data applied to this element in the Database > Types tab.
 * @default 1.00
 *
 * @param Element97:num
 * @text Element 97 Change
 * @desc Data applied to this element in the Database > Types tab.
 * @default 1.00
 *
 * @param Element98:num
 * @text Element 98 Change
 * @desc Data applied to this element in the Database > Types tab.
 * @default 1.00
 *
 * @param Element99:num
 * @text Element 99 Change
 * @desc Data applied to this element in the Database > Types tab.
 * @default 1.00
 *
 */
/* ----------------------------------------------------------------------------
 * Basic Parameters
 * ----------------------------------------------------------------------------
 */
/*~struct~Params:
 *
 * @param Param0:num
 * @text MaxHP Rate
 * @desc Percentile rate modification of this parameter.
 * @default 1.00
 *
 * @param Param1:num
 * @text MaxMP Rate
 * @desc Percentile rate modification of this parameter.
 * @default 1.00
 *
 * @param Param2:num
 * @text ATK Rate
 * @desc Percentile rate modification of this parameter.
 * @default 1.00
 *
 * @param Param3:num
 * @text DEF Rate
 * @desc Percentile rate modification of this parameter.
 * @default 1.00
 *
 * @param Param4:num
 * @text MAT Rate
 * @desc Percentile rate modification of this parameter.
 * @default 1.00
 *
 * @param Param5:num
 * @text MDF Rate
 * @desc Percentile rate modification of this parameter.
 * @default 1.00
 *
 * @param Param6:num
 * @text AGI Rate
 * @desc Percentile rate modification of this parameter.
 * @default 1.00
 *
 * @param Param7:num
 * @text LUK Rate
 * @desc Percentile rate modification of this parameter.
 * @default 1.00
 *
 */
/* ----------------------------------------------------------------------------
 * X Parameters
 * ----------------------------------------------------------------------------
 */
/*~struct~XParams:
 *
 * @param XParam0:num
 * @text HIT Rate
 * @desc Percentile rate modification of this parameter.
 * @default 0.00
 *
 * @param XParam1:num
 * @text EVA Rate
 * @desc Percentile rate modification of this parameter.
 * @default 0.00
 *
 * @param XParam2:num
 * @text CRI Rate
 * @desc Percentile rate modification of this parameter.
 * @default 0.00
 *
 * @param XParam3:num
 * @text CEV Rate
 * @desc Percentile rate modification of this parameter.
 * @default 0.00
 *
 * @param XParam4:num
 * @text MEV Rate
 * @desc Percentile rate modification of this parameter.
 * @default 0.00
 *
 * @param XParam5:num
 * @text MRF Rate
 * @desc Percentile rate modification of this parameter.
 * @default 0.00
 *
 * @param XParam6:num
 * @text CNT Rate
 * @desc Percentile rate modification of this parameter.
 * @default 0.00
 *
 * @param XParam7:num
 * @text HRG Rate
 * @desc Percentile rate modification of this parameter.
 * @default 0.00
 *
 * @param XParam8:num
 * @text MRG Rate
 * @desc Percentile rate modification of this parameter.
 * @default 0.00
 *
 * @param XParam9:num
 * @text TRG Rate
 * @desc Percentile rate modification of this parameter.
 * @default 0.00
 *
 */
/* ----------------------------------------------------------------------------
 * S Parameters
 * ----------------------------------------------------------------------------
 */
/*~struct~SParams:
 *
 * @param SParam0:num
 * @text TGR Rate
 * @desc Percentile rate modification of this parameter.
 * @default 1.00
 *
 * @param SParam1:num
 * @text GRD Rate
 * @desc Percentile rate modification of this parameter.
 * @default 1.00
 *
 * @param SParam2:num
 * @text REC Rate
 * @desc Percentile rate modification of this parameter.
 * @default 1.00
 *
 * @param SParam3:num
 * @text PHA Rate
 * @desc Percentile rate modification of this parameter.
 * @default 1.00
 *
 * @param SParam4:num
 * @text MCR Rate
 * @desc Percentile rate modification of this parameter.
 * @default 1.00
 *
 * @param SParam5:num
 * @text TCR Rate
 * @desc Percentile rate modification of this parameter.
 * @default 1.00
 *
 * @param SParam6:num
 * @text PDR Rate
 * @desc Percentile rate modification of this parameter.
 * @default 1.00
 *
 * @param SParam7:num
 * @text MDR Rate
 * @desc Percentile rate modification of this parameter.
 * @default 1.00
 *
 * @param SParam8:num
 * @text FDR Rate
 * @desc Percentile rate modification of this parameter.
 * @default 1.00
 *
 * @param SParam9:num
 * @text EXR Rate
 * @desc Percentile rate modification of this parameter.
 * @default 1.00
 *
 */
//=============================================================================

const _0x3d06b3=_0x2f0a;(function(_0x4446b5,_0x539e92){const _0x168103=_0x2f0a,_0xcbca82=_0x4446b5();while(!![]){try{const _0x579fce=parseInt(_0x168103(0x1a3))/0x1+parseInt(_0x168103(0x15b))/0x2+parseInt(_0x168103(0x2a0))/0x3*(parseInt(_0x168103(0x1e0))/0x4)+parseInt(_0x168103(0x3a5))/0x5+-parseInt(_0x168103(0x307))/0x6*(parseInt(_0x168103(0x325))/0x7)+parseInt(_0x168103(0x302))/0x8*(-parseInt(_0x168103(0x309))/0x9)+-parseInt(_0x168103(0x1e3))/0xa*(parseInt(_0x168103(0x3be))/0xb);if(_0x579fce===_0x539e92)break;else _0xcbca82['push'](_0xcbca82['shift']());}catch(_0x566698){_0xcbca82['push'](_0xcbca82['shift']());}}}(_0x5357,0xf22df));function _0x2f0a(_0x1c2843,_0x402dfc){const _0x5357ee=_0x5357();return _0x2f0a=function(_0x2f0a1d,_0x13f63d){_0x2f0a1d=_0x2f0a1d-0x14b;let _0x5b6e60=_0x5357ee[_0x2f0a1d];return _0x5b6e60;},_0x2f0a(_0x1c2843,_0x402dfc);}var label='ElementStatusCore',tier=tier||0x0,dependencies=[],pluginData=$plugins[_0x3d06b3(0x1c5)](function(_0x1cebd4){const _0x5c15d1=_0x3d06b3;return _0x1cebd4[_0x5c15d1(0x305)]&&_0x1cebd4['description'][_0x5c15d1(0x1f2)]('['+label+']');})[0x0];VisuMZ[label][_0x3d06b3(0x338)]=VisuMZ[label][_0x3d06b3(0x338)]||{},VisuMZ[_0x3d06b3(0x3b8)]=function(_0x2113fc,_0x26242a){const _0x5ba8a4=_0x3d06b3;for(const _0xd39398 in _0x26242a){if(_0xd39398['match'](/(.*):(.*)/i)){const _0xb7e189=String(RegExp['$1']),_0x39c0a5=String(RegExp['$2'])[_0x5ba8a4(0x322)]()['trim']();let _0x462f43,_0x4cc676,_0x4afd10;switch(_0x39c0a5){case _0x5ba8a4(0x2c2):_0x462f43=_0x26242a[_0xd39398]!==''?Number(_0x26242a[_0xd39398]):0x0;break;case _0x5ba8a4(0x29b):_0x4cc676=_0x26242a[_0xd39398]!==''?JSON['parse'](_0x26242a[_0xd39398]):[],_0x462f43=_0x4cc676[_0x5ba8a4(0x3a9)](_0x135c26=>Number(_0x135c26));break;case _0x5ba8a4(0x205):_0x462f43=_0x26242a[_0xd39398]!==''?eval(_0x26242a[_0xd39398]):null;break;case _0x5ba8a4(0x26b):_0x4cc676=_0x26242a[_0xd39398]!==''?JSON[_0x5ba8a4(0x36d)](_0x26242a[_0xd39398]):[],_0x462f43=_0x4cc676[_0x5ba8a4(0x3a9)](_0x58c07e=>eval(_0x58c07e));break;case _0x5ba8a4(0x164):_0x462f43=_0x26242a[_0xd39398]!==''?JSON['parse'](_0x26242a[_0xd39398]):'';break;case _0x5ba8a4(0x26c):_0x4cc676=_0x26242a[_0xd39398]!==''?JSON[_0x5ba8a4(0x36d)](_0x26242a[_0xd39398]):[],_0x462f43=_0x4cc676[_0x5ba8a4(0x3a9)](_0x23c775=>JSON[_0x5ba8a4(0x36d)](_0x23c775));break;case _0x5ba8a4(0x2a8):_0x462f43=_0x26242a[_0xd39398]!==''?new Function(JSON[_0x5ba8a4(0x36d)](_0x26242a[_0xd39398])):new Function(_0x5ba8a4(0x30e));break;case'ARRAYFUNC':_0x4cc676=_0x26242a[_0xd39398]!==''?JSON[_0x5ba8a4(0x36d)](_0x26242a[_0xd39398]):[],_0x462f43=_0x4cc676[_0x5ba8a4(0x3a9)](_0x4c876f=>new Function(JSON[_0x5ba8a4(0x36d)](_0x4c876f)));break;case'STR':_0x462f43=_0x26242a[_0xd39398]!==''?String(_0x26242a[_0xd39398]):'';break;case _0x5ba8a4(0x167):_0x4cc676=_0x26242a[_0xd39398]!==''?JSON[_0x5ba8a4(0x36d)](_0x26242a[_0xd39398]):[],_0x462f43=_0x4cc676[_0x5ba8a4(0x3a9)](_0x223a1a=>String(_0x223a1a));break;case _0x5ba8a4(0x2e4):_0x4afd10=_0x26242a[_0xd39398]!==''?JSON[_0x5ba8a4(0x36d)](_0x26242a[_0xd39398]):{},_0x2113fc[_0xb7e189]={},VisuMZ[_0x5ba8a4(0x3b8)](_0x2113fc[_0xb7e189],_0x4afd10);continue;case _0x5ba8a4(0x256):_0x4cc676=_0x26242a[_0xd39398]!==''?JSON[_0x5ba8a4(0x36d)](_0x26242a[_0xd39398]):[],_0x462f43=_0x4cc676[_0x5ba8a4(0x3a9)](_0x22cfea=>VisuMZ['ConvertParams']({},JSON['parse'](_0x22cfea)));break;default:continue;}_0x2113fc[_0xb7e189]=_0x462f43;}}return _0x2113fc;},(_0x5682c3=>{const _0x104e91=_0x3d06b3,_0x5b3cf6=_0x5682c3[_0x104e91(0x1c0)];for(const _0x166c48 of dependencies){if(!Imported[_0x166c48]){alert(_0x104e91(0x2ea)[_0x104e91(0x2e2)](_0x5b3cf6,_0x166c48)),SceneManager[_0x104e91(0x39a)]();break;}}const _0x18deaf=_0x5682c3[_0x104e91(0x168)];if(_0x18deaf[_0x104e91(0x25d)](/\[Version[ ](.*?)\]/i)){const _0x3cce57=Number(RegExp['$1']);_0x3cce57!==VisuMZ[label][_0x104e91(0x366)]&&(alert('%1\x27s\x20version\x20does\x20not\x20match\x20plugin\x27s.\x20Please\x20update\x20it\x20in\x20the\x20Plugin\x20Manager.'[_0x104e91(0x2e2)](_0x5b3cf6,_0x3cce57)),SceneManager[_0x104e91(0x39a)]());}if(_0x18deaf[_0x104e91(0x25d)](/\[Tier[ ](\d+)\]/i)){const _0x587479=Number(RegExp['$1']);_0x587479<tier?(alert(_0x104e91(0x28b)['format'](_0x5b3cf6,_0x587479,tier)),SceneManager[_0x104e91(0x39a)]()):tier=Math[_0x104e91(0x29e)](_0x587479,tier);}VisuMZ['ConvertParams'](VisuMZ[label][_0x104e91(0x338)],_0x5682c3[_0x104e91(0x2e3)]);})(pluginData),PluginManager['registerCommand'](pluginData[_0x3d06b3(0x1c0)],_0x3d06b3(0x364),_0x1371d9=>{const _0xf1bde3=_0x3d06b3;VisuMZ[_0xf1bde3(0x3b8)](_0x1371d9,_0x1371d9);const _0x3e0480=_0x1371d9[_0xf1bde3(0x299)];for(const _0x4ae4f2 of _0x3e0480){const _0x9446c6=$gameActors['actor'](_0x4ae4f2);if(!_0x9446c6)continue;_0x9446c6['setBiography'](_0x1371d9[_0xf1bde3(0x1f7)][_0xf1bde3(0x2e2)](_0xf1bde3(0x28d)[_0xf1bde3(0x2e2)](_0x9446c6[_0xf1bde3(0x277)]())));}}),PluginManager['registerCommand'](pluginData[_0x3d06b3(0x1c0)],_0x3d06b3(0x297),_0x5a9d8=>{const _0xc3ca60=_0x3d06b3;VisuMZ['ConvertParams'](_0x5a9d8,_0x5a9d8);const _0x3c392a=_0x5a9d8['Step1End']>=_0x5a9d8[_0xc3ca60(0x3bd)]?_0x5a9d8['Step1Start']:_0x5a9d8[_0xc3ca60(0x1ac)],_0x4158ff=_0x5a9d8[_0xc3ca60(0x1ac)]>=_0x5a9d8[_0xc3ca60(0x3bd)]?_0x5a9d8['Step1End']:_0x5a9d8['Step1Start'],_0x1d36ce=Array(_0x4158ff-_0x3c392a+0x1)[_0xc3ca60(0x269)]()[_0xc3ca60(0x3a9)]((_0x502183,_0x2fccc2)=>_0x3c392a+_0x2fccc2);for(const _0x2e2494 of _0x1d36ce){const _0xbb6016=$gameActors['actor'](_0x2e2494);if(!_0xbb6016)continue;_0xbb6016[_0xc3ca60(0x2ba)](_0x5a9d8[_0xc3ca60(0x1f7)][_0xc3ca60(0x2e2)]('\x5cN[%1]'['format'](_0xbb6016['actorId']())));}}),PluginManager[_0x3d06b3(0x321)](pluginData[_0x3d06b3(0x1c0)],_0x3d06b3(0x39c),_0x4ecb90=>{const _0x3e3545=_0x3d06b3;VisuMZ['ConvertParams'](_0x4ecb90,_0x4ecb90);const _0x5a2e3f=_0x4ecb90['Step1'];let _0x17a89a=[];while(_0x5a2e3f['length']>0x0){const _0x3eaecf=_0x5a2e3f[_0x3e3545(0x268)]();Array['isArray'](_0x3eaecf)?_0x17a89a=_0x17a89a[_0x3e3545(0x229)](_0x3eaecf):_0x17a89a[_0x3e3545(0x2df)](_0x3eaecf);}for(const _0x12e086 of _0x17a89a){const _0x522cf7=$gameActors[_0x3e3545(0x201)](_0x12e086);if(!_0x522cf7)continue;_0x522cf7[_0x3e3545(0x2ba)](_0x4ecb90[_0x3e3545(0x1f7)][_0x3e3545(0x2e2)](_0x3e3545(0x28d)[_0x3e3545(0x2e2)](_0x522cf7[_0x3e3545(0x277)]())));}}),PluginManager[_0x3d06b3(0x321)](pluginData[_0x3d06b3(0x1c0)],_0x3d06b3(0x264),_0x5e9b15=>{const _0x24dbb9=_0x3d06b3;VisuMZ[_0x24dbb9(0x3b8)](_0x5e9b15,_0x5e9b15);const _0x516f74=_0x5e9b15[_0x24dbb9(0x299)],_0x513ad4=Game_BattlerBase[_0x24dbb9(0x2c5)][_0x24dbb9(0x240)]();for(const _0x5ea897 of _0x516f74){const _0x459e44=$gameActors[_0x24dbb9(0x201)](_0x5ea897);if(!_0x459e44)continue;for(const _0x217a68 of _0x513ad4){if(!_0x5e9b15[_0x217a68])continue;if(_0x5e9b15[_0x217a68][_0x24dbb9(0x25d)](/UNCHANGED/i))continue;_0x5e9b15[_0x217a68][_0x24dbb9(0x25d)](/RANDOM/i)?_0x459e44[_0x24dbb9(0x3a0)](_0x217a68):_0x459e44[_0x24dbb9(0x16a)](_0x217a68,_0x5e9b15[_0x217a68]);}}}),PluginManager[_0x3d06b3(0x321)](pluginData[_0x3d06b3(0x1c0)],'ActorChangeTraitSetsRange',_0x148e55=>{const _0x56a56e=_0x3d06b3;VisuMZ['ConvertParams'](_0x148e55,_0x148e55);const _0x5f8afd=_0x148e55[_0x56a56e(0x1ac)]>=_0x148e55[_0x56a56e(0x3bd)]?_0x148e55[_0x56a56e(0x3bd)]:_0x148e55['Step1End'],_0x1c671d=_0x148e55[_0x56a56e(0x1ac)]>=_0x148e55[_0x56a56e(0x3bd)]?_0x148e55[_0x56a56e(0x1ac)]:_0x148e55[_0x56a56e(0x3bd)],_0x36ca1e=Array(_0x1c671d-_0x5f8afd+0x1)[_0x56a56e(0x269)]()[_0x56a56e(0x3a9)]((_0x4eadc0,_0x6d827c)=>_0x5f8afd+_0x6d827c),_0x5b1e4b=Game_BattlerBase[_0x56a56e(0x2c5)][_0x56a56e(0x240)]();for(const _0x1b6fed of _0x36ca1e){const _0xf4a04=$gameActors[_0x56a56e(0x201)](_0x1b6fed);if(!_0xf4a04)continue;for(const _0x57de69 of _0x5b1e4b){if(!_0x148e55[_0x57de69])continue;if(_0x148e55[_0x57de69]['match'](/UNCHANGED/i))continue;_0x148e55[_0x57de69][_0x56a56e(0x25d)](/RANDOM/i)?_0xf4a04[_0x56a56e(0x3a0)](_0x57de69):_0xf4a04['setTraitSet'](_0x57de69,_0x148e55[_0x57de69]);}}}),PluginManager['registerCommand'](pluginData[_0x3d06b3(0x1c0)],_0x3d06b3(0x33a),_0x16ffcc=>{const _0x5ed85b=_0x3d06b3;VisuMZ[_0x5ed85b(0x3b8)](_0x16ffcc,_0x16ffcc);const _0x4cb939=_0x16ffcc['Step1'];let _0xf691ab=[];while(_0x4cb939[_0x5ed85b(0x2d2)]>0x0){const _0x19d746=_0x4cb939[_0x5ed85b(0x268)]();Array['isArray'](_0x19d746)?_0xf691ab=_0xf691ab[_0x5ed85b(0x229)](_0x19d746):_0xf691ab[_0x5ed85b(0x2df)](_0x19d746);}const _0x4202ab=Game_BattlerBase['prototype'][_0x5ed85b(0x240)]();for(const _0x246b1e of _0xf691ab){const _0x160ca9=$gameActors[_0x5ed85b(0x201)](_0x246b1e);if(!_0x160ca9)continue;for(const _0x2994dc of _0x4202ab){if(!_0x16ffcc[_0x2994dc])continue;if(_0x16ffcc[_0x2994dc]['match'](/UNCHANGED/i))continue;_0x16ffcc[_0x2994dc]['match'](/RANDOM/i)?_0x160ca9[_0x5ed85b(0x3a0)](_0x2994dc):_0x160ca9[_0x5ed85b(0x16a)](_0x2994dc,_0x16ffcc[_0x2994dc]);}}}),PluginManager[_0x3d06b3(0x321)](pluginData[_0x3d06b3(0x1c0)],_0x3d06b3(0x377),_0x3a081b=>{const _0x46f166=_0x3d06b3;if(!$gameParty[_0x46f166(0x1c2)]())return;VisuMZ[_0x46f166(0x3b8)](_0x3a081b,_0x3a081b);const _0x118ffb=_0x3a081b[_0x46f166(0x299)],_0x2a87d2=Game_BattlerBase['prototype'][_0x46f166(0x240)]();for(const _0x3ee5d1 of _0x118ffb){const _0x59023a=$gameTroop['members']()[_0x3ee5d1];if(!_0x59023a)continue;for(const _0x269f7b of _0x2a87d2){if(!_0x3a081b[_0x269f7b])continue;if(_0x3a081b[_0x269f7b]['match'](/UNCHANGED/i))continue;_0x3a081b[_0x269f7b][_0x46f166(0x25d)](/RANDOM/i)?_0x59023a[_0x46f166(0x3a0)](_0x269f7b):_0x59023a[_0x46f166(0x16a)](_0x269f7b,_0x3a081b[_0x269f7b]);}}$gameTroop[_0x46f166(0x14c)]();}),PluginManager['registerCommand'](pluginData['name'],'EnemyChangeTraitSetsRange',_0xa720bd=>{const _0x1dedc2=_0x3d06b3;if(!$gameParty[_0x1dedc2(0x1c2)]())return;VisuMZ[_0x1dedc2(0x3b8)](_0xa720bd,_0xa720bd);const _0x5baaaf=_0xa720bd['Step1End']>=_0xa720bd[_0x1dedc2(0x3bd)]?_0xa720bd[_0x1dedc2(0x3bd)]:_0xa720bd[_0x1dedc2(0x1ac)],_0x31ce2a=_0xa720bd['Step1End']>=_0xa720bd[_0x1dedc2(0x3bd)]?_0xa720bd['Step1End']:_0xa720bd[_0x1dedc2(0x3bd)],_0x1e5ebd=Array(_0x31ce2a-_0x5baaaf+0x1)[_0x1dedc2(0x269)]()[_0x1dedc2(0x3a9)]((_0xfe03a7,_0xcc13e7)=>_0x5baaaf+_0xcc13e7),_0x11a1d7=Game_BattlerBase[_0x1dedc2(0x2c5)][_0x1dedc2(0x240)]();for(const _0x18d714 of _0x1e5ebd){const _0x2b9e36=$gameTroop[_0x1dedc2(0x16f)]()[_0x18d714];if(!_0x2b9e36)continue;for(const _0x3d9d21 of _0x11a1d7){if(!_0xa720bd[_0x3d9d21])continue;if(_0xa720bd[_0x3d9d21][_0x1dedc2(0x25d)](/UNCHANGED/i))continue;_0xa720bd[_0x3d9d21][_0x1dedc2(0x25d)](/RANDOM/i)?_0x2b9e36[_0x1dedc2(0x3a0)](_0x3d9d21):_0x2b9e36[_0x1dedc2(0x16a)](_0x3d9d21,_0xa720bd[_0x3d9d21]);}}$gameTroop[_0x1dedc2(0x14c)]();}),PluginManager[_0x3d06b3(0x321)](pluginData['name'],_0x3d06b3(0x153),_0x6caeb2=>{const _0x5de5ef=_0x3d06b3;if(!$gameParty[_0x5de5ef(0x1c2)]())return;VisuMZ[_0x5de5ef(0x3b8)](_0x6caeb2,_0x6caeb2);const _0x4fc04b=_0x6caeb2[_0x5de5ef(0x299)];let _0x2790fc=[];while(_0x4fc04b[_0x5de5ef(0x2d2)]>0x0){const _0x3b16c0=_0x4fc04b['shift']();Array[_0x5de5ef(0x1fb)](_0x3b16c0)?_0x2790fc=_0x2790fc['concat'](_0x3b16c0):_0x2790fc['push'](_0x3b16c0);}const _0x4910e8=Game_BattlerBase[_0x5de5ef(0x2c5)][_0x5de5ef(0x240)]();for(const _0x14d199 of _0x2790fc){const _0x34edca=$gameTroop[_0x5de5ef(0x16f)]()[_0x14d199];if(!_0x34edca)continue;for(const _0x5e5ece of _0x4910e8){if(!_0x6caeb2[_0x5e5ece])continue;if(_0x6caeb2[_0x5e5ece]['match'](/UNCHANGED/i))continue;_0x6caeb2[_0x5e5ece][_0x5de5ef(0x25d)](/RANDOM/i)?_0x34edca[_0x5de5ef(0x3a0)](_0x5e5ece):_0x34edca[_0x5de5ef(0x16a)](_0x5e5ece,_0x6caeb2[_0x5e5ece]);}}$gameTroop[_0x5de5ef(0x14c)]();}),VisuMZ[_0x3d06b3(0x285)][_0x3d06b3(0x332)]=Scene_Boot[_0x3d06b3(0x2c5)]['onDatabaseLoaded'],Scene_Boot[_0x3d06b3(0x2c5)][_0x3d06b3(0x35f)]=function(){const _0x177602=_0x3d06b3;VisuMZ[_0x177602(0x285)][_0x177602(0x332)][_0x177602(0x209)](this),this['process_VisuMZ_ElementStatusCore_Parameters'](),this[_0x177602(0x294)](),this['process_VisuMZ_ElementStatusCore_RegExp'](),this[_0x177602(0x1d8)](),this[_0x177602(0x389)]();},Scene_Boot['prototype'][_0x3d06b3(0x2a7)]=function(){const _0x53061e=_0x3d06b3,_0x4d3167=VisuMZ[_0x53061e(0x285)][_0x53061e(0x338)][_0x53061e(0x2ac)];Window_StatusData[_0x53061e(0x158)]=(_0x4d3167[_0x53061e(0x263)]||Window_StatusData['traitCol1'])[_0x53061e(0x1c5)](_0x46f314=>{const _0x5b5162=_0x53061e,_0x5972a6=DataManager[_0x5b5162(0x2bc)](_0x46f314);return _0x5972a6&&_0x5972a6[_0x5b5162(0x163)];}),Window_StatusData['traitCol2']=(_0x4d3167['TraitCol2']||Window_StatusData[_0x53061e(0x160)])[_0x53061e(0x1c5)](_0x3a8cdd=>{const _0x5e2f1b=_0x53061e,_0x533d24=DataManager['traitSetType'](_0x3a8cdd);return _0x533d24&&_0x533d24[_0x5e2f1b(0x163)];});},Scene_Boot['prototype']['process_VisuMZ_ElementStatusCore_TraitSets']=function(){const _0x52e972=_0x3d06b3,_0xf2cfb5=VisuMZ[_0x52e972(0x285)][_0x52e972(0x338)],_0x2d0f60=Game_BattlerBase['prototype'][_0x52e972(0x240)]();DataManager[_0x52e972(0x296)]={};for(const _0x26d8d4 of _0x2d0f60){const _0x14f089=_0x26d8d4[_0x52e972(0x322)]()[_0x52e972(0x2cd)]();DataManager[_0x52e972(0x296)][_0x14f089]={},DataManager[_0x52e972(0x296)][_0x14f089][_0x52e972(0x1de)]=_0xf2cfb5[_0x26d8d4][_0x52e972(0x32d)];const _0x276742=_0xf2cfb5[_0x26d8d4][_0x52e972(0x32d)][_0x52e972(0x20d)][_0x52e972(0x322)]()['trim']();DataManager['_traitSets'][_0x14f089][_0x276742]=_0xf2cfb5[_0x26d8d4][_0x52e972(0x32d)];const _0x6b33fa=_0xf2cfb5[_0x26d8d4][_0x52e972(0x2b6)];for(const _0x3a616e of _0x6b33fa){const _0x383507=_0x3a616e[_0x52e972(0x20d)][_0x52e972(0x322)]()['trim']();DataManager[_0x52e972(0x296)][_0x14f089][_0x383507]=_0x3a616e;}}},VisuMZ['ElementStatusCore'][_0x3d06b3(0x36b)]={},Scene_Boot[_0x3d06b3(0x2c5)][_0x3d06b3(0x22d)]=function(){const _0xa4231=_0x3d06b3,_0x491a47=VisuMZ[_0xa4231(0x285)][_0xa4231(0x36b)],_0x31550d=$dataSystem['elements'],_0x1b747c=_0xa4231(0x31a),_0x26c181='<%1DEALT\x20ELEMENT\x20%2\x20%3:[\x20]%4>',_0x8fbdda=_0xa4231(0x3b4),_0x53b528=_0xa4231(0x2f7),_0x2886eb=_0xa4231(0x2c4),_0x53aed8='([\x5c+\x5c-]\x5cd+\x5c.?\x5cd+)',_0x988d3d=_0xa4231(0x1b0),_0x30ed04=[_0xa4231(0x193),_0xa4231(0x2dd)],_0x26f402=[_0xa4231(0x311),'Rate',_0xa4231(0x281)],_0x209249=[_0xa4231(0x2f9),_0xa4231(0x267),'JS'],_0x5544a8=[_0x2886eb,_0x53aed8,_0x988d3d],_0x11635d=[_0x8fbdda,_0x53b528,_0x988d3d],_0xe3275e=_0xa4231(0x21b);_0x491a47[_0xa4231(0x206)]=[],_0x491a47[_0xa4231(0x2af)]=[],_0x491a47['EleForceJS']=[];for(let _0x3c0aed=0x0;_0x3c0aed<_0x31550d['length'];_0x3c0aed++){let _0x268d96=_0x31550d[_0x3c0aed][_0xa4231(0x322)]()[_0xa4231(0x2cd)]();_0x268d96=_0x268d96[_0xa4231(0x196)](/\x1I\[(\d+)\]/gi,''),_0x268d96=_0x268d96['replace'](/\\I\[(\d+)\]/gi,''),_0x268d96=_0x268d96[_0xa4231(0x196)](/\(/gi,'\x5c('),_0x268d96=_0x268d96[_0xa4231(0x196)](/\)/gi,'\x5c)');for(const _0x3d8a37 of _0x30ed04){for(const _0x441baa of _0x26f402){for(const _0x21fcf4 of _0x209249){const _0xfca996=_0xa4231(0x320)['format'](_0x3d8a37,_0x441baa,_0x21fcf4);_0x491a47[_0xfca996]=_0x491a47[_0xfca996]||[];const _0x2efb2b=_0x3d8a37===_0xa4231(0x193)?_0x1b747c:_0x26c181,_0x360397=_0x21fcf4[_0xa4231(0x25d)](/JS/i)?_0xa4231(0x2e9):'',_0x533ca7=_0xa4231(0x346)[_0xa4231(0x2e2)](_0x268d96,_0x3c0aed),_0x1d1dba=_0x441baa[_0xa4231(0x322)](),_0x4df8ec=_0x441baa[_0xa4231(0x25d)](/RATE/i)?_0x11635d:_0x5544a8,_0x239250=_0x4df8ec[_0x209249[_0xa4231(0x24a)](_0x21fcf4)];_0x491a47[_0xfca996][_0x3c0aed]=new RegExp(_0x2efb2b[_0xa4231(0x2e2)](_0x360397,_0x533ca7,_0x1d1dba,_0x239250),'i');}}}_0x491a47[_0xa4231(0x206)][_0x3c0aed]=new RegExp(_0xe3275e['format']('',_0x268d96,_0x3c0aed,_0x8fbdda),'i'),_0x491a47[_0xa4231(0x2af)][_0x3c0aed]=new RegExp(_0xe3275e[_0xa4231(0x2e2)]('',_0x268d96,_0x3c0aed,_0x53b528),'i'),_0x491a47[_0xa4231(0x1ca)][_0x3c0aed]=new RegExp(_0xe3275e[_0xa4231(0x2e2)]('JS\x20',_0x268d96,_0x3c0aed,_0x988d3d),'i');}},Scene_Boot['prototype'][_0x3d06b3(0x1d8)]=function(){const _0x2c732d=_0x3d06b3,_0x490686=Game_BattlerBase['prototype'][_0x2c732d(0x240)](),_0x282967='<%1\x20BATTLER\x20NAME:\x20(.*)>',_0x23d41e=_0x2c732d(0x259),_0x2847d8=_0x2c732d(0x2d6),_0x4aa5a2=_0x2c732d(0x31d);for(const _0x281bea of _0x490686){const _0x377ad7=_0x281bea[_0x2c732d(0x322)]()['trim']();for(const _0x32ce2a in DataManager[_0x2c732d(0x296)][_0x377ad7]){const _0x1a08c9=_0x2c732d(0x37c)[_0x2c732d(0x2e2)](_0x377ad7,_0x32ce2a);VisuMZ[_0x2c732d(0x285)][_0x2c732d(0x36b)][_0x1a08c9]=new RegExp(_0x282967['format'](_0x32ce2a),'i');const _0x1f0fd3=_0x2c732d(0x3a2)[_0x2c732d(0x2e2)](_0x377ad7,_0x32ce2a);VisuMZ[_0x2c732d(0x285)][_0x2c732d(0x36b)][_0x1f0fd3]=new RegExp(_0x23d41e[_0x2c732d(0x2e2)](_0x32ce2a),'i');const _0x25c3b3=_0x2c732d(0x198)[_0x2c732d(0x2e2)](_0x377ad7,_0x32ce2a);VisuMZ[_0x2c732d(0x285)]['RegExp'][_0x25c3b3]=new RegExp(_0x2847d8[_0x2c732d(0x2e2)](_0x32ce2a),'i');const _0x171a3b=_0x2c732d(0x250)[_0x2c732d(0x2e2)](_0x377ad7,_0x32ce2a);VisuMZ['ElementStatusCore'][_0x2c732d(0x36b)][_0x171a3b]=new RegExp(_0x4aa5a2['format'](_0x32ce2a),'i');}}},Scene_Boot[_0x3d06b3(0x2c5)][_0x3d06b3(0x389)]=function(){const _0xba659c=_0x3d06b3,_0x1a0c13=Game_BattlerBase[_0xba659c(0x2c5)][_0xba659c(0x240)]();if(Imported[_0xba659c(0x1f0)]){const _0x24c502=_0xba659c(0x19d),_0x487e16=_0xba659c(0x34a),_0x19bd8c=_0xba659c(0x228),_0x9c3828=_0xba659c(0x2be),_0x12240a=_0xba659c(0x2ab),_0x1ceae4=_0xba659c(0x289);for(const _0x236285 of _0x1a0c13){const _0x25d940=_0x236285[_0xba659c(0x322)]()[_0xba659c(0x2cd)]();for(const _0x3d4c85 in DataManager[_0xba659c(0x296)][_0x25d940]){const _0x49cf48=_0xba659c(0x21c)[_0xba659c(0x2e2)](_0x25d940,_0x3d4c85);VisuMZ['ElementStatusCore'][_0xba659c(0x36b)][_0x49cf48]=new RegExp(_0x24c502[_0xba659c(0x2e2)](_0x3d4c85),'i');const _0x270b05=_0xba659c(0x38a)['format'](_0x25d940,_0x3d4c85);VisuMZ[_0xba659c(0x285)][_0xba659c(0x36b)][_0x270b05]=new RegExp(_0x487e16[_0xba659c(0x2e2)](_0x3d4c85),'i');const _0x52ed7e=_0xba659c(0x330)[_0xba659c(0x2e2)](_0x25d940,_0x3d4c85);VisuMZ[_0xba659c(0x285)]['RegExp'][_0x52ed7e]=new RegExp(_0x19bd8c['format'](_0x3d4c85),'i');const _0xba6d82='SvBattlerMass-%1-%2'[_0xba659c(0x2e2)](_0x25d940,_0x3d4c85);VisuMZ['ElementStatusCore'][_0xba659c(0x36b)][_0xba6d82]=new RegExp(_0x9c3828[_0xba659c(0x2e2)](_0x3d4c85),'i');const _0x18c241=_0xba659c(0x27f)[_0xba659c(0x2e2)](_0x25d940,_0x3d4c85);VisuMZ['ElementStatusCore'][_0xba659c(0x36b)][_0x18c241]=new RegExp(_0x12240a[_0xba659c(0x2e2)](_0x3d4c85),'i');const _0x3b84c2=_0xba659c(0x20f)[_0xba659c(0x2e2)](_0x25d940,_0x3d4c85);VisuMZ['ElementStatusCore'][_0xba659c(0x36b)][_0x3b84c2]=new RegExp(_0x1ceae4[_0xba659c(0x2e2)](_0x3d4c85),'i');}}}},DataManager[_0x3d06b3(0x220)]=function(){const _0x5a081a=_0x3d06b3;return VisuMZ[_0x5a081a(0x285)]['Settings'][_0x5a081a(0x2ac)][_0x5a081a(0x2c0)];},DataManager[_0x3d06b3(0x2bc)]=function(_0x5708b3){return VisuMZ['ElementStatusCore']['Settings'][_0x5708b3];},DataManager[_0x3d06b3(0x1be)]=function(_0x806d3f,_0x9b7c60){const _0x34f924=_0x3d06b3;return _0x806d3f=_0x806d3f[_0x34f924(0x322)]()['trim'](),_0x9b7c60=_0x9b7c60['toUpperCase']()[_0x34f924(0x2cd)](),this[_0x34f924(0x296)][_0x806d3f][_0x9b7c60]?this[_0x34f924(0x296)][_0x806d3f][_0x9b7c60]:this[_0x34f924(0x296)][_0x806d3f][_0x34f924(0x1de)];},DataManager[_0x3d06b3(0x25c)]=function(_0x3a20bd,_0x459183){const _0x4804a9=_0x3d06b3;if(!_0x459183)return;this[_0x4804a9(0x2d0)](_0x3a20bd,_0x459183),this[_0x4804a9(0x1bc)](_0x3a20bd,_0x459183),this[_0x4804a9(0x38d)](_0x3a20bd,_0x459183);},DataManager['getRandomTraitSetFromString']=function(_0x36c14f){const _0x5e7b78=_0x3d06b3;return data=_0x36c14f[_0x5e7b78(0x20a)](','),data[Math[_0x5e7b78(0x37d)](data[_0x5e7b78(0x2d2)])][_0x5e7b78(0x2cd)]();},DataManager['makeMassTraitSetFromNotetags']=function(_0x19b6ec,_0x1c395c){const _0x5f1fcf=_0x3d06b3,_0x54f6e1={'ELEMENT':'Element','SUBELEMENT':'SubElement','GENDER':'Gender','RACE':_0x5f1fcf(0x30a),'NATURE':_0x5f1fcf(0x255),'ALIGNMENT':_0x5f1fcf(0x392),'BLESSING':_0x5f1fcf(0x18e),'CURSE':_0x5f1fcf(0x331),'ZODIAC':_0x5f1fcf(0x1aa),'VARIANT':'Variant'},_0x5f28a0=_0x1c395c['note'];if(_0x5f28a0[_0x5f1fcf(0x25d)](/<TRAIT SETS>\s*([\s\S]*)\s*<\/TRAIT SETS>/i)){const _0x4ade6f=String(RegExp['$1'])[_0x5f1fcf(0x20a)](/[\r\n]+/);for(const _0x4fb45a of _0x4ade6f){if(_0x4fb45a[_0x5f1fcf(0x25d)](/(.*):[ ](.*)/i)){const _0x1960d4=String(RegExp['$1'])[_0x5f1fcf(0x322)]()[_0x5f1fcf(0x2cd)](),_0x53a077=String(RegExp['$2']),_0x321cca=_0x54f6e1[_0x1960d4];_0x321cca&&(_0x19b6ec[_0x321cca]=this[_0x5f1fcf(0x2c8)](_0x53a077));}}}},DataManager[_0x3d06b3(0x1bc)]=function(_0x9983b6,_0x167dca){const _0x4a5ea1=_0x3d06b3,_0x5b9299=_0x167dca[_0x4a5ea1(0x154)],_0x1bb519={'Element':/<ELEMENT:[ ](.*)>/i,'SubElement':/<SUBELEMENT:[ ](.*)>/i,'Gender':/<GENDER:[ ](.*)>/i,'Race':/<RACE:[ ](.*)>/i,'Nature':/<NATURE:[ ](.*)>/i,'Alignment':/<ALIGNMENT:[ ](.*)>/i,'Blessing':/<BLESSING:[ ](.*)>/i,'Curse':/<CURSE:[ ](.*)>/i,'Zodiac':/<ZODIAC:[ ](.*)>/i,'Variant':/<VARIANT:[ ](.*)>/i};for(const _0xd69745 in _0x1bb519){const _0x4dca24=_0x1bb519[_0xd69745];_0x5b9299['match'](_0x4dca24)&&(_0x9983b6[_0xd69745]=this[_0x4a5ea1(0x2c8)](RegExp['$1']));}_0x5b9299[_0x4a5ea1(0x25d)](/<ELEMENT:[ ](.*)\/(.*)>/i)&&(_0x9983b6[_0x4a5ea1(0x24f)]=String(RegExp['$1'])[_0x4a5ea1(0x2cd)](),_0x9983b6['SubElement']=String(RegExp['$2'])['trim']());},DataManager[_0x3d06b3(0x38d)]=function(_0x4b1903,_0x38a442){const _0x4d705b=_0x3d06b3,_0x22172c=_0x38a442[_0x4d705b(0x154)],_0x380492={'Element':/<RANDOM ELEMENT>\s*([\s\S]*)\s*<\/RANDOM ELEMENT>/i,'SubElement':/<RANDOM SUBELEMENT>\s*([\s\S]*)\s*<\/RANDOM SUBELEMENT>/i,'Gender':/<RANDOM GENDER>\s*([\s\S]*)\s*<\/RANDOM GENDER>/i,'Race':/<RANDOM RACE>\s*([\s\S]*)\s*<\/RANDOM RACE>/i,'Nature':/<RANDOM NATURE>\s*([\s\S]*)\s*<\/RANDOM NATURE>/i,'Alignment':/<RANDOM ALIGNMENT>\s*([\s\S]*)\s*<\/RANDOM ALIGNMENT>/i,'Blessing':/<RANDOM BLESSING>\s*([\s\S]*)\s*<\/RANDOM BLESSING>/i,'Curse':/<RANDOM CURSE>\s*([\s\S]*)\s*<\/RANDOM CURSE>/i,'Zodiac':/<RANDOM ZODIAC>\s*([\s\S]*)\s*<\/RANDOM ZODIAC>/i,'Variant':/<RANDOM VARIANT>\s*([\s\S]*)\s*<\/RANDOM VARIANT>/i};for(const _0x4dde76 in _0x380492){const _0x2aedad=_0x380492[_0x4dde76];if(_0x22172c['match'](_0x2aedad)){const _0x425475=String(RegExp['$1'])[_0x4d705b(0x20a)](/[\r\n]+/)['remove']('');_0x4b1903[_0x4dde76]=this[_0x4d705b(0x2c3)](_0x425475);}}},DataManager[_0x3d06b3(0x34f)]=function(_0x37bcd9){const _0x2798d1=_0x3d06b3;if(_0x37bcd9[_0x2798d1(0x257)]!==undefined)return _0x37bcd9[_0x2798d1(0x257)];const _0x40f995={},_0x58d481=[_0x2798d1(0x211),'subelement',_0x2798d1(0x262),_0x2798d1(0x310),_0x2798d1(0x1f1),_0x2798d1(0x28e),_0x2798d1(0x26f),_0x2798d1(0x210),_0x2798d1(0x3b9),'variant'];for(const _0x47c433 of _0x58d481){_0x40f995[_0x47c433]='NO\x20REPLACEMENT';}const _0x4f8004=/<REPLACE (.*) TRAIT:[ ](.*)>/gi,_0x51cdca=_0x37bcd9[_0x2798d1(0x154)][_0x2798d1(0x25d)](_0x4f8004);if(_0x51cdca)for(const _0x58ab06 of _0x51cdca){_0x58ab06[_0x2798d1(0x25d)](_0x4f8004);const _0x5e860e=String(RegExp['$1'])[_0x2798d1(0x3a1)]()['trim'](),_0x3aeae7=String(RegExp['$2'])[_0x2798d1(0x2cd)]();_0x40f995[_0x5e860e]=_0x3aeae7;}return _0x37bcd9[_0x2798d1(0x257)]=_0x40f995,_0x37bcd9[_0x2798d1(0x257)];},DataManager[_0x3d06b3(0x2c3)]=function(_0x118787){const _0x4400f3=_0x3d06b3;let _0x5994e6=0x0;const _0x225ac0={};for(const _0x17db1a of _0x118787){if(_0x17db1a[_0x4400f3(0x25d)](/(.*):[ ](\d+)/i)){const _0x4c6762=String(RegExp['$1'])[_0x4400f3(0x2cd)](),_0x548154=Number(RegExp['$2']);_0x225ac0[_0x4c6762]=_0x548154,_0x5994e6+=_0x548154;}else{if(_0x17db1a['match'](/(.*):[ ](\d+\.?\d+)/i)){const _0x225e6f=String(RegExp['$1'])[_0x4400f3(0x2cd)](),_0x5cdd8d=Number(RegExp['$2']);_0x225ac0[_0x225e6f]=_0x5cdd8d,_0x5994e6+=_0x5cdd8d;}else _0x17db1a!==''&&(_0x225ac0[_0x17db1a]=0x1,_0x5994e6++);}}if(_0x5994e6<=0x0)return'';let _0x32379f=Math[_0x4400f3(0x301)]()*_0x5994e6;for(const _0x2ecc2f in _0x225ac0){_0x32379f-=_0x225ac0[_0x2ecc2f];if(_0x32379f<=0x0)return _0x2ecc2f;}return'';},DataManager[_0x3d06b3(0x324)]=function(_0x37b3b1){const _0x257370=_0x3d06b3;let _0x18c928=[],_0x224014=0x0;_0x37b3b1=_0x37b3b1[_0x257370(0x322)]()['trim']();const _0x8f3aa2=this[_0x257370(0x296)][_0x37b3b1];for(const _0x22a917 in _0x8f3aa2){const _0x82481=_0x8f3aa2[_0x22a917];_0x82481[_0x257370(0x243)]&&(_0x18c928[_0x257370(0x2df)](_0x22a917),_0x224014+=_0x82481[_0x257370(0x172)]);}if(_0x224014<=0x0)return'';let _0x34cd6a=Math[_0x257370(0x301)]()*_0x224014;for(const _0x1df0f0 of _0x18c928){_0x34cd6a-=_0x8f3aa2[_0x1df0f0]['RandomWeight'];if(_0x34cd6a<=0x0)return _0x1df0f0;}return'';},DataManager['getElementIdWithName']=function(_0x4969f){const _0x427170=_0x3d06b3;_0x4969f=_0x4969f[_0x427170(0x322)]()[_0x427170(0x2cd)](),this['_elementIDs']=this[_0x427170(0x218)]||{};if(this[_0x427170(0x218)][_0x4969f])return this[_0x427170(0x218)][_0x4969f];let _0x453118=0x1;for(const _0x2a3e57 of $dataSystem[_0x427170(0x2f4)]){if(!_0x2a3e57)continue;let _0x52ff68=_0x2a3e57[_0x427170(0x322)]();_0x52ff68=_0x52ff68[_0x427170(0x196)](/\x1I\[(\d+)\]/gi,''),_0x52ff68=_0x52ff68[_0x427170(0x196)](/\\I\[(\d+)\]/gi,''),this[_0x427170(0x218)][_0x52ff68]=_0x453118,_0x453118++;}return this[_0x427170(0x218)][_0x4969f]||0x0;},DataManager[_0x3d06b3(0x2f8)]=function(_0x1b34d1){const _0x128ba2=_0x3d06b3;let _0x17cac5=[];const _0x5a3094=_0x1b34d1['note'][_0x128ba2(0x25d)](/<MULTI-ELEMENT:[ ](.*)>/gi);if(_0x5a3094)for(const _0x27af87 of _0x5a3094){_0x27af87[_0x128ba2(0x25d)](/<MULTI-ELEMENT:[ ](.*)>/gi);const _0x4223ee=String(RegExp['$1'])[_0x128ba2(0x20a)](',')['map'](_0x2177a2=>_0x2177a2[_0x128ba2(0x2cd)]());for(const _0x404434 of _0x4223ee){const _0x39d42c=/^\d+$/[_0x128ba2(0x2cb)](_0x404434);if(_0x39d42c)_0x17cac5['push'](Number(_0x404434));else{const _0x2bf76f=this[_0x128ba2(0x1c4)](_0x404434);if(_0x2bf76f)_0x17cac5[_0x128ba2(0x2df)](_0x2bf76f);}}}return _0x17cac5;},TextManager['statusMenuBiography']=VisuMZ['ElementStatusCore'][_0x3d06b3(0x338)]['StatusMenu']['VocabBiography'],TextManager['statusMenuDmgAbsorb']=VisuMZ[_0x3d06b3(0x285)][_0x3d06b3(0x338)]['StatusMenu'][_0x3d06b3(0x2ee)],TextManager[_0x3d06b3(0x200)]=VisuMZ[_0x3d06b3(0x285)]['Settings'][_0x3d06b3(0x246)]['VocabDmgReceive'],TextManager[_0x3d06b3(0x31e)]=VisuMZ[_0x3d06b3(0x285)]['Settings'][_0x3d06b3(0x246)][_0x3d06b3(0x37b)],TextManager[_0x3d06b3(0x191)]=VisuMZ[_0x3d06b3(0x285)]['Settings'][_0x3d06b3(0x246)][_0x3d06b3(0x1af)],TextManager[_0x3d06b3(0x2d8)]=VisuMZ['ElementStatusCore'][_0x3d06b3(0x338)][_0x3d06b3(0x246)][_0x3d06b3(0x162)],TextManager[_0x3d06b3(0x2ed)]=VisuMZ[_0x3d06b3(0x285)][_0x3d06b3(0x338)][_0x3d06b3(0x246)][_0x3d06b3(0x3bf)],ColorManager[_0x3d06b3(0x28a)]=function(_0x3278dc){const _0x5521db=_0x3d06b3;return _0x3278dc=String(_0x3278dc),_0x3278dc['match'](/#(.*)/i)?_0x5521db(0x27e)['format'](String(RegExp['$1'])):this[_0x5521db(0x295)](Number(_0x3278dc));},VisuMZ['ElementStatusCore'][_0x3d06b3(0x1c6)]=Game_Action['prototype'][_0x3d06b3(0x1a5)],Game_Action[_0x3d06b3(0x2c5)][_0x3d06b3(0x1a5)]=function(){const _0x1c63b8=_0x3d06b3;VisuMZ['ElementStatusCore']['Game_Action_clear'][_0x1c63b8(0x209)](this),this[_0x1c63b8(0x380)]();},Game_Action[_0x3d06b3(0x2c5)][_0x3d06b3(0x380)]=function(){const _0x1cf6d0=_0x3d06b3;this[_0x1cf6d0(0x156)]=![],this['_battleCoreForcedElements']=[],this['_battleCoreAddedElements']=[];},Game_Action[_0x3d06b3(0x2c5)][_0x3d06b3(0x2f4)]=function(){const _0x30969e=_0x3d06b3;if(!this[_0x30969e(0x17f)]())return[];if(this[_0x30969e(0x37f)]()['isElementNull']())return[];if(this[_0x30969e(0x156)])return[];if(this[_0x30969e(0x217)][_0x30969e(0x2d2)]>0x0)return this[_0x30969e(0x217)];const _0x6092cd=this['subject']()['getForcedActionElement']();if(_0x6092cd[_0x30969e(0x2d2)]>0x0)return _0x6092cd;let _0x8bc679=[];const _0x5b332b=this['item']()[_0x30969e(0x1bf)][_0x30969e(0x2b5)];return _0x5b332b<0x0?_0x8bc679=_0x8bc679[_0x30969e(0x229)](this[_0x30969e(0x37f)]()['attackElements']()):_0x8bc679[_0x30969e(0x2df)](_0x5b332b),_0x8bc679=_0x8bc679['concat'](this[_0x30969e(0x15f)]),_0x8bc679=_0x8bc679['concat'](DataManager['getActionObjectElements'](this[_0x30969e(0x17f)]())),_0x8bc679[_0x30969e(0x1c5)]((_0x655c93,_0x3a1450,_0x271abd)=>_0x271abd[_0x30969e(0x24a)](_0x655c93)===_0x3a1450);},VisuMZ['ElementStatusCore'][_0x3d06b3(0x1a2)]=Game_Action[_0x3d06b3(0x2c5)][_0x3d06b3(0x2f5)],Game_Action['prototype'][_0x3d06b3(0x2f5)]=function(_0x40fbc7){const _0x56ab7a=_0x3d06b3,_0x25a911=this[_0x56ab7a(0x2f4)]()||[],_0x4c5b85=_0x40fbc7?_0x40fbc7[_0x56ab7a(0x286)]():[],_0x29ae19=this['subject']()?this[_0x56ab7a(0x37f)]()[_0x56ab7a(0x31f)]():[],_0x849446=this[_0x56ab7a(0x3ae)]();let _0x405bb0=![];_0x849446==='all'?_0x405bb0=_0x25a911[_0x56ab7a(0x236)](_0x3f0da2=>_0x4c5b85[_0x56ab7a(0x1f2)](_0x3f0da2)&&!_0x29ae19[_0x56ab7a(0x1f2)](_0x3f0da2)):_0x405bb0=_0x25a911['some'](_0xb991df=>_0x4c5b85[_0x56ab7a(0x1f2)](_0xb991df)&&!_0x29ae19[_0x56ab7a(0x1f2)](_0xb991df));if(_0x405bb0){if(this['canPierceElement']())return 0x0;if(this[_0x56ab7a(0x151)]())return 0x0;return 0x1;}else return VisuMZ[_0x56ab7a(0x285)][_0x56ab7a(0x1a2)]['call'](this,_0x40fbc7);},Game_Action[_0x3d06b3(0x2c5)]['getReflectElementRulings']=function(){const _0x5390cb=_0x3d06b3;if(this[_0x5390cb(0x17f)]()){if(this[_0x5390cb(0x17f)]()[_0x5390cb(0x154)][_0x5390cb(0x25d)](/<ELEMENT REFLECT RULE: ANY>/i))return _0x5390cb(0x33d);else{if(this[_0x5390cb(0x17f)]()[_0x5390cb(0x154)][_0x5390cb(0x25d)](/<ELEMENT REFLECT RULE: ALL>/i))return _0x5390cb(0x34e);}}return VisuMZ[_0x5390cb(0x285)][_0x5390cb(0x338)][_0x5390cb(0x20e)][_0x5390cb(0x182)]??_0x5390cb(0x33d);},Game_Action['prototype'][_0x3d06b3(0x288)]=function(_0xa0c669){const _0x1ae968=_0x3d06b3;let _0x40546e=VisuMZ[_0x1ae968(0x285)]['Settings'][_0x1ae968(0x20e)][_0x1ae968(0x1c8)][_0x1ae968(0x209)](this,_0xa0c669);const _0x27053a=this['subject']()?this['subject']()[_0x1ae968(0x31f)]():[];return this['elements']()['some'](_0x4b7ff0=>_0x27053a[_0x1ae968(0x1f2)](_0x4b7ff0))&&(_0x40546e=Math[_0x1ae968(0x29e)](0x1,_0x40546e)),this[_0x1ae968(0x1ef)]()&&(_0x40546e=Math['max'](0x1,_0x40546e)),_0x40546e;},Game_Action[_0x3d06b3(0x2c5)][_0x3d06b3(0x379)]=function(_0x5b26b4,_0x2c97e0){const _0x4f7acd=_0x3d06b3,_0x21bb7f=this[_0x4f7acd(0x213)]();switch(_0x21bb7f){case _0x4f7acd(0x38e):return this[_0x4f7acd(0x28c)](_0x5b26b4,_0x2c97e0);break;case _0x4f7acd(0x2b2):return this[_0x4f7acd(0x1cf)](_0x5b26b4,_0x2c97e0);break;case'additive':return this[_0x4f7acd(0x32a)](_0x5b26b4,_0x2c97e0);break;case'average':return this[_0x4f7acd(0x1d5)](_0x5b26b4,_0x2c97e0);break;default:return this[_0x4f7acd(0x186)](_0x5b26b4,_0x2c97e0);break;}},Game_Action[_0x3d06b3(0x2c5)]['elementRateRuling']=function(){const _0x4adbcf=_0x3d06b3;if(this['item']()['note']['match'](/<MULTI-ELEMENT RULE:[ ](.*)>/i)){const _0x394222=String(RegExp['$1'])[_0x4adbcf(0x2cd)]()['toLowerCase']();switch(_0x394222){case _0x4adbcf(0x29e):case'maximum':case _0x4adbcf(0x2da):return _0x4adbcf(0x29e);break;case _0x4adbcf(0x38e):case _0x4adbcf(0x1a8):case _0x4adbcf(0x39f):return _0x4adbcf(0x38e);break;case _0x4adbcf(0x2b2):case _0x4adbcf(0x2b4):case _0x4adbcf(0x34b):return _0x4adbcf(0x2b2);break;case _0x4adbcf(0x1b3):case _0x4adbcf(0x323):case _0x4adbcf(0x266):return'additive';break;case _0x4adbcf(0x3b2):case _0x4adbcf(0x2b1):return _0x4adbcf(0x3b2);break;}}return VisuMZ[_0x4adbcf(0x285)]['Settings'][_0x4adbcf(0x20e)]['MultiRule'];},Game_Action[_0x3d06b3(0x2c5)][_0x3d06b3(0x186)]=function(_0xd91c8b,_0x8e66ef){const _0x56e83d=_0x3d06b3;if(_0x8e66ef['length']>0x0){if(VisuMZ[_0x56e83d(0x285)][_0x56e83d(0x338)][_0x56e83d(0x20e)][_0x56e83d(0x38c)])return VisuMZ[_0x56e83d(0x285)][_0x56e83d(0x338)]['ElementRules']['RuleMaxCalcJSa'][_0x56e83d(0x209)](this,_0xd91c8b,_0x8e66ef);const _0x20efb5=this[_0x56e83d(0x333)]()?[]:_0xd91c8b[_0x56e83d(0x2fe)]();let _0x4c1581=-0x3e8;for(const _0x4471f3 of _0x8e66ef){const _0x405dd1=_0x20efb5['includes'](_0x4471f3)?-0x1:0x1;_0x4c1581=Math[_0x56e83d(0x29e)](_0x4c1581,_0xd91c8b['elementRate'](_0x4471f3)*_0x405dd1);}return _0x4c1581;}else return 0x1;},Game_Action[_0x3d06b3(0x2c5)][_0x3d06b3(0x28c)]=function(_0x48cdeb,_0x4ee8a1){const _0x57504e=_0x3d06b3;return _0x4ee8a1[_0x57504e(0x2d2)]>0x0?VisuMZ['ElementStatusCore'][_0x57504e(0x338)][_0x57504e(0x20e)]['RuleMinCalcJS'][_0x57504e(0x209)](this,_0x48cdeb,_0x4ee8a1):0x1;},Game_Action['prototype']['elementsRateProduct']=function(_0x1787d1,_0x6513c){const _0x5d8e12=_0x3d06b3;return _0x6513c[_0x5d8e12(0x2d2)]>0x0?VisuMZ[_0x5d8e12(0x285)]['Settings']['ElementRules'][_0x5d8e12(0x1c7)][_0x5d8e12(0x209)](this,_0x1787d1,_0x6513c):0x1;},Game_Action[_0x3d06b3(0x2c5)]['elementsRateSum']=function(_0x3b04f7,_0x3c4e7a){const _0x5ed20a=_0x3d06b3;return _0x3c4e7a[_0x5ed20a(0x2d2)]>0x0?VisuMZ['ElementStatusCore'][_0x5ed20a(0x338)][_0x5ed20a(0x20e)][_0x5ed20a(0x278)]['call'](this,_0x3b04f7,_0x3c4e7a):0x1;},Game_Action[_0x3d06b3(0x2c5)][_0x3d06b3(0x1d5)]=function(_0xac0235,_0x18f69e){const _0x4d772d=_0x3d06b3;return _0x18f69e[_0x4d772d(0x2d2)]>0x0?VisuMZ[_0x4d772d(0x285)][_0x4d772d(0x338)][_0x4d772d(0x20e)][_0x4d772d(0x18a)][_0x4d772d(0x209)](this,_0xac0235,_0x18f69e):0x1;},Game_Action['prototype'][_0x3d06b3(0x23e)]=function(_0x3a0fbc,_0x589723){const _0x38abde=_0x3d06b3;if(_0x589723[_0x38abde(0x2d2)]<=0x0)return 0x0;return _0x589723[_0x38abde(0x178)]((_0x4d3386,_0x1a1615)=>_0x4d3386+this[_0x38abde(0x37f)]()[_0x38abde(0x2c9)](_0x1a1615),0x0);},Game_Action['prototype'][_0x3d06b3(0x1fc)]=function(_0xfdbb0d,_0x53b6bd){const _0x20d5a6=_0x3d06b3;if(_0x53b6bd[_0x20d5a6(0x2d2)]<=0x0)return 0x1;return _0x53b6bd[_0x20d5a6(0x178)]((_0x3dc295,_0x2ff51d)=>_0x3dc295*this[_0x20d5a6(0x37f)]()[_0x20d5a6(0x22f)](_0x2ff51d),0x1);},Game_Action[_0x3d06b3(0x2c5)][_0x3d06b3(0x2a1)]=function(_0x5ed3b5,_0x2ecbdc){const _0x167568=_0x3d06b3;if(_0x2ecbdc[_0x167568(0x2d2)]<=0x0)return 0x0;return _0x2ecbdc['reduce']((_0x25badf,_0x419608)=>_0x25badf+this['subject']()[_0x167568(0x35a)](_0x419608),0x0);},Game_Action[_0x3d06b3(0x2c5)][_0x3d06b3(0x151)]=function(){const _0x5d5529=_0x3d06b3;if(!this[_0x5d5529(0x17f)]())return![];if(!this[_0x5d5529(0x17f)]()[_0x5d5529(0x154)])return![];return this[_0x5d5529(0x17f)]()[_0x5d5529(0x154)]['match'](/<BYPASS ELEMENT REFLECT>/i);},Game_Action[_0x3d06b3(0x2c5)][_0x3d06b3(0x1ef)]=function(){const _0xb90c41=_0x3d06b3;if(!this[_0xb90c41(0x17f)]())return![];if(!this[_0xb90c41(0x17f)]()['note'])return![];return this[_0xb90c41(0x17f)]()[_0xb90c41(0x154)][_0xb90c41(0x25d)](/<(?:ELEMENT |)PIERCE>/i);},VisuMZ['ElementStatusCore'][_0x3d06b3(0x33c)]=Game_Action[_0x3d06b3(0x2c5)][_0x3d06b3(0x159)],Game_Action[_0x3d06b3(0x2c5)][_0x3d06b3(0x159)]=function(_0x29e821){const _0x35a505=_0x3d06b3;let _0x59c3a5=VisuMZ[_0x35a505(0x285)][_0x35a505(0x33c)][_0x35a505(0x209)](this,_0x29e821);if(Imported['VisuMZ_1_BattleCore']){const _0x24c886=this['item']()['note']||'';if(_0x24c886[_0x35a505(0x25d)](/<ALWAYS HIT>/i))return 0x1;if(_0x24c886[_0x35a505(0x25d)](/<ALWAYS HIT RATE: (\d+)([%％])>/i))return Number(RegExp['$1'])/0x64;}return _0x59c3a5*=this[_0x35a505(0x152)](_0x29e821),_0x59c3a5*=this[_0x35a505(0x37f)]()[_0x35a505(0x152)](_0x29e821),_0x59c3a5+=this[_0x35a505(0x1da)](_0x29e821),_0x59c3a5+=this[_0x35a505(0x37f)]()[_0x35a505(0x1da)](_0x29e821),_0x59c3a5;},VisuMZ['ElementStatusCore'][_0x3d06b3(0x207)]=Game_Action[_0x3d06b3(0x2c5)][_0x3d06b3(0x36a)],Game_Action[_0x3d06b3(0x2c5)][_0x3d06b3(0x36a)]=function(_0x32f651){const _0x1d627e=_0x3d06b3;let _0x17d347=VisuMZ[_0x1d627e(0x285)]['Game_Action_itemCri'][_0x1d627e(0x209)](this,_0x32f651);if(!this[_0x1d627e(0x17f)]()[_0x1d627e(0x1bf)][_0x1d627e(0x2d5)])return _0x17d347;if(Imported[_0x1d627e(0x1f0)]){const _0x199d52=this[_0x1d627e(0x17f)]()['note']||'';if(_0x199d52['match'](/<ALWAYS CRITICAL>/i))return 0x1;}return _0x17d347*=this[_0x1d627e(0x2aa)](_0x32f651),_0x17d347*=this[_0x1d627e(0x37f)]()['traitCriticalRateMultipliersVs'](_0x32f651),_0x17d347+=this['traitCriticalPlusMultipliersVs'](_0x32f651),_0x17d347+=this[_0x1d627e(0x37f)]()[_0x1d627e(0x2c6)](_0x32f651),_0x17d347;},VisuMZ[_0x3d06b3(0x285)]['Game_Action_executeDamage']=Game_Action[_0x3d06b3(0x2c5)][_0x3d06b3(0x30d)],Game_Action[_0x3d06b3(0x2c5)][_0x3d06b3(0x30d)]=function(_0x37e3bb,_0x668d22){const _0x3c6b47=_0x3d06b3;if(_0x668d22>0x0)_0x668d22*=this[_0x3c6b47(0x2e7)](_0x37e3bb),_0x668d22*=this[_0x3c6b47(0x37f)]()['traitDmgMultipliersVs'](_0x37e3bb),_0x668d22=Math[_0x3c6b47(0x362)](_0x668d22);else _0x668d22<0x0&&(_0x668d22*=this[_0x3c6b47(0x381)](_0x37e3bb),_0x668d22*=this[_0x3c6b47(0x37f)]()[_0x3c6b47(0x381)](_0x37e3bb),_0x668d22=Math[_0x3c6b47(0x362)](_0x668d22));return VisuMZ[_0x3c6b47(0x285)][_0x3c6b47(0x2d4)][_0x3c6b47(0x209)](this,_0x37e3bb,_0x668d22);},VisuMZ['ElementStatusCore'][_0x3d06b3(0x317)]=function(_0x1c8c14,_0x6a0914,_0x2482b0){const _0x16de06=_0x3d06b3;let _0x35a9be=0x1;if(!_0x6a0914)return _0x35a9be;const _0x4cee1b=_0x6a0914[_0x16de06(0x154)]||'',_0x3ede0e=_0x4cee1b[_0x16de06(0x25d)](_0x2482b0);if(_0x3ede0e)for(const _0xbc29 of _0x3ede0e){_0xbc29[_0x16de06(0x25d)](_0x2482b0);const _0x5dfac8=String(RegExp['$1']),_0x18b2f5=Number(RegExp['$2'])*0.01;_0x1c8c14[_0x16de06(0x221)](_0x5dfac8)&&(_0x35a9be*=_0x18b2f5);}return _0x35a9be;},VisuMZ[_0x3d06b3(0x285)][_0x3d06b3(0x18d)]=function(_0x5dbe25,_0xbf8f9,_0xb43169){const _0x5e3192=_0x3d06b3;let _0x4f314a=0x0;if(!_0xbf8f9)return _0x4f314a;const _0x3f1c42=_0xbf8f9[_0x5e3192(0x154)]||'',_0x392866=_0x3f1c42[_0x5e3192(0x25d)](_0xb43169);if(_0x392866)for(const _0x29b9df of _0x392866){_0x29b9df['match'](_0xb43169);const _0x277ded=String(RegExp['$1']),_0x5c2e1d=Number(RegExp['$2'])*0.01;_0x5dbe25[_0x5e3192(0x221)](_0x277ded)&&(_0x4f314a+=_0x5c2e1d);}return _0x4f314a;},Game_Action[_0x3d06b3(0x2c5)]['traitDmgMultipliersVs']=function(_0x17b9d2){const _0x468066=_0x3d06b3;let _0xbb3957=0x1;if(!_0x17b9d2)return _0xbb3957;const _0x2014eb=/<DAMAGE VS (.*) TRAIT:[ ](\d+)([%％])>/gi;return VisuMZ['ElementStatusCore'][_0x468066(0x317)](_0x17b9d2,this[_0x468066(0x17f)](),_0x2014eb);},Game_BattlerBase[_0x3d06b3(0x2c5)]['traitDmgMultipliersVs']=function(_0x4999cb){const _0x575991=_0x3d06b3;let _0x261053=0x1;if(!_0x4999cb)return _0x261053;const _0x13a380=/<DAMAGE VS (.*) TRAIT:[ ](\d+)([%％])>/gi,_0x3b7e75=this[_0x575991(0x31c)]();for(const _0x3587d2 of _0x3b7e75){_0x261053*=VisuMZ['ElementStatusCore'][_0x575991(0x317)](_0x4999cb,_0x3587d2,_0x13a380);}return _0x261053;},Game_Action[_0x3d06b3(0x2c5)][_0x3d06b3(0x381)]=function(_0x25fe1a){const _0xc81932=_0x3d06b3;let _0x4c57b4=0x1;if(!_0x25fe1a)return _0x4c57b4;const _0x3cbc14=/<HEALING VS (.*) TRAIT:[ ](\d+)([%％])>/gi;return VisuMZ['ElementStatusCore'][_0xc81932(0x317)](_0x25fe1a,this[_0xc81932(0x17f)](),_0x3cbc14);},Game_BattlerBase['prototype'][_0x3d06b3(0x381)]=function(_0x5b8152){const _0x21bf17=_0x3d06b3;let _0x4b7d98=0x1;if(!_0x5b8152)return _0x4b7d98;const _0xc2da3c=/<HEALING VS (.*) TRAIT:[ ](\d+)([%％])>/gi,_0x432c42=this[_0x21bf17(0x31c)]();for(const _0x19cb35 of _0x432c42){_0x4b7d98*=VisuMZ[_0x21bf17(0x285)]['TraitCheckNotetagRate'](_0x5b8152,_0x19cb35,_0xc2da3c);}return _0x4b7d98;},Game_Action[_0x3d06b3(0x2c5)][_0x3d06b3(0x152)]=function(_0x11d614){const _0x2ac843=_0x3d06b3;let _0xe43a15=0x1;if(!_0x11d614)return _0xe43a15;const _0x36ee57=/<ACCURACY VS (.*) TRAIT:[ ](\d+)([%％])>/gi;return VisuMZ[_0x2ac843(0x285)][_0x2ac843(0x317)](_0x11d614,this['item'](),_0x36ee57);},Game_BattlerBase[_0x3d06b3(0x2c5)][_0x3d06b3(0x152)]=function(_0x296281){const _0x221b1b=_0x3d06b3;let _0x568a10=0x1;if(!_0x296281)return _0x568a10;const _0x41108c=/<ACCURACY VS (.*) TRAIT:[ ](\d+)([%％])>/gi,_0x4a2674=this['traitObjects']();for(const _0x5c2e0e of _0x4a2674){_0x568a10*=VisuMZ['ElementStatusCore'][_0x221b1b(0x317)](_0x296281,_0x5c2e0e,_0x41108c);}return _0x568a10;},Game_Action['prototype'][_0x3d06b3(0x1da)]=function(_0x2e8f40){const _0x34b6f3=_0x3d06b3;let _0x8ceeb8=0x0;if(!_0x2e8f40)return _0x8ceeb8;const _0x6fcb8d=/<ACCURACY VS (.*) TRAIT:[ ]([\+\-]\d+)([%％])>/gi;return VisuMZ[_0x34b6f3(0x285)]['TraitCheckNotetagPlus'](_0x2e8f40,this[_0x34b6f3(0x17f)](),_0x6fcb8d);},Game_BattlerBase[_0x3d06b3(0x2c5)][_0x3d06b3(0x1da)]=function(_0x1af50e){const _0x7fc95e=_0x3d06b3;let _0x809e07=0x0;if(!_0x1af50e)return _0x809e07;const _0x4059b7=/<ACCURACY VS (.*) TRAIT:[ ]([\+\-]\d+)([%％])>/gi,_0x4ac5b5=this[_0x7fc95e(0x31c)]();for(const _0x330783 of _0x4ac5b5){_0x809e07+=VisuMZ[_0x7fc95e(0x285)][_0x7fc95e(0x18d)](_0x1af50e,_0x330783,_0x4059b7);}return _0x809e07;},Game_Action[_0x3d06b3(0x2c5)]['traitCriticalRateMultipliersVs']=function(_0x2b4581){const _0x19a0c3=_0x3d06b3;let _0x503368=0x1;if(!_0x2b4581)return _0x503368;const _0x384615=/<CRITICAL VS (.*) TRAIT:[ ](\d+)([%％])>/gi;return VisuMZ['ElementStatusCore'][_0x19a0c3(0x317)](_0x2b4581,this[_0x19a0c3(0x17f)](),_0x384615);},Game_BattlerBase[_0x3d06b3(0x2c5)][_0x3d06b3(0x2aa)]=function(_0x4a402d){const _0x49738c=_0x3d06b3;let _0x37b0df=0x1;if(!_0x4a402d)return _0x37b0df;const _0x432506=/<CRITICAL VS (.*) TRAIT:[ ](\d+)([%％])>/gi,_0x5bc45f=this[_0x49738c(0x31c)]();for(const _0x3782f2 of _0x5bc45f){_0x37b0df*=VisuMZ[_0x49738c(0x285)][_0x49738c(0x317)](_0x4a402d,_0x3782f2,_0x432506);}return _0x37b0df;},Game_Action[_0x3d06b3(0x2c5)][_0x3d06b3(0x2c6)]=function(_0x272075){const _0x406a58=_0x3d06b3;let _0x557b1b=0x0;if(!_0x272075)return _0x557b1b;const _0x264e5d=/<CRITICAL VS (.*) TRAIT:[ ]([\+\-]\d+)([%％])>/gi;return VisuMZ[_0x406a58(0x285)][_0x406a58(0x18d)](_0x272075,this['item'](),_0x264e5d);},Game_BattlerBase[_0x3d06b3(0x2c5)][_0x3d06b3(0x2c6)]=function(_0x4466d8){const _0x1fd857=_0x3d06b3;let _0xab655d=0x0;if(!_0x4466d8)return _0xab655d;const _0x588468=/<CRITICAL VS (.*) TRAIT:[ ]([\+\-]\d+)([%％])>/gi,_0xfffade=this[_0x1fd857(0x31c)]();for(const _0x387749 of _0xfffade){_0xab655d+=VisuMZ[_0x1fd857(0x285)][_0x1fd857(0x18d)](_0x4466d8,_0x387749,_0x588468);}return _0xab655d;},VisuMZ['ElementStatusCore'][_0x3d06b3(0x17c)]=Game_BattlerBase[_0x3d06b3(0x2c5)]['initMembers'],Game_BattlerBase[_0x3d06b3(0x2c5)][_0x3d06b3(0x254)]=function(){const _0x416576=_0x3d06b3;this['_cache']={},VisuMZ[_0x416576(0x285)][_0x416576(0x17c)][_0x416576(0x209)](this);},VisuMZ[_0x3d06b3(0x285)][_0x3d06b3(0x316)]=Game_BattlerBase[_0x3d06b3(0x2c5)][_0x3d06b3(0x1a7)],Game_BattlerBase[_0x3d06b3(0x2c5)]['refresh']=function(){const _0x4480ff=_0x3d06b3;this['_cache']={},this['_tp']=this[_0x4480ff(0x1db)][_0x4480ff(0x189)](0x0,this[_0x4480ff(0x369)]()),VisuMZ[_0x4480ff(0x285)][_0x4480ff(0x316)][_0x4480ff(0x209)](this);},Game_BattlerBase[_0x3d06b3(0x2c5)][_0x3d06b3(0x2f3)]=function(_0x15a5f8){const _0xc7fca9=_0x3d06b3;return this['_cache']=this[_0xc7fca9(0x3b6)]||{},this['_cache'][_0x15a5f8]!==undefined;},Game_BattlerBase[_0x3d06b3(0x2c5)][_0x3d06b3(0x38b)]=function(){const _0x5e1405=_0x3d06b3;this[_0x5e1405(0x296)]={};const _0x5e68f1=this['getTraitSetKeys']();for(const _0x464551 of _0x5e68f1){this[_0x5e1405(0x296)][_0x464551]='';}this[_0x5e1405(0x216)](),this[_0x5e1405(0x25f)]();},Game_BattlerBase[_0x3d06b3(0x2c5)][_0x3d06b3(0x216)]=function(){},Game_BattlerBase[_0x3d06b3(0x2c5)][_0x3d06b3(0x25f)]=function(){const _0xb5e772=_0x3d06b3,_0x543bca=this['getTraitSetObject']();DataManager[_0xb5e772(0x25c)](this[_0xb5e772(0x296)],_0x543bca);},Game_BattlerBase[_0x3d06b3(0x2c5)]['getTraitSetObject']=function(){return null;},Game_BattlerBase['prototype'][_0x3d06b3(0x240)]=function(){const _0x4afc15=_0x3d06b3;return[_0x4afc15(0x24f),_0x4afc15(0x2ce),_0x4afc15(0x1d6),_0x4afc15(0x30a),_0x4afc15(0x255),_0x4afc15(0x392),'Blessing','Curse',_0x4afc15(0x1aa),_0x4afc15(0x327)];},Game_BattlerBase['prototype'][_0x3d06b3(0x29f)]=function(_0x23d0c4){const _0x30dfcc=_0x3d06b3;if(this[_0x30dfcc(0x21d)](_0x23d0c4))return this[_0x30dfcc(0x396)](_0x23d0c4);return this[_0x30dfcc(0x1a4)](_0x23d0c4);},Game_BattlerBase[_0x3d06b3(0x2c5)][_0x3d06b3(0x1a4)]=function(_0x44294a){const _0x191137=_0x3d06b3;if(this[_0x191137(0x296)]===undefined)this['initElementStatusCore']();if(this[_0x191137(0x296)][_0x44294a]===undefined)this[_0x191137(0x38b)]();return this[_0x191137(0x296)][_0x44294a];},Game_BattlerBase[_0x3d06b3(0x2c5)][_0x3d06b3(0x16a)]=function(_0xe4ea75,_0x829585){const _0x2d7ac8=_0x3d06b3;if(this['_traitSets']===undefined)this[_0x2d7ac8(0x38b)]();if(this[_0x2d7ac8(0x296)][_0xe4ea75]===undefined)this[_0x2d7ac8(0x38b)]();this['_traitSets'][_0xe4ea75]=_0x829585,this[_0x2d7ac8(0x1a7)]();},Game_BattlerBase[_0x3d06b3(0x2c5)]['traitSet']=function(_0x5ec033){const _0xfc16b=_0x3d06b3,_0x2c36ee=this[_0xfc16b(0x29f)](_0x5ec033);return DataManager[_0xfc16b(0x1be)](_0x5ec033,_0x2c36ee);},Game_BattlerBase[_0x3d06b3(0x2c5)][_0x3d06b3(0x2fc)]=function(){const _0x19d1ef=_0x3d06b3;if($gameTemp['isPlaytest']()){console[_0x19d1ef(0x33f)](_0x19d1ef(0x1ed)[_0x19d1ef(0x2e2)](this[_0x19d1ef(0x1c0)]()));for(const _0x4f099c in this[_0x19d1ef(0x296)]){console[_0x19d1ef(0x33f)](_0x19d1ef(0x24d)['format'](_0x4f099c,this[_0x19d1ef(0x296)][_0x4f099c]));}console[_0x19d1ef(0x33f)](_0x19d1ef(0x2ca));}},Game_BattlerBase['prototype'][_0x3d06b3(0x3a0)]=function(_0x4b252c){const _0x251657=_0x3d06b3;this[_0x251657(0x296)][_0x4b252c]=DataManager[_0x251657(0x324)](_0x4b252c),!this[_0x251657(0x3ad)]&&this['refresh']();},VisuMZ[_0x3d06b3(0x285)][_0x3d06b3(0x1f9)]=Game_BattlerBase[_0x3d06b3(0x2c5)][_0x3d06b3(0x25b)],Game_BattlerBase['prototype'][_0x3d06b3(0x25b)]=function(_0x523aa4){const _0xb4c1a=_0x3d06b3;return VisuMZ[_0xb4c1a(0x285)][_0xb4c1a(0x1f9)]['call'](this,_0x523aa4)&&this[_0xb4c1a(0x394)](_0x523aa4);},Game_BattlerBase[_0x3d06b3(0x2c5)][_0x3d06b3(0x394)]=function(_0x3dcac0){const _0x43c86e=_0x3d06b3;if(!_0x3dcac0)return!![];if(_0x3dcac0[_0x43c86e(0x154)][_0x43c86e(0x25d)](/<EQUIP TRAIT (?:REQUIREMENT|REQUIREMENTS):[ ](.*)>/i)){const _0x5a39ba=this[_0x43c86e(0x240)](),_0x469994=String(RegExp['$1'])[_0x43c86e(0x20a)](',')[_0x43c86e(0x3a9)](_0x429bde=>_0x429bde[_0x43c86e(0x322)]()[_0x43c86e(0x2cd)]());for(const _0x3d20dc of _0x469994){if(_0x5a39ba[_0x43c86e(0x2ad)](_0x2162d4=>this[_0x43c86e(0x29f)](_0x2162d4)[_0x43c86e(0x322)]()[_0x43c86e(0x2cd)]()===_0x3d20dc))continue;return![];}}return!![];},Game_BattlerBase['prototype'][_0x3d06b3(0x221)]=function(_0x5ab5ce){const _0x4a4081=_0x3d06b3;_0x5ab5ce=_0x5ab5ce[_0x4a4081(0x322)]();const _0x422f22=this['getTraitSetKeys']();return _0x422f22[_0x4a4081(0x2ad)](_0x4357f4=>this['getTraitSet'](_0x4357f4)[_0x4a4081(0x322)]()[_0x4a4081(0x2cd)]()===_0x5ab5ce);},Game_BattlerBase[_0x3d06b3(0x2c5)][_0x3d06b3(0x248)]=function(){const _0x4b4798=_0x3d06b3;return this[_0x4b4798(0x2b8)]();},Game_Actor[_0x3d06b3(0x2c5)][_0x3d06b3(0x248)]=function(){const _0x453d39=_0x3d06b3,_0x157259=Game_Battler['prototype']['getReplaceTraitObjects'][_0x453d39(0x209)](this);return _0x157259[_0x453d39(0x229)](this[_0x453d39(0x337)]());},Game_BattlerBase[_0x3d06b3(0x2c5)][_0x3d06b3(0x396)]=function(_0x32381f){const _0xb6000f=_0x3d06b3;for(const _0x21ceb8 of this[_0xb6000f(0x248)]()){if(!_0x21ceb8)continue;const _0x4d38f1=DataManager[_0xb6000f(0x34f)](_0x21ceb8),_0x2f87bc=_0x32381f['toLowerCase']()[_0xb6000f(0x2cd)]();if(_0x4d38f1[_0x2f87bc]!=='NO\x20REPLACEMENT')return _0x4d38f1[_0x2f87bc];}return _0xb6000f(0x387);},Game_BattlerBase[_0x3d06b3(0x2c5)]['hasReplacedTraitSet']=function(_0x16276a){const _0x105d78=_0x3d06b3;return this[_0x105d78(0x396)](_0x16276a)!=='NO\x20REPLACEMENT';},Game_BattlerBase[_0x3d06b3(0x2c5)][_0x3d06b3(0x244)]=function(){const _0x2aba92=_0x3d06b3;if(this[_0x2aba92(0x31b)]()){if(!this[_0x2aba92(0x22b)]())return![];}const _0x231ac9=this[_0x2aba92(0x240)]();return _0x231ac9['some'](_0x2c7529=>this[_0x2aba92(0x21d)](_0x2c7529));},VisuMZ[_0x3d06b3(0x285)][_0x3d06b3(0x35b)]=Game_Battler[_0x3d06b3(0x2c5)][_0x3d06b3(0x30c)],Game_Battler[_0x3d06b3(0x2c5)][_0x3d06b3(0x30c)]=function(_0x52f749){const _0xb008b2=_0x3d06b3,_0x27584a=this[_0xb008b2(0x31b)]()&&$dataStates[_0x52f749]&&this[_0xb008b2(0x2b8)]()[_0xb008b2(0x1f2)]($dataStates[_0x52f749]);VisuMZ[_0xb008b2(0x285)][_0xb008b2(0x35b)][_0xb008b2(0x209)](this,_0x52f749),_0x27584a!==this[_0xb008b2(0x2b8)]()[_0xb008b2(0x1f2)]($dataStates[_0x52f749])&&$gameTroop['onChangeEnemyTraits']();},VisuMZ[_0x3d06b3(0x285)]['Game_Battler_removeState']=Game_Battler[_0x3d06b3(0x2c5)][_0x3d06b3(0x14e)],Game_Battler['prototype'][_0x3d06b3(0x14e)]=function(_0x521d63){const _0x532359=_0x3d06b3,_0x535980=this[_0x532359(0x31b)]()&&$dataStates[_0x521d63]&&this[_0x532359(0x2b8)]()['includes']($dataStates[_0x521d63]);VisuMZ[_0x532359(0x285)][_0x532359(0x276)][_0x532359(0x209)](this,_0x521d63),_0x535980!==this[_0x532359(0x2b8)]()[_0x532359(0x1f2)]($dataStates[_0x521d63])&&$gameTroop[_0x532359(0x14c)]();},VisuMZ[_0x3d06b3(0x285)][_0x3d06b3(0x1b1)]=Game_BattlerBase[_0x3d06b3(0x2c5)][_0x3d06b3(0x29a)],Game_BattlerBase[_0x3d06b3(0x2c5)][_0x3d06b3(0x29a)]=function(){const _0x5b92f9=_0x3d06b3,_0x3024f1=this[_0x5b92f9(0x31b)]()&&this[_0x5b92f9(0x244)]();VisuMZ[_0x5b92f9(0x285)][_0x5b92f9(0x1b1)][_0x5b92f9(0x209)](this),_0x3024f1&&$gameTroop[_0x5b92f9(0x14c)]();},VisuMZ[_0x3d06b3(0x285)]['Game_BattlerBase_recoverAll']=Game_BattlerBase[_0x3d06b3(0x2c5)][_0x3d06b3(0x399)],Game_BattlerBase[_0x3d06b3(0x2c5)][_0x3d06b3(0x399)]=function(){const _0x17e189=_0x3d06b3,_0x36f26a=this['isEnemy']()&&this[_0x17e189(0x244)]();VisuMZ['ElementStatusCore']['Game_BattlerBase_recoverAll'][_0x17e189(0x209)](this),_0x36f26a&&$gameTroop[_0x17e189(0x14c)]();},VisuMZ['ElementStatusCore'][_0x3d06b3(0x3b5)]=Game_BattlerBase[_0x3d06b3(0x2c5)][_0x3d06b3(0x291)],Game_BattlerBase[_0x3d06b3(0x2c5)][_0x3d06b3(0x291)]=function(_0x453b05){const _0x368040=_0x3d06b3;if(_0x453b05<=0x0)return 0x1;const _0x378840='Element-%1'[_0x368040(0x2e2)](_0x453b05);if(this[_0x368040(0x2f3)](_0x378840))return this['_cache'][_0x378840];const _0x1332be=this[_0x368040(0x2a5)](_0x453b05);return _0x1332be===![]?this['_cache'][_0x378840]=VisuMZ[_0x368040(0x285)][_0x368040(0x338)][_0x368040(0x20e)][_0x368040(0x32b)][_0x368040(0x209)](this,_0x453b05):this['_cache'][_0x378840]=_0x1332be,this['_cache'][_0x378840];},Game_BattlerBase[_0x3d06b3(0x2c5)][_0x3d06b3(0x2a5)]=function(_0x4c03b6){const _0x376fb4=_0x3d06b3,_0x2470d7=VisuMZ[_0x376fb4(0x285)][_0x376fb4(0x36b)];for(const _0x260d24 of this[_0x376fb4(0x31c)]()){if(!_0x260d24)continue;const _0x4c7d94=_0x260d24[_0x376fb4(0x154)];if(_0x4c7d94[_0x376fb4(0x25d)](_0x2470d7['EleForcePer'][_0x4c03b6]))return Number(RegExp['$1'])/0x64;else{if(_0x4c7d94[_0x376fb4(0x25d)](_0x2470d7[_0x376fb4(0x2af)][_0x4c03b6]))Number(RegExp['$1']);else{if(_0x4c7d94[_0x376fb4(0x25d)](_0x2470d7[_0x376fb4(0x1ca)][_0x4c03b6])){var _0x5e6202=String(RegExp['$1']);try{return eval(_0x5e6202);}catch(_0x1a9b30){if($gameTemp['isPlaytest']())console[_0x376fb4(0x33f)](_0x1a9b30);return![];}}}}}return![];},Game_BattlerBase['prototype'][_0x3d06b3(0x1dd)]=function(_0x374d52){const _0x479b7f=_0x3d06b3,_0x2d7191=VisuMZ[_0x479b7f(0x285)][_0x479b7f(0x36b)],_0x5ab651=(_0x31b7ca,_0x28e381)=>{const _0x4a8e9d=_0x479b7f;if(!_0x28e381)return _0x31b7ca;const _0x533aff=_0x28e381[_0x4a8e9d(0x154)];if(_0x533aff['match'](_0x2d7191['EleRecPlusPer'][_0x374d52])){var _0x13b9b0=Number(RegExp['$1'])/0x64;_0x31b7ca+=_0x13b9b0;}if(_0x533aff[_0x4a8e9d(0x25d)](_0x2d7191['EleRecPlusFlt'][_0x374d52])){var _0x13b9b0=Number(RegExp['$1']);_0x31b7ca+=_0x13b9b0;}if(_0x533aff['match'](_0x2d7191['EleRecPlusJS'][_0x374d52])){var _0x3dcb24=String(RegExp['$1']);try{_0x31b7ca+=eval(_0x3dcb24);}catch(_0x23bec7){if($gameTemp[_0x4a8e9d(0x384)]())console['log'](_0x23bec7);}}return _0x31b7ca;};return this[_0x479b7f(0x31c)]()[_0x479b7f(0x178)](_0x5ab651,0x0);},Game_BattlerBase[_0x3d06b3(0x2c5)]['getReceiveElementRate']=function(_0x1c282e){const _0x3eef7d=_0x3d06b3;let _0xa7cd55=VisuMZ[_0x3eef7d(0x285)][_0x3eef7d(0x3b5)][_0x3eef7d(0x209)](this,_0x1c282e);const _0x3e02fe=this[_0x3eef7d(0x240)](),_0x1ba34e=_0x3eef7d(0x300)[_0x3eef7d(0x2e2)](_0x1c282e);for(const _0x105b1d of _0x3e02fe){const _0x133fea=this['getTraitSet'](_0x105b1d),_0x3d63db=DataManager[_0x3eef7d(0x1be)](_0x105b1d,_0x133fea);_0xa7cd55*=_0x3d63db[_0x3eef7d(0x326)][_0x1ba34e]??0x1;}const _0x4bd3a4=VisuMZ[_0x3eef7d(0x285)][_0x3eef7d(0x36b)],_0x5bb817=(_0x24ef22,_0x198e42)=>{const _0x3fd5e8=_0x3eef7d;if(!_0x198e42)return _0x24ef22;const _0x43fe53=_0x198e42['note'];if(_0x43fe53[_0x3fd5e8(0x25d)](_0x4bd3a4[_0x3fd5e8(0x16e)][_0x1c282e])){var _0x2e360c=Number(RegExp['$1'])/0x64;_0x24ef22*=_0x2e360c;}if(_0x43fe53['match'](_0x4bd3a4['EleRecRateFlt'][_0x1c282e])){var _0x2e360c=Number(RegExp['$1']);_0x24ef22*=_0x2e360c;}if(_0x43fe53[_0x3fd5e8(0x25d)](_0x4bd3a4[_0x3fd5e8(0x344)][_0x1c282e])){var _0x374d40=String(RegExp['$1']);try{_0x24ef22*=eval(_0x374d40);}catch(_0x24175e){if($gameTemp['isPlaytest']())console['log'](_0x24175e);}}return _0x24ef22;};return this[_0x3eef7d(0x31c)]()[_0x3eef7d(0x178)](_0x5bb817,_0xa7cd55);},Game_BattlerBase[_0x3d06b3(0x2c5)][_0x3d06b3(0x1fd)]=function(_0x143eae){const _0x2fc789=_0x3d06b3,_0xc87eeb=VisuMZ[_0x2fc789(0x285)][_0x2fc789(0x36b)],_0x5e13f6=(_0x55eb66,_0x5877ce)=>{const _0xaeb552=_0x2fc789;if(!_0x5877ce)return _0x55eb66;const _0x24a34d=_0x5877ce[_0xaeb552(0x154)];if(_0x24a34d[_0xaeb552(0x25d)](_0xc87eeb['EleRecFlatPer'][_0x143eae])){var _0x205759=Number(RegExp['$1'])/0x64;_0x55eb66+=_0x205759;}if(_0x24a34d[_0xaeb552(0x25d)](_0xc87eeb[_0xaeb552(0x238)][_0x143eae])){var _0x205759=Number(RegExp['$1']);_0x55eb66+=_0x205759;}if(_0x24a34d[_0xaeb552(0x25d)](_0xc87eeb[_0xaeb552(0x20b)][_0x143eae])){var _0x2b87bc=String(RegExp['$1']);try{_0x55eb66+=eval(_0x2b87bc);}catch(_0x10670b){if($gameTemp[_0xaeb552(0x384)]())console[_0xaeb552(0x33f)](_0x10670b);}}return _0x55eb66;};return this['traitObjects']()[_0x2fc789(0x178)](_0x5e13f6,0x0);},Game_BattlerBase['prototype'][_0x3d06b3(0x2c9)]=function(_0x2205fa){const _0x4d19fa=_0x3d06b3,_0x22fa2c=VisuMZ[_0x4d19fa(0x285)][_0x4d19fa(0x36b)],_0x4a7eb7=(_0x338262,_0x52c161)=>{const _0x50a77b=_0x4d19fa;if(!_0x52c161)return _0x338262;const _0xffdeb1=_0x52c161[_0x50a77b(0x154)];if(_0xffdeb1['match'](_0x22fa2c[_0x50a77b(0x20c)][_0x2205fa])){var _0x59abf5=Number(RegExp['$1'])/0x64;_0x338262+=_0x59abf5;}if(_0xffdeb1['match'](_0x22fa2c['EleDmgPlusFlt'][_0x2205fa])){var _0x59abf5=Number(RegExp['$1']);_0x338262+=_0x59abf5;}if(_0xffdeb1[_0x50a77b(0x25d)](_0x22fa2c[_0x50a77b(0x1ff)][_0x2205fa])){var _0x3cf7cf=String(RegExp['$1']);try{_0x338262+=eval(_0x3cf7cf);}catch(_0x47e462){if($gameTemp['isPlaytest']())console['log'](_0x47e462);}}return _0x338262;};return this[_0x4d19fa(0x31c)]()[_0x4d19fa(0x178)](_0x4a7eb7,0x0);},Game_BattlerBase[_0x3d06b3(0x2c5)][_0x3d06b3(0x22f)]=function(_0x56b3b4){const _0x17ed8e=_0x3d06b3,_0xcca6ab=VisuMZ[_0x17ed8e(0x285)][_0x17ed8e(0x36b)],_0x25596e=(_0x4a441d,_0x4f6652)=>{const _0x44a15d=_0x17ed8e;if(!_0x4f6652)return _0x4a441d;const _0x4b1c0b=_0x4f6652['note'];if(_0x4b1c0b[_0x44a15d(0x25d)](_0xcca6ab[_0x44a15d(0x1f3)][_0x56b3b4])){var _0x437cd9=Number(RegExp['$1'])/0x64;_0x4a441d*=_0x437cd9;}if(_0x4b1c0b[_0x44a15d(0x25d)](_0xcca6ab[_0x44a15d(0x3a7)][_0x56b3b4])){var _0x437cd9=Number(RegExp['$1']);_0x4a441d*=_0x437cd9;}if(_0x4b1c0b[_0x44a15d(0x25d)](_0xcca6ab[_0x44a15d(0x181)][_0x56b3b4])){var _0x1d941d=String(RegExp['$1']);try{_0x4a441d*=eval(_0x1d941d);}catch(_0x48eaee){if($gameTemp['isPlaytest']())console['log'](_0x48eaee);}}return _0x4a441d;};return this[_0x17ed8e(0x31c)]()['reduce'](_0x25596e,0x1);},Game_BattlerBase['prototype'][_0x3d06b3(0x35a)]=function(_0x3f6ead){const _0x521eff=_0x3d06b3,_0x216204=VisuMZ[_0x521eff(0x285)][_0x521eff(0x36b)],_0x1c1e85=(_0x3f50f7,_0x1a662c)=>{const _0x4c4e4e=_0x521eff;if(!_0x1a662c)return _0x3f50f7;const _0x31e4e5=_0x1a662c[_0x4c4e4e(0x154)];if(_0x31e4e5[_0x4c4e4e(0x25d)](_0x216204[_0x4c4e4e(0x372)][_0x3f6ead])){var _0x52225b=Number(RegExp['$1'])/0x64;_0x3f50f7+=_0x52225b;}if(_0x31e4e5[_0x4c4e4e(0x25d)](_0x216204[_0x4c4e4e(0x1b2)][_0x3f6ead])){var _0x52225b=Number(RegExp['$1']);_0x3f50f7+=_0x52225b;}if(_0x31e4e5[_0x4c4e4e(0x25d)](_0x216204[_0x4c4e4e(0x166)][_0x3f6ead])){var _0x53c872=String(RegExp['$1']);try{_0x3f50f7+=eval(_0x53c872);}catch(_0x33d116){if($gameTemp[_0x4c4e4e(0x384)]())console[_0x4c4e4e(0x33f)](_0x33d116);}}return _0x3f50f7;};return this[_0x521eff(0x31c)]()[_0x521eff(0x178)](_0x1c1e85,0x0);},Game_BattlerBase[_0x3d06b3(0x2c5)][_0x3d06b3(0x2fe)]=function(){const _0x449bff=_0x3d06b3;let _0x176121=[];for(const _0x5a2f9c of this[_0x449bff(0x31c)]()){if(!_0x5a2f9c)continue;const _0x6237e7=_0x5a2f9c[_0x449bff(0x154)]['match'](/<ELEMENT ABSORB:[ ](.*)>/gi);if(_0x6237e7)for(const _0x4b583d of _0x6237e7){_0x4b583d[_0x449bff(0x25d)](/<ELEMENT ABSORB:[ ](.*)>/i);const _0x301664=RegExp['$1'];if(_0x301664[_0x449bff(0x25d)](/(\d+(?:\s*,\s*\d+)*)/i)){const _0x255fa0=JSON[_0x449bff(0x36d)]('['+RegExp['$1'][_0x449bff(0x25d)](/\d+/g)+']');_0x176121=_0x176121[_0x449bff(0x229)](_0x255fa0);}else{const _0xaf8a4d=_0x301664[_0x449bff(0x20a)](',');for(const _0x5a7864 of _0xaf8a4d){const _0xbeb97e=DataManager[_0x449bff(0x1c4)](_0x5a7864);if(_0xbeb97e)_0x176121[_0x449bff(0x2df)](_0xbeb97e);}}}}return _0x176121;},Game_BattlerBase[_0x3d06b3(0x2c5)][_0x3d06b3(0x286)]=function(){const _0x187e82=_0x3d06b3;let _0x2e538a=[];for(const _0x33a8b0 of this[_0x187e82(0x31c)]()){if(!_0x33a8b0)continue;const _0x2f1a6b=_0x33a8b0[_0x187e82(0x154)]['match'](/<ELEMENT REFLECT:[ ](.*)>/gi);if(_0x2f1a6b)for(const _0x279717 of _0x2f1a6b){_0x279717['match'](/<ELEMENT REFLECT:[ ](.*)>/i);const _0x25d4b3=RegExp['$1'];if(_0x25d4b3[_0x187e82(0x25d)](/(\d+(?:\s*,\s*\d+)*)/i)){const _0xb3f155=JSON['parse']('['+RegExp['$1'][_0x187e82(0x25d)](/\d+/g)+']');_0x2e538a=_0x2e538a['concat'](_0xb3f155);}else{const _0x3c3b67=_0x25d4b3[_0x187e82(0x20a)](',');for(const _0x1dce40 of _0x3c3b67){const _0x18f4ea=DataManager[_0x187e82(0x1c4)](_0x1dce40);if(_0x18f4ea)_0x2e538a[_0x187e82(0x2df)](_0x18f4ea);}}}}return _0x2e538a;},Game_BattlerBase[_0x3d06b3(0x2c5)][_0x3d06b3(0x31f)]=function(){const _0x213ec1=_0x3d06b3;let _0x2ae7a0=[];for(const _0x3b4a7d of this[_0x213ec1(0x31c)]()){if(!_0x3b4a7d)continue;const _0x3b5206=_0x3b4a7d[_0x213ec1(0x154)][_0x213ec1(0x25d)](/<ELEMENT PIERCE:[ ](.*)>/gi);if(_0x3b5206)for(const _0x17d829 of _0x3b5206){_0x17d829[_0x213ec1(0x25d)](/<ELEMENT PIERCE:[ ](.*)>/i);const _0x59dd36=RegExp['$1'];if(_0x59dd36['match'](/(\d+(?:\s*,\s*\d+)*)/i)){const _0x395702=JSON[_0x213ec1(0x36d)]('['+RegExp['$1'][_0x213ec1(0x25d)](/\d+/g)+']');_0x2ae7a0=_0x2ae7a0['concat'](_0x395702);}else{const _0x11af07=_0x59dd36[_0x213ec1(0x20a)](',');for(const _0x585b59 of _0x11af07){const _0x528a27=DataManager[_0x213ec1(0x1c4)](_0x585b59);if(_0x528a27)_0x2ae7a0[_0x213ec1(0x2df)](_0x528a27);}}}}return _0x2ae7a0;},Game_BattlerBase[_0x3d06b3(0x2c5)][_0x3d06b3(0x1b8)]=function(){const _0x378f52=_0x3d06b3;for(const _0x3cd2f9 of this[_0x378f52(0x31c)]()){if(!_0x3cd2f9)continue;if(_0x3cd2f9[_0x378f52(0x154)][_0x378f52(0x25d)](/<FORCE ACTION ELEMENT:[ ]NULL>/i))return!![];}return![];},Game_BattlerBase[_0x3d06b3(0x2c5)]['getForcedActionElement']=function(){const _0xcc8237=_0x3d06b3;for(const _0x572484 of this['traitObjects']()){if(!_0x572484)continue;if(_0x572484[_0xcc8237(0x154)][_0xcc8237(0x25d)](/<FORCE ACTION ELEMENT:[ ](.*)>/i)){const _0x5d59f4=RegExp['$1'];if(_0x5d59f4['match'](/(\d+(?:\s*,\s*\d+)*)/i))return JSON['parse']('['+RegExp['$1']['match'](/\d+/g)+']');else{const _0x57828f=_0x5d59f4[_0xcc8237(0x20a)](',');let _0x511fa3=[];for(const _0x51da36 of _0x57828f){const _0x2dbcf5=DataManager['getElementIdWithName'](_0x51da36);if(_0x2dbcf5)_0x511fa3[_0xcc8237(0x2df)](_0x2dbcf5);}return _0x511fa3;}}}return[];},VisuMZ[_0x3d06b3(0x285)][_0x3d06b3(0x2e1)]=Game_BattlerBase[_0x3d06b3(0x2c5)]['param'],Game_BattlerBase[_0x3d06b3(0x2c5)][_0x3d06b3(0x1e6)]=function(_0x10d978){const _0x2504c6=_0x3d06b3;let _0x495124=VisuMZ[_0x2504c6(0x285)]['Game_BattlerBase_param']['call'](this,_0x10d978);if(isNaN(_0x495124))return VisuMZ[_0x2504c6(0x285)][_0x2504c6(0x2e1)][_0x2504c6(0x209)](this,_0x10d978);return _0x495124;},VisuMZ[_0x3d06b3(0x285)]['Game_BattlerBase_paramRate']=Game_BattlerBase[_0x3d06b3(0x2c5)][_0x3d06b3(0x194)],Game_BattlerBase[_0x3d06b3(0x2c5)][_0x3d06b3(0x194)]=function(_0x36c5f1){const _0x229ced=_0x3d06b3;let _0x24d2cd=VisuMZ[_0x229ced(0x285)][_0x229ced(0x270)]['call'](this,_0x36c5f1);return this[_0x229ced(0x32c)](_0x36c5f1,_0x24d2cd);},Game_BattlerBase['prototype'][_0x3d06b3(0x32c)]=function(_0x72bb90,_0x207e7f){const _0x4b356a=_0x3d06b3;if(!DataManager[_0x4b356a(0x220)]())return _0x207e7f;const _0x5a4505=this['getTraitSetKeys'](),_0x578090=_0x4b356a(0x1cc)['format'](_0x72bb90);for(const _0x2cf674 of _0x5a4505){const _0x2cc247=this[_0x4b356a(0x29f)](_0x2cf674),_0x281c4a=DataManager[_0x4b356a(0x1be)](_0x2cf674,_0x2cc247);_0x207e7f*=_0x281c4a[_0x4b356a(0x22c)][_0x578090]??0x1;}return _0x207e7f;},VisuMZ[_0x3d06b3(0x285)][_0x3d06b3(0x242)]=Game_BattlerBase['prototype'][_0x3d06b3(0x287)],Game_BattlerBase[_0x3d06b3(0x2c5)][_0x3d06b3(0x287)]=function(_0x50fb29){const _0x188a8b=_0x3d06b3;let _0x33ed30=VisuMZ[_0x188a8b(0x285)][_0x188a8b(0x242)][_0x188a8b(0x209)](this,_0x50fb29);if(Imported[_0x188a8b(0x180)])return _0x33ed30;return this[_0x188a8b(0x16d)](_0x50fb29,_0x33ed30);},Game_BattlerBase[_0x3d06b3(0x2c5)][_0x3d06b3(0x16d)]=function(_0x3e82e6,_0x4d6800){const _0x2b098c=_0x3d06b3;if(!DataManager[_0x2b098c(0x220)]())return _0x4d6800;const _0xde3e1c=this[_0x2b098c(0x240)](),_0x296fc1='XParam%1'[_0x2b098c(0x2e2)](_0x3e82e6);for(const _0x3cd0e5 of _0xde3e1c){const _0x325294=this[_0x2b098c(0x29f)](_0x3cd0e5),_0x3b20c3=DataManager[_0x2b098c(0x1be)](_0x3cd0e5,_0x325294);_0x4d6800+=_0x3b20c3[_0x2b098c(0x15d)][_0x296fc1]||0x0;}return _0x4d6800;},VisuMZ['ElementStatusCore'][_0x3d06b3(0x2db)]=Game_BattlerBase[_0x3d06b3(0x2c5)][_0x3d06b3(0x27c)],Game_BattlerBase['prototype']['sparam']=function(_0xf6ee4b){const _0x3c6257=_0x3d06b3;let _0x434c07=VisuMZ[_0x3c6257(0x285)][_0x3c6257(0x2db)]['call'](this,_0xf6ee4b);if(Imported[_0x3c6257(0x180)])return _0x434c07;return this['sparamRateTraitSets'](_0xf6ee4b,_0x434c07);},Game_BattlerBase[_0x3d06b3(0x2c5)][_0x3d06b3(0x2a4)]=function(_0x24f5bd,_0x48852f){const _0x3d9aee=_0x3d06b3;if(!DataManager[_0x3d9aee(0x220)]())return _0x48852f;const _0x164d55=this['getTraitSetKeys'](),_0x227d5b='SParam%1'['format'](_0x24f5bd);for(const _0x1f28cc of _0x164d55){const _0x33c4ec=this[_0x3d9aee(0x29f)](_0x1f28cc),_0x4f60c9=DataManager[_0x3d9aee(0x1be)](_0x1f28cc,_0x33c4ec);_0x48852f*=_0x4f60c9[_0x3d9aee(0x1e1)][_0x227d5b]??0x1;}return _0x48852f;};Imported[_0x3d06b3(0x180)]&&(VisuMZ['ElementStatusCore'][_0x3d06b3(0x274)]=Game_BattlerBase[_0x3d06b3(0x2c5)][_0x3d06b3(0x223)],Game_BattlerBase[_0x3d06b3(0x2c5)][_0x3d06b3(0x223)]=function(_0x481d17){const _0x244d91=_0x3d06b3;let _0x4f4548=VisuMZ[_0x244d91(0x285)][_0x244d91(0x274)]['call'](this,_0x481d17);return _0x4f4548=this[_0x244d91(0x16d)](_0x481d17,_0x4f4548),_0x4f4548;},VisuMZ[_0x3d06b3(0x285)][_0x3d06b3(0x1dc)]=Game_BattlerBase['prototype'][_0x3d06b3(0x279)],Game_BattlerBase[_0x3d06b3(0x2c5)][_0x3d06b3(0x279)]=function(_0x4f6719){const _0x5dad6d=_0x3d06b3;let _0x4a9e56=VisuMZ[_0x5dad6d(0x285)]['Game_BattlerBase_sparamRate'][_0x5dad6d(0x209)](this,_0x4f6719);return _0x4a9e56=this['sparamRateTraitSets'](_0x4f6719,_0x4a9e56),_0x4a9e56;});;Game_BattlerBase['prototype'][_0x3d06b3(0x293)]=function(_0x3ae4e1){const _0x33d09c=_0x3d06b3,_0x2a7877=_0x33d09c(0x368);if(this[_0x33d09c(0x2f3)](_0x2a7877))return this[_0x33d09c(0x3b6)][_0x2a7877][_0x33d09c(0x1f2)](_0x3ae4e1);const _0x244f45=this[_0x33d09c(0x308)](Game_BattlerBase[_0x33d09c(0x3c0)]),_0x6d16aa=this[_0x33d09c(0x24c)]();return this[_0x33d09c(0x3b6)][_0x2a7877]=_0x244f45['concat'](_0x6d16aa),this[_0x33d09c(0x3b6)][_0x2a7877]['includes'](_0x3ae4e1);},Game_BattlerBase[_0x3d06b3(0x2c5)][_0x3d06b3(0x24c)]=function(){const _0x2a272d=_0x3d06b3;if(!DataManager[_0x2a272d(0x220)]())return[];let _0x6c3d3e=[];const _0x554397=this[_0x2a272d(0x240)]();for(const _0x2c7094 of _0x554397){const _0x3027fe=this[_0x2a272d(0x29f)](_0x2c7094),_0x4ab4e6=DataManager[_0x2a272d(0x1be)](_0x2c7094,_0x3027fe);_0x6c3d3e=_0x6c3d3e[_0x2a272d(0x229)](_0x4ab4e6[_0x2a272d(0x227)]);}return _0x6c3d3e;},Game_BattlerBase[_0x3d06b3(0x2c5)]['isEquipAtypeOk']=function(_0x58be65){const _0x2c64c8=_0x3d06b3,_0x1b6201=_0x2c64c8(0x27a);if(this[_0x2c64c8(0x2f3)](_0x1b6201))return this[_0x2c64c8(0x3b6)][_0x1b6201][_0x2c64c8(0x1f2)](_0x58be65);const _0x2900bc=this[_0x2c64c8(0x308)](Game_BattlerBase[_0x2c64c8(0x208)]),_0x2f529c=this[_0x2c64c8(0x2c7)]();return this[_0x2c64c8(0x3b6)][_0x1b6201]=_0x2900bc[_0x2c64c8(0x229)](_0x2f529c),this[_0x2c64c8(0x3b6)][_0x1b6201][_0x2c64c8(0x1f2)](_0x58be65);},Game_BattlerBase[_0x3d06b3(0x2c5)]['atypeOkTraitSets']=function(){const _0x4cd8d6=_0x3d06b3;if(!DataManager[_0x4cd8d6(0x220)]())return[];let _0x2bcefd=[];const _0x13797f=this[_0x4cd8d6(0x240)]();for(const _0x280002 of _0x13797f){const _0x1bb09d=this[_0x4cd8d6(0x29f)](_0x280002),_0xc9eea4=DataManager[_0x4cd8d6(0x1be)](_0x280002,_0x1bb09d);_0x2bcefd=_0x2bcefd[_0x4cd8d6(0x229)](_0xc9eea4[_0x4cd8d6(0x282)]);}return _0x2bcefd;},Game_BattlerBase[_0x3d06b3(0x2c5)][_0x3d06b3(0x2fa)]=function(){const _0x20b8b3=_0x3d06b3;if(!DataManager[_0x20b8b3(0x220)]())return[];this[_0x20b8b3(0x3ad)]=!![],this[_0x20b8b3(0x3b6)][_0x20b8b3(0x2f0)]=this[_0x20b8b3(0x3b6)][_0x20b8b3(0x2f0)]||[];const _0x705086=this[_0x20b8b3(0x240)]();for(const _0x3d8ba0 of _0x705086){const _0x45dd88=this['getTraitSet'](_0x3d8ba0),_0x28c460=DataManager[_0x20b8b3(0x1be)](_0x3d8ba0,_0x45dd88);this[_0x20b8b3(0x3b6)][_0x20b8b3(0x2f0)]=this['_cache']['passiveStates'][_0x20b8b3(0x229)](_0x28c460[_0x20b8b3(0x2fb)]);}this[_0x20b8b3(0x3ad)]=undefined;},Game_Actor[_0x3d06b3(0x2c5)][_0x3d06b3(0x328)]=function(){const _0x2acede=_0x3d06b3;return this[_0x2acede(0x201)]();},VisuMZ[_0x3d06b3(0x285)][_0x3d06b3(0x26d)]=Game_Actor[_0x3d06b3(0x2c5)]['setup'],Game_Actor[_0x3d06b3(0x2c5)][_0x3d06b3(0x2b7)]=function(_0x434052){const _0x4dc7ac=_0x3d06b3;VisuMZ[_0x4dc7ac(0x285)][_0x4dc7ac(0x26d)][_0x4dc7ac(0x209)](this,_0x434052),this[_0x4dc7ac(0x38b)](),this[_0x4dc7ac(0x399)]();},Game_Actor['prototype']['initElementStatusCore']=function(){const _0x15f6e3=_0x3d06b3;Game_Battler[_0x15f6e3(0x2c5)][_0x15f6e3(0x38b)][_0x15f6e3(0x209)](this),this[_0x15f6e3(0x1ec)]();},Game_Actor[_0x3d06b3(0x2c5)][_0x3d06b3(0x216)]=function(){const _0x128b4c=_0x3d06b3;if(this[_0x128b4c(0x201)]()[_0x128b4c(0x154)][_0x128b4c(0x25d)](/<NO RANDOM TRAIT SETS>/i))return;const _0x194185=this[_0x128b4c(0x240)](),_0x243f41=VisuMZ[_0x128b4c(0x285)][_0x128b4c(0x338)];for(const _0x4f75a2 of _0x194185){_0x243f41[_0x128b4c(0x2e5)]&&this[_0x128b4c(0x3a0)](_0x4f75a2);}},Game_Actor[_0x3d06b3(0x2c5)][_0x3d06b3(0x1ec)]=function(){const _0x327969=_0x3d06b3;this[_0x327969(0x33e)]=this[_0x327969(0x3a6)](),this[_0x327969(0x201)]()[_0x327969(0x154)]['match'](/<BIOGRAPHY>\s*([\s\S]*)\s*<\/BIOGRAPHY>/i)&&this['setBiography'](RegExp['$1']);},Game_Actor[_0x3d06b3(0x2c5)][_0x3d06b3(0x3bb)]=function(){const _0x3158eb=_0x3d06b3;if(this[_0x3158eb(0x33e)]===undefined)this['initBiography']();return this['_biography'];},Game_Actor['prototype'][_0x3d06b3(0x2ba)]=function(_0x243cc5){const _0xf43f0=_0x3d06b3;if(this[_0xf43f0(0x33e)]===undefined)this['initBiography']();this[_0xf43f0(0x33e)]=_0x243cc5;},Game_Actor[_0x3d06b3(0x2c5)][_0x3d06b3(0x390)]=function(){const _0x2f0bd2=_0x3d06b3,_0x56746c=this[_0x2f0bd2(0x308)](Game_BattlerBase[_0x2f0bd2(0x3c0)])['sort']((_0x998092,_0x26690d)=>_0x998092-_0x26690d);return _0x56746c[_0x2f0bd2(0x1c5)]((_0x52a71a,_0x3ff787,_0x5b272b)=>_0x5b272b['indexOf'](_0x52a71a)===_0x3ff787);},Game_Actor[_0x3d06b3(0x2c5)]['armorTypes']=function(){const _0x5466a1=_0x3d06b3,_0x1ae2f8=this[_0x5466a1(0x308)](Game_BattlerBase['TRAIT_EQUIP_ATYPE'])['sort']((_0x1803eb,_0x40aa45)=>_0x1803eb-_0x40aa45);return _0x1ae2f8[_0x5466a1(0x1c5)]((_0x310002,_0x345e25,_0x33eeb0)=>_0x33eeb0[_0x5466a1(0x24a)](_0x310002)===_0x345e25);},Game_Enemy[_0x3d06b3(0x2c5)][_0x3d06b3(0x328)]=function(){const _0x4c37a8=_0x3d06b3;return this[_0x4c37a8(0x22b)]();},VisuMZ[_0x3d06b3(0x285)]['Game_Enemy_setup']=Game_Enemy['prototype'][_0x3d06b3(0x2b7)],Game_Enemy[_0x3d06b3(0x2c5)][_0x3d06b3(0x2b7)]=function(_0x43ae78,_0x32e7c7,_0x3e65e7){const _0x1d589f=_0x3d06b3;VisuMZ[_0x1d589f(0x285)][_0x1d589f(0x1a9)][_0x1d589f(0x209)](this,_0x43ae78,_0x32e7c7,_0x3e65e7),!Imported[_0x1d589f(0x1f0)]&&this[_0x1d589f(0x38b)](),this['refresh'](),this[_0x1d589f(0x399)]();},Game_Enemy[_0x3d06b3(0x2c5)][_0x3d06b3(0x38b)]=function(){const _0x62bea7=_0x3d06b3;Game_Battler[_0x62bea7(0x2c5)]['initElementStatusCore']['call'](this),this[_0x62bea7(0x3bc)]();},Game_Enemy['prototype'][_0x3d06b3(0x216)]=function(){const _0x4d8076=_0x3d06b3;if(this['enemy']()['note'][_0x4d8076(0x25d)](/<NO RANDOM TRAIT SETS>/i))return;const _0x1fb523=this[_0x4d8076(0x240)](),_0x346da6=VisuMZ['ElementStatusCore'][_0x4d8076(0x338)];for(const _0x5cb45f of _0x1fb523){_0x346da6[_0x5cb45f]['RandomizeEnemy']&&this['createRandomTraitSet'](_0x5cb45f);}},VisuMZ[_0x3d06b3(0x285)]['Game_Enemy_name']=Game_Enemy[_0x3d06b3(0x2c5)][_0x3d06b3(0x1c0)],Game_Enemy[_0x3d06b3(0x2c5)][_0x3d06b3(0x1c0)]=function(){const _0x9b0443=_0x3d06b3;return DataManager[_0x9b0443(0x220)]()?this[_0x9b0443(0x2b3)]():VisuMZ[_0x9b0443(0x285)]['Game_Enemy_name'][_0x9b0443(0x209)](this);},Game_Enemy[_0x3d06b3(0x2c5)]['nameElementStatusCore']=function(){const _0x2f2864=_0x3d06b3,_0x1b3cc7=_0x2f2864(0x1c0);if(this['checkCacheKey'](_0x1b3cc7))return this['_cache'][_0x1b3cc7];const _0x2eaab3=this['nameFormat']();return _0x2eaab3[_0x2f2864(0x2e2)](this[_0x2f2864(0x1be)](_0x2f2864(0x24f))[_0x2f2864(0x1b6)]||'',this['traitSet'](_0x2f2864(0x2ce))[_0x2f2864(0x1b6)]||'',this['traitSet'](_0x2f2864(0x1d6))['FmtText']||'',this[_0x2f2864(0x1be)](_0x2f2864(0x30a))[_0x2f2864(0x1b6)]||'',this[_0x2f2864(0x1be)]('Nature')[_0x2f2864(0x1b6)]||'',this[_0x2f2864(0x1be)]('Alignment')['FmtText']||'',this[_0x2f2864(0x1be)](_0x2f2864(0x18e))['FmtText']||'',this[_0x2f2864(0x1be)](_0x2f2864(0x331))['FmtText']||'',this[_0x2f2864(0x1be)](_0x2f2864(0x1aa))[_0x2f2864(0x1b6)]||'',this['traitSet'](_0x2f2864(0x327))[_0x2f2864(0x1b6)]||'',this[_0x2f2864(0x350)](),this[_0x2f2864(0x303)]?this[_0x2f2864(0x2b9)]:'')[_0x2f2864(0x196)](/[\s\n\r]+/g,'\x20')['trim']();},Game_Enemy['prototype']['nameFormat']=function(){const _0x52892a=_0x3d06b3;let _0x34a447=VisuMZ[_0x52892a(0x285)][_0x52892a(0x338)][_0x52892a(0x2ac)][_0x52892a(0x185)];return this['enemy']()[_0x52892a(0x154)][_0x52892a(0x25d)](/<TRAIT SET NAME FORMAT>\s*([\s\S]*)\s*<\/TRAIT SET NAME FORMAT>/i)&&(_0x34a447=String(RegExp['$1'])),_0x34a447=_0x34a447[_0x52892a(0x196)](/\[ELEMENT\]/gi,'%1'),_0x34a447=_0x34a447['replace'](/\[SUBELEMENT\]/gi,'%2'),_0x34a447=_0x34a447[_0x52892a(0x196)](/\[GENDER\]/gi,'%3'),_0x34a447=_0x34a447['replace'](/\[RACE\]/gi,'%4'),_0x34a447=_0x34a447[_0x52892a(0x196)](/\[NATURE\]/gi,'%5'),_0x34a447=_0x34a447[_0x52892a(0x196)](/\[ALIGNMENT\]/gi,'%6'),_0x34a447=_0x34a447[_0x52892a(0x196)](/\[BLESSING\]/gi,'%7'),_0x34a447=_0x34a447[_0x52892a(0x196)](/\[CURSE\]/gi,'%8'),_0x34a447=_0x34a447[_0x52892a(0x196)](/\[ZODIAC\]/gi,'%9'),_0x34a447=_0x34a447[_0x52892a(0x196)](/\[VARIANT\]/gi,'%10'),_0x34a447=_0x34a447['replace'](/\[NAME\]/gi,_0x52892a(0x341)),_0x34a447=_0x34a447[_0x52892a(0x196)](/\[LETTER\]/gi,_0x52892a(0x19e)),_0x34a447;},VisuMZ[_0x3d06b3(0x285)][_0x3d06b3(0x204)]=Game_Enemy[_0x3d06b3(0x2c5)][_0x3d06b3(0x237)],Game_Enemy[_0x3d06b3(0x2c5)][_0x3d06b3(0x237)]=function(_0x3020ab){const _0x1f00cb=_0x3d06b3;this[_0x1f00cb(0x3b6)]={},VisuMZ[_0x1f00cb(0x285)][_0x1f00cb(0x204)][_0x1f00cb(0x209)](this,_0x3020ab);},VisuMZ[_0x3d06b3(0x285)][_0x3d06b3(0x339)]=Game_Enemy[_0x3d06b3(0x2c5)][_0x3d06b3(0x2cf)],Game_Enemy['prototype']['setPlural']=function(_0x52d930){const _0x56c31a=_0x3d06b3;this[_0x56c31a(0x3b6)]={},VisuMZ[_0x56c31a(0x285)][_0x56c31a(0x339)][_0x56c31a(0x209)](this,_0x52d930);},VisuMZ[_0x3d06b3(0x285)]['Game_Enemy_exp']=Game_Enemy[_0x3d06b3(0x2c5)][_0x3d06b3(0x336)],Game_Enemy[_0x3d06b3(0x2c5)]['exp']=function(){const _0x3353a9=_0x3d06b3;let _0x17bfb8=VisuMZ['ElementStatusCore']['Game_Enemy_exp'][_0x3353a9(0x209)](this);return this[_0x3353a9(0x32e)](_0x17bfb8);},VisuMZ[_0x3d06b3(0x285)][_0x3d06b3(0x398)]=Game_Enemy[_0x3d06b3(0x2c5)][_0x3d06b3(0x24b)],Game_Enemy['prototype'][_0x3d06b3(0x24b)]=function(){const _0x40b984=_0x3d06b3;let _0x3a085d=VisuMZ[_0x40b984(0x285)][_0x40b984(0x398)][_0x40b984(0x209)](this);return this['goldTraitSets'](_0x3a085d);},VisuMZ[_0x3d06b3(0x285)][_0x3d06b3(0x361)]=Game_Enemy['prototype'][_0x3d06b3(0x318)],Game_Enemy[_0x3d06b3(0x2c5)][_0x3d06b3(0x318)]=function(){const _0x24e691=_0x3d06b3;let _0x8d99e4=VisuMZ[_0x24e691(0x285)][_0x24e691(0x361)][_0x24e691(0x209)](this);return this[_0x24e691(0x192)](_0x8d99e4);},Game_Enemy[_0x3d06b3(0x2c5)][_0x3d06b3(0x32e)]=function(_0x1b74c7){const _0x527541=_0x3d06b3;if(!DataManager[_0x527541(0x220)]())return _0x1b74c7;const _0x39b993=this[_0x527541(0x240)]();for(const _0x864f1f of _0x39b993){const _0x10c5f8=this['getTraitSet'](_0x864f1f),_0x2f1b91=DataManager['traitSet'](_0x864f1f,_0x10c5f8);_0x1b74c7*=_0x2f1b91[_0x527541(0x23a)]!==undefined?_0x2f1b91[_0x527541(0x23a)]:0x1;}return Math['round'](_0x1b74c7);},Game_Enemy['prototype']['goldTraitSets']=function(_0x3e90c6){const _0x348bd5=_0x3d06b3;if(!DataManager[_0x348bd5(0x220)]())return _0x3e90c6;const _0x4fb7b0=this['getTraitSetKeys']();for(const _0x39519 of _0x4fb7b0){const _0x166bbb=this[_0x348bd5(0x29f)](_0x39519),_0x2f3e2a=DataManager[_0x348bd5(0x1be)](_0x39519,_0x166bbb);_0x3e90c6*=_0x2f3e2a['GoldRate']!==undefined?_0x2f3e2a[_0x348bd5(0x357)]:0x1;}return Math[_0x348bd5(0x362)](_0x3e90c6);},Game_Enemy[_0x3d06b3(0x2c5)][_0x3d06b3(0x192)]=function(_0x11a38a){const _0x4acb9e=_0x3d06b3;if(!DataManager['traitSetsEnabled']())return _0x11a38a;const _0x198180=this['getTraitSetKeys']();for(const _0x465d36 of _0x198180){const _0x410363=this['getTraitSet'](_0x465d36),_0x1f98ae=DataManager['traitSet'](_0x465d36,_0x410363);_0x11a38a*=_0x1f98ae[_0x4acb9e(0x347)]!==undefined?_0x1f98ae['DropRate']:0x1;}return _0x11a38a;},Game_Enemy[_0x3d06b3(0x2c5)]['createSpecialBattlers']=function(){const _0x28088e=_0x3d06b3;this['_specialBattler']={'name':this['enemy']()[_0x28088e(0x3b1)],'hue':this[_0x28088e(0x22b)]()[_0x28088e(0x1d4)]};const _0x45b63d=this['enemy']()['note'],_0x165cf8=this[_0x28088e(0x240)]();for(const _0x4e616f of _0x165cf8){const _0x114f1c=this[_0x28088e(0x1be)](_0x4e616f)[_0x28088e(0x20d)][_0x28088e(0x322)]()['trim'](),_0x310c62=_0x4e616f[_0x28088e(0x322)]()[_0x28088e(0x2cd)]();if(_0x45b63d[_0x28088e(0x25d)](VisuMZ['ElementStatusCore'][_0x28088e(0x36b)]['BattlerNameSolo-%1-%2'[_0x28088e(0x2e2)](_0x310c62,_0x114f1c)]))this['_specialBattler']['name']=String(RegExp['$1']);else{if(_0x45b63d['match'](VisuMZ[_0x28088e(0x285)][_0x28088e(0x36b)][_0x28088e(0x198)[_0x28088e(0x2e2)](_0x310c62,_0x114f1c)])){const _0x5cb302=String(RegExp['$1'])['split'](/[\r\n]+/)[_0x28088e(0x265)]('');this[_0x28088e(0x3b7)][_0x28088e(0x1c0)]=DataManager[_0x28088e(0x2c3)](_0x5cb302);}}if(_0x45b63d[_0x28088e(0x25d)](VisuMZ[_0x28088e(0x285)]['RegExp'][_0x28088e(0x3a2)[_0x28088e(0x2e2)](_0x310c62,_0x114f1c)]))this[_0x28088e(0x3b7)][_0x28088e(0x179)]=Number(RegExp['$1'])[_0x28088e(0x189)](0x0,0x168);else{if(_0x45b63d[_0x28088e(0x25d)](VisuMZ['ElementStatusCore'][_0x28088e(0x36b)][_0x28088e(0x250)[_0x28088e(0x2e2)](_0x310c62,_0x114f1c)])){const _0x27444e=String(RegExp['$1'])['split'](/[\r\n]+/)[_0x28088e(0x265)]('');this[_0x28088e(0x3b7)]['hue']=Number(DataManager[_0x28088e(0x2c3)](_0x27444e))[_0x28088e(0x189)](0x0,0x168);}}}},Game_Enemy[_0x3d06b3(0x2c5)][_0x3d06b3(0x253)]=function(){const _0x4bf8d3=_0x3d06b3;this['createSpecialBattlers']();if(!Imported[_0x4bf8d3(0x1f0)])return;this[_0x4bf8d3(0x247)]=this[_0x4bf8d3(0x247)]||{'name':'','wtypeId':settings[_0x4bf8d3(0x353)],'collapse':settings[_0x4bf8d3(0x2d7)],'motionIdle':settings['MotionIdle'],'width':settings['Width']||0x40,'height':settings[_0x4bf8d3(0x315)]||0x40,'anchorX':settings[_0x4bf8d3(0x290)]||0x0,'anchorY':settings['AnchorY']||0x0,'shadow':settings[_0x4bf8d3(0x35e)]};const _0x54c6b0=this[_0x4bf8d3(0x247)],_0x571e45=this[_0x4bf8d3(0x22b)]()['note'],_0x2cc0ce=this['getTraitSetKeys']();for(const _0x428092 of _0x2cc0ce){const _0x110f72=this[_0x4bf8d3(0x1be)](_0x428092)[_0x4bf8d3(0x20d)]['toUpperCase']()['trim'](),_0x538583=_0x428092[_0x4bf8d3(0x322)]()[_0x4bf8d3(0x2cd)]();if(_0x571e45[_0x4bf8d3(0x25d)](VisuMZ[_0x4bf8d3(0x285)]['RegExp'][_0x4bf8d3(0x21c)[_0x4bf8d3(0x2e2)](_0x538583,_0x110f72)]))_0x54c6b0[_0x4bf8d3(0x1c0)]=String(RegExp['$1']);else{if(_0x571e45[_0x4bf8d3(0x25d)](VisuMZ['ElementStatusCore'][_0x4bf8d3(0x36b)][_0x4bf8d3(0x1a1)[_0x4bf8d3(0x2e2)](_0x538583,_0x110f72)])){const _0x5bba50=String(RegExp['$1'])[_0x4bf8d3(0x20a)](/[\r\n]+/)[_0x4bf8d3(0x265)]('');_0x54c6b0['name']=DataManager[_0x4bf8d3(0x2c3)](_0x5bba50),console[_0x4bf8d3(0x33f)](_0x54c6b0['name']);}}if(_0x571e45[_0x4bf8d3(0x25d)](VisuMZ[_0x4bf8d3(0x285)][_0x4bf8d3(0x36b)][_0x4bf8d3(0x38a)['format'](_0x538583,_0x110f72)]))_0x54c6b0['wtypeId']=DataManager[_0x4bf8d3(0x29c)](RegExp['$1']);else{if(_0x571e45[_0x4bf8d3(0x25d)](VisuMZ[_0x4bf8d3(0x285)]['RegExp']['SvWeaponMass-%1-%2'[_0x4bf8d3(0x2e2)](_0x538583,_0x110f72)])){const _0x2171ca=String(RegExp['$1'])[_0x4bf8d3(0x20a)](/[\r\n]+/)[_0x4bf8d3(0x265)](''),_0x4829a4=DataManager[_0x4bf8d3(0x2c3)](_0x2171ca);_0x54c6b0['wtypeId']=DataManager[_0x4bf8d3(0x29c)](_0x4829a4);}}if(_0x571e45['match'](VisuMZ[_0x4bf8d3(0x285)][_0x4bf8d3(0x36b)][_0x4bf8d3(0x330)[_0x4bf8d3(0x2e2)](_0x538583,_0x110f72)]))_0x54c6b0[_0x4bf8d3(0x355)]=String(RegExp['$1'])['toLowerCase']()['trim']();else{if(_0x571e45[_0x4bf8d3(0x25d)](VisuMZ[_0x4bf8d3(0x285)][_0x4bf8d3(0x36b)][_0x4bf8d3(0x20f)[_0x4bf8d3(0x2e2)](_0x538583,_0x110f72)])){const _0x199b38=String(RegExp['$1'])[_0x4bf8d3(0x20a)](/[\r\n]+/)[_0x4bf8d3(0x265)]('');_0x54c6b0[_0x4bf8d3(0x355)]=DataManager['processRandomizedData'](_0x199b38);}}}},Game_Enemy[_0x3d06b3(0x2c5)][_0x3d06b3(0x3b1)]=function(){const _0xe9dc3d=_0x3d06b3;if(!this[_0xe9dc3d(0x3b7)])this['createSpecialBattlers']();return this['_specialBattler'][_0xe9dc3d(0x1c0)];},Game_Enemy[_0x3d06b3(0x2c5)]['battlerHue']=function(){const _0x5dafbf=_0x3d06b3;if(!this[_0x5dafbf(0x3b7)])this[_0x5dafbf(0x3bc)]();return this['_specialBattler']['hue'];},VisuMZ[_0x3d06b3(0x285)][_0x3d06b3(0x388)]=Game_Enemy['prototype'][_0x3d06b3(0x3a4)],Game_Enemy[_0x3d06b3(0x2c5)][_0x3d06b3(0x3a4)]=function(_0x54bf88){const _0x5b5b43=_0x3d06b3;VisuMZ[_0x5b5b43(0x285)][_0x5b5b43(0x388)][_0x5b5b43(0x209)](this,_0x54bf88),this[_0x5b5b43(0x38b)](),this['createSpecialBattlers'](),this[_0x5b5b43(0x1a7)]();},Game_Troop[_0x3d06b3(0x2c5)][_0x3d06b3(0x14c)]=function(){const _0x11ea73=_0x3d06b3;for(const _0x5c99ca of this[_0x11ea73(0x16f)]()){_0x5c99ca&&(_0x5c99ca['_letter']='',_0x5c99ca[_0x11ea73(0x303)]=![],_0x5c99ca[_0x11ea73(0x253)]());}this[_0x11ea73(0x1e5)]={},this[_0x11ea73(0x319)]();},Scene_Status['prototype'][_0x3d06b3(0x1d9)]=function(){const _0x169b73=_0x3d06b3;if(ConfigManager[_0x169b73(0x1bb)]&&ConfigManager[_0x169b73(0x1fa)]!==undefined)return ConfigManager[_0x169b73(0x1fa)];else{if(this['isUseElementStatusCoreUpdatedLayout']())return this[_0x169b73(0x376)]()[_0x169b73(0x25d)](/LOWER/i);else Scene_MenuBase[_0x169b73(0x2c5)][_0x169b73(0x197)][_0x169b73(0x209)](this);}},Scene_Status['prototype'][_0x3d06b3(0x376)]=function(){const _0x1f0a1b=_0x3d06b3;return VisuMZ[_0x1f0a1b(0x285)]['Settings'][_0x1f0a1b(0x246)][_0x1f0a1b(0x27d)];},Scene_Status[_0x3d06b3(0x2c5)][_0x3d06b3(0x352)]=function(){const _0x1fd0c7=_0x3d06b3;return VisuMZ[_0x1fd0c7(0x285)]['Settings'][_0x1fd0c7(0x246)][_0x1fd0c7(0x280)];},VisuMZ[_0x3d06b3(0x285)][_0x3d06b3(0x150)]=Scene_Status[_0x3d06b3(0x2c5)]['create'],Scene_Status[_0x3d06b3(0x2c5)][_0x3d06b3(0x22e)]=function(){const _0xfd48d8=_0x3d06b3;this[_0xfd48d8(0x352)]()?(this[_0xfd48d8(0x2a6)](),this['updateElementStatusCoreWindowBg']()):VisuMZ['ElementStatusCore'][_0xfd48d8(0x150)]['call'](this);},Scene_Status[_0x3d06b3(0x2c5)][_0x3d06b3(0x2a6)]=function(){const _0x50a6c9=_0x3d06b3;Scene_MenuBase[_0x50a6c9(0x2c5)][_0x50a6c9(0x22e)][_0x50a6c9(0x209)](this),this[_0x50a6c9(0x370)](),this['createCategoryWindow'](),this[_0x50a6c9(0x21f)]();},Scene_Status[_0x3d06b3(0x2c5)][_0x3d06b3(0x23b)]=function(){const _0x14c3c4=_0x3d06b3;if(!Imported['VisuMZ_0_CoreEngine'])return;const _0x11fa1b=Scene_Status[_0x14c3c4(0x3b0)][_0x14c3c4(0x2c1)];this[_0x14c3c4(0x1c1)][_0x14c3c4(0x38f)](_0x11fa1b),this[_0x14c3c4(0x329)][_0x14c3c4(0x38f)](_0x11fa1b),this[_0x14c3c4(0x393)][_0x14c3c4(0x38f)](_0x11fa1b);},Scene_Status['prototype'][_0x3d06b3(0x1c9)]=function(){const _0x5bdf04=_0x3d06b3;return this['isUseElementStatusCoreUpdatedLayout']()?Scene_MenuBase[_0x5bdf04(0x2c5)][_0x5bdf04(0x1c9)]['call'](this):0x0;},Scene_Status[_0x3d06b3(0x2c5)][_0x3d06b3(0x187)]=function(){const _0x61da36=_0x3d06b3;return this[_0x61da36(0x352)]()?this[_0x61da36(0x25e)]():Scene_MenuBase[_0x61da36(0x2c5)][_0x61da36(0x187)]['call'](this);},Scene_Status[_0x3d06b3(0x2c5)][_0x3d06b3(0x25e)]=function(){const _0x2aa89a=_0x3d06b3,_0x372d3c=0x0,_0x30c919=this[_0x2aa89a(0x2fd)](),_0x46e685=Graphics[_0x2aa89a(0x397)],_0x5b8f58=this[_0x2aa89a(0x1c9)]();return new Rectangle(_0x372d3c,_0x30c919,_0x46e685,_0x5b8f58);},Scene_Status['prototype']['createCategoryWindow']=function(){const _0x1b01c6=_0x3d06b3,_0x4ef4c0=this[_0x1b01c6(0x245)]();this[_0x1b01c6(0x329)]=new Window_StatusCategory(_0x4ef4c0),this['_categoryWindow'][_0x1b01c6(0x391)](_0x1b01c6(0x219),this['popScene'][_0x1b01c6(0x21e)](this)),this[_0x1b01c6(0x329)][_0x1b01c6(0x391)](_0x1b01c6(0x2ef),this[_0x1b01c6(0x342)]['bind'](this)),this[_0x1b01c6(0x329)]['setHandler'](_0x1b01c6(0x1c3),this['previousActor'][_0x1b01c6(0x21e)](this)),this[_0x1b01c6(0x188)](this[_0x1b01c6(0x329)]);},Scene_Status['prototype'][_0x3d06b3(0x245)]=function(){const _0x4283bf=_0x3d06b3,_0x21ac63=Graphics[_0x4283bf(0x397)],_0x1cb84b=this[_0x4283bf(0x358)](0x1,!![]),_0x23e22c=0x0;let _0x289218=0x0;return this[_0x4283bf(0x376)]()[_0x4283bf(0x25d)](/TOP/i)?_0x289218=this[_0x4283bf(0x312)]():_0x289218=this['mainAreaBottom']()-_0x1cb84b,new Rectangle(_0x23e22c,_0x289218,_0x21ac63,_0x1cb84b);},Scene_Status[_0x3d06b3(0x2c5)][_0x3d06b3(0x21f)]=function(){const _0x2a2237=_0x3d06b3,_0x402a7e=this[_0x2a2237(0x16c)]();this[_0x2a2237(0x393)]=new Window_StatusData(_0x402a7e),this[_0x2a2237(0x188)](this[_0x2a2237(0x393)]),this[_0x2a2237(0x329)]['setItemWindow'](this[_0x2a2237(0x393)]);},Scene_Status[_0x3d06b3(0x2c5)][_0x3d06b3(0x16c)]=function(){const _0x470a02=_0x3d06b3,_0x28c8ec=Graphics['boxWidth'],_0x28f684=this[_0x470a02(0x3ba)]()-this[_0x470a02(0x329)][_0x470a02(0x1cb)],_0x254b19=0x0;let _0x37cb22=0x0;return this[_0x470a02(0x376)]()[_0x470a02(0x25d)](/TOP/i)?_0x37cb22=this['_categoryWindow']['y']+this[_0x470a02(0x329)][_0x470a02(0x1cb)]:_0x37cb22=this['mainAreaTop'](),new Rectangle(_0x254b19,_0x37cb22,_0x28c8ec,_0x28f684);},VisuMZ[_0x3d06b3(0x285)][_0x3d06b3(0x371)]=Scene_Status[_0x3d06b3(0x2c5)][_0x3d06b3(0x232)],Scene_Status[_0x3d06b3(0x2c5)][_0x3d06b3(0x232)]=function(){const _0x25c920=_0x3d06b3;this[_0x25c920(0x352)]()?this[_0x25c920(0x386)]():VisuMZ['ElementStatusCore']['Scene_Status_refreshActor'][_0x25c920(0x209)](this);},Scene_Status['prototype'][_0x3d06b3(0x386)]=function(){const _0x80abf1=_0x3d06b3,_0x36a159=this['actor']();this[_0x80abf1(0x1c1)][_0x80abf1(0x224)](_0x36a159[_0x80abf1(0x3a6)]()),this['_dataWindow'][_0x80abf1(0x1df)](_0x36a159);},VisuMZ[_0x3d06b3(0x285)]['Scene_Status_onActorChange']=Scene_Status[_0x3d06b3(0x2c5)][_0x3d06b3(0x1a6)],Scene_Status[_0x3d06b3(0x2c5)][_0x3d06b3(0x1a6)]=function(){const _0x39a5d3=_0x3d06b3;this[_0x39a5d3(0x352)]()?this['onActorChangeElementStatusCore']():VisuMZ[_0x39a5d3(0x285)][_0x39a5d3(0x14d)][_0x39a5d3(0x209)](this);},Scene_Status[_0x3d06b3(0x2c5)][_0x3d06b3(0x2f1)]=function(){const _0x83cd01=_0x3d06b3;Scene_MenuBase[_0x83cd01(0x2c5)][_0x83cd01(0x1a6)][_0x83cd01(0x209)](this),this[_0x83cd01(0x232)](),this['_categoryWindow'][_0x83cd01(0x195)]();},Window_Base[_0x3d06b3(0x2c5)]['drawItemDarkRect']=function(_0x1b5924,_0x11760f,_0x26afcd,_0x3138bd,_0x2419dc){const _0x68ca83=_0x3d06b3;_0x2419dc=Math[_0x68ca83(0x29e)](_0x2419dc||0x1,0x1);while(_0x2419dc--){_0x3138bd=_0x3138bd||this[_0x68ca83(0x284)](),this[_0x68ca83(0x17e)][_0x68ca83(0x35d)]=0xa0;const _0x426753=ColorManager[_0x68ca83(0x395)]();this[_0x68ca83(0x17e)][_0x68ca83(0x15a)](_0x1b5924+0x1,_0x11760f+0x1,_0x26afcd-0x2,_0x3138bd-0x2,_0x426753),this[_0x68ca83(0x17e)][_0x68ca83(0x35d)]=0xff;}};function Window_StatusCategory(){this['initialize'](...arguments);}function _0x5357(){const _0xd03d4e=['length','drawActorFaceBack','Game_Action_executeDamage','critical','<%1\x20BATTLER\x20NAMES>\x5cs*([\x5cs\x5cS]*)\x5cs*<\x5c/%1\x20BATTLER\x20NAMES>','AllowCollapse','statusMenuWtype','commandStyleCheck','highest','Game_BattlerBase_sparam','opacity','EleDmg','update','push','updateCommandNameWindow','Game_BattlerBase_param','format','parameters','STRUCT','RandomizeActor','_drawData','traitDmgMultipliersVs','gaugeLineHeight','JS\x20','%1\x20is\x20missing\x20a\x20required\x20plugin.\x0aPlease\x20install\x20%2\x20into\x20the\x20Plugin\x20Manager.','MRF','width','statusMenuAtype','VocabDmgAbsorb','pagedown','passiveStates','onActorChangeElementStatusCore','Icon','checkCacheKey','elements','itemMrf','changeTextColor','(\x5cd+\x5c.?\x5cd+)','getActionObjectElements','Per','addPassiveStatesTraitSets','PassiveStates','logTraitSets','helpAreaTop','getAbsorbedElements','HIT','Element%1','random','2484136fqDrDa','_plural','_stypeWidth','status','setDrawData','938280apyfgJ','traitsSet','9jQIOVc','Race','Text','addState','executeDamage','return\x200','resetWordWrap','race','Plus','mainAreaTop','+%1','Description','Height','Game_BattlerBase_refresh','TraitCheckNotetagRate','dropItemRate','makeUniqueNames','<%1RECEIVED\x20ELEMENT\x20%2\x20%3:[\x20]%4>','isEnemy','traitObjects','<%1\x20BATTLER\x20HUES>\x5cs*([\x5cs\x5cS]*)\x5cs*<\x5c/%1\x20BATTLER\x20HUES>','statusMenuDmgDealt','getPiercedElements','%1%2%3','registerCommand','toUpperCase','add','getRandomTraitSetFromList','21AYhQuv','ElementRate','Variant','getTraitSetObject','_categoryWindow','elementsRateSum','ReceivedRateJS','paramRateTraitSets','Default','expTraitSets','resetFontSettings','SvMotionIdleSolo-%1-%2','Curse','Scene_Boot_onDatabaseLoaded','isRecover','MCR','icon','exp','equips','Settings','Game_Enemy_setPlural','ActorChangeTraitSetsJS','drawItemStyleIconText','Game_Action_itemHit','any','_biography','log','getElementIDsCol2','%11','nextActor','paramchangeTextColor','EleRecRateJS','LUK','(?:%1|%2)','DropRate','MEV','_atypeWidth','<%1\x20SIDEVIEW\x20WEAPON:\x20(.*)>','product','textWidth','drawItemDarkRect','all','getReplacementTraits','originalName','iconHeight','isUseElementStatusCoreUpdatedLayout','WtypeId','Resist','motionIdle','setItemWindow','GoldRate','calcWindowHeight','index','getDealtElementFlat','Game_Battler_addState','drawText','paintOpacity','Shadow','onDatabaseLoaded','VisuMZ_1_MainMenuCore','Game_Enemy_dropItemRate','round','TCR','ActorChangeBiographyGroup','callUpdateHelp','version','processDrawIcon','WtypeOk','maxTp','itemCri','RegExp','MRG','parse','center','ceil','createHelpWindow','Scene_Status_refreshActor','EleDmgFlatPer','drawParamText','setDescriptionFontSizeToTraitSet','HRG','updatedLayoutStyle','EnemyChangeTraitSetsGroup','getParamValue','calcTargetElementRate','mainFontSize','VocabDmgDealt','BattlerNameSolo-%1-%2','randomInt','CRI','subject','clearElementChanges','traitHealMultipliersVs','VisuMZ_1_MessageCore','itemLineRect','isPlaytest','drawActorLevel','refreshActorElementStatusCore','NO\x20REPLACEMENT','Game_Enemy_transform','process_VisuMZ_ElementStatusCore_Compatible_RegExp','SvWeaponSolo-%1-%2','initElementStatusCore','RuleMaxCalcJSa','makeRandomSingularTraitSetFromNotetags','min','setBackgroundType','weaponTypes','setHandler','Alignment','_dataWindow','meetsEquipTraitRequirements','gaugeBackColor','getReplacedTraitSet','boxWidth','Game_Enemy_gold','recoverAll','exit','loadPicture','ActorChangeBiographyJS','commandNameWindowDrawText','Untitled','lowest','createRandomTraitSet','toLowerCase','BattlerHueSolo-%1-%2','%1%','transform','8312945Vqsjqp','profile','EleDmgRateFlt','drawGeneral','map','faceHeight','getParamName','statusMenuDmgAbsorb','_addingPassiveStateTraitSets','getReflectElementRulings','innerWidth','layoutSettings','battlerName','average','innerHeight','(\x5cd+)([%％])','Game_BattlerBase_elementRate','_cache','_specialBattler','ConvertParams','zodiac','mainAreaHeight','getBiography','createSpecialBattlers','Step1Start','8412470xATUAe','VocabAtype','TRAIT_EQUIP_WTYPE','createCommandNameWindow','onChangeEnemyTraits','Scene_Status_onActorChange','removeState','getParameterList','Scene_Status_create','canBypassElementReflect','traitHitRateMultipliersVs','EnemyChangeTraitSetsJS','note','drawParamValue','_battleCoreNoElement','text','traitCol1','itemHit','fillRect','3236134BOCUVA','drawElements','XParams','currentExt','_battleCoreAddedElements','traitCol2','blt','VocabWtype','Visible','JSON','maxCols','EleDmgFlatJS','ARRAYSTR','description','EVA','setTraitSet','iconText','dataWindowRect','xparamRateTraitSets','EleRecRatePer','members','resetTextColor','MAT','RandomWeight','_actor','paramValueByName','Bonus','commandStyle','fontSizeRatio','reduce','hue','drawProperties','expNext','Game_BattlerBase_initMembers','_commandList','contentsBack','item','VisuMZ_0_CoreEngine','EleDmgRateJS','ReflectRule','contents','drawIcon','EnemyNameFmt','elementsMaxRate','helpWindowRect','addWindow','clamp','RuleAverageCalcJS','iconWidth','atypeWidth','TraitCheckNotetagPlus','Blessing','drawItemStyleIcon','fontSize','statusMenuStype','dropItemRateTraitSets','EleRec','paramRate','activate','replace','isRightInputMode','BattlerNameMass-%1-%2','_commandNameWindow','TGR','getDataSystemTypesWidth','constructor','<%1\x20SIDEVIEW\x20BATTLER:\x20(.*)>','%12','ATK','PDR','SvBattlerMass-%1-%2','Game_Action_itemMrf','614872auvxrS','getTrueTraitSet','clear','onActorChange','refresh','minimum','Game_Enemy_setup','Zodiac','MAXMP','Step1End','FDR','powerUpColor','VocabStype','(.*)','Game_BattlerBase_clearStates','EleDmgFlatFlt','additive','placeGauge','ExcludeElements','FmtText','skillTypes','isElementNull','onLoadDrawItemActorMenuImage','TRG','uiMenuStyle','makeSingularTraitSetFromNotetags','standardIconWidth','traitSet','damage','name','_helpWindow','inBattle','pageup','getElementIdWithName','filter','Game_Action_clear','RuleMultiplyCalcJS','FinalizeRateJS','helpAreaHeight','EleForceJS','height','Param%1','Label','drawItemActorMenuImage','elementsRateProduct','wtypeWidth','drawParamName','loadSystem','Display','battlerHue','elementsAverageRate','Gender','armorTypes','process_VisuMZ_ElementStatusCore_Battler_RegExp','isBottomHelpMode','traitHitPlusMultipliersVs','_tp','Game_BattlerBase_sparamRate','getReceiveElementPlus','DEFAULT','setActor','85016DRkuTr','SParams','_resetFontSize','40dKQgDP','commandName','_namesCount','param','resetDescriptionFontSize','isActorMenuImageAvailable','isCommandEnabled','ElementsCol%1','drawItem','initBiography','===\x20%1\x27s\x20Trait\x20Sets\x20===','initialize','canPierceElement','VisuMZ_1_BattleCore','nature','includes','EleDmgRatePer','drawing','itemTextAlign','floor','Biography','getElementIDsColRaw','Game_BattlerBase_canEquip','uiHelpPosition','isArray','calcUserElementDamageRate','getReceiveElementFlat','StatusMenuList','EleDmgPlusJS','statusMenuDmgReceive','actor','faceName','\x5cC[16]%1:\x20\x5cC[0]%2','Game_Enemy_setLetter','EVAL','EleForcePer','Game_Action_itemCri','TRAIT_EQUIP_ATYPE','call','split','EleRecFlatJS','EleDmgPlusPer','Name','ElementRules','SvMotionIdleMass-%1-%2','curse','element','isMaxLevel','elementRateRuling','getElementIDsCol1','DrawJS','applyRandomTraitSets','_battleCoreForcedElements','_elementIDs','cancel','CmdTextAlign','<%1FORCE\x20RECEIVED\x20ELEMENT\x20(?:%2|%3)\x20RATE:[\x20]%4>','SvBattlerSolo-%1-%2','hasReplacedTraitSet','bind','createDataWindow','traitSetsEnabled','hasTraitSet','currentSymbol','xparamPlus','setText','addChild','Col%1','Wtypes','<%1\x20SIDEVIEW\x20IDLE\x20MOTION:\x20(.*)>','concat','PHA','enemy','Params','process_VisuMZ_ElementStatusCore_RegExp','create','getDealtElementRate','\x5cI[%1]%2','addCommand','refreshActor','level','IconSet','keys','every','setLetter','EleRecFlatFlt','_itemWindow','EXPRate','updateElementStatusCoreWindowBg','faceWidth','basicDataHeight','calcUserElementDamagePlus','CNT','getTraitSetKeys','optDisplayTp','Game_BattlerBase_xparam','RandomValid','hasAnyReplacedTrait','categoryWindowRect','StatusMenu','_svBattlerData','getReplaceTraitObjects','commandNameWindowCenter','indexOf','gold','wtypeOkTraitSets','%1:\x20%2','playOk','Element','BattlerHueMass-%1-%2','_wtypeWidth','getMenuImage','updateSpecialBattlers','initMembers','Nature','ARRAYSTRUCT','replaceTraits','EXR','<%1\x20BATTLER\x20HUE:\x20(\x5cd+)>','MDF','canEquip','makeTraitSetFromNotetags','match','helpWindowRectElementStatusCore','applyTraitSetsByObjectNotetag','BackRectColor','statusMenuBiography','gender','TraitCol1','ActorChangeTraitSetsGroup','remove','sum','Flt','shift','fill','loadFace','ARRAYEVAL','ARRAYJSON','Game_Actor_setup','drawFirstCategoryData','blessing','Game_BattlerBase_paramRate','88888','DEF','itemPadding','Game_BattlerBase_xparamPlus','stypeWidth','Game_Battler_removeState','actorId','RuleAdditiveCalcJS','sparamRate','AtypeOk','drawActorGraphic','sparam','LayoutStyle','#%1','SvWeaponMass-%1-%2','EnableLayout','Flat','Atypes','right','lineHeight','ElementStatusCore','getReflectedElements','xparam','calcElementRate','<%1\x20SIDEVIEW\x20IDLE\x20MOTIONS>\x5cs*([\x5cs\x5cS]*)\x5cs*<\x5c/%1\x20SIDEVIEW\x20IDLE\x20MOTIONS>','getColor','%1\x20is\x20incorrectly\x20placed\x20on\x20the\x20plugin\x20list.\x0aIt\x20is\x20a\x20Tier\x20%2\x20plugin\x20placed\x20over\x20other\x20Tier\x20%3\x20plugins.\x0aPlease\x20reorder\x20the\x20plugin\x20list\x20from\x20smallest\x20to\x20largest\x20tier\x20numbers.','elementsMinRate','\x5cN[%1]','alignment','auto','AnchorX','elementRate','GRD','isEquipWtypeOk','process_VisuMZ_ElementStatusCore_TraitSets','textColor','_traitSets','ActorChangeBiographyRange','standardIconHeight','Step1','clearStates','ARRAYNUM','getWtypeIdWithName','commandNameWindowDrawBackground','max','getTraitSet','132kgUSHY','calcUserElementDamageFlat','AGI','getElementStatusCoreBackColor','sparamRateTraitSets','getForceReceivedElementRate','createElementStatusCore','process_VisuMZ_ElementStatusCore_Parameters','FUNC','CmdStyle','traitCriticalRateMultipliersVs','<%1\x20SIDEVIEW\x20WEAPONS>\x5cs*([\x5cs\x5cS]*)\x5cs*<\x5c/%1\x20SIDEVIEW\x20WEAPONS>','TraitSetSettings','some','getExcludedElementIDs','EleForceFlt','setWordWrap','avg','multiply','nameElementStatusCore','multiplicative','elementId','List','setup','states','_letter','setBiography','CEV','traitSetType','systemColor','<%1\x20SIDEVIEW\x20BATTLERS>\x5cs*([\x5cs\x5cS]*)\x5cs*<\x5c/%1\x20SIDEVIEW\x20BATTLERS>','-------','Enable','StatusBgType','NUM','processRandomizedData','([\x5c+\x5c-]\x5cd+)([%％])','prototype','traitCriticalPlusMultipliersVs','atypeOkTraitSets','getRandomTraitSetFromString','getDealtElementPlus','========================','test','textSizeEx','trim','SubElement','setPlural','makeMassTraitSetFromNotetags','drawTextEx'];_0x5357=function(){return _0xd03d4e;};return _0x5357();}Window_StatusCategory[_0x3d06b3(0x17d)]=VisuMZ['ElementStatusCore'][_0x3d06b3(0x338)][_0x3d06b3(0x1fe)],Window_StatusCategory['prototype']=Object['create'](Window_HorzCommand['prototype']),Window_StatusCategory[_0x3d06b3(0x2c5)][_0x3d06b3(0x19c)]=Window_StatusCategory,Window_StatusCategory[_0x3d06b3(0x2c5)][_0x3d06b3(0x1ee)]=function(_0x3927d9){const _0x18f303=_0x3d06b3;Window_HorzCommand['prototype']['initialize'][_0x18f303(0x209)](this,_0x3927d9),this[_0x18f303(0x14b)](_0x3927d9);},Window_StatusCategory['prototype'][_0x3d06b3(0x14b)]=function(_0x22108c){const _0x4aa070=_0x3d06b3,_0xbe0aaa=new Rectangle(0x0,0x0,_0x22108c[_0x4aa070(0x2ec)],_0x22108c[_0x4aa070(0x1cb)]);this[_0x4aa070(0x199)]=new Window_Base(_0xbe0aaa),this[_0x4aa070(0x199)][_0x4aa070(0x2dc)]=0x0,this[_0x4aa070(0x225)](this['_commandNameWindow']),this['updateCommandNameWindow']();},Window_StatusCategory[_0x3d06b3(0x2c5)]['callUpdateHelp']=function(){const _0x5e963c=_0x3d06b3;Window_HorzCommand[_0x5e963c(0x2c5)][_0x5e963c(0x365)][_0x5e963c(0x209)](this);if(this[_0x5e963c(0x199)])this[_0x5e963c(0x2e0)]();},Window_StatusCategory[_0x3d06b3(0x2c5)][_0x3d06b3(0x2e0)]=function(){const _0x10fd6d=_0x3d06b3,_0x422e56=this[_0x10fd6d(0x199)];_0x422e56[_0x10fd6d(0x183)][_0x10fd6d(0x1a5)]();const _0x5ab87e=this[_0x10fd6d(0x2d9)](this['index']());if(_0x5ab87e===_0x10fd6d(0x335)){const _0x44141e=this[_0x10fd6d(0x383)](this[_0x10fd6d(0x359)]());let _0x5ad044=this[_0x10fd6d(0x1e4)](this[_0x10fd6d(0x359)]());_0x5ad044=_0x5ad044[_0x10fd6d(0x196)](/\\I\[(\d+)\]/gi,''),_0x422e56['resetFontSettings'](),this[_0x10fd6d(0x29d)](_0x5ad044,_0x44141e),this[_0x10fd6d(0x39d)](_0x5ad044,_0x44141e),this[_0x10fd6d(0x249)](_0x5ad044,_0x44141e);}},Window_StatusCategory[_0x3d06b3(0x2c5)][_0x3d06b3(0x29d)]=function(_0x31a336,_0x433804){},Window_StatusCategory[_0x3d06b3(0x2c5)][_0x3d06b3(0x39d)]=function(_0x3b415f,_0x3d5d31){const _0x1baf12=_0x3d06b3,_0x93757c=this[_0x1baf12(0x199)];_0x93757c[_0x1baf12(0x35c)](_0x3b415f,0x0,_0x3d5d31['y'],_0x93757c[_0x1baf12(0x3af)],'center');},Window_StatusCategory[_0x3d06b3(0x2c5)][_0x3d06b3(0x249)]=function(_0x3cd697,_0xf767db){const _0x271185=_0x3d06b3,_0x45fe88=this[_0x271185(0x199)],_0x512829=$gameSystem['windowPadding'](),_0x3aa99f=_0xf767db['x']+Math[_0x271185(0x1f6)](_0xf767db[_0x271185(0x2ec)]/0x2)+_0x512829;_0x45fe88['x']=_0x45fe88[_0x271185(0x2ec)]/-0x2+_0x3aa99f,_0x45fe88['y']=Math[_0x271185(0x1f6)](_0xf767db[_0x271185(0x1cb)]/0x2);},Window_StatusCategory[_0x3d06b3(0x2c5)][_0x3d06b3(0x165)]=function(){const _0x5b036d=_0x3d06b3;return VisuMZ[_0x5b036d(0x285)][_0x5b036d(0x338)][_0x5b036d(0x1fe)][_0x5b036d(0x2d2)];},Window_StatusCategory['prototype']['update']=function(){const _0x40138d=_0x3d06b3;Window_HorzCommand[_0x40138d(0x2c5)][_0x40138d(0x2de)][_0x40138d(0x209)](this),this[_0x40138d(0x239)]&&this[_0x40138d(0x239)][_0x40138d(0x306)](this[_0x40138d(0x15e)]());},Window_StatusCategory[_0x3d06b3(0x2c5)][_0x3d06b3(0x356)]=function(_0x29468a){const _0xcfb63f=_0x3d06b3;this[_0xcfb63f(0x239)]=_0x29468a;},Window_StatusCategory[_0x3d06b3(0x2c5)]['makeCommandList']=function(){const _0x311f4a=_0x3d06b3;for(const _0x1de178 of Window_StatusCategory[_0x311f4a(0x17d)]){const _0x8d044=_0x1de178['Symbol'],_0x174ed5=_0x1de178[_0x311f4a(0x2f2)];let _0x55188e=_0x1de178[_0x311f4a(0x30b)];if(['',_0x311f4a(0x39e)][_0x311f4a(0x1f2)](_0x55188e))continue;_0x174ed5>0x0&&this[_0x311f4a(0x176)]()!==_0x311f4a(0x157)&&(_0x55188e=_0x311f4a(0x230)[_0x311f4a(0x2e2)](_0x174ed5,_0x55188e));const _0x30d5e9=_0x1de178[_0x311f4a(0x215)];this[_0x311f4a(0x231)](_0x55188e,_0x8d044,!![],_0x30d5e9);}},Window_StatusCategory[_0x3d06b3(0x2c5)][_0x3d06b3(0x1f5)]=function(){const _0x602cd7=_0x3d06b3;return VisuMZ[_0x602cd7(0x285)][_0x602cd7(0x338)][_0x602cd7(0x246)][_0x602cd7(0x21a)];},Window_StatusCategory[_0x3d06b3(0x2c5)]['drawItem']=function(_0x1925dc){const _0x5a4b73=_0x3d06b3,_0x24e0eb=this['commandStyleCheck'](_0x1925dc);if(_0x24e0eb===_0x5a4b73(0x16b))this[_0x5a4b73(0x33b)](_0x1925dc);else _0x24e0eb===_0x5a4b73(0x335)?this[_0x5a4b73(0x18f)](_0x1925dc):Window_HorzCommand[_0x5a4b73(0x2c5)][_0x5a4b73(0x1eb)][_0x5a4b73(0x209)](this,_0x1925dc);},Window_StatusCategory[_0x3d06b3(0x2c5)][_0x3d06b3(0x176)]=function(){const _0x247f34=_0x3d06b3;return VisuMZ[_0x247f34(0x285)][_0x247f34(0x338)][_0x247f34(0x246)][_0x247f34(0x2a9)];},Window_StatusCategory[_0x3d06b3(0x2c5)][_0x3d06b3(0x2d9)]=function(_0x20d018){const _0x3415dd=_0x3d06b3;if(_0x20d018<0x0)return'text';const _0x1a0770=this[_0x3415dd(0x176)]();if(_0x1a0770!==_0x3415dd(0x28f))return _0x1a0770;else{if(this['maxItems']()>0x0){const _0x161380=this['commandName'](_0x20d018);if(_0x161380['match'](/\\I\[(\d+)\]/i)){const _0xb728b0=this[_0x3415dd(0x383)](_0x20d018),_0x36205d=this['textSizeEx'](_0x161380)[_0x3415dd(0x2ec)];return _0x36205d<=_0xb728b0[_0x3415dd(0x2ec)]?_0x3415dd(0x16b):_0x3415dd(0x335);}}}return'text';},Window_StatusCategory[_0x3d06b3(0x2c5)][_0x3d06b3(0x33b)]=function(_0x5eb56e){const _0x4cb462=_0x3d06b3,_0x4b6146=this['itemLineRect'](_0x5eb56e),_0x4a50a0=this['commandName'](_0x5eb56e),_0x5db654=this[_0x4cb462(0x2cc)](_0x4a50a0)[_0x4cb462(0x2ec)];this['changePaintOpacity'](this[_0x4cb462(0x1e9)](_0x5eb56e));const _0x32435b=this[_0x4cb462(0x1f5)]();if(_0x32435b===_0x4cb462(0x283))this[_0x4cb462(0x2d1)](_0x4a50a0,_0x4b6146['x']+_0x4b6146[_0x4cb462(0x2ec)]-_0x5db654,_0x4b6146['y'],_0x5db654);else{if(_0x32435b===_0x4cb462(0x36e)){const _0x4bbf44=_0x4b6146['x']+Math[_0x4cb462(0x1f6)]((_0x4b6146[_0x4cb462(0x2ec)]-_0x5db654)/0x2);this[_0x4cb462(0x2d1)](_0x4a50a0,_0x4bbf44,_0x4b6146['y'],_0x5db654);}else this['drawTextEx'](_0x4a50a0,_0x4b6146['x'],_0x4b6146['y'],_0x5db654);}},Window_StatusCategory[_0x3d06b3(0x2c5)][_0x3d06b3(0x18f)]=function(_0x49d189){const _0x1d2189=_0x3d06b3;this[_0x1d2189(0x1e4)](_0x49d189)[_0x1d2189(0x25d)](/\\I\[(\d+)\]/i);const _0x1b9933=Number(RegExp['$1'])||0x0,_0x4feffc=this['itemLineRect'](_0x49d189),_0x46c24e=_0x4feffc['x']+Math[_0x1d2189(0x1f6)]((_0x4feffc['width']-ImageManager[_0x1d2189(0x18b)])/0x2),_0x128c24=_0x4feffc['y']+(_0x4feffc[_0x1d2189(0x1cb)]-ImageManager[_0x1d2189(0x351)])/0x2;this[_0x1d2189(0x184)](_0x1b9933,_0x46c24e,_0x128c24);},Window_StatusCategory[_0x3d06b3(0x2c5)]['playOkSound']=function(){const _0x598fa3=_0x3d06b3;this[_0x598fa3(0x222)]()===_0x598fa3(0x219)&&SoundManager[_0x598fa3(0x24e)]();};function Window_StatusData(){const _0x262028=_0x3d06b3;this[_0x262028(0x1ee)](...arguments);}Window_StatusData[_0x3d06b3(0x2c5)]=Object['create'](Window_StatusBase[_0x3d06b3(0x2c5)]),Window_StatusData[_0x3d06b3(0x2c5)][_0x3d06b3(0x19c)]=Window_MenuStatus,Window_StatusData[_0x3d06b3(0x158)]=[_0x3d06b3(0x1d6),_0x3d06b3(0x255),_0x3d06b3(0x18e),_0x3d06b3(0x1aa)][_0x3d06b3(0x1c5)](_0x26b62a=>{const _0x1423e4=_0x3d06b3,_0x5621b7=DataManager[_0x1423e4(0x2bc)](_0x26b62a);return _0x5621b7&&_0x5621b7[_0x1423e4(0x163)];}),Window_StatusData['traitCol2']=[_0x3d06b3(0x30a),_0x3d06b3(0x392),_0x3d06b3(0x331),_0x3d06b3(0x327)][_0x3d06b3(0x1c5)](_0x42b703=>{const _0x5f0331=_0x3d06b3,_0x52faa5=DataManager[_0x5f0331(0x2bc)](_0x42b703);return _0x52faa5&&_0x52faa5[_0x5f0331(0x163)];}),Window_StatusData['prototype']['initialize']=function(_0xe39e8){const _0xf7ccd2=_0x3d06b3;this[_0xf7ccd2(0x1e2)]=$gameSystem[_0xf7ccd2(0x37a)](),Window_StatusBase[_0xf7ccd2(0x2c5)][_0xf7ccd2(0x1ee)][_0xf7ccd2(0x209)](this,_0xe39e8),this[_0xf7ccd2(0x173)]=null,this[_0xf7ccd2(0x2e6)]=null;},Window_StatusData[_0x3d06b3(0x2c5)][_0x3d06b3(0x32f)]=function(){const _0x5f22a1=_0x3d06b3;Window_StatusBase[_0x5f22a1(0x2c5)][_0x5f22a1(0x32f)]['call'](this),this[_0x5f22a1(0x183)][_0x5f22a1(0x190)]=this[_0x5f22a1(0x1e2)];},Window_StatusData['prototype'][_0x3d06b3(0x177)]=function(){const _0x21b9b3=_0x3d06b3;return this['contents'][_0x21b9b3(0x190)]/$gameSystem[_0x21b9b3(0x37a)]();},Window_StatusData['prototype'][_0x3d06b3(0x184)]=function(_0x247e2c,_0x1319bb,_0x116850){const _0x1ceb82=_0x3d06b3,_0x3bc589=ImageManager[_0x1ceb82(0x1d2)](_0x1ceb82(0x234)),_0x5e2df9=ImageManager[_0x1ceb82(0x18b)],_0x1877f7=ImageManager['iconHeight'],_0x58acf2=_0x247e2c%0x10*_0x5e2df9,_0x36a8f1=Math[_0x1ceb82(0x1f6)](_0x247e2c/0x10)*_0x1877f7,_0x29d11a=Math[_0x1ceb82(0x36f)](_0x5e2df9*this[_0x1ceb82(0x177)]()),_0x5c5ffd=Math[_0x1ceb82(0x36f)](_0x1877f7*this[_0x1ceb82(0x177)]());this[_0x1ceb82(0x183)][_0x1ceb82(0x161)](_0x3bc589,_0x58acf2,_0x36a8f1,_0x5e2df9,_0x1877f7,_0x1319bb,_0x116850,_0x29d11a,_0x5c5ffd);},Window_StatusData[_0x3d06b3(0x2c5)][_0x3d06b3(0x367)]=function(_0x125175,_0x13c97b){const _0x91ff68=_0x3d06b3,_0xb52676=ImageManager[_0x91ff68(0x1bd)]||0x20,_0x511875=ImageManager[_0x91ff68(0x298)]||0x20;if(_0x13c97b[_0x91ff68(0x1f4)]){const _0x582259=_0xb52676-ImageManager[_0x91ff68(0x18b)],_0x9fa449=_0x511875-ImageManager[_0x91ff68(0x351)];let _0x1f1029=0x2,_0x19f916=0x2;this[_0x91ff68(0x284)]()!==0x24&&(_0x19f916=Math[_0x91ff68(0x1f6)]((this[_0x91ff68(0x284)]()-_0x511875)/0x2));const _0x4c0a8d=_0x13c97b['x']+Math[_0x91ff68(0x36f)](Math[_0x91ff68(0x1f6)](_0x582259/0x2)*this[_0x91ff68(0x177)]())+_0x1f1029,_0x58d6ad=_0x13c97b['y']+Math[_0x91ff68(0x36f)](Math[_0x91ff68(0x1f6)](_0x9fa449/0x2)*this[_0x91ff68(0x177)]())+_0x19f916;this[_0x91ff68(0x184)](_0x125175,_0x4c0a8d,_0x58d6ad);}_0x13c97b['x']+=Math[_0x91ff68(0x36f)](_0xb52676*this['fontSizeRatio']()),_0x13c97b['x']+=Math['ceil'](0x4*this[_0x91ff68(0x177)]());},Window_StatusData['prototype'][_0x3d06b3(0x1df)]=function(_0x50c81f){const _0x3a2e43=_0x3d06b3;this[_0x3a2e43(0x173)]!==_0x50c81f&&(this[_0x3a2e43(0x173)]=_0x50c81f,this[_0x3a2e43(0x1a7)]());},Window_StatusData['prototype'][_0x3d06b3(0x306)]=function(_0xdadf93){const _0x342fd3=_0x3d06b3;this[_0x342fd3(0x2e6)]!==_0xdadf93&&(this[_0x342fd3(0x2e6)]=_0xdadf93,this['refresh']());},Window_StatusData[_0x3d06b3(0x2c5)][_0x3d06b3(0x2b0)]=function(_0x4c77a0){const _0x1817b1=_0x3d06b3;if(Imported['VisuMZ_1_MessageCore'])Window_Base[_0x1817b1(0x2c5)][_0x1817b1(0x2b0)]['call'](this,_0x4c77a0);return'';},Window_StatusData['prototype'][_0x3d06b3(0x30f)]=function(){const _0x95756c=_0x3d06b3;if(Imported[_0x95756c(0x382)])Window_StatusBase[_0x95756c(0x2c5)][_0x95756c(0x30f)][_0x95756c(0x209)](this);},Window_StatusData[_0x3d06b3(0x2c5)]['drawTextEx']=function(_0x3a5814,_0x1bd555,_0x3c2ecc,_0x5bae12){const _0x38a28d=_0x3d06b3,_0x1bf516=Window_StatusBase[_0x38a28d(0x2c5)]['drawTextEx'][_0x38a28d(0x209)](this,_0x3a5814,_0x1bd555,_0x3c2ecc,_0x5bae12);return this[_0x38a28d(0x30f)](),_0x1bf516;},Window_StatusData[_0x3d06b3(0x2c5)]['refresh']=function(){const _0x952b1e=_0x3d06b3;Window_StatusBase[_0x952b1e(0x2c5)][_0x952b1e(0x1a7)][_0x952b1e(0x209)](this),this['resetDescriptionFontSize'](),this[_0x952b1e(0x32f)](),this[_0x952b1e(0x30f)]();if(this['_actor']&&this['_drawData'])this[_0x952b1e(0x2e6)][_0x952b1e(0x209)](this);},Window_StatusData[_0x3d06b3(0x2c5)]['isActorMenuImageAvailable']=function(){const _0x21fed4=_0x3d06b3;return Imported[_0x21fed4(0x360)]&&this[_0x21fed4(0x173)][_0x21fed4(0x252)]()!=='';},Window_StatusData[_0x3d06b3(0x2c5)][_0x3d06b3(0x1ce)]=function(_0x5f0195,_0x4bc99b,_0x1c19f7,_0x32270e,_0x41cc34){const _0x2ba033=_0x3d06b3,_0x4b146f=ImageManager[_0x2ba033(0x39b)](_0x5f0195['getMenuImage']());_0x4b146f['addLoadListener'](this[_0x2ba033(0x1b9)][_0x2ba033(0x21e)](this,_0x4b146f,_0x5f0195,_0x4bc99b,_0x1c19f7,_0x32270e,_0x41cc34));},Window_StatusData[_0x3d06b3(0x2c5)][_0x3d06b3(0x1b9)]=function(_0x27d019,_0x59a5d9,_0x131b50,_0x18faea,_0x5b8836,_0x4d1072){const _0x1f4962=_0x3d06b3,_0x50e6b5=_0x5b8836-_0x27d019[_0x1f4962(0x2ec)];_0x131b50+=_0x50e6b5/0x2;if(_0x50e6b5<0x0)_0x5b8836-=_0x50e6b5;_0x5b8836=(_0x5b8836||ImageManager[_0x1f4962(0x23c)])-0x2,_0x4d1072=(_0x4d1072||ImageManager['faceHeight'])-0x2;const _0xc3c8ed=_0x27d019[_0x1f4962(0x2ec)],_0x1a61be=_0x27d019['height'],_0x522998=_0x5b8836,_0x29110f=_0x4d1072-0x2,_0x2ee955=_0x131b50+Math[_0x1f4962(0x1f6)](_0x522998/0x2),_0x57cc3c=_0x18faea+Math[_0x1f4962(0x36f)]((_0x4d1072+_0x1a61be)/0x2),_0xdf7694=Math[_0x1f4962(0x38e)](_0x5b8836,_0xc3c8ed),_0x3fea51=Math[_0x1f4962(0x38e)](_0x4d1072,_0x1a61be),_0x340848=_0x131b50+0x1,_0x117254=Math[_0x1f4962(0x29e)](_0x18faea+0x1,_0x18faea+_0x29110f-_0x1a61be+0x3),_0x5b17eb=(_0xc3c8ed-_0xdf7694)/0x2,_0x5b3486=(_0x1a61be-_0x3fea51)/0x2;this[_0x1f4962(0x17e)][_0x1f4962(0x161)](_0x27d019,_0x5b17eb,_0x5b3486,_0xdf7694,_0x3fea51,_0x340848,_0x117254);},Window_StatusData[_0x3d06b3(0x2c5)]['basicDataHeight']=function(){const _0x311a0c=_0x3d06b3;let _0x79c82d=0x5;return this[_0x311a0c(0x3b3)]-this['lineHeight']()*0x5<this[_0x311a0c(0x284)]()*0x6&&(_0x79c82d=0x4),this['innerHeight']-this[_0x311a0c(0x284)]()*_0x79c82d;},Window_StatusData[_0x3d06b3(0x2c5)][_0x3d06b3(0x27b)]=function(_0x20fd0d,_0x36374c){const _0x3b6112=_0x3d06b3,_0x19e06a=this[_0x3b6112(0x173)],_0xbde684=new Rectangle(_0x20fd0d,0x0,_0x36374c,this[_0x3b6112(0x3b3)]),_0xdbc01e=this[_0x3b6112(0x23d)]();if(this[_0x3b6112(0x1e8)]()){const _0x4ec0bf=_0xbde684[_0x3b6112(0x2ec)],_0x35a945=_0xbde684[_0x3b6112(0x1cb)],_0x232ea9=_0xbde684['x'],_0x2440a5=_0xbde684['y'];this[_0x3b6112(0x1ce)](_0x19e06a,_0x232ea9,_0x2440a5,_0x4ec0bf,_0x35a945);}else{const _0x19424a=ImageManager['faceWidth'],_0x2d965d=ImageManager['faceHeight'],_0x35aac1=_0xbde684['x']+Math['floor']((_0xbde684[_0x3b6112(0x2ec)]-_0x19424a)/0x2),_0x128060=_0xbde684['y']+Math[_0x3b6112(0x1f6)]((this[_0x3b6112(0x3b3)]-_0xdbc01e-_0x2d965d)/0x2);this['drawActorFaceBack'](_0x19e06a,_0x35aac1,_0x128060,_0x19424a,_0x2d965d);}},Window_Base['prototype'][_0x3d06b3(0x2d3)]=function(_0x2f1521,_0x1da5de,_0x12820a,_0x139f6d,_0xefcc7c){const _0x577ac9=_0x3d06b3,_0x83877f=_0x2f1521[_0x577ac9(0x202)](),_0x2fc2cb=_0x2f1521['faceIndex']();_0x139f6d=_0x139f6d||ImageManager[_0x577ac9(0x23c)],_0xefcc7c=_0xefcc7c||ImageManager['faceHeight'];const _0x35a0ef=ImageManager[_0x577ac9(0x26a)](_0x83877f),_0x1833e6=ImageManager[_0x577ac9(0x23c)],_0x2ab4c2=ImageManager[_0x577ac9(0x3aa)],_0x459ed3=Math[_0x577ac9(0x38e)](_0x139f6d,_0x1833e6),_0x68803c=Math[_0x577ac9(0x38e)](_0xefcc7c,_0x2ab4c2),_0x42f1ef=Math[_0x577ac9(0x1f6)](_0x1da5de+Math[_0x577ac9(0x29e)](_0x139f6d-_0x1833e6,0x0)/0x2),_0x112c82=Math[_0x577ac9(0x1f6)](_0x12820a+Math[_0x577ac9(0x29e)](_0xefcc7c-_0x2ab4c2,0x0)/0x2),_0x4c2e41=_0x2fc2cb%0x4*_0x1833e6+(_0x1833e6-_0x459ed3)/0x2,_0x5dd235=Math[_0x577ac9(0x1f6)](_0x2fc2cb/0x4)*_0x2ab4c2+(_0x2ab4c2-_0x68803c)/0x2;this['contentsBack'][_0x577ac9(0x161)](_0x35a0ef,_0x4c2e41,_0x5dd235,_0x459ed3,_0x68803c,_0x42f1ef,_0x112c82);},Window_StatusData[_0x3d06b3(0x2c5)]['getParameterList']=function(_0x3d83a2){const _0x335e78=_0x3d06b3,_0x36d2b4=_0x335e78(0x226)[_0x335e78(0x2e2)](_0x3d83a2);return VisuMZ[_0x335e78(0x285)][_0x335e78(0x338)][_0x335e78(0x246)][_0x36d2b4];},Window_StatusData[_0x3d06b3(0x2c5)][_0x3d06b3(0x1d1)]=function(_0x588487,_0x5b69f3,_0xa2880a,_0x40e64d){const _0x4e8573=_0x3d06b3,_0x4cdad9=this['itemPadding']();_0x40e64d-=_0x4cdad9*0x2;if(Imported[_0x4e8573(0x180)])this[_0x4e8573(0x373)](_0x5b69f3+_0x4cdad9,_0xa2880a,_0x40e64d,_0x588487,![]);else{const _0x4e24d1=this[_0x4e8573(0x3ab)](_0x588487);this[_0x4e8573(0x2f6)](ColorManager[_0x4e8573(0x2bd)]()),this[_0x4e8573(0x35c)](_0x4e24d1,_0x5b69f3+_0x4cdad9,_0xa2880a,_0x40e64d);}},Window_StatusData[_0x3d06b3(0x2c5)][_0x3d06b3(0x3ab)]=function(_0x19fc33){const _0x4778c3=_0x3d06b3;_0x19fc33=_0x19fc33[_0x4778c3(0x322)]()[_0x4778c3(0x2cd)]();const _0x1730c8=['MAXHP','MAXMP',_0x4778c3(0x19f),'DEF',_0x4778c3(0x171),_0x4778c3(0x25a),_0x4778c3(0x2a2),_0x4778c3(0x345)],_0x5c6530=[_0x4778c3(0x2ff),_0x4778c3(0x169),_0x4778c3(0x37e),_0x4778c3(0x2bb),'MEV','MRF',_0x4778c3(0x23f),_0x4778c3(0x375),_0x4778c3(0x36c),_0x4778c3(0x1ba)],_0x50807a=['TGR',_0x4778c3(0x292),'REC',_0x4778c3(0x22a),_0x4778c3(0x334),_0x4778c3(0x363),_0x4778c3(0x1a0),'MDR',_0x4778c3(0x1ad),_0x4778c3(0x258)];if(_0x1730c8[_0x4778c3(0x1f2)](_0x19fc33))return TextManager[_0x4778c3(0x1e6)](_0x1730c8['indexOf'](_0x19fc33));return _0x19fc33;},Window_StatusData['prototype'][_0x3d06b3(0x155)]=function(_0x407770,_0x5997f1,_0x10624d,_0x561f3d){const _0x4ef5da=_0x3d06b3;this['resetFontSettings']();const _0x1fd8d5=this['itemPadding'](),_0x24e62d=this['getParamValue'](_0x407770);this[_0x4ef5da(0x35c)](_0x24e62d,_0x5997f1+_0x1fd8d5,_0x10624d,_0x561f3d-_0x1fd8d5*0x2,_0x4ef5da(0x283));},Window_StatusData['prototype'][_0x3d06b3(0x378)]=function(_0x53f018){const _0x282f5c=_0x3d06b3;_0x53f018=_0x53f018['toUpperCase']()[_0x282f5c(0x2cd)]();const _0x4fa9f2=this['_actor'];if(Imported['VisuMZ_0_CoreEngine'])return _0x4fa9f2[_0x282f5c(0x174)](_0x53f018,!![]);else{const _0xe5c1d9=['MAXHP',_0x282f5c(0x1ab),'ATK',_0x282f5c(0x272),'MAT',_0x282f5c(0x25a),_0x282f5c(0x2a2),_0x282f5c(0x345)],_0x31a688=[_0x282f5c(0x2ff),_0x282f5c(0x169),_0x282f5c(0x37e),_0x282f5c(0x2bb),_0x282f5c(0x348),_0x282f5c(0x2eb),_0x282f5c(0x23f),_0x282f5c(0x375),_0x282f5c(0x36c),_0x282f5c(0x1ba)],_0xb66318=[_0x282f5c(0x19a),_0x282f5c(0x292),'REC',_0x282f5c(0x22a),_0x282f5c(0x334),_0x282f5c(0x363),'PDR','MDR',_0x282f5c(0x1ad),_0x282f5c(0x258)];if(_0xe5c1d9['includes'](_0x53f018))return _0x4fa9f2[_0x282f5c(0x1e6)](_0xe5c1d9[_0x282f5c(0x24a)](_0x53f018));else{if(_0x31a688['includes'](_0x53f018)){const _0x2ac2fb=_0x4fa9f2[_0x282f5c(0x287)](_0x31a688[_0x282f5c(0x24a)](_0x53f018));return'%1%'[_0x282f5c(0x2e2)](Math['round'](_0x2ac2fb*0x64));}else{if(_0xb66318[_0x282f5c(0x1f2)](_0x53f018)){const _0x1920fc=_0x4fa9f2[_0x282f5c(0x27c)](_0xb66318[_0x282f5c(0x24a)](_0x53f018));return _0x282f5c(0x3a3)[_0x282f5c(0x2e2)](Math[_0x282f5c(0x362)](_0x1920fc*0x64));}}}}},Window_StatusData[_0x3d06b3(0x2c5)][_0x3d06b3(0x26e)]=function(){const _0x210ce8=_0x3d06b3;VisuMZ[_0x210ce8(0x285)][_0x210ce8(0x338)][_0x210ce8(0x1fe)][0x0][_0x210ce8(0x215)][_0x210ce8(0x209)](this);},Window_StatusData[_0x3d06b3(0x2c5)][_0x3d06b3(0x374)]=function(){const _0x35be7e=_0x3d06b3;this[_0x35be7e(0x1e2)]=VisuMZ[_0x35be7e(0x285)][_0x35be7e(0x338)][_0x35be7e(0x246)]['TraitDescriptionFontSize'];},Window_StatusData[_0x3d06b3(0x2c5)][_0x3d06b3(0x1e7)]=function(){const _0x5544ed=_0x3d06b3;this[_0x5544ed(0x1e2)]=$gameSystem[_0x5544ed(0x37a)]();},Window_StatusData['prototype'][_0x3d06b3(0x34d)]=function(_0x476c4b,_0xa32973,_0xe66c6c,_0x4d4af5,_0x19e3ca){const _0x95cce9=_0x3d06b3;if(VisuMZ[_0x95cce9(0x285)]['Settings'][_0x95cce9(0x246)]['DrawBackRect']===![])return;_0x19e3ca=Math['max'](_0x19e3ca||0x1,0x1);while(_0x19e3ca--){_0x4d4af5=_0x4d4af5||this[_0x95cce9(0x284)](),this[_0x95cce9(0x183)][_0x95cce9(0x35d)]=0xa0;const _0x4b9456=ColorManager[_0x95cce9(0x2a3)]();this[_0x95cce9(0x183)][_0x95cce9(0x15a)](_0x476c4b+0x1,_0xa32973+0x1,_0xe66c6c-0x2,_0x4d4af5-0x2,_0x4b9456),this[_0x95cce9(0x183)][_0x95cce9(0x35d)]=0xff;}},ColorManager[_0x3d06b3(0x2a3)]=function(){const _0x3e8c58=_0x3d06b3,_0xeeb763=VisuMZ[_0x3e8c58(0x285)][_0x3e8c58(0x338)]['StatusMenu'];let _0xa36733=_0xeeb763[_0x3e8c58(0x260)]!==undefined?_0xeeb763['BackRectColor']:0x13;return ColorManager['getColor'](_0xa36733);},Window_StatusData['prototype'][_0x3d06b3(0x3a8)]=function(){const _0x26986b=_0x3d06b3,_0x3ff9c5=_0x26986b(0x2bf),_0x2a9784=this[_0x26986b(0x284)](),_0x1b3f86=this[_0x26986b(0x2e8)](),_0x120856=this[_0x26986b(0x23d)](),_0x1dfdb1=this[_0x26986b(0x173)],_0xa4351=this['itemPadding'](),_0x537c57=this['innerWidth']/0x2;let _0x397151=new Rectangle(0x0,0x0,_0x537c57,this[_0x26986b(0x3b3)]),_0x4d8c31=0x0,_0x32b57e=0x0;this[_0x26986b(0x27b)](0x0,this[_0x26986b(0x3af)]/0x2);let _0x3706ae=_0x397151['x'],_0x30794b=Math[_0x26986b(0x29e)](_0x397151['y'],_0x397151['y']+(_0x397151[_0x26986b(0x1cb)]-_0x120856)),_0x1dd830=_0x397151[_0x26986b(0x2ec)],_0x1c8c0f=_0x397151['y']+_0x397151[_0x26986b(0x1cb)]-_0x30794b;this['drawItemDarkRect'](0x0,_0x30794b,_0x1dd830,_0x2a9784,0x2),this[_0x26986b(0x35c)](_0x1dfdb1[_0x26986b(0x1c0)](),_0x3706ae,_0x30794b,_0x1dd830,_0x26986b(0x36e)),_0x3706ae=_0x397151['x']+Math['round']((_0x397151[_0x26986b(0x2ec)]-0x80)/0x2),_0x30794b+=_0x2a9784,this['drawItemDarkRect'](0x0,_0x30794b,_0x1dd830,_0x2a9784),this[_0x26986b(0x385)](_0x1dfdb1,_0x3706ae,_0x30794b);const _0x47452b=_0x1dfdb1['currentClass']()[_0x26986b(0x1c0)];_0x3706ae=_0x397151['x']+Math[_0x26986b(0x362)]((_0x397151[_0x26986b(0x2ec)]-this[_0x26986b(0x2cc)](_0x47452b)['width'])/0x2),_0x30794b+=_0x2a9784,this[_0x26986b(0x34d)](0x0,_0x30794b,_0x1dd830,_0x2a9784),this[_0x26986b(0x2d1)](_0x47452b,_0x3706ae,_0x30794b,_0x1dd830),_0x3706ae=_0x397151['x']+Math['round']((_0x397151['width']-0x90)/0x2),_0x30794b+=_0x2a9784,this[_0x26986b(0x34d)](0x0,_0x30794b,_0x1dd830,_0x2a9784),this['drawActorIcons'](_0x1dfdb1,_0x3706ae,_0x30794b),_0x3706ae=_0x397151['x']+Math[_0x26986b(0x362)]((_0x397151[_0x26986b(0x2ec)]-0x80)/0x2),_0x30794b+=_0x2a9784,this['drawItemDarkRect'](0x0,_0x30794b,_0x1dd830,this[_0x26986b(0x3b3)]-_0x30794b),this[_0x26986b(0x1b4)](_0x1dfdb1,'hp',_0x3706ae,_0x30794b),_0x30794b+=_0x1b3f86,this[_0x26986b(0x1b4)](_0x1dfdb1,'mp',_0x3706ae,_0x30794b),_0x30794b+=_0x1b3f86;$dataSystem[_0x26986b(0x241)]&&this[_0x26986b(0x1b4)](_0x1dfdb1,'tp',_0x3706ae,_0x30794b);_0x397151=new Rectangle(_0x537c57,0x0,_0x537c57,this[_0x26986b(0x3b3)]),this['changeTextColor'](ColorManager[_0x26986b(0x2bd)]()),this['drawItemDarkRect'](_0x397151['x'],_0x397151['y'],_0x397151[_0x26986b(0x2ec)],_0x2a9784,0x2),this[_0x26986b(0x35c)](TextManager[_0x26986b(0x336)],_0x397151['x'],_0x397151['y'],_0x397151[_0x26986b(0x2ec)],'center');const _0x14b673=_0x2a9784*0x5;this[_0x26986b(0x34d)](_0x397151['x'],_0x397151['y']+_0x2a9784*0x1,_0x397151[_0x26986b(0x2ec)],_0x2a9784*0x2),this[_0x26986b(0x34d)](_0x397151['x'],_0x397151['y']+_0x2a9784*0x3,_0x397151[_0x26986b(0x2ec)],_0x2a9784*0x2);const _0x53ee95=TextManager['expTotal'][_0x26986b(0x2e2)](TextManager[_0x26986b(0x336)]),_0x258905=TextManager[_0x26986b(0x17b)][_0x26986b(0x2e2)](TextManager[_0x26986b(0x233)]);this['changeTextColor'](ColorManager[_0x26986b(0x2bd)]()),this[_0x26986b(0x35c)](_0x53ee95,_0x397151['x']+_0xa4351,_0x397151['y']+_0x2a9784*0x1,_0x397151['width']-_0xa4351*0x2),this[_0x26986b(0x35c)](_0x258905,_0x397151['x']+_0xa4351,_0x397151['y']+_0x2a9784*0x3,_0x397151[_0x26986b(0x2ec)]-_0xa4351*0x2),this[_0x26986b(0x170)]();const _0x4cc6e9=_0x1dfdb1['currentExp'](),_0xc8d62d=_0x1dfdb1[_0x26986b(0x212)]()?_0x3ff9c5:_0x1dfdb1['nextRequiredExp']();this[_0x26986b(0x35c)](_0x4cc6e9,_0x397151['x']+_0xa4351,_0x397151['y']+_0x2a9784*0x1,_0x397151[_0x26986b(0x2ec)]-_0xa4351*0x2,_0x26986b(0x283)),this['drawText'](_0xc8d62d,_0x397151['x']+_0xa4351,_0x397151['y']+_0x2a9784*0x3,_0x397151[_0x26986b(0x2ec)]-_0xa4351*0x2,'right'),_0x32b57e=_0x397151['y']+_0x14b673,this['changeTextColor'](ColorManager[_0x26986b(0x2bd)]()),this[_0x26986b(0x34d)](_0x397151['x'],_0x32b57e,_0x397151[_0x26986b(0x2ec)],_0x2a9784,0x2),this[_0x26986b(0x35c)](TextManager[_0x26986b(0x261)],_0x397151['x'],_0x32b57e,_0x397151[_0x26986b(0x2ec)],_0x26986b(0x36e)),this[_0x26986b(0x170)](),_0x32b57e+=_0x2a9784;const _0x321af2=_0x1dfdb1[_0x26986b(0x3bb)]();this[_0x26986b(0x34d)](_0x397151['x'],_0x32b57e,_0x397151[_0x26986b(0x2ec)],this[_0x26986b(0x3b3)]-_0x32b57e),this[_0x26986b(0x2d1)](_0x321af2,_0x397151['x']+_0xa4351,_0x32b57e,_0x397151['width']-_0xa4351*0x2);},Window_StatusData[_0x3d06b3(0x2c5)]['drawParameters']=function(){const _0x36b440=_0x3d06b3,_0x921d01=this[_0x36b440(0x284)](),_0x32a408=this[_0x36b440(0x2e8)](),_0x46f8c5=this[_0x36b440(0x23d)](),_0x176a7e=this[_0x36b440(0x273)]()*0x2,_0x169361=Math['floor'](this[_0x36b440(0x3af)]/0x3);let _0x57a374=0x0,_0x398dc4=0x0,_0x3b0e27=0x0;this[_0x36b440(0x27b)](0x0,this[_0x36b440(0x3af)]/0x2);let _0x40d922=new Rectangle(0x0,0x0,_0x169361,this[_0x36b440(0x3b3)]);const _0x4823e2=this[_0x36b440(0x14f)](0x1),_0x533332=this[_0x36b440(0x14f)](0x2),_0x220798=this[_0x36b440(0x14f)](0x3),_0x2eaad6=Math[_0x36b440(0x29e)](_0x4823e2[_0x36b440(0x2d2)],_0x533332[_0x36b440(0x2d2)],_0x220798[_0x36b440(0x2d2)]),_0x56417a=_0x40d922[_0x36b440(0x2ec)]-_0x176a7e*0x2-this[_0x36b440(0x34c)](_0x36b440(0x271)),_0x42a799=Math[_0x36b440(0x29e)]((this['innerHeight']-_0x2eaad6*_0x921d01)/0x2,0x0);_0x57a374=_0x40d922['x']+_0x176a7e,_0x398dc4=_0x42a799,_0x3b0e27=_0x40d922[_0x36b440(0x2ec)]-_0x176a7e*0x2;if(_0x398dc4!==0x0)this[_0x36b440(0x34d)](_0x40d922['x'],0x0,_0x40d922[_0x36b440(0x2ec)],_0x398dc4);for(const _0xae6428 of _0x4823e2){this[_0x36b440(0x34d)](_0x40d922['x'],_0x398dc4,_0x40d922[_0x36b440(0x2ec)],_0x921d01),this['drawParamName'](_0xae6428,_0x57a374,_0x398dc4,_0x56417a),this[_0x36b440(0x155)](_0xae6428,_0x57a374,_0x398dc4,_0x3b0e27),_0x398dc4+=_0x921d01;}this[_0x36b440(0x34d)](_0x40d922['x'],_0x398dc4,_0x40d922['width'],this[_0x36b440(0x3b3)]-_0x398dc4),_0x40d922['x']+=_0x40d922[_0x36b440(0x2ec)],_0x57a374=_0x40d922['x']+_0x176a7e,_0x398dc4=_0x42a799,_0x3b0e27=_0x40d922[_0x36b440(0x2ec)]-_0x176a7e*0x2;if(_0x398dc4!==0x0)this[_0x36b440(0x34d)](_0x40d922['x'],0x0,_0x40d922[_0x36b440(0x2ec)],_0x398dc4);for(const _0x5f0723 of _0x533332){this[_0x36b440(0x34d)](_0x40d922['x'],_0x398dc4,_0x40d922[_0x36b440(0x2ec)],_0x921d01),this[_0x36b440(0x1d1)](_0x5f0723,_0x57a374,_0x398dc4,_0x56417a),this[_0x36b440(0x155)](_0x5f0723,_0x57a374,_0x398dc4,_0x3b0e27),_0x398dc4+=_0x921d01;}this[_0x36b440(0x34d)](_0x40d922['x'],_0x398dc4,_0x40d922[_0x36b440(0x2ec)],this[_0x36b440(0x3b3)]-_0x398dc4),_0x40d922['x']+=_0x40d922[_0x36b440(0x2ec)],_0x40d922[_0x36b440(0x2ec)]=this[_0x36b440(0x3af)]-_0x40d922['x'],_0x57a374=_0x40d922['x']+_0x176a7e,_0x398dc4=_0x42a799,_0x3b0e27=_0x40d922[_0x36b440(0x2ec)]-_0x176a7e*0x2;if(_0x398dc4!==0x0)this[_0x36b440(0x34d)](_0x40d922['x'],0x0,_0x40d922[_0x36b440(0x2ec)],_0x398dc4);for(const _0x523e52 of _0x220798){this[_0x36b440(0x34d)](_0x40d922['x'],_0x398dc4,_0x40d922[_0x36b440(0x2ec)],_0x921d01),this[_0x36b440(0x1d1)](_0x523e52,_0x57a374,_0x398dc4,_0x56417a),this[_0x36b440(0x155)](_0x523e52,_0x57a374,_0x398dc4,_0x3b0e27),_0x398dc4+=_0x921d01;}this[_0x36b440(0x34d)](_0x40d922['x'],_0x398dc4,_0x40d922[_0x36b440(0x2ec)],this[_0x36b440(0x3b3)]-_0x398dc4);},Window_StatusData[_0x3d06b3(0x2c5)][_0x3d06b3(0x17a)]=function(){const _0x58bc3b=_0x3d06b3,_0x1b4959=Window_StatusData['traitCol1'],_0x52f924=Window_StatusData[_0x58bc3b(0x160)],_0x2466df=this[_0x58bc3b(0x284)](),_0x28594b=this['_actor'],_0x20a881=this[_0x58bc3b(0x273)](),_0x59ea51=this['innerHeight']/Math['max'](_0x1b4959['length'],_0x52f924[_0x58bc3b(0x2d2)])-_0x2466df,_0x544bfb=this[_0x58bc3b(0x3af)]/0x2;let _0x4bb28c=0x0,_0x162d4d=0x0;this[_0x58bc3b(0x27b)](0x0,_0x544bfb);for(const _0x1f76bb of _0x1b4959){const _0x2d70b9=DataManager['traitSetType'](_0x1f76bb),_0x32c4da=_0x28594b[_0x58bc3b(0x1be)](_0x1f76bb);this[_0x58bc3b(0x34d)](0x0,_0x162d4d,_0x544bfb,_0x2466df,0x2);const _0x2d3c91=_0x58bc3b(0x203)['format'](_0x2d70b9['Label'],_0x32c4da[_0x58bc3b(0x1d3)]);this['drawTextEx'](_0x2d3c91,_0x20a881,_0x162d4d,_0x544bfb-_0x20a881*0x2),_0x162d4d+=_0x2466df,this[_0x58bc3b(0x374)](),this[_0x58bc3b(0x34d)](0x0,_0x162d4d,_0x544bfb,_0x59ea51),this[_0x58bc3b(0x2d1)](_0x32c4da[_0x58bc3b(0x314)],_0x20a881,_0x162d4d,_0x544bfb-_0x20a881*0x2),_0x162d4d+=_0x59ea51,this[_0x58bc3b(0x1e7)]();}this['innerHeight']-_0x162d4d>0x0&&this['drawItemDarkRect'](0x0,_0x162d4d,_0x544bfb,this[_0x58bc3b(0x3b3)]-_0x162d4d);_0x162d4d=0x0;for(const _0x28b2fe of _0x52f924){const _0x215616=DataManager[_0x58bc3b(0x2bc)](_0x28b2fe),_0x5b3952=_0x28594b['traitSet'](_0x28b2fe);this['drawItemDarkRect'](_0x544bfb,_0x162d4d,_0x544bfb,_0x2466df,0x2);const _0x570207=_0x58bc3b(0x203)['format'](_0x215616[_0x58bc3b(0x1cd)],_0x5b3952[_0x58bc3b(0x1d3)]);this[_0x58bc3b(0x2d1)](_0x570207,_0x544bfb+_0x20a881,_0x162d4d,_0x544bfb-_0x20a881*0x2),_0x162d4d+=_0x2466df,this[_0x58bc3b(0x374)](),this[_0x58bc3b(0x34d)](_0x544bfb,_0x162d4d,_0x544bfb,_0x59ea51),this[_0x58bc3b(0x2d1)](_0x5b3952[_0x58bc3b(0x314)],_0x544bfb+_0x20a881,_0x162d4d,_0x544bfb-_0x20a881*0x2),_0x162d4d+=_0x59ea51,this[_0x58bc3b(0x1e7)]();}this[_0x58bc3b(0x3b3)]-_0x162d4d>0x0&&this[_0x58bc3b(0x34d)](_0x544bfb,_0x162d4d,_0x544bfb,this[_0x58bc3b(0x3b3)]-_0x162d4d);},Window_StatusData['prototype']['getElementIDs']=function(){const _0x5cbb96=_0x3d06b3,_0xa4c14=[0x0][_0x5cbb96(0x229)](this['getExcludedElementIDs']());return[...Array($dataSystem[_0x5cbb96(0x2f4)][_0x5cbb96(0x2d2)])[_0x5cbb96(0x235)]()][_0x5cbb96(0x1c5)](_0x587b72=>!_0xa4c14['includes'](_0x587b72));},Window_StatusData[_0x3d06b3(0x2c5)]['getExcludedElementIDs']=function(){const _0x3fc9c8=_0x3d06b3;return[0x0][_0x3fc9c8(0x229)](VisuMZ[_0x3fc9c8(0x285)][_0x3fc9c8(0x338)]['StatusMenu'][_0x3fc9c8(0x1b5)]);},Window_StatusData[_0x3d06b3(0x2c5)][_0x3d06b3(0x214)]=function(){const _0x4f81fd=_0x3d06b3,_0x2e3f13=[0x0][_0x4f81fd(0x229)](this['getExcludedElementIDs']());let _0x389872=this['getElementIDsColRaw'](0x1);return _0x389872['length']<=0x0&&(_0x389872=this[_0x4f81fd(0x1f8)](0x2),_0x389872['length']<=0x0&&(_0x389872=this['getElementIDs']())),_0x389872['filter'](_0x3f090c=>!_0x2e3f13[_0x4f81fd(0x1f2)](_0x3f090c));},Window_StatusData[_0x3d06b3(0x2c5)][_0x3d06b3(0x340)]=function(){const _0x1cadbd=_0x3d06b3,_0x55737a=[0x0][_0x1cadbd(0x229)](this[_0x1cadbd(0x2ae)]());let _0x24352f=this[_0x1cadbd(0x1f8)](0x2);return _0x24352f[_0x1cadbd(0x1c5)](_0x2e02bb=>!_0x55737a[_0x1cadbd(0x1f2)](_0x2e02bb));},Window_StatusData[_0x3d06b3(0x2c5)][_0x3d06b3(0x1f8)]=function(_0x46346d){const _0x45f0ae=_0x3d06b3,_0x4d96db=[0x0][_0x45f0ae(0x229)](this['getExcludedElementIDs']());let _0x74b2b=VisuMZ[_0x45f0ae(0x285)][_0x45f0ae(0x338)]['StatusMenu'][_0x45f0ae(0x1ea)['format'](_0x46346d)]??[];return _0x74b2b[_0x45f0ae(0x1c5)](_0x8ab0de=>!_0x4d96db[_0x45f0ae(0x1f2)](_0x8ab0de));},Window_StatusData['prototype'][_0x3d06b3(0x15c)]=function(){const _0x2e4721=_0x3d06b3,_0x59bf89=this[_0x2e4721(0x284)](),_0xa9e1f8=this[_0x2e4721(0x173)],_0x46b160=this[_0x2e4721(0x273)](),_0xdd23da=_0x2e4721(0x203),_0x4b5511=DataManager[_0x2e4721(0x2bc)](_0x2e4721(0x24f)),_0x4ce3e=_0xa9e1f8[_0x2e4721(0x1be)](_0x2e4721(0x24f)),_0x9964f5=DataManager[_0x2e4721(0x2bc)]('SubElement'),_0x1384a7=_0xa9e1f8[_0x2e4721(0x1be)](_0x2e4721(0x2ce)),_0x369d34=this[_0x2e4721(0x3b3)]/Math[_0x2e4721(0x29e)](Window_StatusData[_0x2e4721(0x158)]['length'],Window_StatusData[_0x2e4721(0x160)][_0x2e4721(0x2d2)])-_0x59bf89;let _0x55f5a7=0x0,_0x43e48b=0x0,_0x539c58=this['innerWidth']/0x2;this['drawActorGraphic'](0x0,_0x539c58);(_0x4b5511[_0x2e4721(0x163)]||_0x9964f5[_0x2e4721(0x163)])&&(this['drawItemDarkRect'](_0x55f5a7,_0x43e48b,_0x539c58,_0x59bf89,0x2),this[_0x2e4721(0x34d)](_0x539c58,_0x43e48b,_0x539c58,_0x59bf89,0x2),_0x4b5511[_0x2e4721(0x163)]&&this[_0x2e4721(0x2d1)](_0xdd23da['format'](_0x4b5511['Label'],_0x4ce3e[_0x2e4721(0x1d3)]),_0x46b160,_0x43e48b,_0x539c58-_0x46b160*0x2),_0x9964f5[_0x2e4721(0x163)]&&this[_0x2e4721(0x2d1)](_0xdd23da['format'](_0x9964f5[_0x2e4721(0x1cd)],_0x1384a7[_0x2e4721(0x1d3)]),_0x539c58+_0x46b160,_0x43e48b,_0x539c58-_0x46b160*0x2),_0x43e48b+=_0x59bf89,this['setDescriptionFontSizeToTraitSet'](),this[_0x2e4721(0x34d)](_0x55f5a7,_0x43e48b,_0x539c58,_0x369d34),this[_0x2e4721(0x34d)](_0x539c58,_0x43e48b,_0x539c58,_0x369d34),_0x4b5511[_0x2e4721(0x163)]&&this[_0x2e4721(0x2d1)](_0x4ce3e[_0x2e4721(0x314)],_0x46b160,_0x43e48b,_0x539c58-_0x46b160*0x2),_0x9964f5['Visible']&&this[_0x2e4721(0x2d1)](_0x1384a7[_0x2e4721(0x314)],_0x539c58+_0x46b160,_0x43e48b,_0x539c58-_0x46b160*0x2),this[_0x2e4721(0x1e7)](),this['resetFontSettings'](),_0x43e48b+=_0x369d34);const _0x5844a0=_0x43e48b,_0x1cf5c3=this[_0x2e4721(0x214)](),_0x13b8e7=this[_0x2e4721(0x340)]();let _0x319ba5;_0x13b8e7[_0x2e4721(0x2d2)]>0x0?_0x319ba5=['Resist','Resist','Bonus',_0x2e4721(0x175)]:_0x319ba5=[_0x2e4721(0x354),_0x2e4721(0x175)];const _0x44faaa=Math[_0x2e4721(0x29e)](_0x1cf5c3[_0x2e4721(0x2d2)],_0x13b8e7[_0x2e4721(0x2d2)],0x1),_0x39b22a=_0x319ba5[_0x2e4721(0x2d2)];this[_0x2e4721(0x34d)](_0x539c58*0x0,_0x43e48b,_0x539c58,_0x59bf89,0x2),this[_0x2e4721(0x34d)](_0x539c58*0x1,_0x43e48b,_0x539c58,_0x59bf89,0x2),this[_0x2e4721(0x2f6)](ColorManager[_0x2e4721(0x2bd)]()),this['drawText'](TextManager['statusMenuDmgReceive'],_0x539c58*0x0,_0x43e48b,_0x539c58,'center'),this['drawText'](TextManager[_0x2e4721(0x31e)],_0x539c58*0x1,_0x43e48b,_0x539c58,_0x2e4721(0x36e)),_0x43e48b+=_0x59bf89,this['setDescriptionFontSizeToTraitSet']();const _0x37f51d=this[_0x2e4721(0x2cc)]('\x20')[_0x2e4721(0x1cb)];for(let _0x3cf5cf=0x0;_0x3cf5cf<_0x44faaa;_0x3cf5cf++){for(let _0x5ccce8=0x0;_0x5ccce8<_0x39b22a;_0x5ccce8++){const _0x5190be=this[_0x2e4721(0x3af)]/_0x39b22a;this[_0x2e4721(0x34d)](_0x5190be*_0x5ccce8,_0x43e48b,_0x5190be,_0x37f51d);let _0x3f25c1=_0x1cf5c3[_0x3cf5cf];_0x39b22a===0x4&&(_0x3f25c1=_0x5ccce8%0x2===0x0?_0x1cf5c3[_0x3cf5cf]:_0x13b8e7[_0x3cf5cf]);if(!_0x3f25c1)continue;const _0x427471=$dataSystem[_0x2e4721(0x2f4)][_0x3f25c1];this[_0x2e4721(0x2d1)](_0x427471,_0x5190be*(_0x5ccce8+0x1/0x3)+_0x46b160,_0x43e48b,_0x5190be*0x2/0x3);const _0x38ccd8=_0x319ba5[_0x5ccce8];this['resetFontSettings']();let _0x467487='';if(_0x38ccd8===_0x2e4721(0x354)){const _0x34cd8b=_0xa9e1f8['elementRate'](_0x3f25c1),_0x3bfc3f=(_0x34cd8b-0x1)*-0x1;this[_0x2e4721(0x2f6)](ColorManager['paramchangeTextColor'](_0x3bfc3f)),_0x467487='%1%'[_0x2e4721(0x2e2)](Math[_0x2e4721(0x362)](_0x3bfc3f*0x64));if(_0xa9e1f8['getAbsorbedElements']()[_0x2e4721(0x1f2)](_0x3f25c1))this[_0x2e4721(0x2f6)](ColorManager[_0x2e4721(0x1ae)]()),_0x467487=TextManager[_0x2e4721(0x3ac)][_0x2e4721(0x2e2)](Math['round'](_0x34cd8b*0x64));else{if(_0x34cd8b>0x1)_0x467487='%1'['format'](_0x467487);else _0x34cd8b<=0x1&&(_0x467487=_0x2e4721(0x313)[_0x2e4721(0x2e2)](_0x467487));}}else{if(_0x38ccd8==='Bonus'){const _0x1d6f0a=_0xa9e1f8['getDealtElementPlus'](_0x3f25c1),_0x80f3f8=_0xa9e1f8[_0x2e4721(0x22f)](_0x3f25c1),_0x24abb7=_0xa9e1f8[_0x2e4721(0x35a)](_0x3f25c1),_0x50ae73=(0x1+_0x1d6f0a)*_0x80f3f8+_0x24abb7-0x1;this[_0x2e4721(0x2f6)](ColorManager[_0x2e4721(0x343)](_0x50ae73)),_0x467487='%1%'[_0x2e4721(0x2e2)](Math[_0x2e4721(0x362)](_0x50ae73*0x64));if(_0x50ae73>=0x0)_0x467487=_0x2e4721(0x313)[_0x2e4721(0x2e2)](_0x467487);}}this['contents'][_0x2e4721(0x35c)](_0x467487,_0x5190be*_0x5ccce8,_0x43e48b,_0x5190be/0x3-_0x46b160,_0x37f51d,'right');}_0x43e48b+=_0x37f51d;}for(let _0x370446=0x0;_0x370446<_0x39b22a;_0x370446++){const _0x115439=this['innerWidth']/_0x39b22a;this['drawItemDarkRect'](_0x115439*_0x370446,_0x43e48b,_0x115439,this[_0x2e4721(0x3b3)]-_0x43e48b);}},Window_StatusData[_0x3d06b3(0x2c5)]['getDataSystemTypesWidth']=function(_0x39acd7){const _0x337a63=_0x3d06b3;this[_0x337a63(0x32f)]();let _0x4d512a=0x0;for(const _0x29b49a of _0x39acd7){if(!_0x29b49a)continue;if(_0x29b49a['trim']()==='')continue;if(_0x29b49a[_0x337a63(0x25d)](/-----/i))continue;_0x4d512a=Math[_0x337a63(0x29e)](_0x4d512a,this['textSizeEx'](_0x29b49a[_0x337a63(0x2cd)]())[_0x337a63(0x2ec)]);}return _0x4d512a;},Window_StatusData[_0x3d06b3(0x2c5)][_0x3d06b3(0x275)]=function(){const _0x58e542=_0x3d06b3;if(this[_0x58e542(0x304)])return this[_0x58e542(0x304)];return this['_stypeWidth']=this[_0x58e542(0x19b)]($dataSystem['skillTypes']),this[_0x58e542(0x304)];},Window_StatusData[_0x3d06b3(0x2c5)][_0x3d06b3(0x1d0)]=function(){const _0x1dc866=_0x3d06b3;if(this[_0x1dc866(0x251)])return this[_0x1dc866(0x251)];return this[_0x1dc866(0x251)]=this[_0x1dc866(0x19b)]($dataSystem[_0x1dc866(0x390)]),this[_0x1dc866(0x251)];},Window_StatusData['prototype']['atypeWidth']=function(){const _0x2a1421=_0x3d06b3;if(this['_atypeWidth'])return this[_0x2a1421(0x349)];return this[_0x2a1421(0x349)]=this['getDataSystemTypesWidth']($dataSystem[_0x2a1421(0x1d7)]),this[_0x2a1421(0x349)];},Window_StatusData['prototype']['drawAccess']=function(){const _0x496c57=_0x3d06b3,_0x202231=this['lineHeight'](),_0x2a9b17=this[_0x496c57(0x173)],_0x10a44e=Math[_0x496c57(0x1f6)](this[_0x496c57(0x3af)]/0x3);let _0x1d39e5=0x0,_0x2370e0=0x0;this[_0x496c57(0x27b)](0x0,this['innerWidth']/0x2);let _0x51a1e9=new Rectangle(0x0,0x0,_0x10a44e,this['innerHeight']);_0x1d39e5=_0x51a1e9['x'],_0x2370e0=0x0,this['resetFontSettings'](),this[_0x496c57(0x34d)](_0x1d39e5,_0x2370e0,_0x51a1e9[_0x496c57(0x2ec)],_0x202231,0x2),this['changeTextColor'](ColorManager['systemColor']()),this[_0x496c57(0x35c)](TextManager[_0x496c57(0x191)],_0x1d39e5,_0x2370e0,_0x51a1e9[_0x496c57(0x2ec)],_0x496c57(0x36e)),_0x2370e0+=_0x202231;for(const _0x459073 of _0x2a9b17[_0x496c57(0x1b7)]()){this['drawItemDarkRect'](_0x1d39e5,_0x2370e0,_0x51a1e9['width'],_0x202231);if(_0x459073>0x0){const _0x4aa13f=$dataSystem[_0x496c57(0x1b7)][_0x459073],_0x237f8e=Math[_0x496c57(0x362)]((_0x51a1e9[_0x496c57(0x2ec)]-this[_0x496c57(0x275)]())/0x2);this[_0x496c57(0x2d1)](_0x4aa13f,_0x1d39e5+_0x237f8e,_0x2370e0,_0x51a1e9['width']-_0x237f8e*0x2);}_0x2370e0+=_0x202231;}this[_0x496c57(0x34d)](_0x1d39e5,_0x2370e0,_0x51a1e9[_0x496c57(0x2ec)],this[_0x496c57(0x3b3)]-_0x2370e0),_0x51a1e9['x']+=_0x51a1e9[_0x496c57(0x2ec)],_0x1d39e5=_0x51a1e9['x'],_0x2370e0=0x0,this[_0x496c57(0x32f)](),this[_0x496c57(0x34d)](_0x1d39e5,_0x2370e0,_0x51a1e9[_0x496c57(0x2ec)],_0x202231,0x2),this[_0x496c57(0x2f6)](ColorManager[_0x496c57(0x2bd)]()),this['drawText'](TextManager['statusMenuWtype'],_0x1d39e5,_0x2370e0,_0x51a1e9[_0x496c57(0x2ec)],_0x496c57(0x36e)),_0x2370e0+=_0x202231;for(const _0x16fa94 of _0x2a9b17['weaponTypes']()){this['drawItemDarkRect'](_0x1d39e5,_0x2370e0,_0x51a1e9[_0x496c57(0x2ec)],_0x202231);if(_0x16fa94>0x0){const _0x347749=$dataSystem[_0x496c57(0x390)][_0x16fa94],_0x1ebd36=Math['round']((_0x51a1e9[_0x496c57(0x2ec)]-this['wtypeWidth']())/0x2);this[_0x496c57(0x2d1)](_0x347749,_0x1d39e5+_0x1ebd36,_0x2370e0,_0x51a1e9[_0x496c57(0x2ec)]-_0x1ebd36*0x2);}_0x2370e0+=_0x202231;}this[_0x496c57(0x34d)](_0x1d39e5,_0x2370e0,_0x51a1e9['width'],this[_0x496c57(0x3b3)]-_0x2370e0),_0x51a1e9['x']+=_0x51a1e9[_0x496c57(0x2ec)],_0x1d39e5=_0x51a1e9['x'],_0x2370e0=0x0,_0x51a1e9[_0x496c57(0x2ec)]=this[_0x496c57(0x3af)]-_0x51a1e9['x'],this[_0x496c57(0x32f)](),this['drawItemDarkRect'](_0x1d39e5,_0x2370e0,_0x51a1e9[_0x496c57(0x2ec)],_0x202231,0x2),this['changeTextColor'](ColorManager[_0x496c57(0x2bd)]()),this[_0x496c57(0x35c)](TextManager[_0x496c57(0x2ed)],_0x1d39e5,_0x2370e0,_0x51a1e9[_0x496c57(0x2ec)],_0x496c57(0x36e)),_0x2370e0+=_0x202231;for(const _0x1b0c56 of _0x2a9b17[_0x496c57(0x1d7)]()){this['drawItemDarkRect'](_0x1d39e5,_0x2370e0,_0x51a1e9[_0x496c57(0x2ec)],_0x202231);if(_0x1b0c56>0x0){const _0x465994=$dataSystem['armorTypes'][_0x1b0c56],_0x3e7e13=Math[_0x496c57(0x362)]((_0x51a1e9[_0x496c57(0x2ec)]-this[_0x496c57(0x18c)]())/0x2);this['drawTextEx'](_0x465994,_0x1d39e5+_0x3e7e13,_0x2370e0,_0x51a1e9[_0x496c57(0x2ec)]-_0x3e7e13*0x2);}_0x2370e0+=_0x202231;}this[_0x496c57(0x34d)](_0x1d39e5,_0x2370e0,_0x51a1e9[_0x496c57(0x2ec)],this[_0x496c57(0x3b3)]-_0x2370e0);};