import actions from 'actions/formActions';
import Immutable from 'immutable';

const addEducationsToStore = (state, action) => {

  //formEducations = formEducationsArray.reduce((memo, education) => {
  //  const id = education.get('Id');
  //  return memo.set(id, education);
  //}, formEducations);
  //return action.response.reduce((memo, location) => {
  //  const slug = location.slug;
  //  return memo.setIn([slug], Immutable.fromJS(location));
  //}, state.get('response'));
  return action.response;
};

const initialState = Immutable.fromJS({
  response: {},
});

function formEducations (state = initialState, action) {
  switch (action.type) {
    case actions.FORM_EDUCATIONS_FETCH_REQUEST:
      return state.merge({
        status: 'fetching',
        error: false,
      });
    case actions.FORM_EDUCATIONS_FETCH_SUCCESS:
      return state.merge({
        status: 'done',
        response: addEducationsToStore(state, action),
        lastUpdated: action.receivedAt,
        error: false,
      });
    case actions.FORM_EDUCATIONS_FETCH_FAIL:
      return state.merge({
        status: 'error',
        error: action.error,
      });
    default:
      return state
  }
}

export default formEducations;
