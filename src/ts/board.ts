import { MOVE } from './const';

/**
 * ゲーム盤を表すためのクラス
 */
export default class Board {
    /**
     * ゲーム盤のrowのサイズを表す
     */
    private _rowSize: number;
    /**
    * ゲーム盤のcolumnのサイズを表す
    */
    private _columnSize: number;

    /**
     * ゲーム盤を表す
     */
    private _gameBoard: string[][];

    /**
     * コンストラクタ
     * @param {rowSize} rowのサイズ
     * @param {columnSize} columnのサイズ
     */
    constructor(rowSize: number, columnSize: number) {
        this._rowSize = rowSize;
        this._columnSize = columnSize;

        // 二次元配列化
        this._gameBoard = new Array(this._rowSize);
        for (let row = 0; row < this._rowSize; row++) {
            this._gameBoard[row] = new Array(this._columnSize);
        }

        // 二次元配列初期化
        this.clearGameBoard();
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

    /**
    * ゲーム盤を初期化するためのメソッド
    * @return {string[][]} 打ち手
    */
    public clearGameBoard(): void {
        for (let row = 0; row < this._rowSize; row++) {
            for (let column = 0; column < this._columnSize; column++) {
                this._gameBoard[row][column] = MOVE.EMPTY;
            }
        }
    }

}
