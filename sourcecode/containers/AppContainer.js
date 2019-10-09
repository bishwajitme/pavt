import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import App from 'components/App/App';
import * as GlobalsActions from 'actions/globalsActions';
import * as UiActions from 'actions/uiActions';

function mapStateToProps (state) {
  return {
    globals: state.get('globals'),
    ui: state.get('ui'),
  };
}

function mapDispatchToProps (dispatch) {
  const AllActions = Object.assign(
    {},
    GlobalsActions,
    UiActions
  );
  return {actions: bindActionCreators(AllActions, dispatch)};
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
