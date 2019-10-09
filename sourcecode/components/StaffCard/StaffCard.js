import React, { Component } from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';
import styles from './StaffCard.less';

class StaffCard extends Component {

  render () {
    const item = this.props.item;
    const image = item.getIn(['image', 'medium']);
    const name = item.get('name');
    const workTitle = item.get('workTitle');
    const workDescription = item.get('workDescription');
    const phone = item.get('phone');
    const email = item.get('email');

    const backgroundImage = {
      backgroundImage: `url(${image})`,
    };

    return (
      <article className={styles.article}>
        <div className={styles.image}
             style={backgroundImage}></div>
        <div className={styles.content}>
          {name ? <h1 className={styles.heading}>{name}</h1> : null}
          <div className={styles.info}>
            {workTitle ? <p>{workTitle}</p> : null}
            {phone ? <p>{phone}</p> : null}
            {email ? <p>{email}</p> : null}
            {workDescription ? <p>{workDescription}</p> : null}
          </div>
        </div>
      </article>
    );

  }
}

StaffCard.propTypes = {
  item: ImmutablePropTypes.map,
};

export default StaffCard;
