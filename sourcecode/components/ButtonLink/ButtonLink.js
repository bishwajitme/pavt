import React, { Component } from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { Link } from 'react-router';
import * as Icons from 'utils/svgIcons';
import getPathFromFullUrl from 'utils/getPathFromFullUrl';
import styles from './ButtonLink.less';

class ButtonLink extends Component {

  render () {
    const content = this.props.content;
    const type = content.get('type');
    const title = content.get('title');
    const linkUrl = content.get('linkUrl');

    switch (type) {
      case 'internalLink':
        return (<Link className={styles.link}
                      to={getPathFromFullUrl(linkUrl)}>
          {title}
        </Link>);
        break;
      case 'externalLink':
        return (<a className={styles.link}
                   href={linkUrl}>
          {title}{Icons.outbound}
        </a>);
        break;
      case 'documentLink':
        return (<a className={styles.link} href={linkUrl}>{title}</a>);
        break;
      case 'anchorLink':
        return (<a className={styles.link} href={linkUrl}>{title}</a>);
      case 'emailLink':
        const emailUrl = 'mailto:'+linkUrl;
        return (<a className={styles.link} href={emailUrl}>{title}</a>);
      default:
        return null;
    }
  }
}

ButtonLink.propTypes = {
  content: ImmutablePropTypes.map,
};

export default ButtonLink;
