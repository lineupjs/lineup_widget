LineUp.js as Jupyther Widget
============================

[![License: MIT][mit-image]][mit-url] [![CircleCI][ci-image]][ci-url] [![codecov][codecov-image]][codecov-url] 

LineUp is an interactive technique designed to create, visualize and explore rankings of items based on a set of heterogeneous attributes. 
This is a [Jupyter Widget](https://jupyter.org/widgets.html) wrapper around the JavaScript library [LineUp.js](https://github.com/sgratzl/lineupjs). Details about the LineUp visualization technique can be found at [http://lineup.caleydo.org](http://lineup.caleydo.org). 

Installation
------------

```bash
pip install -e git+https://github.com/sgratzl/lineup_widget.git#egg=lineup_widget
jupyter nbextension enable --py [--sys-prefix|--user|--system] lineup_widget
```

Or, if you use jupyterlab:

```bash
pip install -e git+https://github.com/sgratzl/lineup_widget.git#egg=lineup_widget
jupyter labextension install @jupyter-widgets/jupyterlab-manager
```

Examples
--------

[![Launch Binder][binder-image]][binder-url]

```python
import lineup_widget
import pandas as pd
import numpy as np

df = pd.DataFrame(np.random.randint(0,100,size=(100, 4)), columns=list('ABCD'))

w = lineup_widget.LineUpWidget(df)
w.on_selection_changed(lambda selection: print(selection))
w
```

![simple usage](https://user-images.githubusercontent.com/4129778/35321859-7925d3a6-00e8-11e8-9884-bcbc76ae51c9.png)

```python
from __future__ import print_function
from ipywidgets import interact, interactive, interact_manual

def selection_changed(selection):
    return df.iloc[selection]

interact(selection_changed, selection=lineup_widget.LineUpWidget(df));
```

![interact example](https://user-images.githubusercontent.com/4129778/35321846-6c5b07cc-00e8-11e8-9388-0acb65cbb509.png)


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
