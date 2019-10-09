import React, { Component } from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';
import getPathFromFullUrl from 'utils/getPathFromFullUrl';
import HTMLContent from 'components/HTMLContent/HTMLContent';
import styles from './SiteMenuItem.less';

class SiteMenuItem extends Component {

  render () {
    const site = this.props.site;
    const school = `site-${site.get('id')}`;
    const image = site.getIn(['image', 'Article card']);
    const description = site.get('description');
    const logo = site.getIn(['logo', 'large']);
    const logoAlt = site.getIn(['logo', 'alt']);
    const url = getPathFromFullUrl(site.get('url'));
    const style = {
      backgroundImage: `url(${image})`,
    };
    
    return (
      <article className={styles.article} style={style}>
        <a href={url} className={`${styles.link} ${styles[school]}`}>
          <span className={styles.wrap}>
            <span className={styles.logo}>
              <img src={logo} alt={logoAlt}/>
            </span>
            <HTMLContent className={styles.description} content={description}/>
          </span>
        </a>
      </article>
    );
  }
}

SiteMenuItem.propTypes = {
  site: ImmutablePropTypes.map,
};

export default SiteMenuItem;
