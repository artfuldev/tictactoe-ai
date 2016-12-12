export function makeMove(grid: boolean[], move: number, forX: boolean): boolean[] {
  return grid.map((value, index) => index == move ? forX : value);
}
