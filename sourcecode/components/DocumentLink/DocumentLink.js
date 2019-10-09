import React, { Component } from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';
import * as Icons from 'utils/svgIcons';
import styles from './DocumentLink.less';

class DocumentLink extends Component {
  render () {
    // type?
    const link = this.props.link;
    const title = link.get('title');
    const linkUrl = link.get('linkUrl');

    return (
        <a className={styles.link} href={linkUrl}>
          {Icons.download}
          {title}
        </a>
    );
  }
}

DocumentLink.propTypes = {
  link: ImmutablePropTypes.map,
};

export default DocumentLink;
