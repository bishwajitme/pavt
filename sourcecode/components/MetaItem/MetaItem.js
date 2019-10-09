import React, { Component, PropTypes } from 'react';
import styles from './MetaItem.less';

class MetaItem extends Component {

  render () {
    const { school, heading, value } = this.props;

    if (value) {
      return (
        <li className={`${styles.item} ${styles[school]}`} >
          <span className={styles.heading}>{heading}: </span>
          <span className={styles.value}>{value}</span>
        </li>
      );
    }  else {
      return null;
    }
  }
}

MetaItem.propTypes = {
  heading: PropTypes.string,
  school: PropTypes.string,
  value: PropTypes.string,
};

export default MetaItem;
