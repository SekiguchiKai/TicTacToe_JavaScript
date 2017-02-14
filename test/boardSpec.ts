import * as assert from "power-assert";
import Board from '../src/ts/board';
import { MOVE } from '../src/ts/const';

export function boardSpec() {
    const rowSize = 3;
    const columnSize = 3;
    const board = new Board(rowSize, columnSize);

    let rowIdxArray = [0, 1, 2];
    let columnIdxArray = [0, 1, 2];


    describe('bordクラスのgameBoard配列', () => {
        // 二次元配列のforEach
        rowIdxArray.forEach((row) => {
            columnIdxArray.forEach((column) => {
                describe("Boardクラス", () => {
                    describe("gameBoard配列", () => {
                        it(`row:${row}, column:${column}に打ち手○を格納し、取得することができる`, () => {
                            board.putMove(row, column, MOVE.CIRCLE);
                            assert(board.getMove(row, column) === MOVE.CIRCLE);
                        });
                    });
                });
            });
        });
    });
}