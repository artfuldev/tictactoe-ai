import { nextValue, makeMove, hasGameEnded } from './';
import { Grid, Move } from '../definitions';
import 'mocha';
import { expect } from 'chai';

describe('nextValue', () => {
  it('should return true when even number of entries are made', () => {
    const grid: Grid = [true, false, undefined, undefined, undefined, undefined];
    const next = nextValue(grid);
    expect(next).to.equal(true);
  });
  it('should return false when odd number of entries are present', () => {
    const grid: Grid = [true, false, true, undefined, undefined, undefined];
    const next = nextValue(grid);
    expect(next).to.equal(false);
  });
  it('should not mutate input grid', () => {
    const grid: Grid = [true, false, undefined, undefined, undefined, undefined];
    const input = grid.join(',');
    const next = nextValue(grid);
    expect(grid.join(',')).to.equal(input);
  });
});
