import { Grid, Cell } from '../definitions';
import { getRows, getColumns, getDiagonals } from '../utils';

function doesAnyArrayHaveAll(cellsArray: Cell[][], value: boolean): boolean {
  return cellsArray.some(cells => cells.every(cell => cell === value));
}

export function hasWon(grid: Grid, forX: boolean): boolean {
  return doesAnyArrayHaveAll(getRows(grid), forX)
    || doesAnyArrayHaveAll(getColumns(grid), forX)
    || doesAnyArrayHaveAll(getDiagonals(grid), forX);
}
