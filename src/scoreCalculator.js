import Counter from './counter.js';

// フィールドをprivate化するための処理
let _rowSize = new WeakMap();
let _columnSize = new WeakMap();
let _judgeCriteriaSequence = new WeakMap();
let _rowMax = new WeakMap();
let _columnMax = new WeakMap();
let _maxPoint = new WeakMap();
let _minPoint = new WeakMap();

/**
 * 得点計算を表すクラス
 */
export default class ScoreCalculator {

    /**
     * コンストラクタ
     *
     * @param {rowSize}               rowのサイズ
     * @param {columnSize}            columnのサイズ
     * @param {judgeCriteriaSequence} 勝敗が決定する連続する打ち手の長さ
     * @param {maxPoint}              補正前の最大得点
     * @param {minPoint}              補正前の最小得点
     */
    constructor(rowSize, columnSize, judgeCriteriaSequence, maxPoint, minPoint) {
        _rowSize.set(this, rowSize);
        _columnSize.set(this, columnSize);
        _judgeCriteriaSequence.set(this, judgeCriteriaSequence);
        _rowMax.set(this, rowSize - judgeCriteriaSequence + 1);
        _columnMax.set(this, columnSize - judgeCriteriaSequence + 1);
        _maxPoint.set(this, maxPoint);
        _minPoint.set(this, minPoint);
    }

    /**
      * 現在のゲーム盤の点数を計算するためのメソッド
      *
      * @param {gameBoard} ゲーム盤
      * @return {number} そのゲーム盤の点数の合計
      */
    calcScore(gameBoard) {
        console.log('calcScoreメソッドが呼ばれました');
        let totalScore = 0;

        let arraySize = _judgeCriteriaSequence;
        let movesArray = new Array(arraySize);

        totalScore += this.calcRow(movesArray, gameBoard);

        totalScore += this.calcColumn(movesArray, gameBoard);

        totalScore += this.calcLeftSlanting(movesArray, gameBoard);

        totalScore += this.calcRightSlanting(movesArray, gameBoard);

        // ここを変更予定
        Counter.resetCount();
        console.log('今回の最終合計点は' + totalScore);
        console.log('その時のゲーム盤は' + gameBoard);
        return totalScore;
    }
    /**
     * rowの点数を計算するためのメソッド
     *
     * @param {movesArray} Movesを格納するための配列
     * @param {gameBoard}  ゲーム盤
     * @return {number} rowの合計点数
     */
    calcRow(movesArray, gameBoard) {
        console.log('calcRowが呼ばれました');
        let score = 0;

        for (let row = 0; row < _rowSize.get(this); row++) {
            for (let column = 0; column < _columnMax; column++) {
                for (let i = 0; i < movesArray.length; i++) {
                    movesArray[i] = gameBoard[row][column + i];
                }
                score += this.calcLineScore(movesArray, _maxPoint.get(this), _minPoint.get(this));
            }
        }
        return score;
    }

    /**
     * columnの点数を計算するためのメソッド
     *
     * @param {movesArray} Movesを格納するための配列
     * @param {gameBoard}  ゲーム盤
     * @return {number} columnの合計点数
     */
    calcColumn(movesArray, gameBoard) {
        let score = 0;

        for (let column = 0; column < _columnSize.get(this); column++) {
            for (let row = 0; row < _rowMax.get(this); row++) {
                for (let i = 0; i < movesArray.length; i++) {
                    movesArray[i] = gameBoard[row + i][column];
                }
                score += this.calcLineScore(movesArray, _maxPoint.get(this), _minPoint.get(this));
            }
        }
        return score;
    }

    /**
     * 左斜めのラインの点数を計算するためのメソッド
     *
     * @param {movesArray} Movesを格納するための配列
     * @param {gameBoard}  ゲーム盤
     * @return {number} 左斜めのラインの合計点数
     */
    calcLeftSlanting(movesArray, gameBoard) {
        let score = 0;

        for (let index = 0; index < _rowMax.get(this); index++) {

            for (let i = 0; i < movesArray.length; i++) {
                movesArray[i] = gameBoard[index + i][index + i];
            }
            score += this.calcLineScore(movesArray, _maxPoint.get(this), _minPoint.get(this));
        }
        score += this.calcLeftSlantingRowSlide(movesArray, gameBoard);

        score += this.calcLeftSlantingColumnSlide(movesArray, gameBoard);


        return score;
    }
    /**
     * 左ラインのROWがスライドした時の点数を計算するためのメソッド
     *
     * @param {gameBoard}  ゲーム盤
     * @param {movesArray} moves（打ち手）を格納するための配列
     * @return {number} スライド分の合計点
     */
    calcLeftSlantingRowSlide(movesArray, gameBoard) {
        let column = 0;
        let score = 0;


        // for文1回で、1つの連を表す
        for (let row = 1; row < _rowMax.get(this); row++) {
            score = this.calcLeftSlantingSlideHelper(gameBoard, movesArray, row, column);
        }
        return score;
    }

    /**
      * 左ラインのROWがスライドした時の点数を計算するためのメソッド
      *
      * @param {gameBoard} ゲーム盤
      * @param {movesArray} moves（打ち手）を格納するための配列
      * @return {number} スライド分の合計点
      */
    calcLeftSlantingColumnSlide(movesArray, gameBoard) {

        let row = 0;
        let score = 0;

        // for文1回で、1つの連を表す
        for (let column = 1; column < _columnMax.get(this); column++) {
            score = this.calcLeftSlantingSlideHelper(gameBoard, movesArray, row, column);
        }
        return score;
    }

    /**
      * 左斜めのラインにおいて、指定された打ち手が、ゲーム盤上の指定された範囲内で勝敗を決定する数分連続しているした時の点数を計算するためのメソッド
      *
      * @param {gameBoard}  ゲーム盤
      * @param {row}        rowのインデックス
      * @param {column}     columnのインデックス
      * @param {movesArray} moves（打ち手）を格納するための配列
      * @return {number} スライド分の合計点
      */
    calcLeftSlantingSlideHelper(gameBoard, movesArray, row, column) {


        let score = 0;

        for (let difference = 0; difference < _judgeCriteriaSequence.get(this); difference++) {
            movesArray[difference] = gameBoard[row + difference][column + difference];
        }

        score += this.calcLineScore(movesArray, _maxPoint.get(this), _minPoint.get(this));

        return score;
    }

    /**
      * 右斜めのラインの点数を計算するためのメソッド
      *
      * @param movesArray Movesを格納するための配列
      * @param gameBoard  ゲーム盤
      * @return 右斜めの合計点数
      */
    calcRightSlanting(movesArray, gameBoard) {
        let score = 0;

        let columnLastIndex = _columnSize.get(this) - 1;
        let column = columnLastIndex;

        // for文1回で、1つの連を表す
        for (let row = 0; row < _rowMax.get(this); row++) {
            for (let i = 0; i < movesArray.length; i++) {
                movesArray[i] = gameBoard[row + i][column - i];
            }
            score += this.calcLineScore(movesArray, _maxPoint.get(this), _minPoint.get(this));

            column--;
        }

        score += this.calcRightSlantingRowSlide(gameBoard, movesArray);

        score += this.calcRightSlantingColumnSlide(gameBoard, movesArray);

        return score;
    }

    /**
      * 右ラインのROWがスライドした時の点数を計算するためのメソッド
      *
      * @param gameBoard  ゲーム盤
      * @param movesArray Movesを格納するための配列
      * @return スライド分の合計点
      */
    calcRightSlantingRowSlide(gameBoard, movesArray) {
        let column = _columnSize.get(this) - 1;

        let score = 0;

        // for文1回で、1つの連を表す
        for (let row = 1; row < _rowMax.get(this); row++) {
            score = this.calcRightSlantingSlideHelper(gameBoard, movesArray, row, column);
        }
        return score;
    }

    /**
      * 右ラインのcolumnがスライドした時の得点を換算するをためのメソッド
      *
      * @param gameBoard  ゲーム盤
      * @param movesArray Movesを格納するための配列
      * @return スライド分の合計点
      */
    calcRightSlantingColumnSlide(fgameBoard, movesArray) {
        let localColumnMax = _columnSize.get(this) - 1;
        let row = 0;

        let score = 0;

        // for文1回で、1つの連を表す
        for (let column = _judgeCriteriaSequence.get(this) - 1; column < localColumnMax; column++) {
            score = this.calcRightSlantingSlideHelper(gameBoard, movesArray, row, column);
        }
        return score;
    }

    /**
      * udgeRightSlanting~Slideメソッドを補助するためのメソッド
      *
      * @param gameBoard  ゲーム盤
      * @param movesArray Movesを格納するための配列
      * @param row        rowのインデックス
      * @param column     columnのインデックス
      * @return スライド分の合計点
      */
    calcRightSlantingSlideHelper(gameBoard, movesArray, row, column) {
        let score = 0;

        for (let difference = 0; difference < _judgeCriteriaSequence.get(this); difference++) {
            movesArray[difference] = gameBoard[row + difference][column - difference];
        }
        score += this.calcLineScore(movesArray, _maxPoint.get(this), _minPoint.get(this));

        return score;
    }


    /**
     * 引数として受け取った3つの打ち手の点数の合計を求める
     *
     * @param movesArray 一列分のMovesを格納した配列
     * @param maxPoint   自分の打ち手がラインが揃った時の点数
     * @param minPoint   相手の打ち手がラインが揃った時の点数
     * @return ラインの合計点数
     */
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

        // 勝敗がつくときには、点数の差を大きくする
        // if (score == maxPoint) {
        //     score = finalMaxPoint - counterCorrectionValue;
        // } else if (score == minPoint) {
        //     score = finalMinPoint + counterCorrectionValue;
        // }
        Counter.upCount();

        if (score == maxPoint) {
            score = finalMaxPoint;
        } else if (score == minPoint) {
            score = finalMinPoint;
        }

        return score;
    }
}