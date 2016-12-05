import React from 'react';
import LookSection from './LookSection';
import StyledInput from './StyledInput';
import { RESIZE_EVENT, DEFINE_EVENT, DEFAULT_WIDTH, DEFAULT_MAX_WIDTH,
         DEFAULT_MIN_WIDTH } from '../constants';

const styles = {
  container: { margin: 10, width: '100%' },
  table: { width: '100%' },
  rightCol: { width: '80%' },
  leftCol: {
    width: '20%',
    fontFamily: 'Arial',
    fontWeight: '600',
    fontSize: '13px',
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
    this.props.channel.on(DEFINE_EVENT, opts => this.setState(opts));
  }

  forceResize({ target }) {
    const width = parseInt(target.value, 10);
    this.props.channel.emit(RESIZE_EVENT, width);
    this.setState({ width });
  }

  render() {
    const { looks, min, max, width } = this.state;
    const inputArgs = { onChange: this.forceResize, value: width, min, max };
    return (
      <div style={styles.container}>
        <table style={styles.table}>
          <tbody>
            <tr>
              <td style={styles.leftCol}>WIDTH</td>
              <td style={styles.rightCol}>
                <StyledInput {...inputArgs} />
              </td>
            </tr>
          </tbody>
          {
            Object.keys(looks).map(title =>
              <LookSection
                key={title}
                {...{ looks: looks[title], title, min, max }}
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
  }),
};

export default LooksPanel;
