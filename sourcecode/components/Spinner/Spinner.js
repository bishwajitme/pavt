import React, { Component, PropTypes } from 'react';
import Loader from 'react-loader';
import styles from './Spinner.less';

class Spinner extends Component {

 render () {
   const options = this.props.options || {};
   options.loaded = false;

   return (
     <div className={styles.base}>
       <Loader options={options} />
     </div>
   );
 };
}

Spinner.propTypes = {
  options: PropTypes.object,
};

export default Spinner;
