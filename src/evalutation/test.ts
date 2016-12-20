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
  it('should give true cells a positive score', () => {
    const cells = [true, undefined, undefined];
    const evaluation = evaluateCells(cells);
    expect(evaluation).to.be.greaterThan(0);
  });
  it('should give false cells a negative score', () => {
    const cells = [false, undefined, undefined];
    const evaluation = evaluateCells(cells);
    expect(evaluation).to.be.lessThan(0);
  });
  const assertions = [
    { cells: [true, true, undefined], expectation: 4 },
    { cells: [true, undefined, true], expectation: 4 },
    { cells: [false, false, undefined], expectation: -4 },
    { cells: [false, undefined, false], expectation: -4 },
    { cells: [true, false, undefined], expectation: 0 },
    { cells: [undefined, false, true], expectation: 0 },
  ];
  const expectedEvaluations = [];
  for (let i = 0; i < assertions.length; i++) {
    const cells = assertions[i].cells;
    const expectation = assertions[i].expectation;
    it('should evaluate [' + cells.join(',') + '] to ' + expectation, () => {
      const evaluation = evaluateCells(cells);
      expect(evaluation).to.equal(expectation);
    });
  }
})
