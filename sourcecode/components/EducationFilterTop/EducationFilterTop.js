import dataLayer from 'utils/dataLayer';
import React, { Component, PropTypes } from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';
import SelectBox from 'components/Form/CheckBoxesTop';
import styles from './EducationFilterTop.less';

const handlers = (comp) => {
  return {
    setFilter: (e, singular) => {

    },
    applyFilter: () => {
      const gaData = {
        event: 'search:educations',
      };

      comp.props.filter.getIn(['education', 'temp']).map((val, key) => {
        const slug = val.get('slug');
        if (slug) {
          gaData[`search-${key}`] = slug;
        }
      });

      dataLayer.push(gaData);

      comp.props.actions.setEducationListFilter();
    },
    onBlur: () => {

    },
  }
};

class EducationFilterTop extends Component {

  constructor (props) {
    super(props);
    this.handlers = handlers(this);
  }

  componentWillMount () {
    this.props.actions.fetchSearchDataFromApi();
  }

  render () {
    const { actions, filter, search, ui } = this.props;
    const status = search.get('status');
    const handlers = this.handlers;

    if (status === 'error') {
      return false;
    } else {


      return (
        <section className={styles.section}>
          <div className={styles.wrap}>

            <SelectBox
              actions={actions}
              filter={filter}
              onSelect={handlers.setFilter}

              search={search}
              type={{
                singular: 'subject',
                plural: 'subjects',
                label: 'ämnen',
              }}
              ui={ui}/>
          </div>
        </section>
      );
    }
  }
}

EducationFilterTop.propTypes = {
  actions: PropTypes.object,
  ctaTitle: PropTypes.string,
  filter: ImmutablePropTypes.map,
  location: PropTypes.object,
  search: ImmutablePropTypes.map,
  ui: ImmutablePropTypes.map,
};

export default EducationFilterTop;
