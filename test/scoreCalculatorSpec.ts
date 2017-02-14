import * as assert from "power-assert";
import Board from '../src/ts/board';
import ScoreCalculator from '../src/ts/scoreCalculator';
import { MOVE } from '../src/ts/const';

export function scoreCalculatorSpec() {
    describe('ScoreCalculatorクラス', () => {
        describe("gameBoard配列", () => {
            describe('rowの連続する3つのセル', () => {
                let board: Board;
                let scoreCalculator: ScoreCalculator;

                const rowSize = 3;
                const columnSize = 3;
                beforeEach(() => {
                    board = new Board(rowSize, columnSize);
                    scoreCalculator = new ScoreCalculator();
                });

                it('「○」が3つ揃うと、得点が-105になる', () => {
                    for (let row = 0; row < 3; row++) {
                        for (let column = 0; column < 3; column++) {
                            board.putMove(row, column, MOVE.CIRCLE);
                        }
                        assert(scoreCalculator.calcScore(board.getGameBoardState()) === -105);
                        board = new Board(rowSize, columnSize);
                    }
                });

                it('「×」が3つ揃うと、得点が105になる', () => {
                    for (let row = 0; row < 3; row++) {
                        for (let column = 0; column < 3; column++) {
                            board.putMove(row, column, MOVE.CROSS);
                        }
                        assert(scoreCalculator.calcScore(board.getGameBoardState()) === 105);
                        board = new Board(rowSize, columnSize);
                    }
                });
            });


            describe('columnの連続する3つのセル', () => {
                let board: Board;
                let scoreCalculator: ScoreCalculator;
                const rowSize = 3;
                const columnSize = 3;
                beforeEach(() => {
                    board = new Board(rowSize, columnSize);

                    scoreCalculator = new ScoreCalculator();
                });

                it('「○」が3つ揃うと、得点が-105になる', () => {
                    for (let column = 0; column < 3; column++) {
                        for (let row = 0; row < 3; row++) {
                            board.putMove(row, column, MOVE.CIRCLE);
                        }
                        assert(scoreCalculator.calcScore(board.getGameBoardState()) === -105);
                        board = new Board(rowSize, columnSize);
                    }
                });
                it('「×」が3つ揃うと、得点が105になる', () => {
                    for (let column = 0; column < 3; column++) {
                        for (let row = 0; row < 3; row++) {
                            board.putMove(row, column, MOVE.CROSS);
                        }
                        assert(scoreCalculator.calcScore(board.getGameBoardState()) === 105);
                        board = new Board(rowSize, columnSize);
                    }
                });

            });

            describe('左斜めのラインの連続する3つのセル', () => {
                let board: Board;
                let scoreCalculator: ScoreCalculator;
                beforeEach(() => {
                    const rowSize = 3;
                    const columnSize = 3;
                    board = new Board(rowSize, columnSize);

                    scoreCalculator = new ScoreCalculator();
                });

                it('○」が3つ揃うと、得点が-107になる', () => {
                    board.putMove(0, 0, MOVE.CIRCLE);
                    board.putMove(1, 1, MOVE.CIRCLE);
                    board.putMove(2, 2, MOVE.CIRCLE);
                    assert(scoreCalculator.calcScore(board.getGameBoardState()) === -107);

                });

                it('×」が3つ揃うと、得点が107になる', () => {
                    board.putMove(0, 0, MOVE.CROSS);
                    board.putMove(1, 1, MOVE.CROSS);
                    board.putMove(2, 2, MOVE.CROSS);
                    assert(scoreCalculator.calcScore(board.getGameBoardState()) === 107);

                });

            })

            describe('右斜めのラインの連続する3つのセル', () => {
                let board: Board;
                let scoreCalculator: ScoreCalculator;
                beforeEach(() => {
                    const rowSize = 3;
                    const columnSize = 3;
                    board = new Board(rowSize, columnSize);

                    scoreCalculator = new ScoreCalculator();
                });

                it('○」が3つ揃うと、得点が-107になる', () => {
                    board.putMove(0, 2, MOVE.CIRCLE);
                    board.putMove(1, 1, MOVE.CIRCLE);
                    board.putMove(2, 0, MOVE.CIRCLE);
                    assert(scoreCalculator.calcScore(board.getGameBoardState()) === -107);

                });

                it('×」が3つ揃うと、得点が107になる', () => {
                    board.putMove(0, 2, MOVE.CROSS);
                    board.putMove(1, 1, MOVE.CROSS);
                    board.putMove(2, 0, MOVE.CROSS);
                    assert(scoreCalculator.calcScore(board.getGameBoardState()) === 107);
                });
            });
        });
    });
}