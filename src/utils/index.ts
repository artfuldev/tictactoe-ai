import { transpose } from './helpers';

const getArray = (length: number): number[] =>
  Array.apply(null, { length }).map(Number.call, Number);

export const getRows = <T>(grid: T[]): T[][] => {
  const size = Math.sqrt(grid.length);
  const copy = grid.concat([]);
  return getArray(size).map(() => copy.splice(0, size));
};

export const getColumns = <T>(grid: T[]): T[][] => getRows(transpose(grid));

export const getDiagonals = <T>(grid: T[]): T[][] => {
  const size = Math.sqrt(grid.length);
  const lesser = size - 1;
  const last = grid.length - 1;
  return [
    grid.filter((_, i) => Math.floor(i / size) === i % size),
    grid.filter((_, i) => i > 0 && i < last && i % lesser === 0)
  ];
};
