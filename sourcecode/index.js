import React from 'react';
import ReactDOM from 'react-dom';
import Immutable from 'immutable';
import { createStore, applyMiddleware, compose } from 'redux'
import { Provider } from 'react-redux'
import { Router, Route, IndexRoute, browserHistory } from 'react-router'
import { syncHistory } from 'react-router-redux'
import thunkMiddleware from 'redux-thunk'
import rootReducer from 'reducers'
import AppContainer from 'containers/AppContainer';
import { ArticlePage } from 'containers/ArticlePageContainer';
import { CustomHtmlPage } from 'containers/CustomHtmlPageContainer';
import { EducationPage } from 'containers/EducationPageContainer';
import { LandingPage } from 'containers/LandingPageContainer';
import { LocationListPage } from 'containers/LocationListPageContainer';
import { LocationPage } from 'containers/LocationPageContainer';
import { NotSearchablePage } from 'containers/NotSearchablePageContainer';
import { Page } from 'containers/PageContainer';
import { PressPage } from 'containers/PressPageContainer';
import { SearchPage } from 'containers/SearchPageContainer';
import { SignupPage } from 'containers/SignupPageContainer';


import installDevTools from 'immutable-devtools';
installDevTools(Immutable);

const reduxRouterMiddleware = syncHistory(browserHistory);
const middleWares = [thunkMiddleware, reduxRouterMiddleware];
const createStoreWithMiddleware = compose(
  applyMiddleware(...middleWares),
  window.devToolsExtension ? window.devToolsExtension() : f => f)
(createStore);
const store = createStoreWithMiddleware(rootReducer, Immutable.Map());

if (module.hot) {
  module.hot.accept('reducers', () => {
    const nextRootReducer = require('reducers');
    store.replaceReducer(nextRootReducer)
  })
}


ReactDOM.render(
  <Provider store={store}>
    <div>
      <Router history={browserHistory} onUpdate={() => window.scrollTo(0, 0)}>
        <Route path='/' component={AppContainer}>
          <IndexRoute component={LandingPage}/>

          <Route path='nyheter'>
            <IndexRoute type='nyhet' component={PressPage}/>
            <Route path='/nyheter/:slug' component={ArticlePage}/>
          </Route>
            
          <Route path='jobba-hos-oss' component={CustomHtmlPage}/>
          
          <Route path='utbildningar'>
            <IndexRoute component={SearchPage}/>
            <Route path='/utbildningar/ej-sokbara'
                   component={NotSearchablePage}/>
            <Route path='/utbildningar/:slug' component={EducationPage}/>
          </Route>

          <Route path='/ej-sokbara' component={NotSearchablePage}/>

          <Route path='studieorter'>
            <IndexRoute component={LocationListPage}/>
            <Route path='/studieorter/:slug' component={LocationPage}/>
          </Route>
          <Route path='om-oss'>
            <IndexRoute component={Page}/>
            <Route path='/om-oss/intresseanmalan' component={SignupPage}/>
          </Route>
          <Route path=':slug'>
            <IndexRoute component={Page}/>
            <Route path='/:slug/:slug' component={Page}/>
            <Route path='/:slug/:slug/:slug' component={Page}/>
          </Route>
        </Route>
        <Route path='*' component={Page}/>
      </Router>
    </div>
  </Provider>,
  document.getElementById('app')
);
