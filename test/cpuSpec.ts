import * as assert from "power-assert";
import Board from '../src/ts/board';
import Cpu from '../src/ts/cpu';
import { MOVE } from '../src/ts/const';

export function cpuSpec() {
    describe('cpuクラスのdoMoveメソッドで、適切な場所に打ち手を打つ', () => {
        checkRow(MOVE.CIRCLE);
        checkColumn(MOVE.CIRCLE);
        checkLeftSlantingLine(MOVE.CIRCLE);
        checkRightSlantingLine(MOVE.CIRCLE);


        /**
         * rowに対して、doMoveメソッドが適切に機能しているかを確認するための関数
         */
        function checkRow(move: string) {

            const rowSize = 3;
            const columnSize = 3;

            let board = new Board(rowSize, columnSize);
            let array = [];

            for (let row = 0; row < 3; row++) {
                for (let column = 0; column < 2; column++) {
                    board.putMove(row, column, move);
                    array.push(row, column);
                }
                const expectedRow = row;
                const expectedColumn = 2;

                testdoMove(board, expectedRow, expectedColumn, `rowのチェック[row: ${array[0]}, column: ${array[1]}] = ${move}, [row: ${array[2]}, column: ${array[3]}] = ${move} の時にtestdoMoveIは[row: ${expectedRow}, column: ${expectedColumn}]`);
                array.length = 0;
                board = new Board(rowSize, columnSize);
            }
        }


        /**
         * columnに対して、doMoveメソッドが適切に機能しているかを確認するための関数
         */
        function checkColumn(move: string) {

            const rowSize = 3;
            const columnSize = 3;

            let board = new Board(rowSize, columnSize);
            let array = [];

            for (let column = 0; column < 3; column++) {
                for (let row = 0; row < 2; row++) {
                    board.putMove(row, column, move);
                    array.push(row, column);
                }
                const expectedRow = 2;
                const expectedColumn = column;

                testdoMove(board, expectedRow, expectedColumn, `rowのチェック[row: ${array[0]}, column: ${array[1]}] = ${move}, [row: ${array[2]}, column: ${array[3]}] = ${move} の時にtestdoMoveIは[row: ${expectedRow}, column: ${expectedColumn}]`);
                array.length = 0;
                board = board = new Board(rowSize, columnSize);
            }
        }

        /**
         * 左斜めのラインに対して、doMoveメソッドが適切に機能しているかを確認するための関数
         */
        function checkLeftSlantingLine(move: string) {
            const rowSize = 3;
            const columnSize = 3;
            let board = new Board(rowSize, columnSize);

            board.putMove(0, 0, move);
            board.putMove(1, 1, move);

            const expectedRow = 2;
            const expectedColumn = 2;

            testdoMove(board, expectedRow, expectedColumn, `rowのチェック[row: 0, column: 0 = ${move}, [row: 1, column: 1 = ${move} の時にtestdoMoveIは[row: ${expectedRow}, column: ${expectedColumn}]`);

        }
        /**
         * 右斜めのラインに対して、doMoveメソッドが適切に機能しているかを確認するための関数
         */
        function checkRightSlantingLine(move: string) {
            const rowSize = 3;
            const columnSize = 3;
            let board = new Board(rowSize, columnSize);

            board.putMove(0, 2, move);
            board.putMove(1, 1, move);

            const expectedRow = 2;
            const expectedColumn = 0;

            testdoMove(board, expectedRow, expectedColumn, `rowのチェック[row: 0, column: 2 = ${move}, [row: 1, column: 1 = ${move} の時にtestdoMoveIは[row: ${expectedRow}, column: ${expectedColumn}]`);
        }


        /**
         * doMoveメソッドが適切に機能しているかを確認するための関数
         */
        function testdoMove(board: Board, expectedRow: number, expectedColumn: number, comment: string) {
            const cpu = new Cpu();
            const bestCell = cpu.doMove(4, board);

            it(comment, () => {

                assert(bestCell['rowVal'] === expectedRow);
                assert(bestCell['columnVal'] === expectedColumn);
            })
        }

    });
};