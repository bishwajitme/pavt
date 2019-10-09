import React, { Component } from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';
import GoogleMapsLoader from 'google-maps';

class Map extends Component {

  componentDidMount () {
    const content = this.props.content;
    const zoom = parseInt(content.get('zoom'));
    const latLng = {
      lat: parseFloat(content.get('lat')),
      lng: parseFloat(content.get('long')),
    };
    const el = this.refs.map;
    GoogleMapsLoader.load((google) => {
      const map = new google.maps.Map(el, {
        center: latLng,
        scrollwheel: false,
        zoom: zoom,
      });

      new google.maps.Marker({
        map: map,
        position: latLng,
      });
    });
  }

  render () {
    const style = {
      height: '300px',
      width: '100%',
    };

    return (
        <div ref='map' style={style}></div>
    );
  }
}

Map.propTypes = {
  content: ImmutablePropTypes.map,
};

export default Map;
