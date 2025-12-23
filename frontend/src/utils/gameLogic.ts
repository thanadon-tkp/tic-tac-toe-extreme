// Game logic utilities

export function calculateWinner(board: (string | null)[]): string | null {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  for (const line of lines) {
    const [a, b, c] = line;
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return board[a];
    }
  }

  return null;
}

export function findWinningMove(board: (string | null)[], symbol: string): number | null {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  for (const line of lines) {
    const [a, b, c] = line;
    const values = [board[a], board[b], board[c]];
    const symbolCount = values.filter(v => v === symbol).length;
    const emptyCount = values.filter(v => v === null).length;

    // ถ้ามี 2 ตัวเดียวกันและยังมีช่องว่าง 1 ช่อง
    if (symbolCount === 2 && emptyCount === 1) {
      if (board[a] === null) return a;
      if (board[b] === null) return b;
      if (board[c] === null) return c;
    }
  }

  return null;
}

// Bot AI using smart strategy
export function getBotMove(board: (string | null)[], botIsX: boolean): number | null {
  const botSymbol = botIsX ? "X" : "O";
  const playerSymbol = botIsX ? "O" : "X";

  // 1. ถ้ามีโอกาสชนะ ให้เล่นจบเกม
  const winMove = findWinningMove(board, botSymbol);
  if (winMove !== null) return winMove;

  // 2. ถ้าผู้เล่นกำลังจะชนะ ให้บล็อก
  const blockMove = findWinningMove(board, playerSymbol);
  if (blockMove !== null) return blockMove;

  // 3. เล่นตรงกลาง (index 4) ถ้ายังว่าง
  if (board[4] === null) return 4;

  // 4. เล่นมุม
  const corners = [0, 2, 6, 8];
  const availableCorners = corners.filter(i => board[i] === null);
  if (availableCorners.length > 0) {
    return availableCorners[Math.floor(Math.random() * availableCorners.length)];
  }

  // 5. เล่นตำแหน่งที่เหลือ
  const availableMoves = board
    .map((cell, index) => cell === null ? index : null)
    .filter((index): index is number => index !== null);
  
  if (availableMoves.length > 0) {
    return availableMoves[Math.floor(Math.random() * availableMoves.length)];
  }

  return null;
}
