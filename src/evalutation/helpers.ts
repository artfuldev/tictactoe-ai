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
  if(cells.every(x => x == undefined)) return 0;
  if(cells.every(x => x === true)) return Infinity;
  if(cells.every(x => x === false)) return -Infinity;
  if(cells.every(x => x === true || x == undefined)) return Math.pow(2,cells.filter(x => x === true).length);
  if(cells.every(x => x === false || x == undefined)) return -Math.pow(2,cells.filter(x => x === false).length);
  return 0;
}
