import React from 'react';

const editableValue = value => (typeof value !== 'object'
  ? value
  : JSON.stringify(value)
      .replace(/"([^"]+)":/g, '$1: ')
      .replace(',', ', ')
      .replace(/[{}]/g, ''));

const parseInput = value => (value.indexOf(':') === -1
  ? value.replace(/-([a-z])/g, g => g[1].toUpperCase())
  : JSON.parse(`{${value.replace(/(\d+):/g, '"$1":')}}`));

const style = isObject => ({
  fontSize: '10px',
  height: '11px',
  background: '#ddd',
  width: '100%',
  padding: `0 0 ${isObject ? 13 : 0}px`,
  margin: 0,
  border: 0,
  outline: 0,
});

export default function StyledInput({ defaultValue, onChange }) {
  const val = editableValue(defaultValue);
  const handleBlur = ({ target }) => {
    const input = parseInput(target.value);
    onChange(input, val !== target.value);
  };
  return (
    <input
      style={style(typeof defaultValue === 'object')}
      defaultValue={editableValue(defaultValue)}
      onFocus={e => e.target.select()}
      onBlur={handleBlur}
      autoFocus
    />
  );
}

StyledInput.propTypes = {
  onChange: React.PropTypes.func.isRequired,
  defaultValue: React.PropTypes.any,
};
