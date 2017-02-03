import Counter from './counter.js';

export default class ScoreCalculator {
    /**
     * 得点の計算を行うためのメソッド
     * @param {gameBoard} ゲーム盤
     */
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
            totalScore += this.calcLineScore(movesArray);
        }

        // column
        for (let column = 0; column < maxLength; column++) {
            for (let row = 0; row < maxLength; row++) {
                movesArray[row] = gameBoard[row][column];
            }
            totalScore += this.calcLineScore(movesArray);
        }


        // 左斜め
        for (let idx = 0; idx < maxLength; idx++) {
            movesArray[idx] = gameBoard[idx][idx];
        }
        totalScore += this.calcLineScore(movesArray);


        // 右斜め
        let column = 2;

        for (let row = 0; row < maxLength; row++) {
            movesArray[row] = gameBoard[row][column];

            column--;
        }

        totalScore += this.calcLineScore(movesArray);
        Counter.resetCount();

        return totalScore;
    }


    /**
     * 1ラインの得点を計算するためのメソッッド
     * @param {movesArray} 打ち手を格納するための配列
     */
    calcLineScore(movesArray) {
        let score = 0;

        // 1つ目
        if (movesArray[0] === '×') {
            score = 1;
        } else if (movesArray[0] === '○') {
            score = -1;
        }

        // 2つ目
        if (movesArray[1] === '×') {
            if (score === 1) {
                score = 10;
            } else if (score === -1) {
                return 0;
            } else {
                score = 1;
            }
        } else if (movesArray[1] === '○') {
            if (score === -1) {
                score = -10;
            } else if (score === 1) {
                return 0;
            } else {
                score = -1;
            }
        }

        // 3つ目
        if (movesArray[2] === '×') {
            if (score > 0) {
                score *= 10;
            } else if (score < 0) {
                return 0;
            } else {
                score = 1;
            }
        } else if (movesArray[2] === '○') {
            if (score < 0) {
                score *= 10;
            } else if (score > 1) {
                return 0;
            } else {
                score = -1;
            }
        }
        return score;
    }
}