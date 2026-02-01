import styles from './Overview.module.scss';

const Overview = () => {
    return (
        <section className={styles.section}>
            <div className={styles.content}>
                <h2 className={styles.heading}>Building Digital Excellence</h2>
                <p className={styles.text}>
                    I specialize in crafting high-performance, accessible, and aesthetically pleasing digital experiences.
                    With a deep understanding of modern web technologies, I bridge the gap between design and engineering
                    to deliver products that stand out.
                </p>
            </div>
        </section>
    );
};

export default Overview;
