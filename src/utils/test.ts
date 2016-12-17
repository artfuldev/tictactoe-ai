import { transpose } from './';
import { expect } from 'chai';
import 'mocha';

describe('transpose', () => {
  it('should transpose 3x3 grid properly', () => {
    const grid = [1,2,3,4,5,6,7,8,9];
    const transposed = transpose(grid);
    expect(transposed.join(',')).to.equal('1,4,7,2,5,8,3,6,9');
  });
  it('should not mutate input grid', () => {
    const grid = [1,2,3,4,5,6,7,8,9];
    const transposed = transpose(grid);
    expect(grid.join(',')).to.equal('1,2,3,4,5,6,7,8,9');
  });
});
