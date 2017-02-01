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
        return this.judgeRow(gameBoard, Moves.CIRCLE)
            || this.judgeColumn(gameBoard, Moves.CIRCLE)
            || this.judgeLeftSlanting(gameBoard, Moves.CIRCLE)
            || this.judgeRightSlanting(gameBoard, Moves.CIRCLE);
    }

    judgeLose(gameBoard) {
        return this.judgeRow(gameBoard, Moves.CROSS)
            || this.judgeColumn(gameBoard, Moves.CROSS)
            || this.judgeLeftSlanting(gameBoard, Moves.CROSS)
            || this.judgeRightSlanting(gameBoard, Moves.CROSS);
    }

    judgeDraw(gameBoard) {
        for (let row = 0; row < this.rowSize; row++) {
            for (let column = 0; column < this.columnSize; column++) {
                if (this.judgeWin(gameBoard)) {
                    return false;
                } else if (this.judgeLose(gameBoard)) {
                    return false;
                } else if (gameBoard[row][column] == Moves.EMPTY) {
                    return false;
                }
            }
        }
        return true;
    }

    judgeRow(gameBoard, moves) {
        for (let row = 0; row < rowSize; row++) {
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
        for (let column = 0; column < columnSize; column++) {
            for (let row = 0; row < this.rowMax; row++) {
                if (this.checkAColumn(gameBoard, moves, row, column)) {
                    return true;
                }
            }
        }
        return false;
    }

    pcheckAColumn(gameBoard, moves, row, column) {
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

        for (let row = 0; row < rowMax; row++) {
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
        for (let row = rowStart; row < rowMax; row++) {
            let oneTermCheck = checkOneTermLeftSlanting(gameBoard, moves, row, column);
            if (oneTermCheck) {
                return true;
            }

            column++;
        }
        return false;
    }


    leftSlantingColumnShift(gameBoard, moves, columnStart) {
        letrow = 0;

        // for文1回で、1つの連を表す
        for (letcolumn = columnStart; column < columnMax; column++) {
            let oneTermCheck = checkOneTermLeftSlanting(gameBoard, moves, row, column);
            if (oneTermCheck) {
                return true;
            }

            row++;
        }
        return false;
    }

    checkOneTermLeftSlanting(gameBoard, moves, row, column) {

        for (letdifference = 0; difference < this.judgeCriteriaSequence; difference++) {
            if (gameBoard[row + difference][column + difference] != moves) {
                return false;
            }
        }
        return true;

    }

    judgeRightSlanting(gameBoard, moves) {

        // centerAxis
        letcolumn = columnSize - 1;

        for (letrow = 0; row < rowMax; row++) {
            // 1回あたりの5連
            let oneTermCheck = this.checkOneTermRightSlanting(gameBoard, moves, row, column);
            if (oneTermCheck) {
                return true;
            }
            column--;
        }

        // rowシフト
        for (letrowStart = 1; rowStart < this.judgeCriteriaSequence; rowStart++) {
            let rowShiftCheck = this.rightSlantingRowShift(gameBoard, moves, rowStart);
            if (rowShiftCheck) {
                return true;
            }
        }
        // columnシフト
        const letstart = gameBoard.length - 1;
        for (letcolumnStart = start; columnStart > this.rowSize - this.judgeCriteriaSequence - 1; columnStart--) {
            let columnShiftCheck = this.rightSlantingColumnShift(gameBoard, moves, columnStart);
            if (columnShiftCheck) {
                return true;
            }
        }

        return false;
    }


    rightSlantingRowShift(gameBoard, moves, rowStart) {
        const letcolumn = columnSize - 1;

        for (letrow = rowStart; row < rowMax; row++) {
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
        letrow = 0;

        const letcolumnEnd = this.judgeCriteriaSequence - 2;
        for (letcolumn = columnStart; column > columnEnd; column--) {
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

        for (letdifference = 0; difference < this.judgeCriteriaSequence; difference++) {
            if (gameBoard[row + difference][column - difference] != moves) {
                return false;
            }
        }
        return true;

    }

}