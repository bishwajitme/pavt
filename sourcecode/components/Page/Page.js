import { updateMeta } from 'utils/updateMeta';
import React, { Component, PropTypes } from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';
import getSlugFromPathname from 'utils/getSlugFromPathname';
import PageHero from 'components/PageHero/PageHero';
import WYSIWYGContent from 'components/WYSIWYGContent/WYSIWYGContent';
import PageDocumentLinks from 'components/PageDocumentLinks/PageDocumentLinks';
import ArticleCards from 'components/ArticleCards/ArticleCards';
import InfoBlockList from 'components/InfoBlockList/InfoBlockList';
import SubMenu from 'components/SubMenu/SubMenu';
import Page404 from 'components/Page404/Page404';
import Spinner from 'components/Spinner/Spinner';
import PageSocialShare from 'components/PageSocialShare/PageSocialShare';
import styles from './Page.less';

class Page extends Component {

  componentWillMount () {
    const slug = getSlugFromPathname(this.props.location.pathname);
    this.props.actions.fetchPageFromApi(slug);
  }
  
  componentWillUpdate (nextProps) {
    const slug = getSlugFromPathname(nextProps.location.pathname);
    this.props.actions.fetchPageFromApi(slug);
  }

  render () {
    const slug = getSlugFromPathname(this.props.location.pathname);
    const pages = this.props.pages;
    const status = pages.getIn([slug, 'status']);
    const response = pages.getIn([slug, 'response']);


    if (status === 'done' && response) {
      updateMeta(response);
      const id = response.get('id');
      const title = response.get('title');
      const subMenuPages = this.props.globals.getIn(['response', 'pages']);
      const pageHero = response.getIn(['pageHero', 'backgroundImages']);
      const wysiwygContent = response.get('wysiwygContent');
      const documentLinks = response.get('documentLinks');
      const articleCards = response.get('articleCards');
      const infoBlocks = response.get('infoBlocks');

      return (
        <div>
          {pageHero ? <PageHero backgroundImages={pageHero}/> : null}
          <div className={styles.base}>
            <header className={styles.header}>
              <h1 className={styles.heading}>{title}</h1>
            </header>

            <aside className={styles.sub}>
              <SubMenu id={id} pages={subMenuPages}/>
            </aside>
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
    } else if (status === 'error' && !response) {
      return (
        <Page404/>
      );
    } else {
      return (
        null
      );
    }
  }
}

Page.propTypes = {
  actions: PropTypes.object,
  globals: ImmutablePropTypes.map,
  location: PropTypes.object,
  pages: ImmutablePropTypes.map,
};

export default Page;
