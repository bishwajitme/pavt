import React, { Component, PropTypes } from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';
import styles from './PageMenuToggle.less';

class PageMenuToggle extends Component {

  render () {
    const { actions, ui } = this.props;
    const active = (ui.get('showPageMenu'))
      ? 'active'
      : '';

    return (
      <span className={`${styles.link} ${styles[active]}`}
            onClick={actions.togglePageMenu}>
        <span></span>
      </span>
    );
  }
}

PageMenuToggle.propTypes = {
  actions: PropTypes.object,
  ui: ImmutablePropTypes.map,
};

export default PageMenuToggle;
