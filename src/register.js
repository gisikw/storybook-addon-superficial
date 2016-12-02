import React from 'react';
import addons from '@kadira/storybook-addons';
import SuperficialPanel from './components/SuperficialPanel';

const ADDON_ID = 'gisikw/superficial';
const PANEL_NAME = 'gisikw/superficial/panel';
const PANEL_TITLE = 'Looks';

addons.register(ADDON_ID, (api) => {
  addons.addPanel(PANEL_NAME, {
    title: PANEL_TITLE,
    render: () => (
      <SuperficialPanel channel={addons.getChannel()} api={api} />
    ),
  });
});
