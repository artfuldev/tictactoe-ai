import { Grid, Move } from './definitions';

export function makeMove(grid: Grid, move: Move, forX: (grid: Grid) => boolean): Grid {
  const newValue = forX(grid);
  return grid.map((value, index) => index == move ? newValue : value);
}

export function hasGameEnded(grid: Grid): boolean {
  // TODO: complete
  return false;
}
