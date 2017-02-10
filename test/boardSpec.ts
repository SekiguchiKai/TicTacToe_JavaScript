import * as assert from "power-assert";
import Board from '../src/ts/board';

export function boardSpec() {
    const board = new Board();
    describe("あああ", () => {
        it("generate string with default value", () => {
            const row: number = 0;
            const column: number = 0;
            board.putMove(row, column, '○');
            assert(board.getMove(row, column) === '○');
        });
    });
}