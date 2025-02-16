import styles from './Table.module.css';

function Table({ matches }) {
    return (
        <table className={styles.table}>
            <thead>
                <tr>
                    <th>Date/Time</th>
                    <th>Stadium</th>
                    <th>Home Team</th>
                    <th>Away Team</th>
                </tr>
            </thead>
            <tbody>
                {matches?.map((match, index) => (
                    <tr key={index}>
                        <td>{new Date(match.matchDate).toLocaleString()}</td>
                        <td>{match.stadium}</td>
                        <td>{match.homeTeam}</td>
                        <td>{match.awayTeam}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
}

export default Table; 