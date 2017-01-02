import addons from '@kadira/storybook-addons';
import React from 'react';
import {
  DEFAULT_WIDTH, DEFAULT_MAX_WIDTH, DEFAULT_MIN_WIDTH, REGISTER_EVENT,
  UNREGISTER_EVENT, OVERRIDE_EVENT, UPDATE_EVENT,
} from '../constants';

export default class Looks extends React.Component {
  constructor(...args) {
    super(...args);
    this.handleOverride = this.handleOverride.bind(this);
    this.state = {
      channel: addons.getChannel(),
      width: this.props.width || DEFAULT_WIDTH,
    };
  }

  componentDidMount() {
    this.state.channel.on(OVERRIDE_EVENT, this.handleOverride);
    this.state.channel.emit(REGISTER_EVENT, this.getAttributes());
  }

  componentDidUpdate() {
    this.state.channel.emit(UPDATE_EVENT, this.getAttributes());
  }

  componentWillUnmount() {
    this.state.channel.removeListener(OVERRIDE_EVENT, this.handleOverride);
    this.state.channel.emit(UNREGISTER_EVENT);
  }

  getAttributes() {
    return {
      min: this.props.min || DEFAULT_MIN_WIDTH,
      max: this.props.max || DEFAULT_MAX_WIDTH,
      looks: this.props.children.type.looks || {},
      width: this.state.width,
    };
  }

  handleOverride(override) { this.setState(override); }

  render() {
    const { width, override } = this.state;
    const props =
      Object.assign({}, this.props.props, { width, __looksOverride: override });
    return (<div>
      {React.cloneElement(this.props.children, props)}
    </div>);
  }
}

Looks.propTypes = {
  children: React.PropTypes.node.isRequired,
  max: React.PropTypes.number,
  min: React.PropTypes.number,
  props: React.PropTypes.object,
  width: React.PropTypes.number,
};
