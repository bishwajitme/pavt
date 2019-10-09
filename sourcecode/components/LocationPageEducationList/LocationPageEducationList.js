import React, { Component, PropTypes } from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';
import Immutable from 'immutable';
import EducationListSchoolGroup
  from 'components/EducationListSchoolGroup/EducationListSchoolGroup';
import * as fE from 'utils/filterEducations';
import Spinner from 'components/Spinner/Spinner';
import styles from './LocationPageEducationList.less';

class EducationSearchList extends Component {

  componentDidMount () {
    const query = this.props.query;
    this.props.actions.fetchEducationListFromApi(query);
  }

  render () {
    const { globals, educationList, notSearchable, query } = this.props;
    const status = educationList.get('status');
    const response = educationList.get('response');

    if (status === 'done' || response.size) {
      const filteredNotSearchable = (notSearchable)
        ? fE.keepOnlyNotSearchableEducations(response)
        : fE.filterOutNotSearchableEducations(response);
      const filtered = fE.filterEducationsThroughQuery(
        query, filteredNotSearchable);
      const groupedBySchool = fE.groupEducationsBySchool(filtered);
      const orderedBySchool = fE.orderEducationGroupsBySchool(groupedBySchool);

      const groupedComponents = orderedBySchool.map((group, name) => {
        const school = (orderedBySchool.size > 1)
          ? globals.getIn(['response', 'sites'])
          .find(item => item.get('name') === name)
          : Immutable.fromJS({});

        return (<EducationListSchoolGroup key={name}
                                          group={group}
                                          school={school}/>)
      }).toList();

      if (groupedComponents.size) {
        return (
          <section className={styles.section}>
            <h1 className={styles.heading}>{this.props.heading}</h1>
            {groupedComponents}
          </section>
        );
      } else {
        return false;
      }
    } else if (status === 'fetching') {
      return (
        <Spinner/>
      );
    } else if (status === 'error' || !response.size) {
      return false;
    } else {
      return false;
    }
  }
}

EducationSearchList.propTypes = {
  actions: PropTypes.object,
  educationList: ImmutablePropTypes.map,
  globals: ImmutablePropTypes.map,
  heading: PropTypes.string,
  notSearchable: PropTypes.bool,
  query: ImmutablePropTypes.map,
};

export default EducationSearchList;
