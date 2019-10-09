import React, { Component, PropTypes } from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';
import styles from './Page404.less';

class Page404 extends Component {

  componentWillMount () {

  }

  render () {


    return (
      <article className={styles.base}>
        <h1 className={styles.heading}>404</h1>
        <p className={styles.text}>
          Sidan du försökte nå kunde inte hittas.
        </p>
      </article>
    );
  }
}

Page404.propTypes = {
  actions: PropTypes.object,
  globals: ImmutablePropTypes.map,
  location: PropTypes.object,
  pages: ImmutablePropTypes.map,
};

export default Page404;
