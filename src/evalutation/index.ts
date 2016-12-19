import { Grid, Row, Column, Diagonal } from '../definitions';
import { getRows, getColumns, getDiagonals } from '../utils';

export function evaluate(grid: Grid): number {
  return evaluateRows(grid) + evaluateColumns(grid) + evaluateDiagonals(grid);
}

function evaluateRows(grid: Grid): number {
  return getRows(grid)
    .map(evaluateCells)
    .reduce((x, y) => x + y, 0);
}

function evaluateColumns(grid: Grid): number {
  return getColumns(grid)
    .map(evaluateCells)
    .reduce((x, y) => x + y, 0);
}

function evaluateDiagonals(grid: Grid): number {
  return getDiagonals(grid)
    .map(evaluateCells)
    .reduce((x, y) => x + y, 0);
}

function evaluateCells(cells: boolean[]): number {
  return 0;
}
