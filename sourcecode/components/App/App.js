import dataLayer from '../../utils/dataLayer';
import React, { Component, PropTypes } from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';
import AppPageWrapper from 'components/AppPageWrapper/AppPageWrapper';
import SiteHeader from 'components/SiteHeader/SiteHeader';
import SiteFooter from 'components/SiteFooter/SiteFooter';
import AppFail from 'components/AppFail/AppFail';
import Spinner from 'components/Spinner/Spinner';
import CookieBanner from 'components/CookieBanner/CookieBanner.js';
import {getCookie, setCookie} from '../../utils/cookieCheck';
import styles from './App.less';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showBanner: getCookie(),
    };
    this.onCookieConsent = this.onCookieConsent.bind(this);
  }

  onCookieConsent() {
    this.setState({showBanner: false});
    dataLayer.push({event: 'gtm:cookie-consent'});
    setCookie();
  }

  componentDidMount () {
    this.props.actions.fetchGlobalsFromApi();
  }

  render () {
    const globals = this.props.globals;
    const status = globals.get('status');
    const response = globals.get('response');
    const mainStyle = {
      minHeight: `${window.innerHeight - 200}px`,
    };

    if (status === 'done' && response) {
      return (
        <div className={`${styles.app} ${this.state.showBanner ? styles.bannerVisible : ''}`}>
          {this.state.showBanner ? <CookieBanner onClick={() => this.onCookieConsent()}/> : false}
          <SiteHeader actions={this.props.actions}
                      globals={response}
                      ui={this.props.ui}/>
          <main className={styles.main} style={mainStyle}>
            <AppPageWrapper actions={this.props.actions}
                            location={this.props.location}
                            ui={this.props.ui}
                            children={this.props.children}/>
          </main>
          <SiteFooter globals={response}/>
        </div>
      );

    } else if (status === 'fetching') {
      return (
        <Spinner/>
      );
    } else if (status === 'error') {
      return (
        <AppFail />
      );
    } else {
      return null;
    }
  }
}

App.propTypes = {
  actions: PropTypes.object,
  children: PropTypes.object,
  globals: ImmutablePropTypes.map,
  location: PropTypes.object,
  ui: ImmutablePropTypes.map,
};

export default App;
