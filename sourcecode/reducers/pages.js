import actions from 'actions/pageActions';
import Immutable from 'immutable';

const originState = Immutable.fromJS({});

function pages (state = originState, action) {
  switch (action.type) {
    case actions.PAGE_FETCH_REQUEST:
      return state.set(action.slug, Immutable.fromJS({
        status: 'fetching',
        error: false,
      }));
    case actions.PAGE_FETCH_SUCCESS:
      return state.set(action.slug, Immutable.fromJS({
        status: 'done',
        response: action.response,
        error: false,
        lastUpdated: action.receivedAt,
      }));
    case actions.PAGE_FETCH_FAIL:
      return state.set(action.slug, Immutable.fromJS({
        status: 'error',
        error: Immutable.fromJS(action.error),
      }));
    default:
      return state
  }
}

export default pages;
