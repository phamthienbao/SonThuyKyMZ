/*:
 * @target MZ
 * @plugindesc [v6.0] Localization + Picker (Performance Optimized).
 * @author BaoKB
 *
 * @help
 * ============================================================================
 * ## TỐI ƯU HIỆU NĂNG (PERFORMANCE)
 * ============================================================================
 * Phiên bản này đã được tối ưu hóa để không gây lag game.
 * - Sử dụng Caching: Lưu kết quả dịch để không phải tra lại nhiều lần.
 * - Fast Check: Bỏ qua xử lý nếu text không chứa ký tự '{'.
 *
 * ## HƯỚNG DẪN ẢNH LÁ CỜ
 * - Đặt tên file: flag_vi.png, flag_en.png
 * - Thư mục: img/system/
 *
 * ============================================================================
 * @param Show on Title
 * @text Hiển thị nút ở Title
 * @type boolean
 * @default true
 *
 * @param New Game Picker
 * @text Chọn ngữ khi New Game
 * @type boolean
 * @default true
 *
 * @param Default Language
 * @text Ngôn ngữ mặc định
 * @default vi
 */

(() => {
    const pluginName = "SimpleLocalization";
    const params = PluginManager.parameters(pluginName);
    const showOnTitle = params['Show on Title'] === 'true';
    const useNewGamePicker = params['New Game Picker'] === 'true';

    // --- 1. CORE MANAGER ---
    class LocalizationManager {
        constructor() {
            this._locale = params['Default Language'] || 'vi';
            this._data = {
                "vi": { "lang_name": "Tiếng Việt" },
                "en": { "lang_name": "English" }
            };
            this._cache = {}; // Bộ nhớ đệm giúp game chạy nhanh
            this.loadData();
        }

        get locale() { return this._locale; }

        loadData() {
            this.loadCSV('data/Languages.csv');
            this.loadJSON('data/Languages.json');
        }

        loadJSON(url) {
            const xhr = new XMLHttpRequest();
            xhr.open('GET', url);
            xhr.overrideMimeType('application/json');
            xhr.onload = () => {
                if (xhr.status < 400) {
                    try { 
                        const jsonData = JSON.parse(xhr.responseText);
                        this.mergeData(jsonData);
                    } catch (e) {}
                }
            };
            xhr.send();
        }

        loadCSV(url) {
            const xhr = new XMLHttpRequest();
            xhr.open('GET', url);
            xhr.onload = () => {
                if (xhr.status < 400) this.parseCSV(xhr.responseText);
            };
            xhr.send();
        }

        mergeData(newData) {
            for (const lang in newData) {
                if (!this._data[lang]) this._data[lang] = {};
                Object.assign(this._data[lang], newData[lang]);
            }
            this._cache = {}; // Xóa cache khi nạp dữ liệu mới
        }

        parseCSV(text) {
            const lines = text.trim().split(/\r?\n/);
            if (lines.length < 2) return;
            if (lines[0].charCodeAt(0) === 0xFEFF) lines[0] = lines[0].substr(1);

            const headers = this.parseCSVLine(lines[0]);
            
            for (let j = 1; j < headers.length; j++) {
                const code = headers[j].trim();
                if (!this._data[code]) this._data[code] = {};
            }

            for (let i = 1; i < lines.length; i++) {
                const row = this.parseCSVLine(lines[i]);
                if (row.length < 2) continue;
                const key = row[0].trim();
                for (let j = 1; j < row.length; j++) {
                    const code = headers[j] ? headers[j].trim() : null;
                    if (code && this._data[code]) {
                        let val = row[j] || "";
                        val = val.replace(/^"|"$/g, '').replace(/""/g, '"');
                        this._data[code][key] = val;
                    }
                }
            }
            this._cache = {}; // Xóa cache sau khi parse xong
        }

        parseCSVLine(text) {
            const res = [];
            let start = 0, inQ = false;
            for (let i = 0; i < text.length; i++) {
                if (text[i] === '"') inQ = !inQ;
                else if (text[i] === ',' && !inQ) {
                    res.push(text.substring(start, i));
                    start = i + 1;
                }
            }
            res.push(text.substring(start));
            return res;
        }

        setLanguage(locale) {
            if (this._data[locale]) {
                this._locale = locale;
                this._cache = {}; // Xóa Cache khi đổi ngôn ngữ (Quan trọng)
                ConfigManager.save();
                
                if (SceneManager._scene) {
                    const wins = SceneManager._scene._windowLayer.children;
                    wins.forEach(w => {
                        if (typeof w.refresh === 'function') w.refresh();
                    });
                }
            }
        }

        cycleLanguage(reverse = false) {
            const keys = Object.keys(this._data);
            const valid = keys.filter(k => this._data[k] && typeof this._data[k] === 'object');
            if (valid.length > 0) {
                let idx = valid.indexOf(this._locale);
                if (reverse) {
                    idx = (idx - 1 + valid.length) % valid.length;
                } else {
                    idx = (idx + 1) % valid.length;
                }
                this.setLanguage(valid[idx]);
            }
        }

        getText(key) {
            const dict = this._data[this._locale];
            return (dict && dict[key]) ? dict[key] : key;
        }

        // --- OPTIMIZED PROCESS FUNCTION ---
        process(text) {
            if (typeof text !== 'string') return text;
            
            // 1. FAST CHECK: Nếu không có dấu {, trả về ngay lập tức
            if (text.indexOf('{') === -1) return text;

            // 2. CACHE CHECK: Nếu câu này đã từng dịch, lấy từ cache
            if (this._cache[text]) return this._cache[text];

            // 3. TRANSLATE: Nếu chưa, mới thực hiện thay thế
            const result = text.replace(/\{(.*?)\}/g, (match, key) => {
                return this.getText(key.trim());
            });

            // 4. SAVE CACHE: Lưu kết quả lại
            this._cache[text] = result;
            return result;
        }
    }

    window.SimpleLocalization = new LocalizationManager();

    // --- 2. INTEGRATION (OPTIMIZED HOOKS) ---

    const _Window_Base_convertEscapeCharacters = Window_Base.prototype.convertEscapeCharacters;
    Window_Base.prototype.convertEscapeCharacters = function(text) {
        // Chỉ gọi process nếu text tồn tại
        if (text) {
            text = SimpleLocalization.process(text);
        }
        return _Window_Base_convertEscapeCharacters.call(this, text);
    };

    const _Window_Command_addCommand = Window_Command.prototype.addCommand;
    Window_Command.prototype.addCommand = function(name, symbol, enabled, ext) {
        if (name) {
            name = SimpleLocalization.process(name);
        }
        _Window_Command_addCommand.call(this, name, symbol, enabled, ext);
    };

    // --- 3. OPTIONS MENU ---
    
    const _ConfigManager_makeData = ConfigManager.makeData;
    ConfigManager.makeData = function() {
        const config = _ConfigManager_makeData.call(this);
        config.locale = SimpleLocalization.locale;
        return config;
    };

    const _ConfigManager_applyData = ConfigManager.applyData;
    ConfigManager.applyData = function(config) {
        _ConfigManager_applyData.call(this, config);
        if (config.locale) SimpleLocalization.setLanguage(config.locale);
    };

    const _Window_Options_addGeneralOptions = Window_Options.prototype.addGeneralOptions;
    Window_Options.prototype.addGeneralOptions = function() {
        _Window_Options_addGeneralOptions.call(this);
        this.addCommand('{cmd_lang}', 'locale');
    };

    const _Window_Options_statusText = Window_Options.prototype.statusText;
    Window_Options.prototype.statusText = function(index) {
        if (this.commandSymbol(index) === 'locale') {
            const name = SimpleLocalization.getText('lang_name');
            return name !== 'lang_name' ? name : SimpleLocalization.locale.toUpperCase();
        }
        return _Window_Options_statusText.call(this, index);
    };

    const _Window_Options_processOk = Window_Options.prototype.processOk;
    Window_Options.prototype.processOk = function() {
        if (this.commandSymbol(this.index()) === 'locale') {
            SimpleLocalization.cycleLanguage();
            SoundManager.playOk();
            this.refresh();
            return;
        }
        _Window_Options_processOk.call(this);
    };
    
    const _Window_Options_cursorRight = Window_Options.prototype.cursorRight;
    Window_Options.prototype.cursorRight = function(wrap) {
        if (this.commandSymbol(this.index()) === 'locale') {
            SimpleLocalization.cycleLanguage();
            SoundManager.playCursor();
            this.refresh();
            return;
        }
        _Window_Options_cursorRight.call(this, wrap);
    };
    
    const _Window_Options_cursorLeft = Window_Options.prototype.cursorLeft;
    Window_Options.prototype.cursorLeft = function(wrap) {
        if (this.commandSymbol(this.index()) === 'locale') {
            SimpleLocalization.cycleLanguage(true); 
            SoundManager.playCursor();
            this.refresh();
            return;
        }
        _Window_Options_cursorLeft.call(this, wrap);
    };

    // --- 4. NEW WINDOW: LANGUAGE PICKER ---
    
    class Window_LanguagePicker extends Window_Base {
        constructor(rect) {
            super(rect);
            this.opacity = 255;
            this.hide();
            this.deactivate();
        }

        update() {
            super.update();
            if (this.active) {
                if (Input.isRepeated('right')) {
                    SoundManager.playCursor();
                    SimpleLocalization.cycleLanguage();
                    this.refresh();
                } else if (Input.isRepeated('left')) {
                    SoundManager.playCursor();
                    SimpleLocalization.cycleLanguage(true);
                    this.refresh();
                } else if (Input.isTriggered('ok')) {
                    SoundManager.playOk();
                    this.processOk();
                } else if (Input.isTriggered('cancel') || Input.isTriggered('escape')) {
                    SoundManager.playCancel();
                    this.processCancel();
                }
            }
        }

        refresh() {
            this.contents.clear();
            const width = this.contentsWidth();
            const lineHeight = this.lineHeight();

            // Load Flag Image
            const locale = SimpleLocalization.locale;
            const filename = "flag_" + locale;
            const bitmap = ImageManager.loadSystem(filename);

            if (!bitmap.isReady()) {
                bitmap.addLoadListener(() => {
                    if (this.visible) this.refresh();
                });
            }

            // Draw Title
            let title = SimpleLocalization.getText('picker_title');
            if (title === 'picker_title') title = "---- Language ----";
            this.drawText(title, 0, 0, width, 'center');

            // Draw Content
            const langName = SimpleLocalization.getText('lang_name');
            const arrowLeft = "< ";
            const arrowRight = " >";
            
            const nameWidth = this.textWidth(langName);
            const flagWidth = bitmap.isReady() ? bitmap.width + 10 : 0;
            const arrowsWidth = this.textWidth(arrowLeft + arrowRight);
            const totalWidth = arrowsWidth + flagWidth + nameWidth;
            
            let startX = (width - totalWidth) / 2;
            const contentY = lineHeight * 1.5;

            this.drawText(arrowLeft, startX, contentY, this.textWidth(arrowLeft), 'left');
            startX += this.textWidth(arrowLeft);

            if (bitmap.isReady()) {
                const flagY = contentY + (lineHeight - bitmap.height) / 2;
                this.contents.blt(bitmap, 0, 0, bitmap.width, bitmap.height, startX, flagY);
                startX += flagWidth;
            }

            this.drawText(langName, startX, contentY, nameWidth, 'left');
            startX += nameWidth;

            this.drawText(arrowRight, startX, contentY, this.textWidth(arrowRight), 'left');
        }

        processOk() {
            if (this._okHandler) this._okHandler();
        }

        processCancel() {
            if (this._cancelHandler) this._cancelHandler();
        }

        setOkHandler(method) { this._okHandler = method; }
        setCancelHandler(method) { this._cancelHandler = method; }
    }

    // --- 5. TITLE SCREEN INTEGRATION ---
    
    if (showOnTitle) {
        const _Window_TitleCommand_makeCommandList = Window_TitleCommand.prototype.makeCommandList;
        Window_TitleCommand.prototype.makeCommandList = function() {
            _Window_TitleCommand_makeCommandList.call(this);
            const name = SimpleLocalization.getText('lang_name');
            const txt = (name !== 'lang_name') ? name : "Language";
            this.addCommand(txt, 'language');
        };
    }

    const _Scene_Title_create = Scene_Title.prototype.create;
    Scene_Title.prototype.create = function() {
        _Scene_Title_create.call(this);
        this.createLanguagePicker();
    };

    Scene_Title.prototype.createLanguagePicker = function() {
        const rect = this.languagePickerRect();
        this._langPicker = new Window_LanguagePicker(rect);
        this._langPicker.setOkHandler(this.onPickerOk.bind(this));
        this._langPicker.setCancelHandler(this.onPickerCancel.bind(this));
        this.addWindow(this._langPicker);
    };

    Scene_Title.prototype.languagePickerRect = function() {
        const w = 500;
        const h = 180;
        const x = (Graphics.boxWidth - w) / 2;
        const y = (Graphics.boxHeight - h) / 2;
        return new Rectangle(x, y, w, h);
    };

    const _Scene_Title_commandNewGame = Scene_Title.prototype.commandNewGame;
    Scene_Title.prototype.commandNewGame = function() {
        if (useNewGamePicker) {
            this._commandWindow.hide();
            this._commandWindow.deactivate();

            if (this._comSprites) this._comSprites.forEach(s => s.visible = false);
            if (this._comCursor) this._comCursor.visible = false;

            if (this._backSprite1) this._backSprite1.opacity = 0;
            if (this._backSprite2) this._backSprite2.opacity = 0;
            if (this._gameTitleSprite) this._gameTitleSprite.opacity = 0;

            this._langPicker.refresh();
            this._langPicker.show();
            this._langPicker.activate();
        } else {
            _Scene_Title_commandNewGame.call(this);
        }
    };

    Scene_Title.prototype.onPickerOk = function() {
        this._langPicker.close();
        this._langPicker.deactivate();
        DataManager.setupNewGame();
        this._commandWindow.close();
        this.fadeOutAll();
        SceneManager.goto(Scene_Map);
    };

    Scene_Title.prototype.onPickerCancel = function() {
        this._langPicker.hide();
        this._langPicker.deactivate();

        this._commandWindow.show();
        this._commandWindow.activate();

        if (this._comSprites) this._comSprites.forEach(s => s.visible = true);
        if (this._comCursor) this._comCursor.visible = true;

        if (this._backSprite1) this._backSprite1.opacity = 255;
        if (this._backSprite2) this._backSprite2.opacity = 255;
        if (this._gameTitleSprite) this._gameTitleSprite.opacity = 255;
    };

    const _Scene_Title_createCommandWindow = Scene_Title.prototype.createCommandWindow;
    Scene_Title.prototype.createCommandWindow = function() {
        _Scene_Title_createCommandWindow.call(this);
        this._commandWindow.setHandler('language', this.commandLanguage.bind(this));
    };

    Scene_Title.prototype.commandLanguage = function() {
        SimpleLocalization.cycleLanguage();
        SoundManager.playOk();
        this._commandWindow.refresh();
        this._commandWindow.activate(); 
    };

})();