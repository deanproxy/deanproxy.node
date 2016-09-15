import React from 'react';
import ReactDOM from 'react-dom';
import {ApiTypes, ApiHandler} from './data';
import Modal from './modal';
import Bootstrap from 'bootstrap.native';
import marked from 'marked';
import {Link} from 'react-router';
import Paginate from './paginate';

class AdminIndex extends React.Component {
  constructor() {
    super();
    this.state = {
      posts: {
        total: 0,
        posts: []
      }
    }

    this.limit = 5;
    this.delete = this.delete.bind(this);
    this._callback = this._callback.bind(this);
  }

  _callback(response) {
    this.setState({
      posts: response.posts.posts
    });
  }

  componentWillUnmount() {
    ApiHandler.unwatch(ApiTypes.ALL_POSTS, this._callback);
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

  delete(evt) {
    evt.preventDefault();
    const id = evt.target.dataset.postId;
    const api = ApiTypes.SINGLE_POST.replace(':id', id);
    ApiHandler.submit(api, 'delete', {});
  }

  search(evt) {

  }

  render() {
    let posts = [];

    if (this.state.posts && this.state.posts.posts.length) {
      posts = this.state.posts.posts.map(post => {
        const content = post.content.match(/(.*)/);
        return (
          <article key={post._id}>
            <header>
              <h2>{post.title}</h2>
              <div className="actions">
                <a href={'/#/admin/edit/' + post._id}>
                  <span className="fa fa-edit"></span>
                </a>
                <a href className="danger" onClick={this.delete}>
                  <span className="fa fa-remove" data-post-id={post._id}></span>
                </a>
              </div>
            </header>
            <section>{content}</section>
          </article>
        );
      });
    } else {
      posts = <h2>No posts... Make one!</h2>;
    }

    return (
      <div className="admin">
        <div className="actions">
          <Link to="admin/new" className="btn btn-primary">Add New Post</Link>
          <div className="search">
            <input type="text" name="search" onChange={this.search} placeholder="Search is broken right now..."/>
            <span className="fa fa-search"></span>
          </div>
        </div>
        {posts}
        <Paginate url="/admin" limit={this.limit} skip={this.skip} total={this.state.posts.total}/>
      </div>
    )
  }
}

export default AdminIndex;
