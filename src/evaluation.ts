import { Grid } from './definitions';

export function evaluate(grid: Grid): number {
  return evaluateRows(grid) + evaluateColumns(grid) + evaluateDiagonals(grid);
}

function evaluateRows(grid: Grid): number {
  return 0;
}

function evaluateColumns(grid: Grid): number {
  return 0;
}

function evaluateDiagonals(grid: Grid): number {
  return 0;
}
