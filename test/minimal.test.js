import test from 'tape';
import '../src';
import '../src/register';

test('code works', (assert) => {
  assert.pass('Libraries load without error');
  assert.end();
});
