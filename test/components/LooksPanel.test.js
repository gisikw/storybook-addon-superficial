import test from 'tape';
import React from 'react';
import { shallow } from 'enzyme';
import LooksPanel from '../../src/components/LooksPanel';

test('LooksPanel assigns channel event args to state', (assert) => {
  let channelCallback;
  let state;
  const channel = { emit() {}, on(_, cb) { channelCallback = cb; } };
  const wrapper = shallow(<LooksPanel channel={channel} />);
  wrapper.instance().setState = (args) => { state = args; };
  channelCallback('newState');
  assert.equal(state, 'newState');
  assert.end();
});

test('LooksPanel renders a LookSection for each look', (assert) => {
  const looks = { foo: {}, bar: {}, baz: {} };
  const channel = { emit() {}, on() {} };
  const wrapper = shallow(<LooksPanel channel={channel} />);
  wrapper.setState({ looks });
  assert.equal(wrapper.find('LookSection').length, 3);
  assert.end();
});

test('LooksPanel emits an event on forceResize', (assert) => {
  let size;
  const channel = { emit(_, arg) { size = arg; }, on() {} };
  const wrapper = shallow(<LooksPanel channel={channel} />);
  wrapper.instance().forceResize({ target: { value: 50 } });
  assert.equal(size, 50);
  assert.end();
});
