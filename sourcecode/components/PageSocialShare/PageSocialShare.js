import React, { Component } from 'react';
import SocialShare from 'components/SocialShare/SocialShare';
import styles from './PageSocialShare.less';

class PageSocialShare extends Component {
  render () {
    return (
      <div className={styles.base}>
        <p className={styles.text}>Dela sidan:</p>
        <div className={styles.wrap}>
          <SocialShare color='primary'/>
        </div>
      </div>
    );
  }
}

export default PageSocialShare;
