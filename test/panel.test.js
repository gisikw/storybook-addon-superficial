import React from 'react';
import test from 'tape';
import { shallow } from 'enzyme';
import LooksPanel from '../src/components/LooksPanel';

function makePanel(looks) {
  const panel = shallow(<LooksPanel channel={{ on() {} }} />);
  panel.setState({ looks });
  return panel;
}

test('LooksPanel displays static component properties', (assert) => {
  const panel = makePanel({
    square: { margin: '0 auto' },
  });
  assert.ok(panel.contains(
    <tr>
      <td>margin</td>
      <td>0 auto</td>
    </tr>,
  ));
  assert.end();
});
