// import * as assert from "power-assert";
// import MiniMax from '../src/ts/miniMax';
// import Board from '../src/ts/board';
// import { MOVE } from '../src/ts/const';

// export function miniMaxSpec() {
//     describe('miniMaxクラスのcalcMiniMaxメソッドが、適切なAIが打ち手を打つべき場所を返してくれる', () => {
//         const board = new Board();

//         // rowで勝ちに行く
//         // board.putMove(0, 0, MOVE.CIRCLE);
//         // board.putMove(0, 1, MOVE.CIRCLE);
//         // testCalcMiniMax(board, 0, 2, 10);
//         // board.clearGameBoard();

//         // board.putMove(1, 0, MOVE.CIRCLE);
//         // board.putMove(1, 1, MOVE.CIRCLE);
//         // testCalcMiniMax(board, 1, 2, 10);
//         // console.log(board.getGameBoardState());
//         // board.clearGameBoard();

//         board.putMove(2, 0, MOVE.CIRCLE);
//         board.putMove(2, 1, MOVE.CIRCLE);
//         testCalcMiniMax(board, 2, 2, 10);
//         console.log('あ' + board.getGameBoardState());
//         board.clearGameBoard();


//         function testCalcMiniMax(board: Board, expectedRowVal: number, expectedColumnVal: number, expectedBestScore: number) {
//             const miniMax = new MiniMax();

//             it('負けない', () => {
//                 const maxNum = 9999999999;
//                 const minNum = -9999999999;
//                 const bestCell = miniMax.calcMiniMax(3, board, MOVE.CROSS, minNum, maxNum);

//                 assert(bestCell['rowVal'] === expectedRowVal);
//                 assert(bestCell['columnVal'] === expectedColumnVal);
//                 assert(bestCell['bestScore'] === expectedBestScore);
//             })
//         }

//     });
// };