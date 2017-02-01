import miniMax from './miniMax.js';

export default class Cpu extends Player {

    constructor(name, signal, board) {
        super(name, signal, board);
    }

    // overRide 
    doMove(depth) {
        miniMax.calcMinMax(depth, board, '○', Number.MIN_VALUE, Number.MAX_VALUE);
        board.addMoves(row, column, Moves.CROSS);
    }
}