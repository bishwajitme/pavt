import React, { Component, PropTypes } from 'react';
import styles from './TabTitle.less';

class TabTitle extends Component {

  render () {
    const { active, onClick, tab, title } = this.props;

    const activeClass = active ? 'active' : 'inactive';

    return (
      <li className={`${styles.item} ${styles[activeClass]}`}
          data-tab={tab}
          onClick={onClick}>
        {title}
      </li>
    );
  }
}

TabTitle.propTypes = {
  active: PropTypes.bool,
  onClick: PropTypes.func,
  tab: PropTypes.number,
  title: PropTypes.string,
};

export default TabTitle;
