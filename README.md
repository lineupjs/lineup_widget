
LineUp.js as Jupyter Widget
============================

[![License: MIT][mit-image]][mit-url]  [![Github Actions][github-actions-image]][github-actions-url]


LineUp is an interactive technique designed to create, visualize and explore rankings of items based on a set of heterogeneous attributes.
This is a [Jupyter Widget](https://jupyter.org/widgets.html) wrapper around the JavaScript library [LineUp.js](https://github.com/lineupjs/lineupjs). Details about the LineUp visualization technique can be found at [http://lineup.caleydo.org](http://lineup.caleydo.org).

Installation
------------

You can install using `pip`:

```bash
pip install lineup_widget
```

If you are using Jupyter Notebook 5.2 or earlier, you may also need to enable
the nbextension:
```bash
jupyter nbextension enable --py [--sys-prefix|--user|--system] lineup_widget
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


Development Installation
------------------------

Create a dev environment:
```bash
conda create -n lineup_widget-dev -c conda-forge nodejs yarn python jupyterlab jupyter-packaging numpy pandas
conda activate lineup_widget-dev
```

Install the python. This will also build the TS package.
```bash
pip install -e ".[test, examples]"
```

When developing your extensions, you need to manually enable your extensions with the
notebook / lab frontend. For lab, this is done by the command:

```
jupyter labextension develop --overwrite .
yarn run build
```

For classic notebook, you need to run:

```
jupyter nbextension install --sys-prefix --symlink --overwrite --py lineup_widget
jupyter nbextension enable --sys-prefix --py lineup_widget
```

Note that the `--symlink` flag doesn't work on Windows, so you will here have to run
the `install` command every time that you rebuild your extension. For certain installations
you might also need another flag instead of `--sys-prefix`, but we won't cover the meaning
of those flags here.

### How to see your changes
#### Typescript:
If you use JupyterLab to develop then you can watch the source directory and run JupyterLab at the same time in different
terminals to watch for changes in the extension's source and automatically rebuild the widget.

```bash
# Watch the source directory in one terminal, automatically rebuilding when needed
yarn run watch
# Run JupyterLab in another terminal
jupyter lab
```

After a change wait for the build to finish and then refresh your browser and the changes should take effect.

#### Python:
If you make a change to the python code then you will need to restart the notebook kernel to have it take effect.

Authors
-------

 * Samuel Gratzl (@sgratzl)


[mit-image]: https://img.shields.io/badge/License-MIT-yellow.svg
[mit-url]: https://opensource.org/licenses/MIT
[binder-image]: https://camo.githubusercontent.com/70c5b4d050d4019f4f20b170d75679a9316ac5e5/687474703a2f2f6d7962696e6465722e6f72672f62616467652e737667
[binder-url]: http://mybinder.org/repo/datavisyn/lineup_widget/examples
[github-actions-image]: https://github.com/lineupjs/lineup_widget/workflows/ci/badge.svg
[github-actions-url]: https://github.com/lineupjs/lineup_widget/actions
