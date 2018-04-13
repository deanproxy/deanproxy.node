import Rest from 'rest';
import Mime from 'rest/interceptor/mime';
import ErrorCode from 'rest/interceptor/errorCode';
import _ from 'lodash';

export class ApiClass {
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

  _send(url, method, params, object) {
    if (params && object === undefined) {
      object = params;
    } else if (params) {
      url = `${url}?${this.serialize(params)}`;
    }
    return new Promise((resolve, reject) => {
      this.rest({
        path: url,
        method: method,
        entity: object
      }).then(response => {
        resolve(response.entity);
      }, response => {
        reject(response);
      });
    });
  }

  post(url, params, object) {
    return this._send(url, 'post', params, object);
  }
  put(url, params, object) {
    return this._send(url, 'put', params, object);
  }
  delete(url, params, object) {
    return this._send(url, 'delete', params, object);
  }
  get(url, params) {
    return this._send(url, 'get', params, null);
  }

}

export const ApiTypes = {
  ALL_POSTS: '/posts',
  LATEST_POST: '/posts/latest',
  SINGLE_POST: '/posts/:id',
  ALL_TAGS: '/tags',
  USER: '/admin/user',
  EMAIL: '/email',
  POSTS_BY_TAG: '/posts/tags/:tag'
}

export const ApiHandler = new ApiClass();
