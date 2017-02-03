import Counter from './counter.js';

export default class ScoreCalculator {
    /**
     * 得点の計算を行うためのメソッド
     * @param {gameBoard} ゲーム盤
     */
    calcScore(gameBoard) {
        let totalScore = 0;

        totalScore += this.calcLineScore(gameBoard, 0, 0, 0, 1, 0, 2);
        totalScore += this.calcLineScore(gameBoard, 1, 0, 1, 1, 1, 2);
        totalScore += this.calcLineScore(gameBoard, 2, 0, 2, 1, 2, 2);
        totalScore += this.calcLineScore(gameBoard, 0, 0, 1, 0, 2, 0);
        totalScore += this.calcLineScore(gameBoard, 0, 1, 1, 1, 2, 1);
        totalScore += this.calcLineScore(gameBoard, 0, 2, 1, 2, 2, 2);
        totalScore += this.calcLineScore(gameBoard, 0, 0, 1, 1, 2, 2);
        totalScore += this.calcLineScore(gameBoard, 0, 2, 1, 1, 2, 0);
        return totalScore;

    }


    /**
     * 1ラインの得点を計算するためのメソッッド
     * @param {movesArray} 打ち手を格納するための配列
     * @param {maxPoint} 補正前の最高得点
     * @param {minPoint} 補正前の最低得点
     */
    calcLineScore(gameBoard, row1, col1, row2, col2, row3, col3) {
        let score = 0;

        // 1つ目
        if (gameBoard[row1][col1] === '×') {
            score = 1;
        } else if (gameBoard[row1][col1] === '○') {
            score = -1;
        }

        // 2つ目
        if (gameBoard[row2][col2] === '×') {
            if (score === 1) {
                score = 10;
            } else if (score === -1) {
                return 0;
            } else {
                score = 1;
            }
        } else if (gameBoard[row2][col2] === '○') {
            if (score === -1) {
                score = -10;
            } else if (score === 1) {
                return 0;
            } else {
                score = -1;
            }
        }

        // 3つ目
        if (gameBoard[row3][col3] === '×') {
            if (score > 0) {
                score *= 10;
            } else if (score < 0) {
                return 0;
            } else {
                score = 1;
            }
        } else if (gameBoard[row3][col3] === '○') {
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