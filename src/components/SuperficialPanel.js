import React from 'react';
import { RESIZE_EVENT, DEFINE_EVENT } from '../constants';

class SuperficialPanel extends React.Component {
  constructor() {
    super();
    this.state = { width: 400 };
    this.forceResize = this.forceResize.bind(this);
    this.props.channel.on(DEFINE_EVENT, ({ min, max, styles }) => {
      this.setState({ min, max, styles });
    });
  }

  forceResize() {
    this.props.channel.emit(RESIZE_EVENT, this.state.width);
  }

  render() {
    return (
      <div>
        <input
          type="range"
          min={this.state.min}
          max={this.state.max}
          onChange={this.forceResize}
          value={this.state.width}
        />
      </div>
    );
  }
}

SuperficialPanel.propTypes = {
  channel: React.PropTypes.ObjectWithShape({
    emit: React.PropTypes.func,
  }),
};

export default SuperficialPanel;
