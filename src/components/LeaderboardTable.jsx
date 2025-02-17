import styles from './LeaderboardTable.module.css';
import { format } from 'date-fns';

function LeaderboardTable({ leaderboard }) {
    const getFlagUrl = (country) => `https://flagsapi.codeaid.io/${country}.png`;

    return (
        <table className={styles.table}>
            <thead>
                <tr>
                    <th className={styles.teamName}>Team Name</th>
                    <th className={styles.matchesPlayed}>MP</th>
                    <th className={styles.goalsFor}>GF</th>
                    <th className={styles.goalsAgainst}>GA</th>
                    <th className={styles.goalDifference}>GD</th>
                    <th className={styles.points}>Points</th>
                </tr>
            </thead>
            <tbody>
                {leaderboard?.map((team, index) => (
                    <tr key={index}>
                        <td className={styles.teamName}><img src={getFlagUrl(team.teamName)} alt={team.teamName} className={styles.flag} /> {team.teamName}</td>
                        <td className={styles.matchesPlayed}>{team.matchesPlayed}</td>
                        <td className={styles.goalsFor}>{team.goalsFor}</td>
                        <td className={styles.goalsAgainst}>{team.goalsAgainst}</td>
                        <td className={styles.goalDifference}>{team.goalDifference}</td>
                        <td className={styles.points}>{team.points}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
}

export default LeaderboardTable; 