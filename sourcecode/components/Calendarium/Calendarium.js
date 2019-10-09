import React, { Component, PropTypes } from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';
import Spinner from 'components/Spinner/Spinner';
import filterArticlesThroughQuery from 'utils/filterArticlesThroughQuery';
import styles from './Calendarium.less';
import config from 'webpack-config-loader!conf';
import { Link } from 'react-router';
import moment from 'moment';

import CalendariumEvent from 'components/CalendariumEvent/CalendariumEvent';

class Calendarium extends Component {

  componentWillMount () {
    const query = this.props.query;
    this.props.actions.fetchArticleListFromApi(query);
  }

  render () {
    const articleList = this.props.articleList;
    const locations = this.props.locations;
    const status = articleList.get('status');
    const response = articleList.get('response');
    const bgImg = config.hostname + config.assetsPath + config.eventBg;
    const school = this.props.school;
    const now = moment().format('YMMDD');
    if (status === 'done' && response) {

      const numberOfSchools = (locations && locations.get('response').size - 1) || 'ett tiotal';

      const query = this.props.query;
      const articles = filterArticlesThroughQuery(
        response.toList().filter(x =>  now <= x.get('eventEndDate') ).sortBy(x => x.get('eventDate')),
        query
      );
      return (
        <div className={styles.container}>
          { articles.size ? <h1 className={styles.heading}>På gång</h1> : null }
          <div className={`${styles.calendarium} ${!articles.size ? styles.calendariumNoEvent : null} `}>
            { articles.slice(0, 3).map((item, key) =>
              <CalendariumEvent
                key={key}
                url={item.get('linkUrl')}
                size={articles.size}
                date={item.get('eventDate')}
                enddate={item.get('eventEndDate')}
                title={item.get('title')}
                excerpt={item.get('excerpt')}
                image={item.get('image').get('Article card')}
              />
            )
            }
            { articles.size === 2 ?
              <div className={styles.placeholder} />
              : null
            }
            { !articles.size ?
              <Link to='/studieorter' className={styles.noEvent} style={{backgroundImage: `url(${ bgImg })`}}>
                <div>
                  <p className={styles.noEventTitle}>Här finns vi</p>
                  <p className={styles.noEventText}>{`${school} finns på ${numberOfSchools} orter runt om i Sverige.`}</p>
                </div>
              </Link> : null
            }
          </div>

        </div>
      );
    } else if (status === 'fetching') {
      return (
        <Spinner/>
      );
    } else if (status === 'error') {
      return false;
    } else {
      return false;
    }
  }
}

Calendarium.propTypes = {
  actions: PropTypes.object,
  articleList: ImmutablePropTypes.map,
  filter: ImmutablePropTypes.map,
  locations: ImmutablePropTypes.map,
  query: ImmutablePropTypes.map,
  school: PropTypes.string,
};

export default Calendarium;
