const X_TEXT = "X";
const O_TEXT = "O";
let currentPlayer = X_TEXT;
let spaces = Array(9).fill(null);
let gameEnded = false;

const winningComb = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

function startGame() {
    boxes.forEach(box => box.addEventListener('click', boxClick));
}

function boxClick(e) {
    if (gameEnded) return; 

    const id = e.target.id;

    if (!spaces[id]) {
        spaces[id] = currentPlayer;
        e.target.innerText = currentPlayer;

        if (playerHasWon(currentPlayer)) {
            playerText.innerHTML = `${currentPlayer} WON!`;
            gameEnded = true;
            return;
        }

        if (!isBoardFull()) {
            currentPlayer = currentPlayer === X_TEXT ? O_TEXT : X_TEXT;
        } else {
            playerText.innerHTML = "DRAW!";
            gameEnded = true;
        }
    }
}

function playerHasWon(player) {
    for (const combo of winningComb) {
        const [a, b, c] = combo;
        if (spaces[a] === player && spaces[b] === player && spaces[c] === player) {
            return true;
        }
    }
    return false;
}

function isBoardFull() {
    return spaces.every(space => space !== null);
}

function restart() {
    spaces.fill(null);
    boxes.forEach(box => {
        box.innerText = '';
        box.style.backgroundColor = '';
    });
    playerText.innerHTML = 'Tic Tac Toe';
    currentPlayer = X_TEXT;
    gameEnded = false;
}

const playerText = document.getElementById('player');
const restartBtn = document.getElementById('restart');
const boxes = Array.from(document.getElementsByClassName('box'));

restartBtn.addEventListener('click', restart);
startGame();
