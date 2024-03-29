import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { default as _PressPage } from 'components/PressPage/PressPage';
import * as PageActions from 'actions/pageActions';
import * as ArticleActions from 'actions/articleActions';
import * as FilterActions from 'actions/filterActions';

function mapStateToProps (state) {
  return {
    globals: state.get('globals'),
    filter: state.get('filter'),
    pages: state.get('pages'),
    articleList: state.get('articleList'),
  };
}

function mapDispatchToProps (dispatch) {
  const AllActions = Object.assign(
    {},
    PageActions,
    ArticleActions,
    FilterActions
  );

  return {actions: bindActionCreators(AllActions, dispatch)};
}

export const PressPage = connect(
  mapStateToProps, mapDispatchToProps)
(_PressPage);
