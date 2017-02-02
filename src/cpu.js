import MiniMax from './miniMax.js';
let miniMax = new MiniMax();

export default class Cpu {

    doMove(depth, board) {

        console.log('doMoveメソッドが呼び出されました');

        let cellObj = miniMax.calcMiniMax(2, board, '×', -999999999, 999999999);

        console.log(cellObj);

        board.addMove(cellObj.rowVal, cellObj.columnVal, '×');

        let e = document.getElementById(cellObj.rowVal + '-' + cellObj.columnVal);
        e.textContent = '×';
    }
}