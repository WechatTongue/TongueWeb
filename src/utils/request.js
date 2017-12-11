import fetch from 'dva/fetch';

function parse(response) {
  let promise = null;

  if (response.headers == null) {
    return;
  }

  const contentType = response.headers.get('Content-Type');

  if (contentType == null) {
    return;
  }

  if (contentType.indexOf('text') >= 0) {
    promise = response.text();
    return promise;
  } else if (contentType.indexOf('json') >= 0) {
    promise = response.json();
    return promise;
  }
}

function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response;
  }

  const error = new Error(response.statusText);
  error.response = response;
  throw error;
}

/**
 * Requests a URL, returning a promise.
 *
 * @param  {string} url       The URL we want to request
 * @param  {object} [options] The options we want to pass to "fetch"
 * @return {object}           An object containing either "data" or "err"
 */
export default function request(url, options) {

  if (options == null) {
    options = {};
  }

  if (options.headers == null) {
    options.headers = {};
  }

  options.headers['Content-Type'] = 'application/json';

  return fetch(url, options)
    .then(checkStatus)
    .then(parse)
    .then((data) => {
      if (data == null) {
        data = {};
      }
      if (data.ok == null ) {
        data.ok = true;
      }
      return data;
    })
    .catch(err => ({ err }));
}
