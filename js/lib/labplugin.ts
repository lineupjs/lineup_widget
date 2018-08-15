// Copyright (c) Samuel Gratzl.
// Distributed under the terms of the MIT License.

import {IJupyterWidgetRegistry} from '@jupyter-widgets/base';
import {JUPYTER_EXTENSION_VERSION} from './version';
import {LineUpModel, TaggleModel, TaggleView, LineUpView} from './widget';

/**
 * The lineUp plugin.
 */
const lineupPlugin = {
  id: 'lineup_widget',
  requires: [IJupyterWidgetRegistry],
  activate: activateWidgetExtension,
  autoStart: true
};

export default lineupPlugin;


/**
 * Activate the widget extension.
 */
function activateWidgetExtension(_app: any, registry: IJupyterWidgetRegistry) {
  registry.registerWidget({
    name: 'lineup_widget',
    version: JUPYTER_EXTENSION_VERSION,
    exports: {
      LineUpModel,
      TaggleModel,
      TaggleView,
      LineUpView
    }
  });
}
