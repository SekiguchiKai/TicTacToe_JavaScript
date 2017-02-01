export default class ScoreCalculator {

    constructor(rowSize, columnSize, judgeCriteriaSequence, maxPoint, minPoint) {
        this.rowSize = rowSize;
        this.columnSize = columnSize;
        this.judgeCriteriaSequence = judgeCriteriaSequence;
        this.rowMax = this.rowSize - this.judgeCriteriaSequence + 1;
        this.columnMax = this.columnSize - this.judgeCriteriaSequence + 1;
        this.maxPoint = maxPoint;
        this.minPoint = minPoint;
    }

    calcScore(gameBoard) {
        console.log('calcScoreメソッドが呼ばれました');
        let totalScore = 0;

        let arraySize = this.judgeCriteriaSequence;
        let movesArray = new Array(arraySize);

        totalScore += this.calcRow(movesArray, gameBoard);

        totalScore += this.calcColumn(movesArray, gameBoard);
        totalScore += this.calcLeftSlanting(movesArray, gameBoard);
        totalScore += this.calcRightSlanting(movesArray, gameBoard);

        // ここを変更予定
        //  Counter.resetCount();
        return totalScore;
    }

    calcRow(movesArray, gameBoard) {
        console.log('calcRowが呼ばれました');
        let score = 0;

        for (let row = 0; row < this.rowSize; row++) {
            for (let column = 0; column < this.columnMax; column++) {
                for (let i = 0; i < movesArray.length; i++) {
                    movesArray[i] = gameBoard[row][column + i];
                }
                score += this.calcLineScore(movesArray, this.maxPoint, this.minPoint);
            }
        }
        return score;
    }


    calcColumn(movesArray, gameBoard) {
        let score = 0;

        for (let column = 0; column < this.columnSize; column++) {
            for (let row = 0; row < this.rowMax; row++) {
                for (let i = 0; i < movesArray.length; i++) {
                    movesArray[i] = gameBoard[row + i][column];
                }
                score += this.calcLineScore(movesArray, this.maxPoint, this.minPoint);
            }
        }
        return score;
    }


    calcLeftSlanting(movesArray, gameBoard) {
        let score = 0;

        for (let index = 0; index < this.rowMax; index++) {

            for (let i = 0; i < movesArray.length; i++) {
                movesArray[i] = gameBoard[index + i][index + i];
            }
            score += this.calcLineScore(movesArray, this.maxPoint, this.minPoint);
        }
        score += this.calcLeftSlantingRowSlide(movesArray, gameBoard);

        score += this.calcLeftSlantingColumnSlide(movesArray, gameBoard);


        return score;
    }

    calcLeftSlantingRowSlide(movesArray, gameBoard) {
        let column = 0;
        let score = 0;


        // for文1回で、1つの連を表す
        for (let row = 1; row < this.rowMax; row++) {
            score = this.calcLeftSlantingSlideHelper(gameBoard, movesArray, row, column);
        }
        return score;
    }


    calcLeftSlantingColumnSlide(movesArray, gameBoard) {

        let row = 0;
        let score = 0;

        // for文1回で、1つの連を表す
        for (let column = 1; column < this.columnMax; column++) {
            score = this.calcLeftSlantingSlideHelper(gameBoard, movesArray, row, column);
        }
        return score;
    }


    calcLeftSlantingSlideHelper(gameBoard, movesArray, row, column) {


        let score = 0;

        for (let difference = 0; difference < this.judgeCriteriaSequence; difference++) {
            movesArray[difference] = gameBoard[row + difference][column + difference];
        }

        score += this.calcLineScore(movesArray, maxPoint, minPoint);

        return score;
    }


    calcRightSlanting(movesArray, gameBoard) {
        let score = 0;

        let columnLastIndex = this.columnSize - 1;
        let column = columnLastIndex;

        // for文1回で、1つの連を表す
        for (let row = 0; row < this.rowMax; row++) {
            for (let i = 0; i < movesArray.length; i++) {
                movesArray[i] = gameBoard[row + i][column - i];
            }
            score += this.calcLineScore(movesArray, this.maxPoint, this.minPoint);

            column--;
        }

        score += this.calcRightSlantingRowSlide(gameBoard, movesArray);

        score += this.calcRightSlantingColumnSlide(gameBoard, movesArray);

        return score;
    }


    calcRightSlantingRowSlide(gameBoard, movesArray) {
        let column = this.columnSize - 1;

        let score = 0;

        // for文1回で、1つの連を表す
        for (let row = 1; row < this.rowMax; row++) {
            score = this.calcRightSlantingSlideHelper(gameBoard, movesArray, row, column);
        }
        return score;
    }


    calcRightSlantingColumnSlide(fgameBoard, movesArray) {
        let localColumnMax = this.columnSize - 1;
        let row = 0;

        let score = 0;

        // for文1回で、1つの連を表す
        for (let column = this.judgeCriteriaSequence - 1; column < localColumnMax; column++) {
            score = this.calcRightSlantingSlideHelper(gameBoard, movesArray, row, column);
        }
        return score;
    }


    calcRightSlantingSlideHelper(gameBoard, movesArray, row, column) {
        let score = 0;

        for (let difference = 0; difference < this.judgeCriteriaSequence; difference++) {
            movesArray[difference] = gameBoard[row + difference][column - difference];
        }
        score += this.calcLineScore(movesArray, this.maxPoint, this.minPoint);

        return score;
    }


    calcLineScore(movesArray, maxPoint, minPoint) {
        console.log('calcLineScoreが呼ばれました');

        let score = 0;
        let perTernPoint = 10;

        for (let moves of movesArray) {

            if (moves === '×') {
                score += perTernPoint;
            } else if (moves === '○') {
                score -= perTernPoint;
            }
        }

        const finalMaxPoint = 100000;
        const finalMinPoint = -100000;

        // 勝敗がつくときには、点数の差を大きくする
        if (score === maxPoint) {
            score = finalMaxPoint;
        } else if (score === minPoint) {
            score = finalMinPoint;
        }

        return score;
    }





}

