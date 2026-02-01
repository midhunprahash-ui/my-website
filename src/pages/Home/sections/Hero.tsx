import styles from './Hero.module.scss';

const Hero = () => {
    return (
        <header className={styles.hero}>
            <h1 className={styles.title}>Midhun</h1>
            <p className={styles.subtitle}>Software Engineer &amp; Creative Technologist</p>

            <div className={styles.scrollIndicator} aria-hidden="true">
                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M7 13L12 18L17 13M7 6L12 11L17 6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
            </div>
        </header>
    );
};

export default Hero;
