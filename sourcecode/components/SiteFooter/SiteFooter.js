import React, { Component } from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { Link } from 'react-router';
import SiteFooterId from 'components/SiteFooterId/SiteFooterId';
import styles from './SiteFooter.less';

class SiteFooter extends Component {

  render () {
    const globals = this.props.globals;
    const id = globals.get('site_id');

    // const image = globals.getIn(['footer', 'backgroundImage', 'large']);
    const phone = globals.getIn(['footer', 'phone']);
    const email = globals.getIn(['footer', 'email']);
    const facebookUrl = globals.getIn(['footer', 'facebookUrl']);
    const linkedInUrl = globals.getIn(['footer', 'linkedInUrl']);
    const instagramUrl = globals.getIn(['footer', 'instagramUrl']);

    const siteName = globals.get('sites')
      .find(site => site.get('id') == id)
      .get('name');

    // const backgroundImage = {
    //   backgroundImage: `url(${image})`,
    // };

    return (
      <footer className={styles.footer} >
        <div className={styles.wrap}>
          <div className={styles.logo}>
            <SiteFooterId id={id}/>
            <p className={styles.reftext}>
              <span>Som en del av Plushögskolan AB är vi auktoriserade enligt </span>
              <a href='https://www.utbildningsforetagen.se/' target='_blank'>Almega Utbildningsföretagen</a>.
            </p>
          </div>
          <div className={styles.well}>
            <section className={styles.section}>
              <h1 className={styles.heading}>Utbildningar</h1>
              {(id === 1)
                ? (<ul className={styles.list}>
                <li>
                  <Link to='/om-oss'>
                    Om {siteName}
                  </Link>
                </li>
              </ul>)
                : (<ul className={styles.list}>
                <li>
                  <Link to='/utbildningar'>
                    Alla utbildningar på {siteName}
                  </Link>
                </li>
              </ul>)
              }
            </section>
            <section className={styles.section}>
              <h1 className={styles.heading}>Socialt</h1>
              <ul className={styles.list}>
                <li>
                  <a href={facebookUrl}>Följ oss på Facebook</a>
                </li>
                <li>
                  <a href={linkedInUrl}>Följ oss på LinkedIn</a>
                </li>
                <li>
                  <a href={instagramUrl}>Följ oss på Instagram</a>
                </li>
              </ul>
            </section>
            <section className={styles.section}>
              <h1 className={styles.heading}>Kontakt</h1>
              <ul className={styles.list}>
                <li>
                  <a href={`tel:${phone}`}> {phone}</a>, se även lokala telefonnummer under fliken Här finns vi.
                </li>
                <li>
                  <a href={`mailto:${email}`}>{email}</a>
                </li>
              </ul>
            </section>
          </div>
          <p className={styles.link}>
            <span>{siteName} är en del av AcadeMedia, norra Europas största utbildningsföretag </span>
            <a href='http://www.academedia.se'>www.academedia.se</a>.
          </p>
          <p className={styles.cookies}>
            <span>Vi använder cookies för att förbättra din upplevelse
              av vår webbplats. Genom att surfa vidare accepterar du dessa
              kakor. </span>
            <Link to='/integritetspolicy'>Läs mer om cookies</Link>.
          </p>
        </div>
      </footer>
    );
  }
}

SiteFooter.propTypes = {
  globals: ImmutablePropTypes.map,
};

export default SiteFooter;
