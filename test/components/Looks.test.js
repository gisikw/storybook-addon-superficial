import test from 'tape';
import React from 'react';
import { shallow } from 'enzyme';
import Looks from '../../src/components/Looks';

test('Looks forwards props to children', (assert) => {
  const wrapper = shallow(
    <Looks props={{ height: '20px' }}>
      <p />
    </Looks>,
  );
  assert.equal(
    wrapper.first('p').children().first().props().height,
    '20px',
  );
  assert.end();
});
