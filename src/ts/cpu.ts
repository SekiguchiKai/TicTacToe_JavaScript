import MiniMax from './miniMax';
import { MOVE } from './const';
import Board from './board';

/**
 * CPUのプレーヤーを表すためのクラス
 */
export default class Cpu {


    /**
     * コンストラクタ
     */
    constructor(private _miniMax = new MiniMax()) { }

    /**
     * 打ち手を打つためのメソッド
     * @param {depth} 読みの深さ
     * @param {board} Boardクラスのインスタンス
     */
    public doMove(depth: number, board: Board) {
        const maxNum = 9999999999;
        const minNum = -9999999999;
        const cellObj = this._miniMax.calcMiniMax(depth, board, MOVE.CROSS, minNum, maxNum);

        board.putMove(cellObj['rowVal'], cellObj['columnVal'], MOVE.CROSS);
        return cellObj;
    }
}