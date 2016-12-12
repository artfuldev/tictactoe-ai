export function getBestMove(grid: boolean[], forX: boolean, depth?: number): number {
  if (depth == undefined)
    depth = Math.sqrt(grid.length);
  return Math.floor(Math.random() * grid.length);
}
