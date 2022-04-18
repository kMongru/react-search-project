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
          <a
            className='header-btn'
            href='https://github.com/kMongru/react-search-project'
            target='_blank'
          >
            <FaCode size={20} />
          </a>
          <h2 className='header-and'>&</h2>
          <a
            className='header-btn'
            href='https://www.figma.com/file/KLTP67j6H3P9MeNcs7eHGi/BFS%2FDFS-Site?node-id=0%3A1'
            target='_blank'
          >
            <FaPencilAlt size={20} />
          </a>
        </div>
      </div>
      <div className='app-grid-container'>
        <IslandVisualization />
      </div>
    </div>
  );
}

export default App;
