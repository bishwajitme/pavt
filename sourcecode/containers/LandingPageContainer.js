import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { default as _LandingPage } from 'components/LandingPage/LandingPage';
import * as PageActions from 'actions/pageActions';
import * as ArticleActions from 'actions/articleActions';
import * as FilterActions from 'actions/filterActions';
import * as LocationActions from 'actions/locationActions';
import * as UiActions from 'actions/uiActions';

function mapStateToProps (state) {
  return {
    articleList: state.get('articleList'),
    filter: state.get('filter'),
    globals: state.get('globals'),
    locationList: state.get('locationList'),
    pages: state.get('pages'),
    search: state.get('search'),
    ui: state.get('ui'),
  };
}

function mapDispatchToProps (dispatch) {
  const AllActions = Object.assign(
    {},
    PageActions,
    ArticleActions,
    FilterActions,
    LocationActions,
    UiActions
  );
  return {actions: bindActionCreators(AllActions, dispatch)};
}

export const LandingPage = connect(
  mapStateToProps, mapDispatchToProps)
(_LandingPage);
