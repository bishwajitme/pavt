import React, { Component, PropTypes } from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';
import ArticleCards from 'components/ArticleCards/ArticleCards';
import NoResults from 'components/NoResults/NoResults';
import Spinner from 'components/Spinner/Spinner';
import filterArticlesThroughQuery from 'utils/filterArticlesThroughQuery';
import styles from './PressList.less';

class PressList extends Component {

  componentWillMount () {
    const press = this.props.filter.get('press');
    const active = press.get('active');
    const query = press.get(active);
    this.props.actions.fetchArticleListFromApi(query, active);
  }

  componentWillUpdate (nextProps) {

  }

  componentWillReceiveProps (nextProps) {
    //const press = nextProps.filter.get('press');
    //const active = press.get('active');
    //const query = press.get(active);
    //console.log('CWRP', nextProps, query.toJS());
    //nextProps.actions.fetchArticleListFromApi(query, active);
  }

  render () {
    const articleList = this.props.articleList;
    const status = articleList.get('status');
    const response = articleList.get('response');

    if (status === 'done' && response.size) {

      const press = this.props.filter.get('press');
      const active = press.get('active');
      const query = press.get(active);
      const articles = filterArticlesThroughQuery(
        response.toList().sortBy(x => x.get('date')).reverse(),
        query
      );
      //const articles = filterArticlesThroughQuery(response.toList(), query);

      if (articles.size) {
        return (
          <div className={styles.base}>
            <section className={styles.section}>
              <ArticleCards context={'single-fullrow'}
                            articles={articles}/>
            </section>
          </div>
        );
      } else {
        return (
          <NoResults heading={`Hittade inga nyheter i kategorin '${active}'`}/>
        );
      }

    } else if (status === 'fetching') {
      return (
        <Spinner/>
      );
    } else if (status === 'error') {
      return (
        <li>Hittade inte sidan :(</li>
      );
    } else {
      return (
        <div>WHAT!?</div>
      );
    }
  }
}

PressList.propTypes = {
  actions: PropTypes.object,
  articleList: ImmutablePropTypes.map,
  filter: ImmutablePropTypes.map,
};

export default PressList;
