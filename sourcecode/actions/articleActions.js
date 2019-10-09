import keyMirror from 'keyMirror';
import WP from 'api/WP';
import queryObjectToQueryString from 'utils/queryObjectToQueryString';

const articleActions = keyMirror({
  ARTICLE_FETCH_REQUEST: null,
  ARTICLE_FETCH_SUCCESS: null,
  ARTICLE_FETCH_FAIL: null,
  ARTICLE_LIST_FETCH_REQUEST: null,
  ARTICLE_LIST_FETCH_SUCCESS: null,
  ARTICLE_LIST_FETCH_FAIL: null,
});

/* ARTICLES */

function articleFetchRequest (slug) {
  return {
    type: articleActions.ARTICLE_FETCH_REQUEST,
    slug,
  }
}

function articleFetchSuccess (slug, response) {
  return {
    type: articleActions.ARTICLE_FETCH_SUCCESS,
    slug,
    response: response,
    receivedAt: Date.now(),
  }
}

function articleFetchFail (slug, error) {
  return {
    type: articleActions.ARTICLE_FETCH_FAIL,
    slug,
    error,
  }
}

function fetchArticle (slug) {
  return dispatch => {
    dispatch(articleFetchRequest(slug));
    return WP.get(`/articles/get/${slug}`)
      .then(function (json) {
        dispatch(articleFetchSuccess(slug, json));
      })
      .catch(function (error) {
        dispatch(articleFetchFail(slug, error));
      });
  };
}

function shouldFetchArticle (state, slug) {
  const status = state.getIn(['article', slug, 'status']);
  if (!state.getIn(['articles', slug])) {
    return true
  }
  if (status === 'fetching' || status === 'error') {
    return false
  }
}

export function fetchArticleFromApi (slug) {
  return (dispatch, getState) => {
    if (shouldFetchArticle(getState(), slug)) {
      return dispatch(fetchArticle(slug));
    }
  }
}

/* ARTICLE-LIST */

function articleListFetchRequest () {
  return {
    type: articleActions.ARTICLE_LIST_FETCH_REQUEST,
  }
}

function articleListFetchSuccess (response) {
  return {
    type: articleActions.ARTICLE_LIST_FETCH_SUCCESS,
    response: response,
    receivedAt: Date.now(),
  }
}

function articleListFetchFail (error) {
  return {
    type: articleActions.ARTICLE_LIST_FETCH_FAIL,
    error,
  }
}

function fetchArticleList (query) {
  const q = queryObjectToQueryString(query);
  return dispatch => {
    dispatch(articleListFetchRequest());
    return WP.get(`/articles/find${q}`)
      .then(function (json) {
        dispatch(articleListFetchSuccess(json));
      })
      .catch(function (error) {
        dispatch(articleListFetchFail(error))
      });
  };
}
//function shouldFetchArticleList (state, query, type) {
  //const articleLength = state.getIn(['articleList', 'response'])
  //  .filter(item => {
  //    return item.get('type') === query.get('type');
  //  }).size;
  //const size = state.getIn(['filter', 'press', type, 'size']);
  //const status = state.getIn(['articleList', 'status']);
  //
  //if (articleLength < size) {
  //  return true;
  //}
  //if (status === 'fetching' || status === 'error') {
  //  return false
  //}
  //return false;
//}

export function fetchArticleListFromApi (query, type) {
  return (dispatch, getState) => {
    //if (shouldFetchArticleList(getState(), query, type)) {
    return dispatch(fetchArticleList(query, type));
    //}
  }
}

export default articleActions;
