# coding: utf-8

# Copyright (c) Samuel Gratzl.
# Distributed under the terms of the MIT License.

from ipywidgets import DOMWidget, Layout, ValueWidget, register
from traitlets import default, Unicode, List, Dict, Bool, Enum, Union, Int
import pandas as pd
from ._version import __version__

module_name = 'lineup_widget'
module_version = __version__


class ALineUpWidget(ValueWidget, DOMWidget):
  _model_module = Unicode(module_name).tag(sync=True)
  _model_module_version = Unicode(module_version).tag(sync=True)
  _view_module = Unicode(module_name).tag(sync=True)
  _view_module_version = Unicode(module_version).tag(sync=True)

  _data = List(trait=Dict(), default_value=[]).tag(sync=True)
  _columns = List(trait=Dict(), default_value=[]).tag(sync=True)
  options = Dict(traits=dict(filterGlobally=Bool(), singleSelection=Bool(), noCriteriaLimits=Bool(), animated=Bool(),
                             sidePanel=Enum((True, False, 'collapsed')), summaryHeader=Bool(), overviewMode=Bool(),
                             expandLineOnHover=Bool(), defaultSlopeGraphMode=Enum(('item', 'band'))),
                 default_value=dict(filterGlobally=True, singleSelection=False, noCriteriaLimits=False, animated=True,
                                    sidePanel='collapsed', summaryHeader=True, overviewMode=False,
                                    expandLineOnHover=False, defaultSlopeGraphMode='item'
                                    )).tag(sync=True)
  rankings = List(trait=Dict(traits=dict(columns=List(trait=Union((Unicode(), Dict()))), sort_by=List(trait=Unicode()),
                                         group_by=List(trait=Unicode())),
                             default_value=dict(columns=['_*', '*'], sort_by=[], group_by=[])), default_value=[]).tag(
    sync=True)
  value = List(trait=Int(), default_value=[]).tag(sync=True)

  def __init__(self, data=None, **kwargs):
    super(ALineUpWidget, self).__init__(**kwargs)
    if data is not None:
      self.data = data

  def add_ranking(self, columns=['_*', '*'], sort_by=[], group_by=[]):
    self.rankings = self.rankings + [dict(columns=columns, sort_by=sort_by, group_by=group_by)]

  @property
  def selection(self):
    return self.value

  @selection.setter
  def selection(self, value):
    self.value = value

  @property
  def data(self):
    return pd.DataFrame.from_dict(self._data)

  @data.setter
  def data(self, value):
    self._data = value.to_dict(orient='records')

    def to_desc(d):
      col = value[d]
      name = str(col.dtype)
      base = dict(type='string', column=d)
      if name.startswith('int') or name.startswith('float'):
        base['type'] = 'number'
        base['domain'] = [col.min(), col.max()]
      elif name == 'bool':
        base['type'] = 'boolean'
      elif name == 'category':
        base['type'] = 'categorical'
        base['categories'] = col.cat.categories
      return base

    self._columns = [to_desc(col) for col in value]

  @default('layout')
  def _default_layout(self):
    return Layout(height='600px', align_self='stretch')

  def on_selection_changed(self, callback):
    self.observe(lambda evt: callback(evt.new), 'value')


@register
class LineUpWidget(ALineUpWidget):
  """builds a LineUp widget wrapper
  """
  _model_name = Unicode('LineUpModel').tag(sync=True)
  _view_name = Unicode('LineUpView').tag(sync=True)
  description = Unicode('', help="LineUp").tag(sync=True)


@register
class TaggleWidget(ALineUpWidget):
  """builds a Taggle widget wrapper
  """
  _model_name = Unicode('TaggleModel').tag(sync=True)
  _view_name = Unicode('TaggleView').tag(sync=True)
  description = Unicode('', help="Taggle").tag(sync=True)
