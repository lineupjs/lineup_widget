// Copyright (c) Jupyter Development Team.
// Distributed under the terms of the MIT License.

import {IJupyterWidgetRegistry} from '@jupyter-widgets/base';
import {Application, IPlugin} from '@phosphor/application';
import {Widget} from '@phosphor/widgets';
import {JUPYTER_EXTENSION_VERSION} from './version';
import {LineUpModel, LineUpView} from './widget';


const EXTENSION_ID = 'jupyter.extensions.lineup';

/**
 * The lineUp plugin.
 */
const lineupPlugin: IPlugin<Application<Widget>, void> = {
  id: EXTENSION_ID,
  requires: [IJupyterWidgetRegistry],
  activate: activateWidgetExtension,
  autoStart: true
};

export default lineupPlugin;


/**
 * Activate the widget extension.
 */
function activateWidgetExtension(app: Application<Widget>, registry: IJupyterWidgetRegistry): void {
  registry.registerWidget({
    name: 'lineup_widget',
    version: JUPYTER_EXTENSION_VERSION,
    exports: {
      LineUpModel,
      LineUpView
    }
  });
}
