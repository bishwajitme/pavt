import React, { Component } from 'react';
import { Link } from 'react-router';
import getPathFromFullUrl from 'utils/getPathFromFullUrl';
import isLinkToCurrentSite from 'utils/isLinkToCurrentSite';
import ImmutablePropTypes from 'react-immutable-proptypes';
import * as Icons from 'utils/svgIcons';
import styles from './ArticleCard.less';
import moment from 'moment';

class ArticleCard extends Component {

  render () {
    const content = this.props.content;
    const date = moment(content.get('date')).format('DD/MM/YYYY');
    const title = content.get('title');
    const excerpt = content.get('excerpt');
    const image = content.getIn(['image', 'Article card']);
    const linkUrl = content.get('linkUrl');
    const school = content.get('school');
    const schoolStyle = (school) ? school.charAt(0) : false;
    const backgroundImage = {
      backgroundImage: `url(${image})`,
    };

    const link = (isLinkToCurrentSite(linkUrl)) ?
      <Link to={getPathFromFullUrl(linkUrl)}
            className={styles.link}>
        {title}
      </Link>
      :
      <a href={getPathFromFullUrl(linkUrl)}
             className={styles.link}>
        {title}
      </a>

    const imgLink = (isLinkToCurrentSite(linkUrl)) ?
      <Link to={getPathFromFullUrl(linkUrl)}
            className={styles.image}
            style={backgroundImage} />
      :
      <a href={getPathFromFullUrl(linkUrl)}
            className={styles.image}
            style={backgroundImage} />

    const arrowLink = (isLinkToCurrentSite(linkUrl)) ?
      (<Link to={getPathFromFullUrl(linkUrl)}
             title={title}
             className={styles.arrowLink}>
        {Icons.carretRight}
      </Link>) :
      (<a href={getPathFromFullUrl(linkUrl)}
          title={title}
          className={styles.arrowLink}>
        {Icons.carretRight}
      </a>);

    return (
      <article className={`${styles.article} ${styles[schoolStyle]}`}>
        {imgLink}
        <div className={styles.content}>
          <header className={styles.header}>
            <p className={`${styles.date} ${styles[schoolStyle]}`}>{date}</p>
            <h2 className={styles.heading}>
              {link}
            </h2>
          </header>
          <p className={styles.excerpt}>{excerpt}</p>
          {arrowLink}
        </div>
      </article>
    );
  }
}

ArticleCard.propTypes = {
  content: ImmutablePropTypes.map,
};

export default ArticleCard;
