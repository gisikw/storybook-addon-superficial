import React from 'react';
import LookBar from './LookBar';

const dasherize = word =>
  word.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();

export default function LookRule({ prop, value, min, max }) {
  return (
    <tr>
      <td>{ dasherize(prop) }</td>
      <td>
        {
          typeof value === 'object'
            ? <LookBar {...{ prop, value, min, max }} />
            : value
        }
      </td>
    </tr>
  );
}

LookRule.propTypes = {
  prop: React.PropTypes.string,
  value: React.PropTypes.any,
  min: React.PropTypes.number,
  max: React.PropTypes.number,
};
