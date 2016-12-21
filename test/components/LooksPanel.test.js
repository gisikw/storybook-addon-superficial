import test from 'tape';
import React from 'react';
import { shallow } from 'enzyme';
import {
  REGISTER_EVENT, UPDATE_EVENT, UNREGISTER_EVENT,
} from '../../src/constants';
import LooksPanel from '../../src/components/LooksPanel';

test('LooksPanel updates state on receiving events', (assert) => {
  assert.plan(3);
  let wrapper;
  const channel = {
    on(name, cb) {
      switch (name) {
        case REGISTER_EVENT:
          setTimeout(() => {
            cb({ registerCanary: 'test' });
            assert.equal(wrapper.state().registerCanary, 'test');
          });
          break;
        case UPDATE_EVENT:
          setTimeout(() => {
            cb({ looks: 'test' });
            assert.equal(wrapper.state().looks, 'test');
          });
          break;
        case UNREGISTER_EVENT:
          setTimeout(() => {
            cb();
            assert.equal(wrapper.state().active, false);
          });
          break;
        default:
      }
    },
  };
  wrapper = shallow(<LooksPanel channel={channel} />);
});

test('LooksPanel updates width on resize', (assert) => {
  assert.plan(1);
  const channel = { emit() {}, on() {} };
  const wrapper = shallow(<LooksPanel channel={channel} />);
  wrapper.instance().update = ({ width }) => assert.equal(width, 30);
  wrapper.instance().onResize({ target: { value: '30' } });
});

test('LooksPanel updates override on look change', (assert) => {
  assert.plan(1);
  const channel = { emit() {}, on() {} };
  const wrapper = shallow(<LooksPanel channel={channel} />);
  wrapper.instance().update = ({ override }) =>
    assert.deepEqual(override, { foo: 5 });
  wrapper.instance().onLookChange('foo', 5);
});

test('LooksPanel updates override on reset', (assert) => {
  assert.plan(1);
  const channel = { emit() {}, on() {} };
  const wrapper = shallow(<LooksPanel channel={channel} />);
  wrapper.instance().update = ({ override }) => assert.equal(override, null);
  wrapper.instance().onReset();
});

test('LooksPanel updates state and emits an event on update', (assert) => {
  assert.plan(2);
  const channel = { on() {}, emit(_, { foo }) { assert.equal(foo, 'test'); } };
  const wrapper = shallow(<LooksPanel channel={channel} />);
  wrapper.instance().update({ foo: 'test' });
  assert.equal(wrapper.state().foo, 'test');
});
