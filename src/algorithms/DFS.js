//DFS search
const dfsSearch = (grid, r, c, visited) => {
  const rowInbounds = r >= 0 && r < grid.length;
  const colInbounds = c >= 0 && c < grid[0].length;
  if (!rowInbounds || !colInbounds) return false; //bounds checking

  if (grid[r][c].isIsland === false) return false; //island checking

  const pos = r + ',' + c; //create a string literal to search the set with (must be a primative data type to avoid comparing references)
  if (visited.has(pos)) return false; //if they island has already been explored
  visited.add(pos);
  grid[r][c].isVisited = true;

  //must be at an unvisited path, recurisive calls -> stack stucture
  dfsSearch(grid, r - 1, c, visited); //up
  dfsSearch(grid, r + 1, c, visited); //down
  dfsSearch(grid, r, c - 1, visited); //left
  dfsSearch(grid, r, c + 1, visited); //right

  return true;
};

export default dfsSearch;
