import React, { Component } from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { Link } from 'react-router';
import isLinkToCurrentSite from 'utils/isLinkToCurrentSite';
import MetaItem from 'components/MetaItem/MetaItem';
import HTMLContent from 'components/HTMLContent/HTMLContent';
import * as Icons from 'utils/svgIcons';
import getPathFromFullUrl from 'utils/getPathFromFullUrl';
import styles from './EducationCard.less';

class EducationCard extends Component {

  render () {
    const content = this.props.content;
    const title = content.get('title');
    const excerpt = content.get('excerpt');
    const linkUrl = content.get('linkUrl');
    const status = content.get('status');
    const deadline = content.get('deadline');
    const startDate = content.get('startDate');
    const scope = content.get('scope');
    const points = content.get('points');
    const vacancies = content.get('vacancies');
    const school = content.get('school').charAt(0);
    const location = content.get('location');
    let locations = content.get('locationText');
    
    if (!locations) {
      locations = location.reduce((memo, locationItem) => {
        const separator = (memo.length) ? ', ' : '';
        return `${memo}${separator}${locationItem.get('name')}`;
      }, '');
    }

    const link = (isLinkToCurrentSite(linkUrl))
      ? <Link to={getPathFromFullUrl(linkUrl)}>{title}</Link>
      : <a href={linkUrl}>{title}</a>;

    const arrowLink = (isLinkToCurrentSite(linkUrl))
      ? (
      <Link to={getPathFromFullUrl(linkUrl)}
            className={styles.arrow}
            title={title}>
        {Icons.linkArrowRight}
      </Link>
    )
      : <a href={linkUrl}
           className={styles.arrow}
           title={title}>
      {Icons.linkArrowRight}
    </a>;


    let statusText = '';
    switch (status) {
      case 'open':
        statusText = 'Öppen för ansökan';
        break;
      case 'closed':
        statusText = 'Stängd för ansökan';
        break;
      case 'notSearchable':
        statusText = 'Ej sökbar -Pågående utbildning';
        break;
    }

    return (
      <article
        className={`${styles.article} ${styles[school]} ${styles[status]}`}>
        <div className={styles.content}>
          <h1 className={styles.heading}>
            {link}
          </h1>
          {excerpt ? <HTMLContent className={styles.text}
                                  content={excerpt}/> : null}
        </div>
        <div className={styles.meta}>
          <ul className={styles.list}>
            <MetaItem heading='Studieorter'
                      value={locations}
                      school={school}/>
            <MetaItem heading='Sista ansökningsdag'
                      value={deadline}
                      school={school}/>
            <MetaItem heading='Utbildningsstart'
                      value={startDate}
                      school={school}/>
            <MetaItem heading='Omfattning'
                      value={scope}
                      school={school}/>
            <MetaItem heading='Poäng'
                      value={points}
                      school={school}/>
            <MetaItem heading='Antal platser'
                      value={vacancies}
                      school={school}/>
          </ul>
        </div>
        <div className={styles.info}>
          {arrowLink}
          <p className={styles.status}>{statusText}</p>
        </div>
      </article>
    );

  }
}

EducationCard.propTypes = {
  content: ImmutablePropTypes.map,
};

export default EducationCard;
