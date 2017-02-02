import ScoreCalculator from './scoreCalculator.js';

const scoreCalculator = new ScoreCalculator(3, 3, 3, 30, -30);

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
     * @param {depth}      探索の深さ
     * @param {board} Boardクラスのインスタンス
     * @param {playerSignal} Playerの打ち手 
     * @param {alpha}      α
     * @param {beta}       β
     * @return {Object} 打ち手を打つのに最適な場所とそこに打ち手を打った場合の点数を格納したオブジェクト
     */
    calcMiniMax(depth, board, playerSignal, alpha, beta) {
        console.log('calcMiniMaxメソッドが呼ばれました');

        let capableMovesArray = this.makeCapableMoveArray(board);

        console.log('前');
        let score;
        let row = -1;
        let column = -1;

        console.log('後');

        // 試合が終了か、深さが0の場合は、スコアを
        if (capableMovesArray.length === 0 || depth === 0) {

            console.log('---capableMovesArray.length---' + capableMovesArray.length);
            console.log('---depth---' + depth);


            // ここ要変更
            score = scoreCalculator.calcScore(board.getGameBoardState());

            console.log('1段目');
            return { rowVal: row, columnVal: column, bestScore: score };
        } else {
            // CPUの点数であるαの方が、βよりも大きい場合、それ以上探索しなくても良い(その時のαが最大なので)ので、探索を打ち切る
            for (let cell of capableMovesArray) {

                board.putMove(cell.rowValue, cell.columnValue, playerSignal);

                if (playerSignal === '×') {
                    score = this.calcMiniMax(depth - 1, board, '○', alpha, beta).bestScore;
                    if (score > alpha) {
                        alpha = score;
                        row = cell.rowValue;
                        column = cell.columnValue;

                    }
                } else if (playerSignal === '○') {
                    score = this.calcMiniMax(depth - 1, board, '×', alpha, beta).bestScore;
                    if (score < beta) {
                        beta = score;
                        row = cell.rowValue;
                        column = cell.columnValue;
                    }
                }
                board.putMove(cell.rowValue, cell.columnValue, ' ');

                if (alpha >= beta) break;
            }

            return (playerSignal === '×') ? { rowVal: row, columnVal: column, bestScore: alpha } : { rowVal: row, columnVal: column, bestScore: beta };
        }

    }

    /**
      * 現在の打ち手を打つことが可能なすべてのゲーム盤の場所をリスト化する（NO_MOVEが存在しているGameBoardの場所）
      *
      * @param {board} Boardクラスのインスタンス
      * @return {Object} NO_MOVEが存在するGameBoard上の場所の一覧を格納したオブジェクト
      */
    makeCapableMoveArray(board) {
        let capableMovesArray = [];
        console.log('makeCapableMoveArrayメソッドが呼ばれました');

        for (let row = 0; row < board.getRowSize(); row++) {
            for (let column = 0; column < board.getColumnSize(); column++) {
                if (board.getMove(row, column) === ' ') {
                    let cellObj = { rowValue: row, columnValue: column };
                    capableMovesArray.push(cellObj);
                }
            }
        }
        console.log('capableMovesArray:' + JSON.stringify(capableMovesArray));
        return capableMovesArray;
    }

}