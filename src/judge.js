// フィールドをprivate化するための処理
let _rowSize = new WeakMap();
let _columnSize = new WeakMap();
let _judgeCriteriaSequence = new WeakMap();
let _rowMax = new WeakMap();
let _columnMax = new WeakMap();

/**
 * 勝敗を審判するためのクラス
 */
export default class Judge {

    /**
    * コンストラクタ
    * @param {rowSize} rowのサイズ
    * @param {columnSize} columnのサイズ
    * @param {judgeCriteriaSequence} 勝敗の基準となる数（何個同じ打ち手が一列に揃えば勝敗が決定するか）
    */
    constructor(rowSize, columnSize, judgeCriteriaSequence) {
        _rowSize.set(this, rowSize);
        _columnSize.set(this, columnSize);
        _judgeCriteriaSequence.set(this, judgeCriteriaSequence);
        _rowMax.set(this, _rowSize.get(this) - _judgeCriteriaSequence.get(this) + 1);
        _columnMax.set(this, _columnSize.get(this) - _judgeCriteriaSequence.get(this) + 1);
    }
    /**
     * 勝敗はついているかを確認し、その結果を返すためのメソッド
     * @param {board} Boardクラスのインスタンス
     * @return {boolean} 勝敗の結果
     */
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

    /**
     * ユーザーが勝利したかどうかを確認するためのメソッド
     * 縦、横、左斜め、右斜めを走査する
     * @param {gameBoard} ゲーム盤
     * @return {boolean} ユーザーが勝利したかどうかの真偽値
     */
    judgeWin(gameBoard) {
        return this.judgeRow(gameBoard, '○')
            || this.judgeColumn(gameBoard, '○')
            || this.judgeLeftSlanting(gameBoard, '○')
            || this.judgeRightSlanting(gameBoard, '○');
    }
    /**
     * ユーザーが敗北したかどうかを確認するためのメソッド
     * 縦、横、左斜め、右斜めを走査する
     * @param {gameBoard} ゲーム盤
     * @return {boolean} ユーザーが敗北したかどうかの真偽値
     */
    judgeLose(gameBoard) {
        return this.judgeRow(gameBoard, '×')
            || this.judgeColumn(gameBoard, '×')
            || this.judgeLeftSlanting(gameBoard, '×')
            || this.judgeRightSlanting(gameBoard, '×');
    }

    /**
     * 引き分けかどうかを確認するためのメソッド
     * @param {gameBoard} ゲーム盤
     * @return {boolean} 引き分けかどうかの真偽値
     */
    judgeDraw(gameBoard) {
        for (let row = 0; row < _rowSize.get(this); row++) {
            for (let column = 0; column < _columnSize.get(this); column++) {
                if (gameBoard[row][column] === ' ') {
                    return false;
                }
            }
        }
        return true;
    }
    /**
     * row(横のライン)が引数で指定された打ち手で5連が達成されているか確認するためのメソッド
     * @param {gameBoard} ゲーム盤
     * @param {moves} 打ち手
     * @return {boolean} 勝敗が決定したか真偽値
     */
    judgeRow(gameBoard, moves) {
        for (let row = 0; row < _rowSize.get(this); row++) {
            for (let column = 0; column < _columnMax.get(this); column++) {
                if (this.checkARow(gameBoard, moves, row, column)) {
                    return true;
                }
            }
        }
        return false;
    }

    /**
     * rowにおいて指定された打ち手が、ゲーム盤上の指定された範囲内で勝敗を決定する数分連続しているかの真偽値を返すメソッド
     * @param {gameBoard} ゲーム盤
     * @param {moves} 打ち手
     * @return {boolean} 指定された打ち手が、ゲーム盤上の指定された範囲内で勝敗を決定する数分連続しているかの真偽値
     */
    checkARow(gameBoard, moves, row, column) {
        for (let difference = 0; difference < _judgeCriteriaSequence.get(this); difference++) {
            if (gameBoard[row][column + difference] != moves) {
                return false;
            }
        }
        return true;
    }
    /**
     * column(縦のライン)が引数で指定されたMoveで5連が達成されているか確認するためのメソッド
     * @param {gameBoard} ゲーム盤
     * @param {moves} 打ち手
     * @return {boolean} 勝敗が決定したか真偽値
     */
    judgeColumn(gameBoard, moves) {
        for (let column = 0; column < _columnSize.get(this); column++) {
            for (let row = 0; row < _rowMax.get(this); row++) {
                if (this.checkAColumn(gameBoard, moves, row, column)) {
                    return true;
                }
            }
        }
        return false;
    }
    /**
     * columnにおいて指定された打ち手が、ゲーム盤上の指定された範囲内で勝敗を決定する数分連続しているかの真偽値を返すメソッド
     * @param {gameBoard} ゲーム盤
     * @param {moves} 打ち手
     * @param {row}       rowのインデックス
     * @param {column}    columnのインデックス
     * @return {boolean} 指定された打ち手が、ゲーム盤上の指定された範囲内で勝敗を決定する数分連続しているかの真偽値
     */
    checkAColumn(gameBoard, moves, row, column) {
        for (let difference = 0; difference < _judgeCriteriaSequence.get(this); difference++) {
            if (gameBoard[row + difference][column] != moves) {
                return false;
            }
        }
        return true;
    }

    /**
     * 左斜めのラインにおいて、引数で受け取った打ち手が5連揃っているかどうかの真偽値を確認するためのメソッド
     * @param {gameBoard} ゲーム盤
     * @param {moves} 打ち手
     * @return {boolean} 右斜めのラインにおいて、引数で受け取った打ち手が5連揃っているかどうかの真偽値を確認するためのメソッド
     */
    judgeLeftSlanting(gameBoard, moves) {

        // centerAxis
        let column = 0;

        for (let row = 0; row < _rowMax.get(this); row++) {
            // 1回あたりの5連
            let oneTermCheck = this.checkOneTermLeftSlanting(gameBoard, moves, row, column);
            if (oneTermCheck) {
                return true;
            }
            column++;
        }


        // rowシフト
        for (let rowStart = 1; rowStart < _judgeCriteriaSequence.get(this); rowStart++) {
            let rowShiftCheck = this.leftSlantingRowShift(gameBoard, moves, rowStart);
            if (rowShiftCheck) {
                return true;
            }
        }

        // columnシフト
        for (let columnStart = 0; columnStart < _columnMax.get(this); columnStart++) {
            let columnShiftCheck = this.leftSlantingColumnShift(gameBoard, moves, columnStart);
            if (columnShiftCheck) {
                return true;
            }
        }


        return false;
    }

    /**
     * 左ラインのROWがスライドした時の審査を行うためのメソッド
     *
     * @param {gameBoard} ゲーム盤
     * @param {moves}     検査対象のプレーヤーの打ち手
     * @return  {boolean} 勝敗が決定したか真偽値
     */
    leftSlantingRowShift(gameBoard, moves, rowStart) {
        let column = 0;

        // for文1回で、1つの連を表す
        for (let row = rowStart; row < _rowMax.get(this); row++) {
            let oneTermCheck = checkOneTermLeftSlanting(gameBoard, moves, row, column);
            if (oneTermCheck) {
                return true;
            }

            column++;
        }
        return false;
    }


    /**
      * 左ラインのROWがスライドした時の審査を行うためのメソッド
      *
      * @param {gameBoard} ゲーム盤
      * @param {moves}     検査対象のプレーヤーの打ち手
      * @return  {boolean} 勝敗が決定したか真偽値
      */
    leftSlantingColumnShift(gameBoard, moves, columnStart) {
        let row = 0;

        // for文1回で、1つの連を表す
        for (let column = columnStart; column < _columnMax.get(this); column++) {
            let oneTermCheck = this.checkOneTermLeftSlanting(gameBoard, moves, row, column);
            if (oneTermCheck) {
                return true;
            }

            row++;
        }
        return false;
    }
    /**
      * 左斜めのラインの1回あたりおいて、引数で受け取った打ち手が5連揃っているかどうかの真偽値を確認するためのメソッド
      *
      * @param {gameBoard} ゲーム盤
      * @param {moves}     打ち手
      * @param {row}      rowのインデックス
      * @param {column}    columnのインデックス
      * @return {boolean}  1回あたりおいて、引数で受け取った打ち手が5連揃っているかどうかの真偽値
      */
    checkOneTermLeftSlanting(gameBoard, moves, row, column) {

        for (let difference = 0; difference < _judgeCriteriaSequence.get(this); difference++) {
            if (gameBoard[row + difference][column + difference] != moves) {
                return false;
            }
        }
        return true;

    }
    /**
      * 右斜めのラインにおいて、引数で受け取った打ち手が5連揃っているかどうかの真偽値を確認するためのメソッド
      *
      * @param {gameBoard} ゲーム盤
      * @param {moves}     打ち手
      * @return {boolean} 右斜めのラインにおいて、引数で受け取った打ち手が5連揃っているかどうかの真偽値を確認するためのメソッド
      */
    judgeRightSlanting(gameBoard, moves) {

        // centerAxis
        let column = _columnSize.get(this) - 1;

        for (let row = 0; row < _rowMax.get(this); row++) {
            // 1回あたりの5連
            let oneTermCheck = this.checkOneTermRightSlanting(gameBoard, moves, row, column);
            if (oneTermCheck) {
                return true;
            }
            column--;
        }

        // rowシフト
        for (let rowStart = 1; rowStart < _judgeCriteriaSequence.get(this); rowStart++) {
            let rowShiftCheck = this.rightSlantingRowShift(gameBoard, moves, rowStart);
            if (rowShiftCheck) {
                return true;
            }
        }
        // columnシフト
        const start = gameBoard.length - 1;
        for (let columnStart = start; columnStart > _rowSize.get(this) - _judgeCriteriaSequence.get(this) - 1; columnStart--) {
            let columnShiftCheck = this.rightSlantingColumnShift(gameBoard, moves, columnStart);
            if (columnShiftCheck) {
                return true;
            }
        }

        return false;
    }

    /**
      * 右斜めのラインがrowにおいてシフトする時(row1~row4)、引数で受け取った打ち手が5連揃っているかどうかの真偽値を確認するためのメソッド
      *
      * @param {gameBoard} ゲーム盤
      * @param {moves}     打ち手
      * @param {rowStart}  rowの調査開始値
      * @return {boolean} 右斜めのラインがrowにおいてシフトする時(row1~row4)、引数で受け取った打ち手が5連揃っているかどうかの真偽値
      */
    rightSlantingRowShift(gameBoard, moves, rowStart) {
        const column = _columnSize.get(this) - 1;

        for (let row = rowStart; row < _rowMax.get(this); row++) {
            // 1回あたりの5連
            let oneTermCheck = this.checkOneTermRightSlanting(gameBoard, moves, row, column);
            if (oneTermCheck) {
                return true;
            }
            column--;
        }
        return false;
    }
    /**
      * 右斜めのラインがrowにおいてシフトする時(row1~row4)、引数で受け取った打ち手が5連揃っているかどうかの真偽値を確認するためのメソッド
      *
      * @param {gameBoard}   ゲーム盤
      * @param {moves}       打ち手
      * @param {columnStart} rowの調査開始値
      * @return {boolean} 右斜めのラインがrowにおいてシフトする時(row1~row4)、引数で受け取った打ち手が5連揃っているかどうかの真偽値
      */
    rightSlantingColumnShift(gameBoard, moves, columnStart) {
        let row = 0;

        const columnEnd = _judgeCriteriaSequence.get(this) - 2;
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
    /**
      * 右斜めのライン1回あたりおいて、引数で受け取った打ち手が5連揃っているかどうかの真偽値を確認するためのメソッド
      *
      * @param {gameBoard} ゲーム盤
      * @param {moves}     打ち手
      * @param {row}       rowのインデックス
      * @param {column}    columnのインデックス
      * @return {boolean} 1回あたりおいて、引数で受け取った打ち手が5連揃っているかどうかの真偽値
      */
    checkOneTermRightSlanting(gameBoard, moves, row, column) {

        for (let difference = 0; difference < _judgeCriteriaSequence.get(this); difference++) {
            if (gameBoard[row + difference][column - difference] != moves) {
                return false;
            }
        }
        return true;

    }

}