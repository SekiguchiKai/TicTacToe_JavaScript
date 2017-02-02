import MiniMax from './miniMax.js';
let miniMax = new MiniMax();

export default class Cpu {

    doMove(depth, board) {

        console.log('doMoveメソッドが呼び出されました');

        let cellObj = miniMax.calcMiniMax(3, board, '×', -9999999999, 9999999999);

        console.log(cellObj);

        board.addMove(cellObj.rowVal, cellObj.columnVal, '×');

        let e = document.getElementById(cellObj.rowVal + '-' + cellObj.columnVal);
        e.textContent = '×';
    }
}