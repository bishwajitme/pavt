import React, { Component, PropTypes } from 'react';
import { ShareButtons } from 'react-share';
import * as Icons from 'utils/svgIcons';
import styles from './SocialShare.less';

class SocialShare extends Component {
  render () {
    const url = window.location.href;
    const title = document.title || 'Plushögskolan';
    const { FacebookShareButton,
            LinkedinShareButton,
            TwitterShareButton,
            } = ShareButtons;

    return (
      <div className={`${styles.base} ${styles[this.props.color]}`}>
        <div className={styles.wrap}>
          <FacebookShareButton title={title} url={url} className={styles.share}>
            <div className={`${styles.icon} ${styles.facebook}`}>
              {Icons.facebook}
            </div>
          </FacebookShareButton>
          <TwitterShareButton title={title} url={url} className={styles.share}>
            <div className={`${styles.icon} ${styles.twitter}`}>
              {Icons.twitter}
            </div>
          </TwitterShareButton>
          <LinkedinShareButton title={title} url={url} className={styles.share}>
            <div className={`${styles.icon} ${styles.linkedin}`}>
              {Icons.linkedin}
            </div>
          </LinkedinShareButton>
          <div className={styles.share}>
            <a href={`mailto:?subject=${title}`}
               className={`${styles.icon} ${styles.mail}`}>
              {Icons.mail}
            </a>
          </div>
        </div>
      </div>
    );
  }
}

SocialShare.propTypes = {
  color: PropTypes.string,
};

export default SocialShare;
