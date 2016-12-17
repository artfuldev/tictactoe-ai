import { Grid, Row, Column, Diagonal } from '../definitions';

export function getRows<T>(grid: T[]): T[][] {
  const size = Math.sqrt(grid.length);
  const copy = grid.concat([]);
  return getArray(size).map(() => copy.splice(0, size));
}

export function getColumns<T>(grid: T[]): T[][] {
  return getRows(transpose(grid));
}

export function getDiagonals(grid: Grid): Diagonal[] {
  // TODO: Make it work
  return [];
}

function getArray(length: number): number[] {
  return Array.apply(null, { length }).map(Number.call, Number);
}

export function transpose<T>(grid: Array<T>): Array<T> {
  const size = Math.sqrt(grid.length);
  return grid.map((x, i) => grid[Math.floor(i / size) + ((i % size) * size)]);
}
