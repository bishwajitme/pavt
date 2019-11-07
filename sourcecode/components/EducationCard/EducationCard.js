import React, { Component } from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { Link } from 'react-router';
import isLinkToCurrentSite from 'utils/isLinkToCurrentSite';
import MetaIconItem from 'components/MetaIconItem/MetaIconItem';
import * as Icons from 'utils/svgIcons';
import getPathFromFullUrl from 'utils/getPathFromFullUrl';
import styles from './EducationCard.less';

class EducationCard extends Component {

  render () {
    const content = this.props.content;
    const title = content.get('title');
    const linkUrl = content.get('linkUrl');
    const status = content.get('status');
    const startDate = content.get('startDate');
    const scope = content.get('scope');
    const school = content.get('school').charAt(0);
    const location = content.get('location');
    let locations = content.get('locationText');
    let establishment = content.get('establishment').get('name');
    const utbildningsstart = content.get('utbildningsstart').get('name');


    if (!locations) {
      locations = location.reduce((memo, locationItem) => {
        const separator = (memo.length) ? ', ' : '';
        return `${memo}${separator}${locationItem.get('name')}`;
      }, '');
    }
    let locationText = locations;
    if (location.size > 1) {
      locationText = location.size + ' orter';
    }

    let extabClassName = 'certifiering';
    let exClassName = 'ar_certi';
    if (establishment === 'Yrkeshögskoleutbildning') {
      establishment = 'Yh';
      extabClassName = 'yh';
      exClassName = 'ar_yh';
    }
    if (establishment === 'Kurs') {
      establishment = 'Kurs';
      extabClassName = 'kurs';
      exClassName = 'ar_kurs';
    }
    if (establishment === 'Certifieringsutbildning') {
      establishment = 'Cert.utbildning';
    }



    const link = (isLinkToCurrentSite(linkUrl))
      ? <Link to={getPathFromFullUrl(linkUrl)}>{title}</Link>
      : <a href={linkUrl}>{title}</a>;

    const arrowLink = (isLinkToCurrentSite(linkUrl))
      ? (
      <Link to={getPathFromFullUrl(linkUrl)}
            className={styles.arrowLink}
            title={title}>
        Läs mer {Icons.carretRight}
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
        statusText = startDate;
        break;
      case 'notSearchable':
        statusText = 'Ej sökbar -Pågående utbildning';
        break;
    }

    return (
      <article
        className={`${styles.article} ${styles[school]} ${styles[exClassName]} ${styles[status]}`}>
        <div className={`${styles[extabClassName]}`}>{establishment}</div>
        <div className={styles.content}>
          <h2 className={styles.heading}>
            {link}
          </h2>
        </div>
        <div className={styles.meta}>
          <ul className={styles.list}>
            <MetaIconItem icon='map-marker-alt'
                      value={locationText}
                      valueHover={locations}
                      school={school}/>

            <MetaIconItem icon='clock'
                      value={utbildningsstart}
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
