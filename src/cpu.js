import MiniMax from './miniMax.js';
let miniMax = new MiniMax();

export default class Cpu {

    // constructor(name, signal, board) {
    //     super(name, signal, board);
    // }

    // overRide 
    doMove(depth, board) {
        //　実験

        // let e = document.getElementById('1-1');
        // e.textContent = '×';
        console.log('doMoveメソッドが呼び出されました');

        let cellObj = miniMax.calcMiniMax(depth, board, '○', Number.MIN_VALUE, Number.MAX_VALUE);
        window.alert('miniMaxを完了しました');

        board.addMoves(cellObj.rowVal, cellObj.columnVal, '×');


        // board.addMoves(1, 1, '×');
        let e = document.getElementById(cellObj.rowVal + '-' + cellObj.columnVal);
        e.textContent = '×';
    }
}