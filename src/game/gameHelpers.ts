import { GamePiece, Player, TILE_COLOR } from '../redux/slices/gameSlice';

export function makeEmptyGrid(rows: number, cols: number): null[][] {
  return Array.from(Array(rows), () => Array.from(Array(cols), () => null));
}

export function makeGrid(rows: number, cols: number, pieces: GamePiece[] = []): GamePiece[][] {
  const board: GamePiece[][] = makeEmptyGrid(rows, cols);
  pieces.forEach((piece) => {
    board[piece.row][piece.col] = piece;
  });
  return board;
}

export function mFillGrid(board: GamePiece[][], pieces: GamePiece[]): GamePiece[][] {
  pieces.forEach((piece) => {
    board[piece.row][piece.col] = piece;
  });
  return board;
}

export function fillGrid(board: GamePiece[][], pieces: GamePiece[]): GamePiece[][] {
  const oldPieces = board.flatMap((row) => row.filter((tile) => tile !== null));
  const newBoard = makeGrid(board.length, board[0].length, oldPieces);
  mFillGrid(newBoard, pieces);
  return newBoard;
}

export function clearAvailablePieces(board: GamePiece[][]): GamePiece[][] {
  const placedPieces = board.flatMap((row) => row.filter((tile) => tile !== null && tile.type !== TILE_COLOR.AVAILABLE));
  const newBoard = makeGrid(board.length, board[0].length, placedPieces);
  return newBoard;
}

export function getPieces(board: GamePiece[][], player: Player): GamePiece[] {
  return board.flatMap((row) => row.filter((col) => col?.type === player));
}

// recursively search in direction from original tile, looking for null after any amount of other color
function searchDirection(board: GamePiece[][], row: number, col: number, [dirR, dirC]: [number, number], origColor: Player): GamePiece | null {
  const rows = board.length;
  const cols = board[0]?.length;
  const newRow = row + dirR;
  const newCol = col + dirC;
  if (newRow < 0 || newCol < 0 || newRow >= rows || newCol >= cols) return null;

  const tile = board[newRow][newCol];
  if (tile === null) return { row: newRow, col: newCol, type: TILE_COLOR.AVAILABLE };
  if (tile.type !== origColor) return searchDirection(board, newRow, newCol, [dirR, dirC], origColor);
  return null;
}

// search all (valid) tiles around a specified piece on the board
function searchAroundTile(board: GamePiece[][], row: number, col: number, origColor: Player): GamePiece[] {
  const rows = board.length;
  const cols = board[0]?.length;

  if (row < 0 || col < 0 || row >= rows || col >= cols) return null;

  const matchedTiles: GamePiece[] = [];
  for (let r = Math.max(row - 1, 0); r <= Math.min(row + 1, rows - 1); r++) {
    for (let c = Math.max(col - 1, 0); c <= Math.min(col + 1, cols - 1); c++) {
      if (r === row && c === col) continue;
      const foundTile = searchDirection(board, row, col, [r - row, c - col], origColor);
      // tiles cannot be adjacent to the original tile (distance must be > 1)
      if (foundTile && (Math.abs(foundTile.row - row) > 1 || Math.abs(foundTile.col - col) > 1)) matchedTiles.push(foundTile);
    }
  }

  return matchedTiles.filter(Boolean);
}

export function getValidPieces(board: GamePiece[][], turn: Player): GamePiece[] {
  const pieces = getPieces(board, turn);

  // get all valid pieces, then get unique pieces from that set
  const validPieces = pieces.flatMap((p) => searchAroundTile(board, p.row, p.col, turn));

  return [...new Map(validPieces.map((p) => [`${p.row}x${p.col}`, p])).values()];
}

type Score = Record<Player, number>

export function getScore(board: GamePiece[][]): Score {
  return board.reduce(
    (out, row) =>
      row.reduce((acc, tile) => (tile && tile.type !== TILE_COLOR.AVAILABLE
        ? { ...acc, [tile.type]: acc[tile.type] + 1 }
        : acc), out),
    { 0: 0, 1: 0 },
  );
}

export function defaultStartingPieces(rows: number, cols: number): GamePiece[] {
  return [
    {
      row: Math.floor(rows / 2) - 1,
      col: Math.floor(cols / 2) - 1,
      type: TILE_COLOR.BLACK,
    },
    {
      row: Math.floor(rows / 2) - 1,
      col: Math.floor(cols / 2),
      type: TILE_COLOR.WHITE,
    },
    {
      row: Math.floor(rows / 2),
      col: Math.floor(cols / 2) - 1,
      type: TILE_COLOR.WHITE,
    },
    {
      row: Math.floor(rows / 2),
      col: Math.floor(cols / 2),
      type: TILE_COLOR.BLACK,
    },
  ];
}

export const getTileColor = (turn: number, startingPlayer: Player): Player => (turn % 2) - startingPlayer;
