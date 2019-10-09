import keyMirror from 'keyMirror';
import WP from 'api/WP';

const pageActions = keyMirror({
  PAGE_FETCH_REQUEST: null,
  PAGE_FETCH_SUCCESS: null,
  PAGE_FETCH_FAIL: null,
});

function pageFetchRequest (slug) {
  return {
    type: pageActions.PAGE_FETCH_REQUEST,
    slug,
  }
}

function pageFetchSuccess (slug, response) {
  return {
    type: pageActions.PAGE_FETCH_SUCCESS,
    slug,
    response: response,
    receivedAt: Date.now(),
  }
}

function pageFetchFail (slug, error) {
  return {
    type: pageActions.PAGE_FETCH_FAIL,
    slug,
    error,
  }
}

function fetchPage (slug) {
  return dispatch => {
    dispatch(pageFetchRequest(slug));
    return WP.get(`/pages/get/${slug}`)
      .then(function (json) {
        dispatch(pageFetchSuccess(slug, json));
      })
      .catch(function (error) {
        dispatch(pageFetchFail(slug, error));
      });
  };
}

function shouldFetchPage (state, slug) {
  if (!state.getIn(['pages', slug])) {
    return true
  }
  if (state.getIn(['pages', slug, 'status']) === 'fetching') {
    return false
  }
  if (state.getIn(['pages', slug, 'status']) === 'error') {
    return false;
  }
}

export function fetchPageFromApi (slug) {
  return (dispatch, getState) => {
    if (shouldFetchPage(getState(), slug)) {
      return dispatch(fetchPage(slug));
    }
  }
}

export default pageActions;
