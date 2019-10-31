import { updateMeta } from 'utils/updateMeta';
import getSlugFromPathname from 'utils/getSlugFromPathname';
import React, { Component, PropTypes } from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { Link } from 'react-router';
import EducationFilter from 'components/EducationFilter/EducationFilter';
import EducationFilterTop from 'components/EducationFilterTop/EducationFilterTop';
import SearchPageEducationList
  from 'components/SearchPageEducationList/SearchPageEducationList';
import NotSearchableLink from 'components/NotSearchableLink/NotSearchableLink';
import styles from './SearchPage.less';


class SearchPage extends Component {


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
    const globalo = this.props.globals;
    const globalResponse = globalo.get('response');
    const id = globalo.getIn(['response', 'site_id']);

    const siteName = globalResponse.get('sites')
      .find(site => site.get('id') == id)
      .get('name');



    const phone = globalo.getIn(['response', 'footer', 'phone']);
    const email = globalo.getIn(['response','footer', 'email']);


    const status = pages.getIn([slug, 'status']);
    const response = pages.getIn([slug, 'response']);

    if (status === 'done' && response) {
      updateMeta(response);
    }

    return (
      <section className={styles.section}>
    <div className={styles.utbildningar_title}>
      <div className={styles.wrap}>
        <h1 className={styles.filter_banner}>{siteName}s utbildningar och kurser</h1>
      </div>
    </div>
      <div className={styles.wrap}>

        <div className={styles.top_fliter}>
          <EducationFilterTop actions={this.props.actions}
                                 ctaTitle='Filtrera'
                                 filter={this.props.filter}
                                 search={this.props.search}
                                 ui={this.props.ui}/>
        </div>
        <div className={styles.filter}>
          <EducationFilter actions={this.props.actions}
                           ctaTitle='Filtrera'
                           filter={this.props.filter}
                           search={this.props.search}
                           ui={this.props.ui}/>
         <div className={styles.sidecontent}>
          <h3>Vill du inleda en ny karriär?</h3>
                <p> Gå vidare med din ansökan!</p>
                 <Link to='/om-oss/intresseanmalan/'
                          className={styles.link}>
                 ANSÖK HÄR
               </Link>

            <h3>   Kom i kontakt med oss</h3>
<p>Behöver mer info innan du bestämmer dig? Kontakta oss på <a href={`tel:${phone}`}> {phone}</a>
eller <a href={`mailto:${email}`}>{email}</a>.</p>
<h3>Ska vi skicka dig mer info?</h3>
<p>Gör en <a href='/om-oss/intresseanmalan/'><strong>intresseanmälan</strong></a>
 så håller vi dig uppdaterad om vad som är på gång!</p>
</div>
        </div>
        <SearchPageEducationList actions={this.props.actions}
                                 educationList={this.props.educationList}
                                 filter={this.props.filter}
                                 globals={this.props.globals}/>
        <NotSearchableLink/>
      </div>
      </section>
    );
  }
}

SearchPage.propTypes = {
  actions: PropTypes.object,
  educationList: ImmutablePropTypes.map,
  filter: ImmutablePropTypes.map,
  globals: ImmutablePropTypes.map,
  location: PropTypes.object,
  pages: ImmutablePropTypes.map,
  search: ImmutablePropTypes.map,
  ui: ImmutablePropTypes.map,
};

export default SearchPage;
