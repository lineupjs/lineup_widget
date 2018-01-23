// Copyright (c) Samuel Gratzl.
// Distributed under the terms of the MIT License.

import {DOMWidgetModel, DOMWidgetView} from '@jupyter-widgets/base';
import {JUPYTER_EXTENSION_VERSION} from './version';
import {builder, LineUp, LocalDataProvider, createLineUp, createLocalDataProvider, deriveColors, IColumnDesc} from 'lineupjs';
import {pushRanking, ILineUpRanking} from './utils';
import 'lineupjs/build/LineUpJS.css';

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
      data: []
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
  private lineup: LineUp;
  private data: LocalDataProvider;

  render() {
    this.data = this.createData();
    this.model.on('change:_data', this.dataChanged, this);

    this.data.setSelection(<number[]>this.model.get('selection'));
    this.model.on('change:selection', this.selectionChanged, this);
    this.data.on('selectionChanged', (_: any, selection: number[]) => this.model.set('selection', selection));

    this.createRankings();

    this.lineup = this.createLineUp();
  }

  private createLineUp() {
    const options = this.model.get('options');

    return new LineUp(this.el, this.data, {
      animation: options.animated,
      panel: options.sidePanel !== false,
      panelCollapsed: options.sidePanel === 'collapsed',
      summary: options.summaryHeader
    });
  }

  private createData() {
    const options = this.model.get('options');
    const rows = this.model.get('_data');
    const columns = this.model.get('_columns');

    return new LocalDataProvider(rows, deriveColors(columns), {
      filterGlobally: options.filterGlobally,
      multiSelection: !options.singleSelection,
      maxGroupColumns: options.noCriteriaLimits ? Infinity : 1,
      maxNestedSortingCriteria: options.noCriteriaLimits ? Infinity : 1
    });
  }

  private dataChanged() {
    this.data.clearColumns();

    const rows = this.model.get('_data');
    const columns = this.model.get('_columns');

    deriveColors(columns).forEach((desc: IColumnDesc) => this.data.pushDesc(desc));

    this.data.setData(rows);
    this.createRankings();
  }

  private createRankings() {
    this.data.clearRankings();
    const rankings = <ILineUpRanking[]>this.model.get('rankings');
    if (rankings.length === 0) {
      this.data.deriveDefault();
    } else {
      rankings.forEach((ranking) => pushRanking(this.data, ranking));
    }
  }

  private selectionChanged() {
    this.data.setSelection(<number[]>this.model.get('selection'));
  }
}
