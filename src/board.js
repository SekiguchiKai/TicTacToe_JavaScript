
// フィールドをprivate化するための処理
let _rowSize = new WeakMap();
let _columnSize = new WeakMap();
let _gameBoard = new WeakMap();

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
        _rowSize.set(this, rowSize);
        _columnSize.set(this, columnSize);
        _gameBoard.set(this, new Array(3));

        for (let row = 0; row < _gameBoard.get(this).length; row++) {
            _gameBoard.get(this)[row] = new Array(3);
        }

        // 二次元配列初期化
        for (let row = 0; row < _rowSize.get(this); row++) {
            for (let column = 0; column < _columnSize.get(this); column++) {
                _gameBoard.get(this)[row][column] = ' ';
            }
        }
    }

    /**
     * rowSizeを取得するためのメソッド
     * @return {number} rowのサイズ
     */
    getRowSize() {
        return _rowSize.get(this);
    }

    /** 
     * columnSizeを取得するためのメソッド
     * @return {number} columnのサイズ
     */
    getColumnSize() {
        return _columnSize.get(this);
    }

    /**
     * ゲーム盤の指定箇所に打ち手を加えるためのメソッド
     * @param {row} rowの値
     * @param {column} columnの値
     * @param {move} 打ち手
     */
    putMove(row, column, move) {
        _gameBoard.get(this)[row][column] = move;
    }

    /**
      * ゲーム盤の指定箇所の打ち手を取得するためのメソッド
      * @param {row} rowの値
      * @param {column} columnの値
      * @return {string} 打ち手
      */
    getMove(row, column) {
        return _gameBoard.get(this)[row][column];
    }

    /**
      * ゲーム盤を取得するためのメソッド
      * @return {string} 打ち手
      */
    getGameBoardState() {
        return _gameBoard.get(this);
    }

}



