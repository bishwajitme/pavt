import React, { Component, PropTypes } from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';
import Immutable from 'immutable';
import { isValid } from 'utils/validate';
import dataLayer from 'utils/dataLayer';
import TextInput from 'components/Form/TextInput';
import CheckBox from 'components/Form/CheckBox';
import SubmitButton from 'components/Form/SubmitButton';
import EducationsSelectBox from 'components/Form/EducationsSelectBox';
import WYSIWYGContent from 'components/WYSIWYGContent/WYSIWYGContent';
import xhr from 'xhr';
import config from 'webpack-config-loader!conf';
import styles from './SignupForm.less';

const handlers = (props) => {
  return {
    submit: (e) => {
      e.preventDefault();
      const formData = {
        ApiKey: config.formKey,
        Channel: config.formChannel,
      };

      const valid = !props.signup.get('FormData').filter((val, key) => {
        const valid = val.get('valid');
        if (!valid) {
          props.actions.setFormInput(Immutable.fromJS({
            name: key,
            field: {
              showValidationMessage: true,
            },
          }));
        }
        return !valid;
      }).size;

      if (valid) {
        props.signup.get('FormData').map((val, key) => {
          let value = val.get('value');
          if (val.get('type') === 'selectBox') {
            value = value.toJS();
          }
          formData[key] = value;
        });

        xhr({
          url: `//${window.location.hostname}/wp-json/ph/form-request/submit`,
          method: 'POST',
          data: JSON.stringify(formData),
        }, function (err, resp, body) {
          if (!err) {
            props.actions.showFormSuccessMessage();
            //TagManagerEvent
            dataLayer.push({event: 'signupform:sent'});
          } else {
            props.actions.showFormErrorMessage();
          }
        });
      }
    },
    onBlur: (e) => {
      const { name, value, type } = e.currentTarget;
      props.actions.setFormInput(Immutable.fromJS({
        name: name,
        field: {
          modified: true,
          name: name,
          value: value,
          valid: isValid(type, value),
        },
      }));
    },
  }
};

class SignupForm extends Component {

  constructor (props) {
    super(props);
    this.handlers = handlers(this.props);
  }

  componentWillReceiveProps (nextProps) {
    this.handlers = handlers(nextProps);
  }

  render () {

    const { actions, formEducations, globals, signup, ui } = this.props;
    const handlers = this.handlers;

    const showSuccessMessage = signup.get('showSuccessMessage');
    const showErrorMessage = signup.get('showErrorMessage');
    const showForm = (showSuccessMessage || showErrorMessage)
      ? {display: 'none'}
      : {};

    const message = globals.getIn(
      ['response', 'signup_form', 'successMessage']
    );

    return (
      <div>
        {(showSuccessMessage || showErrorMessage)
          ? (
          <div className={styles.message}>
            <WYSIWYGContent content={message}/>
          </div>
        )
          : false
        }
        <form onSubmit={handlers.submit}
              className={styles.form} style={showForm}>
          <div className={styles.textInput}>
            <TextInput type='text'
                       name='FirstName'
                       placeholder='Förnamn'
                       validate={['required']}
                       validationMessage='Förnamn är obligatoriskt'
                       onBlur={handlers.onBlur}
                       actions={actions}
                       signup={signup}/>
          </div>
          <div className={styles.textInput}>
            <TextInput type='text'
                       name='LastName'
                       placeholder='Efternamn'
                       validate={['required']}
                       validationMessage='Efternamn är obligatoriskt'
                       onBlur={handlers.onBlur}
                       actions={actions}
                       signup={signup}/>
          </div>
          <div className={styles.textInput}>
            <TextInput type='email'
                       name='Email'
                       placeholder='E-post'
                       validate={['required', 'email']}
                       validationMessage={`En korrekt e-postadress
                     är obligatoriskt`}
                       onBlur={handlers.onBlur}
                       actions={actions}
                       signup={signup}/>
          </div>
          <div className={styles.textInput}>
            <TextInput type='text'
                       name='Phone'
                       placeholder='Telefonnummer'
                       validate={['required', 'phone']}
                       validationMessage={`Ett korrekt telefonnummer
                     är obligatoriskt`}
                       onBlur={handlers.onBlur}
                       actions={actions}
                       signup={signup}/>
          </div>
          <div className={styles.selectBox}>
            <EducationsSelectBox actions={actions}
                                 formEducations={formEducations}
                                 name='Enquiries'
                                 signup={signup}
                                 ui={ui}
                                 validationMessage={`Välj minst en utbildning`}
            />
          </div>
          <div className={styles.checkBox}>
            <CheckBox type='text'
                       name='PUL'
                       id='PUL'
                       label={`Jag godkänner hantering av mina personuppgifter.
                        <a href="/integritetspolicy">Läs mer här</a>`}
                       validate={['required']}
                       validationMessage={`Ditt samtycke krävs för att
                       göra en intresseanmälan`}
                       onBlur={handlers.onBlur}
                       actions={actions}
                       signup={signup}/>
          </div>
          <div className={styles.button}>
            <SubmitButton text='Skicka intresseanmälan'/>
          </div>
        </form>
      </div>
    );
  }
}

SignupForm.propTypes = {
  actions: PropTypes.object,
  formEducations: ImmutablePropTypes.map,
  globals: ImmutablePropTypes.map,
  signup: ImmutablePropTypes.map,
  ui: ImmutablePropTypes.map,
};

export default SignupForm;
