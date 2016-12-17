import { transpose } from './helpers';

function getArray(length: number): number[] {
  return Array.apply(null, { length }).map(Number.call, Number);
}

export function getRows<T>(grid: T[]): T[][] {
  const size = Math.sqrt(grid.length);
  const copy = grid.concat([]);
  return getArray(size).map(() => copy.splice(0, size));
}

export function getColumns<T>(grid: T[]): T[][] {
  return getRows(transpose(grid));
}

export function getDiagonals<T>(grid: T[]): T[][] {
  const size = Math.sqrt(grid.length);
  const lesser = size - 1;
  const last = grid.length - 1;
  return [
    grid.filter((x, i) => Math.floor(i / size) === i % size),
    grid.filter((x, i) => i > 0 && i < last && i % lesser === 0)
  ];
}
