import actions from 'actions/globalsActions';
import Immutable from 'immutable';

const initialState = Immutable.fromJS({
  status: 'pre',
  error: false,
});

function globals (state = initialState, action) {
  switch (action.type) {
    case actions.GLOBALS_FETCH_REQUEST:
      return state.merge(Immutable.fromJS({
        status: 'fetching',
        error: false,
      }));
    case actions.GLOBALS_FETCH_SUCCESS:
      return state.merge({
        status: 'done',
        response: action.response,
        lastUpdated: action.receivedAt,
        error: false,
      });
    case actions.GLOBALS_FETCH_FAIL:
      return state.merge({
        status: 'error',
        error: action.error,
      });
    default:
      return state
  }
}

export default globals;
