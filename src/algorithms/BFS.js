//directions object to move the grid around
const directions = [
  [0, 1],
  [1, 0],
  [0, -1],
  [-1, 0],
];

//BFS search
const bfsSearch = (grid, r, c, visited) => {
  //starting point, push to queue and visit it
  let queue = [];
  queue.push(grid[r][c]);
  visited.add(r + ',' + c);
  grid[r][c].isVisited = true; //may b redunant

  while (queue.length !== 0) {
    let visitingNode = queue.shift(); //change the reference frame to the current node
    r = visitingNode.row;
    c = visitingNode.col;

    //use each of the directions above to change search from the reference point
    for (let [x, y] of directions) {
      let newRow = r + x;
      let newCol = c + y;
      let currPos = newRow + ',' + newCol;

      //bounds checking
      const rowInbounds = newRow >= 0 && newRow < grid.length;
      const colInbounds = newCol >= 0 && newCol < grid[0].length;

      if (!rowInbounds || !colInbounds) continue; //breaks to the next interation of the loop

      //land check
      const isVisitedIsland =
        !grid[newRow][newCol].isIsland || visited.has(currPos);

      if (isVisitedIsland) continue;

      //cleared all checks, need to mark as visted and add to queue
      visited.add(currPos);
      grid[newRow][newCol].isVisited = true; // may b redunant
      queue.push(grid[newRow][newCol]);
    }
  }
};

export default bfsSearch;
