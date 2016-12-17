import { Grid, Row, Column, Diagonal } from '../definitions';

export function getRows(grid: Grid): Row[] {
  const length = Math.sqrt(grid.length);
  const copy = grid.concat([]);
  return getArray(length).map(() => copy.splice(0, length));
}

export function getColumns(grid: Grid): Column[] {
  return getRows(transpose(grid));
}

export function getDiagonals(grid: Grid): Diagonal[] {
  // TODO: Make it work
  return [];
}

function getArray(length: number) {
  return Array.apply(null, { length }).map(Number.call, Number);
}

export function transpose<T>(grid: Array<T>): Array<T> {
  const size = Math.sqrt(grid.length);
  return grid.map((x, i) => grid[Math.floor(i / size) + ((i % size) * size)]);
}
