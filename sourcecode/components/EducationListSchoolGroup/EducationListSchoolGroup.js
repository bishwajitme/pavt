import React, { Component } from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';
import isLinkToCurrentSite from 'utils/isLinkToCurrentSite';
import styles from './EducationListSchoolGroup.less';
import EducationCard from 'components/EducationCard/EducationCard';


class EducationListSchoolGroup extends Component {

  render () {
    const { group, school } = this.props;

    const educations = group.map(education => {
      const key = education.get('slug');
      return (
        <EducationCard key={key} content={education}/>
      )
    }).toArray();



    let link = '';
    if (school.size) {
      const src = school.getIn(['logo', 'large']);
      const name = school.get('name');
      const schoolStyle = school.get('name').charAt(0);
      const url = school.get('url');

      if (isLinkToCurrentSite(url)) {
        link = (
          <div
            className={`${styles.heading} ${styles[schoolStyle]}`}>
            <img src={src}
                 alt={name}
                 className={styles.name}/>
          </div>);
      } else {
        link = (
          <a href={url}
             className={`${styles.heading} ${styles[schoolStyle]}`}
             title={name}>
            <img src={src}
                 alt={name}
                 className={styles.name}/>
          </a>);
      }
    }

    return (
      <section className={styles.section}>
        {link}
          {educations}
      </section>
    );

  }
}

EducationListSchoolGroup.propTypes = {
  group: ImmutablePropTypes.map,
  school: ImmutablePropTypes.map,
};

export default EducationListSchoolGroup;
