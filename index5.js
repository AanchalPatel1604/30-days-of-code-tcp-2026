const board = document.getElementById("board");
const statusText = document.getElementById("status");
const restartBtn = document.getElementById("restart");

let cells = Array(9).fill(null);
let currentPlayer = "X";
let gameOver = false;

const WIN_PATTERNS = [
  [0,1,2],[3,4,5],[6,7,8],
  [0,3,6],[1,4,7],[2,5,8],
  [0,4,8],[2,4,6]
];

function createBoard() {
  board.innerHTML = "";
  cells.forEach((_, i) => {
    const cell = document.createElement("div");
    cell.classList.add("cell");
    cell.addEventListener("click", () => makeMove(i, cell));
    board.appendChild(cell);
  });
}

function makeMove(index, cell) {
  if (cells[index] || gameOver) return;

  cells[index] = currentPlayer;
  cell.textContent = currentPlayer;
  cell.classList.add(currentPlayer.toLowerCase());

  if (checkWin()) return;
  if (cells.every(Boolean)) return draw();

  currentPlayer = currentPlayer === "X" ? "O" : "X";
  statusText.textContent = `Player ${currentPlayer}'s Turn`;
}

function checkWin() {
  for (const pattern of WIN_PATTERNS) {
    if (pattern.every(i => cells[i] === currentPlayer)) {
      gameOver = true;
      statusText.textContent = `Player ${currentPlayer} Wins!`;
      statusText.className = currentPlayer === "X" ? "win" : "loss";
      return true;
    }
  }
  return false;
}

function draw() {
  gameOver = true;
  statusText.textContent = "It's a Draw!";
  statusText.className = "draw";
}

restartBtn.addEventListener("click", () => {
  cells = Array(9).fill(null);
  currentPlayer = "X";
  gameOver = false;
  statusText.textContent = "Player X's Turn";
  statusText.className = "";
  createBoard();
});

createBoard();
