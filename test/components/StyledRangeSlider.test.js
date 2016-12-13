import test from 'tape';
import React from 'react';
import { shallow } from 'enzyme';
import StyledRangeSlider from '../../src/components/StyledRangeSlider';

test('StyledRangeSlider sets button left position percent', (assert) => {
  const wrapper = shallow(<StyledRangeSlider value={12.5} min={10} max={20} />);
  assert.equal(
    wrapper.find('div > div').prop('style').left.match(/\d+%/)[0],
    '25%',
  );
  assert.end();
});

test('StyledRangeSlider sets button left offset toward the edges', (assert) => {
  const leftWrapper =
    shallow(<StyledRangeSlider value={10} min={10} max={20} />);
  const rightWrapper =
    shallow(<StyledRangeSlider value={20} min={10} max={20} />);
  assert.equal(
    leftWrapper.find('div > div').prop('style').left.match(/-?\d+px/)[0],
    '15px',
  );
  assert.equal(
    rightWrapper.find('div > div').prop('style').left.match(/-?\d+px/)[0],
    '-15px',
  );
  assert.end();
});
