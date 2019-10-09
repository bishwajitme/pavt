import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { default as _EducationPage, }
  from 'components/EducationPage/EducationPage';
import * as EducationActions from 'actions/educationActions';
import * as FormActions from 'actions/formActions';
import * as UiActions from 'actions/uiActions';

function mapStateToProps (state) {
  return {
    educations: state.get('educations'),
    formEducations: state.get('formEducations'),
    globals: state.get('globals'),
    signup: state.get('signup'),
    ui: state.get('ui'),
  };
}

function mapDispatchToProps (dispatch) {
  const AllActions = Object.assign(
    {},
    EducationActions,
    FormActions,
    UiActions
  );
  return {actions: bindActionCreators(AllActions, dispatch)};
}

export const EducationPage = connect(
  mapStateToProps, mapDispatchToProps)(_EducationPage);
