#!/usr/bin/env bash
set -e

python setup.py build
pip install -e .
jupyter nbextension enable --py lineup_widget


jupyter notebook
