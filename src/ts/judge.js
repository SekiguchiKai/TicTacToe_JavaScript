"use strict";
var index_1 = require("./index");
/**
 * 勝敗を審判するためのクラス
 */
var Judge = (function () {
    /**
      * コンストラクタ
      * @param {rowSize} rowのサイズ
      * @param {columnSize} columnのサイズ
      * @param {judgeCriteriaSequence} 勝敗の基準となる数（何個同じ打ち手が一列に揃えば勝敗が決定するか）
      */
    function Judge() {
        /**
         * rowの最大サイズ
         */
        /**
         * columnの最大サイズ
         */
        // private _rowMax = this._rowSize - this._judgeCriteriaSequence + 1;
        // private _columnMax = this._columnSize - this._judgeCriteriaSequence + 1;
        this._rowMax = 1;
        this._columnMax = 1;
        this._rowSize = 3;
        this._columnSize = 3;
        this._judgeCriteriaSequence = 3;
        // this._rowMax = _rowSize - _judgeCriteriaSequence + 1;
        // this._columnMax = _columnSize - _judgeCriteriaSequence + 1;
    }
    /**
     * 勝敗はついているかを確認し、その結果を返すためのメソッド
     * @param {board} Boardクラスのインスタンス
     * @return {string} 勝敗の結果
     */
    Judge.prototype.judgeResult = function (board) {
        var gameBoard = board.getGameBoardState();
        if (this.judgeWin(gameBoard)) {
            return index_1.RESULT.WIN;
        }
        else if (this.judgeLose(gameBoard)) {
            return index_1.RESULT.LOSE;
        }
        else if (this.judgeDraw(gameBoard)) {
            return index_1.RESULT.DRAW;
        }
        return index_1.RESULT.PENNDING;
    };
    /**
     * ユーザーが勝利したかどうかを確認するためのメソッド
     * 縦、横、左斜め、右斜めを走査する
     * @param {gameBoard} ゲーム盤
     * @return {boolean} ユーザーが勝利したかどうかの真偽値
     */
    Judge.prototype.judgeWin = function (gameBoard) {
        return this.judgeRow(gameBoard, index_1.MOVE.CIRCLE)
            || this.judgeColumn(gameBoard, index_1.MOVE.CIRCLE)
            || this.judgeLeftSlanting(gameBoard, index_1.MOVE.CIRCLE)
            || this.judgeRightSlanting(gameBoard, index_1.MOVE.CIRCLE);
    };
    /**
     * ユーザーが敗北したかどうかを確認するためのメソッド
     * 縦、横、左斜め、右斜めを走査する
     * @param {gameBoard} ゲーム盤
     * @return {boolean} ユーザーが敗北したかどうかの真偽値
     */
    Judge.prototype.judgeLose = function (gameBoard) {
        return this.judgeRow(gameBoard, index_1.MOVE.CROSS)
            || this.judgeColumn(gameBoard, index_1.MOVE.CROSS)
            || this.judgeLeftSlanting(gameBoard, index_1.MOVE.CROSS)
            || this.judgeRightSlanting(gameBoard, index_1.MOVE.CROSS);
    };
    /**
     * 引き分けかどうかを確認するためのメソッド
     * @param {gameBoard} ゲーム盤
     * @return {boolean} 引き分けかどうかの真偽値
     */
    Judge.prototype.judgeDraw = function (gameBoard) {
        for (var row = 0; row < this._rowSize; row++) {
            for (var column = 0; column < this._columnSize; column++) {
                if (gameBoard[row][column] === index_1.MOVE.EMPTY) {
                    return false;
                }
            }
        }
        return true;
    };
    /**
     * row(横のライン)が引数で指定された打ち手で5連が達成されているか確認するためのメソッド
     * @param {gameBoard} ゲーム盤
     * @param {moves} 打ち手
     * @return {boolean} 勝敗が決定したか真偽値
     */
    Judge.prototype.judgeRow = function (gameBoard, moves) {
        for (var row = 0; row < this._rowSize; row++) {
            for (var column = 0; column < this._columnMax; column++) {
                if (this.checkARow(gameBoard, moves, row, column)) {
                    return true;
                }
            }
        }
        return false;
    };
    /**
     * rowにおいて指定された打ち手が、ゲーム盤上の指定された範囲内で勝敗を決定する数分連続しているかの真偽値を返すメソッド
     * @param {gameBoard} ゲーム盤
     * @param {moves} 打ち手
     * @return {boolean} 指定された打ち手が、ゲーム盤上の指定された範囲内で勝敗を決定する数分連続しているかの真偽値
     */
    Judge.prototype.checkARow = function (gameBoard, moves, row, column) {
        for (var difference = 0; difference < this._judgeCriteriaSequence; difference++) {
            if (gameBoard[row][column + difference] != moves) {
                return false;
            }
        }
        return true;
    };
    /**
     * column(縦のライン)が引数で指定されたMoveで5連が達成されているか確認するためのメソッド
     * @param {gameBoard} ゲーム盤
     * @param {moves} 打ち手
     * @return {boolean} 勝敗が決定したか真偽値
     */
    Judge.prototype.judgeColumn = function (gameBoard, moves) {
        for (var column = 0; column < this._columnSize; column++) {
            for (var row = 0; row < this._rowMax; row++) {
                if (this.checkAColumn(gameBoard, moves, row, column)) {
                    return true;
                }
            }
        }
        return false;
    };
    /**
     * columnにおいて指定された打ち手が、ゲーム盤上の指定された範囲内で勝敗を決定する数分連続しているかの真偽値を返すメソッド
     * @param {gameBoard} ゲーム盤
     * @param {moves} 打ち手
     * @param {row}       rowのインデックス
     * @param {column}    columnのインデックス
     * @return {boolean} 指定された打ち手が、ゲーム盤上の指定された範囲内で勝敗を決定する数分連続しているかの真偽値
     */
    Judge.prototype.checkAColumn = function (gameBoard, moves, row, column) {
        for (var difference = 0; difference < this._judgeCriteriaSequence; difference++) {
            if (gameBoard[row + difference][column] != moves) {
                return false;
            }
        }
        return true;
    };
    /**
     * 左斜めのラインにおいて、引数で受け取った打ち手が5連揃っているかどうかの真偽値を確認するためのメソッド
     * @param {gameBoard} ゲーム盤
     * @param {moves} 打ち手
     * @return {boolean} 右斜めのラインにおいて、引数で受け取った打ち手が5連揃っているかどうかの真偽値を確認するためのメソッド
     */
    Judge.prototype.judgeLeftSlanting = function (gameBoard, moves) {
        // centerAxis
        var column = 0;
        for (var row = 0; row < this._rowMax; row++) {
            // 1回あたりの5連
            var oneTermCheck = this.checkOneTermLeftSlanting(gameBoard, moves, row, column);
            if (oneTermCheck) {
                return true;
            }
            column++;
        }
        // rowシフト
        for (var rowStart = 1; rowStart < this._judgeCriteriaSequence; rowStart++) {
            var rowShiftCheck = this.leftSlantingRowShift(gameBoard, moves, rowStart);
            if (rowShiftCheck) {
                return true;
            }
        }
        // columnシフト
        for (var columnStart = 0; columnStart < this._columnMax; columnStart++) {
            var columnShiftCheck = this.leftSlantingColumnShift(gameBoard, moves, columnStart);
            if (columnShiftCheck) {
                return true;
            }
        }
        return false;
    };
    /**
     * 左ラインのROWがスライドした時の審査を行うためのメソッド
     *
     * @param {gameBoard} ゲーム盤
     * @param {moves}     検査対象のプレーヤーの打ち手
     * @return  {boolean} 勝敗が決定したか真偽値
     */
    Judge.prototype.leftSlantingRowShift = function (gameBoard, moves, rowStart) {
        var column = 0;
        // for文1回で、1つの連を表す
        for (var row = rowStart; row < this._rowMax; row++) {
            var oneTermCheck = this.checkOneTermLeftSlanting(gameBoard, moves, row, column);
            if (oneTermCheck) {
                return true;
            }
            column++;
        }
        return false;
    };
    /**
      * 左ラインのROWがスライドした時の審査を行うためのメソッド
      *
      * @param {gameBoard} ゲーム盤
      * @param {moves}     検査対象のプレーヤーの打ち手
      * @return  {boolean} 勝敗が決定したか真偽値
      */
    Judge.prototype.leftSlantingColumnShift = function (gameBoard, moves, columnStart) {
        var row = 0;
        // for文1回で、1つの連を表す
        for (var column = columnStart; column < this._columnMax; column++) {
            var oneTermCheck = this.checkOneTermLeftSlanting(gameBoard, moves, row, column);
            if (oneTermCheck) {
                return true;
            }
            row++;
        }
        return false;
    };
    /**
      * 左斜めのラインの1回あたりおいて、引数で受け取った打ち手が5連揃っているかどうかの真偽値を確認するためのメソッド
      *
      * @param {gameBoard} ゲーム盤
      * @param {moves}     打ち手
      * @param {row}      rowのインデックス
      * @param {column}    columnのインデックス
      * @return {boolean}  1回あたりおいて、引数で受け取った打ち手が5連揃っているかどうかの真偽値
      */
    Judge.prototype.checkOneTermLeftSlanting = function (gameBoard, moves, row, column) {
        for (var difference = 0; difference < this._judgeCriteriaSequence; difference++) {
            if (gameBoard[row + difference][column + difference] != moves) {
                return false;
            }
        }
        return true;
    };
    /**
      * 右斜めのラインにおいて、引数で受け取った打ち手が5連揃っているかどうかの真偽値を確認するためのメソッド
      *
      * @param {gameBoard} ゲーム盤
      * @param {moves}     打ち手
      * @return {boolean} 右斜めのラインにおいて、引数で受け取った打ち手が5連揃っているかどうかの真偽値を確認するためのメソッド
      */
    Judge.prototype.judgeRightSlanting = function (gameBoard, moves) {
        var correctVal = 1;
        // centerAxis
        var column = this._columnSize - correctVal;
        for (var row = 0; row < this._rowMax; row++) {
            // 1回あたりの5連
            var oneTermCheck = this.checkOneTermRightSlanting(gameBoard, moves, row, column);
            if (oneTermCheck) {
                return true;
            }
            column--;
        }
        // rowシフト
        for (var rowStart = 1; rowStart < this._judgeCriteriaSequence; rowStart++) {
            var rowShiftCheck = this.rightSlantingRowShift(gameBoard, moves, rowStart);
            if (rowShiftCheck) {
                return true;
            }
        }
        // columnシフト
        var start = gameBoard.length - correctVal;
        for (var columnStart = start; columnStart > this._rowSize - this._judgeCriteriaSequence - correctVal; columnStart--) {
            var columnShiftCheck = this.rightSlantingColumnShift(gameBoard, moves, columnStart);
            if (columnShiftCheck) {
                return true;
            }
        }
        return false;
    };
    /**
      * 右斜めのラインがrowにおいてシフトする時(row1~row4)、引数で受け取った打ち手が5連揃っているかどうかの真偽値を確認するためのメソッド
      *
      * @param {gameBoard} ゲーム盤
      * @param {moves}     打ち手
      * @param {rowStart}  rowの調査開始値
      * @return {boolean} 右斜めのラインがrowにおいてシフトする時(row1~row4)、引数で受け取った打ち手が5連揃っているかどうかの真偽値
      */
    Judge.prototype.rightSlantingRowShift = function (gameBoard, moves, rowStart) {
        var correctVal = 1;
        var column = this._columnSize - correctVal;
        for (var row = rowStart; row < this._rowMax; row++) {
            // 1回あたりの5連
            var oneTermCheck = this.checkOneTermRightSlanting(gameBoard, moves, row, column);
            if (oneTermCheck) {
                return true;
            }
            column--;
        }
        return false;
    };
    /**
      * 右斜めのラインがrowにおいてシフトする時(row1~row4)、引数で受け取った打ち手が5連揃っているかどうかの真偽値を確認するためのメソッド
      *
      * @param {gameBoard}   ゲーム盤
      * @param {moves}       打ち手
      * @param {columnStart} rowの調査開始値
      * @return {boolean} 右斜めのラインがrowにおいてシフトする時(row1~row4)、引数で受け取った打ち手が5連揃っているかどうかの真偽値
      */
    Judge.prototype.rightSlantingColumnShift = function (gameBoard, moves, columnStart) {
        var row = 0;
        var correctVal = 2;
        var columnEnd = this._judgeCriteriaSequence - correctVal;
        for (var column = columnStart; column > columnEnd; column--) {
            // 1回あたりの5連
            var oneTermCheck = this.checkOneTermRightSlanting(gameBoard, moves, row, column);
            if (oneTermCheck) {
                return true;
            }
            row++;
        }
        return false;
    };
    /**
      * 右斜めのライン1回あたりおいて、引数で受け取った打ち手が5連揃っているかどうかの真偽値を確認するためのメソッド
      *
      * @param {gameBoard} ゲーム盤
      * @param {moves}     打ち手
      * @param {row}       rowのインデックス
      * @param {column}    columnのインデックス
      * @return {boolean} 1回あたりおいて、引数で受け取った打ち手が5連揃っているかどうかの真偽値
      */
    Judge.prototype.checkOneTermRightSlanting = function (gameBoard, moves, row, column) {
        for (var difference = 0; difference < this._judgeCriteriaSequence; difference++) {
            if (gameBoard[row + difference][column - difference] != moves) {
                return false;
            }
        }
        return true;
    };
    return Judge;
}());
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Judge;
