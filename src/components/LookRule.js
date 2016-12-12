import React from 'react';
import LookBar from './LookBar';

const dasherize = word =>
  word.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();

const editableValue = value => (typeof value !== 'object'
  ? value
  : JSON.stringify(value)
      .replace(/"([^"]+)":/g, '$1:')
      .replace(',', ', ')
      .replace(/[{}]/g, ''));

const parseInput = value => (value.indexOf(':') === -1
  ? value
  : JSON.parse(`{${value.replace(/(\d+):/g, '"$1":')}}`));

const styles = {
  prop: { verticalAlign: 'top' },
  value: {
    cursor: 'pointer',
    width: '100%',
    textAlign: 'left',
    background: 'none',
    border: 0,
    padding: 0,
    font: 'inherit',
    textTransform: 'uppercase',
    color: '#444',
  },
  input: isObject => ({
    fontSize: '10px',
    height: '11px',
    background: '#ddd',
    width: '100%',
    padding: `0 5px ${isObject ? 13 : 0}px`,
    margin: 0,
    border: 0,
    outline: 0,
  }),
};

const handleFocus = ({ target }) => target.select();

export default class LookRule extends React.Component {
  constructor(...args) {
    super(...args);
    this.handleClick = this.handleClick.bind(this);
    this.handleBlur = this.handleBlur.bind(this);
    this.state = { editable: false };
  }

  handleBlur({ target }) {
    const { onChange, prop } = this.props;
    onChange(prop, parseInput(target.value));
    this.setState({ editable: false });
  }
  handleClick() { this.setState({ editable: true }); }

  renderValue() {
    const { prop, value, min, max, width } = this.props;
    if (this.state.editable) {
      return (
        <input
          style={styles.input(typeof value === 'object')}
          defaultValue={editableValue(value)}
          onBlur={this.handleBlur}
          onFocus={handleFocus}
          autoFocus
        />
      );
    }
    if (typeof value !== 'object') return value;
    return <LookBar {...{ prop, value, min, max, width }} />;
  }

  render() {
    return (
      <tr>
        <td style={styles.prop}>{ dasherize(this.props.prop) }</td>
        <td>
          <button style={styles.value} onClick={this.handleClick}>
            { this.renderValue() }
          </button>
        </td>
      </tr>
    );
  }
}

LookRule.propTypes = {
  prop: React.PropTypes.string.isRequired,
  onChange: React.PropTypes.func.isRequired,
  value: React.PropTypes.any,
  width: React.PropTypes.number,
  min: React.PropTypes.number,
  max: React.PropTypes.number,
};
