'use strict';

describe('ReactMapDirectionApp', () => {
  let React = require('react/addons');
  let ReactMapDirectionApp, component;

  beforeEach(() => {
    let container = document.createElement('div');
    container.id = 'content';
    document.body.appendChild(container);

    ReactMapDirectionApp = require('components/ReactMapDirectionApp.js');
    component = React.createElement(ReactMapDirectionApp);
  });

  it('should create a new instance of ReactMapDirectionApp', () => {
    expect(component).toBeDefined();
  });
});
