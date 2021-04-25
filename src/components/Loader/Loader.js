import React from 'react';
import './Loader.css';

function Loader({ size = 1 }) {
  const loaderStyles = {
    transform: `scale(${size})`,
  };

  return <div className="lds-dual-ring" style={loaderStyles}></div>;
}

export default Loader;
