import styles from './NotFound.module.css';

function NotFound() {
    return (
        <div className={styles.container}>
            <img src="/Images/404.png" alt="Página não encontrada" className={styles.image} />
        </div>
    );
}

export default NotFound; 
