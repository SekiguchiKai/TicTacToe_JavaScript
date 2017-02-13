import * as assert from "power-assert";
import Board from '../src/ts/board';
import { MOVE } from '../src/ts/const';

export function boardSpec() {
    const rowSize = 3;
    const columnSize = 3;
    const board = new Board(rowSize, columnSize);

    let rowIdxArray = [0, 1, 2];
    let columnIdxArray = [0, 1, 2];

    describe('bordクラスのgameBoard配列の', () => {
        // 二次元配列のforEach
        rowIdxArray.forEach((row) => {
            columnIdxArray.forEach((column) => {
                it(`row:${row}, column:${column}に対して、打ち手${MOVE.CIRCLE}を格納すると正しく格納され、取得することができる`, () => {
                    board.putMove(row, column, MOVE.CIRCLE);
                    assert(board.getMove(row, column) === MOVE.CIRCLE);
                });
            })
        })
    })
}