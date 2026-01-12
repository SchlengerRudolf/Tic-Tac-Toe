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