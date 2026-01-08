function gameBoard() {
const row = 3;
const column = 3;
const board = [];

for (let i = 0; i < row; i++) {
    board[i] = [];
    for (let j = 0; j < column; j++) {
        board[i].push(field();)
    }
}

}

function field() {
    value = 0;

    const fillField = (player) => {
        value = player;
    }
    
    const getValue = () => value;

    return { fillField, getValue };
}

function player() {

}

function gameController() {

}