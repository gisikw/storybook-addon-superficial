import test from 'tape';
import React from 'react';
import { shallow } from 'enzyme';
import Breakpoint from '../../src/components/Breakpoint';

test('Breakpoint sets left position', (assert) => {
  const wrapper = shallow(<Breakpoint breakpoint={12.5} min={10} max={20} />);
  assert.equal(wrapper.find('div').prop('style').left, '25%');
  assert.end();
});
