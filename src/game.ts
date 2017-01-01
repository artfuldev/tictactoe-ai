import { Grid, Move, Cell } from './definitions';
import { getRows, getColumns, getDiagonals } from './utils';

export function makeMove(grid: Grid, move: Move, forX: (grid: Grid) => boolean): Grid {
  const newValue = forX(grid);
  return grid.map((value, index) => index == move ? newValue : value);
}

function doesAnyArrayHaveAll(cellsArray: Cell[][], value: boolean): boolean {
  return cellsArray.some(cells => cells.every(cell => cell === true));
}

function hasXWon(grid: Grid): boolean {
  return doesAnyArrayHaveAll(getRows(grid), true)
    || doesAnyArrayHaveAll(getColumns(grid), true)
    || doesAnyArrayHaveAll(getDiagonals(grid), true);
}

function hasOWon(grid: Grid): boolean {
  return doesAnyArrayHaveAll(getRows(grid), false)
    || doesAnyArrayHaveAll(getColumns(grid), false)
    || doesAnyArrayHaveAll(getDiagonals(grid), false);
}

function isDraw(grid: Grid): boolean {
  return grid.filter(cell => cell != undefined).length === grid.length;
}

export function hasGameEnded(grid: Grid): boolean {
  return hasXWon(grid) || hasOWon(grid) || isDraw(grid);
}
