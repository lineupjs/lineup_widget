#!/usr/bin/env python
# coding: utf-8

# Copyright (c) Samuel Gratzl.
# Distributed under the terms of the MIT License.

"""
TODO: Add module docstring
"""

from ipywidgets import DOMWidget
from traitlets import Unicode

module_name = "lineup_widget"
module_version = "0.1.0"


class LineUpWidget(DOMWidget):
  """TODO: Add docstring here
  """
  _model_name = Unicode('LineUpModel').tag(sync=True)
  _model_module = Unicode(module_name).tag(sync=True)
  _model_module_version = Unicode(module_version).tag(sync=True)
  _view_name = Unicode('LineUpView').tag(sync=True)
  _view_module = Unicode(module_name).tag(sync=True)
  _view_module_version = Unicode(module_version).tag(sync=True)

  value = Unicode('Hello World')
