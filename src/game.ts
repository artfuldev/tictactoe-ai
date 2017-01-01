import { Grid, Move } from './definitions';
import { getRows, getColumns, getDiagonals } from './utils';

export function makeMove(grid: Grid, move: Move, forX: (grid: Grid) => boolean): Grid {
  const newValue = forX(grid);
  return grid.map((value, index) => index == move ? newValue : value);
}

function hasXWon(grid: Grid): boolean {
  return getRows(grid).some(row => row.every(cell => cell === true))
    || getColumns(grid).some(column => column.every(cell => cell === true))
    || getDiagonals(grid).some(diagonal => diagonal.every(cell => cell === true));
}

function hasOWon(grid: Grid): boolean {
  return getRows(grid).some(row => row.every(cell => cell === false))
    || getColumns(grid).some(column => column.every(cell => cell === false))
    || getDiagonals(grid).some(diagonal => diagonal.every(cell => cell === false));
}

function isDraw(grid: Grid): boolean {
  return grid.filter(cell => cell != undefined).length === grid.length;
}

export function hasGameEnded(grid: Grid): boolean {
  return hasXWon(grid) || hasOWon(grid) || isDraw(grid);
}
