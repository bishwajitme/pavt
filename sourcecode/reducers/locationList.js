import actions from 'actions/locationActions';
import Immutable from 'immutable';

const addLocationsToStore = (state, action) => {
  return action.response.reduce((memo, location) => {
    const slug = location.slug;
    return memo.setIn([slug], Immutable.fromJS(location));
  }, state.get('response'));
};

const initialState = Immutable.fromJS({
  response: {},
});

function locationList (state = initialState, action) {
  switch (action.type) {
    case actions.LOCATION_LIST_FETCH_REQUEST:
      return state.merge({
        status: 'fetching',
        error: false,
      });
    case actions.LOCATION_LIST_FETCH_SUCCESS:
      return state.merge({
        status: 'done',
        response: addLocationsToStore(state, action),
        lastUpdated: action.receivedAt,
        error: false,
      });
    case actions.LOCATION_LIST_FETCH_FAIL:
      return state.merge({
        status: 'error',
        error: action.error,
      });
    default:
      return state
  }
}

export default locationList;
