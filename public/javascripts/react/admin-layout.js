import React from 'react';
import Layout from './layout';
import {ApiTypes, ApiHandler} from './data';

class AdminLayout extends React.Component {
  constructor() {
    super();
    this.state = {
      user: {
        isLoggedIn: false
      }
    }
  }

  componentDidMount() {
    ApiHandler.watch(ApiTypes.USER, response => {
      this.state.user.isLoggedIn = response.user.isLoggedIn;

      this.setState({
        user: this.state.user
      });

      if (!this.state.user.isLoggedIn) {
        window.location = '/#/login';
      }
    });
  }

  render() {
    if (!this.state.user.isLoggedIn) {
      return <h1>Oops... you're not logged in.</h1>;
    }
    return <Layout children={this.props.children} loggedIn={this.state.user.isLoggedIn}/>;
  }
}

export default AdminLayout;
