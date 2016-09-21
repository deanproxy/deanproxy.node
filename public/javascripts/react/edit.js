import React from 'react';
import ReactDOM from 'react-dom';
import marked from 'marked';
import {ApiTypes, ApiHandler} from './data';
import Alert from './alert';

class Edit extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      post: {
        title: '',
        content: '',
        tags: []
      }
    }
    this.close = this.close.bind(this);
    this.save = this.save.bind(this);
    this.change = this.change.bind(this);
  }

  componentWillUnmount() {
    if (this.interval) {
      clearInterval(this.interval);
    }
  }

  change(evt) {
    const post = this.state.post;
    if (evt.target.name === 'tags') {
      post[evt.target.name] = evt.target.value.split(',').map(tag => tag.trim());
    } else {
      post[evt.target.name] = evt.target.value;
    }
    this.setState({post: post});
  }

  _saveCallback(response) {

  }

  save(evt) {
    evt.preventDefault();
    let api = ApiTypes.ALL_POSTS;
    let method  = ApiHandler.post.bind(ApiHandler);
    if (this.state.post._id) {
      api = ApiTypes.SINGLE_POST.replace(':id', this.state.post._id);
      method = ApiHandler.put.bind(ApiHandler);
    } else {
      /* if this is a new post, we don't want to submit the _id attribute */
      delete this.state.post._id;
    }

    method(api, this.state.post).then(response => {
      clearInterval(this.interval);
      window.location = '/admin';
    }).catch(response => {
      ReactDOM.render(<Alert type='danger' header='Error' message='Someting odd happened.'/>,
        document.getElementById('react-alert'));
    });
  }

  close(evt) {
    evt.preventDefault();
    clearInterval(this.interval);
    window.location = '/admin';
  }

  componentDidMount() {
    const preview = () => {
      const content = document.getElementById('content');
      const preview = document.getElementById('preview');
      preview.innerHTML = marked(content.value);
    }
    this.interval = setInterval(preview, 3000);
    if (window.__PRELOADED_STATE__) {
      this.state = window.__PRELOADED_STATE__;
      this.setState(this.state);
    }
  }

  render() {
    if (typeof window === 'undefined') {
      this.state = this.props;
    }
    let tags = '';
    if (this.state) {
      tags = this.state.post.tags.join(',');
    }
    return (
      <div className="edit">
        <form onSubmit={this.save}>
          <input type="hidden" name="_id" defaultValue={this.state.post._id}/>
          <ul>
            <li>
              <input type="text" name="title" onChange={this.change}
                value={this.state.post.title} placeholder="Title" required/>
            </li>
            <li>
              <textarea name="content" onChange={this.change} id="content"
                value={this.state.post.content} placeholder="Content" required></textarea>
            </li>
            <li>
              <input type="text" name="tags" onChange={this.change}
                value={tags} placeholder="place,tags,here" required/>
            </li>
            <li>
              <label>Disabled Comments</label>
              <input type="checkbox" name="disableComments" onChange={this.change}
                value={this.state.post.disableComments}/>
            </li>
            <li>
              <div id="preview" className="preview"></div>
            </li>
            <li>
              <button className="btn btn-default" onClick={this.cancel}>Cancel</button>
              <button className="btn btn-primary">Save</button>
            </li>
          </ul>
        </form>
      </div>
    );
  }
}

export default Edit;
