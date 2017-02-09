"use strict";
var miniMax_1 = require("./miniMax");
var index_1 = require("./index");
/**
 * CPUのプレーヤーを表すためのクラス
 */
var Cpu = (function () {
    /**
     * コンストラクタ
     */
    function Cpu(_miniMax) {
        if (_miniMax === void 0) { _miniMax = new miniMax_1.default(); }
        this._miniMax = _miniMax;
    }
    /**
     * 打ち手を打つためのメソッド
     * @param {depth} 読みの深さ
     * @param {board} Boardクラスのインスタンス
     */
    Cpu.prototype.doMove = function (depth, board) {
        var maxNum = 9999999999;
        var minNum = -9999999999;
        var cellObj = this._miniMax.calcMiniMax(depth, board, index_1.MOVE.CROSS, minNum, maxNum);
        board.putMove(cellObj['rowVal'], cellObj['columnVal'], index_1.MOVE.CROSS);
        return cellObj;
    };
    return Cpu;
}());
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Cpu;
