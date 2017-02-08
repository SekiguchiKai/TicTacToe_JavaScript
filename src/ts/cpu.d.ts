import MiniMax from './miniMax';
import Board from './board';
/**
 * CPUのプレーヤーを表すためのクラス
 */
export default class Cpu {
    private _miniMax;
    /**
     * コンストラクタ
     */
    constructor(_miniMax?: MiniMax);
    /**
     * 打ち手を打つためのメソッド
     * @param {depth} 読みの深さ
     * @param {board} Boardクラスのインスタンス
     */
    doMove(depth: number, board: Board): {
        [index: string]: number;
    };
}
