import { Grid, Move } from './definitions';

export function makeMove(grid: Grid, move: Move, forX: boolean): Grid {
  return grid.map((value, index) => index == move ? forX : value);
}
