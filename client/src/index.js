import React from 'react';
import { render } from 'react-dom';
import Root from './Root';

render(<Root />, document.querySelector('#root'));

if (module.hot) {
  module.hot.dispose(function() {
    // module is about to be replaced
  });

  module.hot.accept(function() {
    // module or one of its dependencies was just updated
  });
}
