import React, { Component, PropTypes } from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';
import Immutable from 'immutable';
import EducationListSchoolGroup
  from 'components/EducationListSchoolGroup/EducationListSchoolGroup';
import * as fE from 'utils/filterEducations';
import Spinner from 'components/Spinner/Spinner';
import styles from './NotSearchableEducationList.less';

class NotSearchableEducationList extends Component {

  componentDidMount () {
    this.props.actions.fetchEducationListFromApi(Immutable.fromJS({}));
  }

  render () {
    const { educationList, globals } = this.props;
    const status = educationList.get('status');
    const response = educationList.get('response');

    if (status === 'done' && response.size) {
      const filtered = fE.keepOnlyNotSearchableEducations(response);
      const groupedBySchool = fE.groupEducationsBySchool(filtered);
      const orderedBySchool = fE.orderEducationGroupsBySchool(
        groupedBySchool);
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
            {groupedComponents}
          </section>
        );
      } else {
        return false;
      }
    } else if (status === 'fetching') {
      return (
        <section className={styles.loader}>
          <Spinner/>
        </section>
      );
    } else if (status === 'error' || !response.size) {
      return false;
    } else {
      return false;
    }
  }
}

NotSearchableEducationList.propTypes = {
  actions: PropTypes.object,
  educationList: ImmutablePropTypes.map,
  globals: ImmutablePropTypes.map,
};

export default NotSearchableEducationList;
