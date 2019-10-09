import { updateMeta } from 'utils/updateMeta';
import getSlugFromPathname from 'utils/getSlugFromPathname';
import React, { Component, PropTypes } from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';
import EducationFilter from 'components/EducationFilter/EducationFilter';
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
    const status = pages.getIn([slug, 'status']);
    const response = pages.getIn([slug, 'response']);

    if (status === 'done' && response) {
      updateMeta(response);
    }

    return (
      <div>
        <div className={styles.filter}>
          <EducationFilter actions={this.props.actions}
                           ctaTitle='Filtrera'
                           filter={this.props.filter}
                           search={this.props.search}
                           ui={this.props.ui}/>
        </div>
        <SearchPageEducationList actions={this.props.actions}
                                 educationList={this.props.educationList}
                                 filter={this.props.filter}
                                 globals={this.props.globals}/>
        <NotSearchableLink/>
      </div>
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
