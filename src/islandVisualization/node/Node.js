import React, { useState, useEffect } from 'react';

import './node.css';

const Node = ({ row, col, isIsland, isVisted, onClick }) => {
  const extraClassName = isIsland ? 'island' : 'water';
  const animationTrigger = isVisted ? 'node-visted' : '';

  return (
    <div
      id={`node-${row}-${col}`}
      isIsland={isIsland}
      className={`node ${extraClassName}`}
      onClick={() => {
        onClick();
      }}
    ></div>
  );
};

export default Node;