import actions from 'actions/newsListActions';
import Immutable from 'immutable';

const addNewsToItems = (slug, response, news) => {
  return news.reduce((memo, newsItem) => {
    const ID = newsItem.linkUrl;
    return memo.setIn([ID], newsItem);
  }, response);
};

const originState = {
  status: 'pre',
  response: Immutable.fromJS({}),
  error: false,
};

function newsList (state = originState, action) {
  switch (action.type) {
    case actions.NEWSLIST_FETCH_REQUEST:
      return Object.assign({}, state, {
        status: 'fetching',
        error: false,
      });
    case actions.NEWSLIST_FETCH_SUCCESS:
      return Object.assign({}, state, {
        status: 'done',
        response: addNewsToItems(action.slug, state.response, action.news),
        error: false,
        lastUpdated: action.receivedAt,
      });
    case actions.NEWSLIST_FETCH_FAIL:
      return Object.assign({}, state, {
        status: 'error',
        response: addNewsToItems(state.response, 'error'),
        error: action.error,
      });
    default:
      return state
  }
}

export default newsList;
