// Copyright (c) Samuel Gratzl
// Distributed under the terms of the Modified BSD License.

import { DOMWidgetModel, DOMWidgetView } from '@jupyter-widgets/base';

import { MODULE_NAME, MODULE_VERSION } from './version';

// Import the CSS
import '../css/widget.css';
import LineUp, {
  ITaggleOptions,
  Taggle,
  LocalDataProvider,
  IColumnDesc,
  deriveColors,
} from 'lineupjs';
import { ILineUpRanking, pushRanking } from './utils';

const fields = {
  _data: [],
  _columns: [],
  options: {},
  rankings: [],
  value: [],
};

export class LineUpModel extends DOMWidgetModel {
  defaults(): any {
    return {
      ...super.defaults(),
      _model_name: LineUpModel.model_name,
      _model_module: LineUpModel.model_module,
      _model_module_version: LineUpModel.model_module_version,
      _view_name: LineUpModel.view_name,
      _view_module: LineUpModel.view_module,
      _view_module_version: LineUpModel.view_module_version,
      ...fields,
    };
  }

  static serializers = {
    ...DOMWidgetModel.serializers,
    // Add any extra serializers here
  };

  static model_name = 'LineUpModel';
  static model_module = MODULE_NAME;
  static model_module_version = MODULE_VERSION;
  static view_name = 'LineUpView'; // Set to null if no view
  static view_module = MODULE_NAME;
  static view_module_version = MODULE_VERSION;
}

export class TaggleModel extends DOMWidgetModel {
  defaults(): any {
    return {
      ...super.defaults(),
      _model_name: TaggleModel.model_name,
      _model_module: TaggleModel.model_module,
      _model_module_version: TaggleModel.model_module_version,
      _view_name: TaggleModel.view_name,
      _view_module: TaggleModel.view_module,
      _view_module_version: TaggleModel.view_module_version,
      ...fields,
    };
  }

  static serializers = {
    ...DOMWidgetModel.serializers,
    // Add any extra serializers here
  };

  static model_name = 'TaggleModel';
  static model_module = MODULE_NAME;
  static model_module_version = MODULE_VERSION;
  static view_name = 'TaggleView'; // Set to null if no view
  static view_module = MODULE_NAME; // Set to null if no view
  static view_module_version = MODULE_VERSION;
}

export abstract class ALineUpView extends DOMWidgetView {
  protected lineup: LineUp | Taggle;
  protected data: LocalDataProvider;

  render(): void {
    this.data = this.createData();
    this.model.on('change:_data', this.dataChanged, this);

    this.data.setSelection(<number[]>this.model.get('value'));
    this.model.on('change:value', this.selectionChanged, this);
    this.data.on('selectionChanged', (selection: number[]) => {
      this.model.set('value', selection, { updated_view: this });
      this.touch();
    });

    this.createRankings();

    const options = this.model.get('options');
    this.lineup = this.createLineUp({
      ...options,
      panel: options.sidePanel !== false,
      panelCollapsed: options.sidePanel === 'collapsed',
    });
  }

  protected abstract createLineUp(
    options: Partial<ITaggleOptions>
  ): LineUp | Taggle;

  private createData() {
    const options = this.model.get('options');
    const rows = this.model.get('_data');
    const columns = this.model.get('_columns');

    return new LocalDataProvider(rows, deriveColors(columns), {
      filterGlobally: options.filterGlobally,
      singleSelection: options.singleSelection,
    });
  }

  private dataChanged() {
    this.data.clearColumns();

    const rows = this.model.get('_data');
    const columns = this.model.get('_columns');

    deriveColors(columns).forEach((desc: IColumnDesc) =>
      this.data.pushDesc(desc)
    );

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
    this.data.setSelection(<number[]>this.model.get('value'));
  }
}

export class LineUpView extends ALineUpView {
  protected createLineUp(options: Partial<ITaggleOptions>): LineUp {
    return new LineUp(this.el, this.data, options);
  }
}

export class TaggleView extends ALineUpView {
  protected createLineUp(options: Partial<ITaggleOptions>): Taggle {
    return new Taggle(this.el, this.data, options);
  }
}
