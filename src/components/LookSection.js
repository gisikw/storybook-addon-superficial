import React from 'react';
import { expandLookRules } from 'superficial/interpolate';
import LookRule from './LookRule';

const ADD_RULE_ENABLED = false;
const styles = {
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

export default class LookSection extends React.Component {
  constructor(...args) {
    super(...args);
    this.onChange = this.onChange.bind(this);
  }

  onChange(prop, value) {
    const { title, looks, onChange } = this.props;
    onChange(title, Object.assign({}, looks, { [prop]: value }));
  }

  render() {
    const { looks, title, min, max, width } = this.props;
    const rules = expandLookRules(looks);
    return (
      <tbody style={styles.label}>
        <tr><td style={styles.title}>{ title }</td></tr>
        {
          Object.keys(rules).sort().map(prop =>
            <LookRule
              key={prop}
              onChange={this.onChange}
              value={rules[prop]}
              {...{ prop, min, max, width }}
            />,
          )
        }
        <tr>
          { ADD_RULE_ENABLED ? <td style={styles.addRule}>+ Add Rule</td> : '' }
        </tr>
      </tbody>
    );
  }
}

LookSection.propTypes = {
  looks: React.PropTypes.object.isRequired,
  onChange: React.PropTypes.func.isRequired,
  title: React.PropTypes.string,
  width: React.PropTypes.number,
  min: React.PropTypes.number,
  max: React.PropTypes.number,
};
