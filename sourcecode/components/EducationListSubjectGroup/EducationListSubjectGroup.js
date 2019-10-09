import React, { Component, PropTypes } from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';
import EducationCard from 'components/EducationCard/EducationCard';
import styles from './EducationListSubjectGroup.less';

class EducationListSubjectGroup extends Component {

  render () {
    const { heading, group } = this.props;

    const size = group.size;
    const unit = (size > 1) ? 'utbildningar' : 'utbildning';

    const educations = group.map(education => {
      const key = education.get('slug');
      return (
        <EducationCard key={key} content={education}/>
      )
    }).toArray();

    return (
      <section className={styles.section}>
        <h1 className={styles.heading}>
          <span className={styles.name}>{heading.get('name')}</span>
          <span className={styles.size}>{size} {unit}</span>
        </h1>

        {educations}
      </section>
    );

  }
}

EducationListSubjectGroup.propTypes = {
  group: ImmutablePropTypes.map,
  heading: PropTypes.object,
};

export default EducationListSubjectGroup;
