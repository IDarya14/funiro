import classes from '../styles/Header.module.scss';
import TextField from '@mui/material/TextField';
import { InputAdornment } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import Arrow from '../public/Arrow-down.svg';
import cart from '../public/Cart.svg';
import Image from 'next/image';
import { useState } from 'react';
import Cart from '../components/Cart';
import { useSelector } from 'react-redux';

const Header = ({ children }) => {
  const [openCart, setOpenCart] = useState(false);
  const cardsArray = useSelector((state) => state.cardsReducer.cards);
  return (
    <>
      <div className={classes.header}>
        {openCart ? (
          <div className={classes.wrap} onClick={() => setOpenCart(false)} />
        ) : (
          ''
        )}
        <div className={classes.header__background} />
        <div className={classes.header__body}>
          <div className={classes.header__logo}>Funiro.</div>
          <nav className={classes.header__menu}>
            <div className={classes.header__item}>
              <div className={classes.item_text}> Products</div>
              <Image
                src={Arrow}
                height={25}
                width={25}
                className={classes.item_image}
              />
            </div>
            <div className={classes.header__item}>
              <div className={classes.item_text}> Rooms</div>
              <Image
                src={Arrow}
                height={25}
                width={25}
                className={classes.item_image}
              />
            </div>
            <div className={classes.header__item}>Inspirations</div>
          </nav>
          <div className={classes.header__search}>
            <TextField
              className={classes.input}
              label="Search for minimalist chair"
              variant="outlined"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
              }}
            />
          </div>
          <div className={classes.header__items}>
            <Image
              src={cart}
              height={35}
              width={35}
              className={classes.header__cart}
              onClick={() => setOpenCart((prev) => !prev)}
            />
            <div className={classes.header__count}>{cardsArray.length}</div>
            {openCart ? (
              <div className={classes.open_cart}>
                <Cart setOpenCart={setOpenCart} openCart={openCart} />
              </div>
            ) : (
              <div className={classes.close_cart}>
                <Cart openCart={openCart} />
              </div>
            )}
            <div className={classes.header__avatar}>DK</div>
          </div>
        </div>
      </div>

      <main>{children}</main>
    </>
  );
};

export default Header;
