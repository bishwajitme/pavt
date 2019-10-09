import React, { Component } from 'react';
import { Link } from 'react-router';
import getPathFromFullUrl from 'utils/getPathFromFullUrl';
import ImmutablePropTypes from 'react-immutable-proptypes';
import * as Icons from 'utils/svgIcons';
import styles from './InfoBlock.less';

class InfoBlock extends Component {

  render () {
    const type = this.props.content.get('type');
    const title = this.props.content.get('title');
    const excerpt = this.props.content.get('excerpt');
    const image = this.props.content.getIn(['image', 'medium']);
    const linkUrl = this.props.content.get('linkUrl');
    const color = this.props.content.get('color');

    const backgroundImage = (image) ? {
      backgroundImage: `url(${image})`,
    } : null;

    let link = '';
    let arrowLink = false;

    switch (type) {
      case 'internalLink':
        link = (
          <Link to={getPathFromFullUrl(linkUrl)}
                className={`${styles.link} ${styles.internal}`}>
            {title}
          </Link>);
        arrowLink = (
          <Link to={getPathFromFullUrl(linkUrl)}
                className={`${styles.arrowLink} ${styles.internal}`}>
            {Icons.carretRight}
          </Link>);
        break;
      case 'externalLink':
        link = (
          <a href={linkUrl}
             className={`${styles.link} ${styles.external}`}>
            {title}
          </a>);
        arrowLink = (
          <a href={linkUrl}
             className={`${styles.arrowLink} ${styles.external}`}>
            {Icons.outbound}
          </a>);
        break;
      case 'documentLink':
        link = (
          <a href={linkUrl}
             className={`${styles.link} ${styles.document}`}>
            {title}
          </a>);
        arrowLink = (
          <a href={linkUrl}
             className={`${styles.arrowLink} ${styles.document}`}>
            {Icons.download}
          </a>);
        break;
    }


    switch (type) {
      case 'internalLink':
        link = (
          <Link to={getPathFromFullUrl(linkUrl)}
                className={`${styles.link} ${styles.internal}`}>
            {title}
          </Link>);
        break;
      case 'externalLink':
        link = (
          <a href={linkUrl}
             className={`${styles.link} ${styles.external}`}>
            {title}
          </a>);
        break;
      case 'documentLink':
        link = (
          <a href={linkUrl}
             className={`${styles.link} ${styles.document}`}>
            {title}
          </a>);
        break;
    }

    return (
      <article className={`${styles.article} ${styles[color]} ${backgroundImage ? styles.bgImage : null}`} style={backgroundImage}>
        <div className={styles.content}>
          <h1>{link}</h1>
          {excerpt ? <p className={styles.text}>{excerpt}</p> : null}
        </div>
        {excerpt ? arrowLink : null}
      </article>
    );

  }
}

InfoBlock.propTypes = {
  content: ImmutablePropTypes.map,
};

export default InfoBlock;
