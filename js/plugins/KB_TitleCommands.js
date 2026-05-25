//=============================================================================
// KB_TitleCommands.js
//=============================================================================

/*:
 * @target MZ
 * @plugindesc (v2.7 Fix) Add Custom Text Content for "Press Start" & Fix Cursor X.
 * @author KB
 * @base KB_Core
 * @orderAfter KB_Core
 * * @help  
 * =============================================================================
 * +++ KB - Title Picture Commands (v2.7 Fix) +++
 * =============================================================================
 * YÊU CẦU:
 * - Plugin này cần "KB_CoreEngine" nằm ở trên nó trong danh sách Plugin.
 * * =============================================================================
 * CÁCH HOẠT ĐỘNG:
 * 1. Phase 1 (Press Start): 
 * - Nếu có ảnh "Press Start Image": Hiển thị ảnh.
 * - Nếu KHÔNG có ảnh: Hiển thị Text do bạn nhập (Content Text).
 * 2. Phase 2 (Main Menu): 
 * - Tự động đổi Background và hiển thị Menu lệnh.
 * =============================================================================
 *
 * @param ---<PHASE 1: PRESS START>---
 * @desc Cấu hình cho màn hình "Nhấn nút bất kỳ".
 *
 * @param Enable Phase 1
 * @text Enable Press Start
 * @desc Bật/Tắt màn hình chờ "Press Start".
 * @default true
 * @type boolean
 * @parent ---<PHASE 1: PRESS START>---
 *
 * @param Press Start Image
 * @text "Press Button" Image
 * @desc Tên file ảnh (trong img/titles2). ĐỂ TRỐNG nếu muốn hiện Text tùy chỉnh.
 * @default 
 * @parent ---<PHASE 1: PRESS START>---
 *
 * @param Phase 1 Character
 * @text Phase 1 Image/Char
 * @desc Tên file ảnh nhân vật/overlay RIÊNG cho Phase 1 (trong img/titles2).
 * @parent ---<PHASE 1: PRESS START>---
 *
 * @param P1 Char X
 * @desc Tọa độ X của ảnh Phase 1.
 * @default 0
 * @type number
 * @min -2000
 * @parent ---<PHASE 1: PRESS START>---
 *
 * @param P1 Char Y
 * @desc Tọa độ Y của ảnh Phase 1.
 * @default 0
 * @type number
 * @min -2000
 * @parent ---<PHASE 1: PRESS START>---
 *
 * @param ---<TEXT CONFIG (PHASE 1)>---
 * @desc Cấu hình nội dung và hiển thị chữ Press Start.
 *
 * @param PS Text String
 * @text Content Text
 * @desc Nội dung dòng chữ thông báo.
 * @default - PRESS ANY BUTTON -
 * @parent ---<TEXT CONFIG (PHASE 1)>---
 *
 * @param PS Font Face
 * @text Font Name
 * @desc Tên Font chữ. Để trống sẽ dùng font mặc định.
 * @parent ---<TEXT CONFIG (PHASE 1)>---
 *
 * @param PS Font Size
 * @text Font Size
 * @desc Kích thước chữ.
 * @default 32
 * @type number
 * @parent ---<TEXT CONFIG (PHASE 1)>---
 *
 * @param PS Text Color
 * @text Text Color
 * @desc Mã màu Hex hoặc tên màu.
 * @default #ffffff
 * @parent ---<TEXT CONFIG (PHASE 1)>---
 *
 * @param PS Outline Color
 * @text Outline Color
 * @desc Màu viền chữ.
 * @default rgba(0, 0, 0, 0.6)
 * @parent ---<TEXT CONFIG (PHASE 1)>---
 *
 * @param PS Outline Width
 * @text Outline Width
 * @desc Độ dày viền chữ.
 * @default 4
 * @type number
 * @parent ---<TEXT CONFIG (PHASE 1)>---
 *
 * @param Press Start X
 * @desc Tọa độ X của dòng Text (hoặc ảnh).
 * @default 408
 * @type number
 * @parent ---<TEXT CONFIG (PHASE 1)>---
 *
 * @param Press Start Y
 * @desc Tọa độ Y của dòng Text (hoặc ảnh).
 * @default 400
 * @type number
 * @parent ---<TEXT CONFIG (PHASE 1)>---
 *
 * @param ---<PHASE 2: MAIN MENU>---
 * @desc Cấu hình cho màn hình menu chính (Sau khi đã nhấn nút).
 *
 * @param Phase 2 Background 1
 * @text Phase 2 Background (Titles1)
 * @desc Tên file ảnh nền lớp 1 cho Phase 2 (trong img/titles1). ĐỂ TRỐNG nếu không muốn đổi.
 * @parent ---<PHASE 2: MAIN MENU>---
 *
 * @param Phase 2 Background 2
 * @text Phase 2 Frame (Titles2)
 * @desc Tên file ảnh nền lớp 2 cho Phase 2 (trong img/titles2). ĐỂ TRỐNG nếu không muốn đổi.
 * @parent ---<PHASE 2: MAIN MENU>---
 *
 * @param Phase 2 Character
 * @text Phase 2 Image/Char
 * @desc Tên file ảnh nhân vật/overlay RIÊNG cho Phase 2 (trong img/titles2).
 * @parent ---<PHASE 2: MAIN MENU>---
 *
 * @param P2 Char X
 * @desc Tọa độ X của ảnh Phase 2.
 * @default 0
 * @type number
 * @min -2000
 * @parent ---<PHASE 2: MAIN MENU>---
 *
 * @param P2 Char Y
 * @desc Tọa độ Y của ảnh Phase 2.
 * @default 0
 * @type number
 * @min -2000
 * @parent ---<PHASE 2: MAIN MENU>---
 *
 * @param ---<COMMAND SETTINGS>---
 * @desc
 * * @param Animation Mode
 * @desc Hiệu ứng khi chọn lệnh. 0: None, 1: Pulse, 2: Shake
 * @default 1
 * @type select
 * @option None
 * @value 0
 * @option Pulse Effect
 * @value 1
 * @option Shake Effect
 * @value 2
 * @parent ---<COMMAND SETTINGS>---
 * * @param Left & Right Input
 * @text Support Horizontal Menu
 * @desc Cho phép dùng nút Trái/Phải để chọn lệnh.
 * @default true
 * @type boolean
 * @parent ---<COMMAND SETTINGS>---
 * * @param Shake Duration
 * @desc Thời gian rung (nếu Mode là 2).
 * @default 30
 * @type number
 * @parent ---<COMMAND SETTINGS>---
 * * @param Slide X-Axis
 * @desc Độ trượt X ban đầu khi hiện menu.
 * @default -100
 * @min -2000
 * @parent ---<COMMAND SETTINGS>---
 * * @param Slide Y-Axis
 * @desc Độ trượt Y ban đầu khi hiện menu.
 * @default 0
 * @min -2000
 * @parent ---<COMMAND SETTINGS>---
 * * @param ---<CURSOR SETTINGS>---
 * @desc
 * * @param Cursor X-Axis
 * @text X-Axis
 * @desc Điều chỉnh vị trí ngang con trỏ. (Số âm để dịch sang trái, dương sang phải).
 * @default 0
 * @min -2000
 * @parent ---<CURSOR SETTINGS>---
 *
 * @param Cursor Y-Axis
 * @text Y-Axis
 * @desc Điều chỉnh vị trí dọc con trỏ.
 * @default 5
 * @min -2000
 * @parent ---<CURSOR SETTINGS>---
 *
 * @param Cursor Visible
 * @text Visible
 * @desc Bật/Tắt hiển thị con trỏ.
 * @default true
 * @type boolean
 * @parent ---<CURSOR SETTINGS>---
 *
 * @param Cursor Wave Animation
 * @text Wave Animation
 * @desc Bật hiệu ứng trôi/lượn sóng cho con trỏ.
 * @default true
 * @type boolean
 * @parent ---<CURSOR SETTINGS>---
 *
 * @param Cursor Rotation Animation
 * @text Rotation Animation
 * @desc Bật hiệu ứng xoay con trỏ.
 * @default false
 * @type boolean
 * @parent ---<CURSOR SETTINGS>---
 *
 * @param Cursor Rotation Speed
 * @text Rotation Speed
 * @desc Tốc độ xoay.
 * @default 0.05
 * @parent ---<CURSOR SETTINGS>---
 * * @param ---<COMMAND POSITIONS>---
 * * @param Command Pos 1
 * @desc Format: X,Y. Vị trí lệnh 1.
 * @default 180,440
 * @parent ---<COMMAND POSITIONS>---
 *
 * @param Command Pos 2
 * @desc Format: X,Y. Vị trí lệnh 2.
 * @default 350,440
 * @parent ---<COMMAND POSITIONS>---
 *
 * @param Command Pos 3
 * @desc Format: X,Y. Vị trí lệnh 3.
 * @default 520,440
 * @parent ---<COMMAND POSITIONS>---
 *
 * @param Command Pos 4
 * @desc Format: X,Y. Vị trí lệnh 4.
 * @default 690,440
 * @parent ---<COMMAND POSITIONS>---
 *
 * @param Command Pos 5
 * @desc Format: X,Y. Vị trí lệnh 5.
 * @default 345,498
 * @parent ---<COMMAND POSITIONS>--- 
 *
 * @param Command Pos 6
 * @desc Format: X,Y. Vị trí lệnh 6.
 * @default 345,530
 * @parent ---<COMMAND POSITIONS>---
 *
 */

//=============================================================================
// ** PLUGIN PARAMETERS
//=============================================================================
var Imported = Imported || {};
Imported.KB_TitleCommands = true;

if (Imported.KB_Core && KB.Utils) {
    // Safe
} else {
    console.warn("KB_TitleCommands requires KB_CoreEngine.");
}

var KB = KB || {};
KB.parameters = PluginManager.parameters('KB_TitleCommands');

// --- Helper ---
KB.getParam = function(paramName, defaultVal) {
    return KB.parameters[paramName] || defaultVal;
};

// --- PHASE 1 SETTINGS ---
KB.title_phase1_enable = String(KB.parameters['Enable Phase 1'] || "true") === "true";
KB.title_pressStartImg = String(KB.parameters['Press Start Image'] || ""); 
KB.title_pressStartX = Number(KB.parameters['Press Start X'] || 408);
KB.title_pressStartY = Number(KB.parameters['Press Start Y'] || 400);

KB.title_p1_charImg = String(KB.parameters['Phase 1 Character'] || "");
KB.title_p1_charX = Number(KB.parameters['P1 Char X'] || 0);
KB.title_p1_charY = Number(KB.parameters['P1 Char Y'] || 0);

// --- TEXT CONFIG ---
KB.title_ps_text = String(KB.parameters['PS Text String'] || "- PRESS ANY BUTTON -"); // New v2.7
KB.title_ps_font = String(KB.parameters['PS Font Face'] || "");
KB.title_ps_size = Number(KB.parameters['PS Font Size'] || 32);
KB.title_ps_color = String(KB.parameters['PS Text Color'] || "#ffffff");
KB.title_ps_outlineColor = String(KB.parameters['PS Outline Color'] || "rgba(0, 0, 0, 0.6)");
KB.title_ps_outlineWidth = Number(KB.parameters['PS Outline Width'] || 4);


// --- PHASE 2 SETTINGS ---
KB.title_p2_bg1 = String(KB.parameters['Phase 2 Background 1'] || "");
KB.title_p2_bg2 = String(KB.parameters['Phase 2 Background 2'] || "");
KB.title_p2_charImg = String(KB.parameters['Phase 2 Character'] || "");
KB.title_p2_charX = Number(KB.parameters['P2 Char X'] || 0);
KB.title_p2_charY = Number(KB.parameters['P2 Char Y'] || 0);

// --- COMMAND SETTINGS ---
KB.title_comMode = Number(KB.parameters['Animation Mode'] || 1);
KB.title_shakeDuration = Number(KB.parameters['Shake Duration'] || 30);
KB.title_slideXaxis = Number(KB.parameters['Slide X-Axis'] || -100);
KB.title_slideYaxis = Number(KB.parameters['Slide Y-Axis'] || 0);   
KB.title_sideInput = String(KB.parameters['Left & Right Input'] || "true");

// --- CURSOR SETTINGS ---
KB.title_cursorVisible = String(KB.parameters['Cursor Visible'] || "true");
KB.title_cursorSlide = String(KB.parameters['Cursor Wave Animation'] || "true");
KB.title_cursorX = Number(KB.parameters['Cursor X-Axis'] || 0);
KB.title_cursorY = Number(KB.parameters['Cursor Y-Axis'] || 5); 
KB.title_cursorRot = String(KB.parameters['Cursor Rotation Animation'] || "false");
KB.title_cursorRotSpeed = Number(KB.parameters['Cursor Rotation Speed'] || 0.05);

KB.title_com_pos = [];
for (var i = 0; i < 10; i++) {
    KB.title_com_pos[i] = (KB.parameters['Command Pos ' + String(i + 1)] || null);
};  

//=============================================================================
// ■■■ Scene Title  ■■■
//=============================================================================

//==============================
// ♦ ALIAS ♦  Create
//==============================
var _KB_titleCom_create = Scene_Title.prototype.create;
Scene_Title.prototype.create = function() {
    _KB_titleCom_create.call(this);
    this._titlePhase = KB.title_phase1_enable ? 0 : 1;
    this.createPhaseGraphics();
    this.refreshPhaseVisibility();
};

//==============================
// ♦ ALIAS ♦  createCommandWindow
//==============================
var _KB_titleCom_createCommandWindow = Scene_Title.prototype.createCommandWindow;
Scene_Title.prototype.createCommandWindow = function() {
    _KB_titleCom_createCommandWindow.call(this);
    
    if (!this._titleField3) { this.createTitleField3(); }
    
    this.createTitlePictureCommands();
    this._sideInput = String(KB.title_sideInput) == "true";
    
    if (String(KB.title_cursorVisible) == "true") {
        this.createCursorCommand();
    }

    if (this._titlePhase === 0) {
        this._commandWindow.deactivate();
        this._commandWindow.visible = false;
    }
};

//==============================
// ♦ OVERRIDE ♦  isBusy
//==============================
var _KB_titleCom_isBusy = Scene_Title.prototype.isBusy;
Scene_Title.prototype.isBusy = function() {
    return _KB_titleCom_isBusy.call(this) || this._titlePhase === 0;
};

//==============================
// ♦ FUNCTION ♦  Hide All Elements
//==============================
Scene_Title.prototype.hideAllCustomSprites = function() {
    if (this._phase1Container) this._phase1Container.visible = false;
    if (this._titleField3) this._titleField3.visible = false;
    if (this._p1Character) this._p1Character.visible = false;
    if (this._p2Character) this._p2Character.visible = false;
    if (this._pressStartSprite) this._pressStartSprite.visible = false;
};

//==============================
// ♦ ALIAS ♦  Window Title Command - Process OK
//==============================
var _KB_Window_TitleCommand_processOk = Window_TitleCommand.prototype.processOk;
Window_TitleCommand.prototype.processOk = function() {
    _KB_Window_TitleCommand_processOk.call(this);
    if (SceneManager._scene instanceof Scene_Title && SceneManager._scene.hideAllCustomSprites) {
        SceneManager._scene.hideAllCustomSprites();
    }
};

//==============================
// ♦ ALIAS ♦  update
//==============================
var _KB_titleCom_update = Scene_Title.prototype.update;
Scene_Title.prototype.update = function() {
    _KB_titleCom_update.call(this);
    
    if (this._titlePhase === 0) {
        this.updatePhase0();
    } else {
        this.updatePicCommands();
    }
};

//==============================
// * Create Title Field 3
//==============================
Scene_Title.prototype.createTitleField3 = function() {
    this._titleField3 = new Sprite();
    this._titleField3.z = 200;
    this.addChild(this._titleField3);
};

//==============================
// * Create Phase Graphics (UPDATED v2.7)
//==============================
Scene_Title.prototype.createPhaseGraphics = function() {
    // --- Phase 1 Container ---
    this._phase1Container = new Sprite();
    this.addChild(this._phase1Container);

    // 1. Phase 1 Character
    if (KB.title_p1_charImg) {
        this._p1Character = new Sprite(ImageManager.loadTitle2(KB.title_p1_charImg));
        this._p1Character.x = KB.title_p1_charX;
        this._p1Character.y = KB.title_p1_charY;
        this._phase1Container.addChild(this._p1Character);
    }

    // 2. Press Start Sprite
    this._pressStartSprite = new Sprite();
    this._pressStartSprite.anchor.x = 0.5;
    this._pressStartSprite.anchor.y = 0.5;
    
    if (KB.title_pressStartImg && KB.title_pressStartImg !== "") {
        // Dùng ảnh
        this._pressStartSprite.bitmap = ImageManager.loadTitle2(KB.title_pressStartImg);
        this._pressStartSprite.x = KB.title_pressStartX;
        this._pressStartSprite.y = KB.title_pressStartY;
    } else {
        // Dùng Text Custom (v2.7 Update)
        var width = Graphics.width; 
        var height = KB.title_ps_size * 2;
        var bitmap = new Bitmap(width, height);
        
        bitmap.fontFace = KB.title_ps_font ? KB.title_ps_font : $gameSystem.mainFontFace();
        bitmap.fontSize = KB.title_ps_size;
        bitmap.textColor = KB.title_ps_color;
        bitmap.outlineColor = KB.title_ps_outlineColor;
        bitmap.outlineWidth = KB.title_ps_outlineWidth;
        
        // Dùng biến Text mới thay vì chuỗi cứng
        var content = KB.title_ps_text; 
        bitmap.drawText(content, 0, 0, width, height, "center");
        
        this._pressStartSprite.bitmap = bitmap;
        this._pressStartSprite.x = (KB.title_pressStartX === 408) ? Graphics.width / 2 : KB.title_pressStartX; 
        this._pressStartSprite.y = KB.title_pressStartY;
    }
    
    this._phase1Container.addChild(this._pressStartSprite);


    // --- Phase 2 Graphics ---
    if (KB.title_p2_charImg) {
        this._p2Character = new Sprite(ImageManager.loadTitle2(KB.title_p2_charImg));
        this._p2Character.x = KB.title_p2_charX;
        this._p2Character.y = KB.title_p2_charY;
        this._p2Character.z = 10;
        if (!this._titleField3) { this.createTitleField3(); }
        this._titleField3.addChildAt(this._p2Character, 0); 
    }
};

//==============================
// * Update Phase 0
//==============================
Scene_Title.prototype.updatePhase0 = function() {
    if (this._pressStartSprite) {
        this._pressStartSprite.opacity = 150 + Math.sin(Graphics.frameCount * 0.1) * 105;
    }

    if (this._commandWindow.active) {
        this._commandWindow.deactivate();
    }

    if (Input.isTriggered('ok') || Input.isTriggered('cancel') || TouchInput.isTriggered() || Input.dir4 !== 0) {
        this.transitionToPhase2();
    }
};

//==============================
// * Change Backgrounds to Phase 2
//==============================
Scene_Title.prototype.changeBackgroundsToPhase2 = function() {
    if (KB.title_p2_bg1 && KB.title_p2_bg1 !== "") {
        this._backSprite1.bitmap = ImageManager.loadTitle1(KB.title_p2_bg1);
    }
    if (KB.title_p2_bg2 && KB.title_p2_bg2 !== "") {
        this._backSprite2.bitmap = ImageManager.loadTitle2(KB.title_p2_bg2);
    }
};

//==============================
// * Transition Logic
//==============================
Scene_Title.prototype.transitionToPhase2 = function() {
    SoundManager.playOk();
    
    Input.clear();
    TouchInput.clear();

    this._titlePhase = 1;
    
    this.changeBackgroundsToPhase2();

    this.refreshPhaseVisibility();
    
    this._commandWindow.activate();
    
    if (this._TpictureCom) {
        this._TpictureCom.forEach(sprite => sprite.getData());
    }
};

//==============================
// * Refresh Visibility
//==============================
Scene_Title.prototype.refreshPhaseVisibility = function() {
    if (this._titlePhase === 0) {
        if (this._phase1Container) this._phase1Container.visible = true;
        if (this._titleField3) this._titleField3.visible = false;
        if (this._cursor) this._cursor.visible = false;
    } else {
        if (this._phase1Container) this._phase1Container.visible = false;
        if (this._titleField3) this._titleField3.visible = true;
        if (this._cursor && String(KB.title_cursorVisible) == "true") this._cursor.visible = true;
    }
};


//==============================
// * Standard Functions (No changes below)
//==============================
Scene_Title.prototype.createTitlePictureCommands = function() {
    this._picComE = false;
    this._TpictureCom = [];
    this._tComTouch = [TouchInput.x,TouchInput.y];
    this._picComIndex = this._commandWindow._index;
    for (i = 0; i < this._commandWindow._list.length; i++){
         this._TpictureCom[i] = new TpictureCom(this._commandWindow,i);
         this._TpictureCom[i].z = 300;
         this._titleField3.addChild(this._TpictureCom[i]);
    };
    this._commandWindow.x = -(Graphics.width * 2);  
};

Scene_Title.prototype.createCursorCommand = function() {
    this._cursorSlide = [0,0,0,false];
    if (String(KB.title_cursorSlide) == "true") {this._cursorSlide[3] = true};
    this._cursor = new Sprite(ImageManager.loadTitle2("Cursor"));
    this._cursor.anchor.x = 0.5;
    this._cursor.anchor.y = 0.5;
    this._cursor.org = [KB.title_cursorX,KB.title_cursorY]
    if (this._cursorSlide[3]) {this._cursor.org[0] -= 5}
    this._cursor.opacity = 0;
    this._cursor.z = 350;
    this._cursor.rot = [true,0.05];
    this._cursor.rot[0] = String(KB.title_cursorRot) == "true" ? true : false;
    this._cursor.rot[1] = KB.title_cursorRotSpeed;
    this._titleField3.addChild(this._cursor);
};

Scene_Title.prototype.updateTitleCursor = function() {
     if (this._cursorSlide[3]) {this.updateCursorSlide()};
     if (this._cursor.rot[0]) {this.updateCursorRotation()}; 
     this._cursor.opacity += 5;
     
     // [FIXED] Added this._cursor.org[0] to the calculation below
     var nx = this.comSprite().x - (this.comSprite().bitmap.width / 2) - (this._cursor.width / 2) + this._cursorSlide[0] + this._cursor.org[0];
     var ny = this.comSprite().y - (this.comSprite().bitmap.height / 2) + (this._cursor.height / 2) + this._cursor.org[1];
     
     this._cursor.x = this.cursorMoveto(this._cursor.x , nx, 10);
     this._cursor.y = this.cursorMoveto(this._cursor.y, ny, 10);
};

Scene_Title.prototype.comSprite = function() {
    return this._TpictureCom[this._commandWindow._index];
};

Scene_Title.prototype.updateCursorRotation = function() {
    this._cursor.rotation += this._cursor.rot[1];
};

Scene_Title.prototype.updateCursorSlide = function() {
     this._cursorSlide[1] ++
     if (this._cursorSlide[1] < 3) {return};
     this._cursorSlide[1] = 0
     this._cursorSlide[2] ++
     if (this._cursorSlide[2] < 15) {
         this._cursorSlide[0] ++;
     } else if (this._cursorSlide[2] < 30) {
         this._cursorSlide[0] --;
     } else {
         this._cursorSlide[0] = 0;
         this._cursorSlide[2] = 0;
     };
};

Scene_Title.prototype.cursorMoveto = function(value,real_value,speed) {
    if (value == real_value) {return value};
    var dnspeed = 5 + (Math.abs(value - real_value) / speed);
    if (value > real_value) {value -= dnspeed;
        if (value < real_value) {value = real_value};}
    else if (value < real_value) {value  += dnspeed;
        if (value  > real_value) {value  = real_value};     
    };
    return Math.floor(value);
};

Scene_Title.prototype.checkTPicCom = function() {
    for (i = 0; i < this._TpictureCom.length; i++){
         if (this._TpictureCom[i].isOnPicCom()) {
             this._commandWindow._index = i;
             if (this._picComIndex == this._commandWindow._index) {             
                  this._commandWindow.processOk();
             } else {
                  this._commandWindow.playCursorSound()
             };
             this._picComIndex = this._commandWindow._index 
         };
    };
};

Scene_Title.prototype.picComNeedCheckTouch = function() {
   if (this._tComTouch[0] != TouchInput.x) {return true};
   if (this._tComTouch[1] != TouchInput.y) {return true}; 
   return false;
};

Scene_Title.prototype.updateTitleTouchInputCom = function() {
    if (TouchInput.isTriggered()) {this.checkTPicCom()}; 
    if (this.picComNeedCheckTouch()) {this.updateTComMouseIsOnPic()};
    this._tComTouch = [TouchInput.x,TouchInput.y];
};

Scene_Title.prototype.updateComSideInput = function() {
    if (Input.isRepeated('right')) {
        this.addTitleComIndex(1);
    } else if (Input.isRepeated('left')) {
        this.addTitleComIndex(-1);
    };
};

Scene_Title.prototype.updateTComMouseIsOnPic = function() {
    var picID = -1;
    for (i = 0; i < this._TpictureCom.length; i++){
         if (this._TpictureCom[i].isOnPicCom()) {
             this._commandWindow._index = i;
             if (this._picComIndex != this._commandWindow._index) {             
                 this._commandWindow.playCursorSound();
             };
             this._picComIndex = this._commandWindow._index ;
         };
    };
};

Scene_Title.prototype.addTitleComIndex = function(value) {
    SoundManager.playCursor();
    var maxIndex = this._commandWindow._list.length - 1
    this._commandWindow._index += value;
    if (this._commandWindow._index < 0) {
        this._commandWindow._index = maxIndex;
    } else if (this._commandWindow._index > maxIndex) {
        this._commandWindow._index = 0;
    };
};

Scene_Title.prototype.updatePicCommands = function() {
     if (!this._picComE) {
         this.updateTitleTouchInputCom();
         if (this._sideInput) {this.updateComSideInput()};
     };
     if (this._cursor) {this.updateTitleCursor()};
     if (!this._picComE && this._commandWindow.isClosing()) {this._picComE = true;}
};

//=============================================================================
// ■■■ TpictureCom  ■■■
//=============================================================================
function TpictureCom() {
    this.initialize.apply(this, arguments);
};

TpictureCom.prototype = Object.create(Sprite.prototype);
TpictureCom.prototype.constructor = TpictureCom;

TpictureCom.prototype.initialize = function(data,index) {
    Sprite.prototype.initialize.call(this);
    this._index = index;
    this._data = data;
    this._index2 = this._data._index;
    this._wait = 5 * index;
    this.opacity = 0;
    this._aniData = {};
    this._aniData.mode = KB.title_comMode;
    this._aniData.zoomON = false;
    this._aniData.zoomMax = 1.3;
    this._aniData.zoomPhase = 0; 
    this._aniData.zoomSpeed = 0.010;
    this._aniData.shakeD1 = 60;
    this._aniData.shakeD2 = 0;
    this._aniData.shakeX = 0;
    this._enabled = data.isCommandEnabled(index);
    this._orgXY = this.set_tcp(KB.title_com_pos[index]);
    this.prepareBitmap();
};

TpictureCom.prototype.prepareBitmap = function() {
    var name = "Command_" + String(this._index);
    this.bitmap = ImageManager.loadTitle2(name)
};

TpictureCom.prototype.set_tcp = function(value) {
    if (!value) {return null};
    var s = value.split(',');
    if (!s[0] || !s[1]) {return null};
    return  [Number(s[0]),Number(s[1])];
};

TpictureCom.prototype.getData = function() {
    this.anchor.x = 0.5;
    this.anchor.y = 0.5;
    this._cw = this.bitmap.width;
    this._ch = this.bitmap.height / 2;
    var fx = (Graphics.width - 816) / 2; 
    var fy = (Graphics.height - 624) / 2;   
    this._orgXY[0] += (this._cw / 2) + fx;
    this._orgXY[1] += fy;
    this.x = this._orgXY[0];
    this.y = this._orgXY[1];
    this._pw1 = this.x - (this._cw / 2);
    this._pw2 = this.x + (this._cw / 2);
    this._ph1 = this.y - (this._ch / 2);
    this._ph2 = this.y + (this._ch / 2);    
    var rectY = !this._enabled || this._index != this._data._index ? this._ch : 0;
    this.setFrame(0, rectY, this._cw, this._ch);
    this.x += KB.title_slideXaxis;
    this.y += KB.title_slideYaxis;
};

TpictureCom.prototype.isOnPicCom = function() {
    if (TouchInput.x < this._pw1) {return false};
    if (TouchInput.x > this._pw2) {return false};
    if (TouchInput.y < this._ph1) {return false};
    if (TouchInput.y > this._ph2) {return false};
    return true;
};

TpictureCom.prototype.updateZoomAnimation = function() {
    this._aniData.shakeX = 0;
    if (this._index == this._data._index) {
        if (this._aniData.zoomPhase == 0) {
            this.scale.x -= this._aniData.zoomSpeed;
            if (this.scale.x <= 1.00) {
                this.scale.x = 1.00;
                this._aniData.zoomPhase = 1;
            };
        } else {
            this.scale.x += this._aniData.zoomSpeed;
            if (this.scale.x >= this._aniData.zoomMax) {
                this.scale.x = this._aniData.zoomMax;
                this._aniData.zoomPhase = 0;
            };      
        };
    } else {
        this._aniData.zoomPhase = 0;
        if (this.scale.x > 1.00) {this.scale.x -= (this._aniData.zoomSpeed * 3)};
    }; 
    this.scale.y = this.scale.x  
};

TpictureCom.prototype.setFrameIndex = function() {
    this._aniData.shakeD1 = KB.title_shakeDuration;
    this._aniData.shakeD2 = 3;
    this._index2 = this._data._index
    var rectY = !this._enabled || this._index != this._data._index ? this._ch : 0;
    this.setFrame(0, rectY, this._cw, this._ch);
};

TpictureCom.prototype.updateSlide = function() {
    this.x = this.cSlide(this.x, (this._orgXY[0] + this._aniData.shakeX), 60);
    this.y = this.cSlide(this.y, this._orgXY[1], 60);   
};

TpictureCom.prototype.cSlide = function(value,real_value,speed) {
    if (value == real_value) {return value};
    var dnspeed = 3 + (Math.abs(value - real_value) / speed);
    if (value > real_value) {value -= dnspeed;
        if (value < real_value) {value = real_value};}
    else if (value < real_value) {value  += dnspeed;
        if (value  > real_value) {value  = real_value};     
    };
    return Math.floor(value);
};

TpictureCom.prototype.updateOpacity = function() {
    this.opacity += 15;
};

TpictureCom.prototype.shakeClear = function() {
    this._aniData.shakeD1 = 0;
    this._aniData.shakeD2 = 0;
    this._aniData.shakeX = 0;
};
            
TpictureCom.prototype.updateShakeAnimation = function() {
    if (this._index != this._data._index) {this.shakeClear();return};
    if (this._aniData.shakeD1 > 0) {
        if (this._aniData.shakeD2 > 0) {
            this._aniData.shakeD2--;
            if (this._aniData.shakeD2 <= 0) {
                this._aniData.shakeD2 = 3;
                this._aniData.shakeX = -5 + (Math.abs(Math.random() * 10));
            };
        };
        this._aniData.shakeD1--;
        if (this._aniData.shakeD1 <= 0) {this.shakeClear()};
    };
};

TpictureCom.prototype.updatePicCommand = function() {
    if (this._wait > 0) {this._wait--;return};
    if (this._aniData.mode == 1) {
        this.updateZoomAnimation()
    } else if (this._aniData.mode == 2) {
        this.updateShakeAnimation();
    };
    if (this._index2 != this._data._index) {this.setFrameIndex()};
    this.updateSlide();
    this.updateOpacity();
};

TpictureCom.prototype.update = function() {
    Sprite.prototype.update.call(this);
    if (!this._cw) {
        if (this.bitmap.isReady()) {this.getData()};
    } else {
        this.updatePicCommand();
    };
};