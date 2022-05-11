import classes from '../styles/Products.module.scss';
import { collection, getDocs, getFirestore } from 'firebase/firestore';
import { setAllCards } from '../redux/actions/listItemsAction';
import { useEffect, useState } from 'react';
import app from '../firebase/index';
import Card from '../components/Card';
import { useDispatch } from 'react-redux';

const Products = () => {
  const [cards, setCards] = useState([]);
  const db = getFirestore(app);
  const dispatch = useDispatch();

  useEffect(() => {
    async function getCollection() {
      const querySnapshot = await getDocs(collection(db, 'cards'));
      let res = [...cards];
      querySnapshot.forEach((doc) => {
        const elem = doc.data();
        elem.id = doc.id;
        res.push(elem);
        setCards(res);
      });
    }
    getCollection();
  }, []);

  useEffect(() => {
    dispatch(setAllCards(cards));
  }, [cards]);

  return (
    <div className={classes.container}>
      <h1 className={classes.title}> Our Products</h1>
      <div className={classes.cards}>
        {cards?.map((elem) => {
          return (
            <div className={classes.card} key={elem.id}>
              <Card
                title={elem.title}
                description={elem.description}
                price={elem.price}
                discount={elem.discount}
                image={elem.image}
                oldprice={elem.oldprice}
                newItem={elem.new}
                id={elem.id}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Products;
