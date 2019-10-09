import React, { Component, PropTypes } from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';
import EducationCard from 'components/EducationCard/EducationCard';
import styles from './EducationListGroup.less';

class EducationGroup extends Component {

  render () {
    const { heading, group, size } = this.props;

    const unit = (size > 1) ? 'utbildningar' : 'utbildning';

    const educations = group.map(education => {
      const key = education.get('id');
      return (
        <EducationCard key={key} content={education}/>
      )
    }).toArray();

    return (
      <section className={styles.section}>
        <h1 className={styles.heading}>
          <span className={styles.name}>{heading}</span>
          <span className={styles.size}>{size} {unit}</span>
        </h1>

        {educations}
      </section>
    );

  }
}

EducationGroup.propTypes = {
  group: ImmutablePropTypes.map,
  heading: PropTypes.string,
  school: PropTypes.string,
  size: PropTypes.number,
};

export default EducationGroup;
