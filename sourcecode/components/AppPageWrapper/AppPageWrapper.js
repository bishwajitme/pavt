import dataLayer from 'utils/dataLayer';
import React, { Component, PropTypes } from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';

class AppPageWrapper extends Component {

  componentDidMount () {
    //TagManagerEvent
    dataLayer.push({event: 'gtm:app-load'});
  }

  componentWillUpdate (nextProps) {

    if (this.props.location.pathname !== nextProps.location.pathname) {
      //TagManagerEvent
      dataLayer.push({event: 'gtm:app-update'});

      if (nextProps.ui.get('showSiteMenu')) {
        this.props.actions.hideSiteMenu();
      }
    }
  }

  render () {
    return (<div>{this.props.children}</div>);
  }
}

AppPageWrapper.propTypes = {
  actions: PropTypes.object,
  children: PropTypes.object,
  location: PropTypes.object,
  ui: ImmutablePropTypes.map,
};

export default AppPageWrapper;
