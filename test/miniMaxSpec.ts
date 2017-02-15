import * as assert from "power-assert";
import Board from '../src/ts/board';
import MiniMax from '../src/ts/miniMax';
import { MOVE } from '../src/ts/const';

export function miniMaxSpec() {
    describe('MiniMaxクラス', () => {
        describe("gameBoard配列", () => {
            describe('rowの連続する3つのセル', () => {
                let board: Board;
                let miniMax: MiniMax;
                const rowSize = 3;
                const columnSize = 3;
                const maxNum: number = 9999999999;
                const minNum: number = -9999999999;

                board = new Board(rowSize, columnSize);
                miniMax = new MiniMax();

                it('「○」が2つ揃っていると、「×」を打って、3つ揃うのを阻止する', () => {
                    for (let row = 0; row < 3; row++) {
                        for (let column = 0; column < 2; column++) {
                            board.putMove(row, column, MOVE.CIRCLE);
                        }
                        const bestCell = miniMax.calcMiniMax(4, board, MOVE.CROSS, minNum, maxNum);
                        assert(bestCell.rowValue === row);
                        assert(bestCell.columnValue === 2);
                        board = new Board(rowSize, columnSize);
                    }
                });
            });

            describe('columnの連続する3つのセル', () => {
                let board: Board;
                let miniMax: MiniMax;
                const rowSize = 3;
                const columnSize = 3;
                const maxNum: number = 9999999999;
                const minNum: number = -9999999999;

                board = new Board(rowSize, columnSize);
                miniMax = new MiniMax();

                it('「○」が2つ揃っていると、「×」を打って、3つ揃うのを阻止する', () => {
                    for (let column = 0; column < 3; column++) {
                        for (let row = 0; row < 2; row++) {
                            board.putMove(row, column, MOVE.CIRCLE);
                        }
                        const bestCell = miniMax.calcMiniMax(4, board, MOVE.CROSS, minNum, maxNum);
                        assert(bestCell.rowValue === 2);
                        assert(bestCell.columnValue === column);
                        board = new Board(rowSize, columnSize);
                    }
                });
            });

            describe('左斜めのラインの連続する3つのセル', () => {
                let board: Board;
                let miniMax: MiniMax;
                const rowSize = 3;
                const columnSize = 3;
                const maxNum: number = 9999999999;
                const minNum: number = -9999999999;

                board = new Board(rowSize, columnSize);
                miniMax = new MiniMax();


                it('「○」が2つ揃っていると、「×」を打って、3つ揃うのを阻止する', () => {
                    board.putMove(0, 0, MOVE.CIRCLE);
                    board.putMove(1, 1, MOVE.CIRCLE);

                    const bestCell = miniMax.calcMiniMax(4, board, MOVE.CROSS, minNum, maxNum);
                    assert(bestCell.rowValue === 2);
                    assert(bestCell.columnValue === 2);
                });
            });

            describe('右斜めのラインの連続する3つのセル', () => {
                let board: Board;
                let miniMax: MiniMax;
                const rowSize = 3;
                const columnSize = 3;
                const maxNum: number = 9999999999;
                const minNum: number = -9999999999;

                board = new Board(rowSize, columnSize);
                miniMax = new MiniMax();

                it('「○」が2つ揃っていると、「×」を打って、3つ揃うのを阻止する', () => {
                    board.putMove(0, 2, MOVE.CIRCLE);
                    board.putMove(1, 1, MOVE.CIRCLE);

                    const bestCell = miniMax.calcMiniMax(4, board, MOVE.CROSS, minNum, maxNum);
                    assert(bestCell.rowValue === 2);
                    assert(bestCell.columnValue === 0);
                });
            });
        });
    });
}