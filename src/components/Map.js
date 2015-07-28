'use strict';

import React from 'react/addons';
import GoogleMap from 'google-map-react';

class Map extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className='main__map'>
        <GoogleMap
          center={this.props.center}
          zoom={this.props.zoom}>
        </GoogleMap>
      </div>
    );
  }
}

Map.propTypes = {
  center: React.PropTypes.array,
  zoom: React.PropTypes.number,
  greatPlaceCoords: React.PropTypes.any
};

Map.defaultProps = {
  center: [10.7224432, 106.7134793],
  zoom: 9,
  greatPlaceCoords: {lat: 59.724465, lng: 30.080121}
};

export default Map;
