import React from 'react';
import {ApiHandler, ApiTypes} from './data';
import {Link} from 'react-router';
import Post from './post';
import Paginate from './paginate';

class Index extends React.Component {
  constructor() {
    super();
    this.state = {
      posts: {
        posts: [],
        total: 0
      }
    }

    this.limit = 5;
    this._callback = this._callback.bind(this);
  }

  _callback(response) {
    this.setState(response);
    ApiHandler.unwatch(this.api, this._callback);
  }

  componentDidMount() {
    this.skip = this.props.location.query.skip || 0;

    this.api = `${ApiTypes.ALL_POSTS}?limit=${this.limit}&skip=${this.skip}`;
    ApiHandler.watch(this.api, this._callback);
  }

  render() {
    const posts = this.state.posts.posts.map(post => {
      return <Post key={post._id} post={post} summarize="true"/>;
    });
    return (
      <div className="index">
        {posts}
        <Paginate limit={this.limit} skip={this.skip} total={this.state.posts.total}/>
      </div>
    );
  }
}

export default Index;
