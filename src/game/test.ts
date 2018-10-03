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
    const expected = [true, false, undefined, undefined, undefined, undefined];
    const next = nextValue(grid);
    expect(grid).to.deep.equal(expected);
  });
});

describe('hasGameEnded', () => {
  
  it('should return false when game hasn\'t ended', () => {
    const grid: Grid = [true, false, undefined, true, false, undefined, undefined, undefined, undefined];
    const result = hasGameEnded(grid);
    expect(result).to.equal(false);
  });
  
  it('should return true when X has already won', () => {
    const grid: Grid = [true, false, undefined, true, false, undefined, true, undefined, undefined];
    const result = hasGameEnded(grid);
    expect(result).to.equal(true);
  });
  
  it('should return true when O has already won', () => {
    const grid: Grid = [true, false, undefined, true, false, undefined, undefined, false, undefined];
    const result = hasGameEnded(grid);
    expect(result).to.equal(true);
  });
  
  it('should return true when the game is drawn', () => {
    const grid: Grid = [true, false, true, true, false, false, false, true, true];
    const result = hasGameEnded(grid);
    expect(result).to.equal(true);
  });
  
  it('should not mutate input grid', () => {
    const grid: Grid = [true, false, true, true, false, false, false, true, true];
    const expected = [true, false, true, true, false, false, false, true, true];
    const result = hasGameEnded(grid);
    expect(grid).to.deep.equal(expected);
  });
});
