import { getRows, getColumns, transpose } from './';
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
    expect(rows[0].join(',')).to.equal('1,2,3');
    expect(rows[1].join(',')).to.equal('4,5,6');
    expect(rows[2].join(',')).to.equal('7,8,9');
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
    expect(columns[0].join(',')).to.equal('1,4,7');
    expect(columns[1].join(',')).to.equal('2,5,8');
    expect(columns[2].join(',')).to.equal('3,6,9');
  });
});

describe('transpose', () => {
  it('should transpose nxn grid properly', () => {
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
