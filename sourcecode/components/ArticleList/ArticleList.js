import React, { Component, PropTypes } from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';
import ArticleCards from 'components/ArticleCards/ArticleCards';
import Spinner from 'components/Spinner/Spinner';
import filterArticlesThroughQuery from 'utils/filterArticlesThroughQuery';

class ArticleList extends Component {

  componentWillMount () {
    const query = this.props.query;
    this.props.actions.fetchArticleListFromApi(query);
  }

  render () {
    const articleList = this.props.articleList;
    const status = articleList.get('status');
    const response = articleList.get('response');
    const heading = this.props.heading || '';
    const context = this.props.context;

    if (status === 'done' && response) {

      const query = this.props.query;
      const articles = filterArticlesThroughQuery(
        response.toList().sortBy(x => x.get('date')).reverse(),
        query
      );

      return (
        <div>
          <ArticleCards context={context}
                        heading={heading}
                        articles={articles}/>
        </div>
      );
    } else if (status === 'fetching') {
      return (
        <Spinner/>
      );
    } else if (status === 'error') {
      return false;
    } else {
      return false;
    }
  }
}

ArticleList.propTypes = {
  actions: PropTypes.object,
  articleList: ImmutablePropTypes.map,
  context: PropTypes.string,
  heading: PropTypes.string,
  query: PropTypes.object,
  state: PropTypes.object,
};

export default ArticleList;
