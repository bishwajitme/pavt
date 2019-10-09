import React, { Component } from 'react';
import config from 'webpack-config-loader!conf';
import styles from './AppFail.less';

class AppFail extends Component {
  render () {

    const schoolStyle = config.sitename.charAt(0);

    return (
      <section className={`${styles.section} ${styles[schoolStyle]}`}>
        <h1>Någonting gick fel</h1>
        <p>Försök att ladda om sidan på nytt</p>
      </section>
    )
  }
}

export default AppFail;
