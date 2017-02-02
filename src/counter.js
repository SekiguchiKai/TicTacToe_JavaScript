let count = 1;
/**
 * カウンターを表すためのクラス
 */
export default class Counter {

    /**
     * カウンターを1上げるためのメソッド
     */
    static upCount() {
        count++;
    }

    /**
     * カウンターを取得するためのメソッド
     * @return {number} 現在のカウンターの値
     */
    static getCount() {
        return count;
    }

    /**
     * カウンターをリセットするためのメソッド
     */
    static resetCount() {
        Counter.count = 0;
    }
}