import actions from 'actions/educationActions';
import Immutable from 'immutable';

function educations (state = Immutable.fromJS({}), action) {
  switch (action.type) {
    case actions.EDUCATION_FETCH_REQUEST:
      return state.set(action.slug, Immutable.fromJS({
        status: 'fetching',
        error: false,
      }));
    case actions.EDUCATION_FETCH_SUCCESS:
      return state.set(action.slug, Immutable.fromJS({
        status: 'done',
        response: action.response,
        error: false,
        lastUpdated: action.receivedAt,
      }));
    case actions.EDUCATION_FETCH_FAIL:
      return state.set(action.slug, Immutable.fromJS({
        status: 'error',
        error: Immutable.fromJS(action.error),
      }));
    default:
      return state
  }
}

export default educations;
