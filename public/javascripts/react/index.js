import React from 'react';
import {ApiHandler, ObjectTypes} from './data';

class Index extends React.Component {
  constructor() {
    super();
    this.state = {
      posts: [ ]
    }
  }

  componentDidMount() {
    ApiHandler.watch(ObjectTypes.ALL_POSTS, response => {
      this.setState(response);
    });
  }

  render() {
    let articles = <h2>Sorry, no posts yet...</h2>;
    if (this.state.posts.length > 0) {
      const articles = this.state.posts.map(post => {
        return (
          <article key={post._id} id={post._id}>
            <header><h2>{post.title}</h2></header>
            <section>{post.htmlContent}</section>
          </article>
        );
      });
    }

    return(
      <div className="posts-index">
        {articles}
      </div>
    )
  }
}

export default Index;
