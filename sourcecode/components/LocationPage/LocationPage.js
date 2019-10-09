import { updateMeta } from 'utils/updateMeta';
import React, { Component, PropTypes } from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';
import Immutable from 'immutable';
import getSlugFromPathname from 'utils/getSlugFromPathname';
import PageHero from 'components/PageHero/PageHero';
import WYSIWYGContent from 'components/WYSIWYGContent/WYSIWYGContent';
import LocationContactInfo
  from 'components/LocationContactInfo/LocationContactInfo';
import LocationPageEducationList
  from 'components/LocationPageEducationList/LocationPageEducationList';
import StaffList from 'components/StaffList/StaffList';
import InfoBlockList from 'components/InfoBlockList/InfoBlockList';
import * as Icons from 'utils/svgIcons';
import Page404 from 'components/Page404/Page404';
import Spinner from 'components/Spinner/Spinner';
import styles from './LocationPage.less';

class LocationPage extends Component {

  componentWillMount () {
    const slug = getSlugFromPathname(this.props.location.pathname);
    this.props.actions.fetchLocationFromApi(slug);
  }

  componentWillUpdate (nextProps) {
    const slug = getSlugFromPathname(nextProps.location.pathname);
    this.props.actions.fetchLocationFromApi(slug);
  }

  render () {
    const slug = getSlugFromPathname(this.props.location.pathname);
    const locations = this.props.locations;
    const status = locations.getIn([slug, 'status']);
    const response = locations.getIn([slug, 'response']);

    if (status === 'done' && response) {
      updateMeta(response);
      const siteId = this.props.globals.getIn(['response', 'site_id']);
      const title = response.get('title');
      const pageHero = response.getIn(['pageHero', 'backgroundImages']);
      const contact = response.get('contact');
      const wysiwygContent = response.get('wysiwygContent');
      const staffCards = response.get('staffCards');
      const infoBlocks = response.get('infoBlocks');
      const prefix = (slug === 'distans') ? 'på' : 'i';
      const educationListQuery = Immutable.fromJS({
        location: {
          slug: slug,
          title: title,
        },
      });

      return (
        <div>
          {pageHero ? <PageHero backgroundImages={pageHero}/> : null}
          {wysiwygContent ?
            <section className={styles.content}>
              <div className={styles.wrap}>
                <WYSIWYGContent content={wysiwygContent}/>
              </div>
            </section>
            : null}
          {contact ?
            <section className={styles.content}>
              <div className={styles.wrap}>
                <LocationContactInfo info={contact}/>
              </div>
            </section>
            : null}
          <div className={styles.educationList}>
            <LocationPageEducationList actions={this.props.actions}
                                       educationList={this.props.educationList}
                                       globals={this.props.globals}
                                       heading='Våra utbildningar'
                                       notSearchable={false}
                                       query={educationListQuery}/>
          </div>
          <div className={styles.educationList}>
            <LocationPageEducationList actions={this.props.actions}
                                       educationList={this.props.educationList}
                                       globals={this.props.globals}
                                       heading='Våra ej sökbara utbildningar'
                                       notSearchable={true}
                                       query={educationListQuery}/>
          </div>
          {(siteId !== 1)
            ? (
            <section className={styles.content}>
              <div className={styles.wrap}>
                <div className={styles.linkToAll}>
                  <a href={`http://plushogskolan.se/studieorter/${slug}`}>
                    {`Se alla utbildningar ${prefix} ${title}`}
                    {Icons.outbound}
                  </a>
                </div>
              </div>
            </section>
          )
            : false
          }
          {staffCards.size ? <StaffList cards={staffCards}/> : null}
          <div className={styles.blockList}>
            {infoBlocks ?
              <InfoBlockList context='halfs-fullrow'
                             blocks={infoBlocks}/>
              : null}
          </div>
        </div>
      );
    } else if (status === 'fetching') {
      return (
        <Spinner/>
      );
    } else if (status === 'error' || !response) {
      return (
        <Page404/>
      );
    }else {
      return (
        null
      );
    }
  }
}

LocationPage.propTypes = {
  actions: PropTypes.object,
  educationList: ImmutablePropTypes.map,
  globals: ImmutablePropTypes.map,
  location: PropTypes.object,
  'location.pathname': PropTypes.string,
  locations: ImmutablePropTypes.map,
};

export default LocationPage;
