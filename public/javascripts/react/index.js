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
    ApiHandler.unwatch(ApiTypes.ALL_POSTS, this._callback);
  }

  _getData(query) {
    this.skip = query.skip || 0;

    ApiHandler.watch(ApiTypes.ALL_POSTS, {limit:this.limit, skip:this.skip}, this._callback);
  }

  componentWillReceiveProps(props) {
    this._getData(props.location.query);
  }

  componentDidMount() {
    this._getData(this.props.location.query);
  }

  render() {
    const posts = this.state.posts.posts.map(post => {
      return <Post key={post._id} post={post} summarize="true"/>;
    });
    return (
      <div className="index">
        {posts}
        <Paginate url="/" limit={this.limit} skip={this.skip} total={this.state.posts.total}/>
      </div>
    );
  }
}

export default Index;
