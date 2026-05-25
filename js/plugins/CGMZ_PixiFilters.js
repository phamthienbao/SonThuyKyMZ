/*:
 * @author Casper Gaming
 * @url https://www.caspergaming.com/plugins/cgmz/pixifilters/
 * @target MZ
 * @base CGMZ_Core
 * @orderAfter CGMZ_Core
 * @plugindesc Adds additional PIXI filters to RPG Maker
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
 * Made for RPG Maker MZ 1.1.0
 * ----------------------------------------------------------------------------
 * Description: This plugin adds additional PIXI filters to your game, such as
 * godrays, crt, glitch, and many more. Plugin commands are provided to use
 * these filters as is, or they may be used by other plugins.
 * ----------------------------------------------------------------------------
 * Documentation:
 * You can find documentation and a demo on the additional filters at:
 * https://pixijs.io/pixi-filters/docs/
 *
 * These filters are licensed under MIT license and not made by Casper Gaming.
 * CGMZ PIXI Filters only provides a user friendly way to access these filters 
 * within RPG Maker since they are not built-in for RPG Maker.
 *
 * For the target property, by default only Spriteset_Map and Spriteset_Battle
 * are supported. If you use any other plugins which create their own
 * Spritesets, this plugin should also work with those custom spritesets.
 * The target determines in which scenes the filter will display.
 *
 * Limitations:
 * - You can only have 1 filter per unique identifier assigned to the filter.
 * - You can only have 1 filter of the same type per scene (no 2 godray
 *   filters on the map but you can have 1 godray on the map and a different
 *   one on the battle scene).
 *
 * Performance Note: Using too many filters may lead to drops in FPS.
 *
 * Currently this plugin supports the following filters:
 * - Godray Filter
 * - CRT Filter
 * - Old Film Filter
 * - Glitch Filter
 * - Ascii Filter
 * - CrossHatch Filter
 * - Kawase Blur Filter
 * - Dot Filter
 * - Pixelate Filter
 *
 * Additional filters will be added over time
 *
 * Version History:
 * 1.0.0 - Initial release
 *
 * The MIT License - Pixi Filters
 * Copyright (c) 2013-2017 Mathew Groves, Chad Engler
 * 
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to
 * deal in the Software without restriction, including without limitation the
 * rights to use, copy, modify, merge, publish, distribute, sublicense, and/or
 * sell copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 * 
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 * 
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
 * FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS
 * IN THE SOFTWARE.
 *
 * @command createGodrayFilter
 * @text Create Godray Filter
 * @desc Creates a new godray filter
 *
 * @arg target
 * @text Target
 * @type text[]
 * @desc The target to add the filter onto, for example Spriteset_Map or Spriteset_Battle. Cannot be empty.
 *
 * @arg identifier
 * @text Identifier
 * @desc Unique identifier to refer to this filter (for changing options later)
 *
 * @arg animating
 * @text Animating
 * @type boolean
 * @default true
 * @desc Determine whether the godray should animate or not
 *
 * @arg animationSpeed
 * @text Animation Speed
 * @type number
 * @min 0.001
 * @max 1.000
 * @decimals 3
 * @default 0.01
 * @desc Speed at which the animation will play
 *
 * @arg time
 * @text Time
 * @type number
 * @min 0
 * @default 0
 * @desc The time position. This is not used if animating.
 *
 * @arg gain
 * @text Gain
 * @type number
 * @min 0.00
 * @max 1.00
 * @decimals 2
 * @default 0.50
 * @desc General intensity of the effect
 *
 * @arg lacunarity
 * @text Lacunarity
 * @type number
 * @min 0.0
 * @max 5.0
 * @decimals 1
 * @default 2.5
 * @desc Density of fractal noise
 *
 * @arg parallel
 * @text Parallel
 * @type boolean
 * @default true
 * @desc True to use angle, False to use center
 *
 * @arg angle
 * @text Angle
 * @type number
 * @min -60
 * @max 60
 * @default 30
 * @decimals 0
 * @desc Angle / Light source of rays (if using parallel)
 *
 * @arg x
 * @text x
 * @type number
 * @default 0
 * @desc x origin of light rays (if not using parallel)
 *
 * @arg y
 * @text y
 * @type number
 * @default 0
 * @desc y origin of light rays (if not using parallel)
 *
 * @command editGodrayFilter
 * @text Edit Godray Filter
 * @desc Edits an existing godray filter
 *
 * @arg identifier
 * @text Identifier
 * @desc Unique identifier set for the filter
 *
 * @arg animating
 * @text Animating
 * @type boolean
 * @default true
 * @desc Determine whether the godray should animate or not
 *
 * @arg animationSpeed
 * @text Animation Speed
 * @type number
 * @min 0.001
 * @max 1.000
 * @decimals 3
 * @default 0.01
 * @desc Speed at which the animation will play
 *
 * @arg gain
 * @text Gain
 * @type number
 * @min 0.00
 * @max 1.00
 * @decimals 2
 * @default 0.50
 * @desc General intensity of the effect
 *
 * @arg lacunarity
 * @text Lacunarity
 * @type number
 * @min 0.0
 * @max 5.0
 * @decimals 1
 * @default 2.5
 * @desc Density of fractal noise
 *
 * @arg angle
 * @text Angle
 * @type number
 * @min -60
 * @max 60
 * @default 30
 * @decimals 0
 * @desc Angle / Light source of rays (if using parallel)
 *
 * @arg x
 * @text x
 * @type number
 * @default 0
 * @desc x origin of light rays (if not using parallel)
 *
 * @arg y
 * @text y
 * @type number
 * @default 0
 * @desc y origin of light rays (if not using parallel)
 *
 * @command createCRTFilter
 * @text Create CRT Filter
 * @desc Creates a new CRT filter
 *
 * @arg target
 * @text Target
 * @type text[]
 * @desc The target to add the filter onto, for example Spriteset_Map or Spriteset_Battle. Cannot be empty.
 *
 * @arg identifier
 * @text Identifier
 * @desc Unique identifier to refer to this filter (for changing options later)
 *
 * @arg animating
 * @text Animating
 * @type boolean
 * @default true
 * @desc Determine whether the crt should animate or not
 *
 * @arg animationSpeed
 * @text Animation Speed
 * @type number
 * @min 0.001
 * @max 1.000
 * @decimals 3
 * @default 0.3
 * @desc Speed at which the animation will play
 *
 * @arg time
 * @text Time
 * @type number
 * @min 0
 * @default 0
 * @desc The time position. This is not used if animating.
 *
 * @arg curvature
 * @text Curvature
 * @type number
 * @min 0
 * @decimals 1
 * @default 1.0
 * @desc The amount of curvature to give the lines.
 *
 * @arg lineWidth
 * @text Line Width
 * @type number
 * @min 0
 * @decimals 1
 * @default 1.0
 * @desc The width of the lines
 *
 * @arg lineContrast
 * @text Line Contrast
 * @type number
 * @min 0
 * @max 1
 * @decimals 2
 * @default 0.25
 * @desc The contrast of the lines
 *
 * @arg noise
 * @text Noise
 * @type number
 * @min 0
 * @max 1
 * @decimals 2
 * @default 0
 * @desc The opacity/intensity of the noise pixels
 *
 * @arg noiseSize
 * @text Noise Size
 * @type number
 * @min 0
 * @max 10
 * @decimals 1
 * @default 1
 * @desc The size of the noise pixels
 *
 * @arg verticalLine
 * @text Vertical Line
 * @type boolean
 * @default false
 * @desc Whether lines should be vertical (true) or horizontal (false)
 *
 * @arg seed
 * @text Seed
 * @type number
 * @min 0
 * @max 1
 * @decimals 2
 * @default 0
 * @desc The seed to use for random pixel generation
 *
 * @arg vignetting
 * @text Vignetting
 * @type number
 * @min 0
 * @max 1
 * @decimals 2
 * @default 0
 * @desc The radius of vignette effect. Smaller value = smaller effect
 *
 * @arg vignettingAlpha
 * @text Vignetting Alpha
 * @type number
 * @min 0
 * @max 1
 * @decimals 2
 * @default 0
 * @desc The opacity of the vignette effect
 *
 * @arg vignettingBlur
 * @text Vignetting Blur
 * @type number
 * @min 0
 * @max 1
 * @decimals 2
 * @default 0
 * @desc The intensity of the blur effect on the vignette
 *
 * @command editCRTFilter
 * @text Edit CRT Filter
 * @desc Edit an existing CRT filter by identifier
 *
 * @arg identifier
 * @text Identifier
 * @desc Unique identifier that refers to the filter to edit
 *
 * @arg animating
 * @text Animating
 * @type boolean
 * @default true
 * @desc Determine whether the crt should animate or not
 *
 * @arg animationSpeed
 * @text Animation Speed
 * @type number
 * @min 0.001
 * @max 1.000
 * @decimals 3
 * @default 0.3
 * @desc Speed at which the animation will play
 *
 * @arg curvature
 * @text Curvature
 * @type number
 * @min 0
 * @decimals 1
 * @default 1.0
 * @desc The amount of curvature to give the lines.
 *
 * @arg lineWidth
 * @text Line Width
 * @type number
 * @min 0
 * @decimals 1
 * @default 1.0
 * @desc The width of the lines
 *
 * @arg lineContrast
 * @text Line Contrast
 * @type number
 * @min 0
 * @max 1
 * @decimals 2
 * @default 0.25
 * @desc The contrast of the lines
 *
 * @arg noise
 * @text Noise
 * @type number
 * @min 0
 * @max 1
 * @decimals 2
 * @default 0
 * @desc The opacity/intensity of the noise pixels
 *
 * @arg noiseSize
 * @text Noise Size
 * @type number
 * @min 0
 * @max 10
 * @decimals 1
 * @default 1
 * @desc The size of the noise pixels
 *
 * @arg vignetting
 * @text Vignetting
 * @type number
 * @min 0
 * @max 1
 * @decimals 2
 * @default 0
 * @desc The radius of vignette effect. Smaller value = smaller effect
 *
 * @arg vignettingAlpha
 * @text Vignetting Alpha
 * @type number
 * @min 0
 * @max 1
 * @decimals 2
 * @default 0
 * @desc The opacity of the vignette effect
 *
 * @arg vignettingBlur
 * @text Vignetting Blur
 * @type number
 * @min 0
 * @max 1
 * @decimals 2
 * @default 0
 * @desc The intensity of the blur effect on the vignette
 *
 * @command createOldFilmFilter
 * @text Create Old Film Filter
 * @desc Creates a new Old Film filter
 *
 * @arg target
 * @text Target
 * @type text[]
 * @desc The target to add the filter onto, for example Spriteset_Map or Spriteset_Battle. Cannot be empty.
 *
 * @arg identifier
 * @text Identifier
 * @desc Unique identifier to refer to this filter (for changing options later)
 *
 * @arg animating
 * @text Animating
 * @type boolean
 * @default true
 * @desc Determine whether the old film filter should animate or not
 *
 * @arg sepia
 * @text Sepia
 * @type number
 * @min 0
 * @max 1
 * @decimals 2
 * @default 0.30
 * @desc The amount of saturation on the sepia effect.
 *
 * @arg scratch
 * @text Scratch
 * @type number
 * @min -1
 * @max 1
 * @decimals 2
 * @default 0.50
 * @desc How often scratches appear
 *
 * @arg scratchDensity
 * @text Scratch Density
 * @type number
 * @min 0
 * @max 1
 * @decimals 2
 * @default 0.30
 * @desc The density of scratch lines, higher number = more lines
 *
 * @arg scratchWidth
 * @text Scratch Width
 * @type number
 * @min 0
 * @max 20
 * @decimals 1
 * @default 1.0
 * @desc The width of the scratch lines
 *
 * @arg noise
 * @text Noise
 * @type number
 * @min 0
 * @max 1
 * @decimals 2
 * @default 0
 * @desc The opacity/intensity of the noise pixels
 *
 * @arg noiseSize
 * @text Noise Size
 * @type number
 * @min 0
 * @max 10
 * @decimals 1
 * @default 1
 * @desc The size of the noise pixels
 *
 * @arg seed
 * @text Seed
 * @type number
 * @min 0
 * @max 1
 * @decimals 2
 * @default 0
 * @desc The seed to use for random pixel generation
 *
 * @arg vignetting
 * @text Vignetting
 * @type number
 * @min 0
 * @max 1
 * @decimals 2
 * @default 0
 * @desc The radius of vignette effect. Smaller value = smaller effect
 *
 * @arg vignettingAlpha
 * @text Vignetting Alpha
 * @type number
 * @min 0
 * @max 1
 * @decimals 2
 * @default 0
 * @desc The opacity of the vignette effect
 *
 * @arg vignettingBlur
 * @text Vignetting Blur
 * @type number
 * @min 0
 * @max 1
 * @decimals 2
 * @default 0
 * @desc The intensity of the blur effect on the vignette
 *
 * @command editOldFilmFilter
 * @text Edit Old Film Filter
 * @desc Edits an existing Old Film filter by identifier
 *
 * @arg identifier
 * @text Identifier
 * @desc Unique identifier of the filter to edit
 *
 * @arg animating
 * @text Animating
 * @type boolean
 * @default true
 * @desc Determine whether the old film filter should animate or not
 *
 * @arg sepia
 * @text Sepia
 * @type number
 * @min 0
 * @max 1
 * @decimals 2
 * @default 0.30
 * @desc The amount of saturation on the sepia effect.
 *
 * @arg scratch
 * @text Scratch
 * @type number
 * @min -1
 * @max 1
 * @decimals 2
 * @default 0.50
 * @desc How often scratches appear
 *
 * @arg scratchDensity
 * @text Scratch Density
 * @type number
 * @min 0
 * @max 1
 * @decimals 2
 * @default 0.30
 * @desc The density of scratch lines, higher number = more lines
 *
 * @arg scratchWidth
 * @text Scratch Width
 * @type number
 * @min 0
 * @max 20
 * @decimals 1
 * @default 1.0
 * @desc The width of the scratch lines
 *
 * @arg noise
 * @text Noise
 * @type number
 * @min 0
 * @max 1
 * @decimals 2
 * @default 0
 * @desc The opacity/intensity of the noise pixels
 *
 * @arg noiseSize
 * @text Noise Size
 * @type number
 * @min 0
 * @max 10
 * @decimals 1
 * @default 1
 * @desc The size of the noise pixels
 *
 * @arg vignetting
 * @text Vignetting
 * @type number
 * @min 0
 * @max 1
 * @decimals 2
 * @default 0
 * @desc The radius of vignette effect. Smaller value = smaller effect
 *
 * @arg vignettingAlpha
 * @text Vignetting Alpha
 * @type number
 * @min 0
 * @max 1
 * @decimals 2
 * @default 0
 * @desc The opacity of the vignette effect
 *
 * @arg vignettingBlur
 * @text Vignetting Blur
 * @type number
 * @min 0
 * @max 1
 * @decimals 2
 * @default 0
 * @desc The intensity of the blur effect on the vignette
 *
 * @command createGlitchFilter
 * @text Create Glitch Filter
 * @desc Creates a new Glitch filter
 *
 * @arg target
 * @text Target
 * @type text[]
 * @desc The target to add the filter onto, for example Spriteset_Map or Spriteset_Battle. Cannot be empty.
 *
 * @arg identifier
 * @text Identifier
 * @desc Unique identifier to refer to this filter (for changing options later)
 *
 * @arg animating
 * @text Animating
 * @type boolean
 * @default true
 * @desc Determine whether the old film filter should animate or not
 *
 * @arg average
 * @text Average
 * @type boolean
 * @default false
 * @desc True divides the bands roughly equally, false makes them more random looking
 *
 * @arg slices
 * @text Slices
 * @type number
 * @min 2
 * @max 20
 * @default 5
 * @desc Number of glitch slices
 *
 * @arg offset
 * @text Offset
 * @type number
 * @min -400
 * @max 400
 * @default 100
 * @desc The max offset of the slices
 *
 * @arg direction
 * @text Direction
 * @type number
 * @min -180
 * @max 180
 * @default 0
 * @desc Angle of offset of the slices
 *
 * @arg fillMode
 * @text Fill Mode
 * @type select
 * @option Transparent
 * @option Original
 * @option Loop
 * @option Clamp
 * @option Mirror
 * @default Loop
 * @desc The fill mode of the glitch slices
 *
 * @arg minSize
 * @text Min Size
 * @type number
 * @min 1
 * @max 512
 * @default 8
 * @desc The minimum size of individual slice, as a segment of sample size
 *
 * @arg sampleSize
 * @text Sample Size
 * @type number
 * @min 1
 * @max 2048
 * @default 512
 * @desc The resolution of the displacement map texture
 *
 * @arg redX
 * @text Red X
 * @type number
 * @min -200
 * @max 200
 * @default 0
 * @desc The offset of the color red (x axis)
 *
 * @arg redY
 * @text Red Y
 * @type number
 * @min -200
 * @max 200
 * @default 0
 * @desc The offset of the color red (y axis)
 *
 * @arg blueX
 * @text Blue X
 * @type number
 * @min -200
 * @max 200
 * @default 0
 * @desc The offset of the color blue (x axis)
 *
 * @arg blueY
 * @text Blue Y
 * @type number
 * @min -200
 * @max 200
 * @default 0
 * @desc The offset of the color blue (y axis)
 *
 * @arg greenX
 * @text Green X
 * @type number
 * @min -200
 * @max 200
 * @default 0
 * @desc The offset of the color green (x axis)
 *
 * @arg greenY
 * @text Green Y
 * @type number
 * @min -200
 * @max 200
 * @default 0
 * @desc The offset of the color green (y axis)
 *
 * @command editGlitchFilter
 * @text Edit Glitch Filter
 * @desc Edit an existing Glitch filter
 *
 * @arg identifier
 * @text Identifier
 * @desc Unique identifier to refer to this filter (for changing options later)
 *
 * @arg animating
 * @text Animating
 * @type boolean
 * @default true
 * @desc Determine whether the old film filter should animate or not
 *
 * @arg average
 * @text Average
 * @type boolean
 * @default false
 * @desc True divides the bands roughly equally, false makes them more random looking
 *
 * @arg refresh
 * @text Refresh
 * @type boolean
 * @default false
 * @desc True refreshes the filter with new slices. False has no effect.
 *
 * @arg slices
 * @text Slices
 * @type number
 * @min 2
 * @max 20
 * @default 5
 * @desc Number of glitch slices
 *
 * @arg offset
 * @text Offset
 * @type number
 * @min -400
 * @max 400
 * @default 100
 * @desc The max offset of the slices
 *
 * @arg direction
 * @text Direction
 * @type number
 * @min -180
 * @max 180
 * @default 0
 * @desc Angle of offset of the slices
 *
 * @arg fillMode
 * @text Fill Mode
 * @type select
 * @option Transparent
 * @option Original
 * @option Loop
 * @option Clamp
 * @option Mirror
 * @default Loop
 * @desc The fill mode of the glitch slices
 *
 * @arg minSize
 * @text Min Size
 * @type number
 * @min 1
 * @max 512
 * @default 8
 * @desc The minimum size of individual slice, as a segment of sample size
 *
 * @arg sampleSize
 * @text Sample Size
 * @type number
 * @min 1
 * @max 2048
 * @default 512
 * @desc The resolution of the displacement map texture
 *
 * @arg redX
 * @text Red X
 * @type number
 * @min -200
 * @max 200
 * @default 0
 * @desc The offset of the color red (x axis)
 *
 * @arg redY
 * @text Red Y
 * @type number
 * @min -200
 * @max 200
 * @default 0
 * @desc The offset of the color red (y axis)
 *
 * @arg blueX
 * @text Blue X
 * @type number
 * @min -200
 * @max 200
 * @default 0
 * @desc The offset of the color blue (x axis)
 *
 * @arg blueY
 * @text Blue Y
 * @type number
 * @min -200
 * @max 200
 * @default 0
 * @desc The offset of the color blue (y axis)
 *
 * @arg greenX
 * @text Green X
 * @type number
 * @min -200
 * @max 200
 * @default 0
 * @desc The offset of the color green (x axis)
 *
 * @arg greenY
 * @text Green Y
 * @type number
 * @min -200
 * @max 200
 * @default 0
 * @desc The offset of the color green (y axis)
 *
 * @command createAsciiFilter
 * @text Create Ascii Filter
 * @desc Creates a new Ascii filter
 *
 * @arg target
 * @text Target
 * @type text[]
 * @desc The target to add the filter onto, for example Spriteset_Map or Spriteset_Battle. Cannot be empty.
 *
 * @arg identifier
 * @text Identifier
 * @desc Unique identifier to refer to this filter (for changing options later)
 *
 * @arg size
 * @text Size
 * @type number
 * @min 1
 * @max 24
 * @default 8
 * @desc Speed at which the animation will play
 *
 * @command editAsciiFilter
 * @text Edit Ascii Filter
 * @desc Edits an existing Ascii filter
 *
 * @arg identifier
 * @text Identifier
 * @desc Unique identifier to refer to this filter (for changing options later)
 *
 * @arg size
 * @text Size
 * @type number
 * @min 1
 * @max 24
 * @default 8
 * @desc Speed at which the animation will play
 *
 * @command createCrossHatchFilter
 * @text Create CrossHatch Filter
 * @desc Creates a new CrossHatch filter
 *
 * @arg target
 * @text Target
 * @type text[]
 * @desc The target to add the filter onto, for example Spriteset_Map or Spriteset_Battle. Cannot be empty.
 *
 * @arg identifier
 * @text Identifier
 * @desc Unique identifier to refer to this filter (for changing options later)
 *
 * @command createKawaseBlurFilter
 * @text Create Kawase Blur Filter
 * @desc Creates a new Kawase Blur filter
 *
 * @arg target
 * @text Target
 * @type text[]
 * @desc The target to add the filter onto, for example Spriteset_Map or Spriteset_Battle. Cannot be empty.
 *
 * @arg identifier
 * @text Identifier
 * @desc Unique identifier to refer to this filter (for changing options later)
 *
 * @arg blur
 * @text Blur
 * @type number
 * @min 0
 * @max 20
 * @decimals 1
 * @default 4.0
 * @desc The intensity of the blur effect
 *
 * @arg quality
 * @text Quality
 * @type number
 * @min 1
 * @max 20
 * @decimals 1
 * @default 4.0
 * @desc The quality of the blur effect
 *
 * @arg pixelSizeX
 * @text Pixel Size X
 * @type number
 * @min 0
 * @max 10
 * @decimals 1
 * @default 1.0
 * @desc The pixel size of the filter (x-axis)
 *
 * @arg pixelSizeY
 * @text Pixel Size Y
 * @type number
 * @min 0
 * @max 10
 * @decimals 1
 * @default 1.0
 * @desc The pixel size of the filter (y-axis)
 *
 * @arg clamp
 * @text Clamp
 * @type boolean
 * @default false
 * @desc Clamp edges, useful for removing dark edges from fullscreen filters or bleeding to the edge of filterArea.
 *
 * @command editKawaseBlurFilter
 * @text Edit Kawase Blur Filter
 * @desc Edits an existing Kawase Blur filter
 *
 * @arg identifier
 * @text Identifier
 * @desc Unique identifier referring to this filter
 *
 * @arg blur
 * @text Blur
 * @type number
 * @min 0
 * @max 20
 * @decimals 1
 * @default 4.0
 * @desc The intensity of the blur effect
 *
 * @arg quality
 * @text Quality
 * @type number
 * @min 1
 * @max 20
 * @decimals 1
 * @default 4.0
 * @desc The quality of the blur effect
 *
 * @arg pixelSizeX
 * @text Pixel Size X
 * @type number
 * @min 0
 * @max 10
 * @decimals 1
 * @default 1.0
 * @desc The pixel size of the filter (x-axis)
 *
 * @arg pixelSizeY
 * @text Pixel Size Y
 * @type number
 * @min 0
 * @max 10
 * @decimals 1
 * @default 1.0
 * @desc The pixel size of the filter (y-axis)
 *
 * @command createDotFilter
 * @text Create Dot Filter
 * @desc Creates a new Dot filter
 *
 * @arg target
 * @text Target
 * @type text[]
 * @desc The target to add the filter onto, for example Spriteset_Map or Spriteset_Battle. Cannot be empty.
 *
 * @arg identifier
 * @text Identifier
 * @desc Unique identifier to refer to this filter (for changing options later)
 *
 * @arg scale
 * @text Scale
 * @type number
 * @min 0
 * @max 1
 * @decimals 1
 * @default 1.0
 * @desc The scale of the effect
 *
 * @arg angle
 * @text Angle
 * @type number
 * @min 0
 * @max 5
 * @decimals 1
 * @default 5.0
 * @desc The angle of the effect
 *
 * @command editDotFilter
 * @text Edit Dot Filter
 * @desc Edits an existing Dot filter
 *
 * @arg identifier
 * @text Identifier
 * @desc Unique identifier referring to this filter
 *
 * @arg scale
 * @text Scale
 * @type number
 * @min 0
 * @max 1
 * @decimals 1
 * @default 1.0
 * @desc The scale of the effect
 *
 * @arg angle
 * @text Angle
 * @type number
 * @min 0
 * @max 5
 * @decimals 1
 * @default 5.0
 * @desc The angle of the effect
 *
 * @command createPixelateFilter
 * @text Create Pixelate Filter
 * @desc Creates a new Pixelate filter
 *
 * @arg target
 * @text Target
 * @type text[]
 * @desc The target to add the filter onto, for example Spriteset_Map or Spriteset_Battle. Cannot be empty.
 *
 * @arg identifier
 * @text Identifier
 * @desc Unique identifier to refer to this filter (for changing options later)
 *
 * @arg sizeX
 * @text Size X
 * @type number
 * @min 1
 * @max 40
 * @default 4
 * @desc The size of the pixel blocks (x-axis)
 *
 * @arg sizeY
 * @text Size Y
 * @type number
 * @min 1
 * @max 40
 * @default 4
 * @desc The size of the pixel blocks (y-axis)
 *
 * @command editPixelateFilter
 * @text Edit Pixelate Filter
 * @desc Edits an existing Pixelate filter
 *
 * @arg identifier
 * @text Identifier
 * @desc Unique identifier referring to this filter
 *
 * @arg sizeX
 * @text Size X
 * @type number
 * @min 1
 * @max 40
 * @default 4
 * @desc The size of the pixel blocks (x-axis)
 *
 * @arg sizeY
 * @text Size Y
 * @type number
 * @min 1
 * @max 40
 * @default 4
 * @desc The size of the pixel blocks (y-axis)
 *
 * @command removeFilter
 * @text Removes Filter
 * @desc Removes a filter
 *
 * @arg identifier
 * @text Identifier
 * @desc Unique identifier of the filter to remove
 *
 * @param Temp
 * @type text
 * @default does nothing yet
 * @desc Temp
*/
var Imported = Imported || {};
Imported.CGMZ_PIXIFilters = true;
var CGMZ = CGMZ || {};
CGMZ.Versions = CGMZ.Versions || {};
CGMZ.Versions["Pixi Filters"] = "Alpha";
CGMZ.PixiFilters = CGMZ.PixiFilters || {};
CGMZ.PixiFilters.parameters = PluginManager.parameters('CGMZ_PixiFilters');
CGMZ.PixiFilters.CommandName = CGMZ.PixiFilters.parameters["Temp"];
CGMZ.PixiFilters.FilterNames = {
	godrayFilter: "godrayFilter",
	crtFilter: "crtFilter",
	oldFilmFilter: "oldFilmFilter",
	glitchFilter: "glitchFilter",
	asciiFilter: "asciiFilter",
	crossHatchFilter: "crossHatchFilter",
	kawaseBlurFilter: "kawaseBlurFilter",
	dotFilter: "dotFilter",
	pixelateFilter: "pixelateFilter"
};
//=============================================================================
// CGMZ_Temp
//-----------------------------------------------------------------------------
// Plugin Commands for filters
//=============================================================================
//-----------------------------------------------------------------------------
// Alias. Also add check for if pixi filter has changed
//-----------------------------------------------------------------------------
const alias_CGMZ_PixiFilters_CGMZ_Temp_createPluginData = CGMZ_Temp.prototype.createPluginData;
CGMZ_Temp.prototype.createPluginData = function() {
	alias_CGMZ_PixiFilters_CGMZ_Temp_createPluginData.call(this);
	this._pixiFilterChanged = false;
	this._pixiFiltersEdited = false;
};
//-----------------------------------------------------------------------------
// Check if pixi filter added / removed
//-----------------------------------------------------------------------------
CGMZ_Temp.prototype.isPixiFiltersChanged = function() {
	return this._pixiFilterChanged;
};
//-----------------------------------------------------------------------------
// Set pixi filter added / removed
//-----------------------------------------------------------------------------
CGMZ_Temp.prototype.setPixiFilterChanged = function(value) {
	this._pixiFilterChanged = value;
};
//-----------------------------------------------------------------------------
// Check if pixi filter edited
//-----------------------------------------------------------------------------
CGMZ_Temp.prototype.isPixiFiltersEdited = function() {
	return this._pixiFiltersEdited;
};
//-----------------------------------------------------------------------------
// Set pixi filter edited status
//-----------------------------------------------------------------------------
CGMZ_Temp.prototype.setPixiFilterEdited = function(value) {
	this._pixiFiltersEdited = value;
};
//-----------------------------------------------------------------------------
// Alias. Also register Filter Plugin Commands
//-----------------------------------------------------------------------------
const alias_CGMZ_PixiFilters_CGMZ_Temp_registerPluginCommands = CGMZ_Temp.prototype.registerPluginCommands;
CGMZ_Temp.prototype.registerPluginCommands = function() {
	alias_CGMZ_PixiFilters_CGMZ_Temp_registerPluginCommands.call(this);
	PluginManager.registerCommand("CGMZ_PixiFilters", "createGodrayFilter", this.pluginCommandPixiFiltersCreateGodrayFilter);
	PluginManager.registerCommand("CGMZ_PixiFilters", "editGodrayFilter", this.pluginCommandPixiFiltersEditGodrayFilter);
	PluginManager.registerCommand("CGMZ_PixiFilters", "createCRTFilter", this.pluginCommandPixiFiltersCreateCRTFilter);
	PluginManager.registerCommand("CGMZ_PixiFilters", "editCRTFilter", this.pluginCommandPixiFiltersEditCRTFilter);
	PluginManager.registerCommand("CGMZ_PixiFilters", "createOldFilmFilter", this.pluginCommandPixiFiltersCreateOldFilmFilter);
	PluginManager.registerCommand("CGMZ_PixiFilters", "editOldFilmFilter", this.pluginCommandPixiFiltersEditOldFilmFilter);
	PluginManager.registerCommand("CGMZ_PixiFilters", "createGlitchFilter", this.pluginCommandPixiFiltersCreateGlitchFilter);
	PluginManager.registerCommand("CGMZ_PixiFilters", "editGlitchFilter", this.pluginCommandPixiFiltersEditGlitchFilter);
	PluginManager.registerCommand("CGMZ_PixiFilters", "createAsciiFilter", this.pluginCommandPixiFiltersCreateAsciiFilter);
	PluginManager.registerCommand("CGMZ_PixiFilters", "editAsciiFilter", this.pluginCommandPixiFiltersEditAsciiFilter);
	PluginManager.registerCommand("CGMZ_PixiFilters", "createKawaseBlurFilter", this.pluginCommandPixiFiltersCreateKawaseBlurFilter);
	PluginManager.registerCommand("CGMZ_PixiFilters", "editKawaseBlurFilter", this.pluginCommandPixiFiltersEditKawaseBlurFilter);
	PluginManager.registerCommand("CGMZ_PixiFilters", "createDotFilter", this.pluginCommandPixiFiltersCreateDotFilter);
	PluginManager.registerCommand("CGMZ_PixiFilters", "editDotFilter", this.pluginCommandPixiFiltersEditDotFilter);
	PluginManager.registerCommand("CGMZ_PixiFilters", "createPixelateFilter", this.pluginCommandPixiFiltersCreatePixelateFilter);
	PluginManager.registerCommand("CGMZ_PixiFilters", "editPixelateFilter", this.pluginCommandPixiFiltersEditPixelateFilter);
	PluginManager.registerCommand("CGMZ_PixiFilters", "createCrossHatchFilter", this.pluginCommandPixiFiltersCreateCrossHatchFilter);
	PluginManager.registerCommand("CGMZ_PixiFilters", "removeFilter", this.pluginCommandPixiFiltersRemoveFilter);
};
//-----------------------------------------------------------------------------
// Create godray filter
//-----------------------------------------------------------------------------
CGMZ_Temp.prototype.pluginCommandPixiFiltersCreateGodrayFilter = function(args) {
	const targets = JSON.parse(args.target);
	const identifier = args.identifier;
	const filter = new CGMZ_GodrayFilter(targets, identifier);
	if($cgmz.canAddPixiFilter(CGMZ.PixiFilters.FilterNames.godrayFilter, filter)) {
		filter.gain = parseFloat(args.gain);
		filter.lacunarity = parseFloat(args.lacunarity);
		filter.angle = Number(args.angle);
		filter.center = new Point(Number(args.x), Number(args.y));
		filter.parallel = (args.parallel === "true");
		filter.animating = (args.animating === "true");
		filter.animationSpeed = parseFloat(args.animationSpeed);
		filter.time = parseFloat(args.time);
		$cgmz.addPixiFilter(CGMZ.PixiFilters.FilterNames.godrayFilter, filter);
	}
};
//-----------------------------------------------------------------------------
// Edit godray filter
//-----------------------------------------------------------------------------
CGMZ_Temp.prototype.pluginCommandPixiFiltersEditGodrayFilter = function(args) {
	const filter = $cgmz.getPixiFilterById(CGMZ.PixiFilters.FilterNames.godrayFilter, args.identifier);
	if(filter) {
		filter.gain = parseFloat(args.gain);
		filter.lacunarity = parseFloat(args.lacunarity);
		filter.angle = Number(args.angle);
		filter.center = new Point(Number(args.x), Number(args.y));
		filter.animating = (args.animating === "true");
		filter.animationSpeed = parseFloat(args.animationSpeed);
		$cgmzTemp.setPixiFilterEdited(true);
	}
};
//-----------------------------------------------------------------------------
// Create CRT filter
//-----------------------------------------------------------------------------
CGMZ_Temp.prototype.pluginCommandPixiFiltersCreateCRTFilter = function(args) {
	const targets = JSON.parse(args.target);
	const identifier = args.identifier;
	const filter = new CGMZ_CRTFilter(targets, identifier);
	if($cgmz.canAddPixiFilter(CGMZ.PixiFilters.FilterNames.crtFilter, filter)) {
		filter.animating = (args.animating === "true");
		filter.animationSpeed = parseFloat(args.animationSpeed);
		filter.time = parseFloat(args.time);
		filter.seed = parseFloat(args.seed);
		filter.curvature = parseFloat(args.curvature);
		filter.lineWidth = parseFloat(args.lineWidth);
		filter.lineContrast = parseFloat(args.lineContrast);
		filter.verticalLine = (args.verticalLine === 'true');
		filter.noise = parseFloat(args.noise);
		filter.noiseSize = parseFloat(args.noiseSize);
		filter.vignetting = parseFloat(args.vignetting);
		filter.vignettingAlpha = parseFloat(args.vignettingAlpha);
		filter.vignettingBlur = parseFloat(args.vignettingBlur);
		$cgmz.addPixiFilter(CGMZ.PixiFilters.FilterNames.crtFilter, filter);
	}
};
//-----------------------------------------------------------------------------
// Edit CRT filter
//-----------------------------------------------------------------------------
CGMZ_Temp.prototype.pluginCommandPixiFiltersEditCRTFilter = function(args) {
	const filter = $cgmz.getPixiFilterById(CGMZ.PixiFilters.FilterNames.crtFilter, args.identifier);
	if(filter) {
		filter.curvature = parseFloat(args.curvature);
		filter.lineWidth = parseFloat(args.lineWidth);
		filter.lineContrast = parseFloat(args.lineContrast);
		filter.noise = parseFloat(args.noise);
		filter.noiseSize = parseFloat(args.noiseSize);
		filter.vignetting = parseFloat(args.vignetting);
		filter.vignettingAlpha = parseFloat(args.vignettingAlpha);
		filter.vignettingBlur = parseFloat(args.vignettingBlur);
		filter.animating = (args.animating === "true");
		filter.animationSpeed = parseFloat(args.animationSpeed);
		$cgmzTemp.setPixiFilterEdited(true);
	}
};
//-----------------------------------------------------------------------------
// Create Old Film filter
//-----------------------------------------------------------------------------
CGMZ_Temp.prototype.pluginCommandPixiFiltersCreateOldFilmFilter = function(args) {
	const targets = JSON.parse(args.target);
	const identifier = args.identifier;
	const filter = new CGMZ_OldFilmFilter(targets, identifier);
	if($cgmz.canAddPixiFilter(CGMZ.PixiFilters.FilterNames.oldFilmFilter, filter)) {
		filter.animating = (args.animating === "true");
		filter.seed = parseFloat(args.seed);
		filter.sepia = parseFloat(args.sepia);
		filter.scratch = parseFloat(args.scratch);
		filter.scratchDensity = parseFloat(args.scratchDensity);
		filter.scratchWidth = parseFloat(args.scratchWidth);
		filter.noise = parseFloat(args.noise);
		filter.noiseSize = parseFloat(args.noiseSize);
		filter.vignetting = parseFloat(args.vignetting);
		filter.vignettingAlpha = parseFloat(args.vignettingAlpha);
		filter.vignettingBlur = parseFloat(args.vignettingBlur);
		$cgmz.addPixiFilter(CGMZ.PixiFilters.FilterNames.oldFilmFilter, filter);
	}
};
//-----------------------------------------------------------------------------
// Edit Old Film filter
//-----------------------------------------------------------------------------
CGMZ_Temp.prototype.pluginCommandPixiFiltersEditOldFilmFilter = function(args) {
	const filter = $cgmz.getPixiFilterById(CGMZ.PixiFilters.FilterNames.oldFilmFilter, args.identifier);
	if(filter) {
		filter.sepia = parseFloat(args.sepia);
		filter.scratch = parseFloat(args.scratch);
		filter.scratchDensity = parseFloat(args.scratchDensity);
		filter.scratchWidth = parseFloat(args.scratchWidth);
		filter.noise = parseFloat(args.noise);
		filter.noiseSize = parseFloat(args.noiseSize);
		filter.vignetting = parseFloat(args.vignetting);
		filter.vignettingAlpha = parseFloat(args.vignettingAlpha);
		filter.vignettingBlur = parseFloat(args.vignettingBlur);
		filter.animating = (args.animating === "true");
		$cgmzTemp.setPixiFilterEdited(true);
	}
};
//-----------------------------------------------------------------------------
// Create Glitch filter
//-----------------------------------------------------------------------------
CGMZ_Temp.prototype.pluginCommandPixiFiltersCreateGlitchFilter = function(args) {
	const targets = JSON.parse(args.target);
	const identifier = args.identifier;
	const filter = new CGMZ_GlitchFilter(targets, identifier);
	if($cgmz.canAddPixiFilter(CGMZ.PixiFilters.FilterNames.glitchFilter, filter)) {
		const mode = {"Transparent": 0,
					  "Original": 1,
					  "Loop": 2,
					  "Clamp": 3,
					  "Mirror": 4
		};
		filter.animating = (args.animating === "true");
		filter.seed = parseFloat(args.seed);
		filter.slices = Number(args.slices);
		filter.offset = Number(args.offset);
		filter.direction = Number(args.direction);
		filter.average = (args.average === "true");
		filter.minSize = Number(args.minSize);
		filter.sampleSize = Number(args.sampleSize);
		filter.fillMode = mode[args.fillMode];
		filter.red = [Number(args.redX), Number(args.redY)];
		filter.blue = [Number(args.blueX), Number(args.blueY)];
		filter.green = [Number(args.greenX), Number(args.greenY)];
		$cgmz.addPixiFilter(CGMZ.PixiFilters.FilterNames.glitchFilter, filter);
	}
};
//-----------------------------------------------------------------------------
// Edit Glitch filter
//-----------------------------------------------------------------------------
CGMZ_Temp.prototype.pluginCommandPixiFiltersEditGlitchFilter = function(args) {
	const filter = $cgmz.getPixiFilterById(CGMZ.PixiFilters.FilterNames.glitchFilter, args.identifier);
	if(filter) {
		const mode = {"Transparent": 0,
					  "Original": 1,
					  "Loop": 2,
					  "Clamp": 3,
					  "Mirror": 4
		};
		filter.animating = (args.animating === "true");
		filter.refresh = (args.refresh === "true");
		filter.seed = parseFloat(args.seed);
		filter.slices = Number(args.slices);
		filter.offset = Number(args.offset);
		filter.direction = Number(args.direction);
		filter.average = (args.average === "true");
		filter.minSize = Number(args.minSize);
		filter.sampleSize = Number(args.sampleSize);
		filter.fillMode = mode[args.fillMode];
		filter.red = [Number(args.redX), Number(args.redY)];
		filter.blue = [Number(args.blueX), Number(args.blueY)];
		filter.green = [Number(args.greenX), Number(args.greenY)];
		$cgmzTemp.setPixiFilterEdited(true);
	}
};
//-----------------------------------------------------------------------------
// Create ascii filter
//-----------------------------------------------------------------------------
CGMZ_Temp.prototype.pluginCommandPixiFiltersCreateAsciiFilter = function(args) {
	const targets = JSON.parse(args.target);
	const identifier = args.identifier;
	const filter = new CGMZ_AsciiFilter(targets, identifier);
	if($cgmz.canAddPixiFilter(CGMZ.PixiFilters.FilterNames.asciiFilter, filter)) {
		filter.size = Number(args.size);
		$cgmz.addPixiFilter(CGMZ.PixiFilters.FilterNames.asciiFilter, filter);
	}
};
//-----------------------------------------------------------------------------
// Edit ascii filter
//-----------------------------------------------------------------------------
CGMZ_Temp.prototype.pluginCommandPixiFiltersEditAsciiFilter = function(args) {
	const filter = $cgmz.getPixiFilterById(CGMZ.PixiFilters.FilterNames.asciiFilter, args.identifier);
	if(filter) {
		filter.size = Number(args.size);
		$cgmzTemp.setPixiFilterEdited(true);
	}
};
//-----------------------------------------------------------------------------
// Create crosshatch filter
//-----------------------------------------------------------------------------
CGMZ_Temp.prototype.pluginCommandPixiFiltersCreateCrossHatchFilter = function(args) {
	const targets = JSON.parse(args.target);
	const identifier = args.identifier;
	const filter = new CGMZ_CrossHatchFilter(targets, identifier);
	if($cgmz.canAddPixiFilter(CGMZ.PixiFilters.FilterNames.crossHatchFilter, filter)) {
		$cgmz.addPixiFilter(CGMZ.PixiFilters.FilterNames.crossHatchFilter, filter);
	}
};
//-----------------------------------------------------------------------------
// Create kawase blur filter
//-----------------------------------------------------------------------------
CGMZ_Temp.prototype.pluginCommandPixiFiltersCreateKawaseBlurFilter = function(args) {
	const targets = JSON.parse(args.target);
	const identifier = args.identifier;
	const filter = new CGMZ_KawaseBlurFilter(targets, identifier);
	if($cgmz.canAddPixiFilter(CGMZ.PixiFilters.FilterNames.kawaseBlurFilter, filter)) {
		filter.blur = parseFloat(args.blur);
		filter.quality = parseFloat(args.quality);
		filter.clamp = (args.clamp === "true");
		filter.pixelSize = [parseFloat(args.pixelSizeX), parseFloat(args.pixelSizeY)];
		$cgmz.addPixiFilter(CGMZ.PixiFilters.FilterNames.kawaseBlurFilter, filter);
	}
};
//-----------------------------------------------------------------------------
// Edit kawase blur filter
//-----------------------------------------------------------------------------
CGMZ_Temp.prototype.pluginCommandPixiFiltersEditKawaseBlurFilter = function(args) {
	const filter = $cgmz.getPixiFilterById(CGMZ.PixiFilters.FilterNames.kawaseBlurFilter, args.identifier);
	if(filter) {
		filter.blur = parseFloat(args.blur);
		filter.quality = parseFloat(args.quality);
		filter.pixelSize = [parseFloat(args.pixelSizeX), parseFloat(args.pixelSizeY)];
		$cgmzTemp.setPixiFilterEdited(true);
	}
};
//-----------------------------------------------------------------------------
// Create dot filter
//-----------------------------------------------------------------------------
CGMZ_Temp.prototype.pluginCommandPixiFiltersCreateDotFilter = function(args) {
	const targets = JSON.parse(args.target);
	const identifier = args.identifier;
	const filter = new CGMZ_DotFilter(targets, identifier);
	if($cgmz.canAddPixiFilter(CGMZ.PixiFilters.FilterNames.dotFilter, filter)) {
		filter.scale = parseFloat(args.scale);
		filter.angle = parseFloat(args.angle);
		$cgmz.addPixiFilter(CGMZ.PixiFilters.FilterNames.dotFilter, filter);
	}
};
//-----------------------------------------------------------------------------
// Edit dot filter
//-----------------------------------------------------------------------------
CGMZ_Temp.prototype.pluginCommandPixiFiltersEditDotFilter = function(args) {
	const filter = $cgmz.getPixiFilterById(CGMZ.PixiFilters.FilterNames.dotFilter, args.identifier);
	if(filter) {
		filter.scale = parseFloat(args.scale);
		filter.angle = parseFloat(args.angle);
		$cgmzTemp.setPixiFilterEdited(true);
	}
};
//-----------------------------------------------------------------------------
// Create pixelate filter
//-----------------------------------------------------------------------------
CGMZ_Temp.prototype.pluginCommandPixiFiltersCreatePixelateFilter = function(args) {
	const targets = JSON.parse(args.target);
	const identifier = args.identifier;
	const filter = new CGMZ_PixelateFilter(targets, identifier);
	if($cgmz.canAddPixiFilter(CGMZ.PixiFilters.FilterNames.pixelateFilter, filter)) {
		filter.size = new Point(Number(args.sizeX), Number(args.sizeY));
		$cgmz.addPixiFilter(CGMZ.PixiFilters.FilterNames.pixelateFilter, filter);
	}
};
//-----------------------------------------------------------------------------
// Edit pixelate filter
//-----------------------------------------------------------------------------
CGMZ_Temp.prototype.pluginCommandPixiFiltersEditPixelateFilter = function(args) {
	const filter = $cgmz.getPixiFilterById(CGMZ.PixiFilters.FilterNames.pixelateFilter, args.identifier);
	if(filter) {
		filter.size = new Point(Number(args.sizeX), Number(args.sizeY));
		$cgmzTemp.setPixiFilterEdited(true);
	}
};
//-----------------------------------------------------------------------------
// Remove a filter
//-----------------------------------------------------------------------------
CGMZ_Temp.prototype.pluginCommandPixiFiltersRemoveFilter = function(args) {
	$cgmz.removePixiFilterById(args.identifier);
};
//=============================================================================
// CGMZ_GodrayFilter
//-----------------------------------------------------------------------------
// Store data for godray filters
//=============================================================================
function CGMZ_GodrayFilter() {
    this.initialize(...arguments);
}
//-----------------------------------------------------------------------------
// Initialize filter
//-----------------------------------------------------------------------------
CGMZ_GodrayFilter.prototype.initialize = function(targets, identifier) {
	this.targets = targets;
	this.identifier = identifier;
	this.animating = false;
	this.animationSpeed = 0.01;
	this.gain = 0.5;
	this.lacunarity = 2.5;
	this.angle = 30;
	this.parallel = true;
	this.time = 0;
	this.center = new Point(0, 0);
};
//=============================================================================
// CGMZ_CRTFilter
//-----------------------------------------------------------------------------
// Store data for CRT filters
//=============================================================================
function CGMZ_CRTFilter() {
    this.initialize(...arguments);
}
//-----------------------------------------------------------------------------
// Initialize filter
//-----------------------------------------------------------------------------
CGMZ_CRTFilter.prototype.initialize = function(targets, identifier) {
	this.targets = targets;
	this.identifier = identifier;
	this.animating = false;
	this.animationSpeed = 0.01;
	this.seed = 0;
	this.time = 0;
	this.curvature = 1;
	this.lineContrast = 0.25;
	this.lineWidth = 1;
	this.verticalLine = false;
	this.noise = 0;
	this.noiseSize = 0;
	this.vignetting = 0;
	this.vignettingAlpha = 0;
	this.vignettingBlur = 0;
};
//=============================================================================
// CGMZ_OldFilmFilter
//-----------------------------------------------------------------------------
// Store data for Old Film filters
//=============================================================================
function CGMZ_OldFilmFilter() {
    this.initialize(...arguments);
}
//-----------------------------------------------------------------------------
// Initialize filter
//-----------------------------------------------------------------------------
CGMZ_OldFilmFilter.prototype.initialize = function(targets, identifier) {
	this.targets = targets;
	this.identifier = identifier;
	this.animating = false;
	this.animationSpeed = 0.01;
	this.seed = 0;
	this.sepia = 0.3;
	this.noise = 0.3;
	this.noiseSize = 1.0;
	this.scratch = 0.5;
	this.scratchDensity = 0.3;
	this.scratchWidth = 1.0;
	this.vignetting = 0.3;
	this.vignettingAlpha = 1.0;
	this.vignettingBlur = 0.3;
};
//=============================================================================
// CGMZ_GlitchFilter
//-----------------------------------------------------------------------------
// Store data for Glitch filters
//=============================================================================
function CGMZ_GlitchFilter() {
    this.initialize(...arguments);
}
//-----------------------------------------------------------------------------
// Initialize filter
//-----------------------------------------------------------------------------
CGMZ_GlitchFilter.prototype.initialize = function(targets, identifier) {
	this.targets = targets;
	this.identifier = identifier;
	this.animating = false;
	this.refresh = false;
	this.seed = 0;
	this.slices = 5;
	this.offset = 100;
	this.direction = 180;
	this.fillMode = 0;
	this.average = false;
	this.minSize = 8;
	this.sampleSize = 512;
	this.red = [0,0];
	this.blue = [0,0];
	this.green = [0,0];
};
//=============================================================================
// CGMZ_AsciiFilter
//-----------------------------------------------------------------------------
// Store data for Ascii filters
//=============================================================================
function CGMZ_AsciiFilter() {
    this.initialize(...arguments);
}
//-----------------------------------------------------------------------------
// Initialize filter
//-----------------------------------------------------------------------------
CGMZ_AsciiFilter.prototype.initialize = function(targets, identifier) {
	this.targets = targets;
	this.identifier = identifier;
	this.size = 8;
};
//=============================================================================
// CGMZ_CrossHatchFilter
//-----------------------------------------------------------------------------
// Store data for CrossHatch filters
//=============================================================================
function CGMZ_CrossHatchFilter() {
    this.initialize(...arguments);
}
//-----------------------------------------------------------------------------
// Initialize filter
//-----------------------------------------------------------------------------
CGMZ_CrossHatchFilter.prototype.initialize = function(targets, identifier) {
	this.targets = targets;
	this.identifier = identifier;
};
//=============================================================================
// CGMZ_KawaseBlurFilter
//-----------------------------------------------------------------------------
// Store data for Kawase Blur filters
//=============================================================================
function CGMZ_KawaseBlurFilter() {
    this.initialize(...arguments);
}
//-----------------------------------------------------------------------------
// Initialize filter
//-----------------------------------------------------------------------------
CGMZ_KawaseBlurFilter.prototype.initialize = function(targets, identifier) {
	this.targets = targets;
	this.identifier = identifier;
	this.blur = 4.0;
	this.quality = 3.0;
	this.clamp = false; // readonly
	this.pixelSize = [1.0,1.0];
};
//=============================================================================
// CGMZ_DotFilter
//-----------------------------------------------------------------------------
// Store data for Dot filters
//=============================================================================
function CGMZ_DotFilter() {
    this.initialize(...arguments);
}
//-----------------------------------------------------------------------------
// Initialize filter
//-----------------------------------------------------------------------------
CGMZ_DotFilter.prototype.initialize = function(targets, identifier) {
	this.targets = targets;
	this.identifier = identifier;
	this.scale = 1.0;
	this.angle = 5.0;
};
//=============================================================================
// CGMZ_PixelateFilter
//-----------------------------------------------------------------------------
// Store data for Pixelate filters
//=============================================================================
function CGMZ_PixelateFilter() {
    this.initialize(...arguments);
}
//-----------------------------------------------------------------------------
// Initialize filter
//-----------------------------------------------------------------------------
CGMZ_PixelateFilter.prototype.initialize = function(targets, identifier) {
	this.targets = targets;
	this.identifier = identifier;
	this.size = new Point(4,4);
};
//=============================================================================
// CGMZ_Core
//-----------------------------------------------------------------------------
// Store filter data
//=============================================================================
//-----------------------------------------------------------------------------
// Alias. Also create filter data
//-----------------------------------------------------------------------------
const alias_CGMZ_PixiFilters_CGMZ_Core_createPluginData = CGMZ_Core.prototype.createPluginData;
CGMZ_Core.prototype.createPluginData = function() {
	alias_CGMZ_PixiFilters_CGMZ_Core_createPluginData.call(this);
	this.initializePixiFilters();
};
//-----------------------------------------------------------------------------
// Initialize Pixi Filter Data
//-----------------------------------------------------------------------------
CGMZ_Core.prototype.initializePixiFilters = function() {
	this.filters = {
		godrayFilter: [],
		crtFilter: [],
		oldFilmFilter: [],
		glitchFilter: [],
		asciiFilter: [],
		crossHatchFilter: [],
		kawaseBlurFilter: [],
		dotFilter: [],
		pixelateFilter: []
	};
};
//-----------------------------------------------------------------------------
// Determine if unique identifier is not in use and other filters do not have
// same target
//-----------------------------------------------------------------------------
CGMZ_Core.prototype.canAddPixiFilter = function(filterType, filter) {
	const existingFilters = this.filters[filterType];
	for(let i = 0; i < existingFilters.length; i++) {
		if(filter._identifier === existingFilters[i]._identifier) {
			console.warn("Could not create PIXI Filter: Filter already exists!");
			return false;
		}
		for(let j = 0; j < existingFilters[i]._targets.length; j++) {
			if(filter._targets.includes(existingFilters[i]._targets[j])) {
				console.warn("Could not create PIXI Filter: Similar Filter already exists!");
				return false;
			}
		}
	}
	return true;
};
//-----------------------------------------------------------------------------
// Add a Pixi Filter
//-----------------------------------------------------------------------------
CGMZ_Core.prototype.addPixiFilter = function(filterType, filter) {
	this.filters[filterType].push(filter);
	$cgmzTemp.setPixiFilterChanged(true);
};
//-----------------------------------------------------------------------------
// Get a Pixi Filter by target
//-----------------------------------------------------------------------------
CGMZ_Core.prototype.getPixiFilter = function(filterType, target) {
	const filterList = this.filters[filterType];
	for(let i = 0; i < filterList.length; i++) {
		if(filterList[i].targets.includes(target)) {
			return filterList[i];
		}
	}
	return null;
};
//-----------------------------------------------------------------------------
// Get a Pixi Filter by Id within a filter type
//-----------------------------------------------------------------------------
CGMZ_Core.prototype.getPixiFilterById = function(filterType, identifier) {
	const filterList = this.filters[filterType];
	for(let i = 0; i < filterList.length; i++) {
		if(filterList[i].identifier === identifier) {
			return filterList[i];
		}
	}
	return null;
};
//-----------------------------------------------------------------------------
// Remove a filter by id
//-----------------------------------------------------------------------------
CGMZ_Core.prototype.removePixiFilterById = function(identifier) {
	for(const [key, filterList] of Object.entries(this.filters)) {
		for(let i = 0; i < filterList.length; i++) {
			if(filterList[i].identifier === identifier) {
				filterList.splice(i, 1);
				$cgmzTemp.setPixiFilterChanged(true);
			}
		}
	}
};
//=============================================================================
// Spriteset_Base
//-----------------------------------------------------------------------------
// Apply new filters
//=============================================================================
//-----------------------------------------------------------------------------
// Alias. Also create CGMZ Filters while preserving other filters
//-----------------------------------------------------------------------------
const alias_CGMZ_PixiFilters_Spriteset_Base_createLowerLayer = Spriteset_Base.prototype.createLowerLayer;
Spriteset_Base.prototype.createLowerLayer = function() {
	alias_CGMZ_PixiFilters_Spriteset_Base_createLowerLayer.call(this);
	this._CGMZ_originalFilters = this._baseSprite.filters;
    this.CGMZ_createPixiFilters();
};
//-----------------------------------------------------------------------------
// Create CGMZ Filters
//-----------------------------------------------------------------------------
Spriteset_Base.prototype.CGMZ_createPixiFilters = function() {
	const filters = $cgmz.filters;
	this._CGMZ_GodrayFilter = null;
	this._CGMZ_CRTFilter = null;
	this._CGMZ_OldFilmFilter = null;
	this._CGMZ_GlitchFilter = null;
	this._CGMZ_AsciiFilter = null;
	this._CGMZ_CrossHatchFilter = null;
	this._CGMZ_KawaseBlurFilter = null;
	this._CGMZ_DotFilter = null;
	this._CGMZ_PixelateFilter = null;
	for(let i = 0; i < filters.godrayFilter.length; i++) {
		if(filters.godrayFilter[i].targets.includes(this.constructor.name)) {
			this.CGMZ_addGodrayFilter(filters.godrayFilter[i]);
			break;
		}
	}
	for(let i = 0; i < filters.crtFilter.length; i++) {
		if(filters.crtFilter[i].targets.includes(this.constructor.name)) {
			this.CGMZ_addCRTFilter(filters.crtFilter[i]);
			break;
		}
	}
	for(let i = 0; i < filters.oldFilmFilter.length; i++) {
		if(filters.oldFilmFilter[i].targets.includes(this.constructor.name)) {
			this.CGMZ_addOldFilmFilter(filters.oldFilmFilter[i]);
			break;
		}
	}
	for(let i = 0; i < filters.glitchFilter.length; i++) {
		if(filters.glitchFilter[i].targets.includes(this.constructor.name)) {
			this.CGMZ_addGlitchFilter(filters.glitchFilter[i]);
			break;
		}
	}
	for(let i = 0; i < filters.asciiFilter.length; i++) {
		if(filters.asciiFilter[i].targets.includes(this.constructor.name)) {
			this.CGMZ_addAsciiFilter(filters.asciiFilter[i]);
			break;
		}
	}
	for(let i = 0; i < filters.crossHatchFilter.length; i++) {
		if(filters.crossHatchFilter[i].targets.includes(this.constructor.name)) {
			this.CGMZ_addCrossHatchFilter(filters.crossHatchFilter[i]);
			break;
		}
	}
	for(let i = 0; i < filters.kawaseBlurFilter.length; i++) {
		if(filters.kawaseBlurFilter[i].targets.includes(this.constructor.name)) {
			this.CGMZ_addKawaseBlurFilter(filters.kawaseBlurFilter[i]);
			break;
		}
	}
	for(let i = 0; i < filters.dotFilter.length; i++) {
		if(filters.dotFilter[i].targets.includes(this.constructor.name)) {
			this.CGMZ_addDotFilter(filters.dotFilter[i]);
			break;
		}
	}
	for(let i = 0; i < filters.pixelateFilter.length; i++) {
		if(filters.pixelateFilter[i].targets.includes(this.constructor.name)) {
			this.CGMZ_addPixelateFilter(filters.pixelateFilter[i]);
			break;
		}
	}
};
//-----------------------------------------------------------------------------
// Add a new GodrayFilter
//-----------------------------------------------------------------------------
Spriteset_Base.prototype.CGMZ_addGodrayFilter = function(filter) {
    this._CGMZ_GodrayFilter = new PIXI.filters.GodrayFilter();
	this._CGMZ_GodrayFilter.time = filter.time;
	this._CGMZ_GodrayFilter.gain = filter.gain;
	this._CGMZ_GodrayFilter.lacunarity = filter.lacunarity;
	this._CGMZ_GodrayFilter.parallel = filter.parallel;
	this._CGMZ_GodrayFilter.angle = filter.angle;
	this._CGMZ_GodrayFilter.center = filter.center;
	this._CGMZ_GodrayFilter.animating = filter.animating;
	this._CGMZ_GodrayFilter.animationSpeed = filter.animationSpeed;
	this._CGMZ_GodrayFilter.identifier = filter.identifier;
	this._baseSprite.filters.push(this._CGMZ_GodrayFilter);
};
//-----------------------------------------------------------------------------
// Add a new CRTFilter
//-----------------------------------------------------------------------------
Spriteset_Base.prototype.CGMZ_addCRTFilter = function(filter) {
    this._CGMZ_CRTFilter = new PIXI.filters.CRTFilter();
	this._CGMZ_CRTFilter.time = filter.time;
	this._CGMZ_CRTFilter.seed = filter.seed;
	this._CGMZ_CRTFilter.curvature = filter.curvature;
	this._CGMZ_CRTFilter.lineWidth = filter.lineWidth;
	this._CGMZ_CRTFilter.lineContrast = filter.lineContrast;
	this._CGMZ_CRTFilter.verticalLine = filter.verticalLine;
	this._CGMZ_CRTFilter.noise = filter.noise;
	this._CGMZ_CRTFilter.noiseSize = filter.noiseSize;
	this._CGMZ_CRTFilter.vignetting = filter.vignetting;
	this._CGMZ_CRTFilter.vignettingAlpha = filter.vignettingAlpha;
	this._CGMZ_CRTFilter.vignettingBlur = filter.vignettingBlur;
	this._CGMZ_CRTFilter.animating = filter.animating;
	this._CGMZ_CRTFilter.animationSpeed = filter.animationSpeed;
	this._CGMZ_CRTFilter.identifier = filter.identifier;
	this._baseSprite.filters.push(this._CGMZ_CRTFilter);
};
//-----------------------------------------------------------------------------
// Add a new OldFilmFilter
//-----------------------------------------------------------------------------
Spriteset_Base.prototype.CGMZ_addOldFilmFilter = function(filter) {
    this._CGMZ_OldFilmFilter = new PIXI.filters.OldFilmFilter();
	this._CGMZ_OldFilmFilter.seed = filter.seed;
	this._CGMZ_OldFilmFilter.sepia = filter.sepia;
	this._CGMZ_OldFilmFilter.scratch = filter.scratch;
	this._CGMZ_OldFilmFilter.scratchDensity = filter.scratchDensity;
	this._CGMZ_OldFilmFilter.scratchWidth = filter.scratchWidth;
	this._CGMZ_OldFilmFilter.noise = filter.noise;
	this._CGMZ_OldFilmFilter.noiseSize = filter.noiseSize;
	this._CGMZ_OldFilmFilter.vignetting = filter.vignetting;
	this._CGMZ_OldFilmFilter.vignettingAlpha = filter.vignettingAlpha;
	this._CGMZ_OldFilmFilter.vignettingBlur = filter.vignettingBlur;
	this._CGMZ_OldFilmFilter.animating = filter.animating;
	this._CGMZ_OldFilmFilter.identifier = filter.identifier;
	this._baseSprite.filters.push(this._CGMZ_OldFilmFilter);
};
//-----------------------------------------------------------------------------
// Add a new GlitchFilter
//-----------------------------------------------------------------------------
Spriteset_Base.prototype.CGMZ_addGlitchFilter = function(filter) {
    this._CGMZ_GlitchFilter = new PIXI.filters.GlitchFilter();
	this._CGMZ_GlitchFilter.seed = filter.seed;
	this._CGMZ_GlitchFilter.slices = filter.slices;
	this._CGMZ_GlitchFilter.offset = filter.offset;
	this._CGMZ_GlitchFilter.direction = filter.direction;
	this._CGMZ_GlitchFilter.fillMode = filter.fillMode;
	this._CGMZ_GlitchFilter.average = filter.average;
	this._CGMZ_GlitchFilter.minSize = filter.minSize;
	this._CGMZ_GlitchFilter.sampleSize = filter.sampleSize;
	this._CGMZ_GlitchFilter.red = filter.red;
	this._CGMZ_GlitchFilter.blue = filter.blue;
	this._CGMZ_GlitchFilter.green = filter.green;
	this._CGMZ_GlitchFilter.animating = filter.animating;
	this._CGMZ_GlitchFilter.identifier = filter.identifier;
	this._baseSprite.filters.push(this._CGMZ_GlitchFilter);
};
//-----------------------------------------------------------------------------
// Add a new AsciiFilter
//-----------------------------------------------------------------------------
Spriteset_Base.prototype.CGMZ_addAsciiFilter = function(filter) {
    this._CGMZ_AsciiFilter = new PIXI.filters.AsciiFilter();
	this._CGMZ_AsciiFilter.size = filter.size;
	this._CGMZ_AsciiFilter.identifier = filter.identifier;
	this._baseSprite.filters.push(this._CGMZ_AsciiFilter);
};
//-----------------------------------------------------------------------------
// Add a new CrossHatchFilter
//-----------------------------------------------------------------------------
Spriteset_Base.prototype.CGMZ_addCrossHatchFilter = function(filter) {
    this._CGMZ_CrossHatchFilter = new PIXI.filters.CrossHatchFilter();
	this._CGMZ_CrossHatchFilter.identifier = filter.identifier;
	this._baseSprite.filters.push(this._CGMZ_CrossHatchFilter);
};
//-----------------------------------------------------------------------------
// Add a new KawaseBlurFilter
//-----------------------------------------------------------------------------
Spriteset_Base.prototype.CGMZ_addKawaseBlurFilter = function(filter) {
    this._CGMZ_KawaseBlurFilter = new PIXI.filters.KawaseBlurFilter(filter.blur, filter.quality, filter.clamp);
	this._CGMZ_KawaseBlurFilter.pixelSize = filter.pixelSize;
	this._CGMZ_KawaseBlurFilter.identifier = filter.identifier;
	this._baseSprite.filters.push(this._CGMZ_KawaseBlurFilter);
};
//-----------------------------------------------------------------------------
// Add a new DotFilter
//-----------------------------------------------------------------------------
Spriteset_Base.prototype.CGMZ_addDotFilter = function(filter) {
    this._CGMZ_DotFilter = new PIXI.filters.DotFilter(filter.scale, filter.angle);
	this._CGMZ_DotFilter.identifier = filter.identifier;
	this._baseSprite.filters.push(this._CGMZ_DotFilter);
};
//-----------------------------------------------------------------------------
// Add a new PixelateFilter
//-----------------------------------------------------------------------------
Spriteset_Base.prototype.CGMZ_addPixelateFilter = function(filter) {
    this._CGMZ_PixelateFilter = new PIXI.filters.PixelateFilter(filter.size);
	this._CGMZ_PixelateFilter.identifier = filter.identifier;
	this._baseSprite.filters.push(this._CGMZ_PixelateFilter);
};
//-----------------------------------------------------------------------------
// Alias. Also update CGMZ filters if they are animated
//-----------------------------------------------------------------------------
const alias_CGMZ_PixiFilters_Spriteset_Base_update = Spriteset_Base.prototype.update;
Spriteset_Base.prototype.update = function() {
    alias_CGMZ_PixiFilters_Spriteset_Base_update.call(this);
	this.CGMZ_updatePixiFilters();
};
//-----------------------------------------------------------------------------
// Update CGMZ Pixi Filters
//-----------------------------------------------------------------------------
Spriteset_Base.prototype.CGMZ_updatePixiFilters = function() {
    this.CGMZ_updateGodrayFilter();
	this.CGMZ_updateCRTFilter();
	this.CGMZ_updateOldFilmFilter();
	this.CGMZ_updateGlitchFilter();
	this.CGMZ_updateAsciiFilter();
	this.CGMZ_updateKawaseBlurFilter();
	this.CGMZ_updateDotFilter();
	this.CGMZ_updatePixelateFilter();
	$cgmzTemp.setPixiFilterEdited(false);
	this._CGMZ_checkAddedRemovedFilters();
	$cgmzTemp.setPixiFilterChanged(false);
};
//-----------------------------------------------------------------------------
// Check for added or removed CGMZ Pixi Filters
//-----------------------------------------------------------------------------
Spriteset_Base.prototype._CGMZ_checkAddedRemovedFilters = function() {
    if($cgmzTemp.isPixiFiltersChanged()) {
		this.CGMZ_checkAddRemoveGodrayFilter();
		this.CGMZ_checkAddRemoveCRTFilter();
		this.CGMZ_checkAddRemoveOldFilmFilter();
		this.CGMZ_checkAddRemoveGlitchFilter();
		this.CGMZ_checkAddRemoveAsciiFilter();
		this.CGMZ_checkAddRemoveCrossHatchFilter();
		this.CGMZ_checkAddRemoveKawaseBlurFilter();
		this.CGMZ_checkAddRemoveDotFilter();
		this.CGMZ_checkAddRemovePixelateFilter();
	}
};
//-----------------------------------------------------------------------------
// Check for added or removed Godray Filter
//-----------------------------------------------------------------------------
Spriteset_Base.prototype.CGMZ_checkAddRemoveGodrayFilter = function() {
	const godrayFilter = $cgmz.getPixiFilter(CGMZ.PixiFilters.FilterNames.godrayFilter, this.constructor.name);
	if(this._CGMZ_GodrayFilter && !godrayFilter) {
		for(let i = 0; i < this._baseSprite.filters.length; i++) {
			if(this._baseSprite.filters[i] === this._CGMZ_GodrayFilter) {
				this._baseSprite.filters.splice(i, 1);
				this._CGMZ_GodrayFilter = null;
			}
		}
	} else if(!this._CGMZ_GodrayFilter && godrayFilter) {
		this.CGMZ_addGodrayFilter(godrayFilter);
	}
};
//-----------------------------------------------------------------------------
// Check for added or removed CRT Filter
//-----------------------------------------------------------------------------
Spriteset_Base.prototype.CGMZ_checkAddRemoveCRTFilter = function() {
	const crtFilter = $cgmz.getPixiFilter(CGMZ.PixiFilters.FilterNames.crtFilter, this.constructor.name);
	if(this._CGMZ_CRTFilter && !crtFilter) {
		for(let i = 0; i < this._baseSprite.filters.length; i++) {
			if(this._baseSprite.filters[i] === this._CGMZ_CRTFilter) {
				this._baseSprite.filters.splice(i, 1);
				this._CGMZ_CRTFilter = null;
			}
		}
	} else if(!this._CGMZ_CRTFilter && crtFilter) {
		this.CGMZ_addCRTFilter(crtFilter);
	}
};
//-----------------------------------------------------------------------------
// Check for added or removed Old Film Filter
//-----------------------------------------------------------------------------
Spriteset_Base.prototype.CGMZ_checkAddRemoveOldFilmFilter = function() {
	const oldFilmFilter = $cgmz.getPixiFilter(CGMZ.PixiFilters.FilterNames.oldFilmFilter, this.constructor.name);
	if(this._CGMZ_OldFilmFilter && !oldFilmFilter) {
		for(let i = 0; i < this._baseSprite.filters.length; i++) {
			if(this._baseSprite.filters[i] === this._CGMZ_OldFilmFilter) {
				this._baseSprite.filters.splice(i, 1);
				this._CGMZ_OldFilmFilter = null;
			}
		}
	} else if(!this._CGMZ_OldFilmFilter && oldFilmFilter) {
		this.CGMZ_addOldFilmFilter(oldFilmFilter);
	}
};
//-----------------------------------------------------------------------------
// Check for added or removed Glitch Filter
//-----------------------------------------------------------------------------
Spriteset_Base.prototype.CGMZ_checkAddRemoveGlitchFilter = function() {
	const glitchFilter = $cgmz.getPixiFilter(CGMZ.PixiFilters.FilterNames.glitchFilter, this.constructor.name);
	if(this._CGMZ_GlitchFilter && !glitchFilter) {
		for(let i = 0; i < this._baseSprite.filters.length; i++) {
			if(this._baseSprite.filters[i] === this._CGMZ_GlitchFilter) {
				this._baseSprite.filters.splice(i, 1);
				this._CGMZ_GlitchFilter = null;
			}
		}
	} else if(!this._CGMZ_GlitchFilter && glitchFilter) {
		this.CGMZ_addGlitchFilter(glitchFilter);
	}
};
//-----------------------------------------------------------------------------
// Check for added or removed Ascii Filter
//-----------------------------------------------------------------------------
Spriteset_Base.prototype.CGMZ_checkAddRemoveAsciiFilter = function() {
	const asciiFilter = $cgmz.getPixiFilter(CGMZ.PixiFilters.FilterNames.asciiFilter, this.constructor.name);
	if(this._CGMZ_AsciiFilter && !asciiFilter) {
		for(let i = 0; i < this._baseSprite.filters.length; i++) {
			if(this._baseSprite.filters[i] === this._CGMZ_AsciiFilter) {
				this._baseSprite.filters.splice(i, 1);
				this._CGMZ_AsciiFilter = null;
			}
		}
	} else if(!this._CGMZ_AsciiFilter && asciiFilter) {
		this.CGMZ_addAsciiFilter(asciiFilter);
	}
};
//-----------------------------------------------------------------------------
// Check for added or removed CrossHatch Filter
//-----------------------------------------------------------------------------
Spriteset_Base.prototype.CGMZ_checkAddRemoveCrossHatchFilter = function() {
	const crossHatchFilter = $cgmz.getPixiFilter(CGMZ.PixiFilters.FilterNames.crossHatchFilter, this.constructor.name);
	if(this._CGMZ_CrossHatchFilter && !crossHatchFilter) {
		for(let i = 0; i < this._baseSprite.filters.length; i++) {
			if(this._baseSprite.filters[i] === this._CGMZ_CrossHatchFilter) {
				this._baseSprite.filters.splice(i, 1);
				this._CGMZ_CrossHatchFilter = null;
			}
		}
	} else if(!this._CGMZ_CrossHatchFilter && crossHatchFilter) {
		this.CGMZ_addCrossHatchFilter(crossHatchFilter);
	}
};
//-----------------------------------------------------------------------------
// Check for added or removed Kawase Blur Filter
//-----------------------------------------------------------------------------
Spriteset_Base.prototype.CGMZ_checkAddRemoveKawaseBlurFilter = function() {
	const kawaseBlurFilter = $cgmz.getPixiFilter(CGMZ.PixiFilters.FilterNames.kawaseBlurFilter, this.constructor.name);
	if(this._CGMZ_KawaseBlurFilter && !kawaseBlurFilter) {
		for(let i = 0; i < this._baseSprite.filters.length; i++) {
			if(this._baseSprite.filters[i] === this._CGMZ_KawaseBlurFilter) {
				this._baseSprite.filters.splice(i, 1);
				this._CGMZ_KawaseBlurFilter = null;
			}
		}
	} else if(!this._CGMZ_KawaseBlurFilter && kawaseBlurFilter) {
		this.CGMZ_addKawaseBlurFilter(kawaseBlurFilter);
	}
};
//-----------------------------------------------------------------------------
// Check for added or removed Dot Filter
//-----------------------------------------------------------------------------
Spriteset_Base.prototype.CGMZ_checkAddRemoveDotFilter = function() {
	const dotFilter = $cgmz.getPixiFilter(CGMZ.PixiFilters.FilterNames.dotFilter, this.constructor.name);
	if(this._CGMZ_DotFilter && !dotFilter) {
		for(let i = 0; i < this._baseSprite.filters.length; i++) {
			if(this._baseSprite.filters[i] === this._CGMZ_DotFilter) {
				this._baseSprite.filters.splice(i, 1);
				this._CGMZ_DotFilter = null;
			}
		}
	} else if(!this._CGMZ_DotFilter && dotFilter) {
		this.CGMZ_addDotFilter(dotFilter);
	}
};
//-----------------------------------------------------------------------------
// Check for added or removed Pixelate Filter
//-----------------------------------------------------------------------------
Spriteset_Base.prototype.CGMZ_checkAddRemovePixelateFilter = function() {
	const pixelateFilter = $cgmz.getPixiFilter(CGMZ.PixiFilters.FilterNames.pixelateFilter, this.constructor.name);
	if(this._CGMZ_PixelateFilter && !pixelateFilter) {
		for(let i = 0; i < this._baseSprite.filters.length; i++) {
			if(this._baseSprite.filters[i] === this._CGMZ_PixelateFilter) {
				this._baseSprite.filters.splice(i, 1);
				this._CGMZ_PixelateFilter = null;
			}
		}
	} else if(!this._CGMZ_PixelateFilter && pixelateFilter) {
		this.CGMZ_addPixelateFilter(pixelateFilter);
	}
};
//-----------------------------------------------------------------------------
// Update CGMZ Godray Filter
//-----------------------------------------------------------------------------
Spriteset_Base.prototype.CGMZ_updateGodrayFilter = function() {
    if(this._CGMZ_GodrayFilter) {
		this._CGMZ_GodrayFilter.time += this._CGMZ_GodrayFilter.animationSpeed * (this._CGMZ_GodrayFilter.animating);
		if($cgmzTemp.isPixiFiltersEdited()) {
			const filterData = $cgmz.getPixiFilter(CGMZ.PixiFilters.FilterNames.godrayFilter, this.constructor.name);
			this.CGMZ_updateGodrayFilterSettings(filterData);
		}
	}
};
//-----------------------------------------------------------------------------
// Update CGMZ CRT Filter
//-----------------------------------------------------------------------------
Spriteset_Base.prototype.CGMZ_updateCRTFilter = function() {
    if(this._CGMZ_CRTFilter) {
		this._CGMZ_CRTFilter.time += this._CGMZ_CRTFilter.animationSpeed * (this._CGMZ_CRTFilter.animating);
		this._CGMZ_CRTFilter.seed = Math.random() * (this._CGMZ_CRTFilter.animating);
		if($cgmzTemp.isPixiFiltersEdited()) {
			const filterData = $cgmz.getPixiFilter(CGMZ.PixiFilters.FilterNames.crtFilter, this.constructor.name);
			this.CGMZ_updateCRTFilterSettings(filterData);
		}
	}
};
//-----------------------------------------------------------------------------
// Update CGMZ Old Film Filter
//-----------------------------------------------------------------------------
Spriteset_Base.prototype.CGMZ_updateOldFilmFilter = function() {
    if(this._CGMZ_OldFilmFilter) {
		this._CGMZ_OldFilmFilter.seed = Math.random() * (this._CGMZ_OldFilmFilter.animating);
		if($cgmzTemp.isPixiFiltersEdited()) {
			const filterData = $cgmz.getPixiFilter(CGMZ.PixiFilters.FilterNames.oldFilmFilter, this.constructor.name);
			this.CGMZ_updateOldFilmFilterSettings(filterData);
		}
	}
};
//-----------------------------------------------------------------------------
// Update CGMZ Glitch Filter
//-----------------------------------------------------------------------------
Spriteset_Base.prototype.CGMZ_updateGlitchFilter = function() {
    if(this._CGMZ_GlitchFilter) {
		this._CGMZ_GlitchFilter.seed = Math.random() * (this._CGMZ_GlitchFilter.animating);
		if($cgmzTemp.isPixiFiltersEdited()) {
			const filterData = $cgmz.getPixiFilter(CGMZ.PixiFilters.FilterNames.glitchFilter, this.constructor.name);
			this.CGMZ_updateGlitchFilterSettings(filterData);
		}
	}
};
//-----------------------------------------------------------------------------
// Update CGMZ Ascii Filter
//-----------------------------------------------------------------------------
Spriteset_Base.prototype.CGMZ_updateAsciiFilter = function() {
    if(this._CGMZ_AsciiFilter && $cgmzTemp.isPixiFiltersEdited()) {
		const filterData = $cgmz.getPixiFilter(CGMZ.PixiFilters.FilterNames.asciiFilter, this.constructor.name);
		this.CGMZ_updateAsciiFilterSettings(filterData);
	}
};
//-----------------------------------------------------------------------------
// Update CGMZ KawaseBlur Filter
//-----------------------------------------------------------------------------
Spriteset_Base.prototype.CGMZ_updateKawaseBlurFilter = function() {
    if(this._CGMZ_KawaseBlurFilter && $cgmzTemp.isPixiFiltersEdited()) {
		const filterData = $cgmz.getPixiFilter(CGMZ.PixiFilters.FilterNames.kawaseBlurFilter, this.constructor.name);
		this.CGMZ_updateKawaseBlurFilterSettings(filterData);
	}
};
//-----------------------------------------------------------------------------
// Update CGMZ Dot Filter
//-----------------------------------------------------------------------------
Spriteset_Base.prototype.CGMZ_updateDotFilter = function() {
    if(this._CGMZ_DotFilter && $cgmzTemp.isPixiFiltersEdited()) {
		const filterData = $cgmz.getPixiFilter(CGMZ.PixiFilters.FilterNames.dotFilter, this.constructor.name);
		this.CGMZ_updateDotFilterSettings(filterData);
	}
};
//-----------------------------------------------------------------------------
// Update CGMZ Pixelate Filter
//-----------------------------------------------------------------------------
Spriteset_Base.prototype.CGMZ_updatePixelateFilter = function() {
    if(this._CGMZ_PixelateFilter && $cgmzTemp.isPixiFiltersEdited()) {
		const filterData = $cgmz.getPixiFilter(CGMZ.PixiFilters.FilterNames.pixelateFilter, this.constructor.name);
		this.CGMZ_updatePixelateFilterSettings(filterData);
	}
};
//-----------------------------------------------------------------------------
// Update CGMZ Godray Filter configurable Settings
//-----------------------------------------------------------------------------
Spriteset_Base.prototype.CGMZ_updateGodrayFilterSettings = function(filterData) {
	this._CGMZ_GodrayFilter.gain = filterData.gain;
	this._CGMZ_GodrayFilter.lacunarity = filterData.lacunarity;
	this._CGMZ_GodrayFilter.angle = filterData.angle;
	this._CGMZ_GodrayFilter.center = filterData.center;
	this._CGMZ_GodrayFilter.animating = filterData.animating;
	this._CGMZ_GodrayFilter.animationSpeed = filterData.animationSpeed;
};
//-----------------------------------------------------------------------------
// Update CGMZ CRT Filter configurable Settings
//-----------------------------------------------------------------------------
Spriteset_Base.prototype.CGMZ_updateCRTFilterSettings = function(filterData) {
	this._CGMZ_CRTFilter.curvature = filterData.curvature;
	this._CGMZ_CRTFilter.lineWidth = filterData.lineWidth;
	this._CGMZ_CRTFilter.lineContrast = filterData.lineContrast;
	this._CGMZ_CRTFilter.noise = filterData.noise;
	this._CGMZ_CRTFilter.noiseSize = filterData.noiseSize;
	this._CGMZ_CRTFilter.vignetting = filterData.vignetting;
	this._CGMZ_CRTFilter.vignettingAlpha = filterData.vignettingAlpha;
	this._CGMZ_CRTFilter.vignettingBlur = filterData.vignettingBlur;
	this._CGMZ_CRTFilter.animating = filterData.animating;
	this._CGMZ_CRTFilter.animationSpeed = filterData.animationSpeed;
};
//-----------------------------------------------------------------------------
// Update CGMZ Old Film Filter configurable Settings
//-----------------------------------------------------------------------------
Spriteset_Base.prototype.CGMZ_updateOldFilmFilterSettings = function(filterData) {
	this._CGMZ_OldFilmFilter.sepia = filterData.sepia;
	this._CGMZ_OldFilmFilter.scratch = filterData.scratch;
	this._CGMZ_OldFilmFilter.scratchWidth = filterData.scratchWidth;
	this._CGMZ_OldFilmFilter.scratchDensity = filterData.scratchDensity;
	this._CGMZ_OldFilmFilter.noise = filterData.noise;
	this._CGMZ_OldFilmFilter.noiseSize = filterData.noiseSize;
	this._CGMZ_OldFilmFilter.vignetting = filterData.vignetting;
	this._CGMZ_OldFilmFilter.vignettingAlpha = filterData.vignettingAlpha;
	this._CGMZ_OldFilmFilter.vignettingBlur = filterData.vignettingBlur;
	this._CGMZ_OldFilmFilter.animating = filterData.animating;
};
//-----------------------------------------------------------------------------
// Update CGMZ Glitch Filter configurable Settings
//-----------------------------------------------------------------------------
Spriteset_Base.prototype.CGMZ_updateGlitchFilterSettings = function(filterData) {
	this._CGMZ_GlitchFilter.slices = filterData.slices;
	this._CGMZ_GlitchFilter.offset = filterData.offset;
	this._CGMZ_GlitchFilter.direction = filterData.direction;
	this._CGMZ_GlitchFilter.fillMode = filterData.fillMode;
	this._CGMZ_GlitchFilter.average = filterData.average;
	this._CGMZ_GlitchFilter.minSize = filterData.minSize;
	this._CGMZ_GlitchFilter.sampleSize = filterData.sampleSize;
	this._CGMZ_GlitchFilter.red = filterData.red;
	this._CGMZ_GlitchFilter.blue = filterData.blue;
	this._CGMZ_GlitchFilter.green = filterData.green;
	if(filterData.refresh) {
		filterData.refresh = false;
		this._CGMZ_GlitchFilter.refresh();
	}
};
//-----------------------------------------------------------------------------
// Update CGMZ Ascii Filter configurable Settings
//-----------------------------------------------------------------------------
Spriteset_Base.prototype.CGMZ_updateAsciiFilterSettings = function(filterData) {
	this._CGMZ_AsciiFilter.size = filterData.size;
};
//-----------------------------------------------------------------------------
// Update CGMZ Kawase Blur Filter configurable Settings
//-----------------------------------------------------------------------------
Spriteset_Base.prototype.CGMZ_updateKawaseBlurFilterSettings = function(filterData) {
	this._CGMZ_KawaseBlurFilter.blur = filterData.blur;
	this._CGMZ_KawaseBlurFilter.quality = filterData.quality;
	this._CGMZ_KawaseBlurFilter.pixelSize = filterData.pixelSize;
};
//-----------------------------------------------------------------------------
// Update CGMZ Dot Filter configurable Settings
//-----------------------------------------------------------------------------
Spriteset_Base.prototype.CGMZ_updateDotFilterSettings = function(filterData) {
	this._CGMZ_DotFilter.scale = filterData.scale;
	this._CGMZ_DotFilter.angle = filterData.angle;
};
//-----------------------------------------------------------------------------
// Update CGMZ Pixelate Filter configurable Settings
//-----------------------------------------------------------------------------
Spriteset_Base.prototype.CGMZ_updatePixelateFilterSettings = function(filterData) {
	this._CGMZ_PixelateFilter.size = filterData.size;
};
/*!
 * pixi-filters - v3.1.1
 * Compiled Wed, 11 Mar 2020 20:40:29 UTC
 *
 * pixi-filters is licensed under the MIT License.
 * http://www.opensource.org/licenses/mit-license
 */
var __filters=function(e,t,n,r,o,i,l,s){"use strict";var a="attribute vec2 aVertexPosition;\nattribute vec2 aTextureCoord;\n\nuniform mat3 projectionMatrix;\n\nvarying vec2 vTextureCoord;\n\nvoid main(void)\n{\n    gl_Position = vec4((projectionMatrix * vec3(aVertexPosition, 1.0)).xy, 0.0, 1.0);\n    vTextureCoord = aTextureCoord;\n}",u="varying vec2 vTextureCoord;\nuniform sampler2D uSampler;\n\nuniform float gamma;\nuniform float contrast;\nuniform float saturation;\nuniform float brightness;\nuniform float red;\nuniform float green;\nuniform float blue;\nuniform float alpha;\n\nvoid main(void)\n{\n    vec4 c = texture2D(uSampler, vTextureCoord);\n\n    if (c.a > 0.0) {\n        c.rgb /= c.a;\n\n        vec3 rgb = pow(c.rgb, vec3(1. / gamma));\n        rgb = mix(vec3(.5), mix(vec3(dot(vec3(.2125, .7154, .0721), rgb)), rgb, saturation), contrast);\n        rgb.r *= red;\n        rgb.g *= green;\n        rgb.b *= blue;\n        c.rgb = rgb * brightness;\n\n        c.rgb *= c.a;\n    }\n\n    gl_FragColor = c * alpha;\n}\n",c=function(e){function t(t){e.call(this,a,u),Object.assign(this,{gamma:1,saturation:1,contrast:1,brightness:1,red:1,green:1,blue:1,alpha:1},t)}return e&&(t.__proto__=e),t.prototype=Object.create(e&&e.prototype),t.prototype.constructor=t,t.prototype.apply=function(e,t,n,r){this.uniforms.gamma=Math.max(this.gamma,1e-4),this.uniforms.saturation=this.saturation,this.uniforms.contrast=this.contrast,this.uniforms.brightness=this.brightness,this.uniforms.red=this.red,this.uniforms.green=this.green,this.uniforms.blue=this.blue,this.uniforms.alpha=this.alpha,e.applyFilter(this,t,n,r)},t}(t.Filter),f=a,h="\nvarying vec2 vTextureCoord;\nuniform sampler2D uSampler;\n\nuniform vec2 uOffset;\n\nvoid main(void)\n{\n    vec4 color = vec4(0.0);\n\n    // Sample top left pixel\n    color += texture2D(uSampler, vec2(vTextureCoord.x - uOffset.x, vTextureCoord.y + uOffset.y));\n\n    // Sample top right pixel\n    color += texture2D(uSampler, vec2(vTextureCoord.x + uOffset.x, vTextureCoord.y + uOffset.y));\n\n    // Sample bottom right pixel\n    color += texture2D(uSampler, vec2(vTextureCoord.x + uOffset.x, vTextureCoord.y - uOffset.y));\n\n    // Sample bottom left pixel\n    color += texture2D(uSampler, vec2(vTextureCoord.x - uOffset.x, vTextureCoord.y - uOffset.y));\n\n    // Average\n    color *= 0.25;\n\n    gl_FragColor = color;\n}",p="\nvarying vec2 vTextureCoord;\nuniform sampler2D uSampler;\n\nuniform vec2 uOffset;\nuniform vec4 filterClamp;\n\nvoid main(void)\n{\n    vec4 color = vec4(0.0);\n\n    // Sample top left pixel\n    color += texture2D(uSampler, clamp(vec2(vTextureCoord.x - uOffset.x, vTextureCoord.y + uOffset.y), filterClamp.xy, filterClamp.zw));\n\n    // Sample top right pixel\n    color += texture2D(uSampler, clamp(vec2(vTextureCoord.x + uOffset.x, vTextureCoord.y + uOffset.y), filterClamp.xy, filterClamp.zw));\n\n    // Sample bottom right pixel\n    color += texture2D(uSampler, clamp(vec2(vTextureCoord.x + uOffset.x, vTextureCoord.y - uOffset.y), filterClamp.xy, filterClamp.zw));\n\n    // Sample bottom left pixel\n    color += texture2D(uSampler, clamp(vec2(vTextureCoord.x - uOffset.x, vTextureCoord.y - uOffset.y), filterClamp.xy, filterClamp.zw));\n\n    // Average\n    color *= 0.25;\n\n    gl_FragColor = color;\n}\n",d=function(e){function t(t,r,o){void 0===t&&(t=4),void 0===r&&(r=3),void 0===o&&(o=!1),e.call(this,f,o?p:h),this.uniforms.uOffset=new Float32Array(2),this._pixelSize=new n.Point,this.pixelSize=1,this._clamp=o,this._kernels=null,Array.isArray(t)?this.kernels=t:(this._blur=t,this.quality=r)}e&&(t.__proto__=e),t.prototype=Object.create(e&&e.prototype),t.prototype.constructor=t;var r={kernels:{configurable:!0},clamp:{configurable:!0},pixelSize:{configurable:!0},quality:{configurable:!0},blur:{configurable:!0}};return t.prototype.apply=function(e,t,n,r){var o,i=this.pixelSize.x/t._frame.width,l=this.pixelSize.y/t._frame.height;if(1===this._quality||0===this._blur)o=this._kernels[0]+.5,this.uniforms.uOffset[0]=o*i,this.uniforms.uOffset[1]=o*l,e.applyFilter(this,t,n,r);else{for(var s,a=e.getFilterTexture(),u=t,c=a,f=this._quality-1,h=0;h<f;h++)o=this._kernels[h]+.5,this.uniforms.uOffset[0]=o*i,this.uniforms.uOffset[1]=o*l,e.applyFilter(this,u,c,1),s=u,u=c,c=s;o=this._kernels[f]+.5,this.uniforms.uOffset[0]=o*i,this.uniforms.uOffset[1]=o*l,e.applyFilter(this,u,n,r),e.returnFilterTexture(a)}},t.prototype._generateKernels=function(){var e=this._blur,t=this._quality,n=[e];if(e>0)for(var r=e,o=e/t,i=1;i<t;i++)r-=o,n.push(r);this._kernels=n},r.kernels.get=function(){return this._kernels},r.kernels.set=function(e){Array.isArray(e)&&e.length>0?(this._kernels=e,this._quality=e.length,this._blur=Math.max.apply(Math,e)):(this._kernels=[0],this._quality=1)},r.clamp.get=function(){return this._clamp},r.pixelSize.set=function(e){"number"==typeof e?(this._pixelSize.x=e,this._pixelSize.y=e):Array.isArray(e)?(this._pixelSize.x=e[0],this._pixelSize.y=e[1]):e instanceof n.Point?(this._pixelSize.x=e.x,this._pixelSize.y=e.y):(this._pixelSize.x=1,this._pixelSize.y=1)},r.pixelSize.get=function(){return this._pixelSize},r.quality.get=function(){return this._quality},r.quality.set=function(e){this._quality=Math.max(1,Math.round(e)),this._generateKernels()},r.blur.get=function(){return this._blur},r.blur.set=function(e){this._blur=e,this._generateKernels()},Object.defineProperties(t.prototype,r),t}(t.Filter),m=a,g="\nuniform sampler2D uSampler;\nvarying vec2 vTextureCoord;\n\nuniform float threshold;\n\nvoid main() {\n    vec4 color = texture2D(uSampler, vTextureCoord);\n\n    // A simple & fast algorithm for getting brightness.\n    // It's inaccuracy , but good enought for this feature.\n    float _max = max(max(color.r, color.g), color.b);\n    float _min = min(min(color.r, color.g), color.b);\n    float brightness = (_max + _min) * 0.5;\n\n    if(brightness > threshold) {\n        gl_FragColor = color;\n    } else {\n        gl_FragColor = vec4(0.0, 0.0, 0.0, 0.0);\n    }\n}\n",v=function(e){function t(t){void 0===t&&(t=.5),e.call(this,m,g),this.threshold=t}e&&(t.__proto__=e),t.prototype=Object.create(e&&e.prototype),t.prototype.constructor=t;var n={threshold:{configurable:!0}};return n.threshold.get=function(){return this.uniforms.threshold},n.threshold.set=function(e){this.uniforms.threshold=e},Object.defineProperties(t.prototype,n),t}(t.Filter),x="uniform sampler2D uSampler;\nvarying vec2 vTextureCoord;\n\nuniform sampler2D bloomTexture;\nuniform float bloomScale;\nuniform float brightness;\n\nvoid main() {\n    vec4 color = texture2D(uSampler, vTextureCoord);\n    color.rgb *= brightness;\n    vec4 bloomColor = vec4(texture2D(bloomTexture, vTextureCoord).rgb, 0.0);\n    bloomColor.rgb *= bloomScale;\n    gl_FragColor = color + bloomColor;\n}\n",y=function(e){function t(t){e.call(this,m,x),"number"==typeof t&&(t={threshold:t}),t=Object.assign({threshold:.5,bloomScale:1,brightness:1,kernels:null,blur:8,quality:4,pixelSize:1,resolution:r.settings.RESOLUTION},t),this.bloomScale=t.bloomScale,this.brightness=t.brightness;var n=t.kernels,o=t.blur,i=t.quality,l=t.pixelSize,s=t.resolution;this._extractFilter=new v(t.threshold),this._extractFilter.resolution=s,this._blurFilter=n?new d(n):new d(o,i),this.pixelSize=l,this.resolution=s}e&&(t.__proto__=e),t.prototype=Object.create(e&&e.prototype),t.prototype.constructor=t;var n={resolution:{configurable:!0},threshold:{configurable:!0},kernels:{configurable:!0},blur:{configurable:!0},quality:{configurable:!0},pixelSize:{configurable:!0}};return t.prototype.apply=function(e,t,n,r,o){var i=e.getFilterTexture();this._extractFilter.apply(e,t,i,1,o);var l=e.getFilterTexture();this._blurFilter.apply(e,i,l,1,o),this.uniforms.bloomScale=this.bloomScale,this.uniforms.brightness=this.brightness,this.uniforms.bloomTexture=l,e.applyFilter(this,t,n,r),e.returnFilterTexture(l),e.returnFilterTexture(i)},n.resolution.get=function(){return this._resolution},n.resolution.set=function(e){this._resolution=e,this._extractFilter&&(this._extractFilter.resolution=e),this._blurFilter&&(this._blurFilter.resolution=e)},n.threshold.get=function(){return this._extractFilter.threshold},n.threshold.set=function(e){this._extractFilter.threshold=e},n.kernels.get=function(){return this._blurFilter.kernels},n.kernels.set=function(e){this._blurFilter.kernels=e},n.blur.get=function(){return this._blurFilter.blur},n.blur.set=function(e){this._blurFilter.blur=e},n.quality.get=function(){return this._blurFilter.quality},n.quality.set=function(e){this._blurFilter.quality=e},n.pixelSize.get=function(){return this._blurFilter.pixelSize},n.pixelSize.set=function(e){this._blurFilter.pixelSize=e},Object.defineProperties(t.prototype,n),t}(t.Filter),_=a,b="varying vec2 vTextureCoord;\n\nuniform vec4 filterArea;\nuniform float pixelSize;\nuniform sampler2D uSampler;\n\nvec2 mapCoord( vec2 coord )\n{\n    coord *= filterArea.xy;\n    coord += filterArea.zw;\n\n    return coord;\n}\n\nvec2 unmapCoord( vec2 coord )\n{\n    coord -= filterArea.zw;\n    coord /= filterArea.xy;\n\n    return coord;\n}\n\nvec2 pixelate(vec2 coord, vec2 size)\n{\n    return floor( coord / size ) * size;\n}\n\nvec2 getMod(vec2 coord, vec2 size)\n{\n    return mod( coord , size) / size;\n}\n\nfloat character(float n, vec2 p)\n{\n    p = floor(p*vec2(4.0, -4.0) + 2.5);\n\n    if (clamp(p.x, 0.0, 4.0) == p.x)\n    {\n        if (clamp(p.y, 0.0, 4.0) == p.y)\n        {\n            if (int(mod(n/exp2(p.x + 5.0*p.y), 2.0)) == 1) return 1.0;\n        }\n    }\n    return 0.0;\n}\n\nvoid main()\n{\n    vec2 coord = mapCoord(vTextureCoord);\n\n    // get the rounded color..\n    vec2 pixCoord = pixelate(coord, vec2(pixelSize));\n    pixCoord = unmapCoord(pixCoord);\n\n    vec4 color = texture2D(uSampler, pixCoord);\n\n    // determine the character to use\n    float gray = (color.r + color.g + color.b) / 3.0;\n\n    float n =  65536.0;             // .\n    if (gray > 0.2) n = 65600.0;    // :\n    if (gray > 0.3) n = 332772.0;   // *\n    if (gray > 0.4) n = 15255086.0; // o\n    if (gray > 0.5) n = 23385164.0; // &\n    if (gray > 0.6) n = 15252014.0; // 8\n    if (gray > 0.7) n = 13199452.0; // @\n    if (gray > 0.8) n = 11512810.0; // #\n\n    // get the mod..\n    vec2 modd = getMod(coord, vec2(pixelSize));\n\n    gl_FragColor = color * character( n, vec2(-1.0) + modd * 2.0);\n\n}\n",C=function(e){function t(t){void 0===t&&(t=8),e.call(this,_,b),this.size=t}e&&(t.__proto__=e),t.prototype=Object.create(e&&e.prototype),t.prototype.constructor=t;var n={size:{configurable:!0}};return n.size.get=function(){return this.uniforms.pixelSize},n.size.set=function(e){this.uniforms.pixelSize=e},Object.defineProperties(t.prototype,n),t}(t.Filter),S=a,F="precision mediump float;\n\nvarying vec2 vTextureCoord;\nuniform sampler2D uSampler;\nuniform vec4 filterArea;\n\nuniform float transformX;\nuniform float transformY;\nuniform vec3 lightColor;\nuniform float lightAlpha;\nuniform vec3 shadowColor;\nuniform float shadowAlpha;\n\nvoid main(void) {\n    vec2 transform = vec2(1.0 / filterArea) * vec2(transformX, transformY);\n    vec4 color = texture2D(uSampler, vTextureCoord);\n    float light = texture2D(uSampler, vTextureCoord - transform).a;\n    float shadow = texture2D(uSampler, vTextureCoord + transform).a;\n\n    color.rgb = mix(color.rgb, lightColor, clamp((color.a - light) * lightAlpha, 0.0, 1.0));\n    color.rgb = mix(color.rgb, shadowColor, clamp((color.a - shadow) * shadowAlpha, 0.0, 1.0));\n    gl_FragColor = vec4(color.rgb * color.a, color.a);\n}\n",z=function(e){function t(t){void 0===t&&(t={}),e.call(this,S,F),this.uniforms.lightColor=new Float32Array(3),this.uniforms.shadowColor=new Float32Array(3),t=Object.assign({rotation:45,thickness:2,lightColor:16777215,lightAlpha:.7,shadowColor:0,shadowAlpha:.7},t),this.rotation=t.rotation,this.thickness=t.thickness,this.lightColor=t.lightColor,this.lightAlpha=t.lightAlpha,this.shadowColor=t.shadowColor,this.shadowAlpha=t.shadowAlpha}e&&(t.__proto__=e),t.prototype=Object.create(e&&e.prototype),t.prototype.constructor=t;var r={rotation:{configurable:!0},thickness:{configurable:!0},lightColor:{configurable:!0},lightAlpha:{configurable:!0},shadowColor:{configurable:!0},shadowAlpha:{configurable:!0}};return t.prototype._updateTransform=function(){this.uniforms.transformX=this._thickness*Math.cos(this._angle),this.uniforms.transformY=this._thickness*Math.sin(this._angle)},r.rotation.get=function(){return this._angle/n.DEG_TO_RAD},r.rotation.set=function(e){this._angle=e*n.DEG_TO_RAD,this._updateTransform()},r.thickness.get=function(){return this._thickness},r.thickness.set=function(e){this._thickness=e,this._updateTransform()},r.lightColor.get=function(){return o.rgb2hex(this.uniforms.lightColor)},r.lightColor.set=function(e){o.hex2rgb(e,this.uniforms.lightColor)},r.lightAlpha.get=function(){return this.uniforms.lightAlpha},r.lightAlpha.set=function(e){this.uniforms.lightAlpha=e},r.shadowColor.get=function(){return o.rgb2hex(this.uniforms.shadowColor)},r.shadowColor.set=function(e){o.hex2rgb(e,this.uniforms.shadowColor)},r.shadowAlpha.get=function(){return this.uniforms.shadowAlpha},r.shadowAlpha.set=function(e){this.uniforms.shadowAlpha=e},Object.defineProperties(t.prototype,r),t}(t.Filter),A=function(e){function t(t,o,a,u){var c,f;void 0===t&&(t=2),void 0===o&&(o=4),void 0===a&&(a=r.settings.RESOLUTION),void 0===u&&(u=5),e.call(this),"number"==typeof t?(c=t,f=t):t instanceof n.Point?(c=t.x,f=t.y):Array.isArray(t)&&(c=t[0],f=t[1]),this.blurXFilter=new s.BlurFilterPass(!0,c,o,a,u),this.blurYFilter=new s.BlurFilterPass(!1,f,o,a,u),this.blurYFilter.blendMode=i.BLEND_MODES.SCREEN,this.defaultFilter=new l.AlphaFilter}e&&(t.__proto__=e),t.prototype=Object.create(e&&e.prototype),t.prototype.constructor=t;var o={blur:{configurable:!0},blurX:{configurable:!0},blurY:{configurable:!0}};return t.prototype.apply=function(e,t,n){var r=e.getFilterTexture(!0);this.defaultFilter.apply(e,t,n),this.blurXFilter.apply(e,t,r),this.blurYFilter.apply(e,r,n),e.returnFilterTexture(r)},o.blur.get=function(){return this.blurXFilter.blur},o.blur.set=function(e){this.blurXFilter.blur=this.blurYFilter.blur=e},o.blurX.get=function(){return this.blurXFilter.blur},o.blurX.set=function(e){this.blurXFilter.blur=e},o.blurY.get=function(){return this.blurYFilter.blur},o.blurY.set=function(e){this.blurYFilter.blur=e},Object.defineProperties(t.prototype,o),t}(t.Filter),w=a,T="uniform float radius;\nuniform float strength;\nuniform vec2 center;\nuniform sampler2D uSampler;\nvarying vec2 vTextureCoord;\n\nuniform vec4 filterArea;\nuniform vec4 filterClamp;\nuniform vec2 dimensions;\n\nvoid main()\n{\n    vec2 coord = vTextureCoord * filterArea.xy;\n    coord -= center * dimensions.xy;\n    float distance = length(coord);\n    if (distance < radius) {\n        float percent = distance / radius;\n        if (strength > 0.0) {\n            coord *= mix(1.0, smoothstep(0.0, radius / distance, percent), strength * 0.75);\n        } else {\n            coord *= mix(1.0, pow(percent, 1.0 + strength * 0.75) * radius / distance, 1.0 - percent);\n        }\n    }\n    coord += center * dimensions.xy;\n    coord /= filterArea.xy;\n    vec2 clampedCoord = clamp(coord, filterClamp.xy, filterClamp.zw);\n    vec4 color = texture2D(uSampler, clampedCoord);\n    if (coord != clampedCoord) {\n        color *= max(0.0, 1.0 - length(coord - clampedCoord));\n    }\n\n    gl_FragColor = color;\n}\n",O=function(e){function t(t){if(e.call(this,w,T),"object"!=typeof t){var n=arguments[0],r=arguments[1],o=arguments[2];t={},void 0!==n&&(t.center=n),void 0!==r&&(t.radius=r),void 0!==o&&(t.strength=o)}this.uniforms.dimensions=new Float32Array(2),Object.assign(this,{center:[.5,.5],radius:100,strength:1},t)}e&&(t.__proto__=e),t.prototype=Object.create(e&&e.prototype),t.prototype.constructor=t;var n={radius:{configurable:!0},strength:{configurable:!0},center:{configurable:!0}};return t.prototype.apply=function(e,t,n,r){this.uniforms.dimensions[0]=t.filterFrame.width,this.uniforms.dimensions[1]=t.filterFrame.height,e.applyFilter(this,t,n,r)},n.radius.get=function(){return this.uniforms.radius},n.radius.set=function(e){this.uniforms.radius=e},n.strength.get=function(){return this.uniforms.strength},n.strength.set=function(e){this.uniforms.strength=e},n.center.get=function(){return this.uniforms.center},n.center.set=function(e){this.uniforms.center=e},Object.defineProperties(t.prototype,n),t}(t.Filter),D=a,P="varying vec2 vTextureCoord;\nuniform sampler2D uSampler;\nuniform sampler2D colorMap;\nuniform float _mix;\nuniform float _size;\nuniform float _sliceSize;\nuniform float _slicePixelSize;\nuniform float _sliceInnerSize;\nvoid main() {\n    vec4 color = texture2D(uSampler, vTextureCoord.xy);\n\n    vec4 adjusted;\n    if (color.a > 0.0) {\n        color.rgb /= color.a;\n        float innerWidth = _size - 1.0;\n        float zSlice0 = min(floor(color.b * innerWidth), innerWidth);\n        float zSlice1 = min(zSlice0 + 1.0, innerWidth);\n        float xOffset = _slicePixelSize * 0.5 + color.r * _sliceInnerSize;\n        float s0 = xOffset + (zSlice0 * _sliceSize);\n        float s1 = xOffset + (zSlice1 * _sliceSize);\n        float yOffset = _sliceSize * 0.5 + color.g * (1.0 - _sliceSize);\n        vec4 slice0Color = texture2D(colorMap, vec2(s0,yOffset));\n        vec4 slice1Color = texture2D(colorMap, vec2(s1,yOffset));\n        float zOffset = fract(color.b * innerWidth);\n        adjusted = mix(slice0Color, slice1Color, zOffset);\n\n        color.rgb *= color.a;\n    }\n    gl_FragColor = vec4(mix(color, adjusted, _mix).rgb, color.a);\n\n}",M=function(e){function n(t,n,r){void 0===n&&(n=!1),void 0===r&&(r=1),e.call(this,D,P),this._size=0,this._sliceSize=0,this._slicePixelSize=0,this._sliceInnerSize=0,this._scaleMode=null,this._nearest=!1,this.nearest=n,this.mix=r,this.colorMap=t}e&&(n.__proto__=e),n.prototype=Object.create(e&&e.prototype),n.prototype.constructor=n;var r={colorSize:{configurable:!0},colorMap:{configurable:!0},nearest:{configurable:!0}};return n.prototype.apply=function(e,t,n,r){this.uniforms._mix=this.mix,e.applyFilter(this,t,n,r)},r.colorSize.get=function(){return this._size},r.colorMap.get=function(){return this._colorMap},r.colorMap.set=function(e){e instanceof t.Texture||(e=t.Texture.from(e)),e&&e.baseTexture&&(e.baseTexture.scaleMode=this._scaleMode,e.baseTexture.mipmap=!1,this._size=e.height,this._sliceSize=1/this._size,this._slicePixelSize=this._sliceSize/this._size,this._sliceInnerSize=this._slicePixelSize*(this._size-1),this.uniforms._size=this._size,this.uniforms._sliceSize=this._sliceSize,this.uniforms._slicePixelSize=this._slicePixelSize,this.uniforms._sliceInnerSize=this._sliceInnerSize,this.uniforms.colorMap=e),this._colorMap=e},r.nearest.get=function(){return this._nearest},r.nearest.set=function(e){this._nearest=e,this._scaleMode=e?i.SCALE_MODES.NEAREST:i.SCALE_MODES.LINEAR;var t=this._colorMap;t&&t.baseTexture&&(t.baseTexture._glTextures={},t.baseTexture.scaleMode=this._scaleMode,t.baseTexture.mipmap=!1,t._updateID++,t.baseTexture.emit("update",t.baseTexture))},n.prototype.updateColorMap=function(){var e=this._colorMap;e&&e.baseTexture&&(e._updateID++,e.baseTexture.emit("update",e.baseTexture),this.colorMap=e)},n.prototype.destroy=function(t){this._colorMap&&this._colorMap.destroy(t),e.prototype.destroy.call(this)},Object.defineProperties(n.prototype,r),n}(t.Filter),R=a,k="varying vec2 vTextureCoord;\nuniform sampler2D uSampler;\nuniform vec3 color;\nvoid main(void) {\n    vec4 currentColor = texture2D(uSampler, vTextureCoord);\n    vec3 colorOverlay = color * currentColor.a;\n    gl_FragColor = vec4(colorOverlay.r, colorOverlay.g, colorOverlay.b, currentColor.a);\n}\n",j=function(e){function t(t){void 0===t&&(t=0),e.call(this,R,k),this.uniforms.color=new Float32Array(3),this.color=t}e&&(t.__proto__=e),t.prototype=Object.create(e&&e.prototype),t.prototype.constructor=t;var n={color:{configurable:!0}};return n.color.set=function(e){var t=this.uniforms.color;"number"==typeof e?(o.hex2rgb(e,t),this._color=e):(t[0]=e[0],t[1]=e[1],t[2]=e[2],this._color=o.rgb2hex(t))},n.color.get=function(){return this._color},Object.defineProperties(t.prototype,n),t}(t.Filter),E=a,L="varying vec2 vTextureCoord;\nuniform sampler2D uSampler;\nuniform vec3 originalColor;\nuniform vec3 newColor;\nuniform float epsilon;\nvoid main(void) {\n    vec4 currentColor = texture2D(uSampler, vTextureCoord);\n    vec3 colorDiff = originalColor - (currentColor.rgb / max(currentColor.a, 0.0000000001));\n    float colorDistance = length(colorDiff);\n    float doReplace = step(colorDistance, epsilon);\n    gl_FragColor = vec4(mix(currentColor.rgb, (newColor + colorDiff) * currentColor.a, doReplace), currentColor.a);\n}\n",I=function(e){function t(t,n,r){void 0===t&&(t=16711680),void 0===n&&(n=0),void 0===r&&(r=.4),e.call(this,E,L),this.uniforms.originalColor=new Float32Array(3),this.uniforms.newColor=new Float32Array(3),this.originalColor=t,this.newColor=n,this.epsilon=r}e&&(t.__proto__=e),t.prototype=Object.create(e&&e.prototype),t.prototype.constructor=t;var n={originalColor:{configurable:!0},newColor:{configurable:!0},epsilon:{configurable:!0}};return n.originalColor.set=function(e){var t=this.uniforms.originalColor;"number"==typeof e?(o.hex2rgb(e,t),this._originalColor=e):(t[0]=e[0],t[1]=e[1],t[2]=e[2],this._originalColor=o.rgb2hex(t))},n.originalColor.get=function(){return this._originalColor},n.newColor.set=function(e){var t=this.uniforms.newColor;"number"==typeof e?(o.hex2rgb(e,t),this._newColor=e):(t[0]=e[0],t[1]=e[1],t[2]=e[2],this._newColor=o.rgb2hex(t))},n.newColor.get=function(){return this._newColor},n.epsilon.set=function(e){this.uniforms.epsilon=e},n.epsilon.get=function(){return this.uniforms.epsilon},Object.defineProperties(t.prototype,n),t}(t.Filter),X=a,B="precision mediump float;\n\nvarying mediump vec2 vTextureCoord;\n\nuniform sampler2D uSampler;\nuniform vec2 texelSize;\nuniform float matrix[9];\n\nvoid main(void)\n{\n   vec4 c11 = texture2D(uSampler, vTextureCoord - texelSize); // top left\n   vec4 c12 = texture2D(uSampler, vec2(vTextureCoord.x, vTextureCoord.y - texelSize.y)); // top center\n   vec4 c13 = texture2D(uSampler, vec2(vTextureCoord.x + texelSize.x, vTextureCoord.y - texelSize.y)); // top right\n\n   vec4 c21 = texture2D(uSampler, vec2(vTextureCoord.x - texelSize.x, vTextureCoord.y)); // mid left\n   vec4 c22 = texture2D(uSampler, vTextureCoord); // mid center\n   vec4 c23 = texture2D(uSampler, vec2(vTextureCoord.x + texelSize.x, vTextureCoord.y)); // mid right\n\n   vec4 c31 = texture2D(uSampler, vec2(vTextureCoord.x - texelSize.x, vTextureCoord.y + texelSize.y)); // bottom left\n   vec4 c32 = texture2D(uSampler, vec2(vTextureCoord.x, vTextureCoord.y + texelSize.y)); // bottom center\n   vec4 c33 = texture2D(uSampler, vTextureCoord + texelSize); // bottom right\n\n   gl_FragColor =\n       c11 * matrix[0] + c12 * matrix[1] + c13 * matrix[2] +\n       c21 * matrix[3] + c22 * matrix[4] + c23 * matrix[5] +\n       c31 * matrix[6] + c32 * matrix[7] + c33 * matrix[8];\n\n   gl_FragColor.a = c22.a;\n}\n",N=function(e){function t(t,n,r){void 0===n&&(n=200),void 0===r&&(r=200),e.call(this,X,B),this.uniforms.texelSize=new Float32Array(2),this.uniforms.matrix=new Float32Array(9),void 0!==t&&(this.matrix=t),this.width=n,this.height=r}e&&(t.__proto__=e),t.prototype=Object.create(e&&e.prototype),t.prototype.constructor=t;var n={matrix:{configurable:!0},width:{configurable:!0},height:{configurable:!0}};return n.matrix.get=function(){return this.uniforms.matrix},n.matrix.set=function(e){var t=this;e.forEach(function(e,n){return t.uniforms.matrix[n]=e})},n.width.get=function(){return 1/this.uniforms.texelSize[0]},n.width.set=function(e){this.uniforms.texelSize[0]=1/e},n.height.get=function(){return 1/this.uniforms.texelSize[1]},n.height.set=function(e){this.uniforms.texelSize[1]=1/e},Object.defineProperties(t.prototype,n),t}(t.Filter),G=a,q="precision mediump float;\n\nvarying vec2 vTextureCoord;\n\nuniform sampler2D uSampler;\n\nvoid main(void)\n{\n    float lum = length(texture2D(uSampler, vTextureCoord.xy).rgb);\n\n    gl_FragColor = vec4(1.0, 1.0, 1.0, 1.0);\n\n    if (lum < 1.00)\n    {\n        if (mod(gl_FragCoord.x + gl_FragCoord.y, 10.0) == 0.0)\n        {\n            gl_FragColor = vec4(0.0, 0.0, 0.0, 1.0);\n        }\n    }\n\n    if (lum < 0.75)\n    {\n        if (mod(gl_FragCoord.x - gl_FragCoord.y, 10.0) == 0.0)\n        {\n            gl_FragColor = vec4(0.0, 0.0, 0.0, 1.0);\n        }\n    }\n\n    if (lum < 0.50)\n    {\n        if (mod(gl_FragCoord.x + gl_FragCoord.y - 5.0, 10.0) == 0.0)\n        {\n            gl_FragColor = vec4(0.0, 0.0, 0.0, 1.0);\n        }\n    }\n\n    if (lum < 0.3)\n    {\n        if (mod(gl_FragCoord.x - gl_FragCoord.y - 5.0, 10.0) == 0.0)\n        {\n            gl_FragColor = vec4(0.0, 0.0, 0.0, 1.0);\n        }\n    }\n}\n",W=function(e){function t(){e.call(this,G,q)}return e&&(t.__proto__=e),t.prototype=Object.create(e&&e.prototype),t.prototype.constructor=t,t}(t.Filter),K=a,Y="varying vec2 vTextureCoord;\nuniform sampler2D uSampler;\n\nuniform vec4 filterArea;\nuniform vec2 dimensions;\n\nconst float SQRT_2 = 1.414213;\n\nconst float light = 1.0;\n\nuniform float curvature;\nuniform float lineWidth;\nuniform float lineContrast;\nuniform bool verticalLine;\nuniform float noise;\nuniform float noiseSize;\n\nuniform float vignetting;\nuniform float vignettingAlpha;\nuniform float vignettingBlur;\n\nuniform float seed;\nuniform float time;\n\nfloat rand(vec2 co) {\n    return fract(sin(dot(co.xy, vec2(12.9898, 78.233))) * 43758.5453);\n}\n\nvoid main(void)\n{\n    vec2 pixelCoord = vTextureCoord.xy * filterArea.xy;\n    vec2 coord = pixelCoord / dimensions;\n\n    vec2 dir = vec2(coord - vec2(0.5, 0.5));\n\n    float _c = curvature > 0. ? curvature : 1.;\n    float k = curvature > 0. ?(length(dir * dir) * 0.25 * _c * _c + 0.935 * _c) : 1.;\n    vec2 uv = dir * k;\n\n    gl_FragColor = texture2D(uSampler, vTextureCoord);\n    vec3 rgb = gl_FragColor.rgb;\n\n\n    if (noise > 0.0 && noiseSize > 0.0)\n    {\n        pixelCoord.x = floor(pixelCoord.x / noiseSize);\n        pixelCoord.y = floor(pixelCoord.y / noiseSize);\n        float _noise = rand(pixelCoord * noiseSize * seed) - 0.5;\n        rgb += _noise * noise;\n    }\n\n    if (lineWidth > 0.0) {\n        float v = (verticalLine ? uv.x * dimensions.x : uv.y * dimensions.y) * min(1.0, 2.0 / lineWidth ) / _c;\n        float j = 1. + cos(v * 1.2 - time) * 0.5 * lineContrast;\n        rgb *= j;\n        float segment = verticalLine ? mod((dir.x + .5) * dimensions.x, 4.) : mod((dir.y + .5) * dimensions.y, 4.);\n        rgb *= 0.99 + ceil(segment) * 0.015;\n    }\n\n    if (vignetting > 0.0)\n    {\n        float outter = SQRT_2 - vignetting * SQRT_2;\n        float darker = clamp((outter - length(dir) * SQRT_2) / ( 0.00001 + vignettingBlur * SQRT_2), 0.0, 1.0);\n        rgb *= darker + (1.0 - darker) * (1.0 - vignettingAlpha);\n    }\n\n    gl_FragColor.rgb = rgb;\n}\n",Z=function(e){function t(t){e.call(this,K,Y),this.uniforms.dimensions=new Float32Array(2),this.time=0,this.seed=0,Object.assign(this,{curvature:1,lineWidth:1,lineContrast:.25,verticalLine:!1,noise:0,noiseSize:1,seed:0,vignetting:.3,vignettingAlpha:1,vignettingBlur:.3,time:0},t)}e&&(t.__proto__=e),t.prototype=Object.create(e&&e.prototype),t.prototype.constructor=t;var n={curvature:{configurable:!0},lineWidth:{configurable:!0},lineContrast:{configurable:!0},verticalLine:{configurable:!0},noise:{configurable:!0},noiseSize:{configurable:!0},vignetting:{configurable:!0},vignettingAlpha:{configurable:!0},vignettingBlur:{configurable:!0}};return t.prototype.apply=function(e,t,n,r){this.uniforms.dimensions[0]=t.filterFrame.width,this.uniforms.dimensions[1]=t.filterFrame.height,this.uniforms.seed=this.seed,this.uniforms.time=this.time,e.applyFilter(this,t,n,r)},n.curvature.set=function(e){this.uniforms.curvature=e},n.curvature.get=function(){return this.uniforms.curvature},n.lineWidth.set=function(e){this.uniforms.lineWidth=e},n.lineWidth.get=function(){return this.uniforms.lineWidth},n.lineContrast.set=function(e){this.uniforms.lineContrast=e},n.lineContrast.get=function(){return this.uniforms.lineContrast},n.verticalLine.set=function(e){this.uniforms.verticalLine=e},n.verticalLine.get=function(){return this.uniforms.verticalLine},n.noise.set=function(e){this.uniforms.noise=e},n.noise.get=function(){return this.uniforms.noise},n.noiseSize.set=function(e){this.uniforms.noiseSize=e},n.noiseSize.get=function(){return this.uniforms.noiseSize},n.vignetting.set=function(e){this.uniforms.vignetting=e},n.vignetting.get=function(){return this.uniforms.vignetting},n.vignettingAlpha.set=function(e){this.uniforms.vignettingAlpha=e},n.vignettingAlpha.get=function(){return this.uniforms.vignettingAlpha},n.vignettingBlur.set=function(e){this.uniforms.vignettingBlur=e},n.vignettingBlur.get=function(){return this.uniforms.vignettingBlur},Object.defineProperties(t.prototype,n),t}(t.Filter),Q=a,U="precision mediump float;\n\nvarying vec2 vTextureCoord;\nvarying vec4 vColor;\n\nuniform vec4 filterArea;\nuniform sampler2D uSampler;\n\nuniform float angle;\nuniform float scale;\n\nfloat pattern()\n{\n   float s = sin(angle), c = cos(angle);\n   vec2 tex = vTextureCoord * filterArea.xy;\n   vec2 point = vec2(\n       c * tex.x - s * tex.y,\n       s * tex.x + c * tex.y\n   ) * scale;\n   return (sin(point.x) * sin(point.y)) * 4.0;\n}\n\nvoid main()\n{\n   vec4 color = texture2D(uSampler, vTextureCoord);\n   float average = (color.r + color.g + color.b) / 3.0;\n   gl_FragColor = vec4(vec3(average * 10.0 - 5.0 + pattern()), color.a);\n}\n",V=function(e){function t(t,n){void 0===t&&(t=1),void 0===n&&(n=5),e.call(this,Q,U),this.scale=t,this.angle=n}e&&(t.__proto__=e),t.prototype=Object.create(e&&e.prototype),t.prototype.constructor=t;var n={scale:{configurable:!0},angle:{configurable:!0}};return n.scale.get=function(){return this.uniforms.scale},n.scale.set=function(e){this.uniforms.scale=e},n.angle.get=function(){return this.uniforms.angle},n.angle.set=function(e){this.uniforms.angle=e},Object.defineProperties(t.prototype,n),t}(t.Filter),H=a,$="varying vec2 vTextureCoord;\nuniform sampler2D uSampler;\nuniform float alpha;\nuniform vec3 color;\n\nuniform vec2 shift;\nuniform vec4 inputSize;\n\nvoid main(void){\n    vec4 sample = texture2D(uSampler, vTextureCoord - shift * inputSize.zw);\n\n    // Premultiply alpha\n    sample.rgb = color.rgb * sample.a;\n\n    // alpha user alpha\n    sample *= alpha;\n\n    gl_FragColor = sample;\n}",J=function(e){function t(t){t&&t.constructor!==Object&&(console.warn("DropShadowFilter now uses options instead of (rotation, distance, blur, color, alpha)"),t={rotation:t},void 0!==arguments[1]&&(t.distance=arguments[1]),void 0!==arguments[2]&&(t.blur=arguments[2]),void 0!==arguments[3]&&(t.color=arguments[3]),void 0!==arguments[4]&&(t.alpha=arguments[4])),t=Object.assign({rotation:45,distance:5,color:0,alpha:.5,shadowOnly:!1,kernels:null,blur:2,quality:3,pixelSize:1,resolution:r.settings.RESOLUTION},t),e.call(this);var o=t.kernels,i=t.blur,l=t.quality,s=t.pixelSize,a=t.resolution;this._tintFilter=new e(H,$),this._tintFilter.uniforms.color=new Float32Array(4),this._tintFilter.uniforms.shift=new n.Point,this._tintFilter.resolution=a,this._blurFilter=o?new d(o):new d(i,l),this.pixelSize=s,this.resolution=a;var u=t.shadowOnly,c=t.rotation,f=t.distance,h=t.alpha,p=t.color;this.shadowOnly=u,this.rotation=c,this.distance=f,this.alpha=h,this.color=p,this._updatePadding()}e&&(t.__proto__=e),t.prototype=Object.create(e&&e.prototype),t.prototype.constructor=t;var i={resolution:{configurable:!0},distance:{configurable:!0},rotation:{configurable:!0},alpha:{configurable:!0},color:{configurable:!0},kernels:{configurable:!0},blur:{configurable:!0},quality:{configurable:!0},pixelSize:{configurable:!0}};return t.prototype.apply=function(e,t,n,r){var o=e.getFilterTexture();this._tintFilter.apply(e,t,o,1),this._blurFilter.apply(e,o,n,r),!0!==this.shadowOnly&&e.applyFilter(this,t,n,0),e.returnFilterTexture(o)},t.prototype._updatePadding=function(){this.padding=this.distance+2*this.blur},t.prototype._updateShift=function(){this._tintFilter.uniforms.shift.set(this.distance*Math.cos(this.angle),this.distance*Math.sin(this.angle))},i.resolution.get=function(){return this._resolution},i.resolution.set=function(e){this._resolution=e,this._tintFilter&&(this._tintFilter.resolution=e),this._blurFilter&&(this._blurFilter.resolution=e)},i.distance.get=function(){return this._distance},i.distance.set=function(e){this._distance=e,this._updatePadding(),this._updateShift()},i.rotation.get=function(){return this.angle/n.DEG_TO_RAD},i.rotation.set=function(e){this.angle=e*n.DEG_TO_RAD,this._updateShift()},i.alpha.get=function(){return this._tintFilter.uniforms.alpha},i.alpha.set=function(e){this._tintFilter.uniforms.alpha=e},i.color.get=function(){return o.rgb2hex(this._tintFilter.uniforms.color)},i.color.set=function(e){o.hex2rgb(e,this._tintFilter.uniforms.color)},i.kernels.get=function(){return this._blurFilter.kernels},i.kernels.set=function(e){this._blurFilter.kernels=e},i.blur.get=function(){return this._blurFilter.blur},i.blur.set=function(e){this._blurFilter.blur=e,this._updatePadding()},i.quality.get=function(){return this._blurFilter.quality},i.quality.set=function(e){this._blurFilter.quality=e},i.pixelSize.get=function(){return this._blurFilter.pixelSize},i.pixelSize.set=function(e){this._blurFilter.pixelSize=e},Object.defineProperties(t.prototype,i),t}(t.Filter),ee=a,te="precision mediump float;\n\nvarying vec2 vTextureCoord;\n\nuniform sampler2D uSampler;\nuniform float strength;\nuniform vec4 filterArea;\n\n\nvoid main(void)\n{\n\tvec2 onePixel = vec2(1.0 / filterArea);\n\n\tvec4 color;\n\n\tcolor.rgb = vec3(0.5);\n\n\tcolor -= texture2D(uSampler, vTextureCoord - onePixel) * strength;\n\tcolor += texture2D(uSampler, vTextureCoord + onePixel) * strength;\n\n\tcolor.rgb = vec3((color.r + color.g + color.b) / 3.0);\n\n\tfloat alpha = texture2D(uSampler, vTextureCoord).a;\n\n\tgl_FragColor = vec4(color.rgb * alpha, alpha);\n}\n",ne=function(e){function t(t){void 0===t&&(t=5),e.call(this,ee,te),this.strength=t}e&&(t.__proto__=e),t.prototype=Object.create(e&&e.prototype),t.prototype.constructor=t;var n={strength:{configurable:!0}};return n.strength.get=function(){return this.uniforms.strength},n.strength.set=function(e){this.uniforms.strength=e},Object.defineProperties(t.prototype,n),t}(t.Filter),re=a,oe="// precision highp float;\n\nvarying vec2 vTextureCoord;\nuniform sampler2D uSampler;\n\nuniform vec4 filterArea;\nuniform vec4 filterClamp;\nuniform vec2 dimensions;\nuniform float aspect;\n\nuniform sampler2D displacementMap;\nuniform float offset;\nuniform float sinDir;\nuniform float cosDir;\nuniform int fillMode;\n\nuniform float seed;\nuniform vec2 red;\nuniform vec2 green;\nuniform vec2 blue;\n\nconst int TRANSPARENT = 0;\nconst int ORIGINAL = 1;\nconst int LOOP = 2;\nconst int CLAMP = 3;\nconst int MIRROR = 4;\n\nvoid main(void)\n{\n    vec2 coord = (vTextureCoord * filterArea.xy) / dimensions;\n\n    if (coord.x > 1.0 || coord.y > 1.0) {\n        return;\n    }\n\n    float cx = coord.x - 0.5;\n    float cy = (coord.y - 0.5) * aspect;\n    float ny = (-sinDir * cx + cosDir * cy) / aspect + 0.5;\n\n    // displacementMap: repeat\n    // ny = ny > 1.0 ? ny - 1.0 : (ny < 0.0 ? 1.0 + ny : ny);\n\n    // displacementMap: mirror\n    ny = ny > 1.0 ? 2.0 - ny : (ny < 0.0 ? -ny : ny);\n\n    vec4 dc = texture2D(displacementMap, vec2(0.5, ny));\n\n    float displacement = (dc.r - dc.g) * (offset / filterArea.x);\n\n    coord = vTextureCoord + vec2(cosDir * displacement, sinDir * displacement * aspect);\n\n    if (fillMode == CLAMP) {\n        coord = clamp(coord, filterClamp.xy, filterClamp.zw);\n    } else {\n        if( coord.x > filterClamp.z ) {\n            if (fillMode == TRANSPARENT) {\n                discard;\n            } else if (fillMode == LOOP) {\n                coord.x -= filterClamp.z;\n            } else if (fillMode == MIRROR) {\n                coord.x = filterClamp.z * 2.0 - coord.x;\n            }\n        } else if( coord.x < filterClamp.x ) {\n            if (fillMode == TRANSPARENT) {\n                discard;\n            } else if (fillMode == LOOP) {\n                coord.x += filterClamp.z;\n            } else if (fillMode == MIRROR) {\n                coord.x *= -filterClamp.z;\n            }\n        }\n\n        if( coord.y > filterClamp.w ) {\n            if (fillMode == TRANSPARENT) {\n                discard;\n            } else if (fillMode == LOOP) {\n                coord.y -= filterClamp.w;\n            } else if (fillMode == MIRROR) {\n                coord.y = filterClamp.w * 2.0 - coord.y;\n            }\n        } else if( coord.y < filterClamp.y ) {\n            if (fillMode == TRANSPARENT) {\n                discard;\n            } else if (fillMode == LOOP) {\n                coord.y += filterClamp.w;\n            } else if (fillMode == MIRROR) {\n                coord.y *= -filterClamp.w;\n            }\n        }\n    }\n\n    gl_FragColor.r = texture2D(uSampler, coord + red * (1.0 - seed * 0.4) / filterArea.xy).r;\n    gl_FragColor.g = texture2D(uSampler, coord + green * (1.0 - seed * 0.3) / filterArea.xy).g;\n    gl_FragColor.b = texture2D(uSampler, coord + blue * (1.0 - seed * 0.2) / filterArea.xy).b;\n    gl_FragColor.a = texture2D(uSampler, coord).a;\n}\n",ie=function(e){function r(n){void 0===n&&(n={}),e.call(this,re,oe),this.uniforms.dimensions=new Float32Array(2),n=Object.assign({slices:5,offset:100,direction:0,fillMode:0,average:!1,seed:0,red:[0,0],green:[0,0],blue:[0,0],minSize:8,sampleSize:512},n),this.direction=n.direction,this.red=n.red,this.green=n.green,this.blue=n.blue,this.offset=n.offset,this.fillMode=n.fillMode,this.average=n.average,this.seed=n.seed,this.minSize=n.minSize,this.sampleSize=n.sampleSize,this._canvas=document.createElement("canvas"),this._canvas.width=4,this._canvas.height=this.sampleSize,this.texture=t.Texture.from(this._canvas,{scaleMode:i.SCALE_MODES.NEAREST}),this._slices=0,this.slices=n.slices}e&&(r.__proto__=e),r.prototype=Object.create(e&&e.prototype),r.prototype.constructor=r;var o={sizes:{configurable:!0},offsets:{configurable:!0},slices:{configurable:!0},direction:{configurable:!0},red:{configurable:!0},green:{configurable:!0},blue:{configurable:!0}};return r.prototype.apply=function(e,t,n,r){var o=t.filterFrame.width,i=t.filterFrame.height;this.uniforms.dimensions[0]=o,this.uniforms.dimensions[1]=i,this.uniforms.aspect=i/o,this.uniforms.seed=this.seed,this.uniforms.offset=this.offset,this.uniforms.fillMode=this.fillMode,e.applyFilter(this,t,n,r)},r.prototype._randomizeSizes=function(){var e=this._sizes,t=this._slices-1,n=this.sampleSize,r=Math.min(this.minSize/n,.9/this._slices);if(this.average){for(var o=this._slices,i=1,l=0;l<t;l++){var s=i/(o-l),a=Math.max(s*(1-.6*Math.random()),r);e[l]=a,i-=a}e[t]=i}else{for(var u=1,c=Math.sqrt(1/this._slices),f=0;f<t;f++){var h=Math.max(c*u*Math.random(),r);e[f]=h,u-=h}e[t]=u}this.shuffle()},r.prototype.shuffle=function(){for(var e=this._sizes,t=this._slices-1;t>0;t--){var n=Math.random()*t>>0,r=e[t];e[t]=e[n],e[n]=r}},r.prototype._randomizeOffsets=function(){for(var e=0;e<this._slices;e++)this._offsets[e]=Math.random()*(Math.random()<.5?-1:1)},r.prototype.refresh=function(){this._randomizeSizes(),this._randomizeOffsets(),this.redraw()},r.prototype.redraw=function(){var e,t=this.sampleSize,n=this.texture,r=this._canvas.getContext("2d");r.clearRect(0,0,8,t);for(var o=0,i=0;i<this._slices;i++){e=Math.floor(256*this._offsets[i]);var l=this._sizes[i]*t,s=e>0?e:0,a=e<0?-e:0;r.fillStyle="rgba("+s+", "+a+", 0, 1)",r.fillRect(0,o>>0,t,l+1>>0),o+=l}n.baseTexture.update(),this.uniforms.displacementMap=n},o.sizes.set=function(e){for(var t=Math.min(this._slices,e.length),n=0;n<t;n++)this._sizes[n]=e[n]},o.sizes.get=function(){return this._sizes},o.offsets.set=function(e){for(var t=Math.min(this._slices,e.length),n=0;n<t;n++)this._offsets[n]=e[n]},o.offsets.get=function(){return this._offsets},o.slices.get=function(){return this._slices},o.slices.set=function(e){this._slices!==e&&(this._slices=e,this.uniforms.slices=e,this._sizes=this.uniforms.slicesWidth=new Float32Array(e),this._offsets=this.uniforms.slicesOffset=new Float32Array(e),this.refresh())},o.direction.get=function(){return this._direction},o.direction.set=function(e){if(this._direction!==e){this._direction=e;var t=e*n.DEG_TO_RAD;this.uniforms.sinDir=Math.sin(t),this.uniforms.cosDir=Math.cos(t)}},o.red.get=function(){return this.uniforms.red},o.red.set=function(e){this.uniforms.red=e},o.green.get=function(){return this.uniforms.green},o.green.set=function(e){this.uniforms.green=e},o.blue.get=function(){return this.uniforms.blue},o.blue.set=function(e){this.uniforms.blue=e},r.prototype.destroy=function(){this.texture.destroy(!0),this.texture=null,this._canvas=null,this.red=null,this.green=null,this.blue=null,this._sizes=null,this._offsets=null},Object.defineProperties(r.prototype,o),r}(t.Filter);ie.TRANSPARENT=0,ie.ORIGINAL=1,ie.LOOP=2,ie.CLAMP=3,ie.MIRROR=4;var le=a,se="varying vec2 vTextureCoord;\nvarying vec4 vColor;\n\nuniform sampler2D uSampler;\n\nuniform float outerStrength;\nuniform float innerStrength;\n\nuniform vec4 glowColor;\n\nuniform vec4 filterArea;\nuniform vec4 filterClamp;\nuniform bool knockout;\n\nconst float PI = 3.14159265358979323846264;\n\nconst float DIST = __DIST__;\nconst float ANGLE_STEP_SIZE = min(__ANGLE_STEP_SIZE__, PI * 2.0);\nconst float ANGLE_STEP_NUM = ceil(PI * 2.0 / ANGLE_STEP_SIZE);\n\nconst float MAX_TOTAL_ALPHA = ANGLE_STEP_NUM * DIST * (DIST + 1.0) / 2.0;\n\nvoid main(void) {\n    vec2 px = vec2(1.0 / filterArea.x, 1.0 / filterArea.y);\n\n    float totalAlpha = 0.0;\n\n    vec2 direction;\n    vec2 displaced;\n    vec4 curColor;\n\n    for (float angle = 0.0; angle < PI * 2.0; angle += ANGLE_STEP_SIZE) {\n       direction = vec2(cos(angle), sin(angle)) * px;\n\n       for (float curDistance = 0.0; curDistance < DIST; curDistance++) {\n           displaced = clamp(vTextureCoord + direction * \n                   (curDistance + 1.0), filterClamp.xy, filterClamp.zw);\n\n           curColor = texture2D(uSampler, displaced);\n\n           totalAlpha += (DIST - curDistance) * curColor.a;\n       }\n    }\n    \n    curColor = texture2D(uSampler, vTextureCoord);\n\n    float alphaRatio = (totalAlpha / MAX_TOTAL_ALPHA);\n\n    float innerGlowAlpha = (1.0 - alphaRatio) * innerStrength * curColor.a;\n    float innerGlowStrength = min(1.0, innerGlowAlpha);\n    \n    vec4 innerColor = mix(curColor, glowColor, innerGlowStrength);\n\n    float outerGlowAlpha = alphaRatio * outerStrength * (1. - curColor.a);\n    float outerGlowStrength = min(1.0 - innerColor.a, outerGlowAlpha);\n\n    vec4 outerGlowColor = outerGlowStrength * glowColor.rgba;\n    \n    if (knockout) {\n      float resultAlpha = outerGlowAlpha + innerGlowAlpha;\n      gl_FragColor = vec4(glowColor.rgb * resultAlpha, resultAlpha);\n    }\n    else {\n      gl_FragColor = innerColor + outerGlowColor;\n    }\n}\n",ae=function(e){function t(n){var r=Object.assign({},t.defaults,n),o=r.distance,i=r.outerStrength,l=r.innerStrength,s=r.color,a=r.knockout,u=r.quality;o=Math.round(o),e.call(this,le,se.replace(/__ANGLE_STEP_SIZE__/gi,""+(1/u/o).toFixed(7)).replace(/__DIST__/gi,o.toFixed(0)+".0")),this.uniforms.glowColor=new Float32Array([0,0,0,1]),Object.assign(this,{color:s,outerStrength:i,innerStrength:l,padding:o,knockout:a})}e&&(t.__proto__=e),t.prototype=Object.create(e&&e.prototype),t.prototype.constructor=t;var n={color:{configurable:!0},outerStrength:{configurable:!0},innerStrength:{configurable:!0},knockout:{configurable:!0}};return n.color.get=function(){return o.rgb2hex(this.uniforms.glowColor)},n.color.set=function(e){o.hex2rgb(e,this.uniforms.glowColor)},n.outerStrength.get=function(){return this.uniforms.outerStrength},n.outerStrength.set=function(e){this.uniforms.outerStrength=e},n.innerStrength.get=function(){return this.uniforms.innerStrength},n.innerStrength.set=function(e){this.uniforms.innerStrength=e},n.knockout.get=function(){return this.uniforms.knockout},n.knockout.set=function(e){this.uniforms.knockout=e},Object.defineProperties(t.prototype,n),t}(t.Filter);ae.defaults={distance:10,outerStrength:4,innerStrength:0,color:16777215,quality:.1,knockout:!1};var ue=a,ce="vec3 mod289(vec3 x)\n{\n    return x - floor(x * (1.0 / 289.0)) * 289.0;\n}\nvec4 mod289(vec4 x)\n{\n    return x - floor(x * (1.0 / 289.0)) * 289.0;\n}\nvec4 permute(vec4 x)\n{\n    return mod289(((x * 34.0) + 1.0) * x);\n}\nvec4 taylorInvSqrt(vec4 r)\n{\n    return 1.79284291400159 - 0.85373472095314 * r;\n}\nvec3 fade(vec3 t)\n{\n    return t * t * t * (t * (t * 6.0 - 15.0) + 10.0);\n}\n// Classic Perlin noise, periodic variant\nfloat pnoise(vec3 P, vec3 rep)\n{\n    vec3 Pi0 = mod(floor(P), rep); // Integer part, modulo period\n    vec3 Pi1 = mod(Pi0 + vec3(1.0), rep); // Integer part + 1, mod period\n    Pi0 = mod289(Pi0);\n    Pi1 = mod289(Pi1);\n    vec3 Pf0 = fract(P); // Fractional part for interpolation\n    vec3 Pf1 = Pf0 - vec3(1.0); // Fractional part - 1.0\n    vec4 ix = vec4(Pi0.x, Pi1.x, Pi0.x, Pi1.x);\n    vec4 iy = vec4(Pi0.yy, Pi1.yy);\n    vec4 iz0 = Pi0.zzzz;\n    vec4 iz1 = Pi1.zzzz;\n    vec4 ixy = permute(permute(ix) + iy);\n    vec4 ixy0 = permute(ixy + iz0);\n    vec4 ixy1 = permute(ixy + iz1);\n    vec4 gx0 = ixy0 * (1.0 / 7.0);\n    vec4 gy0 = fract(floor(gx0) * (1.0 / 7.0)) - 0.5;\n    gx0 = fract(gx0);\n    vec4 gz0 = vec4(0.5) - abs(gx0) - abs(gy0);\n    vec4 sz0 = step(gz0, vec4(0.0));\n    gx0 -= sz0 * (step(0.0, gx0) - 0.5);\n    gy0 -= sz0 * (step(0.0, gy0) - 0.5);\n    vec4 gx1 = ixy1 * (1.0 / 7.0);\n    vec4 gy1 = fract(floor(gx1) * (1.0 / 7.0)) - 0.5;\n    gx1 = fract(gx1);\n    vec4 gz1 = vec4(0.5) - abs(gx1) - abs(gy1);\n    vec4 sz1 = step(gz1, vec4(0.0));\n    gx1 -= sz1 * (step(0.0, gx1) - 0.5);\n    gy1 -= sz1 * (step(0.0, gy1) - 0.5);\n    vec3 g000 = vec3(gx0.x, gy0.x, gz0.x);\n    vec3 g100 = vec3(gx0.y, gy0.y, gz0.y);\n    vec3 g010 = vec3(gx0.z, gy0.z, gz0.z);\n    vec3 g110 = vec3(gx0.w, gy0.w, gz0.w);\n    vec3 g001 = vec3(gx1.x, gy1.x, gz1.x);\n    vec3 g101 = vec3(gx1.y, gy1.y, gz1.y);\n    vec3 g011 = vec3(gx1.z, gy1.z, gz1.z);\n    vec3 g111 = vec3(gx1.w, gy1.w, gz1.w);\n    vec4 norm0 = taylorInvSqrt(vec4(dot(g000, g000), dot(g010, g010), dot(g100, g100), dot(g110, g110)));\n    g000 *= norm0.x;\n    g010 *= norm0.y;\n    g100 *= norm0.z;\n    g110 *= norm0.w;\n    vec4 norm1 = taylorInvSqrt(vec4(dot(g001, g001), dot(g011, g011), dot(g101, g101), dot(g111, g111)));\n    g001 *= norm1.x;\n    g011 *= norm1.y;\n    g101 *= norm1.z;\n    g111 *= norm1.w;\n    float n000 = dot(g000, Pf0);\n    float n100 = dot(g100, vec3(Pf1.x, Pf0.yz));\n    float n010 = dot(g010, vec3(Pf0.x, Pf1.y, Pf0.z));\n    float n110 = dot(g110, vec3(Pf1.xy, Pf0.z));\n    float n001 = dot(g001, vec3(Pf0.xy, Pf1.z));\n    float n101 = dot(g101, vec3(Pf1.x, Pf0.y, Pf1.z));\n    float n011 = dot(g011, vec3(Pf0.x, Pf1.yz));\n    float n111 = dot(g111, Pf1);\n    vec3 fade_xyz = fade(Pf0);\n    vec4 n_z = mix(vec4(n000, n100, n010, n110), vec4(n001, n101, n011, n111), fade_xyz.z);\n    vec2 n_yz = mix(n_z.xy, n_z.zw, fade_xyz.y);\n    float n_xyz = mix(n_yz.x, n_yz.y, fade_xyz.x);\n    return 2.2 * n_xyz;\n}\nfloat turb(vec3 P, vec3 rep, float lacunarity, float gain)\n{\n    float sum = 0.0;\n    float sc = 1.0;\n    float totalgain = 1.0;\n    for (float i = 0.0; i < 6.0; i++)\n    {\n        sum += totalgain * pnoise(P * sc, rep);\n        sc *= lacunarity;\n        totalgain *= gain;\n    }\n    return abs(sum);\n}\n",fe="varying vec2 vTextureCoord;\nuniform sampler2D uSampler;\nuniform vec4 filterArea;\nuniform vec2 dimensions;\n\nuniform vec2 light;\nuniform bool parallel;\nuniform float aspect;\n\nuniform float gain;\nuniform float lacunarity;\nuniform float time;\n\n${perlin}\n\nvoid main(void) {\n    vec2 coord = vTextureCoord * filterArea.xy / dimensions.xy;\n\n    float d;\n\n    if (parallel) {\n        float _cos = light.x;\n        float _sin = light.y;\n        d = (_cos * coord.x) + (_sin * coord.y * aspect);\n    } else {\n        float dx = coord.x - light.x / dimensions.x;\n        float dy = (coord.y - light.y / dimensions.y) * aspect;\n        float dis = sqrt(dx * dx + dy * dy) + 0.00001;\n        d = dy / dis;\n    }\n\n    vec3 dir = vec3(d, d, 0.0);\n\n    float noise = turb(dir + vec3(time, 0.0, 62.1 + time) * 0.05, vec3(480.0, 320.0, 480.0), lacunarity, gain);\n    noise = mix(noise, 0.0, 0.3);\n    //fade vertically.\n    vec4 mist = vec4(noise, noise, noise, 1.0) * (1.0 - coord.y);\n    mist.a = 1.0;\n\n    gl_FragColor = texture2D(uSampler, vTextureCoord) + mist;\n}\n",he=function(e){function t(t){e.call(this,ue,fe.replace("${perlin}",ce)),this.uniforms.dimensions=new Float32Array(2),"number"==typeof t&&(console.warn("GodrayFilter now uses options instead of (angle, gain, lacunarity, time)"),t={angle:t},void 0!==arguments[1]&&(t.gain=arguments[1]),void 0!==arguments[2]&&(t.lacunarity=arguments[2]),void 0!==arguments[3]&&(t.time=arguments[3])),t=Object.assign({angle:30,gain:.5,lacunarity:2.5,time:0,parallel:!0,center:[0,0]},t),this._angleLight=new n.Point,this.angle=t.angle,this.gain=t.gain,this.lacunarity=t.lacunarity,this.parallel=t.parallel,this.center=t.center,this.time=t.time}e&&(t.__proto__=e),t.prototype=Object.create(e&&e.prototype),t.prototype.constructor=t;var r={angle:{configurable:!0},gain:{configurable:!0},lacunarity:{configurable:!0}};return t.prototype.apply=function(e,t,n,r){var o=t.filterFrame,i=o.width,l=o.height;this.uniforms.light=this.parallel?this._angleLight:this.center,this.uniforms.parallel=this.parallel,this.uniforms.dimensions[0]=i,this.uniforms.dimensions[1]=l,this.uniforms.aspect=l/i,this.uniforms.time=this.time,e.applyFilter(this,t,n,r)},r.angle.get=function(){return this._angle},r.angle.set=function(e){this._angle=e;var t=e*n.DEG_TO_RAD;this._angleLight.x=Math.cos(t),this._angleLight.y=Math.sin(t)},r.gain.get=function(){return this.uniforms.gain},r.gain.set=function(e){this.uniforms.gain=e},r.lacunarity.get=function(){return this.uniforms.lacunarity},r.lacunarity.set=function(e){this.uniforms.lacunarity=e},Object.defineProperties(t.prototype,r),t}(t.Filter),pe=a,de="varying vec2 vTextureCoord;\nuniform sampler2D uSampler;\nuniform vec4 filterArea;\n\nuniform vec2 uVelocity;\nuniform int uKernelSize;\nuniform float uOffset;\n\nconst int MAX_KERNEL_SIZE = 2048;\n\n// Notice:\n// the perfect way:\n//    int kernelSize = min(uKernelSize, MAX_KERNELSIZE);\n// BUT in real use-case , uKernelSize < MAX_KERNELSIZE almost always.\n// So use uKernelSize directly.\n\nvoid main(void)\n{\n    vec4 color = texture2D(uSampler, vTextureCoord);\n\n    if (uKernelSize == 0)\n    {\n        gl_FragColor = color;\n        return;\n    }\n\n    vec2 velocity = uVelocity / filterArea.xy;\n    float offset = -uOffset / length(uVelocity) - 0.5;\n    int k = uKernelSize - 1;\n\n    for(int i = 0; i < MAX_KERNEL_SIZE - 1; i++) {\n        if (i == k) {\n            break;\n        }\n        vec2 bias = velocity * (float(i) / float(k) + offset);\n        color += texture2D(uSampler, vTextureCoord + bias);\n    }\n    gl_FragColor = color / float(uKernelSize);\n}\n",me=function(e){function t(t,r,o){void 0===t&&(t=[0,0]),void 0===r&&(r=5),void 0===o&&(o=0),e.call(this,pe,de),this.uniforms.uVelocity=new Float32Array(2),this._velocity=new n.ObservablePoint(this.velocityChanged,this),this.velocity=t,this.kernelSize=r,this.offset=o}e&&(t.__proto__=e),t.prototype=Object.create(e&&e.prototype),t.prototype.constructor=t;var r={velocity:{configurable:!0},offset:{configurable:!0}};return t.prototype.apply=function(e,t,n,r){var o=this.velocity,i=o.x,l=o.y;this.uniforms.uKernelSize=0!==i||0!==l?this.kernelSize:0,e.applyFilter(this,t,n,r)},r.velocity.set=function(e){Array.isArray(e)?this._velocity.set(e[0],e[1]):(e instanceof n.Point||e instanceof n.ObservablePoint)&&this._velocity.copyFrom(e)},r.velocity.get=function(){return this._velocity},t.prototype.velocityChanged=function(){this.uniforms.uVelocity[0]=this._velocity.x,this.uniforms.uVelocity[1]=this._velocity.y},r.offset.set=function(e){this.uniforms.uOffset=e},r.offset.get=function(){return this.uniforms.uOffset},Object.defineProperties(t.prototype,r),t}(t.Filter),ge=a,ve="varying vec2 vTextureCoord;\nuniform sampler2D uSampler;\n\nuniform float epsilon;\n\nconst int MAX_COLORS = %maxColors%;\n\nuniform vec3 originalColors[MAX_COLORS];\nuniform vec3 targetColors[MAX_COLORS];\n\nvoid main(void)\n{\n    gl_FragColor = texture2D(uSampler, vTextureCoord);\n\n    float alpha = gl_FragColor.a;\n    if (alpha < 0.0001)\n    {\n      return;\n    }\n\n    vec3 color = gl_FragColor.rgb / alpha;\n\n    for(int i = 0; i < MAX_COLORS; i++)\n    {\n      vec3 origColor = originalColors[i];\n      if (origColor.r < 0.0)\n      {\n        break;\n      }\n      vec3 colorDiff = origColor - color;\n      if (length(colorDiff) < epsilon)\n      {\n        vec3 targetColor = targetColors[i];\n        gl_FragColor = vec4((targetColor + colorDiff) * alpha, alpha);\n        return;\n      }\n    }\n}\n",xe=function(e){function t(t,n,r){void 0===n&&(n=.05),void 0===r&&(r=null),r=r||t.length,e.call(this,ge,ve.replace(/%maxColors%/g,r)),this.epsilon=n,this._maxColors=r,this._replacements=null,this.uniforms.originalColors=new Float32Array(3*r),this.uniforms.targetColors=new Float32Array(3*r),this.replacements=t}e&&(t.__proto__=e),t.prototype=Object.create(e&&e.prototype),t.prototype.constructor=t;var n={replacements:{configurable:!0},maxColors:{configurable:!0},epsilon:{configurable:!0}};return n.replacements.set=function(e){var t=this.uniforms.originalColors,n=this.uniforms.targetColors,r=e.length;if(r>this._maxColors)throw"Length of replacements ("+r+") exceeds the maximum colors length ("+this._maxColors+")";t[3*r]=-1;for(var i=0;i<r;i++){var l=e[i],s=l[0];"number"==typeof s?s=o.hex2rgb(s):l[0]=o.rgb2hex(s),t[3*i]=s[0],t[3*i+1]=s[1],t[3*i+2]=s[2];var a=l[1];"number"==typeof a?a=o.hex2rgb(a):l[1]=o.rgb2hex(a),n[3*i]=a[0],n[3*i+1]=a[1],n[3*i+2]=a[2]}this._replacements=e},n.replacements.get=function(){return this._replacements},t.prototype.refresh=function(){this.replacements=this._replacements},n.maxColors.get=function(){return this._maxColors},n.epsilon.set=function(e){this.uniforms.epsilon=e},n.epsilon.get=function(){return this.uniforms.epsilon},Object.defineProperties(t.prototype,n),t}(t.Filter),ye=a,_e="varying vec2 vTextureCoord;\nuniform sampler2D uSampler;\nuniform vec4 filterArea;\nuniform vec2 dimensions;\n\nuniform float sepia;\nuniform float noise;\nuniform float noiseSize;\nuniform float scratch;\nuniform float scratchDensity;\nuniform float scratchWidth;\nuniform float vignetting;\nuniform float vignettingAlpha;\nuniform float vignettingBlur;\nuniform float seed;\n\nconst float SQRT_2 = 1.414213;\nconst vec3 SEPIA_RGB = vec3(112.0 / 255.0, 66.0 / 255.0, 20.0 / 255.0);\n\nfloat rand(vec2 co) {\n    return fract(sin(dot(co.xy, vec2(12.9898, 78.233))) * 43758.5453);\n}\n\nvec3 Overlay(vec3 src, vec3 dst)\n{\n    // if (dst <= 0.5) then: 2 * src * dst\n    // if (dst > 0.5) then: 1 - 2 * (1 - dst) * (1 - src)\n    return vec3((dst.x <= 0.5) ? (2.0 * src.x * dst.x) : (1.0 - 2.0 * (1.0 - dst.x) * (1.0 - src.x)),\n                (dst.y <= 0.5) ? (2.0 * src.y * dst.y) : (1.0 - 2.0 * (1.0 - dst.y) * (1.0 - src.y)),\n                (dst.z <= 0.5) ? (2.0 * src.z * dst.z) : (1.0 - 2.0 * (1.0 - dst.z) * (1.0 - src.z)));\n}\n\n\nvoid main()\n{\n    gl_FragColor = texture2D(uSampler, vTextureCoord);\n    vec3 color = gl_FragColor.rgb;\n\n    if (sepia > 0.0)\n    {\n        float gray = (color.x + color.y + color.z) / 3.0;\n        vec3 grayscale = vec3(gray);\n\n        color = Overlay(SEPIA_RGB, grayscale);\n\n        color = grayscale + sepia * (color - grayscale);\n    }\n\n    vec2 coord = vTextureCoord * filterArea.xy / dimensions.xy;\n\n    if (vignetting > 0.0)\n    {\n        float outter = SQRT_2 - vignetting * SQRT_2;\n        vec2 dir = vec2(vec2(0.5, 0.5) - coord);\n        dir.y *= dimensions.y / dimensions.x;\n        float darker = clamp((outter - length(dir) * SQRT_2) / ( 0.00001 + vignettingBlur * SQRT_2), 0.0, 1.0);\n        color.rgb *= darker + (1.0 - darker) * (1.0 - vignettingAlpha);\n    }\n\n    if (scratchDensity > seed && scratch != 0.0)\n    {\n        float phase = seed * 256.0;\n        float s = mod(floor(phase), 2.0);\n        float dist = 1.0 / scratchDensity;\n        float d = distance(coord, vec2(seed * dist, abs(s - seed * dist)));\n        if (d < seed * 0.6 + 0.4)\n        {\n            highp float period = scratchDensity * 10.0;\n\n            float xx = coord.x * period + phase;\n            float aa = abs(mod(xx, 0.5) * 4.0);\n            float bb = mod(floor(xx / 0.5), 2.0);\n            float yy = (1.0 - bb) * aa + bb * (2.0 - aa);\n\n            float kk = 2.0 * period;\n            float dw = scratchWidth / dimensions.x * (0.75 + seed);\n            float dh = dw * kk;\n\n            float tine = (yy - (2.0 - dh));\n\n            if (tine > 0.0) {\n                float _sign = sign(scratch);\n\n                tine = s * tine / period + scratch + 0.1;\n                tine = clamp(tine + 1.0, 0.5 + _sign * 0.5, 1.5 + _sign * 0.5);\n\n                color.rgb *= tine;\n            }\n        }\n    }\n\n    if (noise > 0.0 && noiseSize > 0.0)\n    {\n        vec2 pixelCoord = vTextureCoord.xy * filterArea.xy;\n        pixelCoord.x = floor(pixelCoord.x / noiseSize);\n        pixelCoord.y = floor(pixelCoord.y / noiseSize);\n        // vec2 d = pixelCoord * noiseSize * vec2(1024.0 + seed * 512.0, 1024.0 - seed * 512.0);\n        // float _noise = snoise(d) * 0.5;\n        float _noise = rand(pixelCoord * noiseSize * seed) - 0.5;\n        color += _noise * noise;\n    }\n\n    gl_FragColor.rgb = color;\n}\n",be=function(e){function t(t,n){void 0===n&&(n=0),e.call(this,ye,_e),this.uniforms.dimensions=new Float32Array(2),"number"==typeof t?(this.seed=t,t=null):this.seed=n,Object.assign(this,{sepia:.3,noise:.3,noiseSize:1,scratch:.5,scratchDensity:.3,scratchWidth:1,vignetting:.3,vignettingAlpha:1,vignettingBlur:.3},t)}e&&(t.__proto__=e),t.prototype=Object.create(e&&e.prototype),t.prototype.constructor=t;var n={sepia:{configurable:!0},noise:{configurable:!0},noiseSize:{configurable:!0},scratch:{configurable:!0},scratchDensity:{configurable:!0},scratchWidth:{configurable:!0},vignetting:{configurable:!0},vignettingAlpha:{configurable:!0},vignettingBlur:{configurable:!0}};return t.prototype.apply=function(e,t,n,r){this.uniforms.dimensions[0]=t.filterFrame.width,this.uniforms.dimensions[1]=t.filterFrame.height,this.uniforms.seed=this.seed,e.applyFilter(this,t,n,r)},n.sepia.set=function(e){this.uniforms.sepia=e},n.sepia.get=function(){return this.uniforms.sepia},n.noise.set=function(e){this.uniforms.noise=e},n.noise.get=function(){return this.uniforms.noise},n.noiseSize.set=function(e){this.uniforms.noiseSize=e},n.noiseSize.get=function(){return this.uniforms.noiseSize},n.scratch.set=function(e){this.uniforms.scratch=e},n.scratch.get=function(){return this.uniforms.scratch},n.scratchDensity.set=function(e){this.uniforms.scratchDensity=e},n.scratchDensity.get=function(){return this.uniforms.scratchDensity},n.scratchWidth.set=function(e){this.uniforms.scratchWidth=e},n.scratchWidth.get=function(){return this.uniforms.scratchWidth},n.vignetting.set=function(e){this.uniforms.vignetting=e},n.vignetting.get=function(){return this.uniforms.vignetting},n.vignettingAlpha.set=function(e){this.uniforms.vignettingAlpha=e},n.vignettingAlpha.get=function(){return this.uniforms.vignettingAlpha},n.vignettingBlur.set=function(e){this.uniforms.vignettingBlur=e},n.vignettingBlur.get=function(){return this.uniforms.vignettingBlur},Object.defineProperties(t.prototype,n),t}(t.Filter),Ce=a,Se="varying vec2 vTextureCoord;\nuniform sampler2D uSampler;\n\nuniform vec2 thickness;\nuniform vec4 outlineColor;\nuniform vec4 filterClamp;\n\nconst float DOUBLE_PI = 3.14159265358979323846264 * 2.;\n\nvoid main(void) {\n    vec4 ownColor = texture2D(uSampler, vTextureCoord);\n    vec4 curColor;\n    float maxAlpha = 0.;\n    vec2 displaced;\n    for (float angle = 0.; angle <= DOUBLE_PI; angle += ${angleStep}) {\n        displaced.x = vTextureCoord.x + thickness.x * cos(angle);\n        displaced.y = vTextureCoord.y + thickness.y * sin(angle);\n        curColor = texture2D(uSampler, clamp(displaced, filterClamp.xy, filterClamp.zw));\n        maxAlpha = max(maxAlpha, curColor.a);\n    }\n    float resultAlpha = max(maxAlpha, ownColor.a);\n    gl_FragColor = vec4((ownColor.rgb + outlineColor.rgb * (1. - ownColor.a)) * resultAlpha, resultAlpha);\n}\n",Fe=function(e){function t(n,r,o){void 0===n&&(n=1),void 0===r&&(r=0),void 0===o&&(o=.1);var i=Math.max(o*t.MAX_SAMPLES,t.MIN_SAMPLES),l=(2*Math.PI/i).toFixed(7);e.call(this,Ce,Se.replace(/\$\{angleStep\}/,l)),this.uniforms.thickness=new Float32Array([0,0]),this.thickness=n,this.uniforms.outlineColor=new Float32Array([0,0,0,1]),this.color=r,this.quality=o}e&&(t.__proto__=e),t.prototype=Object.create(e&&e.prototype),t.prototype.constructor=t;var n={color:{configurable:!0}};return t.prototype.apply=function(e,t,n,r){this.uniforms.thickness[0]=this.thickness/t._frame.width,this.uniforms.thickness[1]=this.thickness/t._frame.height,e.applyFilter(this,t,n,r)},n.color.get=function(){return o.rgb2hex(this.uniforms.outlineColor)},n.color.set=function(e){o.hex2rgb(e,this.uniforms.outlineColor)},Object.defineProperties(t.prototype,n),t}(t.Filter);Fe.MIN_SAMPLES=1,Fe.MAX_SAMPLES=100;var ze=a,Ae="precision mediump float;\n\nvarying vec2 vTextureCoord;\n\nuniform vec2 size;\nuniform sampler2D uSampler;\n\nuniform vec4 filterArea;\n\nvec2 mapCoord( vec2 coord )\n{\n    coord *= filterArea.xy;\n    coord += filterArea.zw;\n\n    return coord;\n}\n\nvec2 unmapCoord( vec2 coord )\n{\n    coord -= filterArea.zw;\n    coord /= filterArea.xy;\n\n    return coord;\n}\n\nvec2 pixelate(vec2 coord, vec2 size)\n{\n\treturn floor( coord / size ) * size;\n}\n\nvoid main(void)\n{\n    vec2 coord = mapCoord(vTextureCoord);\n\n    coord = pixelate(coord, size);\n\n    coord = unmapCoord(coord);\n\n    gl_FragColor = texture2D(uSampler, coord);\n}\n",we=function(e){function t(t){void 0===t&&(t=10),e.call(this,ze,Ae),this.size=t}e&&(t.__proto__=e),t.prototype=Object.create(e&&e.prototype),t.prototype.constructor=t;var n={size:{configurable:!0}};return n.size.get=function(){return this.uniforms.size},n.size.set=function(e){"number"==typeof e&&(e=[e,e]),this.uniforms.size=e},Object.defineProperties(t.prototype,n),t}(t.Filter),Te=a,Oe="varying vec2 vTextureCoord;\nuniform sampler2D uSampler;\nuniform vec4 filterArea;\n\nuniform float uRadian;\nuniform vec2 uCenter;\nuniform float uRadius;\nuniform int uKernelSize;\n\nconst int MAX_KERNEL_SIZE = 2048;\n\nvoid main(void)\n{\n    vec4 color = texture2D(uSampler, vTextureCoord);\n\n    if (uKernelSize == 0)\n    {\n        gl_FragColor = color;\n        return;\n    }\n\n    float aspect = filterArea.y / filterArea.x;\n    vec2 center = uCenter.xy / filterArea.xy;\n    float gradient = uRadius / filterArea.x * 0.3;\n    float radius = uRadius / filterArea.x - gradient * 0.5;\n    int k = uKernelSize - 1;\n\n    vec2 coord = vTextureCoord;\n    vec2 dir = vec2(center - coord);\n    float dist = length(vec2(dir.x, dir.y * aspect));\n\n    float radianStep = uRadian;\n    if (radius >= 0.0 && dist > radius) {\n        float delta = dist - radius;\n        float gap = gradient;\n        float scale = 1.0 - abs(delta / gap);\n        if (scale <= 0.0) {\n            gl_FragColor = color;\n            return;\n        }\n        radianStep *= scale;\n    }\n    radianStep /= float(k);\n\n    float s = sin(radianStep);\n    float c = cos(radianStep);\n    mat2 rotationMatrix = mat2(vec2(c, -s), vec2(s, c));\n\n    for(int i = 0; i < MAX_KERNEL_SIZE - 1; i++) {\n        if (i == k) {\n            break;\n        }\n\n        coord -= center;\n        coord.y *= aspect;\n        coord = rotationMatrix * coord;\n        coord.y /= aspect;\n        coord += center;\n\n        vec4 sample = texture2D(uSampler, coord);\n\n        // switch to pre-multiplied alpha to correctly blur transparent images\n        // sample.rgb *= sample.a;\n\n        color += sample;\n    }\n\n    gl_FragColor = color / float(uKernelSize);\n}\n",De=function(e){function t(t,n,r,o){void 0===t&&(t=0),void 0===n&&(n=[0,0]),void 0===r&&(r=5),void 0===o&&(o=-1),e.call(this,Te,Oe),this._angle=0,this.angle=t,this.center=n,this.kernelSize=r,this.radius=o}e&&(t.__proto__=e),t.prototype=Object.create(e&&e.prototype),t.prototype.constructor=t;var n={angle:{configurable:!0},center:{configurable:!0},radius:{configurable:!0}};return t.prototype.apply=function(e,t,n,r){this.uniforms.uKernelSize=0!==this._angle?this.kernelSize:0,e.applyFilter(this,t,n,r)},n.angle.set=function(e){this._angle=e,this.uniforms.uRadian=e*Math.PI/180},n.angle.get=function(){return this._angle},n.center.get=function(){return this.uniforms.uCenter},n.center.set=function(e){this.uniforms.uCenter=e},n.radius.get=function(){return this.uniforms.uRadius},n.radius.set=function(e){(e<0||e===1/0)&&(e=-1),this.uniforms.uRadius=e},Object.defineProperties(t.prototype,n),t}(t.Filter),Pe=a,Me="varying vec2 vTextureCoord;\nuniform sampler2D uSampler;\n\nuniform vec4 filterArea;\nuniform vec4 filterClamp;\nuniform vec2 dimensions;\n\nuniform bool mirror;\nuniform float boundary;\nuniform vec2 amplitude;\nuniform vec2 waveLength;\nuniform vec2 alpha;\nuniform float time;\n\nfloat rand(vec2 co) {\n    return fract(sin(dot(co.xy, vec2(12.9898, 78.233))) * 43758.5453);\n}\n\nvoid main(void)\n{\n    vec2 pixelCoord = vTextureCoord.xy * filterArea.xy;\n    vec2 coord = pixelCoord / dimensions;\n\n    if (coord.y < boundary) {\n        gl_FragColor = texture2D(uSampler, vTextureCoord);\n        return;\n    }\n\n    float k = (coord.y - boundary) / (1. - boundary + 0.0001);\n    float areaY = boundary * dimensions.y / filterArea.y;\n    float v = areaY + areaY - vTextureCoord.y;\n    float y = mirror ? v : vTextureCoord.y;\n\n    float _amplitude = ((amplitude.y - amplitude.x) * k + amplitude.x ) / filterArea.x;\n    float _waveLength = ((waveLength.y - waveLength.x) * k + waveLength.x) / filterArea.y;\n    float _alpha = (alpha.y - alpha.x) * k + alpha.x;\n\n    float x = vTextureCoord.x + cos(v * 6.28 / _waveLength - time) * _amplitude;\n    x = clamp(x, filterClamp.x, filterClamp.z);\n\n    vec4 color = texture2D(uSampler, vec2(x, y));\n\n    gl_FragColor = color * _alpha;\n}\n",Re=function(e){function t(t){e.call(this,Pe,Me),this.uniforms.amplitude=new Float32Array(2),this.uniforms.waveLength=new Float32Array(2),this.uniforms.alpha=new Float32Array(2),this.uniforms.dimensions=new Float32Array(2),Object.assign(this,{mirror:!0,boundary:.5,amplitude:[0,20],waveLength:[30,100],alpha:[1,1],time:0},t)}e&&(t.__proto__=e),t.prototype=Object.create(e&&e.prototype),t.prototype.constructor=t;var n={mirror:{configurable:!0},boundary:{configurable:!0},amplitude:{configurable:!0},waveLength:{configurable:!0},alpha:{configurable:!0}};return t.prototype.apply=function(e,t,n,r){this.uniforms.dimensions[0]=t.filterFrame.width,this.uniforms.dimensions[1]=t.filterFrame.height,this.uniforms.time=this.time,e.applyFilter(this,t,n,r)},n.mirror.set=function(e){this.uniforms.mirror=e},n.mirror.get=function(){return this.uniforms.mirror},n.boundary.set=function(e){this.uniforms.boundary=e},n.boundary.get=function(){return this.uniforms.boundary},n.amplitude.set=function(e){this.uniforms.amplitude[0]=e[0],this.uniforms.amplitude[1]=e[1]},n.amplitude.get=function(){return this.uniforms.amplitude},n.waveLength.set=function(e){this.uniforms.waveLength[0]=e[0],this.uniforms.waveLength[1]=e[1]},n.waveLength.get=function(){return this.uniforms.waveLength},n.alpha.set=function(e){this.uniforms.alpha[0]=e[0],this.uniforms.alpha[1]=e[1]},n.alpha.get=function(){return this.uniforms.alpha},Object.defineProperties(t.prototype,n),t}(t.Filter),ke=a,je="precision mediump float;\n\nvarying vec2 vTextureCoord;\n\nuniform sampler2D uSampler;\nuniform vec4 filterArea;\nuniform vec2 red;\nuniform vec2 green;\nuniform vec2 blue;\n\nvoid main(void)\n{\n   gl_FragColor.r = texture2D(uSampler, vTextureCoord + red/filterArea.xy).r;\n   gl_FragColor.g = texture2D(uSampler, vTextureCoord + green/filterArea.xy).g;\n   gl_FragColor.b = texture2D(uSampler, vTextureCoord + blue/filterArea.xy).b;\n   gl_FragColor.a = texture2D(uSampler, vTextureCoord).a;\n}\n",Ee=function(e){function t(t,n,r){void 0===t&&(t=[-10,0]),void 0===n&&(n=[0,10]),void 0===r&&(r=[0,0]),e.call(this,ke,je),this.red=t,this.green=n,this.blue=r}e&&(t.__proto__=e),t.prototype=Object.create(e&&e.prototype),t.prototype.constructor=t;var n={red:{configurable:!0},green:{configurable:!0},blue:{configurable:!0}};return n.red.get=function(){return this.uniforms.red},n.red.set=function(e){this.uniforms.red=e},n.green.get=function(){return this.uniforms.green},n.green.set=function(e){this.uniforms.green=e},n.blue.get=function(){return this.uniforms.blue},n.blue.set=function(e){this.uniforms.blue=e},Object.defineProperties(t.prototype,n),t}(t.Filter),Le=a,Ie="varying vec2 vTextureCoord;\nuniform sampler2D uSampler;\nuniform vec4 filterArea;\nuniform vec4 filterClamp;\n\nuniform vec2 center;\n\nuniform float amplitude;\nuniform float wavelength;\n// uniform float power;\nuniform float brightness;\nuniform float speed;\nuniform float radius;\n\nuniform float time;\n\nconst float PI = 3.14159;\n\nvoid main()\n{\n    float halfWavelength = wavelength * 0.5 / filterArea.x;\n    float maxRadius = radius / filterArea.x;\n    float currentRadius = time * speed / filterArea.x;\n\n    float fade = 1.0;\n\n    if (maxRadius > 0.0) {\n        if (currentRadius > maxRadius) {\n            gl_FragColor = texture2D(uSampler, vTextureCoord);\n            return;\n        }\n        fade = 1.0 - pow(currentRadius / maxRadius, 2.0);\n    }\n\n    vec2 dir = vec2(vTextureCoord - center / filterArea.xy);\n    dir.y *= filterArea.y / filterArea.x;\n    float dist = length(dir);\n\n    if (dist <= 0.0 || dist < currentRadius - halfWavelength || dist > currentRadius + halfWavelength) {\n        gl_FragColor = texture2D(uSampler, vTextureCoord);\n        return;\n    }\n\n    vec2 diffUV = normalize(dir);\n\n    float diff = (dist - currentRadius) / halfWavelength;\n\n    float p = 1.0 - pow(abs(diff), 2.0);\n\n    // float powDiff = diff * pow(p, 2.0) * ( amplitude * fade );\n    float powDiff = 1.25 * sin(diff * PI) * p * ( amplitude * fade );\n\n    vec2 offset = diffUV * powDiff / filterArea.xy;\n\n    // Do clamp :\n    vec2 coord = vTextureCoord + offset;\n    vec2 clampedCoord = clamp(coord, filterClamp.xy, filterClamp.zw);\n    vec4 color = texture2D(uSampler, clampedCoord);\n    if (coord != clampedCoord) {\n        color *= max(0.0, 1.0 - length(coord - clampedCoord));\n    }\n\n    // No clamp :\n    // gl_FragColor = texture2D(uSampler, vTextureCoord + offset);\n\n    color.rgb *= 1.0 + (brightness - 1.0) * p * fade;\n\n    gl_FragColor = color;\n}\n",Xe=function(e){function t(t,n,r){void 0===t&&(t=[0,0]),void 0===n&&(n={}),void 0===r&&(r=0),e.call(this,Le,Ie),this.center=t,Array.isArray(n)&&(console.warn("Deprecated Warning: ShockwaveFilter params Array has been changed to options Object."),n={}),n=Object.assign({amplitude:30,wavelength:160,brightness:1,speed:500,radius:-1},n),this.amplitude=n.amplitude,this.wavelength=n.wavelength,this.brightness=n.brightness,this.speed=n.speed,this.radius=n.radius,this.time=r}e&&(t.__proto__=e),t.prototype=Object.create(e&&e.prototype),t.prototype.constructor=t;var n={center:{configurable:!0},amplitude:{configurable:!0},wavelength:{configurable:!0},brightness:{configurable:!0},speed:{configurable:!0},radius:{configurable:!0}};return t.prototype.apply=function(e,t,n,r){this.uniforms.time=this.time,e.applyFilter(this,t,n,r)},n.center.get=function(){return this.uniforms.center},n.center.set=function(e){this.uniforms.center=e},n.amplitude.get=function(){return this.uniforms.amplitude},n.amplitude.set=function(e){this.uniforms.amplitude=e},n.wavelength.get=function(){return this.uniforms.wavelength},n.wavelength.set=function(e){this.uniforms.wavelength=e},n.brightness.get=function(){return this.uniforms.brightness},n.brightness.set=function(e){this.uniforms.brightness=e},n.speed.get=function(){return this.uniforms.speed},n.speed.set=function(e){this.uniforms.speed=e},n.radius.get=function(){return this.uniforms.radius},n.radius.set=function(e){this.uniforms.radius=e},Object.defineProperties(t.prototype,n),t}(t.Filter),Be=a,Ne="varying vec2 vTextureCoord;\nuniform sampler2D uSampler;\nuniform sampler2D uLightmap;\nuniform vec4 filterArea;\nuniform vec2 dimensions;\nuniform vec4 ambientColor;\nvoid main() {\n    vec4 diffuseColor = texture2D(uSampler, vTextureCoord);\n    vec2 lightCoord = (vTextureCoord * filterArea.xy) / dimensions;\n    vec4 light = texture2D(uLightmap, lightCoord);\n    vec3 ambient = ambientColor.rgb * ambientColor.a;\n    vec3 intensity = ambient + light.rgb;\n    vec3 finalColor = diffuseColor.rgb * intensity;\n    gl_FragColor = vec4(finalColor, diffuseColor.a);\n}\n",Ge=function(e){function t(t,n,r){void 0===n&&(n=0),void 0===r&&(r=1),e.call(this,Be,Ne),this.uniforms.dimensions=new Float32Array(2),this.uniforms.ambientColor=new Float32Array([0,0,0,r]),this.texture=t,this.color=n}e&&(t.__proto__=e),t.prototype=Object.create(e&&e.prototype),t.prototype.constructor=t;var n={texture:{configurable:!0},color:{configurable:!0},alpha:{configurable:!0}};return t.prototype.apply=function(e,t,n,r){this.uniforms.dimensions[0]=t.filterFrame.width,this.uniforms.dimensions[1]=t.filterFrame.height,e.applyFilter(this,t,n,r)},n.texture.get=function(){return this.uniforms.uLightmap},n.texture.set=function(e){this.uniforms.uLightmap=e},n.color.set=function(e){var t=this.uniforms.ambientColor;"number"==typeof e?(o.hex2rgb(e,t),this._color=e):(t[0]=e[0],t[1]=e[1],t[2]=e[2],t[3]=e[3],this._color=o.rgb2hex(t))},n.color.get=function(){return this._color},n.alpha.get=function(){return this.uniforms.ambientColor[3]},n.alpha.set=function(e){this.uniforms.ambientColor[3]=e},Object.defineProperties(t.prototype,n),t}(t.Filter),qe=a,We="varying vec2 vTextureCoord;\n\nuniform sampler2D uSampler;\nuniform float blur;\nuniform float gradientBlur;\nuniform vec2 start;\nuniform vec2 end;\nuniform vec2 delta;\nuniform vec2 texSize;\n\nfloat random(vec3 scale, float seed)\n{\n    return fract(sin(dot(gl_FragCoord.xyz + seed, scale)) * 43758.5453 + seed);\n}\n\nvoid main(void)\n{\n    vec4 color = vec4(0.0);\n    float total = 0.0;\n\n    float offset = random(vec3(12.9898, 78.233, 151.7182), 0.0);\n    vec2 normal = normalize(vec2(start.y - end.y, end.x - start.x));\n    float radius = smoothstep(0.0, 1.0, abs(dot(vTextureCoord * texSize - start, normal)) / gradientBlur) * blur;\n\n    for (float t = -30.0; t <= 30.0; t++)\n    {\n        float percent = (t + offset - 0.5) / 30.0;\n        float weight = 1.0 - abs(percent);\n        vec4 sample = texture2D(uSampler, vTextureCoord + delta / texSize * percent * radius);\n        sample.rgb *= sample.a;\n        color += sample * weight;\n        total += weight;\n    }\n\n    color /= total;\n    color.rgb /= color.a + 0.00001;\n\n    gl_FragColor = color;\n}\n",Ke=function(e){function t(t,r,o,i){void 0===t&&(t=100),void 0===r&&(r=600),void 0===o&&(o=null),void 0===i&&(i=null),e.call(this,qe,We),this.uniforms.blur=t,this.uniforms.gradientBlur=r,this.uniforms.start=o||new n.Point(0,window.innerHeight/2),this.uniforms.end=i||new n.Point(600,window.innerHeight/2),this.uniforms.delta=new n.Point(30,30),this.uniforms.texSize=new n.Point(window.innerWidth,window.innerHeight),this.updateDelta()}e&&(t.__proto__=e),t.prototype=Object.create(e&&e.prototype),t.prototype.constructor=t;var r={blur:{configurable:!0},gradientBlur:{configurable:!0},start:{configurable:!0},end:{configurable:!0}};return t.prototype.updateDelta=function(){this.uniforms.delta.x=0,this.uniforms.delta.y=0},r.blur.get=function(){return this.uniforms.blur},r.blur.set=function(e){this.uniforms.blur=e},r.gradientBlur.get=function(){return this.uniforms.gradientBlur},r.gradientBlur.set=function(e){this.uniforms.gradientBlur=e},r.start.get=function(){return this.uniforms.start},r.start.set=function(e){this.uniforms.start=e,this.updateDelta()},r.end.get=function(){return this.uniforms.end},r.end.set=function(e){this.uniforms.end=e,this.updateDelta()},Object.defineProperties(t.prototype,r),t}(t.Filter),Ye=function(e){function t(){e.apply(this,arguments)}return e&&(t.__proto__=e),t.prototype=Object.create(e&&e.prototype),t.prototype.constructor=t,t.prototype.updateDelta=function(){var e=this.uniforms.end.x-this.uniforms.start.x,t=this.uniforms.end.y-this.uniforms.start.y,n=Math.sqrt(e*e+t*t);this.uniforms.delta.x=e/n,this.uniforms.delta.y=t/n},t}(Ke),Ze=function(e){function t(){e.apply(this,arguments)}return e&&(t.__proto__=e),t.prototype=Object.create(e&&e.prototype),t.prototype.constructor=t,t.prototype.updateDelta=function(){var e=this.uniforms.end.x-this.uniforms.start.x,t=this.uniforms.end.y-this.uniforms.start.y,n=Math.sqrt(e*e+t*t);this.uniforms.delta.x=-t/n,this.uniforms.delta.y=e/n},t}(Ke),Qe=function(e){function t(t,n,r,o){void 0===t&&(t=100),void 0===n&&(n=600),void 0===r&&(r=null),void 0===o&&(o=null),e.call(this),this.tiltShiftXFilter=new Ye(t,n,r,o),this.tiltShiftYFilter=new Ze(t,n,r,o)}e&&(t.__proto__=e),t.prototype=Object.create(e&&e.prototype),t.prototype.constructor=t;var n={blur:{configurable:!0},gradientBlur:{configurable:!0},start:{configurable:!0},end:{configurable:!0}};return t.prototype.apply=function(e,t,n){var r=e.getFilterTexture();this.tiltShiftXFilter.apply(e,t,r),this.tiltShiftYFilter.apply(e,r,n),e.returnFilterTexture(r)},n.blur.get=function(){return this.tiltShiftXFilter.blur},n.blur.set=function(e){this.tiltShiftXFilter.blur=this.tiltShiftYFilter.blur=e},n.gradientBlur.get=function(){return this.tiltShiftXFilter.gradientBlur},n.gradientBlur.set=function(e){this.tiltShiftXFilter.gradientBlur=this.tiltShiftYFilter.gradientBlur=e},n.start.get=function(){return this.tiltShiftXFilter.start},n.start.set=function(e){this.tiltShiftXFilter.start=this.tiltShiftYFilter.start=e},n.end.get=function(){return this.tiltShiftXFilter.end},n.end.set=function(e){this.tiltShiftXFilter.end=this.tiltShiftYFilter.end=e},Object.defineProperties(t.prototype,n),t}(t.Filter),Ue=a,Ve="varying vec2 vTextureCoord;\n\nuniform sampler2D uSampler;\nuniform float radius;\nuniform float angle;\nuniform vec2 offset;\nuniform vec4 filterArea;\n\nvec2 mapCoord( vec2 coord )\n{\n    coord *= filterArea.xy;\n    coord += filterArea.zw;\n\n    return coord;\n}\n\nvec2 unmapCoord( vec2 coord )\n{\n    coord -= filterArea.zw;\n    coord /= filterArea.xy;\n\n    return coord;\n}\n\nvec2 twist(vec2 coord)\n{\n    coord -= offset;\n\n    float dist = length(coord);\n\n    if (dist < radius)\n    {\n        float ratioDist = (radius - dist) / radius;\n        float angleMod = ratioDist * ratioDist * angle;\n        float s = sin(angleMod);\n        float c = cos(angleMod);\n        coord = vec2(coord.x * c - coord.y * s, coord.x * s + coord.y * c);\n    }\n\n    coord += offset;\n\n    return coord;\n}\n\nvoid main(void)\n{\n\n    vec2 coord = mapCoord(vTextureCoord);\n\n    coord = twist(coord);\n\n    coord = unmapCoord(coord);\n\n    gl_FragColor = texture2D(uSampler, coord );\n\n}\n",He=function(e){function t(t,n,r){void 0===t&&(t=200),void 0===n&&(n=4),void 0===r&&(r=20),e.call(this,Ue,Ve),this.radius=t,this.angle=n,this.padding=r}e&&(t.__proto__=e),t.prototype=Object.create(e&&e.prototype),t.prototype.constructor=t;var n={offset:{configurable:!0},radius:{configurable:!0},angle:{configurable:!0}};return n.offset.get=function(){return this.uniforms.offset},n.offset.set=function(e){this.uniforms.offset=e},n.radius.get=function(){return this.uniforms.radius},n.radius.set=function(e){this.uniforms.radius=e},n.angle.get=function(){return this.uniforms.angle},n.angle.set=function(e){this.uniforms.angle=e},Object.defineProperties(t.prototype,n),t}(t.Filter),$e=a,Je="varying vec2 vTextureCoord;\nuniform sampler2D uSampler;\nuniform vec4 filterArea;\n\nuniform vec2 uCenter;\nuniform float uStrength;\nuniform float uInnerRadius;\nuniform float uRadius;\n\nconst float MAX_KERNEL_SIZE = 32.0;\n\n// author: http://byteblacksmith.com/improvements-to-the-canonical-one-liner-glsl-rand-for-opengl-es-2-0/\nhighp float rand(vec2 co, float seed) {\n    const highp float a = 12.9898, b = 78.233, c = 43758.5453;\n    highp float dt = dot(co + seed, vec2(a, b)), sn = mod(dt, 3.14159);\n    return fract(sin(sn) * c + seed);\n}\n\nvoid main() {\n\n    float minGradient = uInnerRadius * 0.3;\n    float innerRadius = (uInnerRadius + minGradient * 0.5) / filterArea.x;\n\n    float gradient = uRadius * 0.3;\n    float radius = (uRadius - gradient * 0.5) / filterArea.x;\n\n    float countLimit = MAX_KERNEL_SIZE;\n\n    vec2 dir = vec2(uCenter.xy / filterArea.xy - vTextureCoord);\n    float dist = length(vec2(dir.x, dir.y * filterArea.y / filterArea.x));\n\n    float strength = uStrength;\n\n    float delta = 0.0;\n    float gap;\n    if (dist < innerRadius) {\n        delta = innerRadius - dist;\n        gap = minGradient;\n    } else if (radius >= 0.0 && dist > radius) { // radius < 0 means it's infinity\n        delta = dist - radius;\n        gap = gradient;\n    }\n\n    if (delta > 0.0) {\n        float normalCount = gap / filterArea.x;\n        delta = (normalCount - delta) / normalCount;\n        countLimit *= delta;\n        strength *= delta;\n        if (countLimit < 1.0)\n        {\n            gl_FragColor = texture2D(uSampler, vTextureCoord);\n            return;\n        }\n    }\n\n    // randomize the lookup values to hide the fixed number of samples\n    float offset = rand(vTextureCoord, 0.0);\n\n    float total = 0.0;\n    vec4 color = vec4(0.0);\n\n    dir *= strength;\n\n    for (float t = 0.0; t < MAX_KERNEL_SIZE; t++) {\n        float percent = (t + offset) / MAX_KERNEL_SIZE;\n        float weight = 4.0 * (percent - percent * percent);\n        vec2 p = vTextureCoord + dir * percent;\n        vec4 sample = texture2D(uSampler, p);\n\n        // switch to pre-multiplied alpha to correctly blur transparent images\n        // sample.rgb *= sample.a;\n\n        color += sample * weight;\n        total += weight;\n\n        if (t > countLimit){\n            break;\n        }\n    }\n\n    color /= total;\n    // switch back from pre-multiplied alpha\n    // color.rgb /= color.a + 0.00001;\n\n    gl_FragColor = color;\n}\n",et=function(e){function t(t){if(e.call(this,$e,Je),"object"!=typeof t){var n=arguments[0],r=arguments[1],o=arguments[2],i=arguments[3];t={},void 0!==n&&(t.strength=n),void 0!==r&&(t.center=r),void 0!==o&&(t.innerRadius=o),void 0!==i&&(t.radius=i)}Object.assign(this,{strength:.1,center:[0,0],innerRadius:0,radius:-1},t)}e&&(t.__proto__=e),t.prototype=Object.create(e&&e.prototype),t.prototype.constructor=t;var n={center:{configurable:!0},strength:{configurable:!0},innerRadius:{configurable:!0},radius:{configurable:!0}};return n.center.get=function(){return this.uniforms.uCenter},n.center.set=function(e){this.uniforms.uCenter=e},n.strength.get=function(){return this.uniforms.uStrength},n.strength.set=function(e){this.uniforms.uStrength=e},n.innerRadius.get=function(){return this.uniforms.uInnerRadius},n.innerRadius.set=function(e){this.uniforms.uInnerRadius=e},n.radius.get=function(){return this.uniforms.uRadius},n.radius.set=function(e){(e<0||e===1/0)&&(e=-1),this.uniforms.uRadius=e},Object.defineProperties(t.prototype,n),t}(t.Filter);return e.AdjustmentFilter=c,e.AdvancedBloomFilter=y,e.AsciiFilter=C,e.BevelFilter=z,e.BloomFilter=A,e.BulgePinchFilter=O,e.CRTFilter=Z,e.ColorMapFilter=M,e.ColorOverlayFilter=j,e.ColorReplaceFilter=I,e.ConvolutionFilter=N,e.CrossHatchFilter=W,e.DotFilter=V,e.DropShadowFilter=J,e.EmbossFilter=ne,e.GlitchFilter=ie,e.GlowFilter=ae,e.GodrayFilter=he,e.KawaseBlurFilter=d,e.MotionBlurFilter=me,e.MultiColorReplaceFilter=xe,e.OldFilmFilter=be,e.OutlineFilter=Fe,e.PixelateFilter=we,e.RGBSplitFilter=Ee,e.RadialBlurFilter=De,e.ReflectionFilter=Re,e.ShockwaveFilter=Xe,e.SimpleLightmapFilter=Ge,e.TiltShiftAxisFilter=Ke,e.TiltShiftFilter=Qe,e.TiltShiftXFilter=Ye,e.TiltShiftYFilter=Ze,e.TwistFilter=He,e.ZoomBlurFilter=et,e}({},PIXI,PIXI,PIXI,PIXI.utils,PIXI,PIXI.filters,PIXI.filters);Object.assign(PIXI.filters,__filters);
//# sourceMappingURL=pixi-filters.js.map