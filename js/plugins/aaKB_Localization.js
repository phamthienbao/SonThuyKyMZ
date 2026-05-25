/*:
 * @target MZ
 * @plugindesc [v1.5] Hệ thống đa ngôn ngữ (Fix Vị trí UI).
 * @author KB (Dev)
 *
 * @help
 * ============================================================================
 * [Code Header Omitted for Brevity]
 * ============================================================================
 *
 * @param --- Cấu Hình Chung ---
 * @default
 *
 * @param Default Language
 * @text Ngôn ngữ mặc định
 * @desc Mã ngôn ngữ khởi chạy lần đầu (vi, en, jp...).
 * @default vi
 *
 * @param --- Màn Hình Title ---
 * @default
 *
 * @param Show on Title
 * @text Nút Ngôn ngữ (Menu)
 * @desc Hiển thị dòng lệnh "Ngôn ngữ" (Language) ở menu chính?
 * @type boolean
 * @default true
 *
 * @param New Game Picker
 * @text Bảng Chọn khi New Game
 * @desc Hiển thị giao diện chọn ngôn ngữ + lá cờ khi bấm New Game?
 * @type boolean
 * @default true
 *
 * @param --- Cấu Hình Options ---
 * @default
 *
 * @param Show on Options Menu
 * @text Nút Ngôn ngữ (Options)
 * @desc Hiển thị dòng lệnh "Ngôn ngữ" trong Menu Cấu hình (Options)?
 * @type boolean
 * @default true
 */

(() => {
    const pluginName = "KB_Localization";
    const params = PluginManager.parameters(pluginName);
    const showOnTitle = params['Show on Title'] === 'true';
    const useNewGamePicker = params['New Game Picker'] === 'true';
    const showOnOptionsMenu = params['Show on Options Menu'] === 'true';

    // --- 1. KB LOCALIZATION MANAGER (CORE) ---
    class KB_LocalizationManager {
        constructor() {
            this._locale = params['Default Language'] || 'vi';
            this._data = {
                "vi": { "lang_name": "Tiếng Việt" },
                "en": { "lang_name": "English" }
            };
            this._cache = {}; // Smart Cache System
            this.loadData();
        }

        get locale() { return this._locale; }

        getAvailableLocales() {
            return Object.keys(this._data).filter(k => this._data[k] && typeof this._data[k] === 'object');
        }

        getLanguageNameByCode(localeCode) {
            const dict = this._data[localeCode];
            return (dict && dict['lang_name']) ? dict['lang_name'] : localeCode;
        }

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
            this._cache = {}; 
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
            this._cache = {};
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
                this._cache = {}; 
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
            const keys = this.getAvailableLocales();
            if (keys.length > 0) {
                let idx = keys.indexOf(this._locale);
                if (reverse) {
                    idx = (idx - 1 + keys.length) % keys.length;
                } else {
                    idx = (idx + 1) % keys.length;
                }
                this.setLanguage(keys[idx]);
            }
        }

        getText(key) {
            const dict = this._data[this._locale];
            return (dict && dict[key]) ? dict[key] : key;
        }

        process(text) {
            if (typeof text !== 'string') return text;
            if (text.indexOf('{') === -1) return text;
            if (this._cache[text]) return this._cache[text];
            const result = text.replace(/\{(.*?)\}/g, (match, key) => {
                return this.getText(key.trim());
            });
            this._cache[text] = result;
            return result;
        }
    }

    window.KBLocalization = new KB_LocalizationManager();

    // --- 2. SYSTEM INTEGRATION ---

    const _Window_Base_convertEscapeCharacters = Window_Base.prototype.convertEscapeCharacters;
    Window_Base.prototype.convertEscapeCharacters = function(text) {
        if (text) text = KBLocalization.process(text);
        return _Window_Base_convertEscapeCharacters.call(this, text);
    };

    const _Window_Command_addCommand = Window_Command.prototype.addCommand;
    Window_Command.prototype.addCommand = function(name, symbol, enabled, ext) {
        if (name) name = KBLocalization.process(name);
        _Window_Command_addCommand.call(this, name, symbol, enabled, ext);
    };

    // --- 3. OPTIONS MENU (CONDITIONAL) ---
    
    const _ConfigManager_makeData = ConfigManager.makeData;
    ConfigManager.makeData = function() {
        const config = _ConfigManager_makeData.call(this);
        config.locale = KBLocalization.locale;
        return config;
    };

    const _ConfigManager_applyData = ConfigManager.applyData;
    ConfigManager.applyData = function(config) {
        _ConfigManager_applyData.call(this, config);
        if (config.locale) KBLocalization.setLanguage(config.locale);
    };

    if (showOnOptionsMenu) {
        const _Window_Options_addGeneralOptions = Window_Options.prototype.addGeneralOptions;
        Window_Options.prototype.addGeneralOptions = function() {
            _Window_Options_addGeneralOptions.call(this);
            this.addCommand('{cmd_lang}', 'locale');
        };

        const _Window_Options_statusText = Window_Options.prototype.statusText;
        Window_Options.prototype.statusText = function(index) {
            if (this.commandSymbol(index) === 'locale') {
                const name = KBLocalization.getText('lang_name');
                return name !== 'lang_name' ? name : KBLocalization.locale.toUpperCase();
            }
            return _Window_Options_statusText.call(this, index);
        };

        const _Window_Options_processOk = Window_Options.prototype.processOk;
        Window_Options.prototype.processOk = function() {
            if (this.commandSymbol(this.index()) === 'locale') {
                KBLocalization.cycleLanguage();
                SoundManager.playOk();
                this.refresh();
                return;
            }
            _Window_Options_processOk.call(this);
        };
        
        const _Window_Options_cursorRight = Window_Options.prototype.cursorRight;
        Window_Options.prototype.cursorRight = function(wrap) {
            if (this.commandSymbol(this.index()) === 'locale') {
                KBLocalization.cycleLanguage();
                SoundManager.playCursor();
                this.refresh();
                return;
            }
            _Window_Options_cursorRight.call(this, wrap);
        };
        
        const _Window_Options_cursorLeft = Window_Options.prototype.cursorLeft;
        Window_Options.prototype.cursorLeft = function(wrap) {
            if (this.commandSymbol(this.index()) === 'locale') {
                KBLocalization.cycleLanguage(true); 
                SoundManager.playCursor();
                this.refresh();
                return;
            }
            _Window_Options_cursorLeft.call(this, wrap);
        };
    }

    // --- 4. NEW WINDOW: HORIZONTAL LANGUAGE SELECT (FIXED DRAWING) ---
    
    class Window_SelectLanguage extends Window_Selectable {
        constructor(rect) {
            // Đặt chiều cao lớn hơn để chứa Header và 2 hàng Selectable
            rect.height = ImageManager.iconHeight * 2.5 + rect.lineHeight * 2; 
            super(rect);
            this.opacity = 255;
            this.hide();
            this.deactivate();
            this._languageCodes = KBLocalization.getAvailableLocales();
            this._selectedIndex = this._languageCodes.indexOf(KBLocalization.locale); 
            
            if (this._selectedIndex === -1) this._selectedIndex = 0;
            this.select(this._selectedIndex);
        }

        // --- CÁC HÀM CUSTOM CHO LAYOUT ---
        headerHeight() {
            return this.lineHeight() * 1.5;
        }
        
        selectableHeight() {
            // Chiều cao cho khu vực chọn (không tính header)
            return this.height - this.padding * 2;
        }

        maxItems() {
            return this._languageCodes.length + 1;
        }

        maxCols() {
            return this._languageCodes.length;
        }
        
        itemRect(index) {
            const rect = new Rectangle();
            const maxCols = this.maxCols();
            const buttonRectHeight = this.lineHeight() * 1.5;

            // --- NGÔN NGỮ (Hàng trên) ---
            if (index < maxCols) { 
                const buttonWidth = this.itemWidth();
                rect.width = buttonWidth;
                rect.height = this.itemHeight();
                rect.x = index * buttonWidth;
                rect.y = 0; // Vị trí Y tương đối (relative) trong vùng Selectable
            } else {
            // --- NÚT OK (Hàng dưới, full width) ---
                rect.width = this.contentsWidth();
                rect.height = buttonRectHeight;
                rect.x = 0;
                rect.y = this.itemHeight(); 
            }
            return rect;
        }
        
        itemWidth() {
            const width = this.contentsWidth();
            return Math.floor(width / this._languageCodes.length);
        }
        
        itemHeight() {
            return Math.max(ImageManager.iconHeight, this.lineHeight()) + 8;
        }

        itemAt(index) {
            if (index < this._languageCodes.length) {
                return this._languageCodes[index];
            }
            return 'ok'; 
        }

        // FIX DRAWING: Di chuyển nội dung và cursor xuống dưới Header
        refresh() {
            this.contents.clear();
            const width = this.contentsWidth();

            // 1. Draw Title (Vẽ cố định tại Y=0)
            let title = KBLocalization.getText('picker_title');
            if (title === 'picker_title') title = "---- Language ----";
            this.changeTextColor(ColorManager.systemColor());
            this.drawText(title, 0, 0, width, 'center');
            this.resetTextColor();
            
            // 2. TẠO OFFSET CHO KHU VỰC SELECTABLE
            this.contents.translate(0, this.headerHeight());

            // 3. Draw Selectable Items
            this.drawAllItems();
            
            // 4. RESET OFFSET
            this.contents.translate(0, -this.headerHeight());
        }
        
        drawItem(index) {
            const rect = this.itemRect(index);
            const localeCode = this.itemAt(index);

            this.resetTextColor();
            this.changePaintOpacity(true); 

            // --- VẼ NÚT OK ---
            if (localeCode === 'ok') {
                const okText = KBLocalization.getText('ok_confirm') || 'OK';
                this.drawText(okText, rect.x, rect.y, rect.width, 'center');
                return;
            }

            // --- VẼ NÚT NGÔN NGỮ ---
            const name = KBLocalization.getLanguageNameByCode(localeCode);
            const filename = "flag_" + localeCode;
            const bitmap = ImageManager.loadSystem(filename);
            
            if (!bitmap.isReady()) {
                bitmap.addLoadListener(this.refresh.bind(this));
                return;
            }
            
            // Tính toán vị trí
            const contentWidth = bitmap.width + this.textWidth(name) + 4;
            const flagX = rect.x + (rect.width - contentWidth) / 2;
            const flagY = rect.y + (rect.height - bitmap.height) / 2;
            const nameX = flagX + bitmap.width + 4;
            
            // Vẽ ảnh lá cờ
            this.contents.blt(bitmap, 0, 0, bitmap.width, bitmap.height, flagX, flagY);
            
            // Vẽ tên ngôn ngữ
            this.drawText(name, nameX, rect.y, this.textWidth(name), 'left');
            
            // Highlight ngôn ngữ đang được chọn
            if (localeCode === KBLocalization.locale) {
                this.contents.fillRect(rect.x + 1, rect.y + 1, rect.width - 2, rect.height - 2, 'rgba(0, 255, 0, 0.1)');
            }
        }
        
        // Điều chỉnh hành vi di chuyển chuột
        cursorDown(wrap) {
            if (this.index() < this._languageCodes.length) {
                this.select(this._languageCodes.length); 
            } else {
                this.select(0); 
            }
        }
        
        cursorUp(wrap) {
            if (this.index() >= this._languageCodes.length) {
                this.select(this._selectedIndex); 
            } else {
                this.select(this._languageCodes.length); 
            }
        }
        
        cursorLeft(wrap) {
            if (this.index() < this._languageCodes.length) {
                super.cursorLeft(wrap);
                this._selectedIndex = this.index();
            }
        }
        
        cursorRight(wrap) {
            if (this.index() < this._languageCodes.length) {
                super.cursorRight(wrap);
                this._selectedIndex = this.index();
            }
        }

        getSelectedLocaleCode() {
            if (this.index() < this._languageCodes.length) {
                return this._languageCodes[this.index()];
            }
            return this._languageCodes[this._selectedIndex];
        }

        processOk() {
            const index = this.index();
            
            if (index < this._languageCodes.length) {
                const selectedCode = this._languageCodes[index];
                KBLocalization.setLanguage(selectedCode);
                SoundManager.playCursor();
                this._selectedIndex = index; 
                this.refresh();
            } else if (index === this._languageCodes.length) {
                const finalCode = this.getSelectedLocaleCode();
                KBLocalization.setLanguage(finalCode); 
                SoundManager.playOk();
                this.callHandler('ok');
            }
        }
        
        processCancel() {
            this.callHandler('cancel');
        }
        
        cursorMovable() {
            return this.active;
        }
    }

    // --- 5. TITLE SCREEN INTEGRATION ---
    
    Scene_Title.prototype.createLanguagePicker = function() {
        const rect = this.languagePickerRect();
        this._langPicker = new Window_SelectLanguage(rect);
        this._langPicker.setHandler('ok', this.onPickerOk.bind(this));
        this._langPicker.setHandler('cancel', this.onPickerCancel.bind(this));
        this.addWindow(this._langPicker);
    };
    
    Scene_Title.prototype.languagePickerRect = function() {
        const w = 600; 
        const h = 250; 
        const x = (Graphics.boxWidth - w) / 2;
        const y = (Graphics.boxHeight - h) / 2;
        return new Rectangle(x, y, w, h);
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

        if (this._backSprite1) this._backSprite1.opacity = 255;
        if (this._backSprite2) this._backSprite2.opacity = 255;
        if (this._gameTitleSprite) this._gameTitleSprite.opacity = 255;
        
        if (this._comSprites) {
            this._comSprites.forEach(s => s.visible = true);
        }
        if (this._comCursor) {
            this._comCursor.visible = true;
        }
    };
    
    // --- 6. KHỞI TẠO VÀ CHUYỂN ĐỘNG (SETUP & MOG HIDE FIX) ---

    if (showOnTitle) {
        const _Window_TitleCommand_makeCommandList = Window_TitleCommand.prototype.makeCommandList;
        Window_TitleCommand.prototype.makeCommandList = function() {
            _Window_TitleCommand_makeCommandList.call(this);
            const name = KBLocalization.getText('lang_name');
            const txt = (name !== 'lang_name') ? name : "Language";
            this.addCommand(txt, 'language');
        };
    }

    const _Scene_Title_create = Scene_Title.prototype.create;
    Scene_Title.prototype.create = function() {
        _Scene_Title_create.call(this);
        this.createLanguagePicker();
    };

    const _Scene_Title_createCommandWindow = Scene_Title.prototype.createCommandWindow;
    Scene_Title.prototype.createCommandWindow = function() {
        _Scene_Title_createCommandWindow.call(this);
        this._commandWindow.setHandler('language', this.commandLanguage.bind(this));
    };
    
    const _Scene_Title_update = Scene_Title.prototype.update;
    Scene_Title.prototype.update = function() {
        _Scene_Title_update.call(this);

        if (this._langPicker && this._langPicker.visible) {
            if (this._comSprites) {
                this._comSprites.forEach(s => s.visible = false);
            }
            if (this._comCursor) {
                this._comCursor.visible = false;
            }
        }
    };

    const _Scene_Title_commandNewGame = Scene_Title.prototype.commandNewGame;
    Scene_Title.prototype.commandNewGame = function() {
        if (useNewGamePicker) {
            this._commandWindow.hide();
            this._commandWindow.deactivate();

            if (this._backSprite1) this._backSprite1.opacity = 0;
            if (this._backSprite2) this._backSprite2.opacity = 0;
            if (this._gameTitleSprite) this._gameTitleSprite.opacity = 0;

            this._langPicker.select(this._langPicker._selectedIndex);
            this._langPicker.refresh();
            this._langPicker.show();
            this._langPicker.activate();
        } else {
            _Scene_Title_commandNewGame.call(this);
        }
    };

    Scene_Title.prototype.commandLanguage = function() {
        KBLocalization.cycleLanguage();
        SoundManager.playOk();
        this._commandWindow.refresh();
        this._commandWindow.activate(); 
    };

})();