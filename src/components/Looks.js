import addons from '@kadira/storybook-addons';
import React from 'react';
import { RESIZE_EVENT, DEFINE_EVENT, DEFAULT_WIDTH, DEFAULT_MAX_WIDTH,
         DEFAULT_MIN_WIDTH } from '../constants';

export default class Looks extends React.Component {
  constructor(...args) {
    super(...args);
    this.state = { width: DEFAULT_WIDTH, channel: addons.getChannel() };
    this.handleResize = this.handleResize.bind(this);
  }

  componentDidMount() {
    const { channel } = this.state;
    channel.on(RESIZE_EVENT, this.handleResize);
    channel.emit(DEFINE_EVENT, {
      min: DEFAULT_MIN_WIDTH,
      max: DEFAULT_MAX_WIDTH,
      looks: this.props.children.type.prototype.looks,
    });
  }

  componentWillUnmount() {
    this.channel.removeListener(RESIZE_EVENT, this.handleResize);
  }

  handleResize(width) { this.setState({ width }); }

  render() {
    return (
      <div>
        { React.cloneElement(this.props.children, { width: this.state.width }) }
      </div>
    );
  }
}

Looks.propTypes = {
  children: React.PropTypes.node,
};
