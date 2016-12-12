import { Grid, Move } from './definitions';

export function getMoves(grid: Grid): Move[] {
  return grid
          .map((value, index) => value == undefined ? index : undefined)
          .filter(value => value != undefined);
}
