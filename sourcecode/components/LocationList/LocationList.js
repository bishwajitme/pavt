import React, { Component, PropTypes } from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';
import ArticleCards from 'components/ArticleCards/ArticleCards';
import Spinner from 'components/Spinner/Spinner';
import styles from './LocationList.less';

class LocationList extends Component {

  componentWillMount () {
    this.props.actions.fetchLocationListFromApi();
  }

  componentWillUpdate (nextProps) {
    //this.props.actions.fetchLocationListFromApi(query);
  }

  render () {
    const locationList = this.props.locationList;
    const status = locationList.get('status');
    const response = locationList.get('response');

    if (status === 'done' && response) {

      const locations = response
        .sortBy(location => location.get('title'))
        .toList();

      return (
        <section className={styles.section}>
          <ArticleCards context='thirds-fullrow'
                        heading=''
                        articles={locations}/>
        </section>
      );
    } else if (status === 'fetching') {
      return (
        <Spinner/>
      );
    } else if (status === 'error') {
      return false;
    } else {
      return false;
    }
  }
}

LocationList.propTypes = {
  actions: PropTypes.object,
  locationList: ImmutablePropTypes.map,
  query: PropTypes.object,
};

export default LocationList;
