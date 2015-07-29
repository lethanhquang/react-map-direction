'use strict';

// Import libs & sub components
import React from 'react/addons';
import Home  from './components/Home';

// CSS
require('normalize.css');
require('styles/main.scss');

var tid = setInterval( function () {
  if ( document.readyState !== 'complete' ) return;
  clearInterval( tid );       

  React.render(React.createElement(Home), document.getElementById('content'));
}, 100 );
