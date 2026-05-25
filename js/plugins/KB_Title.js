/*:
 * @target MZ
 * @plugindesc (v2.2 FIX) Custom Title Screen phong cách KB - Fix lỗi đứng hình Phase 2.
 * @author Gemini Expert Dev
 * @help
 * ============================================================================
 * HƯỚNG DẪN SỬ DỤNG
 * ============================================================================
 * 1. Cài đặt Hình Ảnh:
 * - Nếu bạn có ảnh: Chọn file trong phần tham số.
 * - Nếu CHƯA có ảnh: Hãy XÓA TRẮNG tên file trong tham số. 
 *
 * 2. Cài đặt Font Chữ:
 * - Điền tên Font vào "Menu Font Name". 
 *
 * ============================================================================
 *
 * @param --- Cấu hình Hình Ảnh ---
 *
 * @param Blue BG Image
 * @text Ảnh Nền Xanh (Phase 1)
 * @type file
 * @dir img/pictures
 * @desc Để trống sẽ tự tạo nền Xanh Dương.
 * @default Title_BlueBG
 *
 * @param Pink BG Image
 * @text Ảnh Nền Hồng (Phase 2)
 * @type file
 * @dir img/pictures
 * @desc Để trống sẽ tự tạo nền Hồng.
 * @default Title_PinkBG
 *
 * @param Logo Image
 * @text Ảnh Logo (KB)
 * @type file
 * @dir img/pictures
 * @desc Để trống sẽ tự tạo khung chữ LOGO.
 * @default KB_Logo
 *
 * @param Strip Image
 * @text Ảnh Dải Nhân Vật
 * @type file
 * @dir img/pictures
 * @desc Để trống sẽ tự tạo dải màu Xám.
 * @default Title_CharStrip
 *
 * @param Hero Image
 * @text Ảnh Hero (Phase 2)
 * @type file
 * @dir img/pictures
 * @desc Để trống sẽ tự tạo khối nhân vật.
 * @default Title_Hero
 *
 * @param Press Start Image
 * @text Ảnh Chữ Press Start
 * @type file
 * @dir img/pictures
 * @desc Để trống sẽ tự tạo chữ Press Start.
 * @default Title_PressStart
 *
 * @param --- Cấu hình Menu & Font ---
 * @param Menu Font Name
 * @text Tên Font Menu
 * @type string
 * @desc Tên font chữ (VD: Arial, Roboto). Để trống sẽ dùng font mặc định.
 * @default 
 *
 * @param Menu Font Size
 * @text Cỡ Chữ Menu
 * @type number
 * @desc Kích thước chữ menu.
 * @default 26
 *
 * @param Menu X
 * @text Vị trí X của Menu
 * @type number
 * @desc Tọa độ ngang của menu.
 * @default 100
 *
 * @param Menu Y
 * @text Vị trí Y của Menu
 * @type number
 * @desc Tọa độ dọc của menu.
 * @default 350
 */

(() => {
    const pluginName = "KB_Title"; 
    const parameters = PluginManager.parameters(pluginName);

    const getParam = (name) => {
        const val = parameters[name];
        return (val && val.trim() !== "") ? val : null;
    };

    const pBlueBG = getParam("Blue BG Image");
    const pPinkBG = getParam("Pink BG Image");
    const pLogo = getParam("Logo Image");
    const pStrip = getParam("Strip Image");
    const pHero = getParam("Hero Image");
    const pPressStart = getParam("Press Start Image");
    
    const pMenuFont = getParam("Menu Font Name");
    const pMenuFontSize = Number(parameters["Menu Font Size"] || 26);
    const pMenuX = Number(parameters["Menu X"] || 100);
    const pMenuY = Number(parameters["Menu Y"] || 350);

    // ------------------------------------------------------------------------
    // Helper: Tạo ảnh dự phòng
    // ------------------------------------------------------------------------
    function loadSafeBitmap(filename, width, height, color, text = "") {
        if (filename) {
            return ImageManager.loadPicture(filename);
        } else {
            const bmp = new Bitmap(width, height);
            bmp.fillAll(color);
            if (text) {
                bmp.fontSize = 30;
                bmp.textColor = "#ffffff";
                bmp.drawText(text, 0, 0, width, height, "center");
            }
            return bmp;
        }
    }

    // ------------------------------------------------------------------------
    // Scene_Title Override
    // ------------------------------------------------------------------------

    const _Scene_Title_create = Scene_Title.prototype.create;
    Scene_Title.prototype.create = function() {
        _Scene_Title_create.call(this);
        this._phase = 0; 
    };

    // Ngăn chặn lỗi tìm kiếm bitmap mặc định
    Scene_Title.prototype.start = function() {
        Scene_Base.prototype.start.call(this);
        SceneManager.clearStack();
        this.playTitleMusic();
        this.startFadeIn(this.fadeSpeed(), false);
    };

    Scene_Title.prototype.createBackground = function() {
        // Layer 1
        this._backBlue = new TilingSprite();
        this._backBlue.bitmap = loadSafeBitmap(pBlueBG, Graphics.width, Graphics.height, "#2196F3");
        this._backBlue.move(0, 0, Graphics.width, Graphics.height);
        this.addChild(this._backBlue);

        // Layer 2
        this._stripSprite = new Sprite();
        this._stripSprite.bitmap = loadSafeBitmap(pStrip, Graphics.width, 200, "#607D8B", "CHARACTERS STRIP");
        this._stripSprite.anchor.set(0.5, 0.5);
        this._stripSprite.x = Graphics.width / 2;
        this._stripSprite.y = Graphics.height / 2; 
        this.addChild(this._stripSprite);

        // Layer 3
        this._backPink = new Sprite();
        this._backPink.bitmap = loadSafeBitmap(pPinkBG, Graphics.width, Graphics.height, "#E91E63");
        this._backPink.opacity = 0; 
        this.addChild(this._backPink);

        // Layer 4
        this._heroSprite = new Sprite();
        this._heroSprite.bitmap = loadSafeBitmap(pHero, 400, 600, "#9C27B0", "HERO ART");
        this._heroSprite.anchor.set(1, 1); 
        this._heroSprite.x = Graphics.width + 400; // Xuất phát xa hơn chút để trượt vào
        this._heroSprite.y = Graphics.height;
        this.addChild(this._heroSprite);
    };

    Scene_Title.prototype.createForeground = function() {
        // Logo
        this._gameTitleSprite = new Sprite();
        this._gameTitleSprite.bitmap = loadSafeBitmap(pLogo, 400, 150, "rgba(0,0,0,0.5)", "LOGO KB");
        this._gameTitleSprite.anchor.set(0.5, 0);
        this._gameTitleSprite.x = Graphics.width / 2;
        this._gameTitleSprite.y = 60;
        this.addChild(this._gameTitleSprite);

        // Press Start
        this._pressStartSprite = new Sprite();
        if (pPressStart) {
            this._pressStartSprite.bitmap = ImageManager.loadPicture(pPressStart);
        } else {
            const bmp = new Bitmap(400, 50);
            bmp.fontSize = 36;
            bmp.fontBold = true;
            bmp.drawText("- PRESS START -", 0, 0, 400, 50, "center");
            this._pressStartSprite.bitmap = bmp;
        }
        this._pressStartSprite.anchor.set(0.5, 1);
        this._pressStartSprite.x = Graphics.width / 2;
        this._pressStartSprite.y = Graphics.height - 100;
        this._pressStartBlink = 0;
        this.addChild(this._pressStartSprite);
    };

    const _Scene_Title_createCommandWindow = Scene_Title.prototype.createCommandWindow;
    Scene_Title.prototype.createCommandWindow = function() {
        _Scene_Title_createCommandWindow.call(this);
        // Đảm bảo window ẩn và đóng hoàn toàn khi bắt đầu
        this._commandWindow.close();
        this._commandWindow.deactivate();
        this._commandWindow.visible = false;
        
        this._commandWindow.x = pMenuX;
        this._commandWindow.y = pMenuY;
        this._commandWindow.setBackgroundType(2); 
    };

    // [QUAN TRỌNG] Ghi đè hoàn toàn logic Update để tránh xung đột
    Scene_Title.prototype.update = function() {
        // Gọi update của Scene_Base (để update Input, Sound, Timer...)
        // KHÔNG gọi _Scene_Title_update gốc vì nó sẽ tự động mở menu
        Scene_Base.prototype.update.call(this);

        if (this._phase === 0) {
            this.updatePressStartAnimation();
            if (Input.isTriggered("ok") || TouchInput.isTriggered()) {
                this.transitionToPhaseTwo();
            }
        } else if (this._phase === 1) {
            this.updateTransitionAnimation();
        } 
        // Phase 2 không cần làm gì đặc biệt, Scene_Base đã tự update Window
    };

    Scene_Title.prototype.updatePressStartAnimation = function() {
        this._pressStartBlink = (this._pressStartBlink + 1) % 60;
        this._pressStartSprite.opacity = (this._pressStartBlink < 30) ? 255 : 100;
        
        if (this._backBlue.origin) {
            this._backBlue.origin.x += 1;
            this._backBlue.origin.y += 0.5;
        }
    };

    Scene_Title.prototype.transitionToPhaseTwo = function() {
        SoundManager.playOk();
        this._phase = 1;
        // Chuẩn bị sẵn window nhưng chưa mở
        this._commandWindow.visible = true; 
    };

    Scene_Title.prototype.updateTransitionAnimation = function() {
        // 1. Fade Backgrounds
        if (this._backPink.opacity < 255) this._backPink.opacity += 15;
        if (this._stripSprite.opacity > 0) {
            this._stripSprite.opacity -= 15;
            this._stripSprite.scale.x += 0.01;
            this._stripSprite.scale.y += 0.01;
        }
        this._pressStartSprite.opacity = 0;

        // 2. Slide Hero Logic (Có fix Snap vị trí)
        const targetX = Graphics.width;
        if (this._heroSprite.x > targetX) {
            // Di chuyển
            this._heroSprite.x -= (this._heroSprite.x - targetX) * 0.15;
            
            // [FIX] Nếu còn cách đích < 1 pixel thì gán bằng đích luôn để kết thúc animation
            if (this._heroSprite.x - targetX < 1) {
                this._heroSprite.x = targetX;
                this.openCommandMenu();
            }
        }
        
        // 3. Slide Logo
        const targetLogoX = (Graphics.width / 2) + 200;
        if (this._gameTitleSprite.x < targetLogoX) {
             this._gameTitleSprite.x += (targetLogoX - this._gameTitleSprite.x) * 0.1;
        }
    };

    Scene_Title.prototype.openCommandMenu = function() {
        // Chỉ mở nếu chưa mở
        if (this._phase !== 2) {
            this._phase = 2; // Set phase trước
            this._commandWindow.visible = true;
            this._commandWindow.open();
            this._commandWindow.activate(); // Kích hoạt điều khiển
        }
    };

    // ------------------------------------------------------------------------
    // Custom Font Logic
    // ------------------------------------------------------------------------
    
    Window_TitleCommand.prototype.itemTextAlign = function() {
        return "left";
    };

    const _Window_TitleCommand_resetFontSettings = Window_TitleCommand.prototype.resetFontSettings;
    Window_TitleCommand.prototype.resetFontSettings = function() {
        _Window_TitleCommand_resetFontSettings.call(this);
        if (pMenuFont && this.contents) {
            this.contents.fontFace = pMenuFont;
        }
        if (this.contents) {
            this.contents.fontSize = pMenuFontSize;
        }
    };

})();