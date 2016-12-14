import test from 'tape';
import React from 'react';
import { shallow } from 'enzyme';
import LookRule from '../../src/components/LookRule';

const NOOP = () => {};

test('LookRule displays the property in dash-case', (assert) => {
  const wrapper = shallow(
    <LookRule prop="textAlign" onChange={NOOP} />,
  );
  assert.equal(wrapper.find('td').first().text(), 'text-align');
  assert.end();
});

test('LookRule displays string values', (assert) => {
  const wrapper = shallow(<LookRule prop="" value="test" onChange={NOOP} />);
  assert.equal(wrapper.find('td').last().text(), 'test');
  assert.end();
});

test('LookRule displays a LookBar for object values', (assert) => {
  const wrapper = shallow(<LookRule prop="" value={{}} onChange={NOOP} />);
  assert.ok(wrapper.find('LookBar').length);
  assert.end();
});

test('LookRule allows editing of properties', (assert) => {
  const wrapper = shallow(<LookRule prop="" onChange={NOOP} />);
  assert.notOk(wrapper.find('StyledInput').length);
  wrapper.find('button').first().prop('onClick')();
  assert.ok(wrapper.find('StyledInput').length);
  wrapper.instance().handlePropChange();
  assert.notOk(wrapper.find('StyledInput').length);
  assert.end();
});

test('LookRule allows editing of values', (assert) => {
  const wrapper = shallow(<LookRule prop="" onChange={NOOP} />);
  assert.notOk(wrapper.find('StyledInput').length);
  wrapper.find('button').last().prop('onClick')();
  assert.ok(wrapper.find('StyledInput').length);
  wrapper.instance().handleValueChange();
  assert.notOk(wrapper.find('StyledInput').length);
  assert.end();
});

test('LookRule calls onChange if the property changes', (assert) => {
  assert.plan(1);
  const wrapper = shallow(<LookRule prop="" onChange={assert.pass} />);
  wrapper.instance().handlePropChange(0, true);
});

test('LookRule calls onChange if the value changes', (assert) => {
  assert.plan(1);
  const wrapper = shallow(<LookRule prop="" onChange={assert.pass} />);
  wrapper.instance().handleValueChange(0, true);
});
