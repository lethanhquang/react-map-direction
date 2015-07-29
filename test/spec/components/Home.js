'use strict';

describe('Home', () => {
  let React = require('react/addons');
  let Home, component;

  beforeEach(() => {
    let container = document.createElement('div');
    container.id = 'content';
    document.body.appendChild(container);

    Home = require('Home.js');
    component = React.createElement(Home);
  });

  it('should create a new instance of Home', () => {
    expect(component).toBeDefined();
  });
});
