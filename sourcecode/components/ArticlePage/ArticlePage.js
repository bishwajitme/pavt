import { updateMeta } from 'utils/updateMeta';
import React, { Component, PropTypes } from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';
import getSlugFromPathname from 'utils/getSlugFromPathname';
import PageHero from 'components/PageHero/PageHero';
import WYSIWYGContent from 'components/WYSIWYGContent/WYSIWYGContent';
import PageDocumentLinks from 'components/PageDocumentLinks/PageDocumentLinks';
import ArticleCards from 'components/ArticleCards/ArticleCards';
import InfoBlockList from 'components/InfoBlockList/InfoBlockList';
import PageSocialShare from 'components/PageSocialShare/PageSocialShare';
import Page404 from 'components/Page404/Page404';
import Spinner from 'components/Spinner/Spinner';
import styles from './ArticlePage.less';

class ArticlePage extends Component {

  componentWillMount () {
    const slug = getSlugFromPathname(this.props.location.pathname);
    this.props.actions.fetchArticleFromApi(slug);
  }

  componentWillUpdate (nextProps) {
    const slug = getSlugFromPathname(nextProps.location.pathname);
    this.props.actions.fetchArticleFromApi(slug);
  }

  render () {
    const slug = getSlugFromPathname(this.props.location.pathname);
    const articles = this.props.articles;
    const status = articles.getIn([slug, 'status']);
    const response = articles.getIn([slug, 'response']);

    if (status === 'done' && response) {
      updateMeta(response);
      const title = response.get('title');
      const pageHero = response.getIn(['pageHero', 'backgroundImages']);
      const wysiwygContent = response.get('wysiwygContent');
      const documentLinks = response.get('documentLinks');
      const articleCards = response.getIn(['sidebar', 'articleCards']);
      const infoBlocks = response.getIn(['sidebar', 'infoBlocks']);

      return (
        <div>
          {pageHero ? <PageHero backgroundImages={pageHero}/> : null}
          <div className={styles.base}>
            <header className={styles.header}>
              <h1 className={styles.heading}>{title}</h1>
            </header>
            <section className={styles.main}>
              {wysiwygContent
                ? <WYSIWYGContent content={wysiwygContent}/>
                : null}
              {documentLinks
                ? <PageDocumentLinks links={documentLinks}/>
                : null}
            </section>
            <aside className={styles.aside}>
              {articleCards ? <ArticleCards context='single-aside'
                                            articles={articleCards}/> : null}
              {infoBlocks ? <InfoBlockList context='single-aside'
                                           blocks={infoBlocks} /> : null}
              <PageSocialShare />
            </aside>
          </div>
        </div>
      );
    } else if (status === 'fetching') {
      return (
        <Spinner/>
      );
    } else if (status === 'error') {
      return (
        <Page404/>
      );
    } else {
      return false;
    }
  }
}

ArticlePage.propTypes = {
  actions: PropTypes.object,
  articles: ImmutablePropTypes.map,
  location: PropTypes.object,
  'location.pathname': PropTypes.string,
  state: PropTypes.object,
};

export default ArticlePage;
