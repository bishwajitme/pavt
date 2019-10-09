import React, { Component, PropTypes } from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';
import Immutable from 'immutable';
import Spinner from 'components/Spinner/Spinner';
import * as Icons from 'utils/svgIcons';
import styles from './EducationsSelectBox.less';

const handlers = (comp) => {
  return {
    onFocus: (e) => {
      e.currentTarget.onkeydown = (r) => {
        if (r.keyCode === 13) {
          comp.handlers.onToggleClick();
        }
      };
    },
    onBlur: (e) => {
      e.currentTarget.onkeydown = null;
    },
    onToggleClick: () => {
      comp.props.actions.setFormInput(Immutable.fromJS({
        name: 'Enquiries',
        field: {
          showValidationMessage: false,
          modified: true,
        },
      }));
      comp.props.actions.toggleEducationsSelect();
    },
    onCheckboxChange: (e) => {
      const checked = e.currentTarget.checked;
      const data = Immutable.fromJS({
        EducationId: e.currentTarget.dataset.education,
        LocationId: e.currentTarget.dataset.location,
      });

      if (checked) {
        comp.props.actions.addToEnquiries(data);
      } else {
        comp.props.actions.removeFromEnquiries(data);
      }
    },
  }
};

class EducationsSelectBox extends Component {

  constructor (props) {
    super(props);
    this.handlers = handlers(this);
  }

  componentWillMount () {
    this.props.actions.initEducationSelect();
    this.props.actions.fetchFormEducationsFromApi();
    if (this.props.ui.get('showEducationsSelect')) {
      this.props.actions.toggleEducationsSelect();
    }
  }

  render () {
    const { formEducations, name, signup, ui, validationMessage } = this.props;
    const response = formEducations.get('response');
    const status = formEducations.get('status');
    const handlers = this.handlers;

    if (status === 'done' && response) {

      const items = [];

      response.sortBy(item => item.get('Name')).map(education => {

        const id = education.get('Id');
        const name = education.get('Name');

        education.get('Locations').map(location => {

          const locationId = location.get('Id');
          const locationName = location.get('Name');

          items.push(
            <div key={`${id}-${locationId}`}
                 className={styles.item}>
              <input className={styles.input}
                     type='checkbox'
                     data-id={`${id}-${locationId}`}
                     data-education={id}
                     data-location={locationId}
                     data-gtm-education={name}
                     data-gtm-location={locationName}
                     data-gtm-type='input-checkbox'
                     onChange={handlers.onCheckboxChange}
                     name={`${name}-${locationName}`}
                     id={`${id}-${locationId}`}/>
              <label htmlFor={`${id}-${locationId}`}
                     onClick={handlers.onClick}
                     className={styles.label}>
                {name} ({locationName})
              </label>
            </div>
          );
        });
      });

      const me = signup.getIn(['FormData', name]);

      const show = (ui.get('showEducationsSelect')) ? 'open' : 'closed';

      let toggleText = '';
      const amountChecked = signup.getIn(
        ['FormData', 'Enquiries', 'value']
      ).size;

      if (amountChecked) {
        const unit = (amountChecked > 1)
          ? 'utbildningar valda'
          : 'utbildning vald';
        toggleText = `${amountChecked} ${unit}`;
      } else {
        toggleText = 'Välj utbildningar';
      }

      if (me) {
        const modified = me.get('modified');
        const valid = me.get('valid');
        const showValidationMessage = me.get('showValidationMessage');

        let validIcon = (<span className={styles.carret}>
          {Icons.carretDown}
        </span>);
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
            <div tabIndex='0'
                 ref='select'
                 className={styles.select}
                 onFocus={handlers.onFocus}
                 onBlur={handlers.onBlur}>
              <div className={styles.toggle}
                   onClick={handlers.onToggleClick}>
                {toggleText}{validIcon}
              </div>
              <div className={`${styles.options} ${styles[show]}`}
                   data-gtm='education-select'>
                {items}
              </div>
            </div>
          </div>
        );
      } else {
        return false;
      }
    } else if (status === 'fetching') {
      return (
        <div>
          <div className={styles.select}>
            <div className={styles.toggle}>
              <Spinner/>
            </div>
          </div>
        </div>
      );
    } else if (status === 'error') {
      return false;
    } else {
      return false;
    }
  }
}

EducationsSelectBox.propTypes = {
  actions: PropTypes.object,
  formEducations: ImmutablePropTypes.map,
  name: PropTypes.string,
  signup: ImmutablePropTypes.map,
  ui: ImmutablePropTypes.map,
  validationMessage: PropTypes.string,
};

export default EducationsSelectBox;
