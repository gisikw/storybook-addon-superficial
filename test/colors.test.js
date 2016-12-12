import test from 'tape';
import colors from '../src/colors';

test('Colors caches unique values for names', (assert) => {
  const fooColor = colors('foo');
  assert.equal(fooColor, colors('foo'));
  assert.notEqual(colors('foo'), colors('bar'));
  assert.end();
});
