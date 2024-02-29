const board = document.getElementById('board');
let currentPlayer = 'X';
let boardSize = 3; // Default board size
let cells = Array.from({ length: boardSize * boardSize });

function render() {
    // @ts-ignore
    board.innerHTML = '';
    // @ts-ignore
    board.style.gridTemplateColumns = `repeat(${boardSize}, 100px)`;
    cells.forEach((value, index) => {
        const cell = document.createElement('div');
        cell.classList.add('cell');
        cell.textContent = value || '';
        cell.addEventListener('click', () => handleCellClick(index));
        // @ts-ignore
        board.appendChild(cell);
    });
}

function handleCellClick(index) {
    if (cells[index] || checkWinner()) return;
    cells[index] = currentPlayer;
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    render();
    const winner = checkWinner();
    if (winner) {
        setTimeout(() => {
            if (winner === 'X') {
                alert("Player 1 wins!");
            } else if (winner === 'O') {
                alert("Player 2 wins!");
            } else {
                alert('It\'s a tie!');
            }
        }, 100);
    }
}

function checkWinner() {
    const winningCombinations = getWinningCombinations();
    for (const combination of winningCombinations) {
        const [a, b, c] = combination;
        if (cells[a] && cells[a] === cells[b] && cells[a] === cells[c]) {
            return cells[a];
        }
    }
    if (cells.every(cell => cell)) {
        return 'Tie';
    }
    return null;
}

function getWinningCombinations() {
    const combinations = [];
    // Rows
    for (let i = 0; i < boardSize; i++) {
        for (let j = 0; j <= boardSize - 3; j++) {
            combinations.push(Array.from({ length: 3 }, (_, k) => i * boardSize + j + k));
        }
    }
    // Columns
    for (let i = 0; i < boardSize; i++) {
        for (let j = 0; j <= boardSize - 3; j++) {
            combinations.push(Array.from({ length: 3 }, (_, k) => (j + k) * boardSize + i));
        }
    }
    // Diagonals
    for (let i = 0; i <= boardSize - 3; i++) {
        for (let j = 0; j <= boardSize - 3; j++) {
            combinations.push(Array.from({ length: 3 }, (_, k) => (i + k) * boardSize + j + k));
            combinations.push(Array.from({ length: 3 }, (_, k) => (i + k) * boardSize + (boardSize - j - 1 - k)));
        }
    }
    return combinations;
}

// Example: Change the board size
function changeBoardSize(size) {
    boardSize = size;
    cells = Array.from({ length: boardSize * boardSize });
    render();
}

render();
