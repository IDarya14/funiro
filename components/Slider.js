import classes from '../styles/Slider.module.scss';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import arrow from '../public/arrow.svg';
import Image from 'next/image';
import React from 'react';

export default class CenterMode extends React.Component {
  constructor(props) {
    super(props);
    this.next = this.next.bind(this);
    this.previous = this.previous.bind(this);
  }
  next() {
    this.slider.slickNext();
  }
  previous() {
    this.slider.slickPrev();
  }

  render() {
    const settings = {
      arrows: true,
      dots: true,
      dotsClass: `button_bar ${classes.button__bar}`,
      className: 'center',
      centerMode: true,
      infinite: true,
      centerPadding: '20px',
      slidesToShow: 1.7,
      speed: 1500,
      autoplay: true,
      accessibility: true,
      appendDots: (dots) => (
        <div>
          <ul style={{ margin: '0px' }}>
            {<div className={classes.list}>{dots}</div>}
          </ul>
        </div>
      ),
      customPaging: (i) => (
        <div
          style={{
            cursor: 'pointer',
            width: '30px',
            height: '30px',
          }}
        />
      ),
    };
    return (
      <div className={classes.wrapper}>
        <div style={{ textAlign: 'center' }}>
          <div className={classes.arrows}>
            <div className={classes.arrow}>
              <Image
                src={arrow}
                height={20}
                width={20}
                className={classes.prev_arrow}
                onClick={this.previous}
              />
            </div>
            <div className={classes.arrow}>
              <Image
                src={arrow}
                height={20}
                width={20}
                className={classes.next_arrow}
                onClick={this.next}
              />
            </div>
          </div>
        </div>
        <Slider ref={(c) => (this.slider = c)} {...settings}>
          <div className={`${classes.item}`}>
            <img src="/images/img1.jpg"></img>
          </div>
          <div className={classes.item}>
            <img src="/images/img2.jpg"></img>
          </div>
          <div className={classes.item}>
            <img src="/images/img3.jpg"></img>
          </div>
          <div className={classes.item}>
            <img src="/images/img4.jpg"></img>
          </div>
        </Slider>
      </div>
    );
  }
}
