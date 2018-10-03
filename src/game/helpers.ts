import { Grid, Cell } from '../definitions';
import { getRows, getColumns, getDiagonals } from '../utils';

const doesAnyArrayHaveAll = (cellsArray: Cell[][], value: boolean) =>
  cellsArray.some(cells => cells.every(cell => cell === value));

export const hasWon = (grid: Grid, forX: boolean) =>
  doesAnyArrayHaveAll(getRows(grid), forX)
    || doesAnyArrayHaveAll(getColumns(grid), forX)
    || doesAnyArrayHaveAll(getDiagonals(grid), forX);
