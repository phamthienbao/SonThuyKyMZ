//=============================================================================
// KB_SideViewBattleUI.js  v3.1
//=============================================================================
/*:
 * @target MZ
 * @plugindesc [v3.1] Cinematic anime JRPG sideview battle UI (KB Edition).
 * @author KB
 *
 * @help
 * ============================================================================
 *  KB_SideViewBattleUI v3.1 — Reference-matched cinematic battle UI
 * ============================================================================
 *
 *  Designed for 1280x720. Positions scale proportionally via sx/sy helpers.
 *
 *  YÊU CẦU:
 *   - KB_CoreEngine.js (đặt phía trên)
 *   - KB_BongToiGauge.js (optional)
 *   - Tắt VisuMZ_3_SideviewBattleUI
 *   - Đặt KB plugin SAU VisuMZ_1_BattleCore
 *
 *  CLASSES:
 *   - KB_BattleHUD             — container of cards, bottom-center
 *   - KB_ActorCard             — diamond portrait + HP/MP + active glow
 *   - KB_WindowActorCommand    — soft cream command panel, slide+fade
 *   - KB_WindowPartyCommand    — Fight/Escape, same style
 *   - KB_WindowDescription     — bottom-left brush shadow + "DESCRIPTION"
 *   - KB_BattleDecorationLayer — ornament PNG overlay (img/system/battleui/)
 *
 *  ALL OVERLAY ASSETS ARE OPTIONAL.
 *  Plugin HEAD-checks each asset URL before loading; missing files are
 *  skipped silently (no 404 in console). Layout still works without any
 *  asset present — programmatic fallbacks paint everything.
 *
 *  ASSET SLOTS (drop into img/system/battleui/):
 *   - frame_diamond.png   — diamond portrait frame overlay
 *   - soft_brush.png      — brush stroke behind description window
 *   - circle_overlay.png  — bottom-right decorative ring
 *   - corner_shadow.png   — bottom-left paint shadow
 *   - any others you list in "Overlay Images"
 *
 * ============================================================================
 *  v3.1 CHANGES (audit fixes)
 *   - refreshCursor: fixed typo (_refreshCursor → refreshCursor); cursor is
 *     now actually hidden via setCursorRect(0,0,0,0).
 *   - Selection band: drawn on contentsBack (MZ's per-item background layer)
 *     instead of contents.
 *   - paint() override now clears contentsBack too.
 *   - Command slide animation: animates window.x (not _clientArea.y) so the
 *     PIXI mask stays aligned.
 *   - Frame base-scale cached on load (no per-frame Math.max).
 *   - Bitmap dirty notify via _baseTexture.update() (MZ idiom).
 *   - Cubic-out easing for slide/fade (subjectively "elegant").
 *   - BT gauge width clamped to card stat-area width.
 *   - Asset loader HEAD-checks files; missing assets cause no console noise.
 * ============================================================================
 *
 * @param --- Resolution ---
 * @default
 *
 * @param Resolution Width
 * @type number
 * @default 1280
 *
 * @param Resolution Height
 * @type number
 * @default 720
 *
 * @param --- Actor Formation ---
 * @default
 *
 * @param Actor Formation Preset
 * @type select
 * @option Classic
 * @option Vertical
 * @option ReferenceLayout
 * @default ReferenceLayout
 *
 * @param Actor1 X
 * @type number
 * @default 900
 *
 * @param Actor1 Y
 * @type number
 * @default 320
 *
 * @param Actor2 X
 * @type number
 * @default 960
 *
 * @param Actor2 Y
 * @type number
 * @default 390
 *
 * @param Actor3 X
 * @type number
 * @default 1010
 *
 * @param Actor3 Y
 * @type number
 * @default 470
 *
 * @param Actor4 X
 * @type number
 * @default 1060
 *
 * @param Actor4 Y
 * @type number
 * @default 540
 *
 * @param --- HUD ---
 * @default
 *
 * @param HUD X
 * @type number
 * @default 392
 *
 * @param HUD Y
 * @type number
 * @default 615
 *
 * @param HUD Spacing
 * @type number
 * @default 120
 *
 * @param Card Width
 * @type number
 * @default 135
 *
 * @param Card Height
 * @type number
 * @default 90
 *
 * @param Portrait Size
 * @type number
 * @default 64
 *
 * @param HUD Hover Amplitude
 * @desc Idle hover bobbing in pixels. 0 = no motion.
 * @type number
 * @decimals 1
 * @default 1.5
 *
 * @param --- Command Window ---
 * @default
 *
 * @param Command X
 * @type number
 * @default 930
 *
 * @param Command Y
 * @type number
 * @default 565
 *
 * @param Command Width
 * @type number
 * @default 170
 *
 * @param Command Height
 * @type number
 * @default 130
 *
 * @param Command Item Height
 * @type number
 * @default 24
 *
 * @param Command Slide Frames
 * @desc Frames for slide+fade entrance animation.
 * @type number
 * @default 15
 *
 * @param Command Slide Distance
 * @desc Pixels of horizontal slide (right→home).
 * @type number
 * @default 32
 *
 * @param --- Description Window ---
 * @default
 *
 * @param Description X
 * @type number
 * @default 0
 *
 * @param Description Y
 * @type number
 * @default 590
 *
 * @param Description Width
 * @type number
 * @default 420
 *
 * @param Description Height
 * @type number
 * @default 130
 *
 * @param Description Label
 * @desc Header text. Use {key} for localization.
 * @default {battle_description}
 *
 * @param Description Fade Frames
 * @type number
 * @default 12
 *
 * @param --- Typography ---
 * @default
 *
 * @param UI Font
 * @desc CSS font-family. Blank = engine default.
 * @default
 *
 * @param Header Font Size
 * @type number
 * @default 16
 *
 * @param Body Font Size
 * @type number
 * @default 14
 *
 * @param HUD Stat Font Size
 * @type number
 * @default 16
 *
 * @param Command Font Size
 * @type number
 * @default 20
 *
 * @param --- Colors ---
 * @default
 *
 * @param Panel Color
 * @default rgba(245, 235, 210, 0.72)
 *
 * @param Panel Border Color
 * @default rgba(120, 90, 50, 0.5)
 *
 * @param Panel Shadow Color
 * @default rgba(0, 0, 0, 0.35)
 *
 * @param Selection Color
 * @default rgba(212, 180, 100, 0.9)
 *
 * @param Selection Text Color
 * @default #FFFFFF
 *
 * @param Body Text Color
 * @default #2A1A0A
 *
 * @param HP Color
 * @default #FFFFFF
 *
 * @param MP Color
 * @default #A0D8F0
 *
 * @param Header Color
 * @default #D4B57A
 *
 * @param Active Glow Color
 * @default rgba(255, 220, 130, 0.7)
 *
 * @param Low HP Tint
 * @default rgba(220, 50, 50, 0.35)
 *
 * @param Description Brush Color
 * @default rgba(0, 0, 0, 0.55)
 *
 * @param Panel Opacity
 * @type number
 * @min 0
 * @max 255
 * @default 180
 *
 * @param --- Animation ---
 * @default
 *
 * @param Animation Speed
 * @desc Global multiplier (1.0 = normal, 0.5 = half, 2.0 = double).
 * @type number
 * @decimals 2
 * @min 0.10
 * @max 4.00
 * @default 1.00
 *
 * @param --- Overlay / Decoration ---
 * @default
 *
 * @param Overlay Folder
 * @default img/system/battleui/
 *
 * @param Diamond Frame Asset
 * @desc Filename inside Overlay Folder (no extension). Blank = programmatic.
 * @default frame_diamond
 *
 * @param Description Brush Asset
 * @desc Filename inside Overlay Folder. Blank = programmatic gradient.
 * @default soft_brush
 *
 * @param Overlay Images
 * @desc "filename,x,y,opacity" per line. Missing files silently skipped.
 * @type string[]
 * @default ["circle_overlay,1080,520,200","corner_shadow,0,560,220"]
 *
 * @param --- Bóng Tối ---
 * @default
 *
 * @param Hai Actor ID
 * @type number
 * @default 3
 *
 * @param Show BT Inline
 * @type boolean
 * @default true
 */

if (!Imported.KB_Core) {
    throw new Error("KB_SideViewBattleUI yêu cầu KB_CoreEngine.js. Đặt nó phía trên.");
}

Imported.KB_SideViewBattleUI = true;

(() => {
    'use strict';

    //==========================================================
    // PLUGIN PARAMETERS
    //==========================================================
    const P = PluginManager.parameters("KB_SideViewBattleUI");
    const num  = (k, d) => Number(P[k] ?? d);
    const str  = (k, d) => String(P[k] ?? d);
    const bool = (k)    => KB.Utils.isTrue(P[k]);
    const arr  = (s)    => { try { return JSON.parse(s || '[]'); }
                             catch { console.warn('[KB_SVBattleUI] Bad array param:', s); return []; } };

    const RES_W  = num('Resolution Width',  1280);
    const RES_H  = num('Resolution Height', 720);

    const FORMATION = str('Actor Formation Preset', 'ReferenceLayout');
    const A_POS = [1,2,3,4].map(i => ({ x: num(`Actor${i} X`, 900), y: num(`Actor${i} Y`, 320) }));

    const HUD = {
        x: num('HUD X', 392), y: num('HUD Y', 615),
        spacing: num('HUD Spacing', 120),
        cardW: num('Card Width', 135), cardH: num('Card Height', 90),
        portrait: num('Portrait Size', 64),
        hover: num('HUD Hover Amplitude', 1.5),
    };

    const CMD = {
        x: num('Command X', 930), y: num('Command Y', 565),
        w: num('Command Width', 170), h: num('Command Height', 130),
        itemH: num('Command Item Height', 24),
        slide: num('Command Slide Frames', 15),
        slideDist: num('Command Slide Distance', 32),
    };

    const DESC = {
        x: num('Description X', 0), y: num('Description Y', 590),
        w: num('Description Width', 420), h: num('Description Height', 130),
        label: str('Description Label', '{battle_description}'),
        fade: num('Description Fade Frames', 12),
    };

    const FONT = {
        face:   str('UI Font', ''),
        header: num('Header Font Size', 16),
        body:   num('Body Font Size', 14),
        stat:   num('HUD Stat Font Size', 16),
        cmd:    num('Command Font Size', 20),
    };

    const COLOR = {
        panel:  str('Panel Color',         'rgba(245, 235, 210, 0.72)'),
        border: str('Panel Border Color',  'rgba(120, 90, 50, 0.5)'),
        shadow: str('Panel Shadow Color',  'rgba(0, 0, 0, 0.35)'),
        sel:    str('Selection Color',     'rgba(212, 180, 100, 0.9)'),
        selText:str('Selection Text Color','#FFFFFF'),
        text:   str('Body Text Color',     '#2A1A0A'),
        hp:     str('HP Color',            '#FFFFFF'),
        mp:     str('MP Color',            '#A0D8F0'),
        header: str('Header Color',        '#D4B57A'),
        glow:   str('Active Glow Color',   'rgba(255, 220, 130, 0.7)'),
        lowHp:  str('Low HP Tint',         'rgba(220, 50, 50, 0.35)'),
        brush:  str('Description Brush Color', 'rgba(0, 0, 0, 0.55)'),
        panelAlpha: num('Panel Opacity', 180),
    };

    const ANIM_SPEED = Math.max(0.1, num('Animation Speed', 1.0));

    const OVERLAY_FOLDER = str('Overlay Folder', 'img/system/battleui/');
    const DIAMOND_FRAME  = str('Diamond Frame Asset', 'frame_diamond');
    const BRUSH_ASSET    = str('Description Brush Asset', 'soft_brush');
    const OVERLAYS = arr(P['Overlay Images']).map(s => {
        const [name, x, y, opacity] = String(s).split(',').map(p => p.trim());
        return { name: name || '', x: Number(x) || 0, y: Number(y) || 0, opacity: Number(opacity) || 255 };
    }).filter(o => o.name);

    const HAI_ACTOR_ID = num('Hai Actor ID', 3);
    const SHOW_BT      = bool('Show BT Inline');

    //==========================================================
    // UTILITY FUNCTIONS
    //==========================================================
    const tr = (text) => {
        if (!text) return text;
        return (typeof KBLocalization !== 'undefined') ? KBLocalization.process(text) : text;
    };

    const fontFace = () => FONT.face || $gameSystem.mainFontFace();

    // Scale a coord designed for RES_W×RES_H to the current Graphics box.
    const sx = (x) => Math.round(x * (Graphics.boxWidth  / RES_W));
    const sy = (y) => Math.round(y * (Graphics.boxHeight / RES_H));

    const dur = (frames) => Math.max(1, Math.round(frames / ANIM_SPEED));

    // Cubic-out easing — t in [0,1] → [0,1] with soft landing.
    const easeOut = (t) => {
        const u = 1 - Math.min(1, Math.max(0, t));
        return 1 - u * u * u;
    };

    // Silent asset loader — HEAD-checks existence before loading so missing
    // optional files never spam the console with 404s. Caches the resulting
    // Bitmap (or `null` for missing files) so we never re-probe.
    const overlayCache = new Map();   // name -> Bitmap | null
    const overlayPending = new Map(); // name -> Promise<Bitmap | null>

    function loadOverlay(name, onReady) {
        if (!name) { if (onReady) onReady(null); return null; }
        if (overlayCache.has(name)) {
            const bmp = overlayCache.get(name);
            if (onReady) onReady(bmp);
            return bmp;
        }
        if (overlayPending.has(name)) {
            overlayPending.get(name).then(b => onReady && onReady(b));
            return null;
        }
        const url = `${OVERLAY_FOLDER}${encodeURIComponent(name)}.png`;
        const promise = fetch(url, { method: 'HEAD' }).then(r => {
            if (!r.ok) {
                overlayCache.set(name, null);
                return null;
            }
            const bmp = ImageManager.loadBitmap(OVERLAY_FOLDER, name);
            return new Promise(resolve => {
                if (bmp.isReady()) { overlayCache.set(name, bmp); resolve(bmp); return; }
                bmp.addLoadListener(() => {
                    overlayCache.set(name, bmp);
                    resolve(bmp);
                });
            });
        }).catch(() => {
            overlayCache.set(name, null);
            return null;
        });
        overlayPending.set(name, promise);
        promise.then(b => onReady && onReady(b));
        return null;
    }

    //==========================================================
    // SCENE EXTENSIONS — actor positioning + window swapping
    //==========================================================
    const _Sprite_Actor_setActorHome = Sprite_Actor.prototype.setActorHome;
    Sprite_Actor.prototype.setActorHome = function(index) {
        switch (FORMATION) {
            case 'Classic':
                return _Sprite_Actor_setActorHome.call(this, index);
            case 'Vertical': {
                return this.setHome(sx(900), sy(280 + index * 90));
            }
            case 'ReferenceLayout':
            default: {
                const p = A_POS[index] || A_POS[A_POS.length - 1];
                return this.setHome(sx(p.x), sy(p.y));
            }
        }
    };

    //==========================================================
    // HUD SYSTEM — KB_ActorCard + KB_BattleHUD
    //==========================================================
    class KB_ActorCard extends Sprite {
        constructor(actor) {
            super();
            this._actor       = actor;
            this._lastHp      = -1;
            this._lastMp      = -1;
            this._pulsePhase  = Math.random() * Math.PI * 2;
            this._faceBitmap  = null;
            this._frameBitmap = null;
            this._frameBaseScale = 1;
            this._btSprite    = null;
            this._scale       = 1;
            this._build();
            this._loadFace();
            this._loadFrame();
        }

        _build() {
            const w = HUD.cardW, h = HUD.cardH, p = HUD.portrait;

            // 1. Active glow halo (drawn first, lowest layer).
            this._glow = new Sprite(new Bitmap(w + 40, h + 40));
            this._glow.x = -20;
            this._glow.y = -20;
            this._glow.opacity = 0;
            this.addChild(this._glow);
            this._drawGlow();

            // 2. Soft drop shadow under card.
            this._shadow = new Sprite(new Bitmap(w + 8, h + 8));
            this._shadow.x = -4;
            this._shadow.y = 4;
            this._shadow.opacity = 140;
            this.addChild(this._shadow);
            this._drawShadow();

            // 3. Diamond portrait. Slightly extends above the card.
            this._portrait = new Sprite(new Bitmap(p, p));
            this._portrait.anchor.set(0.5, 0.5);
            this._portrait.x = Math.floor(p / 2) + 4;
            this._portrait.y = Math.floor(h / 2) - 6;
            this.addChild(this._portrait);

            // 4. Frame overlay (asset or programmatic).
            this._frame = new Sprite();
            this._frame.anchor.set(0.5, 0.5);
            this._frame.x = this._portrait.x;
            this._frame.y = this._portrait.y;
            this.addChild(this._frame);

            // 5. Low HP tint — diamond-clipped red overlay on the portrait.
            this._lowHpTint = new Sprite(new Bitmap(p, p));
            this._lowHpTint.anchor.set(0.5, 0.5);
            this._lowHpTint.x = this._portrait.x;
            this._lowHpTint.y = this._portrait.y;
            this._lowHpTint.opacity = 0;
            this.addChild(this._lowHpTint);
            this._drawLowHpTint();

            // 6. Text layer (HP / MP).
            this._text = new Sprite(new Bitmap(w, h));
            this.addChild(this._text);
            this._drawText();
        }

        _drawGlow() {
            const bmp = this._glow.bitmap;
            const w = bmp.width, h = bmp.height;
            bmp.clear();
            const ctx = bmp.context;
            const g = ctx.createRadialGradient(w/2, h/2, Math.min(w, h)/5, w/2, h/2, Math.max(w, h)/2);
            g.addColorStop(0, COLOR.glow);
            g.addColorStop(1, 'rgba(255,220,130,0)');
            ctx.fillStyle = g;
            ctx.fillRect(0, 0, w, h);
            bmp._baseTexture.update();
        }

        _drawShadow() {
            const bmp = this._shadow.bitmap;
            const w = bmp.width, h = bmp.height;
            bmp.clear();
            const ctx = bmp.context;
            const g = ctx.createRadialGradient(w/2, h/2, 0, w/2, h/2, Math.max(w, h)/2);
            g.addColorStop(0, COLOR.shadow);
            g.addColorStop(1, 'rgba(0,0,0,0)');
            ctx.fillStyle = g;
            ctx.fillRect(0, 0, w, h);
            bmp._baseTexture.update();
        }

        _drawLowHpTint() {
            const bmp = this._lowHpTint.bitmap;
            const s = bmp.width;
            bmp.clear();
            const ctx = bmp.context;
            ctx.save();
            ctx.beginPath();
            ctx.moveTo(s/2, 0); ctx.lineTo(s, s/2); ctx.lineTo(s/2, s); ctx.lineTo(0, s/2);
            ctx.closePath();
            ctx.clip();
            ctx.fillStyle = COLOR.lowHp;
            ctx.fillRect(0, 0, s, s);
            ctx.restore();
            bmp._baseTexture.update();
        }

        _loadFace() {
            if (!this._actor || !this._actor.faceName()) return;
            const bmp = ImageManager.loadFace(this._actor.faceName());
            bmp.addLoadListener(() => {
                this._faceBitmap = bmp;
                this._drawPortrait();
            });
        }

        _loadFrame() {
            loadOverlay(DIAMOND_FRAME, (bmp) => {
                if (!bmp || !bmp.width || !bmp.height) return;
                this._frameBitmap = bmp;
                this._frame.bitmap = bmp;
                // Cache base scale once — applied each frame with pulse factor.
                this._frameBaseScale = (HUD.portrait + 8) / Math.max(bmp.width, bmp.height);
                this._frame.scale.x = this._frame.scale.y = this._frameBaseScale;
            });
        }

        _drawPortrait() {
            const bmp = this._portrait.bitmap;
            const size = HUD.portrait;
            bmp.clear();
            const ctx = bmp.context;
            ctx.save();
            ctx.beginPath();
            ctx.moveTo(size/2, 0); ctx.lineTo(size, size/2);
            ctx.lineTo(size/2, size); ctx.lineTo(0, size/2);
            ctx.closePath();
            ctx.clip();

            if (this._faceBitmap && this._faceBitmap.isReady()) {
                const idx = this._actor.faceIndex();
                const fw = ImageManager.faceWidth;
                const fh = ImageManager.faceHeight;
                const sxFace = (idx % 4) * fw;
                const syFace = Math.floor(idx / 4) * fh;
                const src = this._faceBitmap._canvas || this._faceBitmap._image;
                ctx.drawImage(src, sxFace, syFace, fw, fh, 0, 0, size, size);
            } else {
                ctx.fillStyle = '#222';
                ctx.fillRect(0, 0, size, size);
            }
            ctx.restore();

            // Programmatic outline only when no frame asset.
            if (!this._frameBitmap) {
                ctx.save();
                ctx.beginPath();
                ctx.moveTo(size/2, 0); ctx.lineTo(size, size/2);
                ctx.lineTo(size/2, size); ctx.lineTo(0, size/2);
                ctx.closePath();
                ctx.strokeStyle = COLOR.border;
                ctx.lineWidth = 2;
                ctx.stroke();
                ctx.restore();
            }
            bmp._baseTexture.update();
        }

        _drawText() {
            if (!this._actor) return;
            const bmp = this._text.bitmap;
            bmp.clear();
            bmp.fontFace = fontFace();
            bmp.fontSize = FONT.stat;
            bmp.fontBold = false;
            bmp.outlineColor = 'rgba(0, 0, 0, 0.65)';
            bmp.outlineWidth = 3;

            const tx = HUD.portrait + 10;
            const tw = HUD.cardW - tx - 4;
            const lh = FONT.stat + 4;
            const baseY = HUD.cardH - (lh * 2) - 6;

            bmp.textColor = COLOR.hp;
            bmp.drawText(`HP ${this._actor.hp}`, tx, baseY,      tw, lh);
            bmp.textColor = COLOR.mp;
            bmp.drawText(`MP ${this._actor.mp}`, tx, baseY + lh, tw, lh);
            bmp._baseTexture.update();
        }

        attachBongToi() {
            if (!SHOW_BT) return;
            if (this._actor.actorId() !== HAI_ACTOR_ID) return;
            if (!(KB && KB.BongToi && KB.BongToi.Sprite)) return;
            const SpriteClass = KB.BongToi.Sprite;
            const sprite = new SpriteClass();
            // Clamp gauge to fit within the card's stat-area.
            const targetW = HUD.cardW - HUD.portrait - 16;
            sprite.bitmapWidth = function() { return targetW; };
            sprite.setup(this._actor, 'kb_bongtoi');
            sprite.x = HUD.portrait + 10;
            sprite.y = HUD.cardH - 14;
            this._btSprite = sprite;
            this.addChild(sprite);
        }

        update() {
            super.update();
            if (!this._actor) return;

            if (this._actor.hp !== this._lastHp || this._actor.mp !== this._lastMp) {
                this._lastHp = this._actor.hp;
                this._lastMp = this._actor.mp;
                this._drawText();
            }

            // Low HP tint — smooth lerp toward 200 (low) or 0 (healthy).
            const lowHp = this._actor.mhp > 0 && (this._actor.hp / this._actor.mhp) <= 0.25;
            const target = lowHp ? 200 : 0;
            this._lowHpTint.opacity += (target - this._lowHpTint.opacity) * 0.12;

            // Active actor pulse.
            const active = (typeof BattleManager !== 'undefined')
                && BattleManager.actor && BattleManager.actor() === this._actor;
            if (active) {
                this._pulsePhase += 0.06 * ANIM_SPEED;
                const wave = 0.5 + 0.5 * Math.sin(this._pulsePhase);
                this._glow.opacity = Math.floor(140 + wave * 90);
                this._scale = 1 + wave * 0.05;
                this._portrait.opacity = 255;
            } else {
                this._glow.opacity = Math.max(0, this._glow.opacity - 10);
                this._scale = Math.max(1, this._scale - 0.015);
                this._portrait.opacity = 240;
            }
            this._portrait.scale.x = this._portrait.scale.y = this._scale;
            // Frame uses cached base scale × pulse — no per-frame Math.max.
            this._frame.scale.x = this._frame.scale.y = this._frameBaseScale * this._scale;
        }
    }

    class KB_BattleHUD extends Sprite {
        constructor() {
            super();
            this._cards = [];
            this._baseX = sx(HUD.x);
            this._baseY = sy(HUD.y);
            this.x = this._baseX;
            this.y = this._baseY;
            this.refresh();
        }

        refresh() {
            this._cards.forEach(c => this.removeChild(c));
            this._cards = [];
            const members = $gameParty.battleMembers();
            members.forEach((actor, i) => {
                const card = new KB_ActorCard(actor);
                card.x = i * HUD.spacing;
                card.y = 0;
                card.attachBongToi();
                this.addChild(card);
                this._cards.push(card);
            });
        }

        update() {
            super.update();
            if (HUD.hover > 0) {
                const phase = Graphics.frameCount * 0.025 * ANIM_SPEED;
                this.y = this._baseY + Math.sin(phase) * HUD.hover;
            }
        }
    }

    //==========================================================
    // SHARED COMMAND-WINDOW PAINTERS
    //==========================================================
    // Paints the cream panel onto contents (background art, behind items).
    const paintCommandPanel = (win) => {
        if (!win.contents) return;
        const w = win.innerWidth, h = win.innerHeight;
        const ctx = win.contents.context;
        ctx.save();
        // Soft shadow halo.
        const g = ctx.createRadialGradient(w/2, h/2, Math.min(w, h)/4, w/2, h/2, Math.max(w, h)/1.4);
        g.addColorStop(0, 'rgba(0,0,0,0)');
        g.addColorStop(1, COLOR.shadow);
        ctx.fillStyle = g;
        ctx.fillRect(0, 0, w, h);
        // Cream panel.
        ctx.fillStyle = COLOR.panel;
        ctx.fillRect(0, 0, w, h);
        // Subtle border.
        ctx.strokeStyle = COLOR.border;
        ctx.lineWidth = 1;
        ctx.strokeRect(0.5, 0.5, w - 1, h - 1);
        ctx.restore();
        win.contents._baseTexture.update();
    };

    // Selection band — drawn on contentsBack (MZ's per-item background layer).
    const drawCommandBackground = function(index) {
        if (!this.active || index !== this.index()) return;
        const rect = this.itemRect(index);
        this.contentsBack.fillRect(rect.x, rect.y + 1, rect.width, rect.height - 2, COLOR.sel);
    };

    const drawCommandItem = function(index) {
        const rect = this.itemLineRect(index);
        const sel  = (index === this.index()) && this.active;
        this.changePaintOpacity(this.isCommandEnabled(index));
        const bmp = this.contents;
        const prev = { size: bmp.fontSize, face: bmp.fontFace, bold: bmp.fontBold,
                       outC: bmp.outlineColor, outW: bmp.outlineWidth };
        bmp.fontFace = fontFace();
        bmp.fontSize = FONT.cmd;
        bmp.fontBold = sel;
        // Gold-tinted outline on selected text for the "subtle gold highlight".
        bmp.outlineColor = sel ? 'rgba(255, 200, 120, 0.85)' : 'rgba(0, 0, 0, 0.4)';
        bmp.outlineWidth = sel ? 3 : 2;
        this.changeTextColor(sel ? COLOR.selText : COLOR.text);
        this.drawText(this.commandName(index), rect.x + 8, rect.y, rect.width - 16, 'left');
        bmp.fontSize = prev.size;
        bmp.fontFace = prev.face;
        bmp.fontBold = prev.bold;
        bmp.outlineColor = prev.outC;
        bmp.outlineWidth = prev.outW;
        this.changePaintOpacity(true);
        this.resetTextColor();
    };

    // Shared paint override: clears BOTH contents + contentsBack, paints
    // panel, then runs drawAllItems (which calls drawItemBackground +
    // drawItem in order). Without clearing contentsBack the selection band
    // leaves trails when the cursor moves.
    const sharedCommandPaint = function() {
        if (!this.contents) return;
        this.contents.clear();
        this.contentsBack.clear();
        paintCommandPanel(this);
        this.drawAllItems();
    };

    // Hide the default windowskin cursor — selection band IS the highlight.
    // (v3.0 had a typo: _refreshCursor never fired.)
    const sharedRefreshCursor = function() {
        this.setCursorRect(0, 0, 0, 0);
    };

    //==========================================================
    // COMMAND WINDOWS — KB_WindowActorCommand + KB_WindowPartyCommand
    //==========================================================
    class KB_WindowActorCommand extends Window_ActorCommand {
        constructor(rect) {
            super(rect);
            this.setBackgroundType(2);
            this._homeX = rect.x;
            this._slidePhase = 1;       // 1 = starting, 0 = settled
            this._fadeAlpha  = 0;
        }
        commandStyle()       { return 'text'; }
        commandStyleCheck()  { return 'text'; }
        maxCols()            { return 1; }
        itemHeight()         { return CMD.itemH; }
        itemTextAlign()      { return 'left'; }
        numVisibleRows()     { return 5; }
        paint()              { sharedCommandPaint.call(this); }
        drawItemBackground(i) { drawCommandBackground.call(this, i); }
        drawItem(i)          { drawCommandItem.call(this, i); }
        refreshCursor()      { sharedRefreshCursor.call(this); }

        move(x, y, w, h) {
            super.move(x, y, w, h);
            this._homeX = x;
        }

        open() {
            super.open();
            this._slidePhase = 1;
            this._fadeAlpha  = 0;
            this.contentsOpacity = 0;
        }

        update() {
            super.update();
            // Cubic-out slide from the right.
            if (this._slidePhase > 0) {
                this._slidePhase = Math.max(0, this._slidePhase - 1 / dur(CMD.slide));
                const eased = easeOut(1 - this._slidePhase);
                this.x = this._homeX + sx(CMD.slideDist) * (1 - eased);
            }
            // Cubic-out fade.
            if (this.openness === 255 && this._fadeAlpha < 255) {
                this._fadeAlpha = Math.min(255, this._fadeAlpha + 255 / dur(CMD.slide));
                this.contentsOpacity = Math.floor(255 * easeOut(this._fadeAlpha / 255));
            }
        }
    }

    class KB_WindowPartyCommand extends Window_PartyCommand {
        constructor(rect) {
            super(rect);
            this.setBackgroundType(2);
        }
        commandStyle()       { return 'text'; }
        commandStyleCheck()  { return 'text'; }
        maxCols()            { return 1; }
        itemHeight()         { return CMD.itemH; }
        itemTextAlign()      { return 'left'; }
        numVisibleRows()     { return 2; }
        paint()              { sharedCommandPaint.call(this); }
        drawItemBackground(i) { drawCommandBackground.call(this, i); }
        drawItem(i)          { drawCommandItem.call(this, i); }
        refreshCursor()      { sharedRefreshCursor.call(this); }
    }

    //==========================================================
    // DESCRIPTION WINDOW — KB_WindowDescription
    //==========================================================
    class KB_WindowDescription extends Window_Help {
        constructor(rect) {
            super(rect);
            this.setBackgroundType(2);
            this.contentsOpacity = 0;
            this._fadeTarget  = 0;
            this._brushBitmap = null;
            loadOverlay(BRUSH_ASSET, (bmp) => {
                if (bmp && bmp.width && bmp.height) {
                    this._brushBitmap = bmp;
                    this.refresh();
                }
            });
        }

        _paintBrushBackdrop() {
            const ctx = this.contents.context;
            const w = this.innerWidth, h = this.innerHeight;
            if (this._brushBitmap) {
                ctx.save();
                ctx.globalAlpha = 0.9;
                const src = this._brushBitmap._canvas || this._brushBitmap._image;
                ctx.drawImage(src, 0, 0, this._brushBitmap.width, this._brushBitmap.height, 0, 0, w, h);
                ctx.restore();
            } else {
                ctx.save();
                const g = ctx.createLinearGradient(0, 0, w, 0);
                g.addColorStop(0,    COLOR.brush);
                g.addColorStop(0.6,  COLOR.brush);
                g.addColorStop(1,    'rgba(0,0,0,0)');
                ctx.fillStyle = g;
                ctx.fillRect(0, 0, w, h);
                ctx.restore();
            }
            this.contents._baseTexture.update();
        }

        refresh() {
            if (!this.contents) return;
            this.contents.clear();
            if (this.contentsBack) this.contentsBack.clear();
            this._paintBrushBackdrop();

            const bmp = this.contents;
            bmp.fontFace = fontFace();
            bmp.fontSize = FONT.header;
            bmp.fontBold = true;
            bmp.textColor = COLOR.header;
            bmp.outlineColor = 'rgba(0, 0, 0, 0.7)';
            bmp.outlineWidth = 3;
            this.drawText(tr(DESC.label).toUpperCase(), 16, 6, this.innerWidth - 32);

            bmp.fontSize = FONT.body;
            bmp.fontBold = false;
            bmp.textColor = '#FFFFFF';
            this.drawTextEx(this._text || '', 16, FONT.header + 14, this.innerWidth - 32);

            this.resetTextColor();
            this._fadeTarget = this._text ? 255 : 200;
        }

        setText(text) {
            if (this._text === text) return;
            this._text = text;
            this._fadeTarget = 0;
            this.refresh();
            this._fadeTarget = 255;
        }

        update() {
            super.update();
            const step = 255 / dur(DESC.fade);
            if (this.contentsOpacity < this._fadeTarget) {
                this.contentsOpacity = Math.min(this._fadeTarget, this.contentsOpacity + step);
            } else if (this.contentsOpacity > this._fadeTarget) {
                this.contentsOpacity = Math.max(this._fadeTarget, this.contentsOpacity - step);
            }
        }
    }

    //==========================================================
    // DECORATION LAYER — KB_BattleDecorationLayer
    //==========================================================
    class KB_BattleDecorationLayer extends Sprite {
        constructor() {
            super();
            OVERLAYS.forEach(o => {
                const placeholder = new Sprite();
                placeholder.x = sx(o.x);
                placeholder.y = sy(o.y);
                placeholder.opacity = o.opacity;
                this.addChild(placeholder);
                loadOverlay(o.name, (bmp) => {
                    if (bmp) placeholder.bitmap = bmp;
                });
            });
        }
    }

    //==========================================================
    // SCENE_BATTLE INTEGRATION
    //==========================================================
    Scene_Battle.prototype.statusWindowRect = function() {
        return new Rectangle(0, 0, 0, 0);
    };

    Scene_Battle.prototype.actorCommandWindowRect = function() {
        return new Rectangle(sx(CMD.x), sy(CMD.y), sx(CMD.w), sy(CMD.h));
    };

    Scene_Battle.prototype.partyCommandWindowRect = function() {
        const h = (CMD.itemH * 2) + 16;
        return new Rectangle(sx(CMD.x), sy(CMD.y) + sy(CMD.h) - h - 4, sx(CMD.w), h);
    };

    Scene_Battle.prototype.helpWindowRect = function() {
        return new Rectangle(sx(DESC.x), sy(DESC.y), sx(DESC.w), sy(DESC.h));
    };

    const _SB_createStatusWindow = Scene_Battle.prototype.createStatusWindow;
    Scene_Battle.prototype.createStatusWindow = function() {
        _SB_createStatusWindow.call(this);
        if (this._statusWindow) {
            this._statusWindow.visible = false;
            this._statusWindow.opacity = 0;
        }
    };

    Scene_Battle.prototype.createActorCommandWindow = function() {
        const rect = this.actorCommandWindowRect();
        const win  = new KB_WindowActorCommand(rect);
        win.setHandler('attack', this.commandAttack.bind(this));
        win.setHandler('skill',  this.commandSkill.bind(this));
        win.setHandler('guard',  this.commandGuard.bind(this));
        win.setHandler('item',   this.commandItem.bind(this));
        win.setHandler('cancel', this.commandCancel.bind(this));
        this._actorCommandWindow = win;
        this.addWindow(win);
    };

    Scene_Battle.prototype.createPartyCommandWindow = function() {
        const rect = this.partyCommandWindowRect();
        const win  = new KB_WindowPartyCommand(rect);
        win.setHandler('fight',  this.commandFight.bind(this));
        win.setHandler('escape', this.commandEscape.bind(this));
        this._partyCommandWindow = win;
        this.addWindow(win);
    };

    Scene_Battle.prototype.createHelpWindow = function() {
        const rect = this.helpWindowRect();
        const win  = new KB_WindowDescription(rect);
        this._helpWindow = win;
        this.addWindow(win);
    };

    const _SB_createSpriteset = Scene_Battle.prototype.createSpriteset;
    Scene_Battle.prototype.createSpriteset = function() {
        _SB_createSpriteset.call(this);
        this._kbDecoration = new KB_BattleDecorationLayer();
        this.addChild(this._kbDecoration);
        this._kbHud = new KB_BattleHUD();
        this.addChild(this._kbHud);
    };

    const _BM_startBattle = BattleManager.startBattle;
    BattleManager.startBattle = function() {
        _BM_startBattle.call(this);
        const scene = SceneManager._scene;
        if (scene && scene._kbHud) scene._kbHud.refresh();
    };

    //==========================================================
    // KB_BongToiGauge legacy overlay suppression
    //==========================================================
    if (SHOW_BT) {
        const _SB_createDisplayObjects = Scene_Battle.prototype.createDisplayObjects;
        Scene_Battle.prototype.createDisplayObjects = function() {
            _SB_createDisplayObjects.call(this);
            if (this._kbBongToiOverlay) {
                this._kbBongToiOverlay.visible = false;
                this._kbBongToiOverlay._kbSuppressedByUI = true;
            }
        };
        const _SB_update = Scene_Battle.prototype.update;
        Scene_Battle.prototype.update = function() {
            _SB_update.call(this);
            if (this._kbBongToiOverlay && this._kbBongToiOverlay._kbSuppressedByUI) {
                this._kbBongToiOverlay.visible = false;
            }
        };
    }
})();
