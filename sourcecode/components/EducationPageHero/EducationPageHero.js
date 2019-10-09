import React, { Component, PropTypes } from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';
import SocialShare from 'components/SocialShare/SocialShare';
import styles from './EducationPageHero.less';

class EducationPageHero extends Component {
  render () {

    const { title, meta } = this.props;
    const subject = meta.get('subject');
    const scope = meta.get('scope');

    return (
      <section className={styles.section}>
        <div className={styles.wrap}>
          {subject
            ? <span className={styles.subject}>{subject}</span>
            : false
          }
          {title
            ? <h1 className={styles.heading}>{title}</h1>
            : false
          }
          {scope
            ? <span className={styles.scope}>{scope}</span>
            : false
          }
          <SocialShare color='white'/>
        </div>
      </section>
    );
  }
}

EducationPageHero.propTypes = {
  meta: ImmutablePropTypes.map,
  title: PropTypes.string,
};

export default EducationPageHero;
