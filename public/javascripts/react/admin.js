import React from 'react';
import {ApiTypes, ApiHandler} from './data';

class Admin extends React.Component {
  constructor() {
    super();
    this.state = {
      user: {
        isLoggedIn: false
      },
      posts: []
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

    ApiHandler.watch(ApiTypes.ALL_POSTS, {limit:5}, response => {
      this.setState({
        posts: response.posts
      });
    });
  }

  edit(evt) {

  }

  delete(evt) {

  }

  search(evt) {

  }

  render() {
    if (!this.state.user.isLoggedIn) {
      return <h1>Oops... you're not logged in.</h1>;
    }

    let posts = [];

    if (this.state.posts.length) {
      posts = this.state.posts.map(post => {
        return (
          <article key={post._id}>
            <header>
              <h2>{post.title}</h2>
              <div className="actions">
                <a href className="" onClick={this.edit} data-post-id={post._id}>
                  <span className="fa fa-edit"></span>
                </a>
                <a href className="danger" onClick={this.delete} data-post-id={post._id}>
                  <span className="fa fa-remove"></span>
                </a>
              </div>
            </header>
            <section dangerouslySetInnerHTML={{__html: post.htmlContent}} />
          </article>
        );
      });
    } else {
      posts = <h2>No posts... Make one!</h2>;
    }

    return (
      <div className="admin">
        <div className="actions">
          <button className="btn btn-primary">Add New Post</button>
          <div className="search">
            <input type="text" name="search" onChange={this.search} placeholder="Search"/>
            <span className="fa fa-search"></span>
          </div>
        </div>
        {posts}
      </div>
    )
  }
}

export default Admin;
