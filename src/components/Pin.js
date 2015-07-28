'use strict';

import React from 'react/addons';

class Pin extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const pinClass = this.props.type === 'from' ? 'main__map__pin--from' : 'main__map__pin--to';

    return (
      <div className={pinClass}></div>
    );
  }
}

export default Pin;
