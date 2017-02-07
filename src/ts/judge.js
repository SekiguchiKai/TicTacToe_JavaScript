"use strict";
const index_1 = require("./index");
/**
 * 勝敗を審判するためのクラス
 */
class Judge {
    /**
      * コンストラクタ
      * @param {rowSize} rowのサイズ
      * @param {columnSize} columnのサイズ
      * @param {judgeCriteriaSequence} 勝敗の基準となる数（何個同じ打ち手が一列に揃えば勝敗が決定するか）
      */
    constructor(_rowSize, _columnSize, _judgeCriteriaSequence) {
        this._rowSize = _rowSize;
        this._columnSize = _columnSize;
        this._judgeCriteriaSequence = _judgeCriteriaSequence;
        const correctVal = 1;
        this._rowMax = this._rowSize - this._judgeCriteriaSequence + correctVal;
        this._columnMax = this._columnSize - this._judgeCriteriaSequence + correctVal;
    }
    /**
     * 勝敗はついているかを確認し、その結果を返すためのメソッド
     * @param {board} Boardクラスのインスタンス
     * @return {string} 勝敗の結果
     */
    judgeResult(board) {
        const gameBoard = board.getGameBoardState();
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
    }
    /**
     * ユーザーが勝利したかどうかを確認するためのメソッド
     * 縦、横、左斜め、右斜めを走査する
     * @param {gameBoard} ゲーム盤
     * @return {boolean} ユーザーが勝利したかどうかの真偽値
     */
    judgeWin(gameBoard) {
        return this.judgeRow(gameBoard, index_1.MOVE.CIRCLE)
            || this.judgeColumn(gameBoard, index_1.MOVE.CIRCLE)
            || this.judgeLeftSlanting(gameBoard, index_1.MOVE.CIRCLE)
            || this.judgeRightSlanting(gameBoard, index_1.MOVE.CIRCLE);
    }
    /**
     * ユーザーが敗北したかどうかを確認するためのメソッド
     * 縦、横、左斜め、右斜めを走査する
     * @param {gameBoard} ゲーム盤
     * @return {boolean} ユーザーが敗北したかどうかの真偽値
     */
    judgeLose(gameBoard) {
        return this.judgeRow(gameBoard, index_1.MOVE.CROSS)
            || this.judgeColumn(gameBoard, index_1.MOVE.CROSS)
            || this.judgeLeftSlanting(gameBoard, index_1.MOVE.CROSS)
            || this.judgeRightSlanting(gameBoard, index_1.MOVE.CROSS);
    }
    /**
     * 引き分けかどうかを確認するためのメソッド
     * @param {gameBoard} ゲーム盤
     * @return {boolean} 引き分けかどうかの真偽値
     */
    judgeDraw(gameBoard) {
        for (let row = 0; row < this._rowSize; row++) {
            for (let column = 0; column < this._columnSize; column++) {
                if (gameBoard[row][column] === index_1.MOVE.EMPTY) {
                    return false;
                }
            }
        }
        return true;
    }
    /**
     * row(横のライン)が引数で指定された打ち手で5連が達成されているか確認するためのメソッド
     * @param {gameBoard} ゲーム盤
     * @param {moves} 打ち手
     * @return {boolean} 勝敗が決定したか真偽値
     */
    judgeRow(gameBoard, moves) {
        for (let row = 0; row < this._rowSize; row++) {
            for (let column = 0; column < this._columnMax; column++) {
                if (this.checkARow(gameBoard, moves, row, column)) {
                    return true;
                }
            }
        }
        return false;
    }
    /**
     * rowにおいて指定された打ち手が、ゲーム盤上の指定された範囲内で勝敗を決定する数分連続しているかの真偽値を返すメソッド
     * @param {gameBoard} ゲーム盤
     * @param {moves} 打ち手
     * @return {boolean} 指定された打ち手が、ゲーム盤上の指定された範囲内で勝敗を決定する数分連続しているかの真偽値
     */
    checkARow(gameBoard, moves, row, column) {
        for (let difference = 0; difference < this._judgeCriteriaSequence; difference++) {
            if (gameBoard[row][column + difference] != moves) {
                return false;
            }
        }
        return true;
    }
    /**
     * column(縦のライン)が引数で指定されたMoveで5連が達成されているか確認するためのメソッド
     * @param {gameBoard} ゲーム盤
     * @param {moves} 打ち手
     * @return {boolean} 勝敗が決定したか真偽値
     */
    judgeColumn(gameBoard, moves) {
        for (let column = 0; column < this._columnSize; column++) {
            for (let row = 0; row < this._rowMax; row++) {
                if (this.checkAColumn(gameBoard, moves, row, column)) {
                    return true;
                }
            }
        }
        return false;
    }
    /**
     * columnにおいて指定された打ち手が、ゲーム盤上の指定された範囲内で勝敗を決定する数分連続しているかの真偽値を返すメソッド
     * @param {gameBoard} ゲーム盤
     * @param {moves} 打ち手
     * @param {row}       rowのインデックス
     * @param {column}    columnのインデックス
     * @return {boolean} 指定された打ち手が、ゲーム盤上の指定された範囲内で勝敗を決定する数分連続しているかの真偽値
     */
    checkAColumn(gameBoard, moves, row, column) {
        for (let difference = 0; difference < this._judgeCriteriaSequence; difference++) {
            if (gameBoard[row + difference][column] != moves) {
                return false;
            }
        }
        return true;
    }
    /**
     * 左斜めのラインにおいて、引数で受け取った打ち手が5連揃っているかどうかの真偽値を確認するためのメソッド
     * @param {gameBoard} ゲーム盤
     * @param {moves} 打ち手
     * @return {boolean} 右斜めのラインにおいて、引数で受け取った打ち手が5連揃っているかどうかの真偽値を確認するためのメソッド
     */
    judgeLeftSlanting(gameBoard, moves) {
        // centerAxis
        let column = 0;
        for (let row = 0; row < this._rowMax; row++) {
            // 1回あたりの5連
            const oneTermCheck = this.checkOneTermLeftSlanting(gameBoard, moves, row, column);
            if (oneTermCheck) {
                return true;
            }
            column++;
        }
        // rowシフト
        for (let rowStart = 1; rowStart < this._judgeCriteriaSequence; rowStart++) {
            const rowShiftCheck = this.leftSlantingRowShift(gameBoard, moves, rowStart);
            if (rowShiftCheck) {
                return true;
            }
        }
        // columnシフト
        for (let columnStart = 0; columnStart < this._columnMax; columnStart++) {
            const columnShiftCheck = this.leftSlantingColumnShift(gameBoard, moves, columnStart);
            if (columnShiftCheck) {
                return true;
            }
        }
        return false;
    }
    /**
     * 左ラインのROWがスライドした時の審査を行うためのメソッド
     *
     * @param {gameBoard} ゲーム盤
     * @param {moves}     検査対象のプレーヤーの打ち手
     * @return  {boolean} 勝敗が決定したか真偽値
     */
    leftSlantingRowShift(gameBoard, moves, rowStart) {
        let column = 0;
        // for文1回で、1つの連を表す
        for (let row = rowStart; row < this._rowMax; row++) {
            const oneTermCheck = this.checkOneTermLeftSlanting(gameBoard, moves, row, column);
            if (oneTermCheck) {
                return true;
            }
            column++;
        }
        return false;
    }
    /**
      * 左ラインのROWがスライドした時の審査を行うためのメソッド
      *
      * @param {gameBoard} ゲーム盤
      * @param {moves}     検査対象のプレーヤーの打ち手
      * @return  {boolean} 勝敗が決定したか真偽値
      */
    leftSlantingColumnShift(gameBoard, moves, columnStart) {
        let row = 0;
        // for文1回で、1つの連を表す
        for (let column = columnStart; column < this._columnMax; column++) {
            const oneTermCheck = this.checkOneTermLeftSlanting(gameBoard, moves, row, column);
            if (oneTermCheck) {
                return true;
            }
            row++;
        }
        return false;
    }
    /**
      * 左斜めのラインの1回あたりおいて、引数で受け取った打ち手が5連揃っているかどうかの真偽値を確認するためのメソッド
      *
      * @param {gameBoard} ゲーム盤
      * @param {moves}     打ち手
      * @param {row}      rowのインデックス
      * @param {column}    columnのインデックス
      * @return {boolean}  1回あたりおいて、引数で受け取った打ち手が5連揃っているかどうかの真偽値
      */
    checkOneTermLeftSlanting(gameBoard, moves, row, column) {
        for (let difference = 0; difference < this._judgeCriteriaSequence; difference++) {
            if (gameBoard[row + difference][column + difference] != moves) {
                return false;
            }
        }
        return true;
    }
    /**
      * 右斜めのラインにおいて、引数で受け取った打ち手が5連揃っているかどうかの真偽値を確認するためのメソッド
      *
      * @param {gameBoard} ゲーム盤
      * @param {moves}     打ち手
      * @return {boolean} 右斜めのラインにおいて、引数で受け取った打ち手が5連揃っているかどうかの真偽値を確認するためのメソッド
      */
    judgeRightSlanting(gameBoard, moves) {
        const correctVal = 1;
        // centerAxis
        let column = this._columnSize - correctVal;
        for (let row = 0; row < this._rowMax; row++) {
            // 1回あたりの5連
            const oneTermCheck = this.checkOneTermRightSlanting(gameBoard, moves, row, column);
            if (oneTermCheck) {
                return true;
            }
            column--;
        }
        // rowシフト
        for (let rowStart = 1; rowStart < this._judgeCriteriaSequence; rowStart++) {
            const rowShiftCheck = this.rightSlantingRowShift(gameBoard, moves, rowStart);
            if (rowShiftCheck) {
                return true;
            }
        }
        // columnシフト
        const start = gameBoard.length - correctVal;
        for (let columnStart = start; columnStart > this._rowSize - this._judgeCriteriaSequence - correctVal; columnStart--) {
            const columnShiftCheck = this.rightSlantingColumnShift(gameBoard, moves, columnStart);
            if (columnShiftCheck) {
                return true;
            }
        }
        return false;
    }
    /**
      * 右斜めのラインがrowにおいてシフトする時(row1~row4)、引数で受け取った打ち手が5連揃っているかどうかの真偽値を確認するためのメソッド
      *
      * @param {gameBoard} ゲーム盤
      * @param {moves}     打ち手
      * @param {rowStart}  rowの調査開始値
      * @return {boolean} 右斜めのラインがrowにおいてシフトする時(row1~row4)、引数で受け取った打ち手が5連揃っているかどうかの真偽値
      */
    rightSlantingRowShift(gameBoard, moves, rowStart) {
        const correctVal = 1;
        let column = this._columnSize - correctVal;
        for (let row = rowStart; row < this._rowMax; row++) {
            // 1回あたりの5連
            const oneTermCheck = this.checkOneTermRightSlanting(gameBoard, moves, row, column);
            if (oneTermCheck) {
                return true;
            }
            column--;
        }
        return false;
    }
    /**
      * 右斜めのラインがrowにおいてシフトする時(row1~row4)、引数で受け取った打ち手が5連揃っているかどうかの真偽値を確認するためのメソッド
      *
      * @param {gameBoard}   ゲーム盤
      * @param {moves}       打ち手
      * @param {columnStart} rowの調査開始値
      * @return {boolean} 右斜めのラインがrowにおいてシフトする時(row1~row4)、引数で受け取った打ち手が5連揃っているかどうかの真偽値
      */
    rightSlantingColumnShift(gameBoard, moves, columnStart) {
        let row = 0;
        const correctVal = 2;
        const columnEnd = this._judgeCriteriaSequence - correctVal;
        for (let column = columnStart; column > columnEnd; column--) {
            // 1回あたりの5連
            const oneTermCheck = this.checkOneTermRightSlanting(gameBoard, moves, row, column);
            if (oneTermCheck) {
                return true;
            }
            row++;
        }
        return false;
    }
    /**
      * 右斜めのライン1回あたりおいて、引数で受け取った打ち手が5連揃っているかどうかの真偽値を確認するためのメソッド
      *
      * @param {gameBoard} ゲーム盤
      * @param {moves}     打ち手
      * @param {row}       rowのインデックス
      * @param {column}    columnのインデックス
      * @return {boolean} 1回あたりおいて、引数で受け取った打ち手が5連揃っているかどうかの真偽値
      */
    checkOneTermRightSlanting(gameBoard, moves, row, column) {
        for (let difference = 0; difference < this._judgeCriteriaSequence; difference++) {
            if (gameBoard[row + difference][column - difference] != moves) {
                return false;
            }
        }
        return true;
    }
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Judge;