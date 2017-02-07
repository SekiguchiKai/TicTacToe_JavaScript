"use strict";

export default class ScoreCalculator {
    /**
     * 得点の計算を行うためのメソッド
     * @param {gameBoard} ゲーム盤
     * @return {number} 合計得点
     */
    calcScore(gameBoard: string[][]): number;
    /**
     * 1ラインの得点を計算するためのメソッッド
     * @param {movesArray} 打ち手を格納するための配列
     * @return {number} 得点
     */
    calcLineScore(movesArray: string[]): number;
}
