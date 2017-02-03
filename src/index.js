import Board from './board.js';
import Cpu from './cpu.js';
import Judge from './judge.js';

const board = new Board(3, 3);
const cpu = new Cpu('cpu', '×', board);
const judge = new Judge(3, 3, 3);

const idArray = ['0-0', '0-1', '0-2', '1-0', '1-1', '1-2', '2-0', '2-1', '2-2'];

for (const id of idArray) {
    const e = document.getElementById(id);
    e.addEventListener('click', () => {
        const rowColumn = id.split('-');
        const row = Number(rowColumn[0]);
        const column = Number(rowColumn[1]);

        const cellMove = board.getMove(row, column);

        if (cellMove === ' ') {
            board.putMove(row, column, '○');

            const result = judge.judgeResult(board);

            if (result === '引き分け') {
                window.alert(result);
                document.getElementById('table').innerHTML = `<p style="font-size:40px;"><span style="color:red;">' ${result} '</span>だ</p>`;
            } else if (result !== '未決') {
                window.alert(result);
                document.getElementById('table').innerHTML = `<p style="font-size:40px;">君の<span style="color:red;"> ${result}</span>だ</p>`;
            } else {
                const depth = 3;
                cpu.doMove(depth, board);
            }

            e.innerHTML = `<span style="font-size:70px; color:white;"> ${board.getMove(row, column)} </span>`;

            const result2 = judge.judgeResult(board);

            if (result === '引き分け') {
                window.alert(result);
                document.getElementById('table').innerHTML = `<p style="font-size:40px;"><span style="color:red;"> ${result2}</span>だ</p>`;
            } else if (result2 !== '未決') {
                window.alert(result2);
                document.getElementById('table').innerHTML = `<p style="font-size:40px;">君の<span style="color:red;"> ${result2}</span>だ</p>`;
            }

        } else {
            window.alert('石はすでに置いてある! 他のところを選んで!');
        }
    });

}


