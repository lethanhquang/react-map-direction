'use strict';

import React                                    from 'react/addons';
import {GoogleMaps, Marker, DirectionsRenderer} from 'react-google-maps';
import SearchBox                                from './SearchBox';

const pinFromImg = require('../images/PinFrom.png');
const pinToImg   = require('../images/PinToBlue.png');

// Define function check geolocation support
const geolocation = (
  "undefined" !== typeof window && navigator && navigator.geolocation || {
    getCurrentPosition: (success, failure) => {
      failure("Your browser doesn't support geolocation.");
    },
  }
);

/**
 * Main component
 */
class Home extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
    };

    this.handleLocations     = this.handleLocations.bind(this);
    this.handleDirections    = this.handleDirections.bind(this);
  }

  componentDidMount() {
    // set default center is central of district 7
    let lat = 10.7340344,
        lng = 106.72157870000001;

    // get current location
    geolocation.getCurrentPosition((position) => {
      lat = position.coords.latitude;
      lng = position.coords.longitude;
    });

    // update center
    this.setState({
      center: new google.maps.LatLng(lat, lng)
    });
  }

  /**
   * This function to handle draw directions when get both
   * origin and destination
   */
  handleDirections() {
    const {origin, destination, directions} = this.state;

    // Must required 2 locations to render directions
    if (origin && destination) {
      const DirectionsService = new google.maps.DirectionsService();

      DirectionsService.route({
        origin: origin,
        destination: destination,
        travelMode: google.maps.TravelMode.DRIVING
      }, (result, status) => {
        if(status == google.maps.DirectionsStatus.OK) {
          this.setState({ directions: result });
        }
      });
    }
  }

  /**
   * This function to handle update origin, destination
   * after user choosen location from searchBox
   */
  handleLocations(location, type, address = null) {
    const {origin, destination, bounds} = this.state;
    let   newState                      = {};
          newState['center']            = location;
          newState[type]                = location;
          newState[`${type}Address`]    = address;

    this.setState(newState);

    // Call function to draw direction
    this.handleDirections()
  }

  /**
   * This function to handle after event `draged` of Marker
   * and then update current address
   */
  handleMarkerChanged(type, event) {
    const position   = event.latLng;
    const geocoder   = new google.maps.Geocoder();
    let   address    = '';
    let   newAddress = {};

    // get address by geocodeer
    geocoder.geocode({
      latLng: position
    }, (res) => {
      if (res && res.length > 0) {
        address = res[0].formatted_address;
      }

      // call function update location
      this.handleLocations(position, type, address);
    });
  }

  render() {
    const googleMapsApi = 'undefined' !== typeof google ? google.maps : null;
    const {origin, originAddress, destination, destinationAddress, directions, bounds, center} = this.state;

    return (
      <div className='home'>
        <SearchBox googleMapsApi={googleMapsApi}
               origin={origin}
               originAddress={originAddress}
               destination={destination}
               destinationAddress={destinationAddress}
               handleLocations={this.handleLocations} />

        <div className='home__map'>
          <GoogleMaps containerProps={{style: {height: '100%'}}}
            ref='map'
            googleMapsApi={googleMapsApi}
            center={center}
            zoom={14}
            bounds={bounds}
            streetViewControl={false}
            mapTypeControl={false}>

            {origin ? <Marker position={origin}
                              icon={pinFromImg}
                              googleMapsApi={googleMapsApi}
                              draggable={true}
                              onDragend={this.handleMarkerChanged.bind(this, 'origin')}
                              key={'marker-origin'}
                              animation={2} /> : null}

            {destination ? <Marker position={destination}
                                   icon={pinToImg}
                                   googleMapsApi={googleMapsApi}
                                   draggable={true}
                                   onDragend={this.handleMarkerChanged.bind(this, 'destination')}
                                   key={'marker-destination'}
                                   animation={2} /> : null}

            {directions ?  <DirectionsRenderer directions={directions}
                                               polylineOptions={{strokeColor: '#40b450'}}
                                               suppressMarkers={true} /> : null}
          </GoogleMaps>
        </div>
      </div>
    );
  }
}

export default Home;
