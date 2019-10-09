import { updateMeta } from 'utils/updateMeta';
import React, { Component, PropTypes } from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';
import getSlugFromPathname from 'utils/getSlugFromPathname';
import WYSIWYGContent from 'components/WYSIWYGContent/WYSIWYGContent';
import NotSearchableEducationList
  from 'components/NotSearchableEducationList/NotSearchableEducationList';
import Page404 from 'components/Page404/Page404';
import Spinner from 'components/Spinner/Spinner';
import styles from './NotSearchablePage.less';

class NotSearchablePage extends Component {

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
      const wysiwygContent = response.get('wysiwygContent');
      return (
        <div>
          {wysiwygContent ?
            <section className={styles.content}>
              <div className={styles.wrap}>
                <WYSIWYGContent content={wysiwygContent}/>
              </div>
            </section>
            : null}
          <div>
            <NotSearchableEducationList actions={this.props.actions}
                                        educationList={this.props.educationList}
                                        globals={this.props.globals}/>
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
      return <Spinner/>;
    }
  }
}

NotSearchablePage.propTypes = {
  actions: PropTypes.object,
  educationList: ImmutablePropTypes.map,
  globals: ImmutablePropTypes.map,
  location: PropTypes.object,
  pages: ImmutablePropTypes.map,
};

export default NotSearchablePage;
