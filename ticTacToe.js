function gameBoard() {
    const row = 3;
    const column = 3;
    const board = [];

    for (let i = 0; i < row; i++) {
        board[i] = [];
        for (let j = 0; j < column; j++) {
            board[i].push(field());
        }
    }

    const getBoard = () => board;

    const setBoard = (row, column, player) => {
        if (board[row][column].getValue() === 0) {
            board[row][column].setValue(player);
            console.log(board[row][column].getValue());
        }
        return;
    }

    return { getBoard, setBoard };
}

function field() {
    value = 0;

    const setValue = (player) => {
        value = player;
    }
    
    const getValue = () => value;

    return { setValue, getValue };
}

function player(name) {
    const playerName = name;

    const getName = () => playerName;

    return { getName };
}

function gameController() {

}

const game = gameBoard();
const playerOne = player("Rudi");
game.setBoard(0, 0, playerOne);