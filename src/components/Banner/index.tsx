import React from 'react';

const Banner: React.FC = ({ children }) => (
  <div className="banner">
    <h1>{children}</h1>
    <div></div>
  </div>
);

export default Banner;
