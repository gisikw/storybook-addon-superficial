import React from 'react';
import superficial from 'superficial';
import LookBar from './LookBar';
import StyledInput from './StyledInput';
import { BUTTON_LOOK } from '../constants';

const dasherize = word =>
  word.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();

class LookRule extends React.Component {
  constructor(...args) {
    super(...args);
    this.handleValueClick = this.handleValueClick.bind(this);
    this.handlePropClick = this.handlePropClick.bind(this);
    this.handleValueChange = this.handleValueChange.bind(this);
    this.handlePropChange = this.handlePropChange.bind(this);
    this.state = { edit: false };
  }

  handlePropClick() { this.setState({ edit: 'prop' }); }
  handleValueClick() { this.setState({ edit: 'value' }); }
  handlePropChange(value, didChange) {
    if (didChange) this.props.onChange(this.props.prop, { to: value });
    this.setState({ edit: false });
  }
  handleValueChange(value, didChange) {
    if (didChange) this.props.onChange(this.props.prop, value);
    this.setState({ edit: false });
  }

  renderProp() {
    if (this.state.edit === 'prop') {
      return (
        <StyledInput
          defaultValue={dasherize(this.props.prop)}
          onChange={this.handlePropChange}
        />
      );
    }
    return dasherize(this.props.prop);
  }

  renderValue() {
    const { prop, value, min, max, width } = this.props;
    if (this.state.edit === 'value') {
      return (
        <StyledInput
          defaultValue={value}
          onChange={this.handleValueChange}
        />
      );
    }
    if (typeof value !== 'object') return value;
    return <LookBar {...{ prop, value, min, max, width }} />;
  }

  render() {
    return (
      <tr>
        <td looks={this.looks.prop}>
          <button looks={BUTTON_LOOK} onClick={this.handlePropClick}>
            { this.renderProp() }
          </button>
        </td>
        <td>
          <button
            looks={[BUTTON_LOOK, this.looks.value]}
            onClick={this.handleValueClick}
          >
            { this.renderValue() }
          </button>
        </td>
      </tr>
    );
  }
}

LookRule.propTypes = {
  prop: React.PropTypes.string.isRequired,
  onChange: React.PropTypes.func.isRequired,
  value: React.PropTypes.any,
  width: React.PropTypes.number,
  min: React.PropTypes.number,
  max: React.PropTypes.number,
};

LookRule.looks = {
  value: { width: '100%', color: '#222' },
};

export default superficial(LookRule);
