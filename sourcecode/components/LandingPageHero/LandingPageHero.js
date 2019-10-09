import React, { Component, PropTypes } from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';
import styles from './LandingPageHero.less';
import config from 'webpack-config-loader!conf';

class LandingPageHero extends Component {
  render () {
    const name = this.props.siteInfo.get('name');
    const backgroundImage = {
      backgroundImage: `url(${this.props.backgroundImage.get('large')})`,
    };
    const image = config.hostname + config.assetsPath + config.headerLogo;
    const id = this.props.id;

    return (
      <section className={styles.section}
               style={backgroundImage ? backgroundImage : {}}>
        <div className={styles.well}>
          {image && name ? <img className={(id === 1) ? styles.imgPh : styles.img} src={image} alt={name} /> : null }
        </div>
      </section>
    );
  }
}

LandingPageHero.propTypes = {
  backgroundImage: ImmutablePropTypes.map,
  id: PropTypes.number,
  siteInfo: ImmutablePropTypes.map,
};

export default LandingPageHero;
