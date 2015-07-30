'use strict';

import React from 'react/addons';

const routeFromImg = require('../images/RouteToGreen.png');
const routeToImg   = require('../images/RouteToBlue.png');

/**
 * SearchBox component
 */
class SearchBox extends React.Component {
  constructor(props) {
    super(props);
  }

  /**
   * This function initialize search input, using the Google Place Autocomplete
   * feature. People can enter geographical searches. The search box will return a
   * pick list containing a mix of places and predicted search terms.
   *
   * This API is limited by the free quota:
   * + 25,000 requests/day
   * +      1 requests/second/user
   */
  initSearchInput(type, component) {
    if (component) {
      const {handleLocations} = this.props;
      const inputComponent                  = component.getDOMNode();
      const googleMapsApi = google.maps;
      const searchBox                       = new googleMapsApi.places.SearchBox(inputComponent);

      // Listen for the event fired when the user selects an item from the
      // pick list. Retrieve the matching places for that item.
      googleMapsApi.event.addListener(searchBox, 'places_changed', () => {
        let places = searchBox.getPlaces();

        // In case not found any place then do nothing
        if (places.length === 0) return;

        // Call function to update locations
        handleLocations(places[0].geometry.location, type);
      });
    }
  }

  render() {
    const {originAddress, destinationAddress} = this.props;

    return (
      <div className='home__searchbox'>
        <div className='row'>
          <div className='col-md-4 col-sm-12 col-xs-12'>
            <div className='home__searchbox__origin'>
              <div className="input-group">
                <span className="input-group-addon" />
                <input ref={this.initSearchInput.bind(this, 'origin')}
                       type='text'
                       value={originAddress}
                       className='form-control'
                       placeholder='Choose starting point' />
              </div>
            </div>
            { this.props.origin ?
              <div className='home__searchbox__destination'>
                <div className="input-group">
                  <span className="input-group-addon" />
                  <input ref={this.initSearchInput.bind(this, 'destination')}
                         type='text'
                         value={destinationAddress}
                         className='form-control'
                         placeholder='Choose destination...'/>
                </div>
              </div> : null }
          </div>
        </div>
      </div>
    );
  }
}

export default SearchBox;
