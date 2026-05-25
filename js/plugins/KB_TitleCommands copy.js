//=============================================================================
// KB_TitleCommands.js
//=============================================================================

/*:
 * @target MZ
 * @plugindesc (v1.3) Adds image commands to the title screen instead of the default window.
 * @author KB
 * @url 
 * * @param ---<MAIN SETTINGS>---
 * @desc
 * * @param Animation Mode
 * @desc Set the command selection effect. 0: None, 1: Pulse, 2: Shake
 * @default 1
 * @type select
 * @option None
 * @value 0
 * @option Pulse Effect
 * @value 1
 * @option Shake Effect
 * @value 2
 * @parent ---<MAIN SETTINGS>---
 * * @param Left & Right Input
 * @text Support Horizontal Menu
 * @desc Allows command selection using Right/Left keys (Supports horizontal menu).
 * @default true
 * @type boolean
 * @parent ---<MAIN SETTINGS>---
 * * @param Shake Duration
 * @desc Duration of the shake effect (if Animation Mode is 2).
 * @default 30
 * @type number
 * @parent ---<MAIN SETTINGS>---
 * * @param Slide X-Axis
 * @desc Initial X-offset for the slide-in animation.
 * @default -100
 * @parent ---<MAIN SETTINGS>---
 * * @param Slide Y-Axis
 * @desc Initial Y-offset for the slide-in animation.
 * @default 0
 * @parent ---<MAIN SETTINGS>---
 * * @param ---<CURSOR SETTINGS>---
 * @desc
 * * @param Cursor X-Axis
 * @text X-Axis
 * @desc Adjust the cursor's horizontal position (X-Offset).
 * @default 0
 * @parent ---<CURSOR SETTINGS>---
 *
 * @param Cursor Y-Axis
 * @text Y-Axis
 * @desc Adjust the cursor's vertical position (Y-Offset).
 * @default 5
 * @parent ---<CURSOR SETTINGS>---
 *
 * @param Cursor Visible
 * @text Visible
 * @desc Enable/disable cursor display.
 * @default true
 * @type boolean
 * @parent ---<CURSOR SETTINGS>---
 *
 * @param Cursor Wave Animation
 * @text Wave Animation
 * @desc Enable a subtle wave/floating animation for the cursor.
 * @default true
 * @type boolean
 * @parent ---<CURSOR SETTINGS>---
 *
 * @param Cursor Rotation Animation
 * @text Rotation Animation
 * @desc Enable cursor rotation effect.
 * @default false
 * @type boolean
 * @parent ---<CURSOR SETTINGS>---
 *
 * @param Cursor Rotation Speed
 * @text Rotation Speed
 * @desc Cursor rotation speed.
 * @default 0.05
 * @parent ---<CURSOR SETTINGS>---
 * * @param ---<COMMAND POSITIONS>---
 * * @param Command Pos 1
 * @desc Format: X,Y. Position of command 1.
 * @default 180,440
 * @parent ---<COMMAND POSITIONS>---
 *
 * @param Command Pos 2
 * @desc Format: X,Y. Position of command 2.
 * @default 350,440
 * @parent ---<COMMAND POSITIONS>---
 *
 * @param Command Pos 3
 * @desc Format: X,Y. Position of command 3.
 * @default 520,440
 * @parent ---<COMMAND POSITIONS>---
 *
 * @param Command Pos 4
 * @desc Format: X,Y. Position of command 4.
 * @default 690,440
 * @parent ---<COMMAND POSITIONS>---
 *
 * @param Command Pos 5
 * @desc Format: X,Y. Position of command 5.
 * @default 345,498
 * @parent ---<COMMAND POSITIONS>--- 
 *
 * @param Command Pos 6
 * @desc Format: X,Y. Position of command 6.
 * @default 345,530
 * @parent ---<COMMAND POSITIONS>---
 *
 * @param Command Pos 7
 * @desc Format: X,Y. Position of command 7.
 * @default 0,192
 * @parent ---<COMMAND POSITIONS>---
 *
 * @param Command Pos 8
 * @desc Format: X,Y. Position of command 8.
 * @default 0,224
 * @parent ---<COMMAND POSITIONS>---
 *
 * @param Command Pos 9
 * @desc Format: X,Y. Position of command 9.
 * @default 0,256
 * @parent ---<COMMAND POSITIONS>---
 *
 * @param Command Pos 10
 * @desc Format: X,Y. Position of command 10.
 * @default 0,288
 * @parent ---<COMMAND POSITIONS>---
 *
 * @help  
 * =============================================================================
 * +++ KB - Title Picture Commands (v1.3) +++
 * By KB 
 * https://yoururl.com
 * =============================================================================
 * Adds image commands to the title screen instead of the default window.
 * The following image files are required:
 *
 * Command_0.png, Command_1.png, Command_2.png , Command_3.png ... 
 *
 * Save the images in the folder:
 *
 * img/titles2/
 * ============================================================================= 
 * A cursor image is also required.
 *
 * Cursor.png
 *
 * ============================================================================= 
 * * HISTORY
 * =============================================================================
 * (v1.3) - Updated sort logic for Z-ordering.   
 * (v1.2) - Fixed command selection during scene fading transitions. 
 * (v1.1) - Fixed an issue where the default command window appeared on high resolutions.
 *
 */

//=============================================================================
// ** PLUGIN PARAMETERS
//=============================================================================
    var Imported = Imported || {};
    Imported.KB_TitleCommands = true;
    var KB = KB || {};

  	KB.parameters = PluginManager.parameters('KB_TitleCommands');
	KB.title_comMode = Number(KB.parameters['Animation Mode'] || 2);
    KB.title_shakeDuration = Number(KB.parameters['Shake Duration'] || 30);
	
	KB.title_slideXaxis = Number(KB.parameters['Slide X-Axis'] || -100);
	KB.title_slideYaxis = Number(KB.parameters['Slide Y-Axis'] || 0);	
	KB.title_sideInput = String(KB.parameters['Left & Right Input'] || "true");

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
var _KB_titleCom_ccreate = Scene_Title.prototype.create;
Scene_Title.prototype.create = function() {
	_KB_titleCom_ccreate.call(this);
	if (this._titleField3) {this._titleField3.children.sort((a, b) => a.z - b.z)}
};

//================================
// ♦ ALIAS ♦  createCommandWindow
//================================
var _KB_titleCom_createCommandWindow = Scene_Title.prototype.createCommandWindow;
Scene_Title.prototype.createCommandWindow = function() {
	_KB_titleCom_createCommandWindow.call(this);
	if (!this._titleField3) {this.createTitleField3()};
	this.createTitlePictureCommands();
	this._sideInput = String(KB.title_sideInput) == "true" ? true : false;
	if (String(KB.title_cursorVisible) == "true") {this.createCursorCommand()};
};

//================================
// ♦ ALIAS ♦  update
//================================
var _KB_titleCom_scnTittle_update = Scene_Title.prototype.update;
Scene_Title.prototype.update = function() {
	_KB_titleCom_scnTittle_update.call(this);
    this.updatePicCommands();
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
// * createTitlePictureCommands
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

//==============================
// * Create Cursor Command
//==============================
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

//==============================
// * update Title Cursor
//==============================
Scene_Title.prototype.updateTitleCursor = function() {
	 if (this._cursorSlide[3]) {this.updateCursorSlide()};
	 if (this._cursor.rot[0]) {this.updateCursorRotation()}; 
   	 this._cursor.opacity += 5;
 	 var nx = this.comSprite().x - (this.comSprite().bitmap.width / 2) - (this._cursor.width / 2) + this._cursorSlide[0];
	 var ny = this.comSprite().y - (this.comSprite().bitmap.height / 2) + (this._cursor.height / 2) + this._cursor.org[1];
     this._cursor.x = this.cursorMoveto(this._cursor.x , nx, 10);
	 this._cursor.y = this.cursorMoveto(this._cursor.y, ny, 10);
};

//==============================
// * Com Sprite
//==============================
Scene_Title.prototype.comSprite = function() {
    return this._TpictureCom[this._commandWindow._index];
};

//==============================
// * Uodate Cursor Rotation
//==============================
Scene_Title.prototype.updateCursorRotation = function() {
    this._cursor.rotation += this._cursor.rot[1];
};

//==============================
// * update Cursor Slide
//==============================
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

//==============================
// * Sprite Move To
//==============================
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

//==============================
// * checkTPicCom
//==============================
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

//==============================
// * picComNeedCheckTouch
//==============================
Scene_Title.prototype.picComNeedCheckTouch = function() {
   if (this._tComTouch[0] != TouchInput.x) {return true};
   if (this._tComTouch[1] != TouchInput.y) {return true}; 
   return false;
};

//==============================
// * update Title Touch Input Com
//==============================
Scene_Title.prototype.updateTitleTouchInputCom = function() {
    if (TouchInput.isTriggered()) {this.checkTPicCom()}; 
	if (this.picComNeedCheckTouch()) {this.updateTComMouseIsOnPic()};
	this._tComTouch = [TouchInput.x,TouchInput.y];
};

//==============================
// * Update Com Side Input
//==============================
Scene_Title.prototype.updateComSideInput = function() {
    if (Input.isRepeated('right')) {
		this.addTitleComIndex(1);
	} else if (Input.isRepeated('left')) {
		this.addTitleComIndex(-1);
	};
};

//==============================
// * updateTComMouseIsOnPic
//==============================
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

//==============================
// * add Title ComIndex
//==============================
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

//==============================
// * update Pic Commands
//==============================
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

//==============================
// * Initialize
//==============================
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

//==============================
// * Prepare Bitmap
//==============================
TpictureCom.prototype.prepareBitmap = function() {
	var name = "Command_" + String(this._index);
    this.bitmap = ImageManager.loadTitle2(name)
};

//==============================
// * set tcp
//==============================
TpictureCom.prototype.set_tcp = function(value) {
	if (!value) {return null};
	var s = value.split(',');
	if (!s[0] || !s[1]) {return null};
	return  [Number(s[0]),Number(s[1])];
};

//==============================
// * get Data
//==============================
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

//==============================
// * On Picture Com
//==============================
TpictureCom.prototype.isOnPicCom = function() {
    if (TouchInput.x < this._pw1) {return false};
	if (TouchInput.x > this._pw2) {return false};
	if (TouchInput.y < this._ph1) {return false};
	if (TouchInput.y > this._ph2) {return false};
	return true;
};

//==============================
// * update Zoom Animation
//==============================
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

//==============================
// * set Frame Index
//==============================
TpictureCom.prototype.setFrameIndex = function() {
	this._aniData.shakeD1 = KB.title_shakeDuration;
	this._aniData.shakeD2 = 3;
    this._index2 = this._data._index
	var rectY = !this._enabled || this._index != this._data._index ? this._ch : 0;
	this.setFrame(0, rectY, this._cw, this._ch);
};

//==============================
// * update Slide
//==============================
TpictureCom.prototype.updateSlide = function() {
    this.x = this.cSlide(this.x, (this._orgXY[0] + this._aniData.shakeX), 60);
	this.y = this.cSlide(this.y, this._orgXY[1], 60);	
};

//==============================
// * Sprite Move To
//==============================
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

//==============================
// * update Opacity
//==============================
TpictureCom.prototype.updateOpacity = function() {
    this.opacity += 15;
};

//==============================
// * shakeClear
//==============================
TpictureCom.prototype.shakeClear = function() {
	this._aniData.shakeD1 = 0;
	this._aniData.shakeD2 = 0;
	this._aniData.shakeX = 0;
};
			
//==============================
// * update Shake Animation
//==============================
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

//==============================
// * update Pic Command
//==============================
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

//==============================
// * Update
//==============================
TpictureCom.prototype.update = function() {
    Sprite.prototype.update.call(this);
	if (!this._cw) {
	    if (this.bitmap.isReady()) {this.getData()};
	} else {
		this.updatePicCommand();
    };
};