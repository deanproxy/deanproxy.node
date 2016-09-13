import React from 'react';
import Post from './post';
import {ApiTypes, ApiHandler} from './data';

class Show extends React.Component {
  constructor() {
    super();

    this.state = {
      post: {
        _id: '',
        title: '',
        htmlContent: '',
        createdAt: new Date(),
        disableComments: true,
        previous: {
          _id: ''
        },
        next: {
          _id: ''
        }
      }
    }

    this._callback = this._callback.bind(this);
  }

  _callback(response) {
    this.setState(response);
  }

  _watch(id) {
    if (id) {
      const api = ApiTypes.SINGLE_POST.replace(':id', id);
      this.previousApi = api;
      ApiHandler.watch(api, this._callback);
    } else {
      this.previousApi = ApiTypes.LATEST_POST;
      ApiHandler.watch(ApiTypes.LATEST_POST, this._callback);
    }
  }

  componentWillReceiveProps(props) {
    ApiHandler.unwatch(this.previousApi, this._callback);
    this._watch(props.params.id);
  }

  componentWillUnmount() {
    ApiHandler.unwatch(this.previousApi, this._callback);
  }

  componentDidMount() {
    const id = this.props.params.id;
    this._watch(id);
  }

  render() {
    return <Post post={this.state.post}/>;
  }
}

export default Show;
