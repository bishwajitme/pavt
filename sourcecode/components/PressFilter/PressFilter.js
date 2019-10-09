import React, { Component, PropTypes } from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';
import Immutable from 'immutable';
import styles from './PressFilter.less';

const handlers = (props) => {
  return {
    setFilter: (e) => {
      const data = e.target.dataset;
      const press = props.filter.get('press');
      const size = press.getIn([data.type, 'size']);
      const newFilter = press.set('active', data.type)
        .setIn([data.type], Immutable.fromJS({
          type: data.value,
          size: (size !== undefined) ? '' : 4,
        }));

      props.actions.setPressListFilter(newFilter, data.type);
      props.actions.fetchArticleListFromApi(
        newFilter.get(data.type), data.type
      );
    },
  }
};

class PressFilter extends Component {

  constructor (props) {
    super(props);
    this.handlers = handlers(props);
  }

  componentWillMount () {
    //this.props.actions.fetchSearchDataFromApi();
  }

  componentWillUpdate (nextProps) {
    this.handlers = handlers(nextProps);
  }

  render () {
    const press = this.props.filter.get('press');
    const active = press.get('active');
    const type = press.getIn([active, 'type']);
    const handlers = this.handlers;

    const filters = Immutable.fromJS({
      Alla: '',
      Nyheter: 'nyhet',
      Event: 'event',
      Intervjuer: 'intervju',
    });

    const items = filters.map((val, key) => {
      const active = (val === type) ? 'active' : '';
      return (
        <li className={`${styles.item} ${styles[active]}`}
            onClick={handlers.setFilter}
            key={val}
            data-type={key}
            data-value={val}>
          {key}
        </li>
      );
    }).toArray();

    return (
      <div className={styles.base}>
        <section className={styles.section}>
          <ul className={styles.wrap}>
            {items}
          </ul>
        </section>
      </div>
    );
  }
}

PressFilter.propTypes = {
  actions: PropTypes.object,
  filter: ImmutablePropTypes.map,
};

export default PressFilter;
