import React, { Component } from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { Link } from 'react-router';
import getPathFromFullUrl from 'utils/getPathFromFullUrl';
import styles from './PageMenuSearchItem.less';

class TopMenuSearch extends Component {

  render () {
    const page = this.props.page;
    const title = getPathFromFullUrl(page.get('title'));
    const url = getPathFromFullUrl(page.get('linkUrl'));

    return (
      <Link to={url}
            activeClassName={styles.active}
            className={styles.link}>
          {title}
      </Link>
    );
  }
}

TopMenuSearch.propTypes = {
  page: ImmutablePropTypes.map,
};

export default TopMenuSearch;
