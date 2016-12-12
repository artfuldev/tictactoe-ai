export function getMoves(grid: boolean[]): number[] {
  return grid
          .map((value, index) => value == undefined ? index : undefined)
          .filter(value => value != undefined);
}
