export const transpose = <T>(grid: T[]): T[] => {
  const size = Math.sqrt(grid.length);
  return grid.map((x, i) => grid[Math.floor(i / size) + ((i % size) * size)]);
};
