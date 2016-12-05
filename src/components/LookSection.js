import React from 'react';
import { expandLookRules } from 'superficial/interpolate';
import LookRule from './LookRule';

const styles = {
  title: { textDecoration: 'underline', borderTop: '10px solid transparent' },
  label: {
    textTransform: 'uppercase',
    fontSize: '10px',
    color: '#444',
    fontFamily: 'Arial',
    fontWeight: '600',
  },
};

export default function LookSection({ looks, title, min, max }) {
  const rules = expandLookRules(looks);
  return (
    <tbody style={styles.label}>
      <tr><td style={styles.title}>{ title }</td></tr>
      {
        Object.keys(rules).sort().map(prop =>
          <LookRule
            key={prop}
            {...{ prop, value: rules[prop], min, max }}
          />,
        )
      }
    </tbody>
  );
}

LookSection.propTypes = {
  looks: React.PropTypes.object,
  title: React.PropTypes.string,
  min: React.PropTypes.number,
  max: React.PropTypes.number,
};
