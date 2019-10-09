import React, { Component, PropTypes } from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';
import PageMenuItem from 'components/PageMenuItem/PageMenuItem';
import styles from './PageMenu.less';

class PageMenu extends Component {

  render () {
    const { actions, pages } = this.props;

    const items = pages.map(page => {
      if (page.get('linkUrl').includes('/utbildningar')) {
        return false;
      } else if (page.get('parent') == 0) {
        const id = page.get('id');
        return (<PageMenuItem key={`sida-${id}`}
                             page={page}
                             onClick={actions.togglePageMenu}/>)
      }
    });

    const visibility = (this.props.ui.get('showPageMenu'))
      ? styles.visible
      : styles.hidden;

    return (
      <div className={`${styles.base} ${visibility}`}>
        <div className={styles.wrap}>
          {items ? items : false}
        </div>
      </div>
    );
  }
}
;

PageMenu.propTypes = {
  actions: PropTypes.object,
  pages: ImmutablePropTypes.list,
  ui: ImmutablePropTypes.map,
};

export default PageMenu;
