import dataLayer from 'utils/dataLayer';
import React, { Component, PropTypes } from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';
import Immutable from 'immutable';
import SelectBox from 'components/Form/CheckBoxes';
import { Link } from 'react-router';
import styles from './EducationFilter.less';

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

class EducationFilter extends Component {

  constructor (props) {
    super(props);
    this.handlers = handlers(this);
  }

  componentWillMount () {
    this.props.actions.fetchSearchDataFromApi();
  }

  render () {
    const { actions, filter, search, ctaTitle, ui } = this.props;
    const status = search.get('status');
    const handlers = this.handlers;

    if (status === 'error') {
      return false;
    } else {

      const tempFilter = filter.getIn(['education', 'temp']);
      const activeFilter = filter.getIn(['education', 'active']);
      const changeStyle = (Immutable.is(tempFilter, activeFilter))
        ? ''
        : 'hasChange';
      return (
        <section className={styles.section}>
          <div className={styles.wrap}>
          
          <h4 className={styles.select_title}>Utbildningstyp</h4>
            <SelectBox
              actions={actions}
              filter={filter}
              onSelect={handlers.setFilter}
              search={search}
              type={{
                singular: 'establishment',
                plural: 'establishments',
                label: 'utbildningstyper',
              }}
              ui={ui}/>
              <h4 className={styles.select_title}>studieort</h4>
            <SelectBox
              actions={actions}
              filter={filter}
              onSelect={handlers.setFilter}
              search={search}
              type={{
                singular: 'location',
                plural: 'locations',
                label: 'studieorter',
              }}
              ui={ui}/>
              <h4 className={styles.select_title}>Studietakt</h4>
              <SelectBox
                actions={actions}
                filter={filter}
                onSelect={handlers.setFilter}
                search={search}
                type={{
                  singular: 'studietakt',
                  plural: 'studietakts',
                  label: 'Studietakt',
                }}
                ui={ui}/>

            <div className={`${styles.apply} ${styles[changeStyle]}`}>
              {(window.location.pathname === '/utbildningar')
                ? (<span className={styles.link}
                         onClick={handlers.applyFilter}>
                {ctaTitle}
              </span>)
                : (<Link to='/utbildningar'
                         className={styles.link}
                         onClick={handlers.applyFilter}>
                {ctaTitle}
              </Link>)
              }
            </div>
          </div>
        </section>
      );
    }
  }
}

EducationFilter.propTypes = {
  actions: PropTypes.object,
  ctaTitle: PropTypes.string,
  filter: ImmutablePropTypes.map,
  location: PropTypes.object,
  search: ImmutablePropTypes.map,
  ui: ImmutablePropTypes.map,
};

export default EducationFilter;
