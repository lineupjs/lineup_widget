LineUp.js as Jupyther Widget
============================

[![License: MIT][mit-image]][mit-url] [![CircleCI][ci-image]][ci-url] [![codecov][codecov-image]][codecov-url] 

LineUp is an interactive technique designed to create, visualize and explore rankings of items based on a set of heterogeneous attributes. 
This is a [Jupyter Widget](https://jupyter.org/widgets.html) wrapper around the JavaScript library [LineUp.js](https://github.com/sgratzl/lineupjs). Details about the LineUp visualization technique can be found at [http://lineup.caleydo.org](http://lineup.caleydo.org). 

Installation
------------

```bash
pip install lineup_widget
jupyter nbextension enable --py [--sys-prefix|--user|--system] lineup_widget
```

Or, if you use jupyterlab:

```bash
pip install lineup_widget
jupyter labextension install @jupyter-widgets/jupyterlab-manager
```

Examples
--------

[![Launch Binder][binder-image]][binder-url]

Authors
-------

 * Samuel Gratzl (@sgratzl)


[mit-image]: https://img.shields.io/badge/License-MIT-yellow.svg
[mit-url]: https://opensource.org/licenses/MIT
[binder-image]: https://camo.githubusercontent.com/70c5b4d050d4019f4f20b170d75679a9316ac5e5/687474703a2f2f6d7962696e6465722e6f72672f62616467652e737667
[binder-url]: http://mybinder.org/repo/sgratzl/lineup_widget/examples
[codecov-image]: https://codecov.io/gh/sgratzl/lineup_widget/branch/master/graph/badge.svg
[codecov-url]: https://codecov.io/gh/sgratzl/lineup_widget
[ci-image]: https://circleci.com/gh/sgratzl/lineup_widget.svg?style=shield
[ci-url]: https://circleci.com/gh/sgratzl/lineup_widget
