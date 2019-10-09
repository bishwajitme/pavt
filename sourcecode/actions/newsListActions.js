import keyMirror from 'keyMirror';
import WP from 'api/WP';

const newsListActions = keyMirror({
  NEWSLIST_FETCH_REQUEST: null,
  NEWSLIST_FETCH_SUCCESS: null,
  NEWSLIST_FETCH_FAIL: null,
});

function requestNewsList (slug) {
  return {
    type: newsListActions.NEWSLIST_FETCH_REQUEST,
    slug,
  }
}

function newsListFetchSuccess (slug, response) {
  return {
    type: newsListActions.NEWSLIST_FETCH_SUCCESS,
    slug,
    news: response,
    receivedAt: Date.now(),
  }
}

function newsListFetchFail (slug, error) {
  return {
    type: newsListActions.NEWSLIST_FETCH_FAIL,
    slug,
    error,
  }
}

function fetchNewsList (query) {
  return dispatch => {
    dispatch(requestNewsList(query));
    return WP.get(`/articles/find?
    type=${query.type}
    &offset=${query.offset}
    &size=${query.size}`)
      .then(function (json) {
        dispatch(newsListFetchSuccess(query, json));
      })
      .catch(function (error) {
        dispatch(newsListFetchFail(query, error));
      });
  };
}

//function shouldFetchNewsList (state, slug) {
//  const newsList = state.newsList;
//  if (!newsList.response.get(slug)) {
//    return true
//  }
//  if (newsList.status === 'fetching') {
//    return false
//  }
//  return newsList.error;
//}

export function fetchNewsListFromApi (query) {
  return (dispatch, getState) => {
    //if (shouldFetchNewsList(getState(), query)) {
    return dispatch(fetchNewsList(query));
    //}
  }
}

export default newsListActions;
