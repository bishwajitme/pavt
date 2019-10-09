import React, { Component, PropTypes } from 'react';
import styles from './SubmitButton.less';

class SubmitButton extends Component {

  render () {
    const text = this.props.text || 'Skicka';
    return (
      <input type='submit'
             className={styles.input}
             value={text} />
    );
  }
}

SubmitButton.propTypes = {
  text: PropTypes.string,
};

export default SubmitButton;
