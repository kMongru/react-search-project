import React from 'react';

import './node.css';

const Node = (col, row, isIsland, onMouseDown, onMouseEnter, onMouseUp) => {
  const extraClassName = isIsland ? 'node-wall' : '';

  return (
    <div
      id={`node-${row}-${col}`}
      className={`node ${extraClassName}`}
      onMouseDown={() => onMouseDown(row, col)}
      onMouseEnter={() => onMouseEnter(row, col)}
      onMouseUp={() => onMouseUp()}
    ></div>
  );
};

export default Node;
