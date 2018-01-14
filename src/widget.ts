// Copyright (c) Samuel Gratzl.
// Distributed under the terms of the Modified BSD License.

import {
  DOMWidgetModel, DOMWidgetView
} from '@jupyter-widgets/base';

import {
  JUPYTER_EXTENSION_VERSION
} from './version';


export
class ExampleModel extends DOMWidgetModel {
  defaults() {
    return {...super.defaults(),
      _model_name: ExampleModel.model_name,
      _model_module: ExampleModel.model_module,
      _model_module_version: ExampleModel.model_module_version,
      _view_name: ExampleModel.view_name,
      _view_module: ExampleModel.view_module,
      _view_module_version: ExampleModel.view_module_version,
      value : 'Hello World'
    };
  }

  static serializers = {
      ...DOMWidgetModel.serializers,
      // Add any extra serializers here
    }

  static model_name = 'ExampleModel';
  static model_module = 'lineup_widget';
  static model_module_version = JUPYTER_EXTENSION_VERSION;
  static view_name = 'ExampleView';  // Set to null if no view
  static view_module = 'lineup_widget';   // Set to null if no view
  static view_module_version = JUPYTER_EXTENSION_VERSION;
}


export
class ExampleView extends DOMWidgetView {
  render() {
    this.value_changed();
    this.model.on('change:value', this.value_changed, this);
  }

  value_changed() {
    this.el.textContent = this.model.get('value');
  }
}
