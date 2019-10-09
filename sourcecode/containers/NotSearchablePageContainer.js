import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { default as _NotSearchablePage, }
  from 'components/NotSearchablePage/NotSearchablePage';
import * as EducationActions from 'actions/educationActions';
import * as PageActions from 'actions/pageActions';

function mapStateToProps (state) {
  return {
    educationList: state.get('educationList'),
    globals: state.get('globals'),
    pages: state.get('pages'),
  };
}

function mapDispatchToProps (dispatch) {
  const AllActions = Object.assign(
    {},
    EducationActions,
    PageActions
  );

  return {actions: bindActionCreators(AllActions, dispatch)};
}
export const NotSearchablePage = connect(
  mapStateToProps, mapDispatchToProps)
(_NotSearchablePage);
