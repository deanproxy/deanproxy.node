import React from 'react';
import {ApiHandler, ApiTypes} from './data';
import {Link} from 'react-router-dom';
import Post from './post';
import Paginate from './paginate';

class Index extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    let state = this.props;
    if (typeof window !== 'undefined') {
      state = window.__PRELOADED_STATE__;
    }

    let url = '/posts';
    if (state.tag) {
      url = `/posts/tags/${state.tag}`;
    }
    const posts = state.posts.posts.map(post => {
      return <Post key={post._id} post={post} summarize="true"/>;
    });
    return (
      <div className="index">
        {posts}
        <Paginate url={url} limit={state.posts.limit} skip={state.posts.skip} total={state.posts.total}/>
      </div>
    );
  }
}

export default Index;
