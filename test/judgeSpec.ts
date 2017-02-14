import * as assert from "power-assert";
import Board from '../src/ts/board';
import Judge from '../src/ts/judge';
import { MOVE, RESULT } from '../src/ts/const';

export function judgeSpec() {
    describe('Judgeクラス', () => {
        describe("gameBoard配列", () => {
            describe('rowの連続する3つのセル', () => {
                let board: Board;
                let judge: Judge;
                beforeEach(() => {
                    const rowSize = 3;
                    const columnSize = 3;
                    board = new Board(rowSize, columnSize);

                    const judgeCriteriaSequence = 3;
                    judge = new Judge(rowSize, columnSize, judgeCriteriaSequence);
                });

                it('「○」が3つ揃うと、勝利が決定する', () => {

                    for (let row = 0; row < 3; row++) {
                        for (let column = 0; column < 3; column++) {
                            board.putMove(row, column, MOVE.CIRCLE);
                        }
                        assert(judge.judgeResult(board) === RESULT.WIN);

                    }
                });

                it('「×」が3つ揃うと、敗北が決定する', () => {

                    for (let row = 0; row < 3; row++) {
                        for (let column = 0; column < 3; column++) {
                            board.putMove(row, column, MOVE.CROSS);
                        }
                        assert(judge.judgeResult(board) === RESULT.LOSE);
                    }
                });

            });

            describe('columnの連続する3つのセル', () => {
                let board: Board;
                let judge: Judge;
                beforeEach(() => {
                    const rowSize = 3;
                    const columnSize = 3;
                    board = new Board(rowSize, columnSize);

                    const judgeCriteriaSequence = 3;
                    judge = new Judge(rowSize, columnSize, judgeCriteriaSequence);
                });

                it('「○」が3つ揃うと、勝利が決定する', () => {

                    for (let column = 0; column < 3; column++) {
                        for (let row = 0; row < 3; row++) {
                            board.putMove(row, column, MOVE.CIRCLE);
                        }
                        assert(judge.judgeResult(board) === RESULT.WIN);

                    }
                });

                it('「×」が3つ揃うと、敗北が決定する', () => {

                    for (let column = 0; column < 3; column++) {
                        for (let row = 0; row < 3; row++) {
                            board.putMove(row, column, MOVE.CROSS);
                        }
                        assert(judge.judgeResult(board) === RESULT.LOSE);

                    }
                });

            })

            describe('左斜めのラインの連続する3つのセル', () => {
                let board: Board;
                let judge: Judge;
                beforeEach(() => {
                    const rowSize = 3;
                    const columnSize = 3;
                    board = new Board(rowSize, columnSize);

                    const judgeCriteriaSequence = 3;
                    judge = new Judge(rowSize, columnSize, judgeCriteriaSequence);
                });

                it('「○」が3つ揃うと、勝利が決定する', () => {

                    board.putMove(0, 0, MOVE.CIRCLE);
                    board.putMove(1, 1, MOVE.CIRCLE);
                    board.putMove(2, 2, MOVE.CIRCLE);
                    assert(judge.judgeResult(board) === RESULT.WIN);

                });

                it('「×」が3つ揃うと、敗北が決定する', () => {

                    board.putMove(0, 0, MOVE.CROSS);
                    board.putMove(1, 1, MOVE.CROSS);
                    board.putMove(2, 2, MOVE.CROSS);
                    assert(judge.judgeResult(board) === RESULT.LOSE);

                });

            })

            describe('右斜めのラインの連続する3つのセル', () => {
                let board: Board;
                let judge: Judge;
                beforeEach(() => {
                    const rowSize = 3;
                    const columnSize = 3;
                    board = new Board(rowSize, columnSize);

                    const judgeCriteriaSequence = 3;
                    judge = new Judge(rowSize, columnSize, judgeCriteriaSequence);
                });


                it('「○」が3つ揃うと、勝利が決定する', () => {

                    board.putMove(0, 2, MOVE.CIRCLE);
                    board.putMove(1, 1, MOVE.CIRCLE);
                    board.putMove(2, 0, MOVE.CIRCLE);
                    assert(judge.judgeResult(board) === RESULT.WIN);

                });


                it('「×」が3つ揃うと、敗北が決定する', () => {

                    board.putMove(0, 2, MOVE.CROSS);
                    board.putMove(1, 1, MOVE.CROSS);
                    board.putMove(2, 0, MOVE.CROSS);
                    assert(judge.judgeResult(board) === RESULT.LOSE);
                });
            });
        });
    });
}

