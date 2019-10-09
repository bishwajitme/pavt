import React, { Component, PropTypes } from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';
import Immutable from 'immutable';
import styles from './PressMoreButton.less';

const handlers = (props) => {
  return {
    setFilter: (e) => {
      const press = props.filter.get('press');
      const active = press.get('active');
      const newFilter = press.mergeIn([active], Immutable.fromJS({size: ''}));
      props.actions.setPressListFilter(newFilter, active);
      props.actions.fetchArticleListFromApi(newFilter.get(active), active);
    },
  }
};

class PressMoreButton extends Component {

  constructor (props) {
    super(props);
    this.handlers = handlers(props);
  }

  componentWillUpdate (nextProps) {
    this.handlers = handlers(nextProps);
  }

  render () {
    const handlers = this.handlers;
    const active = this.props.filter.getIn(['press', 'active']);
    const show = this.props.filter.getIn(['press', active, 'size']);

    if (show) {
      return (
        <div className={styles.base}>
          <span className={styles.item}
                onClick={handlers.setFilter}>Fler</span>
        </div>
      );
    } else {
      return false;
    }
  }
}

PressMoreButton.propTypes = {
  actions: PropTypes.object,
  filter: ImmutablePropTypes.map,
};

export default PressMoreButton;
