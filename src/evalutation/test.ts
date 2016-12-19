import { evaluate } from './';
import { evaluateRows, evaluateColumns, evaluateDiagonals, evaluateCells } from './helpers';
import { expect } from 'chai';
import { Grid } from '../definitions';
import 'mocha';

describe('evaluateCells', () => {
  it('should evaluate cells to a number', () => {
    const cells: Grid = [];
    const evaluation = evaluateCells(cells);
    expect(evaluation).to.be.a('number');
  });
  it('should evaluate undefined cells to 0', () => {
    const cells = new Array<boolean>(9);
    const evaluation = evaluateCells(cells);
    expect(evaluation).to.equal(0);
  });
})
