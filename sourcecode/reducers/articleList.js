import actions from 'actions/articleActions';
import Immutable from 'immutable';

const addArticlesToStore = (state, action) => {
  return action.response.reduce((memo, article) => {
    const slug = article.slug;
    return memo.setIn([slug], Immutable.fromJS(article));
  }, state.get('response'));
};

const initialState = Immutable.fromJS({
  response: {},
});

function articleList (state = initialState, action) {
  switch (action.type) {
    case actions.ARTICLE_LIST_FETCH_REQUEST:
      return state.merge({
        status: 'fetching',
        error: false,
      });
    case actions.ARTICLE_LIST_FETCH_SUCCESS:
      return state.merge({
        status: 'done',
        response: addArticlesToStore(state, action),
        lastUpdated: action.receivedAt,
        error: false,
      });
    case actions.ARTICLE_LIST_FETCH_FAIL:
      return state.merge({
        status: 'error',
        error: action.error,
      });
    default:
      return state
  }
}

export default articleList;
