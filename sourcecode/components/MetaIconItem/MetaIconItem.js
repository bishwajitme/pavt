import React, { Component, PropTypes } from 'react';
import { library } from '@fortawesome/fontawesome-svg-core';
import {  faMapMarkerAlt, faLaptop } from '@fortawesome/free-solid-svg-icons';
import { faClock, faLightbulb } from '@fortawesome/free-regular-svg-icons';
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
    const { school, icon, value, valueHover  } = this.props;
    const faIcon = [];


    if (icon==='clock' || icon==='lightbulb') {
      faIcon.push('far');
    } else {
      faIcon.push('fas');
    }
    faIcon.push(icon);

    if (value) {
      return (
        <li className={`${styles.item} ${styles[school]}`} >
        <span className={styles.pfaicon}>  <FontAwesomeIcon icon={faIcon} /></span>
          <span className={styles.value} title={valueHover}>{value}</span>
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
  valueHover: PropTypes.string,
};

export default MetaIconItem;
