import React from 'react';
import ReactDOM from 'react-dom';
import {ApiTypes, ApiHandler} from './data';
import Modal from './modal';
import marked from 'marked';
import Paginate from './paginate';
import Alert from './alert';

class AdminIndex extends React.Component {
  constructor(props) {
    super(props);
    this.limit = 5;
    this.delete = this.delete.bind(this);
  }

  delete(evt) {
    evt.preventDefault();
    const id = evt.target.dataset.postId;
    const api = ApiTypes.SINGLE_POST.replace(':id', id);

    ApiHandler.delete(api).then(response => {
      window.location = '/admin';
    }).catch(response => {
      ReactDOM.hydrate(<Alert type='danger' header='Error' message='Did not delete that post.'/>,
        document.getElementById('react-alert'));
    });
  }

  search(evt) {

  }

  render() {
    let state = this.props;
    if (typeof window !== 'undefined') {
      state = window.__PRELOADED_STATE__;
    }
    let posts = [];

    if (state.posts && state.posts.posts.length) {
      posts = state.posts.posts.map(post => {
        const content = post.content.match(/(.*)/);
        return (
          <article key={post._id}>
            <header>
              <h2>{post.title}</h2>
              <div className="actions">
                <a href={'/admin/edit/' + post._id}>
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
          <a href="/admin/new" className="btn btn-primary">Add New Post</a>
          <div className="search">
            <input type="text" name="search" onChange={this.search} placeholder="Search is broken right now..."/>
            <span className="fa fa-search"></span>
          </div>
        </div>
        {posts}
        <Paginate url="/admin" limit={state.posts.limit} skip={state.posts.skip} total={state.posts.total}/>
      </div>
    )
  }
}

export default AdminIndex;
