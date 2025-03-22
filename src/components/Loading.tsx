import React from 'react';
import '@/styles/loading.scss';

const Loading = () => {
  return (
    <div className="loading">
      <div className="loading__spinner"></div>
      <p className="loading__text">Yuklanmoqda...</p>
    </div>
  );
};

export default Loading; 