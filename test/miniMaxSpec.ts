import * as assert from "power-assert";
import MiniMax from '../src/ts/miniMax';
import Board from '../src/ts/board';
import { MOVE } from '../src/ts/const';

export function miniMaxSpec() {
    describe('miniMaxクラスのcalcMiniMaxメソッドが、適切なAIが打ち手を打つべき場所を返してくれる', () => {
        let board = new Board();

        // rowで勝ちに行く
        board.putMove(0, 0, MOVE.CIRCLE);
        board.putMove(0, 1, MOVE.CIRCLE);
        testCalcMiniMax(board, 0, 2, -2, `[row: 0, column: 0, [row: 0, column: 1 [row: 0, column: 2] の時`);


        board = new Board();
        board.putMove(0, 0, MOVE.CIRCLE);
        board.putMove(1, 0, MOVE.CIRCLE);
        testCalcMiniMax(board, 2, 0, 10, `[row: 1, column: 0, [row: 1, column: 1 [row: 1, column: 2] の時`);
        console.log(board.getGameBoardState());
        board.clearGameBoard();

        board = new Board();
        board.putMove(2, 0, MOVE.CIRCLE);
        board.putMove(2, 1, MOVE.CIRCLE);
        testCalcMiniMax(board, 0, 2, 10, `[row: 2, column: 0, [row: 2, column: 1 [row: 2, column: 2] の時`);
        console.log('あ' + board.getGameBoardState());
        board.clearGameBoard();


        function testCalcMiniMax(board: Board, expectedRowVal: number, expectedColumnVal: number, expectedBestScore: number, comment: string) {
            const miniMax = new MiniMax();

            it(comment, () => {
                const maxNum = 9999999999;
                const minNum = -9999999999;
                const bestCell = miniMax.calcMiniMax(3, board, MOVE.CIRCLE, minNum, maxNum);

                assert(bestCell['rowVal'] === expectedRowVal);
                assert(bestCell['columnVal'] === expectedColumnVal);
                assert(bestCell['bestScore'] === expectedBestScore);
            })
        }

    });
};