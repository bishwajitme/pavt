import actions from 'actions/articleActions';
import Immutable from 'immutable';

function articles (state = Immutable.fromJS({}), action) {
  switch (action.type) {
    case actions.ARTICLE_FETCH_REQUEST:
      return state.set(action.slug, Immutable.fromJS({
        status: 'fetching',
        error: false,
      }));
    case actions.ARTICLE_FETCH_SUCCESS:
      return state.set(action.slug, Immutable.fromJS({
        status: 'done',
        response: action.response,
        error: false,
        lastUpdated: action.receivedAt,
      }));
    case actions.ARTICLE_FETCH_FAIL:
      return state.set(action.slug, Immutable.fromJS({
        status: 'error',
        error: Immutable.fromJS(action.error),
      }));
    default:
      return state
  }
}

export default articles;
