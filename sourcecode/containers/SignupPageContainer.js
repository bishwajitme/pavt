import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { default as _SignupPage, }
  from 'components/SignupPage/SignupPage';
import * as FormActions from 'actions/formActions';
import * as PageActions from 'actions/pageActions';
import * as UiActions from 'actions/uiActions';

function mapStateToProps (state) {
  return {
    formEducations: state.get('formEducations'),
    globals: state.get('globals'),
    pages: state.get('pages'),
    signup: state.get('signup'),
    ui: state.get('ui'),
  };
}

function mapDispatchToProps (dispatch) {
  const AllActions = Object.assign(
    {},
    FormActions,
    PageActions,
    UiActions
  );
  return {actions: bindActionCreators(AllActions, dispatch)};
}

export const SignupPage = connect(
  mapStateToProps, mapDispatchToProps)(_SignupPage);
