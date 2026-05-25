//=============================================================================
// FELD_DQMenu.js
//=============================================================================

/*:en
 * @target MZ
 * @plugindesc Alternative menu designed to act like Dragon Quest's menu. Now for MZ!
 * @author Feldherren
 *
 * @help DQ Menu MZ v1.0, by Feldherren (rpaliwoda AT googlemail.com)
 *
 * A Dragon Quest style menu for RPG Maker MZ. Based on my DQ menu for MV, 
 * but improved. Slightly.
 * Unfortunately, I couldn't easily work out how to change the window size based 
 * on number of things to display, so you do need to choose between displaying
 * three gauges (HP/MP/TP) or displaying two and the actor's class and level.
 * Likewise, as I'm not changing the horizontal size of the window, changing
 * the displayed number of actors has weird results. Text and portraits get
 * misaligned from the background box that would normally border them. Only
 * some of this is due to using hacky means of centering portraits and gauges, 
 * which don't inherently have a center-this argument, like text. Even the text
 * gets misaligned. If you want to fix it, look at how the rects are defined,
 * probably. 
 * If anyone works out how to fix that let me know, as if you want I can 
 * incorporate the fix into this one and credit you, or otherwise just leave 
 * a reference here to your improved version, instead.
 *
 * Free for use with commercial projects, though I'd appreciate being contacted 
 * if you do use it in any games, or have any requests regarding it.
 *
 * @param Show actor portraits
 * @desc Display actor portraits in the menu status window
 * @type boolean
 * @default false
 *
 * @param Show gauges
 * @desc Display HP in the menu status window, instead of current/max numerical display.
 * @type boolean
 * @default false
 *
 * @param Show HP
 * @desc Display HP in the menu status window
 * @type boolean
 * @default true
 * 
 * @param HP prefix
 * @desc String shown before numerical HP display
 * @default H 
 *
 * @param Show MP
 * @desc Display MP in the menu status window
 * @type boolean
 * @default true
 * 
 * @param MP prefix
 * @desc String shown before numerical MP display
 * @default M 
 *
 * @param Show TP
 * @desc Display TP in the menu status window
 * @type boolean
 * @default false
 * 
 * @param TP prefix
 * @desc String shown before numerical TP display
 * @default T 
 * 
 * @param Center prefixes too
 * @desc Center prefixes with the numerical HP/MP/TP display
 * @type boolean
 * @default true
 *
 * @param Show class name and level
 * @desc Display class name and level in the menu status window
 * @type boolean
 * @default true
 */

(function() {

    var parameters = PluginManager.parameters('FELD_DQMenu_MZ');
    //var statusWindowActorsNumber = parameters['No. status window actors'];
	var statusWindowActorsNumber = 3;
    var showPortraits = eval(parameters['Show actor portraits']);
    var showGauges = eval(parameters['Show gauges']);
    var showHP = eval(parameters['Show HP']);
    var showMP = eval(parameters['Show MP']);
    var showTP = eval(parameters['Show TP']);
    var showClassLevel = eval(parameters['Show class name and level']);
	var hpPrefix = parameters['HP prefix'];
	var mpPrefix = parameters['MP prefix'];
	var tpPrefix = parameters['TP prefix'];
    var centerPrefixes = eval(parameters['Center prefixes too']);

	// positions the various menu windows
	var alias_Scene_Menu_create = Scene_Menu.prototype.create;
	Scene_Menu.prototype.create = function() {
		alias_Scene_Menu_create.call(this);

	    this._commandWindow.x = 30;
	    this._commandWindow.y = 30;

	    this._statusWindow.x = Graphics.boxWidth-this._statusWindow.width;
	    this._statusWindow.y = Graphics.boxHeight-this._statusWindow.height;

	    this._goldWindow.x = Graphics.boxWidth-this._goldWindow.width;
	    this._goldWindow.y = Graphics.boxHeight-this._statusWindow.height-this._goldWindow.height;
	};

	// Window_MenuStatus
	// Starts rmmz_windows.js, line 1937

	// rmmz_scenes.js, line 1310
	Scene_Menu.prototype.statusWindowRect = function() {
		const ww = Graphics.boxWidth - this.mainCommandWidth();
		const wh = this.mainAreaHeight()/4;
		const wx = this.isRightInputMode() ? 0 : Graphics.boxWidth - ww;
		const wy = this.mainAreaTop();
		return new Rectangle(wx, wy, ww, wh);
	};

	// note: remove this and it gets set to 4, and basically gives you four very slim actor displays. 
	// Everything's misaligned due to everything else I've done, but it potentially doesn't look bad.
	Window_MenuStatus.prototype.numVisibleRows = function() {
	    return 1;
	};

	Window_MenuStatus.prototype.maxCols = function() {
	    return statusWindowActorsNumber;
	};

	Window_MenuStatus.prototype.lineHeight = function() {
	    return 29;
	};

	Window_MenuStatus.prototype.drawItem = function(index) {
		this.drawPendingItemBackground(index);
		if(showPortraits)
		{
			this.drawItemImage_DQ(index);
		}
		this.drawItemStatus_DQ(index);
	};

	Window_MenuStatus.prototype.drawItemImage_DQ = function(index) {
		const actor = this.actor(index);
		const rect = this.itemRect(index);
		const width = ImageManager.faceWidth;
		const height = rect.height - 2;
		this.changePaintOpacity(actor.isBattleMember());
		// like drawItemStatus_DQ adding width/8 is still really hacky, but it mostly works
		this.drawActorFace(actor, rect.x + 1 + width/8, rect.y + 1, width, height);
		this.changePaintOpacity(true);
	};

	Window_MenuStatus.prototype.drawItemStatus_DQ = function(index) {
	    var actor = $gameParty.members()[index];
	    var rect = this.itemRect(index);
	    var x = rect.x;
	    var y = rect.y;
	    var width = rect.width;
	    var lineHeight = this.lineHeight();
	    this.drawActorNameCenter(actor, x, y);
		if(showGauges)
		{
			// just doing x+width/8 is really hacky, but it seems to work
			// not sure it'll place nicely with changing window width, though
			var line = 0;
			if(showHP){
				this.placeGauge(actor, "hp", x+width/8, y + lineHeight + this.gaugeLineHeight() * line);
				line++;
			}
			if(showMP){
				this.placeGauge(actor, "mp", x+width/8, y + lineHeight + this.gaugeLineHeight() * line);
				line++;
			}
			if(showTP) {
				this.placeGauge(actor, "tp", x+width/8, y + lineHeight + this.gaugeLineHeight() * line);
				line++;
			}
		}
		else
		{
			var line = 0;
			if(showHP){
				if(centerPrefixes){
					this.drawText(hpPrefix + "" + actor.hp+"/"+actor.mhp, x, y + lineHeight + this.gaugeLineHeight() * line, width, 'center');
				}
				else{
					this.drawText(hpPrefix, x+3, y + lineHeight + this.gaugeLineHeight() * line, width)
					this.drawText(actor.hp+"/"+actor.mhp, x, y + lineHeight + this.gaugeLineHeight() * line, width, 'center');
				}
				line++;
			}
			if(showMP){
				if(centerPrefixes){
					this.drawText(mpPrefix + "" + actor.mp+"/"+actor.mmp, x, y + lineHeight + this.gaugeLineHeight() * line, width, 'center');
				}
				else{
					this.drawText(mpPrefix, x+3, y + lineHeight + this.gaugeLineHeight() * line, width)
					this.drawText(actor.mp+"/"+actor.mmp, x, y + lineHeight + this.gaugeLineHeight() * line, width, 'center');
				}
				line++;
			}
			if(showTP){
				if(centerPrefixes){
					this.drawText(tpPrefix + "" + actor.tp, x, y + lineHeight + this.gaugeLineHeight() * line, width, 'center');
				}
				else{
					this.drawText(tpPrefix, x+3, y + lineHeight + this.gaugeLineHeight() * line, width)
					this.drawText(actor.tp, x, y + lineHeight + this.gaugeLineHeight() * line, width, 'center');
				}
				line++;
			}
		}
		if(showClassLevel)
		{
			// this isn't exactly centred; it's slightly too far left-looking
			// on the other hand, it's using RPG Maker's own centering, so iunno
			this.drawActorClassLevel(actor, x, y + lineHeight*3);
		}
	};

	Window_MenuStatus.prototype.drawActorClassLevel = function(actor, x, y, width) {
		width = width || 168;
		this.resetTextColor();
		this.drawText(actor.currentClass().name +  " " + actor.level, x, y, width, 'center');
	}
	
	Window_MenuStatus.prototype.drawActorNameCenter = function(actor, x, y, width) {
		width = width || 168;
		this.changeTextColor(ColorManager.hpColor(actor));
		this.drawText(actor.name(), x, y, width, 'center');
	};

	// Window_MenuCommand

	Scene_Menu.prototype.commandWindowRect = function() {
		const ww = this.mainCommandWidth();
		// const wh = this.mainAreaHeight() - this.goldWindowRect().height;
		const wh = 200;
		const wx = this.isRightInputMode() ? Graphics.boxWidth - ww : 0;
		const wy = this.mainAreaTop();
		return new Rectangle(wx, wy, ww, wh);
	};

	Window_MenuCommand.prototype.maxRows = function() {
	    return this.maxItems()/2;
	};

	Window_MenuCommand.prototype.maxCols = function() {
	    return 2;
	};

	Window_MenuCommand.prototype.numVisibleRows = function() {
	    return this.maxRows();
	};

	Window_MenuCommand.prototype.numVisibleCols = function() {
	    return this.maxCols();
	};
})();