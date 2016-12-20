import React from 'react';
import superficial from 'superficial';

const editableValue = value => (typeof value !== 'object'
  ? value
  : JSON.stringify(value)
      .replace(/"([^"]+)":/g, '$1: ')
      .replace(',', ', ')
      .replace(/[{}]/g, ''));

const parseInput = value => (value.indexOf(':') === -1
  ? value.replace(/-([a-z])/g, g => g[1].toUpperCase())
  : JSON.parse(`{${value.replace(/(\d+):/g, '"$1":')}}`));

function StyledInput({ defaultValue, onChange }, looks) {
  const val = editableValue(defaultValue);
  const handleBlur = ({ target }) => {
    const input = parseInput(target.value);
    onChange(input, val !== target.value);
  };
  return (
    <input
      looks={looks.input}
      style={{
        padding: typeof defaultValue === 'object'
          ? '0 0 13px 0'
          : 0,
      }}
      defaultValue={editableValue(defaultValue)}
      onFocus={e => e.target.select()}
      onBlur={handleBlur}
      autoFocus
    />
  );
}

StyledInput.looks = {
  input: {
    fontSize: '10px',
    height: '11px',
    background: '#ddd',
    width: '100%',
    margin: 0,
    border: 0,
    outline: 0,
  },
};

StyledInput.propTypes = {
  onChange: React.PropTypes.func.isRequired,
  defaultValue: React.PropTypes.any,
};

export default superficial(StyledInput);
