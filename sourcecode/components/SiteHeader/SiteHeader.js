import React, { Component, PropTypes } from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';
import SiteHeaderId from 'components/SiteHeaderId/SiteHeaderId';
import PageMenuSearchItem
  from 'components/PageMenuSearchItem/PageMenuSearchItem';
//import SiteMenuToggle from 'components/SiteMenuToggle/SiteMenuToggle';
import PageMenuToggle from 'components/PageMenuToggle/PageMenuToggle';
import PageMenu from 'components/PageMenu/PageMenu';
import SiteMenu from 'components/SiteMenu/SiteMenu';
import styles from './SiteHeader.less';

class SiteHeader extends Component {

  render () {
    const { actions, globals, ui } = this.props;
    const sites = globals.get('sites');
    const siteId = globals.get('site_id')
    const pages = globals.get('pages');
    const education = pages.find(page => {
      const linkUrl = page.get('linkUrl');
      return linkUrl.includes('/utbildningar') ? true : false
    });

    return (
      <header className={styles.header}>
        <div className={styles.main}>
          <div className={styles.wrap}>
            <div className={styles.id}>
              <SiteHeaderId id={siteId} />
            </div>
            <div className={styles.pagesToggle}>
              <PageMenuToggle ui={ui} actions={actions}/>
            </div>
            <nav className={styles.nav}>
              <div className={styles.search}>
                {education ? <PageMenuSearchItem page={education}/> : false}
              </div>
              <div className={styles.pages}>
                <PageMenu pages={pages} ui={ui} actions={actions}/>
              </div>
              {/* <div className={styles.sitesToggle}>
              <SiteMenuToggle ui={ui} actions={actions}/>
             </div> deliberately disabled as requested */}
            </nav>
          </div>
        </div>
        <div className={styles.sites}>
          <div className={styles.wrap}>
            <SiteMenu siteId={siteId} inMenu={true} sites={sites} ui={ui}/>
          </div>
        </div>
      </header>
    );
  }
}

SiteHeader.propTypes = {
  actions: PropTypes.object,
  globals: ImmutablePropTypes.map,
  ui: ImmutablePropTypes.map,
};

export default SiteHeader;
