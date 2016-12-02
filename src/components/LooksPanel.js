import React from 'react';
import { RESIZE_EVENT, DEFINE_EVENT, DEFAULT_WIDTH, DEFAULT_MAX_WIDTH,
         DEFAULT_MIN_WIDTH } from '../constants';

const colors = [];
const getColor = i => colors[i] || (colors[i] =
  `#${`000000${Math.random().toString(16).slice(2, 8)}`.slice(-6)}`);

const styles = {
  label: {
    textTransform: 'uppercase',
    fontSize: '10px',
    color: '#444',
    fontFamily: 'Arial',
    fontWeight: '600',
  },
};

class LooksPanel extends React.Component {
  constructor(...args) {
    super(...args);
    this.state = {
      min: DEFAULT_MIN_WIDTH,
      max: DEFAULT_MAX_WIDTH,
      width: DEFAULT_WIDTH,
      looks: {},
    };
    this.forceResize = this.forceResize.bind(this);
    this.props.channel.on(DEFINE_EVENT, ({ min, max, width, looks }) => {
      this.setState({ min, max, width, looks });
    });
  }

  getPercent(n) {
    return `${
      ((n - this.state.min) /
      (this.state.max - this.state.min))
      * 100
    }%`;
  }

  forceResize({ target }) {
    const width = parseInt(target.value, 10);
    this.props.channel.emit(RESIZE_EVENT, width);
    this.setState({ width });
  }

  styleSection(key) {
    const props = expandStyles(this.state.looks[key]);
    return (
      <tbody key={key} style={styles.label}>
        <tr>
          <td
            style={{
              borderBottom: '1px solid #ccc',
              borderTop: '10px solid transparent',
            }}
          >
            { key }
          </td>
        </tr>
        { Object.keys(props).map(prop => this.styleRow(prop, props[prop])) }
      </tbody>
    );
  }

  styleRow(prop, value) {
    if (typeof value !== 'object') {
      return <tr key={prop}><td>{ prop }</td><td>{ value }</td></tr>;
    }
    const keys = Object.keys(value).sort((a, b) => a - b);
    const min = keys[0];
    const max = keys[keys.length - 1];
    return (
      <tr key={prop}>
        <td>{ prop }</td>
        <td style={{ position: 'relative' }}>
          <div
            style={{
              position: 'absolute',
              left: this.getPercent(min),
              right: `${100 - parseFloat(this.getPercent(max))}%`,
              top: '50%',
              marginTop: '-1px',
              height: '2px',
              background: getColor(prop),
            }}
          />
          {
            keys.map(key => (
              <div
                key={key}
                title={`${key}px: ${value[key]}`}
                style={{
                  position: 'absolute',
                  top: '50%',
                  marginTop: '-3px',
                  height: '6px',
                  width: '6px',
                  background: 'black',
                  left: this.getPercent(key),
                  borderRadius: '6px',
                  cursor: 'pointer',
                }}
              />
            ))
          }
        </td>
      </tr>
    );
  }


  render() {
    const looks = Object.keys(this.state.looks);
    return (
      <div style={{ margin: 10, width: '100%' }}>
        <table style={{ width: '100%' }}>
          <tbody>
            <tr>
              <td style={{ width: '20%' }} />
              <td style={{ width: '80%' }}>
                <input
                  type="range"
                  style={{ width: '100%' }}
                  min={this.state.min}
                  max={this.state.max}
                  onChange={this.forceResize}
                  value={this.state.width}
                />
              </td>
            </tr>
          </tbody>
          { looks.map(look => this.styleSection(look)) }
        </table>
      </div>
    );
  }
}

LooksPanel.propTypes = {
  channel: React.PropTypes.shape({
    emit: React.PropTypes.func,
    on: React.PropTypes.func,
  }),
};

const isNumeric = s => !isNaN(parseFloat(s)) && isFinite(s);

// Split out grouped breakpoint rules into individual properties
function expandStyles(rules) {
  return Object.keys(rules).reduce((o, key) => {
    if (isNumeric(key)) {
      return Object.assign({}, o,
        ...Object.keys(rules[key]).map(prop => ({
          [prop]: Object.assign({}, o[prop], {
            [key]: rules[key][prop],
          }),
        })),
      );
    }
    return Object.assign({}, o, { [key]: rules[key] });
  }, {});
}

export default LooksPanel;
