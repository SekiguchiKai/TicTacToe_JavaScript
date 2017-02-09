"use strict";
var board_1 = require("./board");
var cpu_1 = require("./cpu");
var judge_1 = require("./judge");
// const rowSize = 3;
// const columnSize = 3;
// const judgeCriteriaSequence = 3;
exports.RESULT = {
    WIN: '勝ち',
    LOSE: '負け',
    DRAW: '引き分け',
    PENNDING: '未決'
};
exports.MOVE = {
    CIRCLE: '○',
    CROSS: '×',
    EMPTY: ' '
};
var board = new board_1.default();
var cpu = new cpu_1.default();
var judge = new judge_1.default();
var idArray = ['0-0', '0-1', '0-2', '1-0', '1-1', '1-2', '2-0', '2-1', '2-2'];
var _loop_1 = function (id) {
    var e = document.getElementById(id);
    e.addEventListener('click', function () {
        var rowColumn = id.split('-');
        var firstIdx = 0;
        var secondIdx = 1;
        var row = Number(rowColumn[firstIdx]);
        var column = Number(rowColumn[secondIdx]);
        var cellMove = board.getMove(row, column);
        if (cellMove === exports.MOVE.EMPTY) {
            board.putMove(row, column, exports.MOVE.CIRCLE);
            e.innerHTML = "<span style=\"font-size:70px; color:white;\">" + board.getMove(row, column) + "</span>";
            var result = judge.judgeResult(board);
            var changeElemnt = function (result) {
                if (result === exports.RESULT.DRAW) {
                    document.getElementById('table').innerHTML = "<p style=\"font-size:40px;\"><span style=\"color:red;\">" + result + "</span>\u3060</p>";
                }
                else {
                    document.getElementById('table').innerHTML = "<p style=\"font-size:40px;\">\u541B\u306E<span style=\"color:red;\">" + result + "</span>\u3060</p>";
                }
            };
            var delayTime = 1000;
            if (result === exports.RESULT.PENNDING) {
                var depth = 3;
                var cellObj = cpu.doMove(depth, board);
                var e_1 = document.getElementById(cellObj['rowVal'] + "-" + cellObj['columnVal']);
                e_1.innerHTML = "<span style=\"font-size:100px; color:white;\">" + board.getMove(cellObj['rowVal'], cellObj['columnVal']) + "</span>";
            }
            var result2 = judge.judgeResult(board);
            if (result2 !== exports.RESULT.PENNDING) {
                window.alert(result2);
                e.innerHTML = "<span style=\"font-size:70px; color:white;\">" + board.getMove(row, column) + "</span>";
                setTimeout(changeElemnt(result2), delayTime);
            }
        }
        else {
            window.alert('石はすでに置いてある! 他のところを選んで!');
        }
    });
};
for (var _i = 0, idArray_1 = idArray; _i < idArray_1.length; _i++) {
    var id = idArray_1[_i];
    _loop_1(id);
}
