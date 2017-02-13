import * as assert from "power-assert";
import Board from '../src/ts/board';
import ScoreCalculator from '../src/ts/scoreCalculator';
import { MOVE } from '../src/ts/const';

export function scoreCalculatorSpec() {
    describe('ゲーム盤に打ち手を打ち、状況に応じて適切にMiniMax用の得点の計算を行うことができる', () => {
        // rowを計算
        calcRow(MOVE.CIRCLE, -105);
        calcRow(MOVE.CROSS, 105);
        calcRow(MOVE.EMPTY, 0);

        // columnを計算
        calcColumn(MOVE.CIRCLE, -105);
        calcColumn(MOVE.CROSS, 105);
        calcColumn(MOVE.EMPTY, 0);

        // 左斜めを計算
        calcLeftSlantingLine(MOVE.CIRCLE, -107);
        calcLeftSlantingLine(MOVE.CROSS, 107);
        calcLeftSlantingLine(MOVE.EMPTY, 0);

        // 右斜めを計算
        calcRightSlantingLine(MOVE.CIRCLE, -107);
        calcRightSlantingLine(MOVE.CROSS, 107);
        calcRightSlantingLine(MOVE.EMPTY, 0);

        /**
         * rowに対して、JudgeResultメソッドが適切に機能しているかを確認するための関数
         */
        function calcRow(move: string, expected: number) {
            let cell = [];
            // rowを検査
            for (let row = 0; row < 3; row++) {
                const rowSize = 3;
                const columnSize = 3;
                let board = new Board(rowSize, columnSize);

                for (let column = 0; column < 3; column++) {
                    board.putMove(row, column, move);
                    cell.push(row, column);
                }
                console.log('確認' + board.getMove(0, 0) + board.getMove(0, 1) + board.getMove(0, 2));
                testJudgeResult(board.getGameBoardState(), expected, `${board.getGameBoardState()}rowの計算[row: ${cell[0]}, column: ${cell[1]}] = ${move}, [row: ${cell[2]}, column: ${cell[3]}] = ${move}, [row: ${cell[4]}, column: ${cell[5]}] = ${move} の時に、${expected}`);
                // 配列の長さを0にして初期化
                cell.length = 0;
            }
        }

        /**
          * columnに対して、JudgeResultメソッドが適切に機能しているかを確認するための関数
          */
        function calcColumn(move: string, expected: number) {
            let cell = [];

            // columnを検査
            for (let column = 0; column < 3; column++) {
                const rowSize = 3;
                const columnSize = 3;
                let board = new Board(rowSize, columnSize);

                for (let row = 0; row < 3; row++) {
                    board.putMove(row, column, move);
                    cell.push(row, column);
                }
                console.log('確認' + board.getMove(0, 0) + board.getMove(0, 1) + board.getMove(0, 2));
                testJudgeResult(board.getGameBoardState(), expected, `${board.getGameBoardState()}columnの計算[row: ${cell[0]}, column: ${cell[1]}] = ${move}, [row: ${cell[2]}, column: ${cell[3]}] = ${move}, [row: ${cell[4]}, column: ${cell[5]}] = ${move} の時に、${expected}`);
                // 配列の長さを0にして初期化
                cell.length = 0;
            }

        }
        /**
         * 左斜めのラインに対して、JudgeResultメソッドが適切に機能しているかを確認するための関数
         */
        function calcLeftSlantingLine(move: string, expected: number) {
            const rowSize = 3;
            const columnSize = 3;
            let board = new Board(rowSize, columnSize);

            board.putMove(0, 0, move);
            board.putMove(1, 1, move);
            board.putMove(2, 2, move);

            testJudgeResult(board.getGameBoardState(), expected, `${board.getGameBoardState()}左斜めのラインの計算[row: 0, column: 0 = ${move}, [row: 1, column: 1 = ${move}, [row: 2, column: 2 = ${move} の時に、${expected}`);
        }

        /**
         * 左斜めのラインに対して、JudgeResultメソッドが適切に機能しているかを確認するための関数
         */
        function calcRightSlantingLine(move: string, expected: number) {
            const rowSize = 3;
            const columnSize = 3;
            let board = new Board(rowSize, columnSize);

            board.putMove(0, 2, move);
            board.putMove(1, 1, move);
            board.putMove(2, 0, move);

            testJudgeResult(board.getGameBoardState(), expected, `${board.getGameBoardState()}右斜めのラインの計算[row: 0, column: 0 = ${move}, [row: 1, column: 1 = ${move}, [row: 2, column: 2 = ${move} の時に、${expected}`);
        }
        /**
         * judgeResultメソッドが適切に機能しているかを確認するための関数
         */
        function testJudgeResult(gameBoard: string[][], expected: number, comment: string) {
            it(comment, () => {
                const scoreCalculator = new ScoreCalculator();
                assert(scoreCalculator.calcScore(gameBoard) === expected);
            });
        };
    });
}