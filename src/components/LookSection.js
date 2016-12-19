import React from 'react';
import superficial, { expandLookRules } from 'superficial';
import LookRule from './LookRule';
import { BUTTON_LOOK } from '../constants';

class LookSection extends React.Component {
  constructor(...args) {
    super(...args);
    this.onChange = this.onChange.bind(this);
    this.addRule = this.addRule.bind(this);
  }

  onChange(prop, value) {
    const { title, rules, onChange } = this.props;
    if (value.to) {
      const newLooks = Object.assign({}, rules, { [value.to]: rules[prop] });
      delete newLooks[prop];
      onChange(title, newLooks);
    } else {
      onChange(title, Object.assign({}, rules, { [prop]: value }));
    }
  }

  addRule() {
    const { title, rules, onChange } = this.props;
    onChange(title, Object.assign({}, rules, { '| edit |': '| value |' }));
  }

  render() {
    const { rules, title, min, max, width } = this.props;
    const expanded = expandLookRules(rules);
    return (
      <tbody looks={this.looks.label}>
        <tr><td looks={this.looks.title}>{ title }</td></tr>
        {
          Object.keys(expanded).sort().map(prop =>
            <LookRule
              key={prop}
              onChange={this.onChange}
              value={expanded[prop]}
              {...{ prop, min, max, width }}
            />,
          )
        }
        <tr>
          <td looks={this.looks.addRule}>
            <button looks={BUTTON_LOOK} onClick={this.addRule}>
              + Add Rule
            </button>
          </td>
        </tr>
      </tbody>
    );
  }
}

LookSection.propTypes = {
  rules: React.PropTypes.object.isRequired,
  onChange: React.PropTypes.func.isRequired,
  title: React.PropTypes.string,
  width: React.PropTypes.number,
  min: React.PropTypes.number,
  max: React.PropTypes.number,
};

LookSection.looks = {
  title: { textDecoration: 'underline' },
  addRule: { color: '#999', cursor: 'pointer' },
  label: {
    textTransform: 'uppercase',
    fontSize: '10px',
    color: '#444',
    fontFamily: 'Arial',
    fontWeight: '600',
    borderBottom: '10px solid transparent',
  },
};

export default superficial(LookSection);
