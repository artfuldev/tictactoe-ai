import { Grid } from '../definitions';
import { evaluateRows, evaluateColumns, evaluateDiagonals } from './helpers';

export const evaluate = (grid: Grid) =>
  evaluateRows(grid) + evaluateColumns(grid) + evaluateDiagonals(grid);
