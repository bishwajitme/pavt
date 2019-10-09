import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { default as _ArticlePage } from 'components/ArticlePage/ArticlePage';
import * as ArticleActions from 'actions/articleActions';

function mapStateToProps (state) {
  return {
    articles: state.get('articles'),
  };
}

function mapDispatchToProps (dispatch) {
  const AllActions = Object.assign({}, ArticleActions);
  return {actions: bindActionCreators(AllActions, dispatch)};
}

export const ArticlePage = connect(
  mapStateToProps, mapDispatchToProps)
(_ArticlePage);
