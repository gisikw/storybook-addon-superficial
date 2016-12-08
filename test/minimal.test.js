import test from 'tape';
import '../src';
import '../src/register';

test('Library loads', (assert) => {
  assert.pass('Libraries load without error');
  assert.end();
});
