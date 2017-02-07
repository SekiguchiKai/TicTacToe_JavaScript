/**
 * カウンターを表すためのクラス
 */
export default class Counter {
    private static _count;
    /**
     * カウンターを1上げるためのメソッド
     */
    static upCount(): void;
    /**
     * カウンターを取得するためのメソッド
     * @return {number} 現在のカウンターの値
     */
    static getCount(): number;
    /**
     * カウンターをリセットするためのメソッド
     */
    static resetCount(): void;
}
