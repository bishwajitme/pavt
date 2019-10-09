import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { default as _LocationPage } from 'components/LocationPage/LocationPage';
import * as LocationActions from 'actions/locationActions';
import * as EducationActions from 'actions/educationActions';

function mapStateToProps (state) {
  return {
    globals: state.get('globals'),
    educationList: state.get('educationList'),
    locations: state.get('locations'),
  };
}

function mapDispatchToProps (dispatch) {
  const AllActions = Object.assign({}, LocationActions, EducationActions);
  return {actions: bindActionCreators(AllActions, dispatch)};
}

export const LocationPage = connect(
  mapStateToProps, mapDispatchToProps)
(_LocationPage);
