import Board from './board.js';
import Cpu from './cpu.js';
import Judge from './judge.js';

const board = new Board(3, 3);
const cpu = new Cpu('cpu', '×', board);
const judge = new Judge(3, 3, 3);

let idArray = ['0-0', '0-1', '0-2', '1-0', '1-1', '1-2', '2-0', '2-1', '2-2'];

for (let id of idArray) {


    // if (judge.judgeResult(board) != '未決') { break; };


    let e = document.getElementById(id);
    e.addEventListener('click', () => {
        let rowColumn = id.split('-');
        let row = Number(rowColumn[0]);
        let column = Number(rowColumn[1]);

        let cellMove = board.getMove(row, column);

        if (cellMove === ' ') {
            board.addMove(row, column, '○');

            let result = judge.judgeResult(board);
            console.log('result:' + result);
            if (result !== '未決') {
                window.alert(result);
            }


            e.textContent = board.getMove(row, column);

            let depth = 2;

            cpu.doMove(depth, board);

            let result2 = judge.judgeResult(board);
            console.log('result:' + result2);

            if (result2 !== '未決') {
                window.alert(result2);
            }

        } else {
            window.alert('石はすでに置いてある! 他のところを選んで!');
        }
    });

}


