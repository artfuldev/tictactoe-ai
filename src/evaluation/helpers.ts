import { getRows, getColumns, getDiagonals } from '../utils';
import { Grid, Cell } from '../definitions';

export const evaluateRows = (grid: Grid) =>
  getRows(grid)
    .map(evaluateCells)
    .reduce((x, y) => x + y, 0);

export const evaluateColumns = (grid: Grid) =>
  getColumns(grid)
    .map(evaluateCells)
    .reduce((x, y) => x + y, 0);

export const evaluateDiagonals = (grid: Grid) =>
  getDiagonals(grid)
    .map(evaluateCells)
    .reduce((x, y) => x + y, 0);

export const evaluateCells = (cells: Cell[]) => {
  const length = cells.length;
  if(length === 0) return 0;
  const initial = { undefined: 0, true: 0, false: 0 };
  const counts = cells.reduce((counts, cell) => increment(counts, cell), initial);
  if (counts.undefined === length) return 0;
  if (counts.true === length) return Infinity;
  if (counts.false === length) return -Infinity;
  if (counts.false === 0) return Math.pow(2, counts.true);
  if (counts.true === 0) return -Math.pow(2, counts.false);
  return 0;
}

const increment = <T>(obj: T, key: any) => {
  const newObj = {} as T;
  for(let prop in obj)
    if(obj.hasOwnProperty(prop))
      newObj[prop] = obj[prop];
  newObj[key+'']++;
  return newObj;
}
