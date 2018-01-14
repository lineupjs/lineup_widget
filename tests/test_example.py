#!/usr/bin/env python
# coding: utf-8

# Copyright (c) Samuel Gratzl.
# Distributed under the terms of the MIT License.

import pytest

from ..lineUp import LineUpWidget


def test_lineUp_creation_blank():
  w = LineUpWidget()
  assert w.value == 'Hello World'
