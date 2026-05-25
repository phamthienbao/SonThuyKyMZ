/*:
 * @target MZ
 * @plugindesc [DEV TOOL V3.1] Trích xuất Text và thay thế bằng format {KEY} (FIXED).
 * @author KB
 *
 * @command ExtractAndReplace
 * @text Bắt đầu Extract
 * @desc Chạy quy trình trích xuất và thay thế.
 *
 * @param dryRun
 * @text Chế độ Chạy Thử (Dry Run)
 * @type boolean
 * @default true
 * @desc TRUE: Chỉ xuất CSV (An toàn). FALSE: Ghi đè Key vào Database & Map (Nguy hiểm).
 *
 * @help
 * ============================================================================
 * KB DEV EXTRACTOR V3.1 - FIX FORMAT {KEY}
 * ============================================================================
 * Phiên bản này sửa lỗi format thay thế trong Data.
 *
 * CƠ CHẾ MỚI:
 * - File CSV: Key;Nội dung (Giữ nguyên)
 * -> Ví dụ: ITEM_001_Name;Potion
 *
 * - File Data (JSON): Text sẽ được thay bằng {Key}
 * -> Ví dụ: {ITEM_001_Name}
 *
 * Điều này giúp script Localization của bạn nhận diện được đâu là Key cần dịch.
 *
 * ============================================================================
 * HƯỚNG DẪN AN TOÀN
 * ============================================================================
 * 1. BACKUP THƯ MỤC 'data' TRƯỚC KHI CHẠY (QUAN TRỌNG!).
 * 2. Chạy 'Dry Run' trước để kiểm tra CSV.
 * 3. Tắt 'Dry Run' để ghi đè vào game.
 */

(() => {
    const pluginName = "KB_Dev_Extractor";
    let isDryRun = true;

    let fs = null;
    let path = null;
    
    if (Utils.isNwjs()) {
        fs = require('fs');
        path = require('path');
    }

    PluginManager.registerCommand(pluginName, "ExtractAndReplace", args => {
        if (!Utils.isNwjs()) {
            alert("Plugin này chỉ chạy trên PC (Playtest)!");
            return;
        }

        const params = PluginManager.parameters(pluginName);
        isDryRun = (params['dryRun'] === "true");

        const modeText = isDryRun ? "CHẠY THỬ (DRY RUN)" : "GHI ĐÈ THỰC TẾ (REAL WRITE)";
        const msg = `V3.1 - FIX FORMAT {KEY}\nChế độ: ${modeText}.\n\n` +
                    (isDryRun ? "An toàn: Chỉ xuất CSV." : "CẢNH BÁO: Sẽ ghi đè Map & Database bằng {Key}...");

        if (confirm(msg)) {
            KB_Extractor.startProcess(isDryRun);
        }
    });

    const KB_Extractor = {
        baseDir: Utils.isNwjs() ? path.dirname(process.mainModule.filename) : "",
        dataDir: Utils.isNwjs() ? path.join(path.dirname(process.mainModule.filename), 'data') : "",
        
        csvContent: "Key;vi\n", 
        
        startProcess(dryRun) {
            console.log(`=== BẮT ĐẦU EXTRACT V3.1 (${dryRun ? 'DRY RUN' : 'WRITE'}) ===`);
            
            // 1. Process Events
            this.processMaps(dryRun);
            this.processCommonEvents(dryRun);

            // 2. Process Database Objects
            this.processDatabaseFile('Items.json', 'ITEM', ['name', 'description'], dryRun);
            this.processDatabaseFile('Weapons.json', 'WEAP', ['name', 'description'], dryRun);
            this.processDatabaseFile('Armors.json', 'ARMR', ['name', 'description'], dryRun);
            this.processDatabaseFile('Skills.json', 'SKILL', ['name', 'description', 'message1', 'message2'], dryRun);
            this.processDatabaseFile('States.json', 'STATE', ['name', 'message1', 'message2', 'message3', 'message4'], dryRun);
            this.processDatabaseFile('Classes.json', 'CLASS', ['name'], dryRun);
            this.processDatabaseFile('Enemies.json', 'ENEMY', ['name'], dryRun);

            // 3. Process System
            this.processSystem(dryRun);

            // Output CSV
            const outputPath = path.join(this.baseDir, 'Exported_Text.csv');
            fs.writeFileSync(outputPath, '\uFEFF' + this.csvContent, 'utf8');
            
            const doneMsg = dryRun 
                ? "Đã xuất xong CSV (Dry Run).\nKiểm tra file 'Exported_Text.csv'." 
                : "HOÀN TẤT V3.1!\nDatabase và Map đã được thay thế bằng {Key}.\nHãy Reload Project (F5).";
            
            alert(doneMsg);
            console.log("=== KẾT THÚC ===");
        },

        // --- XỬ LÝ DATABASE ---
        processDatabaseFile(fileName, prefix, properties, dryRun) {
            const filePath = path.join(this.dataDir, fileName);
            if (!fs.existsSync(filePath)) return;

            console.log(`Processing ${fileName}...`);
            let data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
            let isModified = false;

            for (let i = 1; i < data.length; i++) {
                const item = data[i];
                if (!item) continue;

                properties.forEach(prop => {
                    if (item[prop] && item[prop].length > 0) {
                        // Suffix xử lý
                        const suffix = prop.charAt(0).toUpperCase() + prop.slice(1).replace(/\d/g, ''); 
                        let keySuffix = suffix;
                        if (prop.includes('message')) keySuffix = 'Msg' + prop.replace('message', ''); 
                        if (prop === 'description') keySuffix = 'Desc';

                        const key = `${prefix}_${this.pad(item.id)}_${keySuffix}`;
                        
                        // Nếu chưa phải là Key (chưa có dấu {})
                        if (!this.isKey(item[prop])) {
                            this.addToCSV(key, item[prop]); // CSV lưu Key trần
                            item[prop] = `{${key}}`;         // Data lưu {Key}
                            isModified = true;
                        }
                    }
                });
            }

            if (!dryRun && isModified) {
                this.backupFile(filePath);
                fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
            }
        },

        // --- XỬ LÝ SYSTEM ---
        processSystem(dryRun) {
            const fileName = 'System.json';
            const filePath = path.join(this.dataDir, fileName);
            if (!fs.existsSync(filePath)) return;

            console.log(`Processing ${fileName}...`);
            let data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
            let isModified = false;

            // Helper function để xử lý mảng
            const processArray = (arr, prefix) => {
                if (!arr) return;
                arr.forEach((text, index) => {
                    if (text && !this.isKey(text)) {
                        const key = `${prefix}_${index}`;
                        this.addToCSV(key, text);
                        arr[index] = `{${key}}`; // Thêm ngoặc nhọn
                        isModified = true;
                    }
                });
            };

            // Helper function cho Object (Messages)
            const processObj = (obj, prefix) => {
                if (!obj) return;
                Object.keys(obj).forEach(prop => {
                    const text = obj[prop];
                    if (text && !this.isKey(text)) {
                        const key = `${prefix}_${prop}`;
                        this.addToCSV(key, text);
                        obj[prop] = `{${key}}`; // Thêm ngoặc nhọn
                        isModified = true;
                    }
                });
            };

            processArray(data.terms.basic, 'SYS_Basic');
            processArray(data.terms.commands, 'SYS_Cmd');
            processArray(data.terms.params, 'SYS_Param');
            processObj(data.terms.messages, 'SYS_Msg');
            
            if (data.currencyUnit && !this.isKey(data.currencyUnit)) {
                 const key = `SYS_Currency`;
                 this.addToCSV(key, data.currencyUnit);
                 data.currencyUnit = `{${key}}`;
                 isModified = true;
            }

            if (!dryRun && isModified) {
                this.backupFile(filePath);
                fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
            }
        },

        // --- XỬ LÝ EVENTS (MAP & COMMON) ---
        processMaps(dryRun) {
            const mapInfosPath = path.join(this.dataDir, 'MapInfos.json');
            if (!fs.existsSync(mapInfosPath)) return;
            const mapInfos = JSON.parse(fs.readFileSync(mapInfosPath, 'utf8'));
            
            mapInfos.forEach(info => {
                if (info) {
                    const mapId = info.id;
                    const fileName = 'Map' + this.pad(mapId) + '.json';
                    const filePath = path.join(this.dataDir, fileName);
                    
                    if (fs.existsSync(filePath)) {
                        let mapData = JSON.parse(fs.readFileSync(filePath, 'utf8'));
                        let isModified = false;
                        
                        mapData.events.forEach(event => {
                            if (event) {
                                event.pages.forEach((page, pageIndex) => {
                                    const prefix = `M${this.pad(mapId)}_E${this.pad(event.id)}_P${pageIndex + 1}`;
                                    if (this.processEventList(page.list, prefix)) isModified = true;
                                });
                            }
                        });
                        
                        if (!dryRun && isModified) {
                            this.backupFile(filePath); 
                            fs.writeFileSync(filePath, JSON.stringify(mapData, null, 2));
                        }
                    }
                }
            });
        },

        processCommonEvents(dryRun) {
            const fileName = 'CommonEvents.json';
            const filePath = path.join(this.dataDir, fileName);
            if (fs.existsSync(filePath)) {
                let commonData = JSON.parse(fs.readFileSync(filePath, 'utf8'));
                let isModified = false;
                commonData.forEach(event => {
                    if (event && event.list) {
                        const prefix = `C${this.pad(event.id)}`;
                        if (this.processEventList(event.list, prefix)) isModified = true;
                    }
                });
                if (!dryRun && isModified) {
                    this.backupFile(filePath);
                    fs.writeFileSync(filePath, JSON.stringify(commonData, null, 2));
                }
            }
        },

        processEventList(list, keyPrefix) {
            let modified = false;
            let i = 0;
            while (i < list.length) {
                const command = list[i];
                if (command.code === 401) {
                    let fullText = command.parameters[0];
                    let linesToRemove = 0;
                    
                    let nextIndex = i + 1;
                    while (nextIndex < list.length && list[nextIndex].code === 401) {
                        fullText += "<br>" + list[nextIndex].parameters[0];
                        linesToRemove++;
                        nextIndex++;
                    }

                    // Điều kiện: Chưa phải là Key và (Có dấu cách hoặc dài hoặc không khớp prefix)
                    if (!this.isKey(fullText) && (fullText.includes(" ") || fullText.length > 1 || !fullText.includes(keyPrefix.split('_')[0]))) {
                        
                        const uniqueKey = `${keyPrefix}_L${i}`; 
                        this.addToCSV(uniqueKey, fullText);    
                        
                        // QUAN TRỌNG: Thêm ngoặc nhọn {Key}
                        command.parameters[0] = `{${uniqueKey}}`;
                        
                        if (linesToRemove > 0) list.splice(i + 1, linesToRemove);
                        modified = true;
                    }
                }
                i++;
            }
            return modified;
        },

        // --- UTILS ---
        isKey(text) {
            // Kiểm tra xem text đã được bọc trong {} chưa?
            // Ví dụ: {ITEM_001_Name} -> TRUE (Đã xử lý rồi)
            // Potion -> FALSE (Cần xử lý)
            if (!text || typeof text !== 'string') return false;
            // Logic: Bắt đầu bằng {, kết thúc bằng }, và bên trong có chứa từ khóa của mình
            if (text.startsWith('{') && text.endsWith('}')) {
                const content = text.slice(1, -1);
                return !!content.match(/^(ITEM_|WEAP_|ARMR_|SKILL_|STATE_|ENEMY_|CLASS_|SYS_|M\d+_E|C\d+_L)/);
            }
            return false;
        },

        backupFile(filePath) {
            const backupPath = filePath + ".bak";
            if (!fs.existsSync(backupPath)) fs.copyFileSync(filePath, backupPath);
        },

        addToCSV(key, text) {
            const safeText = text.replace(/"/g, '""');
            // CSV thì KHÔNG bọc {}
            this.csvContent += `${key};"${safeText}"\n`;
        },
        
        pad(num) {
            return num.toString().padStart(3, '0');
        }
    };
})();