import { MOVE } from './index';

/**
 * ゲーム盤を表すためのクラス
 */
export default class Board {
    private _gameBoard: Array<string>[] = new Array(3);

    private _rowSize = 3;
    private _columnSize = 3;

    /**
     * コンストラクタ
     * @param {rowSize} rowのサイズ
     * @param {columnSize} columnのサイズ
     */
    constructor(
    ) { }

    public init(): void {

        // 二次元配列化
        for (let row = 0; row < this._gameBoard.length; row++) {
            this._gameBoard[row] = new Array(this._columnSize);
        }


        // 二次元配列初期化
        for (let row = 0; row < this._rowSize; row++) {
            for (let column = 0; column < this._columnSize; column++) {
                this._gameBoard[row][column] = MOVE.EMPTY;
            }
        }
    }

    /**
     * rowSizeを取得するためのメソッド
     * @return {number} rowのサイズ
     */
    public get rowSize(): number {
        return this._rowSize;
    }

    /** 
     * columnSizeを取得するためのメソッド
     * @return {number} columnのサイズ
     */
    public get columnSize(): number {
        return this._columnSize;
    }

    /**
     * ゲーム盤の指定箇所に打ち手を加えるためのメソッド
     * @param {row} rowの値
     * @param {column} columnの値
     * @param {move} 打ち手
     */
    public putMove(row: number, column: number, move: string): void {
        this._gameBoard[row][column] = move;
    }

    /**
      * ゲーム盤の指定箇所の打ち手を取得するためのメソッド
      * @param {row} rowの値
      * @param {column} columnの値
      * @return {string} 打ち手
      */
    public getMove(row: number, column: number): string {
        return this._gameBoard[row][column];
    }

    /**
      * ゲーム盤を取得するためのメソッド
      * @return {string[][]} 打ち手
      */
    public getGameBoardState(): string[][] {
        return this._gameBoard.concat();
    }

}
