import actions from 'actions/filterActions';
import Immutable from 'immutable';

const initialState = Immutable.fromJS({
  status: 'pre',
  error: false,
});

function search (state = initialState, action) {
  switch (action.type) {
    case actions.SEARCH_FETCH_REQUEST:
      return state.merge(Immutable.fromJS({
        status: 'fetching',
        error: false,
      }));
    case actions.SEARCH_FETCH_SUCCESS:
      return state.merge({
        status: 'done',
        response: action.response,
        lastUpdated: action.receivedAt,
        error: false,
      });
    case actions.SEARCH_FETCH_FAIL:
      return state.merge({
        status: 'error',
        error: action.error,
      });
    default:
      return state
  }
}

export default search;
