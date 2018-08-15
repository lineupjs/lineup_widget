var lineup_widget = require('./index');
var base = require('@jupyter-widgets/base');

module.exports = {
  id: 'lineup_widget',
  requires: [base.IJupyterWidgetRegistry],
  activate: function(app, widgets) {
      widgets.registerWidget({
          name: 'lineup_widget',
          version: lineup_widget.version,
          exports: lineup_widget
      });
  },
  autoStart: true
};

