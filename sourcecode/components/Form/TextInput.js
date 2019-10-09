import React, { Component, PropTypes } from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';
import Immutable from 'immutable';
import { isValid } from 'utils/validate';
import * as Icons from 'utils/svgIcons';
import styles from './TextInput.less';

const handlers = (props) => {
  return {
    onBlur: (e) => {
      const { name, value, dataset } = e.currentTarget;
      const validate = dataset.validate;
      props.actions.setFormInput(Immutable.fromJS({
        name: name,
        field: {
          showValidationMessage: false,
          modified: true,
          value: value,
          valid: isValid(validate, value),
        },
      }));
    },
  }
};

class TextInput extends Component {

  constructor (props) {
    super(props);
    this.handlers = handlers(this.props);
  }

  componentWillMount () {
    this.props.actions.initFormInput(this.props.name);
  }

  render () {

    const { name,
            placeholder,
            signup,
            type,
            validate,
            validationMessage } = this.props;

    const handlers = this.handlers;
    const me = signup.getIn(['FormData', name]);

    if (me) {
      const modified = me.get('modified');
      const valid = me.get('valid');
      const showValidationMessage = me.get('showValidationMessage');

      let validIcon = '';
      if (modified && !valid) {
        validIcon = <span className={styles.cross}>{Icons.cross}</span>;
      } else if (modified && valid) {
        validIcon = <span className={styles.check}>{Icons.check}</span>;
      }
      return (
        <div className={styles.base}>
          {(showValidationMessage)
            ? (
            <span className={styles.validationMessage}>
            {validationMessage}
          </span>)
            : false
          }
          <input ref='input'
                 type={type}
                 name={name}
                 data-validate={validate}
                 data-gtm-type='input-text'
                 data-gtm-valid={valid}
                 placeholder={placeholder}
                 onChange={handlers.onBlur}
                 className={styles.input}/>
          {validIcon}
        </div>
      )
    } else {
      return false;
    }
  }
}

TextInput.propTypes = {
  actions: PropTypes.object,
  name: PropTypes.string,
  onBlur: PropTypes.func,
  placeholder: PropTypes.string,
  signup: ImmutablePropTypes.map,
  type: PropTypes.string,
  validate: PropTypes.array,
  validationMessage: PropTypes.string,
};

export default TextInput;
