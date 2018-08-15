import ipywidgets as widgets
from traitlets import Unicode

@widgets.register
class HelloWorld(widgets.DOMWidget):
    """An example widget."""
    _view_name = Unicode('HelloView').tag(sync=True)
    _model_name = Unicode('HelloModel').tag(sync=True)
    _view_module = Unicode('lineup_widget').tag(sync=True)
    _model_module = Unicode('lineup_widget').tag(sync=True)
    _view_module_version = Unicode('^1.0.0').tag(sync=True)
    _model_module_version = Unicode('^1.0.0').tag(sync=True)
    value = Unicode('Hello World!').tag(sync=True)
