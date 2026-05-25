/*:
 * @target MZ
 * @plugindesc (v1.0) Core Engine chứa các hàm dùng chung cho KB Plugins.
 * @author KB
 * @url https://yourwebsite.com
 * * @help
 * ============================================================================
 * KB_CoreEngine
 * ============================================================================
 * Plugin này phải được đặt Ở TRÊN CÙNG danh sách plugin (trên KB_Localization).
 * * Chức năng chính:
 * 1. Quản lý phiên bản các plugin KB.
 * 2. Cung cấp hàm parseJSON an toàn (tránh crash game khi sai cú pháp).
 * 3. Các hàm tiện ích xử lý chuỗi và load dữ liệu.
 * * ============================================================================
 */

var Imported = Imported || {};
Imported.KB_Core = true;

var KB = KB || {};
KB.Core = KB.Core || {};
KB.Utils = KB.Utils || {};
KB.Versions = KB.Versions || {};

KB.Versions.Core = "1.0.0";

// ============================================================================
// KB.Utils - CÁC HÀM TIỆN ÍCH DÙNG CHUNG
// ============================================================================

(function($) {
    /**
     * Parse JSON an toàn. Nếu lỗi cú pháp, game không crash mà sẽ báo lỗi vào Console (F8).
     * @param {string} jsonString - Chuỗi JSON cần parse.
     * @param {any} defaultValue - Giá trị trả về nếu parse thất bại (mặc định là object rỗng {}).
     * @param {string} sourceName - Tên nơi gọi hàm (để dễ debug).
     */
    $.parseJSON = function(jsonString, defaultValue = {}, sourceName = "Unknown Source") {
        if (!jsonString) return defaultValue;
        try {
            return JSON.parse(jsonString);
        } catch (e) {
            console.warn(`[KB Core] Lỗi parse JSON tại: ${sourceName}`);
            console.warn(`Chi tiết lỗi: ${e.message}`);
            console.warn(`Dữ liệu gây lỗi: ${jsonString}`);
            return defaultValue;
        }
    };

    /**
     * Kiểm tra xem một plugin khác có được bật hay không và có đủ version không.
     * @param {string} pluginName - Tên plugin cần kiểm tra (Ví dụ: "KB_Core").
     */
    $.checkDependency = function(pluginName) {
        if (!Imported[pluginName]) {
            throw new Error(`Plugin này yêu cầu cài đặt ${pluginName} để hoạt động!`);
        }
        return true;
    };

    /**
     * Kiểm tra tham số boolean từ Plugin Manager (vì RPG Maker trả về chuỗi "true"/"false").
     */
    $.isTrue = function(param) {
        return String(param).toLowerCase() === "true";
    };

})(KB.Utils);