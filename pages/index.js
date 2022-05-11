import styles from '../styles/Home.module.scss';
import Router from 'next/router';
import { useEffect } from 'react';

export default function Home() {
  useEffect(() => {
    Router.push('/SignIn');
  }, []);
  return <div className={styles.container}>Hello</div>;
}
