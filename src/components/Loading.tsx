import React from 'react';
import '@/styles/loading.scss';

const Loading = () => {
  return (
    <div className="loading">
      <div className="loading__container">
        <div className="loading__circle"></div>
        <div className="loading__circle"></div>
        <div className="loading__circle"></div>
      </div>
    </div>
  );
};

export default Loading; 