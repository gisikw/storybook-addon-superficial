import React from 'react';
import Breakpoint from './Breakpoint';

const colors = [];
const getColor = i => colors[i] || (colors[i] =
  `#${`000000${Math.random().toString(16).slice(2, 8)}`.slice(-6)}`);
const getPercent = (n, min, max) => ((n - min) / (max - min)) * 100;

export default function LookBar({ prop, value, min, max }) {
  const breakpoints = Object.keys(value).sort((a, b) => a - b);
  const containerStyle = { position: 'relative' };
  const lineStyle = {
    left: `${getPercent(breakpoints[0], min, max)}%`,
    right: `${100 - getPercent(breakpoints[breakpoints.length - 1],
                               min, max)}%`,
    background: getColor(prop),
    position: 'absolute',
    top: '50%',
    marginTop: -1,
    height: 2,
  };

  return (
    <div style={containerStyle}>
      <div style={lineStyle} />
      {
        breakpoints.map(breakpoint =>
          <Breakpoint
            key={breakpoint}
            {...{ breakpoint, value: value[breakpoint], min, max }}
          />,
        )
      }
    </div>
  );
}

LookBar.propTypes = {
  prop: React.PropTypes.string,
  value: React.PropTypes.object.isRequired,
  min: React.PropTypes.number,
  max: React.PropTypes.number,
};
