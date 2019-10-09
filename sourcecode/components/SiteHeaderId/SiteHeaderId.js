import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import styles from './SiteHeaderId.less';
import config from 'webpack-config-loader!conf';

class SiteHeaderId extends Component {

  render () {
    const image = config.hostname + config.assetsPath + config.menuLogo;
    const alt = config.sitename;
    const id = this.props.id;
    return (
      <Link to='/' className={styles.link}>
        <img src={image}
             alt={alt}
             className={(id === 1) ? styles.logoPh : styles.logo}/>
      </Link>
    );
  }
}
SiteHeaderId.propTypes = {
  id: PropTypes.number,
};

export default SiteHeaderId;
