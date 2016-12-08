import test from 'tape';
import React from 'react';
import { shallow } from 'enzyme';
import LookSection from '../../src/components/LookSection';

test('LookSection renders a LookRule for each property', (assert) => {
  const looks = { color: 'red', fontSize: '14px' };
  const wrapper = shallow(<LookSection looks={looks} />);
  assert.equal(wrapper.find('LookRule').length, 2);
  assert.end();
});
