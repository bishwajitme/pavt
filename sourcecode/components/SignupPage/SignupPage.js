import { updateMeta } from 'utils/updateMeta';
import React, { Component, PropTypes } from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';
import getSlugFromPathname from 'utils/getSlugFromPathname';
import Signup from 'components/Signup/Signup';
import SubMenu from 'components/SubMenu/SubMenu';
import Page404 from 'components/Page404/Page404';
import Spinner from 'components/Spinner/Spinner';
import styles from './SignupPage.less';

class SignupPage extends Component {

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

      const id = response.get('id');
      const title = response.get('title');
      const subMenuPages = this.props.globals.getIn(['response', 'pages']);

      return (
        <div>
          <div className={styles.base}>
            <header className={styles.header}>
              <h1 className={styles.heading}>{title}</h1>
            </header>
            <aside className={styles.sub}>
              <SubMenu id={id} pages={subMenuPages}/>
            </aside>
            <section className={styles.main}>
              <Signup actions={this.props.actions}
                      formEducations={this.props.formEducations}
                      globals={this.props.globals}
                      signup={this.props.signup}
                      ui={this.props.ui}/>
            </section>
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
    } else {
      return (
        null
      );
    }
  }
}

SignupPage.propTypes = {
  actions: PropTypes.object,
  formEducations: ImmutablePropTypes.map,
  globals: ImmutablePropTypes.map,
  location: PropTypes.object,
  'location.pathname': PropTypes.string,
  pages: ImmutablePropTypes.map,
  signup: ImmutablePropTypes.map,
  ui: ImmutablePropTypes.map,
};

export default SignupPage;
