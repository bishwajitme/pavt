import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import styles from './SiteFooterId.less';
import config from 'webpack-config-loader!conf';

class SiteFooterId extends Component {

  render () {
    const image = config.hostname + config.assetsPath + config.footerLogo;
    const alt = config.sitename;

    return (
      <Link to='/' className={styles.link}>
        <img src={image}
             alt={alt}
             className={(this.props.id === 1) ? styles.logoPh : styles.logo}/>
      </Link>
    );
  }
}

SiteFooterId.propTypes = {
  id: PropTypes.number,
};

export default SiteFooterId;
