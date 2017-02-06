import MiniMax from './miniMax.js';
import { MOVE } from './index.js'



const miniMax = new MiniMax();

/**
 * CPUのプレーヤーを表すためのクラス
 */
export default class Cpu {

    /**
     * 打ち手を打つためのメソッド
     * @param {depth} 読みの深さ
     * @param {board} Boardクラスのインスタンス
     */
    doMove(depth, board) {
        const maxNum = 9999999999;
        const minNum = -9999999999;
        const cellObj = miniMax.calcMiniMax(depth, board, MOVE.CROSS, minNum, maxNum);

        board.putMove(cellObj.rowVal, cellObj.columnVal, MOVE.CROSS);

        const e = document.getElementById(`${cellObj.rowVal}-${cellObj.columnVal}`);
        e.innerHTML = '<span style="font-size:100px; color:white;">×</span>'; // ここに書かないこと
    }
}