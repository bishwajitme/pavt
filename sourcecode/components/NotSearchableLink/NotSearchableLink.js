import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import styles from './NotSearchableLink.less';
import * as Icons from 'utils/svgIcons';

class NotSearchableLink extends Component {

  render () {

    return (
      <section className={styles.base}>
        <div className={styles.wrap}>
          <h1 className={styles.heading}>Ej sökbara utbildningar</h1>
          <p className={styles.text}>
            Går du redan en av våra utbildningar?
            Här finns information om ej sökbara utbildningar.
          </p>
          <Link to={'/ej-sokbara'} className={styles.link}>
            Läs mer {Icons.carretRight}
          </Link>
        </div>
      </section>
    );
  }
}

NotSearchableLink.propTypes = {
  active: PropTypes.bool,
  onClick: PropTypes.func,
  tab: PropTypes.number,
  title: PropTypes.string,
};

export default NotSearchableLink;
