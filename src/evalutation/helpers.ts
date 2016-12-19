import { getRows, getColumns, getDiagonals } from '../utils';
import { Grid } from '../definitions';

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

export function evaluateCells(cells: boolean[]): number {
  return 0;
}
