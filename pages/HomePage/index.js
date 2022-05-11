import classes from '../../styles/Home.module.scss';
import Header from '../../components/Header';
import Slider from '../../components/Slider';
import arrow from '../../public/small-arrow.svg';
import Products from '../../components/Products';
import Image from 'next/image';

export default function HomePage() {
  return (
    <div className={classes.container}>
      <Header>
        <div className={classes.slider}>
          <Slider />
        </div>
        <div className={classes.infoblock}>
          <h1 className={classes.title}>High-Quality Furniture Just For You</h1>
          <div className={classes.text}>
            Our furniture is made from selected and best quality materials that
            are suitable for your dream home
          </div>
          <button className={classes.button}>Shop Now</button>
        </div>
        <div className={classes.priceblock}>
          <div className={classes.priceblock__title}>Bohauss</div>
          <div className={classes.priceblock__subtitle}>
            Luxury big sofa 2-seat
          </div>
          <div className={classes.priceblock__item}>
            <div className={classes.priceblock__price}>Rp 17.000.000</div>
            <Image
              src={arrow}
              height={17}
              width={17}
              className={classes.priceblock__image}
            />
          </div>
        </div>
        <div className={classes.products}>
          <Products />
        </div>
      </Header>
    </div>
  );
}
