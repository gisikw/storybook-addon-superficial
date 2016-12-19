import React from 'react';
import LookSection from './LookSection';
import StyledRangeSlider from './StyledRangeSlider';
import {
  RESIZE_EVENT, MOUNT_EVENT, UNMOUNT_EVENT, OVERRIDE_EVENT, RESET_EVENT,
  DEFAULT_WIDTH, DEFAULT_MAX_WIDTH, DEFAULT_MIN_WIDTH,
} from '../constants';

const DEFAULT_STATE = {
  min: DEFAULT_MIN_WIDTH,
  max: DEFAULT_MAX_WIDTH,
  width: DEFAULT_WIDTH,
  cleanLooks: {},
  active: false,
  looks: {},
};

const styles = {
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

class LooksPanel extends React.Component {
  constructor(...args) {
    super(...args);
    this.forceResize = this.forceResize.bind(this);
    this.changeLook = this.changeLook.bind(this);
    this.reset = this.reset.bind(this);
    this.props.channel.on(MOUNT_EVENT, opts =>
      this.setState(Object.assign({ cleanLooks: opts.looks, active: true },
                                  opts)));
    this.props.channel.on(UNMOUNT_EVENT, () => this.setState(DEFAULT_STATE));
    this.state = DEFAULT_STATE;
  }

  changeLook(name, rules) {
    const looks = Object.assign({}, this.state.looks, { [name]: rules });
    this.props.channel.emit(OVERRIDE_EVENT, looks);
    this.setState({ dirty: true, looks });
  }

  forceResize({ target }) {
    const width = parseInt(target.value, 10);
    this.props.channel.emit(RESIZE_EVENT, width);
    this.setState({ width });
  }

  reset() {
    this.props.channel.emit(RESET_EVENT);
    this.setState({ looks: this.state.cleanLooks, dirty: false });
  }

  render() {
    const { looks, min, max, width, dirty, active } = this.state;
    if (!active) return null;
    const inputArgs = { onChange: this.forceResize, value: width, min, max };
    return (
      <div style={styles.container}>
        <table style={styles.table}>
          <tbody>
            <tr>
              <td style={styles.leftCol}>WIDTH</td>
              <td style={styles.rightCol}>
                <StyledRangeSlider {...inputArgs} />
              </td>
            </tr>
            <tr>
              <td />
              <td style={styles.reset}>
                {
                  dirty
                    ? <button style={styles.reset} onClick={this.reset}>
                        Reset
                      </button>
                    : ''
                }
              </td>
            </tr>
          </tbody>
          {
            Object.keys(looks).map(title =>
              <LookSection
                key={title}
                looks={looks[title]}
                onChange={this.changeLook}
                {...{ title, min, max, width }}
              />,
            )
          }
        </table>
      </div>
    );
  }
}

LooksPanel.propTypes = {
  channel: React.PropTypes.shape({
    emit: React.PropTypes.func,
    on: React.PropTypes.func,
  }).isRequired,
};

export default LooksPanel;
