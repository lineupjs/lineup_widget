// Copyright (c) Samuel Gratzl
// Distributed under the terms of the Modified BSD License.

import { Application, IPlugin } from '@phosphor/application';

import { Widget } from '@phosphor/widgets';

import { IJupyterWidgetRegistry } from '@jupyter-widgets/base';

import { LineUpModel, LineUpView, TaggleModel, TaggleView } from './widget';

import { MODULE_NAME, MODULE_VERSION } from './version';

const EXTENSION_ID = 'lineup_widget:plugin';

/**
 * The example plugin.
 */
const lineupPlugin: IPlugin<Application<Widget>, void> = {
  id: EXTENSION_ID,
  requires: [IJupyterWidgetRegistry],
  activate: activateWidgetExtension,
  autoStart: true,
} as unknown as IPlugin<Application<Widget>, void>;
// the "as unknown as ..." typecast above is solely to support JupyterLab 1
// and 2 in the same codebase and should be removed when we migrate to Lumino.

export default lineupPlugin;

/**
 * Activate the widget extension.
 */
function activateWidgetExtension(
  app: Application<Widget>,
  registry: IJupyterWidgetRegistry
): void {
  registry.registerWidget({
    name: MODULE_NAME,
    version: MODULE_VERSION,
    exports: {
      LineUpModel,
      LineUpView,
      TaggleModel,
      TaggleView,
    },
  });
}
