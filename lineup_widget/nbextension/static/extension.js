define(function () {
  "use strict";

  window['requirejs'].config({
    map: {
      '*': {
        'lineup_widget': 'nbextensions/lineup_widget/index',
      },
    }
  });
  // Export the required load_ipython_extention
  return {
    load_ipython_extension: function () {
    }
  };
});
