import delay from '../components/delayFunction';
let count = 0;

//DFS search
const dfsSearch = async (grid, r, c, updateNodeState) => {
  const rowInbounds = r >= 0 && r < grid.length;
  const colInbounds = c >= 0 && c < grid[0].length;
  if (!rowInbounds || !colInbounds) return false; //bounds checking

  if (grid[r][c].isIsland === false) return false; //island checking

  // const pos = r + ',' + c; //create a string literal to search the set with (must be a primative data type to avoid comparing references)
  if (grid[r][c].isVisited) return false; //if they island has already been explored
  // visited.add(pos);
  updateNodeState(r, c, 'isVisited');
  count++;
  await delay(50);

  //must be at an unvisited path, recurisive calls -> stack stucture
  dfsSearch(grid, r - 1, c, updateNodeState); //up
  dfsSearch(grid, r + 1, c, updateNodeState); //down
  dfsSearch(grid, r, c - 1, updateNodeState); //left
  dfsSearch(grid, r, c + 1, updateNodeState); //right

  return count;
};

export default dfsSearch;
