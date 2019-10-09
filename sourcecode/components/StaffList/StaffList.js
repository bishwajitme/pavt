import React, { Component } from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';
import StaffCard from 'components/StaffCard/StaffCard';
import styles from './StaffList.less';

class StaffList extends Component {

  render () {

    const staff = this.props.cards.map(staffItem => {
      return (
        <StaffCard key={staffItem.get('email')} item={staffItem}/>
      );
    });

    return (
      <section className={styles.section}>
        <h1 className={styles.heading}>Vår personal</h1>
        <div className={styles.wrap}>
          {staff}
        </div>
      </section>
    );
  }
}

StaffList.propTypes = {
  cards: ImmutablePropTypes.list,
};

export default StaffList;
