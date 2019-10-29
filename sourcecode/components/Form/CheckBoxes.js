import React, { Component, PropTypes } from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';
import Immutable from 'immutable';
import Spinner from 'components/Spinner/Spinner';
import * as Icons from 'utils/svgIcons';
import isMobileBrowser from 'utils/isMobileBrowser';
import styles from './CheckBoxes.less';
import getQueryParams from '../../utils/getQueryParams.js';

const handlers = (comp) => {
  return {
    onMobileClick: (e) => {
      const target = e.target;
      const dataset = target.options[target.selectedIndex].dataset;
      const oldFilter = comp.props.filter.getIn(['education', 'temp']);
      const queryParams = Immutable.fromJS(getQueryParams());


      const filter = oldFilter.set(comp.props.type.singular, Immutable.fromJS({
        slug: dataset.value,
        title: dataset.title,
      }));

      comp.props.actions.setEducationListTempFilter(queryParams);

    },
    onClick: (e) => {
      const oldFilter = comp.props.filter.getIn(['education', 'temp']);
      const queryParams = Immutable.fromJS(getQueryParams());

      const filter = queryParams.set(comp.props.type.singular, Immutable.fromJS({
        slug: e.target.dataset.value,
        title: e.target.dataset.title,
      }));

     var searchQuery = '/utbildningar?';
     if (filter.size) {
    filter.map((val, key) => {
      if(val.get('slug')!=''){
        searchQuery =  searchQuery + key +'='+val.get('slug')+'&';
      }

    });
  searchQuery = searchQuery.slice(0, -1);
  }

      window.location.href = searchQuery;
      comp.handlers.toggleSelect(comp.props.type.singular);
      comp.props.actions.setEducationListTempFilter(filter);


    },
    toggleSelect: () => {
      comp.props.actions.toggleSelect(comp.props.type.singular);

    },
  }
};

class CheckBoxes extends Component {

  constructor (props) {
    super(props);
    this.handlers = handlers(this);
  }

  componentWillMount () {
    this.props.actions.initSelect(this.props.type.singular);
  }

  render () {
    const { filter, search, type, ui } = this.props;
    const response = search.get('response');
    const status = search.get('status');
    const handlers = this.handlers;
    const newQueryParams = Immutable.fromJS(getQueryParams());

    if (status === 'done' && response) {

      const current = newQueryParams.getIn(
        [type.singular, 'slug']
      );

      const options = response.get(type.plural);

      const getDesktopOptions = () => {
        return options.sortBy(item => item.get('slug')).map(item => {
          const value = item.get('slug');
          const title = item.get('title');
          const active = (value === current) ? 'active' : '';
          return (
            <div key={value}
                 data-value={value}
                 data-title={title}
                 onClick={handlers.onClick}
                 className={`${styles.item} ${styles[active]}`}>
              {title}
            </div>
          )
        });
      };

      const getMobileOptions = () => {
        return options.sortBy(item => item.get('slug')).map(item => {
          const value = item.get('slug');
          const title = item.get('title');
          return (
            <option key={value}
                    value={value}
                    data-value={value}
                    data-title={title}>
              {title}
            </option>
          )
        });
      };

      const getDesktopSubjectOptions = () => {
        const groupedOptions = [];
        options.sortBy(item => item.get('school'))
          .groupBy(item => item.get('school'))
          .map((val, key) => {
            val.sortBy(item => item.get('slug')).map(item => {
              const value = item.get('slug');
              const title = item.get('title');
              const active = (value === current) ? 'active' : '';
              groupedOptions.push(
                <div key={value}
                     data-value={value}
                     data-title={title}
                     onClick={handlers.onClick}
                     className={`${styles.item} ${styles[active]}`}>
                  {title}
                </div>
              )
            });
          });
        return groupedOptions;
      };

      const getMobileSubjectOptions = () => {
        const groupedOptions = [];
        options.sortBy(item => item.get('school'))
          .groupBy(item => item.get('school'))
          .map((val, key) => {

            const optionsInOptgroup = [];

            val.sortBy(item => item.get('slug'))
              .map(item => {
                const value = item.get('slug');
                const title = item.get('title');
                optionsInOptgroup.push(
                  <option key={value}
                          value={value}
                          data-value={value}
                          data-title={title}>
                    {title}
                  </option>
                )
              });

            if (key) {
              groupedOptions.push(
                <optgroup key={key}
                          label={val.first().get('school')}
                          className={styles.separator}>
                  {optionsInOptgroup}
                </optgroup>);
            } else {
              optionsInOptgroup.map(option => {
                groupedOptions.push(option);
              });
            }
          });
        return groupedOptions;
      };

      const items = {
        desktop: {
          establishments: getDesktopOptions,
          locations: getDesktopOptions,
          subjects: getDesktopSubjectOptions,
          studietakts: getDesktopOptions,
          utbildningsstarts: getDesktopOptions,

        },
        mobile: {
          establishments: getMobileOptions,
          locations: getMobileOptions,
          subjects: getMobileSubjectOptions,
          studietakts: getMobileOptions,
          utbildningsstarts: getMobileOptions,
        },
      };

      const openStyle = (ui.getIn(['selects', type.singular]))
        ? 'open'
        : 'closed';

      const tempFilter = this.props.filter.getIn(
        ['education', 'temp', type.singular]
      );
      const activeFilter = this.props.filter.getIn(
        ['education', 'active', type.singular]
      );
      const changeStyle = (Immutable.is(tempFilter, activeFilter))
        ? ''
        : 'hasChange';

      if (options.size > 2) {
        return (
          <div className={`${styles.wrap} ${styles[changeStyle]}`}>
            {(isMobileBrowser())
              ? (<div className={styles.mobileSelectWrap}>
              <select name={type.singular}
                      id={type.singular}
                      onChange={handlers.onMobileClick}
                      className={styles.mobileSelect}>
                {items.mobile[type.plural]()}
              </select>
              <span className={styles.mobileCarret}>{Icons.carretDown}</span>
            </div>)
              : (<div tabIndex='0'
                      ref={type.singular}
                      className={styles.select}>
              <div className={styles.toggle}
                   onClick={handlers.toggleSelect}>
                {current}{Icons.carretDown}
              </div>
              <div className={`${styles.options} ${styles[openStyle]}`}>
                {items.desktop[type.plural]()}
              </div>
            </div>)}
          </div>
        );
      } else {
        return false;
      }
    } else if (status === 'fetching') {
      return (
        <div>
          {(isMobileBrowser())
            ? (<select className={styles.mobileSelect}>
            <option>...</option>
          </select>)
            : (<div className={styles.select}>
            <div className={styles.toggle}>
              <Spinner options={{scale: 0.5}}/>
            </div>
          </div>)}
        </div>
      );
    } else if (status === 'error') {
      return false;
    } else {
      return false;
    }
  }
}

CheckBoxes.propTypes = {
  actions: PropTypes.object,
  filter: ImmutablePropTypes.map,
  search: ImmutablePropTypes.map,
  status: PropTypes.string,
  type: PropTypes.object,
  ui: ImmutablePropTypes.map,
};

export default CheckBoxes;
