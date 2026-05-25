//=============================================================================
// VisuStella MZ - Visual Parallaxes
// VisuMZ_4_VisualParallaxes.js
//=============================================================================

var Imported = Imported || {};
Imported.VisuMZ_4_VisualParallaxes = true;

var VisuMZ = VisuMZ || {};
VisuMZ.VisualParallaxes = VisuMZ.VisualParallaxes || {};
VisuMZ.VisualParallaxes.version = 1.13;

//=============================================================================
 /*:
 * @target MZ
 * @plugindesc [RPG Maker MZ] [Tier 4] [Version 1.13] [VisualParallaxes]
 * @author VisuStella
 * @url http://www.yanfly.moe/wiki/Visual_Parallaxes_VisuStella_MZ
 * @orderAfter VisuMZ_0_CoreEngine
 *
 * @help
 * ============================================================================
 * Introduction
 * ============================================================================
 *
 * By default, RPG Maker MZ only allows each map to have one parallax. Such a
 * limit makes it difficult to create different layers of objects to portray
 * distance and the like. This plugin will remedy that by allowing you to add
 * an unlimited amount of parallaxes per map alongside many controls to make
 * the parallaxes more vivid.
 * 
 * A restricted parallax area system is also added to this plugin to make
 * parallaxes appear only within certain regions and/or terrain tags. This way,
 * you can utilize parallaxes as masked layers for water surfaces and the like.
 * 
 * To make the most out of this, with the tilesets are formatted properly,
 * reflective water and reflective solid surfaces are also new effects added
 * through this plugin. Water effects will show ripples while reflective solid
 * surfaces are static.
 *
 * Features include all (but not limited to) the following:
 * 
 * * Add, change, and/or remove parallaxes through map notetags.
 * * Lots of customization options for each of the parallaxes.
 * * Limit where parallaxes can be displayed on the map through regions and/or
 *   terrain tags.
 * * Create reflective surfaces for water and solid ground as long as the
 *   tilesets have been formatted properly.
 * * Use Plugin Commands midway through the game to add, change, fade, and/or
 *   remove parallaxes as needed.
 *
 * ============================================================================
 * Requirements
 * ============================================================================
 *
 * This plugin is made for RPG Maker MZ. This will not work in other iterations
 * of RPG Maker.
 *
 * ------ Recommended Plugin List ------
 *
 * * Pixi JS Filters*
 *
 * This plugin recommends the above listed plugins to be installed inside your
 * game's Plugin Manager list in order to work. You can use this plugin without
 * it, but there will be features missing.
 * 
 * *Note* You can download the Pixi JS Filters plugin library from the below
 * URL or from the Action Sequence Impact product page. Install it as a
 * Tier 0 plugin.
 * 
 * *Note2* Pixi JS Filters perform differently on different machines/devices.
 * Please understand that this is outside of VisuStella's control.
 * 
 * URL: https://filters.pixijs.download/v3.1.0/pixi-filters.js
 *
 * ------ Tier 4 ------
 *
 * This plugin is a Tier 4 plugin. Place it under other plugins of lower tier
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
 * Parallaxes
 * 
 * The map editor's inherent parallax will remain untouched and unable to
 * utilize the extra features provided by this plugin. However, you can just
 * simply create a new parallax layer over it and hide it from view if needed.
 * 
 * Each of the parallaxes added through this plugin's notetags and/or commands
 * are assigned an ID. Referring back to the ID later will allow you to update
 * and/or remove that parallax when needed.
 * 
 * The new parallaxes are created on a separate layer from the map editor's
 * parallax and isn't included with the new parallaxes. Layers with higher ID's
 * will appear above layers with lower ID's.
 * 
 * However, other than that, all of the new parallaxes follow the same rules as
 * the map editor's parallax. This means that they will not appear above the
 * tile map and require transparent tiles to be seen. They will also scroll the
 * same way the original parallax does to provide consistency.
 *
 * ---
 * 
 * Regions and Terrain Tags
 * 
 * If you don't want a parallax to appear for the whole entire background and
 * want to confine them to certain areas of the map, you can assign regions or
 * terrain tags for them to appear in.
 * 
 * Only the parts of the map marked by the designated regions and/or terrain
 * tags will reveal the parallax. Those parts will be little squares each,
 * equal to the size of a tile. They have hard borders and do not have any
 * smoothing options in order to display the parallax tiles accurately.
 * 
 * Each parallax layer can have their own custom regions and/or terrain tags to
 * appear in. These can be adjusted through the notetag settings or through the
 * Plugin Commands provided by this plugin. Parallax layers can be limited to
 * multiple regions and/or terrain tags at the same time.
 * 
 * WARNING: This will cause longer load times on larger maps and affect their
 * performance. We highly recommend that you don't use this feature on maps
 * larger than 120 tiles wide or tall. However, this value can vary from device
 * to device.
 * 
 * ---
 * 
 * Reflections
 * 
 * In order to use reflections, you need to use tiles that are semi-transparent
 * or fully transparent. For example, water reflections need to come from tiles
 * that have been modified to be semi-transparent or fully transparent. If the
 * tile is completely opaque, the reflection will not show through. This rule
 * also applies to ground surfaces.
 * 
 * *NOTE*: This effect does not work on looping maps.
 * 
 * By default, water-based reflections are assigned the Terrain Tag 1 and solid
 * ground reflections are assigned the Terrain Tag 2. In order to make water
 * tiles show water reflections, you need to mark their tiles in the database's
 * tilesets with 1's. To mark reflective ground surfaces, mark them with 2's.
 * If the tiles are not tagged properly, the reflections will not be shown.
 * 
 * In the Plugin Parameters and notetags, you can decide if the reflections
 * will appear above the parallaxes or below them. By default, they will appear
 * above them. However, if you change them to appear below the parallaxes, then
 * pay attention to the opacity level of the parallaxes. If the parallaxes are
 * too opaque, you will barely see the reflection.
 * 
 * Once again, both water and ground tiles need to be semi-transparent or fully
 * transparent in order for reflections to be seen.
 * 
 * WARNING: This will cause longer load times on larger maps and affect their
 * performance. We highly recommend that you don't use this feature on maps
 * larger than 120 tiles wide or tall. However, this value can vary from device
 * to device.
 * 
 * ---
 * 
 * Not For Battle
 * 
 * For clarification, the VisuStella MZ Visual Parallaxes plugin is NOT made
 * for battle. There's a separate plugin for that called Visual Battle
 * Environment. The reason why parallaxes aren't made for battle is because the
 * way parallaxes are handled in map vary from how they would be handled in
 * battle. Using the Visual Parallax Plugin Commands will only alter the
 * parallax appearances when the player finishes battle.
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
 * Pixi JS Filters
 *
 * If the game project has Pixi JS Filters installed, then water reflections
 * will have a ripple effect. This is based off the Pixi JS ReflectionFilter
 * and will follow their rules. There are a couple of settings that can be
 * adjusted to customize the reflective properties.
 * 
 * Boundary: Vertical position of the reflection point, default is 50% (middle)
 * smaller numbers produce a larger reflection, larger numbers produce a
 * smaller reflection. This also means that reflections closer to the edges
 * will also have a different visual ripple effect than those towards the
 * middle of the reflection.
 * 
 * Amplitude: Starting and ending amplitude of waves allows you to control the
 * intensity of the reflection ripples. Use larger numbers for more intensity.
 * You have control over the values for the start and end values.
 * 
 * Wavelength: Starting and ending wavelength values determine the size of the
 * ripples for the reflection filter. Use larger numbers for larger wave sizes.
 * You have control over the values for the start and end values.
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
 * === Parallax-Related Notetags ===
 * 
 * ---
 *
 * <Parallax id Settings>
 *  Name: filename
 *  optional property
 *  optional property
 *  optional property
 * </Parallax id Settings>
 *
 * - Used for: Map Notetags
 * - Creates a regular parallax layer for this map by default.
 * - Replace 'id' with a number value to assign to the parallax.
 *   - Plugin Commands will refer to this ID for changes and removal.
 * - The 'Name' setting is required. Without it, no parallax will be made.
 *   - Replace 'filename' with the filename of the image you want to use as
 *     a parallax found in the game project's img/parallaxes/ folder.
 *   - Do not include the file extension.
 * - Insert as many of the optional properties as you want. You can find a list
 *   of them in the section below.
 *
 * ---
 *
 * <Water Parallax id Settings>
 *  Name: filename
 *  optional property
 *  optional property
 *  optional property
 * </Water Parallax id Settings>
 *
 * - Used for: Map Notetags
 * - Creates a water-based parallax layer for this map by default.
 *   - This will utilize the water reflection properties and will only appear
 *     on water-marked regions and terrain tags.
 * - Replace 'id' with a number value to assign to the parallax.
 *   - Plugin Commands will refer to this ID for changes and removal.
 * - The 'Name' setting is required. Without it, no parallax will be made.
 *   - Replace 'filename' with the filename of the image you want to use as
 *     a parallax found in the game project's img/parallaxes/ folder.
 *   - Do not include the file extension.
 * - Insert as many of the optional properties as you want. You can find a list
 *   of them in the section below.
 * - WARNING: This WILL cause longer load times on larger maps.
 *
 * ---
 *
 * <Solid Parallax id Settings>
 *  Name: filename
 *  optional property
 *  optional property
 *  optional property
 * </Solid Parallax id Settings>
 *
 * - Used for: Map Notetags
 * - Creates a solid-based parallax layer for this map by default.
 *   - This will utilize the solid reflection properties and will only appear
 *     on solid-marked regions and terrain tags.
 * - Replace 'id' with a number value to assign to the parallax.
 *   - Plugin Commands will refer to this ID for changes and removal.
 * - The 'Name' setting is required. Without it, no parallax will be made.
 *   - Replace 'filename' with the filename of the image you want to use as
 *     a parallax found in the game project's img/parallaxes/ folder.
 *   - Do not include the file extension.
 * - Insert as many of the optional properties as you want. You can find a list
 *   of them in the section below.
 * - WARNING: This WILL cause longer load times on larger maps.
 *
 * ---
 * 
 * -=-=- Optional Properties -=-=-
 * 
 * Replace the 'optional property' segment of the notetags above with any of
 * the text below to acquire their effects. You can add/remove as many of the
 * optional properties as you need.
 * 
 * ---
 * 
 * Horz Scroll: x
 * Vert Scroll: y
 * 
 * - This enables horizontal or vertical scrolling for the parallax.
 * - Replace 'x' or 'y' with a Number value to determine how fast they will
 *   scroll across the screen.
 * - Use a negative value to make them scroll the other way.
 * - These effects are mutually exclusive from the "Map Locked" property.
 * 
 * ---
 * 
 * Map Locked
 * 
 * - This will cause the parallax to only scroll when the map scrolls.
 * - This has the same effect as naming a parallax with "!" in front of
 *   its filename.
 * - If the filename used for this parallax has "!" in front of it, the
 *   Map Locked effect will be automatically turned on.
 * - These effect is mutually exclusive from the "Horz Scroll" and
 *   "Vert Scroll" properties.
 * 
 * ---
 * 
 * Opacity: x
 * Opacity: x%
 * 
 * - Changes the opacity level of the parallax.
 * - Replace 'x' with a number from 0 to 255 representing the opacity level.
 * - Replace 'x%' with a percentage from 0% to 100% representing the opacity.
 * 
 * ---
 * 
 * Blend Mode: Normal
 * Blend Mode: Additive
 * Blend Mode: Multiply
 * Blend Mode: Screen
 * 
 * - Sets the blend mode for the icon on the parallax.
 * - Use only one of the above.
 * 
 * ---
 * 
 * Hue: x
 * Hue Shift: x
 * 
 * - Changes the hue of the parallax to 'x' so that you don't need to create
 *   multiple copies of the files with different colors.
 * - Replace 'x' with a number value between 0 and 360.
 * - If the "Hue Shift" property is also used, then adjust the hue of the
 *   parallax each frame by 'x' amount.
 *   - 'x' can be positive or negative.
 * 
 * ---
 * 
 * Color Tone: red, green, blue, gray
 * 
 * - Changes the color tone or tint of the parallax.
 * - Replace 'red', 'green', 'blue' with a value between -255 and 255.
 * - Replace 'gray' with a value between 0 and 255.
 * 
 * ---
 * 
 * Region: id
 * Regions: id, id, id
 * 
 * - Forces the parallax to only become visible on tiles marked regions with a
 *   matching ID (alongside valid terrain tags).
 * - If this isn't used, then the parallax will be as large as the screen.
 * - Replace 'id' with a region ID between 1 and 255.
 *   - Region 0 is ignored and will not work.
 * - Insert multiple ID's to mark more tiles the parallax can appear on.
 * - WARNING: This WILL cause longer load times on larger maps.
 * 
 * ---
 * 
 * Terrain Tag: id
 * Terrain Tags: id, id, id
 * 
 * - Forces the parallax to only become visible on tiles marked terrain tags
 *   with a matching ID (alongside valid regions).
 * - If this isn't used, then the parallax will be as large as the screen.
 * - Replace 'id' with a terrain tag ID between 1 and 7.
 *   - Terrain tag 0 is ignored and will not work.
 * - Insert multiple ID's to mark more tiles the parallax can appear on.
 * - WARNING: This WILL cause longer load times on larger maps.
 * 
 * ---
 * 
 * === Event Reflection-Related Notetags ===
 * 
 * ---
 *
 * <No Reflection>
 *
 * - Used for: Event Notetags and Event Page Comment Tags
 * - This will cause the event to not show any reflection on reflective tiles.
 * - If this is placed in a notetag, the effect will be present across
 *   all event pages used.
 * - If this is placed inside a page's comment, the effect will only occur
 *   if that event page is currently active.
 *
 * ---
 * 
 * === Reflection-Related Notetags ===
 * 
 * In order to use reflections, you need to use tiles that are semi-transparent
 * or fully transparent. For example, water reflections need to come from tiles
 * that have been modified to be semi-transparent or fully transparent. If the
 * tile is completely opaque, the reflection will not show through. This rule
 * also applies to ground surfaces.
 * 
 * ---
 *
 * <Water Reflection Region: id>
 * <Water Reflection Regions: id, id, id>
 *
 * <Solid Reflection Region: id>
 * <Solid Reflection Regions: id, id, id>
 *
 * - Used for: Map Notetags
 * - Sets the tiles marked by the region ID's to become reflective.
 * - This will override the Plugin Parameter settings for this map.
 *   - This does not add upon them.
 * - Replace 'id' with a region ID between 1 and 255.
 *   - Region 0 is ignored and will not work.
 * - Insert multiple ID's to mark more tiles the parallax can appear on.
 * - If these tags aren't used, refer to the settings found in the Plugin
 *   Parameter defaults.
 * - WARNING: This WILL cause longer load times on larger maps.
 *
 * ---
 *
 * <Water Reflection Terrain Tag: id>
 * <Water Reflection Terrain Tags: id, id, id>
 *
 * <Solid Reflection Terrain Tag: id>
 * <Solid Reflection Terrain Tags: id, id, id>
 *
 * - Used for: Map Notetags
 * - Sets the tiles marked by the terrain tag ID's to become reflective.
 * - This will override the Plugin Parameter settings for this map.
 *   - This does not add upon them.
 * - Replace 'id' with a terrain tag ID between 1 and 7.
 *   - Terrain Tag 0 is ignored and will not work.
 * - Insert multiple ID's to mark more tiles the parallax can appear on.
 * - If these tags aren't used, refer to the settings found in the Plugin
 *   Parameter defaults.
 * - WARNING: This WILL cause longer load times on larger maps.
 *
 * ---
 * 
 * <No Reflections>
 * 
 * - Used for: Map Notetags
 * - Disable water and map reflections on the current map.
 * 
 * ---
 *
 * <Water Reflection Top>
 * <Water Reflection Bottom>
 *
 * <Solid Reflection Top>
 * <Solid Reflection Bottom>
 *
 * - Used for: Map Notetags
 * - This will put the reflection layer either above all of the newly added
 *   parallaxes or below them.
 *   - If placed below, the reflection layer will not appear below the map
 *     editor's parallax layer.
 *   - If you change them to appear below the parallaxes, then pay attention to
 *     the opacity level of the parallaxes. If the parallaxes are too opaque,
 *     you will barely see the reflection.
 * - If these tags aren't used, refer to the settings found in the Plugin
 *   Parameter defaults.
 *
 * ---
 *
 * <Water Reflection Blur: x>
 * 
 * <Solid Reflection Blur: x>
 *
 * - Used for: Map Notetags
 * - Changes how much the water/solid tiles will blur the reflection for
 *   this map.
 * - Replace 'x' with a decimal Number value. Use a number between 0 and 1 for
 *   the best results.
 * - If these tags aren't used, refer to the settings found in the Plugin
 *   Parameter defaults.
 *
 * ---
 *
 * <Water Reflection Opacity: x>
 * <Water Reflection Opacity: x%>
 * 
 * <Solid Reflection Opacity: x>
 * <Solid Reflection Opacity: x%>
 *
 * - Used for: Map Notetags
 * - Changes the opacity level of the tile's reflection.
 * - Replace 'x' with a number from 0 to 255 representing the opacity level.
 * - Replace 'x%' with a percentage from 0% to 100% representing the opacity.
 * - If these tags aren't used, refer to the settings found in the Plugin
 *   Parameter defaults.
 *
 * ---
 * 
 * <Water Reflection Boundary: x>
 *
 * <Water Reflection Amplitude: start, end>
 * 
 * <Water Reflection Wavelength: start, end>
 *
 * - Used for: Map Notetags
 * - Requires Pixi JS Filters installed for the game project.
 * - These settings adjust the water reflection's ripple intensity.
 * - Replace Boundary's 'x' with a number value between 0 and 1.
 *   - Vertical position of the reflection point, default is 50% (middle)
 *     smaller numbers produce a larger reflection, larger numbers produce a
 *     smaller reflection. This also means that reflections closer to the edges
 *     will also have a different visual ripple effect than those towards the
 *     middle of the reflection.
 * - Replace Amplitude's 'start' and 'end' with number values representing how
 *   much to alter the intensity by.
 *   - Starting and ending amplitude of waves allows you to control the
 *     intensity of the reflection ripples.
 *   - Use larger numbers for more intensity.
 * - Replace Wavelength's 'start' and 'end' with number values representing the
 *   wave size.
 *   - Starting and ending wavelength values determine the size of the ripples
 *     for the reflection filter.
 *   - Use larger numbers for larger wave sizes.
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
 * === Parallax Plugin Commands ===
 * 
 * ---
 *
 * Parallax: Add/Change Settings
 * - Add/Change settings for target parallax.
 * - Does not alter the map editor's parallax.
 *
 *   Required:
 *
 *     ID:
 *     - What is the ID of this parallax to be added/changed?
 *
 *     Filename:
 *     - What is the filename of the parallax?
 *
 *     Type:
 *     - What kind of parallax is this going to be?
 *     - Normal
 *     - Water
 *     - Solid
 * 
 *   Optional Settings:
 * 
 *     Scrolling:
 *
 *       Map Lock?:
 *       - Lock the parallax to the map's scrolling?
 *       - Automatically enable if the filename starts with "!"
 *
 *       Loop Horizontally?:
 *       - Loop the parallax horizontally?
 *       - Does not work with Map Lock enabled.
 *
 *         Scroll:
 *         - What is the horizontal scroll speed?
 *         - Use a negative value to invert the direction.
 *
 *       Loop Vertically?:
 *       - Loop the parallax vertically?
 *       - Does not work with Map Lock enabled.
 *
 *         Scroll:
 *         - What is the vertical scroll speed?
 *         - Use a negative value to invert the direction.
 * 
 *     Appearance:
 *
 *       Opacity:
 *       - What is the opacity level for this parallax?
 *       - You may use JavaScript code.
 *
 *       Blend Mode:
 *       - What kind of blend mode do you wish to apply to the parallax?
 *       - You may use JavaScript code.
 *         - Normal
 *         - Additive
 *         - Multiply
 *         - Screen
 *
 *       Hue:
 *       - Do you wish to adjust this parallax's hue?
 *       - You may use JavaScript code.
 *
 *       Hue Shift:
 *       - How much do you want the hue to shift each frame?
 *       - You may use JavaScript code.
 *
 *       Color Tone:
 *       - What tone do you want for the parallax?
 *       - Format: [Red, Green, Blue, Gray]
 * 
 *     Location:
 *
 *       Regions:
 *       - Which regions will show this parallax?
 *       - Does not work with 0. Leave empty to ignore.
 *
 *       Terrain Tags:
 *       - Which terrain tags will show this parallax?
 *       - Does not work with 0. Leave empty to ignore.
 *
 * ---
 * 
 * Parallax: Fade Opacity
 * - Fades the target parallax(es) opacity to a different value.
 * 
 *   ID(s):
 *   - Target which parallax(es)?
 *   - Cannot target the map editor's parallax.
 * 
 *   Target Opacity:
 *   - What opacity level to this value (0-255).
 *   - You may use JavaScript code to determine the value.
 * 
 *   Duration:
 *   - How many frames should this change take?
 *   - You may use JavaScript code to determine the value.
 * 
 * ---
 *
 * Parallax: Remove
 * - Removes target parallax(es).
 *
 *   ID(s):
 *   - Remove which parallax(es)?
 *   - Cannot remove the map editor's parallax.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Water Reflection Settings
 * ============================================================================
 *
 * These are the default settings for water-based reflections.
 *
 * ---
 *
 * Markers
 * 
 *   Regions:
 *   - By default, which regions by default apply this reflection?
 *   - 0 is ignored.
 * 
 *   Terrain Tags:
 *   - By default, which terrain tags by default apply this reflection?
 *   - 0 is ignored.
 *
 * ---
 *
 * Positioning
 * 
 *   Above Parallaxes?:
 *   - Place water reflections above visual parallaxes?
 *
 * ---
 *
 * Appearance
 * 
 *   Blur Rate:
 *   - How much do you wish to blur this reflection?
 *   - Use a decimal number between 0 and 1.
 * 
 *   Opacity:
 *   - What is the default opacity for this reflection?
 *   - Use a value between 0 and 255.
 * 
 *   Water Boundary:
 *   - At which point is the water boundary?
 *   - Use a decimal number between 0 and 1.
 * 
 *   Amplitude Start:
 *   - What should be the starting amplitude value?
 * 
 *   Amplitude End:
 *   - What should be the ending amplitude value?
 * 
 *   Wavelength Start:
 *   - What should be the starting wavelength value?
 * 
 *   Wavelength End:
 *   - What should be the ending wavelength value?
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Solid Reflection Settings
 * ============================================================================
 *
 * These are the default settings for solid ground reflections.
 *
 * ---
 *
 * Markers
 * 
 *   Regions:
 *   - By default, which regions by default apply this reflection?
 *   - 0 is ignored.
 * 
 *   Terrain Tags:
 *   - By default, which terrain tags by default apply this reflection?
 *   - 0 is ignored.
 *
 * ---
 *
 * Positioning
 * 
 *   Above Parallaxes?:
 *   - Place water reflections above visual parallaxes?
 *
 * ---
 *
 * Appearance
 * 
 *   Blur Rate:
 *   - How much do you wish to blur this reflection?
 *   - Use a decimal number between 0 and 1.
 * 
 *   Opacity:
 *   - What is the default opacity for this reflection?
 *   - Use a value between 0 and 255.
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
 * Version 1.13: November 14, 2024
 * * Compatibility Update!
 * ** Added reflection compatibility with spawned events.
 * 
 * Version 1.12: July 18, 2024
 * * Optimization Update!
 * ** Plugin should run more optimized.
 * ** Uses a better algorithm to determine terrain tags.
 * 
 * Version 1.11: April 18, 2024
 * * Bug Fixes!
 * ** Fixed a bug where having a '!' at the start of a parallax file's name
 *    did not automatically incur map lock when done from plugin commands.
 *    Fix made by Arisu.
 * 
 * Version 1.10: November 16, 2023
 * * Compatibility Update!
 * ** Added compatibility functionality for future plugins.
 * 
 * Version 1.09: August 17, 2023
 * * Bug Fixes!
 * ** Fixed an error that would cause a crash upon using the "Return to Title
 *    Screen" event command with the "Event Title Screen" plugin installed. Fix
 *    made by Irina.
 * 
 * Version 1.08: May 18, 2023
 * * Bug Fixes!
 * ** Reflections should now work properly with VisuMZ_1_EventsMoveCore's
 *    latest version. Fix made by Arisu.
 * 
 * Version 1.07: August 4, 2022
 * * Compatibility Update!
 * ** Map Locked parallaxes now work better with smooth scroll.
 * 
 * Version 1.06: July 7, 2022
 * * Feature Update!
 * ** Blend modes are now revamped for the parallaxes to behave more like they
 *    do for pictures for better accuracy. Update made by Irina.
 * 
 * Version 1.05: January 27, 2022
 * * Optimization Update!
 * ** Plugin should run more optimized.
 * 
 * Version 1.04: January 6, 2022
 * * Compatibility Update
 * ** Added compatibility functionality for future plugins.
 * * Optimization Update!
 * ** Plugin should run more optimized.
 * 
 * Version 1.03: December 9, 2021
 * * Documentation Update!
 * ** Added section to "Major Changes" for clarification purposes:
 * *** Not For Battle
 * *** For clarification, the VisuStella MZ Visual Parallxes plugin is NOT made
 *     for battle. There's a separate plugin for that called Visual Battle
 *     Environment. The reason why parallaxes aren't made for battle is because
 *     the way parallaxes are handled in map vary from how they would be
 *     handled in battle. Using the Visual Parallaxes Plugin Commands will only
 *     alter the parallax appearances when the player finishes battle.
 * * Feature Update!
 * ** Added fail safes to prevent Plugin Command usage during battle to cause
 *    problems while inside battle test. Update made by Irina.
 * 
 * Version 1.02: June 25, 2021
 * * Compatibility Update
 * ** Added compatibility functionality for Event Title Scene.
 * 
 * Version 1.01: May 28, 2021
 * * Feature Update!
 * ** Fail safe added for those without Pixi JS Filters added.
 * ** Removed the VisuStella MZ Core Engine requirement.
 * * Optimization Update!
 * ** Plugin should run more optimized.
 *
 * Version 1.00 Official Release Date: March 12, 2021
 * * Finished Plugin!
 *
 * ============================================================================
 * End of Helpfile
 * ============================================================================
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ParallaxAddChangeSettings
 * @text Parallax: Add/Change Settings
 * @desc Add/Change settings for target parallax.
 * Does not alter the map editor's parallax.
 * 
 * @arg Required
 *
 * @arg id:num
 * @text ID
 * @parent Required
 * @type number
 * @min 1
 * @desc What is the ID of this parallax to be added/changed?
 * @default 1
 *
 * @arg filename:str
 * @text Filename
 * @parent Required
 * @type file
 * @dir img/parallaxes/
 * @desc What is the filename of the parallax?
 * @default >>>ATTENTION<<<
 *
 * @arg type:str
 * @text Type
 * @parent Required
 * @type select
 * @option Normal
 * @value normal
 * @option Water
 * @value water
 * @option Solid
 * @value solid
 * @desc What kind of parallax is this going to be?
 * @default normal
 *
 * @arg Optional:struct
 * @text Optional Settings
 * @type struct<Optional>
 * @desc Optional settings regarding Visual Parallaxes.
 * @default {"Scrolling":"","_parallaxZero:eval":"false","_parallaxLoopX:eval":"false","_parallaxSx:eval":"+0","_parallaxLoopY:eval":"false","_parallaxSy:eval":"+0","Appearance":"","opacity:eval":"255","blendMode:eval":"0","hue:eval":"0","hueShift:eval":"+0","colorTone:eval":"[0, 0, 0, 0]","Location":"","maskRegions:arraynum":"[]","maskTerrainTags:arraynum":"[]"}
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ParallaxFadeOpacity
 * @text Parallax: Fade Opacity
 * @desc Fades the target parallax(es) opacity to a different value.
 *
 * @arg list:arraynum
 * @text ID(s)
 * @type number[]
 * @min 1
 * @desc Target which parallax(es)?
 * Cannot target the map editor's parallax.
 * @default ["1"]
 *
 * @arg targetOpacity:eval
 * @text Target Opacity
 * @desc What opacity level to this value (0-255).
 * You may use JavaScript code to determine the value.
 * @default 255
 *
 * @arg opacityDuration:eval
 * @text Duration
 * @desc How many frames should this change take?
 * You may use JavaScript code to determine the value.
 * @default 60
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ParallaxRemove
 * @text Parallax: Remove
 * @desc Removes target parallax(es).
 *
 * @arg list:arraynum
 * @text ID(s)
 * @type number[]
 * @min 1
 * @desc Remove which parallax(es)?
 * Cannot remove the map editor's parallax.
 * @default ["1"]
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
 * @param VisualParallaxes
 * @default Plugin Parameters
 *
 * @param ATTENTION
 * @default READ THE HELP FILE
 *
 * @param BreakSettings
 * @text --------------------------
 * @default ----------------------------------
 *
 * @param WaterReflect:struct
 * @text Water Reflection Settings
 * @type struct<WaterReflect>
 * @desc These are the default settings for water-based reflections.
 * @default {"Markers":"","Regions:arraynum":"[]","TerrainTags:arraynum":"[\"1\"]","Positioning":"","Top:eval":"true","Appearance":"","Blur:num":"0.8","Opacity:num":"128","Boundary:num":"0.1","AmpStart:num":"2","AmpEnd:num":"4","WaveStart:num":"4","WaveEnd:num":"16"}
 *
 * @param SolidReflect:struct
 * @text Solid Reflection Settings
 * @type struct<SolidReflect>
 * @desc These are the default settings for solid ground reflections.
 * @default {"Markers":"","Regions:arraynum":"[]","TerrainTags:arraynum":"[\"2\"]","Positioning":"","Top:eval":"true","Appearance":"","Blur:num":"0.8","Opacity:num":"128"}
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
 * Water Reflection Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~WaterReflect:
 *
 * @param Markers
 *
 * @param Regions:arraynum
 * @text Regions
 * @parent Markers
 * @type number[]
 * @min 1
 * @max 255
 * @desc By default, which regions by default apply this reflection? 0 is ignored.
 * @default []
 *
 * @param TerrainTags:arraynum
 * @text Terrain Tags
 * @parent Markers
 * @type number[]
 * @min 1
 * @max 7
 * @desc By default, which terrain tags by default apply this reflection? 0 is ignored.
 * @default ["1"]
 * 
 * @param Positioning
 * 
 * @param Top:eval
 * @text Above Parallaxes?
 * @parent Positioning
 * @type boolean
 * @on Above Parallaxes
 * @off Below Parallaxes
 * @desc Place water reflections above visual parallaxes?
 * @default true
 * 
 * @param Appearance
 *
 * @param Blur:num
 * @text Blur Rate
 * @parent Appearance
 * @desc How much do you wish to blur this reflection?
 * Use a decimal number between 0 and 1.
 * @default 0.8
 *
 * @param Opacity:num
 * @text Opacity
 * @parent Appearance
 * @type number
 * @min 0
 * @max 255
 * @desc What is the default opacity for this reflection?
 * Use a value between 0 and 255.
 * @default 128
 *
 * @param Boundary:num
 * @text Water Boundary
 * @parent Appearance
 * @desc At which point is the water boundary?
 * Use a decimal number between 0 and 1.
 * @default 0.1
 *
 * @param AmpStart:num
 * @text Amplitude Start
 * @parent Appearance
 * @type number
 * @desc What should be the starting amplitude value?
 * @default 2
 *
 * @param AmpEnd:num
 * @text Amplitude End
 * @parent Appearance
 * @type number
 * @desc What should be the ending amplitude value?
 * @default 4
 *
 * @param WaveStart:num
 * @text Wavelength Start
 * @parent Appearance
 * @type number
 * @desc What should be the starting wavelength value?
 * @default 4
 *
 * @param WaveEnd:num
 * @text Wavelength End
 * @parent Appearance
 * @type number
 * @desc What should be the ending wavelength value?
 * @default 16
 *
 */
/* ----------------------------------------------------------------------------
 * Solid Reflection Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~SolidReflect:
 *
 * @param Markers
 *
 * @param Regions:arraynum
 * @text Regions
 * @parent Markers
 * @type number[]
 * @min 1
 * @max 255
 * @desc By default, which regions by default apply this reflection? 0 is ignored.
 * @default []
 *
 * @param TerrainTags:arraynum
 * @text Terrain Tags
 * @parent Markers
 * @type number[]
 * @min 1
 * @max 7
 * @desc By default, which terrain tags by default apply this reflection? 0 is ignored.
 * @default ["2"]
 * 
 * @param Positioning
 * 
 * @param Top:eval
 * @text Above Parallaxes?
 * @parent Positioning
 * @type boolean
 * @on Above Parallaxes
 * @off Below Parallaxes
 * @desc Place solid reflections above visual parallaxes?
 * @default true
 * 
 * @param Appearance
 *
 * @param Blur:num
 * @text Blur Rate
 * @parent Appearance
 * @desc How much do you wish to blur this reflection?
 * Use a decimal number between 0 and 1.
 * @default 0.8
 *
 * @param Opacity:num
 * @text Opacity
 * @parent Appearance
 * @type number
 * @min 0
 * @max 255
 * @desc What is the default opacity for this reflection?
 * Use a value between 0 and 255.
 * @default 128
 *
 */
/* ----------------------------------------------------------------------------
 * Optional Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Optional:
 * 
 * @param Scrolling
 * 
 * @param _parallaxZero:eval
 * @text Map Lock?
 * @parent Scrolling
 * @type boolean
 * @on Map Lock
 * @off No Map Lock
 * @desc Lock the parallax to the map's scrolling?
 * Automatically enable if the filename starts with "!"
 * @default false
 * 
 * @param _parallaxLoopX:eval
 * @text Loop Horizontally?
 * @parent Scrolling
 * @type boolean
 * @on Loop
 * @off No Loop
 * @desc Loop the parallax horizontally?
 * Does not work with Map Lock enabled.
 * @default false
 *
 * @param _parallaxSx:eval
 * @text Scroll:
 * @parent _parallaxLoopX:eval
 * @desc What is the horizontal scroll speed?
 * Use a negative value to invert the direction.
 * @default +0
 * 
 * @param _parallaxLoopY:eval
 * @text Loop Vertically?
 * @parent Scrolling
 * @type boolean
 * @on Loop
 * @off No Loop
 * @desc Loop the parallax horizontally?
 * Does not work with Map Lock enabled.
 * @default false
 *
 * @param _parallaxSy:eval
 * @text Scroll:
 * @parent _parallaxLoopY:eval
 * @desc What is the vertical scroll speed?
 * Use a negative value to invert the direction.
 * @default +0
 * 
 * @param Appearance
 *
 * @param opacity:eval
 * @text Opacity
 * @parent Appearance
 * @desc What is the opacity level for this parallax?
 * You may use JavaScript code.
 * @default 255
 *
 * @param blendMode:eval
 * @text Blend Mode
 * @parent Appearance
 * @type select
 * @option 0 - Normal
 * @value 0
 * @option 1 - Additive
 * @value 1
 * @option 2 - Multiply
 * @value 2
 * @option 3 - Screen
 * @value 3
 * @desc What kind of blend mode do you wish to apply to the parallax?
 * You may use JavaScript code.
 * @default 0
 *
 * @param hue:eval
 * @text Hue
 * @parent Appearance
 * @desc Do you wish to adjust this parallax's hue?
 * You may use JavaScript code.
 * @default 0
 *
 * @param hueShift:eval
 * @text Hue Shift
 * @parent hue:eval
 * @desc How much do you want the hue to shift each frame?
 * You may use JavaScript code.
 * @default +0
 *
 * @param colorTone:eval
 * @text Color Tone
 * @parent Appearance
 * @desc What tone do you want for the parallax?
 * Format: [Red, Green, Blue, Gray]
 * @default [0, 0, 0, 0]
 * 
 * @param Location
 *
 * @param maskRegions:arraynum
 * @text Regions
 * @parent Location
 * @type number[]
 * @min 1
 * @max 255
 * @desc Which regions will show this parallax?
 * Does not work with 0. Leave empty to ignore.
 * @default []
 *
 * @param maskTerrainTags:arraynum
 * @text Terrain Tags
 * @parent Location
 * @type number[]
 * @min 1
 * @max 7
 * @desc Which terrain tags will show this parallax?
 * Does not work with 0. Leave empty to ignore.
 * @default []
 *
 */
//=============================================================================

function _0xff64(){const _0x150316=['SolidReflect','Spriteset_Map_createParallax','_updateColorFilter','description','ReflectionFilter','DEFAULT_WATER_REFLECTION_FILTER_TOP','_reflectFilter','DEFAULT_WATER_REFLECTION_FILTER_BOUNDARY','_displayX','_scaleX','wasolidter','_solidReflectContainer','EVAL','scrollRight','DEFAULT_SOLID_REFLECTION_FILTER_TOP','updateTone','Game_Event_setupPageSettings','SolidBlur','DEFAULT_WATER_REFLECTION_FILTER_AMPLITUDE','Optional','NUM','getWaterReflectionTerrainTags','_waterReflectAdded','hasWaterReflections','filter','WaterBlur','WaterReflect','checkVisualParallaxesStringTags','move','_solidReflectLayer','>>>ATTENTION<<<','makeDeepCopy','hasSolidReflections','createCharacters','getSolidReflectionOpacity','terrainTag','TemplateSettings','STR','_colorFilter','DEFAULT_WATER_REFLECTION_REGIONS','_waterReflectContainer','getVisualParallaxOx','screenTileX','WaterBoundary','noReflections','registerReflectionSettings','Game_Map_setDisplayPos','isEventTest','4582291kVgpEI','_parallaxLoopX','setupVisualParallaxesEffects','clearPageSettings','addLoadListener','_parallaxZero','setDisplayPos','createMaskSprite','displayY','Filename','maskTerrainTags','layeredTiles','removeVisualParallaxLayer','format','split','_hasWaterReflections','Spriteset_Map_update','SCREEN','round','toUpperCase','trim','Regions','vehicles','Game_Event_clearPageSettings','update','clone','_parallaxContainer','Opacity','isInstanceOfSceneMap','BlendMode','VertLoop','_maskSprite','123840HxWQca','loadBitmap','scrollLeft','_parallaxName','Top','_solidReflectAdded','sort','1407099wqAtYp','BlurFilter','getWaterReflectionTop','STRUCT','ARRAYEVAL','createNewParallaxLayer','max','updateSolidReflections','RegExp','_waterReflectLayer','isSceneMap','Start','_spriteset','ARRAYFUNC','push','map','DEFAULT_SOLID_REFLECTION_FILTER_OPACITY','blendMode','ParallaxFadeOpacity','createReflectionMask','Settings','_scaleY','setupVisualParallaxesCommentTags','Spriteset_Map_createSpawnedEvent','CreateLayerData','JSON','addChangeVisualParallax','OpacityRate','OpacityFlat','WaterBottom','hasOwnProperty','status','NORMAL','Game_Map_scrollLeft','2134810ZZQLDo','setup','_noReflection','parameters','removeChild','ConvertParams','displayX','MaskRegions','constructor','maskRegions','getWaterReflectionAmplitude','_parallaxX','updateOrigin','HueShift','_baseSprite','bind','addChild','updateVisualParallaxSettings','charAt','hueShift','DEFAULT_WATER_REFLECTION_FILTER_OPACITY','MULTIPLY','time','Game_Map_scrollUp','ParallaxAddChangeSettings','createWaterReflectionMask','SolidOpacityFlat','_scene','destroy','_parallaxDataRef','createParallax','Game_Map_updateParallax','%1\x20is\x20incorrectly\x20placed\x20on\x20the\x20plugin\x20list.\x0aIt\x20is\x20a\x20Tier\x20%2\x20plugin\x20placed\x20over\x20other\x20Tier\x20%3\x20plugins.\x0aPlease\x20reorder\x20the\x20plugin\x20list\x20from\x20smallest\x20to\x20largest\x20tier\x20numbers.','SolidTerrainTags','children','getSolidReflectionTop','WaveEnd','getWaterReflectionBlur','bitmap','width','SolidOpacityRate','hue','return\x200','createSolidReflectionMask','prototype','DEFAULT_SOLID_REFLECTION_FILTER_BLUR','WaterRegions','_maskFilter','isLoopVertical','regionId','DEFAULT_WATER_REFLECTION_FILTER_BLUR','opacityDuration','getVisualParallaxes','createMaskBitmap','_colorTone','length','updateHue','DEFAULT_WATER_REFLECTION_FILTER_WAVELENGTH','remove','WaterTerrainTags','equals','findTargetVisualParallax','_parallaxSx','followers','colorTone','updateBlendMode','ARRAYSTR','mask','scale','events','height','_mask','type','_hasSolidReflections','getWaterReflectionOpacity','Spriteset_Map_createCharacters','event','VisuMZ_2_TileGrafterSystem','setupVisualParallaxesNotetags','call','%1\x27s\x20version\x20does\x20not\x20match\x20plugin\x27s.\x20Please\x20update\x20it\x20in\x20the\x20Plugin\x20Manager.','tileHeight','_parallaxY','_id','updateVisualParallaxLayer','8rLzDKp','page','opacity','_createColorFilter','list','WaterOpacityFlat','setColorTone','setupRadialLight','AmpStart','_visualParallaxSettings','WaveStart','Game_Map_scrollDown','MaskTerrainTags','scrollDown','WaterTop','#ffffff','DEFAULT_SOLID_REFLECTION_TERRAINTAGS','_parallaxSy','getSolidReflectionBlur','SolidRegions','updateWaterReflections','Tone','loadParallax','_blurFilter','isLoopHorizontal','getWaterReflectionBoundary','DEFAULT_SOLID_REFLECTION_REGIONS','scrollUp','createParallaxContainer','exit','setupVisualParallaxes','updateMask','ParallaxRemove','createWaterReflectionLayer','screenTileY','includes','clamp','Game_Map_setup','create','water','version','_hue','name','TerrainTags','_reflection','SolidBottom','2FAgANn','ADDITIVE','filters','FUNC','_parallaxLoopY','setupPageSettings','setHue','Boundary','registerCommand','tileWidth','initVisualParallaxesEffects','fillRect','getWaterReflectionWavelength','ScrollLock','_character','648937ixXmqV','getWaterReflectionRegions','3776424ylqGbS','getVisualParallaxOy','settings','VisualParallaxes','DEFAULT_WATER_REFLECTION_TERRAINTAGS','filename','getSolidReflectionTerrainTags','_displayY','sortVisualParallaxes','parse','5361426ItYEdA','targetOpacity','ARRAYNUM','tilesetFlags','getSolidReflectionRegions','initialize','createCharacterReflections','floor','NoReflection','note','createSolidReflectionLayer','createParallaxLayers','Game_Map_scrollRight','origin','getVisualParallaxSettings','match'];_0xff64=function(){return _0x150316;};return _0xff64();}const _0xba83a8=_0x508d;(function(_0x36b734,_0x58c72c){const _0x245e41=_0x508d,_0x49e4ab=_0x36b734();while(!![]){try{const _0x41e2ab=parseInt(_0x245e41(0x1c1))/0x1*(parseInt(_0x245e41(0x1b2))/0x2)+-parseInt(_0x245e41(0x234))/0x3+-parseInt(_0x245e41(0x22d))/0x4+-parseInt(_0x245e41(0x256))/0x5+-parseInt(_0x245e41(0x1c3))/0x6+-parseInt(_0x245e41(0x20d))/0x7*(-parseInt(_0x245e41(0x184))/0x8)+parseInt(_0x245e41(0x1cd))/0x9;if(_0x41e2ab===_0x58c72c)break;else _0x49e4ab['push'](_0x49e4ab['shift']());}catch(_0xde237f){_0x49e4ab['push'](_0x49e4ab['shift']());}}}(_0xff64,0x53b79));var label='VisualParallaxes',tier=tier||0x0,dependencies=[],pluginData=$plugins[_0xba83a8(0x1f5)](function(_0x4d2bd0){const _0x18f70b=_0xba83a8;return _0x4d2bd0[_0x18f70b(0x253)]&&_0x4d2bd0[_0x18f70b(0x1e0)][_0x18f70b(0x1a7)]('['+label+']');})[0x0];VisuMZ[label]['Settings']=VisuMZ[label]['Settings']||{},VisuMZ[_0xba83a8(0x25b)]=function(_0x55aa21,_0x3d5cb7){const _0x4da294=_0xba83a8;for(const _0x405a89 in _0x3d5cb7){if(_0x405a89[_0x4da294(0x1dc)](/(.*):(.*)/i)){const _0x4af9b2=String(RegExp['$1']),_0x62eaff=String(RegExp['$2'])[_0x4da294(0x220)]()[_0x4da294(0x221)]();let _0x1b6442,_0x1dbb8e,_0x334a2a;switch(_0x62eaff){case _0x4da294(0x1f1):_0x1b6442=_0x3d5cb7[_0x405a89]!==''?Number(_0x3d5cb7[_0x405a89]):0x0;break;case _0x4da294(0x1cf):_0x1dbb8e=_0x3d5cb7[_0x405a89]!==''?JSON[_0x4da294(0x1cc)](_0x3d5cb7[_0x405a89]):[],_0x1b6442=_0x1dbb8e['map'](_0x243600=>Number(_0x243600));break;case _0x4da294(0x1e9):_0x1b6442=_0x3d5cb7[_0x405a89]!==''?eval(_0x3d5cb7[_0x405a89]):null;break;case _0x4da294(0x238):_0x1dbb8e=_0x3d5cb7[_0x405a89]!==''?JSON[_0x4da294(0x1cc)](_0x3d5cb7[_0x405a89]):[],_0x1b6442=_0x1dbb8e[_0x4da294(0x243)](_0x133336=>eval(_0x133336));break;case _0x4da294(0x24d):_0x1b6442=_0x3d5cb7[_0x405a89]!==''?JSON['parse'](_0x3d5cb7[_0x405a89]):'';break;case'ARRAYJSON':_0x1dbb8e=_0x3d5cb7[_0x405a89]!==''?JSON[_0x4da294(0x1cc)](_0x3d5cb7[_0x405a89]):[],_0x1b6442=_0x1dbb8e[_0x4da294(0x243)](_0x2c0747=>JSON[_0x4da294(0x1cc)](_0x2c0747));break;case _0x4da294(0x1b5):_0x1b6442=_0x3d5cb7[_0x405a89]!==''?new Function(JSON[_0x4da294(0x1cc)](_0x3d5cb7[_0x405a89])):new Function(_0x4da294(0x159));break;case _0x4da294(0x241):_0x1dbb8e=_0x3d5cb7[_0x405a89]!==''?JSON[_0x4da294(0x1cc)](_0x3d5cb7[_0x405a89]):[],_0x1b6442=_0x1dbb8e[_0x4da294(0x243)](_0x411118=>new Function(JSON['parse'](_0x411118)));break;case _0x4da294(0x202):_0x1b6442=_0x3d5cb7[_0x405a89]!==''?String(_0x3d5cb7[_0x405a89]):'';break;case _0x4da294(0x171):_0x1dbb8e=_0x3d5cb7[_0x405a89]!==''?JSON['parse'](_0x3d5cb7[_0x405a89]):[],_0x1b6442=_0x1dbb8e[_0x4da294(0x243)](_0x6d3fb2=>String(_0x6d3fb2));break;case _0x4da294(0x237):_0x334a2a=_0x3d5cb7[_0x405a89]!==''?JSON['parse'](_0x3d5cb7[_0x405a89]):{},_0x1b6442=VisuMZ[_0x4da294(0x25b)]({},_0x334a2a);break;case'ARRAYSTRUCT':_0x1dbb8e=_0x3d5cb7[_0x405a89]!==''?JSON['parse'](_0x3d5cb7[_0x405a89]):[],_0x1b6442=_0x1dbb8e[_0x4da294(0x243)](_0x4581d9=>VisuMZ[_0x4da294(0x25b)]({},JSON[_0x4da294(0x1cc)](_0x4581d9)));break;default:continue;}_0x55aa21[_0x4af9b2]=_0x1b6442;}}return _0x55aa21;},(_0x42aae3=>{const _0x2e517f=_0xba83a8,_0x5bc19=_0x42aae3[_0x2e517f(0x1ae)];for(const _0x43e9a4 of dependencies){if(!Imported[_0x43e9a4]){alert('%1\x20is\x20missing\x20a\x20required\x20plugin.\x0aPlease\x20install\x20%2\x20into\x20the\x20Plugin\x20Manager.'[_0x2e517f(0x21a)](_0x5bc19,_0x43e9a4)),SceneManager[_0x2e517f(0x1a1)]();break;}}const _0x1d55aa=_0x42aae3[_0x2e517f(0x1e0)];if(_0x1d55aa[_0x2e517f(0x1dc)](/\[Version[ ](.*?)\]/i)){const _0xba37e9=Number(RegExp['$1']);_0xba37e9!==VisuMZ[label][_0x2e517f(0x1ac)]&&(alert(_0x2e517f(0x17f)[_0x2e517f(0x21a)](_0x5bc19,_0xba37e9)),SceneManager[_0x2e517f(0x1a1)]());}if(_0x1d55aa['match'](/\[Tier[ ](\d+)\]/i)){const _0x58dfbc=Number(RegExp['$1']);_0x58dfbc<tier?(alert(_0x2e517f(0x14f)[_0x2e517f(0x21a)](_0x5bc19,_0x58dfbc,tier)),SceneManager[_0x2e517f(0x1a1)]()):tier=Math[_0x2e517f(0x23a)](_0x58dfbc,tier);}VisuMZ['ConvertParams'](VisuMZ[label][_0x2e517f(0x248)],_0x42aae3[_0x2e517f(0x259)]);})(pluginData),VisuMZ[_0xba83a8(0x1c6)][_0xba83a8(0x201)]=function(){return{'id':0x0,'filename':'','_parallaxZero':![],'_parallaxLoopX':![],'_parallaxLoopY':![],'_parallaxSx':0x0,'_parallaxSy':0x0,'_parallaxX':0x0,'_parallaxY':0x0,'opacity':0xff,'targetOpacity':0xff,'opacityDuration':0x0,'blendMode':0x0,'hue':0x0,'hueShift':0x0,'colorTone':[0x0,0x0,0x0,0x0],'maskRegions':[],'maskTerrainTags':[]};},PluginManager['registerCommand'](pluginData[_0xba83a8(0x1ae)],_0xba83a8(0x147),_0x341b88=>{const _0x3d54de=_0xba83a8;VisuMZ[_0x3d54de(0x25b)](_0x341b88,_0x341b88);if(_0x341b88['id']<=0x0)return;if(_0x341b88[_0x3d54de(0x1c8)]===''||_0x341b88[_0x3d54de(0x1c8)]===_0x3d54de(0x1fb))return;let _0x467f03=JsonEx[_0x3d54de(0x1fc)](_0x341b88[_0x3d54de(0x1f0)]);if(!_0x467f03[_0x3d54de(0x252)](_0x3d54de(0x25f)))_0x467f03=VisuMZ[_0x3d54de(0x1c6)][_0x3d54de(0x201)]();_0x467f03[_0x3d54de(0x1c8)]=_0x341b88['filename'],_0x467f03['id']=_0x341b88['id'];_0x341b88[_0x3d54de(0x177)]===_0x3d54de(0x1ab)&&(_0x467f03[_0x3d54de(0x25f)][_0x3d54de(0x166)]<=0x0&&(_0x467f03[_0x3d54de(0x25f)]=JsonEx[_0x3d54de(0x1fc)]($gameMap[_0x3d54de(0x1c2)]())),_0x467f03[_0x3d54de(0x217)][_0x3d54de(0x166)]<=0x0&&(_0x467f03[_0x3d54de(0x217)]=JsonEx[_0x3d54de(0x1fc)]($gameMap[_0x3d54de(0x1f2)]())));_0x341b88[_0x3d54de(0x177)]===_0x3d54de(0x1e7)&&(_0x467f03[_0x3d54de(0x25f)][_0x3d54de(0x166)]<=0x0&&(_0x467f03['maskRegions']=JsonEx[_0x3d54de(0x1fc)]($gameMap[_0x3d54de(0x1d1)]())),_0x467f03[_0x3d54de(0x217)][_0x3d54de(0x166)]<=0x0&&(_0x467f03['maskTerrainTags']=JsonEx['makeDeepCopy']($gameMap[_0x3d54de(0x1c9)]())));while(_0x467f03[_0x3d54de(0x16f)][_0x3d54de(0x166)]<0x4){_0x467f03[_0x3d54de(0x16f)]['push'](0x0);}_0x467f03[_0x3d54de(0x261)]=0x0,_0x467f03[_0x3d54de(0x181)]=0x0,_0x467f03[_0x3d54de(0x1ce)]=_0x341b88[_0x3d54de(0x186)],_0x467f03[_0x3d54de(0x162)]=0x0,$gameMap[_0x3d54de(0x24e)](_0x467f03);}),PluginManager[_0xba83a8(0x1ba)](pluginData['name'],_0xba83a8(0x246),_0x5cb6b0=>{const _0x1fadfb=_0xba83a8;if(!SceneManager[_0x1fadfb(0x229)]())return;VisuMZ[_0x1fadfb(0x25b)](_0x5cb6b0,_0x5cb6b0);const _0x37b946=_0x5cb6b0[_0x1fadfb(0x188)];for(const _0x354282 of _0x37b946){const _0x3de63c=$gameMap['getVisualParallaxSettings'](_0x354282);if(!_0x3de63c)continue;_0x3de63c[_0x1fadfb(0x1ce)]=_0x5cb6b0[_0x1fadfb(0x1ce)]||0x0,_0x3de63c[_0x1fadfb(0x162)]=_0x5cb6b0['opacityDuration']||0x0,_0x3de63c[_0x1fadfb(0x162)]<=0x0&&(_0x3de63c[_0x1fadfb(0x186)]=_0x3de63c[_0x1fadfb(0x1ce)]);}}),PluginManager['registerCommand'](pluginData[_0xba83a8(0x1ae)],_0xba83a8(0x1a4),_0x2d2147=>{const _0x4698ad=_0xba83a8;if(!SceneManager[_0x4698ad(0x229)]())return;VisuMZ[_0x4698ad(0x25b)](_0x2d2147,_0x2d2147);const _0x4f01bc=_0x2d2147[_0x4698ad(0x188)];for(const _0x2b33c3 of _0x4f01bc){$gameMap['removeVisualParallax'](_0x2b33c3);}}),VisuMZ[_0xba83a8(0x1c6)][_0xba83a8(0x23c)]={'Start':/<(?:PARALLAX|WATER PARALLAX|SOLID PARALLAX)[ ](\d+)[ ](?:SETTING|SETTINGS)>/i,'End':/<\/(?:PARALLAX|WATER PARALLAX|SOLID PARALLAX)[ ](\d+)[ ](?:SETTING|SETTINGS)>/i,'Filename':/(?:FILENAME|NAME):[ ](.*)/i,'HorzLoop':/(?:HORZ|HORIZONTAL) (?:LOOP|SCROLL):[ ](.*)/i,'VertLoop':/(?:VERT|VERTICAL) (?:LOOP|SCROLL):[ ](.*)/i,'ScrollLock':/<(?:MAP|SCROLL)[ ](?:LOCK|LOCKED)>/i,'OpacityRate':/(?:OPACITY):[ ](\d+)([%％])/i,'OpacityFlat':/(?:OPACITY):[ ](\d+)/i,'BlendMode':/BLEND MODE:[ ](.*)/i,'Hue':/HUE:[ ](\d+)/i,'HueShift':/HUE (?:SHIFT|SPEED):[ ](.*)/i,'Tone':/(?:COLOR TONE|TONE|TINT):[ ](.*)/i,'MaskRegions':/(?:REGION|REGIONS):[ ](.*)/i,'MaskTerrainTags':/TERRAIN (?:TAG|TAGS):[ ](.*)/i,'WaterRegions':/<(?:WATER|WATER REFLECT|WATER REFLECTION) (?:REGION|REGIONS):[ ](.*)>/i,'WaterTerrainTags':/<(?:WATER|WATER REFLECT|WATER REFLECTION) TERRAIN (?:TAG|TAGS):[ ](.*)>/i,'WaterTop':/<(?:WATER|WATER REFLECT|WATER REFLECTION) TOP>/i,'WaterBottom':/<(?:WATER|WATER REFLECT|WATER REFLECTION) BOTTOM>/i,'WaterBlur':/<(?:WATER|WATER REFLECT|WATER REFLECTION) BLUR:[ ](.*)>/i,'WaterOpacityRate':/<(?:WATER|WATER REFLECT|WATER REFLECTION) OPACITY:[ ](\d+)([%％])>/i,'WaterOpacityFlat':/<(?:WATER|WATER REFLECT|WATER REFLECTION) OPACITY:[ ](\d+)>/i,'WaterBoundary':/<(?:WATER|WATER REFLECT|WATER REFLECTION) BOUNDARY:[ ](.*)>/i,'WaterAmplitude':/<(?:WATER|WATER REFLECT|WATER REFLECTION) (?:AMP|AMPLITUDE):[ ](.*)>/i,'WaterWavelength':/<(?:WATER|WATER REFLECT|WATER REFLECTION) (?:WAVE|WAVELENGTH):[ ](.*)>/i,'SolidRegions':/<(?:SOLID|SOLID REFLECT|SOLID REFLECTION) (?:REGION|REGIONS):[ ](.*)>/i,'SolidTerrainTags':/<(?:SOLID|SOLID REFLECT|SOLID REFLECTION) TERRAIN (?:TAG|TAGS):[ ](.*)>/i,'SolidTop':/<(?:SOLID|SOLID REFLECT|SOLID REFLECTION) TOP>/i,'SolidBottom':/<(?:SOLID|SOLID REFLECT|SOLID REFLECTION) BOTTOM>/i,'SolidBlur':/<(?:SOLID|SOLID REFLECT|SOLID REFLECTION) BLUR:[ ](.*)>/i,'SolidOpacityRate':/<(?:SOLID|SOLID REFLECT|SOLID REFLECTION) OPACITY:[ ](\d+)([%％])>/i,'SolidOpacityFlat':/<(?:SOLID|SOLID REFLECT|SOLID REFLECTION) OPACITY:[ ](\d+)>/i,'NoReflection':/<NO (?:REFLECT|REFLECTION|REFLECTIONS)>/i},SceneManager[_0xba83a8(0x23e)]=function(){const _0x57b26e=_0xba83a8;return this['_scene']&&this[_0x57b26e(0x14a)][_0x57b26e(0x25e)]===Scene_Map;},SceneManager[_0xba83a8(0x229)]=function(){return this['_scene']&&this['_scene']instanceof Scene_Map;},VisuMZ[_0xba83a8(0x1c6)][_0xba83a8(0x1a9)]=Game_Map[_0xba83a8(0x15b)][_0xba83a8(0x257)],Game_Map[_0xba83a8(0x15b)][_0xba83a8(0x257)]=function(_0x123cab){const _0x5a1357=_0xba83a8;VisuMZ[_0x5a1357(0x1c6)][_0x5a1357(0x1a9)][_0x5a1357(0x17e)](this,_0x123cab),this['setupVisualParallaxes'](),this['registerReflectionSettings']();},Game_Map[_0xba83a8(0x204)]=VisuMZ[_0xba83a8(0x1c6)][_0xba83a8(0x248)][_0xba83a8(0x1f7)][_0xba83a8(0x222)],Game_Map['DEFAULT_WATER_REFLECTION_TERRAINTAGS']=VisuMZ[_0xba83a8(0x1c6)][_0xba83a8(0x248)][_0xba83a8(0x1f7)][_0xba83a8(0x1af)],Game_Map['prototype'][_0xba83a8(0x209)]=function(){const _0x18f5bb=_0xba83a8;if(DataManager[_0x18f5bb(0x20c)]())return!![];if(this[_0x18f5bb(0x19c)]()||this[_0x18f5bb(0x15f)]())return!![];const _0x4960cd=VisuMZ[_0x18f5bb(0x1c6)][_0x18f5bb(0x23c)],_0x44f2ea=$dataMap[_0x18f5bb(0x1d6)]||'';return _0x44f2ea['match'](_0x4960cd[_0x18f5bb(0x1d5)])?!![]:![];},Game_Map[_0xba83a8(0x15b)][_0xba83a8(0x1c2)]=function(){const _0x1be210=_0xba83a8,_0x891d47=VisuMZ[_0x1be210(0x1c6)][_0x1be210(0x23c)],_0x10c56c=$dataMap[_0x1be210(0x1d6)]||'';if(_0x10c56c['match'](_0x891d47[_0x1be210(0x15d)]))return String(RegExp['$1'])[_0x1be210(0x21b)](',')[_0x1be210(0x243)](_0x3ee29a=>Number(_0x3ee29a)||0x1)[_0x1be210(0x169)](0x0);return JsonEx['makeDeepCopy'](Game_Map[_0x1be210(0x204)])[_0x1be210(0x169)](0x0);},Game_Map[_0xba83a8(0x15b)][_0xba83a8(0x1f2)]=function(){const _0x569dc0=_0xba83a8,_0xe0afa5=VisuMZ[_0x569dc0(0x1c6)][_0x569dc0(0x23c)],_0x4cecfd=$dataMap[_0x569dc0(0x1d6)]||'';if(_0x4cecfd[_0x569dc0(0x1dc)](_0xe0afa5[_0x569dc0(0x16a)]))return String(RegExp['$1'])[_0x569dc0(0x21b)](',')[_0x569dc0(0x243)](_0x22e0a5=>Number(_0x22e0a5)||0x1)[_0x569dc0(0x169)](0x0);return JsonEx['makeDeepCopy'](Game_Map[_0x569dc0(0x1c7)])[_0x569dc0(0x169)](0x0);},Game_Map[_0xba83a8(0x1e2)]=VisuMZ[_0xba83a8(0x1c6)]['Settings'][_0xba83a8(0x1f7)]['Top'],Game_Map[_0xba83a8(0x161)]=VisuMZ[_0xba83a8(0x1c6)]['Settings'][_0xba83a8(0x1f7)]['Blur'],Game_Map[_0xba83a8(0x143)]=VisuMZ[_0xba83a8(0x1c6)][_0xba83a8(0x248)][_0xba83a8(0x1f7)][_0xba83a8(0x228)],Game_Map[_0xba83a8(0x1e4)]=VisuMZ[_0xba83a8(0x1c6)][_0xba83a8(0x248)][_0xba83a8(0x1f7)][_0xba83a8(0x1b9)],Game_Map['DEFAULT_WATER_REFLECTION_FILTER_AMPLITUDE']=[VisuMZ[_0xba83a8(0x1c6)]['Settings']['WaterReflect'][_0xba83a8(0x18c)],VisuMZ[_0xba83a8(0x1c6)]['Settings'][_0xba83a8(0x1f7)]['AmpEnd']],Game_Map[_0xba83a8(0x168)]=[VisuMZ[_0xba83a8(0x1c6)][_0xba83a8(0x248)][_0xba83a8(0x1f7)][_0xba83a8(0x18e)],VisuMZ[_0xba83a8(0x1c6)][_0xba83a8(0x248)]['WaterReflect'][_0xba83a8(0x153)]],Game_Map[_0xba83a8(0x15b)][_0xba83a8(0x236)]=function(){const _0x16b142=_0xba83a8,_0x96afea=VisuMZ[_0x16b142(0x1c6)]['RegExp'],_0x3d4f56=$dataMap[_0x16b142(0x1d6)]||'';if(_0x3d4f56[_0x16b142(0x1dc)](_0x96afea[_0x16b142(0x192)]))return!![];else{if(_0x3d4f56['match'](_0x96afea[_0x16b142(0x251)]))return![];}return Game_Map[_0x16b142(0x1e2)];},Game_Map['prototype'][_0xba83a8(0x154)]=function(){const _0xe1f0=_0xba83a8,_0xd94806=VisuMZ[_0xe1f0(0x1c6)][_0xe1f0(0x23c)],_0x55b38c=$dataMap[_0xe1f0(0x1d6)]||'';if(_0x55b38c['match'](_0xd94806[_0xe1f0(0x1f6)]))return Math[_0xe1f0(0x23a)](0x0,Number(RegExp['$1'])||0x0);return Game_Map['DEFAULT_WATER_REFLECTION_FILTER_BLUR'];},Game_Map[_0xba83a8(0x15b)][_0xba83a8(0x179)]=function(){const _0x48c22d=_0xba83a8,_0x377165=VisuMZ[_0x48c22d(0x1c6)][_0x48c22d(0x23c)],_0x5a6b13=$dataMap['note']||'';if(_0x5a6b13[_0x48c22d(0x1dc)](_0x377165['WaterOpacityRate']))return Math[_0x48c22d(0x21f)]((Number(RegExp['$1'])||0x0)*0.01*0xff)[_0x48c22d(0x1a8)](0x0,0xff);else{if(_0x5a6b13[_0x48c22d(0x1dc)](_0x377165[_0x48c22d(0x189)]))return(Number(RegExp['$1'])||0x0)[_0x48c22d(0x1a8)](0x0,0xff);}return Game_Map[_0x48c22d(0x244)];},Game_Map['prototype'][_0xba83a8(0x19d)]=function(){const _0x20d9a4=_0xba83a8,_0x313120=VisuMZ[_0x20d9a4(0x1c6)]['RegExp'],_0x21fce0=$dataMap[_0x20d9a4(0x1d6)]||'';if(_0x21fce0[_0x20d9a4(0x1dc)](_0x313120[_0x20d9a4(0x208)]))return(Number(RegExp['$1'])||0x0)[_0x20d9a4(0x1a8)](0x0,0x1);return Game_Map[_0x20d9a4(0x1e4)];},Game_Map[_0xba83a8(0x15b)][_0xba83a8(0x260)]=function(){const _0x25511e=_0xba83a8,_0x520905=VisuMZ[_0x25511e(0x1c6)][_0x25511e(0x23c)],_0x1e2f42=$dataMap[_0x25511e(0x1d6)]||'';if(_0x1e2f42['match'](_0x520905['WaterAmplitude'])){const _0x2964e4=String(RegExp['$1'])[_0x25511e(0x21b)](',')['map'](_0x5ca83d=>Number(_0x5ca83d)||0x0);if(_0x2964e4['length']<=0x1)_0x2964e4[0x1]=_0x2964e4[0x0];}return JsonEx[_0x25511e(0x1fc)](Game_Map[_0x25511e(0x1ef)])['remove'](0x0);},Game_Map[_0xba83a8(0x15b)][_0xba83a8(0x1be)]=function(){const _0x42d0e4=_0xba83a8,_0x30e270=VisuMZ[_0x42d0e4(0x1c6)][_0x42d0e4(0x23c)],_0x5da683=$dataMap[_0x42d0e4(0x1d6)]||'';if(_0x5da683[_0x42d0e4(0x1dc)](_0x30e270['WaterAmplitude'])){const _0xbd91c6=String(RegExp['$1'])[_0x42d0e4(0x21b)](',')[_0x42d0e4(0x243)](_0x1cfb6f=>Number(_0x1cfb6f)||0x0);if(_0xbd91c6[_0x42d0e4(0x166)]<=0x1)_0xbd91c6[0x1]=_0xbd91c6[0x0];}return JsonEx[_0x42d0e4(0x1fc)](Game_Map[_0x42d0e4(0x168)])[_0x42d0e4(0x169)](0x0);},Game_Map[_0xba83a8(0x19e)]=VisuMZ[_0xba83a8(0x1c6)][_0xba83a8(0x248)][_0xba83a8(0x1dd)][_0xba83a8(0x222)],Game_Map[_0xba83a8(0x194)]=VisuMZ[_0xba83a8(0x1c6)][_0xba83a8(0x248)][_0xba83a8(0x1dd)][_0xba83a8(0x1af)],Game_Map[_0xba83a8(0x15b)][_0xba83a8(0x1d1)]=function(){const _0x4e1f50=_0xba83a8,_0x578d56=VisuMZ[_0x4e1f50(0x1c6)][_0x4e1f50(0x23c)],_0x2815c5=$dataMap[_0x4e1f50(0x1d6)]||'';if(_0x2815c5[_0x4e1f50(0x1dc)](_0x578d56[_0x4e1f50(0x197)]))return String(RegExp['$1'])['split'](',')[_0x4e1f50(0x243)](_0x7938d6=>Number(_0x7938d6)||0x1)[_0x4e1f50(0x169)](0x0);return JsonEx[_0x4e1f50(0x1fc)](Game_Map[_0x4e1f50(0x19e)])[_0x4e1f50(0x169)](0x0);},Game_Map['prototype'][_0xba83a8(0x1c9)]=function(){const _0x1cb855=_0xba83a8,_0x1e1ce6=VisuMZ[_0x1cb855(0x1c6)]['RegExp'],_0x1d3398=$dataMap[_0x1cb855(0x1d6)]||'';if(_0x1d3398['match'](_0x1e1ce6[_0x1cb855(0x150)]))return String(RegExp['$1'])[_0x1cb855(0x21b)](',')['map'](_0x35edb2=>Number(_0x35edb2)||0x1)[_0x1cb855(0x169)](0x0);return JsonEx[_0x1cb855(0x1fc)](Game_Map['DEFAULT_SOLID_REFLECTION_TERRAINTAGS'])[_0x1cb855(0x169)](0x0);},Game_Map[_0xba83a8(0x1eb)]=VisuMZ[_0xba83a8(0x1c6)]['Settings'][_0xba83a8(0x1dd)][_0xba83a8(0x231)],Game_Map[_0xba83a8(0x15c)]=VisuMZ['VisualParallaxes'][_0xba83a8(0x248)]['SolidReflect']['Blur'],Game_Map[_0xba83a8(0x244)]=VisuMZ[_0xba83a8(0x1c6)][_0xba83a8(0x248)]['SolidReflect'][_0xba83a8(0x228)],Game_Map[_0xba83a8(0x15b)][_0xba83a8(0x152)]=function(){const _0x729371=_0xba83a8,_0x330e7e=VisuMZ[_0x729371(0x1c6)]['RegExp'],_0x14d2f0=$dataMap[_0x729371(0x1d6)]||'';if(_0x14d2f0[_0x729371(0x1dc)](_0x330e7e['SolidTop']))return!![];else{if(_0x14d2f0[_0x729371(0x1dc)](_0x330e7e[_0x729371(0x1b1)]))return![];}return Game_Map[_0x729371(0x1eb)];},Game_Map['prototype'][_0xba83a8(0x196)]=function(){const _0x414a2e=_0xba83a8,_0x50e287=VisuMZ[_0x414a2e(0x1c6)]['RegExp'],_0x3588bb=$dataMap[_0x414a2e(0x1d6)]||'';if(_0x3588bb[_0x414a2e(0x1dc)](_0x50e287[_0x414a2e(0x1ee)]))return Math[_0x414a2e(0x23a)](0x0,Number(RegExp['$1'])||0x0);return Game_Map['DEFAULT_SOLID_REFLECTION_FILTER_BLUR'];},Game_Map[_0xba83a8(0x15b)][_0xba83a8(0x1ff)]=function(){const _0x22352f=_0xba83a8,_0x43ff9b=VisuMZ[_0x22352f(0x1c6)]['RegExp'],_0xb34838=$dataMap[_0x22352f(0x1d6)]||'';if(_0xb34838['match'](_0x43ff9b[_0x22352f(0x157)]))return Math[_0x22352f(0x21f)]((Number(RegExp['$1'])||0x0)*0.01*0xff)['clamp'](0x0,0xff);else{if(_0xb34838[_0x22352f(0x1dc)](_0x43ff9b[_0x22352f(0x149)]))return(Number(RegExp['$1'])||0x0)['clamp'](0x0,0xff);}return Game_Map[_0x22352f(0x244)];},Game_Map[_0xba83a8(0x15b)]['registerReflectionSettings']=function(){const _0x52da40=_0xba83a8,_0x413887=this['getWaterReflectionRegions'](),_0x5b36a2=this[_0x52da40(0x1f2)](),_0x1a3d97=this['getSolidReflectionRegions'](),_0x46cc0c=this['getSolidReflectionTerrainTags'](),_0x960436=this[_0x52da40(0x156)](),_0x5eea80=this[_0x52da40(0x175)]();this[_0x52da40(0x21c)]=![],this[_0x52da40(0x178)]=![];const _0x191f2d=this[_0x52da40(0x1d0)]();for(let _0x29639c=0x0;_0x29639c<_0x960436;_0x29639c++){for(let _0x658651=0x0;_0x658651<_0x5eea80;_0x658651++){const _0x42de42=this[_0x52da40(0x160)](_0x29639c,_0x658651);_0x413887[_0x52da40(0x1a7)](_0x42de42)&&(this[_0x52da40(0x21c)]=!![]);_0x1a3d97[_0x52da40(0x1a7)](_0x42de42)&&(this[_0x52da40(0x178)]=!![]);const _0x3ae428=this[_0x52da40(0x218)](_0x29639c,_0x658651);for(const _0x72cb4c of _0x3ae428){if(_0x72cb4c<0x400)continue;const _0x605b85=_0x191f2d[_0x72cb4c]>>0xc;_0x5b36a2[_0x52da40(0x1a7)](_0x605b85)&&(this[_0x52da40(0x21c)]=!![]),_0x46cc0c[_0x52da40(0x1a7)](_0x605b85)&&(this[_0x52da40(0x178)]=!![]);}if(this[_0x52da40(0x21c)]&&this['_hasSolidReflections'])break;}}},Game_Map[_0xba83a8(0x15b)][_0xba83a8(0x1f4)]=function(){const _0x5f3296=_0xba83a8;if(this[_0x5f3296(0x21c)]===undefined)this[_0x5f3296(0x20a)]();return this[_0x5f3296(0x21c)];},Game_Map[_0xba83a8(0x15b)][_0xba83a8(0x1fd)]=function(){const _0x410b92=_0xba83a8;if(this['_hasSolidReflections']===undefined)this[_0x410b92(0x20a)]();return this['_hasSolidReflections'];},Game_Map[_0xba83a8(0x15b)][_0xba83a8(0x1a2)]=function(){const _0x3e50ab=_0xba83a8;this[_0x3e50ab(0x18d)]=[null];if(!$dataMap)return;const _0x6a1473=VisuMZ['VisualParallaxes']['CreateLayerData']();for(const _0x3e803a of _0x6a1473){if(!_0x3e803a)continue;this[_0x3e50ab(0x18d)][_0x3e803a['id']]=_0x3e803a;}},VisuMZ['VisualParallaxes'][_0xba83a8(0x24c)]=function(){const _0x4fbd54=_0xba83a8;if(!$dataMap)return[];const _0x23d355=[],_0xd61f26=VisuMZ[_0x4fbd54(0x1c6)][_0x4fbd54(0x201)]();if(!$dataMap['note'])return[];const _0x44acc8=VisuMZ['VisualParallaxes'][_0x4fbd54(0x23c)],_0x5a21ec=$dataMap[_0x4fbd54(0x1d6)]['split'](/[\r\n]+/);let _0xfbc1b6=JsonEx['makeDeepCopy'](_0xd61f26);for(const _0x59d2fe of _0x5a21ec){if(_0x59d2fe[_0x4fbd54(0x1dc)](_0x44acc8[_0x4fbd54(0x23f)])){_0xfbc1b6['id']=Number(RegExp['$1']);if(_0x59d2fe['match'](/WATER/i))_0xfbc1b6[_0x4fbd54(0x25f)]=JsonEx['makeDeepCopy']($gameMap[_0x4fbd54(0x1c2)]()),_0xfbc1b6[_0x4fbd54(0x217)]=JsonEx[_0x4fbd54(0x1fc)]($gameMap[_0x4fbd54(0x1f2)]());else _0x59d2fe[_0x4fbd54(0x1dc)](/SOLID/i)&&(_0xfbc1b6[_0x4fbd54(0x25f)]=JsonEx[_0x4fbd54(0x1fc)]($gameMap['getSolidReflectionRegions']()),_0xfbc1b6[_0x4fbd54(0x217)]=JsonEx[_0x4fbd54(0x1fc)]($gameMap['getSolidReflectionTerrainTags']()));}else{if(_0x59d2fe[_0x4fbd54(0x1dc)](_0x44acc8['End'])){const _0x4ee503=Number(RegExp['$1']);if(_0x4ee503>0x0&&_0x4ee503===_0xfbc1b6['id']&&_0xfbc1b6[_0x4fbd54(0x1c8)]!=='')_0x23d355['push'](_0xfbc1b6);_0xfbc1b6=JsonEx[_0x4fbd54(0x1fc)](_0xd61f26);}else{if(_0xfbc1b6['id']<=0x0)continue;}}if(_0x59d2fe[_0x4fbd54(0x1dc)](_0x44acc8[_0x4fbd54(0x216)]))_0xfbc1b6[_0x4fbd54(0x1c8)]=String(RegExp['$1'])[_0x4fbd54(0x221)](),_0xfbc1b6[_0x4fbd54(0x1c8)][_0x4fbd54(0x141)](0x0)==='!'&&(_0xfbc1b6['_parallaxZero']=!![]);else{if(_0x59d2fe[_0x4fbd54(0x1dc)](_0x44acc8['HorzLoop']))_0xfbc1b6[_0x4fbd54(0x20e)]=!![],_0xfbc1b6[_0x4fbd54(0x16d)]=Number(RegExp['$1'])||0x0;else{if(_0x59d2fe[_0x4fbd54(0x1dc)](_0x44acc8[_0x4fbd54(0x22b)]))_0xfbc1b6[_0x4fbd54(0x1b6)]=!![],_0xfbc1b6['_parallaxSy']=Number(RegExp['$1'])||0x0;else{if(_0x59d2fe[_0x4fbd54(0x1dc)](_0x44acc8[_0x4fbd54(0x1bf)]))_0xfbc1b6['_parallaxZero']=!![];else{if(_0x59d2fe[_0x4fbd54(0x1dc)](_0x44acc8[_0x4fbd54(0x24f)])){const _0x9b4186=Number(RegExp['$1'])*0.01;_0xfbc1b6['opacity']=Math['round'](_0x9b4186*0xff)[_0x4fbd54(0x1a8)](0x0,0xff);}else{if(_0x59d2fe['match'](_0x44acc8[_0x4fbd54(0x250)]))_0xfbc1b6[_0x4fbd54(0x186)]=Number(RegExp['$1'])[_0x4fbd54(0x1a8)](0x0,0xff);else{if(_0x59d2fe['match'](_0x44acc8[_0x4fbd54(0x22a)])){const _0x1277e1=String(RegExp['$1'])[_0x4fbd54(0x220)]()[_0x4fbd54(0x221)](),_0x3f4ded=[_0x4fbd54(0x254),_0x4fbd54(0x1b3),_0x4fbd54(0x144),_0x4fbd54(0x21e)];_0xfbc1b6[_0x4fbd54(0x245)]=_0x3f4ded['indexOf'](_0x1277e1)[_0x4fbd54(0x1a8)](0x0,0x3);}else{if(_0x59d2fe[_0x4fbd54(0x1dc)](_0x44acc8['Hue']))_0xfbc1b6[_0x4fbd54(0x158)]=Number(RegExp['$1'])[_0x4fbd54(0x1a8)](0x0,0x168);else{if(_0x59d2fe[_0x4fbd54(0x1dc)](_0x44acc8[_0x4fbd54(0x263)]))_0xfbc1b6[_0x4fbd54(0x142)]=Number(RegExp['$1'])||0x0;else{if(_0x59d2fe[_0x4fbd54(0x1dc)](_0x44acc8[_0x4fbd54(0x199)])){const _0x5a4799=String(RegExp['$1'])['split'](',')[_0x4fbd54(0x243)](_0x250b4c=>Number(_0x250b4c)||0x0);while(_0x5a4799[_0x4fbd54(0x166)]<0x4)_0x5a4799['push'](0x0);_0xfbc1b6[_0x4fbd54(0x16f)]=_0x5a4799;}else{if(_0x59d2fe[_0x4fbd54(0x1dc)](_0x44acc8[_0x4fbd54(0x25d)])){const _0x35d932=String(RegExp['$1'])['split'](',')[_0x4fbd54(0x243)](_0x350a33=>Number(_0x350a33)||0x1);_0xfbc1b6[_0x4fbd54(0x25f)]=_0x35d932;}else{if(_0x59d2fe[_0x4fbd54(0x1dc)](_0x44acc8[_0x4fbd54(0x190)])){const _0x3e495a=String(RegExp['$1'])['split'](',')['map'](_0x5d63e1=>Number(_0x5d63e1)||0x1);_0xfbc1b6['maskTerrainTags']=_0x3e495a;}}}}}}}}}}}}}return _0x23d355;},Game_Map['prototype'][_0xba83a8(0x163)]=function(){const _0x517e5f=_0xba83a8;return this[_0x517e5f(0x18d)]===undefined&&this[_0x517e5f(0x1a2)](),this['_visualParallaxSettings']['filter'](_0x5cad3f=>!!_0x5cad3f);},Game_Map[_0xba83a8(0x15b)][_0xba83a8(0x1db)]=function(_0x10774c){const _0x9f7a1e=_0xba83a8;return this['_visualParallaxSettings']=this['_visualParallaxSettings']||[],this[_0x9f7a1e(0x18d)][_0x10774c]||null;},Game_Map[_0xba83a8(0x15b)]['getVisualParallaxOx']=function(_0x1c88f0){const _0x665650=_0xba83a8,_0x2a8575=this[_0x665650(0x1db)](_0x1c88f0);if(_0x2a8575[_0x665650(0x212)])return Math[_0x665650(0x1d4)](_0x2a8575['_parallaxX']*this['tileWidth']());else return _0x2a8575[_0x665650(0x20e)]?_0x2a8575['_parallaxX']*this['tileWidth']()/0x2:0x0;},Game_Map['prototype']['getVisualParallaxOy']=function(_0x360275){const _0x134f51=_0xba83a8,_0x4b3cb8=this[_0x134f51(0x1db)](_0x360275);if(_0x4b3cb8[_0x134f51(0x212)])return Math['floor'](_0x4b3cb8[_0x134f51(0x181)]*this[_0x134f51(0x180)]());else return _0x4b3cb8['_parallaxLoopY']?_0x4b3cb8[_0x134f51(0x181)]*this[_0x134f51(0x180)]()/0x2:0x0;},Game_Map['prototype']['removeVisualParallax']=function(_0x4258e8){const _0x455a7b=_0xba83a8;this[_0x455a7b(0x18d)]=this['_visualParallaxSettings']||[];if(!this[_0x455a7b(0x18d)][_0x4258e8])return;this[_0x455a7b(0x18d)][_0x4258e8]=null;const _0x37fe11=SceneManager[_0x455a7b(0x14a)][_0x455a7b(0x240)];_0x37fe11&&_0x37fe11[_0x455a7b(0x219)](_0x4258e8);},Game_Map[_0xba83a8(0x15b)][_0xba83a8(0x24e)]=function(_0x580615){const _0x56ddd0=_0xba83a8,_0x22c870=_0x580615['id'];_0x580615[_0x56ddd0(0x1c8)]['charAt'](0x0)==='!'&&(_0x580615[_0x56ddd0(0x212)]=!![]);let _0x399cc4=![];this[_0x56ddd0(0x18d)]=this[_0x56ddd0(0x18d)]||[];if(this[_0x56ddd0(0x18d)][_0x22c870]){const _0x27926e=this[_0x56ddd0(0x18d)][_0x22c870];if(!_0x27926e[_0x56ddd0(0x25f)]['equals'](_0x580615['maskRegions']))_0x399cc4=!![];else!_0x27926e[_0x56ddd0(0x217)]['equals'](_0x580615[_0x56ddd0(0x217)])&&(_0x399cc4=!![]);}this['_visualParallaxSettings'][_0x22c870]=_0x580615;if(!SceneManager['isSceneMap']())return;const _0x2f52c6=SceneManager['_scene'][_0x56ddd0(0x240)];_0x2f52c6&&_0x2f52c6[_0x56ddd0(0x183)](_0x22c870,_0x399cc4);},VisuMZ['VisualParallaxes'][_0xba83a8(0x20b)]=Game_Map[_0xba83a8(0x15b)]['setDisplayPos'],Game_Map[_0xba83a8(0x15b)][_0xba83a8(0x213)]=function(_0x12d263,_0x1a6e75){const _0x4b500a=_0xba83a8;VisuMZ[_0x4b500a(0x1c6)]['Game_Map_setDisplayPos'][_0x4b500a(0x17e)](this,_0x12d263,_0x1a6e75);for(const _0x2d22a6 of this[_0x4b500a(0x163)]()){if(!_0x2d22a6)continue;this[_0x4b500a(0x19c)]()?_0x2d22a6[_0x4b500a(0x261)]=_0x12d263:_0x2d22a6[_0x4b500a(0x261)]=this[_0x4b500a(0x1e5)],this['isLoopVertical']()?_0x2d22a6['_parallaxY']=_0x1a6e75:_0x2d22a6[_0x4b500a(0x181)]=this[_0x4b500a(0x1ca)];}},VisuMZ[_0xba83a8(0x1c6)][_0xba83a8(0x255)]=Game_Map[_0xba83a8(0x15b)][_0xba83a8(0x22f)],Game_Map[_0xba83a8(0x15b)]['scrollLeft']=function(_0x50d6e0){const _0x3738fd=_0xba83a8,_0x37bd89=this[_0x3738fd(0x1e5)];VisuMZ[_0x3738fd(0x1c6)][_0x3738fd(0x255)]['call'](this,_0x50d6e0);for(const _0x39cdf3 of this['getVisualParallaxes']()){if(!_0x39cdf3)continue;if(this[_0x3738fd(0x19c)]())_0x39cdf3[_0x3738fd(0x20e)]&&(_0x39cdf3[_0x3738fd(0x261)]-=_0x50d6e0);else this[_0x3738fd(0x156)]()>=this['screenTileX']()&&(_0x39cdf3[_0x3738fd(0x261)]+=this['_displayX']-_0x37bd89);}},VisuMZ[_0xba83a8(0x1c6)][_0xba83a8(0x1d9)]=Game_Map[_0xba83a8(0x15b)][_0xba83a8(0x1ea)],Game_Map[_0xba83a8(0x15b)]['scrollRight']=function(_0x32d671){const _0x17ab85=_0xba83a8,_0xc5a9a4=this['_displayX'];VisuMZ[_0x17ab85(0x1c6)]['Game_Map_scrollRight'][_0x17ab85(0x17e)](this,_0x32d671);for(const _0x102961 of this[_0x17ab85(0x163)]()){if(!_0x102961)continue;if(this['isLoopHorizontal']())_0x102961[_0x17ab85(0x20e)]&&(_0x102961['_parallaxX']+=_0x32d671);else this[_0x17ab85(0x156)]()>=this[_0x17ab85(0x207)]()&&(_0x102961[_0x17ab85(0x261)]+=this[_0x17ab85(0x1e5)]-_0xc5a9a4);}},VisuMZ['VisualParallaxes'][_0xba83a8(0x18f)]=Game_Map[_0xba83a8(0x15b)]['scrollDown'],Game_Map[_0xba83a8(0x15b)][_0xba83a8(0x191)]=function(_0x235620){const _0x120cd6=_0xba83a8,_0x49017b=this[_0x120cd6(0x1ca)];VisuMZ[_0x120cd6(0x1c6)][_0x120cd6(0x18f)][_0x120cd6(0x17e)](this,_0x235620);for(const _0x1b7ed0 of this[_0x120cd6(0x163)]()){if(!_0x1b7ed0)continue;if(this['isLoopVertical']())_0x1b7ed0[_0x120cd6(0x1b6)]&&(_0x1b7ed0['_parallaxY']+=_0x235620);else this[_0x120cd6(0x175)]()>=this['screenTileY']()&&(_0x1b7ed0[_0x120cd6(0x181)]+=this[_0x120cd6(0x1ca)]-_0x49017b);}},VisuMZ['VisualParallaxes'][_0xba83a8(0x146)]=Game_Map[_0xba83a8(0x15b)][_0xba83a8(0x19f)],Game_Map['prototype'][_0xba83a8(0x19f)]=function(_0x5e9c31){const _0x577d21=_0xba83a8,_0x335ecf=this[_0x577d21(0x1ca)];VisuMZ[_0x577d21(0x1c6)][_0x577d21(0x146)][_0x577d21(0x17e)](this,_0x5e9c31);for(const _0x519d16 of this[_0x577d21(0x163)]()){if(!_0x519d16)continue;if(this[_0x577d21(0x15f)]())_0x519d16[_0x577d21(0x1b6)]&&(_0x519d16[_0x577d21(0x181)]-=_0x5e9c31);else this['height']()>=this[_0x577d21(0x1a6)]()&&(_0x519d16[_0x577d21(0x181)]+=this[_0x577d21(0x1ca)]-_0x335ecf);}},VisuMZ[_0xba83a8(0x1c6)][_0xba83a8(0x14e)]=Game_Map['prototype']['updateParallax'],Game_Map[_0xba83a8(0x15b)]['updateParallax']=function(){const _0x9ffd05=_0xba83a8;VisuMZ[_0x9ffd05(0x1c6)]['Game_Map_updateParallax']['call'](this);for(const _0x424d16 of this[_0x9ffd05(0x163)]()){if(!_0x424d16)continue;this[_0x9ffd05(0x140)](_0x424d16);}},Game_Map['prototype']['updateVisualParallaxSettings']=function(_0x1d92cb){const _0x1700ab=_0xba83a8;_0x1d92cb[_0x1700ab(0x20e)]&&(_0x1d92cb[_0x1700ab(0x261)]+=_0x1d92cb['_parallaxSx']/this[_0x1700ab(0x1bb)]()/0x2);_0x1d92cb[_0x1700ab(0x1b6)]&&(_0x1d92cb[_0x1700ab(0x181)]+=_0x1d92cb[_0x1700ab(0x195)]/this[_0x1700ab(0x180)]()/0x2);_0x1d92cb['hue']+=_0x1d92cb['hueShift'];if(_0x1d92cb[_0x1700ab(0x162)]>0x0){const _0x1cc0dc=_0x1d92cb[_0x1700ab(0x162)];_0x1d92cb[_0x1700ab(0x186)]=(_0x1d92cb[_0x1700ab(0x186)]*(_0x1cc0dc-0x1)+_0x1d92cb[_0x1700ab(0x1ce)])/_0x1cc0dc,_0x1d92cb[_0x1700ab(0x162)]--;}},VisuMZ['VisualParallaxes'][_0xba83a8(0x224)]=Game_Event[_0xba83a8(0x15b)][_0xba83a8(0x210)],Game_Event[_0xba83a8(0x15b)]['clearPageSettings']=function(){const _0x119052=_0xba83a8;VisuMZ[_0x119052(0x1c6)]['Game_Event_clearPageSettings'][_0x119052(0x17e)](this),this[_0x119052(0x1bc)]();},VisuMZ[_0xba83a8(0x1c6)][_0xba83a8(0x1ed)]=Game_Event[_0xba83a8(0x15b)][_0xba83a8(0x1b7)],Game_Event['prototype']['setupPageSettings']=function(){const _0x1d5012=_0xba83a8;VisuMZ['VisualParallaxes'][_0x1d5012(0x1ed)][_0x1d5012(0x17e)](this),this[_0x1d5012(0x20f)]();},Game_Event[_0xba83a8(0x15b)]['setupVisualParallaxesEffects']=function(){const _0xebfbbc=_0xba83a8;if(!this['event']())return;this[_0xebfbbc(0x1bc)](),this[_0xebfbbc(0x17d)](),this[_0xebfbbc(0x24a)]();},Game_Event[_0xba83a8(0x15b)][_0xba83a8(0x17d)]=function(){const _0x4a23c1=_0xba83a8,_0x3d7c72=this[_0x4a23c1(0x17b)]()[_0x4a23c1(0x1d6)];if(_0x3d7c72==='')return;this[_0x4a23c1(0x1f8)](_0x3d7c72);},Game_Event[_0xba83a8(0x15b)]['setupVisualParallaxesCommentTags']=function(){const _0x4c7e9c=_0xba83a8;if(!this[_0x4c7e9c(0x185)]())return;const _0x354602=this['list']();let _0x3844e6='';for(const _0x330fc4 of _0x354602){if([0x6c,0x198][_0x4c7e9c(0x1a7)](_0x330fc4['code'])){if(_0x3844e6!=='')_0x3844e6+='\x0a';_0x3844e6+=_0x330fc4['parameters'][0x0];}}this[_0x4c7e9c(0x1f8)](_0x3844e6);},Game_Event['prototype'][_0xba83a8(0x1bc)]=function(){this['_noReflection']=![];},Game_Event['prototype'][_0xba83a8(0x1f8)]=function(_0xa1b83a){const _0xf6cd14=_0xba83a8,_0x4ad4ac=VisuMZ['VisualParallaxes'][_0xf6cd14(0x23c)];_0xa1b83a[_0xf6cd14(0x1dc)](_0x4ad4ac['NoReflection'])&&(this[_0xf6cd14(0x258)]=!![]);};function Sprite_VisualParallax(){this['initialize'](...arguments);}Sprite_VisualParallax[_0xba83a8(0x15b)]=Object[_0xba83a8(0x1aa)](TilingSprite[_0xba83a8(0x15b)]),Sprite_VisualParallax['prototype'][_0xba83a8(0x25e)]=Sprite_VisualParallax,Sprite_VisualParallax['prototype']['initialize']=function(_0x1b26ed){const _0x374cde=_0xba83a8;this[_0x374cde(0x182)]=_0x1b26ed,TilingSprite[_0x374cde(0x15b)][_0x374cde(0x1d2)][_0x374cde(0x17e)](this),this['_createColorFilter'](),this[_0x374cde(0x22e)](),this['bitmap'][_0x374cde(0x211)](this[_0x374cde(0x214)]['bind'](this));},Sprite_VisualParallax[_0xba83a8(0x15b)][_0xba83a8(0x1c5)]=function(){const _0xc514b9=_0xba83a8;return $gameMap[_0xc514b9(0x1db)](this['_id']);},Sprite_VisualParallax[_0xba83a8(0x15b)][_0xba83a8(0x187)]=function(){const _0x2f43cc=_0xba83a8;this[_0x2f43cc(0x1ad)]=0x0,this[_0x2f43cc(0x165)]=[0x0,0x0,0x0,0x0],this[_0x2f43cc(0x203)]=new ColorFilter(),!this['filters']&&(this[_0x2f43cc(0x1b4)]=[]),this[_0x2f43cc(0x1b4)][_0x2f43cc(0x242)](this[_0x2f43cc(0x203)]);},Sprite_VisualParallax[_0xba83a8(0x15b)][_0xba83a8(0x1df)]=function(){const _0x2ac0ff=_0xba83a8;!this[_0x2ac0ff(0x203)]&&this[_0x2ac0ff(0x187)](),this[_0x2ac0ff(0x203)][_0x2ac0ff(0x1b8)](this['_hue']),this[_0x2ac0ff(0x203)][_0x2ac0ff(0x18a)](this['_colorTone']);},Sprite_VisualParallax[_0xba83a8(0x15b)]['loadBitmap']=function(){const _0x1d6d44=_0xba83a8;this[_0x1d6d44(0x230)]=this[_0x1d6d44(0x1c5)]()[_0x1d6d44(0x1c8)],this[_0x1d6d44(0x155)]=ImageManager[_0x1d6d44(0x19a)](this[_0x1d6d44(0x230)]);},Sprite_VisualParallax[_0xba83a8(0x15b)][_0xba83a8(0x214)]=function(){const _0x48734c=_0xba83a8;this[_0x48734c(0x22c)]=new Sprite(),this[_0x48734c(0x164)]();},Sprite_VisualParallax['prototype'][_0xba83a8(0x164)]=function(){const _0x4f633f=_0xba83a8;this[_0x4f633f(0x22c)][_0x4f633f(0x155)]&&(this['_maskSprite'][_0x4f633f(0x155)][_0x4f633f(0x14b)](),this[_0x4f633f(0x25a)](this['_maskSprite']));const _0x44ca64=new Bitmap(Graphics[_0x4f633f(0x156)],Graphics[_0x4f633f(0x175)]);_0x44ca64[_0x4f633f(0x1bd)](0x0,0x0,_0x44ca64[_0x4f633f(0x156)],_0x44ca64[_0x4f633f(0x175)],_0x4f633f(0x193)),this['_maskSprite'][_0x4f633f(0x155)]=_0x44ca64,this[_0x4f633f(0x13f)](this[_0x4f633f(0x22c)]),this[_0x4f633f(0x15e)]=new PIXI['SpriteMaskFilter'](this[_0x4f633f(0x22c)]),this['filters']['push'](this[_0x4f633f(0x15e)]);const _0x33a6bc=this[_0x4f633f(0x1c5)]()[_0x4f633f(0x25f)],_0x33c3ef=this['settings']()[_0x4f633f(0x217)];if(_0x33a6bc['length']<=0x0&&_0x33c3ef[_0x4f633f(0x166)]<=0x0)return;if($gameMap[_0x4f633f(0x19c)]()||$gameMap[_0x4f633f(0x15f)]())return;const _0x5ef505=$gameMap[_0x4f633f(0x156)](),_0xe3175=$gameMap[_0x4f633f(0x175)](),_0x463196=$gameMap['tileWidth'](),_0x5b727d=$gameMap['tileHeight']();this[_0x4f633f(0x22c)]['bitmap']=new Bitmap(_0x5ef505*_0x463196,_0xe3175*_0x5b727d);for(let _0x439ea4=0x0;_0x439ea4<_0x5ef505;_0x439ea4++){for(let _0xcb8ecf=0x0;_0xcb8ecf<_0xe3175;_0xcb8ecf++){const _0x2593b7=$gameMap['regionId'](_0x439ea4,_0xcb8ecf);(_0x33a6bc[_0x4f633f(0x1a7)](_0x2593b7)||_0x33c3ef['includes']($gameMap[_0x4f633f(0x200)](_0x439ea4,_0xcb8ecf)))&&(this[_0x4f633f(0x22c)]['bitmap'][_0x4f633f(0x1bd)](_0x439ea4*_0x463196,_0xcb8ecf*_0x5b727d,_0x463196,_0x5b727d,'#ffffff'),Imported['VisuMZ_2_TileGrafterSystem']&&SceneManager[_0x4f633f(0x14a)]['_grafterRefreshRegions'][_0x4f633f(0x242)](_0x2593b7));}}},Sprite_VisualParallax[_0xba83a8(0x15b)][_0xba83a8(0x225)]=function(){const _0x2ef48c=_0xba83a8;TilingSprite[_0x2ef48c(0x15b)][_0x2ef48c(0x225)]['call'](this);if(!this[_0x2ef48c(0x155)])return;if(!this[_0x2ef48c(0x1c5)]())return;this['updateOpacity'](),this[_0x2ef48c(0x262)](),this[_0x2ef48c(0x170)](),this[_0x2ef48c(0x167)](),this[_0x2ef48c(0x1ec)](),this[_0x2ef48c(0x1a3)]();},Sprite_VisualParallax[_0xba83a8(0x15b)]['updateOpacity']=function(){const _0x48d8ee=_0xba83a8;this[_0x48d8ee(0x186)]=this[_0x48d8ee(0x1c5)]()[_0x48d8ee(0x186)];},Sprite_VisualParallax[_0xba83a8(0x15b)][_0xba83a8(0x262)]=function(){const _0x353307=_0xba83a8;this[_0x353307(0x1da)]['x']=$gameMap[_0x353307(0x206)](this[_0x353307(0x182)]),this[_0x353307(0x1da)]['y']=$gameMap[_0x353307(0x1c4)](this[_0x353307(0x182)]);},Sprite_VisualParallax[_0xba83a8(0x15b)][_0xba83a8(0x170)]=function(){const _0x2eff5e=_0xba83a8;this[_0x2eff5e(0x15e)]&&(this[_0x2eff5e(0x15e)][_0x2eff5e(0x245)]=this[_0x2eff5e(0x1c5)]()[_0x2eff5e(0x245)]);},Sprite_VisualParallax['prototype']['updateHue']=function(){const _0x316c75=_0xba83a8;this[_0x316c75(0x1b8)](this[_0x316c75(0x1c5)]()[_0x316c75(0x158)]);},Sprite_VisualParallax['prototype'][_0xba83a8(0x1b8)]=function(_0x2b8786){const _0x402923=_0xba83a8;this[_0x402923(0x1ad)]!==Number(_0x2b8786)&&(this[_0x402923(0x1ad)]=Number(_0x2b8786),this['_updateColorFilter']());},Sprite_VisualParallax[_0xba83a8(0x15b)][_0xba83a8(0x1ec)]=function(){const _0x3798fd=_0xba83a8;this['setColorTone'](this[_0x3798fd(0x1c5)]()[_0x3798fd(0x16f)]);},Sprite_VisualParallax['prototype']['setColorTone']=function(_0x4758e3){const _0x580e2a=_0xba83a8;if(!(_0x4758e3 instanceof Array))throw new Error('Argument\x20must\x20be\x20an\x20array');!this[_0x580e2a(0x165)][_0x580e2a(0x16b)](_0x4758e3)&&(this[_0x580e2a(0x165)]=_0x4758e3[_0x580e2a(0x226)](),this[_0x580e2a(0x1df)]());},Sprite_VisualParallax[_0xba83a8(0x15b)][_0xba83a8(0x1a3)]=function(){const _0x1413e9=_0xba83a8;if(!this[_0x1413e9(0x22c)])return;const _0x2f2050=this[_0x1413e9(0x1c5)]()[_0x1413e9(0x25f)],_0x403e8f=this[_0x1413e9(0x1c5)]()[_0x1413e9(0x217)];if(_0x2f2050[_0x1413e9(0x166)]<=0x0&&_0x403e8f[_0x1413e9(0x166)]<=0x0)return;if($gameMap['isLoopHorizontal']()||$gameMap[_0x1413e9(0x15f)]())return;this[_0x1413e9(0x22c)]['x']=Math[_0x1413e9(0x1d4)](-$gameMap[_0x1413e9(0x25c)]()*$gameMap['tileWidth']()),this[_0x1413e9(0x22c)]['y']=Math[_0x1413e9(0x1d4)](-$gameMap['displayY']()*$gameMap[_0x1413e9(0x180)]());};function Sprite_ReflectionCharacter(){this['initialize'](...arguments);}function _0x508d(_0x1f7ffe,_0x2087f7){const _0xff64e7=_0xff64();return _0x508d=function(_0x508dd7,_0x481715){_0x508dd7=_0x508dd7-0x13d;let _0x6054a7=_0xff64e7[_0x508dd7];return _0x6054a7;},_0x508d(_0x1f7ffe,_0x2087f7);}Sprite_ReflectionCharacter[_0xba83a8(0x15b)]=Object[_0xba83a8(0x1aa)](Sprite_Character['prototype']),Sprite_ReflectionCharacter[_0xba83a8(0x15b)]['constructor']=Sprite_ReflectionCharacter,Sprite_ReflectionCharacter[_0xba83a8(0x15b)][_0xba83a8(0x18b)]=function(_0x1d2eb4){},Sprite_ReflectionCharacter[_0xba83a8(0x15b)][_0xba83a8(0x225)]=function(){const _0x258b4f=_0xba83a8;Sprite_Character[_0x258b4f(0x15b)][_0x258b4f(0x225)][_0x258b4f(0x17e)](this);},Sprite_ReflectionCharacter[_0xba83a8(0x15b)]['updateScaleBase']=function(){const _0xeec9ed=_0xba83a8;this['scale']['x']=this[_0xeec9ed(0x1c0)][_0xeec9ed(0x1e6)],this[_0xeec9ed(0x173)]['y']=-this[_0xeec9ed(0x1c0)][_0xeec9ed(0x249)];},VisuMZ['VisualParallaxes'][_0xba83a8(0x1de)]=Spriteset_Map['prototype']['createParallax'],Spriteset_Map[_0xba83a8(0x15b)][_0xba83a8(0x14d)]=function(){const _0x445204=_0xba83a8;VisuMZ[_0x445204(0x1c6)]['Spriteset_Map_createParallax'][_0x445204(0x17e)](this);if(!$gameMap['getWaterReflectionTop']())this['createWaterReflectionLayer']();if(!$gameMap[_0x445204(0x1d1)]())this[_0x445204(0x1d7)]();this[_0x445204(0x1a0)](),this[_0x445204(0x1d8)](),this[_0x445204(0x1cb)]();if($gameMap[_0x445204(0x236)]())this[_0x445204(0x1a5)]();if($gameMap[_0x445204(0x1d1)]())this[_0x445204(0x1d7)]();},Spriteset_Map[_0xba83a8(0x15b)][_0xba83a8(0x1a5)]=function(){const _0x1a773b=_0xba83a8;if(!PIXI[_0x1a773b(0x1b4)])return;if($gameMap[_0x1a773b(0x19c)]()||$gameMap[_0x1a773b(0x15f)]())return;if($gameMap[_0x1a773b(0x209)]())return;this[_0x1a773b(0x23d)]=new Sprite(),this['_waterReflectContainer']=new Sprite(),this[_0x1a773b(0x1f3)]=![],this[_0x1a773b(0x13d)][_0x1a773b(0x13f)](this[_0x1a773b(0x23d)]),this[_0x1a773b(0x23d)][_0x1a773b(0x1b4)]=[],this['_waterReflectLayer'][_0x1a773b(0x186)]=$gameMap['getWaterReflectionOpacity'](),!!PIXI[_0x1a773b(0x1b4)][_0x1a773b(0x1e1)]&&(this[_0x1a773b(0x23d)]['_reflectFilter']=new PIXI[(_0x1a773b(0x1b4))][(_0x1a773b(0x1e1))]({'boundary':$gameMap[_0x1a773b(0x19d)](),'amplitude':$gameMap[_0x1a773b(0x260)](),'waveLength':$gameMap[_0x1a773b(0x1be)](),'mirror':![]})),!!PIXI['filters'][_0x1a773b(0x235)]&&(this[_0x1a773b(0x23d)][_0x1a773b(0x19b)]=new PIXI[(_0x1a773b(0x1b4))][(_0x1a773b(0x235))]($gameMap[_0x1a773b(0x154)]()),this['_waterReflectLayer'][_0x1a773b(0x1b4)][_0x1a773b(0x242)](this[_0x1a773b(0x23d)][_0x1a773b(0x19b)])),this[_0x1a773b(0x148)]();},Spriteset_Map['prototype'][_0xba83a8(0x148)]=function(){const _0x4e5930=_0xba83a8,_0x5fc9f9=$gameMap[_0x4e5930(0x1c2)](),_0x29363b=$gameMap[_0x4e5930(0x1f2)](),_0x388608=this[_0x4e5930(0x247)](_0x5fc9f9,_0x29363b);_0x388608&&(this[_0x4e5930(0x13f)](_0x388608),this[_0x4e5930(0x23d)][_0x4e5930(0x172)]=_0x388608);},Spriteset_Map[_0xba83a8(0x15b)][_0xba83a8(0x1d7)]=function(){const _0x384e8e=_0xba83a8;if(!PIXI[_0x384e8e(0x1b4)])return;if($gameMap['isLoopHorizontal']()||$gameMap[_0x384e8e(0x15f)]())return;if($gameMap[_0x384e8e(0x209)]())return;this[_0x384e8e(0x1fa)]=new Sprite(),this[_0x384e8e(0x1e8)]=new Sprite(),this[_0x384e8e(0x232)]=![],this[_0x384e8e(0x13d)][_0x384e8e(0x13f)](this['_solidReflectLayer']),this['_solidReflectLayer']['filters']=[],this['_solidReflectLayer'][_0x384e8e(0x186)]=$gameMap['getSolidReflectionOpacity'](),!!PIXI[_0x384e8e(0x1b4)][_0x384e8e(0x235)]&&(this['_solidReflectLayer'][_0x384e8e(0x19b)]=new PIXI['filters'][(_0x384e8e(0x235))]($gameMap[_0x384e8e(0x196)]()),this[_0x384e8e(0x1fa)][_0x384e8e(0x1b4)][_0x384e8e(0x242)](this[_0x384e8e(0x1fa)][_0x384e8e(0x19b)])),this[_0x384e8e(0x15a)]();},Spriteset_Map['prototype']['createSolidReflectionMask']=function(){const _0xbe71d4=_0xba83a8,_0x394f09=$gameMap[_0xbe71d4(0x1d1)](),_0x44327c=$gameMap[_0xbe71d4(0x1c9)](),_0x2a21cb=this[_0xbe71d4(0x247)](_0x394f09,_0x44327c);_0x2a21cb&&(this[_0xbe71d4(0x13f)](_0x2a21cb),this[_0xbe71d4(0x1fa)][_0xbe71d4(0x172)]=_0x2a21cb);},Spriteset_Map[_0xba83a8(0x15b)][_0xba83a8(0x247)]=function(_0x56faa4,_0x21ee58){const _0x27217=_0xba83a8;if(_0x56faa4[_0x27217(0x166)]<=0x0&&_0x21ee58['length']<=0x0)return null;const _0x1e0203=$gameMap[_0x27217(0x156)](),_0x395bc8=$gameMap[_0x27217(0x175)](),_0xb6a5ca=$gameMap['tileWidth'](),_0x141bb9=$gameMap[_0x27217(0x180)](),_0x49ecb5=0x0,_0x2b9419=_0x49ecb5*0x2,_0x4267bc=new Sprite();_0x4267bc[_0x27217(0x155)]=new Bitmap(_0x1e0203*_0xb6a5ca,_0x395bc8*_0x141bb9);for(let _0x435ba2=0x0;_0x435ba2<_0x1e0203;_0x435ba2++){for(let _0x16f6b9=0x0;_0x16f6b9<_0x395bc8;_0x16f6b9++){const _0x19bb99=$gameMap[_0x27217(0x160)](_0x435ba2,_0x16f6b9);(_0x56faa4[_0x27217(0x1a7)](_0x19bb99)||_0x21ee58[_0x27217(0x1a7)]($gameMap[_0x27217(0x200)](_0x435ba2,_0x16f6b9)))&&(_0x4267bc[_0x27217(0x155)]['fillRect'](_0x435ba2*_0xb6a5ca+_0x49ecb5,_0x16f6b9*_0x141bb9+_0x49ecb5,_0xb6a5ca-_0x2b9419,_0x141bb9-_0x2b9419,'#ffffff'),Imported[_0x27217(0x17c)]&&SceneManager[_0x27217(0x14a)]['_grafterRefreshRegions'][_0x27217(0x242)](_0x19bb99));}}return _0x4267bc;},VisuMZ[_0xba83a8(0x1c6)][_0xba83a8(0x17a)]=Spriteset_Map[_0xba83a8(0x15b)][_0xba83a8(0x1fe)],Spriteset_Map[_0xba83a8(0x15b)][_0xba83a8(0x1fe)]=function(){const _0x49fb7a=_0xba83a8;VisuMZ[_0x49fb7a(0x1c6)][_0x49fb7a(0x17a)][_0x49fb7a(0x17e)](this),this[_0x49fb7a(0x1d3)]();},Spriteset_Map['prototype'][_0xba83a8(0x1d3)]=function(){const _0x28de06=_0xba83a8;if($gameMap['noReflections']())return;const _0x4568f2=[],_0x483be4=[];for(const _0x33e52f of $gameMap[_0x28de06(0x174)]()){if(_0x33e52f[_0x28de06(0x258)])continue;_0x4568f2['push'](new Sprite_ReflectionCharacter(_0x33e52f)),_0x483be4[_0x28de06(0x242)](new Sprite_ReflectionCharacter(_0x33e52f));}for(const _0x30d7c9 of $gameMap[_0x28de06(0x223)]()){_0x4568f2['push'](new Sprite_ReflectionCharacter(_0x30d7c9)),_0x483be4[_0x28de06(0x242)](new Sprite_ReflectionCharacter(_0x30d7c9));}for(const _0x278542 of $gamePlayer[_0x28de06(0x16e)]()['reverseData']()){_0x4568f2[_0x28de06(0x242)](new Sprite_ReflectionCharacter(_0x278542)),_0x483be4[_0x28de06(0x242)](new Sprite_ReflectionCharacter(_0x278542));}_0x4568f2[_0x28de06(0x242)](new Sprite_ReflectionCharacter($gamePlayer)),_0x483be4[_0x28de06(0x242)](new Sprite_ReflectionCharacter($gamePlayer));if(this['_waterReflectLayer'])for(const _0xbc2812 of _0x4568f2){_0xbc2812[_0x28de06(0x1b0)]=!![],this[_0x28de06(0x205)][_0x28de06(0x13f)](_0xbc2812),_0xbc2812[_0x28de06(0x173)]['y']=-0.85,_0xbc2812[_0x28de06(0x1b4)]=_0xbc2812[_0x28de06(0x1b4)]||[],this[_0x28de06(0x23d)][_0x28de06(0x1e3)]&&_0xbc2812[_0x28de06(0x1b4)][_0x28de06(0x242)](this['_waterReflectLayer']['_reflectFilter']);}if(this[_0x28de06(0x1fa)])for(const _0x149803 of _0x483be4){_0x149803[_0x28de06(0x1b0)]=!![],this[_0x28de06(0x1e8)][_0x28de06(0x13f)](_0x149803),_0x149803[_0x28de06(0x173)]['y']=-0.85;}},VisuMZ[_0xba83a8(0x1c6)][_0xba83a8(0x24b)]=Spriteset_Map[_0xba83a8(0x15b)]['createSpawnedEvent'],Spriteset_Map[_0xba83a8(0x15b)]['createSpawnedEvent']=function(_0x41dde0){const _0x2c0a02=_0xba83a8;VisuMZ[_0x2c0a02(0x1c6)][_0x2c0a02(0x24b)][_0x2c0a02(0x17e)](this,_0x41dde0);if(_0x41dde0[_0x2c0a02(0x258)])return;{const _0x2b2879=new Sprite_ReflectionCharacter(_0x41dde0);_0x2b2879[_0x2c0a02(0x1b0)]=!![],this['_waterReflectLayer'][_0x2c0a02(0x13f)](_0x2b2879),_0x2b2879[_0x2c0a02(0x173)]['y']=-0.85,_0x2b2879['filters']=_0x2b2879[_0x2c0a02(0x1b4)]||[],this[_0x2c0a02(0x23d)][_0x2c0a02(0x1e3)]&&_0x2b2879[_0x2c0a02(0x1b4)][_0x2c0a02(0x242)](this[_0x2c0a02(0x23d)][_0x2c0a02(0x1e3)]);}{const _0x2b5de9=new Sprite_ReflectionCharacter(_0x41dde0);_0x2b5de9[_0x2c0a02(0x1b0)]=!![],this[_0x2c0a02(0x1fa)][_0x2c0a02(0x13f)](_0x2b5de9),_0x2b5de9[_0x2c0a02(0x173)]['y']=-0.85;}},VisuMZ[_0xba83a8(0x1c6)][_0xba83a8(0x21d)]=Spriteset_Map['prototype'][_0xba83a8(0x225)],Spriteset_Map['prototype'][_0xba83a8(0x225)]=function(){const _0x1deda3=_0xba83a8;VisuMZ[_0x1deda3(0x1c6)][_0x1deda3(0x21d)][_0x1deda3(0x17e)](this),this[_0x1deda3(0x198)](),this[_0x1deda3(0x23b)]();},Spriteset_Map[_0xba83a8(0x15b)][_0xba83a8(0x198)]=function(){const _0x51accf=_0xba83a8;if(!this[_0x51accf(0x23d)])return;if($gameMap){if(!this[_0x51accf(0x1f3)]&&$gameMap[_0x51accf(0x1f4)]())this[_0x51accf(0x23d)][_0x51accf(0x13f)](this[_0x51accf(0x205)]),this[_0x51accf(0x1f3)]=!![];else this['_waterReflectAdded']&&!$gameMap[_0x51accf(0x1f4)]()&&(this[_0x51accf(0x23d)][_0x51accf(0x25a)](this[_0x51accf(0x205)]),this[_0x51accf(0x1f3)]=![]);}this[_0x51accf(0x23d)][_0x51accf(0x1e3)]&&(this[_0x51accf(0x23d)][_0x51accf(0x1e3)][_0x51accf(0x145)]+=0.05);const _0x234756=this[_0x51accf(0x23d)]['_mask'];_0x234756&&(_0x234756['x']=Math[_0x51accf(0x1d4)](-$gameMap[_0x51accf(0x25c)]()*$gameMap[_0x51accf(0x1bb)]()),_0x234756['y']=Math[_0x51accf(0x1d4)](-$gameMap['displayY']()*$gameMap[_0x51accf(0x180)]()));},Spriteset_Map[_0xba83a8(0x15b)][_0xba83a8(0x23b)]=function(){const _0x21534c=_0xba83a8;if(!this[_0x21534c(0x1fa)])return;if($gameMap){if(!this[_0x21534c(0x232)]&&$gameMap[_0x21534c(0x1fd)]())this[_0x21534c(0x1fa)][_0x21534c(0x13f)](this['_solidReflectContainer']),this[_0x21534c(0x232)]=!![];else this[_0x21534c(0x232)]&&!$gameMap[_0x21534c(0x1fd)]()&&(this[_0x21534c(0x1fa)][_0x21534c(0x25a)](this[_0x21534c(0x1e8)]),this[_0x21534c(0x232)]=![]);}const _0x12d617=this[_0x21534c(0x1fa)][_0x21534c(0x176)];_0x12d617&&(_0x12d617['x']=Math[_0x21534c(0x1d4)](-$gameMap[_0x21534c(0x25c)]()*$gameMap['tileWidth']()),_0x12d617['y']=Math[_0x21534c(0x1d4)](-$gameMap[_0x21534c(0x215)]()*$gameMap[_0x21534c(0x180)]()));},Spriteset_Map['prototype']['createParallaxContainer']=function(){const _0x536879=_0xba83a8;this[_0x536879(0x227)]=new Sprite(),this[_0x536879(0x13d)]['addChild'](this[_0x536879(0x227)]),this[_0x536879(0x14c)]=[null];},Spriteset_Map[_0xba83a8(0x15b)][_0xba83a8(0x1d8)]=function(){const _0x1152d2=_0xba83a8,_0x1b9110=$gameMap[_0x1152d2(0x163)]();for(const _0x4f0101 of _0x1b9110){if(!_0x4f0101)continue;this['createNewParallaxLayer'](_0x4f0101);}},Spriteset_Map['prototype'][_0xba83a8(0x239)]=function(_0x1322b5){const _0x44e2fa=_0xba83a8;if(!_0x1322b5)return;const _0x22c4fc=new Sprite_VisualParallax(_0x1322b5['id']);_0x22c4fc[_0x44e2fa(0x1f9)](0x0,0x0,Graphics[_0x44e2fa(0x156)],Graphics['height']),this[_0x44e2fa(0x227)]['addChild'](_0x22c4fc);},Spriteset_Map['prototype'][_0xba83a8(0x1cb)]=function(){const _0x2ac4dc=_0xba83a8;this['_parallaxContainer'][_0x2ac4dc(0x151)][_0x2ac4dc(0x233)]((_0x4c16a7,_0x5b5f8d)=>_0x4c16a7['_id']-_0x5b5f8d[_0x2ac4dc(0x182)]);},Spriteset_Map[_0xba83a8(0x15b)][_0xba83a8(0x16c)]=function(_0x350373){const _0x5510c0=_0xba83a8;return this[_0x5510c0(0x227)]['children']['find'](_0x474973=>_0x474973[_0x5510c0(0x182)]===_0x350373);},Spriteset_Map[_0xba83a8(0x15b)][_0xba83a8(0x219)]=function(_0x47993c){const _0x4c67f9=_0xba83a8,_0xbad257=this['findTargetVisualParallax'](_0x47993c);_0xbad257&&this[_0x4c67f9(0x227)][_0x4c67f9(0x25a)](_0xbad257);},Spriteset_Map[_0xba83a8(0x15b)][_0xba83a8(0x183)]=function(_0x421a52,_0x3e223f){const _0x3514ab=_0xba83a8,_0x5ba189=this['findTargetVisualParallax'](_0x421a52);!_0x5ba189?(this[_0x3514ab(0x239)]($gameMap[_0x3514ab(0x1db)](_0x421a52)),this['sortVisualParallaxes']()):(_0x5ba189[_0x3514ab(0x22e)](),_0x3e223f&&_0x5ba189['bitmap']['addLoadListener'](_0x5ba189[_0x3514ab(0x164)][_0x3514ab(0x13e)](_0x5ba189)));};