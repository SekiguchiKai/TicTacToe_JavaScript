export default class Board {

    constructor(rowSize, columnSize) {
        this.rowSize = rowSize;
        this.columnSize = columnSize;
        this.gameBoard = new Array(3);
        for (let row = 0; row < this.gameBoard.length; row++) {
            this.gameBoard[row] = new Array(3);
        }

        // 二次元配列初期化
        for (let row = 0; row < this.rowSize; row++) {
            for (let column = 0; column < this.columnSize; column++) {
                this.gameBoard[row][column] = ' ';
            }
        }
    }

    getRowSize() {
        return this.rowSize;
    }

    getColumnSize() {
        return this.columnSize;
    }

    addMove(row, column, hand) {
        this.gameBoard[row][column] = hand;
    }
    getMove(row, column) {
        return this.gameBoard[row][column];
    }

    getGameBoardState() {
        return this.gameBoard;
    }









}



