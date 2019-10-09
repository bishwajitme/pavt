import { combineReducers } from 'redux-immutable';
import articleList from 'reducers/articleList';
import articles from 'reducers/articles';
import educationList from 'reducers/educationList';
import educations from 'reducers/educations';
import filter from 'reducers/filter';
import formEducations from 'reducers/formEducations';
import globals from 'reducers/globals';
import locationList from 'reducers/locationList';
import locations from 'reducers/locations';
import pages from 'reducers/pages';
import router from 'reducers/route';
import search from 'reducers/search';
import signup from 'reducers/signup';
import ui from 'reducers/ui';

const rootReducer = combineReducers({
  articleList: articleList,
  articles: articles,
  educationList: educationList,
  educations: educations,
  filter: filter,
  formEducations: formEducations,
  globals: globals,
  locationList: locationList,
  locations: locations,
  pages: pages,
  router: router,
  search: search,
  signup: signup,
  ui: ui,
});

export default rootReducer;
