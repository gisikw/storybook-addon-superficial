import test from 'tape';
import React from 'react';
import { shallow } from 'enzyme';
import LookRule from '../../src/components/LookRule';

test('LookRule displays the property in dash-case', (assert) => {
  const wrapper = shallow(<LookRule prop="textAlign" />);
  assert.equal(wrapper.find('td').first().text(), 'text-align');
  assert.end();
});

test('LookRule displays string values', (assert) => {
  const wrapper = shallow(<LookRule prop="textAlign" value="testVal" />);
  assert.equal(wrapper.find('td').last().text(), 'testVal');
  assert.end();
});

test('LookRule displays a LookBar for object values', (assert) => {
  const wrapper = shallow(<LookRule prop="textAlign" value={{}} />);
  assert.ok(wrapper.find('LookBar').length);
  assert.end();
});
