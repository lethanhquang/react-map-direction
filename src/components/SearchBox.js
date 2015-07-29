'use strict';

import React from 'react/addons';

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
      const {googleMapsApi, handleLocations} = this.props;
      const inputComponent                  = component.getDOMNode();
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
    return (
      <div className='home__searchbox'>
        <div className='row'>
          <div className='col-md-4 col-sm-12 col-xs-12'>
            <div className='home__searchbox__origin'>
              <input ref={this.initSearchInput.bind(this, 'origin')}
                     type='text'
                     className='form-control'
                     placeholder='Choose starting point'/>
            </div>
            { this.props.origin ?
              <div className='home__searchbox__destination'>
                <input ref={this.initSearchInput.bind(this, 'destination')}
                       type='text'
                       className='form-control'
                       placeholder='Choose destination...'/>
              </div> : null }
          </div>
        </div>
      </div>
    );
  }
}

export default SearchBox;
