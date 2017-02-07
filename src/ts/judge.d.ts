import Board from './board';
/**
 * 勝敗を審判するためのクラス
 */
export default class Judge {
    private _rowSize;
    private _columnSize;
    private _judgeCriteriaSequence;
    /**
     * rowの最大サイズ
     */
    private _rowMax;
    /**
     * columnの最大サイズ
     */
    private _columnMax;
    /**
      * コンストラクタ
      * @param {rowSize} rowのサイズ
      * @param {columnSize} columnのサイズ
      * @param {judgeCriteriaSequence} 勝敗の基準となる数（何個同じ打ち手が一列に揃えば勝敗が決定するか）
      */
    constructor(_rowSize: number, _columnSize: number, _judgeCriteriaSequence: number);
    /**
     * 勝敗はついているかを確認し、その結果を返すためのメソッド
     * @param {board} Boardクラスのインスタンス
     * @return {string} 勝敗の結果
     */
    judgeResult(board: Board): string;
    /**
     * ユーザーが勝利したかどうかを確認するためのメソッド
     * 縦、横、左斜め、右斜めを走査する
     * @param {gameBoard} ゲーム盤
     * @return {boolean} ユーザーが勝利したかどうかの真偽値
     */
    private judgeWin(gameBoard);
    /**
     * ユーザーが敗北したかどうかを確認するためのメソッド
     * 縦、横、左斜め、右斜めを走査する
     * @param {gameBoard} ゲーム盤
     * @return {boolean} ユーザーが敗北したかどうかの真偽値
     */
    private judgeLose(gameBoard);
    /**
     * 引き分けかどうかを確認するためのメソッド
     * @param {gameBoard} ゲーム盤
     * @return {boolean} 引き分けかどうかの真偽値
     */
    private judgeDraw(gameBoard);
    /**
     * row(横のライン)が引数で指定された打ち手で5連が達成されているか確認するためのメソッド
     * @param {gameBoard} ゲーム盤
     * @param {moves} 打ち手
     * @return {boolean} 勝敗が決定したか真偽値
     */
    private judgeRow(gameBoard, moves);
    /**
     * rowにおいて指定された打ち手が、ゲーム盤上の指定された範囲内で勝敗を決定する数分連続しているかの真偽値を返すメソッド
     * @param {gameBoard} ゲーム盤
     * @param {moves} 打ち手
     * @return {boolean} 指定された打ち手が、ゲーム盤上の指定された範囲内で勝敗を決定する数分連続しているかの真偽値
     */
    private checkARow(gameBoard, moves, row, column);
    /**
     * column(縦のライン)が引数で指定されたMoveで5連が達成されているか確認するためのメソッド
     * @param {gameBoard} ゲーム盤
     * @param {moves} 打ち手
     * @return {boolean} 勝敗が決定したか真偽値
     */
    private judgeColumn(gameBoard, moves);
    /**
     * columnにおいて指定された打ち手が、ゲーム盤上の指定された範囲内で勝敗を決定する数分連続しているかの真偽値を返すメソッド
     * @param {gameBoard} ゲーム盤
     * @param {moves} 打ち手
     * @param {row}       rowのインデックス
     * @param {column}    columnのインデックス
     * @return {boolean} 指定された打ち手が、ゲーム盤上の指定された範囲内で勝敗を決定する数分連続しているかの真偽値
     */
    private checkAColumn(gameBoard, moves, row, column);
    /**
     * 左斜めのラインにおいて、引数で受け取った打ち手が5連揃っているかどうかの真偽値を確認するためのメソッド
     * @param {gameBoard} ゲーム盤
     * @param {moves} 打ち手
     * @return {boolean} 右斜めのラインにおいて、引数で受け取った打ち手が5連揃っているかどうかの真偽値を確認するためのメソッド
     */
    private judgeLeftSlanting(gameBoard, moves);
    /**
     * 左ラインのROWがスライドした時の審査を行うためのメソッド
     *
     * @param {gameBoard} ゲーム盤
     * @param {moves}     検査対象のプレーヤーの打ち手
     * @return  {boolean} 勝敗が決定したか真偽値
     */
    private leftSlantingRowShift(gameBoard, moves, rowStart);
    /**
      * 左ラインのROWがスライドした時の審査を行うためのメソッド
      *
      * @param {gameBoard} ゲーム盤
      * @param {moves}     検査対象のプレーヤーの打ち手
      * @return  {boolean} 勝敗が決定したか真偽値
      */
    private leftSlantingColumnShift(gameBoard, moves, columnStart);
    /**
      * 左斜めのラインの1回あたりおいて、引数で受け取った打ち手が5連揃っているかどうかの真偽値を確認するためのメソッド
      *
      * @param {gameBoard} ゲーム盤
      * @param {moves}     打ち手
      * @param {row}      rowのインデックス
      * @param {column}    columnのインデックス
      * @return {boolean}  1回あたりおいて、引数で受け取った打ち手が5連揃っているかどうかの真偽値
      */
    private checkOneTermLeftSlanting(gameBoard, moves, row, column);
    /**
      * 右斜めのラインにおいて、引数で受け取った打ち手が5連揃っているかどうかの真偽値を確認するためのメソッド
      *
      * @param {gameBoard} ゲーム盤
      * @param {moves}     打ち手
      * @return {boolean} 右斜めのラインにおいて、引数で受け取った打ち手が5連揃っているかどうかの真偽値を確認するためのメソッド
      */
    private judgeRightSlanting(gameBoard, moves);
    /**
      * 右斜めのラインがrowにおいてシフトする時(row1~row4)、引数で受け取った打ち手が5連揃っているかどうかの真偽値を確認するためのメソッド
      *
      * @param {gameBoard} ゲーム盤
      * @param {moves}     打ち手
      * @param {rowStart}  rowの調査開始値
      * @return {boolean} 右斜めのラインがrowにおいてシフトする時(row1~row4)、引数で受け取った打ち手が5連揃っているかどうかの真偽値
      */
    private rightSlantingRowShift(gameBoard, moves, rowStart);
    /**
      * 右斜めのラインがrowにおいてシフトする時(row1~row4)、引数で受け取った打ち手が5連揃っているかどうかの真偽値を確認するためのメソッド
      *
      * @param {gameBoard}   ゲーム盤
      * @param {moves}       打ち手
      * @param {columnStart} rowの調査開始値
      * @return {boolean} 右斜めのラインがrowにおいてシフトする時(row1~row4)、引数で受け取った打ち手が5連揃っているかどうかの真偽値
      */
    private rightSlantingColumnShift(gameBoard, moves, columnStart);
    /**
      * 右斜めのライン1回あたりおいて、引数で受け取った打ち手が5連揃っているかどうかの真偽値を確認するためのメソッド
      *
      * @param {gameBoard} ゲーム盤
      * @param {moves}     打ち手
      * @param {row}       rowのインデックス
      * @param {column}    columnのインデックス
      * @return {boolean} 1回あたりおいて、引数で受け取った打ち手が5連揃っているかどうかの真偽値
      */
    private checkOneTermRightSlanting(gameBoard, moves, row, column);
}
