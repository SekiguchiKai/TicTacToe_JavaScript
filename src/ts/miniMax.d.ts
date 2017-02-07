import Board from './board';
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
     * @return {object} 打ち手を打つのに最適な場所とそこに打ち手を打った場合の点数を格納したオブジェクト
     */
    calcMiniMax(depth: number, board: Board, playerSignal: string, alpha: number, beta: number): {
        rowVal: number;
        columnVal: number;
        bestScore: number;
    };
    /**
      * 現在の打ち手を打つことが可能なすべてのゲーム盤の場所をリスト化する（NO_MOVEが存在しているGameBoardの場所）
      *
      * @param {board} Boardクラスのインスタンス
      * @return {Object[]} NO_MOVEが存在するGameBoard上の場所の一覧を格納したオブジェクト
      */
    private makeCapableMoveArray(board);
}
