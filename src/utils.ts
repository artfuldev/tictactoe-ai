import { Grid, Row, Column, Diagonal } from './definitions';

export function getRows(grid: Grid): Row[] {
  const length = Math.sqrt(grid.length);
  const copy = grid.concat([]);
  return getArray(length).map(() => copy.splice(0, length));
}

export function getColumns(grid: Grid): Column[] {
  // TODO: Make it work
  return [];
}

export function getDiagonals(grid: Grid): Diagonal[] {
  // TODO: Make it work
  return [];
}

function getArray(length: number) {
  return Array.apply(null, { length }).map(Number.call, Number);
}
