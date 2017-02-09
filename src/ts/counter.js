"use strict";
/**
 * カウンターを表すためのクラス
 */
var Counter = (function () {
    function Counter() {
    }
    /**
     * カウンターを1上げるためのメソッド
     */
    Counter.upCount = function () {
        this._count++;
    };
    /**
     * カウンターを取得するためのメソッド
     * @return {number} 現在のカウンターの値
     */
    Counter.getCount = function () {
        return this._count;
    };
    /**
     * カウンターをリセットするためのメソッド
     */
    Counter.resetCount = function () {
        this._count = 0;
    };
    return Counter;
}());
Counter._count = 1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Counter;
