import React from 'react';
import marked from 'marked';
import {ApiTypes, ApiHandler} from './data';

class Edit extends React.Component {
  constructor() {
    super();

    this.state = {
      post: {
        _id: '',
        title: '',
        content: '',
        disableComments: true,
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

  save(evt) {
    evt.preventDefault();
    let apiType = ApiTypes.ALL_POSTS;
    let method  = 'post';
    if (this.state.post._id) {
      apiType = ApiTypes.SINGLE_POST.replace(':id', this.state.post._id);
      method = 'put';
    } else {
      /* if this is a new post, we don't want to submit the _id attribute */
      delete this.state.post._id;
    }

    ApiHandler.submit(apiType, method, this.state.post);
    clearInterval(this.interval);
    window.location = '/#/admin';
  }

  close(evt) {
    evt.preventDefault();
    clearInterval(this.interval);
    window.location = '/#/admin';
  }

  componentDidMount() {
    const id = this.props.params.id;
    if (id) {
      const api = ApiTypes.SINGLE_POST.replace(':id', id);
      ApiHandler.watch(api, res => {
        this.setState({post: res.post});
      });
    }

    const preview = () => {
      const content = document.getElementById('content');
      const preview = document.getElementById('preview');
      preview.innerHTML = marked(content.value);
    }
    this.interval = setInterval(preview, 3000);
  }

  render() {
    const tags = this.state.post.tags.join(',');
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
