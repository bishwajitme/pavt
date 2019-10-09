import React, { Component } from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';
//import ReactSwipe from 'react-swipe';
//import * as Icons from 'utils/svgIcons';
import styles from './PageHero.less';

const handlers = (comp) => {
  return {
    goNext: () => {
      comp.refs.slider.swipe.next();
    },
    goPrev: () => {
      comp.refs.slider.swipe.prev();
    },
  }
};

class PageHero extends Component {

  constructor (props) {
    super(props);
    this.handlers = handlers(this);
  }

  render () {
    //const backgroundImages = this.props.backgroundImages.map((image, i) => {
    //  const style = {
    //    backgroundImage: `url(${image.get('large')})`,
    //  };
    //  return (<div key={`image-${i}`}
    //               style={style}
    //               className={styles.image}></div>);
    //});

    const backgroundImages = this.props.backgroundImages;
    if (backgroundImages.size) {
      const style = {
        backgroundImage: `url(${backgroundImages.first().get('large')})`,
      };
      return (
        <div className={styles.section}>
          <div style={style}
               className={styles.image}></div>
        </div>
      );
    } else {
      return false;
    }

    //return (
    //  <section className={styles.section}>
    //    <ReactSwipe key={backgroundImages.size} ref='slider'
    //                continuous={true}>
    //      {backgroundImages ? backgroundImages : null}
    //    </ReactSwipe>
    //    {(backgroundImages.size > 1) ?
    //      (<div className={styles.nav}>
    //        <span className={styles.prev}
    //              onClick={this.handlers.goPrev}>
    //          {Icons.linkArrowLeft}
    //        </span>
    //        <span className={styles.next}
    //              onClick={this.handlers.goNext}>
    //          {Icons.linkArrowRight}
    //        </span>
    //      </div>)
    //      : false}
    //  </section>
    //);
  }
}

PageHero.propTypes = {
  backgroundImages: ImmutablePropTypes.list,
};

export default PageHero;
