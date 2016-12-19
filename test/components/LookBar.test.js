import test from 'tape';
import React from 'react';
import { shallow } from 'enzyme';
import LookBar from '../../src/components/LookBar';

test('LookBar displays a Breakpoint for each size in range', (assert) => {
  const props = {
    value: { 0: '100px', 100: '200px', 1000: '1000px' },
    min: 50,
    max: 800,
  };
  const wrapper = shallow(<LookBar {...props} />);
  assert.equal(wrapper.find('Breakpoint').length, 1);
  assert.end();
});
