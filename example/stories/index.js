import React from 'react';
import { storiesOf } from '@kadira/storybook';
import Looks from '../../src';
import superficial from 'superficial';
import TransformBox from '../components/TransformBox';
import StatelessHeader from '../components/StatelessHeader';

storiesOf('Resizing Box', module)
  .add('Basic example', () => (
    <Looks><TransformBox /></Looks>
  ))
  .add('With Looks args', () => (
    <Looks min={200} max={1000} width={600}>
      <TransformBox />
    </Looks>
  ));

storiesOf('Stateless Header', module)
  .add('Basic example', () => (
    <Looks><StatelessHeader /></Looks>
  ))
