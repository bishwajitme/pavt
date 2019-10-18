import React, { Component, PropTypes } from 'react';
import { library } from '@fortawesome/fontawesome-svg-core';
import {  faClock, faLightbulb, faMapMarkerAlt, faLaptop } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import styles from './MetaIconItem.less';
library.add(

  faClock,
  faLightbulb,
  faMapMarkerAlt,
  faLaptop
)
class MetaIconItem extends Component {

  render () {
    const { school, icon, value } = this.props;

    if (value) {
      return (
        <li className={`${styles.item} ${styles[school]}`} >
        <span className={styles.pfaicon}>  <FontAwesomeIcon icon={icon} /></span>
          <span className={styles.value}>{value}</span>
        </li>
      );
    }  else {
      return null;
    }
  }
}

MetaIconItem.propTypes = {
  icon: PropTypes.string,
  school: PropTypes.string,
  value: PropTypes.string,
};

export default MetaIconItem;
