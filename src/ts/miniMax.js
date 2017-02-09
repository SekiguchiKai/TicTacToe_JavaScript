"use strict";
var scoreCalculator_1 = require("./scoreCalculator");
var index_1 = require("./index");
var scoreCalculator = new scoreCalculator_1.default();
/**
 * ミニマックスアルゴリズムを表したクラス
 */
var MiniMax = (function () {
    function MiniMax() {
    }
    /**
     * ミニマックスアルゴリズムαβ法を用い、引数で渡された打ち手のプレイヤーに取って最適な点数とゲーム盤の場所を返すメソッド
     * CPUの場合は、最大の点数とその点数を取り得るゲーム盤の場所を返し、USERの場合は、点数とその点数を取り得るゲーム盤の場所を返す
     * <p>
     * このメソッドのアルゴリズム
     * 【CPUの場合】
     * 現在のゲーム木の深さの1個下の階層の点数をMinMaxで取得する
     * その取得した点数が現在保持している一番高い点数（ベストスコア）よりも高い場合は、その点数が保持されるベストスコアとなる
     * <p>
     * 【USERの場合】
     * 現在のゲーム木の深さの1個下の階層の点数をMinMaxで取得する
     * その取得した点数が現在保持している一番低い点数（ベストスコア）よりも低い場合は、その点数が保持されるベストスコアとなる
     *
     * @param {depth}      探索の深さ
     * @param {board} Boardクラスのインスタンス
     * @param {playerSignal} Playerの打ち手
     * @param {alpha}      α
     * @param {beta}       β
     * @return {object} 打ち手を打つのに最適な場所とそこに打ち手を打った場合の点数を格納したオブジェクト
     */
    MiniMax.prototype.calcMiniMax = function (depth, board, playerSignal, alpha, beta) {
        var capableMovesArray = this.makeCapableMoveArray(board);
        var score;
        var row = -1;
        var column = -1;
        var gameOverNum = 0;
        // 試合が終了か、深さが0の場合は、スコアを
        if (capableMovesArray.length === gameOverNum || depth === gameOverNum) {
            // ここ要変更
            score = scoreCalculator.calcScore(board.getGameBoardState());
            return { rowVal: row, columnVal: column, bestScore: score };
        }
        else {
            // CPUの点数であるαの方が、βよりも大きい場合、それ以上探索しなくても良い(その時のαが最大なので)ので、探索を打ち切る
            for (var _i = 0, capableMovesArray_1 = capableMovesArray; _i < capableMovesArray_1.length; _i++) {
                var cell = capableMovesArray_1[_i];
                board.putMove(cell.rowValue, cell.columnValue, playerSignal);
                var correctVal = 1;
                if (playerSignal === index_1.MOVE.CROSS) {
                    score = this.calcMiniMax(depth - correctVal, board, index_1.MOVE.CIRCLE, alpha, beta)['bestScore'];
                    if (score > alpha) {
                        alpha = score;
                        row = cell.rowValue;
                        column = cell.columnValue;
                    }
                }
                else if (playerSignal === index_1.MOVE.CIRCLE) {
                    score = this.calcMiniMax(depth - correctVal, board, index_1.MOVE.CROSS, alpha, beta)['bestScore'];
                    if (score < beta) {
                        beta = score;
                        row = cell.rowValue;
                        column = cell.columnValue;
                    }
                }
                board.putMove(cell.rowValue, cell.columnValue, index_1.MOVE.EMPTY);
                if (alpha >= beta) {
                    break;
                }
            }
        }
        var bestCellObj = {};
        if (playerSignal === index_1.MOVE.CROSS) {
            bestCellObj = {
                rowVal: row,
                columnVal: column,
                bestScore: alpha
            };
            return bestCellObj;
        }
        else {
            bestCellObj = {
                rowVal: row,
                columnVal: column,
                bestScore: beta
            };
            return bestCellObj;
        }
    };
    /**
      * 現在の打ち手を打つことが可能なすべてのゲーム盤の場所をリスト化する（NO_MOVEが存在しているGameBoardの場所）
      *
      * @param {board} Boardクラスのインスタンス
      * @return {Object[]} NO_MOVEが存在するGameBoard上の場所の一覧を格納したオブジェクト
      */
    MiniMax.prototype.makeCapableMoveArray = function (board) {
        var capableMovesArray = [];
        for (var row = 0; row < board.rowSize; row++) {
            for (var column = 0; column < board.columnSize; column++) {
                if (board.getMove(row, column) === index_1.MOVE.EMPTY) {
                    var cellObj = { rowValue: row, columnValue: column };
                    capableMovesArray.push(cellObj);
                }
            }
        }
        return capableMovesArray;
    };
    return MiniMax;
}());
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = MiniMax;
