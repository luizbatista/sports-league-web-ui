import { Link, NavLink } from 'react-router-dom';
import styles from './Navbar.module.css';

function Navbar() {
    return (
        <nav className={styles.navbar}>
            <div className={styles.container}>
                <Link to="/" className={styles.logo}>
                    <img src="/Images/logo.svg" alt="League Web UI" />
                </Link>
                <div className={styles.links}>
                    <NavLink 
                        to="/schedule" 
                        className={styles.link}
                        activeClassName={styles.active}
                    >
                        <img src="/Images/schedule.png" alt="Schedule" className={styles.icon} />
                        Schedule
                    </NavLink>
                    <NavLink 
                        to="/leaderboard" 
                        className={styles.link}
                        activeClassName={styles.active}
                    >
                        <img src="/Images/leaderboard.png" alt="Leaderboard" className={styles.icon} />
                        Leaderboard
                    </NavLink>
                </div>
            </div>
        </nav>
    );
}

export default Navbar; 