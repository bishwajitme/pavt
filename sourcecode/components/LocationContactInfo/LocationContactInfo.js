import React, { Component } from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';
import HTMLContent from 'components/HTMLContent/HTMLContent';
import Map from 'components/Map/Map';
import styles from './LocationContactInfo.less';

class LocationContactInfo extends Component {

  render () {
    const info = this.props.info;
    const phone = info.get('phone');
    const email = info.get('email');
    const address = info.get('address');
    const map = info.get('map');

    return (
      <div className={styles.base}>
        <div className={styles.contact}>
          <div className={styles.info}>
            <HTMLContent content={address}/>
          </div>
          <div className={styles.info}>-</div>
          <div className={styles.info}>
            {phone ?
              <a href={`tel:${phone}`}>{`Telefon: ${phone}`}</a>
              : false}
          </div>
          <div className={styles.info}>
            {email ?
              <a href={`mailto:${email}`}>{email}</a>
              : false}
          </div>
        </div>
        <div className={styles.map}>
          {map ? <Map content={map}/> : false}
        </div>
      </div>
    );
  }
}

LocationContactInfo.propTypes = {
  info: ImmutablePropTypes.map,
};

export default LocationContactInfo;
