let count = 1;

export default class Counter {


    static upCount() {
        count++;
    }

    static getCount() {
        return count;
    }
    static resetCount() {
        Counter.count = 0;
    }
}