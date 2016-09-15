import React from 'react';
import {Link} from 'react-router';

class Layout extends React.Component {
  render() {
    let logoutLink = '';
    if (this.props.loggedIn) {
      logoutLink = <li><a href='/logout'>logout</a></li>;
    }
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
