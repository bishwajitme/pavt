import { updateMeta } from 'utils/updateMeta';
import React, { Component, PropTypes } from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';
import Immutable from 'immutable';
import getSlugFromPathname from 'utils/getSlugFromPathname';
import WYSIWYGContent from 'components/WYSIWYGContent/WYSIWYGContent';
import LocationList from 'components/LocationList/LocationList';
import Page404 from 'components/Page404/Page404';
import Spinner from 'components/Spinner/Spinner';
import styles from './LocationListPage.less';

class LocationListPage extends Component {

  componentWillMount () {
    const slug = getSlugFromPathname(this.props.location.pathname);
    this.props.actions.fetchPageFromApi(slug);
  }

  componentWillUpdate (nextProps) {
    const slug = getSlugFromPathname(nextProps.location.pathname);
    this.props.actions.fetchPageFromApi(slug);
  }

  render () {
    const slug = getSlugFromPathname(this.props.location.pathname);
    const pages = this.props.pages;
    const status = pages.getIn([slug, 'status']);
    const response = pages.getIn([slug, 'response']);

    if (status === 'done' && response) {
      updateMeta(response);
      const wysiwygContent = response.get('wysiwygContent');
      const query = Immutable.fromJS({
        type: '',
        offset: '',
        size: '',
      });

      return (
        <div>
          {wysiwygContent ?
            <section className={styles.content}>
              <div className={styles.wrap}>
                <WYSIWYGContent content={wysiwygContent}/>
              </div>
            </section>
            : null}
          <LocationList actions={this.props.actions}
                        locationList={this.props.locationList}
                        query={query}/>
        </div>
      );
    } else if (status === 'fetching') {
      return (
        <Spinner/>
      );
    } else if (status === 'error') {
      return (
        <Page404/>
      );
    } else {
      return false;
    }
  }
}

LocationListPage.propTypes = {
  actions: PropTypes.object,
  location: PropTypes.object,
  locationList: ImmutablePropTypes.map,
  pages: ImmutablePropTypes.map,
};

export default LocationListPage;
