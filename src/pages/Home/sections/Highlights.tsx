import styles from './Highlights.module.scss';

const Highlights = () => {
    const highlights = [
        {
            title: "Frontend Architecture",
            description: "Building scalable, maintainable, and performant user interfaces with React, TypeScript, and modern build tools."
        },
        {
            title: "UI/UX Engineering",
            description: "Translating design concepts into pixel-perfect, accessible, and interactive experiences."
        },
        {
            title: "Performance Optimization",
            description: "Ensuring applications load fast and run smoothly across all devices and network conditions."
        }
    ];

    return (
        <section className={styles.section}>
            <div className={styles.container}>
                <h2 className={styles.heading}>Core Competencies</h2>
                <div className={styles.grid}>
                    {highlights.map((item, index) => (
                        <div key={index} className={styles.card}>
                            <h3 className={styles.cardTitle}>{item.title}</h3>
                            <p className={styles.cardText}>{item.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Highlights;
