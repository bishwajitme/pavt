import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { default as _Page } from 'components/Page/Page';
import * as PageActions from 'actions/pageActions';

function mapStateToProps (state) {
  return {
    globals: state.get('globals'),
    pages: state.get('pages'),
  };
}

function mapDispatchToProps (dispatch) {
  const AllActions = Object.assign({}, PageActions);
  return {actions: bindActionCreators(AllActions, dispatch)};
}

export const Page = connect(
  mapStateToProps, mapDispatchToProps)
(_Page);
