/*:
 * @target MZ
 * @plugindesc [v2.0] Tối ưu hóa hiệu năng & Giữ game luôn chạy (KB Edition).
 * @author KB (Modified by Gemini)
 *
 * @help
 * ============================================================================
 * ## GIỚI THIỆU
 * ============================================================================
 * Plugin này là giải pháp "All-in-One" giúp:
 * 1. Always Active: Game luôn chạy kể cả khi bạn Alt-Tab hoặc không click vào.
 * -> Khắc phục lỗi màn hình đen lúc khởi động.
 * 2. Anti-Lag: Tắt hiệu ứng Blur nặng nề của Menu.
 * 3. Smart Cache: Tăng bộ nhớ đệm giúp load ảnh nhanh hơn.
 * 4. Auto Clean: Tự dọn RAM khi chuyển cảnh.
 *
 * ============================================================================
 * @param --- Performance ---
 * @default
 *
 * @param Disable Menu Blur
 * @text Tắt làm mờ Menu
 * @desc Thay thế hiệu ứng Blur (nặng) bằng làm tối nền (nhẹ). Giúp mở menu mượt hơn.
 * @type boolean
 * @default true
 *
 * @param Image Cache Limit
 * @text Giới hạn Cache Ảnh (MB)
 * @desc Dung lượng RAM tối đa để lưu ảnh. (Mặc định MZ là rất thấp).
 * @type number
 * @default 50
 *
 * @param Clean on Scene Change
 * @text Dọn RAM khi đổi cảnh
 * @desc Bắt buộc dọn rác bộ nhớ khi chuyển Map/Battle.
 * @type boolean
 * @default true
 *
 * @param --- Focus Fix ---
 * @default
 *
 * @param Always Active
 * @text Luôn chạy nền
 * @desc Giữ game chạy kể cả khi mất tiêu điểm (Alt-Tab). Fix lỗi phải click chuột mới lên hình.
 * @type boolean
 * @default true
 */

(() => {
    const pluginName = "KB_Optimized";
    const params = PluginManager.parameters(pluginName);
    
    // Parse Parameters
    const disableBlur = params['Disable Menu Blur'] === 'true';
    const cacheLimit = Number(params['Image Cache Limit'] || 50);
    const cleanOnScene = params['Clean on Scene Change'] === 'true';
    const alwaysActive = params['Always Active'] === 'true';

    // ======================================================================
    // 1. ALWAYS ACTIVE & AUDIO FIX (Chống màn hình đen)
    // ======================================================================
    if (alwaysActive) {
        // Đánh lừa game rằng cửa sổ luôn được Focus
        SceneManager.isGameActive = function() {
            return true;
        };

        // Ngăn chặn việc tắt tiếng khi ẩn cửa sổ
        if (WebAudio) {
            WebAudio._shouldMuteOnVisibilityChange = function() {
                return false;
            };
        }

        // Cố gắng kích hoạt Audio Context ngay lập tức
        const _SceneManager_run = SceneManager.run;
        SceneManager.run = function(sceneClass) {
            _SceneManager_run.call(this, sceneClass);
            if (WebAudio && WebAudio._context && WebAudio._context.state === 'suspended') {
                WebAudio._context.resume().then(() => {
                    // Audio Resumed
                }).catch(() => {});
            }
        };
    }

    // ======================================================================
    // 2. OPTIMIZE IMAGE CACHE (Tăng bộ nhớ đệm)
    // ======================================================================
    if (ImageManager && ImageManager._imageCache) {
        // Chuyển đổi MB sang Bytes
        const limitBytes = cacheLimit * 1000 * 1000;
        ImageManager._imageCache._limit = limitBytes;
    }

    // ======================================================================
    // 3. REMOVE MENU BLUR (Xóa hiệu ứng làm mờ)
    // ======================================================================
    if (disableBlur) {
        // Ghi đè hàm tạo background của Menu
        Scene_MenuBase.prototype.createBackground = function() {
            this._backgroundSprite = new Sprite();
            // Dùng snap thường thay vì snapBlur
            this._backgroundSprite.bitmap = SceneManager.backgroundBitmap();
            // Phủ màu đen bán trong suốt (nhẹ hơn Blur)
            this._backgroundSprite.setColorTone([0, 0, 0, 128]); 
            this.addChild(this._backgroundSprite);
        };

        // Ngăn chặn việc gọi Blur gốc
        SceneManager.snapForBackground = function() {
            this._backgroundBitmap = this.snap();
        };
    }

    // ======================================================================
    // 4. SMART GARBAGE COLLECTION (Dọn dẹp RAM)
    // ======================================================================
    if (cleanOnScene) {
        const _SceneManager_changeScene = SceneManager.changeScene;
        SceneManager.changeScene = function() {
            if (this.isSceneChanging() && !this.isCurrentSceneBusy()) {
                if (ImageManager) {
                    ImageManager.clear(); 
                }
                if (window.gc) {
                    window.gc();
                }
            }
            _SceneManager_changeScene.call(this);
        };
    }

    // ======================================================================
    // 5. PRELOAD AUDIO (Giảm độ trễ âm thanh)
    // ======================================================================
    const _DataManager_loadSystemImages = DataManager.loadDatabase;
    DataManager.loadDatabase = function() {
        const test = _DataManager_loadSystemImages.call(this);
        if (AudioManager) {
            const commonSE = ["Cursor1", "Cursor2", "Decision1", "Decision2", "Cancel1", "Cancel2", "Buzzer1"];
            commonSE.forEach(seName => {
                const se = { name: seName, pan: 0, pitch: 100, volume: 90 };
                AudioManager.loadStaticSe(se);
            });
        }
        return test;
    };

})();