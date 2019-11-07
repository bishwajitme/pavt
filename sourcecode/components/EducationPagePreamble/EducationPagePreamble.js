import React, { Component, PropTypes } from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';
import Immutable from 'immutable';
import ButtonLinkList from 'components/ButtonLinkList/ButtonLinkList';
import styles from './EducationPagePreamble.less';

class EducationPagePreamble extends Component {
  render () {

    const content = this.props.content;
    const title = content.get('title');
    const text = content.get('text');
    let links = content.get('links');

    links = links.unshift(Immutable.fromJS({
      title: 'Intresseanmälan',
      type: 'anchorLink',
      linkUrl: '#bestallinformation',
    }));

    return (
      <section className={styles.section}>
        <div className={styles.well}>
          {title
            ? <h2 className={styles.heading}>{title}</h2>
            : null
          }
          {text
            ? <p className={styles.text}>{text}</p>
            : null
          }
          {links
            ? <ButtonLinkList content={links}/>
            : null
          }
        </div>
      </section>
    );
  }
}

EducationPagePreamble.propTypes = {
  content: ImmutablePropTypes.map,
  educationStatus: PropTypes.string,
  status: PropTypes.string,
};

export default EducationPagePreamble;
