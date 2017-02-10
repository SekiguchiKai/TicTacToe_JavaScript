import * as assert from "power-assert";
import Board from '../src/ts/board';
import Judge from '../src/ts/judge';
import { MOVE, RESULT } from '../src/ts/const';

export function judgeSpec() {

    describe('ゲーム盤に打ち手を打ち、状況に応じて適切に勝敗の判断を行うことができる', () => {

        checkRow(MOVE.CIRCLE, RESULT.WIN);
        checkRow(MOVE.CROSS, RESULT.LOSE);
        checkRow(MOVE.EMPTY, RESULT.PENNDING);

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
                testJudgeResult(board, expected, `[row: ${cell[0]}, column: ${cell[1]}] = ${move}, [row: ${cell[2]}, column: ${cell[3]}] = ${move}, [row: ${cell[4]}, column: ${cell[5]}] = ${move} の時に、${expected}`);
                // 配列の長さを0にして初期化
                cell.length = 0;
            }
        }

        function testJudgeResult(board: Board, expected: string, comment: string) {
            it(comment, () => {
                const judge = new Judge();

                assert(judge.judgeResult(board) === expected);
            });
        };

    });
}
