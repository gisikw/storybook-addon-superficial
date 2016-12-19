import React from 'react';
import superficial from 'superficial';
import StyledRangeSlider from './StyledRangeSlider';
import LookSection from './LookSection';

function LookTable(props, looks) {
  const {
    min, max, width, onResize, onReset, onLookChange, rules, override,
  } = props;
  return (
    <div looks={looks.container}>
      <table looks={looks.table}>
        <tbody>
          <tr>
            <td looks={looks.leftCol}>WIDTH</td>
            <td looks={looks.rightCol}>
              <StyledRangeSlider
                onChange={onResize}
                value={width}
                {...{ min, max }}
              />
            </td>
          </tr>
          <tr>
            <td />
            <td looks={looks.reset}>
              {
                override &&
                <button looks={looks.reset} onClick={onReset}>
                  Reset
                </button>
              }
            </td>
          </tr>
        </tbody>
        {
          Object.keys(rules).map(title => (
            <LookSection
              key={title}
              rules={rules[title]}
              onChange={onLookChange}
              {...{ title, min, max, width }}
            />
          ))
        }
      </table>
    </div>
  );
}

LookTable.looks = {
  container: { margin: 10, width: '100%' },
  table: { width: '100%', borderCollapse: 'collapse' },
  rightCol: { width: '80%' },
  leftCol: {
    width: '20%',
    fontFamily: 'Arial',
    fontWeight: '600',
    fontSize: '13px',
  },
  reset: {
    textTransform: 'uppercase',
    fontSize: '10px',
    color: '#999',
    fontFamily: 'Arial',
    fontWeight: '600',
    height: '13px',
    cursor: 'pointer',
    width: '100%',
    textAlign: 'left',
    background: 'none',
    border: 0,
    padding: 0,
  },
};

LookTable.propTypes = {
  rules: React.PropTypes.object.isRequired,
  onResize: React.PropTypes.func.isRequired,
  onReset: React.PropTypes.func.isRequired,
  onLookChange: React.PropTypes.func.isRequired,
  override: React.PropTypes.object,
  width: React.PropTypes.number,
  min: React.PropTypes.number,
  max: React.PropTypes.number,
};

export default superficial(LookTable);
