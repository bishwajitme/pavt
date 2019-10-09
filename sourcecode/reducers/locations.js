import actions from 'actions/locationActions';
import Immutable from 'immutable';

function locations (state = Immutable.fromJS({}), action) {
  switch (action.type) {
    case actions.LOCATION_FETCH_REQUEST:
      return state.set(action.slug, Immutable.fromJS({
        status: 'fetching',
        error: false,
      }));
    case actions.LOCATION_FETCH_SUCCESS:
      return state.set(action.slug, Immutable.fromJS({
        status: 'done',
        response: action.response,
        error: false,
        lastUpdated: action.receivedAt,
      }));
    case actions.LOCATION_FETCH_FAIL:
      return state.set(action.slug, Immutable.fromJS({
        status: 'error',
        error: Immutable.fromJS(action.error),
      }));
    default:
      return state
  }
}

export default locations;
