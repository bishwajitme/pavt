import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { default as _SearchPage } from 'components/SearchPage/SearchPage';
import * as PageActions from 'actions/pageActions';
import * as EducationActions from 'actions/educationActions';
import * as FilterActions from 'actions/filterActions';
import * as UiActions from 'actions/uiActions';

function mapStateToProps (state) {
  return {
    educationList: state.get('educationList'),
    filter: state.get('filter'),
    globals: state.get('globals'),
    pages: state.get('pages'),
    search: state.get('search'),
    ui: state.get('ui'),
  };
}

function mapDispatchToProps (dispatch) {
  const AllActions = Object.assign(
    {},
    EducationActions,
    FilterActions,
    PageActions,
    UiActions
  );

  return {actions: bindActionCreators(AllActions, dispatch)};
}
export const SearchPage = connect(
  mapStateToProps, mapDispatchToProps)
(_SearchPage);
