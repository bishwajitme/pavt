import React, { Component, PropTypes } from 'react';
import styles from './NoResults.less';

class NoResults extends Component {

  render () {
    const { heading, text } = this.props;

    return (
      <article className={styles.base}>
        {(heading) ? <h1 className={styles.heading}>{heading}</h1> : false}
        {(text) ? <p className={styles.text}>{text}</p> : false}
      </article>
    );
  }
}

NoResults.propTypes = {
  heading: PropTypes.string,
  text: PropTypes.string,
};

export default NoResults;
