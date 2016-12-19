import { getRows, getColumns, getDiagonals } from '../utils';
import { Grid, Cell } from '../definitions';

export function evaluateRows(grid: Grid): number {
  return getRows(grid)
    .map(evaluateCells)
    .reduce((x, y) => x + y, 0);
}

export function evaluateColumns(grid: Grid): number {
  return getColumns(grid)
    .map(evaluateCells)
    .reduce((x, y) => x + y, 0);
}

export function evaluateDiagonals(grid: Grid): number {
  return getDiagonals(grid)
    .map(evaluateCells)
    .reduce((x, y) => x + y, 0);
}

export function evaluateCells(cells: Cell[]): number {
  return 0;
}
