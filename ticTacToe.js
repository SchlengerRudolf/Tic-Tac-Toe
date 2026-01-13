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

    const clearBoard = () => {
        for (let i = 0; i < row; i++) {
            for (let j = 0; j < column; j++) {
                board[i][j] = 0;
            }
        }
    }

    return { getBoard, setField, clearBoard };
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
    let endGame = false;
    const playerOne = player("Rudi", 1);
    const playerTwo = player("Diego", 2);

    let playersTurn = playerOne;

    const getCurrentPlayer = () => playersTurn;

    const switchTurn = () => {
        playersTurn = playersTurn === playerOne ? playerTwo : playerOne;
    }

    const playRound = (row, column) => {
        if (!endGame) {
            if (!gameBoard.setField(row, column, playersTurn)) return;

            if (roundCounter >= 5 && checkWin(playersTurn)) {
                console.log(playersTurn.getName() + " is the winner!");
                endGame = true;
                return;
            }

            if (roundCounter == 9) {
                console.log("It's a tie!")
                endGame = true;
                return;
            }
            
            switchTurn();
            roundCounter++;
        }
    }
    
    const checkWin = (player) => {
        let isWinner;

        //Check vertical win condition
        for (let i = 0; i < gameBoard.getBoard().length; i++) {
            for (let j = 0; j < gameBoard.getBoard().length; j++) {
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
        for (let i = 0; i < gameBoard.getBoard().length; i++) {
            for (let j = 0; j < gameBoard.getBoard().length; j++) {
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
        for (let i = 0; i < gameBoard.getBoard().length; i++) {
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

    const restartGame = () => {
        gameBoard.clearBoard();
        roundCounter = 1;
        endGame = false;
        playersTurn = playerOne;
    }

    return { playRound, getCurrentPlayer, restartGame };
})();

const display = (function () {
    const container = document.querySelector(".gameboard");
   
    const renderBoard = () => {
        container.innerHTML="";
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
        events();
    }

    const events = () => {
        const fields = container.querySelectorAll(".field");
        const restartBtn = document.querySelector(".restart")
        
        fields[0].addEventListener("click", () => fieldClickFunc(0, 0));
        fields[1].addEventListener("click", () => fieldClickFunc(0, 1));
        fields[2].addEventListener("click", () => fieldClickFunc(0, 2));
        fields[3].addEventListener("click", () => fieldClickFunc(1, 0));
        fields[4].addEventListener("click", () => fieldClickFunc(1, 1));
        fields[5].addEventListener("click", () => fieldClickFunc(1, 2));
        fields[6].addEventListener("click", () => fieldClickFunc(2, 0));
        fields[7].addEventListener("click", () => fieldClickFunc(2, 1));
        fields[8].addEventListener("click", () => fieldClickFunc(2, 2));
        restartBtn.addEventListener("click", () => {
            gameController.restartGame();
            renderBoard();
        });
    }

    function fieldClickFunc (row, column) {
        gameController.playRound(row, column, gameController.getCurrentPlayer());
        renderBoard();
    }

    return { renderBoard };
}());

display.renderBoard();