import addons from '@kadira/storybook-addons';
import React from 'react';
import { RESIZE_EVENT, DEFINE_EVENT } from './constants';

export default class SuperficialView extends React.Component {
  constructor() {
    super();
    this.state = { width: 400 };
    this.channel = addons.getChannel();
    this.handleResize = this.handleResize.bind(this);
  }

  componentDidMount() {
    this.channel.on(RESIZE_EVENT, this.handleResize);
    this.channel.emit(DEFINE_EVENT, {
      min: 0,
      max: 1000,
      looks: this.props.children.type.prototype.looks,
    });
  }

  componentWillUnmount() {
    this.channel.removeListener(RESIZE_EVENT, this.handleResize);
  }

  handleResize(width) {
    this.setState({ width });
  }

  render() {
    const { width } = this.state;
    return (
      <div>
        { React.cloneElement(this.props.children, { width }) }
      </div>
    );
  }
}

SuperficialView.propTypes = {
  children: React.PropTypes.node,
};
