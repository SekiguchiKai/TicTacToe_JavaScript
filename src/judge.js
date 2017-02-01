export default class Judge {

    constructor(rowSize, columnSize, judgeCriteriaSequence) {
        this.rowSize = rowSize;
        this.columnSize = columnSize;
        this.judgeCriteriaSequence = judgeCriteriaSequence;
        this.rowMax = this.rowSize - this.judgeCriteriaSequence + 1;
        this.columnMax = this.columnSize - this.judgeCriteriaSequence + 1;
    }

    judgeResult(board) {
        let gameBoard = board.getGameBoardState();

        if (this.judgeWin(gameBoard)) {
            return '勝ち';
        } else if (this.judgeLose(gameBoard)) {
            return '負け';
        } else if (this.judgeDraw(gameBoard)) {
            return '引き分け';
        }
        return '未決';
    }


    judgeWin(gameBoard) {
        return this.judgeRow(gameBoard, '○')
            || this.judgeColumn(gameBoard, '○')
            || this.judgeLeftSlanting(gameBoard, '○')
            || this.judgeRightSlanting(gameBoard, '○');
    }

    judgeLose(gameBoard) {
        return this.judgeRow(gameBoard, '×')
            || this.judgeColumn(gameBoard, '×')
            || this.judgeLeftSlanting(gameBoard, '×')
            || this.judgeRightSlanting(gameBoard, '×');
    }

    judgeDraw(gameBoard) {
        for (let row = 0; row < this.rowSize; row++) {
            for (let column = 0; column < this.columnSize; column++) {
                if (this.judgeWin(gameBoard)) {
                    return false;
                } else if (this.judgeLose(gameBoard)) {
                    return false;
                } else if (gameBoard[row][column] === ' ') {
                    return false;
                }
            }
        }
        return true;
    }

    judgeRow(gameBoard, moves) {
        for (let row = 0; row < this.rowSize; row++) {
            for (let column = 0; column < this.columnMax; column++) {
                if (this.checkARow(gameBoard, moves, row, column)) {
                    return true;
                }
            }
        }
        return false;
    }

    checkARow(gameBoard, moves, row, column) {
        for (let difference = 0; difference < this.judgeCriteriaSequence; difference++) {
            if (gameBoard[row][column + difference] != moves) {
                return false;
            }
        }
        return true;
    }

    judgeColumn(gameBoard, moves) {
        for (let column = 0; column < this.columnSize; column++) {
            for (let row = 0; row < this.rowMax; row++) {
                if (this.checkAColumn(gameBoard, moves, row, column)) {
                    return true;
                }
            }
        }
        return false;
    }

    checkAColumn(gameBoard, moves, row, column) {
        for (let difference = 0; difference < this.judgeCriteriaSequence; difference++) {
            if (gameBoard[row + difference][column] != moves) {
                return false;
            }
        }
        return true;
    }


    judgeLeftSlanting(gameBoard, moves) {

        // centerAxis
        let column = 0;

        for (let row = 0; row < this.rowMax; row++) {
            // 1回あたりの5連
            let oneTermCheck = this.checkOneTermLeftSlanting(gameBoard, moves, row, column);
            if (oneTermCheck) {
                return true;
            }
            column++;
        }


        // rowシフト
        for (let rowStart = 1; rowStart < this.judgeCriteriaSequence; rowStart++) {
            let rowShiftCheck = this.leftSlantingRowShift(gameBoard, moves, rowStart);
            if (rowShiftCheck) {
                return true;
            }
        }

        // columnシフト
        for (let columnStart = 0; columnStart < this.columnMax; columnStart++) {
            let columnShiftCheck = this.leftSlantingColumnShift(gameBoard, moves, columnStart);
            if (columnShiftCheck) {
                return true;
            }
        }


        return false;
    }


    leftSlantingRowShift(gameBoard, moves, rowStart) {
        let column = 0;

        // for文1回で、1つの連を表す
        for (let row = rowStart; row < this.rowMax; row++) {
            let oneTermCheck = checkOneTermLeftSlanting(gameBoard, moves, row, column);
            if (oneTermCheck) {
                return true;
            }

            column++;
        }
        return false;
    }


    leftSlantingColumnShift(gameBoard, moves, columnStart) {
        let row = 0;

        // for文1回で、1つの連を表す
        for (let column = columnStart; column < this.columnMax; column++) {
            let oneTermCheck = this.checkOneTermLeftSlanting(gameBoard, moves, row, column);
            if (oneTermCheck) {
                return true;
            }

            row++;
        }
        return false;
    }

    checkOneTermLeftSlanting(gameBoard, moves, row, column) {

        for (let difference = 0; difference < this.judgeCriteriaSequence; difference++) {
            if (gameBoard[row + difference][column + difference] != moves) {
                return false;
            }
        }
        return true;

    }

    judgeRightSlanting(gameBoard, moves) {

        // centerAxis
        let column = this.columnSize - 1;

        for (let row = 0; row < this.rowMax; row++) {
            // 1回あたりの5連
            let oneTermCheck = this.checkOneTermRightSlanting(gameBoard, moves, row, column);
            if (oneTermCheck) {
                return true;
            }
            column--;
        }

        // rowシフト
        for (let rowStart = 1; rowStart < this.judgeCriteriaSequence; rowStart++) {
            let rowShiftCheck = this.rightSlantingRowShift(gameBoard, moves, rowStart);
            if (rowShiftCheck) {
                return true;
            }
        }
        // columnシフト
        const start = gameBoard.length - 1;
        for (let columnStart = start; columnStart > this.rowSize - this.judgeCriteriaSequence - 1; columnStart--) {
            let columnShiftCheck = this.rightSlantingColumnShift(gameBoard, moves, columnStart);
            if (columnShiftCheck) {
                return true;
            }
        }

        return false;
    }


    rightSlantingRowShift(gameBoard, moves, rowStart) {
        const column = this.columnSize - 1;

        for (let row = rowStart; row < this.rowMax; row++) {
            // 1回あたりの5連
            let oneTermCheck = this.checkOneTermRightSlanting(gameBoard, moves, row, column);
            if (oneTermCheck) {
                return true;
            }
            column--;
        }
        return false;
    }

    rightSlantingColumnShift(gameBoard, moves, columnStart) {
        let row = 0;

        const columnEnd = this.judgeCriteriaSequence - 2;
        for (let column = columnStart; column > columnEnd; column--) {
            // 1回あたりの5連
            let oneTermCheck = this.checkOneTermRightSlanting(gameBoard, moves, row, column);
            if (oneTermCheck) {
                return true;
            }
            row++;
        }
        return false;
    }

    checkOneTermRightSlanting(gameBoard, moves, row, column) {

        for (let difference = 0; difference < this.judgeCriteriaSequence; difference++) {
            if (gameBoard[row + difference][column - difference] != moves) {
                return false;
            }
        }
        return true;

    }

}