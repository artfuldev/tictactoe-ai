export function getMoves(grid: boolean[]): number[] {
  const moves = [];
  for(let i=0; i< grid.length; i++) {
    if(grid[i] == undefined)
      moves.push(i);
  }
  return moves;
}
