import React from 'react';
import interpolate from 'superficial/interpolate';
import Breakpoint from './Breakpoint';
import colors from '../colors';

const pctOf = (n, min, max) => ((n - min) / (max - min)) * 100;
const styles = {
  container: { position: 'relative', paddingTop: '13px' },
  line: (minPct, maxPct, prop) => ({
    left: `${minPct}%`,
    right: `${100 - maxPct}%`,
    background: colors(prop),
    position: 'absolute',
    top: '5px',
    height: 2,
  }),
  label: pct => ({
    marginLeft: `${pct}%`,
    transform: 'translateY(-2px)',
    wordWrap: 'break-word',
  }),
};

export default function LookBar({ prop, value, min, max, width }) {
  const breakpoints = Object.keys(value).sort((a, b) => a - b);
  const minPct = pctOf(breakpoints[0], min, max);
  const maxPct = pctOf(breakpoints[breakpoints.length - 1], min, max);
  const labelPct = Math.max(Math.min(pctOf(width, min, max), maxPct), minPct);
  return (
    <div style={styles.container}>
      <div style={styles.line(minPct, maxPct, prop)} />
      <div style={styles.label(labelPct)}>
        { interpolate({ val: value })(width).val }
      </div>
      {
        breakpoints.map(breakpoint =>
          <Breakpoint
            key={breakpoint}
            {...{ breakpoint, min, max }}
          />,
        )
      }
    </div>
  );
}

LookBar.propTypes = {
  prop: React.PropTypes.string,
  value: React.PropTypes.object.isRequired,
  width: React.PropTypes.number,
  min: React.PropTypes.number,
  max: React.PropTypes.number,
};
