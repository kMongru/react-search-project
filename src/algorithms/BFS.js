import delay from '../components/delayFunction';

//directions object to move the grid around
const directions = [
  [0, 1],
  [1, 0],
  [0, -1],
  [-1, 0],
];

//BFS search
const bfsSearch = async (grid, r, c, visitedSet, updateNodeState) => {
  //starting point, push to queue and visit it
  let queue = [];

  queue.push(grid[r][c]);
  let currCoordinate = r + ',' + c;
  visitedSet.add(currCoordinate);

  //initiate counter for size of island
  let count = 0;

  while (queue.length !== 0) {
    let visitingNode = queue.shift(); //change the reference frame to the current node
    r = visitingNode.row;
    c = visitingNode.col;

    //trigger state rerender -> visiting node animation
    updateNodeState(r, c, 'isVisited');
    await delay(50);

    count++;

    //use each of the directions above to change search from the reference point
    for (let [x, y] of directions) {
      let newRow = r + x;
      let newCol = c + y;
      let currPos = newRow + ',' + newCol;

      //bounds checking
      const rowInbounds = newRow >= 0 && newRow < grid.length;
      const colInbounds = newCol >= 0 && newCol < grid[0].length;

      if (!rowInbounds || !colInbounds) continue; //breaks to the next interation of the loop

      //land check & visited check
      const isVisitedIsland =
        !grid[newRow][newCol].isIsland || visitedSet.has(currPos);

      if (isVisitedIsland) continue;

      //cleared all checks, need to mark as visted and add to queue
      visitedSet.add(currPos);
      let newNode = grid[newRow][newCol];
      queue.push(newNode);
    }
  }

  return count;
};

export default bfsSearch;
