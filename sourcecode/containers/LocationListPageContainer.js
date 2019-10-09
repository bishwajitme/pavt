import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { default as _LocationListPage, }
  from 'components/LocationListPage/LocationListPage';
import * as LocationActions from 'actions/locationActions';
import * as PageActions from 'actions/pageActions';

function mapStateToProps (state) {
  return {
    pages: state.get('pages'),
    locationList: state.get('locationList'),
  };
}

function mapDispatchToProps (dispatch) {
  const AllActions = Object.assign({}, LocationActions, PageActions);
  return {actions: bindActionCreators(AllActions, dispatch)};
}

export const LocationListPage = connect(
  mapStateToProps, mapDispatchToProps)
(_LocationListPage);
