'use strict';

import React                                    from 'react/addons';
import {GoogleMaps, Marker, DirectionsRenderer} from 'react-google-maps';

const pinFromImg     = require('../images/PinFrom.png');
const pinToImg       = require('../images/PinToBlue.png');

class Map extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      center: props.center,
      directions: null,
      markers: [
        {
          icon: pinFromImg,
          position: props.center,
          key: 'from',
          animation: 2
        },
        {
          icon: pinToImg,
          position: props.greatPlaceCoords,
          key: 'to',
          animation: 2
        }
      ]
    };
  }

  componentDidMount() {
    let DirectionsService = new google.maps.DirectionsService();

    DirectionsService.route({
      origin: new google.maps.LatLng(10.7224432, 106.7134793),
      destination: new google.maps.LatLng(10.7530691, 106.6661363),
      travelMode: google.maps.TravelMode.DRIVING
    }, (result, status) => {
      if(status == google.maps.DirectionsStatus.OK) {
        this.setState({
          directions: result
        })
      }
      else {
        console.error(`error fetching directions ${ result }`);
      }
    });
  }

  render() {
    const {props, state} = this;
    const {directions}   = state;

    return (
      <div className='main__map'>
        <GoogleMaps containerProps={{style: {height: '100%'}}}
          ref='map'
          googleMapsApi={
            'undefined' !== typeof google ? google.maps : null
          }
          zoom={props.zoom}
          center={state.center}>
          {state.markers.map((marker) => {
            return (
              <Marker
                position={marker.position}
                icon={marker.icon}
                key={marker.key}
                animation={marker.animation} />
            );
          }, this)}
          {directions ?
            <DirectionsRenderer
              polylineOptions={{strokeColor: '#40b450'}}
              directions={directions}
              suppressMarkers={true} /> : null}
        </GoogleMaps>
      </div>
    );
  }
}

Map.propTypes = {
  center: React.PropTypes.object,
  zoom: React.PropTypes.number,
  greatPlaceCoords: React.PropTypes.any
};

Map.defaultProps = {
  zoom: 12,
  center: {lat: 10.7224432, lng: 106.7134793},
  greatPlaceCoords: {lat: 10.7530691, lng: 106.6661363}
};

export default Map;
