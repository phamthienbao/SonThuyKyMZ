# Battle UI (KB_SideViewBattleUI v3.0)

## Overview

**KB_SideViewBattleUI v3.1** is an audit-fix release of the custom sideview battle UI. Replaces **VisuMZ_3_SideviewBattleUI** with a sprite-based HUD system featuring diamond-shaped actor portraits, parchment-styled command windows, and integrated Bóng Tối gauge support. **v3.1 fixes correctness issues found by self-audit: cursor visibility, selection layer, animation architecture, and asset loading.**

- **File:** `js/plugins/KB_SideViewBattleUI.js`
- **Dependencies:** KB_CoreEngine, VisuMZ_1_BattleCore (load after BattleCore)
- **Optional:** KB_BongToiGauge (for inline BT gauge on Hải)
- **Status:** v3.1, active
- **Design canvas:** 1280×720 (ResolutionWidth/ResolutionHeight params). All positions scale via `sx()` / `sy()` helpers to adapt to actual Graphics.boxWidth/Height.
- **Changes from v3.0:** Correct `refreshCursor()` method + `setCursorRect` hide; selection band on `contentsBack`; command slide animates `window.x` with cubic-out easing; frame scale cached; bitmap dirty-flag refactor; silent overlay loader; HUD X recentered to 392; default values refined.

## Resolution & Scaling

The plugin is **designed for 1280×720** but adapts to any resolution via proportional scaling:

- **ResolutionWidth:** 1280 (default) — the design canvas width
- **ResolutionHeight:** 720 (default) — the design canvas height
- **Scaling helpers:**
  - `sx(x)` — scales x-coordinate: `x * (Graphics.boxWidth / 1280)`
  - `sy(y)` — scales y-coordinate: `y * (Graphics.boxHeight / 720)`
- **All positions** (HUD, cards, windows, actors) pass through sx/sy, so layouts remain proportional on 1024×768, 1600×900, fullscreen, etc.

Example: If Graphics.boxWidth = 1024 and HUD X is configured as 430:
- Actual HUD X = sx(430) = 430 × (1024 / 1280) ≈ 344px

## Architecture

### Core Classes

| Class | Purpose |
|-------|---------|
| **KB_ActorCard** | One card per battle member: diamond portrait + face + actor name + HP/MP text + active-actor glow (pulse scale + glow alpha). Re-renders text when HP/MP change. Attaches optional BT gauge as child sprite. Low HP state tints portrait red. |
| **KB_BattleHUD** | Container (positioned at HUD X/Y via sx/sy); spawns one KB_ActorCard per party member, spaced by HUD Spacing. Gentle Y-bobbing via sine wave on Graphics.frameCount. Refreshes on `BattleManager.startBattle()`. |
| **KB_BattleDecorationLayer** | Loads decorative PNG images from Overlay Folder, positioned per image-entry config (filename, x, y, opacity). Cached with graceful missing-file fallback. |
| **KB_WindowActorCommand** | Extends Window_ActorCommand; parchment background (painted via `paint()`); parchment border; gold-outlined selection band; default cursor sprite hidden. Slide+fade entrance animation on open. |
| **KB_WindowPartyCommand** | Same style as KB_WindowActorCommand; Fight/Escape commands. |
| **KB_WindowDescription** | Extends Window_Help; parchment background; uppercase "DESCRIPTION" header in gold-beige; body text white. Soft fade on text changes (setText resets _fadeTarget). |

### Layout Diagram

```
┌──────────────────────────────────────────────────────┐
│                                                       │
│     ┌──────┐  ┌──────┐  ┌──────┐                    │
│     │Card1 │  │Card2 │  │Card3 │                    │
│     │ HUD  │  │ HUD  │  │ HUD  │                    │
│     └──────┘  └──────┘  └──────┘                    │
│     ↑ HUD X/Y: 392/615 (v3.1 re-centered); spacing: 120 │
│                                         ┌──────────┐ │
│                                         │ Command  │ │
│                                         │ Window   │ │
│                                         │(X930 Y565)│ │
│                                         └──────────┘ │
│  ┌────────────────────────┐                          │
│  │ Description Window     │                          │
│  │(X0 Y590, 420×130)      │                          │
│  └────────────────────────┘                          │
└──────────────────────────────────────────────────────┘
```

## Actor Positioning

**Three formation presets via "Actor Formation Preset" param:**

### Classic
- Uses original `Sprite_Actor.setActorHome()` from RPG Maker MZ defaults.
- Slanted vertical right-side stack at the original home positions.

### Vertical
- Stacks all actors vertically at x = sx(900) with y stepping by 90px per actor.
- Actor 1: (900, 280)
- Actor 2: (900, 370)
- Actor 3: (900, 460)
- Actor 4: (900, 550)

### ReferenceLayout (default)
- Per-actor coordinates via Actor1 X/Y, Actor2 X/Y, Actor3 X/Y, Actor4 X/Y params.
- **Default coords (1280×720 design canvas):**
  - Actor 1: (900, 320)
  - Actor 2: (960, 390)
  - Actor 3: (1010, 470)
  - Actor 4: (1060, 540)
- Each position is scaled via sx/sy before being applied to Sprite_Actor.

## HUD Layout

- **Container position:** (sx(HUD X), sy(HUD Y)) — default: (392, 615) [v3.1 re-centered]
- **Card dimensions:** 135×90 (configurable Card Width / Card Height)
- **Portrait size:** 64px diamond (configurable via Portrait Size param)
- **Spacing:** 120px between card centers (configurable HUD Spacing)
- **Hover motion:** Vertical bobbing via sine wave. Amplitude = HUD Hover Amplitude (default 1.5px). Formula: `y_offset = Math.sin(Graphics.frameCount * 0.025 * ANIM_SPEED) * amplitude`

**Scaled geometry example** (assuming 1280×720 actual resolution):
- HUD container: (392, 615)
- Card 1: (392, 615) relative to container
- Card 2: (392 + 120, 615) = (512, 615)
- Card 3: (392 + 240, 615) = (632, 615)

## Card Anatomy

Each KB_ActorCard contains (z-order back to front):

1. **Active glow:** Radial gradient sprite (golden, HUD.cardW+40 × HUD.cardH+40). Opacity 0 (inactive) or 140–230 (active, pulsing). Inset by 20px (centered behind card).
2. **Drop shadow:** Radial gradient sprite under the card (soft edges), opacity 140.
3. **Diamond portrait:** 64px canvas, clipped into diamond shape. Renders actor's face image (ImageManager.loadFace) scaled to fit. If no frame asset, draws programmatic diamond outline (border color, linewidth 2).
4. **Frame overlay:** If Diamond Frame Asset param is set and file exists, loads img/system/battleui/<asset>.png and scales to 64+8=72px. Positioned centered over portrait.
5. **Low HP tint:** Red overlay (rgba(220,50,50,0.35)) clipped into diamond shape. Opacity tweens toward 200 when hp/mhp ≤ 0.25 (12% lerp per frame), toward 0 otherwise.
6. **Text layer:** HP/MP stats positioned right of portrait, rendered with dark brown color (#2A1A0A) and black outline (width 3). Font size = HUD Stat Font Size (default 16px). Layout:
   - Line 1: `HP <value>` in white (HP Color, default #FFFFFF)
   - Line 2: `MP <value>` in light blue (MP Color, default #A0D8F0)

**Active-actor animation (BattleManager.actor === this._actor):**
- Pulse phase advances 0.06 × ANIM_SPEED per frame (wave function: 0.5 + 0.5 × sin(phase))
- Glow opacity: 140 + wave × 90 (range 140–230)
- Portrait scale: 1 + wave × 0.05 (range 1.0–1.05)
- Portrait opacity: 255

**Inactive-actor animation:**
- Glow opacity: decays −10 per frame (fades out)
- Portrait scale: lerps back to 1.0 (−0.015 per frame)
- Portrait opacity: 240 (slightly dimmed)

## Command Windows

### KB_WindowActorCommand (Attack, Skill, Guard, Item, Cancel)

**Position & size:**
- X = sx(930), Y = sy(565), Width = sx(170), Height = sy(130) (all configurable)
- Item height = 24px (configurable Command Item Height)
- Fits ~5–6 commands without scrolling

**Painting pipeline:**
1. Clear both `contents` and `contentsBack` to prevent trails
2. Paint parchment background (Panel Color, Panel Opacity)
3. Draw soft shadow halo inside: radial gradient (Panel Shadow Color rgba(0,0,0,0.35), inner radius ~20px, outer radius ~60px)
4. Draw border (Panel Border Color, linewidth 2)
5. For each command:
   - If selected: paint tan background band on `contentsBack` (Selection Color rgba(212,180,100,0.9))
   - Draw text centered, white if selected (Selection Text Color #FFFFFF), dark brown if not (Body Text Color #2A1A0A)
   - If selected: add gold text outline (rgba(255,200,120,0.85), linewidth 3) for "subtle gold highlight" glow

**Entrance animation (on `open()`):**
- Slide + fade over "Command Slide Frames" frames (default 15, adjusted by ANIM_SPEED)
- `this.x` animates horizontally from `−Command Slide Distance` toward final X position (cubic-out easing)
- `ContentsOpacity` tweens 0 → 255 (linear fade-in)
- Creates smooth slide-in from left with opacity fade-in. New "Command Slide Distance" param (default 32 px) configures the slide distance.

**Cursor hidden:** `refreshCursor()` override calls `setCursorRect(0, 0, 0, 0)` to hide the default cursor sprite; selection band is the only highlight.

### KB_WindowPartyCommand (Fight, Escape)
- Same painting pipeline as KB_WindowActorCommand
- Position: X = sx(930), Y = sy(565)
- Sized to fit 2 commands

## Description Window

**Position & size:**
- X = sx(0), Y = sy(590), Width = sx(420), Height = sy(130) (all configurable)

**Rendering:**
- **Header:** "DESCRIPTION" text (uppercase) in gold-beige (Header Color param, default #D4B57A), rendered at top-left. Font size = Header Font Size (default 16px).
- **Background:** 
  - If Description Brush Asset param is set and file exists (soft_brush.png), loads img/system/battleui/<asset>.png and tiles behind text.
  - If missing: paints horizontal gradient (Description Brush Color rgba(0,0,0,0.55)) that fades right from opaque to transparent.
- **Body text:** Drawn below header using `drawTextEx()` (supports text codes, color tags, icons). Font size = Body Font Size (default 14px). Color = white. Supports multi-line.

**Soft fade on text change (setText):**
- When text is updated, `_fadeTarget` is reset, triggering fade-out
- Text fades out over Description Fade Frames (default 12)
- Window refreshes to new text
- Text fades back in over the same duration
- Creates smooth transition when help text changes on command selection

## Decoration Layer (KB_BattleDecorationLayer)

- **Added to scene** above the spriteset, below the windows
- **Folder:** Overlay Folder param (default `img/system/battleui/`)
- **Asset list:** Overlay Images param (string array, format: `"filename,x,y,opacity"`)
- **Default entries:**
  - `"circle_overlay,1080,520,200"` — bottom-right decorative circle/ring
  - `"corner_shadow,0,560,220"` — bottom-left shadow vignette
- **Loading behavior:**
  - Per-image: loads img/system/battleui/<filename>.png via loadOverlay cache
  - If file missing: logs warning, silently skips (does not crash)
  - If file present: creates Sprite at (x, y) with configured opacity (0–255)
  - Cached in module-level overlayCache Map to avoid redundant loads

## Typography

| Element | Param | Default | Notes |
|---------|-------|---------|-------|
| **Card HP/MP** | HUD Stat Font Size | 16px | Dark brown text with outline |
| **Command labels** | Command Font Size | 20px | White if selected, dark brown if not |
| **Desc header** | Header Font Size | 16px | Gold-beige (#D4B57A), uppercase |
| **Desc body** | Body Font Size | 14px | White, supports text codes |
| **UI Font family** | UI Font | (empty = engine default) | CSS font-family string |

## Colors

| Element | Param | Default | Notes |
|---------|-------|---------|-------|
| **Panel background** | Panel Color | rgba(245, 235, 210, 0.72) | Cream parchment |
| **Panel border** | Panel Border Color | rgba(120, 90, 50, 0.5) | Brown outline |
| **Panel shadow halo** | Panel Shadow Color | rgba(0, 0, 0, 0.35) | Soft radial drop shadow |
| **Selection band** | Selection Color | rgba(212, 180, 100, 0.9) | Tan highlight behind selected command |
| **Selected text** | Selection Text Color | #FFFFFF | White when focused |
| **Body text** | Body Text Color | #2A1A0A | Dark brown, unselected |
| **HP value** | HP Color | #FFFFFF | White, high contrast |
| **MP value** | MP Color | #A0D8F0 | Light blue, distinct from HP |
| **Header (DESCRIPTION)** | Header Color | #D4B57A | Gold-beige |
| **Active glow** | Active Glow Color | rgba(255, 220, 130, 0.7) | Golden radial gradient |
| **Low HP overlay** | Low HP Tint | rgba(220, 50, 50, 0.35) | Red tint on portrait ≤ 25% HP |
| **Brush gradient** | Description Brush Color | rgba(0, 0, 0, 0.55) | Dark horizontal fade |
| **Panel opacity** | Panel Opacity | 180 (0–255) | Global transparency for all panels |

## Animation

### Pulse (Active Actor)
- **Trigger:** BattleManager.actor === card's actor
- **Duration:** ~5.8 seconds (phase 0–2π)
- **Phase advance:** 0.06 × ANIM_SPEED per frame
- **Glow opacity:** 140 + sin(phase) × 90 (range 140–230)
- **Portrait scale:** 1.0 + sin(phase) × 0.05 (range 1.0–1.05)
- **Portraits dims to 240 when inactive**

### Hover Bobbing (HUD Container)
- **Trigger:** Every frame (Graphics.frameCount)
- **Formula:** `y_offset = sin(Graphics.frameCount × 0.025 × ANIM_SPEED) × HUD Hover Amplitude`
- **Default amplitude:** 1.5px (very subtle)
- **Effect:** Gentle up-down motion to draw attention

### Command Window Entrance (Slide + Fade)
- **Trigger:** Window.open()
- **Duration:** Command Slide Frames (default 15, adjusted by ANIM_SPEED)
- **x_offset:** Animates `this.x` from `−Command Slide Distance` (default 32px) toward final X with cubic-out easing
- **Opacity:** Tweens from 0 → 255 (linear)
- **Effect:** Slides in from left with fade-in (v3.1 easing = cubic-out for smooth deceleration)

### Description Text Fade
- **Trigger:** setText() called
- **Duration:** Description Fade Frames (default 12, adjusted by ANIM_SPEED)
- **Effect:** Current text fades out, refreshes, fades back in
- **Smoothness:** Soft transition when help changes on command selection

## Animation Speed Control

- **Param:** Animation Speed (range 0.1–4.0, default 1.0)
- **Semantics:** Global multiplier for all frame-based timings
- **How it works:** dur(frames) = max(1, round(frames / ANIM_SPEED))
- **Examples:**
  - 0.5 → all animations twice as slow
  - 1.0 → normal speed
  - 2.0 → all animations twice as fast
- **Affected timings:**
  - Pulse phase: 0.06 × ANIM_SPEED per frame
  - Hover: Graphics.frameCount × 0.025 × ANIM_SPEED
  - Command slide: dur(Command Slide Frames) with cubic-out easing (v3.1)
  - Description fade: dur(Description Fade Frames)

## Asset Loader (v3.1 Silent Overlay Loader)

- **Module-level caches:**
  - **overlayCache Map** (keyed by filename) — stores loaded Bitmaps or null
  - **overlayPending Map** (keyed by URL) — coalesces concurrent loads for the same asset
- **Silent HEAD-check:** Before calling `ImageManager.loadBitmap`, sends a fetch() HEAD request to check if the file exists. Missing files generate no console 404; immediately cached as null.
- **Load path:** ImageManager.loadBitmap(OVERLAY_FOLDER, name)
- **On first load:**
  - HEAD-check passes: caches bitmap, uses it in rendering
  - HEAD-check fails (404): caches null, silently skips rendering (no warning logged)
  - Pending coalesce: if same URL is requested concurrently, reuses the same fetch promise
- **On subsequent loads:** returns cached value (null or bitmap), no re-fetching or re-loading
- **Graceful fallback:**
  - Diamond Frame Asset missing → renders programmatic diamond outline
  - Description Brush Asset missing → renders horizontal gradient
  - Overlay Images missing → skips that image, continues with others (no spam in console)

## Bóng Tối Gauge Integration

**KB_BongToiGauge v1.5 supports two rendering modes:**

### Panel Mode (default, drawMode = "panel")

1. Gauge renders **inside Hải's VisuMZ Sideview panel**, directly below the TP gauge
2. Positioned at the same X as other gauges, one `gaugeLineHeight` below TP
3. Panel gauge is **96px wide** (configurable via `panelGaugeWidth` param)
4. Inherits panel theme colors, fonts, opacity from KB_SideViewBattleUI
5. Label reads "DP" (Dark Point, configurable via `label` param; v1.4 was "BT")
6. Sprite class: `Sprite_KBBongToiGaugePanel` (width-optimized for 96px)
7. Gauge fully visible — no window clipping (rendered inside the status panel, not via KB_ActorCard)

**When Show BT Inline = true in KB_SideViewBattleUI:**
- KB_ActorCard does NOT attach BongToi (HUD cards stay minimal)
- KB_BongToiGauge's panel mode is automatically active (v1.5 default)

### Overlay Mode (legacy, drawMode = "overlay")

- Gauge renders as a **scene-level overlay** (no panel integration)
- Positioned above or below Hải's status window (configurable offset)
- Overlay gauge is **160px wide** (configurable via params)
- Sprite class: `Sprite_KBBongToiGaugeOverlay` (width-optimized for 160px)
- Used for non-VisuMZ setups or custom battle layouts

**When Show BT Inline = false in KB_SideViewBattleUI:**
- Panel mode overlay (if drawMode="panel") will not render inside the panel
- Overlay mode will render separately as before (v1.4 behavior)

### Technical Details (v1.5)

- **Hook on Window_StatusBase.prototype.placeGauge:**
  - Routes `type="kb_bongtoi"` to appropriate sprite subclass
  - **Panel mode:** Chains placement after "tp" gauge for Hải (adds one line below)
  - **Overlay mode:** Registers window position for frame-by-frame tracking
  
- **Public API unchanged:** All v1.0–v1.4 APIs preserved (KB.BongToi.get/set/add/reset, plugin commands, notetags)

## Battle Integration (Unchanged)

- **Scene_Battle hooks:**
  - Window_ActorCommand & Window_PartyCommand creation replaced with KB_Window* versions
  - Sprite_BattleStatus hidden (opacity 0, kept for BattleManager compatibility)
  - KB_BattleHUD added as child to the spriteset
  - KB_BattleDecorationLayer added to scene (above spriteset, below windows)
  - Sprite_Actor home positions use new formation logic via setActorHome override
- **BattleManager compatibility:** No changes needed. Plugin works with standard turn-based and VisuMZ_1_BattleCore's extended battle flow.

## Plugin Parameters (Canonical List)

**Total: ~65 entries (40 functional) grouped into sections**

### Resolution (2)
| Param | Type | Default | Purpose |
|-------|------|---------|---------|
| Resolution Width | number | 1280 | Design canvas width |
| Resolution Height | number | 720 | Design canvas height |

### Actor Formation (9)
| Param | Type | Default | Purpose |
|-------|------|---------|---------|
| Actor Formation Preset | select | ReferenceLayout | Classic / Vertical / ReferenceLayout |
| Actor1 X | number | 900 | X position for actor 1 (ReferenceLayout) |
| Actor1 Y | number | 320 | Y position for actor 1 |
| Actor2 X | number | 960 | X position for actor 2 |
| Actor2 Y | number | 390 | Y position for actor 2 |
| Actor3 X | number | 1010 | X position for actor 3 |
| Actor3 Y | number | 470 | Y position for actor 3 |
| Actor4 X | number | 1060 | X position for actor 4 |
| Actor4 Y | number | 540 | Y position for actor 4 |

### HUD (6)
| Param | Type | Default | Purpose |
|-------|------|---------|---------|
| HUD X | number | 392 | Container left position (design canvas, re-centered v3.1) |
| HUD Y | number | 615 | Container top position |
| HUD Spacing | number | 120 | Pixels between card centers |
| Card Width | number | 135 | Card bitmap width |
| Card Height | number | 90 | Card bitmap height |
| HUD Hover Amplitude | number | 1.5 | Bobbing amplitude in pixels |

### Command Window (7)
| Param | Type | Default | Purpose |
|-------|------|---------|---------|
| Command X | number | 930 | Window left (design canvas) |
| Command Y | number | 565 | Window top |
| Command Width | number | 170 | Window width |
| Command Height | number | 130 | Window height |
| Command Item Height | number | 24 | Height per command line |
| Command Slide Frames | number | 15 | Frames for entrance animation |
| Command Slide Distance | number | 32 | Horizontal slide distance in pixels (v3.1) |

### Description Window (5)
| Param | Type | Default | Purpose |
|-------|------|---------|---------|
| Description X | number | 0 | Window left (design canvas) |
| Description Y | number | 590 | Window top |
| Description Width | number | 420 | Window width |
| Description Height | number | 130 | Window height |
| Description Label | string | {battle_description} | Header text (localization key) |
| Description Fade Frames | number | 12 | Frames for text fade transition |

### Typography (5)
| Param | Type | Default | Purpose |
|-------|------|---------|---------|
| UI Font | string | (empty) | CSS font-family; blank = engine default |
| Header Font Size | number | 16 | "DESCRIPTION" label size |
| Body Font Size | number | 14 | Description body text size (v3.1: corrected from 22 to be smaller than header) |
| HUD Stat Font Size | number | 16 | HP/MP text on cards |
| Command Font Size | number | 20 | Command label size (v3.1: refined from 22 for 24-px item height) |

### Colors (13)
| Param | Type | Default | Purpose |
|-------|------|---------|---------|
| Panel Color | string | rgba(245, 235, 210, 0.72) | Cream background (v3.1: alpha 0.78 → 0.72 for transparency) |
| Panel Border Color | string | rgba(120, 90, 50, 0.5) | Brown border |
| Panel Shadow Color | string | rgba(0, 0, 0, 0.35) | Soft shadow halo |
| Selection Color | string | rgba(212, 180, 100, 0.9) | Highlight band (v3.1: more golden from 180,145,100) |
| Selection Text Color | string | #FFFFFF | Selected text |
| Body Text Color | string | #2A1A0A | Unselected text |
| HP Color | string | #FFFFFF | HP value |
| MP Color | string | #A0D8F0 | MP value |
| Header Color | string | #D4B57A | "DESCRIPTION" text |
| Active Glow Color | string | rgba(255, 220, 130, 0.7) | Pulse glow |
| Low HP Tint | string | rgba(220, 50, 50, 0.35) | Red portrait overlay ≤ 25% HP |
| Description Brush Color | string | rgba(0, 0, 0, 0.55) | Gradient background (no asset) |
| Panel Opacity | number | 180 | Global panel alpha (0–255, v3.1: refined from 220 for closer match to reference) |

### Animation (1)
| Param | Type | Default | Purpose |
|-------|------|---------|---------|
| Animation Speed | number | 1.0 | Global timing multiplier (0.1–4.0) |

### Overlay / Decoration (4)
| Param | Type | Default | Purpose |
|-------|------|---------|---------|
| Overlay Folder | string | img/system/battleui/ | Asset folder path |
| Diamond Frame Asset | string | frame_diamond | Frame overlay (blank = programmatic) |
| Description Brush Asset | string | soft_brush | Brush background (blank = gradient) |
| Overlay Images | string[] | ["circle_overlay,1080,520,200","corner_shadow,0,560,220"] | Decorative overlays |

### Bóng Tối (2)
| Param | Type | Default | Purpose |
|-------|------|---------|---------|
| Hai Actor ID | number | 3 | Actor ID for BT gauge |
| Show BT Inline | boolean | true | Display BT on card (suppress overlay if true) |

## Performance Notes

- **Bitmap creation:** Bitmaps created once per sprite (glow, shadow, portrait, text, lowHpTint), then re-painted in place via fillRect/drawText — no per-frame allocation.
- **Text re-render guard:** KB_ActorCard only redraws HP/MP bitmap when `actor.hp` or `actor.mp` changes (caches `_lastHp`, `_lastMp`), not every frame.
- **Animation calculations:** Lightweight (sin/cos, basic lerp). No per-pixel loop overhead.
- **Overlay error resilience:** Missing files logged as warnings; rendering continues without crash.
- **Asset caching:** Module-level overlayCache Map prevents redundant file loads.

## Compatibility

- **VisuMZ_1_BattleCore:** Fully compatible. KB_SideViewBattleUI loads after BattleCore and provides its own window implementations; no conflicts.
- **VisuMZ_3_SideviewBattleUI:** Must be disabled. Both plugins override Scene_Battle window/sprite creation; they cannot coexist.
- **KB_BongToiGauge:** Optional. If enabled and Show BT Inline = true, BT gauge renders on Hải's card; scene overlay is suppressed. If Show BT Inline = false, overlay displays normally.

## Testing Checklist

- [ ] All three party members render as cards in HUD (name, diamond portrait, HP/MP text)
- [ ] Active actor card pulses (glow + portrait scale); glow fades when active actor changes
- [ ] HUD container bobs gently up-down (Graphics.frameCount sine wave, amplitude 1.5px default)
- [ ] Command window slides in from top with fade-in on actor turn (15 frames default)
- [ ] Command window selection band highlights current item; text turns white when selected
- [ ] Selected command text shows gold outline glow (rgba(255,200,120,0.85), width 3)
- [ ] Description window shows localized "DESCRIPTION" header + help text below
- [ ] Description text fades smoothly when help changes on command selection
- [ ] Hải's card shows BT gauge inline at bottom-right (if Show BT Inline = true)
- [ ] BT gauge does NOT appear as scene overlay when inline display is enabled
- [ ] Actor portraits render as diamonds, not squares
- [ ] Low HP state (≤ 25% HP) tints portrait red (rgba(220,50,50,0.35)) and fades out when health recovers
- [ ] MP color is light blue (#A0D8F0), distinct from HP white (#FFFFFF)
- [ ] Diamond frame overlay loads (if frame_diamond.png exists) or falls back to programmatic outline
- [ ] Soft brush background behind description loads (if soft_brush.png exists) or falls back to horizontal gradient
- [ ] Decorative overlay images render at configured positions and opacity (circle_overlay bottom-right, corner_shadow bottom-left)
- [ ] Custom Actor Formation Preset (Classic / Vertical / ReferenceLayout) positions actors correctly
- [ ] Per-actor X/Y params override actor home positions in ReferenceLayout mode
- [ ] Proportional scaling: changing Graphics.boxWidth/Height adjusts all UI proportionally
- [ ] Animation Speed param (0.5 / 1.0 / 2.0) correctly scales pulse, hover, slide, fade durations
- [ ] Battle runs smoothly with no frame drops (text re-render cached correctly, no flicker)
- [ ] Missing asset files (frame_diamond, soft_brush, overlay images) are handled gracefully (logged, not crashing)
