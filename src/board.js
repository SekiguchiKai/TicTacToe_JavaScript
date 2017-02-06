import { MOVE } from './index.js'

/**
 * ゲーム盤を表すためのクラス
 */
export default class Board {

    /**
     * コンストラクタ
     * @param {rowSize} rowのサイズ
     * @param {columnSize} columnのサイズ
     */
    constructor(rowSize, columnSize) {
        // WeakMapに対応づけ
        this._rowSize = rowSize;
        this._columnSize = columnSize;
        this._gameBoard = new Array(rowSize);

        // 二次元配列化
        for (let row = 0; row < this._gameBoard.length; row++) {
            this._gameBoard[row] = new Array(columnSize);
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
    getRowSize() {
        return this._rowSize;
    }

    /** 
     * columnSizeを取得するためのメソッド
     * @return {number} columnのサイズ
     */
    getColumnSize() {
        return this._columnSize;
    }

    /**
     * ゲーム盤の指定箇所に打ち手を加えるためのメソッド
     * @param {row} rowの値
     * @param {column} columnの値
     * @param {move} 打ち手
     */
    putMove(row, column, move) {
        this._gameBoard[row][column] = move;
    }

    /**
      * ゲーム盤の指定箇所の打ち手を取得するためのメソッド
      * @param {row} rowの値
      * @param {column} columnの値
      * @return {string} 打ち手
      */
    getMove(row, column) {
        return this._gameBoard[row][column];
    }

    /**
      * ゲーム盤を取得するためのメソッド
      * @return {string} 打ち手
      */
    getGameBoardState() {
        return this._gameBoard.concat();
    }

}
