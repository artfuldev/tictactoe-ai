export function transpose<T>(grid: Array<T>): Array<T> {
  const size = Math.sqrt(grid.length);
  return grid.map((x, i) => grid[Math.floor(i / size) + ((i % size) * size)]);
}
