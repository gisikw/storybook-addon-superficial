import addons from '@kadira/storybook-addons';
import React from 'react';
import {
  RESIZE_EVENT, MOUNT_EVENT, UNMOUNT_EVENT, OVERRIDE_EVENT, RESET_EVENT,
  DEFAULT_WIDTH, DEFAULT_MAX_WIDTH, DEFAULT_MIN_WIDTH,
} from '../constants';

export default class Looks extends React.Component {
  constructor(...args) {
    super(...args);
    this.handleResize = this.handleResize.bind(this);
    this.handleOverride = this.handleOverride.bind(this);
    this.handleReset = this.handleReset.bind(this);
    this.state = {
      width: this.props.width || DEFAULT_WIDTH,
      override: {},
      channel: addons.getChannel(),
    };
  }

  componentDidMount() {
    const { channel, width } = this.state;
    const { min, max, children } = this.props;
    channel.on(RESIZE_EVENT, this.handleResize);
    channel.on(OVERRIDE_EVENT, this.handleOverride);
    channel.on(RESET_EVENT, this.handleReset);
    channel.emit(MOUNT_EVENT, {
      min: min || DEFAULT_MIN_WIDTH,
      max: max || DEFAULT_MAX_WIDTH,
      looks: children.type.prototype.looks,
      width,
    });
  }

  componentWillUnmount() {
    const { channel } = this.state;
    channel.emit(UNMOUNT_EVENT);
    channel.removeListener(RESIZE_EVENT, this.handleResize);
    channel.removeListener(OVERRIDE_EVENT, this.handleOverride);
    channel.removeListener(RESET_EVENT, this.handleOverride);
  }

  handleResize(width) { this.setState({ width }); }
  handleOverride(override) { this.setState({ override }); }
  handleReset() { this.setState({ override: {} }); }

  render() {
    const { width, override } = this.state;
    return (
      <div>
        {
          React.cloneElement(
            this.props.children,
            { width, __looksOverride: override },
          )
        }
      </div>
    );
  }
}

Looks.propTypes = {
  children: React.PropTypes.node.isRequired,
  min: React.PropTypes.number,
  max: React.PropTypes.number,
  width: React.PropTypes.number,
};
