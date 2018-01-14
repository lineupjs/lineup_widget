// Copyright (c) Samuel Gratzl.
// Distributed under the terms of the MIT License.

import {DOMWidgetModel, DOMWidgetView} from '@jupyter-widgets/base';

import {JUPYTER_EXTENSION_VERSION} from './version';


export class LineUpModel extends DOMWidgetModel {
  defaults() {
    return {
      ...super.defaults(),
      _model_name: LineUpModel.model_name,
      _model_module: LineUpModel.model_module,
      _model_module_version: LineUpModel.model_module_version,
      _view_name: LineUpModel.view_name,
      _view_module: LineUpModel.view_module,
      _view_module_version: LineUpModel.view_module_version,
      value: 'Hello World'
    };
  }

  static serializers = {
    ...DOMWidgetModel.serializers,
    // Add any extra serializers here
  };

  static model_name = 'LineUpModel';
  static model_module = 'lineup_widget';
  static model_module_version = JUPYTER_EXTENSION_VERSION;
  static view_name = 'LineUpView';  // Set to null if no view
  static view_module = 'lineup_widget';   // Set to null if no view
  static view_module_version = JUPYTER_EXTENSION_VERSION;
}


export class LineUpView extends DOMWidgetView {
  render() {
    this.value_changed();
    this.model.on('change:value', this.value_changed, this);
  }

  value_changed() {
    this.el.textContent = this.model.get('value');
  }
}
