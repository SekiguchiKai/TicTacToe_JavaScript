import * as assert from "power-assert";
import Board from '../src/ts/board';
import Cpu from '../src/ts/cpu';
import { MOVE } from '../src/ts/const';

export function cpuSpec() {
    describe('cpuクラスのdoMoveメソッド', () => {
        let board: Board;
        const rowSize = 3;
        const columnSize = 3;
        let cpu: Cpu;

        beforeEach(() => {
            board = new Board(rowSize, columnSize);
            cpu = new Cpu();
        });

        it('rowに対して2つの相手の打ち手を与えると、3つ揃うのを阻止する', () => {
            let array = [];

            for (let row = 0; row < 3; row++) {
                for (let column = 0; column < 2; column++) {
                    board.putMove(row, column, MOVE.CIRCLE);
                    array.push(row, column);
                }
                const expectedRow = row;
                const expectedColumn = 2;

                const bestCell = cpu.doMove(4, board);
                assert(bestCell['rowVal'] === expectedRow);
                assert(bestCell['columnVal'] === expectedColumn);
                array.length = 0;
                board = new Board(rowSize, columnSize);
            }
        });

        it('columnに対して2つの相手の打ち手を与えると、3つ揃うのを阻止する', () => {
            let array = [];

            for (let column = 0; column < 3; column++) {
                for (let row = 0; row < 2; row++) {
                    board.putMove(row, column, MOVE.CIRCLE);
                    array.push(row, column);
                }
                const expectedRow = 2;
                const expectedColumn = column;

                const bestCell = cpu.doMove(4, board);
                assert(bestCell['rowVal'] === expectedRow);
                assert(bestCell['columnVal'] === expectedColumn);

                array.length = 0;
                board = board = new Board(rowSize, columnSize);
            }
        });

        it('左斜めのラインに対して2つの相手の打ち手を与えると、3つ揃うのを阻止する', () => {
            board.putMove(0, 0, MOVE.CIRCLE);
            board.putMove(1, 1, MOVE.CIRCLE);

            const expectedRow = 2;
            const expectedColumn = 2;

            const bestCell = cpu.doMove(4, board);
            assert(bestCell['rowVal'] === expectedRow);
            assert(bestCell['columnVal'] === expectedColumn);

        });

        it('右斜めのラインに対して2つの相手の打ち手を与えると、3つ揃うのを阻止する', () => {
            const rowSize = 3;
            const columnSize = 3;
            let board = new Board(rowSize, columnSize);

            board.putMove(0, 2, MOVE.CIRCLE);
            board.putMove(1, 1, MOVE.CIRCLE);

            const expectedRow = 2;
            const expectedColumn = 0;


            const bestCell = cpu.doMove(4, board);
            assert(bestCell['rowVal'] === expectedRow);
            assert(bestCell['columnVal'] === expectedColumn);
        });
    });
}