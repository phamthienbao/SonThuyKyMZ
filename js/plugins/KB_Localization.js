/*:
 * @target MZ
 * @plugindesc [v2.7] Hệ thống đa ngôn ngữ & Giao diện chọn ngôn ngữ (KB Edition).
 * @author KB (Dev)
 *
 * @help
 * ============================================================================
 * _  __ ____    _                    _ _           _   _ 
 * | |/ /|  _ \  | |    ___   ___ __ _| (_)______ _ | |_(_) ___  _ __ 
 * | ' / | |_) | | |   / _ \ / __/ _` | | |_  / _` || __| |/ _ \| '_ \ 
 * | . \ |  _ <  | |__| (_) | (_| (_| | | |/ / (_| || |_| | (_) | | | |
 * |_|\_\|_| \_\ |_____\___/ |___\__,_|_|_/___\__,_| \__|_|\___/|_| |_|
 * * ============================================================================
 * ## GIỚI THIỆU
 * ============================================================================
 * Plugin độc quyền giúp quản lý đa ngôn ngữ cho dự án game. 
 * Tích hợp tính năng "Language Picker" (Chọn ngôn ngữ) đẹp mắt khi New Game.
 * Tương thích hoàn toàn với KB_TitleCommands (MOG) để ẩn giao diện cũ.
 *
 * * Phiên bản V2.6: Sửa các lỗi sau:
 * * - Thêm onerror handler cho XHR (loadCSV, loadJSON).
 * * - Bảo vệ null safety cho _windowLayer trong setLanguage().
 * * - Sửa getText() để xử lý đúng value rỗng ("").
 * * - CSV delimiter được đưa lên Plugin Manager để cấu hình.
 * * - Sửa parseCSVLine() để xử lý đúng escaped quotes ("").
 * * - Sửa key 'escape' không hợp lệ trong Input.isTriggered().
 * * - Sửa onPickerOk() để gọi đúng luồng chuyển scene của RMMZ.
 *
 * ============================================================================
 * ## HƯỚNG DẪN CÀI ĐẶT (SETUP GUIDE)
 * ============================================================================
 * 1. CÀI ĐẶT: 
 * - Đặt KB_CoreEngine.js ở trên cùng.
 * - Đặt KB_Localization.js ở dưới KB_CoreEngine.js.
 *
 * 2. CHUẨN BỊ THƯ MỤC & DỮ LIỆU:
 * - Thư mục gốc: <Data Root Folder>/ (mặc định: locales/, ở project root,
 *   KHÔNG phải trong data/).
 * - Tạo các thư mục con theo Mã ngôn ngữ (ví dụ: vi, en).
 * - Đặt các file dịch (chung tên) vào các thư mục tương ứng.
 *   Ví dụ: locales/vi/General.csv, locales/en/General.csv
 * - Tuỳ chọn: file CHUNG đa cột (tag;en;vi;...) đặt ngay tại Data Root Folder.
 *   Khai báo trong param "Shared Files" để plugin tải 1 lần và pick đúng cột
 *   cho mỗi locale. Ví dụ: locales/charactor.csv chứa cả en + vi.
 *
 * 3. CẤU HÌNH PLUGIN MANAGER:
 * - **Available Locales**: Điền các mã ngôn ngữ (ví dụ: vi, en).
 * - **Data Type**: Chọn loại file bạn dùng (CSV hoặc JSON).
 * - **Data Files**: Điền TÊN các file dữ liệu (ví dụ: General, Quests). KHÔNG cần điền .csv hay .json.
 * - **CSV Delimiter**: Dấu phân cách cột trong file CSV (mặc định: ;).
 * * 4. CHUẨN BỊ ẢNH LÁ CỜ & NÚT OK:
 * - Ảnh lá cờ: flag_[MãNgônNgữ].png (Ví dụ: flag_vi.png).
 * - **Ảnh nút OK**: Button_OK.png
 * - Chép cả hai vào thư mục: img/system/
 *
 * ============================================================================
 * @param --- Cấu Hình Ngôn Ngữ ---
 * @default
 *
 * @param Default Language
 * @text Ngôn ngữ mặc định
 * @desc Mã ngôn ngữ khởi chạy lần đầu (vi, en, jp...).
 * @default vi
 *
 * @param Available Locales
 * @text Mã Ngôn ngữ khả dụng
 * @desc Danh sách các mã ngôn ngữ, cách nhau bằng dấu phẩy (Ví dụ: vi, en, jp).
 * @default vi, en
 *
 * @param --- Cấu Hình Dữ Liệu ---
 * @default
 *
 * @param Data Root Folder
 * @text Thư mục Gốc
 * @desc Thư mục gốc chứa các folder ngôn ngữ. (Mặc định: locales)
 * @default locales
 *
 * @param Data Type
 * @text Loại File Dữ liệu
 * @desc Chọn loại file dữ liệu để tải. (CSV hoặc JSON)
 * @type select
 * @option CSV
 * @option JSON
 * @default CSV
 *
 * @param Data Files
 * @text Tên File Dữ liệu (per-locale)
 * @desc Tên file ở <root>/<locale>/<file>.csv, cách nhau bằng dấu phẩy. KHÔNG cần điền đuôi mở rộng.
 * @default Languages
 * @type string
 *
 * @param Shared Files
 * @text Tên File Dữ liệu (shared, đa cột)
 * @desc Tên file CSV đa cột ở thẳng <root>/<file>.csv (tag;en;vi;...). Cách nhau bằng dấu phẩy.
 * @default main, title, charactor
 * @type string
 *
 * @param CSV Delimiter
 * @text Dấu Phân Cách CSV
 * @desc Ký tự phân cách cột trong file CSV. Mặc định là dấu chấm phẩy (;). Dùng dấu phẩy (,) nếu cần.
 * @default ;
 * @type string
 *
 * @param --- Tính Năng Giao Diện ---
 * @default
 *
 * @param Show on Title
 * @text Nút Ngôn ngữ (Menu Title)
 * @desc Hiển thị dòng lệnh "Ngôn ngữ" ở menu chính?
 * @type boolean
 * @default true
 *
 * @param Show in Options
 * @text Ngôn ngữ (Menu Option)
 * @desc Hiển thị tùy chọn "Ngôn ngữ" trong Menu Tùy chọn (Options)?
 * @type boolean
 * @default true
 *
 * @param New Game Picker
 * @text Bảng Chọn khi New Game
 * @desc Hiển thị giao diện chọn ngôn ngữ + lá cờ khi bấm New Game?
 * @type boolean
 * @default true
 */

// Yêu cầu KB_CoreEngine.js phải được bật và nằm ở trên.
if (!Imported.KB_Core) {
    throw new Error("Plugin này yêu cầu KB_CoreEngine.js để hoạt động! Vui lòng đặt nó ở trên.");
}

(() => {
    const pluginName = "KB_Localization";
    const params = PluginManager.parameters(pluginName);
    
    // --- LẤY THAM SỐ VÀ PHÂN TÍCH ---
    const dataRootFolder = params['Data Root Folder'] || 'locales';
    const dataType = params['Data Type'].toUpperCase();
    const fileExtension = dataType === 'CSV' ? '.csv' : '.json';
    
    // [FIX] Delimiter được lấy từ Plugin Manager thay vì hardcode
    const csvDelimiter = (params['CSV Delimiter'] || ';').trim()[0] || ';';

    const dataFilesStr = params['Data Files'] || 'Languages';
    const sharedFilesStr = params['Shared Files'] || 'main, title, charactor';
    const localesStr = params['Available Locales'] || 'vi,en';

    // Tách thành mảng, loại bỏ khoảng trắng, và thêm đuôi mở rộng
    const dataFiles = dataFilesStr.split(',').map(f => f.trim()).filter(f => f.length > 0).map(f => f + fileExtension);
    const sharedFiles = sharedFilesStr.split(',').map(f => f.trim()).filter(f => f.length > 0).map(f => f + fileExtension);
    const availableLocales = localesStr.split(',').map(f => f.trim()).filter(f => f.length > 0);

    const showOnTitle = KB.Utils.isTrue(params['Show on Title']);
    const showInOptions = KB.Utils.isTrue(params['Show in Options']);
    const useNewGamePicker = KB.Utils.isTrue(params['New Game Picker']);

    // --- 1. CORE MANAGER ---
    class KB_LocalizationManager {
        constructor() {
            this._locale = params['Default Language'] || 'vi';
            this._data = {}; // Dữ liệu dịch thuật
            this._cache = {}; // Cache cho hàm process(text)
            this._availableLocales = availableLocales;
            // Khởi tạo các locale cơ bản để đảm bảo getText không lỗi
            this._availableLocales.forEach(locale => {
                if (!this._data[locale]) this._data[locale] = {};
            });
            this.loadData();
        }

        get locale() { return this._locale; }

        loadData() {
            // Per-locale files: <root>/<locale>/<fileName>.
            // (Path bug fix v2.7 — no more hardcoded "data/" prefix. The root
            // folder is now exactly what the user typed; "locales" means the
            // project-root locales/ folder.)
            this._availableLocales.forEach(locale => {
                dataFiles.forEach(fileName => {
                    const url = `${dataRootFolder}/${locale}/${fileName}`;
                    if (dataType === 'CSV') {
                        this.loadCSV(url, locale);
                    } else if (dataType === 'JSON') {
                        this.loadJSON(url, locale);
                    }
                });
            });

            // Shared files: <root>/<fileName>. Multi-column CSVs (tag;en;vi;...)
            // sit at the root and contain all locales in one file. We issue
            // one XHR per locale because parseCSV() picks the column matching
            // the target locale. JSON shared files aren't supported here —
            // use per-locale folders for JSON.
            if (dataType === 'CSV') {
                sharedFiles.forEach(fileName => {
                    const url = `${dataRootFolder}/${fileName}`;
                    this._availableLocales.forEach(locale => {
                        this.loadCSV(url, locale);
                    });
                });
            }
        }

        loadJSON(url, locale) {
            const xhr = new XMLHttpRequest();
            xhr.open('GET', url);
            xhr.overrideMimeType('application/json');
            xhr.onload = () => {
                if (xhr.status < 400) {
                    // Sử dụng KB.Utils.parseJSON an toàn
                    const jsonData = KB.Utils.parseJSON(xhr.responseText, null, `Localization JSON: ${url}`);
                    if (jsonData) {
                        this.mergeData(jsonData, locale);
                    }
                } else {
                    // [FIX] Log lỗi HTTP (404, v.v.)
                    console.warn(`[KB_Localization] Lỗi HTTP ${xhr.status} khi tải file: ${url}`);
                }
            };
            // [FIX] Xử lý lỗi mạng (file không tồn tại, mất kết nối, v.v.)
            xhr.onerror = () => {
                console.warn(`[KB_Localization] Không thể tải file JSON: ${url}`);
            };
            xhr.send();
        }

        loadCSV(url, locale) {
            const xhr = new XMLHttpRequest();
            xhr.open('GET', url);
            xhr.onload = () => {
                if (xhr.status < 400) {
                    this.parseCSV(xhr.responseText, locale);
                } else {
                    // [FIX] Log lỗi HTTP
                    console.warn(`[KB_Localization] Lỗi HTTP ${xhr.status} khi tải file: ${url}`);
                }
            };
            // [FIX] Xử lý lỗi mạng
            xhr.onerror = () => {
                console.warn(`[KB_Localization] Không thể tải file CSV: ${url}`);
            };
            xhr.send();
        }
        
        // Gộp dữ liệu mới vào đúng locale
        mergeData(newLocaleData, locale) {
            if (!this._data[locale]) this._data[locale] = {};
            // Gộp key-value của file mới vào locale hiện tại
            Object.assign(this._data[locale], newLocaleData);
            this._cache = {};
        }

        // Đọc CSV và gộp vào các locale tương ứng
        parseCSV(text, targetLocale) {
            const lines = text.trim().split(/\r?\n/);
            if (lines.length < 2) return;
            if (lines[0].charCodeAt(0) === 0xFEFF) lines[0] = lines[0].substr(1);

            const headers = this.parseCSVLine(lines[0]);
            
            // Tìm index của cột ngôn ngữ mục tiêu (targetLocale)
            const targetIndex = headers.findIndex(h => h.trim() === targetLocale);
            let valueIndex;

            if (targetIndex !== -1) {
                // Nếu tìm thấy cột ngôn ngữ mục tiêu trong header, dùng nó
                valueIndex = targetIndex;
            } else if (headers.length >= 2) {
                // Nếu không tìm thấy, giả định file này chỉ có 2 cột: Key (0) và Value (1)
                valueIndex = 1;
            } else {
                return; // File quá ít cột, bỏ qua
            }
            
            if (!this._data[targetLocale]) this._data[targetLocale] = {};
            
            for (let i = 1; i < lines.length; i++) {
                const row = this.parseCSVLine(lines[i]);
                if (row.length < 2) continue;
                const key = row[0].trim();
                if (!key) continue; // Bỏ qua hàng không có key
                
                // [FIX] Lấy giá trị, giữ nguyên chuỗi rỗng thay vì fallback về undefined
                let val = (row[valueIndex] !== undefined) ? row[valueIndex] : "";
                val = val.replace(/^"|"$/g, '').replace(/""/g, '"');
                this._data[targetLocale][key] = val;
            }
            this._cache = {};
        }

        // [FIX] parseCSVLine: xử lý đúng escaped quotes ("") và dùng delimiter từ config
        parseCSVLine(text) {
            const delimiter = csvDelimiter;
            const res = [];
            let start = 0;
            let inQ = false;
            for (let i = 0; i < text.length; i++) {
                if (text[i] === '"') {
                    // Kiểm tra escaped quote ("") - nếu ký tự tiếp theo cũng là " thì bỏ qua
                    if (inQ && i + 1 < text.length && text[i + 1] === '"') {
                        i++; // Nhảy qua ký tự " thứ hai
                    } else {
                        inQ = !inQ;
                    }
                } else if (text[i] === delimiter && !inQ) {
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
                // [FIX] Bảo vệ null safety cho _windowLayer trước khi truy cập children
                const scene = SceneManager._scene;
                const windowLayer = scene && scene._windowLayer;
                if (windowLayer) {
                    windowLayer.children.forEach(w => {
                        if (typeof w.refresh === 'function') w.refresh();
                    });
                }
            }
        }

        cycleLanguage(reverse = false) {
            const keys = this._availableLocales; // Dùng danh sách từ config
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
            // [FIX] Dùng hasOwnProperty để xử lý đúng trường hợp value là chuỗi rỗng ""
            if (dict && Object.prototype.hasOwnProperty.call(dict, key)) {
                return dict[key];
            }
            return key;
        }

        process(text) {
            if (typeof text !== 'string') return text;
            if (text.indexOf('{') === -1) return text;
            if (this._cache[text]) return this._cache[text];

            // Only match valid identifier keys ([A-Za-z_][\w]*) — avoids eating
            // braces in unrelated content like VisuMZ "{{%1}}" timestamps,
            // "{2026.5.25 15:39:53}" date stamps, or JSON-like text.
            // If the key isn't found in the dictionary, leave the original
            // text intact instead of unwrapping the braces (non-destructive).
            const dict = this._data[this._locale];
            const result = text.replace(/\{([A-Za-z_][\w]*)\}/g, (match, key) => {
                if (dict && Object.prototype.hasOwnProperty.call(dict, key)) {
                    return dict[key];
                }
                return match;
            });
            this._cache[text] = result;
            return result;
        }
    }

    // --- 2. INTEGRATION ---
    // Process {tag} AFTER the base handler runs, so \N[n] / \P[n] substitutions
    // (which can inject raw {tag} placeholders from data/Actors.json) get a
    // second pass and the placeholder is resolved to the localized name.
    const _Window_Base_convertEscapeCharacters = Window_Base.prototype.convertEscapeCharacters;
    Window_Base.prototype.convertEscapeCharacters = function(text) {
        text = _Window_Base_convertEscapeCharacters.call(this, text);
        if (text) text = KBLocalization.process(text);
        return text;
    };

    // Translate actor names at the source. This covers drawActorName() in
    // menus (which uses drawText() and bypasses convertEscapeCharacters) and
    // any other code path that reads actor.name() directly.
    const _Game_Actor_name = Game_Actor.prototype.name;
    Game_Actor.prototype.name = function() {
        return KBLocalization.process(_Game_Actor_name.call(this));
    };

    // Same treatment for nicknames and class names — they may contain {tags}.
    const _Game_Actor_nickname = Game_Actor.prototype.nickname;
    Game_Actor.prototype.nickname = function() {
        return KBLocalization.process(_Game_Actor_nickname.call(this));
    };

    const _Game_Actor_profile = Game_Actor.prototype.profile;
    Game_Actor.prototype.profile = function() {
        return KBLocalization.process(_Game_Actor_profile.call(this));
    };

    const _Window_Command_addCommand = Window_Command.prototype.addCommand;
    Window_Command.prototype.addCommand = function(name, symbol, enabled, ext) {
        if (name) name = KBLocalization.process(name);
        _Window_Command_addCommand.call(this, name, symbol, enabled, ext);
    };

    // Catch-all: any text drawn via drawText() (class names, skill names, state
    // names, menus, etc.) gets one pass through the localizer. process() returns
    // input unchanged when it doesn't contain '{', so non-tag text is free.
    const _Window_Base_drawText = Window_Base.prototype.drawText;
    Window_Base.prototype.drawText = function(text, x, y, maxWidth, align) {
        if (typeof text === 'string') text = KBLocalization.process(text);
        _Window_Base_drawText.call(this, text, x, y, maxWidth, align);
    };

    // --- 3. OPTIONS MENU ---
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

    if (showInOptions) {
        const _Window_Options_addGeneralOptions = Window_Options.prototype.addGeneralOptions;
        Window_Options.prototype.addGeneralOptions = function() {
            _Window_Options_addGeneralOptions.call(this);
            // Tên lệnh đã được dịch từ {cmd_lang} sẽ hiển thị ở cột trái
            this.addCommand('{cmd_lang}', 'locale');
        };
        
        // LƯU Ý: Phải lưu lại hàm statusText gốc
        const _Window_Options_statusText = Window_Options.prototype.statusText;

        // Ghi đè statusText để chỉ hiển thị GIÁ TRỊ (Tên ngôn ngữ)
        Window_Options.prototype.statusText = function(index) {
            if (this.commandSymbol(index) === 'locale') {
                const name = KBLocalization.getText('lang_name');
                // Hiển thị tên ngôn ngữ, hoặc mã ngôn ngữ (chữ hoa) nếu không tìm thấy tên
                return name !== 'lang_name' ? name : KBLocalization.locale.toUpperCase();
            }
            // Gọi lại hàm gốc cho các lệnh Options khác (Volume, etc.)
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

    // --- 4. LANGUAGE PICKER WINDOW (MODIFIED) ---
    class Window_KBPicker extends Window_Base {
        constructor(rect) {
            super(rect);
            this.opacity = 255;
            this.hide();
            this.deactivate();
            // Khởi tạo các đối tượng Rectangle để lưu trữ vị trí
            this._leftArrowRect = new Rectangle(0, 0, 0, 0);
            this._rightArrowRect = new Rectangle(0, 0, 0, 0);
            this._okButtonRect = new Rectangle(0, 0, 0, 0);
            this._okBitmap = null; 
            this._assetsLoading = false; // <<< Cờ kiểm tra trạng thái loading để tránh vòng lặp vô hạn
        }

        update() {
            super.update();
            if (this.active) {
                // Xử lý Input bằng phím (keyboard/gamepad)
                if (Input.isRepeated('right')) {
                    this.cycleLang(false);
                } else if (Input.isRepeated('left')) {
                    this.cycleLang(true);
                } else if (Input.isTriggered('ok')) {
                    SoundManager.playOk();
                    this.processOk();
                // [FIX] Bỏ 'escape' vì không phải key mapping hợp lệ trong RMMZ, dùng 'cancel' là đủ
                } else if (Input.isTriggered('cancel')) {
                    SoundManager.playCancel();
                    this.processCancel();
                }
                this.processTouch(); // Xử lý touch/click
            }
        }
        
        cycleLang(reverse) {
            KBLocalization.cycleLanguage(reverse);
            SoundManager.playCursor();
            this.refresh();
        }
        
        // Đã sửa lỗi: Thay thế canvasToLocalX bằng tính toán tọa độ thủ công
        processTouch() {
            if (TouchInput.isTriggered() || TouchInput.isRepeated()) {
                
                const globalX = TouchInput.x;
                const globalY = TouchInput.y;
                
                // Chuyển đổi tọa độ toàn cục (màn hình) sang tọa độ cục bộ (contents area)
                const x = globalX - this.x - this.padding; 
                const y = globalY - this.y - this.padding;
                
                // Kiểm tra click/touch vào mũi tên trái
                if (this._leftArrowRect.contains(x, y)) {
                    this.cycleLang(true);
                }
                
                // Kiểm tra click/touch vào mũi tên phải
                else if (this._rightArrowRect.contains(x, y)) {
                    this.cycleLang(false);
                }
                
                // Kiểm tra click/touch vào nút OK
                else if (this._okButtonRect.contains(x, y)) {
                    SoundManager.playOk();
                    this.processOk();
                }
            }
        }

        refresh() {
            this.contents.clear();
            const width = this.contentsWidth();
            const lineHeight = this.lineHeight();

            // --- 1. Load Assets ---
            const locale = KBLocalization.locale;
            const flagBitmap = ImageManager.loadSystem("flag_" + locale);
            
            // Tải ảnh nút OK (Giả sử tên file là Button_OK.png)
            if (!this._okBitmap) {
                this._okBitmap = ImageManager.loadSystem("Button_OK");
            }
            
            // Listener để đảm bảo vẽ lại khi ảnh load xong
            const isFlagReady = flagBitmap.isReady();
            const isOkReady = this._okBitmap.isReady();

            // Sửa lỗi: Chỉ thêm listener nếu đang loading VÀ chưa có listener nào
            if (!isFlagReady || !isOkReady) {
                if (!this._assetsLoading) { 
                    this._assetsLoading = true; // Đánh dấu là đã thêm listener
                    
                    const callback = () => {
                        this._assetsLoading = false; // Reset cờ sau khi hoàn thành
                        if (this.visible) this.refresh();
                    };
                    
                    if (!isFlagReady) flagBitmap.addLoadListener(callback);
                    if (!isOkReady) this._okBitmap.addLoadListener(callback);
                }
            } else {
                this._assetsLoading = false;
            }

            // Draw Header
            let title = KBLocalization.getText('picker_title');
            if (title === 'picker_title') title = "---- Select Language ----";
            this.changeTextColor(ColorManager.systemColor());
            this.drawText(title, 0, 0, width, 'center');
            this.resetTextColor();

            // --- 2. Draw Content (Flag + Name) ---
            const langName = KBLocalization.getText('lang_name');
            const arrowLeft = "◀ ";
            const arrowRight = " ▶";
            const okText = KBLocalization.getText('word_ok') !== 'word_ok' ? KBLocalization.getText('word_ok') : "OK";

            const nameWidth = this.textWidth(langName) + 10;
            const flagWidth = isFlagReady ? flagBitmap.width + 10 : 0;
            const arrowsWidth = this.textWidth(arrowLeft) + this.textWidth(arrowRight);
            const totalWidth = arrowsWidth + flagWidth + nameWidth;
            
            let startX = (width - totalWidth) / 2;
            const contentY = lineHeight * 1.5;
            const flagY = contentY + (lineHeight - (isFlagReady ? flagBitmap.height : lineHeight)) / 2;
            
            // Draw Left Arrow
            this.drawText(arrowLeft, startX, contentY, this.textWidth(arrowLeft), 'left');
            // Ghi lại vị trí mũi tên trái cho Touch
            this._leftArrowRect.x = startX;
            this._leftArrowRect.y = contentY;
            this._leftArrowRect.width = this.textWidth(arrowLeft);
            this._leftArrowRect.height = lineHeight;
            startX += this.textWidth(arrowLeft);

            // Draw Flag
            if (isFlagReady) {
                this.contents.blt(flagBitmap, 0, 0, flagBitmap.width, flagBitmap.height, startX, flagY);
                startX += flagWidth;
            }

            // Draw Language Name
            this.drawText(langName, startX, contentY, nameWidth, 'center');
            startX += nameWidth;

            // Draw Right Arrow
            this.drawText(arrowRight, startX, contentY, this.textWidth(arrowRight), 'left');
            // Ghi lại vị trí mũi tên phải cho Touch
            this._rightArrowRect.x = startX;
            this._rightArrowRect.y = contentY;
            this._rightArrowRect.width = this.textWidth(arrowRight);
            this._rightArrowRect.height = lineHeight;

            // --- 3. Draw CUSTOM OK Button (Sử dụng ảnh) ---
            
            if (isOkReady) {
                const buttonBitmap = this._okBitmap;
                const buttonW = buttonBitmap.width;
                const buttonH = buttonBitmap.height;
                
                // Căn giữa nút
                const okX = (width - buttonW) / 2;
                const okY = contentY + lineHeight * 2;
                
                // Vẽ ảnh nút
                this.contents.blt(buttonBitmap, 0, 0, buttonW, buttonH, okX, okY);
                
                // Vẽ chữ OK lên trên ảnh (Dùng màu chữ trắng để nổi bật)
                this.changeTextColor(ColorManager.normalColor()); 
                // Căn giữa chữ OK theo chiều dọc của nút
                this.drawText(okText, okX, okY + (buttonH - lineHeight) / 2, buttonW, 'center'); 
                
                // Ghi lại vị trí nút OK cho Touch
                this._okButtonRect.x = okX;
                this._okButtonRect.y = okY;
                this._okButtonRect.width = buttonW;
                this._okButtonRect.height = buttonH;
                
                this.resetTextColor(); 
            } else {
                // Dữ liệu vị trí dự phòng và vẽ hình chữ nhật tạm thời khi ảnh chưa load
                const buttonW = 180; 
                const buttonH = lineHeight * 1.5;
                const okX = (width - buttonW) / 2;
                const okY = contentY + lineHeight * 2;
                // Vẫn vẽ tạm thời để có thể bấm nút OK ngay cả khi ảnh chưa load
                this.contents.fillRect(okX, okY, buttonW, buttonH, ColorManager.dimColor2());
                this.drawText(okText, okX, okY, buttonW, 'center');
                
                this._okButtonRect.x = okX;
                this._okButtonRect.y = okY;
                this._okButtonRect.width = buttonW;
                this._okButtonRect.height = buttonH;
            }
        }

        processOk() {
            if (this._okHandler) this._okHandler();
        }

        processCancel() {
            if (this._cancelHandler) this._cancelHandler();
        }

        setOkHandler(method) { this._okHandler = method; }
        setCancelHandler(method) { this._cancelHandler = method; }
        
        close() {
            this.hide();
        }
    }

    // --- Đảm bảo Manager được khởi tạo trước khi gọi bất kỳ hàm nào của nó ---
    if (!window.KBLocalization) {
        window.KBLocalization = new KB_LocalizationManager();
    }
    
    // --- 5. SCENE TITLE UPDATE (FIX MOG NOT HIDING) ---
    
    // Thêm chức năng: Kiểm tra liên tục mỗi khung hình
    const _Scene_Title_update = Scene_Title.prototype.update;
    Scene_Title.prototype.update = function() {
        _Scene_Title_update.call(this);

        // Nếu bảng chọn ngôn ngữ đang hiện
        if (this._langPicker && this._langPicker.visible) {
            // Ép buộc ẩn ảnh MOG/KB (cho các plugin không tương thích)
            if (this._comSprites) {
                this._comSprites.forEach(s => s.visible = false);
            }
            if (this._comCursor) {
                this._comCursor.visible = false;
            }
        }
    };

    // --- 6. COMMAND INTEGRATION ---

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

    Scene_Title.prototype.createLanguagePicker = function() {
        const rect = this.languagePickerRect();
        // Sửa lại cách tạo Window_KBPicker để nó dùng rect mới
        this._langPicker = new Window_KBPicker(rect);
        this._langPicker.setOkHandler(this.onPickerOk.bind(this));
        this._langPicker.setCancelHandler(this.onPickerCancel.bind(this));
        this.addWindow(this._langPicker);
    };

    // Thay đổi kích thước cửa sổ Picker Language theo yêu cầu (Lớn hơn)
    Scene_Title.prototype.languagePickerRect = function() {
        const w = 600; // Chiều rộng mới
        const h = 200; // Chiều cao mới để chứa nút OK
        const x = (Graphics.boxWidth - w) / 2;
        const y = (Graphics.boxHeight - h) / 2;
        return new Rectangle(x, y, w, h);
    };

    const _Scene_Title_commandNewGame = Scene_Title.prototype.commandNewGame;
    Scene_Title.prototype.commandNewGame = function() {
        if (useNewGamePicker) {
            this._commandWindow.hide();
            this._commandWindow.deactivate();

            // Ẩn Background và Title Sprite (Đen màn hình)
            if (this._backSprite1) this._backSprite1.opacity = 0;
            if (this._backSprite2) this._backSprite2.opacity = 0;
            if (this._gameTitleSprite) this._gameTitleSprite.opacity = 0;

            // Hiện Picker
            this._langPicker.refresh();
            this._langPicker.show();
            this._langPicker.activate();
            
        } else {
            _Scene_Title_commandNewGame.call(this);
        }
    };

    Scene_Title.prototype.onPickerOk = function() {
        // 1. Tắt Picker
        this._langPicker.hide();
        this._langPicker.deactivate();

        // Hiện lại MOG Sprites nếu có
        if (this._comSprites) {
            this._comSprites.forEach(s => s.visible = true);
        }
        if (this._comCursor) {
            this._comCursor.visible = true;
        }

        // [FIX] Gọi đúng luồng chuyển scene của RMMZ: setupNewGame -> close command -> fadeOutAll -> goto Map
        // Không cần restore background sprites vì sẽ fade out và chuyển scene ngay
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

        // Hiện lại Background
        if (this._backSprite1) this._backSprite1.opacity = 255;
        if (this._backSprite2) this._backSprite2.opacity = 255;
        if (this._gameTitleSprite) this._gameTitleSprite.opacity = 255;
        
        // Hiện lại MOG Sprites
        if (this._comSprites) {
            this._comSprites.forEach(s => s.visible = true);
        }
        if (this._comCursor) {
            this._comCursor.visible = true;
        }
    };

    const _Scene_Title_createCommandWindow = Scene_Title.prototype.createCommandWindow;
    Scene_Title.prototype.createCommandWindow = function() {
        _Scene_Title_createCommandWindow.call(this);
        this._commandWindow.setHandler('language', this.commandLanguage.bind(this));
    };

    Scene_Title.prototype.commandLanguage = function() {
        KBLocalization.cycleLanguage();
        SoundManager.playOk();
        this._commandWindow.refresh();
        this._commandWindow.activate(); 
    };

})();
