const boardSize = 8;
let currentPlayer = 'white';
let board = Array(boardSize).fill().map(() => Array(boardSize).fill(null));

// Initialize the starting position
board[3][3] = 'white';
board[4][4] = 'white';
board[3][4] = 'black';
board[4][3] = 'black';
renderBoard();

function renderBoard() {
  const boardElement = document.getElementById('board');
  boardElement.innerHTML = ''; // Clear the board
  
  for (let row = 0; row < boardSize; row++) {
    for (let col = 0; col < boardSize; col++) {
      const cell = document.createElement('div');
      cell.className = 'cell';
      cell.addEventListener('click', () => handleCellClick(row, col));
      if (board[row][col]) {
        const disc = document.createElement('div');
        disc.className = `disc ${board[row][col]}`;
        cell.appendChild(disc);
      }
      boardElement.appendChild(cell);
    }
  }
}

function handleCellClick(row, col) {
  if (isValidMove(row, col)) {
    flipDiscs(row, col);
    currentPlayer = currentPlayer === 'black' ? 'white' : 'black';
    renderBoard();
  } else {
    alert("Invalid move!");
  }
}

function isValidMove(row, col) {
  // Check if the cell is already occupied or out of bounds
  if (row < 0 || col < 0 || row >= boardSize || col >= boardSize || board[row][col]) return false;
  
  return directions.some(([dRow, dCol]) => hasOpponentDiscsInDirection(row, col, dRow, dCol));
}

function hasOpponentDiscsInDirection(row, col, dRow, dCol) {
  let foundOpponent = false;
  
  for (let step = 1; step < boardSize; step++) {
    const [nextRow, nextCol] = [row + dRow * step, col + dCol * step];
    
    if (nextRow < 0 || nextCol < 0 || nextRow >= boardSize || nextCol >= boardSize) break;
    
    const nextCell = board[nextRow][nextCol];
    
    if (!nextCell) break;
    if (nextCell !== currentPlayer) foundOpponent = true;
    if (nextCell === currentPlayer) return foundOpponent;
  }
  
  return false;
}

function flipDiscs(row, col) {
  board[row][col] = currentPlayer;
  
  directions.forEach(([dRow, dCol]) => {
    if (hasOpponentDiscsInDirection(row, col, dRow, dCol)) {
      for (let step = 1; step < boardSize; step++) {
        const [nextRow, nextCol] = [row + dRow * step, col + dCol * step];
        
        if (board[nextRow][nextCol] === currentPlayer) break;
        
        board[nextRow][nextCol] = currentPlayer;
      }
    }
  });
}

// Possible directions to check
const directions = [
  [0, 1], [1, 0], [0, -1], [-1, 0], // Horizontal and vertical
  [1, 1], [1, -1], [-1, 1], [-1, -1] // Diagonal
];





