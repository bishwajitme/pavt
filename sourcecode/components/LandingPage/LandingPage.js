import { updateMeta } from 'utils/updateMeta';
import config from 'webpack-config-loader!conf';
import React, { Component, PropTypes } from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';
import Immutable from 'immutable';
import getSlugFromPathname from 'utils/getSlugFromPathname';
import LandingPageHero from 'components/LandingPageHero/LandingPageHero';
import EducationFilter from 'components/EducationFilterHome/EducationFilterHome';
import LandingPagePreamble from
  'components/LandingPagePreamble/LandingPagePreamble';
import InfoBlockList from 'components/InfoBlockList/InfoBlockList';
import ArticleList from 'components/ArticleList/ArticleList';
import ArticleCards from 'components/ArticleCards/ArticleCards';
import SiteMenu from 'components/SiteMenu/SiteMenu';
import Page404 from 'components/Page404/Page404';
import Spinner from 'components/Spinner/Spinner';
import Calendarium from 'components/Calendarium/Calendarium';
import styles from './LandingPage.less';

class LandingPage extends Component {

  componentWillMount () {
    const slug = getSlugFromPathname(this.props.location.pathname) || 'start';
    this.props.actions.fetchPageFromApi(slug);
    this.props.actions.fetchLocationListFromApi();
  }

  render () {
    const pages = this.props.pages;
    const locations = this.props.locationList;
    const status = pages.getIn(['start', 'status']);
    const response = pages.getIn(['start', 'response']);

    if (status === 'done' && response) {
      updateMeta(response);
      const id = this.props.globals.getIn(['response', 'site_id']);

      const hostname = config.hostname || 'http://' + window.location.host;
      const sites = this.props.globals.getIn(['response', 'sites']);
      const siteInfo = sites.find(site => {
        return site.get('url').indexOf(hostname) !== -1;
      });
      const heroBackgroundImage = response
        .getIn(['pageHero', 'backgroundImage']);
      const preamble = response.get('preamble');
      const antal_nyheter = siteInfo.get('antal_nyheter');
      const articleListQuery = Immutable.fromJS({size: antal_nyheter});
      const calendariumQuery = Immutable.fromJS({type: 'event'});
      const infoBlocks = response.get('infoBlocks');
      const articleRow = response.get('articleRow');
      const school = siteInfo.get('name');

      return (
        <div>
          <LandingPageHero id={id}
                           siteInfo={siteInfo}
                           backgroundImage={heroBackgroundImage}/>
          {(id === 1)
            ? (<SiteMenu inMenu={false}
                         sites={sites}
                         ui={this.props.ui}/>)
            : false
          }
          <EducationFilter actions={this.props.actions}
                           ctaTitle='Sök'
                           filter={this.props.filter}
                           search={this.props.search}
                           ui={this.props.ui}/>
          <div className={styles.preamble}>
            <LandingPagePreamble content={preamble}/>
          </div>
          <h1 className={styles.heading}>Senaste nyheter</h1>
          <div className={styles.container}>
              <div className={styles.articleList}>
                <ArticleList actions={this.props.actions}
                             articleList={this.props.articleList}
                             context='halfs-fullrow'
                             query={articleListQuery}/>
              </div>
              <div className={styles.containerBoxRight}>
                <div className={styles.infoBlocks}>
                <InfoBlockList context='halfs-fullrow'
                               blocks={infoBlocks}/>
                </div>
                <Calendarium actions={this.props.actions}
                             articleList={this.props.articleList}
                             locations={locations}
                             query={calendariumQuery}
                             school={school}/>
              </div>

          </div>
          <div className={styles.articleCards}>
            <ArticleCards context='thirds-fullrow'
                          heading={articleRow.get('heading')}
                          articles={articleRow.get('articleCards')}/>
          </div>
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
      return null;
    }
  }
}

LandingPage.propTypes = {
  actions: PropTypes.object,
  articleList: ImmutablePropTypes.map,
  filter: ImmutablePropTypes.map,
  globals: ImmutablePropTypes.map,
  locationList: PropTypes.object,
  pages: ImmutablePropTypes.map,
  search: ImmutablePropTypes.map,
  ui: ImmutablePropTypes.map,
};

export default LandingPage;
