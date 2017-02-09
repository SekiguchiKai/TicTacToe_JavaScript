"use strict";
var counter_1 = require("./counter");
var index_1 = require("./index");
var ScoreCalculator = (function () {
    function ScoreCalculator() {
    }
    /**
     * 得点の計算を行うためのメソッド
     * @param {gameBoard} ゲーム盤
     * @return {number} 合計得点
     */
    ScoreCalculator.prototype.calcScore = function (gameBoard) {
        var totalScore = 0;
        var arraySize = 3;
        var movesArray = new Array(arraySize);
        var maxLength = 3;
        // row
        for (var row = 0; row < maxLength; row++) {
            for (var column_1 = 0; column_1 < maxLength; column_1++) {
                movesArray[column_1] = gameBoard[row][column_1];
            }
            totalScore += this.calcLineScore(movesArray);
        }
        // column
        for (var column_2 = 0; column_2 < maxLength; column_2++) {
            for (var row = 0; row < maxLength; row++) {
                movesArray[row] = gameBoard[row][column_2];
            }
            totalScore += this.calcLineScore(movesArray);
        }
        // 左斜め
        for (var idx = 0; idx < maxLength; idx++) {
            movesArray[idx] = gameBoard[idx][idx];
        }
        totalScore += this.calcLineScore(movesArray);
        // 右斜め
        var column = 2;
        for (var row = 0; row < maxLength; row++) {
            movesArray[row] = gameBoard[row][column];
            column--;
        }
        totalScore += this.calcLineScore(movesArray);
        counter_1.default.resetCount();
        return totalScore;
    };
    /**
     * 1ラインの得点を計算するためのメソッッド
     * @param {movesArray} 打ち手を格納するための配列
     * @return {number} 得点
     */
    ScoreCalculator.prototype.calcLineScore = function (movesArray) {
        var score = 0;
        // 1つ目
        if (movesArray[0] === index_1.MOVE.CROSS) {
            score = 1;
        }
        else if (movesArray[0] === index_1.MOVE.CIRCLE) {
            score = -1;
        }
        // 2つ目
        if (movesArray[1] === index_1.MOVE.CROSS) {
            if (score === 1) {
                score = 10;
            }
            else if (score === -1) {
                return 0;
            }
            else {
                score = 1;
            }
        }
        else if (movesArray[1] === index_1.MOVE.CIRCLE) {
            if (score === -1) {
                score = -10;
            }
            else if (score === 1) {
                return 0;
            }
            else {
                score = -1;
            }
        }
        // 3つ目
        if (movesArray[2] === index_1.MOVE.CROSS) {
            if (score > 0) {
                score *= 10;
            }
            else if (score < 0) {
                return 0;
            }
            else {
                score = 1;
            }
        }
        else if (movesArray[2] === index_1.MOVE.CIRCLE) {
            if (score < 0) {
                score *= 10;
            }
            else if (score > 1) {
                return 0;
            }
            else {
                score = -1;
            }
        }
        return score;
    };
    return ScoreCalculator;
}());
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = ScoreCalculator;
