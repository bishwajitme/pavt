import React, { Component, PropTypes } from 'react';
import ArticleCard from 'components/ArticleCard/ArticleCard';
import ImmutablePropTypes from 'react-immutable-proptypes';
import styles from './ArticleCards.less';

class ArticleCards extends Component {

  render () {
    const { articles, context, heading } = this.props;

    if (!articles) return false;

    const articleCards = articles
      //.sortBy(articleItem => articleItem.get('title'))
      .map(articleItem => {
        const key = articleItem.get('slug') || articleItem.get('title');
        return (<ArticleCard key={key} content={articleItem}/>);
      });

    return (
      <section className={`${styles.section} ${context}`}>
        {heading ? <h1 className={styles.heading}>{heading}</h1> : false}
        <div className={styles.wrap}>
          {articleCards ? articleCards : false}
        </div>
      </section>
    );
  }
}

ArticleCards.propTypes = {
  articles: ImmutablePropTypes.list,
  context: PropTypes.string,
  heading: PropTypes.string,
};

export default ArticleCards;
