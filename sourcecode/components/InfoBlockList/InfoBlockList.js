import React, { Component, PropTypes } from 'react';
import InfoBlock from 'components/InfoBlock/InfoBlock';
import ImmutablePropTypes from 'react-immutable-proptypes';
import styles from './InfoBlockList.less';

class InfoBlockList extends Component {
  render () {
    const blocks = this.props.blocks;
    const context = this.props.context;

    return (
      <section className={`${styles.section} ${context}`}>
        {blocks ?
          blocks.map((block) => {
            return (
              <InfoBlock key={block.get('title')} content={block}/>
            );
          })
          : null}
      </section>
    );
  }
}

InfoBlockList.propTypes = {
  blocks: ImmutablePropTypes.list,
  context: PropTypes.string,
};

export default InfoBlockList;
