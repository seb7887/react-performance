import React from "react";

const Banner: React.FC = ({ children }) => (
  <div className="banner">
    <h1 className="banner__title">{children}</h1>
    <div className="banner__overlay" />
  </div>
);

export default Banner;
