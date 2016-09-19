import React from 'react';
import Post from './post';
import {ApiTypes, ApiHandler} from './data';

class Show extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    let state = this.props;
    if (typeof window !== 'undefined') {
      state = window.__PRELOADED_STATE__;
    }
    return <Post post={state}/>;
  }
}

export default Show;
