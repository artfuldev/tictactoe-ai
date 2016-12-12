import { getMoves } from './moves';

export function getBestMove(grid: boolean[], forX: boolean, depth?: number): number {
  if (depth == undefined)
    depth = grid.length;
  var moves = getMoves(grid);
  // Return a random available move
  return moves[Math.floor(Math.random() * moves.length)];
}
