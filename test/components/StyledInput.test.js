import test from 'tape';
import React from 'react';
import { shallow } from 'enzyme';
import StyledInput from '../../src/components/StyledInput';

test('StyledInput calls onChange when the input blurs', (assert) => {
  assert.plan(1);
  const onChange = () => assert.pass();
  const wrapper = shallow(
    <StyledInput onChange={onChange} defaultValue="test" />,
  );
  wrapper.find('input').prop('onBlur')({ target: { value: 'test-value' } });
});

test('StyledInput selects text on focus', (assert) => {
  assert.plan(1);
  const wrapper = shallow(
    <StyledInput onChange={() => {}} />,
  );
  wrapper.find('input').prop('onFocus')({
    target: { select: assert.pass },
  });
});

test('StyledInput stringifies object defaultValues', (assert) => {
  const wrapper = shallow(
    <StyledInput
      onChange={() => {}}
      defaultValue={{ 200: 'foo', 300: 'bar' }}
    />,
  );
  assert.equal(
    wrapper.find('input').prop('defaultValue'),
    '200: "foo", 300: "bar"',
  );
  assert.end();
});

test('StyledInput deserializes object input values', (assert) => {
  let result;
  const onChange = val => (result = val);
  const wrapper = shallow(
    <StyledInput onChange={onChange} defaultValue="" />,
  );
  wrapper.find('input').prop('onBlur')({ target: {
    value: '200: "foo", 300: "bar"',
  } });
  assert.deepEqual(result, { 200: 'foo', 300: 'bar' });
  assert.end();
});
