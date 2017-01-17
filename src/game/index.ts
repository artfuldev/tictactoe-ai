import { Grid, Move } from '../definitions';
import { hasWon } from './helpers';

export function nextValue(grid: Grid): boolean {
  return grid.filter(cell => cell != undefined).length % 2 == 0;
}

export function makeMove(grid: Grid, move: Move, forX: (grid: Grid) => boolean): Grid {
  const newValue = forX(grid);
  return grid.map((value, index) => index == move ? newValue : value);
}

export function hasGameEnded(grid: Grid): boolean {
  return hasXWon(grid) || hasOWon(grid) || isFull(grid);
}

export function hasXWon(grid: Grid): boolean {
  return hasWon(grid, true);
}

export function hasOWon(grid: Grid): boolean {
  return hasWon(grid, false);
}

export function isFull(grid: Grid): boolean {
  return grid.every(cell => cell != undefined);
}
