import test from 'tape';
import React from 'react';
import { shallow } from 'enzyme';
import LookTable from '../../src/components/LookTable';

test('LookTable renders a LookSection for each look', (assert) => {
  const props = { min: 0, max: 10, width: 5, rules: { foo: {}, bar: {} } };
  const wrapper = shallow(<LookTable {...props} />);
  assert.equal(wrapper.find('LookSection').length, 2);
  assert.end();
});

test('LookTable renders a reset button when override is present', (assert) => {
  const props = { min: 0, max: 10, width: 5, rules: {}, override: true };
  const wrapper = shallow(<LookTable {...props} />);
  assert.equal(wrapper.find('button').length, 1);
  assert.end();
});
