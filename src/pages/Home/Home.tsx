import styles from './Home.module.scss';

const Home = () => {
  return (
    <div className={styles.container}>
      <header className={styles.hero}>
        <h1 className={styles.title}>Midhun</h1>
        <p className={styles.subtitle}>Software Engineer</p>
      </header>
      
      <section className={styles.overview}>
        <p>Building high-quality web experiences.</p>
      </section>
    </div>
  );
};

export default Home;
