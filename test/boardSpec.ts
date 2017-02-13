import * as assert from "power-assert";
import Board from '../src/ts/board';
import { MOVE } from '../src/ts/const';

export function boardSpec() {
    const rowSize = 3;
    const columnSize = 3;
    const board = new Board(rowSize, columnSize);

    let rowIdxArray = [0, 1, 2];
    let columnIdxArray = [0, 1, 2];

    describe('bordクラスのgameBoard配列に対して、打ち手を格納すると正しく格納され、取得することができる', () => {
        // 二次元配列のforEach
        rowIdxArray.forEach((row) => {
            columnIdxArray.forEach((column) => {
                testPutMoveAndgetMove(row, column, MOVE.CIRCLE, MOVE.CIRCLE);
            })
        })
        // putMoveとgetMoveメソッドが正常に動作するかを確認するための関数
        function testPutMoveAndgetMove(row: number, column: number, data: string, expected: string) {
            it(`gameBoard配列に対して、row:${row}, column:${column}に対して、打ち手${data}を格納すると正しく格納され、取得することができる`, () => {
                board.putMove(row, column, data);
                assert(board.getMove(row, column) === expected);
            });
        }
    });
}