import React, { Component } from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';
import ButtonLink from 'components/ButtonLink/ButtonLink';

class ButtonLinkList extends Component {
  render () {

    const links = this.props.content.map((link) => {
      return (
        <ButtonLink key={link.get('title')} content={link}/>
      );
    });


    return (
      <div id='linkListID'>
        {links}
      </div>
    );
  }
}

ButtonLinkList.propTypes = {
  content: ImmutablePropTypes.list,
};

export default ButtonLinkList;
