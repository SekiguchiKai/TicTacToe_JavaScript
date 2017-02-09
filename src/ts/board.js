"use strict";
var index_1 = require("./index");
/**
 * ゲーム盤を表すためのクラス
 */
var Board = (function () {
    /**
     * コンストラクタ
     * @param {rowSize} rowのサイズ
     * @param {columnSize} columnのサイズ
     */
    function Board() {
        this._gameBoard = new Array(3);
        this._rowSize = 3;
        this._columnSize = 3;
        // 二次元配列化
        for (var row = 0; row < this._gameBoard.length; row++) {
            this._gameBoard[row] = new Array(this._columnSize);
        }
        // 二次元配列初期化
        for (var row = 0; row < this._rowSize; row++) {
            for (var column = 0; column < this._columnSize; column++) {
                this._gameBoard[row][column] = index_1.MOVE.EMPTY;
            }
        }
    }
    Object.defineProperty(Board.prototype, "rowSize", {
        /**
         * rowSizeを取得するためのメソッド
         * @return {number} rowのサイズ
         */
        get: function () {
            return this._rowSize;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Board.prototype, "columnSize", {
        /**
         * columnSizeを取得するためのメソッド
         * @return {number} columnのサイズ
         */
        get: function () {
            return this._columnSize;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * ゲーム盤の指定箇所に打ち手を加えるためのメソッド
     * @param {row} rowの値
     * @param {column} columnの値
     * @param {move} 打ち手
     */
    Board.prototype.putMove = function (row, column, move) {
        this._gameBoard[row][column] = move;
    };
    /**
      * ゲーム盤の指定箇所の打ち手を取得するためのメソッド
      * @param {row} rowの値
      * @param {column} columnの値
      * @return {string} 打ち手
      */
    Board.prototype.getMove = function (row, column) {
        return this._gameBoard[row][column];
    };
    /**
      * ゲーム盤を取得するためのメソッド
      * @return {string[][]} 打ち手
      */
    Board.prototype.getGameBoardState = function () {
        return this._gameBoard.concat();
    };
    return Board;
}());
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Board;
