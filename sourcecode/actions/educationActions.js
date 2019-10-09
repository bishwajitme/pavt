import keyMirror from 'keyMirror';
import WP from 'api/WP';
import educationQueryObjectToQueryString
  from 'utils/educationQueryObjectToQueryString';

const educationActions = keyMirror({
  EDUCATION_FETCH_REQUEST: null,
  EDUCATION_FETCH_SUCCESS: null,
  EDUCATION_FETCH_FAIL: null,
  EDUCATION_LIST_FETCH_REQUEST: null,
  EDUCATION_LIST_FETCH_SUCCESS: null,
  EDUCATION_LIST_FETCH_FAIL: null,
});


/* EDUCATIONS */

function educationFetchRequest (slug) {
  return {
    type: educationActions.EDUCATION_FETCH_REQUEST,
    slug,
  }
}

function educationFetchSuccess (slug, response) {
  return {
    type: educationActions.EDUCATION_FETCH_SUCCESS,
    slug,
    response: response,
    receivedAt: Date.now(),
  }
}

function educationFetchFail (slug, error) {
  return {
    type: educationActions.EDUCATION_FETCH_FAIL,
    slug,
    error,
  }
}

function fetchEducation (slug) {
  return dispatch => {
    dispatch(educationFetchRequest(slug));
    return WP.get(`/education/get/${slug}`)
      .then(function (json) {
        dispatch(educationFetchSuccess(slug, json));
      })
      .catch(function (error) {
        dispatch(educationFetchFail(slug, error));
      });
  };
}

function shouldFetchEducation (state, slug) {
  const status = state.getIn(['educations', slug, 'status']);
  if (!state.getIn(['educations', slug])) {
    return true
  }
  if (status === 'fetching' || status === 'error') {
    return false
  }
  return state.getIn(['educations', slug, 'error']);
}

export function fetchEducationFromApi (slug) {
  return (dispatch, getState) => {
    if (shouldFetchEducation(getState(), slug)) {
      return dispatch(fetchEducation(slug));
    }
  }
}


/* EDUCATION-LIST */

function educationListFetchRequest () {
  return {
    type: educationActions.EDUCATION_LIST_FETCH_REQUEST,
  }
}

function educationListFetchSuccess (response) {
  return {
    type: educationActions.EDUCATION_LIST_FETCH_SUCCESS,
    response: response,
    receivedAt: Date.now(),
  }
}

function educationListFetchFail (error) {
  return {
    type: educationActions.EDUCATION_LIST_FETCH_FAIL,
    error,
  }
}

function fetchEducationList (query) {
  const q = educationQueryObjectToQueryString(query);
  return dispatch => {
    dispatch(educationListFetchRequest());
    return WP.get(`/education/find${q}`)
      .then(function (json) {
        dispatch(educationListFetchSuccess(json));
      })
      .catch(function (error) {
        dispatch(educationListFetchFail(error))
      });
  };
}
//function shouldFetchEducationList (state, slug) {
//  const { status, response, error } = state.educations;
//  if (status === 'fetching' || status === 'error') {
//    return false
//  }
//  if (!response.get(slug)) {
//    return true
//  }
//  return error;
//}

export function fetchEducationListFromApi (query) {
  return (dispatch, getState) => {
    //if (shouldFetchEducationList(getState(), slug)) {
    return dispatch(fetchEducationList(query));
    //}
  }
}

export default educationActions;
