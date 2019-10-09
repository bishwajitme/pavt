import React, { Component, PropTypes } from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';
import TabTitle from 'components/TabTitle/TabTitle';
import TabContent from 'components/TabContent/TabContent';
import styles from './TabList.less';

const handlers = (props) => {
  return {
    setActive: (e) => {
      const id = props.id;
      const index = e.target.getAttribute('data-tab');
      props.actions.setActiveTab(id, index);
    },
  }
};

class TabList extends Component {

  constructor (props) {
    super(props);
    this.handlers = handlers(this.props);
  }
  
  render () {
    const { content, id, ui } = this.props;
    const storeIndex = ui.getIn(['tabs', id]) || 0;
    const titles = [], tabs = [];
    
    content.map((item, index) => {
      const active = index === storeIndex;
      const onClick = (index !== storeIndex) ? this.handlers.setActive : null;
      titles.push(<TabTitle key={index}
                            tab={index}
                            active={active}
                            onClick={onClick}
                            title={item.get('title')}/>);
      tabs.push(<TabContent key={index}
                            active={active}
                            content={item.get('content')}/>);
    });


    return (
      <section className={styles.section}>
        <div className={styles.titles}>
          <ul className={styles.list}>
            {titles}
          </ul>
        </div>
        <div className={styles.content}>
          {tabs}
        </div>
      </section>
    );
  }
}

TabList.propTypes = {
  actions: PropTypes.object,
  content: ImmutablePropTypes.list,
  id: PropTypes.number,
  ui: ImmutablePropTypes.map,
};

export default TabList;
