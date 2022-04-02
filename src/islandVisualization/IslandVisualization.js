import React, { useState, useEffect } from 'react';
import Node from './node/Node';

import './islandVisualization.css';

const IslandVisualization = (props) => {
  const [grid, setGrid] = useState([]);

  useEffect(() => {
    handleReset();
  }, []);

  const visualizeBFS = () => {
    for (let r = 0; r < grid[0].length; r++) {
      for (let c = 0; c < grid.length; c++) {}
    }
  };

  const handleNodeStateChange = (row, col) => {
    // console.log(row);
    const newGrid = getUpdatedGrid(grid, row, col);
    setGrid(newGrid);
  };

  const handleReset = () => {
    const grid = getInitialGrid();
    setGrid(grid);
  };

  return (
    <>
      <div className='grid'>
        {grid.map((row, rowIdx) => {
          return (
            // rowIdx is for each row across the grid
            <div className='grid-row' key={rowIdx}>
              {row.map((node, i) => {
                //extract the values out of the node object
                const { row, col, isIsland } = node;

                return (
                  <Node
                    key={`${rowIdx}-${col}`}
                    col={col}
                    row={row}
                    isIsland={isIsland}
                    onClick={() => handleNodeStateChange(row, col)}
                  ></Node>
                );
              })}
            </div>
          );
        })}
      </div>
      <button onClick={() => visualizeBFS()}>Breath First Search</button>
      <button onClick={() => handleReset()}>Reset Grid</button>
    </>
  );
};

//build the inital grid
/*

grid = [[0,0,0,0],
        [0,0,0,0],
        [0,0,0,0],
       ]
*/

const getInitialGrid = () => {
  const grid = [];
  //create each row then push to the grid obj
  for (let row = 0; row < 4; row++) {
    let newRow = [];
    for (let col = 0; col < 5; col++) {
      newRow.push(createNode(row, col));
    }
    grid.push(newRow);
  }
  return grid;
};

const createNode = (r, c) => {
  return {
    row: r,
    col: c,
    isVisited: false,
    isIsland: false,
  };
};

//update function to toggle islands
const getUpdatedGrid = (grid, row, col) => {
  const newGrid = grid.slice(); // copy the array
  const node = newGrid[row][col];

  //change the value of the selected node
  const newNode = {
    ...node,
    isIsland: !node.isIsland,
  };

  //reassign the new node & return updated grid
  newGrid[row][col] = newNode;
  return newGrid;
};

export default IslandVisualization;
