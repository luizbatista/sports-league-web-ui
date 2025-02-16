import styles from './Footer.module.css';

function Footer() {
    return (
        <footer className={styles.footer}>
            <div className={styles.container}>
                API Version 1.0
            </div>
        </footer>
    );
}

export default Footer; 