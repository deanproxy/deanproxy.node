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
        <nav className="nav navbar-default">
          <div className="container-fluid navbar-left">
            <div className="navbar-header">
              <Link to="/" className="navbar-brand">
                <em>dean</em>proxy
              </Link>
            </div>
          </div>
          <div className="collapse navbar-collapse navbar-right">
            <ul className="nav navbar-nav">
              <li><Link to="code">code</Link></li>
              <li><Link to="music">music</Link></li>
              <li><Link to="about">about</Link></li>
              <li><Link to="contact">contact</Link></li>
              {logoutLink}
            </ul>
          </div>
        </nav>
        <div className="main-content">
          {this.props.children}
        </div>
      </div>
    );
  }
}

export default Layout;
