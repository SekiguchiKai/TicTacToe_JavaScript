
// フィールドをprivate化するための処理
let _rowSize = new WeakMap();
let _columnSize = new WeakMap();
let _gameBoard = new WeakMap();


export default class Board {

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

    getRowSize() {
        return _rowSize.get(this);
    }

    getColumnSize() {
        return _columnSize.get(this);
    }

    addMove(row, column, move) {
        _gameBoard.get(this)[row][column] = move;
    }
    getMove(row, column) {
        return _gameBoard.get(this)[row][column];
    }

    getGameBoardState() {
        return _gameBoard.get(this);
    }

}



