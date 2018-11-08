LineUp.js as Jupyter Widget
============================

[![License: MIT][mit-image]][mit-url] [![CircleCI][ci-image]][ci-url] [![CircleCI][ci-image-dev]][ci-url-dev] 

LineUp is an interactive technique designed to create, visualize and explore rankings of items based on a set of heterogeneous attributes. 
This is a [Jupyter Widget](https://jupyter.org/widgets.html) wrapper around the JavaScript library [LineUp.js](https://github.com/datavisyn/lineupjs). Details about the LineUp visualization technique can be found at [http://lineup.caleydo.org](http://lineup.caleydo.org). 

Installation
------------

1. install Jupyter Widgets
   ```bash
   pip install ipywidgets
   jupyter nbextension enable --py widgetsnbextension
   ```

1. install library
   ```bash
   pip install lineup_widget
   jupyter nbextension enable --py --sys-prefix lineup_widget
   ```

1. OR directly via repository (requires node and npm to be installed):
   ```bash
   pip install -e git+https://github.com/datavisyn/lineup_widget.git#egg=lineup_widget
   jupyter nbextension enable --py --sys-prefix lineup_widget
   ```

1. Jupyterlab
   ```bash
   jupyter labextension install @jupyter-widgets/jupyterlab-manager
   jupyter labextension install lineup_widget
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

**Hint**: 

In case you see scrollbars in each cell it is because of the font the cells are too narrow, you can specify a larger row height using
```python
w = lineup_widget.LineUpWidget(df, options=dict(rowHeight=20))
```

Release Package
---------------

1. JavaScript NPM
   ```bash
   cd js
   npm install
   npm publish
   ```

1. Python PyPi
   ```bash
   pip install -U twine setuptools

   python setup.py clean sdist bdist_wheel
   twine upload dist/*
   ```

1. Git 
   ```bash
   git tag v<version>
   git push --follow-tags
   ```

1. update versions
   edit the version in
    * `js/package.json`
    * `js/lib/version.ts`
    * `lineup_widget/_version.py`


Authors
-------

 * Samuel Gratzl (@sgratzl)


[mit-image]: https://img.shields.io/badge/License-MIT-yellow.svg
[mit-url]: https://opensource.org/licenses/MIT
[binder-image]: https://camo.githubusercontent.com/70c5b4d050d4019f4f20b170d75679a9316ac5e5/687474703a2f2f6d7962696e6465722e6f72672f62616467652e737667
[binder-url]: http://mybinder.org/repo/datavisyn/lineup_widget/examples
[ci-image]: https://circleci.com/gh/datavisyn/lineup_widget.svg?style=shield
[ci-url]: https://circleci.com/gh/datavisyn/lineup_widget
[ci-image-dev]: https://circleci.com/gh/datavisyn/lineup_widget/tree/develop.svg?style=shield
[ci-url-dev]: https://circleci.com/gh/datavisyn/lineup_widget/tree/develop
