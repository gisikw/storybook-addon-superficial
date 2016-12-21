import React from 'react';
import LookTable from './LookTable';
import {
  REGISTER_EVENT, UNREGISTER_EVENT, UPDATE_EVENT, OVERRIDE_EVENT,
} from '../constants';

class LooksPanel extends React.Component {
  constructor(...args) {
    super(...args);

    this.onLookChange = this.onLookChange.bind(this);
    this.onResize = this.onResize.bind(this);
    this.onReset = this.onReset.bind(this);

    this.props.channel.on(REGISTER_EVENT, opts =>
      this.setState(Object.assign({ active: true, override: null }, opts)));
    this.props.channel.on(UPDATE_EVENT, ({ looks }) =>
      this.setState({ looks }));
    this.props.channel.on(UNREGISTER_EVENT, () =>
      this.setState({ active: false }));

    this.state = {};
  }

  onResize({ target: { value } }) {
    this.update({ width: parseInt(value, 10) });
  }

  onLookChange(section, rules) {
    this.update({
      override: Object.assign({}, this.state.override, { [section]: rules }),
    });
  }

  onReset() { this.update({ override: null }); }

  update(args) {
    this.props.channel.emit(OVERRIDE_EVENT, args);
    this.setState(args);
  }

  render() {
    if (!this.state.active) return null;
    const { onLookChange, onResize, onReset } = this;
    const { override, width, min, max, looks } = this.state;
    const rules = Object.assign({}, looks, override);
    return (<LookTable
      {...{ rules, onLookChange, onResize, onReset, min, max, width, override }}
    />);
  }
}

LooksPanel.propTypes = {
  channel: React.PropTypes.shape({
    emit: React.PropTypes.func,
    on: React.PropTypes.func,
  }).isRequired,
};

export default LooksPanel;
