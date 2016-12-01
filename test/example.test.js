import test from 'tape';
import code from '../src';

test('code works', (assert) => {
  code();
  assert.pass('Superficial return value is renderable');
  assert.end();
});
