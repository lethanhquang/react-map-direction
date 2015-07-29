'use strict';

// Import libs & sub components
import $     from 'jquery';
import React from 'react/addons';
import Home  from './components/Home';

// CSS
require('normalize.css');
require('styles/main.scss');

$(document).ready(function() {
  React.render(React.createElement(Home), document.getElementById('content'));
});
