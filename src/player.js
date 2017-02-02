export default class Player {
    constructor(board, name, signal) {
        this.board = board;

        this.name = name;
        // 打ち手のシグナル
        this.signal = signal;
    }

    setResult(result) {
        this.result = result;
    }

    getName() {
        return this.name;
    }

    getSignal() {
        return this.signal;
    }

    getResult() {
        return this.result;
    }
}