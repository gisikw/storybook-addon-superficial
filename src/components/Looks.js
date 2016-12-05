import addons from '@kadira/storybook-addons';
import React from 'react';
import { RESIZE_EVENT, DEFINE_EVENT, DEFAULT_WIDTH, DEFAULT_MAX_WIDTH,
         DEFAULT_MIN_WIDTH } from '../constants';

export default class Looks extends React.Component {
  constructor(...args) {
    super(...args);
    this.state = {
      width: this.props.width || DEFAULT_WIDTH,
      channel: addons.getChannel(),
    };
    this.handleResize = this.handleResize.bind(this);
  }

  componentDidMount() {
    const { channel, width } = this.state;
    const { min, max, children } = this.props;
    channel.on(RESIZE_EVENT, this.handleResize);
    channel.emit(DEFINE_EVENT, {
      min: min || DEFAULT_MIN_WIDTH,
      max: max || DEFAULT_MAX_WIDTH,
      looks: children.type.prototype.looks,
      width,
    });
  }

  componentWillUnmount() {
    this.channel.removeListener(RESIZE_EVENT, this.handleResize);
  }

  handleResize(width) { this.setState({ width }); }

  render() {
    const { width } = this.state;
    return (
      <div>
        { React.cloneElement(this.props.children, { width }) }
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
