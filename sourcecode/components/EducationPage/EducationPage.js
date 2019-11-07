import { updateMeta } from 'utils/updateMeta';
import React, { Component, PropTypes } from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';
import getSlugFromPathname from 'utils/getSlugFromPathname';
import EducationPageHero from 'components/EducationPageHero/EducationPageHero';
import EducationPagePreamble
  from 'components/EducationPagePreamble/EducationPagePreamble';
import EducationPageMeta from 'components/EducationPageMeta/EducationPageMeta';
import WYSIWYGContent from 'components/WYSIWYGContent/WYSIWYGContent';
import DocumentLink from 'components/DocumentLink/DocumentLink';
import TabList from 'components/TabList/TabList';
//import { TabList } from 'containers/TabsContainer';
import ArticleCards from 'components/ArticleCards/ArticleCards';
import Signup from 'components/Signup/Signup';
import Page404 from 'components/Page404/Page404';
import Spinner from 'components/Spinner/Spinner';
import styles from './EducationPage.less';

class EducationPage extends Component {

  componentDidMount () {
    const slug = getSlugFromPathname(this.props.location.pathname);
    this.props.actions.fetchEducationFromApi(slug);
  }

  componentWillUpdate (nextProps) {
    const slug = getSlugFromPathname(nextProps.location.pathname);
    this.props.actions.fetchEducationFromApi(slug);
  }

  render () {
    const slug = getSlugFromPathname(this.props.location.pathname);
    const educations = this.props.educations;
    const status = educations.getIn([slug, 'status']);
    const response = educations.getIn([slug, 'response']);

    if (status === 'done' && response) {



      updateMeta(response);
      const id = response.get('id');
      const educationStatus = response.get('status');
      const title = response.get('title');
      const pageHero = response.get('pageHero');
      const meta = response.get('meta');
      const preamble = response.get('preamble');
      const wysiwygContent = response.get('wysiwygContent');
      const documentLinks = response.get('documentLinks');
      const tabList = response.get('tabList');
      const articleRow = response.get('articleRow');
      const articleCards = response.getIn(['articleRow', 'articleCards']);
      const backgroundImage = {
        backgroundImage: `url(${pageHero.get('large')})`,
      };
      const eduId= 'edu' + id;

      return (
        <div id={eduId} className={styles.base}>
          <div style={backgroundImage}
               className={styles.background}></div>
          <EducationPageHero title={title}
                             meta={meta}/>
          <EducationPagePreamble content={preamble}
                                 status={educationStatus}/>
          <EducationPageMeta content={meta}/>
          <section className={styles.content}>
            <div className={styles.wrap}>
              {wysiwygContent
                ? <WYSIWYGContent content={wysiwygContent}/>
                : false
              }
              {documentLinks
                ? documentLinks.map((link) => {
                  return <DocumentLink key={link.get('linkUrl')} link={link} />
                })
                : false
              }
            </div>
          </section>
          <section>
          {tabList
            ? <TabList id={id}
                       actions={this.props.actions}
                       content={tabList}
                       ui={this.props.ui}/>
            : false
          }
          </section>
          <section className={styles.wrap}>
          {articleCards
            ? <ArticleCards context='thirds-fullrow'
                            heading={articleRow.get('heading')}
                            articles={articleCards}/>
            : false
          }
          </section>

          <Signup actions={this.props.actions}
                  formEducations={this.props.formEducations}
                  globals={this.props.globals}
                  signup={this.props.signup}
                  ui={this.props.ui}/>

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

EducationPage.propTypes = {
  actions: PropTypes.object,
  educations: ImmutablePropTypes.map,
  formEducations: ImmutablePropTypes.map,
  globals: ImmutablePropTypes.map,
  location: PropTypes.object,
  'location.pathname': PropTypes.string,
  signup: ImmutablePropTypes.map,
  state: PropTypes.object,
  ui: ImmutablePropTypes.map,
};

export default EducationPage;
