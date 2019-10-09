import {updateMeta} from 'utils/updateMeta';
import React, {Component, PropTypes} from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';
import getSlugFromPathname from 'utils/getSlugFromPathname';
import PageHero from 'components/PageHero/PageHero';
import Page404 from 'components/Page404/Page404';
import Spinner from 'components/Spinner/Spinner';
import styles from './CustomHtmlPage.less';

class CustomHtmlPage extends Component {

  componentWillMount() {
    const slug = getSlugFromPathname(this.props.location.pathname);
    this.props.actions.fetchPageFromApi(slug);
  }

  componentWillUpdate(nextProps) {
    const slug = getSlugFromPathname(nextProps.location.pathname);
    this.props.actions.fetchPageFromApi(slug);
  }

  render() {
    const slug = getSlugFromPathname(this.props.location.pathname);
    const pages = this.props.pages;
    const status = pages.getIn([slug, 'status']);
    const response = pages.getIn([slug, 'response']);

    if (status === 'done' && response) {

      const title = response.get('title');
      const pageHero = response.getIn(['pageHero', 'backgroundImages']);
      let wysiwygContent = response.get('wysiwygContent');
      wysiwygContent = (wysiwygContent.split('<p>')[1]).split('</p>')[0];

      //handle wordpress #038
      wysiwygContent = wysiwygContent.replace(/&#038;/g, '&');

      const xhr = new XMLHttpRequest();
      xhr.open('GET', wysiwygContent);
      xhr.onload = function() {
        if (xhr.status === 200) {
          const func = new Function(xhr.responseText);
          return func();
        }
      };
      xhr.send();

      updateMeta(response);

      return (
        <div>
          {pageHero ? <PageHero backgroundImages={pageHero}/> : null}
          <header className={styles.header}>
            <h1 className={styles.heading}>{title}</h1>
          </header>
          {wysiwygContent ?
            <section className={styles.content}>
              <div className={styles.wrap}>
                <div id='workbuster_container'></div>
              </div>
            </section>
            : null}
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
      return null;
    }
  }
}

CustomHtmlPage.propTypes = {
  actions: PropTypes.object,
  articleList: ImmutablePropTypes.map,
  filter: ImmutablePropTypes.map,
  location: PropTypes.object,
  pages: ImmutablePropTypes.map,
};

export default CustomHtmlPage;
