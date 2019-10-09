import React, { Component, PropTypes } from 'react';
import createMarkup from 'utils/createMarkup';
import wrapVideo from 'utils/wrapVideo';
import styles from './WYSIWYGContent.less';

class WYSIWYGContent extends Component {
  render () {
    let content = this.props.content;
    content = wrapVideo(content);
    content = createMarkup(content);

    return (
      <div className={styles.content} dangerouslySetInnerHTML={content}></div>
    );
  }
}

WYSIWYGContent.propTypes = {
  content: PropTypes.string,
};

export default WYSIWYGContent;
