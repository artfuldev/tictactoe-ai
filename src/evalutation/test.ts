import { evaluate } from './';
import { evaluateRows, evaluateColumns, evaluateDiagonals, evaluateCells } from './helpers';
import { expect } from 'chai';
import { Grid, Cell } from '../definitions';
import 'mocha';

describe('evaluateCells', () => {
  it('should evaluate cells to a number', () => {
    const cells: Cell[] = [];
    const evaluation = evaluateCells(cells);
    expect(evaluation).to.be.a('number');
  });
  it('should evaluate undefined cells to 0', () => {
    const cells = new Array<boolean>(9);
    const evaluation = evaluateCells(cells);
    expect(evaluation).to.equal(0);
  });
  it('should not mutate input cells', () => {
    const cells = [true, false, undefined, true, undefined, false];
    const evaluation = evaluateCells(cells);
    expect(cells.join(',')).to.equal('true,false,,true,,false');
  });
  it('should give true values a positive score', () => {
    const cells = [true, undefined, undefined];
    const evaluation = evaluateCells(cells);
    expect(evaluation).to.be.greaterThan(0);
  });
  it('should give false values a negative score', () => {
    const cells = [false, undefined, undefined];
    const evaluation = evaluateCells(cells);
    expect(evaluation).to.be.lessThan(0);
  });
})
