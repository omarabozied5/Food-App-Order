import { Fragment } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import HeaderCartButton from './HeaderCartButton';
import mealsImage from '../../assests/new.jpg';
import mealsImage2 from '../../assests/neww.jpg'
import mealsImage3 from '../../assests/new6.jpg'

import classes from './Header.module.css';

const Header = (props) => {
    const images = [mealsImage , mealsImage2, mealsImage3];
    const settings = {
        dots: true,
        infinite: true,
        speed: 2000,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,        // Enable autoplay
        autoplaySpeed: 5000,   // Set the autoplay speed in milliseconds (5 seconds in this case)
        fade : true,
      };
  return (
    <Fragment>
      <header className={classes.header}>
        <h1>Suchi Taste</h1>
        <HeaderCartButton onClick={props.onShowCart} /> 
      </header>
      <div className={classes['main-image']}>
        <Slider {...settings}>
          {images.map((image, index) => (
            <div key={index}>
              <img 
              src={image} 
              alt={`Delicious food ${index + 1}`}
              className={classes.sliderImage}
              />
            </div>
          ))}
        </Slider>
      </div>
    </Fragment>
  );
};

export default Header;