import { configure } from '@kadira/storybook';
import { setOptions } from '@kadira/storybook-addon-options';

setOptions({
  name: 'Superficial addon',
  url: 'https://github.com/gisikw/storybook-addon-superficial',
  goFullScreen: false,
  showLeftPanel: true,
  showDownPanel: true,
  showSearchBox: false,
  downPanelInRight: true
});

function loadStories() {
  require('../example/stories');
}

configure(loadStories, module);
