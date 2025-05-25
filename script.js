const boardElement = document.getElementById('board');
const cells = document.querySelectorAll('.cell');
const statusText = document.getElementById('statusText');
const resetBtn = document.getElementById('resetBtn');
const singlePlayerBtn = document.getElementById('singlePlayerBtn');
const dualPlayerBtn = document.getElementById('dualPlayerBtn');
const modeSelectionDiv = document.getElementById('modeSelection');
const gameAreaDiv = document.getElementById('gameArea');

let board = ['', '', '', '', '', '', '', '', ''];
let currentPlayer = 'X';
let gameActive = false;
let gameMode = null; 
let humanPlayer = 'X'; // Will be set based on user choice
let aiPlayer = 'O';   // Will be set based on user choice

const winningConditions = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6]
];

function handleCellClick(event) {
    const clickedCell = event.target;
    const clickedCellIndex = parseInt(clickedCell.getAttribute('data-index'));

    if (board[clickedCellIndex] !== '' || !gameActive) {
        return;
    }

    makeMove(clickedCellIndex, currentPlayer);

    if (checkWin(board, currentPlayer)) {
        endGame(false);
        return;
    }
    if (board.every(cell => cell !== '')) {
        endGame(true);
        return;
    }

    switchPlayer();

    if (gameMode === 'single' && currentPlayer === aiPlayer && gameActive) {
        setTimeout(aiMove, 500);
    }
}

function makeMove(index, player) {
    board[index] = player;
    cells[index].textContent = player;
    cells[index].classList.add(player);
}

function switchPlayer() {
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    statusText.textContent = gameActive ? `${currentPlayer === humanPlayer ? 'Your' : "AI's"} turn (${currentPlayer})` : statusText.textContent;
    if (gameMode === 'single' && currentPlayer === aiPlayer && gameActive) { // Check added here as well for AI starting
        statusText.textContent = `AI's turn (${aiPlayer})`;
    } else if (gameMode === 'single' && currentPlayer === humanPlayer && gameActive) {
        statusText.textContent = `Your turn (${humanPlayer})`;
    } else if (gameMode === 'dual') {
        statusText.textContent = `Player ${currentPlayer}'s turn`;
    }
}

function checkWin(currentBoard, player) {
    return winningConditions.some(condition => {
        return condition.every(index => currentBoard[index] === player);
    });
}

function endGame(draw) {
    gameActive = false;
    if (draw) {
        statusText.textContent = "It's a Draw!";
    } else {
        if (gameMode === 'single') {
            statusText.textContent = (currentPlayer === humanPlayer) ? "You Win!" : "AI Wins!";
        } else {
            statusText.textContent = `Player ${currentPlayer} Wins!`;
        }
    }
}

function resetGame() {
    board = ['', '', '', '', '', '', '', '', ''];
    gameActive = false;
    currentPlayer = 'X';
    cells.forEach(cell => {
        cell.textContent = '';
        cell.classList.remove('X');
        cell.classList.remove('O');
    });
    statusText.textContent = "";
    modeSelectionDiv.classList.remove('hidden');
    gameAreaDiv.classList.add('hidden');
    gameMode = null;
    // Ensure radio button default is checked if needed, though HTML default is usually fine
    document.querySelector('input[name="playerSymbolChoice"][value="X"]').checked = true;
}

function startGame(mode) {
    gameMode = mode;
    gameActive = true;
    currentPlayer = 'X'; // X always starts

    if (gameMode === 'single') {
        const playerChoice = document.querySelector('input[name="playerSymbolChoice"]:checked').value;
        if (playerChoice === 'X') {
            humanPlayer = 'X';
            aiPlayer = 'O';
            statusText.textContent = `Your turn (${humanPlayer})`;
        } else {
            humanPlayer = 'O';
            aiPlayer = 'X';
            statusText.textContent = `AI's turn (${aiPlayer})`;
        }
    } else { // Dual player
        humanPlayer = 'X'; // Not strictly necessary for dual, but good for consistency
        aiPlayer = 'O';   // Not strictly necessary for dual
        statusText.textContent = `Player ${currentPlayer}'s turn`;
    }
    
    modeSelectionDiv.classList.add('hidden');
    gameAreaDiv.classList.remove('hidden');
    
    if (gameMode === 'single' && currentPlayer === aiPlayer) {
       setTimeout(aiMove, 500);
    }
}

function aiMove() {
    if (!gameActive) return;
    let bestScore = -Infinity;
    let move;
    for (let i = 0; i < board.length; i++) {
        if (board[i] === '') {
            board[i] = aiPlayer;
            let score = minimax(board, 0, false);
            board[i] = '';
            if (score > bestScore) {
                bestScore = score;
                move = i;
            }
        }
    }
    
    if (move !== undefined) {
        makeMove(move, aiPlayer);
        if (checkWin(board, aiPlayer)) {
            endGame(false);
            return;
        }
        if (board.every(cell => cell !== '')) {
            endGame(true);
            return;
        }
        switchPlayer(); // AI made a move, now switch to human
    }
}

function minimax(currentBoard, depth, isMaximizing) {
    if (checkWin(currentBoard, aiPlayer)) return 10 - depth;
    if (checkWin(currentBoard, humanPlayer)) return -10 + depth;
    if (currentBoard.every(cell => cell !== '')) return 0;

    if (isMaximizing) {
        let bestScore = -Infinity;
        for (let i = 0; i < currentBoard.length; i++) {
            if (currentBoard[i] === '') {
                currentBoard[i] = aiPlayer;
                let score = minimax(currentBoard, depth + 1, false);
                currentBoard[i] = '';
                bestScore = Math.max(score, bestScore);
            }
        }
        return bestScore;
    } else {
        let bestScore = Infinity;
        for (let i = 0; i < currentBoard.length; i++) {
            if (currentBoard[i] === '') {
                currentBoard[i] = humanPlayer;
                let score = minimax(currentBoard, depth + 1, true);
                currentBoard[i] = '';
                bestScore = Math.min(score, bestScore);
            }
        }
        return bestScore;
    }
}

cells.forEach(cell => cell.addEventListener('click', handleCellClick));
resetBtn.addEventListener('click', resetGame);
singlePlayerBtn.addEventListener('click', () => {
    startGame('single');
});
dualPlayerBtn.addEventListener('click', () => startGame('dual'));

resetGame();