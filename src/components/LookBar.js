import React from 'react';
import superficial, { interpolate } from 'superficial';
import Breakpoint from './Breakpoint';
import colors from '../colors';

const pctOf = (n, min, max) => ((n - min) / (max - min)) * 100;

function LookBar({ prop, value, min, max, width }, looks) {
  const breakpoints = Object.keys(value).sort((a, b) => a - b);
  const minPct = pctOf(breakpoints[0], min, max);
  const maxPct = pctOf(breakpoints[breakpoints.length - 1], min, max);
  const labelPct = Math.max(Math.min(pctOf(width, min, max), maxPct), minPct);

  const left = `${Math.max(minPct, 0)}%`;
  const right = `${100 - Math.min(maxPct, 100)}%`;
  const marginLeft = `${labelPct}%`;

  return (
    <div looks={looks.container}>
      <div
        looks={looks.line}
        style={{ left, right, background: colors(prop) }}
      />
      <div looks={looks.label} style={{ marginLeft }}>
        { interpolate({ val: value })(width).val }
      </div>
      {
        breakpoints.filter(b => b <= max && b >= min).map(breakpoint =>
          <Breakpoint
            key={breakpoint}
            {...{ breakpoint, min, max }}
          />,
        )
      }
    </div>
  );
}

LookBar.looks = {
  container: { position: 'relative', paddingTop: '13px' },
  line: {
    position: 'absolute',
    top: '5px',
    height: 2,
  },
  label: {
    transform: 'translateY(-2px)',
    wordWrap: 'break-word',
  },
};

LookBar.propTypes = {
  prop: React.PropTypes.string,
  value: React.PropTypes.object.isRequired,
  width: React.PropTypes.number,
  min: React.PropTypes.number,
  max: React.PropTypes.number,
};

export default superficial(LookBar);
