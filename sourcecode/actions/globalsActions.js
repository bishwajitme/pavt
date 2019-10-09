import keyMirror from 'keyMirror';
import WP from 'api/WP';

const globalsActions = keyMirror({
  GLOBALS_FETCH_REQUEST: null,
  GLOBALS_FETCH_SUCCESS: null,
  GLOBALS_FETCH_FAIL: null,
});

function requestGlobals () {
  return {
    type: globalsActions.GLOBALS_FETCH_REQUEST,
  }
}

function globalsFetchSuccess (response) {
  return {
    type: globalsActions.GLOBALS_FETCH_SUCCESS,
    response: response,
    receivedAt: Date.now(),
  }
}

function globalsFetchFail (error) {
  return {
    type: globalsActions.GLOBALS_FETCH_FAIL,
    error,
  }
}

function fetchGlobals () {
  return dispatch => {
    dispatch(requestGlobals());
    return WP.get(`/globals`)
      .then(function (json) {
        dispatch(globalsFetchSuccess(json));
      })
      .catch(function (error) {
        dispatch(globalsFetchFail(error));
      });
  }
}

function shouldFetchGlobals (state) {
  if (!state.getIn(['globals', 'response'])) {
    return true
  }
  if (state.getIn(['globals', 'status']) === 'fetching') {
    return false
  }
  if (state.getIn(['globals', 'status']) === 'error') {
    return state.getIn(['globals', 'error']);
  }

}

export function fetchGlobalsFromApi () {
  return (dispatch, getState) => {
    if (shouldFetchGlobals(getState())) {
      return dispatch(fetchGlobals())
    }
  }
}

export default globalsActions;
