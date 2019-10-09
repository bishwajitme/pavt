import keyMirror from 'keyMirror';
import WP from 'api/WP';

const filterActions = keyMirror({
  SEARCH_FETCH_REQUEST: null,
  SEARCH_FETCH_SUCCESS: null,
  SEARCH_FETCH_FAIL: null,
  SEARCH_SET_FILTER: null,
  SEARCH_SET_TEMP_FILTER: null,
  PRESS_SET_FILTER: null,
});



/* FILTER */

export function setEducationListTempFilter (filter) {
  return {
    type: filterActions.SEARCH_SET_TEMP_FILTER,
    filter,
  }
}

export function setEducationListFilter () {
  return {
    type: filterActions.SEARCH_SET_FILTER,
  }
}

export function setPressListFilter (filter, pressType) {
  return {
    type: filterActions.PRESS_SET_FILTER,
    pressType,
    filter,
  }
}





function searchDataFetchRequest () {
  return {
    type: filterActions.SEARCH_FETCH_REQUEST,
  }
}

function searchDataFetchSuccess (response) {
  return {
    type: filterActions.SEARCH_FETCH_SUCCESS,
    response: response,
    receivedAt: Date.now(),
  }
}

function searchDataFetchFail (error) {
  return {
    type: filterActions.SEARCH_FETCH_FAIL,
    error,
  }
}

function fetchSearchData () {
  return dispatch => {
    dispatch(searchDataFetchRequest());
    return WP.get('/search')
      .then(function (json) {
        dispatch(searchDataFetchSuccess(json));
      })
      .catch(function (error) {
        dispatch(searchDataFetchFail(error));
      });
  }
}

function shouldFetchSearchData (state) {
  if (!state.getIn(['search', 'response'])) {
    return true
  }
  if (state.getIn(['search', 'status']) === 'fetching') {
    return false
  }
  if (state.getIn(['search', 'status']) === 'error') {
    return state.getIn(['search', 'error']);
  }
}

export function fetchSearchDataFromApi () {
  return (dispatch, getState) => {
    if (shouldFetchSearchData(getState())) {
      return dispatch(fetchSearchData())
    }
  }
}

export default filterActions;
