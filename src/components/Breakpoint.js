import React from 'react';

export default function Breakpoint({ breakpoint, min, max }) {
  const style = {
    position: 'absolute',
    top: '3px',
    height: 6,
    width: 6,
    background: 'black',
    borderRadius: 6,
    left: `${((breakpoint - min) / (max - min)) * 100}%`,
  };
  return <div title={breakpoint} style={style} />;
}

const numOrString = React.PropTypes.oneOfType([
  React.PropTypes.string, React.PropTypes.number,
]);
Breakpoint.propTypes = {
  breakpoint: numOrString,
  min: numOrString,
  max: numOrString,
};
