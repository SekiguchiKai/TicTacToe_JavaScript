import * as assert from "power-assert";
import Board from '../src/ts/board';
import MiniMax from '../src/ts/miniMax';
import { MOVE } from '../src/ts/const';

export function miniMaxSpec() {
    describe('miniMaxクラスのcalcMiniMaxメソッドが、適切なcalcMiniMaxTestIが打ち手を打つべき場所を返してくれる', () => {
        checkRow();
        checkColumn();
        checkLeftSlantingLine();
        checkRightSlantingLine();


        function checkRow() {

            let board = new Board();
            let array = [];

            for (let row = 0; row < 3; row++) {
                for (let column = 0; column < 2; column++) {
                    board.putMove(row, column, MOVE.CIRCLE);
                    array.push(row, column);
                }
                const expectedRow = row;
                const expectedColumn = 2;

                calcMiniMaxTest(board, expectedRow, expectedColumn, `rowのチェック[row: ${array[0]}, column: ${array[1]}] = ${MOVE.CIRCLE}, [row: ${array[2]}, column: ${array[3]}] = ${MOVE.CIRCLE} の時にcalcMiniMaxTestIは[row: ${expectedRow}, column: ${expectedColumn}]`);
                array.length = 0;
                board = new Board();
            }
        }



        function checkColumn() {

            let board = new Board();
            let array = [];

            for (let column = 0; column < 3; column++) {
                for (let row = 0; row < 2; row++) {
                    board.putMove(row, column, MOVE.CIRCLE);
                    array.push(row, column);
                }
                const expectedRow = 2;
                const expectedColumn = column;

                calcMiniMaxTest(board, expectedRow, expectedColumn, `rowのチェック[row: ${array[0]}, column: ${array[1]}] = ${MOVE.CIRCLE}, [row: ${array[2]}, column: ${array[3]}] = ${MOVE.CIRCLE} の時にcalcMiniMaxTestIは[row: ${expectedRow}, column: ${expectedColumn}]`);
                array.length = 0;
                board = new Board();
            }
        }


        function checkLeftSlantingLine() {
            const board = new Board();
            board.putMove(0, 0, MOVE.CIRCLE);
            board.putMove(1, 1, MOVE.CIRCLE);

            const expectedRow = 2;
            const expectedColumn = 2;

            calcMiniMaxTest(board, expectedRow, expectedColumn, `rowのチェック[row: 0, column: 0 = ${MOVE.CIRCLE}, [row: 1, column: 1 = ${MOVE.CIRCLE} の時にcalcMiniMaxTestIは[row: ${expectedRow}, column: ${expectedColumn}]`);

        }

        function checkRightSlantingLine() {
            const board = new Board();
            board.putMove(0, 2, MOVE.CIRCLE);
            board.putMove(1, 1, MOVE.CIRCLE);

            const expectedRow = 2;
            const expectedColumn = 0;

            calcMiniMaxTest(board, expectedRow, expectedColumn, `rowのチェック[row: 0, column: 2 = ${MOVE.CIRCLE}, [row: 1, column: 1 = ${MOVE.CIRCLE} の時にcalcMiniMaxTestIは[row: ${expectedRow}, column: ${expectedColumn}]`);
        }



        function calcMiniMaxTest(board: Board, expectedRow: number, expectedColumn: number, comment: string) {
            const miniMax = new MiniMax();

            const maxNum: number = 9999999999;
            const minNum: number = -9999999999;
            const bestCell = miniMax.calcMiniMax(4, board, MOVE.CROSS, minNum, maxNum);

            it(comment, () => {

                assert(bestCell['rowVal'] === expectedRow);
                assert(bestCell['columnVal'] === expectedColumn);
            })
        }

    });
};