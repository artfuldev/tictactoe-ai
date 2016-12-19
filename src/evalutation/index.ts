import { Grid } from '../definitions';
import { evaluateRows, evaluateColumns, evaluateDiagonals } from './helpers';

export function evaluate(grid: Grid): number {
  return evaluateRows(grid) + evaluateColumns(grid) + evaluateDiagonals(grid);
}
