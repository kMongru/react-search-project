import React from 'react';

import { FaPencilAlt, FaCode } from 'react-icons/fa';
import './styles/App.css';

import IslandVisualization from './islandVisualization/IslandVisualization';

function App() {
  return (
    <div className='app'>
      <div className='app-header'>
        <h1>Search Visualization</h1>
        <div className='header-flex-row'>
          <FaCode size={20} />
          <h2 className='header-and'>&</h2>
          <FaPencilAlt size={20} />
        </div>
      </div>
      <div className='app-grid-container'>
        <IslandVisualization />
      </div>
    </div>
  );
}

export default App;
