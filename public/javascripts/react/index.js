import React from 'react';
import {ApiHandler, ApiTypes} from './data';
import {Link} from 'react-router';
import Post from './post';

class Index extends React.Component {
  constructor() {
    super();
    this.state = {
      post: {
        _id: '',
        title: '',
        htmlContent: '',
        createdAt: new Date(),
        disableComments: true,
        next: {
          _id: ''
        },
        previous: {
          _id: ''
        }
      }
    }

    this._callback = this._callback.bind(this);
  }

  _callback(response) {
    this.setState(response);
  }

  componentWillUnmount() {
    ApiHandler.unwatch(ApiTypes.LATEST_POST, this._callback);
  }

  componentDidMount() {
    ApiHandler.watch(ApiTypes.LATEST_POST, this._callback);
  }

  render() {
    return <Post post={this.state.post}/>;
  }
}

export default Index;
