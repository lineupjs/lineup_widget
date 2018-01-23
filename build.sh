#!/usr/bin/env bash
set -e

python setup.py build
pip install -e .
jupyter nbextension install --py --symlink --sys-prefix lineup_widget
jupyter nbextension enable lineup_widget --py --sys-prefix

jupyter notebook
