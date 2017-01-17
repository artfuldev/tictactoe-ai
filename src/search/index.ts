import { getMoves } from '../moves';
import { evaluate } from '../evaluation';
import { nextValue, makeMove, hasGameEnded } from '../game';
import { Grid, Move } from '../definitions';
import { alphaBeta } from './alphaBeta';

export function getBestMove(grid: Grid, forX?: (grid: Grid) => boolean,
  depth?: number): Move {
  const moves = getMoves(grid);
  if (depth == undefined) depth = moves.length;
  if(forX == undefined) forX = nextValue;
  const isX = forX(grid);
  const movesWithScores = moves.map(move => {
    const newGrid = makeMove(grid, move, forX);
    const evaluation = alphaBeta(newGrid, depth, -Infinity, Infinity, !isX,
      evaluate, hasGameEnded,
      grid => getMoves(grid).map(move => makeMove(grid, move, forX)));
    return {
      move,
      score: isX ? evaluation : -evaluation
    };
  });
  const sortedMovesWithScores =
    movesWithScores.sort((a, b) => b.score - a.score);
  const sortedMoves = sortedMovesWithScores.map(x => x.move);
  // Return the move with the best evaluation so far
  return sortedMoves[0];
}
