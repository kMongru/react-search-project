/*
{
  {0: 1,2,3},
  {1: 0,2},
  {2: 0,3,4},
  {3: 0,2},
}
*/

// time complexity ->
// space complexity ->

const BFS = (grid, adj, visited) => {
  for (let r = 0; r < grid.length; r++) {
    for (let c = 0; c < grid[0].length; c++) {}
    //found an island case
    if (grid[i].isIsland && visited[i] === false) {
      let row = grid[i].row;
      let col = grid[i].col;
      islandSearch(row, col, visited);
    }
  }
};

const islandSearch = (row, col, visited) => {};
