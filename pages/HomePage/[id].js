import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

const CardPage = () => {
  const router = useRouter();
  const listItems = useSelector((state) => state.listItemsReducer.listItems);
  const id = router.asPath.split('/')[2];

  console.log('list', listItems);

  // useEffect(() => {
  //   // const item = listItems?.find((elem) => elem.id === id);
  //   // console.log(item);
  // }, []);

  return <div className="">Hello Page</div>;
};
export default CardPage;
