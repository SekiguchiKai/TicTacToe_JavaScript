
/**
 * ゲーム盤を表すためのクラス
 */
export default class Board {
  private _rowSize;
  private _columnSize;
  private _gameBoard;
  /**
   * コンストラクタ
   * @param {rowSize} rowのサイズ
   * @param {columnSize} columnのサイズ
   */
  constructor(_rowSize: number, _columnSize: number);
  /**
   * rowSizeを取得するためのメソッド
   * @return {number} rowのサイズ
   */
  readonly rowSize: number;
  /**
   * columnSizeを取得するためのメソッド
   * @return {number} columnのサイズ
   */
  readonly columnSize: number;
  /**
   * ゲーム盤の指定箇所に打ち手を加えるためのメソッド
   * @param {row} rowの値
   * @param {column} columnの値
   * @param {move} 打ち手
   */
  putMove(row: number, column: number, move: string): void;
  /**
    * ゲーム盤の指定箇所の打ち手を取得するためのメソッド
    * @param {row} rowの値
    * @param {column} columnの値
    * @return {string} 打ち手
    */
  getMove(row: number, column: number): string;
  /**
    * ゲーム盤を取得するためのメソッド
    * @return {string[][]} 打ち手
    */
  getGameBoardState(): string[][];
}
