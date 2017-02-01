import ScoreCalculator from './scoreCalculator.js';

const scoreCalculator = new ScoreCalculator(3, 3, 3, 30, -30);

export default class MiniMax {

    // playerはplayerオブジェクト
    calcMiniMax(depth, board, playerSignal, alpha, beta) {
        console.log('calcMiniMaxメソッドが呼ばれました');

        let capableMovesArray = this.makeCapableMoveArray(board);
        let score;
        let row = -1;
        let column = -1;

        // 試合が終了か、深さが0の場合は、スコアを
        if (capableMovesArray.length === 0 || depth === 0) {
            window.alert('aaaaaa');

            // ここ要変更
            score = scoreCalculator.calcScore(board.getGameBoardState());



            return { rowVal: row, columnVal: column, bestScore: score };
        } else {
            // CPUの点数であるαの方が、βよりも大きい場合、それ以上探索しなくても良い(その時のαが最大なので)ので、探索を打ち切る
            for (let cell of capableMovesArray) {

                let cellRow = cell.rowVal;
                let cellColumn = cell.columnVal;

                board.addMove(cellRow, cellColumn, playerSignal);


                if (playerSignal === '×') {
                    score = this.calcMiniMax(depth - 1, board, '○', alpha, beta).bestScore;
                    if (score > alpha) {
                        alpha = score;
                        column = cellColumn;
                        row = cellRow;
                    }
                } else if (playerSignal === '○') {
                    window.alert('c');
                    let obj = this.calcMiniMax(depth - 1, board, '×', alpha, beta);

                    score = obj.bestScore;


                    // score = this.calcMinMax(depth - 1, board, '×', alpha, beta).bestScore;
                    if (score < beta) {
                        beta = score;
                        column = cellColumn;
                        row = cellRow;
                    }
                }
                window.alert('b');
                board.addMove(cellRow, cellColumn, ' ');

                if (alpha >= beta) break;
            }

            if (playerSignal === '×') {
                window.alert('aa');
                return { rowVal: row, columnVal: column, bestScore: alpha };
            }
            window.alert('aaa');
            return { rowVal: row, columnVal: column, bestScore: beta };
        }

    }

    makeCapableMoveArray(board) {
        let capableMovesArray = [];
        console.log('makeCapableMoveArrayメソッドが呼ばれました');

        for (let row = 0; row < board.getRowSize(); row++) {
            for (let column = 0; column < board.getColumnSize(); column++) {
                if (board.getMove(row, column) == ' ') {
                    let cellObj = { rowVal: row, columnVal: column };
                    capableMovesArray.push(cellObj);
                }
            }
        }
        return capableMovesArray;
    }

}