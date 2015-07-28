'use strict';

// Import libs & sub components
import React from 'react/addons';
import Map from './Map.js';

// CSS
require('normalize.css');
require('../styles/main.scss');

class ReactMapDirectionApp extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className='main'>
        <Map />
      </div>
    );
  }
}

React.render(<ReactMapDirectionApp />, document.getElementById('content')); // jshint ignore:line

export default ReactMapDirectionApp;
