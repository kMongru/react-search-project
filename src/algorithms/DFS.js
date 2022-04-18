import delay from '../components/delayFunction';

const directions = [
  [-1, 0],
  [0, -1],
  [1, 0],
  [0, 1],
];

//DFS search
const dfsSearch = async (grid, r, c, visitedSet, updateNodeState) => {
  let stack = [];
  let size = 0;

  stack.push(grid[r][c]);
  let currCoordinate = r + ',' + c;
  visitedSet.add(currCoordinate);

  while (stack.length) {
    let vistingNode = stack.pop();
    r = vistingNode.row;
    c = vistingNode.col;

    //trigger state rerender -> visiting node animation
    updateNodeState(r, c, 'isVisited');
    await delay(50);

    size++;

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

      //cleared all checks, need to mark as visted and add to stack and break out of the for loop
      visitedSet.add(currPos);
      let newNode = grid[newRow][newCol];
      stack.push(newNode);
    }
  }

  return size;
};

export default dfsSearch;
