import React, { Component } from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';
import ButtonLinkList from 'components/ButtonLinkList/ButtonLinkList';
import styles from './LandingPagePreamble.less';
import createMarkup from 'utils/createMarkup';

class LandingPagePreamble extends Component {
  render () {
    const content = this.props.content;
    const links = content.get('links');
    const textContent = createMarkup(content.get('text'));
    return (
      <section className={styles.section}>
        <div className={styles.well}>
          <div className={styles.wellBox}>
          <h1 className={styles.heading}>{content.get('title')}</h1>
          <div className={styles.text}
               dangerouslySetInnerHTML={textContent}></div>
          {links ? <ButtonLinkList content={links}/> : null}
          </div>
        </div>
      </section>
    );
  }
}

LandingPagePreamble.propTypes = {
  content: ImmutablePropTypes.map,
};

export default LandingPagePreamble;
