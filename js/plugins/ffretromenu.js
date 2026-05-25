
  1
  2
  3
  4
  5
  6
  7
  8
  9
 10
 11
 12
 13
 14
 15
 16
 17
 18
 19
 20
 21
 22
 23
 24
 25
 26
 27
 28
 29
 30
 31
 32
 33
 34
 35
 36
 37
 38
 39
 40
 41
 42
 43
 44
 45
 46
 47
 48
 49
 50
 51
 52
 53
 54
 55
 56
 57
 58
 59
 60
 61
 62
 63
 64
 65
 66
 67
 68
 69
 70
 71
 72
 73
 74
 75
 76
 77
 78
 79
 80
 81
 82
 83
 84
 85
 86
 87
 88
 89
 90
 91
 92
 93
 94
 95
 96
 97
 98
 99
100
101
102
103
104
105
106
107
108
109
110
111
112
113
114
115
116
117
118
119
120
121
122
123
124
125
126
127
128
129
130
131
132
133
134
135
136
137
138
139
140
141
142
143
144
145
146
147
148
149
150
151
152
153
154
155
156
157
158
159
160
161
162
163
164
165
166
167
168
169
170
171
172
173
174
175
176
177
178
179
180
181
182
183
184
185
186
187
188
189
190
191
192
193
194
195
196
197
198
199
200
201
202
203
204
205
206
207
208
209
210
211
212
213
214
215
216
217
218
219
220
221
222
223
224
225
226
227
228
229
230
231
232
233
234
235
236
237
238
239
240
241
242
243
244
245
246
247
248
249
250
251
252
253
254
255
256
257
258
259
260
261
262
263
264
265
266
267
268
269
270
271
272
273
274
275
276
277
278
279
280
281
282
283
284
285
286
287
288
289
290
291
292
293
294
295
296
297
298
299
300
301
302
303
304
305
306
307
308
309
310
311
312
313
314
315
316
317
318
319
320
321
322
323
324
325
326
327
328
329
330
331
332
333
334
335
336
337
338
339
340
341
342
343
344
345
346
347
348
349
350
351
352
353
354
355
356
357
358
359
360
361
362
363
364
365
366
367
368
369
370
371
372
373
//=============================================================================
//                      VE_FinalFantasyMenu.js - 1.03
//=============================================================================
/*:
 * @plugindesc VE_FinalFantasyMenu
 * @author Ventiqu - 2017.
 * @help
 * ==============
 *   Changelog
 * ==============
 * 15.6.2016 (v1.01) - Windows will now scale depending on resolution for example if you are using plugin, which will change resolution.
 * 26.6.2016 (v1.02) - Time Window has been added. You can turn it on / off from plugin manager.
 * 19.7.2016 (v1.03) - Choicelist bug fixed, now it shows texts.
 * @param textFont
 * @desc Change text font here.
 * @Default: GameFont
 * @default GameFont
 *
 * @param Show Time Window
 * @desc Set this to true or false.
 * Default: true
 * @default true
 *
 * @help None.
 */
(function() {

 	var parametri = PluginManager.parameters('VE_FinalFantasyMenu');
 	var changeTextFont = String(parametri['textFont']);
  var showTimeWindow = String(parametri['Show Time Window'])

/////////////////////////////////
// Initialize Window Choicelist
////////////////////////////////
  var VE_Windoww_ChoiceList = Window_ChoiceList;
  function Window_ChoiceList() {
    VE_Windoww_ChoiceList.call(this);
    this.initialize.apply(this, arguments);
  }

/////////////////////////////////
// Create Windows
////////////////////////////////

var _Scene_Menu_create = Scene_Menu.prototype.create;
Scene_Menu.prototype.create = function() {
	_Scene_Menu_create.call(this);
    Scene_MenuBase.prototype.create.call(this);
    this.createStepsWindow();
    this.createLocationWindow();
    if (showTimeWindow == 'true') {
    this.createTimeWindow();
  }
};

/////////////////////////////////
// Menu Section
////////////////////////////////
	var _Scene_Menu_createe = Scene_Menu.prototype.create;
  if (showTimeWindow == 'true') {
      Scene_Menu.prototype.create = function() {
          _Scene_Menu_createe.call(this);
          this._statusWindow.x = 0;
          this._statusWindow.y = 0;
          this._commandWindow.x = Graphics.boxWidth - this._commandWindow.width;
          this._commandWindow.y = 0;
          this._goldWindow.x = Graphics.boxWidth - this._goldWindow.width;
          this._locationWindow.x = Graphics.boxWidth - this._locationWindow.width;
          this._locationWindow.y = this._commandWindow.height;
          this._timeWindow.x = Graphics.boxWidth - this._timeWindow.width;;
          this._timeWindow.y = this._commandWindow.height + this._locationWindow.height;
          this._stepsWindow.x = Graphics.boxWidth - this._stepsWindow.width;
          this._stepsWindow.y = this._commandWindow.height + this._locationWindow.height + this._stepsWindow.height;
          this._goldWindow.y = this._commandWindow.height + this._locationWindow.height + this._goldWindow.height + this._timeWindow.height;
        };
      } else if (showTimeWindow == 'false') {
        Scene_Menu.prototype.create = function() {
            _Scene_Menu_createe.call(this);
            this._statusWindow.x = 0;
            this._statusWindow.y = 0;
            this._commandWindow.x = Graphics.boxWidth - this._commandWindow.width;
            this._commandWindow.y = 0;
            this._goldWindow.x = Graphics.boxWidth - this._goldWindow.width;
            this._locationWindow.x = Graphics.boxWidth - this._locationWindow.width;
            this._locationWindow.y = this._commandWindow.height;
            this._stepsWindow.x = Graphics.boxWidth - this._stepsWindow.width;
            this._stepsWindow.y = this._commandWindow.height + this._locationWindow.height;
            this._goldWindow.y = this._commandWindow.height + this._locationWindow.height + this._goldWindow.height;
      };
    };

Bitmap.prototype.blur = function() {
    for (var i = 0; i < 2; i++) {
        var w = this.width;
        var h = this.height;
        var canvas = this._canvas;
        var context = this._context;
        var tempCanvas = document.createElement('canvas');
        var tempContext = tempCanvas.getContext('2d');
        tempCanvas.width = w + 2;
        tempCanvas.height = h + 2;
        tempContext.drawImage(canvas, 0, 0, w, h, 1, 1, w, h);
        tempContext.drawImage(canvas, 0, 0, w, 1, 1, 0, w, 1);
        tempContext.drawImage(canvas, 0, 0, 1, h, 0, 1, 1, h);
        tempContext.drawImage(canvas, 0, h - 1, w, 1, 1, h + 1, w, 1);
        tempContext.drawImage(canvas, w - 1, 0, 1, h, w + 1, 1, 1, h);
        context.save();
        context.fillStyle = 'black';
        context.fillRect(0, 0, w, h);
        context.globalCompositeOperation = 'copy';
        context.globalAlpha = 1 / 9;
        for (var y = 0; y < 3; y++) {
            for (var x = 0; x < 3; x++) {
                context.drawImage(tempCanvas, x, y, w, h, 0, 0, w, h);
            }
        }
        context.restore();
    }
    this._setDirty();
};

/////////////////////////////////
// Font Section
////////////////////////////////
Window_Base.prototype.standardFontFace = function() {
    return changeTextFont;
};

Window_Message.prototype.standardFontFace = function() {
    return changeTextFont;
};

Window_ChoiceList.prototype.standardFontFace = function() {
    return changeTextFont;
};

Window_ChoiceList.prototype.standardFontSize = function() {
    return changeTextFont;
};

/////////////////////////////////
// Step Window Section
////////////////////////////////

function Window_Steps() {
    this.initialize.apply(this, arguments);
}

Scene_Menu.prototype.createStepsWindow = function() {
    this._stepsWindow = new Window_Steps(0, 0);
    this.addWindow(this._stepsWindow);
};

Window_Steps.prototype = Object.create(Window_Base.prototype);
Window_Steps.prototype.constructor = Window_Steps;

Window_Steps.prototype.initialize = function(x, y) {
    var width = this.windowWidth();
    var height = this.windowHeight();
    Window_Base.prototype.initialize.call(this, x, y, width, height);
    this.refresh();
};

Window_Steps.prototype.windowWidth = function() {
    return 240;
};

Window_Steps.prototype.windowHeight = function() {
    return this.fittingHeight(1);
};

Window_Base.prototype.custom2DrawCurrencyValue = function(value, unit, x, y, width) {
    var unitWidth = Math.min(80, this.textWidth(unit));
    this.resetTextColor();
    this.drawText(value, x, y, width, 'right');
    this.changeTextColor(this.systemColor());
    this.drawText(unit, x, y, unitWidth, 'left');
};


Window_Steps.prototype.refresh = function() {
    var x = this.textPadding();
    var width = this.contents.width - this.textPadding() * 2;
    this.contents.clear();
    this.custom2DrawCurrencyValue(this.value(), this.textUnit(), x, 0, width);
};

Window_Steps.prototype.value = function() {
    return $gameParty.steps();
};

TextManager.stepMessage = function(messageId) {
    return 'Steps';
};

Window_Steps.prototype.textUnit = function() {
    return TextManager.stepMessage();
};

Window_Steps.prototype.open = function() {
    this.refresh();
    Window_Base.prototype.open.call(this);
};

/////////////////////////////////
// Location Window Section
////////////////////////////////

function Window_Location() {
    this.initialize.apply(this, arguments);
}

Scene_Menu.prototype.createLocationWindow = function() {
    this._locationWindow = new Window_Location(0, 0);
    this.addWindow(this._locationWindow);
};

Window_Location.prototype = Object.create(Window_Base.prototype);
Window_Location.prototype.constructor = Window_Steps;

Window_Location.prototype.initialize = function(x, y) {
    var width = this.windowWidth();
    var height = this.windowHeight();
    Window_Base.prototype.initialize.call(this, x, y, width, height);
    this.refresh();
};

Window_Location.prototype.windowWidth = function() {
    return 240;
};

Window_Location.prototype.windowHeight = function() {
    return this.fittingHeight(1);
};

Window_Base.prototype.customDrawCurrencyValue = function(value, unit, x, y, width) {
    var unitWidth = Math.min(80, this.textWidth(unit));
    this.resetTextColor();
    this.drawText(value, x, y, width - unitWidth - 6, 'center');
    this.changeTextColor(this.systemColor());
    this.drawText(unit, x + width - unitWidth, y, unitWidth, 'center');
};

Window_Location.prototype.refresh = function() {
    var x = this.textPadding();
    var width = this.contents.width - this.textPadding() * 2;
    this.contents.clear();
    this.customDrawCurrencyValue(this.value(), this.textUnit(), x, 0, width);
};

Window_Location.prototype.value = function() {
    return $gameMap.displayName();
};

TextManager.locationMessage = function(messageId) {
    return '';
};

Window_Location.prototype.textUnit = function() {
    return TextManager.locationMessage();
};

Window_Location.prototype.open = function() {
    this.refresh();
    Window_Base.prototype.open.call(this);
};


Window_Base.prototype.drawCurrencyValue = function(value, unit, x, y, width) {
    var unitWidth = Math.min(80, this.textWidth(unit));
    this.resetTextColor();
    this.drawText(value, x, y, width, 'right');
    this.changeTextColor(this.systemColor());
    this.drawText(unit, x, y, unitWidth, 'left');
};

/////////////////////////////////
// Time Window Section
////////////////////////////////
  if (showTimeWindow == 'true') {
function Window_Time() {
    this.initialize.apply(this, arguments);
}

Scene_Menu.prototype.createTimeWindow = function() {
    this._timeWindow = new Window_Time(0, 0);
    this.addWindow(this._timeWindow);
};

Window_Time.prototype = Object.create(Window_Base.prototype);
Window_Time.prototype.constructor = Window_Time;

Window_Time.prototype.initialize = function(x, y) {
    var width = this.windowWidth();
    var height = this.windowHeight();
    Window_Base.prototype.initialize.call(this, x, y, width, height);
    this.refresh();
};

Window_Time.prototype.windowWidth = function() {
    return 240;
};

Window_Time.prototype.windowHeight = function() {
    return this.fittingHeight(1);
};

Window_Base.prototype.custom2DrawCurrencyValue = function(value, unit, x, y, width) {
    var unitWidth = Math.min(80, this.textWidth(unit));
    this.resetTextColor();
    this.drawText(value, x, y, width, 'right');
    this.changeTextColor(this.systemColor());
    this.drawText(unit, x, y, unitWidth, 'left');
};


Window_Time.prototype.refresh = function() {
    var x = this.textPadding();
    var width = this.contents.width - this.textPadding() * 2;
    this.contents.clear();
    this.custom2DrawCurrencyValue(this.value(), this.textUnit(), x, 0, width);
};

Window_Time.prototype.value = function() {
    return $gameSystem.playtimeText();
};

TextManager.timeMessage = function(messageId) {
    return 'Time';
};

Window_Time.prototype.textUnit = function() {
    return TextManager.timeMessage();
};

Window_Time.prototype.open = function() {
    this.refresh();
    Window_Base.prototype.open.call(this);
};
}
/////////////////////////////////
// Custom MP, HP, Status
////////////////////////////////

Window_Base.prototype.drawActorSimpleStatus = function(actor, x, y, width) {
    var lineHeight = this.lineHeight();
    var x2 = x + 180;
    var width2 = Math.min(200, width - 180 - this.textPadding());
    this.drawActorName(actor, x, y);
    this.drawActorLevel(actor, x, y + lineHeight * 1);
    this.drawActorIcons(actor, x, y + lineHeight * 2);
    this.drawActorClass(actor, x2, y);
    this.customDrawActorHp(actor, x2, y + lineHeight * 1, width2);
    this.customDrawActorMp(actor, x2, y + lineHeight * 2, width2);
};

Window_Base.prototype.customDrawActorHp = function(actor, x, y, width) {
    width = width || 186;
    this.changeTextColor(this.systemColor());
    this.drawText(TextManager.hpA, x, y, 44);
    this.drawCurrentAndMax(actor.hp, actor.mhp, x, y, width,
                           this.hpColor(actor), this.normalColor());
};

Window_Base.prototype.customDrawActorMp = function(actor, x, y, width) {
    width = width || 186;
    this.changeTextColor(this.systemColor());
    this.drawText(TextManager.mpA, x, y, 44);
    this.drawCurrentAndMax(actor.mp, actor.mmp, x, y, width,
                           this.mpColor(actor), this.normalColor());
};

})();
