import { getRows, getColumns, getDiagonals} from './';
import { transpose } from './helpers';
import { expect } from 'chai';
import 'mocha';

describe('getRows', () => {
  it('should get n rows from nxn grid', () => {
    const grid = [1,2,3,4,5,6,7,8,9];
    const rows = getRows(grid);
    expect(rows.length).to.equal(3);
  });
  it('should get rows from nxn grid each with length n', () => {
    const grid = [1,2,3,4,5,6,7,8,9];
    const rows = getRows(grid);
    rows.forEach(row => expect(row.length).to.equal(3));
  });
  it('should get rows from nxn grid with proper values', () => {
    const grid = [1,2,3,4,5,6,7,8,9];
    const rows = getRows(grid);
    expect(rows[0]).to.deep.equal([1,2,3]);
    expect(rows[1]).to.deep.equal([4,5,6]);
    expect(rows[2]).to.deep.equal([7,8,9]);
  });
  it('should not mutate input grid', () => {
    const grid = [1,2,3,4,5,6,7,8,9];
    const rows = getRows(grid);
    expect(grid).to.deep.equal([1,2,3,4,5,6,7,8,9]);
  });
});

describe('getColumns', () => {
  it('should get n columns from nxn grid', () => {
    const grid = [1,2,3,4,5,6,7,8,9];
    const columns = getColumns(grid);
    expect(columns.length).to.equal(3);
  });
  it('should get columns from nxn grid each with length n', () => {
    const grid = [1,2,3,4,5,6,7,8,9];
    const columns = getColumns(grid);
    columns.forEach(row => expect(row.length).to.equal(3));
  });
  it('should get columns from nxn grid with proper values', () => {
    const grid = [1,2,3,4,5,6,7,8,9];
    const columns = getColumns(grid);
    expect(columns[0]).to.deep.equal([1,4,7]);
    expect(columns[1]).to.deep.equal([2,5,8]);
    expect(columns[2]).to.deep.equal([3,6,9]);
  });
  it('should not mutate input grid', () => {
    const grid = [1,2,3,4,5,6,7,8,9];
    const columns = getColumns(grid);
    expect(grid).to.deep.equal([1,2,3,4,5,6,7,8,9]);
  });
});

describe('getDiagonals', () => {
  it('should get 2 diagonals from nxn grid', () => {
    const grid = [1,2,3,4,5,6,7,8,9];
    const diagonals = getDiagonals(grid);
    expect(diagonals.length).to.equal(2);
  });
  it('should get diagonals from nxn grid each with length n', () => {
    const grid = [1,2,3,4,5,6,7,8,9];
    const diagonals = getDiagonals(grid);
    diagonals.forEach(diagonal => expect(diagonal.length).to.equal(3));
  });
  it('should get diagonals from nxn grid with proper values', () => {
    const grid = [1,2,3,4,5,6,7,8,9];
    const diagonals = getDiagonals(grid);
    expect(diagonals[0]).to.deep.equal([1,5,9]);
    expect(diagonals[1]).to.deep.equal([3,5,7]);
  });
  it('should not mutate input grid', () => {
    const grid = [1,2,3,4,5,6,7,8,9];
    const diagonals = getDiagonals(grid);
    expect(grid.join(',')).to.equal('1,2,3,4,5,6,7,8,9');
  });
});

describe('transpose', () => {
  it('should return transposed grid with same length', () => {
    const grid = [1,2,3,4,5,6,7,8,9];
    const transposed = transpose(grid);
    expect(transposed.length).to.equal(grid.length);
  });
  it('should transpose nxn grid with proper values', () => {
    const grid = [1,2,3,4,5,6,7,8,9];
    const transposed = transpose(grid);
    expect(transposed).to.deep.equal([1,4,7,2,5,8,3,6,9]);
  });
  it('should not mutate input grid', () => {
    const grid = [1,2,3,4,5,6,7,8,9];
    const transposed = transpose(grid);
    expect(grid).to.deep.equal([1,2,3,4,5,6,7,8,9]);
  });
});
