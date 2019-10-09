import actions from 'actions/uiActions';
import Immutable from 'immutable';

const initialState = Immutable.fromJS({
  showSiteMenu: false,
  showPageMenu: false,
  showEducationsSelect: false,
  selects: {},
  tabs: {},
});

const initSelect = (state, action) => {
  return state.mergeDeep(Immutable.fromJS({
    selects: {
      [action.id]: false,
    },
  }));
};

const toggleSelect = (state, action) => {
  const woo = state.get('selects').reduce((memo, val, key) => {
    const value = (key === action.id) ? !val : false;
    return memo.set(key, value);
  }, Immutable.fromJS({}));

  return state.set('selects', woo);
};

const ui = (state = initialState, action) => {
  switch (action.type) {
    case actions.INIT_SELECT:
      return initSelect(state, action);
    case actions.TOGGLE_SELECT:
      return toggleSelect(state, action);
    case actions.TOGGLE_SITE_MENU:
      return state.set('showSiteMenu', !state.get('showSiteMenu'));
    case actions.HIDE_SITE_MENU:
      return state.set('showSiteMenu', false);
    case actions.TOGGLE_PAGE_MENU:
      return state.set('showPageMenu', !state.get('showPageMenu'));
    case actions.TOGGLE_EDUCATIONSSELECT:
      return state.set(
        'showEducationsSelect',
        !state.get('showEducationsSelect')
      );
    case actions.SET_ACTIVE_TAB:
      return state.setIn(['tabs', action.id], parseInt(action.index));
    default:
      return state;
  }
};

export default ui;
