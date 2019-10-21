import React, { Component, PropTypes } from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';
import Immutable from 'immutable';
import EducationListSchoolGroup
  from 'components/EducationListSchoolGroup/EducationListSchoolGroup';
import EducationListNoResult
  from 'components/EducationListNoResult/EducationListNoResult';
import * as fE from 'utils/filterEducations';
import Spinner from 'components/Spinner/Spinner';
import styles from './SearchPageEducationList.less';

class SearchPageEducationList extends Component {

  componentDidMount () {
    const query = this.props.filter.getIn(['education', 'active']);
    this.props.actions.fetchEducationListFromApi(query);
  }

  componentWillUpdate (nextProps) {
    const query = this.props.filter.getIn(['education', 'active']);
    const nextQuery = nextProps.filter.getIn(['education', 'active']);
    if (!Immutable.is(query, nextQuery)) {
      nextProps.actions.fetchEducationListFromApi(nextQuery);
    }
  }

  render () {
    const { educationList, filter, globals } = this.props;
    const status = educationList.get('status');
    const response = educationList.get('response');
    const query = filter.getIn(['education', 'active']);
  console.log('query '+ query);
    if (status === 'done' && response.size) {
      const filteredNotSearchable = fE.filterOutNotSearchableEducations(
        response);
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
            {groupedComponents}
          </section>
        );
      } else {
        return (
          <section>
            <EducationListNoResult actions={this.props.actions}
                                   query={query}/>
          </section>
        );
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

SearchPageEducationList.propTypes = {
  actions: PropTypes.object,
  educationList: ImmutablePropTypes.map,
  filter: ImmutablePropTypes.map,
  globals: ImmutablePropTypes.map,
};

export default SearchPageEducationList;
