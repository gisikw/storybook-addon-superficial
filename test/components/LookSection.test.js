import test from 'tape';
import React from 'react';
import { shallow } from 'enzyme';
import LookSection from '../../src/components/LookSection';

const NOOP = () => {};

test('LookSection renders a LookRule for each property', (assert) => {
  const rules = { color: 'red', fontSize: '14px' };
  const wrapper = shallow(<LookSection rules={rules} onChange={NOOP} />);
  assert.equal(wrapper.find('LookRule').length, 2);
  assert.end();
});

test('LookSection handles renamed properties', (assert) => {
  assert.plan(1);
  const onChange = (_, newLooks) =>
    assert.deepEqual(newLooks, { background: 'red', fontSize: '14px' });
  const rules = { color: 'red', fontSize: '14px' };
  const wrapper = shallow(<LookSection rules={rules} onChange={onChange} />);
  wrapper.instance().onChange('color', { to: 'background' });
});

test('LookSection handles changed property values', (assert) => {
  assert.plan(1);
  const onChange = (_, newLooks) =>
    assert.deepEqual(newLooks, { color: 'blue', fontSize: '14px' });
  const rules = { color: 'red', fontSize: '14px' };
  const wrapper = shallow(<LookSection rules={rules} onChange={onChange} />);
  wrapper.instance().onChange('color', 'blue');
});

test('LookSection allows adding additional rules', (assert) => {
  assert.plan(1);
  const onChange = (_, newLooks) =>
    assert.deepEqual(newLooks, { color: 'red', '| edit |': '| value |' });
  const rules = { color: 'red' };
  const wrapper = shallow(<LookSection rules={rules} onChange={onChange} />);
  wrapper.instance().addRule();
});
