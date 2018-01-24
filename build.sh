#!/usr/bin/env bash
set -e

python setup.py build
pip install -e .
jupyter nbextension enable --py [--sys-prefix|--user|--system] lineup_widget


jupyter notebook
