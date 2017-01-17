import { getMoves } from '../moves';
import { evaluate } from '../evaluation';
import { nextValue, makeMove, hasGameEnded } from '../game';
import { Grid, Move } from '../definitions';
import { alphaBeta } from './alphaBeta';
import { minimax } from './minimax';

export function getBestMove(grid: Grid, forX?: (grid: Grid) => boolean,
  depth?: number): Move {
  const moves = getMoves(grid);
  if (depth == undefined) depth = moves.length;
  if (forX == undefined) forX = nextValue;
  const isX = forX(grid);
  const getNextNodes = (grid: Grid) => getMoves(grid).map(move => makeMove(grid, move, forX));
  const movesWithScores = moves.map(move => {
    const newGrid = makeMove(grid, move, forX);
    const score = minimax(newGrid, depth, !isX, evaluate, hasGameEnded, getNextNodes);
    return {
      move,
      score: isX ? score: -score
    };
  });
  const sortedMovesWithScores = movesWithScores.sort((a, b) => b.score - a.score);
  const sortedMoves = sortedMovesWithScores.map(x => x.move);
  // Return the move with the best evaluation so far
  return sortedMoves[0];
}
