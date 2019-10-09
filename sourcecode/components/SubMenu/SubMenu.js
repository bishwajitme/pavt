import React, { Component, PropTypes } from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';
import SubMenuItem from 'components/SubMenuItem/SubMenuItem';
import styles from './SubMenu.less';

class SubMenu extends Component {

  render () {
    const { pages, id } = this.props;

    if (!pages.find(page => page.get('id') == id)) {
      return false;
    }

    const findTopPage = (id) => {
      const current = pages.find(page => {
        return page.get('id') == id;
      });
      const parent = current.get('parent');
      return (parent) ? findTopPage(parent) : current.get('id');
    };

    const topPage = pages.find(x => x.get('id') == findTopPage(id));
    const active = topPage.get('id') == id;
    const items = [<SubMenuItem key={topPage.get('id')} page={topPage} level={1}
                                active={active}/>];

    let level = 2;
    const mapAll = (page) => {
      page.get('children').map(child => {
        const me = pages.find(x => x.get('id') == child);
        const active = me.get('id') == id;
        items.push(<SubMenuItem key={me.get('id')} page={me} level={level}
                                active={active}/>);
        if (me.get('children').size) {
          level++;
          mapAll(me);
        }
      });
    };

    mapAll(topPage);

    return (
      <div>
        {(items.length > 1) ?
          <nav className={styles.nav}>
            {items}
          </nav>
          : false}
      </div>
    );
  }
}
;

SubMenu.propTypes = {
  id: PropTypes.number,
  pages: ImmutablePropTypes.list,
};

export default SubMenu;
