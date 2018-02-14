import React from 'react';
import {Link} from 'react-router-dom';

class Layout extends React.Component {
  render() {
    return (
      <div className="layout">
        <div className="main-content">
          {this.props.children}
        </div>
      </div>
    );
  }
}

export default Layout;
