import actions from 'actions/formActions';
import Immutable from 'immutable';

const initialState = Immutable.fromJS({
  showSuccessMessage: false,
  showErrorMessage: false,
  FormData: {},
});

const initFormInput = (state, action) => {
  return state.setIn(['FormData', action.name], Immutable.fromJS({
    type: 'textInput',
    showValidationMessage: false,
    modified: false,
    valid: false,
  }));
};

const initEducationSelect = (state) => {
  return state.setIn(['FormData', 'Enquiries'], Immutable.fromJS({
    type: 'selectBox',
    showValidationMessage: false,
    modified: false,
    valid: false,
    value: [],
  }));
};

const setFormInput = (state, action) => {
  const name = action.input.get('name');
  const old = state.getIn(['FormData', name]);
  return state.setIn(
    ['FormData', name], old.mergeDeep(action.input.get('field'))
  );
};

const addToEnquiries = (state, action) => {
  const old = state.getIn(
      ['FormData', 'Enquiries', 'value']
    ) || Immutable.fromJS([]);
  return checkEnquiriesValidity(state.setIn(
    ['FormData', 'Enquiries', 'value'],
    old.push(action.education))
  );
};

const removeFromEnquiries = (state, action) => {
  const newList = state.getIn(
    ['FormData', 'Enquiries', 'value']
  ).filter(education => {
    if (!Immutable.is(education, action.education)) {
      return education;
    }
  });

  return checkEnquiriesValidity(state.setIn(
    ['FormData', 'Enquiries', 'value'], newList)
  );
};

const checkEnquiriesValidity = (state) => {
  const valid = !!state.getIn(['FormData', 'Enquiries', 'value']).size;
  return state.setIn(['FormData', 'Enquiries', 'valid'], valid);
};

const signup = (state = initialState, action) => {
  switch (action.type) {
    case actions.SET_FORM_INPUT:
      return setFormInput(state, action);
    case actions.INIT_FORM_INPUT:
      return initFormInput(state, action);
    case actions.INIT_EDUCATIONSSELECT:
      return initEducationSelect(state);
    case actions.ADD_TO_ENQUIRIES:
      return addToEnquiries(state, action);
    case actions.REMOVE_FROM_ENQUIRIES:
      return removeFromEnquiries(state, action);
    case actions.SHOW_FORM_SUCCESS_MESSAGE:
      return state.set('showSuccessMessage', true);
    case actions.SHOW_FORM_ERROR_MESSAGE:
      return state.set('showErrorMessage', true);
    default:
      return state;
  }
};

export default signup;
