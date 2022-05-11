import classes from '../styles/Card.module.scss';
import { getStorage, ref, getDownloadURL } from 'firebase/storage';
import { useRouter } from 'next/router';
import app from '../firebase/index';
import Image from 'next/image';
import details from '../public/details.svg';
import like from '../public/like.svg';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addCardstoCart } from '../redux/actions/cardsAction';
import { deleteFromCart } from '../redux/actions/cardsAction';

const Card = ({
  title,
  description,
  price,
  image,
  discount,
  oldprice,
  newItem,
  id,
}) => {
  const router = useRouter();
  const [urlImage, setUrlImage] = useState();
  const [active, setActive] = useState(false);
  const [added, setAdded] = useState(false);
  const storage = getStorage(app);
  const dispatch = useDispatch();
  const cardsFromCart = useSelector((state) => state.cardsReducer.cards);

  useEffect(() => {
    const spaceRef = ref(storage, `cards-images/${image}`);
    getDownloadURL(spaceRef).then((url) => {
      setUrlImage(url);
    });
  }, []);

  const addToCart = () => {
    const item = cardsFromCart.find((elem) => {
      return elem.id === id;
    });
    if (!item) {
      const elem = {
        title,
        description,
        price,
        image: urlImage,
        discount,
        oldprice,
        newItem,
        id,
      };
      dispatch(addCardstoCart(elem));
      setAdded(true);
    } else {
      return null;
    }
  };

  const deleteFromCard = () => {
    const array = [...cardsFromCart];
    const index = array.findIndex((elem) => {
      return elem.id === id;
    });
    console.log(index);
    array.splice(index, 1);
    dispatch(deleteFromCart(array));
    setAdded(false);
  };

  return (
    <div
      className={classes.wrapper}
      onMouseOver={() => setActive(true)}
      onMouseLeave={() => setActive(false)}
    >
      {active && (
        <>
          <div className={classes.active} />
          <div className={classes.active_items}>
            {added ? (
              <div className={classes.active_buttom} onClick={deleteFromCard}>
                Delete from cart
              </div>
            ) : (
              <div className={classes.active_buttom} onClick={addToCart}>
                Add to cart
              </div>
            )}

            <div className={classes.active_images}>
              <div
                className={classes.active_img}
                onClick={() => router.push(`/HomePage/${id}`)}
              >
                <Image
                  src={details}
                  height={30}
                  width={30}
                  className={classes.active_icon}
                />
                Details
              </div>
              <div className={classes.active_img}>
                <Image
                  src={like}
                  height={30}
                  width={30}
                  className={classes.active_icon}
                />
                Like
              </div>
            </div>
          </div>
        </>
      )}
      {urlImage ? (
        <Image
          src={urlImage}
          height={301}
          width={285}
          className={classes.image}
        />
      ) : (
        ''
      )}
      <div className={classes.info}>
        {discount ? <div className={classes.discount}>{discount}</div> : ''}
        {newItem ? <div className={classes.newItem}>{newItem}</div> : ''}
        <div className={classes.title}>{title}</div>
        <div className={classes.description}>{description}</div>
        <div className={classes.price}>
          <div className={classes.currentPrice}>{price}</div>
          <div className={classes.oldPrice}>{oldprice}</div>
        </div>
      </div>
    </div>
  );
};

export default Card;
