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

    ApiHandler.watch(ApiTypes.ALL_POSTS, response => {
      this.setState({
        posts: response.posts
      });
    });
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
            </header>
            <section dangerouslySetInnerHTML={{__html: post.htmlContent}} />
            <footer>
              <button className="btn btn-default" onClick={this.edit} data-post-id={post._id}>edit</button>
              <button className="btn btn-danger" onClick={this.delete} data-post-id={post._id}>delete</button>
            </footer>
          </article>
        );
      });
    } else {
      posts = <h2>No posts... Make one!</h2>;
    }

    return (
      <div className="admin">
        <div>
          <button className="btn btn-primary">Add New Post</button>
        </div>
        {posts}
      </div>
    )
  }
}

export default Admin;
