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

function player(name, id) {
    const playerName = name;
    const playerId = id;

    const getName = () => playerName;
    const getId = () => playerId;

    return { getName, getId };
}

const gameController = (function () {
    let roundCounter = 1;
    const playerOne = player("Rudi", 1);
    const playerTwo = player("Diego", 2);

    let playersTurn = playerOne;

    const switchTurn = () => {
        playersTurn = playersTurn === playerOne ? playerTwo : playerOne;
    }

    const playRound = (row, column) => {
    
        if (!gameBoard.setField(row, column, playersTurn)) return;

        if (roundCounter >= 5 && checkWin(playersTurn)) {
            console.log(playersTurn + " is the winner!");
            return;
        }
        if (roundCounter == 9) {
            console.log("It's a tie!")
            return;
        }
        switchTurn();
        roundCounter++;
    }
    
    const checkWin = (player) => {
        let isWinner;

        //Check vertical win condition
        for (let i = 0; i < gameBoard.getBoard.length; i++) {
            for (let j = 0; j < gameBoard.getBoard.length; j++) {
                if (player !== gameBoard.getBoard()[i][j]) {
                    isWinner = false;
                    break;
                }
                else {
                    isWinner = true;
                }
            }
            if (isWinner) return true;
        }

        //Check horizontal win condition
        for (let i = 0; i < gameBoard.getBoard.length; i++) {
            for (let j = 0; j < gameBoard.getBoard.length; j++) {
                if (player !== gameBoard.getBoard()[j][i]) {
                    isWinner = false;
                    break;
                }
                else {
                    isWinner = true;
                }
            }
            if (isWinner) return true;
        }

        //Check top-left diagonal win condition
        for (let i = 0; i < gameBoard.getBoard.length; i++) {
            if (player !== gameBoard.getBoard()[i][i]) {
                isWinner = false;
                break;
            }
            isWinner = true;
        }
        if (isWinner) return true;

        //Check top-right diagonal win condition
        for (let i = 2; i >= 0; i--) {
                if (player !== gameBoard.getBoard()[i][2 - i]) {
                    return false;
                }
        }
        return true;
    }

    return { playRound };
})();

const display = (function () {
    const container = document.querySelector(".gameboard");
   
    const renderBoard = () => {
        for (const arr of gameBoard.getBoard()) {
            for (const val of arr) {
                const field = document.createElement("div");

                if (val !== 0) {
                    const player = val.getId() === 1 ? "playerOne" : "playerTwo";
                    const marker = val.getId() === 1 ? "X" : "O";
                    field.classList.add(player);
                    field.textContent = marker;
                }
                
                field.classList.add("field");
                container.appendChild(field);
            }
        }
    }

    return { renderBoard };
}());

gameController.playRound(0,0);
gameController.playRound(1,1);
gameController.playRound(2,2);
gameController.playRound(2,1);
gameController.playRound(0,1);
gameController.playRound(0,2);
gameController.playRound(2,0);
gameController.playRound(1,0);
gameController.playRound(1,2);

display.renderBoard();
console.log(gameBoard.getBoard());