"use strict";
/**
 * カウンターを表すためのクラス
 */
class Counter {
    /**
     * カウンターを1上げるためのメソッド
     */
    static upCount() {
        this._count++;
    }
    /**
     * カウンターを取得するためのメソッド
     * @return {number} 現在のカウンターの値
     */
    static getCount() {
        return this._count;
    }
    /**
     * カウンターをリセットするためのメソッド
     */
    static resetCount() {
        this._count = 0;
    }
}
Counter._count = 1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Counter;
