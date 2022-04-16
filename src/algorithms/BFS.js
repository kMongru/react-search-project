import delay from '../components/delayFunction';

//directions object to move the grid around
const directions = [
  [0, 1],
  [1, 0],
  [0, -1],
  [-1, 0],
];

//BFS search
const bfsSearch = async (grid, r, c, updateNodeState) => {
  //starting point, push to queue and visit it
  let queue = [];
  queue.push(grid[r][c]);
  updateNodeState(r, c, 'isVisited');

  let count = 0;

  while (queue.length !== 0) {
    let visitingNode = queue.shift(); //change the reference frame to the current node
    r = visitingNode.row;
    c = visitingNode.col;
    count++;

    //use each of the directions above to change search from the reference point
    for (let [x, y] of directions) {
      let newRow = r + x;
      let newCol = c + y;

      //bounds checking
      const rowInbounds = newRow >= 0 && newRow < grid.length;
      const colInbounds = newCol >= 0 && newCol < grid[0].length;

      if (!rowInbounds || !colInbounds) continue; //breaks to the next interation of the loop

      let currPos = grid[newRow][newCol];
      //land check
      const isVisitedIsland = !currPos.isIsland || currPos.isVisited;

      if (isVisitedIsland) continue;

      //cleared all checks, need to mark as visted and add to queue
      queue.push(currPos);

      updateNodeState(newRow, newCol, 'isVisited');
      await delay(200);
    }
  }

  return count;
};

export default bfsSearch;
