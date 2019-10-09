import React, { Component, PropTypes } from 'react';
import createMarkup from 'utils/createMarkup';

class HTMLContent extends Component {
  render () {
    let content = this.props.content;
    content = createMarkup(content);

    return (
      <div className={this.props.className}
           dangerouslySetInnerHTML={content}></div>
    );
  }
}

HTMLContent.propTypes = {
  className: PropTypes.string,
  content: PropTypes.string,
};

export default HTMLContent;
