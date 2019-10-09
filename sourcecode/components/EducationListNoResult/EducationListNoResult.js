import React, { Component } from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';
import Immutable from 'immutable';
import styles from './EducationListNoResult.less';

const handlers = (comp) => {
  return {
    onClick: (e) => {
      const type = e.currentTarget.dataset.type;
      const cleanFilter = Immutable.fromJS({
        establishment: {
          slug: '',
          title: 'Välj utbildningstyp',
        },
        location: {
          slug: '',
          title: 'Välj studieort',
        },
        subject: {
          slug: '',
          title: 'Välj ämne',
        },
      });

      const filter = cleanFilter.set(type, comp.props.query.get(type));
      comp.props.actions.setEducationListTempFilter(filter);
      comp.props.actions.setEducationListFilter();
    },
    onClickShowAll: (e) => {
      const cleanFilter = Immutable.fromJS({
        establishment: {
          slug: '',
          title: 'Välj utbildningstyp',
        },
        location: {
          slug: '',
          title: 'Välj studieort',
        },
        subject: {
          slug: '',
          title: 'Välj ämne',
        },
      });

      comp.props.actions.setEducationListTempFilter(cleanFilter);
      comp.props.actions.setEducationListFilter();
    },
  }
};

class EducationListNoResult extends Component {
  constructor (props) {
    super(props);
    this.handlers = handlers(this);
  }

  render () {
    const { query } = this.props;
    const handlers = this.handlers;

    const showAllButton = (<div className={styles.button}
                                onClick={handlers.onClickShowAll}>
      <span>{`Se alla utbildningar`}</span>
    </div>);

    const buttons = query.reduce((memo, val, key) => {
      const slug = val.get('slug');
      const title = val.get('title');
      if (slug) {
        return memo = memo.push(
          <div key={`button-${slug}`}
               className={styles.button}
               data-type={key}
               onClick={handlers.onClick}>
            <span>{`Se allt från ${title}`}</span>
          </div>
        );
      } else {
        return memo;
      }
    }, Immutable.fromJS([])).toArray();

    return (
      <div className={styles.base}>
        <h1>Hittade inga utbildningar genom denna filtrering</h1>
        {(buttons.length > 1) ? <div>{buttons}</div> :
          <div>{showAllButton}</div>}
      </div>
    )
  }
}

EducationListNoResult.propTypes = {
  query: ImmutablePropTypes.map,
};

export default EducationListNoResult;
