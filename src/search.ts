import { getMoves } from './moves';
import { evaluate } from './evaluation';
import { makeMove } from './game';
import { Grid, Move } from './definitions';

export function getBestMove(grid: Grid, forX: boolean, depth?: number): Move {
  if (depth == undefined)
    depth = grid.length;
  const moves = getMoves(grid);
  const movesWithScores = moves.map(move => {
    const newGrid = makeMove(grid, move, forX);
    const evaluation = evaluate(newGrid);
    return {
      move,
      score: forX ? evaluation : -evaluation
    }; 
  });
  const sortedMovesWithScores = movesWithScores.sort((a, b) => b.score - a.score);
  const sortedMoves = sortedMovesWithScores.map(x => x.move);
  // Return the move with the best evaluation so far
  return sortedMoves[0];
}
