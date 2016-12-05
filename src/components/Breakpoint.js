import React from 'react';

export default function Breakpoint({ breakpoint, value, min, max }) {
  const title = `${breakpoint}px: ${value}`;
  const style = {
    position: 'absolute',
    top: '50%',
    marginTop: '-3px',
    height: 6,
    width: 6,
    background: 'black',
    borderRadius: 6,
    cursor: 'pointer',
    left: `${((breakpoint - min) / (max - min)) * 100}%`,
  };

  return <div title={title} style={style} />;
}

Breakpoint.propTypes = {
  breakpoint: React.PropTypes.string,
  value: React.PropTypes.any,
  min: React.PropTypes.number,
  max: React.PropTypes.number,
};
