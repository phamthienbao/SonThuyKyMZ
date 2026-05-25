/*:
 * @target MZ
 * @plugindesc [v4.0] Simple Localization (Stable - Fix Title Freeze).
 * @author Gemini
 *
 * @help
 * ============================================================================
 * ## HƯỚNG DẪN SỬ DỤNG
 * ============================================================================
 * 1. File dữ liệu:
 * Tạo file "data/Languages.csv" trong thư mục dự án.
 *
 * 2. Nội dung CSV mẫu (Copy vào Excel/Notepad):
 * Key,        vi,           en
 * lang_name,  Tiếng Việt,   English
 * cmd_lang,   Ngôn ngữ,     Language
 * cmd_new,    Trò chơi mới, New Game
 * cmd_continue,Tiếp tục,    Continue
 * cmd_options,Cấu hình,     Options
 *
 * 3. Lưu ý:
 * - File CSV phải Save As dạng "CSV UTF-8" để không lỗi font.
 * - Code này đã sửa lỗi treo Title và RangeError.
 *
 * ============================================================================
 * @param Show on Title
 * @text Hiển thị ở Title
 * @desc Hiển thị nút đổi ngôn ngữ ở màn hình chính?
 * @type boolean
 * @default true
 *
 * @param Default Language
 * @text Ngôn ngữ mặc định
 * @desc Mã ngôn ngữ (vi, en...)
 * @default vi
 */

(() => {
    const pluginName = "SimpleLocalization";
    const params = PluginManager.parameters(pluginName);
    const showOnTitle = params['Show on Title'] === 'true';

    // --- 1. CORE MANAGER ---
    class LocalizationManager {
        constructor() {
            this._locale = params['Default Language'] || 'vi';
            this._data = {
                "vi": { "lang_name": "Tiếng Việt", "cmd_lang": "Ngôn ngữ" },
                "en": { "lang_name": "English", "cmd_lang": "Language" }
            };
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
                    try { this._data = JSON.parse(xhr.responseText); } catch (e) {}
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
                ConfigManager.save();
                
                // FIX: Chỉ refresh window, KHÔNG reload scene
                if (SceneManager._scene) {
                    const wins = SceneManager._scene._windowLayer.children;
                    wins.forEach(w => {
                        if (typeof w.refresh === 'function') {
                            w.refresh(); // Vẽ lại text mới
                        }
                    });
                }
            }
        }

        cycleLanguage() {
            const keys = Object.keys(this._data);
            const valid = keys.filter(k => this._data[k] && typeof this._data[k] === 'object');
            if (valid.length > 0) {
                let idx = valid.indexOf(this._locale);
                let next = (idx + 1) % valid.length;
                this.setLanguage(valid[next]);
            }
        }

        getText(key) {
            const dict = this._data[this._locale];
            return (dict && dict[key]) ? dict[key] : key;
        }

        process(text) {
            if (typeof text !== 'string') return text;
            return text.replace(/\{(.*?)\}/g, (match, key) => {
                return this.getText(key.trim());
            });
        }
    }

    window.SimpleLocalization = new LocalizationManager();

    // --- 2. INTEGRATION (SAFE HOOKS) ---

    // Dịch các đoạn hội thoại, mô tả item...
    const _Window_Base_convertEscapeCharacters = Window_Base.prototype.convertEscapeCharacters;
    Window_Base.prototype.convertEscapeCharacters = function(text) {
        text = SimpleLocalization.process(text);
        return _Window_Base_convertEscapeCharacters.call(this, text);
    };

    // Dịch Menu Command (Title, Main Menu)
    const _Window_Command_addCommand = Window_Command.prototype.addCommand;
    Window_Command.prototype.addCommand = function(name, symbol, enabled, ext) {
        // Dịch tên lệnh trước khi thêm vào danh sách
        name = SimpleLocalization.process(name);
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
    
    // Hỗ trợ nút Trái/Phải trong Options
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
            SimpleLocalization.cycleLanguage(); 
            SoundManager.playCursor();
            this.refresh();
            return;
        }
        _Window_Options_cursorLeft.call(this, wrap);
    };

    // --- 4. TITLE SCREEN (FIXED FREEZE) ---
    
    if (showOnTitle) {
        const _Window_TitleCommand_makeCommandList = Window_TitleCommand.prototype.makeCommandList;
        Window_TitleCommand.prototype.makeCommandList = function() {
            _Window_TitleCommand_makeCommandList.call(this);
            const name = SimpleLocalization.getText('lang_name');
            const txt = (name !== 'lang_name') ? name : "Language";
            this.addCommand(txt, 'language');
        };

        const _Scene_Title_createCommandWindow = Scene_Title.prototype.createCommandWindow;
        Scene_Title.prototype.createCommandWindow = function() {
            _Scene_Title_createCommandWindow.call(this);
            this._commandWindow.setHandler('language', this.commandLanguage.bind(this));
        };

        Scene_Title.prototype.commandLanguage = function() {
            // Bước 1: Đổi ngôn ngữ
            SimpleLocalization.cycleLanguage();
            SoundManager.playOk();
            
            // Bước 2: Chỉ Refresh Window (KHÔNG dùng this.start())
            // refresh() sẽ gọi lại makeCommandList -> cập nhật text mới
            this._commandWindow.refresh();
            
            // Bước 3: Giữ con trỏ chuột/bàn phím ở lại nút Language
            this._commandWindow.activate(); 
        };
    }
})();