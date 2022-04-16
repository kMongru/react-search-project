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
    <div className='wrapper'>
      <div className='left-side'>
        <div className='flex-row'>
          <h2>{title}</h2>
          <HiOutlineSwitchHorizontal
            className='toggle'
            size={20}
            onClick={() => toggle()}
            color='white'
          />
        </div>
        <p>{description}</p>
        <div className='button-wrapper' onClick={() => searchFunction()}>
          <h2>Search!</h2>
        </div>
      </div>
      <div className='right-side'>
        <h2>{`Count: ${count}`}</h2>
        <h2>{`Max: ${max}`}</h2>
      </div>
    </div>
  );
};

export default BottomPanel;
