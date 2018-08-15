# coding: utf-8

# Copyright (c) Samuel Gratzl.
# Distributed under the terms of the MIT License.

from ._version import version_info, __version__
from .lineup import LineUpWidget, TaggleWidget


def _jupyter_nbextension_paths():
    return [{
        'section': 'notebook',
        'src': 'static',
        'dest': 'lineup_widget',
        'require': 'lineup_widget/extension'
    }]


__all__ = ['version_info', '__version__', 'LineUpWidget', 'TaggleWidget', '_jupyter_nbextension_paths']
