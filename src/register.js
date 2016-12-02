import React from 'react';
import addons from '@kadira/storybook-addons';
import { ADDON_ID, PANEL_TITLE, PANEL_NAME } from './constants';
import LooksPanel from './components/LooksPanel';

addons.register(ADDON_ID, (api) => {
  addons.addPanel(PANEL_NAME, {
    title: PANEL_TITLE,
    render: () => <LooksPanel channel={addons.getChannel()} api={api} />,
  });
});
