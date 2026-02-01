import Hero from './sections/Hero';
import Overview from './sections/Overview';
import Highlights from './sections/Highlights';
import styles from './Home.module.scss';

const Home = () => {
  return (
    <main className={styles.container}>
      <Hero />
      <Overview />
      <Highlights />
    </main>
  );
};

export default Home;
