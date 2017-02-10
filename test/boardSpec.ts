import * as assert from "power-assert";
import Board from '../src/ts/board';

export function boardSpec() {
    const board = new Board();
    describe("lib", () => {
        describe("hello function", () => {
            it("generate string with default value", () => {
                board.putMove(1, 1, '○');
                assert(board.getMove(1, 1) === '○');
            });
        });
    });
}