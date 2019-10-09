import React, { Component } from 'react';
import DocumentLink from 'components/DocumentLink/DocumentLink';
import ImmutablePropTypes from 'react-immutable-proptypes';
import styles from './PageDocumentLinks.less';

class PageDocumentLinks extends Component {
  render () {
    const links = this.props.links.map(link => {
      return (<DocumentLink key={link.get('linkUrl')} link={link}/>);
    });



    return (
      <section className={styles.section}>
        {links}
      </section>
    );
  }
}

PageDocumentLinks.propTypes = {
  links: ImmutablePropTypes.list,
};

export default PageDocumentLinks;
