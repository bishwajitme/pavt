import React, { Component, PropTypes } from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { Link } from 'react-router';
import getPathFromFullUrl from 'utils/getPathFromFullUrl';
import styles from './SubMenuItem.less';

class SubMenuItem extends Component {

  render () {
    const { active, level, page } = this.props;
    const title = getPathFromFullUrl(page.get('title'));
    const url = getPathFromFullUrl(page.get('linkUrl'));
    const levelStyle = `level-${level}`;
    const activeStyle = (active) ? 'current' : 'clickable';



    return (
      <Link to={url}
            className={`
            ${styles.link}
            ${styles[levelStyle]}
            ${styles[activeStyle]}`}>
        <span>{title}</span>
      </Link>
    );
  }
}

SubMenuItem.propTypes = {
  active: PropTypes.bool,
  level: PropTypes.number,
  page: ImmutablePropTypes.map,
};

export default SubMenuItem;
