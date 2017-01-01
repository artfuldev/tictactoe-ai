import { Grid, Cell } from '../definitions';
import { getRows, getColumns, getDiagonals } from '../utils';

function doesAnyArrayHaveAll(cellsArray: Cell[][], value: boolean): boolean {
  return cellsArray.some(cells => cells.every(cell => cell === value));
}

function hasWon(grid: Grid, forX: boolean): boolean {
  return doesAnyArrayHaveAll(getRows(grid), forX)
    || doesAnyArrayHaveAll(getColumns(grid), forX)
    || doesAnyArrayHaveAll(getDiagonals(grid), forX);
}

export function hasXWon(grid: Grid): boolean {
  return hasWon(grid, true);
}

export function hasOWon(grid: Grid): boolean {
  return hasWon(grid, false);
}

export function isDraw(grid: Grid): boolean {
  return grid.filter(cell => cell != undefined).length === grid.length;
}
