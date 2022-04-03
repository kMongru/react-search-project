// time complexity ->
// space complexity ->

/*params

grid -> 2d array of node objects

*/

//BFS search
const bfsSearch = (grid, r, c, visited) => {
  const rowInbounds = r >= 0 && r < grid.length;
  const colInbounds = c >= 0 && c < grid[0].length;
  if (!rowInbounds || !colInbounds) return false; //bounds checking

  if (grid[r][c].isIsland === false) return false; //island checking

  const pos = r + ',' + c; //create a string literal to search the set with (must be a primative data type to avoid comparing references)
  if (visited.has(pos)) return false; //if they island has already been explored
  visited.add(pos);

  //starting point
  let queue = [];
  queue.push(grid[r][c]);

  while (queue.length !== 0) {
    let visiting = queue.shift();
  }
};

export default bfsSearch;
