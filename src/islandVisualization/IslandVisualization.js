import React, { useState, useEffect } from 'react';

import Node from './node/Node';
import BottomPanel from '../components/bottomPannel/BottomPanel';

//algos
import bfsSearch from '../algorithms/BFS';
import dfsSearch from '../algorithms/DFS';

import './islandVisualization.css';
import { GrRotateLeft } from 'react-icons/gr';
import delay from '../components/delayFunction';

const IslandVisualization = (props) => {
  const [grid, setGrid] = useState([]);

  const [algoToggle, setAlgoToggle] = useState(true);
  const [overlay, setOverlay] = useState(false);
  const [count, setCount] = useState(0);
  const [max, setMax] = useState(0);

  useEffect(() => {
    handleReset();
  }, []);

  const handleVisualization = async (type) => {
    let visitedSet = new Set();
    let currCount = 0,
      maximum = 0;

    for (let r = 0; r < grid.length; r++) {
      for (let c = 0; c < grid[0].length; c++) {
        let currNode = grid[r][c];
        let currCoordinate = r + ',' + c;

        if (currNode.isIsland && !visitedSet.has(currCoordinate)) {
          //search functions
          type === 'BFS'
            ? (maximum = Math.max(
                await bfsSearch(grid, r, c, visitedSet, handleNodeStateChange),
                maximum
              ))
            : (maximum = Math.max(
                await dfsSearch(grid, r, c, visitedSet, handleNodeStateChange),
                maximum
              ));

          //add to total count
          currCount++;
        } else if (!visitedSet.has(currCoordinate)) {
          visitedSet.add(currCoordinate);
          handleNodeStateChange(r, c, 'isVisited'); //change to re-render node

          // //delay between repitions
          await delay(0.01);
        }
      }
    }

    setCount(currCount);
    setMax(maximum);
    setOverlay(true);
  };

  const handleNodeStateChange = (row, col, change) => {
    const newGrid = getUpdatedGrid(grid, row, col, change);
    setGrid(newGrid);
  };

  const handleReset = () => {
    const grid = getInitialGrid();
    setGrid(grid);
    setOverlay(false);
    setCount(0);
    setMax(0);
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
                const { row, col, isIsland, isVisited } = node;
                return (
                  <Node
                    key={`${rowIdx}-${col}`}
                    col={col}
                    row={row}
                    isIsland={isIsland}
                    isVisited={isVisited}
                    onClick={() => handleNodeStateChange(row, col, 'isIsland')}
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
            description={
              <>
                <p>
                  The algorithm starts traversing the graph from the root node
                  and explores all the neighboring nodes. Then, it selects the
                  nearest node and explores all the unexplored nodes.
                </p>
                <p>Base Structure: Queue</p>
                <p>Time Complexity: O(V + E)</p>
              </>
            }
            searchFunction={() => handleVisualization('BFS')}
            toggle={() => setAlgoToggle(!algoToggle)}
            count={count}
            max={max}
          />
        ) : (
          <BottomPanel
            title={'Depth First Search'}
            description={
              <>
                <p>
                  The algorithm starts at the root (top) node of a tree and goes
                  as far as it can down a given branch (path), then backtracks
                  until it finds an unexplored path, and then explores it. The
                  algorithm does this until the entire graph has been explored.
                </p>
                <p>Base Structure: Stack</p>
                <p>Time Complexity: O(V + E)</p>
              </>
            }
            searchFunction={() => handleVisualization('DFS')}
            toggle={() => setAlgoToggle(!algoToggle)}
            count={count}
            max={max}
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
  for (let row = 0; row < 11; row++) {
    let newRow = [];
    for (let col = 0; col < 13; col++) {
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
const getUpdatedGrid = (grid, row, col, change) => {
  const newGrid = grid.slice(); // copy the array
  const node = newGrid[row][col];
  let newNode = {};

  //change the value of the selected node
  if (change === 'isIsland') {
    newNode = {
      ...node,
      isIsland: !node.isIsland,
    };
  } else if (change === 'isVisited') {
    newNode = {
      ...node,
      isVisited: !node.isVisited,
    };
  }

  //reassign the new node & return updated grid
  newGrid[row][col] = newNode;
  return newGrid;
};

export default IslandVisualization;
