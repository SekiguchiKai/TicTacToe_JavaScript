export default class MiniMax {

    // playerはplayerオブジェクト
    calcMiniMax(board, depth, playerSignal, alpha, veta) {

        let capableMovesArray = this.makeCapableMoveArray(board);
        let score;
        let row = -1;
        let column = -1;

        // 試合が終了か、深さが0の場合は、スコアを
        if (array.length < 0 || depth == 0) {

            // ここ要変更
            score = scoreCalculator.calcScore(board.getGameBoardState());

            return { rowVal: row, columnVal: column, bestScore: score };
        } else {
            // CPUの点数であるαの方が、βよりも大きい場合、それ以上探索しなくても良い(その時のαが最大なので)ので、探索を打ち切る
            for (let cell of capableMovesArray) {

                let cellRow = cell.rowVal;
                let cellColumn = cell.columnVal;

                board.addMoves(cellRow, cellColumn, playerSignal);

                if (playerSignal == '×') {
                    score = calcMinMax(depth - 1, board, '○', alpha, beta).bestScore;
                    if (score > alpha) {
                        alpha = score;
                        column = cellColumn;
                        row = cellRow;
                    }
                } else if (playerMove == '○') {
                    score = calcMinMax(depth - 1, board, '×', alpha, beta).bestScore;
                    if (score < beta) {
                        beta = score;
                        column = cellColumn;
                        row = cellRow;
                    }
                }

                board.putAdd(cellRow, cellColumn, ' ');

                if (alpha >= beta) break;
            }

            if (playerSignal === '×') {
                return { rowVal: row, columnVal: column, bestScore: alpha };
            }

            return { rowVal: row, columnVal: column, bestScore: beta };
        }

    }

    makeCapableMoveArray(board) {
        let capableMovesArray = [];

        for (let row = 0; row < board.getRowSize(); row++) {
            for (let column = 0; column < board.getColumnSize(); column++) {
                if (board.getMove(row, column) == ' ') {
                    let cellObj = { rowVal: row, columnVal: column };
                    capableMovesArray.add(cellObj);
                }
            }
        }

        return capableMovesArray;
    }

}