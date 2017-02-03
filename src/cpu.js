import MiniMax from './miniMax.js';
let miniMax = new MiniMax();

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

        console.log('doMoveメソッドが呼び出されました');

        let cellObj = miniMax.calcMiniMax(3, board, '×', -9999999999, 9999999999);

        console.log(cellObj);

        board.putMove(cellObj.rowVal, cellObj.columnVal, '×');

        let e = document.getElementById(cellObj.rowVal + '-' + cellObj.columnVal);
        e.innerHTML = '<span style="font-size:100px; color:white;">×</span>';
    }
}