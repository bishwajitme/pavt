import React, { Component, PropTypes } from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';
import SiteMenuItem from 'components/SiteMenuItem/SiteMenuItem';
import styles from './SiteMenu.less';

class SiteMenu extends Component {

  render () {
    const inMenu = this.props.inMenu;
    const siteId = this.props.siteId;
    const items = this.props.sites.map(site => {
      const id = parseInt(site.get('id'));
      if ((id !== 1) && (id !== siteId)) {
        return <SiteMenuItem key={id} site={site}/>
      }

    });

    const visibility = (this.props.ui.get('showSiteMenu'))
      ? styles.visible
      : styles.hidden;

    if (inMenu) {
      return (
        <div className={`${styles.base} ${visibility}`}>
          <nav className={styles.nav}>
            {items}
          </nav>
        </div>
      );
    } else {
      return (
        <div className={`${styles.base} ${styles.visible}`}>
          <nav className={styles.nav}>
            {items}
          </nav>
        </div>
      );
    }

  }
}
;

SiteMenu.propTypes = {
  inMenu: PropTypes.bool,
  siteId: PropTypes.number,
  sites: ImmutablePropTypes.list,
  ui: ImmutablePropTypes.map,
};

export default SiteMenu;
