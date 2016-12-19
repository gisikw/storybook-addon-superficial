import React from 'react';
import superficial from 'superficial';

function Breakpoint({ breakpoint, min, max }, looks) {
  const style = {
    left: `${((breakpoint - min) / (max - min)) * 100}%`,
  };
  return <div title={breakpoint} looks={looks.main} style={style} />;
}

Breakpoint.looks = {
  main: {
    position: 'absolute',
    top: '3px',
    height: 6,
    width: 6,
    background: 'black',
    borderRadius: 6,
  },
};

const numOrString = React.PropTypes.oneOfType([
  React.PropTypes.string, React.PropTypes.number,
]);
Breakpoint.propTypes = {
  breakpoint: numOrString,
  min: numOrString,
  max: numOrString,
};

export default superficial(Breakpoint);
