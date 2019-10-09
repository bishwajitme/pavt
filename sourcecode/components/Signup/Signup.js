import React, { Component, PropTypes } from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';
import SignupForm from 'components/SignupForm/SignupForm';
import Spinner from 'components/Spinner/Spinner';
import styles from './Signup.less';

const handlers = (comp) => {
  return {
    setFilter: (e) => {

    },
  }
};

class Signup extends Component {

  constructor (props) {
    super(props);
    this.handlers = handlers(this);
  }

  render () {
    const globals = this.props.globals;
    const response = globals.get('response');
    const status = globals.get('status');

    if (status === 'done' && response) {

      const title = response.getIn(['signup_form', 'title']);
      const text = response.getIn(['signup_form', 'text']);

      return (
        <div className={styles.base} id='bestallinformation'>
          <div className={styles.background}>
            <section className={styles.section}>
              <header className={styles.header}>
                <h1 className={styles.title}>{title}</h1>
                <p className={styles.text}>{text}</p>
              </header>
              <div className={styles.form}>
                <SignupForm actions={this.props.actions}
                            formEducations={this.props.formEducations}
                            globals={this.props.globals}
                            signup={this.props.signup}
                            ui={this.props.ui}/>
              </div>
            </section>
          </div>
        </div>
      );
    } else if (status === 'fetching') {
      return (
      <div className={styles.base}>
        <div className={styles.background}>
          <section className={styles.section}>
            <Spinner/>
          </section>
        </div>
      </div>
      );
    } else if (status === 'error') {
      return (
        <li>Hittade inte sidan :(</li>
      );
    } else {
      return false;
    }
  }
}

Signup.propTypes = {
  actions: PropTypes.object,
  formEducations: ImmutablePropTypes.map,
  globals: ImmutablePropTypes.map,
  signup: ImmutablePropTypes.map,
  ui: ImmutablePropTypes.map,
};

export default Signup;
