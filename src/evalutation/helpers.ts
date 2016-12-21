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

export function increment<T>(obj: T, key: any): T {
  const newObj = {} as T;
  for(let prop in obj)
    if(obj.hasOwnProperty(prop))
      newObj[prop] = obj[prop];
  newObj[key+'']++;
  return newObj;
}
