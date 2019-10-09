import keyMirror from 'keyMirror';
import WP from 'api/WP';

const locationActions = keyMirror({
  LOCATION_FETCH_REQUEST: null,
  LOCATION_FETCH_SUCCESS: null,
  LOCATION_FETCH_FAIL: null,
  LOCATION_LIST_FETCH_REQUEST: null,
  LOCATION_LIST_FETCH_SUCCESS: null,
  LOCATION_LIST_FETCH_FAIL: null,
});

/* LOCATIONS */

function locationFetchRequest (slug) {
  return {
    type: locationActions.LOCATION_FETCH_REQUEST,
    slug,
  }
}

function locationFetchSuccess (slug, response) {
  return {
    type: locationActions.LOCATION_FETCH_SUCCESS,
    slug,
    response: response,
    receivedAt: Date.now(),
  }
}

function locationFetchFail (slug, error) {
  return {
    type: locationActions.LOCATION_FETCH_FAIL,
    slug,
    error,
  }
}

function fetchLocation (slug) {
  return dispatch => {
    dispatch(locationFetchRequest(slug));
    return WP.get(`/location/get/${slug}`)
      .then(function (json) {
        dispatch(locationFetchSuccess(slug, json));
      })
      .catch(function (error) {
        dispatch(locationFetchFail(slug, error));
      });
  };
}

function shouldFetchLocation (state, slug) {
  const status = state.getIn(['locations', slug, 'status']);
  if (!state.getIn(['locations', slug])) {
    return true
  }
  if (status === 'fetching' || status === 'error') {
    return false
  }
  return state.getIn(['locations', slug, 'error']);
}

export function fetchLocationFromApi (slug) {
  return (dispatch, getState) => {
    if (shouldFetchLocation(getState(), slug)) {
      return dispatch(fetchLocation(slug));
    }
  }
}

/* LOCATION-LIST */

function locationListFetchRequest () {
  return {
    type: locationActions.LOCATION_LIST_FETCH_REQUEST,
  }
}

function locationListFetchSuccess (response) {
  return {
    type: locationActions.LOCATION_LIST_FETCH_SUCCESS,
    response: response,
    receivedAt: Date.now(),
  }
}

function locationListFetchFail (error) {
  return {
    type: locationActions.LOCATION_LIST_FETCH_FAIL,
    error,
  }
}

function fetchLocationList () {
  return dispatch => {
    dispatch(locationListFetchRequest());
    return WP.get(`/location/list`)
      .then(function (json) {
        dispatch(locationListFetchSuccess(json));
      })
      .catch(function (error) {
        dispatch(locationListFetchFail(error))
      });
  };
}
//function shouldFetchLocationList (state, slug) {
//  const { status, response, error } = state.locations;
//  if (status === 'fetching' || status === 'error') {
//    return false
//  }
//  if (!response.get(slug)) {
//    return true
//  }
//  return error;
//}

export function fetchLocationListFromApi () {
  return (dispatch, getState) => {
    //if (shouldFetchLocationList(getState(), slug)) {
    return dispatch(fetchLocationList());
    //}
  }
}

export default locationActions;
