export function getMoves(grid: boolean[]): number[] {
  var moves = [];
  for(let i=0; i< grid.length; i++) {
    if(grid[i] == undefined)
      moves.push(i);
  }
  return moves;
}
