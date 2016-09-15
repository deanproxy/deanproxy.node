import Rest from 'rest';
import Mime from 'rest/interceptor/mime';
import ErrorCode from 'rest/interceptor/errorCode';
import _ from 'lodash';


class ApiClass {
  constructor() {
    this.rest = Rest.wrap(Mime, {mime: 'application/json'}).wrap(ErrorCode);
    this.apis = [];
  }

  serialize(obj) {
    let serialized = '';
    const keys = Object.keys(obj);
    const totalKeys = keys.length;

    _.each(keys, (key,idx) => {
      serialized += `${key}=${obj[key]}`;
      if (idx+1 !== totalKeys) {
        serialized += '&';
      }
    });

    return serialized;
  }

  unwatch(type, callback) {
    this.apis.forEach((a,i) => {
      if (a.type === type && a.callback === callback) {
        this.apis.splice(i, 1);
      }
    });
  }

  watch(type, params, callback) {
    /* params is an optional field. so if it's a function, make it the callback. */
    if (typeof params === 'function') {
      callback = params;
      params = null;
    }

    this.apis.push({
      type: type,
      params: params,
      callback: callback
    });

    let url = type;
    if (params) {
      url += `?${this.serialize(params)}`;
    }

    this.rest(url).then(response => {
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

  post(type, object) {
    return new Promise((resolve, reject) => {
      this.rest({
        path: type,
        method: 'post',
        entity: object
      }).then(response => {
        resolve(response.entity);
      }, response => {
        reject(response);
      });
    });
  }

}

const ApiTypes = {
  ALL_POSTS: '/posts',
  LATEST_POST: '/posts/latest',
  SINGLE_POST: '/posts/:id',
  ALL_TAGS: '/tags',
  USER: '/admin/user',
  EMAIL: '/email',
  POSTS_BY_TAG: '/posts/tags/:tag'
}

const ApiHandler = new ApiClass();
export {ApiTypes, ApiHandler};
