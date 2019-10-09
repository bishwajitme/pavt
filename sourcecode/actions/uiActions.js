import keyMirror from 'keyMirror';

const uiActions = keyMirror({
  INIT_SELECT: null,
  TOGGLE_SITE_MENU: null,
  HIDE_SITE_MENU: null,
  TOGGLE_PAGE_MENU: null,
  TOGGLE_EDUCATIONSSELECT: null,
  TOGGLE_SELECT: null,
  SET_ACTIVE_TAB: null,
});
export default uiActions;

export function initSelect (id) {
  return {
    type: uiActions.INIT_SELECT,
    id,
  }
}

export function toggleSelect (id) {
  return {
    type: uiActions.TOGGLE_SELECT,
    id,
  }
}

export function toggleSiteMenu () {
  return {
    type: uiActions.TOGGLE_SITE_MENU,
  }
}

export function hideSiteMenu () {
  return {
    type: uiActions.HIDE_SITE_MENU,
  }
}

export function togglePageMenu () {
  return {
    type: uiActions.TOGGLE_PAGE_MENU,
  }
}

export function toggleEducationsSelect () {
  return {
    type: uiActions.TOGGLE_EDUCATIONSSELECT,
  }
}

export function setActiveTab (id, index) {
  return {
    type: uiActions.SET_ACTIVE_TAB,
    id,
    index,
  }
}
