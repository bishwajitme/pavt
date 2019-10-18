import React, { Component } from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { Link } from 'react-router';
import isLinkToCurrentSite from 'utils/isLinkToCurrentSite';
import MetaIconItem from 'components/MetaIconItem/MetaIconItem';
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
    let establishment = content.get('establishment').get('name');



    if (!locations) {
      locations = location.reduce((memo, locationItem) => {
        const separator = (memo.length) ? ', ' : '';
        return `${memo}${separator}${locationItem.get('name')}`;
      }, '');
    }

    let extabClassName = 'kurs';
   if(establishment === 'Yrkeshögskoleutbildning'){
     establishment = 'Yh';
    extabClassName = 'yh'
    }



    const link = (isLinkToCurrentSite(linkUrl))
      ? <Link to={getPathFromFullUrl(linkUrl)}>{title}</Link>
      : <a href={linkUrl}>{title}</a>;

    const arrowLink = (isLinkToCurrentSite(linkUrl))
      ? (
      <Link to={getPathFromFullUrl(linkUrl)}
            className={styles.arrowLink}
            title={title}>
        {Icons.carretRight}
      </Link>
    )
      : <a href={linkUrl}
             className={styles.arrowLink}
             title={title}>
         Läs mer {Icons.carretRight}
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
        <div className={`${styles[extabClassName]}`}>{establishment}</div>
        <div className={styles.content}>
          <h1 className={styles.heading}>
            {link}
          </h1>
        </div>
        <div className={styles.meta}>
          <ul className={styles.list}>
            <MetaIconItem icon='map-marker-alt'
                      value={locations}
                      school={school}/>

            <MetaIconItem icon='clock'
                      value={deadline}
                      school={school}/>
            <MetaIconItem icon='clock'
                      value={startDate}
                      school={school}/>
            <MetaIconItem icon='lightbulb'
                      value={scope}
                      school={school}/>
            <MetaIconItem icon='laptop'
                      value={statusText}
                      school={school}/>
          </ul>
        </div>
        <div className={styles.info}>
        {arrowLink}

        </div>



      </article>
    );

  }
}

EducationCard.propTypes = {
  content: ImmutablePropTypes.map,
};

export default EducationCard;
