import { Grid, Move } from '../definitions';
import { hasWon } from './helpers';

export const nextValue = (grid: Grid) =>
  grid.filter(cell => cell != undefined).length % 2 == 0;

export const makeMove = (grid: Grid, move: Move, forX: (grid: Grid) => boolean) => {
  const newValue = forX(grid);
  return grid.map((value, index) => index == move ? newValue : value);
}

export const hasXWon = (grid: Grid) => hasWon(grid, true);
export const hasOWon = (grid: Grid) => hasWon(grid, false);
export const isFull = (grid: Grid) => grid.every(cell => cell != undefined);
export const hasGameEnded = (grid: Grid) =>
  hasXWon(grid) || hasOWon(grid) || isFull(grid);
