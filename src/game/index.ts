import { Grid, Move } from '../definitions';
import { hasXWon, hasOWon, isDraw } from './helpers';

export function nextValue(grid: Grid): boolean {
  return grid.filter(cell => cell != undefined).length % 2 == 0;
}

export function makeMove(grid: Grid, move: Move, forX: (grid: Grid) => boolean): Grid {
  const newValue = forX(grid);
  return grid.map((value, index) => index == move ? newValue : value);
}

export function hasGameEnded(grid: Grid): boolean {
  return hasXWon(grid) || hasOWon(grid) || isDraw(grid);
}
