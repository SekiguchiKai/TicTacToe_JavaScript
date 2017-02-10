import * as assert from "power-assert";
import Board from '../src/ts/board';
import Judge from '../src/ts/judge';
import { MOVE, RESULT } from '../src/ts/const';

export function judgeSpec() {

    describe('ゲーム盤に打ち手を打ち、状況に応じて適切に勝敗の判断を行うことができる', () => {
        // rowをチェック
        checkRow(MOVE.CIRCLE, RESULT.WIN);
        checkRow(MOVE.CROSS, RESULT.LOSE);
        checkRow(MOVE.EMPTY, RESULT.PENNDING);

        // columnをチェック
        checkColumn(MOVE.CIRCLE, RESULT.WIN);
        checkColumn(MOVE.CROSS, RESULT.LOSE);
        checkColumn(MOVE.EMPTY, RESULT.PENNDING);

        // 左斜めのライン
        checkLeftSlantingLine(MOVE.CIRCLE, RESULT.WIN);
        checkLeftSlantingLine(MOVE.CROSS, RESULT.LOSE);
        checkLeftSlantingLine(MOVE.EMPTY, RESULT.PENNDING);

        // 右斜めのライン
        checkRightSlantingLine(MOVE.CIRCLE, RESULT.WIN);
        checkRightSlantingLine(MOVE.CROSS, RESULT.LOSE);
        checkRightSlantingLine(MOVE.EMPTY, RESULT.PENNDING);

        /**
         * rowに対して、JudgeResultメソッドが適切に機能しているかを確認するためのメソッド
         */
        function checkRow(move: string, expected: string) {
            const board = new Board();
            let cell = [];
            // rowを検査
            for (let row = 0; row < 3; row++) {
                for (let column = 0; column < 3; column++) {
                    board.putMove(row, column, move);
                    cell.push(row, column);
                }
                console.log('確認' + board.getMove(0, 0) + board.getMove(0, 1) + board.getMove(0, 2));
                testJudgeResult(board, expected, `rowのチェック[row: ${cell[0]}, column: ${cell[1]}] = ${move}, [row: ${cell[2]}, column: ${cell[3]}] = ${move}, [row: ${cell[4]}, column: ${cell[5]}] = ${move} の時に、${expected}`);
                // 配列の長さを0にして初期化
                cell.length = 0;
            }
        }

        /**
          * columnに対して、JudgeResultメソッドが適切に機能しているかを確認するためのメソッド
          */
        function checkColumn(move: string, expected: string) {
            const board = new Board();
            let cell = [];

            // columnを検査
            for (let column = 0; column < 3; column++) {
                for (let row = 0; row < 3; row++) {
                    board.putMove(row, column, move);
                    cell.push(row, column);
                }
                console.log('確認' + board.getMove(0, 0) + board.getMove(0, 1) + board.getMove(0, 2));
                testJudgeResult(board, expected, `columnのチェック[row: ${cell[0]}, column: ${cell[1]}] = ${move}, [row: ${cell[2]}, column: ${cell[3]}] = ${move}, [row: ${cell[4]}, column: ${cell[5]}] = ${move} の時に、${expected}`);
                // 配列の長さを0にして初期化
                cell.length = 0;
            }

        }
        /**
         * 左斜めのラインに対して、JudgeResultメソッドが適切に機能しているかを確認するためのメソッド
         */
        function checkLeftSlantingLine(move: string, expected: string) {
            const board = new Board();
            board.putMove(0, 0, move);
            board.putMove(1, 1, move);
            board.putMove(2, 2, move);

            testJudgeResult(board, expected, `左斜めのラインのチェック[row: 0, column: 0 = ${move}, [row: 1, column: 1 = ${move}, [row: 2, column: 2 = ${move} の時に、${expected}`);
        }

        /**
         * 左斜めのラインに対して、JudgeResultメソッドが適切に機能しているかを確認するためのメソッド
         */
        function checkRightSlantingLine(move: string, expected: string) {
            const board = new Board();
            board.putMove(0, 2, move);
            board.putMove(1, 1, move);
            board.putMove(2, 0, move);

            testJudgeResult(board, expected, `右斜めのラインのチェック[row: 0, column: 0 = ${move}, [row: 1, column: 1 = ${move}, [row: 2, column: 2 = ${move} の時に、${expected}`);
        }

        function testJudgeResult(board: Board, expected: string, comment: string) {
            it(comment, () => {
                const judge = new Judge();
                assert(judge.judgeResult(board) === expected);
            });
        };

    });
}
