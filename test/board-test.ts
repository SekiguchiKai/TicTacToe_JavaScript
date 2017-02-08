import assert from 'assert';
import Judge from '../src/ts/judge';
import Board from '../src/ts/Board';

describe('', () => {
    it('', () => {
        const board = new Board(3, 3)
        board.putMove(1, 1, '○');
        assert(board.getMove(1, 1) === '○');
    })
})