import { updateMeta } from 'utils/updateMeta';
import React, { Component, PropTypes } from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';
import getSlugFromPathname from 'utils/getSlugFromPathname';
import PageHero from 'components/PageHero/PageHero';
import WYSIWYGContent from 'components/WYSIWYGContent/WYSIWYGContent';
import PressFilter from 'components/PressFilter/PressFilter';
import PressMoreButton from 'components/PressMoreButton/PressMoreButton';
import PressList from 'components/PressList/PressList';
import Page404 from 'components/Page404/Page404';
import Spinner from 'components/Spinner/Spinner';
import styles from './PressPage.less';

class PressPage extends Component {

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
      const pageHero = response.getIn(['pageHero', 'backgroundImages']);
      const wysiwygContent = response.get('wysiwygContent');

      return (
        <div>
          {pageHero ? <PageHero backgroundImages={pageHero}/> : null}
          {wysiwygContent ?
            <section className={styles.content}>
              <div className={styles.wrap}>
                <WYSIWYGContent content={wysiwygContent}/>
              </div>
            </section>
            : null}
          <div className={styles.pressFilter}>
            <PressFilter actions={this.props.actions}
                         filter={this.props.filter}/>
          </div>
          <div className={styles.pressList}>
            <PressList actions={this.props.actions}
                       articleList={this.props.articleList}
                       filter={this.props.filter}/>
            <PressMoreButton actions={this.props.actions}
                             filter={this.props.filter}/>
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
      return null;
    }
  }
}

PressPage.propTypes = {
  actions: PropTypes.object,
  articleList: ImmutablePropTypes.map,
  filter: ImmutablePropTypes.map,
  location: PropTypes.object,
  pages: ImmutablePropTypes.map,
};

export default PressPage;
