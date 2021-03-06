import ScoreCalculator from './scoreCalculator';
import { MOVE } from './const';
import Board from './board';

const scoreCalculator = new ScoreCalculator();
// インターフェース
export interface MiniMaxResult {
    rowValue: number;
    columnValue: number;
    bestScore: number;
}

// インターフェース
export interface capableMoves {
    rowValue: number;
    columnValue: number;
}

/**
 * ミニマックスアルゴリズムを表したクラス
 */
export default class MiniMax {

    /**
     * ミニマックスアルゴリズムαβ法を用い、引数で渡された打ち手のプレイヤーに取って最適な点数とゲーム盤の場所を返すメソッド
     * CPUの場合は、最大の点数とその点数を取り得るゲーム盤の場所を返し、USERの場合は、点数とその点数を取り得るゲーム盤の場所を返す
     * <p>
     * このメソッドのアルゴリズム
     * 【CPUの場合】
     * 現在のゲーム木の深さの1個下の階層の点数をMinMaxで取得する
     * その取得した点数が現在保持している一番高い点数（ベストスコア）よりも高い場合は、その点数が保持されるベストスコアとなる
     * <p>
     * 【USERの場合】
     * 現在のゲーム木の深さの1個下の階層の点数をMinMaxで取得する
     * その取得した点数が現在保持している一番低い点数（ベストスコア）よりも低い場合は、その点数が保持されるベストスコアとなる
     *
     * @param {number} depth -探索の深さ
     * @param {Board} board - Boardクラスのインスタンス
     * @param {string} playerSignal - Playerの打ち手 
     * @param {number} alpha - α値
     * @param {number} beta - β値
     * @return {MiniMaxResult} 打ち手を打つのに最適な場所とそこに打ち手を打った場合の点数を格納したオブジェクト型リテラル
     */
    public calcMiniMax(depth: number, board: Board, playerSignal: string, alpha: number, beta: number): MiniMaxResult {

        const capableMovesArray = this.makeCapableMoveArray(board);

        let score;
        let row = -1;
        let column = -1;

        const gameOverNum = 0

        // 試合が終了か、深さが0の場合は、スコアを
        if (capableMovesArray.length === gameOverNum || depth === gameOverNum) {

            // ここ要変更
            score = scoreCalculator.calcScore(board.getGameBoardState());


            return { rowValue: row, columnValue: column, bestScore: score };
        } else {
            // CPUの点数であるαの方が、βよりも大きい場合、それ以上探索しなくても良い(その時のαが最大なので)ので、探索を打ち切る
            for (const cell of capableMovesArray) {

                board.putMove(cell.rowValue, cell.columnValue, playerSignal);

                const correctVal = 1;

                if (playerSignal === MOVE.CROSS) {

                    score = this.calcMiniMax(depth - correctVal, board, MOVE.CIRCLE, alpha, beta).bestScore;
                    if (score > alpha) {
                        alpha = score;
                        row = cell.rowValue;
                        column = cell.columnValue;

                    }
                } else if (playerSignal === MOVE.CIRCLE) {
                    score = this.calcMiniMax(depth - correctVal, board, MOVE.CROSS, alpha, beta).bestScore;
                    if (score < beta) {
                        beta = score;
                        row = cell.rowValue;
                        column = cell.columnValue;
                    }
                }
                board.putMove(cell.rowValue, cell.columnValue, MOVE.EMPTY);

                if (alpha >= beta) { break; }
            }
        }

        if (playerSignal === MOVE.CROSS) {
            return {
                rowValue: row,
                columnValue: column,
                bestScore: alpha
            };
        } else {
            return {
                rowValue: row,
                columnValue: column,
                bestScore: beta
            };
        }
    }

    /**
      * 現在の打ち手を打つことが可能なすべてのゲーム盤の場所をリスト化する（NO_MOVEが存在しているGameBoardの場所）
      *
      * @param {Board} board - Boardクラスのインスタンス
      * @return {capableMovesArrays[]} NO_MOVEが存在するGameBoard上の場所の一覧を格納したオブジェクト型リテラル
      */
    private makeCapableMoveArray(board: Board): capableMoves[] {
        const capableMovesArray = [];

        for (let row = 0; row < board.rowSize; row++) {
            for (let column = 0; column < board.columnSize; column++) {
                if (board.getMove(row, column) === MOVE.EMPTY) {
                    const cellObj = { rowValue: row, columnValue: column };
                    capableMovesArray.push(cellObj);
                }
            }
        }
        return capableMovesArray;
    }
}