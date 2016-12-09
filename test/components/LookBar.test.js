import test from 'tape';
import React from 'react';
import { shallow } from 'enzyme';
import LookBar from '../../src/components/LookBar';

test('LookBar displays a Breakpoint for each size', (assert) => {
  const props = { value: { 0: '100px', 100: '200px' } };
  const wrapper = shallow(<LookBar {...props} />);
  assert.equal(wrapper.find('Breakpoint').length, 2);
  assert.end();
});
