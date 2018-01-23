#!/usr/bin/env python
# coding: utf-8

# Copyright (c) Samuel Gratzl.
# Distributed under the terms of the MIT License.

"""
TODO: Add module docstring
"""

from ipywidgets import DOMWidget, Layout
from traitlets import default, Unicode, List, Dict, Bool, Instance, HasTraits, Enum, Union, Int
import pandas as pd

module_name = "lineup_widget"
module_version = "0.1.0"


class LineUpRanking(HasTraits):
  columns = List(trait=Union((Unicode(), Dict())), default_value=['_*', '*']).tag(sync=True)
  sort_by = List(trait=Unicode(), default_value=[]).tag(sync=True)
  group_by = List(trait=Unicode(), default_value=[]).tag(sync=True)


class LineUpWidget(DOMWidget):
  """TODO: Add docstring here
  """
  _model_name = Unicode('LineUpModel').tag(sync=True)
  _model_module = Unicode(module_name).tag(sync=True)
  _model_module_version = Unicode(module_version).tag(sync=True)
  _view_name = Unicode('LineUpView').tag(sync=True)
  _view_module = Unicode(module_name).tag(sync=True)
  _view_module_version = Unicode(module_version).tag(sync=True)

  _data = List(trait=Dict(), default_value=[]).tag(sync=True)
  _columns = List(trait=Dict(), default_value=[]).tag(sync=True)
  options = Dict(traits=dict(filterGlobally=Bool(), singleSelection=Bool(), noCriteriaLimits=Bool(), animated=Bool(),
                             sidePanel=Enum((True, False, 'collapsed')), summaryHeader=Bool()),
                 default_value=dict(filterGlobally=True, singleSelection=False, noCriteriaLimits=False, animated=True,
                                    sidePanel='collapsed', summaryHeader=True
                                    )).tag(sync=True)
  rankings = List(trait=Instance(LineUpRanking), default_value=[]).tag(sync=True)
  selection = List(trait=Int(), default_value=[]).tag(sync=True)

  def __init__(self, data=None, **kwargs):
    super().__init__(**kwargs)
    if data:
      self.data = data

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
    return Layout(height='400px', align_self='stretch')

  def on_selection_changed(self, callback):
    self.observe(lambda evt: callback(evt.new), 'selection')
