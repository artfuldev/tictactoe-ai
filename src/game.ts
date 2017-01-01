import { Grid, Move, Cell } from './definitions';
import { getRows, getColumns, getDiagonals } from './utils';

export function makeMove(grid: Grid, move: Move, forX: (grid: Grid) => boolean): Grid {
  const newValue = forX(grid);
  return grid.map((value, index) => index == move ? newValue : value);
}

function doesAnyArrayHaveAll(cellsArray: Cell[][], value: boolean): boolean {
  return cellsArray.some(cells => cells.every(cell => cell === value));
}

function hasWon(grid: Grid, forX: boolean) : boolean {
  return doesAnyArrayHaveAll(getRows(grid), forX)
    || doesAnyArrayHaveAll(getColumns(grid), forX)
    || doesAnyArrayHaveAll(getDiagonals(grid), forX);
}

function hasXWon(grid: Grid): boolean {
  return hasWon(grid, true);
}

function hasOWon(grid: Grid): boolean {
  return hasWon(grid, false);
}

function isDraw(grid: Grid): boolean {
  return grid.filter(cell => cell != undefined).length === grid.length;
}

export function hasGameEnded(grid: Grid): boolean {
  return hasXWon(grid) || hasOWon(grid) || isDraw(grid);
}
