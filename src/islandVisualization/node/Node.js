import React, { useState, useEffect } from 'react';

import './node.css';

const Node = ({ row, col, isIsland, isVisited, onClick }) => {
  const extraClassName = isIsland ? 'island' : 'water';

  const animationClassName =
    isIsland && isVisited ? 'node-flipping-animation' : '';

  return (
    <div className='node-container' id={`node-${row}-${col}`}>
      <div className={`node-inner ${animationClassName}`}>
        <div
          isIsland={isIsland}
          className={`node-front ${extraClassName}`}
          onClick={() => {
            onClick();
          }}
        >
          {isVisited && <div className='node-circle'></div>}
        </div>
        <div className='node-back'></div>
      </div>
    </div>
  );
};

export default Node;
