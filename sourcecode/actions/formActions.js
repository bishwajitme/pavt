import keyMirror from 'keyMirror';
import config from 'webpack-config-loader!conf';
import WP from 'api/WP';

const formActions = keyMirror({
  SET_FORM_INPUT: null,
  INIT_FORM_INPUT: null,
  INIT_EDUCATIONSSELECT: null,
  ADD_TO_ENQUIRIES: null,
  REMOVE_FROM_ENQUIRIES: null,
  FORM_EDUCATIONS_FETCH_REQUEST: null,
  FORM_EDUCATIONS_FETCH_SUCCESS: null,
  FORM_EDUCATIONS_FETCH_FAIL: null,
  SHOW_FORM_SUCCESS_MESSAGE: null,
  SHOW_FORM_ERROR_MESSAGE: null,
});
export default formActions;

export function initFormInput (name) {
  return {
    type: formActions.INIT_FORM_INPUT,
    name,
  }
}

export function initEducationSelect () {
  return {
    type: formActions.INIT_EDUCATIONSSELECT,
  }
}

export function setFormInput (input) {
  return {
    type: formActions.SET_FORM_INPUT,
    input,
  }
}

export function addToEnquiries (education) {
  return {
    type: formActions.ADD_TO_ENQUIRIES,
    education,
  }
}

export function removeFromEnquiries (education) {
  return {
    type: formActions.REMOVE_FROM_ENQUIRIES,
    education,
  }
}

export function showFormSuccessMessage () {
  return {
    type: formActions.SHOW_FORM_SUCCESS_MESSAGE,
  }
}

export function showFormErrorMessage () {
  return {
    type: formActions.SHOW_FORM_ERROR_MESSAGE,
  }
}



/* EDUCATION-LIST */

function formEducationsFetchRequest () {
  return {
    type: formActions.FORM_EDUCATIONS_FETCH_REQUEST,
  }
}

function formEducationsFetchSuccess (response) {
  return {
    type: formActions.FORM_EDUCATIONS_FETCH_SUCCESS,
    response: response,
    receivedAt: Date.now(),
  }
}

function formEducationsFetchFail (error) {
  return {
    type: formActions.FORM_EDUCATIONS_FETCH_FAIL,
    error,
  }
}

function fetchFormEducations () {
  return dispatch => {
    dispatch(formEducationsFetchRequest());
    return WP.get(`/form-request/get?key=${config.formKey}`)
      .then(function (json) {
        dispatch(formEducationsFetchSuccess(json));
      })
      .catch(function (error) {
        dispatch(formEducationsFetchFail(error))
      });
  };
}

function shouldFetchEducations (state) {
  if (!state.getIn(['formEducations', 'response']).size) {
    return true
  }
  if (state.getIn(['formEducations', 'status']) === 'fetching') {
    return false
  }
  if (state.getIn(['formEducations', 'status']) === 'error') {
    return false;
  }
}

export function fetchFormEducationsFromApi () {
  return (dispatch, getState) => {
    if (shouldFetchEducations(getState())) {
      return dispatch(fetchFormEducations());
    }
  }
}


//import keyMirror from 'keyMirror';
//import Immutable from 'immutable';
//import config from 'webpack-config-loader!conf';
//import XMLHttpRequestPromise from 'xhr-promise';
//
//const formActions = keyMirror({
//  SET_FORM_INPUT: null,
//  INIT_FORM_INPUT: null,
//  INIT_EDUCATIONSSELECT: null,
//  ADD_TO_ENQUIRIES: null,
//  REMOVE_FROM_ENQUIRIES: null,
//  FORM_EDUCATIONS_FETCH_REQUEST: null,
//  FORM_EDUCATIONS_FETCH_SUCCESS: null,
//  FORM_EDUCATIONS_FETCH_FAIL: null,
//});
//export default formActions;
//
//export function initFormInput (name) {
//  return {
//    type: formActions.INIT_FORM_INPUT,
//    name,
//  }
//}
//
//export function initEducationSelect () {
//  return {
//    type: formActions.INIT_EDUCATIONSSELECT,
//  }
//}
//
//export function setFormInput (input) {
//  return {
//    type: formActions.SET_FORM_INPUT,
//    input,
//  }
//}
//
//export function addToEnquiries (education) {
//  return {
//    type: formActions.ADD_TO_ENQUIRIES,
//    education,
//  }
//}
//
//export function removeFromEnquiries (education) {
//  return {
//    type: formActions.REMOVE_FROM_ENQUIRIES,
//    education,
//  }
//}
//
///* EDUCATION-LIST */
//
//function formEducationsFetchRequest () {
//  return {
//    type: formActions.FORM_EDUCATIONS_FETCH_REQUEST,
//  }
//}
//
//function formEducationsFetchSuccess (response) {
//  return {
//    type: formActions.FORM_EDUCATIONS_FETCH_SUCCESS,
//    response: response,
//    receivedAt: Date.now(),
//  }
//}
//
//function formEducationsFetchFail (error) {
//  return {
//    type: formActions.FORM_EDUCATIONS_FETCH_FAIL,
//    error,
//  }
//}
//
//function fetchFormEducations () {
//  return dispatch => {
//    dispatch(formEducationsFetchRequest());
//
//    const xhrPromise = new XMLHttpRequestPromise();
//    const hostname = config.hostname || '//' + window.location.host;
//    return xhrPromise.send({
//      method: 'GET',
//      url: hostname + config.formGetEndpoint +
//      '?ApiKey=' + config.formKey + '&ApiChannel=' + config.formChannel,
//    })
//    .then((results) => {
//      if (results.status !== 200) {
//        throw new Error('request failed');
//      }
//      const payload = xhrPromise.getXHR();
//      const data = Immutable.fromJS(JSON.parse(payload.responseText));
//      dispatch(formEducationsFetchSuccess(data));
//    })
//    .catch(function (e) {
//      dispatch(formEducationsFetchFail(e))
//    });
//  };
//}
//
//function shouldFetchEducations (state) {
//  if (!state.getIn(['formEducations', 'response']).size) {
//    return true
//  }
//  if (state.getIn(['formEducations', 'status']) === 'fetching') {
//    return false
//  }
//  if (state.getIn(['formEducations', 'status']) === 'error') {
//    return false;
//  }
//}
//
//export function fetchFormEducationsFromApi () {
//  return (dispatch, getState) => {
//    if (shouldFetchEducations(getState())) {
//      return dispatch(fetchFormEducations());
//    }
//  }
//}
