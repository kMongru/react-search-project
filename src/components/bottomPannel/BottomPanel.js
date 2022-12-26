import React from 'react';

import { HiOutlineSwitchHorizontal } from 'react-icons/hi';

import './bottomPanel.css';

const BottomPanel = ({
  title,
  description,
  searchFunction,
  toggle,
  count,
  max,
}) => {
  return (
    <>
      <div className='wrapper'>
        <div className='left-side'>
          <div className='flex-row'>
            <h2 style={{ whiteSpace: 'nowrap' }}>{title}</h2>
            <HiOutlineSwitchHorizontal
              className='toggle'
              size={13}
              onClick={() => toggle()}
              color='white'
            />
          </div>
          <p>{description}</p>
          <div className='button-wrapper' onClick={() => searchFunction()}>
            <h2>Search!</h2>
          </div>
        </div>
      </div>
      <div className='right-side'>
        <h2 style={{ marginBottom: '10rem' }}>Traversal Statistics</h2>
        <p>{`Number of Islands: ${count}`}</p>
        <p>{`Largest Island Size: ${max}`}</p>
      </div>
    </>
  );
};

export default BottomPanel;
