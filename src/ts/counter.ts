
/**
 * カウンターを表すためのクラス
 */
export default class Counter {

    private static _count = 1;

    /**
     * カウンターを1上げるためのメソッド
     */
    public static upCount(): void {
        this._count++;
    }

    /**
     * カウンターを取得するためのメソッド
     * @return {number} 現在のカウンターの値
     */
    public static getCount(): number {
        return this._count;
    }

    /**
     * カウンターをリセットするためのメソッド
     */
    public static resetCount(): void {
        this._count = 0;
    }
}