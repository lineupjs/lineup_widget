# coding: utf-8

# Copyright (c) Samuel Gratzl.
# Distributed under the terms of the MIT License.

version_info = (1, 0, 0, 'final', 0)

_specifier_ = {'alpha': 'a', 'beta': 'b', 'candidate': 'rc', 'final': ''}

__version__ = '%s.%s.%s%s' % (version_info[0], version_info[1], version_info[2],
              '' if version_info[3] == 'final' else _specifier_[version_info[3]] + str(version_info[4]))
