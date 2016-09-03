import Rest from 'rest';
import Mime from 'rest/interceptor/mime';
import ErrorCode from 'rest/interceptor/errorCode';
import _ from 'lodash';


class ApiClass {
  constructor() {
    this.rest = Rest.wrap(Mime, {mime: 'application/json'}).wrap(ErrorCode);
    this.apis = [];
  }

  watch(type, callback) {
    this.apis.push({
      type: type,
      callback: callback
    });

    this.rest({
      path: type,
      method: 'get'
    }).then(response => {
      this._notify(type, response.entity);
    }, response => {
      console.log(`Server response for ${type}: ${response.status.text}`);
      alert(`${type}: ${response.status.text}`);
    });
  }

  _notify(type, object) {
    _.each(this.apis, obj => {
      if (obj.type === type) {
        obj.callback(object);
      }
    });
  }

  submit(type, method, object) {
    this.rest({
      path: type,
      method: method,
      entity: object
    }).then(response => {
      this._notify(type, response.entity);
    }, response => {
      console.log(response.status.text);
      alert(response.status.text);
    });
  }

}

const ApiTypes = {
  ALL_POSTS: '/posts',
  SINGLE_POST: '/posts/:id',
  ALL_TAGS: '/tags',
  USER: '/admin/user'
}

const ApiHandler = new ApiClass();
export {ApiTypes, ApiHandler};
