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

    this.handleLocations  = this.handleLocations.bind(this);
    this.handleDirections = this.handleDirections.bind(this);
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
  handleLocations(location, type) {
    const {origin, destination, bounds} = this.state;
    const newState                      = {};
          newState['center']            = location;
          newState[type]                = location;

    this.setState(newState);

    // Call function to draw direction
    this.handleDirections()
  }

  render() {
    const googleMapsApi = 'undefined' !== typeof google ? google.maps : null;
    const {origin, destination, directions, bounds, center} = this.state;

    return (
      <div className='home'>
        <SearchBox googleMapsApi={googleMapsApi}
               origin={origin}
               destination={destination}
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
                                    key={'marker-origin'}
                                    animation={2} /> : null}

            {destination ? <Marker position={destination}
                                         icon={pinToImg}
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
