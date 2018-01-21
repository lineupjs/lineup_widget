#!/usr/bin/env python
# coding: utf-8

# Copyright (c) Samuel Gratzl.
# Distributed under the terms of the MIT License.

"""
TODO: Add module docstring
"""

from ipywidgets import DOMWidget
from traitlets import Unicode, List, Dict, Bool, Instance, HasTraits

module_name = "lineup_widget"
module_version = "0.1.0"


class LineUpRanking(HasTraits):
  columns = List(trait = Union(Unicode(), Dict()), ['_*', '*']).tag(sync=True)
  sortBy = List([]).tag(sync=True)
  groupBy = List([]).tag(sync=True)


class LineUpWidget(DOMWidget):
  """TODO: Add docstring here
  """
  _model_name = Unicode('LineUpModel').tag(sync=True)
  _model_module = Unicode(module_name).tag(sync=True)
  _model_module_version = Unicode(module_version).tag(sync=True)
  _view_name = Unicode('LineUpView').tag(sync=True)
  _view_module = Unicode(module_name).tag(sync=True)
  _view_module_version = Unicode(module_version).tag(sync=True)

  data = List(trait = Dict(), default_value = []).tag(sync=True)
  options = Dict(traits = dict(
                    filterGlobally = Bool(),
                    singleSelection = Bool(),
                    noCriteriaLimits = Bool(),
                    animated = Bool(),
                    sidePanel = Enum((True, False, 'collapsed'))
                    summaryHeader = Bool(),
                  ), default_value = dict(
                    filterGlobally = TRUE,
                    singleSelection = FALSE,
                    noCriteriaLimits = FALSE,
                    animated = TRUE,
                    sidePanel = 'collapsed',
                    summaryHeader = TRUE
                  )).tag(sync=True)
  rankings = List(trait = Instance(LineUpRanking), default_value = []).tag(sync=True)
  selections = List([]).tag(sync=True)

  @default('layout')
  def _default_layout(self):
    return widgets.Layout(height='400px', align_self='stretch')

