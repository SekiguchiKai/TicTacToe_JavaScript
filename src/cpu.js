import MiniMax from './miniMax.js';
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
        const cellObj = miniMax.calcMiniMax(depth, board, '×', -9999999999, 9999999999);

        board.putMove(cellObj.rowVal, cellObj.columnVal, '×');

        const e = document.getElementById(`${cellObj.rowVal}-${cellObj.columnVal}`);
        e.innerHTML = '<span style="font-size:100px; color:white;">×</span>'; // ここに書かないこと
    }
}