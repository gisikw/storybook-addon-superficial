import test from 'tape';
import addons from '@kadira/storybook-addons';

test('Register registers the addon and adds a valid panel', (assert) => {
  let addPanelCalled = false;
  const { register, addPanel, getChannel } = addons;
  addons.register = (_, cb) => cb();
  addons.getChannel = () => ({ emit() {}, on() {} });
  addons.addPanel = (_, { render }) => {
    render();
    addPanelCalled = true;
  };
  require('../src/register');
  assert.ok(addPanelCalled);
  Object.assign(addons, { register, addPanel, getChannel });
  assert.end();
});
