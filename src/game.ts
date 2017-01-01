import { Grid, Move } from './definitions';

export function makeMove(grid: Grid, move: Move, forX: (grid: Grid) => boolean): Grid {
  const newValue = forX(grid);
  return grid.map((value, index) => index == move ? newValue : value);
}

function hasXWon(grid: Grid): boolean {
  return false;
}

function hasOWon(grid: Grid): boolean {
  return false;
}

function isDraw(grid: Grid): boolean {
  return false;
}

export function hasGameEnded(grid: Grid): boolean {
  return hasXWon(grid) || hasOWon(grid) || isDraw(grid);
}
