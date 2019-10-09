import React, { Component } from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';

class LocationPageHero extends Component {
  render () {

    const images = this.props.images.map(image => {
      return (<img key={image.get('large')}
                   src={image.get('large')}
                   alt={image.get('alt')}/>);
    });

    return (
      <fieldset>
        <legend>LocationPageHero</legend>
        {images ? images : null}
      </fieldset>
    );
  }
}

LocationPageHero.propTypes = {
  images: ImmutablePropTypes.list,
};

export default LocationPageHero;
