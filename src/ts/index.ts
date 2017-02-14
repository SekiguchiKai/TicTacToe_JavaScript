import Board from './board';
import Cpu from './cpu';
import Judge from './judge';
import { RESULT, MOVE } from './const';

const rowSize = 3;
const columnSize = 3;
const judgeCriteriaSequence = 3;

const board = new Board(rowSize, columnSize);
const cpu = new Cpu();
const judge = new Judge(rowSize, columnSize, judgeCriteriaSequence);

const idArray = ['0-0', '0-1', '0-2', '1-0', '1-1', '1-2', '2-0', '2-1', '2-2'];

for (const id of idArray) {
    const e = document.getElementById(id);
    e.addEventListener('click', () => {
        const rowColumn = id.split('-');

        const firstIdx = 0;
        const secondIdx = 1;
        const row = Number(rowColumn[firstIdx]);
        const column = Number(rowColumn[secondIdx]);

        const cellMove = board.getMove(row, column);

        if (cellMove === MOVE.EMPTY) {
            board.putMove(row, column, MOVE.CIRCLE);
            e.innerHTML = `<span style="font-size:70px; color:white;">${board.getMove(row, column)}</span>`;

            const result = judge.judgeResult(board);

            const delayTime = 1000;

            if (result === RESULT.PENNDING) {
                const depth = 2;
                const cellObj = cpu.doMove(depth, board);
                const e = document.getElementById(`${cellObj['rowVal']}-${cellObj['columnVal']}`);
                e.innerHTML = `<span style="font-size:100px; color:white;">${board.getMove(cellObj['rowVal'], cellObj['columnVal'])}</span>`;
            }

            const result2 = judge.judgeResult(board);

            if (result2 !== RESULT.PENNDING) {
                window.alert(result2);
                // e.innerHTML = `<span style="font-size:70px; color:white;">${board.getMove(row, column)}</span>`;
                window.setTimeout(() => {
                    if (result === RESULT.DRAW) {
                        document.getElementById('table').innerHTML = `<p style="font-size:40px;"><span style="color:red;">${judge.judgeResult(board)}</span>だ</p>`;
                    } else {
                        document.getElementById('table').innerHTML = `<p style="font-size:40px;">君の<span style="color:red;">${judge.judgeResult(board)}</span>だ</p>`;
                    }
                }, delayTime);
            }

        } else {
            window.alert('石はすでに置いてある! 他のところを選んで!');
        }
    });

}