import React, { Component, PropTypes } from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { Link } from 'react-router';
import getPathFromFullUrl from 'utils/getPathFromFullUrl';
import styles from './PageMenuItem.less';

class TopMenuItem extends Component {

  render () {
    const { onClick, page } = this.props;
    const title = getPathFromFullUrl(page.get('title'));
    const url = getPathFromFullUrl(page.get('linkUrl'));

    return (
      <Link to={url}
            activeClassName={styles.active}
            className={styles.link}
            onClick={onClick}>
        <span activeClassName={styles.active}>{title}</span>
      </Link>
    );
  }
}

TopMenuItem.propTypes = {
  onClick: PropTypes.func,
  page: ImmutablePropTypes.map,
};

export default TopMenuItem;
