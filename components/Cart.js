import { useDispatch, useSelector } from 'react-redux';
import classes from '../styles/Cart.module.scss';
import Image from 'next/image';
import trush from '../public/trush.svg';
import { deleteFromCart } from '../redux/actions/cardsAction';

const Cart = ({ setOpenCart }) => {
  const cardsArray = useSelector((state) => state.cardsReducer.cards);
  const dispatch = useDispatch();

  const deleteCard = (id) => {
    const array = [...cardsArray];
    const index = array.findIndex((elem) => {
      return elem.id === id;
    });
    array.splice(index, 1);
    dispatch(deleteFromCart(array));
  };

  return (
    <div className={classes.wrapper}>
      <div className={classes.list}>
        <div className={classes.wrap}>
          <div className={classes.titlecart}>Shoping Cart</div>
          <div
            className={classes.close_cart}
            onClick={() => setOpenCart(false)}
          >
            &times;
          </div>
        </div>
        {cardsArray.length !== 0 ? (
          cardsArray.map((elem) => {
            return (
              <div className={classes.item} key={elem.id}>
                <Image
                  src={elem.image}
                  height={250}
                  width={250}
                  className={classes.image}
                />
                <div className={classes.info}>
                  <div className={classes.title}>{elem.title}</div>
                  <div className={classes.description}>{elem.description}</div>
                  <div className={classes.wrap}>
                    <div className={classes.price}>{elem.price}</div>

                    <Image
                      src={trush}
                      height={30}
                      width={30}
                      className={classes.delete}
                      onClick={() => deleteCard(elem.id)}
                    />
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <div className={classes.empty_text}>Сart is empty</div>
        )}
      </div>
    </div>
  );
};

export default Cart;
