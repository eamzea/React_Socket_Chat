import React from 'react';

const Loading = () => {
  return (
    <div className="loading">
      <div
        className="spinner-border"
        style={{ width: '10rem', height: '10rem' }}
        role="status"
      >
        <span className="visually-hidden">Loading...</span>
      </div>
    </div>
  );
};

export default Loading;
