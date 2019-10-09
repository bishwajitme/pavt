import actions from 'actions/educationActions';
import Immutable from 'immutable';

const addEducationsToStore = (state, action) => {
  return action.response.reduce((memo, education) => {
    const id = education.id;
    return memo.setIn([id], Immutable.fromJS(education));
  }, state.get('response'));
};

const initialState = Immutable.fromJS({
  response: {},
});

function educationList (state = initialState, action) {
  switch (action.type) {
    case actions.EDUCATION_LIST_FETCH_REQUEST:
      return state.merge({
        status: 'fetching',
        error: false,
      });
    case actions.EDUCATION_LIST_FETCH_SUCCESS:
      return state.merge({
        status: 'done',
        response: addEducationsToStore(state, action),
        lastUpdated: action.receivedAt,
        error: false,
      });
    case actions.EDUCATION_LIST_FETCH_FAIL:
      return state.merge({
        status: 'error',
        error: action.error,
      });
    default:
      return state
  }
}

export default educationList;
