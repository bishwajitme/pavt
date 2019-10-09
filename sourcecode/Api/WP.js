import config from 'webpack-config-loader!conf';
import XMLHttpRequestPromise from 'xhr-promise';

function checkStatus (response) {
  if (response.status >= 200
    && response.status < 300
    && response.responseText.status !== 400
  ) {
    return response;
  } else {
    const error = new Error(response.statusText);
    error.response = response;
    throw error;
  }
}

function saveToLocalStorage (timestamp, endpoint, data) {
  try {
    localStorage.setItem(endpoint, JSON.stringify({
      timestamp: timestamp,
      data: data,
    }));
  } catch (error) {
    return false;
  }
}

function getCache (endpoint) {
  try {
    const cache = localStorage.getItem(endpoint);
    return JSON.parse(cache);
  } catch (error) {
    return false;
  }
}

function isLoggedIn () {
  try {
    return localStorage.getItem('loggedIn');
  } catch (error) {
    return false;
  }
}

function shouldGetFromCache (cache) {
  const today = new Date().getTime();
  const cacheDate = cache.timestamp;
  return today - cacheDate >= config.cacheTime;
}

const WP = {
  get: function (endpoint) {
    const loggedIn = isLoggedIn();
    const js = getCache(endpoint);

    if (js && !shouldGetFromCache(js) && loggedIn !== 'true') {
      return new Promise((resolve) => {
        const data = js.data;
        resolve(data);
      });
    } else {
      const hostname = config.hostname || 'http://' + window.location.host;
      const url = hostname + config.apiEndpoint + endpoint;

      const xhrPromise = new XMLHttpRequestPromise();
      return xhrPromise.send({
        method: 'GET',
        url: url,
      })
      .then(checkStatus)
      .then((payload) => {
        saveToLocalStorage(
          new Date().getTime(),
          endpoint,
          payload.responseText
        );
        return payload.responseText;
      })
      .catch(function (e) {
        throw new Error('error:');
      });
    }
  },
};

export default WP;
