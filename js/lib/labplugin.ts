// Copyright (c) Samuel Gratzl.
// Distributed under the terms of the MIT License.

import * as lineup_widget from '.';
import {IJupyterWidgetRegistry} from '@jupyter-widgets/base';

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
    version: lineup_widget.version,
    exports: lineup_widget
  });
}
