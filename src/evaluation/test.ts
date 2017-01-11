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
    const cells: Cell[] = [undefined, undefined, undefined];
    const evaluation = evaluateCells(cells);
    expect(evaluation).to.equal(0);
  });
  it('should not mutate input cells', () => {
    const cells = [true, false, undefined, true, undefined, false];
    const expected = [true, false, undefined, true, undefined, false];
    const evaluation = evaluateCells(cells);
    expect(cells).to.deep.equal(expected);
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
  it('should evaluate a true winning terminal node of cells to Infinity', () => {
    const cells = [true, true, true];
    const evaluation = evaluateCells(cells);
    expect(evaluation).to.equal(Infinity);
  });
  it('should evaluate a false winning terminal node of cells to -Infinity', () => {
    const cells = [false, false, false];
    const evaluation = evaluateCells(cells);
    expect(evaluation).to.equal(-Infinity);
  });
});

describe('evaluateRows', () => {
  it('should evaluate rows of grid as expected', () => {
    const grid = [true, false, undefined, true, true, false, true, true, undefined];
    const evaluation = evaluateRows(grid);
    expect(evaluation).to.equal(4);
  });
  it('should not mutate input grid', () => {
    const grid = [true, false, undefined, true, true, false, true, true, undefined];
    const expected = [true, false, undefined, true, true, false, true, true, undefined];
    const evaluation = evaluateRows(grid);
    expect(grid).to.deep.equal(expected);
  });
});

describe('evaluateColumns', () => {
  it('should evaluate columns of grid as expected', () => {
    const grid = [true, false, undefined, true, true, false, true, true, undefined];
    const evaluation = evaluateColumns(grid);
    expect(evaluation).to.equal(Infinity);
  });
  it('should not mutate input grid', () => {
    const grid = [true, false, undefined, true, true, false, true, true, undefined];
    const expected = grid.join(',');
    const evaluation = evaluateColumns(grid);
    expect(grid.join(',')).to.equal(expected);
  });
});

describe('evaluateDiagonals', () => {
  it('should evaluate diagonals of grid as expected', () => {
    const grid = [true, false, undefined, true, true, false, true, true, undefined];
    const evaluation = evaluateDiagonals(grid);
    expect(evaluation).to.equal(8);
  });
  it('should not mutate input grid', () => {
    const grid = [true, false, undefined, true, true, false, true, true, undefined];
    const expected = grid.join(',');
    const evaluation = evaluateDiagonals(grid);
    expect(grid.join(',')).to.equal(expected);
  });
});

describe('evaluate', () => {
  const grids = [[true, false, true, undefined, true, false, undefined, undefined, true]];
  grids.forEach(grid => {
    it('should be the sum of evaluateRows, evaluateColumns, and evaluateDiagonals', () => {
      const rowsEvaluation = evaluateRows(grid);
      const columnsEvaluation = evaluateColumns(grid);
      const diagonalsEvaluation = evaluateDiagonals(grid);
      const sum = rowsEvaluation + columnsEvaluation + diagonalsEvaluation;
      const evaluation = evaluate(grid);
      expect(evaluation).to.equal(sum);
    });
  });
  it('should not mutate input grid', () => {
    const grid = [true, false, true, undefined, true, false, undefined, undefined, true];
    const evaluation = evaluate(grid);
    expect(grid.join(',')).to.equal('true,false,true,,true,false,,,true');
  });
});
