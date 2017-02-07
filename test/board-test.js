import assert from 'power-assert';
import Board from '../src/board.js';
describe('putMove', () => {

    const board = new Board(3, 3);

    it('[0][0]に○を格納することができる', () => {
        const row = 0;
        const column = 0;
        const circleMove = '○';
        board.putMove(row, column, circleMove);
        assert(board.getMove(row, column) === circleMove);
    })
})