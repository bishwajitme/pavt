import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import styles from './CalendariumEvent.less';
import moment from 'moment';
import truncateText from 'utils/truncateText';
import getPathFromFullUrl from 'utils/getPathFromFullUrl';
import isLinkToCurrentSite from 'utils/isLinkToCurrentSite';

class CalendariumEvent extends Component {

  render() {
    const { url, size, date, enddate, title, excerpt, image } = this.props;
    const day = moment(date).locale('sv').format('DD');
    const month = moment(date).locale('sv').format('MMM');
    const eday = moment(enddate).locale('sv').format('DD');
    const emonth = moment(enddate).locale('sv').format('MMM');
    const truncateTitle = truncateText(title, 34);
    const truncateExcerpt = truncateText(excerpt, 78);

    const link = (isLinkToCurrentSite(url)) ?
      <Link to={getPathFromFullUrl(url)} className={styles.title}>
        {truncateTitle}
      </Link>
      :
      <a href={getPathFromFullUrl(url)} className={styles.title}>
        {truncateTitle}
      </a>

    const thumbnail = (isLinkToCurrentSite(url)) ?
      <Link to={url} className={styles.img} style={{backgroundImage: `url(${ image })`}} />
      :
      <a href={url} className={styles.img} style={{backgroundImage: `url(${ image })`}} />
    const isSameDate = (day===eday && eday!= null);
    if (isSameDate) {
      return (
        <div className={`${styles.event} ${size === 1 ? styles.eventSingle : null} `}>
        {size === 1 ?
          thumbnail
          : null}
          <div className={styles.container}>
          <div className={styles.content}>
          <div className={styles.date}>
          <span className={styles.dateDay}>{day}</span>
          <span className={styles.dateMonth}>{month}</span>
          </div>
          <div className={styles.textBox}>
          {link}
          <p className={styles.excerpt}>{truncateExcerpt}</p>
          </div>
          </div>
          </div>
          </div>
        );
    } else {
      return (
          <div className={`${styles.event} ${size === 1 ? styles.eventSingle : null} `}>
          {size === 1 ?
            thumbnail
            : null}
            <div className={styles.multicontainer}>
            <div className={styles.content}>
            <div className={styles.multidate}>
            <span className={styles.dateDay}>{day}</span><span className={styles.dateMonth}>{month}</span>
            <span className={styles.horizental}></span>
            <span className={styles.dateDay}>{eday}</span><span className={styles.dateMonth}>{emonth}</span>
            </div>
            <div className={styles.textBox}>
            {link}
            <p className={styles.excerpt}>{truncateExcerpt}</p>
            </div>
            </div>
            </div>
            </div>
          );
    }


  }
}

CalendariumEvent.propTypes = {
  date: PropTypes.string,
  enddate: PropTypes.string,
  excerpt: PropTypes.string,
  image: PropTypes.string,
  size: PropTypes.number,
  title: PropTypes.string,
  url: PropTypes.string,
};

export default CalendariumEvent;
