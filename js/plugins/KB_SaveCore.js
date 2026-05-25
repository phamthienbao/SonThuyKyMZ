//=============================================================================
// KB_SaveCore.js  v1.1
//=============================================================================
/*:
 * @target MZ
 * @plugindesc [v1.1] Save UI gọn nhẹ, ảnh slot tuỳ chỉnh, tích hợp KB_Localization.
 * @author KB
 *
 * @help
 * ============================================================================
 *  KB_SaveCore — Hệ thống Save File tối giản, dễ bảo trì.
 * ============================================================================
 *
 *  YÊU CẦU:
 *  - KB_CoreEngine.js (đặt phía trên).
 *  - KB_Localization.js (đặt phía trên, nếu muốn dịch nhãn / map name).
 *
 *  Plugin này THAY THẾ hoàn toàn:
 *   - VisuMZ_1_SaveCore
 *   - CGMZ_SaveFile
 *   - AltSaveScreen
 *
 *  Vui lòng TẮT 3 plugin trên trong Plugin Manager để tránh xung đột.
 *
 *  TÍNH NĂNG
 *  - Layout slot: ảnh (trái) + tiêu đề / map / playtime / timestamp (phải).
 *  - Slot 0 = Autosave (key {save_autosave}); slot khác = "File N" ({save_file}).
 *  - Timestamp vẽ qua Bitmap.drawText nên KHÔNG bị Digit Grouping của
 *    VisuMZ Core làm hỏng (ví dụ "2026" → "2,026").
 *  - Map name auto-dịch nếu là {tag}.
 *  - Locale khi save sẽ được khôi phục khi load.
 *
 *  ẢNH SLOT
 *  Mỗi slot type (autosave / manual) có thể chọn 1 trong 5 loại ảnh:
 *    title    — Ảnh title screen ($dataSystem.title1Name)
 *    icon     — icon/icon.png của game
 *    face     — Ảnh mặt nhân vật đầu tiên trong party
 *    custom   — Ảnh tự chọn từ img/pictures/<tên>.png
 *    snapshot — Chụp ảnh màn hình lúc save (chỉ khi "Capture Snapshot" = ON)
 *
 *  Nếu loại đã chọn không khả dụng (vd snapshot tắt, face không có),
 *  plugin tự dùng fallback: snapshot → face → title.
 *
 *  KEYS BẠN CÓ THỂ THÊM VÀO main.csv (tag;en;vi):
 *    save_autosave;Autosave;Tự động lưu
 *    save_file;File;Tệp
 *
 * ============================================================================
 *
 * @param Max Save Files
 * @text Số Slot Tối Đa
 * @type number
 * @min 1
 * @default 20
 *
 * @param Enable Autosave
 * @text Bật Autosave
 * @type boolean
 * @default true
 *
 * @param --- Hiển thị ---
 * @default
 *
 * @param Show Map Name
 * @text Hiển thị Tên Map
 * @type boolean
 * @default true
 *
 * @param Show Playtime
 * @text Hiển thị Thời gian chơi
 * @type boolean
 * @default true
 *
 * @param Show Timestamp
 * @text Hiển thị Ngày giờ Lưu
 * @type boolean
 * @default true
 *
 * @param Timestamp Format
 * @text Định dạng Timestamp
 * @desc Tokens: YYYY MM DD HH mm ss. Ví dụ: YYYY/MM/DD HH:mm:ss
 * @default YYYY/MM/DD HH:mm:ss
 *
 * @param Autosave Label
 * @text Nhãn Autosave
 * @desc Chữ cho slot autosave. Có thể dùng {key} để dịch.
 * @default {save_autosave}
 *
 * @param Save Label
 * @text Nhãn File
 * @desc Chữ trước số slot save. Có thể dùng {key} để dịch.
 * @default {save_file}
 *
 * @param Slot Rows
 * @text Số dòng/Trang
 * @type number
 * @min 1
 * @default 4
 *
 * @param Slot Cols
 * @text Số cột
 * @type number
 * @min 1
 * @default 1
 *
 * @param Image Size
 * @text Kích thước ảnh slot (px)
 * @type number
 * @min 48
 * @default 96
 *
 * @param --- Ảnh Autosave ---
 * @default
 *
 * @param AutoSave Image Type
 * @text Loại ảnh Autosave
 * @type select
 * @option title
 * @option icon
 * @option face
 * @option custom
 * @option snapshot
 * @default icon
 *
 * @param AutoSave Custom Image
 * @text Ảnh custom Autosave
 * @desc Tên file trong img/pictures/ (không cần đuôi). Chỉ dùng khi type = custom.
 * @default
 *
 * @param --- Ảnh Manual Save ---
 * @default
 *
 * @param Manual Image Type
 * @text Loại ảnh Manual Save
 * @type select
 * @option title
 * @option icon
 * @option face
 * @option custom
 * @option snapshot
 * @default snapshot
 *
 * @param Manual Custom Image
 * @text Ảnh custom Manual Save
 * @desc Tên file trong img/pictures/. Chỉ dùng khi type = custom.
 * @default
 *
 * @param --- Snapshot ---
 * @default
 *
 * @param Capture Snapshot
 * @text Bật chụp Snapshot
 * @type boolean
 * @desc Bật để chụp màn hình mỗi khi save (ghi vào save file dạng JPEG).
 * @default true
 *
 * @param Snapshot Quality
 * @text Chất lượng JPEG (1-100)
 * @type number
 * @min 1
 * @max 100
 * @default 70
 *
 * @param Snapshot Max Width
 * @text Chiều ngang tối đa Snapshot (px)
 * @desc Snapshot được thu nhỏ về kích thước này để giảm size save file.
 * @type number
 * @min 64
 * @max 1280
 * @default 320
 *
 * @param Snapshot Max DataURL KB
 * @text Giới hạn dung lượng Snapshot (KB)
 * @desc Nếu data URL vượt quá, snapshot sẽ bị bỏ để tránh save file khổng lồ.
 * @type number
 * @min 16
 * @max 2048
 * @default 64
 *
 * @param --- Slot trống ---
 * @default
 *
 * @param Empty Slot Image Type
 * @text Ảnh cho Slot trống
 * @desc Loại ảnh dùng khi slot chưa có save.
 * @type select
 * @option title
 * @option icon
 * @option custom
 * @default title
 *
 * @param Empty Overlay Alpha
 * @text Độ trong Overlay Slot trống
 * @desc Lớp phủ trắng trên ảnh slot trống. 0 = tắt, 1 = trắng đặc. Mặc định 0.35.
 * @type number
 * @decimals 2
 * @min 0
 * @max 1
 * @default 0.35
 */

if (!Imported.KB_Core) {
    throw new Error("KB_SaveCore yêu cầu KB_CoreEngine.js. Đặt nó phía trên.");
}

Imported.KB_SaveCore = true;

(() => {
    const pluginName = "KB_SaveCore";
    const params     = PluginManager.parameters(pluginName);

    const maxFiles        = Number(params['Max Save Files'] || 20);
    const enableAutosave  = KB.Utils.isTrue(params['Enable Autosave']);
    const showMapName     = KB.Utils.isTrue(params['Show Map Name']);
    const showPlaytime    = KB.Utils.isTrue(params['Show Playtime']);
    const showTimestamp   = KB.Utils.isTrue(params['Show Timestamp']);
    const timestampFormat = String(params['Timestamp Format'] || 'YYYY/MM/DD HH:mm:ss');
    const autosaveLabel   = String(params['Autosave Label']   || '{save_autosave}');
    const saveLabel       = String(params['Save Label']       || '{save_file}');
    const slotRows        = Math.max(1, Number(params['Slot Rows'] || 4));
    const slotCols        = Math.max(1, Number(params['Slot Cols'] || 1));
    const imageSize       = Math.max(48, Number(params['Image Size'] || 96));

    const autosaveImgType   = String(params['AutoSave Image Type']   || 'icon');
    const autosaveCustomImg = String(params['AutoSave Custom Image'] || '');
    const manualImgType     = String(params['Manual Image Type']     || 'snapshot');
    const manualCustomImg   = String(params['Manual Custom Image']   || '');
    const captureSnapshot   = KB.Utils.isTrue(params['Capture Snapshot']);
    const snapshotQuality   = Math.min(100, Math.max(1, Number(params['Snapshot Quality'] || 70))) / 100;
    const snapshotMaxW      = Math.min(1280, Math.max(64, Number(params['Snapshot Max Width'] || 320)));
    const snapshotMaxBytes  = Math.min(2048, Math.max(16, Number(params['Snapshot Max DataURL KB'] || 64))) * 1024;

    const emptyImgType      = String(params['Empty Slot Image Type'] || 'title');
    const emptyOverlayAlpha = Math.min(1, Math.max(0, Number(params['Empty Overlay Alpha'] || 0.35)));

    // ------------------------------------------------------------------
    // Helpers
    // ------------------------------------------------------------------
    const tr = (text) => {
        if (!text) return text;
        return (typeof KBLocalization !== 'undefined')
            ? KBLocalization.process(text)
            : text;
    };

    const formatTimestamp = (ts) => {
        if (!ts) return '';
        const d = new Date(ts);
        const pad = (n) => String(n).padStart(2, '0');
        // Year passed as string to ensure no Number-to-locale formatting downstream.
        return timestampFormat
            .replace(/YYYY/g, String(d.getFullYear()))
            .replace(/MM/g,   pad(d.getMonth() + 1))
            .replace(/DD/g,   pad(d.getDate()))
            .replace(/HH/g,   pad(d.getHours()))
            .replace(/mm/g,   pad(d.getMinutes()))
            .replace(/ss/g,   pad(d.getSeconds()));
    };

    // Module-level Bitmap cache keyed by URL / data URL.
    // CRITICAL: Bitmap.load() creates a fresh Bitmap on every call. Without
    // caching, drawItem → addLoadListener(refresh) → load → refresh → drawItem
    // forms an infinite loop that hangs the save scene.
    const bitmapCache = new Map();

    const loadBitmapCached = (url) => {
        if (!url) return null;
        let bmp = bitmapCache.get(url);
        if (bmp) return bmp;
        bmp = Bitmap.load(url);
        bitmapCache.set(url, bmp);
        return bmp;
    };

    // ------------------------------------------------------------------
    // DataManager — số slot + thông tin lưu thêm + snapshot
    // ------------------------------------------------------------------
    DataManager.maxSavefiles = function() {
        return maxFiles;
    };

    const _DataManager_makeSavefileInfo = DataManager.makeSavefileInfo;
    DataManager.makeSavefileInfo = function() {
        const info = _DataManager_makeSavefileInfo.call(this);
        info.mapName = ($gameMap && ($gameMap.displayName() || '')) || '';
        if (!info.mapName && $dataMapInfos && $gameMap) {
            const m = $dataMapInfos[$gameMap.mapId()];
            if (m) info.mapName = m.name || '';
        }
        info.locale = (typeof KBLocalization !== 'undefined') ? KBLocalization.locale : '';

        if (captureSnapshot) {
            const dataUrl = captureSnapshotDataUrl();
            if (dataUrl) info.snapshot = dataUrl;
        }

        return info;
    };

    // Cached JPEG data URL of the most recent gameplay scene. Updated when
    // the engine snaps Scene_Map / Scene_Battle for the menu background.
    let _kbCachedGameSnapshot = null;

    // Downscale a source Bitmap onto an offscreen canvas and encode as JPEG.
    // Returns null if the result is empty or exceeds snapshotMaxBytes.
    function encodeBitmapToJpeg(srcBitmap) {
        if (!srcBitmap || !srcBitmap.canvas) return null;
        const sw = srcBitmap.canvas.width  || srcBitmap.width;
        const sh = srcBitmap.canvas.height || srcBitmap.height;
        if (!sw || !sh) return null;

        const scale = Math.min(1, snapshotMaxW / sw);
        const dw = Math.max(1, Math.floor(sw * scale));
        const dh = Math.max(1, Math.floor(sh * scale));

        const off = document.createElement('canvas');
        off.width  = dw;
        off.height = dh;
        off.getContext('2d').drawImage(srcBitmap.canvas, 0, 0, sw, sh, 0, 0, dw, dh);

        const dataUrl = off.toDataURL('image/jpeg', snapshotQuality);
        if (!dataUrl || dataUrl.length < 32) return null;
        if (dataUrl.length > snapshotMaxBytes) {
            console.warn(`[KB_SaveCore] Snapshot data URL ${dataUrl.length} bytes exceeds limit ${snapshotMaxBytes} — dropping.`);
            return null;
        }
        return dataUrl;
    }

    // Hook: when the engine snaps the OUTGOING scene for the menu background
    // (Scene_Map → Scene_Menu, etc.), capture & encode that frame so we can
    // attach it to the next save. SceneManager.snap() called later from
    // inside Scene_Save would capture the menu instead — too late.
    const _SceneManager_snapForBackground = SceneManager.snapForBackground;
    SceneManager.snapForBackground = function() {
        _SceneManager_snapForBackground.call(this);
        const scene = this._scene;
        const isGameplay = scene instanceof Scene_Map
            || (typeof Scene_Battle !== 'undefined' && scene instanceof Scene_Battle);
        if (!isGameplay) return;
        try {
            const encoded = encodeBitmapToJpeg(this._backgroundBitmap);
            if (encoded) {
                _kbCachedGameSnapshot = encoded;
                console.log(`[KB_SaveCore] Cached gameplay snapshot: ${encoded.length} bytes`);
            }
        } catch (err) {
            console.warn(`[KB_SaveCore] Failed to cache gameplay snapshot: ${err && err.message}`, err);
        }
    };

    // Resolve the best snapshot for the current save operation.
    // - Manual save: we're in Scene_Save; prefer the cached gameplay snapshot.
    // - Autosave: we're still in Scene_Map; snap live since cache may be stale.
    function captureSnapshotDataUrl() {
        const t0 = Date.now();
        try {
            const scene = (typeof SceneManager !== 'undefined') ? SceneManager._scene : null;
            const isGameplay = scene && (scene instanceof Scene_Map
                || (typeof Scene_Battle !== 'undefined' && scene instanceof Scene_Battle));

            if (isGameplay && typeof SceneManager.snap === 'function') {
                const live = encodeBitmapToJpeg(SceneManager.snap());
                if (live) {
                    console.log(`[KB_SaveCore] Live gameplay snapshot, ${live.length} bytes, ${Date.now() - t0}ms`);
                    return live;
                }
            }

            if (_kbCachedGameSnapshot) {
                console.log(`[KB_SaveCore] Using cached gameplay snapshot, ${_kbCachedGameSnapshot.length} bytes`);
                return _kbCachedGameSnapshot;
            }

            console.warn('[KB_SaveCore] No gameplay snapshot available — save will have no thumbnail.');
            return null;
        } catch (err) {
            console.warn(`[KB_SaveCore] Snapshot capture failed: ${err && err.message}`, err);
            return null;
        }
    }

    // Khôi phục locale khi load — thực hiện sau khi save info đã đọc.
    const _DataManager_loadGame = DataManager.loadGame;
    DataManager.loadGame = function(savefileId) {
        const promise = _DataManager_loadGame.call(this, savefileId);
        return promise.then((res) => {
            try {
                const info = DataManager.savefileInfo(savefileId);
                if (info && info.locale && typeof KBLocalization !== 'undefined'
                    && info.locale !== KBLocalization.locale) {
                    KBLocalization.setLanguage(info.locale);
                }
            } catch (err) {
                console.warn(`[KB_SaveCore] Lỗi khôi phục locale: ${err && err.message}`, err);
            }
            return res;
        });
    };

    // ------------------------------------------------------------------
    // Autosave toggle
    // ------------------------------------------------------------------
    if (!enableAutosave) {
        Scene_Base.prototype.executeAutosave = function() { /* disabled */ };
        Scene_Base.prototype.requestAutosave = function() { /* disabled */ };
    }

    // ------------------------------------------------------------------
    // Window_SavefileList — layout tuỳ chỉnh
    // ------------------------------------------------------------------
    Window_SavefileList.prototype.maxCols = function() {
        return slotCols;
    };

    Window_SavefileList.prototype.numVisibleRows = function() {
        return slotRows;
    };

    Window_SavefileList.prototype.itemHeight = function() {
        return Math.floor(this.innerHeight / slotRows);
    };

    Window_SavefileList.prototype.drawItem = function(index) {
        const savefileId = this.indexToSavefileId(index);
        const info       = DataManager.savefileInfo(savefileId);
        const rect       = this.itemRectWithPadding(index);

        this.resetTextColor();
        this.changePaintOpacity(this.isEnabled(savefileId));
        this.drawKBSlot(savefileId, info, rect);
        this.changePaintOpacity(true);
    };

    Window_SavefileList.prototype.drawKBSlot = function(savefileId, info, rect) {
        const lh = this.lineHeight();
        let x = rect.x;
        const y = rect.y;

        const imgBox = Math.min(imageSize, rect.height);
        this.drawKBSlotImage(savefileId, info, x, y, imgBox);

        // White frost over the image area to indicate the slot is unused.
        if (!info && emptyOverlayAlpha > 0) {
            this.contents.fillRect(x, y, imgBox, imgBox, `rgba(255,255,255,${emptyOverlayAlpha})`);
        }

        x += imgBox + 8;

        const infoW = rect.x + rect.width - x;

        // Tiêu đề: Autosave / File N
        this.drawText(this.kbSlotTitle(savefileId), x, y, infoW);

        if (!info) return;

        let ly = y + lh;

        if (showMapName && info.mapName) {
            this.drawText(tr(info.mapName), x, ly, infoW);
            ly += lh;
        }
        if (showPlaytime && info.playtime) {
            this.drawText(info.playtime, x, ly, infoW);
            ly += lh;
        }
        if (showTimestamp && info.timestamp) {
            // Use raw Bitmap.drawText so VisuMZ Digit Grouping doesn't
            // re-format the 4-digit year ("2026" → "2,026").
            const text = formatTimestamp(info.timestamp);
            this.contents.drawText(text, x, ly, infoW, lh, 'right');
        }
    };

    Window_SavefileList.prototype.kbSlotTitle = function(savefileId) {
        if (savefileId === 0) return tr(autosaveLabel);
        return tr(saveLabel) + ' ' + savefileId;
    };

    // ------------------------------------------------------------------
    // Ảnh slot
    // ------------------------------------------------------------------
    Window_SavefileList.prototype.drawKBSlotImage = function(savefileId, info, x, y, size) {
        const isAutosave = savefileId === 0;
        // Empty slots ignore the per-type config and use Empty Slot Image Type
        // so AutoSave + Manual look consistent before any save exists.
        const requested = info
            ? (isAutosave ? autosaveImgType : manualImgType)
            : emptyImgType;
        const customName = isAutosave ? autosaveCustomImg : manualCustomImg;
        const type = this.kbResolveImageType(requested, info, customName);

        if (type === 'face') {
            const face = info && info.faces && info.faces[0];
            if (face) this.drawFace(face[0], face[1], x, y, size, size);
            return;
        }

        const bitmap = this.kbLoadSlotBitmap(type, customName, info);
        if (!bitmap) return;

        if (!bitmap.isReady()) {
            // Only attach the refresh listener once per bitmap. Without this
            // guard each redraw stacks another listener on the same cached
            // bitmap and the eventual onLoad fires N copies of refresh().
            if (!bitmap._kbRefreshHooked) {
                bitmap._kbRefreshHooked = true;
                bitmap.addLoadListener(() => this.refresh());
            }
            return;
        }

        this.kbBltCropToFit(bitmap, x, y, size);
    };

    // Fallback chain: requested → (snapshot needs data) → face (needs face data) → title.
    Window_SavefileList.prototype.kbResolveImageType = function(requested, info, customName) {
        const hasInfo     = !!info;
        const hasFace     = hasInfo && info.faces && info.faces.length > 0;
        const hasSnap     = hasInfo && !!info.snapshot;
        const hasTitleImg = !!($dataSystem && $dataSystem.title1Name);

        let t = requested;
        if (t === 'snapshot' && !hasSnap)        t = 'face';
        if (t === 'face'     && !hasFace)        t = 'title';
        if (t === 'custom'   && !customName)     t = 'title';
        if (t === 'title'    && !hasTitleImg)    t = 'icon';
        return t;
    };

    Window_SavefileList.prototype.kbLoadSlotBitmap = function(type, customName, info) {
        switch (type) {
            case 'title':
                // ImageManager.loadTitle1 caches internally.
                return $dataSystem && $dataSystem.title1Name
                    ? ImageManager.loadTitle1($dataSystem.title1Name)
                    : null;
            case 'icon':
                // Bitmap.load is NOT cached — use our local cache to avoid
                // a refresh loop (see comment on loadBitmapCached).
                return loadBitmapCached('icon/icon.png');
            case 'custom':
                // ImageManager.loadPicture caches internally.
                return customName ? ImageManager.loadPicture(customName) : null;
            case 'snapshot':
                return info && info.snapshot ? loadBitmapCached(info.snapshot) : null;
        }
        return null;
    };

    // Crop the centre of `bitmap` to a square, then scale to `size`x`size`.
    Window_SavefileList.prototype.kbBltCropToFit = function(bitmap, x, y, size) {
        const sw = bitmap.width;
        const sh = bitmap.height;
        if (!sw || !sh) return;
        const side = Math.min(sw, sh);
        const sx = Math.floor((sw - side) / 2);
        const sy = Math.floor((sh - side) / 2);
        this.contents.blt(bitmap, sx, sy, side, side, x, y, size, size);
    };
})();
