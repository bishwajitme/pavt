import React, { Component, PropTypes } from 'react';
import WYSIWYGContent from 'components/WYSIWYGContent/WYSIWYGContent';
import styles from './TabContent.less';

class TabContent extends Component {

  render () {
    const { active, content, style } = this.props;

    const activeClass = active ? 'active' : 'inactive';

    return (
      <article className={`${styles.article} ${styles[activeClass]}`}
               style={style}>
        <div className={styles.wrap}>
          <WYSIWYGContent content={content}/>
        </div>
      </article>
    );
  }
}

TabContent.propTypes = {
  active: PropTypes.bool,
  content: PropTypes.string,
  style: PropTypes.object,
};

export default TabContent;
