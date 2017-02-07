"use strict";
const miniMax_1 = require("./miniMax");
const index_1 = require("./index");
/**
 * CPUのプレーヤーを表すためのクラス
 */
class Cpu {
    /**
     * コンストラクタ
     */
    constructor(_miniMax = new miniMax_1.default()) {
        this._miniMax = _miniMax;
    }
    /**
     * 打ち手を打つためのメソッド
     * @param {depth} 読みの深さ
     * @param {board} Boardクラスのインスタンス
     */
    doMove(depth, board) {
        const maxNum = 9999999999;
        const minNum = -9999999999;
        const cellObj = this._miniMax.calcMiniMax(depth, board, index_1.MOVE.CROSS, minNum, maxNum);
        board.putMove(cellObj.rowVal, cellObj.columnVal, index_1.MOVE.CROSS);
        return cellObj;
    }
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Cpu;
