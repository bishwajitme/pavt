import React, { Component, PropTypes } from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';
import * as Icons from 'utils/svgIcons';
import styles from './SiteMenuToggle.less';

class SiteMenuToggle extends Component {

  render () {
    const { actions, ui } = this.props;
    const active = (ui.get('showSiteMenu'))
      ? 'active'
      : '';

    return (
      <span className={`${styles.link} ${styles[active]}`}
            onClick={actions.toggleSiteMenu}>
          Våra skolor
          {Icons.carretDown}
      </span>
    );
  }
}

SiteMenuToggle.propTypes = {
  actions: PropTypes.object,
  ui: ImmutablePropTypes.map,
};

export default SiteMenuToggle;
