import React, { Component, PropTypes } from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';
import Immutable from 'immutable';
import createMarkup from 'utils/createMarkup';
import { isValid } from 'utils/validate';
import * as Icons from 'utils/svgIcons';
import styles from './CheckBox.less';

const handlers = (props) => {
  return {
    onBlur: (e) => {
      const { name, checked, dataset } = e.currentTarget;
      const validate = dataset.validate;
      props.actions.setFormInput(Immutable.fromJS({
        name: name,
        field: {
          showValidationMessage: false,
          modified: true,
          value: checked,
          valid: isValid(validate, checked),
        },
      }));
    },
  }
};

class CheckBox extends Component {

  constructor (props) {
    super(props);
    this.handlers = handlers(this.props);
  }

  componentWillMount () {
    this.props.actions.initFormInput(this.props.name);
  }

  render () {

    const { id,
            label,
            name,
            signup,
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
                 type='checkbox'
                 name={name}
                 id={id}
                 data-validate={validate}
                 data-gtm-type=''
                 data-gtm-valid={valid}
                 onChange={handlers.onBlur}
                 className={styles.input}/>
          <label className={styles.label}
                 htmlFor={id}
                 dangerouslySetInnerHTML={createMarkup(label)}></label>
          {validIcon}
        </div>
      )
    } else {
      return false;
    }
  }
}

CheckBox.propTypes = {
  actions: PropTypes.object,
  id: PropTypes.string,
  label: PropTypes.string,
  name: PropTypes.string,
  onBlur: PropTypes.func,
  signup: ImmutablePropTypes.map,
  validate: PropTypes.array,
  validationMessage: PropTypes.string,
};

export default CheckBox;
