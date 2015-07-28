'use strict';

// Import libs & sub components
import $     from 'jquery';
import React from 'react/addons';
import Map   from './components/Map.js';

// CSS
require('normalize.css');
require('styles/main.scss');

$(document).ready(function() {
  React.render(React.createElement(Map), document.getElementById('content'));
});
