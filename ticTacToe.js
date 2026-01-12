const gameBoard = (function () {
    const row = 3;
    const column = 3;
    const board = [];

    for (let i = 0; i < row; i++) {
        board[i] = [];
        for (let j = 0; j < column; j++) {
            board[i].push(0);
        }
    }

    const getBoard = () => board;

    const setField = (row, column, player) => {
        if (board[row][column] === 0) {
            board[row][column] = player;

            return true;
        }
        return false;
    };

    return { getBoard, setField };
})();

function player(name) {
    const playerName = name;

    const getName = () => playerName;

    return { getName };
}

const gameController = (function () {
    const playerOne = player("Rudi").getName();
    const playerTwo = player("Diego").getName();

    let playersTurn = playerOne;

    const switchTurn = function () {
        playersTurn = playersTurn === playerOne ? playerTwo : playerOne;
    }

    const playRound = function (row, column) {
        let validTurn = false;
        console.log(validTurn);

        while (!validTurn) {
            validTurn = gameBoard.setField(row, column, playersTurn);
            console.log(validTurn);
        }

        switchTurn();
    }

    return { playRound };
})();

gameController.playRound(0, 0);
gameController.playRound(1, 1);
gameController.playRound(2, 2);
console.log(gameBoard.getBoard())