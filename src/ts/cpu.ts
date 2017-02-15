import MiniMax from './miniMax';
import { MiniMaxResult } from './miniMax';
import { MOVE } from './const';
import Board from './board';

/**
 * CPUのプレーヤーを表すためのクラス
 */
export default class Cpu {

    /**
     * コンストラクタ
     * @param {MiniMax} miniMax - MiniMaxクラスのインスタンス
     */
    constructor(private _miniMax = new MiniMax()) { }

    /**
     * 打ち手を打つためのメソッド
     * @param {number} depth -  読みの深さ
     * @param {Board} board -  Boardクラスのインスタンス
     * @return {MiniMaxResult} 打ち手を置くのに最適なセルの場所とそこに打ち手を置いた場合の点数のオブジェクト型リテラル
     */
    public doMove(depth: number, board: Board): MiniMaxResult {
        const maxNum = 9999999999;
        const minNum = -9999999999;
        const cellObj = this._miniMax.calcMiniMax(depth, board, MOVE.CROSS, minNum, maxNum);

        board.putMove(cellObj.rowValue, cellObj.columnValue, MOVE.CROSS);
        return cellObj;
    }
}