import React, { useState, useEffect } from 'react';

import Node from './node/Node';
import BottomPanel from '../components/bottomPannel/BottomPanel';
//algos
import bfsSearch from '../algorithms/BFS';
import dfsSearch from '../algorithms/DFS';

import './islandVisualization.css';
import { GrRotateLeft } from 'react-icons/gr';

const IslandVisualization = (props) => {
  const [grid, setGrid] = useState([]);
  const [algoToggle, setAlgoToggle] = useState(true);
  const [overlay, setOverlay] = useState(false);
  const [count, setCount] = useState(0);

  useEffect(() => {
    handleReset();
  }, []);

  const handleVisualization = (type) => {
    const visited = new Set();
    let currCount = 0,
      maximum = 0;

    for (let r = 0; r < grid.length; r++) {
      for (let c = 0; c < grid[0].length; c++) {
        let currNode = grid[r][c];

        if (currNode.isIsland && !currNode.isVisited) currCount++;

        type === 'BFS' && currNode.isIsland
          ? bfsSearch(grid, r, c, visited)
          : dfsSearch(grid, r, c, visited);
      }
    }

    setCount(currCount);
    setOverlay(true);
  };

  const handleNodeStateChange = (row, col) => {
    const newGrid = getUpdatedGrid(grid, row, col);
    setGrid(newGrid);
  };

  const handleReset = () => {
    const grid = getInitialGrid();
    setGrid(grid);
    setOverlay(false);
    setCount(0);
  };

  return (
    <div className='container'>
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
      {overlay && (
        <div className='reset-overlay'>
          <div className='reset-btn_container' onClick={() => handleReset()}>
            <h2>Reset</h2>
            <GrRotateLeft size={20} color='white' />
          </div>
        </div>
      )}

      <div className={`secondary-bg`}>
        {algoToggle ? (
          <BottomPanel
            title={'Breath First Search'}
            description={''}
            searchFunction={() => handleVisualization('BFS')}
            toggle={() => setAlgoToggle(!algoToggle)}
            count={count}
          />
        ) : (
          <BottomPanel
            title={'Depth First Search'}
            description={''}
            searchFunction={() => handleVisualization('DFS')}
            toggle={() => setAlgoToggle(!algoToggle)}
            count={count}
          />
        )}
      </div>
    </div>
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
  for (let row = 0; row < 10; row++) {
    let newRow = [];
    for (let col = 0; col < 15; col++) {
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
