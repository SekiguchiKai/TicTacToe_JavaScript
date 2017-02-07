"use strict";

import { assert } from 'power-assert';
import Board from '../src/ts/board';

describe('a', () => {

    it('a', () => {
        const board = new Board(3, 3);
        const row = 1;
        const column = 1;
        const move = '○';
        board.putMove(row, column, move);
        assert(board.getMove(row, column) === 'あ');
    })
})
