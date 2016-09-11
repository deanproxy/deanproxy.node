import React from 'react';
import ReactDOM from 'react-dom';
import {ApiTypes, ApiHandler} from './data';
import Modal from './modal';
import Bootstrap from 'bootstrap.native';

class Admin extends React.Component {
  constructor() {
    super();
    this.state = {
      user: {
        isLoggedIn: false
      },
      posts: [],
      post: {
        title: '',
        content: '',
        disableComments: true
      }
    }

    this.save = this.save.bind(this);
    this.change = this.change.bind(this);
    this.edit = this.edit.bind(this);
    this.delete = this.delete.bind(this);
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

  change(evt) {
    const post = this.state.post;
    post[evt.target.name] = evt.target.value;
    this.setState({post: post});
  }

  save(evt) {
    let apiType = ApiTypes.ALL_POSTS;
    let method  = 'post';
    if (this.state.post._id) {
      apiType = ApiTypes.SINGLE_POST.replace(':id', this.state.post._id);
      method = 'put';
    }

    ApiHandler.submit(apiType, method, this.state.post);
    this.modal.close();
  }

  edit(evt) {
    evt.preventDefault();

    const id = evt.target.dataset.postId;
    if (id) {
      const api = ApiTypes.SINGLE_POST.replace(':id', id);
      ApiHandler.watch(api, res => {
        this.setState({post: res.post});
      });
    } else {
      this.setState({
        post: {
          _id: '',
          title: '',
          content: '',
          disableComments: true
        }
      });
    }

    const div = document.getElementById('modal');
    this.modal = new Bootstrap.Modal(div);
    this.modal.open();
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
                <a href onClick={this.edit}>
                  <span className="fa fa-edit" data-post-id={post._id}></span>
                </a>
                <a href className="danger" onClick={this.delete}>
                  <span className="fa fa-remove" data-post-id={post._id}></span>
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
        <div id="modal" className="modal fade">
          <Modal save={this.save}>
            <form>
              <input type="hidden" name="_id" defaultValue={this.state.post._id}/>
              <ul>
                <li>
                  <input type="text" name="title" onChange={this.change}
                    value={this.state.post.title} placeholder="Title" required/>
                </li>
                <li>
                  <textarea name="content" onChange={this.change}
                    value={this.state.post.content} placeholder="Content" required></textarea>
                </li>
                <li>
                  <label>Disabled Comments</label>
                  <input type="checkbox" name="disableComments" onChange={this.change}
                    checked={this.state.post.disableComments}/>
                </li>
              </ul>
            </form>
          </Modal>
        </div>
        <div className="actions">
          <button className="btn btn-primary" onClick={this.edit}>Add New Post</button>
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
