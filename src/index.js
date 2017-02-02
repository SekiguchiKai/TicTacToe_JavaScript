import Board from './board.js';
import Cpu from './cpu.js';
import Judge from './judge.js';

const board = new Board(3, 3);
const cpu = new Cpu('cpu', '×', board);
const judge = new Judge(3, 3, 3);

let idArray = ['0-0', '0-1', '0-2', '1-0', '1-1', '1-2', '2-0', '2-1', '2-2'];


for (let id of idArray) {
    let e = document.getElementById(id);
    e.addEventListener('click', () => {
        let rowColumn = id.split('-');
        let row = Number(rowColumn[0]);
        let column = Number(rowColumn[1]);

        board.addMove(row, column, '○');
        e.textContent = board.getMove(row, column);

        let depth = 2;

        cpu.doMove(depth, board);

        judge.judgeResult(board);


    });

}



