import Counter from './counter.js';

export default class ScoreCalculator {

    calcScore(gameBoard) {

        let totalScore = 0;

        const arraySize = 3;

        let movesArray = new Array(arraySize);

        const maxPoint = 30;
        const minPoint = -30;


        const maxLength = 3;


        // row
        for (let row = 0; row < maxLength; row++) {
            for (let column = 0; column < maxLength; column++) {
                movesArray[column] = gameBoard[row][column];
            }
            totalScore += this.calcLineScore(movesArray, maxPoint, minPoint);
        }

        // column
        for (let column = 0; column < maxLength; column++) {
            for (let row = 0; row < maxLength; row++) {
                movesArray[row] = gameBoard[row][column];
            }
            totalScore += this.calcLineScore(movesArray, maxPoint, minPoint);
        }


        // 左斜め
        for (let idx = 0; idx < maxLength; idx++) {
            movesArray[idx] = gameBoard[idx][idx];
        }
        totalScore += this.calcLineScore(movesArray, maxPoint, minPoint);


        // 右斜め
        let column = 2;

        for (let row = 0; row < maxLength; row++) {
            movesArray[row] = gameBoard[row][column];

            column--;
        }

        totalScore += this.calcLineScore(movesArray, maxPoint, minPoint);


        Counter.resetCount();

        return totalScore;
    }


    calcLineScore(movesArray, maxPoint, minPoint) {
        console.log('calcLineScoreが呼ばれました');

        let score = 0;
        const perTernPoint = 10;

        console.log(movesArray);

        for (let moves of movesArray) {

            if (moves === '×') {
                score += perTernPoint;
            } else if (moves === '○') {
                score -= perTernPoint;
            }
        }

        let counter = Counter.getCount();
        const correctionValue = 100;

        const counterCorrectionValue = counter * correctionValue;

        const finalMaxPoint = 100000;
        const finalMinPoint = -100000;


        Counter.upCount();

        if (score == maxPoint) {
            score = finalMaxPoint;
        } else if (score == minPoint) {
            score = finalMinPoint;
        }

        return score;
    }
}