import test from 'tape';
import React from 'react';
import { shallow } from 'enzyme';
import {
  MOUNT_EVENT, UNMOUNT_EVENT, OVERRIDE_EVENT, RESET_EVENT,
} from '../../src/constants';
import LooksPanel from '../../src/components/LooksPanel';

test('LooksPanel assigns channel event args to state', (assert) => {
  let channelCallback;
  let state;
  const channel = {
    emit() {},
    on(name, cb) { if (name === MOUNT_EVENT) channelCallback = cb; },
  };
  const wrapper = shallow(<LooksPanel channel={channel} />);
  wrapper.instance().setState = (args) => { state = args; };
  channelCallback({ foo: 'newState' });
  assert.equal(state.foo, 'newState');
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

test('LookPanel emits an override event on look change', (assert) => {
  assert.plan(1);
  const channel = {
    emit: (name) => { if (name === OVERRIDE_EVENT) assert.pass(); },
    on() {},
  };
  const wrapper = shallow(<LooksPanel channel={channel} />);
  wrapper.instance().changeLook();
});

test('LookPanel emits a reset event on reset', (assert) => {
  assert.plan(1);
  const channel = {
    emit: (name) => { if (name === RESET_EVENT) assert.pass(); },
    on() {},
  };
  const wrapper = shallow(<LooksPanel channel={channel} />);
  wrapper.instance().reset();
});

test('LookPanel resets looks on channel umount', (assert) => {
  let unmountCallback;
  const channel = {
    emit() {},
    on(name, cb) { if (name === UNMOUNT_EVENT) unmountCallback = cb; },
  };
  const wrapper = shallow(<LooksPanel channel={channel} />);
  wrapper.setState({ looks: 'bad' });
  assert.notDeepEqual(wrapper.state().looks, {});
  unmountCallback();
  assert.deepEqual(wrapper.state().looks, {});
  assert.end();
});
