import React, { Component, PropTypes } from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';
import EducationCard from 'components/EducationCard/EducationCard';
import styles from './EducationListSubjectGroup.less';

class EducationListSubjectGroup extends Component {

  render () {
    const { group } = this.props;


    const educations = group.map(education => {
      const key = education.get('slug');
      return (
        <EducationCard key={key} content={education}/>
      )
    }).toArray();

    return (
      <section className={styles.section}>

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
