/*:
 * @target MZ
 * @plugindesc [v2.0] Title Screen động: Hỗ trợ nút bấm bằng Hình Ảnh (Image Commands) & Press Start.
 * @author KB
 * @url https://github.com/KB-Developer
 *
 * @help
 * ============================================================================
 * KB_AnimatedTitle.js (Version 2.0)
 * ============================================================================
 *
 * TÍNH NĂNG MỚI V2.0:
 * - Cho phép dùng file ảnh thay thế cho menu chữ nhàm chán.
 * - Hiệu ứng Zoom khi trỏ vào nút bấm.
 *
 * HƯỚNG DẪN SỬ DỤNG:
 * 1. Bỏ ảnh vào thư mục "img/pictures/".
 * 2. Cấu hình tên file trong phần "Cấu hình Nút Bấm (Hình Ảnh)".
 * 3. Nếu muốn dùng lại menu chữ mặc định, hãy set "Use Image Buttons" = false.
 *
 * ============================================================================
 *
 * @param --- Cấu hình Chung ---
 *
 * @param Background Image
 * @text Ảnh Nền
 * @desc Tên file ảnh nền (img/pictures). Để trống để dùng mặc định.
 * @type file
 * @dir img/pictures
 *
 * @param Logo Image
 * @text Ảnh Logo Game
 * @desc Tên file ảnh Logo (img/pictures).
 * @type file
 * @dir img/pictures
 *
 * @param Character Image
 * @text Ảnh Nhân Vật
 * @desc Tên file ảnh nhân vật bên phải.
 * @type file
 * @dir img/pictures
 *
 * @param --- Cấu hình Press Start ---
 *
 * @param Press Start Text
 * @text Dòng chữ Press Start
 * @desc Nội dung dòng chữ nhấp nháy.
 * @default - PRESS START -
 *
 * @param Start Text Y
 * @text Tọa độ Y Press Start
 * @desc Độ cao dòng chữ Press Start.
 * @type number
 * @default 500
 *
 * @param --- Cấu hình Nút Bấm (Hình Ảnh) ---
 *
 * @param Use Image Buttons
 * @text Dùng Nút Hình Ảnh?
 * @desc Chọn true để dùng hình ảnh thay cho chữ. Chọn false để dùng menu chữ mặc định.
 * @type boolean
 * @default true
 *
 * @param Btn NewGame
 * @text Ảnh Nút New Game
 * @desc Tên file ảnh cho nút New Game.
 * @type file
 * @dir img/pictures
 * @default Cmd_NewGame
 *
 * @param Btn Continue
 * @text Ảnh Nút Continue
 * @desc Tên file ảnh cho nút Continue.
 * @type file
 * @dir img/pictures
 * @default Cmd_Continue
 *
 * @param Btn Options
 * @text Ảnh Nút Options
 * @desc Tên file ảnh cho nút Options.
 * @type file
 * @dir img/pictures
 * @default Cmd_Options
 *
 * @param Btn Shutdown
 * @text Ảnh Nút Shutdown
 * @desc Tên file ảnh cho nút Thoát Game.
 * @type file
 * @dir img/pictures
 * @default Cmd_Shutdown
 *
 * @param Button Spacing
 * @text Khoảng cách nút
 * @desc Khoảng cách giữa các nút (theo chiều dọc).
 * @type number
 * @default 60
 *
 * @param --- Cấu hình Vị trí Menu ---
 *
 * @param Menu Offset X
 * @text Vị trí Menu X
 * @desc Tọa độ X của menu (cả chữ hoặc ảnh).
 * @type number
 * @default 100
 *
 * @param Menu Offset Y
 * @text Vị trí Menu Y
 * @desc Tọa độ Y của menu.
 * @type number
 * @default 400
 *
 * @param Character X
 * @text Vị trí Nhân vật X
 * @type number
 * @default 800
 *
 * @param Character Y
 * @text Vị trí Nhân vật Y
 * @type number
 * @default 150
 *
 */

(() => {
    "use strict";

    const pluginName = "KB_AnimatedTitle";
    const parameters = PluginManager.parameters(pluginName);

    // --- Lấy dữ liệu tham số ---
    const pBackgroundImg = parameters["Background Image"] || "";
    const pLogoImg = parameters["Logo Image"] || "";
    const pCharImg = parameters["Character Image"] || "";
    
    const pPressStartText = parameters["Press Start Text"] || "- PRESS START -";
    const pStartTextY = Number(parameters["Start Text Y"] || 500);
    
    // Config Menu Vị trí
    const pMenuX = Number(parameters["Menu Offset X"] || 100);
    const pMenuY = Number(parameters["Menu Offset Y"] || 400);
    
    // Config Image Buttons
    const pUseImageBtns = parameters["Use Image Buttons"] === "true";
    const pBtnImages = {
        newGame: parameters["Btn NewGame"] || "",
        continue: parameters["Btn Continue"] || "",
        options: parameters["Btn Options"] || "",
        shutdown: parameters["Btn Shutdown"] || "" // Dành cho game PC
    };
    const pBtnSpacing = Number(parameters["Button Spacing"] || 60);

    const pCharX = Number(parameters["Character X"] || 800);
    const pCharY = Number(parameters["Character Y"] || 150);

    // ==============================================================================
    // Scene_Title Modifications
    // ==============================================================================

    const _Scene_Title_create = Scene_Title.prototype.create;
    Scene_Title.prototype.create = function() {
        _Scene_Title_create.call(this);
        
        this._kbPressStartState = true;
        this._kbImageButtons = []; // Mảng chứa các nút hình ảnh

        this.createKBLogo();       
        this.createKBCharacter();  
        this.createKBPressStart(); 
        
        // Nếu dùng Image Buttons, ta cần tạo chúng (nhưng ẩn đi cho đến khi nhấn Start)
        if (pUseImageBtns) {
            this.createKBImageButtons();
        }

        // Ẩn window gốc
        if (this._commandWindow) {
            this._commandWindow.visible = false;
            this._commandWindow.deactivate();
            this._commandWindow.close();
            
            // Nếu dùng Image Buttons, ta làm window gốc "vô hình" hoàn toàn
            // nhưng vẫn giữ nó hoạt động ngầm để nhận nút bấm
            if (pUseImageBtns) {
                this._commandWindow.opacity = 0;
                this._commandWindow.contentsOpacity = 0;
            }
        }
    };

    // --- Background (Fix V1.1) ---
    const _Scene_Title_createBackground = Scene_Title.prototype.createBackground;
    Scene_Title.prototype.createBackground = function() {
        if (!pBackgroundImg) {
            _Scene_Title_createBackground.call(this);
        } else {
            this._backSprite1 = new Sprite(ImageManager.loadPicture(pBackgroundImg));
            this._backSprite2 = new Sprite(new Bitmap(1, 1)); 
            this.addChild(this._backSprite1);
            this.addChild(this._backSprite2);
        }
    };
    
    Scene_Title.prototype.createKBLogo = function() {
        if (pLogoImg) {
            this._kbLogoSprite = new Sprite(ImageManager.loadPicture(pLogoImg));
            this._kbLogoSprite.anchor.x = 0.5;
            this._kbLogoSprite.x = Graphics.width / 2;
            this._kbLogoSprite.y = 50;
            this.addChild(this._kbLogoSprite);
            if (this._gameTitleSprite) this._gameTitleSprite.visible = false;
        }
    };

    Scene_Title.prototype.createKBCharacter = function() {
        if (pCharImg) {
            this._kbCharSprite = new Sprite(ImageManager.loadPicture(pCharImg));
            this._kbCharSprite.x = pCharX;
            this._kbCharSprite.y = pCharY;
            this._kbCharSprite.opacity = 0;
            this.addChild(this._kbCharSprite);
        }
    };

    Scene_Title.prototype.createKBPressStart = function() {
        const width = Graphics.width || 816;
        this._kbStartSprite = new Sprite(new Bitmap(width, 100));
        const fontFace = $gameSystem ? $gameSystem.mainFontFace() : 'rmmz-mainfont';
        this._kbStartSprite.bitmap.fontFace = fontFace;
        this._kbStartSprite.bitmap.fontSize = 32;
        this._kbStartSprite.bitmap.outlineColor = 'black';
        this._kbStartSprite.bitmap.outlineWidth = 4;
        this._kbStartSprite.bitmap.drawText(pPressStartText, 0, 0, width, 100, 'center');
        this._kbStartSprite.y = pStartTextY;
        this._kbStartSprite.opacity = 0;
        this._kbStartFadeDir = 5;
        this.addChild(this._kbStartSprite);
    };

    // --- Tạo nút bấm bằng hình ảnh (Logic mới V2.0) ---
    Scene_Title.prototype.createKBImageButtons = function() {
        // Chúng ta sẽ lấy danh sách lệnh từ commandWindow (dù nó chưa hiện)
        // Tuy nhiên ở giai đoạn create, commandWindow chưa có list commands nếu chưa gọi makeCommandList
        // Nên ta sẽ tạo sprite holder trước, và update hình ảnh trong hàm update
    };
    
    // Hàm helper để tạo sprite nút bấm sau khi window đã load xong command list
    Scene_Title.prototype.setupImageButtons = function() {
        if (this._imageButtonsInitialized) return;
        
        const list = this._commandWindow._list; // Danh sách lệnh (New Game, Continue...)
        if (!list || list.length === 0) return;

        list.forEach((command, index) => {
            const symbol = command.symbol; // 'newGame', 'continue', 'options'
            const imgName = pBtnImages[symbol] || ""; // Tìm ảnh tương ứng
            
            let sprite;
            if (imgName) {
                sprite = new Sprite(ImageManager.loadPicture(imgName));
            } else {
                // Fallback: Nếu không có ảnh, vẽ text tạm (để không bị lỗi tàng hình)
                sprite = new Sprite(new Bitmap(200, 50));
                sprite.bitmap.fontSize = 24;
                sprite.bitmap.drawText(command.name, 0, 0, 200, 50, 'left');
            }
            
            sprite.x = pMenuX;
            sprite.y = pMenuY + (index * pBtnSpacing);
            sprite.opacity = 0; // Ẩn ban đầu
            sprite.scale.x = 1.0;
            sprite.scale.y = 1.0;
            
            this.addChild(sprite);
            this._kbImageButtons.push(sprite);
        });
        
        this._imageButtonsInitialized = true;
    };

    // --- Override Update ---
    const _Scene_Title_update = Scene_Title.prototype.update;
    Scene_Title.prototype.update = function() {
        if (this._kbPressStartState) {
            // -- GIAI ĐOẠN 1: PRESS START --
            this.updatePressStartAnimation();
            if (Input.isTriggered("ok") || Input.isTriggered("cancel") || TouchInput.isTriggered()) {
                this.transitionToMenu();
            }
            Scene_Base.prototype.update.call(this);
            
        } else {
            // -- GIAI ĐOẠN 2: MENU --
            _Scene_Title_update.call(this);
            
            // Fade in nhân vật
            if (this._kbCharSprite && this._kbCharSprite.opacity < 255) {
                this._kbCharSprite.opacity += 10;
            }
            
            // Xử lý Image Buttons (nếu bật)
            if (pUseImageBtns) {
                // Đảm bảo nút đã được tạo
                this.setupImageButtons();
                this.updateImageButtonsState();
            }
        }
    };

    Scene_Title.prototype.updateImageButtonsState = function() {
        const currentIndex = this._commandWindow.index(); // Lấy vị trí đang chọn ở menu ngầm
        
        this._kbImageButtons.forEach((sprite, index) => {
            // Hiện từ từ
            if (sprite.opacity < 255) sprite.opacity += 20;
            
            // Hiệu ứng Hover/Select
            if (index === currentIndex) {
                // Đang chọn: Phóng to nhẹ
                if (sprite.scale.x < 1.1) {
                    sprite.scale.x += 0.02;
                    sprite.scale.y += 0.02;
                }
                sprite.setColorTone([20, 20, 20, 0]); // Sáng hơn chút (tùy chỉnh)
            } else {
                // Không chọn: Về bình thường
                if (sprite.scale.x > 1.0) {
                    sprite.scale.x -= 0.02;
                    sprite.scale.y -= 0.02;
                }
                sprite.setColorTone([0, 0, 0, 0]);
                sprite.opacity = 150; // Làm mờ các nút không chọn
            }
        });
    };

    Scene_Title.prototype.updatePressStartAnimation = function() {
        if (!this._kbStartSprite) return;
        this._kbStartSprite.opacity += this._kbStartFadeDir;
        if (this._kbStartSprite.opacity >= 255 || this._kbStartSprite.opacity <= 0) {
            this._kbStartFadeDir *= -1;
        }
    };

    Scene_Title.prototype.transitionToMenu = function() {
        SoundManager.playOk();
        this._kbPressStartState = false;
        if (this._kbStartSprite) this._kbStartSprite.visible = false;
        
        if (this._commandWindow) {
            this._commandWindow.visible = true; // Cần bật visible để logic chạy
            this._commandWindow.open();
            this._commandWindow.activate();
            
            if (pUseImageBtns) {
                // Nếu dùng ảnh, ta set opacity window về 0 để nó tàng hình
                // nhưng vẫn giữ visible = true để nhận phím bấm
                this._commandWindow.opacity = 0;
                this._commandWindow.contentsOpacity = 0;
            }
        }
    };

    // --- Override Window Placement ---
    const _Window_TitleCommand_updatePlacement = Window_TitleCommand.prototype.updatePlacement;
    Window_TitleCommand.prototype.updatePlacement = function() {
        _Window_TitleCommand_updatePlacement.call(this);
        
        // Luôn set vị trí window về đúng chỗ (dù có thể nó đang tàng hình)
        this.x = pMenuX;
        this.y = pMenuY;
        
        // Nếu không dùng Image Button mà dùng Text thường -> làm trong suốt khung viền
        if (!pUseImageBtns) {
            this.opacity = 0;
            this.contentsOpacity = 255;
            this.setBackgroundType(2);
        }
    };

})();