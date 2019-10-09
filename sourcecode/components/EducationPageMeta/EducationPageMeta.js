import React, { Component } from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';
import MetaItem from 'components/MetaItem/MetaItem';
import styles from './EducationPageMeta.less';

class EducationPageMeta extends Component {
  render () {

    const content = this.props.content;
    const establishment = content.get('establishment');
    const deadline = content.get('deadline');
    const startDate = content.get('startDate');
    const scope = content.get('scope');
    const points = content.get('points');
    const vacancies = content.get('vacancies');
    const location = content.get('location');
    let locations = content.get('locationText');


    if (!locations) {
      locations = location.reduce((memo, locationItem) => {
        const separator = (memo.length) ? ', ' : '';
        return `${memo}${separator}${locationItem}`;
      }, '');
    }


    return (
      <section className={styles.section}>
        <div className={styles.wrap}>
          <ul className={styles.list}>
            <MetaItem heading='Utbildningstyp' value={establishment}/>
            <MetaItem heading='Studieorter' value={locations}/>
            <MetaItem heading='Sista ansökningsdag' value={deadline}/>
            <MetaItem heading='Utbildningsstart' value={startDate}/>
            <MetaItem heading='Omfattning' value={scope}/>
            <MetaItem heading='Poäng' value={points}/>
            <MetaItem heading='Antal platser' value={vacancies}/>
          </ul>
        </div>
      </section>
    );
  }
}

EducationPageMeta.propTypes = {
  content: ImmutablePropTypes.map,
};

export default EducationPageMeta;
